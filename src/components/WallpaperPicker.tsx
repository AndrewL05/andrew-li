import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export const WALLPAPERS = [
  { id: "cat", file: "cat.webp", label: "Cat" },
  { id: "green", file: "green.webp", label: "Forest" },
  { id: "macos-dark", file: "macos-dark.webp", label: "macOS Dark" },
  { id: "macos-normal", file: "macos-normal.webp", label: "macOS" },
  { id: "mountains", file: "mountains.webp", label: "Mountains" },
  { id: "planet", file: "planet.webp", label: "Planet" },
  { id: "po", file: "po.webp", label: "Po" },
  { id: "red", file: "red.webp", label: "Red" },
];

const WALLPAPER_KEY = "portfolio-wallpaper";

export function loadWallpaper(): string | null {
  try { return localStorage.getItem(WALLPAPER_KEY); }
  catch { return null; }
}

export function saveWallpaper(file: string | null) {
  try {
    if (file) localStorage.setItem(WALLPAPER_KEY, file);
    else localStorage.removeItem(WALLPAPER_KEY);
  } catch { }
}

function useWindowSize() {
  const [size, setSize] = useState(() => ({
    w: typeof window !== "undefined" ? window.innerWidth : 1280,
    h: typeof window !== "undefined" ? window.innerHeight : 800,
  }));
  useEffect(() => {
    const update = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);
  return size;
}

interface WallpaperPickerProps {
  isOpen: boolean;
  wallpaper: string | null;
  onSelect: (file: string | null) => void;
  onClose: () => void;
  light: boolean;
}

const WallpaperPicker = ({ isOpen, wallpaper, onSelect, onClose, light }: WallpaperPickerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { w, h } = useWindowSize();
  const isMobile = w < 768;
  const isLandscape = w > h;
  const isTinyPhone = w < 380;
  const cols = isTinyPhone ? 2 : 3;
  const isBottomSheet = isMobile && !isLandscape;
  const menubarH = isMobile ? 52 : 46;
  const dockClearance = 84;

  const panelStyle: React.CSSProperties = isBottomSheet
    ? {
      left: 8,
      right: 8,
      bottom: dockClearance,
      paddingBottom: "env(safe-area-inset-bottom, 0px)",
    }
    : { right: 12, top: menubarH };
  const maxH = isBottomSheet
    ? h - dockClearance - menubarH - 12
    : h - menubarH - 16;

  const origin = isBottomSheet ? "bottom center" : "top right";
  const hidden = isBottomSheet
    ? { opacity: 0, scale: 0.95, y: 12 }
    : { opacity: 0, scale: 0.93, y: -6 };

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const c = light
    ? {
      panel: "bg-white/95 border-black/[0.08] shadow-[0_4px_6px_rgba(0,0,0,0.04),0_16px_48px_rgba(0,0,0,0.14),0_32px_64px_rgba(0,0,0,0.06)]",
      title: "text-black/40",
      close: "text-black/30 hover:text-black/65 hover:bg-black/[0.06]",
      none: "border-black/12 hover:bg-black/[0.04]",
      noneText: "text-black/32",
      selectedRing: "ring-[2.5px] ring-offset-[2px] ring-offset-white ring-black/55",
      hoverRing: "hover:ring-[2px] hover:ring-black/18",
    }
    : {
      panel: "bg-[#0f0f17]/96 border-white/[0.07] shadow-[0_4px_6px_rgba(0,0,0,0.3),0_16px_48px_rgba(0,0,0,0.7),0_32px_64px_rgba(0,0,0,0.3)]",
      title: "text-white/30",
      close: "text-white/22 hover:text-white/55 hover:bg-white/[0.07]",
      none: "border-white/10 hover:bg-white/[0.05]",
      noneText: "text-white/18",
      selectedRing: "ring-[2.5px] ring-offset-[2px] ring-offset-[#0f0f17] ring-white/55",
      hoverRing: "hover:ring-[2px] hover:ring-white/22",
    };

  const gridColsClass = cols === 2 ? "grid-cols-2" : "grid-cols-3";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          className="fixed z-[110]"
          style={{ ...panelStyle, transformOrigin: origin }}
          initial={hidden}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={hidden}
          transition={{ duration: 0.17, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className={`rounded-2xl border backdrop-blur-2xl flex flex-col overflow-hidden ${c.panel}`}
            style={{
              minWidth: isBottomSheet ? undefined : 232,
              maxHeight: maxH,
            }}
          >
            <div className="flex items-center justify-between px-3.5 pt-3 pb-1.5 shrink-0">
              <span
                className={`text-[9px] font-mono tracking-[0.14em] uppercase select-none ${c.title}`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Wallpaper
              </span>
              <button
                onClick={onClose}
                className={`flex items-center justify-center rounded-full w-4 h-4 transition-colors ${c.close}`}
                aria-label="Close wallpaper picker"
              >
                <X size={10} />
              </button>
            </div>

            <div
              className={`px-3 pb-3 grid gap-[6px] overflow-y-auto ${gridColsClass}`}
              style={{
                scrollbarWidth: "none",
              }}
            >
              <button
                onClick={() => onSelect(null)}
                className={`relative rounded-[7px] border-2 border-dashed flex items-center justify-center transition-all duration-150 cursor-pointer ${c.none} ${wallpaper === null ? c.selectedRing : ""}`}
                style={{ aspectRatio: "16 / 9" }}
                title="No wallpaper"
              >
                <span className={`text-[8px] font-mono uppercase tracking-wide select-none ${c.noneText}`}>
                  None
                </span>
              </button>

              {WALLPAPERS.map((wp) => {
                const selected = wallpaper === wp.file;
                return (
                  <button
                    key={wp.id}
                    onClick={() => onSelect(wp.file)}
                    className={`relative rounded-[7px] overflow-hidden transition-all duration-150 cursor-pointer ${c.hoverRing} ${selected ? c.selectedRing : ""}`}
                    style={{ aspectRatio: "16 / 9" }}
                    title={wp.label}
                  >
                    <img
                      src={`/wallpapers/${wp.file}`}
                      alt={wp.label}
                      className="absolute inset-0 w-full h-full"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                      loading="lazy"
                      decoding="async"
                    />
                    {selected && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div
                          className="flex items-center justify-center rounded-full bg-white"
                          style={{ width: 16, height: 16 }}
                        >
                          <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden>
                            <path
                              d="M1 3L3 5L7 1"
                              stroke="#000"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WallpaperPicker;
