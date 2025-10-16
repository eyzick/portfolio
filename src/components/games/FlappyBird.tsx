import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Bird {
  x: number;
  y: number;
  velocity: number;
}

interface Pipe {
  x: number;
  topHeight: number;
  bottomY: number;
  passed: boolean;
}

interface FlappyBirdProps {
  isActive: boolean;
}

const FlappyBird: React.FC<FlappyBirdProps> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | null>(null);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'dying' | 'gameOver'>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [bird, setBird] = useState<Bird>({ x: 100, y: 250, velocity: 0 });
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [gameSpeed, setGameSpeed] = useState(2);
  const [deathAnimation, setDeathAnimation] = useState(false);

  const canvasWidth = 400;
  const canvasHeight = 500;
  const gravity = 0.2;
  const jumpForce = -5;
  const pipeWidth = 60;
  const pipeGap = 150;

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setBird({ x: 100, y: 250, velocity: 0 });
    setPipes([]);
    setGameSpeed(2);
    setDeathAnimation(false);
  }, []);

  const jump = useCallback(() => {
    if (gameState === 'playing') {
      setBird(prev => ({ ...prev, velocity: jumpForce }));
    }
  }, [gameState]);

  const updateGame = useCallback(() => {
    if (gameState !== 'playing') return;

    setBird(prev => {
      const newBird = {
        ...prev,
        velocity: prev.velocity + gravity,
        y: prev.y + prev.velocity
      };

      // Check ground collision
      if (newBird.y > canvasHeight - 30) {
        setGameState('dying');
        setDeathAnimation(true);
        setTimeout(() => {
          setGameState('gameOver');
          if (score > highScore) {
            setHighScore(score);
          }
        }, 1000);
        return prev;
      }

      // Check ceiling collision
      if (newBird.y < 0) {
        setGameState('dying');
        setDeathAnimation(true);
        setTimeout(() => {
          setGameState('gameOver');
          if (score > highScore) {
            setHighScore(score);
          }
        }, 1000);
        return prev;
      }

      return newBird;
    });

    setPipes(prev => {
      let newPipes = prev.map(pipe => ({
        ...pipe,
        x: pipe.x - gameSpeed
      }));

      // Remove pipes that are off screen
      newPipes = newPipes.filter(pipe => pipe.x > -pipeWidth);

      // Add new pipes
      if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < canvasWidth - 200) {
        const topHeight = Math.random() * (canvasHeight - pipeGap - 100) + 50;
        newPipes.push({
          x: canvasWidth,
          topHeight,
          bottomY: topHeight + pipeGap,
          passed: false
        });
      }

      // Check collisions and scoring
      newPipes.forEach(pipe => {
        if (!pipe.passed && pipe.x < bird.x) {
          pipe.passed = true;
          setScore(prev => prev + 1);
        }

        // Check collision with pipes
        if (
          bird.x + 20 > pipe.x &&
          bird.x < pipe.x + pipeWidth &&
          (bird.y < pipe.topHeight || bird.y + 20 > pipe.bottomY)
        ) {
          setGameState('dying');
          setDeathAnimation(true);
          setTimeout(() => {
            setGameState('gameOver');
            if (score > highScore) {
              setHighScore(score);
            }
          }, 1000);
        }
      });

      return newPipes;
    });
  }, [gameState, gameSpeed, bird.x, bird.y, score, highScore]);

  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(() => {
        updateGame();
        if (gameLoopRef.current) {
          gameLoopRef.current = requestAnimationFrame(updateGame);
        }
      });
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, updateGame]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle keys if this game is active
      if (!isActive) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'menu') {
          startGame();
        } else if (gameState === 'playing') {
          jump();
        } else if (gameState === 'gameOver') {
          startGame();
        }
        // Don't respond during dying animation
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, startGame, jump, isActive]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, canvasHeight - 30, canvasWidth, 30);

    ctx.fillStyle = '#228B22';
    pipes.forEach(pipe => {
      ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
      ctx.fillRect(pipe.x, pipe.bottomY, pipeWidth, canvasHeight - pipe.bottomY);
    });

    if (deathAnimation) {
      ctx.save();
      ctx.translate(bird.x + 10, bird.y + 10);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = '#FF6B6B';
      ctx.fillRect(-10, -10, 20, 20);
      ctx.restore();
    } else {
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(bird.x, bird.y, 20, 20);
    }

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${score}`, 20, 40);

    if (gameState === 'menu') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = '#fff';
      ctx.font = '32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Flappy Bird', canvasWidth / 2, canvasHeight / 2 - 50);
      ctx.font = '16px Arial';
      ctx.fillText('Press SPACE to start', canvasWidth / 2, canvasHeight / 2);
      ctx.fillText(`High Score: ${highScore}`, canvasWidth / 2, canvasHeight / 2 + 30);
    }

    if (gameState === 'gameOver') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = '#fff';
      ctx.font = '32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over!', canvasWidth / 2, canvasHeight / 2 - 50);
      ctx.font = '16px Arial';
      ctx.fillText(`Score: ${score}`, canvasWidth / 2, canvasHeight / 2);
      ctx.fillText(`High Score: ${highScore}`, canvasWidth / 2, canvasHeight / 2 + 30);
      ctx.fillText('Press SPACE to restart', canvasWidth / 2, canvasHeight / 2 + 60);
    }

    if (deathAnimation) {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = '#fff';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('💥 CRASH! 💥', canvasWidth / 2, canvasHeight / 2);
    }
  }, [bird, pipes, score, highScore, gameState, deathAnimation]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold text-text-primary mb-6">Flappy Bird Clone</h3>
      <div className="bg-slate-800 rounded-lg p-4">
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className="border border-slate-600 rounded"
          onClick={jump}
        />
      </div>
      <div className="mt-4 text-center text-text-secondary">
        <p className="mb-2">Press SPACE or click to jump</p>
        <p className="text-sm">Avoid the pipes and try to get the highest score!</p>
      </div>
    </div>
  );
};

export default FlappyBird;
