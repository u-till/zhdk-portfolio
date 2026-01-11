import { ReactNode } from 'react';

export type ImageItem = {
  src: string;
  objectFit: 'cover' | 'contain';
  bg?: string;
  hideTitle?: boolean;
};

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}
