import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'traces | till solenthaler',
  description: 'ZHdK Homework assignment for the subject traces',
  openGraph: {
    title: 'traces | till solenthaler',
    description: 'A book exploring construction kits from the last 100 years.',
    images: ['/toy-lexicon/mockup-1.png'],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
