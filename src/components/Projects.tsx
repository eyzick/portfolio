import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, Gift, Trophy } from 'lucide-react';
import TechTag from './TechTag';
import styles from '../styles/components/Projects.module.css';

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
      title: 'House Cup Tracker',
      description: 'A competitive house cup tracking system inspired by magical competitions with real-time scoring.',
      tech: ['React', 'TypeScript', 'Firebase', 'CSS3', 'JavaScript'],
      icon: Trophy,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      github: 'https://github.com/eyzick/house-cup-tournament',
      demo: 'https://house-cup.eyzick.com',
      featured: false
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="projects" className="py-20 bg-dark-card">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-tech font-bold mb-6">
            <span className="gradient-text">My Sites</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Explore my collection of web applications and interactive experiences
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              className={`card ${styles.cardGlow} p-6 group cursor-pointer ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.01,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open(project.demo, '_blank')}
            >
              {project.featured && (
                <span className={styles.featuredBadge}>Featured</span>
              )}
              <div className="pl-8" style={{ paddingLeft: '2rem' }}>
                <h3 className={`text-xl font-bold mb-3 text-text-primary group-hover:text-primary transition-colors ${styles.projectTitle}`}>
                  {project.title}
                </h3>
                
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex space-x-2 ${styles.projectLinks}`}>
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.projectLink} github p-2 bg-gray-800 hover:bg-primary text-gray-400 hover:text-white rounded-lg transition-colors`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="h-4 w-4" />
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.projectLink} demo p-2 bg-gray-800 hover:bg-secondary text-gray-400 hover:text-white rounded-lg transition-colors`}
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </motion.a>
                  </div>
                </div>
                
                <p className={`text-text-secondary text-sm mb-6 leading-relaxed ${styles.projectDescription}`}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  {project.tech.map((tech, techIndex) => (
                    <TechTag key={tech} delay={techIndex}>
                      {tech}
                    </TechTag>
                  ))}
                </div>

                <div className="mt-4 text-xs text-text-secondary opacity-70 group-hover:opacity-100 transition-opacity">
                  Click anywhere to visit site →
                </div>
              </div>
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
          <motion.a
            href="https://github.com/eyzick"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 ${styles.ctaButton}`}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(96, 165, 250, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="h-5 w-5 mr-2" />
            View All Sites
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
