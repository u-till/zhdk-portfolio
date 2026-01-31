import { Navigation } from '@/components/navigation';
import { PageTransition } from '@/components/page-transition';
import { NavigationProvider } from '@/contexts/navigation-context';
import { geistMono, geistSans } from '@/lib/fonts';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'portfolio | till solenthaler',
  description: 'Portfolio of Till Solenthaler, webdesigner and developer based in Zurich, Switzerland.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NavigationProvider>
          <Navigation />
          <main className='w-full'>
            <PageTransition>{children}</PageTransition>
          </main>
        </NavigationProvider>
        <Analytics />
      </body>
    </html>
  );
}
