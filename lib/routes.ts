export const ROUTES = [
  '/',
  '/under-construction',
  '/saudade',
  '/retrofitted',
  '/amped-up',
  '/toy-lexicon',
  '/lost-in-space',
  '/dayjob',
  '/trace',
  '/about',
] as const;

export type Route = (typeof ROUTES)[number];

export function getRouteIndex(path: string): number {
  return ROUTES.indexOf(path as Route);
}
