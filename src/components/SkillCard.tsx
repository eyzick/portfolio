import React from 'react';
import { motion } from 'framer-motion';
import TechTag from './TechTag';
import styles from '../styles/components/SkillCard.module.css';

interface SkillCardProps {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  description: string;
  skills: string[];
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({
  category,
  icon: Icon,
  color,
  bgColor,
  description,
  skills,
  index
}) => {
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      className="card p-6 group cursor-pointer"
      variants={cardVariants}
      whileHover={{ 
        scale: 1.01,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`pl-8 ${styles.textContent}`}>
        <h3 className="text-xl font-bold mb-3 text-text-primary group-hover:text-primary transition-colors">
          {category}
        </h3>
        
        <p className="text-text-secondary text-sm mb-6 leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-4">
          {skills.map((tech, techIndex) => (
            <TechTag key={tech} delay={techIndex}>
              {tech}
            </TechTag>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
