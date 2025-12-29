import { Allerta_Stencil, Courier_Prime, Geist, Geist_Mono, Orbitron, Shrikhand, VT323 } from 'next/font/google';
import localFont from 'next/font/local';

export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const allertaStencil = Allerta_Stencil({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-allerta-stencil',
});

export const shrikhand = Shrikhand({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-shrikhand',
});

export const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-vt323',
});

export const orbitron = Orbitron({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
});

export const courierPrime = Courier_Prime({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-courier-prime',
});

export const dinNext = localFont({
  src: [
    {
      path: '../public/toy-lexicon/din-next-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/toy-lexicon/din-next-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/toy-lexicon/din-next-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-din-next',
});
