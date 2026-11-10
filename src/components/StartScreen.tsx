import React, { useState, useEffect } from 'react';
import { Mascot } from './Mascot';
import { Volume2, Sparkles, Trophy, Settings, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  getLastStudentName,
  setLastStudentName,
  getRemainingAttempts,
  getBestScoreForStudent,
  MAX_ATTEMPTS,
} from '../services/storage';
import { soundEffects } from '../services/soundEffects';

interface StartScreenProps {
  onStartQuiz: (studentName: string) => void;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onPlayWelcomeVoice: () => void;
  isSpeaking: boolean;
}

const AVATAR_OPTIONS = [
  { emoji: '🤖', label: 'Robot' },
  { emoji: '🚀', label: 'Cohete' },
  { emoji: '🐱', label: 'Gatito' },
  { emoji: '⭐', label: 'Estrella' },
  { emoji: '🦁', label: 'Leoncito' },
  { emoji: '👑', label: 'Campeón' },
];

export const StartScreen: React.FC<StartScreenProps> = ({
  onStartQuiz,
  onOpenHistory,
  onOpenSettings,
  onPlayWelcomeVoice,
  isSpeaking,
}) => {
  const [name, setName] = useState<string>('');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('🤖');
  const [errorWarning, setErrorWarning] = useState<string>('');

  useEffect(() => {
    const saved = getLastStudentName();
    if (saved) setName(saved);
  }, []);

  const trimmedName = name.trim();
  const remainingAttempts = trimmedName ? getRemainingAttempts(trimmedName) : MAX_ATTEMPTS;
  const bestScore = trimmedName ? getBestScoreForStudent(trimmedName) : null;
  const hasReachedLimit = trimmedName.length > 0 && remainingAttempts <= 0;

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmedName) {
      setErrorWarning('¡Por favor escribe tu nombre para presentar la Evaluación Final!');
      soundEffects.playEncouraging();
      return;
    }

    if (remainingAttempts <= 0) {
      setErrorWarning(
        `¡${trimmedName}, ya completaste tus ${MAX_ATTEMPTS} intentos permitidos en la Evaluación Final!`
      );
      soundEffects.playEncouraging();
      return;
    }

    setErrorWarning('');
    setLastStudentName(trimmedName);
    soundEffects.playPop();
    onStartQuiz(`${selectedAvatar} ${trimmedName}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] py-6 px-4 max-w-2xl mx-auto select-none">
      {/* Top utility bar */}
      <div className="w-full flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => {
            soundEffects.playPop();
            onOpenHistory();
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/90 hover:bg-white text-indigo-950 font-extrabold text-xs sm:text-sm border-2 border-indigo-200 shadow-md active:translate-y-0.5 transition-all cursor-pointer"
        >
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Ver calificaciones</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEffects.playPop();
            onOpenSettings();
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white/90 hover:bg-white text-slate-700 font-extrabold text-xs sm:text-sm border-2 border-slate-200 shadow-md active:translate-y-0.5 transition-all cursor-pointer"
          title="Ajustes de Docente y Voz ElevenLabs"
        >
          <Settings className="w-4 h-4 text-slate-500" />
          <span className="hidden sm:inline">Docente / Voz</span>
        </button>
      </div>

      {/* Main Game Banner Card */}
      <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-indigo-300 text-center relative overflow-hidden">
        {/* Floating background decorative bubbles */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-sky-200 rounded-full blur-2xl opacity-50 pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-200 rounded-full blur-2xl opacity-50 pointer-events-none" />

        {/* Title Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-300 text-amber-950 font-black px-4 py-1.5 rounded-full text-xs sm:text-sm shadow-md border-2 border-amber-500 mb-3 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-900" />
          <span>Colegio México • Primero de Primaria • Evaluación Final</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-2 drop-shadow-sm">
          ¡EVALUACIÓN FINAL DE INFORMÁTICA! 🚀💻
        </h1>

        <p className="text-base sm:text-xl font-bold text-indigo-700 mb-2">
          ¿Estás listo para demostrar todo lo que aprendiste?
        </p>

        {/* Info pills: 26 preguntas & 2 intentos */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 font-extrabold text-xs sm:text-sm border border-indigo-300">
            📝 25 Selección + 1 Escritura
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-extrabold text-xs sm:text-sm border border-amber-300">
            🎯 Máximo {MAX_ATTEMPTS} Intentos por Estudiante
          </span>
        </div>

        {/* Mascot Centerpiece */}
        <div className="flex flex-col items-center justify-center my-3">
          <Mascot isSpeaking={isSpeaking} size="lg" emotion="idle" />

          {/* Voice Welcome Button */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              onPlayWelcomeVoice();
            }}
            className="mt-3 flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-extrabold text-sm sm:text-base border-2 border-amber-600 shadow-md active:translate-y-0.5 transition-all cursor-pointer"
          >
            <Volume2 className="w-5 h-5 text-amber-900 animate-pulse" />
            <span>
              {isSpeaking
                ? '¡Escuchando bienvenida de la Evaluación!'
                : 'Toca para escuchar las instrucciones 🔊'}
            </span>
          </button>
        </div>

        {/* Form to enter student name */}
        <form onSubmit={handleStart} className="w-full max-w-md mx-auto mt-4 flex flex-col gap-4">
          {/* Avatar picker for kids */}
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-xs sm:text-sm font-extrabold text-slate-600">
              Elige tu personaje:
            </span>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {AVATAR_OPTIONS.map(av => (
                <button
                  key={av.label}
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    setSelectedAvatar(av.emoji);
                  }}
                  className={`w-11 h-11 text-2xl rounded-2xl flex items-center justify-center border-2 transition-all cursor-pointer ${
                    selectedAvatar === av.emoji
                      ? 'bg-amber-300 border-amber-600 scale-115 shadow-md ring-4 ring-amber-200'
                      : 'bg-slate-100 border-slate-300 hover:bg-slate-200'
                  }`}
                  title={av.label}
                >
                  {av.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Name input */}
          <div className="flex flex-col items-start gap-1 w-full">
            <label htmlFor="student-name" className="text-sm sm:text-base font-extrabold text-slate-800">
              Escribe tu nombre completo:
            </label>
            <input
              id="student-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={e => {
                setName(e.target.value);
                setErrorWarning('');
              }}
              placeholder="Ej: Sofía o Mateo"
              className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-3 border-indigo-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-200 text-lg sm:text-xl font-bold text-slate-900 placeholder-slate-400 outline-none transition-all shadow-inner"
              maxLength={25}
            />

            {/* Attempts status indicator for the typed student */}
            {trimmedName && (
              <div
                className={`w-full mt-2 p-3 rounded-2xl border-2 text-left flex items-center gap-2.5 text-xs sm:text-sm font-bold ${
                  hasReachedLimit
                    ? 'bg-rose-50 border-rose-300 text-rose-800'
                    : remainingAttempts === 1
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                }`}
              >
                {hasReachedLimit ? (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                <div>
                  {hasReachedLimit ? (
                    <span>
                      Ya realizaste tus <strong>{MAX_ATTEMPTS} intentos permitidos</strong>. Mejor nota:{' '}
                      <strong>{bestScore?.toFixed(1)} / 10.0</strong>
                    </span>
                  ) : remainingAttempts === 1 ? (
                    <span>
                      Ya hiciste 1 intento (Nota: <strong>{bestScore?.toFixed(1)}</strong>). ¡Te queda{' '}
                      <strong>1 último intento</strong>!
                    </span>
                  ) : (
                    <span>
                      Tienes tus <strong>{MAX_ATTEMPTS} intentos disponibles</strong> para la Evaluación Final.
                    </span>
                  )}
                </div>
              </div>
            )}

            {errorWarning && (
              <span className="text-xs sm:text-sm font-bold text-rose-600 mt-1 animate-bounce">
                {errorWarning}
              </span>
            )}
          </div>

          {/* Big Green Start Button or View Results if limit reached */}
          {hasReachedLimit ? (
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                onOpenHistory();
              }}
              className="w-full py-4 px-6 rounded-3xl game-btn-blue text-white font-black text-lg sm:text-xl uppercase tracking-wider border-4 border-sky-600 cursor-pointer transition-transform hover:scale-102 active:scale-98 shadow-xl mt-2"
            >
              VER MIS RESULTADOS FINALES 🏆
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-3xl game-btn-green text-white font-black text-xl sm:text-2xl uppercase tracking-wider border-4 border-emerald-600 cursor-pointer transition-transform hover:scale-102 active:scale-98 shadow-xl mt-2"
            >
              {remainingAttempts === 1
                ? '¡INICIAR INTENTO #2 (FINAL)! 🚀'
                : '¡COMENZAR EVALUACIÓN! 🎮'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
