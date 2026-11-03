import { Option, OptionColor, Question } from '../types';

export type NarrationState = 'idle' | 'speaking' | 'paused';

export interface TTSClientListener {
  onStateChange?: (state: NarrationState) => void;
  onHighlightColor?: (color: OptionColor | null) => void;
  onProviderChange?: (provider: 'elevenlabs' | 'webspeech') => void;
}

class TTSClientService {
  private currentAudio: HTMLAudioElement | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private activeSequenceId: number = 0;
  private isSpeakingInternal: boolean = false;
  private listeners: Set<TTSClientListener> = new Set();
  private blobCache: Map<string, string> = new Map(); // hash/text -> blobUrl
  private provider: 'elevenlabs' | 'webspeech' = 'elevenlabs';
  private customVoiceId: string = '';

  constructor() {
    // Check initial status from server
    this.checkStatus();
  }

  public subscribe(listener: TTSClientListener) {
    this.listeners.add(listener);
    listener.onProviderChange?.(this.provider);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyState(state: NarrationState) {
    this.isSpeakingInternal = state === 'speaking';
    this.listeners.forEach(l => l.onStateChange?.(state));
  }

  private notifyHighlight(color: OptionColor | null) {
    this.listeners.forEach(l => l.onHighlightColor?.(color));
  }

  private notifyProvider(provider: 'elevenlabs' | 'webspeech') {
    this.provider = provider;
    this.listeners.forEach(l => l.onProviderChange?.(provider));
  }

  public async checkStatus(): Promise<{ configured: boolean; voiceId: string }> {
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        this.customVoiceId = data.currentVoiceId || '';
        if (data.elevenlabsConfigured) {
          this.notifyProvider('elevenlabs');
          return { configured: true, voiceId: data.currentVoiceId };
        }
      }
    } catch {
      // Offline or server not running proxy
    }
    this.notifyProvider('webspeech');
    return { configured: false, voiceId: '' };
  }

  public isSpeaking(): boolean {
    return this.isSpeakingInternal;
  }

  public getProvider(): 'elevenlabs' | 'webspeech' {
    return this.provider;
  }

  // Stop everything immediately
  public stopAll() {
    this.activeSequenceId++; // Invalidates any pending promise chains

    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    this.currentUtterance = null;

    this.notifyHighlight(null);
    this.notifyState('idle');
  }

  // Core synthesis function for a single string of text
  public async speakText(text: string): Promise<void> {
    const sequenceId = this.activeSequenceId;
    this.notifyState('speaking');

    // Try ElevenLabs via backend first
    let audioUrl = this.blobCache.get(text);

    if (!audioUrl) {
      try {
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, voiceId: this.customVoiceId }),
        });

        if (res.ok) {
          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('audio/mpeg')) {
            const blob = await res.blob();
            audioUrl = URL.createObjectURL(blob);
            this.blobCache.set(text, audioUrl);
            this.notifyProvider('elevenlabs');
          } else {
            // Probably fallback json returned
            const data = await res.json();
            if (data.fallback) {
              this.notifyProvider('webspeech');
            }
          }
        }
      } catch {
        this.notifyProvider('webspeech');
      }
    }

    // Check if stopped while fetching
    if (sequenceId !== this.activeSequenceId) {
      return;
    }

    // If we have an ElevenLabs audio URL, play it
    if (audioUrl) {
      return new Promise<void>((resolve) => {
        const audio = new Audio(audioUrl);
        this.currentAudio = audio;

        audio.onended = () => {
          if (this.currentAudio === audio) {
            this.currentAudio = null;
          }
          resolve();
        };

        audio.onerror = () => {
          if (this.currentAudio === audio) {
            this.currentAudio = null;
          }
          // Fallback to Web Speech on playback error
          this.speakWebSpeech(text, sequenceId).then(resolve);
        };

        audio.play().catch(() => {
          // Auto-play policy blocked or user didn't interact yet
          this.speakWebSpeech(text, sequenceId).then(resolve);
        });
      });
    }

    // Otherwise, speak via Web Speech API fallback
    return this.speakWebSpeech(text, sequenceId);
  }

  // High quality Web Speech fallback with Colombian/Latin American teacher tuning
  private speakWebSpeech(text: string, sequenceId: number): Promise<void> {
    if (!('speechSynthesis' in window)) {
      this.notifyState('idle');
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      this.currentUtterance = utterance;

      // Select the most human-like Spanish voice, prioritizing Colombian Neural voices
      const voices = window.speechSynthesis.getVoices();
      const spanishVoices = voices.filter(v => v.lang.toLowerCase().startsWith('es'));

      // 1. Check for Microsoft Salome / Natural Colombian voices in Edge & Windows
      const naturalColombian = spanishVoices.find(v => {
        const name = v.name.toLowerCase();
        return (name.includes('colombia') || v.lang.toLowerCase().includes('co')) &&
               (name.includes('natural') || name.includes('online') || name.includes('salome') || name.includes('gonzalo'));
      });

      // 2. Any Colombian voice
      const standardColombian = spanishVoices.find(v =>
        v.lang.toLowerCase().includes('co') || v.name.toLowerCase().includes('colombia')
      );

      // 3. Neural / Natural Spanish female voices (very human)
      const naturalSpanish = spanishVoices.find(v => {
        const name = v.name.toLowerCase();
        return name.includes('natural') || name.includes('neural') || name.includes('dalia') || name.includes('sabina');
      });

      // 4. Latin American Spanish
      const latinVoice = spanishVoices.find(v => {
        const name = v.name.toLowerCase();
        const lang = v.lang.toLowerCase();
        return lang.includes('419') || lang.includes('us') || lang.includes('mx') ||
               name.includes('monica') || name.includes('paulina') || name.includes('camila') ||
               name.includes('sofia') || name.includes('google español');
      });

      const chosenVoice = naturalColombian || standardColombian || naturalSpanish || latinVoice || spanishVoices[0];

      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }
      utterance.lang = chosenVoice ? chosenVoice.lang : 'es-CO';
      utterance.rate = 0.94; // Natural human cadence for 1st grade
      utterance.pitch = 1.04; // Natural, warm human pitch (not robotic or childishly artificial)

      utterance.onend = () => {
        if (sequenceId === this.activeSequenceId) {
          resolve();
        }
      };

      utterance.onerror = () => {
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  }

  // Pre-load audio for a question in background
  public preloadText(text: string) {
    if (this.blobCache.has(text)) return;
    fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voiceId: this.customVoiceId }),
    })
      .then(res => {
        if (res.ok && res.headers.get('content-type')?.includes('audio/mpeg')) {
          return res.blob();
        }
        return null;
      })
      .then(blob => {
        if (blob) {
          this.blobCache.set(text, URL.createObjectURL(blob));
        }
      })
      .catch(() => {
        // Safe ignore
      });
  }

  // Full Question Narration Sequence
  public async narrateFullQuestion(
    question: Question,
    isFirstQuestion: boolean = false
  ): Promise<void> {
    this.stopAll();
    const seqId = ++this.activeSequenceId;

    try {
      this.notifyState('speaking');

      // Colombian teacher intros with natural warmth
      const intros = [
        `¡Pilas pues! Vamos con la siguiente pregunta. Escucha con mucha atención: ${question.spokenQuestion}`,
        `¡Ojo al dato! Escucha muy bien a tu profe: ${question.spokenQuestion}`,
        `¡Vamos súper bien! Escucha con atención la siguiente pregunta: ${question.spokenQuestion}`,
      ];
      const randomIntro = intros[question.questionNumber % intros.length];

      const intro = isFirstQuestion
        ? `¡Vamos con toda a comenzar! Escucha con mucha atención a tu profe: ${question.spokenQuestion}`
        : randomIntro;

      await this.speakText(intro);
      if (seqId !== this.activeSequenceId) return;

      // Small pause
      await this.sleep(350);
      if (seqId !== this.activeSequenceId) return;

      // 2. Options narration with synchronized card highlighting
      await this.narrateOptionsOnly(question.options, seqId);
    } finally {
      if (seqId === this.activeSequenceId) {
        this.notifyHighlight(null);
        this.notifyState('idle');
      }
    }
  }

  // Repeat just the Question Prompt
  public async narrateQuestionOnly(question: Question): Promise<void> {
    this.stopAll();
    const seqId = ++this.activeSequenceId;

    try {
      this.notifyState('speaking');
      const text = `Escucha la pregunta: ${question.spokenQuestion}`;
      await this.speakText(text);
    } finally {
      if (seqId === this.activeSequenceId) {
        this.notifyHighlight(null);
        this.notifyState('idle');
      }
    }
  }

  // Repeat only the 3 options and call to action
  public async narrateOptionsOnly(options: Option[], externalSeqId?: number): Promise<void> {
    if (!externalSeqId) {
      this.stopAll();
    }
    const seqId = externalSeqId || ++this.activeSequenceId;

    try {
      this.notifyState('speaking');

      for (const opt of options) {
        if (seqId !== this.activeSequenceId) return;

        // Highlight this specific option card visually!
        this.notifyHighlight(opt.color);

        const phrase = `La opción ${opt.color} dice: ${opt.spokenLabel}`;
        await this.speakText(phrase);

        if (seqId !== this.activeSequenceId) return;
        await this.sleep(250);
      }

      if (seqId !== this.activeSequenceId) return;
      this.notifyHighlight(null);

      // Prompt to choose
      const promptPhrase = 'Ahora piensa muy bien. ¡Toca el color que tiene la respuesta correcta!';
      await this.speakText(promptPhrase);
    } finally {
      if (!externalSeqId && seqId === this.activeSequenceId) {
        this.notifyHighlight(null);
        this.notifyState('idle');
      }
    }
  }

  // Feedback on Correct Answer with authentic Colombian teacher warmth
  public async narrateCorrectFeedback(): Promise<void> {
    this.stopAll();
    const seqId = ++this.activeSequenceId;
    const cheers = [
      '¡Eso es! ¡Excelente trabajo, qué pilo eres!',
      '¡Muy bien! ¡Lo hiciste de maravilla, te felicito!',
      '¡Genial! ¡Super bien, campeón!',
      '¡Eso! ¡Respuesta perfecta, estás volando!',
    ];
    const phrase = cheers[Math.floor(Math.random() * cheers.length)];

    try {
      this.notifyState('speaking');
      await this.speakText(phrase);
    } finally {
      if (seqId === this.activeSequenceId) {
        this.notifyState('idle');
      }
    }
  }

  // Feedback on Incorrect Answer (non-punitive, warm, encouraging Colombian teacher tone)
  public async narrateIncorrectFeedback(): Promise<void> {
    this.stopAll();
    const seqId = ++this.activeSequenceId;
    const encourages = [
      '¡Tranquilo, no te preocupes! Sigue adelante con ánimo, que de los errores también aprendemos. ¡Vamos con la siguiente!',
      '¡No te preocupes, mi corazón! Sigue aprendiendo con alegría. ¡Vamos con la siguiente!',
      '¡Buen intento! Ánimo que en la próxima nos va mucho mejor. ¡Vamos pues!',
    ];
    const phrase = encourages[Math.floor(Math.random() * encourages.length)];

    try {
      this.notifyState('speaking');
      await this.speakText(phrase);
    } finally {
      if (seqId === this.activeSequenceId) {
        this.notifyState('idle');
      }
    }
  }

  // Welcome Narration
  public async narrateWelcome(): Promise<void> {
    this.stopAll();
    const seqId = ++this.activeSequenceId;
    try {
      this.notifyState('speaking');
      const text =
        '¡Hola, mis campeones y campeonas! ¡Qué alegría tenerlos aquí! Hoy vamos a demostrar todo lo pilos que somos con los computadores. Escuchen con mucha atención a su profe y toquen el color de la respuesta correcta. ¡Vamos con toda a jugar!';
      await this.speakText(text);
    } finally {
      if (seqId === this.activeSequenceId) {
        this.notifyState('idle');
      }
    }
  }

  // Final Results Narration
  public async narrateResults(studentName: string, score: number, isPassing: boolean): Promise<void> {
    this.stopAll();
    const seqId = ++this.activeSequenceId;
    try {
      this.notifyState('speaking');
      let text = '';
      if (isPassing) {
        text = `¡Felicitaciones, qué orgullo, ${studentName}! Sacaste una calificación de ${score} sobre diez. ¡Eres un verdadero experto en informática!`;
      } else {
        text = `¡Hiciste un gran esfuerzo, ${studentName}! Sacaste una calificación de ${score} sobre diez. Con un poquito más de práctica lo vas a lograr facilito. ¡Mucho ánimo y pa'lante!`;
      }
      await this.speakText(text);
    } finally {
      if (seqId === this.activeSequenceId) {
        this.notifyState('idle');
      }
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const ttsClient = new TTSClientService();

