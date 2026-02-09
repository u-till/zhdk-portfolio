import { Analytics } from '@/components/analytics';
import { Navigation } from '@/components/navigation';
import { PageTransition } from '@/components/page-transition';
import { NavigationProvider } from '@/contexts/navigation-context';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'portfolio | till solenthaler',
  description: 'Portfolio of Till Solenthaler, webdesigner and developer based in Zurich, Switzerland.',
  openGraph: {
    title: 'portfolio | till solenthaler',
    description: 'Portfolio of Till Solenthaler, webdesigner and developer based in Zurich, Switzerland.',
    images: ['/social-thumbnail.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='font-sans antialiased'>
        <Suspense fallback={null}>
          <NavigationProvider>
            <Navigation />
            <main className='w-full'>
              <PageTransition>{children}</PageTransition>
            </main>
          </NavigationProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
