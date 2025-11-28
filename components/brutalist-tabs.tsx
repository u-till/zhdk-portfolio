'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface BrutalistTabsProps {
  tabs: Tab[];
}

export function BrutalistTabs({ tabs }: BrutalistTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className='w-full h-full border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
      {/* Tab Headers */}
      <div className='grid grid-cols-2 border-b-4 border-black'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative py-4 px-4 font-mono text-sm md:text-base font-bold uppercase transition-colors border-r-4 even:border-r-0 border-black ${
              activeTab === tab.id
                ? 'bg-red-600 text-white'
                : 'bg-white text-black hover:bg-neutral-100'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId='activeTab'
                className='absolute inset-0 bg-red-600 -z-10'
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
