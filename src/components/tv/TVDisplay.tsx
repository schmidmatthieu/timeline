import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TVFrame } from './frames/TVFrame';
import { TVScreen } from './TVScreen';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { useImageRatio } from '../../hooks/useImageRatio';
import type { TimelinePoint } from '../../types/timeline';

interface TVDisplayProps {
  point: TimelinePoint;
  isActive: boolean;
}

export function TVDisplay({ point, isActive }: TVDisplayProps) {
  const [isOn, setIsOn] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const { playTvOn, playTvOff } = useSoundEffects();
  const { ratio } = useImageRatio(point.tvContent.photo);
  const isPortrait = ratio ? ratio < 1 : false;

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

  return (
    <motion.div
      className={`fixed left-1/2 -translate-x-1/2 top-10 ${
        isPortrait ? 'w-auto h-[75dvh]' : 'w-[75vw] h-auto'
      }`}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ 
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{ 
        opacity: 0,
        scale: 0.95,
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
      <TVFrame isPortrait={isPortrait}>
        <AnimatePresence mode="wait">
          {isOn && (
            <TVScreen
              point={point}
              showContent={showContent}
              isPortrait={isPortrait}
            />
          )}
        </AnimatePresence>
      </TVFrame>
    </motion.div>
  );
}