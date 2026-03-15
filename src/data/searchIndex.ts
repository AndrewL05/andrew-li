import type { Tab } from "@/components/Browser";

export interface SearchEntry {
  id: string;
  title: string;
  section: Tab;
  sectionLabel: string;
  keywords: string;
  subtitle?: string;
}

export const searchIndex: SearchEntry[] = [
  {
    id: "home-about",
    title: "About Me",
    section: "home",
    sectionLabel: "Home",
    subtitle: "Full-Stack Developer",
    keywords:
      "about me andrew li full-stack developer computer science brooklyn college cuny tech prep data science fellow",
  },
  {
    id: "home-tech",
    title: "Technologies",
    section: "home",
    sectionLabel: "Home",
    subtitle: "React, TypeScript, Python, Java, and more",
    keywords:
      "technologies react typescript python java node.js fastapi flask sql postgresql mongodb docker aws gcp linux git",
  },

  {
    id: "exp-coi",
    title: "Data Engineer Intern",
    section: "experience",
    sectionLabel: "Experience",
    subtitle: "COI Energy",
    keywords:
      "data engineer intern coi energy python etl pipeline bigquery docker anomaly detection data interpolation predictive modeling",
  },
  {
    id: "exp-unadat",
    title: "Software Engineer Intern",
    section: "experience",
    sectionLabel: "Experience",
    subtitle: "Unadat",
    keywords:
      "software engineer intern unadat ai document summarizer gcp cloud storage team lead platform",
  },
  {
    id: "exp-soaper",
    title: "Full Stack Developer Intern",
    section: "experience",
    sectionLabel: "Experience",
    subtitle: "Soaper LLC",
    keywords:
      "full stack developer intern soaper scheduling system postgresql query optimization load performance",
  },
  {
    id: "exp-bccs",
    title: "Software Developer",
    section: "experience",
    sectionLabel: "Experience",
    subtitle: "Brooklyn College CS Club",
    keywords:
      "software developer brooklyn college cs club website ci/cd docker github actions deployment optimization",
  },

  {
    id: "proj-parallax",
    title: "Parallax",
    section: "projects",
    sectionLabel: "Projects",
    subtitle: "AI life simulator",
    keywords:
      "parallax ai life simulator alternate futures visualizations typescript react python fastapi tensorflow",
  },
  {
    id: "proj-sayless",
    title: "SayLess",
    section: "projects",
    sectionLabel: "Projects",
    subtitle: "AI meeting assistant",
    keywords:
      "sayless ai meeting assistant calls transcripts typescript react node.js mongodb elevenlabs",
  },
  {
    id: "proj-studysphere",
    title: "StudySphere",
    section: "projects",
    sectionLabel: "Projects",
    subtitle: "Collaborative study platform",
    keywords:
      "studysphere collaborative study platform real-time chat ai assistant react supabase postgresql node.js",
  },
  {
    id: "proj-investorly",
    title: "Investorly",
    section: "projects",
    sectionLabel: "Projects",
    subtitle: "Investment portfolio dashboard",
    keywords:
      "investorly investment portfolio dashboard python streamlit flask docker learning investing",
  },
  {
    id: "proj-haunting",
    title: "Haunting Truths",
    section: "projects",
    sectionLabel: "Projects",
    subtitle: "3D horror game",
    keywords:
      "haunting truths 3d horror game godot gdscript c# modeling best map design best beginner project game jam",
  },
  {
    id: "proj-dementocare",
    title: "DementoCare",
    section: "projects",
    sectionLabel: "Projects",
    subtitle: "Chrome extension for dementia patients",
    keywords:
      "dementocare chrome extension dementia patients facial recognition real-time alerts python flask javascript websockets",
  },

  {
    id: "contact-email",
    title: "Email",
    section: "contact",
    sectionLabel: "Contact",
    subtitle: "liandrew1234@gmail.com",
    keywords: "email contact liandrew1234@gmail.com",
  },
  {
    id: "contact-github",
    title: "GitHub",
    section: "contact",
    sectionLabel: "Contact",
    subtitle: "AndrewL05",
    keywords: "github andrewl05 contact",
  },
  {
    id: "contact-linkedin",
    title: "LinkedIn",
    section: "contact",
    sectionLabel: "Contact",
    subtitle: "andrew-li05",
    keywords: "linkedin andrew-li05 contact",
  },
  {
    id: "contact-resume",
    title: "Resume",
    section: "contact",
    sectionLabel: "Contact",
    keywords: "resume cv download pdf",
  },
  {
    id: "contact-education",
    title: "Education",
    section: "contact",
    sectionLabel: "Contact",
    subtitle: "Brooklyn College · B.S. Computer Science · 2027",
    keywords:
      "education brooklyn college computer science class of 2027 bachelor degree",
  },
];
