import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'amped up - till solenthaler',
  description: 'Klein+Hummel studio monitors upgraded with digital amplifiers, Bluetooth, and DSP capabilities.',
  openGraph: {
    title: 'amped up - till solenthaler',
    description: 'Klein+Hummel studio monitors upgraded with digital amplifiers and Bluetooth.',
    images: ['/amped-up/preview.jpg'],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
