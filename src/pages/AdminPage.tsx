import { useState } from 'react';
import { AdminHeader } from '../components/admin/AdminHeader';
import { PointsList } from '../components/admin/PointsList';
import { PointForm } from '../components/admin/PointForm';
import { AdminNotification } from '../components/admin/AdminNotification';
import { useTimelineData } from '../hooks/useTimelineData';
import type { TimelinePoint } from '../types/timeline';

interface AdminPageProps {
  data: TimelineData;
  onSave: (data: TimelineData) => void;
  onClose: () => void;
}

export function AdminPage({ data, onSave, onClose }: AdminPageProps) {
  const [editingPoint, setEditingPoint] = useState<TimelinePoint | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleSave = async (point: TimelinePoint) => {
    try {
      let updatedPoints;
      
      if (editingPoint) {
        updatedPoints = data.points.map(p => p.id === point.id ? point : p);
      } else {
        const maxId = Math.max(...data.points.map(p => p.id), 0);
        const newPoint = {
          ...point,
          id: maxId + 1,
          position: data.points.length
        };
        updatedPoints = [...data.points, newPoint];
      }

      updatedPoints.sort((a, b) => a.position - b.position);

      await onSave({
        ...data,
        points: updatedPoints,
      });

      setNotification({
        message: `Point successfully ${editingPoint ? 'updated' : 'added'}!`,
        type: 'success'
      });
      setEditingPoint(null);
    } catch (error) {
      setNotification({
        message: 'Failed to save changes. Please try again.',
        type: 'error'
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this point?')) return;

    try {
      const updatedPoints = data.points
        .filter(p => p.id !== id)
        .map((point, index) => ({
          ...point,
          position: index
        }));

      await onSave({
        ...data,
        points: updatedPoints,
      });

      setNotification({
        message: 'Point successfully deleted!',
        type: 'success'
      });
    } catch (error) {
      setNotification({
        message: 'Failed to delete point. Please try again.',
        type: 'error'
      });
    }
  };

  const handleReorder = async (reorderedPoints: TimelinePoint[]) => {
    try {
      const updatedPoints = reorderedPoints.map((point, index) => ({
        ...point,
        position: index
      }));

      await onSave({
        ...data,
        points: updatedPoints,
      });

      setNotification({
        message: 'Timeline order updated successfully!',
        type: 'success'
      });
    } catch (error) {
      setNotification({
        message: 'Failed to reorder points. Please try again.',
        type: 'error'
      });
    }
  };

  const handleToggleVisibility = async (point: TimelinePoint) => {
    try {
      const updatedPoints = data.points.map(p => 
        p.id === point.id ? { ...p, hidden: !p.hidden } : p
      );

      await onSave({
        ...data,
        points: updatedPoints,
      });

      setNotification({
        message: `Point ${point.hidden ? 'shown' : 'hidden'} successfully!`,
        type: 'success'
      });
    } catch (error) {
      setNotification({
        message: 'Failed to toggle visibility. Please try again.',
        type: 'error'
      });
    }
  };

  const handleToggleFloatingImages = async (point: TimelinePoint) => {
    try {
      const updatedPoints = data.points.map(p => 
        p.id === point.id ? { ...p, hideFloatingImages: !p.hideFloatingImages } : p
      );

      await onSave({
        ...data,
        points: updatedPoints,
      });

      setNotification({
        message: `Floating images ${point.hideFloatingImages ? 'shown' : 'hidden'} successfully!`,
        type: 'success'
      });
    } catch (error) {
      setNotification({
        message: 'Failed to toggle floating images. Please try again.',
        type: 'error'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <AdminHeader 
        onNewPoint={() => setEditingPoint({
          id: 0,
          year: new Date().getFullYear(),
          position: data.points.length,
          title: '',
          tvContent: {
            title: '',
            date: '',
            photo: '',
          },
          background: '',
          floatingImages: [''],
        })}
        onClose={onClose}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <PointsList
          points={data.points}
          onEdit={setEditingPoint}
          onDelete={handleDelete}
          onReorder={handleReorder}
          onToggleVisibility={handleToggleVisibility}
          onToggleFloatingImages={handleToggleFloatingImages}
        />

        {editingPoint && (
          <PointForm
            point={editingPoint}
            onSave={handleSave}
            onCancel={() => setEditingPoint(null)}
          />
        )}
      </div>

      <AdminNotification
        notification={notification}
        onClose={() => setNotification(null)}
      />
    </div>
  );
}