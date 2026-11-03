import React from 'react';
import { Volume2, RotateCcw, ListFilter } from 'lucide-react';

interface AudioControlsProps {
  isSpeaking: boolean;
  onRepeatQuestion: () => void;
  onRepeatOptions: () => void;
  disabled?: boolean;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  isSpeaking,
  onRepeatQuestion,
  onRepeatOptions,
  disabled = false,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-2 select-none">
      {/* Visual Audio Waveform indicator */}
      <div
        className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border-2 transition-all shadow-md ${
          isSpeaking
            ? 'bg-amber-100 border-amber-400 text-amber-900 ring-4 ring-amber-200'
            : 'bg-white/80 border-slate-300 text-slate-500'
        }`}
        title={isSpeaking ? 'La profesora está hablando' : 'Voz lista'}
      >
        <Volume2 className={`w-5 h-5 ${isSpeaking ? 'text-amber-600 animate-pulse' : 'text-slate-400'}`} />
        <div className="flex items-center gap-1 h-5 px-1">
          <span
            className={`w-1 rounded-full bg-amber-500 transition-all ${
              isSpeaking ? 'h-5 animate-bounce' : 'h-2'
            }`}
          />
          <span
            className={`w-1 rounded-full bg-amber-500 transition-all ${
              isSpeaking ? 'h-3 animate-pulse' : 'h-1.5'
            }`}
          />
          <span
            className={`w-1 rounded-full bg-amber-500 transition-all ${
              isSpeaking ? 'h-6 animate-bounce' : 'h-2'
            }`}
          />
          <span
            className={`w-1 rounded-full bg-amber-500 transition-all ${
              isSpeaking ? 'h-4 animate-pulse' : 'h-1.5'
            }`}
          />
        </div>
        <span className="text-xs sm:text-sm font-bold">
          {isSpeaking ? '¡Escucha con atención!' : 'Audio listo'}
        </span>
      </div>

      {/* Big Button: Repetir Pregunta */}
      <button
        type="button"
        disabled={disabled}
        onClick={onRepeatQuestion}
        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-white font-extrabold text-sm sm:text-base border-2 border-sky-700 shadow-md active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50"
      >
        <RotateCcw className="w-5 h-5" />
        <span>Repetir pregunta</span>
      </button>

      {/* Big Button: Escuchar Opciones */}
      <button
        type="button"
        disabled={disabled}
        onClick={onRepeatOptions}
        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-amber-950 font-extrabold text-sm sm:text-base border-2 border-amber-700 shadow-md active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50"
      >
        <ListFilter className="w-5 h-5" />
        <span>Escuchar opciones</span>
      </button>
    </div>
  );
};

