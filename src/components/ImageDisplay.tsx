import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useImageRatio } from '../hooks/useImageRatio';
import type { TimelinePoint } from '../types/timeline';

interface ImageDisplayProps {
  point: TimelinePoint;
  isActive: boolean;
}

export function ImageDisplay({ point, isActive }: ImageDisplayProps) {
  const [showContent, setShowContent] = useState(false);
  const [currentImage, setCurrentImage] = useState(point.tvContent.photo);
  const { ratio } = useImageRatio(currentImage);
  const isPortrait = ratio ? ratio < 1 : false;

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 500);

      return () => clearTimeout(timer);
    }
    setShowContent(false);
  }, [isActive]);

  useEffect(() => {
    if (!isActive || !point.tvContent.photo2) return;
    
    const interval = setInterval(() => {
      setCurrentImage(prev => 
        prev === point.tvContent.photo ? point.tvContent.photo2 : point.tvContent.photo
      );
    }, 10000); // Switch every 10 seconds
    
    return () => clearInterval(interval);
  }, [isActive, point.tvContent.photo, point.tvContent.photo2]);

  if (!point.tvContent.photo) return null;

  return (
    <AnimatePresence mode="wait">
      {showContent && (
        <motion.div
          className="fixed inset-0 flex items-start justify-center pt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              className={`relative rounded-lg overflow-hidden ${
                isPortrait ? 'h-[75vh] w-auto' : 'w-[60vw] h-auto'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-full h-full">
                <motion.img
                  src={currentImage}
                  alt={point.title}
                  className="w-full h-full object-contain rounded-lg"
                  style={{
                    filter: 'contrast(1.1) brightness(1.1)',
                  }}
                />
                
                {/* Info overlay */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.h2 
                    className="text-2xl font-bold text-white mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {point.tvContent.title}
                  </motion.h2>
                  <motion.p
                    className="text-lg text-gray-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {point.tvContent.date}
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}