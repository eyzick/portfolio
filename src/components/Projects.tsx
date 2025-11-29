import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ExternalLink, Github, Calendar, Gift, ArrowUpRight, Camera, GlassWater } from 'lucide-react';
import TechTag from './TechTag';
import TiltCard from './TiltCard';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'RSVP Site',
      description: 'A Harry Potter themed RSVP page featuring interactive elements, animations, and seasonal content.',
      tech: ['React', 'TypeScript', 'CSS3', 'JavaScript', 'HTML5'],
      icon: Calendar,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      github: 'https://github.com/eyzick/harry-potter-halloween',
      demo: 'https://halloween.eyzick.com',
      featured: true
    },
    {
      title: 'Wishlist App',
      description: 'A modern wishlist application for creating and managing personal wish lists with sharing capabilities.',
      tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Express'],
      icon: Gift,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      github: 'https://github.com/eyzick/wish-list-app',
      demo: 'https://wishlist.eyzick.com',
      featured: true
    },
    {
      title: 'DIY Baby Monitor',
      description: 'A real-time video and audio streaming solution using Raspberry Pi, allowing secure monitoring from any device on the local network.',
      tech: ['Python', 'Raspberry Pi', 'Flask', 'OpenCV', 'WebRTC'],
      icon: Camera,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      github: 'https://github.com/eyzick/baby-monitor',
      demo: '#',
      featured: true
    },
    {
      title: 'Thirsti',
      description: 'A web application for cocktail recommendations based on the user\'s preferences and ingredients they have on hand.',
      tech: ['React', 'TypeScript', 'Node.js'],
      icon: GlassWater,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      github: 'https://github.com/eyzick/thirsti',
      demo: 'https://thirsti.eyzick.com',
      featured: true
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      },
    },
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Explore my collection of web applications and interactive experiences.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className="h-full"
            >
              <TiltCard
                className={`group relative bg-dark-card/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 cursor-pointer h-full`}
                onClick={() => project.demo !== '#' ? window.open(project.demo, '_blank') : window.open(project.github, '_blank')}
              >
                <div className="p-8 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-xl ${project.bgColor} ${project.color}`}>
                      <project.icon className="w-6 h-6" />
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-text-secondary hover:text-white hover:bg-white/10 rounded-lg transition-colors relative z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      {project.demo !== '#' && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-text-secondary hover:text-white hover:bg-white/10 rounded-lg transition-colors relative z-10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-text-secondary mb-6 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech, techIndex) => (
                      <TechTag key={tech} delay={techIndex}>
                        {tech}
                      </TechTag>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <a
            href="https://github.com/eyzick"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
          >
            <Github className="w-5 h-5" />
            View All Projects
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
