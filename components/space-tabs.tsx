'use client';

import { orbitron } from '@/lib/fonts';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface SpaceTabsProps {
  tabs: Tab[];
}

export function SpaceTabs({ tabs }: SpaceTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className='w-full h-full bg-neutral-600/60 backdrop-blur-md border-4 border-foreground/20 rounded-lg overflow-hidden shadow-xl'>
      {/* Tab Headers - Vertical Layout */}
      <div className='flex border-b-4 border-foreground/20'>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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
      <div className='relative min-h-[300px] md:min-h-[400px] p-6 md:p-8 overflow-auto'>
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
