import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'about | till solenthaler',
  description: 'Webdesigner and developer based in Zurich.',
  openGraph: {
    title: 'about | till solenthaler',
    description: 'Webdesigner and developer based in Zurich.',
    images: ['/social-thumbnail.jpg'],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
