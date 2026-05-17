import { useState, useEffect, useCallback, useRef } from "react";
import { useAnimation, AnimatePresence, motion } from "framer-motion";
import Browser from "../components/Browser";
import type { WindowState } from "../components/Browser";
import PDFWindow from "../components/PDFWindow";
import Menubar from "../components/Menubar";
import Dock from "../components/Dock";
import CommandPalette from "../components/CommandPalette";
import WallpaperPicker, { loadWallpaper, saveWallpaper } from "../components/WallpaperPicker";
import type { Tab } from "../components/Browser";

const WRAPPER_CLASS: Record<WindowState, string> = {
  normal: "absolute inset-0 pt-12 md:pt-9 pb-16 flex items-center justify-center px-3 md:px-6",
  maximized: "absolute inset-0 pt-12 md:pt-9 flex",
  "split-left": "absolute top-0 bottom-0 left-0 w-1/2 pt-12 md:pt-9 pb-16 flex items-center justify-center px-3",
  "split-right": "absolute top-0 bottom-0 right-0 w-1/2 pt-12 md:pt-9 pb-16 flex items-center justify-center px-3",
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
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [resumeWindowState, setResumeWindowState] = useState<WindowState>("normal");
  const [wallpaper, setWallpaper] = useState<string | null>(() => loadWallpaper());
  const [showWallpaperPicker, setShowWallpaperPicker] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const controls = useAnimation();
  const resumeControls = useAnimation();
  const exitIntentRef = useRef<"close" | "minimize">("close");
  const resumeExitIntentRef = useRef<"close" | "minimize">("close");
  const konamiBuffer = useRef<string[]>([]);

  const toggleTheme = useCallback(() => setLight((l) => !l), []);
  const openSearch = useCallback(() => setShowSearch(true), []);
  const closeSearch = useCallback(() => setShowSearch(false), []);

  const handleWallpaperSelect = useCallback((file: string | null) => {
    setWallpaper(file);
    saveWallpaper(file);
    setShowWallpaperPicker(false);
  }, []);

  const openWallpaperPicker = useCallback(() => {
    setContextMenu(null);
    setShowWallpaperPicker((v) => !v);
  }, []);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const menuW = 208;
    const menuH = 82;
    const x = e.clientX + menuW > window.innerWidth ? e.clientX - menuW : e.clientX;
    const y = e.clientY + menuH > window.innerHeight ? e.clientY - menuH : e.clientY;
    setContextMenu({ x: Math.max(4, x), y: Math.max(4, y) });
    setShowWallpaperPicker(false);
  }, []);

  useEffect(() => {
    if (!contextMenu) return;
    const handler = () => setContextMenu(null);
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [contextMenu]);

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

  const isResumeVisible = isResumeOpen && resumeWindowState !== "minimized" && resumeWindowState !== "closed";

  useEffect(() => {
    if (isResumeVisible) {
      const fromMinimized = resumeExitIntentRef.current === "minimize";
      resumeControls.set(fromMinimized ? { opacity: 0, scale: 0.08, y: 260 } : { opacity: 0, scale: 0.92 });
      resumeControls.start({ opacity: 1, scale: 1, y: 0, transition: { duration: fromMinimized ? 0.32 : 0.22, ease: [0.16, 1, 0.3, 1] } });
    }
  }, [isResumeVisible]);

  const handleResumeClose = useCallback(async () => {
    resumeExitIntentRef.current = "close";
    await resumeControls.start({ opacity: 0, scale: 0.88, y: -12, transition: { duration: 0.18, ease: "easeIn" } });
    setIsResumeOpen(false);
    setResumeWindowState("normal");
  }, [resumeControls]);

  const handleResumeMinimize = useCallback(async () => {
    resumeExitIntentRef.current = "minimize";
    await resumeControls.start({ opacity: 0, scale: 0.06, y: 260, transition: { duration: 0.28, ease: [0.4, 0, 0.6, 1] } });
    setResumeWindowState("minimized");
  }, [resumeControls]);

  const handleResumeToggleMaximize = useCallback(() => {
    setResumeWindowState(s => (s === "maximized" ? "normal" : "maximized"));
  }, []);

  const handleOpenResume = useCallback(() => {
    if (window.innerWidth < 768) {
      window.open("/Andrew Li - Resume.pdf", "_blank", "noopener,noreferrer");
      return;
    }
    setIsResumeOpen(true);
    setResumeWindowState("normal");
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
      onContextMenu={handleContextMenu}
    >
      <AnimatePresence mode="sync">
        {wallpaper && (
          <motion.div
            key={wallpaper}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(/wallpapers/${wallpaper})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500"
        style={{ opacity: wallpaper ? 0.25 : 1 }}
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

      <div onContextMenu={(e) => e.stopPropagation()}>
        <Menubar
          light={light}
          onToggleTheme={toggleTheme}
          onOpenSearch={openSearch}
          onNavigate={setActiveTab}
          activeTab={activeTab}
          onOpenWallpaperPicker={openWallpaperPicker}
          wallpaper={wallpaper}
        />
      </div>

      {isVisible && (
        <motion.div
          className={WRAPPER_CLASS[windowState]}
          animate={controls}
          style={{ willChange: "opacity, transform" }}
          onContextMenu={(e) => e.stopPropagation()}
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
            onOpenWallpaperPicker={openWallpaperPicker}
          />
        </motion.div>
      )}

      {isResumeVisible && (
        <motion.div
          className={WRAPPER_CLASS[resumeWindowState] || WRAPPER_CLASS["normal"]}
          animate={resumeControls}
          style={{ willChange: "opacity, transform", zIndex: 10, pointerEvents: "none" }}
          onContextMenu={(e) => e.stopPropagation()}
        >
          <PDFWindow
            light={light}
            windowState={resumeWindowState}
            onClose={handleResumeClose}
            onMinimize={handleResumeMinimize}
            onToggleMaximize={handleResumeToggleMaximize}
          />
        </motion.div>
      )}

      {windowState !== "maximized" && (
        <div onContextMenu={(e) => e.stopPropagation()}>
          <Dock
            light={light}
            windowHidden={!isVisible}
            onRestore={handleRestore}
            onOpenResume={handleOpenResume}
          />
        </div>
      )}

      <CommandPalette
        isOpen={showSearch}
        onClose={closeSearch}
        onNavigate={tab => { setActiveTab(tab); closeSearch(); }}
        light={light}
      />

      <WallpaperPicker
        isOpen={showWallpaperPicker}
        wallpaper={wallpaper}
        onSelect={handleWallpaperSelect}
        onClose={() => setShowWallpaperPicker(false)}
        light={light}
      />

      <AnimatePresence>
        {contextMenu && (
          <motion.div
            key="ctx"
            className={`fixed z-[150] rounded-xl border overflow-hidden backdrop-blur-xl ${light
              ? "bg-white/95 border-black/[0.07] shadow-[0_4px_6px_rgba(0,0,0,0.04),0_12px_32px_rgba(0,0,0,0.12)]"
              : "bg-[#0f0f17]/96 border-white/[0.07] shadow-[0_4px_6px_rgba(0,0,0,0.3),0_12px_32px_rgba(0,0,0,0.65)]"
              }`}
            style={{ left: contextMenu.x, top: contextMenu.y, transformOrigin: "top left", minWidth: 196 }}
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.93 }}
            transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { setContextMenu(null); setShowWallpaperPicker(true); }}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-left transition-colors ${light ? "text-black/75 hover:bg-black/[0.05]" : "text-white/70 hover:bg-white/[0.06]"
                }`}
              style={{ fontFamily: "var(--font-sans)", fontSize: "12px" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
              </svg>
              Change Wallpaper…
            </button>
            {wallpaper && (
              <button
                onClick={() => { setContextMenu(null); handleWallpaperSelect(null); }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-left transition-colors ${light ? "text-black/40 hover:bg-black/[0.05]" : "text-white/30 hover:bg-white/[0.06]"
                  }`}
                style={{ fontFamily: "var(--font-sans)", fontSize: "12px" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Remove Wallpaper
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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
