export function preloadImages(
  urls: string[],
  onProgress: (progress: number) => void
): Promise<void[]> {
  let loaded = 0;
  const total = urls.length;

  const promises = urls.map(url => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        loaded++;
        onProgress(loaded / total);
        resolve();
      };
      
      img.onerror = () => {
        loaded++;
        onProgress(loaded / total);
        // Resolve instead of reject to prevent entire loading from failing
        resolve();
      };

      img.src = url;
    });
  });

  return Promise.all(promises);
}