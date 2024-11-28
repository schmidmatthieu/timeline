import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { useCharacterAvatar } from '../hooks/useCharacterAvatar';
import type { TimelineData } from '../types/timeline';

interface CharacterProps {
  position: number;
  isMoving: boolean;
  data: TimelineData | null;
}

export function Character({ position, isMoving, data }: CharacterProps) {
  const controls = useAnimation();
  const { playMove, stopMove } = useSoundEffects();

  const currentYear = data?.points[position]?.year || 1964;
  const birthYear = data?.points[0]?.year || 1964;
  
  const currentAvatar = useCharacterAvatar({
    birthYear,
    currentYear,
    data,
  });

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

  if (!currentAvatar) return null;

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
            repeat: 7,
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
            opacity: [0, 0, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Character with smooth transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAvatar}
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              rotate: 10,
              transition: { duration: 0.2 }
            }}
            className="relative z-10"
          >
            <div className="w-16 h-16 relative">
              <motion.img 
                src={currentAvatar}
                alt="Character"
                className="w-full h-full object-contain drop-shadow-lg"
                style={{
                  filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 4px rgba(255, 255, 255, 0.4))',
                }}
                animate={{
                  scale: isMoving ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  repeat: isMoving ? Infinity : 0,
                }}
              />
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full hidden"
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(255, 255, 255, 0.3)',
                    '0 0 20px rgba(255, 255, 255, 0.5)',
                    '0 0 10px rgba(255, 255, 255, 0.3)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}