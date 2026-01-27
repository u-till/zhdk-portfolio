import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Toy Lexicon - Till Solenthaler',
  description: 'A book exploring construction kits from the last 100 years, with custom CMS and automated InDesign layout.',
  openGraph: {
    title: 'Toy Lexicon - Till Solenthaler',
    description: 'A book exploring construction kits from the last 100 years.',
    images: ['/toy-lexicon/mockup-1.png'],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
