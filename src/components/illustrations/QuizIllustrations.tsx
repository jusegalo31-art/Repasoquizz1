import React from 'react';

interface IllustrationProps {
  name: string;
  className?: string;
}

export const QuizIllustration: React.FC<IllustrationProps> = ({ name, className = 'w-24 h-24' }) => {
  switch (name) {
    case 'computer':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Monitor */}
          <rect x="18" y="14" width="64" height="46" rx="8" fill="#38BDF8" stroke="#0F172A" strokeWidth="4" />
          <rect x="24" y="20" width="52" height="34" rx="4" fill="#0284C7" />
          <circle cx="50" cy="37" r="10" fill="#FACC15" />
          <path d="M 46 37 Q 50 42 54 37" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
          {/* Stand */}
          <rect x="44" y="60" width="12" height="10" fill="#64748B" stroke="#0F172A" strokeWidth="3" />
          <path d="M 32 70 L 68 70" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          {/* Keyboard & Mouse */}
          <rect x="22" y="76" width="42" height="12" rx="3" fill="#E2E8F0" stroke="#0F172A" strokeWidth="3" />
          <rect x="68" y="76" width="14" height="12" rx="5" fill="#F43F5E" stroke="#0F172A" strokeWidth="3" />
        </svg>
      );

    case 'animal':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Cute puppy */}
          <ellipse cx="50" cy="56" rx="32" ry="28" fill="#F59E0B" stroke="#0F172A" strokeWidth="4" />
          {/* Ears */}
          <ellipse cx="22" cy="44" rx="10" ry="18" fill="#D97706" stroke="#0F172A" strokeWidth="4" transform="rotate(-15 22 44)" />
          <ellipse cx="78" cy="44" rx="10" ry="18" fill="#D97706" stroke="#0F172A" strokeWidth="4" transform="rotate(15 78 44)" />
          {/* Eyes */}
          <circle cx="38" cy="52" r="5" fill="#0F172A" />
          <circle cx="40" cy="50" r="1.5" fill="#FFFFFF" />
          <circle cx="62" cy="52" r="5" fill="#0F172A" />
          <circle cx="64" cy="50" r="1.5" fill="#FFFFFF" />
          {/* Nose & mouth */}
          <ellipse cx="50" cy="62" rx="6" ry="4" fill="#0F172A" />
          <path d="M 44 68 Q 50 74 56 68" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          {/* Cheeks */}
          <circle cx="30" cy="62" r="4" fill="#F87171" opacity="0.7" />
          <circle cx="70" cy="62" r="4" fill="#F87171" opacity="0.7" />
        </svg>
      );

    case 'teddy':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Teddy bear */}
          <circle cx="28" cy="28" r="14" fill="#B45309" stroke="#0F172A" strokeWidth="4" />
          <circle cx="28" cy="28" r="7" fill="#FDE68A" />
          <circle cx="72" cy="28" r="14" fill="#B45309" stroke="#0F172A" strokeWidth="4" />
          <circle cx="72" cy="28" r="7" fill="#FDE68A" />
          {/* Head */}
          <circle cx="50" cy="50" r="30" fill="#D97706" stroke="#0F172A" strokeWidth="4" />
          <ellipse cx="50" cy="58" rx="14" ry="10" fill="#FDE68A" />
          <circle cx="38" cy="46" r="4" fill="#0F172A" />
          <circle cx="62" cy="46" r="4" fill="#0F172A" />
          <ellipse cx="50" cy="56" rx="4" ry="3" fill="#0F172A" />
          <path d="M 47 62 Q 50 65 53 62" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
          {/* Cute bow */}
          <path d="M 42 78 L 50 82 L 58 78 L 50 86 Z" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />
        </svg>
      );

    case 'tablet':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <rect x="20" y="12" width="60" height="76" rx="12" fill="#E2E8F0" stroke="#0F172A" strokeWidth="4" />
          <rect x="26" y="20" width="48" height="60" rx="6" fill="#1E293B" />
          {/* App icons */}
          <rect x="30" y="26" width="10" height="10" rx="3" fill="#F43F5E" />
          <rect x="45" y="26" width="10" height="10" rx="3" fill="#38BDF8" />
          <rect x="60" y="26" width="10" height="10" rx="3" fill="#FACC15" />
          <rect x="30" y="42" width="10" height="10" rx="3" fill="#4ADE80" />
          <rect x="45" y="42" width="10" height="10" rx="3" fill="#A855F7" />
          <rect x="60" y="42" width="10" height="10" rx="3" fill="#FB923C" />
          {/* Home button */}
          <circle cx="50" cy="83" r="3" fill="#64748B" />
        </svg>
      );

    case 'spoon':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="30" rx="18" ry="22" fill="#CBD5E1" stroke="#0F172A" strokeWidth="4" />
          <ellipse cx="48" cy="28" rx="12" ry="15" fill="#E2E8F0" />
          <path d="M 48 50 L 46 88 C 46 92, 54 92, 54 88 L 52 50 Z" fill="#94A3B8" stroke="#0F172A" strokeWidth="4" />
        </svg>
      );

    case 'shoe':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Sneaker */}
          <path
            d="M 18 64 C 18 52, 34 38, 48 38 L 56 38 L 62 50 L 82 56 C 88 58, 90 68, 88 74 L 18 74 Z"
            fill="#EF4444"
            stroke="#0F172A"
            strokeWidth="4"
          />
          {/* Sole */}
          <rect x="14" y="74" width="76" height="12" rx="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
          {/* Laces */}
          <line x1="44" y1="46" x2="54" y2="46" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <line x1="48" y1="52" x2="58" y2="52" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <circle cx="34" cy="58" r="8" fill="#FACC15" stroke="#0F172A" strokeWidth="2" />
        </svg>
      );

    case 'monitor':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <rect x="14" y="16" width="72" height="52" rx="10" fill="#38BDF8" stroke="#0F172A" strokeWidth="4" />
          <rect x="20" y="22" width="60" height="40" rx="6" fill="#0284C7" />
          {/* Eye / smile in monitor */}
          <circle cx="40" cy="38" r="4" fill="#FFFFFF" />
          <circle cx="60" cy="38" r="4" fill="#FFFFFF" />
          <path d="M 44 46 Q 50 52 56 46" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          {/* Stand */}
          <rect x="44" y="68" width="12" height="12" fill="#64748B" stroke="#0F172A" strokeWidth="3" />
          <rect x="30" y="80" width="40" height="8" rx="4" fill="#475569" stroke="#0F172A" strokeWidth="3" />
        </svg>
      );

    case 'keyboard':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <rect x="10" y="24" width="80" height="52" rx="10" fill="#E2E8F0" stroke="#0F172A" strokeWidth="4" />
          {/* Key rows */}
          <g fill="#94A3B8" stroke="#0F172A" strokeWidth="2">
            <rect x="18" y="32" width="8" height="8" rx="2" fill="#F43F5E" />
            <rect x="30" y="32" width="8" height="8" rx="2" />
            <rect x="42" y="32" width="8" height="8" rx="2" />
            <rect x="54" y="32" width="8" height="8" rx="2" />
            <rect x="66" y="32" width="16" height="8" rx="2" fill="#38BDF8" />

            <rect x="18" y="44" width="10" height="8" rx="2" />
            <rect x="32" y="44" width="8" height="8" rx="2" />
            <rect x="44" y="44" width="8" height="8" rx="2" />
            <rect x="56" y="44" width="8" height="8" rx="2" />
            <rect x="68" y="44" width="14" height="8" rx="2" fill="#FACC15" />

            {/* Spacebar */}
            <rect x="28" y="56" width="44" height="10" rx="3" fill="#38BDF8" />
          </g>
        </svg>
      );

    case 'mouse':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path
            d="M 50 18 C 34 18, 24 34, 24 54 C 24 74, 35 86, 50 86 C 65 86, 76 74, 76 54 C 76 34, 66 18, 50 18 Z"
            fill="#F43F5E"
            stroke="#0F172A"
            strokeWidth="4"
          />
          {/* Split button line */}
          <line x1="50" y1="18" x2="50" y2="46" stroke="#0F172A" strokeWidth="3" />
          <line x1="24" y1="46" x2="76" y2="46" stroke="#0F172A" strokeWidth="3" />
          {/* Scroll wheel */}
          <rect x="46" y="28" width="8" height="14" rx="4" fill="#FACC15" stroke="#0F172A" strokeWidth="2.5" />
          {/* Cable */}
          <path d="M 50 18 C 50 8, 40 4, 34 8" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'cpu':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Tower */}
          <rect x="24" y="12" width="52" height="76" rx="10" fill="#334155" stroke="#0F172A" strokeWidth="4" />
          {/* Disc Drive */}
          <rect x="32" y="22" width="36" height="8" rx="2" fill="#0F172A" />
          <line x1="36" y1="26" x2="60" y2="26" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
          {/* Power Button */}
          <circle cx="50" cy="42" r="8" fill="#FACC15" stroke="#0F172A" strokeWidth="2.5" />
          <circle cx="50" cy="42" r="3" fill="#EF4444" />
          {/* Ventilation & Lights (Brain LED) */}
          <rect x="32" y="56" width="36" height="24" rx="4" fill="#0284C7" stroke="#0F172A" strokeWidth="2" />
          <circle cx="40" cy="64" r="3" fill="#4ADE80" />
          <circle cx="50" cy="64" r="3" fill="#38BDF8" />
          <circle cx="60" cy="64" r="3" fill="#FACC15" />
          <line x1="38" y1="72" x2="62" y2="72" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'speakers':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Left speaker */}
          <rect x="12" y="26" width="32" height="56" rx="8" fill="#1E293B" stroke="#0F172A" strokeWidth="3.5" />
          <circle cx="28" cy="40" r="6" fill="#FACC15" stroke="#0F172A" strokeWidth="2" />
          <circle cx="28" cy="62" r="11" fill="#38BDF8" stroke="#0F172A" strokeWidth="2.5" />

          {/* Right speaker */}
          <rect x="56" y="26" width="32" height="56" rx="8" fill="#1E293B" stroke="#0F172A" strokeWidth="3.5" />
          <circle cx="72" cy="40" r="6" fill="#FACC15" stroke="#0F172A" strokeWidth="2" />
          <circle cx="72" cy="62" r="11" fill="#38BDF8" stroke="#0F172A" strokeWidth="2.5" />

          {/* Musical note floating */}
          <path d="M 42 16 L 54 12 L 54 22 M 42 24 L 42 16" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" />
          <circle cx="40" cy="24" r="3" fill="#F43F5E" />
          <circle cx="52" cy="21" r="3" fill="#F43F5E" />
        </svg>
      );

    case 'webcam':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Webcam lens sphere */}
          <circle cx="50" cy="40" r="26" fill="#0284C7" stroke="#0F172A" strokeWidth="4" />
          <circle cx="50" cy="40" r="18" fill="#0F172A" stroke="#38BDF8" strokeWidth="3" />
          {/* Video call smile inside lens */}
          <circle cx="45" cy="36" r="2.5" fill="#FFFFFF" />
          <circle cx="55" cy="36" r="2.5" fill="#FFFFFF" />
          <path d="M 45 42 Q 50 46 55 42" stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" />
          {/* LED activity light */}
          <circle cx="50" cy="20" r="3" fill="#4ADE80" stroke="#0F172A" strokeWidth="1.5" />
          {/* Stand / clip */}
          <path d="M 50 66 L 50 78" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
          <path d="M 28 84 Q 50 78 72 84" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
        </svg>
      );

    case 'mouse-pointer':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Moving arrow cursor */}
          <path
            d="M 28 20 L 28 72 L 44 56 L 62 82 L 72 76 L 54 50 L 76 50 Z"
            fill="#38BDF8"
            stroke="#0F172A"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Motion trails */}
          <path d="M 20 40 Q 14 50 20 60" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
          <path d="M 14 30 Q 6 45 14 65" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'music-notes':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="36" cy="68" r="12" fill="#F43F5E" stroke="#0F172A" strokeWidth="4" />
          <circle cx="70" cy="56" r="12" fill="#FACC15" stroke="#0F172A" strokeWidth="4" />
          <path d="M 48 68 L 48 24 L 82 14 L 82 56" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
          <path d="M 48 24 L 82 14" stroke="#38BDF8" strokeWidth="8" />
        </svg>
      );

    case 'keys-letters':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Keys A, B, C */}
          <rect x="12" y="24" width="22" height="24" rx="5" fill="#FDE047" stroke="#0F172A" strokeWidth="3.5" />
          <text x="23" y="42" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">A</text>

          <rect x="39" y="24" width="22" height="24" rx="5" fill="#38BDF8" stroke="#0F172A" strokeWidth="3.5" />
          <text x="50" y="42" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">B</text>

          <rect x="66" y="24" width="22" height="24" rx="5" fill="#F87171" stroke="#0F172A" strokeWidth="3.5" />
          <text x="77" y="42" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">C</text>

          {/* Word banner: HOLA */}
          <rect x="16" y="58" width="68" height="24" rx="8" fill="#4ADE80" stroke="#0F172A" strokeWidth="3.5" />
          <text x="50" y="76" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">HOLA ✍️</text>
        </svg>
      );

    case 'keys-numbers':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Keys 1, 2, 3 */}
          <rect x="12" y="18" width="22" height="24" rx="5" fill="#38BDF8" stroke="#0F172A" strokeWidth="3.5" />
          <text x="23" y="36" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">1</text>

          <rect x="39" y="18" width="22" height="24" rx="5" fill="#FDE047" stroke="#0F172A" strokeWidth="3.5" />
          <text x="50" y="36" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">2</text>

          <rect x="66" y="18" width="22" height="24" rx="5" fill="#4ADE80" stroke="#0F172A" strokeWidth="3.5" />
          <text x="77" y="36" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">3</text>

          {/* Birthday Cake (Edad / Fechas) */}
          <rect x="28" y="58" width="44" height="24" rx="6" fill="#F43F5E" stroke="#0F172A" strokeWidth="3" />
          <line x1="50" y1="50" x2="50" y2="58" stroke="#FDE047" strokeWidth="3" />
          <circle cx="50" cy="48" r="3" fill="#FB923C" />
          <text x="50" y="75" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#FFFFFF" fontFamily="Fredoka">EDAD</text>
        </svg>
      );

    case 'painting':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="48" cy="52" rx="36" ry="30" fill="#FDE68A" stroke="#0F172A" strokeWidth="4" />
          <circle cx="68" cy="62" r="7" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3" />
          {/* Color spots */}
          <circle cx="28" cy="46" r="6" fill="#EF4444" />
          <circle cx="44" cy="36" r="6" fill="#3B82F6" />
          <circle cx="60" cy="38" r="6" fill="#10B981" />
          <circle cx="34" cy="64" r="6" fill="#F59E0B" />
          {/* Brush */}
          <path d="M 64 22 L 84 42" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
          <path d="M 80 38 L 86 44 L 80 48 Z" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />
        </svg>
      );

    case 'key-space':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Wide Spacebar Key */}
          <rect x="10" y="34" width="80" height="32" rx="8" fill="#FDE047" stroke="#0F172A" strokeWidth="4" />
          <rect x="14" y="38" width="72" height="24" rx="5" fill="#FEF08A" />
          {/* Visual spacing indicator */}
          <path d="M 28 50 L 72 50" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
          <path d="M 28 44 L 28 56" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
          <path d="M 72 44 L 72 56" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
          <text x="50" y="78" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">ESPACIO</text>
        </svg>
      );

    case 'key-enter':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Enter Key */}
          <rect x="16" y="20" width="68" height="56" rx="10" fill="#38BDF8" stroke="#0F172A" strokeWidth="4" />
          {/* Curved Arrow down to next line */}
          <path
            d="M 66 38 L 44 38 L 44 54 M 44 54 L 34 54 L 46 66 L 58 54 L 48 54"
            fill="#0F172A"
            stroke="#0F172A"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <text x="50" y="86" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">ENTER ↵</text>
        </svg>
      );

    case 'key-backspace':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Backspace Key */}
          <path
            d="M 30 24 L 80 24 C 84 24, 88 28, 88 32 L 88 64 C 88 68, 84 72, 80 72 L 30 72 L 12 48 Z"
            fill="#F87171"
            stroke="#0F172A"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Arrow / Cross for deleting letter */}
          <line x1="42" y1="40" x2="62" y2="56" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
          <line x1="62" y1="40" x2="42" y2="56" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
          <text x="50" y="86" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">BORRAR ⌫</text>
        </svg>
      );

    case 'double-click':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Mouse with two click sparks */}
          <path
            d="M 50 26 C 36 26, 28 38, 28 56 C 28 72, 38 82, 50 82 C 62 82, 72 72, 72 56 C 72 38, 64 26, 50 26 Z"
            fill="#FACC15"
            stroke="#0F172A"
            strokeWidth="4"
          />
          <line x1="50" y1="26" x2="50" y2="50" stroke="#0F172A" strokeWidth="3" />
          <line x1="28" y1="50" x2="72" y2="50" stroke="#0F172A" strokeWidth="3" />
          {/* Click spark 1 */}
          <circle cx="36" cy="18" r="5" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />
          {/* Click spark 2 */}
          <circle cx="58" cy="14" r="6" fill="#38BDF8" stroke="#0F172A" strokeWidth="2" />
          {/* Badge "2x" */}
          <rect x="36" y="80" width="28" height="18" rx="6" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />
          <text x="50" y="93" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#FFFFFF" fontFamily="Fredoka">2 CLIC</text>
        </svg>
      );

    case 'drag':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Box A (origin) */}
          <rect x="14" y="44" width="28" height="28" rx="6" fill="#93C5FD" stroke="#0F172A" strokeWidth="3" strokeDasharray="4 3" />
          {/* Motion dotted arrow */}
          <path d="M 44 48 Q 54 34 66 44" stroke="#F59E0B" strokeWidth="4" strokeDasharray="4 4" strokeLinecap="round" />
          <path d="M 62 38 L 70 44 L 62 50" fill="#F59E0B" />
          {/* Box B (being moved) */}
          <rect x="58" y="44" width="30" height="30" rx="6" fill="#3B82F6" stroke="#0F172A" strokeWidth="3.5" />
          {/* Hand / Cursor holding */}
          <path
            d="M 68 22 L 72 38 L 62 42 Z"
            fill="#FACC15"
            stroke="#0F172A"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <text x="50" y="88" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">ARRASTRAR ➡️</text>
        </svg>
      );

    case 'single-click':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Mouse with one click */}
          <path
            d="M 50 24 C 36 24, 28 36, 28 54 C 28 70, 38 80, 50 80 C 62 80, 72 70, 72 54 C 72 36, 64 24, 50 24 Z"
            fill="#38BDF8"
            stroke="#0F172A"
            strokeWidth="4"
          />
          <line x1="50" y1="24" x2="50" y2="48" stroke="#0F172A" strokeWidth="3" />
          <line x1="28" y1="48" x2="72" y2="48" stroke="#0F172A" strokeWidth="3" />
          {/* Single click touch circle */}
          <circle cx="38" cy="18" r="8" fill="#FACC15" stroke="#0F172A" strokeWidth="2.5" />
          <text x="50" y="93" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">1 CLIC</text>
        </svg>
      );

    case 'laptop':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Open Laptop screen */}
          <rect x="22" y="18" width="56" height="42" rx="6" fill="#38BDF8" stroke="#0F172A" strokeWidth="4" />
          <rect x="28" y="24" width="44" height="30" rx="3" fill="#0284C7" />
          {/* Battery icon */}
          <rect x="52" y="28" width="16" height="8" rx="2" fill="#4ADE80" stroke="#FFFFFF" strokeWidth="1.5" />
          <rect x="68" y="30" width="2" height="4" fill="#FFFFFF" />
          {/* Smile on screen */}
          <circle cx="42" cy="38" r="3" fill="#FFFFFF" />
          <circle cx="50" cy="38" r="3" fill="#FFFFFF" />
          <path d="M 43 44 Q 46 47 49 44" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
          {/* Base and Keyboard */}
          <path d="M 12 68 L 22 60 L 78 60 L 88 68 Z" fill="#E2E8F0" stroke="#0F172A" strokeWidth="4" strokeLinejoin="round" />
          {/* Trackpad */}
          <rect x="42" y="62" width="16" height="5" rx="1.5" fill="#94A3B8" />
          {/* Travel / Backpack tag */}
          <rect x="30" y="78" width="40" height="14" rx="4" fill="#FACC15" stroke="#0F172A" strokeWidth="2" />
          <text x="50" y="89" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">PORTÁTIL 🎒</text>
        </svg>
      );

    case 'toy-windup':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Wind-up key */}
          <circle cx="82" cy="46" r="8" fill="#F59E0B" stroke="#0F172A" strokeWidth="3" />
          <line x1="74" y1="46" x2="68" y2="46" stroke="#0F172A" strokeWidth="3" />
          {/* Toy body */}
          <rect x="20" y="32" width="48" height="40" rx="12" fill="#F43F5E" stroke="#0F172A" strokeWidth="4" />
          <circle cx="34" cy="46" r="5" fill="#FFFFFF" />
          <circle cx="34" cy="46" r="2" fill="#0F172A" />
          <circle cx="52" cy="46" r="5" fill="#FFFFFF" />
          <circle cx="52" cy="46" r="2" fill="#0F172A" />
          <path d="M 38 56 Q 43 62 48 56" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          {/* Wheels */}
          <circle cx="28" cy="74" r="8" fill="#38BDF8" stroke="#0F172A" strokeWidth="3" />
          <circle cx="60" cy="74" r="8" fill="#38BDF8" stroke="#0F172A" strokeWidth="3" />
          <text x="50" y="93" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">JUGUETE</text>
        </svg>
      );

    case 'book-paper':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Open paper book */}
          <path d="M 14 30 Q 50 24 50 36 Q 50 24 86 30 L 86 74 Q 50 68 50 80 Q 50 68 14 74 Z" fill="#F8FAFC" stroke="#0F172A" strokeWidth="4" />
          <line x1="50" y1="36" x2="50" y2="80" stroke="#0F172A" strokeWidth="3" />
          {/* Lines on pages */}
          <line x1="22" y1="42" x2="42" y2="44" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="22" y1="52" x2="42" y2="54" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="22" y1="62" x2="38" y2="64" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="58" y1="44" x2="78" y2="42" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="58" y1="54" x2="78" y2="52" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="58" y1="64" x2="74" y2="62" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <text x="50" y="94" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">LIBRO DE PAPEL</text>
        </svg>
      );

    case 'eyes-look':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Two curious eyes looking */}
          <ellipse cx="32" cy="46" rx="16" ry="22" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
          <circle cx="36" cy="46" r="8" fill="#0284C7" />
          <circle cx="38" cy="44" r="3" fill="#FFFFFF" />

          <ellipse cx="68" cy="46" rx="16" ry="22" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
          <circle cx="72" cy="46" r="8" fill="#0284C7" />
          <circle cx="74" cy="44" r="3" fill="#FFFFFF" />

          {/* Mouse with prohibition cross */}
          <circle cx="50" cy="78" r="14" fill="#FEE2E2" stroke="#EF4444" strokeWidth="3" />
          <line x1="40" y1="68" x2="60" y2="88" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
          <text x="50" y="98" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">SOLO MIRAR 👀</text>
        </svg>
      );

    case 'videocall-family':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Webcam on top */}
          <circle cx="50" cy="18" r="10" fill="#0284C7" stroke="#0F172A" strokeWidth="3" />
          <circle cx="50" cy="18" r="4" fill="#0F172A" />
          <circle cx="50" cy="12" r="2" fill="#4ADE80" />
          {/* Monitor Screen with Abuelitos / Family */}
          <rect x="18" y="28" width="64" height="46" rx="6" fill="#38BDF8" stroke="#0F172A" strokeWidth="4" />
          <rect x="24" y="34" width="52" height="34" rx="3" fill="#E0F2FE" />
          {/* Grandparent 1 */}
          <circle cx="38" cy="46" r="7" fill="#F59E0B" />
          <circle cx="38" cy="41" r="8" fill="#E2E8F0" opacity="0.8" />
          {/* Grandparent 2 with glasses */}
          <circle cx="58" cy="46" r="7" fill="#F43F5E" />
          <circle cx="55" cy="46" r="3" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="61" cy="46" r="3" stroke="#0F172A" strokeWidth="1.5" />
          {/* Speakers on sides */}
          <rect x="8" y="38" width="8" height="24" rx="2" fill="#1E293B" />
          <rect x="84" y="38" width="8" height="24" rx="2" fill="#1E293B" />
          <text x="50" y="88" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">CÁMARA Y PARLANTES 📞</text>
        </svg>
      );

    case 'spoon-shoe':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Shoe */}
          <path d="M 18 56 C 18 48, 30 40, 42 40 L 48 40 L 52 48 L 66 52 C 72 54, 74 62, 72 66 L 18 66 Z" fill="#EF4444" stroke="#0F172A" strokeWidth="3" />
          <rect x="16" y="66" width="58" height="8" rx="2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
          {/* Spoon crossing */}
          <ellipse cx="65" cy="28" rx="12" ry="16" fill="#CBD5E1" stroke="#0F172A" strokeWidth="3" transform="rotate(30 65 28)" />
          <path d="M 60 40 L 40 76" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
          <text x="50" y="88" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">ZAPATO Y CUCHARA</text>
        </svg>
      );

    case 'learn-draw':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Learning screen */}
          <rect x="16" y="16" width="68" height="48" rx="8" fill="#FEF08A" stroke="#0F172A" strokeWidth="4" />
          {/* ABC */}
          <text x="32" y="36" fontSize="14" fontWeight="bold" fill="#0284C7" fontFamily="Fredoka">A</text>
          <text x="44" y="36" fontSize="14" fontWeight="bold" fill="#E11D48" fontFamily="Fredoka">B</text>
          <text x="56" y="36" fontSize="14" fontWeight="bold" fill="#16A34A" fontFamily="Fredoka">C</text>
          {/* Paint brush and star */}
          <path d="M 28 52 L 40 44" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
          <circle cx="56" cy="48" r="6" fill="#F43F5E" />
          <path d="M 66 44 L 68 48 L 72 49 L 69 52 L 70 56 L 66 53 L 62 56 L 63 52 L 60 49 L 64 48 Z" fill="#FACC15" stroke="#0F172A" strokeWidth="1" />
          {/* Stand */}
          <path d="M 36 64 L 64 64" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          <text x="50" y="84" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">APRENDER Y DIBUJAR 🎨</text>
        </svg>
      );

    case 'washing-machine':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Washing machine body */}
          <rect x="22" y="14" width="56" height="70" rx="8" fill="#F1F5F9" stroke="#0F172A" strokeWidth="4" />
          <rect x="28" y="20" width="16" height="8" rx="2" fill="#38BDF8" />
          <circle cx="58" cy="24" r="3" fill="#0F172A" />
          <circle cx="66" cy="24" r="3" fill="#0F172A" />
          {/* Glass door with water */}
          <circle cx="50" cy="54" r="20" fill="#38BDF8" stroke="#0F172A" strokeWidth="4" />
          <circle cx="50" cy="54" r="14" fill="#0284C7" />
          <path d="M 40 54 Q 50 48 60 54" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          {/* Soap bubbles */}
          <circle cx="26" cy="12" r="5" fill="#BAE6FD" opacity="0.8" />
          <circle cx="74" cy="14" r="7" fill="#BAE6FD" opacity="0.8" />
          <text x="50" y="96" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">LAVADORA DE ROPA</text>
        </svg>
      );

    case 'pot-soup':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Steam */}
          <path d="M 38 18 Q 34 26 38 32" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          <path d="M 50 14 Q 46 24 50 32" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          <path d="M 62 18 Q 58 26 62 32" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          {/* Pot body */}
          <rect x="24" y="36" width="52" height="42" rx="10" fill="#94A3B8" stroke="#0F172A" strokeWidth="4" />
          {/* Handles */}
          <path d="M 16 44 Q 24 44 24 54 Q 24 64 16 64" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M 84 44 Q 76 44 76 54 Q 76 64 84 64" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Soup color */}
          <ellipse cx="50" cy="44" rx="22" ry="6" fill="#F59E0B" />
          <text x="50" y="93" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">OLLA DE SOPA 🍲</text>
        </svg>
      );

    case 'cpu-brain-active':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Tower CPU working */}
          <rect x="26" y="14" width="48" height="72" rx="8" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />
          {/* Disc Slot */}
          <rect x="34" y="24" width="32" height="6" rx="2" fill="#0F172A" />
          {/* Glowing Digital Brain / Circuits */}
          <circle cx="50" cy="52" r="16" fill="#0284C7" stroke="#38BDF8" strokeWidth="2.5" />
          {/* Brain curves */}
          <path d="M 44 48 Q 40 52 44 56 Q 50 56 50 52 Q 50 48 44 48 Z" fill="#FACC15" />
          <path d="M 56 48 Q 60 52 56 56 Q 50 56 50 52 Q 50 48 56 48 Z" fill="#FACC15" />
          {/* Glowing Green power button */}
          <circle cx="50" cy="74" r="6" fill="#4ADE80" stroke="#0F172A" strokeWidth="2" className="animate-pulse" />
          <text x="50" y="96" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">CEREBRO ACTIVO 🧠</text>
        </svg>
      );

    case 'letters-flying':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Keyboard with flying letters */}
          <rect x="14" y="52" width="72" height="34" rx="6" fill="#E2E8F0" stroke="#0F172A" strokeWidth="3.5" />
          {/* Letters vanishing */}
          <text x="24" y="38" fontSize="16" fontWeight="bold" fill="#EF4444" fontFamily="Fredoka" className="animate-bounce">A</text>
          <text x="46" y="26" fontSize="18" fontWeight="bold" fill="#3B82F6" fontFamily="Fredoka" className="animate-bounce">1</text>
          <text x="70" y="34" fontSize="16" fontWeight="bold" fill="#F59E0B" fontFamily="Fredoka" className="animate-bounce">Z</text>
          <path d="M 30 40 Q 34 46 28 50" stroke="#94A3B8" strokeWidth="2" strokeDasharray="2 2" />
          <path d="M 50 30 Q 52 40 48 50" stroke="#94A3B8" strokeWidth="2" strokeDasharray="2 2" />
          <path d="M 72 38 Q 68 44 70 50" stroke="#94A3B8" strokeWidth="2" strokeDasharray="2 2" />
          <text x="50" y="96" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">LETRAS BORRADAS</text>
        </svg>
      );

    case 'smartphone':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Smartphone body */}
          <rect x="28" y="10" width="44" height="76" rx="10" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />
          <rect x="33" y="18" width="34" height="56" rx="4" fill="#38BDF8" />
          {/* Speaker notch */}
          <line x1="45" y1="14" x2="55" y2="14" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          {/* App grid */}
          <rect x="37" y="24" width="10" height="10" rx="2.5" fill="#4ADE80" />
          <rect x="53" y="24" width="10" height="10" rx="2.5" fill="#FACC15" />
          <rect x="37" y="40" width="10" height="10" rx="2.5" fill="#F43F5E" />
          <rect x="53" y="40" width="10" height="10" rx="2.5" fill="#A855F7" />
          {/* Home bar */}
          <circle cx="50" cy="80" r="3" fill="#94A3B8" />
          <text x="50" y="97" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">CELULAR 📱</text>
        </svg>
      );

    case 'bicycle':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Wheels */}
          <circle cx="26" cy="64" r="16" fill="#E2E8F0" stroke="#0F172A" strokeWidth="4" />
          <circle cx="26" cy="64" r="4" fill="#0F172A" />
          <circle cx="74" cy="64" r="16" fill="#E2E8F0" stroke="#0F172A" strokeWidth="4" />
          <circle cx="74" cy="64" r="4" fill="#0F172A" />
          {/* Frame */}
          <path d="M 26 64 L 46 64 L 62 42 L 38 42 Z" stroke="#EF4444" strokeWidth="4" strokeLinejoin="round" fill="none" />
          <line x1="38" y1="42" x2="34" y2="32" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
          <line x1="28" y1="32" x2="40" y2="32" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          <line x1="74" y1="64" x2="62" y2="30" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
          <line x1="56" y1="30" x2="68" y2="30" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
          <text x="50" y="95" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">BICICLETA 🚲</text>
        </svg>
      );

    case 'fridge':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Fridge body */}
          <rect x="26" y="12" width="48" height="74" rx="8" fill="#BAE6FD" stroke="#0F172A" strokeWidth="4" />
          {/* Freezer divider */}
          <line x1="26" y1="38" x2="74" y2="38" stroke="#0F172A" strokeWidth="3.5" />
          {/* Handles */}
          <line x1="34" y1="22" x2="34" y2="32" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          <line x1="34" y1="46" x2="34" y2="62" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          {/* Snowflake icon */}
          <circle cx="56" cy="25" r="5" fill="#FFFFFF" />
          <text x="50" y="96" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">NEVERA 🧊</text>
        </svg>
      );

    case 'space-words':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          {/* Top word pair separated by space */}
          <rect x="8" y="20" width="36" height="22" rx="5" fill="#BAE6FD" stroke="#0F172A" strokeWidth="2.5" />
          <text x="26" y="35" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">MI</text>
          <rect x="56" y="20" width="36" height="22" rx="5" fill="#BAE6FD" stroke="#0F172A" strokeWidth="2.5" />
          <text x="74" y="35" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">MAMÁ</text>
          {/* Arrow pointing to space */}
          <path d="M 50 52 L 50 38" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" />
          {/* Spacebar key at bottom */}
          <rect x="14" y="56" width="72" height="24" rx="6" fill="#FDE047" stroke="#0F172A" strokeWidth="3.5" />
          <path d="M 32 68 L 68 68" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
          <text x="50" y="93" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0F172A" fontFamily="Fredoka">SEPARAR PALABRAS</text>
        </svg>
      );

    default:
      return (
        <div className="flex items-center justify-center w-20 h-20 bg-amber-200 rounded-2xl text-3xl font-bold text-amber-900 border-4 border-amber-500">
          ⭐
        </div>
      );
  }
};

