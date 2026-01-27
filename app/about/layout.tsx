import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'About - Till Solenthaler',
  description: 'Webdesigner and developer based in Zurich, Switzerland.',
  openGraph: {
    title: 'About - Till Solenthaler',
    description: 'Webdesigner and developer based in Zurich.',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
