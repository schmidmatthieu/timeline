import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface AdminNotificationProps {
  notification: {
    message: string;
    type: 'success' | 'error';
  } | null;
  onClose: () => void;
}

export function AdminNotification({ notification, onClose }: AdminNotificationProps) {
  if (!notification) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        <div className="flex items-center gap-4">
          <p className="text-white">{notification.message}</p>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}