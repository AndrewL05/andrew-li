import { useState, useEffect, useCallback } from "react";
import Browser from "../components/Browser";
import Menubar from "../components/Menubar";
import Dock from "../components/Dock";
import CommandPalette from "../components/CommandPalette";
import type { Tab } from "../components/Browser";

const Index = () => {
  const [light, setLight] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const toggleTheme = useCallback(() => setLight((l) => !l), []);
  const openSearch = useCallback(() => setShowSearch(true), []);
  const closeSearch = useCallback(() => setShowSearch(false), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch((s) => !s);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const bgColor = light ? "#f0ede8" : "#05050c";
  const gradient = light
    ? "radial-gradient(ellipse 80% 60% at 10% 80%, rgba(180,160,120,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 10%, rgba(140,120,180,0.1) 0%, transparent 60%)"
    : "radial-gradient(ellipse 80% 60% at 10% 80%, rgba(20,60,140,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 10%, rgba(80,20,160,0.12) 0%, transparent 60%)";

  return (
    <div
      className="relative h-full overflow-hidden transition-colors duration-300"
      style={{ background: bgColor }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: gradient, animation: "ambientDrift 60s ease-in-out infinite" }}
        aria-hidden
      />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.03 }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <filter id="os-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#os-grain)" />
      </svg>

      <Menubar
        light={light}
        onToggleTheme={toggleTheme}
        onOpenSearch={openSearch}
        onNavigate={setActiveTab}
        activeTab={activeTab}
      />

      <div className="absolute inset-0 pt-9 pb-16 flex items-center justify-center px-3 md:px-6">
        <Browser
          light={light}
          onToggleTheme={toggleTheme}
          activeTab={activeTab}
          onNavigate={setActiveTab}
          onOpenSearch={openSearch}
        />
      </div>

      <Dock light={light} />

      <CommandPalette
        isOpen={showSearch}
        onClose={closeSearch}
        onNavigate={(tab) => {
          setActiveTab(tab);
          closeSearch();
        }}
        light={light}
      />
    </div>
  );
};

export default Index;
