'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import { EASE_PREMIUM } from '@/lib/motion';

/* ── Treatment zone data with precise SVG coordinates ── */
/* ViewBox: 0 0 100 135 — portrait ratio for natural face proportions */
interface FaceMapZone {
  id: string;
  nameKey: string;
  descKey: string;
  priceKey: string;
  x: number;
  y: number;
  side?: 'left' | 'right' | 'center';
}

const FACE_MAP_ZONES: FaceMapZone[] = [
  { id: 'voorhoofd',       nameKey: 'facemap_voorhoofd',       descKey: 'facemap_voorhoofd_desc',       priceKey: 'facemap_voorhoofd_price',       x: 50,   y: 24,   side: 'center' },
  { id: 'frons',            nameKey: 'facemap_frons',            descKey: 'facemap_frons_desc',            priceKey: 'facemap_frons_price',            x: 50,   y: 37,   side: 'center' },
  { id: 'kraaienpootjes',   nameKey: 'facemap_kraaienpootjes',   descKey: 'facemap_kraaienpootjes_desc',   priceKey: 'facemap_kraaienpootjes_price',   x: 72,   y: 47,   side: 'right' },
  { id: 'wenkbrauwen',      nameKey: 'facemap_wenkbrauwen',      descKey: 'facemap_wenkbrauwen_desc',      priceKey: 'facemap_wenkbrauwen_price',      x: 30,   y: 39,   side: 'left' },
  { id: 'bunny-lines',      nameKey: 'facemap_bunny_lines',      descKey: 'facemap_bunny_lines_desc',      priceKey: 'facemap_bunny_lines_price',      x: 50,   y: 56,   side: 'center' },
  { id: 'lip-flip',         nameKey: 'facemap_lip_flip',         descKey: 'facemap_lip_flip_desc',         priceKey: 'facemap_lip_flip_price',         x: 50,   y: 75,   side: 'center' },
  { id: 'gummy-smile',      nameKey: 'facemap_gummy_smile',      descKey: 'facemap_gummy_smile_desc',      priceKey: 'facemap_gummy_smile_price',      x: 38,   y: 70,   side: 'left' },
  { id: 'masseter',         nameKey: 'facemap_masseter',         descKey: 'facemap_masseter_desc',         priceKey: 'facemap_masseter_price',         x: 72,   y: 75,   side: 'right' },
  { id: 'kin',              nameKey: 'facemap_kin',              descKey: 'facemap_kin_desc',              priceKey: 'facemap_kin_price',              x: 50,   y: 89,   side: 'center' },
  { id: 'hals',             nameKey: 'facemap_hals',             descKey: 'facemap_hals_desc',             priceKey: 'facemap_hals_price',             x: 50,   y: 105,  side: 'center' },
  { id: 'hyperhidrose',     nameKey: 'facemap_hyperhidrose',     descKey: 'facemap_hyperhidrose_desc',     priceKey: 'facemap_hyperhidrose_price',     x: 26,   y: 75,   side: 'left' },
  { id: 'nefertiti',        nameKey: 'facemap_nefertiti',        descKey: 'facemap_nefertiti_desc',        priceKey: 'facemap_nefertiti_price',        x: 70,   y: 96,   side: 'right' },
];

/* ── SVG Face Line Art (aligned to Ava — viewBox 0 0 100 137) ── */
function FaceSVG() {
  return (
    <>
      <defs>
        {/* Glow & Skin Gradients */}
        <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DFBC9D" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#DFBC9D" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#DFBC9D" stopOpacity="0.01" />
        </linearGradient>

        <radialGradient id="cheekBlush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="lipGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.1" />
        </linearGradient>

        <radialGradient id="hairGrad" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#251E13" />
          <stop offset="80%" stopColor="#0F0C0A" />
          <stop offset="100%" stopColor="#080605" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="noseGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g id="face-lineart" fill="none" stroke="#D4AF37" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" style={{ pointerEvents: 'none' }}>

        {/* ── Hair silhouette base ── */}
        <path fill="url(#hairGrad)" stroke="none" d="
          M 50 -5
          C 18 -5, -2 25, 5 65
          C 10 85, 5 115, 15 137
          L 25 137
          C 15 115, 12 95, 18 65
          C 22 35, 35 8, 50 8
          C 65 8, 78 35, 82 65
          C 88 95, 85 115, 75 137
          L 85 137
          C 95 115, 90 85, 95 65
          C 102 25, 82 -5, 50 -5 Z
        " />

        {/* Flowing hair shadow */}
        <path opacity="0.1" fill="#D4AF37" stroke="none" d="
          M 50 2
          C 23 2, -2 25, -2 65
          C -2 95, 5 120, 15 137
          L 25 137
          C 15 115, 10 95, 10 65
          C 14 35, 30 13, 50 13
          C 70 13, 86 35, 90 65
          C 90 95, 85 115, 75 137
          L 85 137
          C 95 120, 102 95, 102 65
          C 102 25, 77 2, 50 2 Z
        " />

      {/* ── Flowing hair strands ── */}
      <path strokeWidth="0.45" opacity="0.6" d="
        M 50 5
        C 28 5, 10 20, 7 50
        C 4 65, 4 85, 10 105
        C 14 117, 20 125, 24 132
      " />
      <path strokeWidth="0.45" opacity="0.6" d="
        M 50 5
        C 72 5, 90 20, 93 50
        C 96 65, 96 85, 90 105
        C 86 117, 80 125, 76 132
      " />
      <path strokeWidth="0.3" opacity="0.3" d="
        M 50 7
        C 35 7, 20 22, 16 48
        C 12 65, 14 80, 20 100
      " />
      <path strokeWidth="0.3" opacity="0.3" d="
        M 50 7
        C 65 7, 80 22, 84 48
        C 88 65, 86 80, 80 100
      " />

      {/* ── Face outline (aligned to Ava) ── */}
        <path fill="url(#skinGrad)" strokeWidth="0.6" d="
          M 50 12
          C 40 12, 33 17, 30 24
          C 27 32, 27 38, 27 44
          C 27 50, 28 56, 30 62
          C 32 68, 34 74, 37 78
          C 39 82, 43 85, 46 87
          C 48 88, 49 88.5, 50 89
          C 51 88.5, 52 88, 54 87
          C 57 85, 61 82, 63 78
          C 66 74, 68 68, 70 62
          C 72 56, 73 50, 73 44
          C 73 38, 73 32, 70 24
          C 67 17, 60 12, 50 12 Z
        " />

        {/* ── Cheekbone blush ── */}
        <ellipse cx="32" cy="58" rx="7" ry="11" fill="url(#cheekBlush)" stroke="none" transform="rotate(-30 32 58)" />
        <ellipse cx="68" cy="58" rx="7" ry="11" fill="url(#cheekBlush)" stroke="none" transform="rotate(30 68 58)" />

        {/* ── Nose glow ── */}
        <ellipse cx="50" cy="55" rx="3.5" ry="14" fill="url(#noseGlow)" stroke="none" />

        {/* ── Neck base fill ── */}
        <path fill="url(#skinGrad)" strokeWidth="0.4" d="
          M 40 90
          C 38 95, 37 101, 37 106
          C 37 110, 38 115, 40 120
          L 60 120
          C 62 115, 63 110, 63 106
          C 63 101, 62 95, 60 90 Z
        " />

      {/* ── Hairline ── */}
      <path strokeWidth="0.35" opacity="0.45" d="
        M 32 24
        C 34 16, 40 11, 50 11
        C 60 11, 66 16, 68 24
      " />
      <path strokeWidth="0.25" opacity="0.2" d="
        M 34 21
        C 37 14, 43 10, 50 10
        C 57 10, 63 14, 66 21
      " />

      {/* ── Left eyebrow (arched) ── */}
      <path fill="#2F231A" stroke="none" d="
        M 32 40
        C 34 37, 36.5 36, 39 36.5
        C 42 37.5, 44 38.5, 46 40
        C 44 38, 41 36, 39 35.5
        C 36 35, 33 36, 32 40 Z
      " opacity="0.6" />
      <path strokeWidth="0.65" d="
        M 32 40
        C 34 37, 36.5 36, 39 36.5
        C 42 37.5, 44 38.5, 46 40
      " />

      {/* ── Right eyebrow (arched) ── */}
      <path fill="#2F231A" stroke="none" d="
        M 68 40
        C 66 37, 63.5 36, 61 36.5
        C 58 37.5, 56 38.5, 54 40
        C 56 38, 59 36, 61 35.5
        C 64 35, 67 36, 68 40 Z
      " opacity="0.6" />
      <path strokeWidth="0.65" d="
        M 68 40
        C 66 37, 63.5 36, 61 36.5
        C 58 37.5, 56 38.5, 54 40
      " />

        {/* ── Left eye (almond) ── */}
      <path fill="rgba(253, 252, 240, 0.4)" strokeWidth="0.45" d="
        M 34 46
        C 35.5 43, 38 42, 40 42.5
        C 43 43.5, 45.5 45, 46 46.5
        C 44.5 48, 42 49, 40 49
        C 37 48.8, 35 48, 34 46 Z
      " />
      <circle cx="40" cy="46" r="2.8" fill="rgba(90, 58, 31, 0.5)" stroke="none" />
      <circle cx="40" cy="46" r="1.4" fill="rgba(0,0,0,0.6)" stroke="none" />
      <circle cx="39" cy="45.2" r="0.4" fill="#FFF" stroke="none" opacity="0.8" />

      {/* Eyelash hints */}
      <path strokeWidth="0.3" d="M 34 46 C 32 44.5, 30 43.5, 29 42.5" />
      <path strokeWidth="0.3" d="M 35.5 43.5 C 34.5 42, 32.5 40.5, 31.5 39.5" />
      <path strokeWidth="0.3" d="M 38 42.5 C 37 40.5, 36 38.5, 36 37.5" />
      <circle cx="40" cy="46" r="1.6" strokeWidth="0.35" opacity="0.4" />

      {/* ── Right eye (almond) ── */}
      <path fill="rgba(253, 252, 240, 0.4)" strokeWidth="0.45" d="
        M 66 46
        C 64.5 43, 62 42, 60 42.5
        C 57 43.5, 54.5 45, 54 46.5
        C 55.5 48, 58 49, 60 49
        C 63 48.8, 65 48, 66 46 Z
      " />
      <circle cx="60" cy="46" r="2.8" fill="rgba(90, 58, 31, 0.5)" stroke="none" />
      <circle cx="60" cy="46" r="1.4" fill="rgba(0,0,0,0.6)" stroke="none" />
      <circle cx="61" cy="45.2" r="0.4" fill="#FFF" stroke="none" opacity="0.8" />

      {/* Eyelash hints */}
      <path strokeWidth="0.3" d="M 66 46 C 68 44.5, 70 43.5, 71 42.5" />
      <path strokeWidth="0.3" d="M 64.5 43.5 C 65.5 42, 67.5 40.5, 68.5 39.5" />
      <path strokeWidth="0.3" d="M 62 42.5 C 63 40.5, 64 38.5, 64 37.5" />
      <circle cx="60" cy="46" r="1.6" strokeWidth="0.35" opacity="0.4" />

      {/* ── Nose bridge ── */}
      <path strokeWidth="0.35" opacity="0.5" d="
        M 48 42
        C 47.5 47, 47 52, 46.5 58
        C 46 60, 45.5 62, 45 63.5
      " />
      <path strokeWidth="0.35" opacity="0.5" d="
        M 52 42
        C 52.5 47, 53 52, 53.5 58
        C 54 60, 54.5 62, 55 63.5
      " />

      {/* ── Nose tip & nostrils ── */}
      <path strokeWidth="0.45" d="
        M 45 63.5
        C 44 64.5, 43.5 65.5, 44 66
        C 44.5 66.5, 46 66.7, 48 66.3
        C 49 66, 50 65.7, 50 65.7
        C 50 65.7, 51 66, 52 66.3
        C 54 66.7, 55.5 66.5, 56 66
        C 56.5 65.5, 56 64.5, 55 63.5
      " />

      {/* ── Upper lip (cupid's bow) ── */}
      <path strokeWidth="0.5" d="
        M 43 75
        C 44.5 72.5, 47 71.5, 48.5 72.5
        C 49 73, 50 73.5, 50 73.5
        C 50 73.5, 51 73, 51.5 72.5
        C 53 71.5, 55.5 72.5, 57 75
        C 55.5 75.5, 53 76, 50 76
        C 47 76, 44.5 75.5, 43 75 Z
      " fill="url(#lipGrad)" />

      {/* ── Lower lip ── */}
      <path strokeWidth="0.5" d="
        M 43 75
        C 44.5 78.5, 47 80, 50 80
        C 53 80, 55.5 78.5, 57 75
        C 55.5 76, 53 77, 50 77
        C 47 77, 44.5 76, 43 75 Z
      " fill="url(#lipGrad)" />

      {/* Glossy lip highlight */}
      <path fill="rgba(255,255,255,0.4)" d="
        M 46 78
        C 48 78.8, 52 78.8, 54 78
        C 52.5 78.3, 47.5 78.3, 46 78 Z
      " />

      {/* ── Lip center line ── */}
      <path strokeWidth="0.8" stroke="rgba(47, 35, 26, 0.4)" d="
        M 43 75
        C 46 76.5, 50 76, 50 76
        C 50 76, 54 76.5, 57 75
      " />

      {/* ── Philtrum ── */}
      <path strokeWidth="0.2" opacity="0.2" d="M 48.5 66.5 L 48.8 73" />
      <path strokeWidth="0.2" opacity="0.2" d="M 51.5 66.5 L 51.2 73" />

      {/* ── Chin ── */}
      <path strokeWidth="0.25" opacity="0.35" d="
        M 45 87.5
        C 47 88.5, 50 89, 50 89
        C 50 89, 53 88.5, 55 87.5
      " />

      {/* ── Nasolabial folds ── */}
      <path strokeWidth="0.2" opacity="0.2" d="M 42 62 C 41 66, 40.5 70, 41 75" />
      <path strokeWidth="0.2" opacity="0.2" d="M 58 62 C 59 66, 59.5 70, 59 75" />

      {/* ── Cheekbone highlights ── */}
      <path strokeWidth="0.2" opacity="0.15" d="M 29 57 C 31 55, 35 54, 38 54.5" />
      <path strokeWidth="0.2" opacity="0.15" d="M 71 57 C 69 55, 65 54, 62 54.5" />

      {/* ── Ears ── */}
      <path strokeWidth="0.3" opacity="0.3" d="
        M 26 43
        C 24 45, 23 48, 23 51
        C 23 54, 24 56, 26 57
      " />
      <path strokeWidth="0.3" opacity="0.3" d="
        M 74 43
        C 76 45, 77 48, 77 51
        C 77 54, 76 56, 74 57
      " />

      {/* ── Neck ── */}
      <path strokeWidth="0.4" opacity="0.5" d="
        M 40 90
        C 38 95, 37 101, 37 106
        C 37 110, 38 115, 40 120
      " />
      <path strokeWidth="0.4" opacity="0.5" d="
        M 60 90
        C 62 95, 63 101, 63 106
        C 63 110, 62 115, 60 120
      " />

      {/* ── Platysma / neck details ── */}
      <path strokeWidth="0.2" opacity="0.18" d="M 44 93 C 43 100, 42 107, 42 115" />
      <path strokeWidth="0.2" opacity="0.18" d="M 56 93 C 57 100, 58 107, 58 115" />
      <path strokeWidth="0.2" opacity="0.15" d="M 50 91 C 50 100, 50 108, 50 117" />

      {/* ── Neck base / clavicle hint ── */}
      <path strokeWidth="0.35" opacity="0.25" d="
        M 28 120
        C 34 118, 42 116, 50 116
        C 58 116, 66 118, 72 120
      " />

      {/* ── Forehead structure lines ── */}
      <line x1="36" y1="27" x2="64" y2="27" strokeWidth="0.15" opacity="0.12" />
      <line x1="34" y1="31" x2="66" y2="31" strokeWidth="0.12" opacity="0.1" />

      {/* ── Jawline accent ── */}
      <path strokeWidth="0.25" opacity="0.25" d="
        M 33 78
        C 35 82, 38 85, 43 87
      " />
      <path strokeWidth="0.25" opacity="0.25" d="
        M 67 78
        C 65 82, 62 85, 57 87
      " />

      {/* ── Temple hollows ── */}
      <path strokeWidth="0.15" opacity="0.12" d="M 29 35 C 30 39, 30.5 42, 31 44" />
      <path strokeWidth="0.15" opacity="0.12" d="M 71 35 C 70 39, 69.5 42, 69 44" />
    </g>
    </>
  );
}

/* ── CSS keyframes injected once for pulse effect ──── */
const PULSE_CSS = `
@keyframes facemap-pulse {
  0%, 100% { r: 2.2; opacity: 0.55; }
  50% { r: 4.5; opacity: 0.08; }
}
@keyframes facemap-pulse-outer {
  0%, 100% { r: 2.2; opacity: 0.3; }
  50% { r: 5.5; opacity: 0; }
}
@keyframes facemap-flare-active {
  0% { transform: scale(1); opacity: 0.8; }
  25% { transform: scale(3.5); opacity: 0.4; }
  50% { transform: scale(1.5); opacity: 0.6; }
  100% { transform: scale(1); opacity: 0.8; }
}
`;

/* ── Pulsing Hotspot (CSS-animated, GPU-friendly) ──── */
function Hotspot({
  zone,
  isActive,
  onClick,
}: {
  zone: FaceMapZone;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <g
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={zone.id}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      style={{ cursor: 'pointer' }}
    >
      {/* Outer pulse ring — CSS animated */}
      <circle
        cx={zone.x}
        cy={zone.y}
        r={2.2}
        fill="none"
        stroke="#D4AF37"
        strokeWidth="0.3"
        style={{ animation: 'facemap-pulse 2.5s ease-in-out infinite' }}
      />
      {/* Second pulse ring (offset) */}
      <circle
        cx={zone.x}
        cy={zone.y}
        r={2.2}
        fill="none"
        stroke="#D4AF37"
        strokeWidth="0.2"
        style={{ animation: 'facemap-pulse-outer 2.5s ease-in-out 0.8s infinite' }}
      />
      
      {/* Flare animation triggered on active */}
      {isActive && (
        <circle
          cx={zone.x}
          cy={zone.y}
          r={2.5}
          fill="none"
          stroke="#D4AF37"
          strokeWidth="0.5"
          style={{ animation: 'facemap-flare-active 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards', transformOrigin: 'center', transformBox: 'fill-box' }}
        />
      )}

      {/* Core dot */}
      <circle
        cx={zone.x}
        cy={zone.y}
        r="1.8"
        fill={isActive ? '#D4AF37' : '#1a1a1a'}
        stroke="#D4AF37"
        strokeWidth="0.5"
      />
      {/* Inner glow */}
      <circle
        cx={zone.x}
        cy={zone.y}
        r="0.7"
        fill="#D4AF37"
        opacity={isActive ? 1 : 0.8}
      />
    </g>
  );
}

/* ── Info Modal ──────────────────────────────────────── */
function InfoModal({
  zone,
  t,
  onClose,
}: {
  zone: FaceMapZone;
  t: ReturnType<typeof useTranslations>;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <motion.div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={t(zone.nameKey)}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.35, ease: EASE_PREMIUM }}
        className="relative z-10 w-full max-w-md bg-[#111111] border border-[#D4AF37]/20 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Gold accent line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

        <div className="p-8 md:p-10">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-200"
            aria-label="Close"
          >
            <X size={16} className="text-[#D4AF37]" />
          </button>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]/70 font-semibold">
              Botox Treatment
            </span>
          </div>

          {/* Treatment name */}
          <h3 className="font-display text-2xl md:text-3xl text-white mb-4 italic">
            {t(zone.nameKey)}
          </h3>

          {/* Gold divider */}
          <div className="w-12 h-px bg-[#D4AF37]/40 mb-5" />

          {/* Description */}
          <p className="font-sans font-light text-white/60 text-sm leading-relaxed mb-8">
            {t(zone.descKey)}
          </p>

          {/* Price */}
          <div className="flex items-end gap-3 mb-6">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/50 font-semibold">
              Vanaf
            </span>
            <span className="font-display text-3xl text-[#D4AF37] font-bold">
              {t(zone.priceKey)}
            </span>
          </div>

          {/* Bottom accent */}
          <div className="h-px w-full bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/5 to-transparent" />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Component ──────────────────────────────────── */
interface BotoxFaceMapProps {
  activeExternalZoneId?: string | null;
}

export default function BotoxFaceMap({ activeExternalZoneId }: BotoxFaceMapProps = {}) {
  const t = useTranslations('botox_page');
  const [activeZone, setActiveZone] = useState<FaceMapZone | null>(null);
  const [flashZoneId, setFlashZoneId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (activeExternalZoneId) {
      setFlashZoneId(activeExternalZoneId);
      const timer = setTimeout(() => setFlashZoneId(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [activeExternalZoneId]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleZoneClick = useCallback((zone: FaceMapZone) => {
    setActiveZone(zone);
  }, []);

  const handleClose = useCallback(() => {
    setActiveZone(null);
  }, []);

  return (
    <section
      className="relative py-section-y bg-[#0a0a0a] overflow-hidden"
      aria-label={t('facemap_label')}
      data-no-custom-cursor="true"
      style={{ cursor: 'auto' }}
    >
      {/* Inject CSS keyframes for pulse animation (once) */}
      <style dangerouslySetInnerHTML={{ __html: PULSE_CSS }} />
      {/* Background texture elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(212,175,55,0.04)_0%,transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />
      </div>

      <Container>
        <SectionHeader
          label={t('facemap_label')}
          title={
            <>
              {t('facemap_title')}{' '}
              <span className="italic font-light text-[#D4AF37]">{t('facemap_title_accent')}</span>
            </>
          }
          subtitle={t('facemap_subtitle')}
          light
        />

        {/* Face Map Container */}
        <div className="relative max-w-lg mx-auto">
          {/* Decorative corner accents */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-[#D4AF37]/20" aria-hidden="true" />
          <div className="absolute -top-4 -right-4 w-8 h-8 border-t border-r border-[#D4AF37]/20" aria-hidden="true" />
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b border-l border-[#D4AF37]/20" aria-hidden="true" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-[#D4AF37]/20" aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: EASE_PREMIUM }}
          >
            <svg
              viewBox="0 0 100 137"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
              style={{ willChange: 'transform' }}
              role="img"
              aria-label={t('facemap_svg_aria')}
            >
              <defs>
                {/* Radial glow for hotspots */}
                <radialGradient id="hotspot-glow">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Ava photo backdrop */}
              <image href="/images/Newteam/Ava.jpg" x="0" y="0" width="100" height="137" preserveAspectRatio="xMidYMid slice" style={{ filter: 'grayscale(1)' }} />
              <rect x="0" y="0" width="100" height="137" fill="black" opacity="0.55" />

              {/* Face line art */}
              <FaceSVG />

              {/* Hotspots */}
              {FACE_MAP_ZONES.map((zone) => (
                <Hotspot
                  key={zone.id}
                  zone={zone}
                  isActive={activeZone?.id === zone.id || flashZoneId === zone.id}
                  onClick={() => handleZoneClick(zone)}
                />
              ))}
            </svg>
          </motion.div>

          {/* Mobile label hint */}
          {isMobile && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-center mt-4 font-sans text-[11px] text-white/30 tracking-wide uppercase"
            >
              {t('facemap_tap_hint')}
            </motion.p>
          )}
        </div>

        {/* Zone legend (desktop: below the map) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE_PREMIUM }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {FACE_MAP_ZONES.map((zone) => (
              <button
                key={zone.id}
                onClick={() => handleZoneClick(zone)}
                className={`group flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border transition-all duration-300 text-left ${
                  activeZone?.id === zone.id
                    ? 'border-[#D4AF37]/40 bg-[#D4AF37]/10'
                    : 'border-white/5 bg-white/[0.02] hover:border-[#D4AF37]/20 hover:bg-[#D4AF37]/5'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300 ${
                    activeZone?.id === zone.id ? 'bg-[#D4AF37]' : 'bg-[#D4AF37]/40 group-hover:bg-[#D4AF37]/70'
                  }`}
                />
                <span
                  className={`font-sans text-xs tracking-wide transition-colors duration-300 ${
                    activeZone?.id === zone.id ? 'text-[#D4AF37]' : 'text-white/50 group-hover:text-white/70'
                  }`}
                >
                  {t(zone.nameKey)}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </Container>

      {/* Modal */}
      <AnimatePresence>
        {activeZone && (
          <InfoModal zone={activeZone} t={t} onClose={handleClose} />
        )}
      </AnimatePresence>
    </section>
  );
}
