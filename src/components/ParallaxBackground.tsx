import { motion } from 'framer-motion';
import { FloatingImages } from './FloatingImages';

interface ParallaxBackgroundProps {
  progress: number;
  currentBackground: string;
  floatingImages?: string[];
  hideFloatingImages?: boolean;
}

export function ParallaxBackground({ 
  progress, 
  currentBackground, 
  floatingImages,
  hideFloatingImages 
}: ParallaxBackgroundProps) {
  return (
    <>
      {/* Dark overlay gradient */}
      <motion.div 
        className="fixed inset-0 bg-gradient-to-b from-black to-purple-950/20"
      />
      
      {/* Main background image */}
      <motion.div 
        className="fixed inset-0 bg-center bg-no-repeat bg-cover opacity-30"
        style={{
          backgroundImage: `url(${currentBackground})`,
          scale: 1.2,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
      />

      {/* Purple radial gradient overlay */}
      <motion.div 
        className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.15),rgba(0,0,0,0.3))]"
      />

      {/* Floating Images */}
      {!hideFloatingImages && floatingImages?.some(url => url && url.trim() !== '') && (
        <FloatingImages progress={progress} images={floatingImages} />
      )}
      
      {/* Atmospheric particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </>
  );
}