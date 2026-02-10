import { Tab } from "../Browser";

interface HomePageProps {
  onNavigate: (tab: Tab) => void;
  light: boolean;
}

const HomePage = ({ onNavigate, light }: HomePageProps) => {
  return (
    <div className="p-8 md:p-12">
      <div className="max-w-2xl">
        <h1 className={`text-4xl md:text-5xl font-light mb-4 ${light ? "text-[#3c3226]" : "text-white"}`}>
          Andrew Li
        </h1>
        <p className={`text-xl mb-6 ${light ? "text-[#6b5e4e]" : "text-[#888]"}`}>Full-Stack Developer</p>
        <p className={`leading-relaxed mb-8 ${light ? "text-[#8a7e6e]" : "text-[#666]"}`}>
          Computer Science student at Brooklyn College building software. Currently a Data Science Fellow at CUNY Tech
          Prep, with experience in full-stack development, data engineering, and
          AI applications.
        </p>

        <div className="flex gap-3 mb-12">
          <button
            onClick={() => onNavigate("projects")}
            className={`px-5 py-2 text-sm font-medium rounded-md transition-colors ${light
              ? "bg-[#3c3226] text-[#ede8de] hover:bg-[#5a4d3e]"
              : "bg-white text-[#1a1a1a] hover:bg-[#e5e5e5]"
            }`}
          >
            View Projects
          </button>
          <a
            href="/Andrew Li - Resume.pdf"
            target="_blank"
            className={`px-5 py-2 border text-sm font-medium rounded-md transition-colors ${light
              ? "border-[#d9d0c3] text-[#3c3226] hover:bg-[#efe9df]"
              : "border-[#3a3a3a] text-white hover:bg-[#292929]"
            }`}
          >
            Resume
          </a>
        </div>

        <div className={`border-t pt-8 ${light ? "border-[#e2dbd0]" : "border-[#292929]"}`}>
          <p className={`text-xs uppercase tracking-wider mb-4 ${light ? "text-[#a89e8e]" : "text-[#555]"}`}>
            Technologies
          </p>
          <p className={`text-sm ${light ? "text-[#6b5e4e]" : "text-[#666]"}`}>
            React · TypeScript · Python · Java · Node.js · FastAPI · Flask · SQL · PostgreSQL · MongoDB
            · Docker · AWS · GCP · Linux · Git
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
