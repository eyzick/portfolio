import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code2, Terminal, Zap } from 'lucide-react';
import styles from '../styles/components/Hero.module.css';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <motion.div
        className="container text-center max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className={`mb-12 ${styles.nameSection}`}
        >
          <motion.h1 
            className={`text-5xl md:text-7xl font-tech font-bold mb-8 ${styles.nameHeading}`}
            whileHover={{ scale: 1.02 }}
          >
            <span className="gradient-text">Isaac Gamble</span>
          </motion.h1>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={`mb-16 ${styles.titleSection}`}
        >
          <h2 className={`text-2xl md:text-3xl text-text-primary mb-8 font-medium ${styles.titleHeading}`}>
            AI Engineer & Full-Stack Developer
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Crafting intelligent solutions with <span className="text-primary">TypeScript</span>, 
            <span className="text-secondary"> Python</span>, and cutting-edge 
            <span className="text-accent"> AI technologies</span>
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={`flex flex-row gap-12 justify-center items-center mb-20 ${styles.buttonsContainer}`}
        >
          <motion.button
            className={`btn-primary text-xl px-12 py-6 ${styles.button}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const skillsSection = document.getElementById('skills');
              if (skillsSection) {
                const headerHeight = 80;
                const elementPosition = skillsSection.offsetTop;
                const offsetPosition = elementPosition - headerHeight;
                
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              }
            }}
          >
            View My Work
          </motion.button>
          <motion.button
            className={`btn-secondary text-xl px-12 py-6 ${styles.button}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              window.location.href = 'mailto:gambleisaac@gmail.com';
            }}
          >
            Get In Touch
          </motion.button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={`mt-24 ${styles.iconsContainer}`}
        >
          <div className="flex justify-center space-x-12 opacity-60">
            <Brain className={`h-10 w-10 text-primary ${styles.icon}`} />
            <Code2 className={`h-10 w-10 text-secondary ${styles.icon}`} />
            <Terminal className={`h-10 w-10 text-accent ${styles.icon}`} />
            <Zap className={`h-10 w-10 text-primary ${styles.icon}`} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
