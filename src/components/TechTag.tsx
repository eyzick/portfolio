import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/components/TechTag.module.css';

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
        return styles.techTagHighlight;
      case 'coming-soon':
        return styles.techTagComingSoon;
      default:
        return styles.techTagDefault;
    }
  };

  const defaultHover = {
    scale: 1.05,
    backgroundColor: '#1e40af',
    color: '#ffffff',
    borderColor: '#1e40af'
  };

  return (
    <motion.span
      className={`${styles.techTag} ${getVariantClasses()} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay * 0.1 }}
      whileHover={whileHover || defaultHover}
    >
      {children}
    </motion.span>
  );
};

export default TechTag;
