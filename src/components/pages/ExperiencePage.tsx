import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LinkPreview } from "@/components/ui/link-preview";

const experiences = [
  {
    role: "Software Engineer Intern",
    company: "Mira Intel",
    period: "Feb – Apr 2026",
    points: [
      "Built a customer-facing inspection analytics dashboard using React, Recharts, and Tailwind to visualize drone CV model results including defect / damage type findings, structural risk insights, and statistics.",
      "Developed a FastAPI and ReportLab report generator exporting structured multi-page PDF inspection reports in under 1 second, replacing manual reporting workflows.",
    ],
    url: "https://miraintel.com",
  },
  {
    role: "Data Engineer Intern",
    company: "COI Energy",
    period: "Oct – Dec 2025",
    points: [
      "Engineered a Python ETL pipeline processing 4.3M+ energy consumption records, implementing anomaly detection and data interpolation to achieve 98% data quality for predictive modeling.",
      "Designed a Docker-based BigQuery emulator for local ETL testing, reducing development cycle time by 40%.",
    ],
    url: "https://coienergy.com",
    staticPreview: "/img/coi.png",
  },
  {
    role: "Software Engineer Intern",
    company: "Unadat",
    period: "Jul – Aug 2025",
    points: [
      "Led a team of 8 interns to revamp platform modules for 1,000+ users in an 8-week sprint.",
      "Built an AI document summarizer processing 800+ documents, reducing manual review time by 60%.",
      "Implemented GCP Cloud Storage solution, improving image asset retrieval speed by 35%.",
    ],
    url: "https://unadat.com",
  },
  {
    role: "Software Engineer Intern",
    company: "Soaper LLC",
    period: "Jul – Oct 2025",
    points: [
      "Rebuilt appointment scheduling system using TypeScript, React, and Tailwind CSS, improving page load performance by 45%.",
      "Built FastAPI endpoints with phone/email verification and optimized PostgreSQL schemas, reducing query latency by 30%.",
    ],
    url: "https://note.soaper.ai",
  },
  {
    role: "Software Developer",
    company: "Brooklyn College CS Club",
    period: "Oct 2024 – May 2025",
    points: [
      "Optimized club website performance using TypeScript, Next.js, and Tailwind, improving page load speed by 35%.",
      "Streamlined deployment pipeline with Docker and GitHub Actions, reducing deployment time by 40%.",
    ],
    url: "https://bccs.club",
  },
];

interface ExperiencePageProps {
  light: boolean;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

const ExperiencePage = ({ light }: ExperiencePageProps) => {
  const heading = light ? "text-[#1a1610]" : "text-white";
  const faint = light ? "text-[#a89e8e]" : "text-white/25";
  const card = light
    ? "bg-[#f0ebe2] border-[#ddd5c8] hover:border-[#c8bfb0]"
    : "bg-white/[0.03] border-white/[0.07] hover:border-white/[0.14]";
  const roleText = light ? "text-[#1a1610]" : "text-white/90";
  const companyText = light ? "text-[#6b5e4e] hover:text-[#1a1610]" : "text-white/40 hover:text-white/70";
  const period = light
    ? "bg-[#efe9df] border-[#ddd5c8] text-[#a89e8e]"
    : "bg-white/[0.04] border-white/[0.07] text-white/30";
  const bullet = light ? "text-[#c8bfb0]" : "text-white/20";
  const bulletText = light ? "text-[#6b5e4e]" : "text-white/45";

  return (
    <div className="p-8 md:p-12">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={cardItem} className="flex items-baseline gap-3 mb-8">
          <h2
            className={`text-2xl ${heading}`}
            style={{ fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "-0.02em" }}
          >
            Experience
          </h2>
          <span
            className={`text-[11px] ${faint}`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {experiences.length} roles
          </span>
        </motion.div>

        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              variants={cardItem}
              className={`p-5 rounded-xl border transition-colors duration-200 ${card}`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                <div>
                  <h3
                    className={`font-medium text-[14px] mb-0.5 ${roleText}`}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {exp.role}
                  </h3>
                  {exp.staticPreview ? (
                    <LinkPreview
                      url={exp.url}
                      isStatic
                      imageSrc={exp.staticPreview}
                      className={`text-[13px] transition-colors inline-flex items-center gap-1 ${companyText}`}
                    >
                      {exp.company}
                      <ArrowUpRight size={11} />
                    </LinkPreview>
                  ) : (
                    <LinkPreview
                      url={exp.url}
                      className={`text-[13px] transition-colors inline-flex items-center gap-1 ${companyText}`}
                    >
                      {exp.company}
                      <ArrowUpRight size={11} />
                    </LinkPreview>
                  )}
                </div>
                <span
                  className={`text-[11px] px-2.5 py-1 rounded-lg border shrink-0 ${period}`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-1.5">
                {exp.points.map((point, j) => (
                  <li
                    key={j}
                    className={`text-[13px] flex gap-2.5 leading-relaxed ${bulletText}`}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <span className={`shrink-0 mt-px ${bullet}`}>→</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ExperiencePage;
