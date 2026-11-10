import { useState, useEffect, useRef } from 'react';
import { ScreenState, Option, OptionColor, QuizAttempt } from './types';
import { QUESTIONS_DATA } from './data/questions';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { HistoryModal } from './components/HistoryModal';
import { TeacherSettingsModal } from './components/TeacherSettingsModal';
import { ttsClient } from './services/ttsClient';
import { saveAttempt, getBestScoreForStudent, canStudentAttempt } from './services/storage';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('start');
  const [studentName, setStudentName] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [, setAnswers] = useState<{ questionId: number; selectedOptionId: string; isCorrect: boolean }[]>([]);
  const answersRef = useRef<{ questionId: number; selectedOptionId: string; isCorrect: boolean }[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState<QuizAttempt | null>(null);

  // Voice narration states
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [highlightedColor, setHighlightedColor] = useState<OptionColor | null>(null);

  // Modals
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Preload and subscribe to TTS events
  useEffect(() => {
    const unsubscribe = ttsClient.subscribe({
      onStateChange: state => setIsSpeaking(state === 'speaking'),
      onHighlightColor: color => setHighlightedColor(color),
    });

    // Preload first question text in background
    if (QUESTIONS_DATA.length > 0) {
      ttsClient.preloadText(QUESTIONS_DATA[0].spokenQuestion);
    }

    return () => {
      unsubscribe();
      ttsClient.stopAll();
    };
  }, []);

  // 1. Start Quiz handler (enforces max 2 attempts)
  const handleStartQuiz = (name: string) => {
    if (!canStudentAttempt(name)) {
      setIsHistoryOpen(true);
      return;
    }
    setStudentName(name);
    setCurrentQuestionIndex(0);
    answersRef.current = [];
    setAnswers([]);
    setCurrentAttempt(null);
    setScreen('quiz');
  };

  // 2. Play Welcome Voice on Start screen
  const handlePlayWelcome = () => {
    ttsClient.narrateWelcome();
  };

  // 3. Option Selection in Quiz
  const handleAnswerSelected = (questionId: number, selectedOption: Option) => {
    const entry = {
      questionId,
      selectedOptionId: selectedOption.id,
      isCorrect: selectedOption.isCorrect,
    };
    answersRef.current = [...answersRef.current, entry];
    setAnswers(answersRef.current);
  };

  // 4. Advance to Next Question or Final Results
  const handleNextQuestion = () => {
    const nextIdx = currentQuestionIndex + 1;
    if (nextIdx < QUESTIONS_DATA.length) {
      setCurrentQuestionIndex(nextIdx);
    } else {
      // Quiz finished: Calculate final score and persist attempt!
      finishQuiz();
    }
  };

  // 5. Complete Quiz & Persist
  const finishQuiz = () => {
    const currentAnswers = answersRef.current;
    const correctCount = currentAnswers.filter(a => a.isCorrect).length;
    const incorrectCount = QUESTIONS_DATA.length - correctCount;

    const savedAttempt = saveAttempt(
      studentName,
      correctCount,
      incorrectCount,
      currentAnswers,
      QUESTIONS_DATA.length
    );
    setCurrentAttempt(savedAttempt);
    setScreen('results');
  };

  // 6. Play Again (same student, 2nd attempt if allowed)
  const handlePlayAgain = () => {
    if (!canStudentAttempt(studentName)) {
      setScreen('start');
      return;
    }
    setCurrentQuestionIndex(0);
    answersRef.current = [];
    setAnswers([]);
    setCurrentAttempt(null);
    setScreen('quiz');
  };

  // 7. Change Student
  const handleChangeStudent = () => {
    ttsClient.stopAll();
    setScreen('start');
  };

  const bestScore = studentName ? getBestScoreForStudent(studentName) ?? currentAttempt?.score ?? 0 : 0;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-sky-400 via-indigo-400 to-purple-500 font-sans">
      {screen === 'start' && (
        <StartScreen
          onStartQuiz={handleStartQuiz}
          onOpenHistory={() => setIsHistoryOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onPlayWelcomeVoice={handlePlayWelcome}
          isSpeaking={isSpeaking}
        />
      )}

      {screen === 'quiz' && (
        <QuizScreen
          questions={QUESTIONS_DATA}
          currentQuestionIndex={currentQuestionIndex}
          studentName={studentName}
          isSpeaking={isSpeaking}
          highlightedColor={highlightedColor}
          onAnswerSelected={handleAnswerSelected}
          onNextQuestion={handleNextQuestion}
        />
      )}

      {screen === 'results' && currentAttempt && (
        <ResultsScreen
          currentAttempt={currentAttempt}
          bestScore={bestScore}
          isSpeaking={isSpeaking}
          totalQuestions={QUESTIONS_DATA.length}
          onPlayAgain={handlePlayAgain}
          onViewHistory={() => setIsHistoryOpen(true)}
          onChangeStudent={handleChangeStudent}
        />
      )}

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        currentStudentName={studentName}
      />

      {/* Teacher Settings Modal */}
      <TeacherSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
