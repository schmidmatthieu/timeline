import { useMemo } from 'react';
import { getAvatarForYear } from '../utils/avatar';
import type { TimelineData } from '../types/timeline';

interface UseCharacterAvatarProps {
  birthYear: number;
  currentYear: number;
  data: TimelineData | null;
}

export function useCharacterAvatar({ birthYear, currentYear, data }: UseCharacterAvatarProps) {
  const currentAvatar = useMemo(() => {
    if (!data?.avatars.length) return '';
    
    try {
      return getAvatarForYear(birthYear, currentYear, data.avatars);
    } catch (error) {
      console.error('Error getting avatar:', error);
      // Return the first avatar as fallback
      return data.avatars[0];
    }
  }, [birthYear, currentYear, data]);

  return currentAvatar;
}