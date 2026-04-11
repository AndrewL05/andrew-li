import { useMemo, useRef, useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Tab } from "./Browser";
import { searchIndex, type SearchEntry } from "@/data/searchIndex";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: Tab) => void;
  light: boolean;
}

const CommandPalette = ({ isOpen, onClose, onNavigate, light }: CommandPaletteProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const c = light
    ? {
      backdrop: "bg-black/30",
      shell: "bg-[#f5f0e8] border-[#d9d0c3] shadow-[0_24px_80px_rgba(0,0,0,0.2)]",
      divider: "border-[#e2dbd0]",
      icon: "text-[#a89e8e]",
      input: "text-[#1a1610] placeholder-[#b0a898]",
      closeBtn: "text-[#c8bfb0] hover:text-[#6b5e4e]",
      quickBtn: "text-[#6b5e4e] bg-[#efe9df] hover:bg-[#e8e2d8] border-[#ddd5c8]",
      groupLabel: "text-[#b0a898] bg-[#ede8de]",
      resultHover: "hover:bg-black/[0.04]",
      resultIcon: "text-[#c8bfb0]",
      resultTitle: "text-[#1a1610]",
      resultSubtitle: "text-[#a89e8e]",
      empty: "text-[#a89e8e]",
      footerText: "text-[#c8bfb0]",
    }
    : {
      backdrop: "bg-black/60",
      shell: "bg-[#111118] border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.8)]",
      divider: "border-white/[0.07]",
      icon: "text-white/30",
      input: "text-white placeholder-white/25",
      closeBtn: "text-white/20 hover:text-white/50",
      quickBtn: "text-white/40 bg-white/[0.05] hover:bg-white/[0.09] border-white/[0.07]",
      groupLabel: "text-white/20 bg-white/[0.02]",
      resultHover: "hover:bg-white/[0.05]",
      resultIcon: "text-white/20",
      resultTitle: "text-white/80",
      resultSubtitle: "text-white/30",
      empty: "text-white/30",
      footerText: "text-white/15",
    };

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return searchIndex.filter((e) => e.keywords.includes(q));
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, SearchEntry[]>();
    for (const entry of results) {
      const group = map.get(entry.sectionLabel) || [];
      group.push(entry);
      map.set(entry.sectionLabel, group);
    }
    return map;
  }, [results]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12, ease: "linear" }}
            className={`fixed inset-0 z-[100] ${c.backdrop}`}
            style={{ willChange: "opacity" }}
            onClick={onClose}
          />

          <motion.div
            key="palette"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[101] flex items-start justify-center pt-[18vh] px-4 pointer-events-none"
            style={{ willChange: "opacity, transform" }}
          >
            <div
              className={`w-full max-w-lg pointer-events-auto rounded-2xl overflow-hidden border transition-colors duration-300 ${c.shell}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`flex items-center gap-3 px-4 py-3 border-b ${c.divider}`}>
                <Search size={15} className={`${c.icon} shrink-0`} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") onClose();
                    if (e.key === "Enter" && results.length > 0) {
                      onNavigate(results[0].section);
                      onClose();
                    }
                  }}
                  placeholder="Search portfolio..."
                  className={`flex-1 bg-transparent text-sm outline-none ${c.input}`}
                  style={{ fontFamily: "var(--font-sans)" }}
                />
                <button onClick={onClose} className={`transition-colors ${c.closeBtn}`}>
                  <X size={14} />
                </button>
              </div>

              {!query.trim() && (
                <div className="py-8 flex flex-col items-center gap-4">
                  <div className="text-3xl font-medium tracking-tight select-none" style={{ fontFamily: "var(--font-display)" }}>
                    <span style={{ color: "#5a9cf5" }}>A</span>
                    <span style={{ color: "#e8705a" }}>n</span>
                    <span style={{ color: "#e8a84e" }}>d</span>
                    <span style={{ color: "#5a9cf5" }}>r</span>
                    <span style={{ color: "#3aad8f" }}>e</span>
                    <span style={{ color: "#e8705a" }}>w</span>
                    <span className="mx-1.5" />
                    <span style={{ color: "#5a9cf5" }}>L</span>
                    <span style={{ color: "#3aad8f" }}>i</span>
                  </div>
                  <div className="flex gap-2">
                    {(["home", "experience", "projects", "contact"] as Tab[]).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => { onNavigate(tab); onClose(); }}
                        className={`px-3 py-1.5 text-xs rounded-lg border capitalize transition-colors ${c.quickBtn}`}
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {query.trim() && (
                <div className="max-h-72 overflow-y-auto">
                  {results.length === 0 ? (
                    <div className={`px-4 py-6 text-sm text-center ${c.empty}`} style={{ fontFamily: "var(--font-sans)" }}>
                      No results for "{query}"
                    </div>
                  ) : (
                    Array.from(grouped.entries()).map(([label, entries]) => (
                      <div key={label}>
                        <div className={`px-4 py-1.5 text-[10px] uppercase tracking-widest ${c.groupLabel}`} style={{ fontFamily: "var(--font-mono)" }}>
                          {label}
                        </div>
                        {entries.map((entry) => (
                          <button
                            key={entry.id}
                            onClick={() => { onNavigate(entry.section); onClose(); }}
                            className={`w-full text-left px-4 py-2.5 transition-colors flex items-center gap-3 ${c.resultHover}`}
                          >
                            <Search size={12} className={`${c.resultIcon} shrink-0`} />
                            <div className="min-w-0">
                              <p className={`text-sm truncate ${c.resultTitle}`} style={{ fontFamily: "var(--font-sans)" }}>{entry.title}</p>
                              {entry.subtitle && (
                                <p className={`text-xs truncate ${c.resultSubtitle}`} style={{ fontFamily: "var(--font-sans)" }}>{entry.subtitle}</p>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              )}

              <div className={`px-4 py-2 border-t flex items-center gap-3 ${c.divider}`}>
                <span className={`text-[10px] font-mono ${c.footerText}`}>↵ to navigate</span>
                <span className={`text-[10px] font-mono ${c.footerText}`}>esc to close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
