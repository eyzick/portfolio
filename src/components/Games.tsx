import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Bird, Zap } from 'lucide-react';
import FlappyBird from './games/FlappyBird';
import SnakeGame from './games/SnakeGame';

const Games: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flappy' | 'snake'>('flappy');

  const tabs = [
    { id: 'flappy' as const, label: 'Flappy Bird', icon: Bird },
    { id: 'snake' as const, label: 'Snake', icon: Zap },
  ];

  return (
    <section id="games" className="min-h-screen bg-dark-bg py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-6">
            <Gamepad2 className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Playground
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Take a break and enjoy some classic games I've built with React and TypeScript.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-dark-card/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden">
            <div className="border-b border-white/5 px-6 py-4">
              <div className="flex gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive 
                          ? 'bg-white/10 text-white shadow-lg' 
                          : 'text-text-secondary hover:text-white hover:bg-white/5'
                      }`}
                      whileHover={{ scale: isActive ? 1.02 : 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Game Content */}
            <div className="p-6 md:p-8 min-h-[500px] bg-dark-bg/50 flex items-center justify-center">
              {activeTab === 'flappy' && <FlappyBird isActive={activeTab === 'flappy'} />}
              {activeTab === 'snake' && <SnakeGame isActive={activeTab === 'snake'} />}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Games;
