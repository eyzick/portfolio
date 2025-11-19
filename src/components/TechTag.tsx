import React from 'react';
import { motion } from 'framer-motion';

interface TechTagProps {
  children: React.ReactNode;
  variant?: 'default' | 'highlight' | 'coming-soon';
  className?: string;
  delay?: number;
  whileHover?: any;
}

const TechTag: React.FC<TechTagProps> = ({ 
  children, 
  variant = 'default', 
  className = '', 
  delay = 0,
  whileHover 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'highlight':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'coming-soon':
        return 'bg-accent/20 text-accent border-accent/30';
      default:
        return 'bg-white/5 text-text-secondary border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20';
    }
  };

  const defaultHover = {
    scale: 1.05,
  };

  return (
    <motion.span
      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium border transition-colors ${getVariantClasses()} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay * 0.05 }}
      whileHover={whileHover || defaultHover}
    >
      {children}
    </motion.span>
  );
};

export default TechTag;
