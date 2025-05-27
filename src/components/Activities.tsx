
import { Briefcase, Code } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Activities = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="activities" className="py-20 px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Activities
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Community involvement and continuous learning
          </p>
        </div>        
        <div className={`max-w-4xl mx-auto space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Brooklyn College CS Club Activity */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300">
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
            </div>
          </div>

          {/* CUNY Tech Prep Activity */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300">
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
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Activities;
