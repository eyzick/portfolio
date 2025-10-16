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
  const gameLoopRef = useRef<number | null>(null);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu');
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

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle keys if this game is active
      if (!isActive) return;

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
  }, [gameState, game.gameOver, startGame, isActive]);

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
  }, [game, gameState]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold text-text-primary mb-6">Snake Game</h3>
      <div className="bg-slate-800 rounded-lg p-4">
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className="border border-slate-600 rounded"
        />
      </div>
      <div className="mt-4 text-center text-text-secondary">
        <p className="mb-2">Use arrow keys to control the snake</p>
        <p className="text-sm">Eat the red food to grow and increase your score!</p>
      </div>
    </div>
  );
};

export default SnakeGame;
