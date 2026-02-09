import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'dayjob | till solenthaler',
  description: 'A selection of freelance web projects ranging from portfolio sites to business applications.',
  openGraph: {
    title: 'dayjob | till solenthaler',
    description: 'A selection of freelance web projects ranging from portfolio sites to business applications.',
    images: ['/social-thumbnail.jpg'],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
