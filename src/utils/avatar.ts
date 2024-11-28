import type { TimelineData } from '../types/timeline';

export function getAvatarForYear(birthYear: number, currentYear: number, avatars: string[]): string {
  if (!avatars.length) return '';

  // Special case for 1978
  if (currentYear === 1978) return avatars[0];  // Keep avatar1 for 1978

  // Regular year ranges for each avatar
  if (currentYear < 1974) return avatars[0];  // Avatar 1: before 1974
  if (currentYear < 1990) return avatars[1];  // Avatar 2: 1974-1990
  if (currentYear < 1998) return avatars[2];  // Avatar 3: 1990-1998
  if (currentYear < 2009) return avatars[3];  // Avatar 4: 1998-2009
  if (currentYear < 2017) return avatars[4];  // Avatar 5: 2009-2017
  return avatars[5];                          // Avatar 6: 2017 onwards
}

// Helper function to get age (kept for potential future use)
export function getAgeFromYear(birthYear: number, currentYear: number): number {
  return currentYear - birthYear;
}