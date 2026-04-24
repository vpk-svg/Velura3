export default function LogoSvg({ className, useCurrentColor = false }: { className?: string, useCurrentColor?: boolean }) {
  return (
    // viewBox: 0 20 840 130 - crops top/bottom whitespace so text + gold line fill the element
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 20 840 130"
      role="img"
      aria-label="FAB CLINIC"
      className={className}
    >
      <defs>
        {/* Subtle text shadow for depth */}
        <filter id="fabTextEmboss" x="-2%" y="-15%" width="104%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" result="blur" />
          <feOffset dx="0.5" dy="0.7" in="blur" result="offsetBlur" />
          <feFlood floodColor="#1a0f08" floodOpacity="0.2" result="shadow" />
          <feComposite in="shadow" in2="offsetBlur" operator="in" result="textShadow" />
          <feMerge>
            <feMergeNode in="textShadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gold-leaf noise texture for the line */}
        <filter id="fabGoldLeaf" x="-5%" y="-300%" width="110%" height="700%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.1 0.7"
            numOctaves="4"
            seed="9"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            in="noise"
            result="goldNoise"
            values="0.3 0 0 0 0.78  0.3 0 0 0 0.65  0.1 0 0 0 0.36  0 0 0 0.28 0"
          />
          <feComposite in="goldNoise" in2="SourceGraphic" operator="in" result="noiseMasked" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="noiseMasked" />
          </feMerge>
        </filter>

        {/* Gold shimmer gradient */}
        <linearGradient id="fabGoldGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b8943e" />
          <stop offset="15%" stopColor="#d4af57" />
          <stop offset="32%" stopColor="#e8c96a" />
          <stop offset="50%" stopColor="#c6a04d" />
          <stop offset="67%" stopColor="#dabb5e" />
          <stop offset="84%" stopColor="#c9a44f" />
          <stop offset="100%" stopColor="#b8943e" />
        </linearGradient>
      </defs>

      {/* Transparent background - inherits page/navbar bg */}

      {/* Main wordmark */}
      <text
        x="420"
        y="106"
        textAnchor="middle"
        fontFamily="'Playfair Display', 'Georgia', 'Times New Roman', serif"
        fontSize="94"
        fontWeight="500"
        letterSpacing="12"
        fill={useCurrentColor ? "currentColor" : "#000000"}
        filter="url(#fabTextEmboss)"
      >
        FAB CLINIC
      </text>

      {/* Gold-leaf divider line - sits 12px below baseline */}
      <line
        x1="52"
        y1="124"
        x2="788"
        y2="124"
        stroke="url(#fabGoldGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#fabGoldLeaf)"
      />

      {/* Highlight shimmer overlay on line */}
      <line
        x1="210"
        y1="123.4"
        x2="630"
        y2="123.4"
        stroke="#e8d48a"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}
