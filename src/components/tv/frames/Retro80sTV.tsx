export function Retro80sTV({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <svg width="750" height="460" viewBox="0 0 750 460" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="80sGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#808080' }} />
            <stop offset="100%" style={{ stopColor: '#404040' }} />
          </linearGradient>
        </defs>
        
        {/* TV Frame */}
        <path
          d="M25,23 L725,23 L725,437 L25,437 L25,23"
          fill="url(#80sGradient)"
          stroke="#333"
          strokeWidth="6"
        />
        
        {/* Screen Frame */}
        <path
          d="M75,57.5 L675,57.5 L675,402.5 L75,402.5 L75,57.5"
          fill="#111"
          stroke="#222"
          strokeWidth="2.5"
        />
        
        {/* Bottom Panel */}
        <rect x="25" y="402.5" width="700" height="34.5" fill="#404040" />
        
        {/* Control Panel */}
        <g transform="translate(50, 408.25)">
          {[...Array(5)].map((_, i) => (
            <rect
              key={i}
              x={i * 37.5}
              y="0"
              width="25"
              height="23"
              rx="2.5"
              fill="#333"
              stroke="#222"
            />
          ))}
        </g>
        
        {/* VHS Label */}
        <rect x="500" y="408.25" width="200" height="23" rx="2.5" fill="#333" />
      </svg>
      
      <div className="absolute top-[57.5px] left-[75px] w-[600px] h-[345px]">
        {children}
      </div>
    </div>
  );
}