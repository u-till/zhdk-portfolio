interface InfoGridProps {
  children: React.ReactNode;
  columns?: 'text' | 'specs';
}

export function InfoGrid({ children, columns = 'text' }: InfoGridProps) {
  const baseClasses = 'grid gap-y-2 text-sm';
  const columnClasses =
    columns === 'specs' ? 'grid-cols-2 md:grid-cols-5' : 'grid-cols-1 md:grid-cols-5';

  return <div className={`${baseClasses} ${columnClasses}`}>{children}</div>;
}

export function InfoGridSpacer() {
  return <div className='hidden md:block' />;
}

interface InfoGridLabelProps {
  children: React.ReactNode;
}

export function InfoGridLabel({ children }: InfoGridLabelProps) {
  return <div className='font-bold md:text-right'>{children}</div>;
}

interface InfoGridContentProps {
  children: React.ReactNode;
}

export function InfoGridContent({ children }: InfoGridContentProps) {
  return <div className='md:col-span-2'>{children}</div>;
}
