import { Briefcase, Code } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { GlowingEffect } from '@/components/ui/glowing-effect';

const Activities = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="activities" className="py-20 px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Activities
          </h2>
        </div>        
        <div className={`max-w-4xl mx-auto space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
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
                <h3 className="text-2xl font-bold text-white">Brooklyn College CS Club</h3>
              </div>
              
              <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600">
                <p className="text-blue-400 font-semibold text-lg">Club Coordinator</p>
                <p className="text-gray-300 mt-2">
                  Assisted in organizing events, including workshops, guest lectures, and hackathons for 300+ members.
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
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 mr-4">
                  <Code size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">CUNY Tech Prep</h3>
              </div>
              
              <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600">
                <p className="text-purple-400 font-semibold text-lg">Upcoming Software Engineer Fellow</p>
                <p className="text-gray-300 mt-2">
                  Selected for a competitive year-long software engineering fellowship program focused on industry-relevant skills. 
                  Gaining hands-on experience with full-stack development, database design, and professional software development practices 
                  through mentorship and collaborative projects.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="bg-slate-600/50 text-purple-400 px-3 py-1 rounded-full text-sm font-medium border border-slate-500">
                    Full-Stack Development
                  </span>
                  <span className="bg-slate-600/50 text-purple-400 px-3 py-1 rounded-full text-sm font-medium border border-slate-500">
                    Professional Mentorship
                  </span>
                  <span className="bg-slate-600/50 text-purple-400 px-3 py-1 rounded-full text-sm font-medium border border-slate-500">
                    Industry Best Practices
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