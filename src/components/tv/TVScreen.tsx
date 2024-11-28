import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ModernEffect } from './effects/ModernEffect';
import { KenBurnsEffect } from './effects/KenBurnsEffect';
import type { TVScreenProps } from '../../types/tv';

export function TVScreen({ point, showContent, isPortrait }: TVScreenProps) {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (showContent) {
      const imageTimer = setTimeout(() => {
        setShowImage(true);
      }, 4000);

      return () => {
        clearTimeout(imageTimer);
      };
    } else {
      setShowImage(false);
    }
  }, [showContent]);

  return (
    <motion.div
      className="absolute top-[-4.5%] right-5 w-[90%] h-[102%] bg-black rounded-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ aspectRatio: isPortrait ? '3/4' : '16/9' }}
    >
      <ModernEffect />

      <AnimatePresence mode="wait">
        {showContent && (
          <>
            {/* Text Information */}
            <motion.div
              key="info"
              className="absolute inset-0 flex items-center justify-center z-20"
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

            {/* Images with Ken Burns effect */}
            <AnimatePresence>
              {showImage && (
                <motion.div
                  key="image-container"
                  className="absolute inset-0 z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <KenBurnsEffect
                    imageUrl={point.tvContent.photo}
                    secondaryImageUrl={point.tvContent.photo2}
                    isActive={showImage}
                  />

                  {/* Gradient Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}