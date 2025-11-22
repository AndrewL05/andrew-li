import { useState, useEffect } from "react";
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  FileText,
  GraduationCap,
} from "lucide-react";
import { LinkPreview } from "@/components/ui/link-preview";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Andrew Li";

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let i = 0;
    const typingTimer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingTimer);
      }
    }, 150);

    return () => clearInterval(typingTimer);
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scroll = () => {
    document
      .getElementById("experience")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/AndrewL05",
      label: "GitHub",
      hoverColor: "hover:text-gray-300",
      previewUrl: "https://github.com/AndrewL05",
      imageSrc: "/img/github-preview.png",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/andrew-li05",
      label: "LinkedIn",
      hoverColor: "hover:text-blue-400",
      previewUrl: "https://www.linkedin.com/in/andrew-li05",
      imageSrc: "/img/linkedin-preview.png",
    },
    {
      icon: Mail,
      href: "mailto:liandrew1234@gmail.com",
      label: "Email",
      hoverColor: "hover:text-green-400",
      previewUrl: null,
      imageSrc: null,
    },
    {
      icon: FileText,
      href: "/Andrew Li - Resume.pdf",
      label: "Resume",
      hoverColor: "hover:text-purple-400",
      previewUrl: null,
      imageSrc: null,
    },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div
        className={`container mx-auto px-6 text-center z-10 transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
          {typedText}
        </h1>

        <p
          className={`text-xl md:text-2xl text-gray-300 mb-4 transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Full-Stack Developer
        </p>

        <div
          className={`flex items-center justify-center mb-6 transition-all duration-1000 delay-400 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-4 border border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                <GraduationCap size={20} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-blue-400 font-semibold">Brooklyn College</p>
                <p className="text-gray-300 text-sm">
                  B.S. Computer Science | Data Science Minor • Class of 2027
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-6 mb-8">
          {socialLinks.map(
            (
              { icon: Icon, href, label, hoverColor, previewUrl, imageSrc },
              index
            ) => {
              const linkContent = (
                <div className="text-gray-400 hover:scale-125 hover:-translate-y-1 p-2 rounded-full border border-gray-600/30 hover:border-gray-400/50 backdrop-blur-sm transition-all duration-300">
                  <Icon size={25} className={hoverColor} />
                </div>
              );

              if (
                !previewUrl ||
                href.startsWith("mailto:") ||
                href.endsWith(".pdf")
              ) {
                return (
                  <div
                    key={label}
                    className={`transition-all duration-800 ${
                      isVisible
                        ? "translate-y-0 opacity-100 scale-100"
                        : "translate-y-16 opacity-0 scale-50"
                    }`}
                    style={{
                      transitionDelay: `${600 + index * 200}ms`,
                      transitionTimingFunction:
                        "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                    }}
                  >
                    <a
                      href={href}
                      aria-label={label}
                      target={href.startsWith("mailto:") ? "_self" : "_blank"}
                      rel={
                        href.startsWith("mailto:")
                          ? undefined
                          : "noopener noreferrer"
                      }
                    >
                      {linkContent}
                    </a>
                  </div>
                );
              }

              return (
                <div
                  key={label}
                  className={`transition-all duration-800 ${
                    isVisible
                      ? "translate-y-0 opacity-100 scale-100"
                      : "translate-y-16 opacity-0 scale-50"
                  }`}
                  style={{
                    transitionDelay: `${600 + index * 200}ms`,
                    transitionTimingFunction:
                      "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                  }}
                >
                  <LinkPreview
                    url={previewUrl}
                    className="inline-block"
                    isStatic={true}
                    imageSrc={imageSrc}
                    width={300}
                    height={200}
                  >
                    {linkContent}
                  </LinkPreview>
                </div> 
              );
            }
          )}
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <button
            onClick={scrollToProjects}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-button"
          >
            View My Work
          </button>
          <button
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 cursor-button"
          >
            More About Me
          </button>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;
