import { useState } from "react";
import { Github, Linkedin, FileText } from "lucide-react";

interface DockProps {
  light: boolean;
}

interface DockItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  href: string;
}

const Dock = ({ light }: DockProps) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const items: DockItem[] = [
    {
      id: "github",
      icon: <Github size={18} />,
      label: "GitHub",
      href: "https://github.com/AndrewL05",
    },
    {
      id: "linkedin",
      icon: <Linkedin size={18} />,
      label: "LinkedIn",
      href: "https://linkedin.com/in/andrew-li05",
    },
    {
      id: "resume",
      icon: <FileText size={18} />,
      label: "Resume",
      href: "/Andrew Li - Resume.pdf",
    },
  ];

  const dock = light
    ? "bg-black/10 border-black/10"
    : "bg-white/[0.07] border-white/10";
  const iconBase = light
    ? "bg-black/[0.06] border-black/10 text-black/60 hover:text-black/90 hover:bg-black/10"
    : "bg-white/[0.06] border-white/[0.08] text-white/50 hover:text-white hover:bg-white/10";

  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-50">
      <div
        className={`flex items-end gap-2 px-4 py-2 rounded-2xl border backdrop-blur-2xl shadow-2xl transition-colors duration-300 ${dock}`}
      >
        {items.map((item, idx) => {
          const isHovered = hovered === item.id;
          return (
            <div key={item.id} className="relative flex flex-col items-center">
              <div
                className={`absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono px-2 py-0.5 rounded whitespace-nowrap pointer-events-none transition-all duration-150 ${light ? "bg-black/80 text-white" : "bg-white/90 text-black"
                  } ${isHovered ? "opacity-100 -translate-y-0" : "opacity-0 translate-y-1"}`}
              >
                {item.label}
              </div>

              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-150 ${iconBase}`}
                style={{
                  transform: isHovered ? "scale(1.2) translateY(-4px)" : "scale(1) translateY(0)",
                }}
              >
                {item.icon}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dock;
