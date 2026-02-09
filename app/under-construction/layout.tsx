import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'under construction | till solenthaler',
  description: 'A filing cabinet on wheels built from construction site planks.',
  openGraph: {
    title: 'under construction | till solenthaler',
    description: 'A filing cabinet on wheels built from construction site planks.',
    images: ['/social-thumbnail.jpg'],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
