import { useReducer, useRef, useEffect, useCallback } from "react";
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
  home: "andrewli.dev",
  experience: "andrewli.dev/experience",
  projects: "andrewli.dev/projects",
  contact: "andrewli.dev/contact",
};

const tabs: { id: Tab; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

interface BrowserState {
  isStarred: boolean;
  position: { x: number; y: number };
  isDragging: boolean;
  isReloading: boolean;
  history: Tab[];
  historyIndex: number;
}

type BrowserAction =
  | { type: "GO_BACK"; currentTab: Tab; onNavigate: (t: Tab) => void }
  | { type: "GO_FORWARD"; currentTab: Tab; onNavigate: (t: Tab) => void }
  | { type: "TOGGLE_STAR" }
  | { type: "SET_POSITION"; position: { x: number; y: number } }
  | { type: "SET_DRAGGING"; isDragging: boolean }
  | { type: "SET_RELOADING"; isReloading: boolean }
  | { type: "PUSH_HISTORY"; tab: Tab };

const initialState: BrowserState = {
  isStarred: false,
  position: { x: 0, y: 0 },
  isDragging: false,
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
    case "SET_POSITION":
      return { ...state, position: action.position };
    case "SET_DRAGGING":
      return { ...state, isDragging: action.isDragging };
    case "SET_RELOADING":
      return { ...state, isReloading: action.isReloading };
    default:
      return state;
  }
}

interface BrowserProps {
  light: boolean;
  onToggleTheme: () => void;
  activeTab: Tab;
  onNavigate: (tab: Tab) => void;
  onOpenSearch: () => void;
}

const Browser = ({ light, onToggleTheme, activeTab, onNavigate, onOpenSearch }: BrowserProps) => {
  const [state, dispatch] = useReducer(browserReducer, initialState);
  const { isStarred, position, isDragging, isReloading } = state;

  const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number } | null>(null);
  const browserRef = useRef<HTMLDivElement>(null);
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

  const reload = () => {
    dispatch({ type: "SET_RELOADING", isReloading: true });
    setTimeout(() => dispatch({ type: "SET_RELOADING", isReloading: false }), 600);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !dragRef.current || !browserRef.current) return;
      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;
      let newX = dragRef.current.initialX + deltaX;
      let newY = dragRef.current.initialY + deltaY;
      const rect = browserRef.current.getBoundingClientRect();
      const baseLeft = rect.left - position.x;
      const baseTop = rect.top - position.y;
      const browserWidth = rect.width;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const padding = 100;
      newX = Math.max(padding - browserWidth - baseLeft, Math.min(viewportWidth - padding - baseLeft, newX));
      newY = Math.max(-baseTop, Math.min(viewportHeight - padding - baseTop, newY));
      dispatch({ type: "SET_POSITION", position: { x: newX, y: newY } });
    };
    const handleMouseUp = () => {
      dispatch({ type: "SET_DRAGGING", isDragging: false });
      dragRef.current = null;
    };
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, position]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, a")) return;
    dispatch({ type: "SET_DRAGGING", isDragging: true });
    dragRef.current = { startX: e.clientX, startY: e.clientY, initialX: position.x, initialY: position.y };
  }, [position]);

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

  return (
    <div
      ref={browserRef}
      className={`w-full max-w-5xl h-[72vh] md:h-[65vh] rounded-2xl overflow-hidden border flex flex-col transition-colors duration-300 ${c.shell}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? "grabbing" : undefined,
        boxShadow: light
          ? "0 0 0 1px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.12), 0 24px 60px rgba(0,0,0,0.08)"
          : "0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.6), 0 24px 60px rgba(0,0,0,0.4)",
      }}
    >
      <div
        className={`h-11 flex items-center justify-between px-4 border-b shrink-0 cursor-grab active:cursor-grabbing select-none transition-colors duration-300 ${c.titleBar}`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <button className="w-3 h-3 rounded-full bg-[#ff5f57] hover:opacity-80 transition-opacity" />
          <button className="w-3 h-3 rounded-full bg-[#febc2e] hover:opacity-80 transition-opacity" />
          <button className="w-3 h-3 rounded-full bg-[#28c840] hover:opacity-80 transition-opacity" />
        </div>

        <div className="flex items-center gap-0.5 flex-1 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`px-2 md:px-3.5 py-1.5 text-[11px] rounded-lg transition-all ${
                activeTab === tab.id ? c.tabActive : c.tabInactive
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
  );
};

export default Browser;
