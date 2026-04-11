import { useReducer, useRef, useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import {
  Github,
  Linkedin,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Lock,
  Star,
  Plus,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import HomePage from "./pages/HomePage";
import ExperiencePage from "./pages/ExperiencePage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import Terminal from "./Terminal";

export type Tab = "home" | "experience" | "projects" | "contact";

export const tabUrls: Record<Tab, string> = {
  home: "andrewli",
  experience: "andrewli/experience",
  projects: "andrewli/projects",
  contact: "andrewli/contact",
};

const tabs: { id: Tab; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

interface BrowserState {
  isStarred: boolean;
  isReloading: boolean;
  history: Tab[];
  historyIndex: number;
}

type BrowserAction =
  | { type: "GO_BACK"; currentTab: Tab; onNavigate: (t: Tab) => void }
  | { type: "GO_FORWARD"; currentTab: Tab; onNavigate: (t: Tab) => void }
  | { type: "TOGGLE_STAR" }
  | { type: "SET_RELOADING"; isReloading: boolean }
  | { type: "PUSH_HISTORY"; tab: Tab };

const initialState: BrowserState = {
  isStarred: false,
  isReloading: false,
  history: ["home"],
  historyIndex: 0,
};

function browserReducer(state: BrowserState, action: BrowserAction): BrowserState {
  switch (action.type) {
    case "PUSH_HISTORY": {
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(action.tab);
      return { ...state, history: newHistory, historyIndex: newHistory.length - 1 };
    }
    case "GO_BACK": {
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1;
        action.onNavigate(state.history[newIndex]);
        return { ...state, historyIndex: newIndex };
      }
      const currentIndex = tabs.findIndex((t) => t.id === action.currentTab);
      if (currentIndex > 0) {
        const newTab = tabs[currentIndex - 1].id;
        action.onNavigate(newTab);
        const newHistory = [...state.history, newTab];
        return { ...state, history: newHistory, historyIndex: newHistory.length - 1 };
      }
      return state;
    }
    case "GO_FORWARD": {
      if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1;
        action.onNavigate(state.history[newIndex]);
        return { ...state, historyIndex: newIndex };
      }
      const currentIndex = tabs.findIndex((t) => t.id === action.currentTab);
      if (currentIndex < tabs.length - 1) {
        const newTab = tabs[currentIndex + 1].id;
        action.onNavigate(newTab);
        const newHistory = [...state.history, newTab];
        return { ...state, history: newHistory, historyIndex: newHistory.length - 1 };
      }
      return state;
    }
    case "TOGGLE_STAR":
      return { ...state, isStarred: !state.isStarred };
    case "SET_RELOADING":
      return { ...state, isReloading: action.isReloading };
    default:
      return state;
  }
}

export type WindowState = "normal" | "minimized" | "maximized" | "closed" | "split-left" | "split-right";

type ResizeDir = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

interface BrowserProps {
  light: boolean;
  onToggleTheme: () => void;
  activeTab: Tab;
  onNavigate: (tab: Tab) => void;
  onOpenSearch: () => void;
  windowState: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onSplitLeft: () => void;
  onSplitRight: () => void;
}

const Browser = ({
  light, onToggleTheme, activeTab, onNavigate, onOpenSearch,
  windowState, onClose, onMinimize, onToggleMaximize, onSplitLeft, onSplitRight,
}: BrowserProps) => {
  const [state, dispatch] = useReducer(browserReducer, initialState);
  const { isStarred, isReloading } = state;

  const [greenHover, setGreenHover] = useState(false);
  const [greenRect, setGreenRect] = useState<DOMRect | null>(null);
  const greenBtnRef = useRef<HTMLButtonElement>(null);
  const greenCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openGreen = () => {
    if (greenCloseTimer.current) clearTimeout(greenCloseTimer.current);
    if (greenBtnRef.current) setGreenRect(greenBtnRef.current.getBoundingClientRect());
    setGreenHover(true);
  };

  const scheduleCloseGreen = () => {
    greenCloseTimer.current = setTimeout(() => setGreenHover(false), 120);
  };

  const [hasResized, setHasResized] = useState(false);

  const isMaximized = windowState === "maximized";
  const isNormal = windowState === "normal";

  const positionRef = useRef({ x: 0, y: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hasResizedRef = useRef(false);
  const explicitSizeRef = useRef<{ width: number; height: number } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [activeTab]);

  const prevTabRef = useRef(activeTab);
  useEffect(() => {
    if (prevTabRef.current !== activeTab) {
      dispatch({ type: "PUSH_HISTORY", tab: activeTab });
      prevTabRef.current = activeTab;
    }
  }, [activeTab]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    if (windowState !== "normal") {
      el.style.width = "";
      el.style.height = "";
      el.style.transform = "";
      positionRef.current = { x: 0, y: 0 };
    } else if (hasResizedRef.current && explicitSizeRef.current) {
      el.style.width = `${explicitSizeRef.current.width}px`;
      el.style.height = `${explicitSizeRef.current.height}px`;
    }
  }, [windowState]);

  const reload = () => {
    dispatch({ type: "SET_RELOADING", isReloading: true });
    setTimeout(() => dispatch({ type: "SET_RELOADING", isReloading: false }), 600);
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, a")) return;
    e.preventDefault();

    const el = wrapperRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = positionRef.current.x;
    const initialY = positionRef.current.y;
    const baseLeft = rect.left - initialX;
    const baseTop = rect.top - initialY;
    const elWidth = rect.width;

    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";

    const onMouseMove = (ev: MouseEvent) => {
      let newX = initialX + (ev.clientX - startX);
      let newY = initialY + (ev.clientY - startY);
      const padding = 100;
      newX = Math.max(padding - elWidth - baseLeft, Math.min(window.innerWidth - padding - baseLeft, newX));
      newY = Math.max(-baseTop, Math.min(window.innerHeight - padding - baseTop, newY));
      positionRef.current = { x: newX, y: newY };
      el.style.transform = `translate(${newX}px, ${newY}px)`;
    };

    const onMouseUp = () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, []);

  const handleResizeStart = useCallback((e: React.MouseEvent, dir: ResizeDir) => {
    e.preventDefault();
    e.stopPropagation();

    const el = wrapperRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = rect.width;
    const startH = rect.height;
    const curX = positionRef.current.x;
    const curY = positionRef.current.y;
    const MIN_W = 480;
    const MIN_H = 320;
    const maxW = window.innerWidth - 80;
    const maxH = window.innerHeight - 80;

    if (!hasResizedRef.current) {
      hasResizedRef.current = true;
      explicitSizeRef.current = { width: startW, height: startH };
      el.style.width = `${startW}px`;
      el.style.height = `${startH}px`;
      setHasResized(true);
    }

    document.body.style.userSelect = "none";

    const onMouseMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      let newW = startW;
      let newH = startH;
      let newX = curX;
      let newY = curY;

      if (dir.includes("e")) newW = Math.max(MIN_W, Math.min(maxW, startW + dx));
      if (dir.includes("s")) newH = Math.max(MIN_H, Math.min(maxH, startH + dy));
      if (dir.includes("w")) {
        newW = Math.max(MIN_W, Math.min(maxW, startW - dx));
        newX = curX + (startW - newW);
      }
      if (dir.includes("n")) {
        newH = Math.max(MIN_H, Math.min(maxH, startH - dy));
        newY = curY + (startH - newH);
      }

      el.style.width = `${newW}px`;
      el.style.height = `${newH}px`;
      el.style.transform = `translate(${newX}px, ${newY}px)`;
      positionRef.current = { x: newX, y: newY };
      explicitSizeRef.current = { width: newW, height: newH };
    };

    const onMouseUp = () => {
      document.body.style.userSelect = "";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, []);

  const c = light
    ? {
      shell: "bg-[#f5f0e8] border-[#d9d0c3]",
      titleBar: "bg-[#ebe5db] border-[#d9d0c3]",
      toolbar: "bg-[#f0ebe2] border-[#d9d0c3]",
      tabActive: "bg-[#f5f0e8] text-[#3c3226] border border-[#d9d0c3]",
      tabInactive: "text-[#a89e8e] hover:text-[#3c3226] hover:bg-[#e8e2d8]",
      icon: "text-[#a89e8e] hover:text-[#3c3226] hover:bg-[#e8e2d8]",
      urlBar: "bg-[#ede8de] border-[#d9d0c3]",
      urlText: "text-[#a89e8e]",
      content: "bg-[#f5f0e8]",
    }
    : {
      shell: "bg-[#0d0d16] border-white/[0.08]",
      titleBar: "bg-[#0a0a12] border-white/[0.06]",
      toolbar: "bg-black/20 border-white/[0.04]",
      tabActive: "bg-white/[0.08] text-white border border-white/[0.1]",
      tabInactive: "text-white/30 hover:text-white/70 hover:bg-white/[0.05]",
      icon: "text-white/30 hover:text-white/80 hover:bg-white/[0.06]",
      urlBar: "bg-white/[0.04] border-white/[0.06]",
      urlText: "text-white/35",
      content: "bg-[#0d0d16]",
    };

  const wrapperClass = isMaximized || !isNormal
    ? "relative w-full h-full"
    : hasResized
      ? "relative"
      : "relative w-full max-w-5xl";

  const innerClass = isMaximized
    ? "w-full h-full rounded-none"
    : hasResized
      ? "w-full h-full rounded-2xl"
      : "w-full h-[72vh] md:h-[65vh] rounded-2xl";

  return (
    <div
      ref={wrapperRef}
      className={wrapperClass}
      style={{ willChange: "transform" }}
    >
      {isNormal && (
        <>
          <div className="hidden md:block absolute top-0 left-2 right-2 h-1 z-10 cursor-n-resize" onMouseDown={(e) => handleResizeStart(e, "n")} />
          <div className="hidden md:block absolute bottom-0 left-2 right-2 h-1 z-10 cursor-s-resize" onMouseDown={(e) => handleResizeStart(e, "s")} />
          <div className="hidden md:block absolute right-0 top-2 bottom-2 w-1 z-10 cursor-e-resize" onMouseDown={(e) => handleResizeStart(e, "e")} />
          <div className="hidden md:block absolute left-0 top-2 bottom-2 w-1 z-10 cursor-w-resize" onMouseDown={(e) => handleResizeStart(e, "w")} />
          <div className="hidden md:block absolute top-0 right-0 w-2 h-2 z-10 cursor-ne-resize" onMouseDown={(e) => handleResizeStart(e, "ne")} />
          <div className="hidden md:block absolute top-0 left-0 w-2 h-2 z-10 cursor-nw-resize" onMouseDown={(e) => handleResizeStart(e, "nw")} />
          <div className="hidden md:block absolute bottom-0 right-0 w-2 h-2 z-10 cursor-se-resize" onMouseDown={(e) => handleResizeStart(e, "se")} />
          <div className="hidden md:block absolute bottom-0 left-0 w-2 h-2 z-10 cursor-sw-resize" onMouseDown={(e) => handleResizeStart(e, "sw")} />
        </>
      )}

      <div
        className={`${innerClass} overflow-hidden border flex flex-col transition-colors duration-300 ${c.shell}`}
        style={{
          boxShadow: light
            ? "0 0 0 1px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.12), 0 24px 60px rgba(0,0,0,0.08)"
            : "0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.6), 0 24px 60px rgba(0,0,0,0.4)",
        }}
      >
        <div
          className={`h-11 flex items-center justify-between px-4 border-b shrink-0 cursor-grab active:cursor-grabbing select-none transition-colors duration-300 ${c.titleBar}`}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2 group/tl">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#ff5f57] flex items-center justify-center transition-opacity hover:opacity-90"
              title="Close"
            >
              <span className="opacity-0 group-hover/tl:opacity-100 text-[7px] text-[#7a0e00] font-bold leading-none transition-opacity select-none">×</span>
            </button>
            <button
              onClick={onMinimize}
              className="w-3 h-3 rounded-full bg-[#febc2e] flex items-center justify-center transition-opacity hover:opacity-90"
              title="Minimize"
            >
              <span className="opacity-0 group-hover/tl:opacity-100 text-[7px] text-[#7a4200] font-bold leading-none transition-opacity select-none">−</span>
            </button>
            <div className="relative">
              <button
                ref={greenBtnRef}
                onClick={isMaximized ? onToggleMaximize : undefined}
                onMouseEnter={openGreen}
                onMouseLeave={scheduleCloseGreen}
                className="w-3 h-3 rounded-full bg-[#28c840] flex items-center justify-center transition-opacity hover:opacity-90"
                title={isMaximized ? "Exit Full Screen" : "Full Screen / Tile"}
              >
                <span className="opacity-0 group-hover/tl:opacity-100 text-[7px] text-[#0a5e00] font-bold leading-none transition-opacity select-none">+</span>
              </button>
            </div>
          </div>

          {greenHover && !isMaximized && greenRect && createPortal(
            <div
              style={{ position: "fixed", top: greenRect.bottom + 10, left: greenRect.left - 28, zIndex: 300 }}
              className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-[#1c1c1e]/95 border border-white/10 shadow-2xl"
              onMouseEnter={openGreen}
              onMouseLeave={scheduleCloseGreen}
            >
              <div className="flex gap-1">
                <button
                  onClick={() => { onSplitLeft(); setGreenHover(false); }}
                  className="flex flex-col items-center gap-1 p-1.5 rounded-lg hover:bg-white/10 transition-colors group/tile"
                  title="Tile Left"
                >
                  <div className="w-8 h-5 rounded-sm border border-white/25 overflow-hidden flex">
                    <div className="w-1/2 bg-white/30 border-r border-white/15" />
                    <div className="w-1/2" />
                  </div>
                </button>
                <button
                  onClick={() => { onToggleMaximize(); setGreenHover(false); }}
                  className="flex flex-col items-center gap-1 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  title="Full Screen"
                >
                  <div className="w-8 h-5 rounded-sm border border-white/25 bg-white/30" />
                </button>
                <button
                  onClick={() => { onSplitRight(); setGreenHover(false); }}
                  className="flex flex-col items-center gap-1 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  title="Tile Right"
                >
                  <div className="w-8 h-5 rounded-sm border border-white/25 overflow-hidden flex">
                    <div className="w-1/2" />
                    <div className="w-1/2 bg-white/30 border-l border-white/15" />
                  </div>
                </button>
              </div>
              <div className="flex gap-px text-[9px] text-white/30 w-full justify-around" style={{ fontFamily: "var(--font-mono)" }}>
                <span className="w-11 text-center">Left</span>
                <span className="w-11 text-center">Full</span>
                <span className="w-11 text-center">Right</span>
              </div>
            </div>,
            document.body
          )}

          <div className="flex items-center gap-0.5 flex-1 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                className={`px-2 md:px-3.5 py-1.5 text-[11px] rounded-lg transition-all ${activeTab === tab.id ? c.tabActive : c.tabInactive
                  }`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {tab.label}
              </button>
            ))}
            <button
              onClick={onOpenSearch}
              className={`ml-1 p-1.5 rounded-lg transition-colors ${c.icon}`}
            >
              <Plus size={13} />
            </button>
          </div>

          <div className="w-8" />
        </div>

        <div className={`h-10 flex items-center gap-2 px-3 border-b shrink-0 transition-colors duration-300 ${c.toolbar}`}>
          <div className="flex items-center gap-0.5">
            <button onClick={() => dispatch({ type: "GO_BACK", currentTab: activeTab, onNavigate })} className={`p-1.5 rounded-lg transition-colors ${c.icon}`}>
              <ArrowLeft size={13} />
            </button>
            <button onClick={() => dispatch({ type: "GO_FORWARD", currentTab: activeTab, onNavigate })} className={`p-1.5 rounded-lg transition-colors ${c.icon}`}>
              <ArrowRight size={13} />
            </button>
            <button onClick={reload} className={`p-1.5 rounded-lg transition-colors ${c.icon}`}>
              <RotateCw size={13} className={isReloading ? "animate-spin" : ""} />
            </button>
          </div>

          <button
            onClick={onOpenSearch}
            className={`flex-1 flex items-center gap-2 rounded-lg px-3 py-1.5 mx-2 border transition-colors duration-300 cursor-text text-left ${c.urlBar}`}
          >
            <Lock size={11} className="text-[#28c840] shrink-0" />
            <span className={`text-[11px] flex-1 ${c.urlText}`} style={{ fontFamily: "var(--font-mono)" }}>
              {tabUrls[activeTab]}
            </span>
            <span
              onClick={(e) => { e.stopPropagation(); dispatch({ type: "TOGGLE_STAR" }); }}
              className={`hover:text-[#febc2e] transition-colors shrink-0 ${isStarred ? "text-[#febc2e]" : c.urlText}`}
            >
              <Star size={11} fill={isStarred ? "#febc2e" : "none"} />
            </span>
          </button>

          <div className="flex items-center gap-0.5">
            <a href="https://github.com/AndrewL05" target="_blank" rel="noopener noreferrer" className={`p-1.5 rounded-lg transition-colors ${c.icon}`}>
              <Github size={13} />
            </a>
            <a href="https://linkedin.com/in/andrew-li05" target="_blank" rel="noopener noreferrer" className={`p-1.5 rounded-lg transition-colors ${c.icon}`}>
              <Linkedin size={13} />
            </a>
          </div>
        </div>

        <div
          ref={contentRef}
          className={`flex-1 overflow-y-auto ${c.content} transition-opacity duration-300 ${isReloading ? "opacity-0" : "opacity-100"}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeTab === "home" && <HomePage onNavigate={onNavigate} light={light} />}
              {activeTab === "experience" && <ExperiencePage light={light} />}
              {activeTab === "projects" && <ProjectsPage light={light} />}
              {activeTab === "contact" && <ContactPage light={light} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <Terminal
          activeTab={activeTab}
          onNavigate={onNavigate}
          onOpenSearch={onOpenSearch}
          onToggleTheme={onToggleTheme}
          light={light}
        />
      </div>
    </div>
  );
};

export default Browser;
