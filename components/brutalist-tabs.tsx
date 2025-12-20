'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface BrutalistTabsProps {
  tabs: Tab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export function BrutalistTabs({ tabs, activeTab: externalActiveTab, onTabChange }: BrutalistTabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0].id);
  const activeTab = externalActiveTab || internalActiveTab;

  const handleTabChange = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
    } else {
      setInternalActiveTab(tabId);
    }
  };

  return (
    <div className='w-full h-full border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden'>
      {/* Tab Headers */}
      <div className={`grid ${tabs.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} border-b-4 border-black`}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`relative cursor-pointer py-4 px-4 font-mono text-sm md:text-base font-bold uppercase transition-colors ${
              index < tabs.length - 1 ? 'border-r-4 border-black' : ''
            } ${activeTab === tab.id ? 'bg-red-600 text-white' : 'bg-white text-black hover:bg-neutral-100'}`}
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
      <div className='relative h-full p-6 md:p-8 overflow-auto'>
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
