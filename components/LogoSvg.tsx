export default function LogoSvg({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 840 180"
      role="img"
      aria-label="FAB CLINIC"
      className={className}
    >
      <defs>
        {/* Paper grain texture */}
        <filter id="paperGrain" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="5"
            seed="2"
            stitchTiles="stitch"
            result="grain"
          />
          <feColorMatrix type="saturate" values="0" in="grain" result="grainBW" />
          <feComponentTransfer in="grainBW" result="softGrain">
            <feFuncA type="linear" slope="0.07" />
          </feComponentTransfer>
          <feFlood floodColor="#f5f0e8" result="cream" />
          <feMerge>
            <feMergeNode in="cream" />
            <feMergeNode in="softGrain" />
          </feMerge>
        </filter>

        {/* Subtle text emboss */}
        <filter id="textEmboss" x="-2%" y="-10%" width="104%" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.7" result="blur" />
          <feOffset dx="0.5" dy="0.6" in="blur" result="offsetBlur" />
          <feFlood floodColor="#1a0f08" floodOpacity="0.18" result="shadow" />
          <feComposite in="shadow" in2="offsetBlur" operator="in" result="textShadow" />
          <feMerge>
            <feMergeNode in="textShadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gold-leaf noise texture */}
        <filter id="goldLeaf" x="-5%" y="-200%" width="110%" height="500%">
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
            values="0.3 0 0 0 0.78  0.3 0 0 0 0.65  0.1 0 0 0 0.36  0 0 0 0.3 0"
          />
          <feComposite in="goldNoise" in2="SourceGraphic" operator="in" result="noiseMasked" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="noiseMasked" />
          </feMerge>
        </filter>

        {/* Gold shimmer gradient */}
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#b8943e" />
          <stop offset="15%"  stopColor="#d4af57" />
          <stop offset="32%"  stopColor="#e8c96a" />
          <stop offset="50%"  stopColor="#c6a04d" />
          <stop offset="67%"  stopColor="#dabb5e" />
          <stop offset="84%"  stopColor="#c9a44f" />
          <stop offset="100%" stopColor="#b8943e" />
        </linearGradient>
      </defs>

      {/* Textured cream paper background */}
      <rect width="840" height="180" filter="url(#paperGrain)" />

      {/* Main wordmark with emboss */}
      <text
        x="420"
        y="106"
        textAnchor="middle"
        fontFamily="'Playfair Display', 'Georgia', 'Times New Roman', serif"
        fontSize="94"
        fontWeight="500"
        letterSpacing="12"
        fill="#2d1a10"
        filter="url(#textEmboss)"
      >
        FAB CLINIC
      </text>

      {/* Gold-leaf divider line */}
      <line
        x1="52"
        y1="144"
        x2="788"
        y2="144"
        stroke="url(#goldGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#goldLeaf)"
      />

      {/* Highlight shimmer on gold line */}
      <line
        x1="210"
        y1="143.4"
        x2="630"
        y2="143.4"
        stroke="#e8d48a"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}
