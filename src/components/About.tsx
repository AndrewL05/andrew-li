import { GraduationCap } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const About = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-20 px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 py-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            About Me
          </h2>
        </div>

        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700">
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                I'm a Computer Science major at Brooklyn College (Class of
                2027), passionate about building innovative software solutions
                that solve real-world problems. My journey in technology started
                with curiosity about how things work and has evolved into a deep
                commitment to creating meaningful digital experiences.
              </p>

              <p>
                I thrive in collaborative environments where I can contribute to
                projects that push the boundaries of what's possible. Whether
                it's developing full-stack web applications, creating immersive
                gaming experiences, or exploring new technologies, I'm always
                eager to learn and grow.
              </p>

              <p>
                When I'm not coding, you can find me exploring the latest tech
                trends or working on personal projects that challenge me to
                think differently about problem-solving.
              </p>

              <div
                className={`flex items-center justify-center mb-6 transition-all duration-1000 delay-400 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                      <GraduationCap size={20} className="text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-blue-400 font-semibold">
                        Brooklyn College
                      </p>
                      <p className="text-gray-300 text-sm">
                        B.S. Computer Science | Data Science Minor • Class of
                        2027
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
