import { Allerta_Stencil, Shrikhand, VT323, Doto, Orbitron, Courier_Prime } from 'next/font/google';

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

export const doto = Doto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-doto',
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
