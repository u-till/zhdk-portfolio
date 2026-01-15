'use client';

import { orbitron } from '@/lib/fonts';
import { Tab } from '@/types/project';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface SpaceTabsProps {
  tabs: Tab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export function SpaceTabs({ tabs, activeTab: externalActiveTab, onTabChange }: SpaceTabsProps) {
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
    <div className='w-full h-full bg-neutral-800/90 backdrop-blur-md border-4 border-foreground/20 rounded-lg overflow-hidden shadow-xl flex flex-col'>
      {/* Tab Headers - Vertical Layout */}
      <div className='flex border-b-4 border-foreground/20 flex-shrink-0'>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`relative cursor-pointer py-4 px-6 flex-1 text-xs md:text-sm font-medium uppercase transition-all border-r-0 last:border-r-0 border-r-foreground/20 ${
                isActive ? 'text-[#FF6B66] bg-[#AA4742]' : 'text-white/80 hover:text-white hover:bg-[#AA4742]/20'
              } ${orbitron.className}`}
              style={{
                textShadow: isActive ? '0 0 10px rgba(255, 107, 102, 0.5)' : 'none',
              }}
            >
              <span className='relative z-10'>{tab.label}</span>
              {isActive && (
                <>
                  <motion.div
                    layoutId='activeSpaceTab'
                    className='absolute inset-0 bg-[#AA4742]'
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                  <motion.div
                    className='absolute bottom-0 left-0 right-0 h-[3px] bg-[#FF6B66]'
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      boxShadow: '0 0 10px rgba(255, 107, 102, 0.8)',
                    }}
                  />
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className='relative flex-1 p-6 md:p-8 overflow-auto space-scrollbar'>
        <AnimatePresence mode='wait'>
          {tabs.map(
            (tab) =>
              activeTab === tab.id && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className='text-sm md:text-base leading-relaxed'
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
