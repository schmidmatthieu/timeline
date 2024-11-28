export function Retro80sTV({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 780 480" className="w-full h-full">
        <defs>
          <linearGradient id="80sGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#1B2B4B' }} />
            <stop offset="100%" style={{ stopColor: '#162039' }} />
          </linearGradient>
          <linearGradient id="screenBorder" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#0F172A' }} />
            <stop offset="100%" style={{ stopColor: '#1E293B' }} />
          </linearGradient>
        </defs>
        
        {/* Main Monitor Body */}
        <path
          d="M25,20 
             H725 
             Q735,20 735,30 
             V360 
             Q735,370 725,370 
             H25 
             Q15,370 15,360 
             V30 
             Q15,20 25,20"
          fill="url(#80sGradient)"
          stroke="#334155"
          strokeWidth="2"
        />
        
        {/* Screen Frame */}
        <path
          d="M40,35 
             H710 
             Q715,35 715,40 
             V345 
             Q715,350 710,350 
             H40 
             Q35,350 35,345 
             V40 
             Q35,35 40,35"
          fill="url(#screenBorder)"
          stroke="#1E293B"
          strokeWidth="1"
        />

        {/* Stand Base */}
        <path
          d="M275,370 
             H475 
             L525,440 
             H225 
             Z"
          fill="url(#80sGradient)"
          stroke="#334155"
          strokeWidth="2"
        />

        {/* Stand Neck */}
        <path
          d="M350,370 
             H400 
             V400 
             H350 
             Z"
          fill="#162039"
          stroke="#334155"
          strokeWidth="1"
        />

        {/* Power LED */}
        <circle
          cx="695"
          cy="355"
          r="3"
          fill="#22C55E"
          className="animate-pulse"
        />
      </svg>
      
      <div className="absolute top-[7.29%] left-[4.49%] w-[87.18%] h-[64.58%]">
        {children}
      </div>
    </div>
  );
}