import { motion } from 'framer-motion';

export function Retro90sEffect() {
  return (
    <motion.div className="absolute inset-0 pointer-events-none">
      {/* Digital artifacts */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent 49%, rgba(255,255,255,0.1) 50%, transparent 51%)',
          backgroundSize: '4px 100%',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '4px 0px'],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Digital noise */}
      <motion.div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        animate={{
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
        }}
      />

      {/* Color enhancement */}
      <motion.div
        className="absolute inset-0"
        style={{
          mixBlendMode: 'color',
          background: 'radial-gradient(circle, rgba(100,200,255,0.1), rgba(255,100,255,0.1))',
        }}
        animate={{
          opacity: [0.2, 0.3, 0.2],
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