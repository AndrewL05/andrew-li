import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { LinkPreview } from './ui/link-preview';

const Experience = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="experience" className="py-20 px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          </p>
        </div>

        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
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
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                <div className="flex items-start space-x-4 mb-4 md:mb-0">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                    <Briefcase size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Software Developer</h3>
                    <p className="text-blue-400 font-semibold">Brooklyn College CS Club</p>
                    <div className="flex items-center text-gray-400 text-sm mt-1">
                      <MapPin size={14} className="mr-1" />
                      <span>Brooklyn, NY</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-400 bg-slate-700/30 px-3 py-2 rounded-lg">
                  <Calendar size={16} className="mr-2" />
                  <span className="text-sm font-medium">October 2024 – Present</span>
                </div>
              </div>

              <div className="space-y-4">
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 mt-1">•</span>
                    <span>
                      Assisted in building and optimizing the club's{' '}
                      <LinkPreview
                        url="https://bccs.club"
                        className="text-purple-300 hover:text-blue-100 underline decoration-blue-300/50 hover:decoration-blue-100 underline-offset-2 font-medium cursor-pointer transition-colors duration-200"
                      >
                        [official website]
                      </LinkPreview>, which serves{' '}
                      <span className="text-cyan-400 font-semibold">1000+ computer science students</span>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 mt-1">•</span>
                    <span>
                      Developed scalable backend features and{' '}
                      <span className="text-blue-400 font-medium">RESTful APIs</span>, using{' '}
                      <span className="text-green-400 font-medium">Java, Spring Boot, and PostgreSQL</span>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 mt-1">•</span>
                    <span>
                      Built dynamic, responsive UIs with{' '}
                      <span className="text-blue-400 font-medium">TypeScript, Next.js, and Tailwind CSS</span>{' '}
                      enhancing user experience.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="mt-6 pt-4 border-t border-slate-600">
                  <div className="flex flex-wrap gap-2">
                    {['Java', 'Spring Boot', 'PostgreSQL', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Docker', 'GitHub Actions', 'Linux'].map((tech) => (
                      <span
                        key={tech}
                        className="bg-slate-700/50 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-slate-600 hover:border-blue-500/50 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
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

export default Experience;