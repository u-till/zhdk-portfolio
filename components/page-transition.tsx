'use client';

import { TRANSITION_DURATION } from '@/contexts/navigation-context';
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
  const pathname = usePathname();

  return (
    <div className='relative w-full min-h-screen'>
      <AnimatePresence initial={false} mode='popLayout'>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, position: 'absolute', top: 0, left: 0, right: 0 }}
          transition={{ duration: TRANSITION_DURATION / 1000 / 2, ease: 'easeInOut' }}
          className='w-full h-screen'
        >
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
