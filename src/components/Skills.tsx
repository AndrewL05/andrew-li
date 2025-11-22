import { Code, Settings, Server, Wrench, Globe, BarChart3 } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const skillCategories = [
  {
    title: "Frontend",
    icon: Code,
    skills: ["React", "TypeScript", "JavaScript", "Next.js", "Tailwind CSS"],
    color: "from-blue-500 to-purple-500",
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      "Java",
      "Python",
      "C/C++",
      "PostgreSQL",
      "MySQL",
      "Express.js",
      "Flask",
      "FastAPI",
      "Spring",
      "PHP",
      "MongoDB",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "DevOps",
    icon: Settings,
    skills: ["Docker", "CI/CD", "Linux"],
    color: "from-blue-400 to-cyan-400",
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Git", "Clerk", "Stripe", "Jira", "Linear", "Godot"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Data Science",
    icon: BarChart3,
    skills: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Scikit-Learn",
      "TensorFlow",
    ],
    color: "from-green-500 to-emerald-500",
  },
];

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="py-20 px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 py-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="relative group"
              style={{ animationDelay: `${categoryIndex * 200}ms` }}
            >
              {/* Category Container */}
              <div className="relative bg-slate-800/60 backdrop-blur-lg border border-slate-700/50 rounded-3xl p-8 hover:border-slate-600/70 transition-all duration-500 overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                {/* Header */}
                <div className="relative z-10 flex items-center mb-6">
                  <div
                    className={`p-3 rounded-2xl bg-gradient-to-r ${category.color} mr-4 shadow-lg`}
                  >
                    <category.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skills Tags */}
                <div className="relative z-10 flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-slate-700/60 hover:bg-slate-600/80 border border-slate-600/50 hover:border-slate-500 rounded-xl text-gray-300 hover:text-white font-medium text-sm transition-all duration-300 cursor-default"
                      style={{
                        animationDelay: `${
                          categoryIndex * 200 + skillIndex * 100
                        }ms`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
