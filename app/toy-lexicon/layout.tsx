import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'toy lexicon | till solenthaler',
  description:
    'A book exploring construction kits from the last 100 years, with custom CMS and automated InDesign layout.',
  openGraph: {
    title: 'toy lexicon | till solenthaler',
    description:
      'A book exploring construction kits from the last 100 years, with custom CMS and automated InDesign layout.',
    images: ['/social-thumbnail.jpg'],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
