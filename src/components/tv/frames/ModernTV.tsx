export function ModernTV({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <svg width="750" height="460" viewBox="0 0 750 460" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="modernGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#1a1a1a' }} />
            <stop offset="100%" style={{ stopColor: '#0a0a0a' }} />
          </linearGradient>
        </defs>
        
        {/* TV Frame */}
        <path
          d="M0,0 L750,0 L750,391 L750,402.5 Q750,414 737.5,414 L12.5,414 Q0,414 0,402.5 L0,0"
          fill="url(#modernGradient)"
          stroke="#333"
          strokeWidth="2.5"
        />
        
        {/* Screen Frame */}
        <path
          d="M12.5,11.5 L737.5,11.5 L737.5,379.5 L12.5,379.5 L12.5,11.5"
          fill="#000"
          stroke="#111"
          strokeWidth="1.25"
        />
        
        {/* Stand */}
        <path
          d="M312.5,414 L437.5,414 L500,460 L250,460 Z"
          fill="#0a0a0a"
          stroke="#333"
          strokeWidth="1.25"
        />
      </svg>
      
      <div className="absolute top-[11.5px] left-[12.5px] w-[725px] h-[368px]">
        {children}
      </div>
    </div>
  );
}