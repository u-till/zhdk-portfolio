import { Navigation } from '@/components/navigation';
import { ActiveSectionProvider } from '@/contexts/active-section-context';
import { geistMono, geistSans } from '@/lib/fonts';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Till Solenthaler - Portfolio',
  description: 'Portfolio of Till Solenthaler',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ActiveSectionProvider>
          <Navigation />
          <main>{children}</main>
        </ActiveSectionProvider>
        <Analytics />
      </body>
    </html>
  );
}
