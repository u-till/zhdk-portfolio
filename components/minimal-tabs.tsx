'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface MinimalTabsProps {
  tabs: Tab[];
}

export function MinimalTabs({ tabs }: MinimalTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className='w-full h-full border border-black/60 bg-background/90 backdrop-blur-md'>
      {/* Tab Headers */}
      <div className='grid grid-cols-2 border-b border-black/60'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative py-4 px-4 font-mono text-sm md:text-base font-medium uppercase transition-colors border-r border-black/60 even:border-r-0 ${
              activeTab === tab.id
                ? 'bg-foreground text-background'
                : 'bg-transparent text-foreground hover:bg-foreground/5'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId='activeMinimalTab'
                className='absolute inset-0 bg-foreground -z-10'
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className='relative min-h-[300px] md:min-h-[400px] p-6 md:p-8 overflow-auto'>
        <AnimatePresence mode='wait'>
          {tabs.map(
            (tab) =>
              activeTab === tab.id && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className='font-mono text-sm md:text-base leading-relaxed'
                >
                  {tab.content}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
