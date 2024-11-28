export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  progress: number;
}

export interface LoadingScreenProps {
  loadingState: LoadingState;
}