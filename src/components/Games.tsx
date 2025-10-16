import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Bird, Zap } from 'lucide-react';
import FlappyBird from './games/FlappyBird';
import SnakeGame from './games/SnakeGame';
import styles from '../styles/components/Games.module.css';

const Games: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flappy' | 'snake'>('flappy');

  const tabs = [
    { id: 'flappy' as const, label: 'Flappy Bird', icon: Bird },
    { id: 'snake' as const, label: 'Snake', icon: Zap },
  ];

  return (
    <section id="games" className="min-h-screen bg-dark-bg py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Gamepad2 className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Playground
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Take a break and enjoy some classic games I've built with React and TypeScript
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="card p-0 overflow-hidden">
            <div className="bg-dark-card border-b border-slate-700 px-8 py-4">
              <div className="flex gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`${styles.gameTab} flex items-center gap-3 ${
                        activeTab === tab.id ? styles.active : ''
                      }`}
                      whileHover={{ scale: activeTab === tab.id ? 1.02 : 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="h-5 w-5" />
                      {tab.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Game Content */}
            <div className="p-8 min-h-[500px] bg-dark-card">
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