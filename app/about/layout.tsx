import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'about | till solenthaler',
  description: 'Webdesigner and developer based in Zurich, Switzerland.',
  openGraph: {
    title: 'about | till solenthaler',
    description: 'Webdesigner and developer based in Zurich.',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
