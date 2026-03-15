import { Github, ArrowUpRight } from "lucide-react";
import { LinkPreview } from "@/components/ui/link-preview";

const projects = [
  {
    name: "Parallax",
    description:
      "AI life simulator exploring alternate futures with interactive visualizations",
    tech: ["TypeScript", "React", "Tailwind CSS", "D3.js", "Python", "FastAPI", "MongoDB", "Docker", "Nginx", "Stripe", "Pandas", "Scikit-Learn"],
    url: "myparallax.vercel.app",
    github: "github.com/AndrewL05/Parallax",
  },
  {
    name: "SayLess",
    description:
      "AI meeting assistant that joins calls, speaks naturally, and generates transcripts",
    tech: ["TypeScript", "React", "Tailwind CSS", "Express.js", "MongoDB", "ElevenLabs", "Deepgram", "Gemini API", "WebSocket"],
    url: "sayless.nyc",
    github: "github.com/AndrewL05/SayLess",
  },
  {
    name: "StudySphere",
    description:
      "Collaborative study platform with real-time chat and AI assistant",
    tech: ["React", "PostgreSQL", "Express.js", "Node.js"],
    url: "mystudysphere.netlify.app",
    github: "github.com/AndrewL05/StudySphere",
  },
  {
    name: "Investorly",
    description: "Investment portfolio dashboard for learning investing",
    tech: ["Python", "Flask", "Streamlit", "Docker", "Linux", "Nginx", "yFinance", "Groq"],
    url: "investorly.qingquanli.com",
    github: "github.com/AndrewL05/investorly",
    staticPreview: "/img/investorly.png",
  },
  {
    name: "Haunting Truths",
    description:
      "3D horror game built with Godot. 1st place for Best Map Design and Best Beginner Project",
    tech: ["Godot", "GDScript", "C#", "3D Modeling"],
    github: "github.com/AndrewL05/game-jam-project",
  }
];

interface ProjectsPageProps {
  light: boolean;
}

const ProjectsPage = ({ light }: ProjectsPageProps) => {
  return (
    <div className="p-8 md:p-12">
      <h2 className={`text-2xl font-light mb-8 ${light ? "text-[#3c3226]" : "text-white"}`}>Projects</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <div
            key={i}
            className={`p-5 rounded-lg border transition-colors group ${light
              ? "bg-[#f5f0e8] border-[#d9d0c3] hover:border-[#c4b8a8]"
              : "bg-[#222] border-[#333] hover:border-[#444]"
              }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className={`font-medium ${light ? "text-[#3c3226]" : "text-white"}`}>{project.name}</h3>
              <div className="flex gap-2">
                {project.url && project.staticPreview ? (
                  <LinkPreview
                    url={`https://${project.url}`}
                    isStatic={true}
                    imageSrc={project.staticPreview}
                    className={`transition-colors ${light ? "text-[#a89e8e] hover:text-[#3c3226]" : "text-[#555] hover:text-white"}`}
                  >
                    <ArrowUpRight size={14} />
                  </LinkPreview>
                ) : project.url ? (
                  <LinkPreview
                    url={`https://${project.url}`}
                    className={`transition-colors ${light ? "text-[#a89e8e] hover:text-[#3c3226]" : "text-[#555] hover:text-white"}`}
                  >
                    <ArrowUpRight size={14} />
                  </LinkPreview>
                ) : null}
                <LinkPreview
                  url={`https://${project.github}`}
                  className={`transition-colors ${light ? "text-[#a89e8e] hover:text-[#3c3226]" : "text-[#555] hover:text-white"}`}
                >
                  <Github size={14} />
                </LinkPreview>
              </div>
            </div>
            <p className={`text-sm mb-4 ${light ? "text-[#6b5e4e]" : "text-[#777]"}`}>{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className={`text-xs px-2 py-0.5 rounded border ${light ? "text-[#6b5e4e] bg-[#efe9df] border-[#d9d0c3]" : "text-[#666] bg-[#1a1a1a] border-transparent"}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
