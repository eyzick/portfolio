import React from 'react';
import { motion } from 'framer-motion';
import { capabilities } from '../data/portfolio';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="signal-section overflow-hidden bg-[#080a09]">
      <div className="container">
        <motion.div
          className="mb-14 grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-end"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="section-label">01 · Skills</p>
          <div>
            <h2 className="section-title">What I work with.</h2>
            <p className="section-copy mt-4">A practical stack for building ideas from first sketch to production.</p>
          </div>
        </motion.div>

        <div className="border-t border-white/[0.09]">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;

            return (
              <motion.article
                key={capability.title}
                className="skill-row group relative grid gap-5 border-b border-white/[0.09] py-7 md:grid-cols-[72px_minmax(220px,0.75fr)_1fr] md:items-center"
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                viewport={{ once: true, margin: '-60px' }}
              >
                <span className="font-mono text-[11px] text-white/30">0{index + 1}</span>
                <div className="flex items-center gap-4">
                  <motion.span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-white/10 text-[#d6ff7f]"
                    whileHover={{ rotate: 8 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.span>
                  <h3 className="text-xl font-medium text-white md:text-2xl">{capability.title}</h3>
                </div>
                <div>
                  <p className="max-w-xl text-sm leading-6 text-white/48">{capability.description}</p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {capability.skills.map((skill) => (
                      <span key={skill} className="font-mono text-[10px] uppercase text-white/32 transition-colors group-hover:text-white/60">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
