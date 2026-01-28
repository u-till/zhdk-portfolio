'use client';

import { TRANSITION_DURATION, useNavigation } from '@/contexts/navigation-context';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname } from 'next/navigation';
import { ReactNode, useContext, useState } from 'react';

// Freeze the router context to prevent re-renders during exit animation
function FrozenRouter({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext);
  // useState captures the initial value and never updates - this freezes the context
  const [frozen] = useState(context);

  return <LayoutRouterContext.Provider value={frozen}>{children}</LayoutRouterContext.Provider>;
}

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const { direction } = useNavigation();
  const pathname = usePathname();

  return (
    <div className='relative w-full h-screen overflow-hidden'>
      <AnimatePresence initial={false} mode='popLayout'>
        <motion.div
          key={pathname}
          initial={{ y: direction > 0 ? '100%' : '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: direction > 0 ? '-100%' : '100%' }}
          transition={{ duration: TRANSITION_DURATION / 1000, ease: [0.65, 0, 0.35, 1] }}
          className='absolute inset-0'
        >
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
