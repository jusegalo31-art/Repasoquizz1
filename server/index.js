import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import { getSpeechAudio, getCachedCount, clearCache, CACHE_DIR } from './ttsService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve cached audio statically if needed
app.use('/audio-cache', express.static(CACHE_DIR));

// 1. Status endpoint
app.get('/api/status', (req, res) => {
  const hasKey = Boolean(process.env.ELEVENLABS_API_KEY && process.env.ELEVENLABS_API_KEY.trim() !== '');
  res.json({
    status: 'ok',
    elevenlabsConfigured: hasKey,
    currentVoiceId: process.env.ELEVENLABS_VOICE_ID || 'pFZP5JQG7iQjIQuC4Bku',
    modelId: process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2',
    cachedFilesCount: getCachedCount(),
  });
});

// 2. TTS endpoint
app.post('/api/tts', async (req, res) => {
  const { text, voiceId } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const result = await getSpeechAudio(text.trim(), voiceId);

    if (result.fallback) {
      // Gracefully signal to frontend to use client SpeechSynthesis fallback
      return res.json({
        fallback: true,
        reason: result.reason,
        message: result.message,
      });
    }

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': result.buffer.length,
      'X-Cache': result.fromCache ? 'HIT' : 'MISS',
      'Cache-Control': 'public, max-age=31536000, immutable',
    });

    return res.send(result.buffer);
  } catch (error) {
    console.error('Error generating audio:', error);
    return res.status(500).json({
      fallback: true,
      error: 'Internal server error while synthesizing audio',
    });
  }
});

// 3. Recommended Voices list
app.get('/api/voices', (req, res) => {
  res.json({
    recommendedVoices: [
      {
        id: 'cgSgspJ2msm6clMCkdW9',
        name: 'Sofia (Recomendada - Acento Colombiano Natural)',
        description: 'Voz humana femenina muy expresiva, cálida y natural para niños de primaria.',
        accent: 'Español Colombiano Cálido y Humano',
      },
      {
        id: 'FGY2WhTYpPnrIDTdsKH5',
        name: 'Laura (Dulce y Paciente)',
        description: 'Ritmo suave y maternal, ideal para explicar con paciencia.',
        accent: 'Español Latinoamericano Infantil',
      },
      {
        id: 'EXAVITQu4vr4xnSDxMaL',
        name: 'Camila (Alegre y Motivadora)',
        description: 'Entonación alegre, motivadora y llena de energía.',
        accent: 'Español alegre y cercano',
      },
      {
        id: 'pFZP5JQG7iQjIQuC4Bku',
        name: 'Carolina (Voz Suave y Pausada)',
        description: 'Pronunciación pausada y clara.',
        accent: 'Español neutro amigable',
      },
    ],
  });
});

// 4. Save configuration from Teacher Settings
app.post('/api/save-config', (req, res) => {
  const { apiKey, voiceId } = req.body;
  const envPath = path.join(__dirname, '..', '.env');

  try {
    let currentEnv = '';
    if (fs.existsSync(envPath)) {
      currentEnv = fs.readFileSync(envPath, 'utf8');
    }

    let updatedEnv = currentEnv;

    if (apiKey !== undefined) {
      process.env.ELEVENLABS_API_KEY = apiKey.trim();
      if (updatedEnv.includes('ELEVENLABS_API_KEY=')) {
        updatedEnv = updatedEnv.replace(/ELEVENLABS_API_KEY=.*/, `ELEVENLABS_API_KEY=${apiKey.trim()}`);
      } else {
        updatedEnv += `\nELEVENLABS_API_KEY=${apiKey.trim()}`;
      }
    }

    if (voiceId !== undefined) {
      process.env.ELEVENLABS_VOICE_ID = voiceId.trim();
      if (updatedEnv.includes('ELEVENLABS_VOICE_ID=')) {
        updatedEnv = updatedEnv.replace(/ELEVENLABS_VOICE_ID=.*/, `ELEVENLABS_VOICE_ID=${voiceId.trim()}`);
      } else {
        updatedEnv += `\nELEVENLABS_VOICE_ID=${voiceId.trim()}`;
      }
    }

    fs.writeFileSync(envPath, updatedEnv.trim() + '\n', 'utf8');

    res.json({
      success: true,
      elevenlabsConfigured: Boolean(process.env.ELEVENLABS_API_KEY && process.env.ELEVENLABS_API_KEY.trim() !== ''),
      currentVoiceId: process.env.ELEVENLABS_VOICE_ID,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update .env: ' + err.message });
  }
});

// 5. Clear Cache
app.post('/api/clear-cache', (req, res) => {
  const result = clearCache();
  res.json(result);
});

// Serve frontend in production (Express 5 SPA fallback)
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api') && !req.path.startsWith('/audio-cache')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Quiz de Informática Backend corriendo en http://localhost:${PORT}`);
  console.log(`🎤 ElevenLabs configurado: ${Boolean(process.env.ELEVENLABS_API_KEY)}`);
  console.log(`📁 Audios en caché: ${getCachedCount()}`);
});
