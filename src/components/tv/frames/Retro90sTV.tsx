export function Retro90sTV({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <svg width="750" height="460" viewBox="0 0 750 460" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="90sGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#2F4F4F' }} />
            <stop offset="100%" style={{ stopColor: '#1A2F2F' }} />
          </linearGradient>
        </defs>
        
        {/* TV Frame */}
        <path
          d="M12.5,11.5 L737.5,11.5 Q750,11.5 750,23 L750,437 Q750,448.5 737.5,448.5 L12.5,448.5 Q0,448.5 0,437 L0,23 Q0,11.5 12.5,11.5"
          fill="url(#90sGradient)"
          stroke="#333"
          strokeWidth="3.75"
        />
        
        {/* Screen Frame */}
        <path
          d="M50,46 L700,46 L700,414 L50,414 L50,46"
          fill="#111"
          stroke="#222"
          strokeWidth="2.5"
        />
        
        {/* Bottom Panel */}
        <rect x="0" y="414" width="750" height="34.5" fill="#1A2F2F" />
        
        {/* Control Panel */}
        <g transform="translate(25, 419.75)">
          {[...Array(3)].map((_, i) => (
            <circle
              key={i}
              cx={25 + i * 37.5}
              cy="11.5"
              r="10"
              fill="#333"
              stroke="#222"
            />
          ))}
        </g>
        
        {/* Brand Label */}
        <rect x="562.5" y="419.75" width="150" height="23" rx="2.5" fill="#333" />
      </svg>
      
      <div className="absolute top-[46px] left-[50px] w-[650px] h-[368px]">
        {children}
      </div>
    </div>
  );
}