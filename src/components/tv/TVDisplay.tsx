import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TVFrame } from './frames/TVFrame';
import { TVScreen } from './TVScreen';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import type { TimelinePoint } from '../../types';

interface TVDisplayProps {
  point: TimelinePoint;
  isActive: boolean;
}

export function TVDisplay({ point, isActive }: TVDisplayProps) {
  const [isOn, setIsOn] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const { playTvOn, playTvOff } = useSoundEffects();

  useEffect(() => {
    if (isActive) {
      const powerOnTimer = setTimeout(() => {
        setIsOn(true);
        playTvOn();
      }, 300);

      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 1500);

      return () => {
        clearTimeout(powerOnTimer);
        clearTimeout(contentTimer);
      };
    }
    playTvOff();
    setIsOn(false);
    setShowContent(false);
  }, [isActive, playTvOn, playTvOff]);

  const getEraStyle = (year: number) => {
    if (year < 1975) return 'retro60s';
    if (year < 1985) return 'retro70s';
    if (year < 1995) return 'retro80s';
    if (year < 2010) return 'retro90s';
    return 'modern';
  };

  const era = getEraStyle(point.year);

  return (
    <motion.div
      className="fixed top-[15%] left-[35%] -translate-x-1/2 will-change-transform"
      initial={{ opacity: 0, y: 50, scale: 0.76 }} // Increased size by 5% from 0.72
      animate={{ 
        opacity: 1,
        y: 0,
        scale: 0.76,
      }}
      exit={{ 
        opacity: 0,
        scale: 0.7,
        transition: { 
          duration: 0.5,
          ease: "easeInOut"
        }
      }}
      transition={{ 
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 1.2
      }}
    >
      <TVFrame era={era} scale={2.5}>
        <AnimatePresence mode="wait">
          {isOn && (
            <TVScreen
              era={era}
              point={point}
              showContent={showContent}
            />
          )}
        </AnimatePresence>
      </TVFrame>
    </motion.div>
  );
}