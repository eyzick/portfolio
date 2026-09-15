import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const targetPositions = [
  { left: 15, top: 22 },
  { left: 38, top: 16 },
  { left: 67, top: 24 },
  { left: 84, top: 42 },
  { left: 58, top: 48 },
  { left: 28, top: 53 },
  { left: 13, top: 74 },
  { left: 45, top: 78 },
  { left: 76, top: 72 },
];

type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

const SignalHunt = ({ isActive }: { isActive: boolean }) => {
  const [status, setStatus] = useState<GameStatus>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [targetIndex, setTargetIndex] = useState(0);

  useEffect(() => {
    if (!isActive || status !== 'playing') return;

    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          setStatus('lost');
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isActive, status]);

  const moveTarget = () => {
    setTargetIndex((current) => {
      const offset = Math.floor(Math.random() * (targetPositions.length - 1)) + 1;
      return (current + offset) % targetPositions.length;
    });
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(15);
    setStatus('playing');
    moveTarget();
  };

  const hitSignal = () => {
    const nextScore = score + 1;
    setScore(nextScore);

    if (nextScore === 8) {
      setStatus('won');
      return;
    }

    moveTarget();
  };

  const currentTarget = targetPositions[targetIndex];

  return (
    <div className="mx-auto w-full max-w-[460px]">
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase text-white/40">
        <span aria-live="polite">Found {score}/8</span>
        <span>{timeLeft}s</span>
      </div>

      <div className="signal-field relative mx-auto aspect-[4/3] w-full max-w-[420px] overflow-hidden rounded-md border border-white/10">
        {status === 'playing' && (
          <div
            className="absolute"
            style={{ left: `${currentTarget.left}%`, top: `${currentTarget.top}%`, transform: 'translate(-50%, -50%)' }}
          >
            <motion.button
              key={targetIndex}
              type="button"
              onClick={hitSignal}
              className="signal-target grid h-9 w-9 place-items-center rounded-md border border-[#d6ff7f]/60 bg-[#d6ff7f]/10"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.82 }}
              aria-label={`Signal ${score + 1} of 8`}
            >
              <span className="h-2 w-2 rounded-full bg-[#d6ff7f]" />
            </motion.button>
          </div>
        )}

        {status !== 'playing' && (
          <div className="absolute inset-0 grid place-items-center px-6 text-center">
            <div>
              <p className="font-mono text-[10px] uppercase text-[#d6ff7f]/65">
                {status === 'won' ? 'Signal found' : status === 'lost' ? 'Signal lost' : 'Hidden frequency'}
              </p>
              <p className="mt-3 text-lg text-white/75">
                {status === 'won' ? 'You made it through.' : 'Find eight signals.'}
              </p>
              <button type="button" className="portal-button portal-button-ghost mt-6" onClick={startGame}>
                {status === 'idle' ? 'Begin' : 'Again'}
              </button>
            </div>
          </div>
        )}
      </div>
      <p className="mt-3 text-center font-mono text-[10px] uppercase text-white/28">Tap each light before time runs out.</p>
    </div>
  );
};

export default SignalHunt;
