import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface GameState {
  snake: Position[];
  food: Position;
  direction: 'up' | 'down' | 'left' | 'right';
  gameOver: boolean;
  score: number;
  highScore: number;
}

interface SnakeGameProps {
  isActive: boolean;
}

const SnakeGame: React.FC<SnakeGameProps> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu');
  const [isFocused, setIsFocused] = useState(false);
  const [game, setGame] = useState<GameState>({
    snake: [{ x: 200, y: 200 }],
    food: { x: 300, y: 300 },
    direction: 'right',
    gameOver: false,
    score: 0,
    highScore: 0
  });

  const canvasWidth = 400;
  const canvasHeight = 400;
  const gridSize = 20;
  const gameSpeed = 150;

  const generateFood = useCallback((): Position => {
    const maxX = Math.floor(canvasWidth / gridSize) - 1;
    const maxY = Math.floor(canvasHeight / gridSize) - 1;
    return {
      x: Math.floor(Math.random() * maxX) * gridSize,
      y: Math.floor(Math.random() * maxY) * gridSize
    };
  }, []);

  const startGame = useCallback(() => {
    setGameState('playing');
    const newFood = generateFood();
    setGame({
      snake: [{ x: 200, y: 200 }],
      food: newFood,
      direction: 'right',
      gameOver: false,
      score: 0,
      highScore: game.highScore
    });
  }, [generateFood, game.highScore]);

  // Handle touch controls for mobile
  const handleTouch = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (!isFocused) {
      containerRef.current?.focus();
      return;
    }

    if (gameState === 'menu' || gameState === 'gameOver') {
      startGame();
      return;
    }

    // Simple touch controls: tap sides of screen to turn
    const touch = e.touches[0];
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setGame(prev => {
      let newDirection = prev.direction;
      
      // Determine relative position of touch
      const diffX = x - centerX;
      const diffY = y - centerY;

      // Determine if horizontal or vertical movement dominates
      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal
        if (diffX > 0 && prev.direction !== 'left') newDirection = 'right';
        else if (diffX < 0 && prev.direction !== 'right') newDirection = 'left';
      } else {
        // Vertical
        if (diffY > 0 && prev.direction !== 'up') newDirection = 'down';
        else if (diffY < 0 && prev.direction !== 'down') newDirection = 'up';
      }

      return { ...prev, direction: newDirection };
    });
  }, [isFocused, gameState, startGame]);

  // Handle click interactions for start/restart
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!isFocused) {
      containerRef.current?.focus();
      return;
    }

    if (gameState === 'menu' || gameState === 'gameOver') {
      startGame();
    }
  }, [isFocused, gameState, startGame]);

  const updateGame = useCallback(() => {
    if (gameState !== 'playing') return;

    setGame(prev => {
      const newSnake = [...prev.snake];
      const head = { ...newSnake[0] };

      switch (prev.direction) {
        case 'up':
          head.y -= gridSize;
          break;
        case 'down':
          head.y += gridSize;
          break;
        case 'left':
          head.x -= gridSize;
          break;
        case 'right':
          head.x += gridSize;
          break;
      }

      if (head.x < 0 || head.x >= canvasWidth || head.y < 0 || head.y >= canvasHeight) {
        return {
          ...prev,
          gameOver: true,
          highScore: Math.max(prev.score, prev.highScore)
        };
      }

      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        return {
          ...prev,
          gameOver: true,
          highScore: Math.max(prev.score, prev.highScore)
        };
      }

      newSnake.unshift(head);

      if (head.x === prev.food.x && head.y === prev.food.y) {
        return {
          ...prev,
          snake: newSnake,
          food: generateFood(),
          score: prev.score + 1
        };
      } else {
        newSnake.pop();
        return {
          ...prev,
          snake: newSnake
        };
      }
    });
  }, [gameState, generateFood]);

  useEffect(() => {
    if (gameState === 'playing' && !game.gameOver) {
      const interval = setInterval(updateGame, gameSpeed);
      return () => clearInterval(interval);
    }
  }, [gameState, game.gameOver, updateGame]);

  // Handle focus management
  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const container = containerRef.current;

    if (container) {
      container.addEventListener('focus', handleFocus);
      container.addEventListener('blur', handleBlur);
    }

    return () => {
      if (container) {
        container.removeEventListener('focus', handleFocus);
        container.removeEventListener('blur', handleBlur);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle keys if this game is active AND focused
      if (!isActive || !isFocused) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          if (gameState === 'playing') {
            setGame(prev => ({ ...prev, direction: prev.direction !== 'down' ? 'up' : prev.direction }));
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (gameState === 'playing') {
            setGame(prev => ({ ...prev, direction: prev.direction !== 'up' ? 'down' : prev.direction }));
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (gameState === 'playing') {
            setGame(prev => ({ ...prev, direction: prev.direction !== 'right' ? 'left' : prev.direction }));
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (gameState === 'playing') {
            setGame(prev => ({ ...prev, direction: prev.direction !== 'left' ? 'right' : prev.direction }));
          }
          break;
        case ' ':
          e.preventDefault();
          if (gameState === 'menu') {
            startGame();
          } else if (game.gameOver) {
            startGame();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, game.gameOver, startGame, isActive, isFocused]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = '#0f0';
    game.snake.forEach((segment, index) => {
      if (index === 0) {
        ctx.fillStyle = '#0a0';
      } else {
        ctx.fillStyle = '#0f0';
      }
      ctx.fillRect(segment.x, segment.y, gridSize - 2, gridSize - 2);
    });

    ctx.fillStyle = '#f00';
    ctx.fillRect(game.food.x, game.food.y, gridSize - 2, gridSize - 2);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${game.score}`, 20, 30);

    if (gameState === 'menu') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = '#fff';
      ctx.font = '32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Snake Game', canvasWidth / 2, canvasHeight / 2 - 50);
      ctx.font = '16px Arial';
      ctx.fillText('Press SPACE to start', canvasWidth / 2, canvasHeight / 2);
      ctx.fillText(`High Score: ${game.highScore}`, canvasWidth / 2, canvasHeight / 2 + 30);
      
      // Focus instruction
      if (!isFocused) {
        ctx.font = '14px Arial';
        ctx.fillStyle = '#ffff00';
        ctx.fillText('Click/Tap to focus game', canvasWidth / 2, canvasHeight - 20);
      }
    }

    if (game.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = '#fff';
      ctx.font = '32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over!', canvasWidth / 2, canvasHeight / 2 - 50);
      ctx.font = '16px Arial';
      ctx.fillText(`Score: ${game.score}`, canvasWidth / 2, canvasHeight / 2);
      ctx.fillText(`High Score: ${game.highScore}`, canvasWidth / 2, canvasHeight / 2 + 30);
      ctx.fillText('Press SPACE to restart', canvasWidth / 2, canvasHeight / 2 + 60);
    }
  }, [game, gameState, isFocused]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="mx-auto flex w-full max-w-[460px] flex-col items-center outline-none" ref={containerRef} tabIndex={0}>
      <h3 className="mb-5 text-xl font-medium text-white">Snake</h3>
      <div 
        className={`w-full rounded-md border bg-black/30 p-2 transition-all duration-300 ${isFocused ? 'border-[#d6ff7f]/60 shadow-[0_0_40px_rgba(214,255,127,0.08)]' : 'border-white/10'}`}
      >
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className="h-auto max-w-full cursor-pointer touch-none rounded-sm opacity-90 shadow-inner"
          onClick={handleClick}
          onTouchStart={handleTouch}
        />
      </div>
      <div className="mt-4 text-center text-white/40">
        <p className={`mb-2 font-mono text-[10px] uppercase transition-colors ${isFocused ? 'text-[#d6ff7f]' : ''}`}>
          {isFocused ? 'Game Focused - Use arrows or tap sides' : 'Click/Tap game to play'}
        </p>
        <p className="text-xs opacity-70">Eat the red food and keep moving.</p>
      </div>
    </div>
  );
};

export default SnakeGame;
