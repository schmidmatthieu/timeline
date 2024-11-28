export function Retro60sTV({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 780 480" className="w-full h-full">
        <defs>
          <linearGradient id="60sGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#424866' }} />
            <stop offset="100%" style={{ stopColor: '#2A2E42' }} />
          </linearGradient>
        </defs>
        
        {/* TV Body */}
        <path
          d="M100,40 
             H650 
             Q670,40 670,60
             V340
             Q670,360 650,360
             H100
             Q80,360 80,340
             V60
             Q80,40 100,40"
          fill="url(#60sGradient)"
          stroke="#333"
          strokeWidth="4"
        />

        {/* Screen Frame */}
        <path
          d="M120,60
             H480
             Q490,60 490,70
             V330
             Q490,340 480,340
             H120
             Q110,340 110,330
             V70
             Q110,60 120,60"
          fill="#111"
          stroke="#222"
          strokeWidth="2"
        />

        {/* Control Panel */}
        <rect x="500" y="60" width="150" height="280" fill="#2A2E42" />

        {/* Control Knobs */}
        <circle cx="575" cy="120" r="25" fill="#333" stroke="#222" />
        <circle cx="575" cy="200" r="25" fill="#333" stroke="#222" />

        {/* Speaker Grille */}
        <g transform="translate(520, 240)">
          {[...Array(8)].map((_, i) => (
            <rect
              key={i}
              x="0"
              y={i * 10}
              width="110"
              height="6"
              fill="#222"
              rx="2"
            />
          ))}
        </g>

        {/* Antenna */}
        <g transform="translate(375, 30)">
          <line
            x1="-100"
            y1="0"
            x2="0"
            y2="-80"
            stroke="#333"
            strokeWidth="4"
          />
          <line
            x1="100"
            y1="0"
            x2="0"
            y2="-80"
            stroke="#333"
            strokeWidth="4"
          />
        </g>
      </svg>
      
      <div className="absolute top-[15.625%] left-[14.1%] w-[48.7%] h-[56.25%]">
        {children}
      </div>
    </div>
  );
}