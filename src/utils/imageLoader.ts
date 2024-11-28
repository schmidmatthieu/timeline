export function preloadImages(
  urls: (string | undefined)[],
  onProgress: (progress: number) => void
): Promise<void[]> {
  // Filter out undefined URLs
  const validUrls = urls.filter((url): url is string => !!url);
  
  let loaded = 0;
  const total = validUrls.length;

  const promises = validUrls.map(url => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      
      img.onload = () => {
        loaded++;
        onProgress(loaded / total);
        resolve();
      };
      
      img.onerror = () => {
        console.warn(`Failed to load image: ${url}`);
        loaded++;
        onProgress(loaded / total);
        resolve();
      };

      img.src = url;
    });
  });

  return Promise.all(promises);
}