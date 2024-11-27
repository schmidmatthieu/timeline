import { motion } from 'framer-motion';
import { Retro60sTV } from './Retro60sTV';
import { Retro70sTV } from './Retro70sTV';
import { Retro80sTV } from './Retro80sTV';
import { Retro90sTV } from './Retro90sTV';
import { ModernTV } from './ModernTV';

interface TVFrameProps {
  era: 'retro60s' | 'retro70s' | 'retro80s' | 'retro90s' | 'modern';
  children: React.ReactNode;
  scale?: number;
}

const TVComponents = {
  retro60s: Retro60sTV,
  retro70s: Retro70sTV,
  retro80s: Retro80sTV,
  retro90s: Retro90sTV,
  modern: ModernTV,
};

export function TVFrame({ era, children, scale = 1 }: TVFrameProps) {
  const TVComponent = TVComponents[era];

  return (
    <motion.div
      className="relative transform origin-center"
      style={{ scale }}
      whileHover={{ scale: scale * 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <TVComponent>
        {children}
      </TVComponent>
    </motion.div>
  );
}