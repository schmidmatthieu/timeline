import { motion } from 'framer-motion';

export function Retro80sEffect() {
  return (
    <motion.div className="absolute inset-0 pointer-events-none">
      {/* VHS tracking lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(transparent 48%, rgba(255, 255, 255, 0.15) 50%, transparent 52%)',
          backgroundSize: '100% 8px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '0px 8px'],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Color bleeding */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(255,0,0,0.1), rgba(0,255,0,0.1), rgba(0,0,255,0.1))',
          backgroundSize: '6px 100%',
        }}
        animate={{
          x: [0, 2, 0, -2, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
        }}
      />

      {/* Static interference */}
      <motion.div
        className="absolute inset-0 mix-blend-overlay"
        animate={{
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
        }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </motion.div>
  );
}