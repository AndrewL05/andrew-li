import { motion, Variants } from "framer-motion";
import { Github, Linkedin, Mail, FileText, ArrowUpRight } from "lucide-react";
import { LinkPreview } from "@/components/ui/link-preview";

interface ContactPageProps {
  light: boolean;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

const ContactPage = ({ light }: ContactPageProps) => {
  const heading = light ? "text-[#1a1610]" : "text-white";
  const card = light
    ? "bg-[#f0ebe2] border-[#ddd5c8] hover:border-[#c8bfb0]"
    : "bg-white/[0.03] border-white/[0.07] hover:border-white/[0.14]";
  const iconBg = light ? "bg-[#efe9df] border-[#ddd5c8]" : "bg-white/[0.05] border-white/[0.07]";
  const iconColor = light ? "text-[#6b5e4e]" : "text-white/45";
  const labelText = light ? "text-[#1a1610]" : "text-white/80";
  const sublabel = light ? "text-[#a89e8e]" : "text-white/30";
  const arrowColor = light ? "text-[#c8bfb0]" : "text-white/20";
  const groupHover = light ? "group-hover:text-[#1a1610]" : "group-hover:text-white";
  const footerText = light ? "text-[#a89e8e]" : "text-white/25";
  const divider = light ? "border-[#e2dbd0]" : "border-white/[0.07]";

  const linkClass = `flex items-center gap-4 p-4 rounded-xl border transition-colors duration-200 group ${card}`;

  return (
    <div className="p-8 md:p-12">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.h2
          variants={item}
          className={`text-2xl mb-8 ${heading}`}
          style={{ fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          Contact
        </motion.h2>

        <div className="max-w-sm space-y-3">
          <motion.a
            variants={item}
            href="mailto:liandrew1234@gmail.com"
            className={linkClass}
          >
            <div className={`p-2 rounded-lg border shrink-0 ${iconBg}`}>
              <Mail size={16} className={`transition-colors ${iconColor} ${groupHover}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[13px] font-medium ${labelText}`} style={{ fontFamily: "var(--font-sans)" }}>Email</p>
              <p className={`text-[11px] truncate ${sublabel}`} style={{ fontFamily: "var(--font-mono)" }}>liandrew1234@gmail.com</p>
            </div>
            <ArrowUpRight size={13} className={`shrink-0 ${arrowColor} ${groupHover} transition-colors`} />
          </motion.a>

          <motion.div variants={item}>
            <LinkPreview
              url="https://github.com/AndrewL05"
              isStatic
              imageSrc="/img/github-preview.png"
              className={linkClass}
            >
              <div className={`p-2 rounded-lg border shrink-0 ${iconBg}`}>
                <Github size={16} className={`transition-colors ${iconColor} ${groupHover}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-[13px] font-medium ${labelText}`} style={{ fontFamily: "var(--font-sans)" }}>GitHub</p>
                <p className={`text-[11px] truncate ${sublabel}`} style={{ fontFamily: "var(--font-mono)" }}>AndrewL05</p>
              </div>
              <ArrowUpRight size={13} className={`shrink-0 ${arrowColor} ${groupHover} transition-colors`} />
            </LinkPreview>
          </motion.div>

          <motion.div variants={item}>
            <LinkPreview
              url="https://linkedin.com/in/andrew-li05"
              isStatic
              imageSrc="/img/linkedin-preview.png"
              className={linkClass}
            >
              <div className={`p-2 rounded-lg border shrink-0 ${iconBg}`}>
                <Linkedin size={16} className={`transition-colors ${iconColor} ${groupHover}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-[13px] font-medium ${labelText}`} style={{ fontFamily: "var(--font-sans)" }}>LinkedIn</p>
                <p className={`text-[11px] truncate ${sublabel}`} style={{ fontFamily: "var(--font-mono)" }}>andrew-li05</p>
              </div>
              <ArrowUpRight size={13} className={`shrink-0 ${arrowColor} ${groupHover} transition-colors`} />
            </LinkPreview>
          </motion.div>

          <motion.a
            variants={item}
            href="/Andrew Li - Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <div className={`p-2 rounded-lg border shrink-0 ${iconBg}`}>
              <FileText size={16} className={`transition-colors ${iconColor} ${groupHover}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[13px] font-medium ${labelText}`} style={{ fontFamily: "var(--font-sans)" }}>Resume</p>
              <p className={`text-[11px] ${sublabel}`} style={{ fontFamily: "var(--font-mono)" }}>PDF download</p>
            </div>
            <ArrowUpRight size={13} className={`shrink-0 ${arrowColor} ${groupHover} transition-colors`} />
          </motion.a>
        </div>

        <motion.div
          variants={item}
          className={`mt-12 pt-8 border-t ${divider}`}
        >
          <p
            className={`text-[13px] ${footerText}`}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Brooklyn College · B.S. Computer Science · Class of 2027
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
