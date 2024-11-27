import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { RetroLines } from './effects/RetroLines';
import { ModernEffect } from './effects/ModernEffect';
import { Retro70sEffect } from './effects/Retro70sEffect';
import { Retro80sEffect } from './effects/Retro80sEffect';
import { Retro90sEffect } from './effects/Retro90sEffect';
import type { TimelinePoint } from '../../types';

interface TVScreenProps {
  era: 'retro60s' | 'retro70s' | 'retro80s' | 'retro90s' | 'modern';
  point: TimelinePoint;
  showContent: boolean;
}

const EffectComponents = {
  retro60s: RetroLines,
  retro70s: Retro70sEffect,
  retro80s: Retro80sEffect,
  retro90s: Retro90sEffect,
  modern: ModernEffect,
};

export function TVScreen({ era, point, showContent }: TVScreenProps) {
  const PowerOnEffect = EffectComponents[era];
  const [infoPosition, setInfoPosition] = useState<'center' | 'corner'>('center');
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (showContent) {
      // Start image transition after text display
      const imageTimer = setTimeout(() => {
        setShowImage(true);
      }, 4000);

      return () => {
        clearTimeout(imageTimer);
      };
    } else {
      setInfoPosition('center');
      setShowImage(false);
    }
  }, [showContent]);

  return (
    <motion.div
      className="relative w-full h-full bg-black rounded-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ aspectRatio: '16/9' }}
    >
      <PowerOnEffect />

      <AnimatePresence mode="wait">
        {showContent && (
          <>
            {/* Text Information - Always Centered */}
            <motion.div
              key="info"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ 
                opacity: showImage ? 0 : 1,
                scale: showImage ? 0.9 : 1
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              <motion.div className="text-center">
                <motion.h2 
                  className="text-4xl font-bold text-white mb-4"
                >
                  {point.tvContent.title}
                </motion.h2>
                <motion.p
                  className="text-xl text-gray-300"
                >
                  {point.tvContent.date}
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Main Image */}
            <AnimatePresence>
              {showImage && (
                <motion.div
                  key="image"
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <motion.div
                    className="relative w-full h-full"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                  >
                    <motion.img
                      src={point.tvContent.photo}
                      alt={point.title}
                      className="w-full h-full object-cover"
                      style={{
                        filter: era.includes('retro') ? 'saturate(1.2) contrast(1.1)' : 'none'
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}