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
  { id: 'voorhoofd',       nameKey: 'facemap_voorhoofd',       descKey: 'facemap_voorhoofd_desc',       priceKey: 'facemap_voorhoofd_price',       x: 50,   y: 28,   side: 'center' },
  { id: 'frons',            nameKey: 'facemap_frons',            descKey: 'facemap_frons_desc',            priceKey: 'facemap_frons_price',            x: 50,   y: 36,   side: 'center' },
  { id: 'kraaienpootjes',   nameKey: 'facemap_kraaienpootjes',   descKey: 'facemap_kraaienpootjes_desc',   priceKey: 'facemap_kraaienpootjes_price',   x: 72,   y: 39,   side: 'right' },
  { id: 'wenkbrauwen',      nameKey: 'facemap_wenkbrauwen',      descKey: 'facemap_wenkbrauwen_desc',      priceKey: 'facemap_wenkbrauwen_price',      x: 30,   y: 35,   side: 'left' },
  { id: 'bunny-lines',      nameKey: 'facemap_bunny_lines',      descKey: 'facemap_bunny_lines_desc',      priceKey: 'facemap_bunny_lines_price',      x: 50,   y: 43,   side: 'center' },
  { id: 'lip-flip',         nameKey: 'facemap_lip_flip',         descKey: 'facemap_lip_flip_desc',         priceKey: 'facemap_lip_flip_price',         x: 50,   y: 52,   side: 'center' },
  { id: 'gummy-smile',      nameKey: 'facemap_gummy_smile',      descKey: 'facemap_gummy_smile_desc',      priceKey: 'facemap_gummy_smile_price',      x: 38,   y: 50,   side: 'left' },
  { id: 'masseter',         nameKey: 'facemap_masseter',         descKey: 'facemap_masseter_desc',         priceKey: 'facemap_masseter_price',         x: 72,   y: 58,   side: 'right' },
  { id: 'kin',              nameKey: 'facemap_kin',              descKey: 'facemap_kin_desc',              priceKey: 'facemap_kin_price',              x: 50,   y: 66,   side: 'center' },
  { id: 'hals',             nameKey: 'facemap_hals',             descKey: 'facemap_hals_desc',             priceKey: 'facemap_hals_price',             x: 50,   y: 78,   side: 'center' },
  { id: 'hyperhidrose',     nameKey: 'facemap_hyperhidrose',     descKey: 'facemap_hyperhidrose_desc',     priceKey: 'facemap_hyperhidrose_price',     x: 26,   y: 55,   side: 'left' },
  { id: 'nefertiti',        nameKey: 'facemap_nefertiti',        descKey: 'facemap_nefertiti_desc',        priceKey: 'facemap_nefertiti_price',        x: 70,   y: 64,   side: 'right' },
];

/* ── SVG Face Line Art (aligned to Ava — viewBox 0 0 100 137) ── */
function FaceSVG() {
  return (
    <>
      <defs>
        {/* Glow & Skin Gradients */}
        <linearGradient id="skinGrad" x1="0" y1="4" x2="0" y2="5.2">
          <stop offset="0%" stopColor="#DFBC9D" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#DFBC9D" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#DFBC9D" stopOpacity="0.01" />
        </linearGradient>

        <radialGradient id="cheekBlush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="lipGrad" x1="0" y1="4" x2="0" y2="5.2">
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
          M 50 -12
          C 18 -12, -2 26.8, 5 47.5
          C 10 62, 5 110.9, 15 153
          L 25 153
          C 15 110.9, 12 71, 18 47.5
          C 22 32.7, 35 14, 50 14
          C 65 14, 78 32.7, 82 47.5
          C 88 71, 85 110.9, 75 153
          L 85 153
          C 95 110.9, 90 62, 95 47.5
          C 102 26.8, 82 -12, 50 -12 Z
        " />

        {/* Flowing hair shadow */}
        <path opacity="0.1" fill="#D4AF37" stroke="none" d="
          M 50 -5
          C 23 -5, -2 26.8, -2 47.5
          C -2 71, 5 121.8, 15 153
          L 25 153
          C 15 110.9, 10 71, 10 47.5
          C 14 32.7, 30 19.6, 50 19.6
          C 70 19.6, 86 32.7, 90 47.5
          C 90 71, 85 110.9, 75 153
          L 85 153
          C 95 121.8, 102 71, 102 47.5
          C 102 26.8, 77 -5, 50 -5 Z
        " />

      {/* ── Flowing hair strands ── */}
      <path strokeWidth="0.45" opacity="0.6" d="
        M 50 10.2
        C 28 10.2, 10 23.8, 7 40.8
        C 4 47.5, 4 62, 10 82.6
        C 14 96.5, 20 110.9, 24 126.1
      " />
      <path strokeWidth="0.45" opacity="0.6" d="
        M 50 10.2
        C 72 10.2, 90 23.8, 93 40.8
        C 96 47.5, 96 62, 90 82.6
        C 86 96.5, 80 110.9, 76 126.1
      " />
      <path strokeWidth="0.3" opacity="0.3" d="
        M 50 12.8
        C 35 12.8, 20 25, 16 39.9
        C 12 47.5, 14 57, 20 76.8
      " />
      <path strokeWidth="0.3" opacity="0.3" d="
        M 50 12.8
        C 65 12.8, 80 25, 84 39.9
        C 88 47.5, 86 57, 80 76.8
      " />

      {/* ── Face outline (aligned to Ava) ── */}
        <path fill="url(#skinGrad)" strokeWidth="0.6" d="
          M 50 19
          C 40 19, 33 22, 30 26.2
          C 27 30.9, 27 34.5, 27 37.9
          C 27 40.8, 28 43.5, 30 46.2
          C 32 48.9, 34 51.6, 37 55
          C 39 59, 43 62, 46 64
          C 48 65, 49 65.5, 50 66
          C 51 65.5, 52 65, 54 64
          C 57 62, 61 59, 63 55
          C 66 51.6, 68 48.9, 70 46.2
          C 72 43.5, 73 40.8, 73 37.9
          C 73 34.5, 73 30.9, 70 26.2
          C 67 22, 60 19, 50 19 Z
        " />

        {/* ── Cheekbone blush ── */}
        <ellipse cx="32" cy="44.4" rx="7" ry="5" fill="url(#cheekBlush)" stroke="none" transform="rotate(-30 32 44.4)" />
        <ellipse cx="68" cy="44.4" rx="7" ry="5" fill="url(#cheekBlush)" stroke="none" transform="rotate(30 68 44.4)" />

        {/* ── Nose glow ── */}
        <ellipse cx="50" cy="43" rx="3.5" ry="6" fill="url(#noseGlow)" stroke="none" />

        {/* ── Neck base fill ── */}
        <path fill="url(#skinGrad)" strokeWidth="0.4" d="
          M 40 66.8
          C 38 71, 37 78, 37 83.8
          C 37 88.4, 38 94.2, 40 100
          L 60 100
          C 62 94.2, 63 88.4, 63 83.8
          C 63 78, 62 71, 60 66.8 Z
        " />

      {/* ── Hairline ── */}
      <path strokeWidth="0.35" opacity="0.45" d="
        M 32 26.2
        C 34 21.4, 40 17.8, 50 17.8
        C 60 17.8, 66 21.4, 68 26.2
      " />
      <path strokeWidth="0.25" opacity="0.2" d="
        M 34 24.4
        C 37 20.2, 43 16.5, 50 16.5
        C 57 16.5, 63 20.2, 66 24.4
      " />

      {/* ── Left eyebrow (arched) ── */}
      <path fill="#2F231A" stroke="none" d="
        M 32 35.6
        C 34 33.9, 36.5 33.3, 39 33.6
        C 42 34.2, 44 34.8, 46 35.6
        C 44 34.5, 41 33.3, 39 33
        C 36 32.7, 33 33.3, 32 35.6 Z
      " opacity="0.6" />
      <path strokeWidth="0.65" d="
        M 32 35.6
        C 34 33.9, 36.5 33.3, 39 33.6
        C 42 34.2, 44 34.8, 46 35.6
      " />

      {/* ── Right eyebrow (arched) ── */}
      <path fill="#2F231A" stroke="none" d="
        M 68 35.6
        C 66 33.9, 63.5 33.3, 61 33.6
        C 58 34.2, 56 34.8, 54 35.6
        C 56 34.5, 59 33.3, 61 33
        C 64 32.7, 67 33.3, 68 35.6 Z
      " opacity="0.6" />
      <path strokeWidth="0.65" d="
        M 68 35.6
        C 66 33.9, 63.5 33.3, 61 33.6
        C 58 34.2, 56 34.8, 54 35.6
      " />

        {/* ── Left eye (almond) ── */}
      <path fill="rgba(253, 252, 240, 0.4)" strokeWidth="0.45" d="
        M 34 39
        C 35.5 37.3, 38 36.8, 40 37
        C 43 37.6, 45.5 38.4, 46 39.2
        C 44.5 39.9, 42 40.4, 40 40.4
        C 37 40.3, 35 39.9, 34 39 Z
      " />
      <circle cx="40" cy="39" r="2.8" fill="rgba(90, 58, 31, 0.5)" stroke="none" />
      <circle cx="40" cy="39" r="1.4" fill="rgba(0,0,0,0.6)" stroke="none" />
      <circle cx="39" cy="38.6" r="0.4" fill="#FFF" stroke="none" opacity="0.8" />

      {/* Eyelash hints */}
      <path strokeWidth="0.3" d="M 34 39 C 32 38.2, 30 37.6, 29 37" />
      <path strokeWidth="0.3" d="M 35.5 37.6 C 34.5 36.8, 32.5 35.9, 31.5 35.3" />
      <path strokeWidth="0.3" d="M 38 37 C 37 35.9, 36 34.8, 36 34.2" />
      <circle cx="40" cy="39" r="1.6" strokeWidth="0.35" opacity="0.4" />

      {/* ── Right eye (almond) ── */}
      <path fill="rgba(253, 252, 240, 0.4)" strokeWidth="0.45" d="
        M 66 39
        C 64.5 37.3, 62 36.8, 60 37
        C 57 37.6, 54.5 38.4, 54 39.2
        C 55.5 39.9, 58 40.4, 60 40.4
        C 63 40.3, 65 39.9, 66 39 Z
      " />
      <circle cx="60" cy="39" r="2.8" fill="rgba(90, 58, 31, 0.5)" stroke="none" />
      <circle cx="60" cy="39" r="1.4" fill="rgba(0,0,0,0.6)" stroke="none" />
      <circle cx="61" cy="38.6" r="0.4" fill="#FFF" stroke="none" opacity="0.8" />

      {/* Eyelash hints */}
      <path strokeWidth="0.3" d="M 66 39 C 68 38.2, 70 37.6, 71 37" />
      <path strokeWidth="0.3" d="M 64.5 37.6 C 65.5 36.8, 67.5 35.9, 68.5 35.3" />
      <path strokeWidth="0.3" d="M 62 37 C 63 35.9, 64 34.8, 64 34.2" />
      <circle cx="60" cy="39" r="1.6" strokeWidth="0.35" opacity="0.4" />

      {/* ── Nose bridge ── */}
      <path strokeWidth="0.35" opacity="0.5" d="
        M 48 36.8
        C 47.5 39.5, 47 41.7, 46.5 44.4
        C 46 45.3, 45.5 46.2, 45 46.9
      " />
      <path strokeWidth="0.35" opacity="0.5" d="
        M 52 36.8
        C 52.5 39.5, 53 41.7, 53.5 44.4
        C 54 45.3, 54.5 46.2, 55 46.9
      " />

      {/* ── Nose tip & nostrils ── */}
      <path strokeWidth="0.45" d="
        M 45 46.9
        C 44 47.3, 43.5 47.8, 44 48
        C 44.5 48.2, 46 48.3, 48 48.1
        C 49 48, 50 47.9, 50 47.9
        C 50 47.9, 51 48, 52 48.1
        C 54 48.3, 55.5 48.2, 56 48
        C 56.5 47.8, 56 47.3, 55 46.9
      " />

      {/* ── Upper lip (cupid's bow) ── */}
      <path strokeWidth="0.5" d="
        M 43 52
        C 44.5 50.9, 47 50.4, 48.5 50.9
        C 49 51.1, 50 51.3, 50 51.3
        C 50 51.3, 51 51.1, 51.5 50.9
        C 53 50.4, 55.5 50.9, 57 52
        C 55.5 52.5, 53 53, 50 53
        C 47 53, 44.5 52.5, 43 52 Z
      " fill="url(#lipGrad)" />

      {/* ── Lower lip ── */}
      <path strokeWidth="0.5" d="
        M 43 52
        C 44.5 55.5, 47 57, 50 57
        C 53 57, 55.5 55.5, 57 52
        C 55.5 53, 53 54, 50 54
        C 47 54, 44.5 53, 43 52 Z
      " fill="url(#lipGrad)" />

      {/* Glossy lip highlight */}
      <path fill="rgba(255,255,255,0.4)" d="
        M 46 55
        C 48 55.8, 52 55.8, 54 55
        C 52.5 55.3, 47.5 55.3, 46 55 Z
      " />

      {/* ── Lip center line ── */}
      <path strokeWidth="0.8" stroke="rgba(47, 35, 26, 0.4)" d="
        M 43 52
        C 46 53.5, 50 53, 50 53
        C 50 53, 54 53.5, 57 52
      " />

      {/* ── Philtrum ── */}
      <path strokeWidth="0.2" opacity="0.2" d="M 48.5 48.2 L 48.8 51.1" />
      <path strokeWidth="0.2" opacity="0.2" d="M 51.5 48.2 L 51.2 51.1" />

      {/* ── Chin ── */}
      <path strokeWidth="0.25" opacity="0.35" d="
        M 45 64.5
        C 47 65.5, 50 66, 50 66
        C 50 66, 53 65.5, 55 64.5
      " />

      {/* ── Nasolabial folds ── */}
      <path strokeWidth="0.2" opacity="0.2" d="M 42 46.2 C 41 48, 40.5 49.8, 41 52" />
      <path strokeWidth="0.2" opacity="0.2" d="M 58 46.2 C 59 48, 59.5 49.8, 59 52" />

      {/* ── Cheekbone highlights ── */}
      <path strokeWidth="0.2" opacity="0.15" d="M 29 44 C 31 43, 35 42.6, 38 42.8" />
      <path strokeWidth="0.2" opacity="0.15" d="M 71 44 C 69 43, 65 42.6, 62 42.8" />

      {/* ── Ears ── */}
      <path strokeWidth="0.3" opacity="0.3" d="
        M 26 37.3
        C 24 38.4, 23 39.9, 23 41.2
        C 23 42.6, 24 43.5, 26 44
      " />
      <path strokeWidth="0.3" opacity="0.3" d="
        M 74 37.3
        C 76 38.4, 77 39.9, 77 41.2
        C 77 42.6, 76 43.5, 74 44
      " />

      {/* ── Neck ── */}
      <path strokeWidth="0.4" opacity="0.5" d="
        M 40 66.8
        C 38 71, 37 78, 37 83.8
        C 37 88.4, 38 94.2, 40 100
      " />
      <path strokeWidth="0.4" opacity="0.5" d="
        M 60 66.8
        C 62 71, 63 78, 63 83.8
        C 63 88.4, 62 94.2, 60 100
      " />

      {/* ── Platysma / neck details ── */}
      <path strokeWidth="0.2" opacity="0.18" d="M 44 69.3 C 43 76.8, 42 84.9, 42 94.2" />
      <path strokeWidth="0.2" opacity="0.18" d="M 56 69.3 C 57 76.8, 58 84.9, 58 94.2" />
      <path strokeWidth="0.2" opacity="0.15" d="M 50 67.7 C 50 76.8, 50 86.1, 50 96.5" />

      {/* ── Neck base / clavicle hint ── */}
      <path strokeWidth="0.35" opacity="0.25" d="
        M 28 100
        C 34 97.7, 42 95.4, 50 95.4
        C 58 95.4, 66 97.7, 72 100
      " />

      {/* ── Forehead structure lines ── */}
      <line x1="36" y1="27.9" x2="64" y2="27.9" strokeWidth="0.15" opacity="0.12" />
      <line x1="34" y1="30.3" x2="66" y2="30.3" strokeWidth="0.12" opacity="0.1" />

      {/* ── Jawline accent ── */}
      <path strokeWidth="0.25" opacity="0.25" d="
        M 33 55
        C 35 59, 38 62, 43 64
      " />
      <path strokeWidth="0.25" opacity="0.25" d="
        M 67 55
        C 65 59, 62 62, 57 64
      " />

      {/* ── Temple hollows ── */}
      <path strokeWidth="0.15" opacity="0.12" d="M 29 32.7 C 30 35.1, 30.5 36.8, 31 37.9" />
      <path strokeWidth="0.15" opacity="0.12" d="M 71 32.7 C 70 35.1, 69.5 36.8, 69 37.9" />
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
