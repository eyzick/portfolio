import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code2, Terminal, Cloud } from 'lucide-react';
import TechTag from './TechTag';
import SkillCard from './SkillCard';

const Skills: React.FC = () => {
  const skills = [
    {
      category: 'AI & Machine Learning',
      icon: Brain,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      skills: ['TensorFlow', 'PyTorch', 'OpenAI API', 'LangChain', 'Computer Vision', 'NLP'],
      description: 'Building intelligent systems and AI-powered applications'
    },
    {
      category: 'TypeScript & React',
      icon: Code2,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Redux', 'GraphQL'],
      description: 'Creating modern, scalable web applications'
    },
    {
      category: 'Python Development',
      icon: Terminal,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      skills: ['Django', 'FastAPI', 'Pandas', 'NumPy', 'Scikit-learn', 'Flask'],
      description: 'Backend development and data science solutions'
    },
    {
      category: 'Cloud & DevOps',
      icon: Cloud,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Monitoring'],
      description: 'Scalable infrastructure and deployment strategies'
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


  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-dark-bg to-dark-card">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-tech font-bold mb-6">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Specialized in AI, TypeScript, and Python development with a focus on creating innovative solutions
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.category}
              category={skill.category}
              icon={skill.icon}
              color={skill.color}
              bgColor={skill.bgColor}
              description={skill.description}
              skills={skill.skills}
              index={index}
            />
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-tech font-bold mb-8 gradient-text">
            Tech Stack Highlights
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['AI/ML', 'TypeScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes'].map((tech, index) => (
              <TechTag key={tech} variant="highlight" delay={index}>
                {tech}
              </TechTag>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;