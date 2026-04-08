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
  { id: 'voorhoofd',       nameKey: 'facemap_voorhoofd',       descKey: 'facemap_voorhoofd_desc',       priceKey: 'facemap_voorhoofd_price',       x: 50,   y: 18,   side: 'center' },
  { id: 'frons',            nameKey: 'facemap_frons',            descKey: 'facemap_frons_desc',            priceKey: 'facemap_frons_price',            x: 50,   y: 30,   side: 'center' },
  { id: 'kraaienpootjes',   nameKey: 'facemap_kraaienpootjes',   descKey: 'facemap_kraaienpootjes_desc',   priceKey: 'facemap_kraaienpootjes_price',   x: 73,   y: 39,   side: 'right' },
  { id: 'wenkbrauwen',      nameKey: 'facemap_wenkbrauwen',      descKey: 'facemap_wenkbrauwen_desc',      priceKey: 'facemap_wenkbrauwen_price',      x: 31,   y: 33,   side: 'left' },
  { id: 'bunny-lines',      nameKey: 'facemap_bunny_lines',      descKey: 'facemap_bunny_lines_desc',      priceKey: 'facemap_bunny_lines_price',      x: 50,   y: 46,   side: 'center' },
  { id: 'lip-flip',         nameKey: 'facemap_lip_flip',         descKey: 'facemap_lip_flip_desc',         priceKey: 'facemap_lip_flip_price',         x: 50,   y: 64,   side: 'center' },
  { id: 'gummy-smile',      nameKey: 'facemap_gummy_smile',      descKey: 'facemap_gummy_smile_desc',      priceKey: 'facemap_gummy_smile_price',      x: 36,   y: 58,   side: 'left' },
  { id: 'masseter',         nameKey: 'facemap_masseter',         descKey: 'facemap_masseter_desc',         priceKey: 'facemap_masseter_price',         x: 74,   y: 62,   side: 'right' },
  { id: 'kin',              nameKey: 'facemap_kin',              descKey: 'facemap_kin_desc',              priceKey: 'facemap_kin_price',              x: 50,   y: 78,   side: 'center' },
  { id: 'hals',             nameKey: 'facemap_hals',             descKey: 'facemap_hals_desc',             priceKey: 'facemap_hals_price',             x: 50,   y: 100,  side: 'center' },
  { id: 'hyperhidrose',     nameKey: 'facemap_hyperhidrose',     descKey: 'facemap_hyperhidrose_desc',     priceKey: 'facemap_hyperhidrose_price',     x: 26,   y: 62,   side: 'left' },
  { id: 'nefertiti',        nameKey: 'facemap_nefertiti',        descKey: 'facemap_nefertiti_desc',        priceKey: 'facemap_nefertiti_price',        x: 70,   y: 85,   side: 'right' },
];

/* ── SVG Face Line Art (portrait ratio: viewBox 0 0 100 135) ── */
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
        
        {/* ── Voluminous Hair / Silhouette Base (creates colored feminine framing) ── */}
        <path fill="url(#hairGrad)" stroke="none" d="
          M 50 -10
          C 20 -10, -5 20, 5 60
          C 10 80, 5 110, 15 130
          L 25 130
          C 15 110, 12 90, 18 60
          C 22 30, 35 5, 50 5
          C 65 5, 78 30, 82 60
          C 88 90, 85 110, 75 130
          L 85 130
          C 95 110, 90 80, 95 60
          C 105 20, 80 -10, 50 -10 Z
        " />

        {/* Flowing hair shadow / optical glow trick behind face */}
        <path opacity="0.1" fill="#D4AF37" stroke="none" d="
          M 50 0
          C 25 0, -5 20, -5 60
          C -5 90, 5 115, 15 130
          L 25 130
          C 15 110, 10 90, 10 60
          C 14 30, 30 10, 50 10
          C 70 10, 86 30, 90 60
          C 90 90, 85 110, 75 130
          L 85 130
          C 95 115, 105 90, 105 60
          C 105 20, 75 0, 50 0 Z
        " />
      
      {/* ── Flowing hair (creates a feminine framing / outline) ── */}
      <path strokeWidth="0.45" opacity="0.6" d="
        M 50 2
        C 30 2, 10 15, 6 45
        C 4 60, 4 80, 10 100
        C 14 112, 20 120, 24 125
      " />
      <path strokeWidth="0.45" opacity="0.6" d="
        M 50 2
        C 70 2, 90 15, 94 45
        C 96 60, 96 80, 90 100
        C 86 112, 80 120, 76 125
      " />
      <path strokeWidth="0.3" opacity="0.3" d="
        M 50 4
        C 35 4, 18 16, 14 42
        C 10 60, 12 75, 18 95
      " />
      <path strokeWidth="0.3" opacity="0.3" d="
        M 50 4
        C 65 4, 82 16, 86 42
        C 90 60, 88 75, 82 95
      " />

      {/* ── Face outline: oval with defined cheekbones & tapered jaw ── */}
        <path fill="url(#skinGrad)" strokeWidth="0.6" d="
          M 50 6
          C 38 6, 28 10, 24 18
          C 20 26, 19 32, 19 38
          C 19 44, 20 49, 22 53
          C 24 58, 27 63, 30 67
          C 33 71, 37 74, 41 76
          C 44 77.5, 47 78.5, 50 79
          C 53 78.5, 56 77.5, 59 76
          C 63 74, 67 71, 70 67
          C 73 63, 76 58, 78 53
          C 80 49, 81 44, 81 38
          C 81 32, 80 26, 76 18
          C 72 10, 62 6, 50 6 Z
        " />

        {/* ── Blush/Cheekbone Shading (Optical aesthetic trick) ── */}
        <ellipse cx="28" cy="48" rx="8" ry="12" fill="url(#cheekBlush)" stroke="none" transform="rotate(-30 28 48)" />
        <ellipse cx="72" cy="48" rx="8" ry="12" fill="url(#cheekBlush)" stroke="none" transform="rotate(30 72 48)" />

        {/* ── Nose glow ── */}
        <ellipse cx="50" cy="42" rx="4" ry="15" fill="url(#noseGlow)" stroke="none" />

        {/* ── Neck base ── */}
        <path fill="url(#skinGrad)" strokeWidth="0.4" d="
          M 38 79
          C 36 84, 35 90, 35 97
          C 35 102, 36 107, 38 112
          L 62 112
          C 64 107, 65 102, 65 97
          C 65 90, 64 84, 62 79 Z

      {/* ── Hairline ── */}
      <path strokeWidth="0.35" opacity="0.45" d="
        M 28 18
        C 30 10, 38 5.5, 50 5.5
        C 62 5.5, 70 10, 72 18
      " />
      <path strokeWidth="0.25" opacity="0.2" d="
        M 30 15
        C 34 8, 42 5, 50 5
        C 58 5, 66 8, 70 15
      " />

      {/* ── Left eyebrow (higher feminine arch) ── */}
      <path fill="#2F231A" stroke="none" d="
        M 31 33
        C 34 30, 36.5 28.5, 39 29.5
        C 42 30.5, 44 31.5, 45.5 33
        C 43.5 31, 41 29, 39 28.5
        C 36 28, 33 29, 31 33 Z
      " opacity="0.6" />
      <path strokeWidth="0.65" d="
        M 31 33
        C 34 30, 36.5 28.5, 39 29.5
        C 42 30.5, 44 31.5, 45.5 33
      " />

      {/* ── Right eyebrow (higher feminine arch) ── */}
      <path fill="#2F231A" stroke="none" d="
        M 69 33
        C 66 30, 63.5 28.5, 61 29.5
        C 58 30.5, 56 31.5, 54.5 33
        C 56.5 31, 59 29, 61 28.5
        C 64 28, 67 29, 69 33 Z
      " opacity="0.6" />
      <path strokeWidth="0.65" d="
        M 69 33
        C 66 30, 63.5 28.5, 61 29.5
        C 58 30.5, 56 31.5, 54.5 33
      " />

        {/* ── Left eye (almond shape with subtle eyelashes) ── */}
      <path fill="rgba(253, 252, 240, 0.4)" strokeWidth="0.45" d="
        M 32 38.5
        C 34 35, 38 34, 40 34.5
        C 43 35.5, 45.5 37.5, 46 39
        C 44 40.5, 41 41.5, 39 41.5
        C 36 41.3, 33 40.5, 32 38.5 Z
      " />
      <circle cx="39.5" cy="38" r="2.8" fill="rgba(90, 58, 31, 0.5)" stroke="none" />
      <circle cx="39.5" cy="38" r="1.4" fill="rgba(0,0,0,0.6)" stroke="none" />
      <circle cx="38.5" cy="37.2" r="0.4" fill="#FFF" stroke="none" opacity="0.8" />
      
      {/* Eyelash hints */}
      <path strokeWidth="0.3" d="M 32 38.5 C 30 37, 28 36, 27 35" />
      <path strokeWidth="0.3" d="M 34 36.5 C 33 35, 31 33, 30 32" />
      <path strokeWidth="0.3" d="M 37 35 C 36 33, 35 31, 35 30" />
      <circle cx="39.5" cy="38" r="1.6" strokeWidth="0.35" opacity="0.4" />

      {/* ── Right eye (almond shape with subtle eyelashes) ── */}
      <path fill="rgba(253, 252, 240, 0.4)" strokeWidth="0.45" d="
        M 68 38.5
        C 66 35, 62 34, 60 34.5
        C 57 35.5, 54.5 37.5, 54 39
        C 56 40.5, 59 41.5, 61 41.5
        C 64 41.3, 67 40.5, 68 38.5 Z
      " />
      <circle cx="60.5" cy="38" r="2.8" fill="rgba(90, 58, 31, 0.5)" stroke="none" />
      <circle cx="60.5" cy="38" r="1.4" fill="rgba(0,0,0,0.6)" stroke="none" />
      <circle cx="61.5" cy="37.2" r="0.4" fill="#FFF" stroke="none" opacity="0.8" />
      
      {/* Eyelash hints */}
      <path strokeWidth="0.3" d="M 68 38.5 C 70 37, 72 36, 73 35" />
      <path strokeWidth="0.3" d="M 66 36.5 C 67 35, 69 33, 70 32" />
      <path strokeWidth="0.3" d="M 63 35 C 64 33, 65 31, 65 30" />
      <circle cx="60.5" cy="38" r="1.6" strokeWidth="0.35" opacity="0.4" />

      {/* ── Nose bridge (subtle lines down from brow) ── */}
      <path strokeWidth="0.35" opacity="0.5" d="
        M 48 34
        C 47.5 38, 47 42, 46.5 47
        C 46 49, 45 50.5, 44.5 51
      " />
      <path strokeWidth="0.35" opacity="0.5" d="
        M 52 34
        C 52.5 38, 53 42, 53.5 47
        C 54 49, 55 50.5, 55.5 51
      " />

      {/* ── Nose tip & nostrils ── */}
      <path strokeWidth="0.45" d="
        M 44.5 51
        C 43.5 52, 43 53, 43.5 53.5
        C 44 54, 46 54.2, 48 53.8
        C 49 53.5, 50 53.2, 50 53.2
        C 50 53.2, 51 53.5, 52 53.8
        C 54 54.2, 56 54, 56.5 53.5
        C 57 53, 56.5 52, 55.5 51
      " />

      {/* ── Upper lip (cupid's bow - fuller feminine shape) ── */}
      <path strokeWidth="0.5" d="
        M 41 62
        C 43 59, 46 58, 48 59
        C 49 59.5, 50 60, 50 60
        C 50 60, 51 59.5, 52 59
        C 54 58, 57 59, 59 62
        C 57 62.5, 54 63, 50 63
        C 46 63, 43 62.5, 41 62 Z
      " fill="url(#lipGrad)" />

      {/* ── Lower lip (fuller feminine shape) ── */}
      <path strokeWidth="0.5" d="
        M 41 62
        C 43 66, 46 68, 50 68
        C 54 68, 57 66, 59 62
        C 57 63, 54 64, 50 64
        C 46 64, 43 63, 41 62 Z
      " fill="url(#lipGrad)" />

      {/* Glossy Lower Lip Highlight */}
      <path fill="rgba(255,255,255,0.4)" d="
        M 45 65.5
        C 48 66.5, 52 66.5, 55 65.5
        C 53 65.8, 47 65.8, 45 65.5 Z
      " />

      {/* ── Lip center line ── */}
      <path strokeWidth="0.8" stroke="rgba(47, 35, 26, 0.4)" d="
        M 41 62
        C 45 63.5, 50 63, 50 63
        C 50 63, 55 63.5, 59 62
      " />

      {/* ── Philtrum (above lip) ── */}
      <path strokeWidth="0.2" opacity="0.2" d="M 48.5 54 L 48.8 60.5" />
      <path strokeWidth="0.2" opacity="0.2" d="M 51.5 54 L 51.2 60.5" />

      {/* ── Chin ── */}
      <path strokeWidth="0.25" opacity="0.35" d="
        M 44.5 76
        C 46.5 77, 50 77.5, 50 77.5
        C 50 77.5, 53.5 77, 55.5 76
      " />

      {/* ── Nasolabial folds ── */}
      <path strokeWidth="0.2" opacity="0.2" d="M 41 51 C 40 55, 39.5 59, 40 63" />
      <path strokeWidth="0.2" opacity="0.2" d="M 59 51 C 60 55, 60.5 59, 60 63" />

      {/* ── Cheekbone highlights ── */}
      <path strokeWidth="0.2" opacity="0.15" d="M 25 48 C 28 46, 32 45, 35 45.5" />
      <path strokeWidth="0.2" opacity="0.15" d="M 75 48 C 72 46, 68 45, 65 45.5" />

      {/* ── Ears ── */}
      <path strokeWidth="0.3" opacity="0.3" d="
        M 19 35
        C 17 37, 16 40, 16 43
        C 16 46, 17 48, 19 49
      " />
      <path strokeWidth="0.3" opacity="0.3" d="
        M 81 35
        C 83 37, 84 40, 84 43
        C 84 46, 83 48, 81 49
      " />

      {/* ── Neck ── */}
      <path strokeWidth="0.4" opacity="0.5" d="
        M 38 79
        C 36 84, 35 90, 35 97
        C 35 102, 36 107, 38 112
      " />
      <path strokeWidth="0.4" opacity="0.5" d="
        M 62 79
        C 64 84, 65 90, 65 97
        C 65 102, 64 107, 62 112
      " />

      {/* ── Platysma / neck details ── */}
      <path strokeWidth="0.2" opacity="0.18" d="M 43 82 C 42 90, 41 98, 41 106" />
      <path strokeWidth="0.2" opacity="0.18" d="M 57 82 C 58 90, 59 98, 59 106" />
      <path strokeWidth="0.2" opacity="0.15" d="M 50 80 C 50 90, 50 100, 50 110" />

      {/* ── Neck base / clavicle hint ── */}
      <path strokeWidth="0.35" opacity="0.25" d="
        M 30 112
        C 35 110, 42 108, 50 108
        C 58 108, 65 110, 70 112
      " />

      {/* ── Subtle forehead structure lines ── */}
      <line x1="35" y1="20" x2="65" y2="20" strokeWidth="0.15" opacity="0.12" />
      <line x1="33" y1="24" x2="67" y2="24" strokeWidth="0.12" opacity="0.1" />

      {/* ── Jawline accent ── */}
      <path strokeWidth="0.25" opacity="0.25" d="
        M 30 67
        C 33 72, 37 75, 42 77
      " />
      <path strokeWidth="0.25" opacity="0.25" d="
        M 70 67
        C 67 72, 63 75, 58 77
      " />

      {/* ── Temple hollows ── */}
      <path strokeWidth="0.15" opacity="0.12" d="M 23 28 C 24 32, 25 35, 26 37" />
      <path strokeWidth="0.15" opacity="0.12" d="M 77 28 C 76 32, 75 35, 74 37" />
    </g>
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
              viewBox="0 0 100 115"
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

              {/* Face artwork */}
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
