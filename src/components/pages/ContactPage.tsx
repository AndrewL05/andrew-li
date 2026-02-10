import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { LinkPreview } from "@/components/ui/link-preview";

interface ContactPageProps {
  light: boolean;
}

const ContactPage = ({ light }: ContactPageProps) => {
  const cardClass = light
    ? "bg-[#f5f0e8] border-[#d9d0c3] hover:border-[#c4b8a8]"
    : "bg-[#222] border-[#333] hover:border-[#444]";
  const iconBg = light ? "bg-[#efe9df]" : "bg-[#1a1a1a]";
  const iconColor = light
    ? "text-[#6b5e4e] group-hover:text-[#3c3226]"
    : "text-[#666] group-hover:text-white";
  const labelColor = light ? "text-[#3c3226]" : "text-white";

  return (
    <div className="p-8 md:p-12">
      <h2 className={`text-2xl font-light mb-8 ${light ? "text-[#3c3226]" : "text-white"}`}>Contact</h2>
      <div className="max-w-md space-y-4">
        <a
          href="mailto:liandrew1234@gmail.com"
          className={`flex items-center gap-4 p-4 rounded-lg border transition-colors group ${cardClass}`}
        >
          <div className={`p-2 rounded-lg ${iconBg}`}>
            <Mail size={20} className={`transition-colors ${iconColor}`} />
          </div>
          <div>
            <p className={`text-sm ${labelColor}`}>Email</p>
          </div>
        </a>

        <LinkPreview
          url="https://github.com/AndrewL05"
          isStatic={true}
          imageSrc="/img/github-preview.png"
          className={`flex items-center gap-4 p-4 rounded-lg border transition-colors group ${cardClass}`}
        >
          <div className={`p-2 rounded-lg ${iconBg}`}>
            <Github size={20} className={`transition-colors ${iconColor}`} />
          </div>
          <div>
            <p className={`text-sm ${labelColor}`}>GitHub</p>
          </div>
        </LinkPreview>

        <LinkPreview
          url="https://linkedin.com/in/andrew-li05"
          isStatic={true}
          imageSrc="/img/linkedin-preview.png"
          className={`flex items-center gap-4 p-4 rounded-lg border transition-colors group ${cardClass}`}
        >
          <div className={`p-2 rounded-lg ${iconBg}`}>
            <Linkedin size={20} className={`transition-colors ${iconColor}`} />
          </div>
          <div>
            <p className={`text-sm ${labelColor}`}>LinkedIn</p>
          </div>
        </LinkPreview>

        <a
          href="/Andrew Li - Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-4 p-4 rounded-lg border transition-colors group ${cardClass}`}
        >
          <div className={`p-2 rounded-lg ${iconBg}`}>
            <FileText size={20} className={`transition-colors ${iconColor}`} />
          </div>
          <div>
            <p className={`text-sm ${labelColor}`}>Resume</p>
          </div>
        </a>
      </div>

      <div className={`mt-12 pt-8 border-t ${light ? "border-[#e2dbd0]" : "border-[#292929]"}`}>
        <p className={`text-sm ${light ? "text-[#8a7e6e]" : "text-[#555]"}`}>
          Brooklyn College · B.S. Computer Science · Class of 2027
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
