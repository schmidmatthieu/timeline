export function Retro60sTV({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <svg width="750" height="460" viewBox="0 0 750 460" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="60sGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#8B8B8B' }} />
            <stop offset="100%" style={{ stopColor: '#4A4A4A' }} />
          </linearGradient>
        </defs>
        
        {/* TV Frame */}
        <path
          d="M62.5,57.5 L687.5,57.5 Q725,57.5 725,92 L725,368 Q725,402.5 687.5,402.5 L62.5,402.5 Q25,402.5 25,368 L25,92 Q25,57.5 62.5,57.5"
          fill="url(#60sGradient)"
          stroke="#333"
          strokeWidth="6"
        />
        
        {/* Screen Frame */}
        <path
          d="M100,92 L650,92 Q662.5,92 662.5,103.5 L662.5,356.5 Q662.5,368 650,368 L100,368 Q87.5,368 87.5,356.5 L87.5,103.5 Q87.5,92 100,92"
          fill="#111"
          stroke="#222"
          strokeWidth="2.5"
        />
        
        {/* Control Knobs */}
        <circle cx="62.5" cy="322" r="18.75" fill="#333" stroke="#222" />
        <circle cx="62.5" cy="264.5" r="18.75" fill="#333" stroke="#222" />
        
        {/* Speaker Grille */}
        <rect x="562.5" y="322" width="125" height="46" rx="6.25" fill="#222" />
        <g transform="translate(575, 327.75)">
          {[...Array(6)].map((_, i) => (
            <rect key={i} x={i * 18.75} y="5.75" width="12.5" height="34.5" rx="2.5" fill="#111" />
          ))}
        </g>
      </svg>
      
      <div className="absolute top-[92px] left-[87.5px] w-[575px] h-[276px]">
        {children}
      </div>
    </div>
  );
}