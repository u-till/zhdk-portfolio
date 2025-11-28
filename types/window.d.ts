export {};

declare global {
  interface Window {
    __scrollToSection?: (index: number) => void;
  }
}
