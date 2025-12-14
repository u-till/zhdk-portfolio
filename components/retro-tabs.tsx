'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface RetroTabsProps {
  tabs: Tab[];
}

export function RetroTabs({ tabs }: RetroTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className='w-full h-full rounded-[32px] border border-orange-300/40 bg-orange-500/80 backdrop-blur-md shadow-lg'>
      {/* Tab Headers */}
      <div className='grid grid-cols-3 border-b border-orange-300/40'>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative cursor-pointer py-4 px-4 font-mono text-sm md:text-base font-medium uppercase transition-all ${
              index === 0 ? 'rounded-tl-[32px]' : index === tabs.length - 1 ? 'rounded-tr-[32px]' : ''
            }  ${
              activeTab === tab.id
                ? 'bg-orange-600 text-white rounded-t-[32px]'
                : 'bg-transparent text-white/80 hover:bg-orange-500/50 hover:rounded-t-[32px]'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId='activeRetroTab'
                className='absolute inset-0 bg-orange-600 -z-10 rounded-t-[32px]'
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
                  className='font-mono text-sm md:text-base leading-relaxed text-white'
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
