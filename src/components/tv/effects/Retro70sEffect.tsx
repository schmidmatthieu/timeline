import { motion } from 'framer-motion';

export function Retro70sEffect() {
  return (
    <motion.div className="absolute inset-0 pointer-events-none">
      {/* Color bands */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(transparent 50%, rgba(255, 0, 0, 0.1) 50%, rgba(0, 255, 0, 0.1) 75%, rgba(0, 0, 255, 0.1) 75%)',
          backgroundSize: '100% 8px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '0px 8px'],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Static noise */}
      <motion.div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        animate={{
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
        }}
      />

      {/* Color distortion */}
      <motion.div
        className="absolute inset-0"
        style={{
          mixBlendMode: 'color',
          background: 'radial-gradient(circle, rgba(255,200,0,0.2), rgba(255,100,0,0.2))',
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