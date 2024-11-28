import { Plus } from 'lucide-react';

interface AdminHeaderProps {
  onNewPoint: () => void;
}

export function AdminHeader({ onNewPoint }: AdminHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Timeline Administration</h1>
        <p className="text-gray-400 mt-2">Manage your timeline points</p>
      </div>

      <button
        onClick={onNewPoint}
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
      >
        <Plus size={20} />
        Add New Point
      </button>
    </div>
  );
}