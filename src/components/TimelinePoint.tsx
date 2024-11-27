import { motion } from 'framer-motion';
import type { TimelinePoint as TimelinePointType } from '../types';

interface TimelinePointProps {
  point: TimelinePointType;
  isActive: boolean;
  onClick: () => void;
  totalPoints: number;
}

export function TimelinePoint({ point, isActive, onClick }: TimelinePointProps) {
  return (
    <motion.div
      className="relative cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      animate={{
        scale: isActive ? 1 : 0.8,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      {/* Connection line */}
      <motion.div
        className="absolute left-1/2 bottom-full w-px bg-gradient-to-b from-purple-500/0 via-purple-500/50 to-purple-500"
        style={{ transform: 'translateX(-50%)' }}
        animate={{
          height: isActive ? 60 : 40,
          opacity: isActive ? 1 : 0.5,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      />

      {/* Point circle with glow effect */}
      <motion.div
        className="relative w-6 h-6"
        animate={{
          scale: isActive ? 1.2 : 1,
        }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-purple-500/30 blur-md"
          animate={{
            scale: isActive ? [1, 1.2, 1] : 1,
            opacity: isActive ? [0.5, 0.8, 0.5] : 0.3,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Main circle */}
        <motion.div
          className="absolute inset-0 rounded-full bg-purple-500"
          animate={{
            scale: isActive ? 1.1 : 1,
            boxShadow: isActive
              ? '0 0 20px rgba(168, 85, 247, 0.5)'
              : '0 0 0px rgba(168, 85, 247, 0)',
          }}
        />

        {/* Inner glow */}
        <motion.div
          className="absolute inset-1 rounded-full bg-purple-400"
          animate={{
            opacity: isActive ? 0.8 : 0.5,
          }}
        />
      </motion.div>

      {/* Label */}
      <motion.div
        className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-48 text-center"
        animate={{
          opacity: isActive ? 1 : 0,
          y: isActive ? -8 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <motion.h3 
          className="text-lg font-bold text-purple-400 mb-1"
          animate={{ scale: isActive ? 1.1 : 1 }}
        >
          {point.year}
        </motion.h3>
        <motion.p 
          className="text-sm text-white/90 line-clamp-2"
          animate={{ opacity: isActive ? 1 : 0.7 }}
        >
          {point.title}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}