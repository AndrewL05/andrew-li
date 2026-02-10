import { Tab } from "../Browser";

interface HomePageProps {
  onNavigate: (tab: Tab) => void;
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  return (
    <div className="p-8 md:p-12">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
          Andrew Li
        </h1>
        <p className="text-xl text-[#888] mb-6">Full-Stack Developer</p>
        <p className="text-[#666] leading-relaxed mb-8">
          Computer Science student at Brooklyn College building software. Currently a Data Science Fellow at CUNY Tech
          Prep, with experience in full-stack development, data engineering, and
          AI applications.
        </p>

        <div className="flex gap-3 mb-12">
          <button
            onClick={() => onNavigate("projects")}
            className="px-5 py-2 bg-white text-[#1a1a1a] text-sm font-medium rounded-md hover:bg-[#e5e5e5] transition-colors"
          >
            View Projects
          </button>
          <a
            href="/Andrew Li - Resume.pdf"
            target="_blank"
            className="px-5 py-2 border border-[#3a3a3a] text-white text-sm font-medium rounded-md hover:bg-[#292929] transition-colors"
          >
            Resume
          </a>
        </div>

        <div className="border-t border-[#292929] pt-8">
          <p className="text-xs text-[#555] uppercase tracking-wider mb-4">
            Technologies
          </p>
          <p className="text-sm text-[#666]">
            React · TypeScript · Python · Java · Node.js · FastAPI · Flask · SQL · PostgreSQL · MongoDB
            · Docker · AWS · GCP · Linux · Git
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
