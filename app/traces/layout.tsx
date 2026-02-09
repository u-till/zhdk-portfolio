import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'traces | till solenthaler',
  description: 'ZHdK Homework assignment on the subject traces.',
  openGraph: {
    title: 'traces | till solenthaler',
    description: 'ZHdK Homework assignment on the subject traces.',
    images: ['/social-thumbnail.jpg'],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
