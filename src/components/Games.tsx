import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bird, Gamepad2, Zap } from 'lucide-react';
import FlappyBird from './games/FlappyBird';
import SnakeGame from './games/SnakeGame';

const Games: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flappy' | 'snake'>('flappy');

  const tabs = [
    { id: 'flappy' as const, label: 'Flappy Bird', icon: Bird },
    { id: 'snake' as const, label: 'Snake', icon: Zap },
  ];

  return (
    <section id="games" className="overflow-hidden bg-[#080a09]">
      <div className="pointer-events-none absolute inset-x-0 top-10 text-center text-[11rem] font-semibold leading-none text-white/[0.015] md:text-[17rem]">
        PLAY
      </div>
      <div className="site-container relative">
        <motion.div
          className="mb-12 grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-end"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="section-label">03 · Playground</p>
          <div>
            <h2 className="section-title">Go offline for a minute.</h2>
            <p className="section-copy mt-4">Two small games, built in React.</p>
          </div>
        </motion.div>

        <motion.div
          className="game-console mx-auto max-w-4xl overflow-hidden rounded-md"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="flex flex-col gap-4 border-b border-white/[0.09] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase text-white/35">
              <Gamepad2 className="h-4 w-4 text-[#d6ff7f]" />
              Offline arcade
            </div>
            <div className="flex gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <motion.button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex h-9 items-center gap-2 rounded-md border px-3 font-mono text-[10px] uppercase transition-colors ${
                      isActive
                        ? 'border-[#d6ff7f]/50 bg-[#d6ff7f]/10 text-[#d6ff7f]'
                        : 'border-white/10 text-white/35 hover:border-white/25 hover:text-white/70'
                    }`}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {tab.label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="relative flex min-h-[520px] items-center justify-center p-4 md:p-8">
            <div className="noise pointer-events-none absolute inset-0 opacity-10" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="relative z-10 w-full"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {activeTab === 'flappy' && <FlappyBird isActive />}
                {activeTab === 'snake' && <SnakeGame isActive />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Games;
