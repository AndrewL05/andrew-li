import { useState } from "react";
import {
  Github,
  Linkedin,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Lock,
  Star,
  Plus,
} from "lucide-react";
import HomePage from "./pages/HomePage";
import ExperiencePage from "./pages/ExperiencePage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";

export type Tab = "home" | "experience" | "projects" | "contact";

const tabUrls: Record<Tab, string> = {
  home: "andrewli.dev",
  experience: "andrewli.dev/experience",
  projects: "andrewli.dev/projects",
  contact: "andrewli.dev/contact",
};

const tabs: { id: Tab; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const Browser = () => {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [isStarred, setIsStarred] = useState(false);

  const getStatusText = () => {
    switch (activeTab) {
      case "home":
        return "Ready";
      case "experience":
        return "4 roles";
      case "projects":
        return "6 projects";
      case "contact":
        return "";
    }
  };

  return (
    <div className="w-full max-w-5xl bg-[#292929] rounded-xl shadow-2xl overflow-hidden border border-[#3a3a3a] flex flex-col max-h-[95vh]">
      <div className="h-11 bg-[#202020] flex items-center justify-between px-4 border-b border-[#3a3a3a] shrink-0">
        <div className="flex items-center gap-2">
          <button className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 transition-colors" />
          <button className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#febc2e]/80 transition-colors" />
          <button className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#28c840]/80 transition-colors" />
        </div>

        <div className="flex items-center gap-1 flex-1 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 text-xs rounded-md transition-all ${activeTab === tab.id
                ? "bg-[#3a3a3a] text-white"
                : "text-[#888] hover:text-white hover:bg-[#333]"
                }`}
            >
              {tab.label}
            </button>
          ))}
          <button className="ml-1 p-1 text-[#666] hover:text-white hover:bg-[#333] rounded transition-colors">
            <Plus size={14} />
          </button>
        </div>

        <div className="w-[52px]" />
      </div>

      <div className="h-10 bg-[#292929] flex items-center gap-2 px-3 border-b border-[#3a3a3a] shrink-0">
        <div className="flex items-center gap-1">
          <button className="p-1.5 text-[#666] hover:text-white hover:bg-[#3a3a3a] rounded transition-colors">
            <ArrowLeft size={14} />
          </button>
          <button className="p-1.5 text-[#666] hover:text-white hover:bg-[#3a3a3a] rounded transition-colors">
            <ArrowRight size={14} />
          </button>
          <button className="p-1.5 text-[#666] hover:text-white hover:bg-[#3a3a3a] rounded transition-colors">
            <RotateCw size={14} />
          </button>
        </div>

        <div className="flex-1 flex items-center gap-2 bg-[#1a1a1a] rounded-md px-3 py-1.5 mx-2">
          <Lock size={12} className="text-[#28c840]" />
          <span className="text-xs text-[#888] flex-1 font-mono">
            {tabUrls[activeTab]}
          </span>
          <button
            onClick={() => setIsStarred(!isStarred)}
            className="text-[#666] hover:text-[#febc2e] transition-colors"
          >
            <Star
              size={12}
              fill={isStarred ? "#febc2e" : "none"}
              className={isStarred ? "text-[#febc2e]" : ""}
            />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <a
            href="https://github.com/AndrewL05"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-[#666] hover:text-white hover:bg-[#3a3a3a] rounded transition-colors"
          >
            <Github size={14} />
          </a>
          <a
            href="https://linkedin.com/in/andrew-li05"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-[#666] hover:text-white hover:bg-[#3a3a3a] rounded transition-colors"
          >
            <Linkedin size={14} />
          </a>
        </div>
      </div>

      <div className="bg-[#1a1a1a] flex-1 overflow-y-auto">
        {activeTab === "home" && <HomePage onNavigate={setActiveTab} />}
        {activeTab === "experience" && <ExperiencePage />}
        {activeTab === "projects" && <ProjectsPage />}
        {activeTab === "contact" && <ContactPage />}
      </div>

      <div className="h-6 bg-[#202020] flex items-center justify-between px-3 border-t border-[#3a3a3a] shrink-0">
        <span className="text-[10px] text-[#555]">{getStatusText()}</span>
        <span className="text-[10px] text-[#555]">andrewli.dev</span>
      </div>
    </div>
  );
};

export default Browser;
