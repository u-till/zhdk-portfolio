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

export interface ProcessStep {
  image: string;
  title: string;
  text: string;
  objectFit?: 'cover' | 'contain';
  bg?: string;
}

export interface DockItem {
  id: string;
  label: string;
  icon: string;
  url?: string;
}
