import { useState, useEffect, useCallback } from 'react';
import type { TimelineData } from '../types/timeline';
import type { LoadingState } from '../types/loading';
import { preloadImages } from '../utils/imageLoader';
import { fetchTimelineData, saveTimelineData } from '../utils/api';

const POLLING_INTERVAL = 2000; // 2 seconds

export function useTimelineData() {
  const [data, setData] = useState<TimelineData | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    error: null,
    progress: 0,
  });

  const loadData = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoadingState(prev => ({
          ...prev,
          isLoading: true,
          error: null,
        }));
      }

      const timelineData = await fetchTimelineData();

      const imagesToPreload = [
        ...timelineData.backgrounds,
        ...timelineData.avatars,
        ...timelineData.points.flatMap(point => [
          point.tvContent.photo,
          point.tvContent.photo2,
          ...point.floatingImages,
        ]),
      ];

      await preloadImages(imagesToPreload, (progress) => {
        setLoadingState(prev => ({
          ...prev,
          progress: progress * 100
        }));
      });

      setData(timelineData);
      setLoadingState({
        isLoading: false,
        error: null,
        progress: 100
      });
    } catch (error) {
      setLoadingState({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        progress: 0
      });
    }
  }, []);

  useEffect(() => {
    loadData();

    // Set up polling
    const pollInterval = setInterval(() => {
      loadData(false); // Don't show loading state during polling
    }, POLLING_INTERVAL);

    return () => {
      clearInterval(pollInterval);
    };
  }, [loadData]);

  const saveData = async (updatedData: TimelineData) => {
    try {
      await saveTimelineData(updatedData);
      setData(updatedData);
      await loadData(false); // Reload data immediately after saving
    } catch (error) {
      throw new Error('Failed to save timeline data');
    }
  };

  return { data, loadingState, saveData };
}