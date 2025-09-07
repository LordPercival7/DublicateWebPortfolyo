// Type definitions for Google reCAPTCHA
declare global {
  interface Window {
    grecaptcha: {
      render: (container: string | HTMLElement, parameters: {
        sitekey: string;
        callback?: (token: string) => void;
        'expired-callback'?: () => void;
        'error-callback'?: () => void;
        theme?: 'light' | 'dark';
        type?: 'image' | 'audio';
        size?: 'compact' | 'normal';
        tabindex?: number;
      }) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
      execute: (widgetId?: number) => void;
      ready: (callback: () => void) => void;
    };
  }
}

export {};