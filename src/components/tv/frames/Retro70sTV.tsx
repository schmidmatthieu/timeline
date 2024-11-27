export function Retro70sTV({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <svg width="750" height="460" viewBox="0 0 750 460" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="70sGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#A0522D' }} />
            <stop offset="100%" style={{ stopColor: '#8B4513' }} />
          </linearGradient>
        </defs>
        
        {/* TV Frame */}
        <path
          d="M37.5,34.5 L712.5,34.5 L712.5,425.5 L37.5,425.5 L37.5,34.5"
          fill="url(#70sGradient)"
          stroke="#333"
          strokeWidth="6"
        />
        
        {/* Screen Frame */}
        <path
          d="M100,69 L650,69 L650,391 L100,391 L100,69"
          fill="#111"
          stroke="#222"
          strokeWidth="2.5"
        />
        
        {/* Side Panel */}
        <rect x="662.5" y="69" width="37.5" height="322" fill="#8B4513" />
        
        {/* Control Buttons */}
        {[...Array(4)].map((_, i) => (
          <circle
            key={i}
            cx="681.25"
            cy={115 + i * 46}
            r="12.5"
            fill="#D2691E"
            stroke="#8B4513"
          />
        ))}
      </svg>
      
      <div className="absolute top-[69px] left-[100px] w-[550px] h-[322px]">
        {children}
      </div>
    </div>
  );
}