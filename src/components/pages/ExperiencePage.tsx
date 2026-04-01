import { ArrowUpRight } from "lucide-react";
import { LinkPreview } from "@/components/ui/link-preview";

const experiences = [
  {
    role: "Software Engineer Intern",
    company: "Mira Intel",
    period: "Feb – April 2026",
    points: [
      "Built a customer-facing inspection analytics dashboard using React, Recharts, and Tailwind to visualize drone CV model results including defect / damage type findings, structural risk insights, and statistics.",
      "Developed a FastAPI and ReportLab report generator exporting structured multi-page PDF inspection reports in under 1 second, replacing manual reporting workflows.",
    ],
    url: "https://miraintel.com"
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
      "Built FastAPI endpoints with phone/email verification and optimized PostgreSQL schemas, reducing query latency by 30% across patient and physician portals.",
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

const ExperiencePage = ({ light }: ExperiencePageProps) => {
  return (
    <div className="p-8 md:p-12">
      <h2 className={`text-2xl font-light mb-8 ${light ? "text-[#3c3226]" : "text-white"}`}>Experience</h2>
      <div className="space-y-8">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className={`p-5 rounded-lg border transition-colors ${light
              ? "bg-[#f5f0e8] border-[#d9d0c3] hover:border-[#c4b8a8]"
              : "bg-[#222] border-[#333] hover:border-[#444]"
              }`}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
              <div>
                <h3 className={`font-medium ${light ? "text-[#3c3226]" : "text-white"}`}>{exp.role}</h3>
                {exp.staticPreview ? (
                  <LinkPreview
                    url={exp.url}
                    isStatic={true}
                    imageSrc={exp.staticPreview}
                    className={`text-sm transition-colors inline-flex items-center gap-1 ${light ? "text-[#6b5e4e] hover:text-[#3c3226]" : "text-[#888] hover:text-white"}`}
                  >
                    {exp.company}
                    <ArrowUpRight size={12} />
                  </LinkPreview>
                ) : (
                  <LinkPreview
                    url={exp.url}
                    className={`text-sm transition-colors inline-flex items-center gap-1 ${light ? "text-[#6b5e4e] hover:text-[#3c3226]" : "text-[#888] hover:text-white"}`}
                  >
                    {exp.company}
                    <ArrowUpRight size={12} />
                  </LinkPreview>
                )}
              </div>
              <span className={`text-xs font-mono px-2 py-1 rounded ${light ? "text-[#8a7e6e] bg-[#efe9df]" : "text-[#555] bg-[#1a1a1a]"}`}>
                {exp.period}
              </span>
            </div>
            <ul className="space-y-1.5">
              {exp.points.map((point, j) => (
                <li key={j} className={`text-sm flex gap-2 ${light ? "text-[#6b5e4e]" : "text-[#777]"}`}>
                  <span className={light ? "text-[#c4b8a8]" : "text-[#444]"}>→</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperiencePage;
