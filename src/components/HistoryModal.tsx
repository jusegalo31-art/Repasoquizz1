import React, { useState, useEffect } from 'react';
import { QuizAttempt } from '../types';
import { Trophy, X, Trash2, Award, Calendar } from 'lucide-react';
import { getAllAttempts, clearAllAttempts, normalizeStudentName, MAX_ATTEMPTS } from '../services/storage';
import { soundEffects } from '../services/soundEffects';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStudentName?: string;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  currentStudentName,
}) => {
  const [attempts, setAttempts] = useState<QuizAttempt[]>(() => getAllAttempts());

  useEffect(() => {
    if (isOpen) {
      setAttempts(getAllAttempts());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClear = () => {
    if (window.confirm('¿Seguro que deseas borrar el registro de calificaciones de la Evaluación Final en este dispositivo?')) {
      clearAllAttempts();
      setAttempts([]);
      soundEffects.playPop();
    }
  };

  // Find overall best score
  const bestScore = attempts.length > 0 ? Math.max(...attempts.map(a => a.score)) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm select-none animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border-4 border-indigo-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-300" />
            <div>
              <h3 className="text-xl sm:text-2xl font-black">Resultados • Evaluación Final</h3>
              <p className="text-xs text-indigo-100">25 preguntas • Máximo {MAX_ATTEMPTS} intentos por estudiante</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/20 transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {attempts.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <span className="text-5xl block mb-2">⭐</span>
              <p className="font-bold text-lg">Aún no hay evaluaciones registradas.</p>
              <p className="text-sm text-slate-400">¡Completa la Evaluación Final para ver tus calificaciones aquí!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {attempts.map(att => {
                const isCurrent =
                  Boolean(currentStudentName) &&
                  normalizeStudentName(att.studentName) === normalizeStudentName(currentStudentName || '');
                const isApproved = att.score >= 6.0;
                const isBest = att.score === bestScore && bestScore > 0;

                return (
                  <div
                    key={att.id}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isCurrent
                        ? 'bg-indigo-50/80 border-indigo-400 shadow-md ring-2 ring-indigo-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    {/* Left: Info */}
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 font-black border-2 ${
                          isApproved
                            ? 'bg-emerald-100 text-emerald-700 border-emerald-300'
                            : 'bg-amber-100 text-amber-700 border-amber-300'
                        }`}
                      >
                        {isBest ? '👑' : isApproved ? '⭐' : '💪'}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-black text-slate-900 text-base sm:text-lg">
                            {att.studentName}
                          </span>
                          <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                            Intento {att.attemptNumber} de {MAX_ATTEMPTS}
                          </span>
                          {isBest && (
                            <span className="text-xs bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full font-black flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              Mejor nota
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 mt-1 text-xs sm:text-sm text-slate-500 font-bold">
                          <span className="text-emerald-700">✓ {att.correctCount} correctas</span>
                          <span className="text-rose-600">✗ {att.incorrectCount} erradas</span>
                          <span className="flex items-center gap-1 text-slate-400">
                            <Calendar className="w-3 h-3" />
                            {att.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Score & Status */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                      <div className="text-right">
                        <div className="text-2xl font-black text-slate-900">
                          {att.score.toFixed(1)} <span className="text-sm text-slate-400">/ 10</span>
                        </div>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                          isApproved
                            ? 'bg-emerald-500 text-white'
                            : 'bg-amber-400 text-amber-950'
                        }`}
                      >
                        {att.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          {attempts.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Limpiar registro</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              onClose();
            }}
            className="ml-auto px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md cursor-pointer transition-all"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
