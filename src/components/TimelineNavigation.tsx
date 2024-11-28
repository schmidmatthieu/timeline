import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import type { TimelinePoint } from '../types/timeline';

interface TimelineNavigationProps {
  points: TimelinePoint[];
  onNavigate: (position: number) => void;
}

export function TimelineNavigation({ points, onNavigate }: TimelineNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPoints = points.filter(point => {
    const searchLower = searchTerm.toLowerCase();
    return (
      point.year.toString().includes(searchTerm) ||
      point.title.toLowerCase().includes(searchLower) ||
      point.tvContent.date.includes(searchTerm)
    );
  });

  const handleSelect = (position: number) => {
    onNavigate(position);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        className="fixed bottom-4 right-4 bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Search size={24} />
      </motion.button>

      {/* Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl p-4 w-80 max-h-96 overflow-hidden z-50"
          >
            {/* Search Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by year or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
            </div>

            {/* Results List */}
            <div className="overflow-y-auto max-h-72 space-y-2 custom-scrollbar">
              {filteredPoints.map((point) => (
                <motion.button
                  key={point.id}
                  className="w-full text-left bg-gray-800/50 hover:bg-purple-500/20 p-3 rounded-lg transition-colors"
                  onClick={() => handleSelect(point.position)}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 font-semibold">
                      {point.year}
                    </span>
                    <span className="text-sm text-gray-400">
                      #{point.position + 1}
                    </span>
                  </div>
                  <div className="text-white text-sm mt-1">
                    {point.title}
                  </div>
                </motion.button>
              ))}

              {filteredPoints.length === 0 && (
                <div className="text-gray-400 text-center py-4">
                  No results found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}