import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Saudade - Till Solenthaler',
  description: 'A photography project capturing moments of longing from travels around the world.',
  openGraph: {
    title: 'Saudade - Till Solenthaler',
    description: 'A photography project capturing moments of longing from travels around the world.',
    images: ['/saudade/ambalavao-mdg-2.png'],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
