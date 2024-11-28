import { motion } from 'framer-motion';
import { ModernTV } from './ModernTV';

interface TVFrameProps {
  children: React.ReactNode;
  isPortrait?: boolean;
}

export function TVFrame({ children, isPortrait = false }: TVFrameProps) {
  return (
    <motion.div
      className={`relative w-full ${isPortrait ? 'aspect-[3/4]' : 'aspect-[16/9]'}`}
      whileHover={{ scale: 1.0 }}
      transition={{ duration: 0.2 }}
    >
      <ModernTV isPortrait={isPortrait}>
        {children}
      </ModernTV>
    </motion.div>
  );
}