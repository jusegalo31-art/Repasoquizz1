import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Question, Option, OptionColor } from '../types';
import { Mascot, MascotEmotion } from './Mascot';
import { ProgressBar } from './ProgressBar';
import { AudioControls } from './AudioControls';
import { OptionCard } from './OptionCard';
import { WrittenPartsQuestion } from './WrittenPartsQuestion';
import { soundEffects } from '../services/soundEffects';
import { ttsClient } from '../services/ttsClient';

interface QuizScreenProps {
  questions: Question[];
  currentQuestionIndex: number;
  studentName: string;
  isSpeaking: boolean;
  highlightedColor: OptionColor | null;
  onAnswerSelected: (questionId: number, selectedOption: Option) => void;
  onNextQuestion: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  questions,
  currentQuestionIndex,
  studentName,
  isSpeaking,
  highlightedColor,
  onAnswerSelected,
  onNextQuestion,
}) => {
  const currentQuestion = questions[currentQuestionIndex];
  const isWrittenQuestion = currentQuestion.type === 'written-parts';
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [mascotEmotion, setMascotEmotion] = useState<MascotEmotion>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [isLastSubmissionCorrect, setIsLastSubmissionCorrect] = useState<boolean>(false);

  // Start narration for this question when question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setMascotEmotion('idle');
    setFeedbackMessage('');
    setIsLastSubmissionCorrect(false);

    // Narrate question and options automatically
    ttsClient.narrateFullQuestion(currentQuestion, currentQuestionIndex === 0);

    return () => {
      ttsClient.stopAll();
    };
  }, [currentQuestionIndex]);

  const handleSelectOption = async (option: Option) => {
    if (isAnswerSubmitted) return; // Prevent double taps or changing answer

    setIsAnswerSubmitted(true);
    setSelectedOption(option);
    setIsLastSubmissionCorrect(option.isCorrect);
    ttsClient.stopAll(); // Silence any question reading immediately

    onAnswerSelected(currentQuestion.id, option);

    if (option.isCorrect) {
      // Correct!
      soundEffects.playCorrect();
      setMascotEmotion('celebrating');
      setFeedbackMessage('¡MUY BIEN! ¡EXCELENTE TRABAJO! ⭐');

      // Burst of confetti
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FACC15', '#38BDF8', '#4ADE80', '#F43F5E'],
        });
      } catch {
        // safe ignore
      }

      // Voice feedback
      await ttsClient.narrateCorrectFeedback();

      // Wait a moment so student enjoys their achievement
      setTimeout(() => {
        onNextQuestion();
      }, 1800);
    } else {
      // Incorrect (encouraging, non-punitive!)
      soundEffects.playEncouraging();
      setMascotEmotion('encouraging');
      setFeedbackMessage('¡NO TE PREOCUPES! SIGUE APRENDIENDO 💛');

      // Voice feedback
      await ttsClient.narrateIncorrectFeedback();

      // Wait a moment so student hears the encouragement
      setTimeout(() => {
        onNextQuestion();
      }, 2400);
    }
  };

  const handleWrittenAnswerSubmitted = async (isAllCorrect: boolean, summaryText: string) => {
    if (isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    setIsLastSubmissionCorrect(isAllCorrect);
    ttsClient.stopAll();

    const syntheticOption: Option = {
      id: 'q26-written',
      text: summaryText,
      color: 'azul',
      isCorrect: isAllCorrect,
      illustrationKey: 'computer',
      spokenLabel: summaryText,
    };

    onAnswerSelected(currentQuestion.id, syntheticOption);

    if (isAllCorrect) {
      soundEffects.playCorrect();
      setMascotEmotion('celebrating');
      setFeedbackMessage('¡EXCELENTE! ¡ESCRIBISTE LAS 4 PARTES DEL COMPUTADOR CORRECTAMENTE! 🌟');

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#FACC15', '#38BDF8', '#4ADE80', '#F43F5E'],
        });
      } catch {
        // safe ignore
      }

      await ttsClient.narrateCorrectFeedback();

      setTimeout(() => {
        onNextQuestion();
      }, 2200);
    } else {
      soundEffects.playEncouraging();
      setMascotEmotion('encouraging');
      setFeedbackMessage(
        '¡BUEN ESFUERZO! Las 4 partes son: Pantalla (Monitor), Torre (CPU), Teclado y Ratón (Mouse) 💛'
      );

      await ttsClient.narrateIncorrectFeedback();

      setTimeout(() => {
        onNextQuestion();
      }, 3200);
    }
  };

  const handleRepeatQuestion = () => {
    if (isAnswerSubmitted) return;
    soundEffects.playPop();
    ttsClient.narrateQuestionOnly(currentQuestion);
  };

  const handleRepeatOptions = () => {
    if (isAnswerSubmitted) return;
    soundEffects.playPop();
    if (isWrittenQuestion) {
      ttsClient.narrateQuestionOnly(currentQuestion);
    } else {
      ttsClient.narrateOptionsOnly(currentQuestion.options);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen py-4 px-3 sm:px-4 max-w-4xl mx-auto select-none">
      {/* 1. Header with Progress Bar */}
      <ProgressBar
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        studentName={studentName}
      />

      {/* 2. Mascot & Voice Controls Area */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 my-1">
        <Mascot
          emotion={mascotEmotion}
          isSpeaking={isSpeaking}
          size="sm"
          className="shrink-0"
        />

        <div className="flex flex-col items-center sm:items-start">
          <AudioControls
            isSpeaking={isSpeaking}
            onRepeatQuestion={handleRepeatQuestion}
            onRepeatOptions={handleRepeatOptions}
            disabled={isAnswerSubmitted}
          />
        </div>
      </div>

      {/* 3. Question Card */}
      <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-6 shadow-xl border-4 border-indigo-200 text-center my-2 relative">
        <div className="inline-block bg-indigo-100 text-indigo-900 px-3.5 py-1 rounded-full text-xs sm:text-sm font-extrabold uppercase mb-2">
          Evaluación Final • Pregunta #{currentQuestionIndex + 1} de {questions.length}
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 leading-snug">
          {currentQuestion.promptText}
        </h2>

        {/* Dynamic visual feedback banner if answered */}
        {feedbackMessage && (
          <div
            className={`mt-3 py-2 px-4 rounded-2xl text-center font-black text-sm sm:text-lg animate-star-pop ${
              isLastSubmissionCorrect
                ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-400'
                : 'bg-amber-100 text-amber-900 border-2 border-amber-400'
            }`}
          >
            {feedbackMessage}
          </div>
        )}
      </div>

      {/* 4. Options Grid or Written Parts Input Grid */}
      {isWrittenQuestion ? (
        <WrittenPartsQuestion
          isAnswerSubmitted={isAnswerSubmitted}
          onSubmitWrittenAnswer={handleWrittenAnswerSubmitted}
        />
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 my-2">
          {currentQuestion.options.map((option, idx) => (
            <OptionCard
              key={option.id}
              option={option}
              index={idx}
              isHighlighted={highlightedColor === option.color}
              isSelected={selectedOption?.id === option.id}
              isAnswerSubmitted={isAnswerSubmitted}
              onSelect={handleSelectOption}
            />
          ))}
        </div>
      )}

      {/* Footer prompt hint */}
      <div className="w-full text-center mt-2 pb-2">
        <span className="text-xs sm:text-sm font-extrabold text-white/90 drop-shadow">
          {isWrittenQuestion
            ? '⌨️ Escribe el nombre de las 4 partes del computador y presiona el botón verde'
            : '💡 Toca el color de la respuesta que consideres correcta'}
        </span>
      </div>
    </div>
  );
};
