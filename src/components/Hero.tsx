import React, { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  type Variants,
} from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1505635552518-3448ff116af3?auto=format&fit=crop&w=2200&q=88';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(48);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 24 });
  const revealMask = useMotionTemplate`radial-gradient(circle 220px at ${smoothX}% ${smoothY}%, black 0%, black 35%, transparent 100%)`;

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const bounds = sectionRef.current?.getBoundingClientRect();
    if (!bounds) return;

    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 100);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 100);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.18 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      onPointerMove={handlePointerMove}
      className="hero-threshold relative isolate flex min-h-[88svh] items-end overflow-hidden px-0 pb-10 pt-24 sm:pb-12 sm:pt-28 md:pb-16"
    >
      <img
        src={HERO_IMAGE}
        alt="A path disappearing into a misty forest."
        className="absolute inset-0 -z-30 h-full w-full object-cover grayscale"
        fetchPriority="high"
      />
      <motion.img
        src={HERO_IMAGE}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 hidden h-full w-full object-cover saturate-[0.75] md:block"
        style={{ WebkitMaskImage: revealMask, maskImage: revealMask }}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,10,9,0.22)_0%,rgba(8,10,9,0.18)_42%,rgba(8,10,9,0.92)_100%)]" />
      <div className="noise pointer-events-none absolute inset-0 -z-[5] opacity-25" />

      <motion.div
        className="container w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <motion.p variants={itemVariants} className="mb-4 font-mono text-[10px] uppercase text-white/60 sm:text-xs">
              Full-stack developer · AI engineer
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="max-w-5xl text-5xl font-semibold leading-[0.9] text-white md:text-7xl lg:text-8xl xl:text-9xl"
            >
              <span className="block lg:inline">Isaac</span>
              <span className="block lg:ml-5 lg:inline">Gamble</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-lg leading-8 text-white/70 md:text-xl"
            >
              I build useful software, playful interfaces, and intelligent systems.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="portal-button portal-button-primary">
                View projects
                <ArrowDown className="h-4 w-4" />
              </a>
              <a href="mailto:gambleisaac@gmail.com" className="portal-button portal-button-ghost">
                Get in touch
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="hidden items-center gap-3 font-mono text-[11px] uppercase text-white/45 lg:flex"
          >
            <span className="signal-dot" />
            Move to reveal
          </motion.div>
        </div>
      </motion.div>

      <a
        href="#skills"
        aria-label="Continue to skills"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/45 transition-colors hover:text-white md:bottom-7"
      >
        <motion.span
          className="block"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-5 w-5" />
        </motion.span>
      </a>
    </section>
  );
};

export default Hero;
