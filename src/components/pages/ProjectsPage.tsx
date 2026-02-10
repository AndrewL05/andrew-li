import { Github, ArrowUpRight } from "lucide-react";
import { LinkPreview } from "@/components/ui/link-preview";

const projects = [
  {
    name: "SayLess",
    description:
      "AI meeting assistant that joins calls, speaks naturally, and generates transcripts",
    tech: ["TypeScript", "React", "Node.js", "MongoDB", "ElevenLabs"],
    url: "sayless.nyc",
    github: "github.com/AndrewL05/SayLess",
  },
  {
    name: "Parallax",
    description:
      "AI life simulator exploring alternate futures with interactive visualizations",
    tech: ["TypeScript", "React", "Python", "FastAPI", "TensorFlow"],
    github: "github.com/AndrewL05/Parallax",
  },
  {
    name: "StudySphere",
    description:
      "Collaborative study platform with real-time chat and AI assistant",
    tech: ["React", "Supabase", "PostgreSQL", "Node.js"],
    url: "mystudysphere.netlify.app",
    github: "github.com/AndrewL05/StudySphere",
    staticPreview: "/img/studysphere.png",
  },
  {
    name: "Investorly",
    description: "Investment portfolio dashboard for learning investing",
    tech: ["Python", "Streamlit", "Flask", "Docker"],
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
  },
  {
    name: "DementoCare",
    description:
      "Chrome extension for dementia patients with facial recognition and real-time alerts",
    tech: ["Python", "Flask", "JavaScript", "WebSockets"],
    github: "github.com/AndrewL05/hackru-project",
  },
];

const ProjectsPage = () => {
  return (
    <div className="p-8 md:p-12">
      <h2 className="text-2xl font-light text-white mb-8">Projects</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <div
            key={i}
            className="p-5 bg-[#222] rounded-lg border border-[#333] hover:border-[#444] transition-colors group"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-white font-medium">{project.name}</h3>
              <div className="flex gap-2">
                {project.url && project.staticPreview ? (
                  <LinkPreview
                    url={`https://${project.url}`}
                    isStatic={true}
                    imageSrc={project.staticPreview}
                    className="text-[#555] hover:text-white transition-colors"
                  >
                    <ArrowUpRight size={14} />
                  </LinkPreview>
                ) : project.url ? (
                  <LinkPreview
                    url={`https://${project.url}`}
                    className="text-[#555] hover:text-white transition-colors"
                  >
                    <ArrowUpRight size={14} />
                  </LinkPreview>
                ) : null}
                <LinkPreview
                  url={`https://${project.github}`}
                  className="text-[#555] hover:text-white transition-colors"
                >
                  <Github size={14} />
                </LinkPreview>
              </div>
            </div>
            <p className="text-sm text-[#777] mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs text-[#666] bg-[#1a1a1a] px-2 py-0.5 rounded"
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
