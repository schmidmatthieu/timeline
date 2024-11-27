import { motion } from 'framer-motion';

export function RetroLines() {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Static noise */}
      <motion.div
        className="absolute inset-0 mix-blend-overlay"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Horizontal scan lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.8) 50%)',
          backgroundSize: '100% 4px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '0px 4px'],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Screen flicker */}
      <motion.div
        className="absolute inset-0 bg-white mix-blend-overlay"
        animate={{
          opacity: [0, 0.1, 0, 0.08, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          times: [0, 0.2, 0.4, 0.6, 1],
        }}
      />

      {/* Color distortion */}
      <motion.div
        className="absolute inset-0 mix-blend-color"
        style={{
          background: 'radial-gradient(circle, rgba(255,0,0,0.1), rgba(0,255,0,0.1), rgba(0,0,255,0.1))',
        }}
        animate={{
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}