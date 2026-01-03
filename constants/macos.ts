export const WINDOW_CONSTRAINTS = {
  MIN_WIDTH: 400,
  MIN_HEIGHT: 300,
  BASE_Z_INDEX: 51,
} as const;

export const DEFAULT_WINDOW_SIZES = {
  BROWSER_LARGE: { width: 1400, height: 700 },
  BROWSER_MEDIUM: { width: 1200, height: 700 },
  BROWSER_SMALL: { width: 1000, height: 700 },
  TEXT: { width: 600, height: 400 },
  TERMINAL: { width: 700, height: 500 },
} as const;

export const ANIMATIONS = {
  WINDOW: { type: 'spring' as const, stiffness: 300, damping: 25 },
  TOOLTIP: { duration: 0.15 },
} as const;
