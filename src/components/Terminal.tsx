import { useState, useRef, useEffect } from "react";
import type { Tab } from "./Browser";
import { tabUrls } from "./Browser";
import SnakeGame from "./SnakeGame";

interface TerminalProps {
  activeTab: Tab;
  onNavigate: (tab: Tab) => void;
  onOpenSearch: () => void;
  onToggleTheme: () => void;
  light: boolean;
}

const COMMANDS = [
  { code: "cd home", desc: "Go to homepage", key: "1" },
  { code: "cd experience", desc: "View work history", key: "2" },
  { code: "cd projects", desc: "Browse projects", key: "3" },
  { code: "cd contact", desc: "Get in touch", key: "4" },
] as const;

const OPEN_COMMANDS = [
  { code: "open github", desc: "github.com/AndrewL05", href: "https://github.com/AndrewL05" },
  { code: "open linkedin", desc: "linkedin.com/in/andrew-li05", href: "https://linkedin.com/in/andrew-li05" },
  { code: "open resume", desc: "Download PDF", href: "/Andrew Li - Resume.pdf" },
] as const;

const Terminal = ({ activeTab, onNavigate, onOpenSearch, onToggleTheme, light }: TerminalProps) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<{ text: string; type: "nav" | "success" | "error" } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<string[]>([]);
  const historyIdxRef = useRef(-1);
  const [showSnake, setShowSnake] = useState(false);
  const [snakeBottomY, setSnakeBottomY] = useState(0);

  const path = tabUrls[activeTab];

  const bar = light
    ? "bg-[#ebe5db] border-[#d9d0c3]"
    : "bg-black/40 border-white/[0.05]";
  const pathColor = light ? "text-[#2266cc]" : "text-[#5a9cf5]";
  const arrowColor = light ? "text-[#1a9e30]" : "text-[#28c840]";
  const hintColor = light ? "text-[#b0a898]" : "text-white/20";
  const popup = light
    ? "bg-[#f5f0e8] border-[#d9d0c3] shadow-[0_-8px_32px_rgba(0,0,0,0.15)]"
    : "bg-[#111118] border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.6)]";
  const popupHeader = light ? "border-black/[0.06] text-[#b0a898]" : "border-white/[0.06] text-white/25";
  const sectionLabel = light ? "text-[#c0b8a8]" : "text-white/15";
  const cmdCode = light ? "text-[#1a9e30]" : "text-[#28c840]";
  const cmdDesc = light ? "text-[#8a7e6e]" : "text-white/35";
  const cmdHover = light ? "hover:bg-black/[0.04]" : "hover:bg-white/[0.04]";
  const keyBadge = light ? "bg-[#efe9df] border-[#d9d0c3] text-[#b0a898]" : "bg-[#1a1a1a] border-[#252525] text-[#333]";
  const inputColor = light ? "text-[#3c3226] placeholder-[#b0a898]" : "text-white placeholder-white/20";

  // allow "/" or "Enter" key to open and focus terminal when not already typing somewhere
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (open) return;
      if (showSnake) return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement).isContentEditable) return;
      if (e.key === "/" || e.key === "Enter") {
        e.preventDefault();
        setOpen(true);
        setInput("");
        setFeedback(null);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, showSnake]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Closes on "ESC" key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Number key shortcuts when popup is open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return;
      const tabMap: Record<string, Tab> = { "1": "home", "2": "experience", "3": "projects", "4": "contact" };
      if (tabMap[e.key]) {
        runCommand(`cd ${tabMap[e.key]}`);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const COMMAND_MAP: Record<string, () => void> = {
    "cd home": () => { setFeedback({ text: "→ Navigating to /home", type: "nav" }); onNavigate("home"); },
    "cd experience": () => { setFeedback({ text: "→ Navigating to /experience", type: "nav" }); onNavigate("experience"); },
    "cd projects": () => { setFeedback({ text: "→ Navigating to /projects", type: "nav" }); onNavigate("projects"); },
    "cd contact": () => { setFeedback({ text: "→ Navigating to /contact", type: "nav" }); onNavigate("contact"); },
    "open github": () => { setFeedback({ text: "→ Opening github.com/AndrewL05", type: "success" }); window.open("https://github.com/AndrewL05", "_blank"); },
    "open linkedin": () => { setFeedback({ text: "→ Opening linkedin.com/in/andrew-li05", type: "success" }); window.open("https://linkedin.com/in/andrew-li05", "_blank"); },
    "open resume": () => { setFeedback({ text: "→ Opening resume", type: "success" }); window.open("/Andrew Li - Resume.pdf", "_blank"); },
    "theme toggle": () => { setFeedback({ text: "→ Theme toggled", type: "success" }); onToggleTheme(); },
    "toggle theme": () => { setFeedback({ text: "→ Theme toggled", type: "success" }); onToggleTheme(); },
    "search": () => { setFeedback(null); onOpenSearch(); },
    "help": () => { setOpen(true); },
    "sudo": () => { setFeedback({ text: "Nice try buddy.", type: "error" }); },
    "sudo rm -rf /": () => { setFeedback({ text: "Nice try. Portfolio is immutable.", type: "error" }); },
    "hello": () => { setFeedback({ text: "Hey there! 👋", type: "success" }); },
    "hi": () => { setFeedback({ text: "Hey there! 👋", type: "success" }); },
    "whoami": () => { setFeedback({ text: "curious visitor", type: "nav" }); },
    "ls": () => { setFeedback({ text: "home/  experience/  projects/  contact/", type: "nav" }); },
    "coffee": () => { setFeedback({ text: "☕ Error: COFFEE_NOT_FOUND. Have you tried npm install coffee?", type: "error" }); },
    "clear": () => { setFeedback(null); },
    "pwd": () => { setFeedback({ text: "/users/visitor/andrewli", type: "nav" }); },
    "snake": () => {
      const rect = barRef.current?.getBoundingClientRect();
      setSnakeBottomY(rect ? window.innerHeight - rect.top : 60);
      setShowSnake(true);
    },
  };

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed) {
      historyRef.current = [trimmed, ...historyRef.current].slice(0, 50);
      historyIdxRef.current = -1;
    }
    setOpen(false);
    setInput("");

    const action = COMMAND_MAP[trimmed];
    if (action) {
      action();
      if (trimmed !== "help") setTimeout(() => setFeedback(null), 1000);
    } else {
      setFeedback({ text: `command not found: ${trimmed}`, type: "error" });
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  const handleBarClick = () => {
    setOpen(true);
    setFeedback(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const feedbackColor =
    feedback?.type === "nav" ? (light ? "text-[#2266cc]" : "text-[#5a9cf5]") :
      feedback?.type === "success" ? arrowColor :
        "text-red-400";

  return (
    <div className="relative shrink-0">
      {open && (
        <div
          ref={popupRef}
          className={`absolute bottom-full left-0 right-0 mb-0 rounded-t-xl border border-b-0 overflow-hidden z-20 transition-colors duration-300 ${popup}`}
        >
          <div className={`flex items-center justify-between px-3 py-1.5 border-b text-[10px] font-mono ${popupHeader}`}>
            <span>Available Commands</span>
            <span>esc to close</span>
          </div>

          <div className={`py-1 border-b ${light ? "border-black/[0.05]" : "border-white/[0.04]"}`}>
            <div className={`px-3 py-1 text-[9px] font-mono uppercase tracking-widest ${sectionLabel}`}>Navigate</div>
            {COMMANDS.map(({ code, desc, key }) => (
              <button
                key={code}
                onClick={() => runCommand(code)}
                className={`w-full flex items-center gap-2 px-3 py-1.5 text-left transition-colors ${cmdHover}`}
              >
                <span className={`text-[11px] font-mono w-28 shrink-0 ${cmdCode}`}>{code}</span>
                <span className={`text-[11px] flex-1 ${cmdDesc}`}>{desc}</span>
                <span className={`text-[9px] font-mono border rounded px-1 ml-auto ${keyBadge}`}>{key}</span>
              </button>
            ))}
          </div>

          <div className={`py-1 border-b ${light ? "border-black/[0.05]" : "border-white/[0.04]"}`}>
            <div className={`px-3 py-1 text-[9px] font-mono uppercase tracking-widest ${sectionLabel}`}>Quick Links</div>
            {OPEN_COMMANDS.map(({ code, desc, href }) => (
              <a
                key={code}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={`w-full flex items-center gap-2 px-3 py-1.5 transition-colors ${cmdHover}`}
              >
                <span className={`text-[11px] font-mono w-28 shrink-0 ${cmdCode}`}>{code}</span>
                <span className={`text-[11px] ${cmdDesc}`}>{desc}</span>
              </a>
            ))}
          </div>

          <div className="py-1">
            <div className={`px-3 py-1 text-[9px] font-mono uppercase tracking-widest ${sectionLabel}`}>System</div>
            <button onClick={() => { onToggleTheme(); setOpen(false); }} className={`w-full flex items-center gap-2 px-3 py-1.5 text-left transition-colors ${cmdHover}`}>
              <span className={`text-[11px] font-mono w-28 shrink-0 ${cmdCode}`}>theme toggle</span>
              <span className={`text-[11px] flex-1 ${cmdDesc}`}>Switch light / dark</span>
              <span className={`text-[9px] font-mono border rounded px-1 ml-auto ${keyBadge}`}>T</span>
            </button>
            <button onClick={() => { onOpenSearch(); setOpen(false); }} className={`w-full flex items-center gap-2 px-3 py-1.5 text-left transition-colors ${cmdHover}`}>
              <span className={`text-[11px] font-mono w-28 shrink-0 ${cmdCode}`}>search</span>
              <span className={`text-[11px] flex-1 ${cmdDesc}`}>Open search</span>
              <span className={`text-[9px] font-mono border rounded px-1 ml-auto ${keyBadge}`}>CTRL/⌘K</span>
            </button>
            <button onClick={() => { runCommand("snake"); setOpen(false); }} className={`w-full flex items-center gap-2 px-3 py-1.5 text-left transition-colors ${cmdHover}`}>
              <span className={`text-[11px] font-mono w-28 shrink-0 ${cmdCode}`}>snake</span>
              <span className={`text-[11px] flex-1 ${cmdDesc}`}>Play snake 🐍</span>
            </button>
          </div>
        </div>
      )}

      {showSnake && (
        <SnakeGame light={light} bottomY={snakeBottomY} onClose={() => setShowSnake(false)} onOpenSearch={onOpenSearch} />
      )}

      <div
        ref={barRef}
        className={`h-9 flex items-center px-3 gap-2 border-t cursor-text transition-colors duration-300 ${bar} ${open ? "" : "hover:bg-white/[0.02]"}`}
        onClick={handleBarClick}
      >
        <div className="flex items-center gap-1.5 flex-1 min-w-0" style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}>
          <span className={pathColor}>{path}</span>
          <span className={arrowColor}>❯</span>

          {feedback ? (
            <span className={`${feedbackColor} transition-opacity`}>{feedback.text}</span>
          ) : open ? (
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "k") return;
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  const next = Math.min(historyIdxRef.current + 1, historyRef.current.length - 1);
                  historyIdxRef.current = next;
                  setInput(historyRef.current[next] ?? "");
                } else if (e.key === "ArrowDown") {
                  e.preventDefault();
                  const next = Math.max(historyIdxRef.current - 1, -1);
                  historyIdxRef.current = next;
                  setInput(next === -1 ? "" : historyRef.current[next]);
                } else if (e.key === "Enter") {
                  runCommand(input);
                } else if (e.key === "Escape") {
                  setOpen(false);
                  setInput("");
                }
                e.stopPropagation();
              }}
              onClick={(e) => e.stopPropagation()}
              className={`bg-transparent outline-none flex-1 min-w-0 ${inputColor}`}
              style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}
              placeholder=""
            />
          ) : (
            <span
              className="w-[7px] h-[13px] inline-block rounded-[1px]"
              style={{
                background: light ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)",
                animation: "termCursorBlink 1.1s step-end infinite",
              }}
            />
          )}
        </div>

        {!open && !feedback && (
          <span className={`text-[10px] ${hintColor} shrink-0`} style={{ fontFamily: "var(--font-mono)" }}>
            <span className="hidden md:inline">Press ENTER or / to use terminal, </span>click for commands
          </span>
        )}
      </div>
    </div>
  );
};

export default Terminal;
