import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { QuizAttempt } from '../types';
import { Mascot } from './Mascot';
import { Trophy, RotateCcw, BarChart2, Star, Award, Volume2, UserCheck } from 'lucide-react';
import { soundEffects } from '../services/soundEffects';
import { ttsClient } from '../services/ttsClient';

interface ResultsScreenProps {
  currentAttempt: QuizAttempt;
  bestScore: number;
  isSpeaking: boolean;
  totalQuestions?: number;
  onPlayAgain: () => void;
  onViewHistory: () => void;
  onChangeStudent: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  currentAttempt,
  bestScore,
  isSpeaking,
  totalQuestions,
  onPlayAgain,
  onViewHistory,
  onChangeStudent,
}) => {
  const total = totalQuestions || (currentAttempt.correctCount + currentAttempt.incorrectCount) || 21;
  const isApproved = currentAttempt.score >= 6.0;

  useEffect(() => {
    if (isApproved) {
      soundEffects.playFanfare();
      // Grand celebratory confetti
      try {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#FACC15', '#38BDF8', '#4ADE80', '#F43F5E', '#A855F7'],
        });
      } catch {
        // safe ignore
      }
    } else {
      soundEffects.playEncouraging();
    }

    // Narrate spoken results
    ttsClient.narrateResults(currentAttempt.studentName, currentAttempt.score, isApproved);

    return () => {
      ttsClient.stopAll();
    };
  }, [currentAttempt]);

  const handleRepeatVoice = () => {
    soundEffects.playPop();
    ttsClient.narrateResults(currentAttempt.studentName, currentAttempt.score, isApproved);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[95vh] py-6 px-4 max-w-2xl mx-auto select-none">
      <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-indigo-300 text-center relative overflow-hidden">
        {/* Background confetti glows */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-200 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-emerald-200 rounded-full blur-3xl opacity-60 pointer-events-none" />

        {/* Mascot */}
        <div className="flex justify-center mb-2">
          <Mascot
            emotion={isApproved ? 'celebrating' : 'encouraging'}
            isSpeaking={isSpeaking}
            size="lg"
          />
        </div>

        {/* Student Name */}
        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-950 font-black px-4 py-1.5 rounded-full text-sm sm:text-base mb-3 border border-indigo-300">
          <span>🎒</span>
          <span>{currentAttempt.studentName}</span>
          <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">
            Intento #{currentAttempt.attemptNumber}
          </span>
        </div>

        {/* Big Celebration or Encouraging Title */}
        {isApproved ? (
          <div>
            <div className="flex items-center justify-center gap-2 text-amber-500 mb-1">
              <Star className="w-7 h-7 fill-amber-400 animate-spin-slow" />
              <Award className="w-10 h-10 text-amber-500 animate-bounce" />
              <Star className="w-7 h-7 fill-amber-400 animate-spin-slow" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-emerald-600 tracking-tight leading-tight">
              ¡FELICITACIONES! 🏆
            </h1>
            <p className="text-lg sm:text-2xl font-black text-indigo-900 mt-1">
              ¡ERES UN GRAN EXPERTO EN INFORMÁTICA! ⭐
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-center gap-2 text-amber-500 mb-1">
              <Star className="w-8 h-8 fill-amber-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-amber-600 tracking-tight leading-tight">
              ¡MUY BUEN ESFUERZO! 🚀
            </h1>
            <p className="text-lg sm:text-xl font-black text-indigo-900 mt-1">
              ¡SIGUE PRACTICANDO Y LO LOGRARÁS! 💡
            </p>
          </div>
        )}

        {/* Big Score Card on 0-10 Scale */}
        <div className="my-5 p-5 rounded-3xl bg-gradient-to-b from-slate-50 to-indigo-50 border-3 border-indigo-200 shadow-inner">
          <div className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-1">
            Tu Calificación Final
          </div>
          <div className="flex items-baseline justify-center gap-2">
            <span
              className={`text-5xl sm:text-7xl font-black tracking-tight ${
                isApproved ? 'text-emerald-600' : 'text-amber-600'
              }`}
            >
              {currentAttempt.score.toFixed(1)}
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-400">/ 10.0</span>
          </div>

          {/* Status Badge */}
          <div className="mt-2">
            <span
              className={`inline-block px-5 py-1.5 rounded-full text-sm sm:text-base font-black uppercase tracking-wider shadow-md ${
                isApproved
                  ? 'bg-emerald-500 text-white border-2 border-emerald-600'
                  : 'bg-amber-400 text-amber-950 border-2 border-amber-500'
              }`}
            >
              {currentAttempt.status}
            </span>
          </div>
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-4">
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-3">
            <span className="text-xs font-bold text-emerald-800">Correctas</span>
            <p className="text-xl sm:text-2xl font-black text-emerald-600">
              {currentAttempt.correctCount} / {total}
            </p>
          </div>

          <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-3">
            <span className="text-xs font-bold text-rose-800">Por mejorar</span>
            <p className="text-xl sm:text-2xl font-black text-rose-500">
              {currentAttempt.incorrectCount}
            </p>
          </div>

          <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-3">
            <span className="text-xs font-bold text-sky-800">Intento</span>
            <p className="text-xl sm:text-2xl font-black text-sky-700">
              #{currentAttempt.attemptNumber}
            </p>
          </div>

          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3">
            <span className="text-xs font-bold text-amber-800">Mejor nota</span>
            <p className="text-xl sm:text-2xl font-black text-amber-600">
              {bestScore.toFixed(1)}
            </p>
          </div>
        </div>

        {/* Repeat Voice Button */}
        <div className="flex justify-center mb-5">
          <button
            type="button"
            onClick={handleRepeatVoice}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-sm border border-amber-300 transition-all cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>Escuchar mensaje de nuevo 🔊</span>
          </button>
        </div>

        {/* Action Buttons: Volver a jugar & Ver mis resultados */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          {/* VOLVER A JUGAR */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              onPlayAgain();
            }}
            className="w-full sm:w-1/2 py-4 px-6 rounded-3xl game-btn-green text-white font-black text-lg sm:text-xl uppercase tracking-wider border-3 border-emerald-600 cursor-pointer transition-transform hover:scale-102 active:scale-98 shadow-xl flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-6 h-6" />
            <span>VOLVER A JUGAR</span>
          </button>

          {/* VER MIS RESULTADOS */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              onViewHistory();
            }}
            className="w-full sm:w-1/2 py-4 px-6 rounded-3xl game-btn-blue text-white font-black text-lg sm:text-xl uppercase tracking-wider border-3 border-sky-600 cursor-pointer transition-transform hover:scale-102 active:scale-98 shadow-xl flex items-center justify-center gap-2"
          >
            <BarChart2 className="w-6 h-6" />
            <span>VER RESULTADOS</span>
          </button>
        </div>

        {/* Change Student link */}
        <div className="mt-4 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              onChangeStudent();
            }}
            className="text-xs sm:text-sm font-bold text-slate-500 hover:text-indigo-600 flex items-center justify-center gap-1 mx-auto cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>¿Jugar con otro estudiante? Haz clic aquí</span>
          </button>
        </div>
      </div>
    </div>
  );
};

