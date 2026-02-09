import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'retrofitted | till solenthaler',
  description: 'A retro lamp transformed into a modern USB-C rechargeable light with dimmable LED.',
  openGraph: {
    title: 'retrofitted | till solenthaler',
    description: 'A retro lamp transformed into a modern USB-C rechargeable light with dimmable LED.',
    images: ['/social-thumbnail.jpg'],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
