import type { Profile } from "@/types";

// All text content for the site lives here. Components only render it.

export const profile: Profile = {
  basics: {
    name: "Pavan Kumar M.G.",
    title: "Senior Software Engineer | Full Stack Developer",
    location: "Bengaluru, India",
    availability: "Open to remote and relocation",
    email: "pavanmgkumar@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/pavan-kumar-mg/",
    // githubUrl: "", // add later – the GitHub link stays hidden until then
    resumeUrl: "/resume.pdf",
    tagline:
      "I build fast, reliable web and mobile apps with React, React Native, TypeScript and Python.",
    summary:
      "Senior Software Engineer and Full Stack Developer with 7+ years of experience building enterprise web and mobile applications. Strong frontend expertise in React, React Native, TypeScript and JavaScript, with experience in micro-frontends, data-intensive AG Grid interfaces, state management and offline-first mobile apps. Hands-on backend experience with Python, FastAPI, SQLModel, PostgreSQL and Alembic on a commodity trading platform. Currently learning LLM application development with LangChain and LangGraph.",
  },

  ui: {
    downloadResume: "Download Resume",
    linkedin: "LinkedIn",
    contact: "Contact",
    opensInNewTab: "(opens in a new tab)",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toggleTheme: "Toggle dark mode",
    readCaseStudy: "Read case study",
    githubRepo: "GitHub",
    liveSite: "Live site",
    projectTypes: { work: "Work", personal: "Personal" },
    caseStudy: {
      overview: "Overview",
      role: "My Role",
      contributions: "What I Built",
      challenges: "Challenges",
      tech: "Tech Stack",
      backToProjects: "Back to projects",
    },
  },

  contact: {
    intro:
      "I'm open to new opportunities, remote or on-site. The quickest way to reach me is email or LinkedIn, or send a message with the form below.",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    form: {
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      submit: "Send message",
      submitting: "Sending...",
      success: "Thanks for your message! I'll get back to you soon.",
      error: "Sorry, something went wrong. Please try again, or email me directly.",
      unavailable:
        "The contact form is not available right now. Please email me directly.",
    },
    validation: {
      nameRequired: "Please enter your name.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "Please enter a valid email address.",
      messageRequired: "Please enter a message.",
      messageTooShort: "Please write at least 10 characters.",
    },
  },

  sectionTitles: {
    about: "About",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
  },

  navLinks: [
    { label: "About", href: "/#about" },
    { label: "Experience", href: "/#experience" },
    { label: "Projects", href: "/#projects" },
    { label: "Skills", href: "/#skills" },
    { label: "Contact", href: "/#contact" },
  ],

  about: [
    "Hi, I'm Pavan. I'm a full stack developer in Bengaluru with over seven years of experience building web and mobile apps for enterprise teams.",
    "I'm happiest on the frontend, working with React, React Native and TypeScript on things like micro-frontends, data-heavy AG Grid screens and offline-first mobile apps. On my current team I also work on the backend, building APIs with Python, FastAPI and PostgreSQL for a commodity trading platform.",
    "Right now I'm learning to build LLM-powered applications with LangChain and LangGraph. I'm open to remote roles and relocation, so feel free to reach out.",
  ],

  experience: [
    {
      role: "Senior Software Engineer",
      company: "Mindsprint Digital India Pvt Ltd",
      location: "Bengaluru",
      startDate: "Oct 2022",
      endDate: "Present",
      highlights: [
        "Full stack developer on an enterprise commodity trading platform (React, TypeScript, FastAPI, PostgreSQL), owning frontend modules and contributing backend APIs.",
        "Built React and React Native applications for forestry and coffee-domain clients; code reviews, production support and Agile delivery.",
      ],
    },
    {
      role: "Software Engineer",
      company: "Sonata Software Ltd",
      location: "Bengaluru",
      startDate: "Apr 2021",
      endDate: "Sep 2022",
      highlights: [
        "Built a React Native iPad bulk-order app for a large Indian conglomerate.",
        "Delivered React features and SharePoint-integrated web parts, and worked on a customer feedback platform.",
      ],
    },
    {
      role: "RPA Consultant",
      company: "Paanini Innovative India Pvt Ltd",
      location: "Bengaluru",
      startDate: "May 2018",
      endDate: "Dec 2019",
      highlights: [
        "Automated business processes with Jiffy RPA.",
        "Built a Python / Django automation tool.",
      ],
    },
  ],

  projects: [
    {
      slug: "commodity-trading-platform",
      title: "Infinity Marketplace – Commodity Pricing & Trading Platform",
      type: "work",
      role: "Full Stack Developer (frontend owner, backend contributor)",
      summary:
        "A pricing and trading platform for a global agri-commodities company, where traders manage live interests, pricing, hedging, shipments and lost business.",
      overview:
        "A pricing and trading platform for a global agri-commodities trading company. Traders use it to manage live interests, pricing, hedging, shipments and lost business.",
      contributions: [
        "Built Live Interest create and edit workflows with UOM-based quantity splits and pricing conversions.",
        "Built AG Grid Enterprise screens with persistent column layouts, multi-column sort and preset filters.",
        "Delivered the Lost Business feature end to end across React and FastAPI: endpoints, SQLModel table, Pydantic schemas, Alembic migrations and email notifications.",
        "Built backend REST APIs for notifications and summary data.",
        "Worked on CI/CD pipelines with GitHub Actions and Azure DevOps.",
      ],
      challenges: [
        "Keeping large forms fast: I reduced unnecessary re-renders by subscribing only to the fields each part needed (useWatch), keeping non-visual values in refs (useRef) and debouncing expensive recalculations.",
        "Persisting AG Grid state: column layouts, sort order and filters are saved and restored, so traders come back to the same view they left.",
      ],
      tech: [
        "React 18",
        "TypeScript",
        "Vite Module Federation",
        "AG Grid Enterprise",
        "TanStack Query",
        "TanStack Router",
        "Redux Toolkit",
        "Ant Design",
        "Python",
        "FastAPI",
        "SQLModel",
        "PostgreSQL",
        "Snowflake",
        "Alembic",
        "Docker",
      ],
    },
    {
      slug: "digital-forestry",
      title: "ROC Digital Forestry – Web & Mobile Platform",
      type: "work",
      role: "React & React Native Developer",
      summary:
        "A web and mobile platform for forestry operations, with offline-first mobile workflows that sync when a connection is available.",
      overview:
        "A web and mobile platform for a forestry client. The mobile app supports offline-first workflows, and the React web app supports the same business.",
      contributions: [
        "Built offline-first mobile workflows with Realm DB and Firebase sync.",
        "Developed features for the React web app.",
        "Created reusable components shared across screens.",
        "Provided production support and bug fixes.",
      ],
      tech: [
        "React",
        "React Native",
        "TypeScript",
        "Realm DB",
        "Firebase/Firestore",
        "SQLite",
      ],
    },
    {
      slug: "coffee-mobile-app",
      title: "Brazil Coffee – Enterprise Mobile App",
      type: "work",
      role: "React Native Developer",
      summary:
        "An enterprise React Native app for a coffee-domain client, built from business requirements with reusable UI and a focus on performance.",
      overview:
        "An enterprise mobile app for a coffee-domain client, built with React Native.",
      contributions: [
        "Turned business requirements into working features.",
        "Built reusable UI components.",
        "Optimised app performance.",
        "Fixed bugs and supported releases.",
      ],
      tech: ["React Native", "JavaScript", "REST APIs"],
    },
  ],

  skills: [
    {
      category: "Languages",
      skills: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL", "HTML5", "CSS3"],
    },
    {
      category: "Frontend",
      skills: [
        "React 18",
        "React Native",
        "Redux Toolkit",
        "TanStack Query",
        "TanStack Router",
        "Vite",
        "Module Federation",
      ],
    },
    {
      category: "UI",
      skills: ["Ant Design", "AG Grid Enterprise", "Tailwind CSS"],
    },
    {
      category: "Backend",
      skills: ["FastAPI", "Pydantic", "SQLModel", "SQLAlchemy", "REST APIs", "Django"],
    },
    {
      category: "Databases",
      skills: [
        "PostgreSQL",
        "Snowflake",
        "Redis",
        "Firebase/Firestore",
        "Realm DB",
        "SQLite",
        "Alembic",
      ],
    },
    {
      category: "DevOps",
      skills: [
        "Docker",
        "GitHub Actions",
        "Azure DevOps",
        "Azure Application Insights",
        "Git",
      ],
    },
    {
      category: "Testing",
      skills: ["Jest", "React Testing Library"],
    },
  ],

  education: [
    {
      degree: "MCA",
      institution: "Visvesvaraya Technological University (VTU)",
      location: "Mysuru",
      period: "2014 – 2017",
    },
    {
      degree: "BCA",
      institution: "Kuvempu University",
      location: "Shivamogga",
      period: "2014",
    },
  ],

  certifications: [
    { name: "Namaste JavaScript", issuer: "NamasteDev" },
    { name: "Namaste React", issuer: "NamasteDev" },
    {
      name: "LangChain & LangGraph for Agentic AI",
      issuer: "Udemy",
      inProgress: true,
    },
  ],

  awards: [
    { name: "Best Employee Award", organisation: "Mindsprint", year: 2024 },
    { name: "Best Team Award", organisation: "Mindsprint", year: 2025 },
  ],
};
