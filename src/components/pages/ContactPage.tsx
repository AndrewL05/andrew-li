import { Github, Linkedin, Mail, FileText } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="p-8 md:p-12">
      <h2 className="text-2xl font-light text-white mb-8">Contact</h2>
      <div className="max-w-md space-y-4">
        <a
          href="mailto:liandrew1234@gmail.com"
          className="flex items-center gap-4 p-4 bg-[#222] rounded-lg border border-[#333] hover:border-[#444] transition-colors group"
        >
          <div className="p-2 bg-[#1a1a1a] rounded-lg">
            <Mail
              size={20}
              className="text-[#666] group-hover:text-white transition-colors"
            />
          </div>
          <div>
            <p className="text-sm text-[#888]">Email</p>
            <p className="text-white">liandrew1234@gmail.com</p>
          </div>
        </a>

        <a
          href="https://github.com/AndrewL05"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 bg-[#222] rounded-lg border border-[#333] hover:border-[#444] transition-colors group"
        >
          <div className="p-2 bg-[#1a1a1a] rounded-lg">
            <Github
              size={20}
              className="text-[#666] group-hover:text-white transition-colors"
            />
          </div>
          <div>
            <p className="text-sm text-[#888]">GitHub</p>
            <p className="text-white">@AndrewL05</p>
          </div>
        </a>

        <a
          href="https://linkedin.com/in/andrew-li05"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 bg-[#222] rounded-lg border border-[#333] hover:border-[#444] transition-colors group"
        >
          <div className="p-2 bg-[#1a1a1a] rounded-lg">
            <Linkedin
              size={20}
              className="text-[#666] group-hover:text-white transition-colors"
            />
          </div>
          <div>
            <p className="text-sm text-[#888]">LinkedIn</p>
            <p className="text-white">andrew-li05</p>
          </div>
        </a>

        <a
          href="/Andrew Li - Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 bg-[#222] rounded-lg border border-[#333] hover:border-[#444] transition-colors group"
        >
          <div className="p-2 bg-[#1a1a1a] rounded-lg">
            <FileText
              size={20}
              className="text-[#666] group-hover:text-white transition-colors"
            />
          </div>
          <div>
            <p className="text-sm text-[#888]">Resume</p>
            <p className="text-white">Download PDF</p>
          </div>
        </a>
      </div>

      <div className="mt-12 pt-8 border-t border-[#292929]">
        <p className="text-sm text-[#555]">
          Brooklyn College · B.S. Computer Science · Class of 2027
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
