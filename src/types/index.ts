// Shapes of all the content in src/data/profile.ts.
// If a field is missing or misspelled in profile.ts, TypeScript shows an error.

export type Basics = {
  name: string;
  title: string;
  location: string;
  /** Short note shown next to the location, e.g. "Open to remote and relocation". */
  availability: string;
  email: string;
  linkedinUrl: string;
  /** Optional: the GitHub link is hidden when this is empty or missing. */
  githubUrl?: string;
  /** Path to the resume file inside public/. */
  resumeUrl: string;
  /** One-line intro for the Hero section. */
  tagline: string;
  /** Longer professional summary, used for SEO descriptions. */
  summary: string;
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  /** Display dates, e.g. "Oct 2022". */
  startDate: string;
  /** Display date, or "Present" for the current role. */
  endDate: string;
  highlights: string[];
};

export type ProjectType = "work" | "personal";

export type Project = {
  /** Used in the URL: /projects/[slug] */
  slug: string;
  title: string;
  type: ProjectType;
  role: string;
  /** One or two sentences for the project card. */
  summary: string;
  /** Case study: "Overview" section. */
  overview: string;
  /** Case study: "What I Built" section. */
  contributions: string[];
  /** Case study: "Challenges" section. Hidden when missing. */
  challenges?: string[];
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
};

export type SkillGroup = {
  category: string;
  skills: string[];
};

export type Education = {
  degree: string;
  institution: string;
  location: string;
  period: string;
};

export type Certification = {
  name: string;
  issuer: string;
  inProgress?: boolean;
};

export type Award = {
  name: string;
  organisation: string;
  year: number;
};

export type NavLink = {
  label: string;
  /** Link target, e.g. "/#about". The leading "/" makes it work from any page. */
  href: string;
};

/** Short interface text (button labels, screen-reader hints) reused across components. */
export type UiLabels = {
  downloadResume: string;
  linkedin: string;
  contact: string;
  /** Read by screen readers after links that open in a new tab. */
  opensInNewTab: string;
  readCaseStudy: string;
  githubRepo: string;
  liveSite: string;
  /** Badge text on project cards, e.g. { work: "Work", personal: "Personal" }. */
  projectTypes: Record<ProjectType, string>;
  /** Headings and links on the /projects/[slug] case study page. */
  caseStudy: {
    overview: string;
    role: string;
    contributions: string;
    challenges: string;
    tech: string;
    backToProjects: string;
  };
};

/** Headings for the home page sections. */
export type SectionTitles = {
  about: string;
  experience: string;
  projects: string;
  skills: string;
  contact: string;
};

export type Profile = {
  basics: Basics;
  ui: UiLabels;
  sectionTitles: SectionTitles;
  /** Links shown in the navbar. */
  navLinks: NavLink[];
  /** About section paragraphs, first person. */
  about: string[];
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup[];
  education: Education[];
  certifications: Certification[];
  awards: Award[];
};
