'use client';

import { useState } from 'react';
import Image from 'next/image';
import { DockItem } from '@/types/macos';
import { motion, AnimatePresence } from 'framer-motion';
import { TextViewer } from './text-viewer';

interface MobileGridProps {
  items: DockItem[];
}

export function MobileGrid({ items }: MobileGridProps) {
  const [showInfo, setShowInfo] = useState(false);

  // Add info.txt as the 6th item
  const allItems = [
    ...items,
    { id: 'info', label: 'info.txt', icon: '/dayjob/icons/icon.png' },
  ];

  return (
    <section className="h-screen overflow-hidden relative">
      {/* Background */}
      <Image
        src="/dayjob/bg.jpg"
        alt="Desktop Background"
        fill
        className="object-cover"
        priority
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
        <h2 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">
          dayjob
        </h2>

        <div className="grid grid-cols-2 gap-4 max-w-md w-full">
          {allItems.map((item) => {
            const isInfo = item.id === 'info';
            const content = (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 flex flex-col items-center gap-3 hover:bg-white/20 transition-colors cursor-pointer"
                onClick={isInfo ? () => setShowInfo(true) : undefined}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={64}
                  height={64}
                  className="rounded-lg"
                />
                <p className="text-white text-sm text-center font-medium drop-shadow">
                  {item.label}
                </p>
              </motion.div>
            );

            return isInfo ? (
              <div key={item.id}>{content}</div>
            ) : (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="h-12 bg-neutral-100 flex items-center px-4 border-b border-neutral-200">
                <button
                  onClick={() => setShowInfo(false)}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                  aria-label="Close"
                />
                <div className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-neutral-700">
                  info.txt
                </div>
              </div>

              {/* Content */}
              <div className="overflow-auto max-h-[calc(80vh-3rem)]">
                <TextViewer />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
