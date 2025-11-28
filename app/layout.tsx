import { Navigation } from '@/components/navigation';
import { ActiveSectionProvider } from '@/contexts/active-section-context';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
      </body>
    </html>
  );
}
