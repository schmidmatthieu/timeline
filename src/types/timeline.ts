import type { TVContent } from './tv';

export interface TimelinePoint {
  id: number;
  year: number;
  position: number;
  title: string;
  tvContent: TVContent;
  background: string;
  floatingImages: string[];
  hidden?: boolean;
  hideFloatingImages?: boolean; // New field to control floating images visibility
}

export interface TimelineData {
  points: TimelinePoint[];
  backgrounds: string[];
  avatars: string[];
}

export interface TimelineProps {
  points: TimelinePoint[];
  currentPosition: number;
  progress: number;
  onPointClick: (position: number) => void;
}