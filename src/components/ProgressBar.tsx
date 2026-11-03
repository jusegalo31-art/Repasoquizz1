import React from 'react';
import { Star } from 'lucide-react';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  studentName?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentQuestion,
  totalQuestions,
  studentName,
}) => {
  const percentage = Math.round((currentQuestion / totalQuestions) * 100);

  return (
    <div className="w-full bg-white/90 backdrop-blur-sm rounded-3xl p-3 sm:p-4 shadow-lg border-2 border-indigo-200 select-none mb-3">
      <div className="flex items-center justify-between gap-2 mb-2">
        {/* Student name pill */}
        <div className="flex items-center gap-1.5 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
          <span className="text-base sm:text-lg">🎒</span>
          <span className="font-extrabold text-indigo-950 text-xs sm:text-sm truncate max-w-[140px] sm:max-w-[200px]">
            {studentName || 'Estudiante'}
          </span>
        </div>

        {/* Question Counter: Pregunta X de 15 */}
        <div className="flex items-center gap-1.5 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
          <Star className="w-4 h-4 text-amber-600 fill-amber-500 animate-spin-slow" />
          <span className="font-black text-amber-950 text-xs sm:text-sm">
            Pregunta {currentQuestion} de {totalQuestions}
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="relative w-full h-4 sm:h-5 bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500 rounded-full transition-all duration-500 ease-out shadow"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* 15 mini milestone stars for kids */}
      <div className="hidden sm:flex items-center justify-between px-1 mt-1.5">
        {Array.from({ length: totalQuestions }).map((_, idx) => {
          const isDone = idx < currentQuestion;
          const isCurrent = idx === currentQuestion - 1;
          return (
            <span
              key={idx}
              className={`text-xs transition-transform ${
                isCurrent
                  ? 'scale-130 text-amber-500 font-bold animate-bounce'
                  : isDone
                  ? 'text-emerald-500 opacity-90'
                  : 'text-slate-300'
              }`}
              title={`Pregunta ${idx + 1}`}
            >
              ★
            </span>
          );
        })}
      </div>
    </div>
  );
};

