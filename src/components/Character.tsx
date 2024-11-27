import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface CharacterProps {
  position: number;
  isMoving: boolean;
  totalPoints: number;
}

export function Character({ position, isMoving }: CharacterProps) {
  const controls = useAnimation();
  const { playMove, stopMove } = useSoundEffects();

  // Get the year based on position from the timeline data
  const getYearFromPosition = (pos: number) => {
    // Starting from 1964
    return 1964 + pos;
  };

  // Get the appropriate avatar based on the year
  const getAvatarForYear = (year: number) => {
    const avatarUrls = [
      "https://matthieu.arkstudio.ch/wp-content/uploads/2024/11/avatar1-2.png", // 1964-1973
      "https://matthieu.arkstudio.ch/wp-content/uploads/2024/11/avatar2-1.png", // 1974-1983
      "https://matthieu.arkstudio.ch/wp-content/uploads/2024/11/avatar3.png",   // 1984-1993
      "https://matthieu.arkstudio.ch/wp-content/uploads/2024/11/avatar4.png",   // 1994-2003
      "https://matthieu.arkstudio.ch/wp-content/uploads/2024/11/avatar5.png",   // 2004-2013
      "https://matthieu.arkstudio.ch/wp-content/uploads/2024/11/avatar6.png",   // 2014-2023
    ];

    const currentYear = getYearFromPosition(position);
    const index = Math.floor((currentYear - 1964) / 10);
    return avatarUrls[Math.min(index, avatarUrls.length - 1)];
  };

  useEffect(() => {
    if (isMoving) {
      playMove();
      controls.start({
        scale: [1, 1.2, 1],
        rotate: [-10, 10, -10, 10, 0],
        transition: {
          duration: 1,
          times: [0, 0.5, 1],
          ease: "easeInOut",
        }
      });
    } else {
      stopMove();
    }
  }, [isMoving, playMove, stopMove, controls]);

  const currentAvatar = getAvatarForYear(getYearFromPosition(position));

  return (
    <motion.div
      className="fixed left-1/2 -translate-x-1/2 will-change-transform"
      style={{
        bottom: '210px',
        zIndex: 40,
        position: 'fixed',
        x: '-30%',
        left: '50%',
      }}
      animate={controls}
      initial={false}
    >
      <motion.div
        animate={isMoving ? {
          y: [0, -20, 0],
          rotate: [-10, 10],
          transition: {
            duration: 0.5,
            repeat: 2,
            ease: "easeInOut",
          }
        } : {
          y: [0, -8, 0],
          rotate: [0, 3, 0, -3, 0],
          transition: {
            y: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }
          }
        }}
        className="relative"
      >
        {/* Shadow effect */}
        <motion.div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-purple-500/30 rounded-full blur-sm"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Character */}
        <motion.div
          animate={{
            scale: isMoving ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 0.3,
            repeat: isMoving ? Infinity : 0,
          }}
          className="relative z-10"
        >
          <div className="w-16 h-16 relative">
            <img 
              src={currentAvatar} 
              alt="Character"
              className="w-full h-full object-contain drop-shadow-lg"
              style={{
                filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 4px rgba(255, 255, 255, 0.4))',
              }}
            />
            {/* White outline overlay */}
            <div 
              className="absolute inset-0"
              style={{
                border: '2px solid white',
                borderRadius: '50%',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}