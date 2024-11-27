export interface TVContent {
  title: string;
  date: string;
  photo: string;
}

export interface TimelinePoint {
  id: number;
  year: number;
  position: number;
  title: string;
  tvContent: TVContent;
  background: string;
  floatingImages: string[];
}

export interface TimelineData {
  points: TimelinePoint[];
  backgrounds: string[];
  avatars: string[];
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  progress: number;
}