export const ROUTES = [
  '/',
  '/under-construction',
  '/saudade',
  '/retrofitted',
  '/amped-up',
  '/toy-lexicon',
  '/lost-in-space',
  '/dayjob',
  '/about',
] as const;

export type Route = (typeof ROUTES)[number];

export function getRouteIndex(path: string): number {
  return ROUTES.indexOf(path as Route);
}

export function getSectionFromPath(path: string): string {
  if (path === '/') return 'welcome';
  return path.slice(1); // Remove leading slash
}
