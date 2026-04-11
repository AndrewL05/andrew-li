import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

interface MenubarProps {
  light: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
}

const Menubar = ({ light, onToggleTheme, onOpenSearch }: MenubarProps) => {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  const base = light
    ? "bg-white/60 border-black/10 text-[#1a1610]"
    : "bg-black/45 border-white/[0.06] text-white";
  const muted = light ? "text-black/40" : "text-white/40";
  const badge = light
    ? "border-black/15 text-black/50 hover:text-black/70"
    : "border-white/10 text-white/30 hover:text-white/60";

  return (
    <div
      className={`absolute top-0 left-0 right-0 z-50 h-7 flex items-center justify-between px-3 border-b backdrop-blur-xl transition-colors duration-300 ${base}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="flex items-center gap-4">
        <span className="font-semibold text-xs tracking-wide">AL</span>
        <span className={`text-[11px] ${muted}`}>andrewli.dev</span>
        <span className={`text-[11px] ${muted} hidden md:block`}>View</span>
        <span className={`text-[11px] ${muted} hidden md:block`}>Navigate</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSearch}
          className={`text-[10px] font-mono border rounded px-1.5 py-0.5 transition-colors ${badge}`}
          title="Open command palette"
        >
          ⌘K
        </button>
        <button
          onClick={onToggleTheme}
          className={`transition-colors ${muted} hover:text-current`}
          title="Toggle theme"
        >
          {light ? <Moon size={12} /> : <Sun size={12} />}
        </button>
        <span className={`text-[11px] font-mono ${muted}`}>{time}</span>
      </div>
    </div>
  );
};

export default Menubar;
