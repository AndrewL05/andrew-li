import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Mail, href: "mailto:liandrew1234@gmail.com", label: "Email", hoverColor: "hover:text-green-400" },
    { icon: Github, href: "https://github.com/AndrewL05", label: "GitHub", hoverColor: "hover:text-gray-300" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/andrew-li-611a34278/", label: "LinkedIn", hoverColor: "hover:text-blue-400" },
  ];

  return (
    <footer className="bg-slate-900/50 backdrop-blur-lg border-t border-slate-700 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © 2025 Andrew Li
            </p>
          </div>
          
          <div className="flex space-x-6">
            {socialLinks.map(({ icon: Icon, href, label, hoverColor }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className={`text-gray-400 ${hoverColor || 'hover:text-blue-400'} transition-all duration-300 transform hover:scale-110 hover:-translate-y-1`}
                target={href.startsWith('mailto:') ? '_self' : '_blank'} 
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-700 text-center">
          <p className="text-gray-500 text-xs">
            Built with TypeScript, React, Tailwind CSS, and lots of coffee ☕
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
