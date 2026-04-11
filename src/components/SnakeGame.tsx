import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

interface SnakeGameProps {
  light: boolean;
  onClose: () => void;
  bottomY: number;
}

const COLS = 22;
const ROWS = 16;
const CELL = 13;
const TICK = 110;

type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Point = { x: number; y: number };

const OPPOSITES: Record<Dir, Dir> = { UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT" };

const SnakeGame = ({ light, onClose, bottomY }: SnakeGameProps) => {
  const snakeRef   = useRef<Point[]>([{ x: 11, y: 8 }]);
  const dirRef     = useRef<Dir>("RIGHT");
  const nextDirRef = useRef<Dir>("RIGHT");
  const foodRef    = useRef<Point>({ x: 5, y: 5 });
  const scoreRef   = useRef(0);
  const aliveRef   = useRef(true);
  const lastTickRef = useRef(0);
  const rafRef     = useRef<number>(0);
  const canvasRef  = useRef<HTMLCanvasElement>(null);

  const [score,   setScore]   = useState(0);
  const [dead,    setDead]    = useState(false);
  const [started, setStarted] = useState(false);

  const placeFood = () => {
    const snake = snakeRef.current;
    let food: Point;
    do {
      food = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    } while (snake.some(s => s.x === food.x && s.y === food.y));
    foodRef.current = food;
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const bg        = light ? "#f0ece3" : "#07070f";
    const gridColor = light ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.025)";
    const snakeCol  = light ? "#1a9e30" : "#28c840";
    const headCol   = light ? "#0d7a20" : "#4dda60";
    const foodCol   = "#ff5f57";

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = gridColor;
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
      }
    }

    const food = foodRef.current;
    ctx.fillStyle = foodCol;
    ctx.beginPath();
    ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2 - 1.5, 0, Math.PI * 2);
    ctx.fill();

    snakeRef.current.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? headCol : snakeCol;
      ctx.beginPath();
      // @ts-expect-error — roundRect is available in modern browsers
      ctx.roundRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2, i === 0 ? 3 : 2);
      ctx.fill();
    });
  }, [light]);

  const tick = useCallback(() => {
    if (!aliveRef.current) return;
    dirRef.current = nextDirRef.current;
    const snake = snakeRef.current;
    const { x, y } = snake[0];
    const dir = dirRef.current;
    const next = {
      x: x + (dir === "RIGHT" ? 1 : dir === "LEFT" ? -1 : 0),
      y: y + (dir === "DOWN"  ? 1 : dir === "UP"   ? -1 : 0),
    };

    if (next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS || snake.some(s => s.x === next.x && s.y === next.y)) {
      aliveRef.current = false;
      setDead(true);
      return;
    }

    const newSnake = [next, ...snake];
    const food = foodRef.current;
    if (next.x === food.x && next.y === food.y) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
      placeFood();
    } else {
      newSnake.pop();
    }
    snakeRef.current = newSnake;
  }, []);

  const reset = useCallback(() => {
    snakeRef.current   = [{ x: 11, y: 8 }];
    dirRef.current     = "RIGHT";
    nextDirRef.current = "RIGHT";
    scoreRef.current   = 0;
    aliveRef.current   = true;
    placeFood();
    setScore(0);
    setDead(false);
    setStarted(true);
  }, []);

  useEffect(() => { placeFood(); draw(); }, [draw]);

  useEffect(() => {
    if (!started) return;
    const loop = (t: number) => {
      if (t - lastTickRef.current >= TICK) {
        lastTickRef.current = t;
        tick();
      }
      draw();
      if (aliveRef.current) rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started, tick, draw]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if ((e.key === " " || e.key === "Enter") && (!started || dead)) { e.preventDefault(); reset(); return; }
      const dirMap: Record<string, Dir> = {
        ArrowUp: "UP", ArrowDown: "DOWN", ArrowLeft: "LEFT", ArrowRight: "RIGHT",
        w: "UP", s: "DOWN", a: "LEFT", d: "RIGHT",
      };
      if (dirMap[e.key]) {
        e.preventDefault();
        const next = dirMap[e.key];
        if (next !== OPPOSITES[dirRef.current]) nextDirRef.current = next;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [started, dead, reset, onClose]);

  const W = COLS * CELL;
  const H = ROWS * CELL;
  const border   = light ? "border-[#d9d0c3]"      : "border-white/[0.08]";
  const shellBg  = light ? "bg-[#f0ece3]"           : "bg-[#0d0d16]";
  const mutedCls = light ? "text-[#a89e8e]"         : "text-white/30";
  const textCls  = light ? "text-[#1a1610]"         : "text-white/80";
  const overlayBg = light ? "rgba(240,236,227,0.88)" : "rgba(13,13,22,0.88)";

  return createPortal(
    <div
      style={{ position: "fixed", bottom: bottomY + 8, left: "50%", transform: "translateX(-50%)", zIndex: 200 }}
    >
      <div className={`rounded-xl border overflow-hidden shadow-2xl ${shellBg} ${border}`}>
        <div className={`flex items-center justify-between px-3 py-1.5 border-b ${border}`}>
          <span className={`text-[10px] font-mono ${mutedCls}`}>snake.exe</span>
          <div className="flex items-center gap-4">
            <span className={`text-[10px] font-mono ${mutedCls}`}>score: <span className={textCls}>{score}</span></span>
            <button onClick={onClose} className={`text-[10px] font-mono ${mutedCls} hover:text-current transition-colors`}>esc to exit</button>
          </div>
        </div>

        <div className="relative" style={{ width: W, height: H }}>
          <canvas ref={canvasRef} width={W} height={H} />

          {!started && !dead && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2" style={{ background: overlayBg }}>
              <span className={`text-[12px] font-mono font-semibold ${textCls}`}>SNAKE</span>
              <span className={`text-[10px] font-mono ${mutedCls}`}>↑ ↓ ← → or WASD</span>
              <span className={`text-[10px] font-mono ${mutedCls}`}>space / enter to start</span>
            </div>
          )}

          {dead && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2" style={{ background: overlayBg }}>
              <span className={`text-[12px] font-mono font-semibold ${textCls}`}>GAME OVER</span>
              <span className={`text-[10px] font-mono ${mutedCls}`}>final score: {score}</span>
              <span className={`text-[10px] font-mono ${mutedCls}`}>space / enter to restart</span>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SnakeGame;
