import { motion } from 'framer-motion';
import type { LoadingState } from '../types';

interface LoadingScreenProps {
  loadingState: LoadingState;
}

export function LoadingScreen({ loadingState }: LoadingScreenProps) {
  const { isLoading, error, progress } = loadingState;

  if (!isLoading && !error) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {error ? (
        <motion.div
          className="text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl text-red-500 mb-4">Error</h2>
          <p className="text-white">{error}</p>
          <motion.button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Retry</span>
            <motion.div
              className="absolute inset-0 bg-purple-400"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            />
          </motion.button>
        </motion.div>
      ) : (
        <div className="text-center">
          <motion.div
            className="w-24 h-24 border-4 border-purple-500 border-t-transparent rounded-full mb-4 mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-purple-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <motion.p
            className="text-white mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {Math.round(progress)}% loaded
          </motion.p>
        </div>
      )}
    </motion.div>
  );
}