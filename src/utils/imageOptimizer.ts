// Image optimization utilities to reduce file sizes and improve loading
export const optimizeImageUrl = (url: string, width?: number, height?: number): string => {
  // For Pexels images, add optimization parameters
  if (url.includes('pexels.com')) {
    const baseUrl = url.split('?')[0];
    const params = new URLSearchParams();
    
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    params.set('auto', 'compress');
    params.set('cs', 'tinysrgb');
    
    return `${baseUrl}?${params.toString()}`;
  }
  
  return url;
};

// Lazy loading utility for images
export const createLazyImageObserver = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
      }
    });
  }, {
    rootMargin: '50px'
  });
};

// Preload critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};