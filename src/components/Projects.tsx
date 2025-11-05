import { useState, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { Meteors } from "@/components/ui/meteors";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselSlider,
} from "@/components/ui/carousel";

const projects = [
  {
    title: "SayLess",
    description: "SayLess is an AI-powered meeting assistant/bot that joins real-time meetings, speaks naturally in a chosen voice, and actively participates in conversations. It can listen, record, respond when needed, and automatically generate transcripts, summaries, and notes for every meeting.",
    tech: [
      "React", "TypeScript", "Tailwind CSS", "Express.js", "Node.js", "MongoDB", "Clerk", "ElevenLabs", "Deepgram API", "Gemini API"
    ],
    url: "https://github.com/AndrewL05/SayLess",
    stats: "AI meeting assistant/bot",
    gradient: "from-emerald-600 to-teal-600",
    delay: "0ms",
  },
  {
    title: "Parallax",
    description:
      "An AI-powered life simulator that lets users explore alternate futures up to 10 years based on their personal decisions. It transforms everyday choices into interactive storylines and visualizations, helping people reflect on how different paths could shape their lives.",
    tech: [
      "React",
      "Tailwind CSS",
      "D3.js",
      "Python",
      "FastAPI",
      "MongoDB",
      "Docker",
      "Clerk",
      "Stripe",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Scikit-Learn",
      "TensorFlow"
    ],
    url: "https://github.com/AndrewL05/Parallax",
    stats: "Interactive life simulation with AI-powered decision modeling",
    gradient: "from-emerald-600 to-teal-600",
    delay: "0ms",
  },
  {
    title: "StudySphere",
    description:
      "A full-stack study platform built for collaborative learning. Features real-time chat, note sharing with upvotes/comments, and an integrated AI study assistant.",
    tech: ["React", "Supabase", "PostgreSQL", "Node.js", "Express.js"],
    url: "https://github.com/AndrewL05/StudySphere",
    stats: "150+ user interactions simulated during testing",
    gradient: "from-purple-600 to-blue-600",
    delay: "200ms",
  },
  {
    title: "Haunting Truths",
    description:
      "An atmospheric 3D horror game developed using Godot Engine. Winner of 1st place for Best Map Design and Best Beginner Project in Game Jam.",
    tech: ["Godot Engine", "GDScript", "C#", "3D Modeling"],
    url: "https://github.com/AndrewL05/game-jam-project",
    stats: "Game Jam winner",
    gradient: "from-red-600 to-orange-600",
    delay: "400ms",
  },
  {
    title: "DementoCare",
    description:
      "A Chrome extension designed to support dementia patients and caregivers. Implements facial recognition technology with real-time WebSocket alerts.",
    tech: ["Python", "Flask", "JavaScript", "Node.js", "WebSockets"],
    url: "https://github.com/AndrewL05/hackru-project",
    stats: "Healthcare innovation",
    gradient: "from-green-600 to-teal-600",
    delay: "600ms",
  },
  {
    title: "Bank Management System",
    description:
      "A robust desktop application for comprehensive bank account and transaction management, showcasing object-oriented programming principles.",
    tech: ["Java", "OOP"],
    url: "https://github.com/AndrewL05/Bank-Management-System",
    stats:
      "Simulates 100+ accounts with transaction tracking using OOP principles",
    gradient: "from-indigo-600 to-purple-600",
    delay: "800ms",
  },
];

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [carousel, setCarousel] = useState<CarouselSlider>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const handleCardClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    if (!carousel) {
      return;
    }

    setCount(carousel.scrollSnapList().length);
    setCurrent(carousel.selectedScrollSnap() + 1);
    setCanScrollPrev(carousel.canScrollPrev());
    setCanScrollNext(carousel.canScrollNext());

    carousel.on("select", () => {
      setCurrent(carousel.selectedScrollSnap() + 1);
      setCanScrollPrev(carousel.canScrollPrev());
      setCanScrollNext(carousel.canScrollNext());
    });
  }, [carousel]);

  return (
    <section id="projects" className="py-20 px-6" ref={ref}>
      <div className="container mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 py-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
        </div>

        <div
          className={`max-w-6xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative">
            <button
              onClick={() => carousel?.scrollPrev()}
              disabled={!canScrollPrev}
              className="absolute -left-16 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-slate-800/80 border border-slate-600 hover:bg-slate-700/90 hover:border-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center hidden lg:flex"
              aria-label="Previous slide"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() => carousel?.scrollNext()}
              disabled={!canScrollNext}
              className="absolute -right-16 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-slate-800/80 border border-slate-600 hover:bg-slate-700/90 hover:border-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center hidden lg:flex"
              aria-label="Next slide"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <Carousel
              setApi={setCarousel}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {projects.map((project, index) => (
                  <CarouselItem
                    key={project.title}
                    className="pl-2 md:pl-4 md:basis-1/2"
                  >
                    <div className="relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:rotate-1 transform-gpu h-full">
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
                                <ExternalLink
                                  size={20}
                                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                                />
                              </div>
                              <div>
                                <Github
                                  size={20}
                                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                                />
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
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: count }, (_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index + 1 === current
                    ? "bg-blue-400 scale-110"
                    : "bg-slate-600 hover:bg-slate-500"
                }`}
                onClick={() => carousel?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
