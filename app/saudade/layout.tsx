import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'saudade | till solenthaler',
  description: 'A photography project capturing moments of longing from travels around the world.',
  openGraph: {
    title: 'saudade | till solenthaler',
    description: 'A photography project capturing moments of longing from travels around the world.',
    images: ['/saudade/ambalavao-mdg-2.png'],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
