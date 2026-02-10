import { useMemo, useRef, useEffect, useState } from "react";
import { Search } from "lucide-react";
import type { Tab } from "../Browser";
import { searchIndex, type SearchEntry } from "@/data/searchIndex";

interface SearchPageProps {
  onNavigate: (tab: Tab) => void;
}

const SearchPage = ({ onNavigate }: SearchPageProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
    <div className="flex flex-col items-center pt-[15vh] px-4 min-h-full">
      <h1 className="text-5xl font-medium mb-8 tracking-tight select-none">
        <span style={{ color: "#4285f4" }}>A</span>
        <span style={{ color: "#ea4335" }}>n</span>
        <span style={{ color: "#fbbc05" }}>d</span>
        <span style={{ color: "#4285f4" }}>r</span>
        <span style={{ color: "#34a853" }}>e</span>
        <span style={{ color: "#ea4335" }}>w</span>
        <span className="mx-2" />
        <span style={{ color: "#4285f4" }}>L</span>
        <span style={{ color: "#34a853" }}>i</span>
      </h1>

      <div className="w-full max-w-xl relative">
        <div className="flex items-center bg-[#222] border border-[#333] rounded-full px-4 py-3 focus-within:border-[#555] transition-colors">
          <Search size={18} className="text-[#666] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search portfolio..."
            className="bg-transparent text-white text-sm w-full outline-none placeholder-[#555]"
          />
        </div>

        {query.trim() && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-[#222] border border-[#333] rounded-lg overflow-hidden shadow-xl z-10 max-h-72 overflow-y-auto">
            {results.length === 0 ? (
              <div className="px-4 py-3 text-sm text-[#666]">
                No results found
              </div>
            ) : (
              Array.from(grouped.entries()).map(([label, entries]) => (
                <div key={label}>
                  <div className="px-4 py-1.5 text-[10px] text-[#555] uppercase tracking-wider bg-[#1a1a1a]">
                    {label}
                  </div>
                  {entries.map((entry) => (
                    <button
                      key={entry.id}
                      onClick={() => onNavigate(entry.section)}
                      className="w-full text-left px-4 py-2.5 hover:bg-[#2a2a2a] transition-colors flex items-center gap-3"
                    >
                      <Search size={14} className="text-[#555] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm text-white truncate">
                          {entry.title}
                        </p>
                        {entry.subtitle && (
                          <p className="text-xs text-[#666] truncate">
                            {entry.subtitle}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {!query.trim() && (
        <div className="flex gap-3 mt-8">
          <button
            onClick={() => onNavigate("projects")}
            className="px-4 py-2 bg-[#303134] text-sm text-[#e8eaed] rounded hover:border hover:border-[#555] hover:shadow-sm transition-all border border-transparent"
          >
            View Experience
          </button>
          <button
            onClick={() => onNavigate("experience")}
            className="px-4 py-2 bg-[#303134] text-sm text-[#e8eaed] rounded hover:border hover:border-[#555] hover:shadow-sm transition-all border border-transparent"
          >
            View Projects
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
