import React from 'react';
import { motion } from 'framer-motion';
import { Code, Github, Linkedin, Mail } from 'lucide-react';
import styles from '../styles/components/Header.module.css';

const Header: React.FC = () => {
  const navItems = [
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Games', href: '#games' },
  ];

  return (
    <motion.header 
      className={styles.header}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`container ${styles.headerContent}`}>
        <div className={styles.headerInner}>
          <motion.div 
            className={styles.logo}
            whileHover={{ scale: 1.05 }}
          >
            <Code className={styles.logoIcon} />
            <span className={styles.logoText}>Isaac Gamble</span>
          </motion.div>
          
          <nav className={styles.navigation}>
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={styles.navigationLink}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          <div className={styles.socialLinks}>
            <motion.a
              href="https://github.com/eyzick"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className={styles.socialIcon} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/isaac-gamble-423730129/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className={styles.socialIcon} />
            </motion.a>
            <motion.a
              href="mailto:gambleisaac@gmail.com"
              className={styles.socialLink}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className={styles.socialIcon} />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
