import { useRef, useCallback, useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import type { WindowState } from "./Browser";

type ResizeDir = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

interface PDFWindowProps {
  light: boolean;
  windowState: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
}

const PDFWindow = ({ light, windowState, onClose, onMinimize, onToggleMaximize }: PDFWindowProps) => {
  const [hasResized, setHasResized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const isMaximized = windowState === "maximized";
  const isNormal = windowState === "normal";

  const positionRef = useRef({ x: 0, y: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hasResizedRef = useRef(false);
  const explicitSizeRef = useRef<{ width: number; height: number } | null>(null);

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
    setIsDragging(true);

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
      setIsDragging(false);
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
    setIsDragging(true);

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
      setIsDragging(false);
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
      titleText: "text-[#3c3226]",
    }
    : {
      shell: "bg-[#0d0d16] border-white/[0.08]",
      titleBar: "bg-[#0a0a12] border-white/[0.06]",
      titleText: "text-white/50",
    };

  const wrapperClass = isMaximized || !isNormal
    ? "relative w-full h-full"
    : hasResized
      ? "relative"
      : "relative w-full max-w-3xl";

  const innerClass = isMaximized
    ? "w-full h-full rounded-none"
    : hasResized
      ? "w-full h-full rounded-2xl"
      : "w-full h-[75vh] md:h-[70vh] rounded-2xl";

  return (
    <div
      ref={wrapperRef}
      className={wrapperClass}
      style={{ willChange: "transform", pointerEvents: "auto" }}
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
            <button
              onClick={onToggleMaximize}
              className="w-3 h-3 rounded-full bg-[#28c840] flex items-center justify-center transition-opacity hover:opacity-90"
              title={isMaximized ? "Exit Full Screen" : "Full Screen"}
            >
              <span className="opacity-0 group-hover/tl:opacity-100 text-[7px] text-[#0a5e00] font-bold leading-none transition-opacity select-none">+</span>
            </button>
          </div>

          <span
            className={`absolute left-1/2 -translate-x-1/2 text-[11px] font-mono pointer-events-none ${c.titleText}`}
          >
            Resume
          </span>

          <a
            href="/Andrew_Li_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-1.5 rounded-lg transition-colors ${light ? "text-[#a89e8e] hover:text-[#3c3226] hover:bg-[#e8e2d8]" : "text-white/30 hover:text-white/80 hover:bg-white/[0.06]"}`}
            title="Open in new tab"
          >
            <ExternalLink size={13} />
          </a>
        </div>

        <div className="flex-1 overflow-hidden relative">
          {isDragging && (
            <div className="absolute inset-0 z-10" />
          )}
          <iframe
            src="/Andrew_Li_Resume.pdf"
            className="w-full h-full border-none"
            title="Resume"
          />
        </div>
      </div>
    </div>
  );
};

export default PDFWindow;
