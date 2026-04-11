import { useState, useEffect, useCallback, useRef } from "react";
import { useAnimation, AnimatePresence, motion } from "framer-motion";
import Browser from "../components/Browser";
import type { WindowState } from "../components/Browser";
import Menubar from "../components/Menubar";
import Dock from "../components/Dock";
import CommandPalette from "../components/CommandPalette";
import type { Tab } from "../components/Browser";

const WRAPPER_CLASS: Record<WindowState, string> = {
  normal: "absolute inset-0 pt-9 pb-16 flex items-center justify-center px-3 md:px-6",
  maximized: "absolute inset-0 pt-9 flex",
  "split-left": "absolute top-0 bottom-0 left-0 w-1/2 pt-9 pb-16 flex items-center justify-center px-3",
  "split-right": "absolute top-0 bottom-0 right-0 w-1/2 pt-9 pb-16 flex items-center justify-center px-3",
  minimized: "",
  closed: "",
};

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

const Index = () => {
  const [light, setLight] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [windowState, setWindowState] = useState<WindowState>("normal");
  const [showKonami, setShowKonami] = useState(false);

  const controls = useAnimation();
  const exitIntentRef = useRef<"close" | "minimize">("close");
  const konamiBuffer = useRef<string[]>([]);

  const toggleTheme = useCallback(() => setLight((l) => !l), []);
  const openSearch = useCallback(() => setShowSearch(true), []);
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
    const tabByKey: Record<string, Tab> = { "1": "home", "2": "experience", "3": "projects", "4": "contact" };
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(s => !s);
        return;
      }

      const tag = (e.target as HTMLElement).tagName;
      const isTyping = tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement).isContentEditable;

      // Konami code detection, skip while user is typing so arrow keys don't get intercepted
      if (!isTyping) {
        konamiBuffer.current = [...konamiBuffer.current, e.key].slice(-KONAMI.length);
        if (konamiBuffer.current.join(",") === KONAMI.join(",")) {
          konamiBuffer.current = [];
          setShowKonami(true);
          setTimeout(() => setShowKonami(false), 3000);
        }
      }

      if (isTyping) return;
      if (tabByKey[e.key]) {
        e.preventDefault();
        setActiveTab(tabByKey[e.key]);
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

      <AnimatePresence>
        {showKonami && (
          <motion.div
            key="konami"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
          >
            <div
              className={`flex flex-col items-center gap-2 px-8 py-5 rounded-2xl border ${light
                  ? "bg-[#f5f0e8]/90 border-[#d9d0c3] shadow-[0_8px_40px_rgba(0,0,0,0.15)]"
                  : "bg-[#111118]/90 border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.7)]"
                }`}
              style={{ backdropFilter: "blur(12px)" }}
            >
              <span
                className={`text-[11px] font-mono tracking-widest uppercase ${light ? "text-[#1a9e30]" : "text-[#28c840]"}`}
              >
                [ ACCESS GRANTED ]
              </span>
              <span
                className={`text-[10px] font-mono ${light ? "text-[#8a7e6e]" : "text-white/35"}`}
              >
                you found the secret ↑↑↓↓←→←→BA
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
