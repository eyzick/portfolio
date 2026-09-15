import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { projects } from '../data/portfolio';

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState(0);
  const active = projects[activeProject];

  return (
    <section id="projects" className="bg-[#0c0f0d]">
      <div className="site-container">
        <motion.div
          className="mb-14 grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-end"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="section-label">02 · Projects</p>
          <div>
            <h2 className="section-title">Selected work.</h2>
            <p className="section-copy mt-4">Web apps, experiments, and useful things.</p>
          </div>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <motion.div
            className="project-window sticky top-24 hidden aspect-[4/3] overflow-hidden rounded-md lg:block"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={active.title}
                src={active.image}
                alt={active.imageAlt}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.035 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(8,10,9,0.78)_100%)]" />
            <div className="noise pointer-events-none absolute inset-0 opacity-20" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <span className="font-mono text-[10px] uppercase text-white/60">Signal 0{activeProject + 1}</span>
              <span className="font-mono text-[10px] uppercase text-white/60">{active.kicker}</span>
            </div>
          </motion.div>

          <div className="border-t border-white/[0.09]">
            {projects.map((project, index) => {
              const Icon = project.icon;
              const href = project.demo === '#' ? project.github : project.demo;
              const isActive = activeProject === index;

              return (
                <motion.article
                  key={project.title}
                  onMouseEnter={() => setActiveProject(index)}
                  onFocus={() => setActiveProject(index)}
                  className="project-row group border-b border-white/[0.09] py-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  viewport={{ once: true, margin: '-60px' }}
                >
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="mb-5 aspect-[16/9] w-full rounded-md object-cover grayscale transition-all duration-500 group-hover:grayscale-0 lg:hidden"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                  <div className="flex items-start gap-4">
                    <span className={`mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-md border transition-colors ${isActive ? 'border-[#d6ff7f]/50 text-[#d6ff7f]' : 'border-white/10 text-white/35'}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-mono text-[10px] uppercase text-white/30">0{index + 1} · {project.kicker}</p>
                          <h3 className="mt-1 text-2xl font-medium text-white transition-colors group-hover:text-[#d6ff7f] md:text-3xl">
                            {project.title}
                          </h3>
                        </div>
                        <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-white/28 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
                      </div>
                      <p className="mt-3 max-w-lg text-sm leading-6 text-white/48">{project.description}</p>
                      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
                        {project.tech.slice(0, 4).map((tech) => (
                          <span key={tech} className="font-mono text-[10px] uppercase text-white/30">{tech}</span>
                        ))}
                        <span className="hidden h-px flex-1 bg-white/[0.08] sm:block" />
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          aria-label={`Open ${project.title}`}
                        >
                          Open
                        </a>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          aria-label={`${project.title} on GitHub`}
                        >
                          <Github className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.a
          href="https://github.com/eyzick"
          target="_blank"
          rel="noopener noreferrer"
          className="portal-button portal-button-ghost mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          More on GitHub
          <ArrowUpRight className="h-4 w-4" />
        </motion.a>
      </div>
    </section>
  );
};

export default Projects;
