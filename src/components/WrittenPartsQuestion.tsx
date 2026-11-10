import React, { useState } from 'react';
import { QuizIllustration } from './illustrations/QuizIllustrations';
import { CheckCircle2, Sparkles, Send } from 'lucide-react';
import { soundEffects } from '../services/soundEffects';

export type CanonicalComputerPart = 'monitor' | 'cpu' | 'teclado' | 'mouse';

interface PartSlot {
  id: CanonicalComputerPart;
  illustrationKey: string;
  hintLabel: string;
  acceptedExamples: string;
  borderColor: string;
  bgColor: string;
  badgeColor: string;
}

const PART_SLOTS: PartSlot[] = [
  {
    id: 'monitor',
    illustrationKey: 'monitor',
    hintLabel: '1. Parte donde vemos todo',
    acceptedExamples: 'Pantalla o Monitor',
    borderColor: 'border-sky-400',
    bgColor: 'bg-sky-50',
    badgeColor: 'bg-sky-500 text-white',
  },
  {
    id: 'cpu',
    illustrationKey: 'cpu',
    hintLabel: '2. El cerebro del computador',
    acceptedExamples: 'Torre o CPU',
    borderColor: 'border-amber-400',
    bgColor: 'bg-amber-50',
    badgeColor: 'bg-amber-400 text-amber-950',
  },
  {
    id: 'teclado',
    illustrationKey: 'keyboard',
    hintLabel: '3. Parte con letras y números',
    acceptedExamples: 'Teclado',
    borderColor: 'border-rose-400',
    bgColor: 'bg-rose-50',
    badgeColor: 'bg-rose-500 text-white',
  },
  {
    id: 'mouse',
    illustrationKey: 'mouse',
    hintLabel: '4. Parte que mueve la flechita',
    acceptedExamples: 'Mouse o Ratón',
    borderColor: 'border-emerald-400',
    bgColor: 'bg-emerald-50',
    badgeColor: 'bg-emerald-500 text-white',
  },
];

// Normalize string: lowercase, remove accents/tildes, remove punctuation and extra spaces
export function normalizePartInput(raw: string): string {
  return raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // removes tildes: ratón -> raton
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Identify which of the 4 main computer parts a child's text refers to
export function detectCanonicalPart(raw: string): CanonicalComputerPart | null {
  const norm = normalizePartInput(raw);
  if (!norm) return null;

  // Check Monitor / Pantalla
  if (norm.includes('monitor') || norm.includes('pantalla')) {
    return 'monitor';
  }

  // Check Torre / CPU
  if (
    norm.includes('torre') ||
    norm.includes('cpu') ||
    norm.includes('c p u') ||
    norm.includes('gabinete') ||
    norm.includes('unidad central')
  ) {
    return 'cpu';
  }

  // Check Teclado
  if (norm.includes('teclado')) {
    return 'teclado';
  }

  // Check Mouse / Ratón
  if (
    norm.includes('mouse') ||
    norm.includes('raton') ||
    norm.includes('maus') ||
    norm.includes('mause') ||
    norm.includes('mouce')
  ) {
    return 'mouse';
  }

  return null;
}

interface WrittenPartsQuestionProps {
  isAnswerSubmitted: boolean;
  onSubmitWrittenAnswer: (isAllCorrect: boolean, summaryText: string) => void;
}

export const WrittenPartsQuestion: React.FC<WrittenPartsQuestionProps> = ({
  isAnswerSubmitted,
  onSubmitWrittenAnswer,
}) => {
  const [inputs, setInputs] = useState<string[]>(['', '', '', '']);
  const [warningMsg, setWarningMsg] = useState<string>('');
  const [boxResults, setBoxResults] = useState<(boolean | null)[]>([null, null, null, null]);

  const handleChange = (index: number, value: string) => {
    if (isAnswerSubmitted) return;
    const next = [...inputs];
    next[index] = value;
    setInputs(next);
    if (warningMsg) setWarningMsg('');
  };

  const handleCheckAnswers = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAnswerSubmitted) return;

    // Ensure all 4 boxes have something written before grading
    const hasEmpty = inputs.some(val => val.trim().length === 0);
    if (hasEmpty) {
      setWarningMsg('¡Por favor escribe el nombre en las 4 cajitas antes de comprobar tu respuesta! ✏️');
      soundEffects.playEncouraging();
      return;
    }

    // Detect canonical parts written in each box
    const detectedPerBox = inputs.map(val => detectCanonicalPart(val));

    // Check if all 4 distinct parts ('monitor', 'cpu', 'teclado', 'mouse') were written
    // (Validates whether written in the exact box of its drawing OR in any order across the 4 boxes!)
    const usedParts = new Set<CanonicalComputerPart>();
    const resultsPerBox: boolean[] = [false, false, false, false];

    // First pass: check exact slot match
    detectedPerBox.forEach((part, idx) => {
      if (part && part === PART_SLOTS[idx].id && !usedParts.has(part)) {
        usedParts.add(part);
        resultsPerBox[idx] = true;
      }
    });

    // Second pass: allow valid parts written in a different box order as long as they are distinct
    detectedPerBox.forEach((part, idx) => {
      if (!resultsPerBox[idx] && part && !usedParts.has(part)) {
        usedParts.add(part);
        resultsPerBox[idx] = true;
      }
    });

    setBoxResults(resultsPerBox);
    const isAllCorrect = usedParts.size === 4;
    const summaryText = inputs.map(i => i.trim()).join(', ');
    onSubmitWrittenAnswer(isAllCorrect, summaryText);
  };

  return (
    <form onSubmit={handleCheckAnswers} className="w-full my-2">
      <div className="mb-3 bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-3 text-center">
        <p className="text-xs sm:text-sm font-extrabold text-indigo-900 flex items-center justify-center gap-1.5 flex-wrap">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            Observa cada dibujo y escribe su nombre (puedes escribir en mayúscula o minúscula, con o sin tilde).
          </span>
        </p>
      </div>

      {/* 4 Input Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {PART_SLOTS.map((slot, idx) => {
          const isBoxCorrect = boxResults[idx];
          let statusBorder = slot.borderColor;
          let statusBg = slot.bgColor;

          if (isAnswerSubmitted) {
            if (isBoxCorrect) {
              statusBorder = 'border-emerald-500 ring-4 ring-emerald-200';
              statusBg = 'bg-emerald-50';
            } else {
              statusBorder = 'border-amber-400 ring-4 ring-amber-200';
              statusBg = 'bg-amber-50';
            }
          }

          return (
            <div
              key={slot.id}
              className={`flex flex-col items-center p-4 rounded-3xl border-4 ${statusBorder} ${statusBg} shadow-md transition-all`}
            >
              {/* Top Hint Badge */}
              <div className="w-full flex items-center justify-between gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${slot.badgeColor}`}>
                  {slot.hintLabel}
                </span>

                {isAnswerSubmitted && (
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                      isBoxCorrect ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-amber-950'
                    }`}
                  >
                    {isBoxCorrect ? '✓ ¡Correcto!' : `Era: ${slot.acceptedExamples}`}
                  </span>
                )}
              </div>

              {/* Illustration */}
              <div className="my-1">
                <QuizIllustration name={slot.illustrationKey} className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow" />
              </div>

              {/* Text Input */}
              <div className="w-full mt-2">
                <input
                  type="text"
                  disabled={isAnswerSubmitted}
                  value={inputs[idx]}
                  onChange={e => handleChange(idx, e.target.value)}
                  placeholder={`Escribe aquí la parte #${idx + 1}...`}
                  autoComplete="off"
                  spellCheck={false}
                  className="w-full px-4 py-3 rounded-2xl bg-white border-3 border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-200 text-base sm:text-lg font-extrabold text-slate-900 text-center placeholder-slate-400 outline-none transition-all shadow-inner disabled:opacity-80"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Warning if any box is empty */}
      {warningMsg && !isAnswerSubmitted && (
        <div className="mt-3 p-3 rounded-2xl bg-amber-100 border-2 border-amber-400 text-amber-950 font-extrabold text-center text-sm animate-bounce">
          {warningMsg}
        </div>
      )}

      {/* Submit Button */}
      {!isAnswerSubmitted && (
        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-auto min-w-[280px] py-4 px-8 rounded-3xl game-btn-green text-white font-black text-lg sm:text-xl uppercase tracking-wider border-4 border-emerald-600 cursor-pointer transition-transform hover:scale-102 active:scale-98 shadow-xl flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-6 h-6" />
            <span>¡COMPROBAR LAS 4 PARTES!</span>
            <Send className="w-5 h-5" />
          </button>
        </div>
      )}
    </form>
  );
};
