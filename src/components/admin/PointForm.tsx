import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { TimelinePoint } from '../../types/timeline';

interface PointFormProps {
  point: TimelinePoint;
  onSave: (point: TimelinePoint) => void;
  onCancel: () => void;
}

const DEFAULT_POINT: TimelinePoint = {
  id: 0,
  year: new Date().getFullYear(),
  position: 0,
  title: '',
  tvContent: {
    title: '',
    date: '',
    photo: '',
  },
  background: '',
  floatingImages: [''],
};

export function PointForm({ point, onSave, onCancel }: PointFormProps) {
  const [formData, setFormData] = useState<TimelinePoint>({
    ...DEFAULT_POINT,
    ...point,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.tvContent.title.trim()) newErrors.tvContentTitle = 'TV title is required';
    if (!formData.tvContent.date.trim()) newErrors.tvContentDate = 'TV date is required';
    if (!formData.background.trim()) newErrors.background = 'Background image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Ensure floating images array is properly formatted
      const cleanedFormData = {
        ...formData,
        floatingImages: formData.floatingImages
          .filter(url => url && url.trim() !== '')
          .map(url => url.trim()),
      };
      onSave(cleanedFormData);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      onSubmit={handleSubmit}
      className="bg-gray-800 rounded-lg p-6 sticky top-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {point.id ? 'Edit Point' : 'New Point'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Year
            </label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({
                ...formData,
                year: parseInt(e.target.value) || new Date().getFullYear()
              })}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            {errors.year && (
              <p className="text-red-400 text-sm mt-1">{errors.year}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Position
            </label>
            <input
              type="number"
              value={formData.position}
              onChange={(e) => setFormData({
                ...formData,
                position: parseInt(e.target.value) || 0
              })}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({
              ...formData,
              title: e.target.value
            })}
            className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            TV Content Title
          </label>
          <input
            type="text"
            value={formData.tvContent.title}
            onChange={(e) => setFormData({
              ...formData,
              tvContent: {
                ...formData.tvContent,
                title: e.target.value
              }
            })}
            className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          {errors.tvContentTitle && (
            <p className="text-red-400 text-sm mt-1">{errors.tvContentTitle}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            TV Content Date
          </label>
          <input
            type="text"
            value={formData.tvContent.date}
            onChange={(e) => setFormData({
              ...formData,
              tvContent: {
                ...formData.tvContent,
                date: e.target.value
              }
            })}
            className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          {errors.tvContentDate && (
            <p className="text-red-400 text-sm mt-1">{errors.tvContentDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            TV Content Photo URL
          </label>
          <input
            type="url"
            value={formData.tvContent.photo}
            onChange={(e) => setFormData({
              ...formData,
              tvContent: {
                ...formData.tvContent,
                photo: e.target.value
              }
            })}
            className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            TV Content Secondary Photo URL (Optional)
          </label>
          <input
            type="url"
            value={formData.tvContent.photo2 || ''}
            onChange={(e) => setFormData({
              ...formData,
              tvContent: {
                ...formData.tvContent,
                photo2: e.target.value || undefined
              }
            })}
            className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Background Image URL
          </label>
          <input
            type="url"
            value={formData.background}
            onChange={(e) => setFormData({
              ...formData,
              background: e.target.value
            })}
            className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          {errors.background && (
            <p className="text-red-400 text-sm mt-1">{errors.background}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Floating Images URLs (One per line)
          </label>
          <textarea
            value={formData.floatingImages.join('\n')}
            onChange={(e) => setFormData({
              ...formData,
              floatingImages: e.target.value.split('\n')
            })}
            rows={3}
            className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </motion.form>
  );
}