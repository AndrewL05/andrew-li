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

const CommandPalette = ({ isOpen, onClose, onNavigate }: CommandPaletteProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            key="palette"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[101] flex items-start justify-center pt-[18vh] px-4 pointer-events-none"
          >
            <div
              className="w-full max-w-lg pointer-events-auto rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.8)] border border-white/10 bg-[#111118]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.07]">
                <Search size={15} className="text-white/30 shrink-0" />
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
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none"
                  style={{ fontFamily: "var(--font-sans)" }}
                />
                <button onClick={onClose} className="text-white/20 hover:text-white/50 transition-colors">
                  <X size={14} />
                </button>
              </div>

              {!query.trim() && (
                <div className="py-8 flex flex-col items-center gap-4">
                  <div className="text-3xl font-medium tracking-tight select-none" style={{ fontFamily: "var(--font-display)" }}>
                    <span style={{ color: "#4285f4" }}>A</span>
                    <span style={{ color: "#ea4335" }}>n</span>
                    <span style={{ color: "#fbbc05" }}>d</span>
                    <span style={{ color: "#4285f4" }}>r</span>
                    <span style={{ color: "#34a853" }}>e</span>
                    <span style={{ color: "#ea4335" }}>w</span>
                    <span className="mx-1.5" />
                    <span style={{ color: "#4285f4" }}>L</span>
                    <span style={{ color: "#34a853" }}>i</span>
                  </div>
                  <div className="flex gap-2">
                    {(["home", "experience", "projects", "contact"] as Tab[]).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => { onNavigate(tab); onClose(); }}
                        className="px-3 py-1.5 text-xs text-white/40 bg-white/[0.05] hover:bg-white/[0.09] rounded-lg border border-white/[0.07] capitalize transition-colors"
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
                    <div className="px-4 py-6 text-sm text-white/30 text-center" style={{ fontFamily: "var(--font-sans)" }}>
                      No results for "{query}"
                    </div>
                  ) : (
                    Array.from(grouped.entries()).map(([label, entries]) => (
                      <div key={label}>
                        <div className="px-4 py-1.5 text-[10px] text-white/20 uppercase tracking-widest bg-white/[0.02]" style={{ fontFamily: "var(--font-mono)" }}>
                          {label}
                        </div>
                        {entries.map((entry) => (
                          <button
                            key={entry.id}
                            onClick={() => { onNavigate(entry.section); onClose(); }}
                            className="w-full text-left px-4 py-2.5 hover:bg-white/[0.05] transition-colors flex items-center gap-3"
                          >
                            <Search size={12} className="text-white/20 shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm text-white/80 truncate" style={{ fontFamily: "var(--font-sans)" }}>{entry.title}</p>
                              {entry.subtitle && (
                                <p className="text-xs text-white/30 truncate" style={{ fontFamily: "var(--font-sans)" }}>{entry.subtitle}</p>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              )}

              <div className="px-4 py-2 border-t border-white/[0.06] flex items-center gap-3">
                <span className="text-[10px] text-white/15 font-mono">↵ to navigate</span>
                <span className="text-[10px] text-white/15 font-mono">esc to close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
