import { useEffect, useRef, useState, useCallback } from "react";
import { Sun, Moon, Check, Search } from "lucide-react";
import type { Tab } from "./Browser";

interface MenubarProps {
  light: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onNavigate: (tab: Tab) => void;
  activeTab: Tab;
}

type OpenMenu = "view" | "navigate" | null;

const NAV_ITEMS: { id: Tab; label: string; shortcut: string }[] = [
  { id: "home", label: "Home", shortcut: "1" },
  { id: "experience", label: "Experience", shortcut: "2" },
  { id: "projects", label: "Projects", shortcut: "3" },
  { id: "contact", label: "Contact", shortcut: "4" },
];

const Menubar = ({ light, onToggleTheme, onOpenSearch, onNavigate, activeTab }: MenubarProps) => {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const menubarRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = useCallback((menu: OpenMenu) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpenMenu(menu);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setOpenMenu(null), 120);
  }, []);

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menubarRef.current && !menubarRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpenMenu(null); return; }
      if (openMenu === "navigate") {
        const tabByKey: Record<string, Tab> = { "1": "home", "2": "experience", "3": "projects", "4": "contact" };
        if (tabByKey[e.key]) {
          e.preventDefault();
          onNavigate(tabByKey[e.key]);
        }
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [openMenu, onNavigate]);

  const c = light
    ? {
      bar: "bg-white/70 border-black/10 text-[#1a1610]",
      muted: "text-black/45",
      menuBtn: "hover:bg-black/[0.06] rounded px-2 py-0.5",
      menuBtnActive: "bg-black/[0.08] rounded px-2 py-0.5",
      badge: "border-black/15 text-black/50 hover:bg-black/[0.06]",
      dropdown: "bg-white border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.15)]",
      item: "hover:bg-black/[0.05] text-[#1a1610]",
      itemMuted: "text-black/35",
      separator: "border-black/[0.08]",
      check: "text-[#1a1610]",
    }
    : {
      bar: "bg-black/50 border-white/[0.06] text-white",
      muted: "text-white/40",
      menuBtn: "hover:bg-white/[0.07] rounded px-2 py-0.5",
      menuBtnActive: "bg-white/[0.10] rounded px-2 py-0.5",
      badge: "border-white/10 text-white/35 hover:bg-white/[0.07]",
      dropdown: "bg-[#111118] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]",
      item: "hover:bg-white/[0.06] text-white/80",
      itemMuted: "text-white/25",
      separator: "border-white/[0.07]",
      check: "text-white/70",
    };

  const DropdownItem = ({
    label,
    shortcut,
    onClick,
    checked,
  }: {
    label: string;
    shortcut?: string;
    onClick: () => void;
    checked?: boolean;
  }) => (
    <button
      onClick={() => { onClick(); setOpenMenu(null); }}
      className={`w-full flex items-center gap-2 px-3 py-1.5 text-left transition-colors ${c.item}`}
      style={{ fontFamily: "var(--font-sans)", fontSize: "12px" }}
    >
      <span className={`w-3 shrink-0 ${c.check}`}>
        {checked && <Check size={11} />}
      </span>
      <span className="flex-1">{label}</span>
      {shortcut && (
        <span className={`text-[11px] ${c.itemMuted}`} style={{ fontFamily: "var(--font-mono)" }}>
          {shortcut}
        </span>
      )}
    </button>
  );

  return (
    <div
      ref={menubarRef}
      className={`absolute top-0 left-0 right-0 z-50 h-9 flex items-center justify-between px-3 border-b backdrop-blur-xl transition-colors duration-300 ${c.bar}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="flex items-center gap-1">
        <span className="font-semibold text-xs tracking-wide px-2">Andrew Li</span>

        {/*<span className={`text-[11px] px-2 py-0.5 ${c.muted}`}>Andrew Li</span>*/}

        <div
          className="relative hidden md:block"
          onMouseEnter={() => openDropdown("view")}
          onMouseLeave={scheduleClose}
        >
          <button
            className={`text-[12px] transition-colors ${openMenu === "view" ? c.menuBtnActive : c.menuBtn} ${c.muted} hover:text-current`}
          >
            View
          </button>
          {openMenu === "view" && (
            <div className={`absolute top-full left-0 mt-1 w-52 rounded-xl border overflow-hidden ${c.dropdown}`}>
              <DropdownItem
                label="Toggle Theme"
                shortcut={light ? "→ Dark" : "→ Light"}
                onClick={onToggleTheme}
              />
              <DropdownItem
                label="Search Portfolio"
                shortcut="CTRL/⌘K"
                onClick={onOpenSearch}
              />
            </div>
          )}
        </div>

        <div
          className="relative hidden md:block"
          onMouseEnter={() => openDropdown("navigate")}
          onMouseLeave={scheduleClose}
        >
          <button
            className={`text-[12px] transition-colors ${openMenu === "navigate" ? c.menuBtnActive : c.menuBtn} ${c.muted} hover:text-current`}
          >
            Navigate
          </button>
          {openMenu === "navigate" && (
            <div className={`absolute top-full left-0 mt-1 w-44 rounded-xl border overflow-hidden ${c.dropdown}`}>
              {NAV_ITEMS.map(({ id, label, shortcut }) => (
                <DropdownItem
                  key={id}
                  label={label}
                  shortcut={shortcut}
                  checked={activeTab === id}
                  onClick={() => onNavigate(id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => { onOpenSearch(); setOpenMenu(null); }}
          className={`flex items-center gap-1.5 text-[10px] font-mono border rounded px-1.5 py-0.5 transition-colors ${c.badge}`}
          title="Open command palette"
        >
          <Search size={10} />
          CTRL/⌘K
        </button>
        <button
          onClick={onToggleTheme}
          className={`transition-colors ${c.muted} hover:text-current`}
          title="Toggle theme"
        >
          {light ? <Moon size={13} /> : <Sun size={13} />}
        </button>
        <span className={`text-[11px] font-mono ${c.muted}`}>{time}</span>
      </div>
    </div>
  );
};

export default Menubar;
