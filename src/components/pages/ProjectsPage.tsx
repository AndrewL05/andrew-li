import { motion, type Variants } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";
import { LinkPreview } from "@/components/ui/link-preview";

const projects = [
  {
    name: "Intervue",
    description: "Voice-first mock interview platform with a real-time AI interviewer that interrupts, pushes back on vague answers, and scores communication quality not just whether tests pass. Supports technical, behavioral, and resume-based sessions with a live Monaco code editor, whiteboard, and evidence-tied feedbacks.",
    tech: ["TypeScript", "React", "Tailwind", "Python", "FastAPI", "MongoDB", "ElevenLabs", "Clerk", "Docker", "NGINX", "AWS S3", "Redis"],
    url: "www.intervue.org",
    github: "github.com/AndrewL05/Intervue_",
  },
  {
    name: "Parallax",
    description: "AI-driven decision platform that simulates long-term outcomes (up to 10 years) based on user inputs, combining ML predictions and LLM-generated narratives to deliver interactive, data-backed future scenarios.",
    tech: ["TypeScript", "React", "Tailwind", "D3.js", "Python", "FastAPI", "MongoDB", "Docker", "Stripe", "XGBoost", "Scikit-Learn", "NGINX"],
    url: "myparallax.vercel.app",
    github: "github.com/AndrewL05/Parallax",
  },
  {
    name: "SayLess",
    description: "AI meeting assistant that joins calls, speaks naturally, and generates transcripts",
    tech: ["TypeScript", "React", "Express.js", "MongoDB", "ElevenLabs", "Deepgram", "Gemini API", "WebSocket"],
    url: "sayless.nyc",
    github: "github.com/AndrewL05/SayLess",
  },
  {
    name: "StudySphere",
    description: "Collaborative study platform with real-time chat and AI assistant",
    tech: ["React", "PostgreSQL", "Express.js", "Node.js", "OpenRouter API"],
    url: "mystudysphere.netlify.app",
    github: "github.com/AndrewL05/StudySphere",
  },
  {
    name: "Investorly",
    description: "Investment portfolio dashboard for learning investing",
    tech: ["Python", "Flask", "Streamlit", "Docker", "Linux", "NGINX", "yFinance", "Groq"],
    url: "investorly.qingquanli.com",
    github: "github.com/AndrewL05/investorly",
    staticPreview: "/img/investorly.png",
  },
  {
    name: "Haunting Truths",
    description: "3D horror game — 1st place for Best Map Design and Best Beginner Project",
    tech: ["Godot", "GDScript", "C#", "3D Modeling"],
    github: "github.com/AndrewL05/game-jam-project",
  },
];

interface ProjectsPageProps {
  light: boolean;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

const ProjectsPage = ({ light }: ProjectsPageProps) => {
  const heading = light ? "text-[#1a1610]" : "text-white";
  const faint = light ? "text-[#a89e8e]" : "text-white/25";
  const card = light
    ? "bg-[#f0ebe2] border-[#ddd5c8] hover:border-[#c8bfb0]"
    : "bg-white/[0.03] border-white/[0.07] hover:border-white/[0.14]";
  const nameText = light ? "text-[#1a1610]" : "text-white/90";
  const descText = light ? "text-[#6b5e4e]" : "text-white/45";
  const iconColor = light ? "text-[#a89e8e] hover:text-[#1a1610]" : "text-white/25 hover:text-white/70";
  const chipBg = light
    ? "bg-[#efe9df] border-[#ddd5c8] text-[#8a7e6e]"
    : "bg-white/[0.04] border-white/[0.06] text-white/30";

  return (
    <div className="p-8 md:p-12">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={cardItem} className="flex items-baseline gap-3 mb-8">
          <h2
            className={`text-2xl ${heading}`}
            style={{ fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "-0.02em" }}
          >
            Projects
          </h2>
          <span
            className={`text-[11px] ${faint}`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {projects.length} projects
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={cardItem}
              className={`p-5 rounded-xl border transition-colors duration-200 flex flex-col ${card}`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3
                  className={`font-medium text-[14px] ${nameText}`}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {project.name}
                </h3>
                <div className="flex gap-2 ml-2 shrink-0">
                  {project.url && project.staticPreview ? (
                    <LinkPreview
                      url={`https://${project.url}`}
                      isStatic
                      imageSrc={project.staticPreview}
                      className={`transition-colors ${iconColor}`}
                    >
                      <ArrowUpRight size={14} />
                    </LinkPreview>
                  ) : project.url ? (
                    <LinkPreview
                      url={`https://${project.url}`}
                      className={`transition-colors ${iconColor}`}
                    >
                      <ArrowUpRight size={14} />
                    </LinkPreview>
                  ) : null}
                  <LinkPreview
                    url={`https://${project.github}`}
                    className={`transition-colors ${iconColor}`}
                  >
                    <Github size={14} />
                  </LinkPreview>
                </div>
              </div>

              <p
                className={`text-[13px] leading-relaxed mb-4 flex-1 ${descText}`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className={`text-[10px] px-2 py-0.5 rounded border ${chipBg}`}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectsPage;
