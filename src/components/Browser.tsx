import { useReducer, useRef, useEffect, useCallback, useState } from "react";
import {
  Github,
  Linkedin,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Lock,
  Star,
  Plus,
  Sun,
  Moon,
} from "lucide-react";
import HomePage from "./pages/HomePage";
import ExperiencePage from "./pages/ExperiencePage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import SearchPage from "./pages/SearchPage";

export type Tab = "home" | "experience" | "projects" | "contact";

const tabUrls: Record<Tab, string> = {
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
  activeTab: Tab;
  showSearch: boolean;
  isStarred: boolean;
  position: { x: number; y: number };
  isDragging: boolean;
  isReloading: boolean;
  history: Tab[];
  historyIndex: number;
}

type BrowserAction =
  | { type: "NAVIGATE"; tab: Tab }
  | { type: "GO_BACK" }
  | { type: "GO_FORWARD" }
  | { type: "TOGGLE_STAR" }
  | { type: "SET_POSITION"; position: { x: number; y: number } }
  | { type: "SET_DRAGGING"; isDragging: boolean }
  | { type: "SET_RELOADING"; isReloading: boolean }
  | { type: "OPEN_SEARCH" }
  | { type: "CLOSE_SEARCH" };

const initialState: BrowserState = {
  activeTab: "home",
  showSearch: false,
  isStarred: false,
  position: { x: 0, y: 0 },
  isDragging: false,
  isReloading: false,
  history: ["home"],
  historyIndex: 0,
};

function browserReducer(state: BrowserState, action: BrowserAction): BrowserState {
  switch (action.type) {
    case "NAVIGATE": {
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(action.tab);
      return {
        ...state,
        activeTab: action.tab,
        showSearch: false,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    }
    case "GO_BACK": {
      if (state.showSearch) {
        return { ...state, showSearch: false };
      }
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1;
        return { ...state, activeTab: state.history[newIndex], historyIndex: newIndex };
      }
      const currentIndex = tabs.findIndex((t) => t.id === state.activeTab);
      if (currentIndex > 0) {
        const newTab = tabs[currentIndex - 1].id;
        const newHistory = [...state.history, newTab];
        return { ...state, activeTab: newTab, history: newHistory, historyIndex: newHistory.length - 1 };
      }
      return state;
    }
    case "GO_FORWARD": {
      if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1;
        return { ...state, activeTab: state.history[newIndex], historyIndex: newIndex };
      }
      const currentIndex = tabs.findIndex((t) => t.id === state.activeTab);
      if (currentIndex < tabs.length - 1) {
        const newTab = tabs[currentIndex + 1].id;
        const newHistory = [...state.history, newTab];
        return { ...state, activeTab: newTab, history: newHistory, historyIndex: newHistory.length - 1 };
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
    case "OPEN_SEARCH":
      return { ...state, showSearch: true };
    case "CLOSE_SEARCH":
      return { ...state, showSearch: false };
    default:
      return state;
  }
}

const Browser = () => {
  const [state, dispatch] = useReducer(browserReducer, initialState);
  const { activeTab, showSearch, isStarred, position, isDragging, isReloading } = state;
  const [light, setLight] = useState(false);

  const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number } | null>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  const closeSearch = useCallback(() => dispatch({ type: "CLOSE_SEARCH" }), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showSearch) closeSearch();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showSearch, closeSearch]);

  const navigateToTab = (tab: Tab) => dispatch({ type: "NAVIGATE", tab });
  const goBack = () => dispatch({ type: "GO_BACK" });
  const goForward = () => dispatch({ type: "GO_FORWARD" });
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
      const browserHeight = rect.height;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const padding = 100;

      const minX = padding - browserWidth - baseLeft;
      const maxX = viewportWidth - padding - baseLeft;
      const minY = -baseTop;
      const maxY = viewportHeight - padding - baseTop;

      newX = Math.max(minX, Math.min(maxX, newX));
      newY = Math.max(minY, Math.min(maxY, newY));

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
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;

    dispatch({ type: "SET_DRAGGING", isDragging: true });
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y,
    };
  };

  const getStatusText = () => {
    if (showSearch) return "New Tab";
    switch (activeTab) {
      case "home":
        return "Ready";
      case "experience":
        return "4 roles";
      case "projects":
        return "5 projects";
      case "contact":
        return "";
    }
  };

  // Browser chrome theme
  const c = light
    ? {
      shell: "bg-[#f5f0e8] border-[#d9d0c3]",
      titleBar: "bg-[#ebe5db] border-[#d9d0c3]",
      toolbar: "bg-[#f5f0e8] border-[#d9d0c3]",
      tabActive: "bg-[#d9d0c3] text-[#3c3226]",
      tabInactive: "text-[#8a7e6e] hover:text-[#3c3226] hover:bg-[#e2dbd0]",
      icon: "text-[#8a7e6e] hover:text-[#3c3226] hover:bg-[#e2dbd0]",
      urlBar: "bg-[#ede8de]",
      urlText: "text-[#8a7e6e]",
      statusBar: "bg-[#ebe5db] border-[#d9d0c3]",
      statusText: "text-[#a89e8e]",
      content: "bg-[#ede8de]",
    }
    : {
      shell: "bg-[#292929] border-[#3a3a3a]",
      titleBar: "bg-[#202020] border-[#3a3a3a]",
      toolbar: "bg-[#292929] border-[#3a3a3a]",
      tabActive: "bg-[#3a3a3a] text-white",
      tabInactive: "text-[#888] hover:text-white hover:bg-[#333]",
      icon: "text-[#666] hover:text-white hover:bg-[#3a3a3a]",
      urlBar: "bg-[#1a1a1a]",
      urlText: "text-[#888]",
      statusBar: "bg-[#202020] border-[#3a3a3a]",
      statusText: "text-[#555]",
      content: "bg-[#1a1a1a]",
    };

  return (
    <div
      ref={browserRef}
      className={`w-full max-w-5xl h-[85vh] rounded-xl shadow-2xl overflow-hidden border flex flex-col transition-colors duration-300 ${c.shell}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? "grabbing" : undefined,
      }}
    >
      <div
        className={`h-11 flex items-center justify-between px-4 border-b shrink-0 cursor-grab active:cursor-grabbing select-none transition-colors duration-300 ${c.titleBar}`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <button className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 transition-colors" />
          <button className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#febc2e]/80 transition-colors" />
          <button className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#28c840]/80 transition-colors" />
        </div>

        <div className="flex items-center gap-1 flex-1 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => navigateToTab(tab.id)}
              className={`px-2 md:px-4 py-1.5 text-[10px] md:text-xs rounded-md transition-all ${!showSearch && activeTab === tab.id
                ? c.tabActive
                : c.tabInactive
                }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={() => dispatch({ type: "OPEN_SEARCH" })}
            className={`ml-1 p-1 rounded transition-colors ${c.icon}`}
          >
            <Plus size={14} />
          </button>
        </div>

        <div className="w-[52px] flex justify-end">
          <button
            onClick={() => setLight(!light)}
            className={`p-1 rounded transition-colors ${c.icon}`}
          >
            {light ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </div>
      </div>

      <div className={`h-10 flex items-center gap-2 px-3 border-b shrink-0 transition-colors duration-300 ${c.toolbar}`}>
        <div className="flex items-center gap-1">
          <button
            onClick={goBack}
            className={`p-1.5 rounded transition-colors ${c.icon}`}
          >
            <ArrowLeft size={14} />
          </button>
          <button
            onClick={goForward}
            className={`p-1.5 rounded transition-colors ${c.icon}`}
          >
            <ArrowRight size={14} />
          </button>
          <button
            onClick={reload}
            className={`p-1.5 rounded transition-colors ${c.icon}`}
          >
            <RotateCw size={14} className={isReloading ? "animate-spin" : ""} />
          </button>
        </div>

        <div className={`flex-1 flex items-center gap-2 rounded-md px-3 py-1.5 mx-2 transition-colors duration-300 ${c.urlBar}`}>
          <Lock size={12} className="text-[#28c840]" />
          <span className={`text-xs flex-1 font-mono ${c.urlText}`}>
            {showSearch ? "andrewli.dev/search" : tabUrls[activeTab]}
          </span>
          <button
            onClick={() => dispatch({ type: "TOGGLE_STAR" })}
            className={`hover:text-[#febc2e] transition-colors ${isStarred ? "text-[#febc2e]" : (light ? "text-[#a89e8e]" : "text-[#666]")}`}
          >
            <Star
              size={12}
              fill={isStarred ? "#febc2e" : "none"}
            />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <a
            href="https://github.com/AndrewL05"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-1.5 rounded transition-colors ${c.icon}`}
          >
            <Github size={14} />
          </a>
          <a
            href="https://linkedin.com/in/andrew-li05"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-1.5 rounded transition-colors ${c.icon}`}
          >
            <Linkedin size={14} />
          </a>
        </div>
      </div>

      <div ref={contentRef} className={`${c.content} flex-1 overflow-y-auto transition-all duration-300 ${isReloading ? "opacity-0" : "opacity-100"}`}>
        {showSearch ? (
          <SearchPage onNavigate={navigateToTab} light={light} />
        ) : (
          <>
            {activeTab === "home" && <HomePage onNavigate={navigateToTab} light={light} />}
            {activeTab === "experience" && <ExperiencePage light={light} />}
            {activeTab === "projects" && <ProjectsPage light={light} />}
            {activeTab === "contact" && <ContactPage light={light} />}
          </>
        )}
      </div>

      <div className={`h-6 flex items-center justify-between px-3 border-t shrink-0 transition-colors duration-300 ${c.statusBar}`}>
        <span className={`text-[10px] ${c.statusText}`}>{getStatusText()}</span>
        <span className={`text-[10px] ${c.statusText}`}>andrewli.dev</span>
      </div>
    </div>
  );
};

export default Browser;
