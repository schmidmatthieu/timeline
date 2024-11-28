import type { TimelineData } from '../types/timeline';

const isLocalhost = window.location.hostname === 'localhost';
const API_BASE = isLocalhost ? 'http://localhost:3001' : '';

export async function fetchTimelineData(): Promise<TimelineData> {
  try {
    const response = await fetch('/data/timeline.json');
    
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
    const endpoint = isLocalhost 
      ? `${API_BASE}/api/timeline`
      : '/.netlify/functions/save-timeline';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to save timeline data');
    }
  } catch (error) {
    console.error('Failed to save timeline data:', error);
    throw error;
  }
}