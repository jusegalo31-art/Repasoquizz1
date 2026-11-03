import React from 'react';
import { Option, OptionColor } from '../types';
import { QuizIllustration } from './illustrations/QuizIllustrations';

interface OptionCardProps {
  option: Option;
  index: number;
  isHighlighted: boolean;
  isSelected: boolean;
  isAnswerSubmitted: boolean;
  onSelect: (option: Option) => void;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  option,
  isHighlighted,
  isSelected,
  isAnswerSubmitted,
  onSelect,
}) => {
  const colorStyles: Record<
    OptionColor,
    {
      cardBg: string;
      borderColor: string;
      shadowClass: string;
      badgeBg: string;
      badgeText: string;
      colorName: string;
      highlightRing: string;
    }
  > = {
    amarillo: {
      cardBg: 'bg-amber-100 hover:bg-amber-50 active:bg-amber-200',
      borderColor: 'border-amber-400',
      shadowClass: 'game-btn-yellow text-amber-950',
      badgeBg: 'bg-amber-400 text-amber-950 border-amber-500',
      badgeText: 'Amarillo',
      colorName: 'Amarillo 🟡',
      highlightRing: 'ring-8 ring-amber-300 ring-offset-4 animate-wobble-card scale-105',
    },
    azul: {
      cardBg: 'bg-sky-100 hover:bg-sky-50 active:bg-sky-200',
      borderColor: 'border-sky-400',
      shadowClass: 'game-btn-blue text-sky-950',
      badgeBg: 'bg-sky-400 text-white border-sky-600',
      badgeText: 'Azul',
      colorName: 'Azul 🔵',
      highlightRing: 'ring-8 ring-sky-300 ring-offset-4 animate-wobble-card scale-105',
    },
    rojo: {
      cardBg: 'bg-rose-100 hover:bg-rose-50 active:bg-rose-200',
      borderColor: 'border-rose-400',
      shadowClass: 'game-btn-red text-rose-950',
      badgeBg: 'bg-rose-500 text-white border-rose-700',
      badgeText: 'Rojo',
      colorName: 'Rojo 🔴',
      highlightRing: 'ring-8 ring-rose-300 ring-offset-4 animate-wobble-card scale-105',
    },
  };

  const style = colorStyles[option.color];

  // Feedback styles after answering
  let feedbackClasses = '';
  if (isAnswerSubmitted) {
    if (isSelected) {
      if (option.isCorrect) {
        feedbackClasses = 'ring-8 ring-emerald-400 bg-emerald-100 scale-105 shadow-2xl';
      } else {
        feedbackClasses = 'opacity-85 ring-4 ring-amber-300 bg-amber-50';
      }
    } else {
      feedbackClasses = 'opacity-50 grayscale-25';
    }
  }

  return (
    <button
      type="button"
      disabled={isAnswerSubmitted}
      onClick={() => onSelect(option)}
      className={`group relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-3xl border-4 ${
        style.borderColor
      } ${style.cardBg} ${isHighlighted ? style.highlightRing : ''} ${feedbackClasses} ${
        !isAnswerSubmitted ? 'cursor-pointer transition-all duration-200 hover:-translate-y-1 active:translate-y-1 shadow-lg' : ''
      } w-full min-h-[170px] sm:min-h-[210px] md:min-h-[230px]`}
    >
      {/* Color Banner Badge on top */}
      <div className="w-full flex items-center justify-between gap-2 mb-2">
        <span
          className={`px-3 py-1 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider border-2 shadow-sm ${style.badgeBg}`}
        >
          {style.colorName}
        </span>

        {/* Highlight wave icon if this option is being read */}
        {isHighlighted && (
          <span className="flex items-center gap-1 text-xs font-bold text-slate-800 bg-white/90 px-2 py-0.5 rounded-full border border-slate-300 animate-pulse">
            <span>👂</span>
            <span>Escuchando</span>
          </span>
        )}

        {/* Selected badge */}
        {isAnswerSubmitted && isSelected && (
          <span
            className={`px-3 py-0.5 rounded-full text-xs font-black shadow-md ${
              option.isCorrect ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-slate-900'
            }`}
          >
            {option.isCorrect ? '¡CORRECTO! ⭐' : 'Elegiste esta 💛'}
          </span>
        )}
      </div>

      {/* Large visual illustration */}
      <div className="flex-1 flex items-center justify-center my-1 transition-transform group-hover:scale-105">
        <QuizIllustration name={option.illustrationKey} className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 drop-shadow-md" />
      </div>

      {/* Label Text for children */}
      <div className="w-full mt-2 bg-white/90 rounded-2xl py-2 px-3 border border-slate-200 shadow-inner">
        <p className="text-center font-bold text-slate-800 text-sm sm:text-base md:text-lg leading-snug">
          {option.text}
        </p>
      </div>
    </button>
  );
};

