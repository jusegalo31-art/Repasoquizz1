import React from 'react';

export type MascotEmotion = 'idle' | 'speaking' | 'celebrating' | 'encouraging' | 'listening';

interface MascotProps {
  emotion?: MascotEmotion;
  isSpeaking?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const Mascot: React.FC<MascotProps> = ({
  emotion = 'idle',
  isSpeaking = false,
  size = 'md',
  className = '',
  onClick,
}) => {
  const currentEmotion: MascotEmotion = isSpeaking ? 'speaking' : emotion;

  const sizeClasses = {
    sm: 'w-20 h-24',
    md: 'w-28 h-32 md:w-36 md:h-40',
    lg: 'w-36 h-44 md:w-48 md:h-56',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center justify-center transition-transform select-none ${
        onClick ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
      } ${isSpeaking ? 'animate-speaking' : 'animate-float'} ${sizeClasses} ${className}`}
      title="Tito el Robot - Tu profe amigo"
    >
      {/* Speech indicator waves if speaking */}
      {isSpeaking && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-yellow-300 text-yellow-950 font-bold text-xs px-2.5 py-0.5 rounded-full shadow-md border-2 border-white animate-bounce">
          <span>🔊</span>
          <span>¡Hablando!</span>
        </div>
      )}

      <svg
        viewBox="0 0 160 180"
        className="w-full h-full drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Antenna */}
        <line x1="80" y1="28" x2="80" y2="46" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <circle
          cx="80"
          cy="22"
          r="14"
          fill={isSpeaking ? '#FACC15' : '#38BDF8'}
          stroke="#0F172A"
          strokeWidth="4"
          className={isSpeaking ? 'animate-ping origin-center' : ''}
        />
        <circle cx="80" cy="22" r="14" fill={isSpeaking ? '#FDE047' : '#38BDF8'} stroke="#0F172A" strokeWidth="4" />
        <circle cx="76" cy="18" r="4" fill="#FFFFFF" />

        {/* Ears / Head bolts */}
        <rect x="18" y="66" width="12" height="24" rx="4" fill="#0284C7" stroke="#0F172A" strokeWidth="4" />
        <rect x="130" y="66" width="12" height="24" rx="4" fill="#0284C7" stroke="#0F172A" strokeWidth="4" />

        {/* Head */}
        <rect
          x="26"
          y="44"
          width="108"
          height="80"
          rx="24"
          fill="#38BDF8"
          stroke="#0F172A"
          strokeWidth="6"
        />

        {/* Head highlight shine */}
        <path
          d="M 44 54 C 55 50, 75 50, 88 52"
          stroke="#BAE6FD"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Screen / Face Area */}
        <rect
          x="38"
          y="56"
          width="84"
          height="56"
          rx="16"
          fill="#0F172A"
          stroke="#0369A1"
          strokeWidth="3"
        />

        {/* Cheeks */}
        <circle cx="48" cy="94" r="6" fill="#F43F5E" opacity="0.8" />
        <circle cx="112" cy="94" r="6" fill="#F43F5E" opacity="0.8" />

        {/* Eyes based on emotion */}
        {currentEmotion === 'celebrating' ? (
          // Joyful arch eyes with stars
          <g>
            <path d="M 52 78 Q 62 66 72 78" stroke="#FACC15" strokeWidth="6" strokeLinecap="round" />
            <path d="M 88 78 Q 98 66 108 78" stroke="#FACC15" strokeWidth="6" strokeLinecap="round" />
          </g>
        ) : currentEmotion === 'encouraging' ? (
          // One wink eye, one bright eye
          <g>
            <circle cx="62" cy="76" r="9" fill="#38BDF8" />
            <circle cx="64" cy="74" r="3" fill="#FFFFFF" />
            <path d="M 88 77 Q 98 83 108 77" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" />
          </g>
        ) : (
          // Big friendly curious eyes
          <g>
            <circle cx="62" cy="76" r="10" fill="#38BDF8" />
            <circle cx="64" cy="73" r="3.5" fill="#FFFFFF" />
            <circle cx="98" cy="76" r="10" fill="#38BDF8" />
            <circle cx="100" cy="73" r="3.5" fill="#FFFFFF" />
          </g>
        )}

        {/* Mouth */}
        {isSpeaking ? (
          // Animated talking mouth
          <rect
            x="64"
            y="90"
            width="32"
            height="14"
            rx="7"
            fill="#FACC15"
            stroke="#0F172A"
            strokeWidth="3"
            className="animate-mouth origin-center"
          />
        ) : currentEmotion === 'celebrating' ? (
          // Big open smiling mouth
          <path
            d="M 64 90 Q 80 108 96 90 Z"
            fill="#F43F5E"
            stroke="#FFFFFF"
            strokeWidth="2.5"
          />
        ) : currentEmotion === 'encouraging' ? (
          // Sweet gentle smile
          <path
            d="M 68 92 Q 80 102 92 92"
            stroke="#FACC15"
            strokeWidth="4"
            strokeLinecap="round"
          />
        ) : (
          // Standard happy smile
          <path
            d="M 68 91 Q 80 101 92 91"
            stroke="#38BDF8"
            strokeWidth="4"
            strokeLinecap="round"
          />
        )}

        {/* Neck */}
        <rect x="70" y="124" width="20" height="10" rx="3" fill="#64748B" stroke="#0F172A" strokeWidth="3" />

        {/* Body */}
        <path
          d="M 46 134 L 114 134 L 122 170 C 122 174, 118 178, 114 178 L 46 178 C 42 178, 38 174, 38 170 Z"
          fill="#0284C7"
          stroke="#0F172A"
          strokeWidth="6"
        />

        {/* Body screen / emblem */}
        <rect x="60" y="142" width="40" height="24" rx="8" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3" />
        <path
          d="M 72 154 L 80 146 L 88 154 L 80 162 Z"
          fill="#FACC15"
        />

        {/* Small arms */}
        {currentEmotion === 'celebrating' ? (
          <g>
            <path d="M 38 140 Q 18 120 22 102" stroke="#0284C7" strokeWidth="10" strokeLinecap="round" />
            <path d="M 122 140 Q 142 120 138 102" stroke="#0284C7" strokeWidth="10" strokeLinecap="round" />
          </g>
        ) : currentEmotion === 'encouraging' ? (
          <g>
            <path d="M 38 146 Q 24 158 20 170" stroke="#0284C7" strokeWidth="10" strokeLinecap="round" />
            <path d="M 122 144 Q 142 140 142 128" stroke="#0284C7" strokeWidth="10" strokeLinecap="round" />
            {/* Thumbs up badge */}
            <circle cx="144" cy="122" r="10" fill="#FACC15" stroke="#0F172A" strokeWidth="2.5" />
            <text x="144" y="126" textAnchor="middle" fontSize="12" fill="#0F172A">👍</text>
          </g>
        ) : (
          <g>
            <path d="M 38 146 Q 26 156 24 168" stroke="#0284C7" strokeWidth="10" strokeLinecap="round" />
            <path d="M 122 146 Q 134 156 136 168" stroke="#0284C7" strokeWidth="10" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
};

