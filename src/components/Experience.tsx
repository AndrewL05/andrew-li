import {
  Briefcase,
  Calendar,
  MapPin,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { LinkPreview } from "./ui/link-preview";

interface Experience {
  title: string;
  company: string;
  location: string;
  date: string;
  description: string;
  achievements: string[];
  technologies: string[];
  companyUrl?: string;
  projectUrl?: string;
}

const Experience = () => {
  const { ref, isVisible } = useScrollAnimation();

  const experiences: Experience[] = [
    {
      title: "Software Developer Intern",
      company: "COI Energy",
      location: "Brooklyn, NY",
      date: "October 2025 – December 2025",
      description: "",
      achievements: [],
      technologies: [],
      companyUrl: "https://coienergy.com",
    },
    {
      title: "Software Engineer Intern",
      company: "Unadat",
      location: "New York, NY",
      date: "July 2025 – August 2025",
      description: "",
      achievements: [
        "Led a team of 8 interns as PM + SWE to revamp platform modules for 1,000+ daily active users in an 8-week sprint.",
        "Engineered a GCP Cloud Storage solution to manage 2,000+ image assets, improving retrieval speed by 35%.",
        "Built an AI summarizer processing 800+ docs/week, reducing review time by 60% and serving summaries in <300ms.",
      ],
      technologies: [
        "Java",
        "JavaScript",
        "PHP",
        "MySQL",
        "Google Cloud Platform",
        "jQuery",
      ],
      companyUrl: "https://unadat.com",
    },
    {
      title: "Full Stack Developer Intern",
      company: "Soaper LLC",
      location: "New York, NY",
      date: "July 2025 – October 2025",
      description: "",
      achievements: [
        "Reduced latency by migrating the appointment scheduling and patient portal to TypeScript, React.js, and Tailwind CSS, improving page performance by 45% and enhancing UX for 500+ active users.",
        "Built FastAPI endpoints for appointment scheduling, reducing booking errors by 30% and handling 2,000+ requests/month.",
        "Created and optimized PostgreSQL schemas for 1,500+ patient records, decreasing query latency by 40%.",
      ],
      technologies: [
        "TypeScript",
        "React.js",
        "Python",
        "FastAPI",
        "PostgreSQL",
      ],
      companyUrl: "https://note.soaper.ai/",
    },
    {
      title: "Software Developer",
      company: "Brooklyn College CS Club",
      location: "Brooklyn, NY",
      date: "October 2024 – May 2025",
      description: "",
      achievements: [
        "Maintained club website serving 1,000+ CS students, boosting page load speed by 35% with TypeScript, Next.js, and Tailwind.",
        "Contributed to projects, including an AI Chatbot and RESTful APIs, using Java, Spring Boot, and PostgreSQL.",
        "Reduced deployment time by 40% through automation with Docker, GitHub Actions, and Linux.",
      ],
      technologies: [
        "Java",
        "Spring Boot",
        "PostgreSQL",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "Docker",
        "GitHub Actions",
        "Linux",
      ],
      companyUrl: "https://bccs.club",
    },
  ];

  const getTechColor = (tech: string): string => {
    const colors: { [key: string]: string } = {
      Java: "text-orange-400 border-orange-500/50",
      JavaScript: "text-yellow-400 border-yellow-500/50",
      TypeScript: "text-blue-400 border-blue-500/50",
      "React.js": "text-cyan-400 border-cyan-500/50",
      "Next.js": "text-green-200 border-slate-400/50",
      Python: "text-green-400 border-green-500/50",
      "Spring Boot": "text-green-400 border-green-500/50",
      PostgreSQL: "text-blue-300 border-blue-400/50",
      MySQL: "text-orange-300 border-orange-400/50",
      Docker: "text-blue-400 border-blue-500/50",
      "Tailwind CSS": "text-cyan-300 border-cyan-400/50",
      PHP: "text-purple-400 border-purple-500/50",
      FastAPI: "text-teal-400 border-teal-500/50",
      "Google Cloud Platform": "text-red-400 border-red-500/50",
      "GitHub Actions": "text-gray-300 border-gray-400/50",
      Linux: "text-yellow-300 border-yellow-400/50",
      jQuery: "text-blue-300 border-blue-400/50",
    };
    return colors[tech] || "text-blue-400 border-blue-500/50";
  };

  return (
    <section id="experience" className="py-20 px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 py-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Experience
          </h2>
        </div>

        <div
          className={`max-w-4xl mx-auto space-y-8 transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="relative bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300 group"
            >
              <GlowingEffect
                disabled={false}
                glow={true}
                proximity={150}
                spread={60}
                borderWidth={5}
                movementDuration={1.5}
                className="absolute inset-0 rounded-2xl"
              />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                  <div className="flex items-start space-x-4 mb-4 md:mb-0">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">
                      <Briefcase size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-100 transition-colors duration-300">
                        {experience.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        {experience.companyUrl ? (
                          <LinkPreview
                            url={experience.companyUrl}
                            className="text-blue-400 hover:text-blue-300 font-semibold underline decoration-blue-300/50 hover:decoration-blue-100 underline-offset-2 cursor-pointer transition-colors duration-200"
                          >
                            {experience.company}
                          </LinkPreview>
                        ) : (
                          <p className="text-blue-400 font-semibold">
                            {experience.company}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center text-gray-400 text-sm mt-1">
                        <MapPin size={14} className="mr-1" />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-400 bg-slate-700/30 px-3 py-2 rounded-lg shrink-0">
                    <Calendar size={16} className="mr-2" />
                    <span className="text-center text-sm font-medium">
                      {experience.date}
                    </span>
                  </div>
                </div>

                {experience.description && (
                  <div className="mb-6">
                    <p className="text-gray-300 text-base leading-relaxed">
                      {experience.description}
                    </p>
                  </div>
                )}

                {experience.achievements &&
                  experience.achievements.length > 0 && (
                    <div className="space-y-4 mb-6">
                      <ul className="space-y-3 text-gray-300">
                        {experience.achievements.map(
                          (achievement, achievementIndex) => (
                            <li
                              key={achievementIndex}
                              className="flex items-start"
                            >
                              <span className="text-cyan-400 mr-3 mt-1 font-bold">
                                •
                              </span>
                              <span className="leading-relaxed">
                                {achievement.includes("official website") &&
                                experience.projectUrl ? (
                                  <>
                                    {achievement.split("official website")[0]}
                                    <LinkPreview
                                      url={experience.projectUrl}
                                      className="text-purple-300 hover:text-blue-100 underline decoration-blue-300/50 hover:decoration-blue-100 underline-offset-2 font-medium cursor-pointer transition-colors duration-200"
                                    >
                                      official website
                                    </LinkPreview>
                                    {achievement.split("official website")[1]}
                                  </>
                                ) : (
                                  achievement
                                )}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                <div className="mt-6 pt-4 border-t border-slate-600">
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`bg-slate-700/50 px-3 py-1 rounded-full text-sm font-medium border hover:bg-slate-600/50 transition-all duration-300 ${getTechColor(
                          tech
                        )}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
