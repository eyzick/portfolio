import React from 'react';
import { motion, type Variants } from 'framer-motion';
import TechTag from './TechTag';
import TiltCard from './TiltCard';

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
  const cardVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      },
    },
  };

  return (
    <motion.div variants={cardVariants} className="h-full">
      <TiltCard
        className="bg-dark-card/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 h-full flex flex-col"
      >
        <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center mb-6`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
          {category}
        </h3>
        
        <p className="text-text-secondary text-sm mb-6 leading-relaxed flex-grow">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {skills.map((tech, techIndex) => (
            <TechTag key={tech} delay={techIndex}>
              {tech}
            </TechTag>
          ))}
        </div>
      </TiltCard>
    </motion.div>
  );
};

export default SkillCard;
