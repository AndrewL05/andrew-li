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

const ExperiencePage = () => {
  return (
    <div className="p-8 md:p-12">
      <h2 className="text-2xl font-light text-white mb-8">Experience</h2>
      <div className="space-y-8">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="p-5 bg-[#222] rounded-lg border border-[#333] hover:border-[#444] transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
              <div>
                <h3 className="text-white font-medium">{exp.role}</h3>
                {exp.staticPreview ? (
                  <LinkPreview
                    url={exp.url}
                    isStatic={true}
                    imageSrc={exp.staticPreview}
                    className="text-sm text-[#888] hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    {exp.company}
                    <ArrowUpRight size={12} />
                  </LinkPreview>
                ) : (
                  <LinkPreview
                    url={exp.url}
                    className="text-sm text-[#888] hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    {exp.company}
                    <ArrowUpRight size={12} />
                  </LinkPreview>
                )}
              </div>
              <span className="text-xs text-[#555] font-mono bg-[#1a1a1a] px-2 py-1 rounded">
                {exp.period}
              </span>
            </div>
            <ul className="space-y-1.5">
              {exp.points.map((point, j) => (
                <li key={j} className="text-sm text-[#777] flex gap-2">
                  <span className="text-[#444]">→</span>
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
