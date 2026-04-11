import { useState } from "react";
import { Github, Linkedin, FileText, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DockProps {
  light: boolean;
  windowHidden?: boolean;
  onRestore?: () => void;
}

interface DockItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  dot?: boolean;
}

const Dock = ({ light, windowHidden = false, onRestore }: DockProps) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const staticItems: DockItem[] = [
    { id: "github",   icon: <Github size={18} />,   label: "GitHub",   href: "https://github.com/AndrewL05" },
    { id: "linkedin", icon: <Linkedin size={18} />, label: "LinkedIn", href: "https://linkedin.com/in/andrew-li05" },
    { id: "resume",   icon: <FileText size={18} />, label: "Resume",   href: "/Andrew Li - Resume.pdf" },
  ];

  const dock = light ? "bg-black/10 border-black/10" : "bg-white/[0.07] border-white/10";
  const iconBase = light
    ? "bg-black/[0.06] border-black/10 text-black/60 hover:text-black/90 hover:bg-black/10"
    : "bg-white/[0.06] border-white/[0.08] text-white/50 hover:text-white hover:bg-white/10";
  const restoreBase = light
    ? "bg-[#efe9df] border-[#ddd5c8] text-[#6b5e4e] hover:text-[#1a1610] hover:bg-[#e8e2d8]"
    : "bg-white/[0.08] border-white/[0.12] text-white/60 hover:text-white hover:bg-white/[0.14]";
  const separatorColor = light ? "bg-black/15" : "bg-white/10";
  const tooltipBg = light ? "bg-black/80 text-white" : "bg-white/90 text-black";
  const dotColor = light ? "bg-[#1a1610]" : "bg-white/70";

  const renderItem = (item: DockItem, idx: number, showSeparator: boolean) => {
    const isHovered = hovered === item.id;
    const baseClass = item.onClick ? restoreBase : iconBase;

    return (
      <div key={item.id} className="relative flex flex-col items-center">
        <div
          className={`absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono px-2 py-0.5 rounded whitespace-nowrap pointer-events-none transition-all duration-150 ${tooltipBg} ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
        >
          {item.label}
        </div>

        {showSeparator && (
          <div className={`absolute -left-3 top-1/2 -translate-y-1/2 w-px h-5 ${separatorColor}`} />
        )}

        {item.onClick ? (
          <button
            onClick={item.onClick}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-150 ${baseClass}`}
            style={{ transform: isHovered ? "scale(1.2) translateY(-4px)" : "scale(1) translateY(0)" }}
          >
            {item.icon}
          </button>
        ) : (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-150 ${baseClass}`}
            style={{ transform: isHovered ? "scale(1.2) translateY(-4px)" : "scale(1) translateY(0)" }}
          >
            {item.icon}
          </a>
        )}

        {item.dot && (
          <div className={`absolute -bottom-1.5 w-1 h-1 rounded-full ${dotColor}`} />
        )}
      </div>
    );
  };

  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-50">
      <div className={`flex items-end gap-2 px-4 py-2 rounded-2xl border backdrop-blur-2xl shadow-2xl transition-colors duration-300 ${dock}`}>
        <AnimatePresence>
          {windowHidden && onRestore && (
            <motion.div
              key="restore"
              initial={{ opacity: 0, scale: 0.5, width: 0 }}
              animate={{ opacity: 1, scale: 1, width: "auto", transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ opacity: 0, scale: 0.5, width: 0, transition: { duration: 0.18 } }}
              className="overflow-hidden"
            >
              {renderItem(
                { id: "restore", icon: <Monitor size={18} />, label: "Portfolio", onClick: onRestore, dot: true },
                -1,
                false
              )}
              <div className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-px h-5 ${separatorColor}`} />
            </motion.div>
          )}
        </AnimatePresence>

        {staticItems.map((item, idx) =>
          renderItem(item, idx, idx === 2)
        )}
      </div>
    </div>
  );
};

export default Dock;
