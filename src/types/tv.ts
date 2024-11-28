import type { TimelinePoint } from './timeline';

export interface TVContent {
  title: string;
  date: string;
  photo: string;
  photo2?: string;
}

export interface TVEffectProps {
  isActive?: boolean;
}

export interface TVFrameProps {
  children: React.ReactNode;
  isPortrait?: boolean;
}

export interface TVScreenProps {
  point: TimelinePoint;
  showContent: boolean;
  isPortrait?: boolean;
}