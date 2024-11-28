import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingImage {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  url: string;
}

interface FloatingImagesProps {
  progress: number;
  images?: string[];
}

export function FloatingImages({ progress, images }: FloatingImagesProps) {
  const [floatingImages, setFloatingImages] = useState<FloatingImage[]>([]);

  useEffect(() => {
    // Check if images array exists and has non-empty strings
    const validImages = images?.filter(url => url && url.trim() !== '');
    
    if (!validImages?.length) {
      setFloatingImages([]);
      return;
    }

    const newImages = validImages.map((url, index) => ({
      id: index,
      // Position x between 5% and 20% from the left
      x: Math.random() * 10 + 3,
      // Position y between 10% and 75% height
      y: Math.random() * 65 + 10,
      scale: Math.random() * 0.5 + 1.5,
      rotation: Math.random() * 20 - 10,
      url,
    }));
    setFloatingImages(newImages);
  }, [images]);

  // If no valid images, return null
  if (!floatingImages.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none">
      {floatingImages.map((image) => (
        <motion.div
          key={image.id}
          className="absolute"
          style={{
            left: `${image.x}%`,
            top: `${image.y}%`,
            x: `${progress * -(40 + image.id * 10)}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.6, 0.8, 0.6],
            scale: image.scale,
            rotate: [image.rotation - 2, image.rotation + 2, image.rotation - 2],
          }}
          transition={{
            opacity: {
              duration: 3 + image.id,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 5 + image.id * 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <div className="relative w-40 h-40 rounded-xl overflow-hidden filter drop-shadow-2xl">
            <div className="absolute inset-0 border-4 border-white/40 rounded-xl" />
            <img
              src={image.url}
              alt=""
              className="w-full h-full object-cover"
              style={{
                filter: 'brightness(1.2) contrast(1.1)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}