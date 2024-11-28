import { useState, useEffect } from 'react';

interface UseImageRatioResult {
  ratio: number | null;
  isLoading: boolean;
  error: Error | null;
}

export function useImageRatio(imageUrl: string): UseImageRatioResult {
  const [ratio, setRatio] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!imageUrl) {
      setIsLoading(false);
      return;
    }

    const img = new Image();
    
    img.onload = () => {
      setRatio(img.width / img.height);
      setIsLoading(false);
    };

    img.onerror = () => {
      setError(new Error('Failed to load image'));
      setIsLoading(false);
    };

    img.src = imageUrl;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

  return { ratio, isLoading, error };
}