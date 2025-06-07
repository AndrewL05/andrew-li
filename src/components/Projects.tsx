import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Meteors } from '@/components/ui/meteors';

const projects = [
  {
    title: "StudySphere",
    description: "A full-stack study platform built for collaborative learning. Features real-time chat, note sharing with upvotes/comments, and an integrated AI study assistant.",
    tech: ["React.js", "Supabase", "PostgreSQL", "Node.js", "Express.js"],
    url: "https://github.com/AndrewL05/StudySphere",
    stats: "150+ user interactions simulated during testing",
    gradient: "from-purple-600 to-blue-600",
    delay: "0ms"
  },
  {
    title: "Haunting Truths",
    description: "An atmospheric 3D horror game developed using Godot Engine. Winner of 1st place for Best Map Design and Best Beginner Project in Game Jam.",
    tech: ["Godot Engine", "GDScript", "C#", "3D Modeling"],
    url: "https://github.com/AndrewL05/game-jam-project",
    stats: "Game Jam winner",
    gradient: "from-red-600 to-orange-600",
    delay: "200ms"  
  },
  {
    title: "DementoCare",
    description: "A Chrome extension designed to support dementia patients and caregivers. Implements facial recognition technology with real-time WebSocket alerts.",
    tech: ["Python", "Flask", "JavaScript", "Node.js", "WebSockets"],
    url: "https://github.com/AndrewL05/hackru-project",
    stats: "Healthcare innovation",
    gradient: "from-green-600 to-teal-600",
    delay: "400ms"
  },
  {
    title: "Bank Management System",
    description: "A robust desktop application for comprehensive bank account and transaction management, showcasing object-oriented programming principles.",
    tech: ["Java", "OOP"],
    url: "https://github.com/AndrewL05/Bank-Management-System",
    stats: "Simulates 100+ accounts with transaction tracking using OOP principles",
    gradient: "from-indigo-600 to-purple-600",
    delay: "600ms"
  }
];

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const handleCardClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="projects" className="py-20 px-6" ref={ref}>
      <div className="container mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
        </div>

        <div className={`grid md:grid-cols-2 gap-8 max-w-6xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {projects.map((project, index) => (  
            <div
              key={project.title}
              className="relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:rotate-1 transform-gpu"
            >
              <Meteors number={10} className="opacity-80" />
              
              <div
                className="relative h-full bg-slate-800/50 backdrop-lg rounded-2xl p-8 border border-slate-700 hover:border-slate-600 group transition-all duration-300 z-10"
                style={{ animationDelay: project.delay }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleCardClick(project.url)}
              >
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div>
                        <ExternalLink size={20} className="text-gray-400 hover:text-blue-400 transition-colors duration-200" />
                      </div>
                      <div>
                        <Github size={20} className="text-gray-400 hover:text-blue-400 transition-colors duration-200" />
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="bg-slate-700/50 text-sky-300 px-3 py-1 rounded-full text-sm font-medium border border-slate-600 group-hover:border-blue-500/50 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-cyan-400 font-medium text-sm">
                      {project.stats}
                    </p>
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

export default Projects;