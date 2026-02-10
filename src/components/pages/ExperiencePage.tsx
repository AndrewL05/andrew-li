import { ArrowUpRight } from "lucide-react";
import { LinkPreview } from "@/components/ui/link-preview";

const experiences = [
  {
    role: "Data Engineer Intern",
    company: "COI Energy",
    period: "Oct – Dec 2025",
    points: [
      "Engineered a Python ETL pipeline processing 4.3M+ energy consumption records, implementing anomaly detection and data interpolation to achieve 98% data quality for predictive modeling.",
      "Designed Docker-based BigQuery emulator reducing dev cycle time by 40%",
    ],
    url: "https://coienergy.com",
    staticPreview: "/img/coi.png",
  },
  {
    role: "Software Engineer Intern",
    company: "Unadat",
    period: "Jul – Aug 2025",
    points: [
      "Led team of 8 interns to revamp platform for 1,000+ users",
      "Built AI document summarizer reducing review time by 60%",
      "Implemented GCP Cloud Storage improving retrieval speed by 35%",
    ],
    url: "https://unadat.com",
  },
  {
    role: "Full Stack Developer Intern",
    company: "Soaper LLC",
    period: "Jul – Oct 2025",
    points: [
      "Rebuilt scheduling system improving load performance by 45%",
      "Optimized PostgreSQL reducing query latency by 40%",
    ],
    url: "https://note.soaper.ai",
  },
  {
    role: "Software Developer",
    company: "Brooklyn College CS Club",
    period: "Oct 2024 – May 2025",
    points: [
      "Optimized club website improving load speed by 35%",
      "Streamlined CI/CD with Docker and GitHub Actions, reducing deployment time by 40%",
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
