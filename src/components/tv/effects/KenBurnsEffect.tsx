import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useImageRatio } from '../../../hooks/useImageRatio';

interface KenBurnsEffectProps {
  imageUrl: string;
  secondaryImageUrl?: string;
  isActive: boolean;
}

export function KenBurnsEffect({ imageUrl, secondaryImageUrl, isActive }: KenBurnsEffectProps) {
  const [currentImage, setCurrentImage] = useState(imageUrl);
  
  useEffect(() => {
    if (!isActive || !secondaryImageUrl) return;
    
    const interval = setInterval(() => {
      setCurrentImage(prev => prev === imageUrl ? secondaryImageUrl : imageUrl);
    }, 10000); // Switch every 10 seconds
    
    return () => clearInterval(interval);
  }, [isActive, imageUrl, secondaryImageUrl]);

  if (!imageUrl) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentImage}
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ y: "0%", scale: 1 }}
          animate={{ 
            y: "+10%",
            scale: 1.3,
            transition: {
              duration: 10,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        >
          <motion.img
            src={currentImage}
            alt=""
            className="w-full h-full object-contain"
            style={{
              willChange: 'transform',
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}