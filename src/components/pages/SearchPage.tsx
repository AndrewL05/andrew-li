import { useMemo, useRef, useEffect, useState } from "react";
import { Search } from "lucide-react";
import type { Tab } from "../Browser";
import { searchIndex, type SearchEntry } from "@/data/searchIndex";

interface SearchPageProps {
  onNavigate: (tab: Tab) => void;
  light: boolean;
}

const SearchPage = ({ onNavigate, light }: SearchPageProps) => {
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

  const t = light
    ? {
      searchBg: "bg-[#f5f0e8]",
      searchBorder: "border-[#d9d0c3]",
      searchFocus: "focus-within:border-[#c4b8a8] focus-within:shadow-md",
      icon: "text-[#a89e8e]",
      input: "text-[#3c3226] placeholder-[#a89e8e]",
      dropBg: "bg-[#f5f0e8]",
      dropBorder: "border-[#d9d0c3]",
      groupBg: "bg-[#efe9df]",
      groupText: "text-[#8a7e6e]",
      resultHover: "hover:bg-[#efe9df]",
      title: "text-[#3c3226]",
      subtitle: "text-[#8a7e6e]",
      noResults: "text-[#8a7e6e]",
      btnBg: "bg-[#efe9df]",
      btnText: "text-[#3c3226]",
      btnBorder: "hover:border-[#c4b8a8] hover:shadow-sm",
    }
    : {
      searchBg: "bg-[#222]",
      searchBorder: "border-[#333]",
      searchFocus: "focus-within:border-[#555]",
      icon: "text-[#666]",
      input: "text-white placeholder-[#555]",
      dropBg: "bg-[#222]",
      dropBorder: "border-[#333]",
      groupBg: "bg-[#1a1a1a]",
      groupText: "text-[#555]",
      resultHover: "hover:bg-[#2a2a2a]",
      title: "text-white",
      subtitle: "text-[#666]",
      noResults: "text-[#666]",
      btnBg: "bg-[#303134]",
      btnText: "text-[#e8eaed]",
      btnBorder: "hover:border-[#555] hover:shadow-sm",
    };

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
        <div className={`flex items-center ${t.searchBg} border ${t.searchBorder} rounded-full px-4 py-3 ${t.searchFocus} transition-colors`}>
          <Search size={18} className={`${t.icon} mr-3 shrink-0`} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search portfolio..."
            className={`bg-transparent text-sm w-full outline-none ${t.input}`}
          />
        </div>

        {query.trim() && (
          <div className={`absolute top-full left-0 right-0 mt-1 ${t.dropBg} border ${t.dropBorder} rounded-lg overflow-hidden shadow-xl z-10 max-h-72 overflow-y-auto`}>
            {results.length === 0 ? (
              <div className={`px-4 py-3 text-sm ${t.noResults}`}>
                No results found
              </div>
            ) : (
              Array.from(grouped.entries()).map(([label, entries]) => (
                <div key={label}>
                  <div className={`px-4 py-1.5 text-[10px] ${t.groupText} uppercase tracking-wider ${t.groupBg}`}>
                    {label}
                  </div>
                  {entries.map((entry) => (
                    <button
                      key={entry.id}
                      onClick={() => onNavigate(entry.section)}
                      className={`w-full text-left px-4 py-2.5 ${t.resultHover} transition-colors flex items-center gap-3`}
                    >
                      <Search size={14} className={`${t.icon} shrink-0`} />
                      <div className="min-w-0">
                        <p className={`text-sm ${t.title} truncate`}>
                          {entry.title}
                        </p>
                        {entry.subtitle && (
                          <p className={`text-xs ${t.subtitle} truncate`}>
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
            className={`px-4 py-2 ${t.btnBg} text-sm ${t.btnText} rounded ${t.btnBorder} transition-all border border-transparent`}
          >
            View Experience
          </button>
          <button
            onClick={() => onNavigate("experience")}
            className={`px-4 py-2 ${t.btnBg} text-sm ${t.btnText} rounded ${t.btnBorder} transition-all border border-transparent`}
          >
            View Projects
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
