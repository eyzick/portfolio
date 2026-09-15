import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ExperienceContext } from './experience-context';

interface TransitionState {
  id: number;
  kind: 'exit' | 'notice';
  message: string;
}

export const ExperienceProvider = ({ children }: { children: ReactNode }) => {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const [secretMode, setSecretMode] = useState(false);
  const [transition, setTransition] = useState<TransitionState | null>(null);
  const secretModeRef = useRef(false);
  const signalTaps = useRef({ count: 0, lastTap: 0 });
  const typedSequence = useRef('');
  const transitionTimer = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  const clearTransitionTimer = useCallback(() => {
    if (transitionTimer.current !== null) {
      window.clearTimeout(transitionTimer.current);
      transitionTimer.current = null;
    }
  }, []);

  const showNotice = useCallback(
    (message: string) => {
      clearTransitionTimer();
      setTransition({ id: Date.now(), kind: 'notice', message });
      transitionTimer.current = window.setTimeout(() => setTransition(null), 950);
    },
    [clearTransitionTimer],
  );

  const toggleSecretMode = useCallback(() => {
    const nextMode = !secretModeRef.current;
    secretModeRef.current = nextMode;
    setSecretMode(nextMode);
    showNotice(nextMode ? 'Off grid' : 'Signal restored');
  }, [showNotice]);

  const tapSignal = useCallback(() => {
    const now = Date.now();
    const taps = signalTaps.current;

    if (now - taps.lastTap > 1600) taps.count = 0;
    taps.count += 1;
    taps.lastTap = now;

    if (taps.count === 5) {
      taps.count = 0;
      toggleSecretMode();
    }
  }, [toggleSecretMode]);

  const beginExit = useCallback(
    (href: string) => {
      if (!isOnline) {
        showNotice('No signal. Stay awhile.');
        return;
      }

      clearTransitionTimer();
      setTransition({ id: Date.now(), kind: 'exit', message: 'Re-entering the internet' });
      transitionTimer.current = window.setTimeout(
        () => window.location.assign(href),
        reduceMotion ? 100 : 560,
      );
    },
    [clearTransitionTimer, isOnline, reduceMotion, showNotice],
  );

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showNotice('Signal restored');
    };
    const handleOffline = () => {
      setIsOnline(false);
      showNotice('Off grid');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [showNotice]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.isContentEditable || target?.matches('input, textarea, select')) return;
      if (event.key.length !== 1 || event.metaKey || event.ctrlKey || event.altKey) return;

      typedSequence.current = `${typedSequence.current}${event.key.toLowerCase()}`.slice(-7);
      if (typedSequence.current === 'offline') {
        typedSequence.current = '';
        toggleSecretMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSecretMode]);

  const offGrid = !isOnline || secretMode;

  useEffect(() => {
    document.documentElement.dataset.signal = offGrid ? 'off-grid' : 'online';
    return () => {
      delete document.documentElement.dataset.signal;
    };
  }, [offGrid]);

  useEffect(() => () => clearTransitionTimer(), [clearTransitionTimer]);

  const value = useMemo(
    () => ({ isOnline, offGrid, tapSignal, beginExit }),
    [beginExit, isOnline, offGrid, tapSignal],
  );

  return (
    <ExperienceContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {transition && (
          <motion.div
            key={transition.id}
            className="fixed inset-0 z-[100] grid place-items-center bg-[#080a09]/95 px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
            role="status"
            aria-live="polite"
          >
            <motion.div
              className="w-full max-w-xs"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.28 }}
            >
              <div className="flex items-center gap-3 font-mono text-xs uppercase text-white/80">
                <span className={`signal-dot ${transition.kind === 'notice' ? 'signal-dot-off-grid' : ''}`} />
                {transition.message}
              </div>
              <motion.div
                className="mt-5 h-px origin-left bg-[#d6ff7f]/70"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.48, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ExperienceContext.Provider>
  );
};
