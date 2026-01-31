import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'retrofitted | till solenthaler',
  description: 'An antique lamp transformed into a modern USB-C rechargeable light with dimmable LED.',
  openGraph: {
    title: 'retrofitted | till solenthaler',
    description: 'An antique lamp transformed into a modern USB-C rechargeable light.',
    images: ['/retrofitted/lamp-1.png'],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
