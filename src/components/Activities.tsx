import { BarChart3, Briefcase, Calendar, Code } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const Activities = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="activities" className="py-20 px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 py-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Activities
          </h2>
        </div>
        <div
          className={`max-w-4xl mx-auto space-y-8 transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300">
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
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 mr-4">
                  <Briefcase size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Brooklyn College CS Club
                </h3>
              </div>

              <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600">
                <p className="text-blue-400 font-semibold text-lg">
                  Club Coordinator
                </p>
                <p className="text-gray-300 mt-2">
                  Assisted in organizing events, including workshops, guest
                  lectures, and hackathons for 300+ members.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="bg-slate-600/50 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-slate-500">
                    Event Organization
                  </span>
                  <span className="bg-slate-600/50 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-slate-500">
                    Community Building
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300">
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
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 mr-4">
                  <BarChart3 size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  CUNY Tech Prep
                </h3>
              </div>

              <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                  <p className="text-blue-400 font-semibold text-lg">
                    Data Science Fellow
                  </p>
                  <div className="flex items-center text-gray-400 bg-slate-600/30 px-3 py-1 rounded-lg mt-2 sm:mt-0">
                    <Calendar size={14} className="mr-2" />
                    <span className="text-sm font-medium">
                      July 2025 – June 2026
                    </span>
                  </div>
                </div>

                <p className="text-gray-300 mt-2">
                  Selected for a competitive year-long data science fellowship
                  program focusing on Python-based data analysis, machine
                  learning, and artificial intelligence. Gaining hands-on
                  experience with data management, visualization, supervised
                  learning techniques, and building AI systems including RAG
                  applications and fine-tuning models.
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="bg-slate-600/50 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-slate-500">
                    Python
                  </span>
                  <span className="bg-slate-600/50 text-green-400 px-3 py-1 rounded-full text-sm font-medium border border-slate-500">
                    Machine Learning
                  </span>
                  <span className="bg-slate-600/50 text-purple-400 px-3 py-1 rounded-full text-sm font-medium border border-slate-500">
                    Data Visualization
                  </span>
                  <span className="bg-slate-600/50 text-orange-400 px-3 py-1 rounded-full text-sm font-medium border border-slate-500">
                    Pandas/NumPy
                  </span>
                  <span className="bg-slate-600/50 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium border border-slate-500">
                    TensorFlow
                  </span>
                  <span className="bg-slate-600/50 text-red-400 px-3 py-1 rounded-full text-sm font-medium border border-slate-500">
                    Scikit-Learn
                  </span>
                  <span className="bg-slate-600/50 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium border border-slate-500">
                    Jupyter Notebooks
                  </span>
                  <span className="bg-slate-600/50 text-pink-400 px-3 py-1 rounded-full text-sm font-medium border border-slate-500">
                    RAG Systems
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activities;
