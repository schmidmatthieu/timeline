import { motion } from 'framer-motion';

export function ModernEffect() {
  return (
    <motion.div className="absolute inset-0 pointer-events-none">
      {/* Initial power-on flash */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 0.3,
          times: [0, 0.5, 1],
        }}
      />

      {/* HDR-like highlight sweep */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      />

      {/* Subtle edge glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.1) 100%)',
        }}
        animate={{
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Color enhancement */}
      <motion.div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          background: 'linear-gradient(45deg, rgba(0,150,255,0.1), rgba(255,100,100,0.1))',
        }}
        animate={{
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}