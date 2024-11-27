import { useState, useEffect } from 'react';
import type { TimelineData, LoadingState } from '../types';
import { preloadImages } from '../utils/imageLoader';

export function useTimelineData() {
  const [data, setData] = useState<TimelineData | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    error: null,
    progress: 0,
  });

  useEffect(() => {
    async function loadData() {
      try {
        // Load JSON data
        const response = await fetch('/data/timeline.json');
        if (!response.ok) {
          throw new Error('Failed to load timeline data');
        }
        const jsonData: TimelineData = await response.json();

        // Collect all images to preload
        const imagesToPreload = [
          ...jsonData.backgrounds,
          ...jsonData.avatars,
          ...jsonData.points.flatMap(point => [
            point.tvContent.photo,
            ...point.floatingImages
          ])
        ];

        // Preload images with progress tracking
        await preloadImages(imagesToPreload, (progress) => {
          setLoadingState(prev => ({
            ...prev,
            progress: progress * 100
          }));
        });

        setData(jsonData);
        setLoadingState({
          isLoading: false,
          error: null,
          progress: 100
        });
      } catch (error) {
        setLoadingState({
          isLoading: false,
          error: error instanceof Error ? error.message : 'An error occurred',
          progress: 0
        });
      }
    }

    loadData();
  }, []);

  return { data, loadingState };
}