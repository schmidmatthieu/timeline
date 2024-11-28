import { API_ENDPOINTS } from './constants';
import type { TimelineData } from '../types/timeline';

export async function fetchTimelineData(): Promise<TimelineData> {
  try {
    const response = await fetch('http://localhost:3001/api/timeline');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch timeline data:', error);
    throw new Error('Failed to load timeline data. Please try again later.');
  }
}

export async function saveTimelineData(data: TimelineData): Promise<void> {
  try {
    const response = await fetch('http://localhost:3001/api/timeline', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // No need to reload the page, just update the state
    return;
  } catch (error) {
    console.error('Failed to save timeline data:', error);
    throw new Error('Failed to save timeline data. Please try again later.');
  }
}