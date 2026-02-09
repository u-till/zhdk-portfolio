import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'lost in space | till solenthaler',
  description: 'A collaborative music album combining space-themed productions with original cover art.',
  openGraph: {
    title: 'lost in space | till solenthaler',
    description: 'A collaborative music album combining space-themed productions with original cover art.',
    images: ['/social-thumbnail.jpg'],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
