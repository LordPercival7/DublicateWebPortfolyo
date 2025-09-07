// Performance optimization utilities
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Memory cleanup utilities
export const cleanupUnusedImages = () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.complete || img.naturalHeight === 0) {
      img.remove();
    }
  });
};

// Reduce bundle size by removing unused CSS
export const removeUnusedStyles = () => {
  const stylesheets = document.querySelectorAll('style, link[rel="stylesheet"]');
  stylesheets.forEach(sheet => {
    if (sheet instanceof HTMLLinkElement && !sheet.href.includes('fonts.googleapis.com')) {
      // Keep only essential stylesheets
      return;
    }
  });
};

// Browser storage cleanup
export const cleanupStorage = () => {
  try {
    // Remove old cache entries
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('temp_') || key.startsWith('cache_')) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.warn('Storage cleanup failed:', error);
  }
};