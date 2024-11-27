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
  images: string[];
}

export function FloatingImages({ progress, images }: FloatingImagesProps) {
  const [floatingImages, setFloatingImages] = useState<FloatingImage[]>([]);

  useEffect(() => {
    const newImages = images.map((url, index) => ({
      id: index,
      x: Math.random() * 80 + 10, // 10-90%
      y: Math.random() * 60 + 20, // 20-80%
      scale: Math.random() * 0.5 + 1.5, // 1.5-2.0 (larger images)
      rotation: Math.random() * 20 - 10, // -10 to 10 degrees
      url,
    }));
    setFloatingImages(newImages);
  }, [images]);

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
          <div className="relative w-64 h-64 rounded-xl overflow-hidden filter drop-shadow-2xl">
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