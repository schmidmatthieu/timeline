import { motion } from 'framer-motion';
import { FloatingImages } from './FloatingImages';

interface ParallaxBackgroundProps {
  progress: number;
  currentBackground: string;
  floatingImages: string[];
}

export function ParallaxBackground({ progress, currentBackground, floatingImages }: ParallaxBackgroundProps) {
  return (
    <>
      <motion.div 
        className="fixed inset-0 bg-gradient-to-b from-black to-purple-950/20"
        style={{
          x: `${progress * -10}%`,
        }}
      />
      
      {/* Main background image */}
      <motion.div 
        className="fixed inset-0 bg-center bg-no-repeat bg-cover opacity-30"
        style={{
          backgroundImage: `url(${currentBackground})`,
          x: `${progress * -20}%`,
          scale: 1.2,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
      />

      <motion.div 
        className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.15),rgba(0,0,0,0.3))]"
        style={{
          x: `${progress * -20}%`,
        }}
      />

      <FloatingImages progress={progress} images={floatingImages} />
      
      {/* Atmospheric particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              x: `${progress * -(30 + Math.random() * 20)}%`,
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