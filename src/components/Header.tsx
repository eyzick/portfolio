import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Github, Linkedin, Mail, Menu, X, type LucideIcon } from 'lucide-react';

const navItems = [
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Playground', href: '#games' },
];

const socialLinks = [
  { href: 'https://github.com/eyzick', label: 'GitHub', icon: Github },
  { href: 'https://www.linkedin.com/in/isaac-gamble-423730129/', label: 'LinkedIn', icon: Linkedin },
  { href: 'mailto:gambleisaac@gmail.com', label: 'Email', icon: Mail },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 28);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        isScrolled
          ? 'border-white/[0.08] bg-[#080a09]/80 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      }`}
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.55 }}
    >
      <div className="container flex h-[72px] items-center justify-between">
        <a href="#top" className="group flex items-center gap-3" aria-label="Isaac Gamble home">
          <span className="signal-dot" />
          <span className="font-mono text-xs uppercase text-white/80 transition-colors group-hover:text-white">
            eyzick
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="nav-link font-mono text-[11px] uppercase text-white/55"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 md:flex">
            {socialLinks.map((link) => (
              <SocialLink key={link.label} {...link} />
            ))}
          </div>
          <button
            type="button"
            className="icon-button md:hidden"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <motion.div className="absolute bottom-0 left-0 right-0 h-px origin-left bg-[#d6ff7f]" style={{ scaleX }} />

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/[0.08] bg-[#080a09]/95 backdrop-blur-xl md:hidden"
          >
            <div className="container flex flex-col gap-5 py-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-mono text-xs uppercase text-white/70"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex gap-2 border-t border-white/[0.08] pt-5">
                {socialLinks.map((link) => (
                  <SocialLink key={link.label} {...link} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

const SocialLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: LucideIcon }) => (
  <motion.a
    href={href}
    aria-label={label}
    target={href.startsWith('mailto:') ? undefined : '_blank'}
    rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
    className="icon-button"
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="h-4 w-4" />
  </motion.a>
);

export default Header;
