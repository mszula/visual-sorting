export const trackEvent = (eventName: string, eventData?: Record<string, string | number>) => {
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.track(eventName, eventData);
  }
};
