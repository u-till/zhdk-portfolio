import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'under construction - till solenthaler',
  description:
    'A concrete sound amplifier designed with brutalist architecture principles. Amplifies smartphone audio without electricity.',
  openGraph: {
    title: 'under construction - till solenthaler',
    description: 'A concrete sound amplifier designed with brutalist architecture principles.',
    images: ['/under-construction/korpus-360/normalized-01.png'],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
