import { motion, Reorder } from 'framer-motion';
import { Edit2, Trash2, Eye, EyeOff, Image } from 'lucide-react';
import type { TimelinePoint } from '../../types/timeline';

interface PointsListProps {
  points: TimelinePoint[];
  onEdit: (point: TimelinePoint) => void;
  onDelete: (id: number) => void;
  onReorder: (points: TimelinePoint[]) => void;
  onToggleVisibility: (point: TimelinePoint) => void;
  onToggleFloatingImages: (point: TimelinePoint) => void;
}

export function PointsList({ 
  points, 
  onEdit, 
  onDelete, 
  onReorder, 
  onToggleVisibility,
  onToggleFloatingImages 
}: PointsListProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 max-h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar">
      <h2 className="text-xl font-semibold mb-4">Timeline Points</h2>
      
      <Reorder.Group
        axis="y"
        values={points}
        onReorder={onReorder}
        className="space-y-2"
      >
        {points.map((point) => (
          <Reorder.Item
            key={point.id}
            value={point}
            className={`bg-gray-700 rounded-lg p-4 cursor-move ${point.hidden ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-400 font-semibold">
                    {point.year}
                  </span>
                  <span className="text-sm text-gray-400">
                    #{point.position + 1}
                  </span>
                </div>
                <h3 className="text-lg mt-1">{point.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                {point.floatingImages.some(url => url && url.trim() !== '') && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onToggleFloatingImages(point)}
                    className={`p-2 rounded-lg transition-colors ${
                      point.hideFloatingImages 
                        ? 'hover:bg-purple-500/20 text-gray-400' 
                        : 'hover:bg-purple-500/20 text-purple-400'
                    }`}
                    title={point.hideFloatingImages ? 'Show floating images' : 'Hide floating images'}
                  >
                    <Image size={18} />
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onToggleVisibility(point)}
                  className={`p-2 rounded-lg transition-colors ${
                    point.hidden 
                      ? 'hover:bg-purple-500/20 text-gray-400' 
                      : 'hover:bg-purple-500/20 text-purple-400'
                  }`}
                  title={point.hidden ? 'Show point' : 'Hide point'}
                >
                  {point.hidden ? <EyeOff size={18} /> : <Eye size={18} />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onEdit(point)}
                  className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
                >
                  <Edit2 size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDelete(point.id)}
                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                >
                  <Trash2 size={18} />
                </motion.button>
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}