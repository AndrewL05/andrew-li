import { motion } from "framer-motion";
import type { Tab } from "../Browser";

interface HomePageProps {
  onNavigate: (tab: Tab) => void;
  light: boolean;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

const techs = [
  "React", "TypeScript", "Python", "Java", "HTML/CSS", "SQL", "Bash",
  "Node.js", "Express.js", "FastAPI", "Flask", "Tailwind CSS", "Next.js",
  "PostgreSQL", "MongoDB", "Git", "Docker", "Linux", "AWS", "GCP",
  "Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "Keras", "XGBoost", "Matplotlib"
];

const HomePage = ({ onNavigate, light }: HomePageProps) => {
  const text = light ? "text-[#1a1610]" : "text-white";
  const muted = light ? "text-[#6b5e4e]" : "text-white/45";
  const faint = light ? "text-[#a89e8e]" : "text-white/25";
  const divider = light ? "border-[#e2dbd0]" : "border-white/[0.07]";
  const chipBg = light
    ? "bg-[#efe9df] border-[#ddd5c8] text-[#6b5e4e]"
    : "bg-white/[0.04] border-white/[0.07] text-white/40";
  const btnPrimary = light
    ? "bg-[#1a1610] text-[#f5f0e8] hover:bg-[#3c3226]"
    : "bg-white text-[#0d0d16] hover:bg-white/90";
  const btnOutline = light
    ? "border-[#d9d0c3] text-[#3c3226] hover:bg-[#efe9df]"
    : "border-white/[0.12] text-white/70 hover:bg-white/[0.05]";

  return (
    <div className="p-8 md:p-12 min-h-full">
      <motion.div
        className="max-w-2xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          variants={item}
          className={`mb-2 leading-none ${text}`}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
          }}
        >
          Andrew Li
        </motion.h1>

        <motion.p
          variants={item}
          className={`text-base mb-5 tracking-wide ${muted}`}
          style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
        >
          Full-Stack Developer
        </motion.p>

        <motion.p
          variants={item}
          className={`leading-relaxed mb-8 text-[15px] ${muted}`}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Computer Science student at Brooklyn College building software. Currently a Data Science Fellow at CUNY Tech Prep, with experience in full-stack development, data engineering, and AI/ML applications.
        </motion.p>

        <motion.div variants={item} className="flex gap-3 mb-12">
          <button
            onClick={() => onNavigate("projects")}
            className={`px-5 py-2 text-[13px] font-medium rounded-lg transition-colors ${btnPrimary}`}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            View Projects
          </button>
          <a
            href="/Andrew_Li_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-5 py-2 border text-[13px] font-medium rounded-lg transition-colors ${btnOutline}`}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Resume
          </a>
        </motion.div>

        <motion.div variants={item} className={`border-t pt-8 ${divider}`}>
          <p
            className={`text-[10px] uppercase tracking-[0.15em] mb-4 ${faint}`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Technologies
          </p>
          <div className="flex flex-wrap gap-2">
            {techs.map((t) => (
              <span
                key={t}
                className={`text-[11px] px-2.5 py-1 rounded-md border ${chipBg}`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;
