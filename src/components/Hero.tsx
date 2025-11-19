import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code2, Terminal, Zap, ArrowRight } from 'lucide-react';

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
        ease: "easeOut"
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div
        className="container relative z-10 text-center max-w-4xl px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
              Isaac Gamble
            </span>
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-2xl md:text-3xl text-text-secondary mb-6 font-light">
            AI Engineer & Full-Stack Developer
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
            Crafting intelligent solutions with <span className="text-primary font-medium">TypeScript</span>, 
            <span className="text-secondary font-medium"> Python</span>, and cutting-edge 
            <span className="text-accent font-medium"> AI technologies</span>.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
        >
          <motion.button
            className="btn-primary flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.button
            className="btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              window.location.href = 'mailto:gambleisaac@gmail.com';
            }}
          >
            Get In Touch
          </motion.button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="pt-12 border-t border-white/5"
        >
          <div className="flex justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <Brain className="h-8 w-8 text-primary" />
            <Code2 className="h-8 w-8 text-secondary" />
            <Terminal className="h-8 w-8 text-accent" />
            <Zap className="h-8 w-8 text-primary" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
