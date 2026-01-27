'use client';

import { useNavigation } from '@/contexts/navigation-context';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname } from 'next/navigation';
import { ReactNode, useContext, useRef } from 'react';

// Freeze the router context to prevent re-renders during exit animation
function FrozenRouter({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

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
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          className='absolute inset-0'
        >
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
