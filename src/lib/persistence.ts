import { browser } from '$app/environment';

const PREFIX = 'visual-sorting:';

export const loadPref = <T>(key: string, fallback: T): T => {
  if (!browser) return fallback;
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

export const savePref = (key: string, value: unknown): void => {
  if (!browser) return;
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // localStorage disabled or quota exceeded — silently ignore
  }
};
