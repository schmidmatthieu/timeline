export function ModernTV({ children, isPortrait = false }: { children: React.ReactNode; isPortrait?: boolean }) {
  // Use different viewBox based on orientation
  const viewBox = isPortrait ? "0 0 480 780" : "0 0 780 480";

  return (
    <div className="relative w-full h-full">
      <svg viewBox={viewBox} className="w-full h-full">
        <defs>
          <linearGradient id="ipadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#1F2937' }} />
            <stop offset="100%" style={{ stopColor: '#111827' }} />
          </linearGradient>
          <linearGradient id="screenReflection" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0.1)' }} />
            <stop offset="100%" style={{ stopColor: 'rgba(255,255,255,0)' }} />
          </linearGradient>
        </defs>
        
        {isPortrait ? (
          // Portrait iPad
          <>
            {/* Body */}
            <path
              d="M40,25 
                 H440 
                 Q450,25 450,35 
                 V725 
                 Q450,735 440,735 
                 H40 
                 Q30,735 30,725 
                 V35 
                 Q30,25 40,25"
              fill="url(#ipadGradient)"
              stroke="#374151"
              strokeWidth="1"
            />

            {/* Screen Frame */}
            <path
              d="M50,35 
                 H430 
                 Q440,35 440,45 
                 V715 
                 Q440,725 430,725 
                 H50 
                 Q40,725 40,715 
                 V45 
                 Q40,35 50,35"
              fill="#000000"
              stroke="#1F2937"
              strokeWidth="0.5"
            />

            {/* Camera Notch */}
            <rect
              x="205"
              y="27"
              width="70"
              height="6"
              rx="3"
              fill="#000000"
            />
            
            {/* Camera Lens */}
            <circle
              cx="240"
              cy="30"
              r="2"
              fill="#374151"
            />
          </>
        ) : (
          // Landscape iPad
          <>
            {/* Body */}
            <path
              d="M25,40 
                 H725 
                 Q735,40 735,50 
                 V410 
                 Q735,420 725,420 
                 H25 
                 Q15,420 15,410 
                 V50 
                 Q15,40 25,40"
              fill="url(#ipadGradient)"
              stroke="#374151"
              strokeWidth="1"
            />

            {/* Screen Frame */}
            <path
              d="M35,50 
                 H715 
                 Q725,50 725,60 
                 V400 
                 Q725,410 715,410 
                 H35 
                 Q25,410 25,400 
                 V60 
                 Q25,50 35,50"
              fill="#000000"
              stroke="#1F2937"
              strokeWidth="0.5"
            />

            {/* Camera Notch */}
            <rect
              x="340"
              y="42"
              width="70"
              height="6"
              rx="3"
              fill="#000000"
            />
            
            {/* Camera Lens */}
            <circle
              cx="375"
              cy="45"
              r="2"
              fill="#374151"
            />
          </>
        )}
      </svg>
      
      <div className="absolute inset-[3%]">
        {children}
      </div>
    </div>
  );
}