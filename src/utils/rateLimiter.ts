// Rate limiting utilities for spam prevention
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) { // 15 minutes
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const entry = this.limits.get(identifier);

    if (!entry || now > entry.resetTime) {
      // Reset or create new entry
      this.limits.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs
      });
      return true;
    }

    if (entry.count >= this.maxAttempts) {
      return false;
    }

    entry.count++;
    return true;
  }

  getRemainingTime(identifier: string): number {
    const entry = this.limits.get(identifier);
    if (!entry) return 0;
    
    const now = Date.now();
    return Math.max(0, entry.resetTime - now);
  }

  getRemainingAttempts(identifier: string): number {
    const entry = this.limits.get(identifier);
    if (!entry) return this.maxAttempts;
    
    return Math.max(0, this.maxAttempts - entry.count);
  }

  reset(identifier: string): void {
    this.limits.delete(identifier);
  }

  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.limits.entries()) {
      if (now > entry.resetTime) {
        this.limits.delete(key);
      }
    }
  }
}

// Global rate limiter instances
export const formSubmissionLimiter = new RateLimiter(3, 15 * 60 * 1000); // 3 attempts per 15 minutes
export const verificationLimiter = new RateLimiter(5, 5 * 60 * 1000); // 5 attempts per 5 minutes
export const resendLimiter = new RateLimiter(3, 10 * 60 * 1000); // 3 resends per 10 minutes

// Utility functions
export const getClientIdentifier = (): string => {
  // In a real application, you might use IP address or user session
  // For demo, we'll use a combination of user agent and timestamp
  const userAgent = navigator.userAgent;
  const sessionId = sessionStorage.getItem('sessionId') || Date.now().toString();
  sessionStorage.setItem('sessionId', sessionId);
  
  return btoa(userAgent + sessionId).slice(0, 32);
};

export const formatRemainingTime = (ms: number): string => {
  const minutes = Math.floor(ms / (60 * 1000));
  const seconds = Math.floor((ms % (60 * 1000)) / 1000);
  
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
};

// Cleanup old entries periodically
setInterval(() => {
  formSubmissionLimiter.cleanup();
  verificationLimiter.cleanup();
  resendLimiter.cleanup();
}, 5 * 60 * 1000); // Every 5 minutes