export interface WindowState {
  id: string;
  url?: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  type: 'browser' | 'text';
}

export interface DockItem {
  id: string;
  label: string;
  icon: string;
  url?: string;
}

export interface WindowProps {
  id: string;
  title: string;
  url?: string;
  type: 'browser' | 'text';
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isMaximized: boolean;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onResize: (size: { width: number; height: number }) => void;
  content?: React.ReactNode;
}
