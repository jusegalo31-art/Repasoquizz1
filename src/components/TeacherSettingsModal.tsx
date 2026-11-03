import React, { useState, useEffect } from 'react';
import { Settings, X, Key, Mic, CheckCircle2, AlertCircle, RefreshCw, Volume2 } from 'lucide-react';
import { ttsClient } from '../services/ttsClient';
import { soundEffects } from '../services/soundEffects';

interface TeacherSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VoiceOption {
  id: string;
  name: string;
  description: string;
  accent: string;
}

export const TeacherSettingsModal: React.FC<TeacherSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('cgSgspJ2msm6clMCkdW9');
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [cachedCount, setCachedCount] = useState<number>(0);
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [saving, setSaving] = useState<boolean>(false);
  const [testing, setTesting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
      fetchVoices();
    }
  }, [isOpen]);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        setIsConfigured(data.elevenlabsConfigured);
        setSelectedVoiceId(data.currentVoiceId || 'pFZP5JQG7iQjIQuC4Bku');
        setCachedCount(data.cachedFilesCount || 0);
      }
    } catch {
      // Backend might be offline
    }
  };

  const fetchVoices = async () => {
    try {
      const res = await fetch('/api/voices');
      if (res.ok) {
        const data = await res.json();
        setVoices(data.recommendedVoices || []);
      }
    } catch {
      // fallback voices
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback('');

    try {
      const res = await fetch('/api/save-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: apiKey.trim(),
          voiceId: selectedVoiceId.trim(),
        }),
      });

      if (res.ok) {
        setFeedback('¡Configuración guardada exitosamente en el servidor!');
        setApiKey('');
        await fetchStatus();
        await ttsClient.checkStatus();
      } else {
        setFeedback('Error al guardar configuración');
      }
    } catch (e: unknown) {
      setFeedback('Error de conexión con el backend: ' + (e instanceof Error ? e.message : String(e)));
    } finally {
      setSaving(false);
    }
  };

  const handleTestVoice = async () => {
    setTesting(true);
    try {
      await ttsClient.speakText(
        '¡Hola! Soy tu profesora de informática. Estoy lista para acompañar a los niños de primero de primaria en su gran reto.'
      );
    } finally {
      setTesting(false);
    }
  };

  const handleClearCache = async () => {
    if (window.confirm('¿Deseas vaciar la memoria caché de audios del servidor?')) {
      try {
        await fetch('/api/clear-cache', { method: 'POST' });
        await fetchStatus();
        setFeedback('Caché de audios limpiada.');
      } catch {
        setFeedback('Error al limpiar caché.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm select-none animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border-4 border-slate-300 overflow-hidden text-slate-800">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-800 to-indigo-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="text-lg sm:text-xl font-black">Panel del Docente: Voz y TTS</h3>
              <p className="text-xs text-indigo-200">Configuración segura de ElevenLabs y respaldo</p>
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
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-5">
          {/* Status banner */}
          <div
            className={`p-4 rounded-2xl border-2 flex items-start gap-3 ${
              isConfigured
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}
          >
            {isConfigured ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="text-xs sm:text-sm">
              <p className="font-extrabold text-sm sm:text-base">
                {isConfigured
                  ? 'ElevenLabs está Activo y Conectado'
                  : 'Modo Respaldo Activo (Web Speech API)'}
              </p>
              <p className="mt-0.5">
                {isConfigured
                  ? 'Las narraciones se generan con la voz natural colombiana de ElevenLabs y se almacenan en caché.'
                  : 'Si no configuras clave API, la aplicación usa automáticamente el motor de voz del navegador con afinación colombiana.'}
              </p>
            </div>
          </div>

          {/* Test Voice Button */}
          <div className="flex items-center justify-between p-3.5 bg-slate-100 rounded-2xl border border-slate-200">
            <div>
              <span className="text-xs sm:text-sm font-bold text-slate-700 block">
                Prueba la voz en este dispositivo
              </span>
              <span className="text-xs text-slate-500">
                Escucha el tono y la entonación actual
              </span>
            </div>
            <button
              type="button"
              disabled={testing}
              onClick={handleTestVoice}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow cursor-pointer transition-all disabled:opacity-50"
            >
              <Volume2 className="w-4 h-4" />
              <span>{testing ? 'Hablando...' : 'Probar voz'}</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            {/* API Key */}
            <div className="flex flex-col gap-1">
              <label className="text-xs sm:text-sm font-black text-slate-700 flex items-center gap-1.5">
                <Key className="w-4 h-4 text-indigo-600" />
                <span>Clave API de ElevenLabs (Opcional pero recomendado):</span>
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder={isConfigured ? '•••••••••••••••••••••••••••••••• (Ya configurada)' : 'Pega tu clave xi-api-key aquí'}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-300 focus:border-indigo-600 outline-none text-sm font-mono"
              />
              <span className="text-[11px] text-slate-500">
                La clave se guarda únicamente en el archivo local <code>.env</code> del servidor y nunca se expone al navegador del estudiante.
              </span>
            </div>

            {/* Voice Selection */}
            <div className="flex flex-col gap-1">
              <label className="text-xs sm:text-sm font-black text-slate-700 flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-indigo-600" />
                <span>Voz de Profesora Recomendada:</span>
              </label>
              <select
                value={selectedVoiceId}
                onChange={e => setSelectedVoiceId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-300 focus:border-indigo-600 outline-none text-xs sm:text-sm font-bold"
              >
                {voices.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name} - {v.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Voice ID */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500">
                O ingresa un Voice ID personalizado de ElevenLabs:
              </label>
              <input
                type="text"
                value={selectedVoiceId}
                onChange={e => setSelectedVoiceId(e.target.value)}
                placeholder="ID de voz de ElevenLabs"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-mono"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm uppercase tracking-wider shadow-md cursor-pointer transition-all disabled:opacity-50"
            >
              {saving ? 'Guardando en servidor...' : 'Guardar Configuración'}
            </button>
          </form>

          {feedback && (
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold text-center">
              {feedback}
            </div>
          )}

          {/* Cache stats */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>Archivos de voz en caché del servidor: <strong>{cachedCount}</strong></span>
            {cachedCount > 0 && (
              <button
                type="button"
                onClick={handleClearCache}
                className="flex items-center gap-1 text-slate-600 hover:text-rose-600 font-bold cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Vaciar caché</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-slate-700 hover:bg-slate-800 text-white font-bold text-sm cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

