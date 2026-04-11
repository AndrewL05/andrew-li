import { useState, useEffect, useCallback, useRef } from "react";
import { useAnimation, AnimatePresence, motion } from "framer-motion";
import Browser from "../components/Browser";
import type { WindowState } from "../components/Browser";
import Menubar from "../components/Menubar";
import Dock from "../components/Dock";
import CommandPalette from "../components/CommandPalette";
import type { Tab } from "../components/Browser";

const WRAPPER_CLASS: Record<WindowState, string> = {
  normal:      "absolute inset-0 pt-9 pb-16 flex items-center justify-center px-3 md:px-6",
  maximized:   "absolute inset-0 pt-9 flex",
  "split-left":  "absolute top-0 bottom-0 left-0 w-1/2 pt-9 pb-16 flex items-center justify-center px-3",
  "split-right": "absolute top-0 bottom-0 right-0 w-1/2 pt-9 pb-16 flex items-center justify-center px-3",
  minimized:   "",
  closed:      "",
};

const Index = () => {
  const [light, setLight] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [windowState, setWindowState] = useState<WindowState>("normal");

  const controls = useAnimation();
  const exitIntentRef = useRef<"close" | "minimize">("close");

  const toggleTheme = useCallback(() => setLight((l) => !l), []);
  const openSearch  = useCallback(() => setShowSearch(true), []);
  const closeSearch = useCallback(() => setShowSearch(false), []);

  const isVisible = windowState !== "minimized" && windowState !== "closed";

  useEffect(() => {
    if (isVisible) {
      const fromMinimized = exitIntentRef.current === "minimize";
      controls.set(fromMinimized ? { opacity: 0, scale: 0.08, y: 260 } : { opacity: 0, scale: 0.92 });
      controls.start({ opacity: 1, scale: 1, y: 0, transition: { duration: fromMinimized ? 0.32 : 0.22, ease: [0.16, 1, 0.3, 1] } });
    }
  }, [isVisible]);

  const handleClose = useCallback(async () => {
    exitIntentRef.current = "close";
    await controls.start({ opacity: 0, scale: 0.88, y: -12, transition: { duration: 0.18, ease: "easeIn" } });
    setWindowState("closed");
  }, [controls]);

  const handleMinimize = useCallback(async () => {
    exitIntentRef.current = "minimize";
    await controls.start({ opacity: 0, scale: 0.06, y: 260, transition: { duration: 0.28, ease: [0.4, 0, 0.6, 1] } });
    setWindowState("minimized");
  }, [controls]);

  const handleToggleMaximize = useCallback(() => {
    setWindowState(s => (s === "maximized" ? "normal" : "maximized"));
  }, []);

  const handleSplitLeft = useCallback(() => {
    setWindowState(s => (s === "split-left" ? "normal" : "split-left"));
  }, []);

  const handleSplitRight = useCallback(() => {
    setWindowState(s => (s === "split-right" ? "normal" : "split-right"));
  }, []);

  const handleRestore = useCallback(() => {
    setWindowState("normal");
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(s => !s);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const bgColor = light ? "#f0ece3" : "#0c0c0e";
  const dotColor = light ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.09)";
  const vignette = light
    ? "radial-gradient(ellipse 90% 85% at 50% 50%, transparent 35%, rgba(0,0,0,0.07) 100%)"
    : "radial-gradient(ellipse 90% 85% at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 100%)";

  return (
    <div
      className="relative h-full overflow-hidden transition-colors duration-300"
      style={{ background: bgColor }}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern id="dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill={dotColor} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: vignette }}
        aria-hidden
      />

      <Menubar
        light={light}
        onToggleTheme={toggleTheme}
        onOpenSearch={openSearch}
        onNavigate={setActiveTab}
        activeTab={activeTab}
      />

      {isVisible && (
        <motion.div
          className={WRAPPER_CLASS[windowState]}
          animate={controls}
          style={{ willChange: "opacity, transform" }}
        >
          <Browser
            light={light}
            onToggleTheme={toggleTheme}
            activeTab={activeTab}
            onNavigate={setActiveTab}
            onOpenSearch={openSearch}
            windowState={windowState}
            onClose={handleClose}
            onMinimize={handleMinimize}
            onToggleMaximize={handleToggleMaximize}
            onSplitLeft={handleSplitLeft}
            onSplitRight={handleSplitRight}
          />
        </motion.div>
      )}

      {windowState !== "maximized" && (
        <Dock
          light={light}
          windowHidden={!isVisible}
          onRestore={handleRestore}
        />
      )}

      <CommandPalette
        isOpen={showSearch}
        onClose={closeSearch}
        onNavigate={tab => { setActiveTab(tab); closeSearch(); }}
        light={light}
      />
    </div>
  );
};

export default Index;
