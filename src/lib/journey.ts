export type ChapterPath =
  | "/"
  | "/chronicle"
  | "/training-grounds"
  | "/royal-archives"
  | "/hall-of-victories"
  | "/scholars-library"
  | "/map-room"
  | "/next-chapter";

export interface Chapter {
  n: number;
  to: ChapterPath;
  name: string;
  subtitle: string;
  /** map coordinates in % of the parchment */
  x: number;
  y: number;
}

export const CHAPTERS: Chapter[] = [
  { n: 1, to: "/", name: "Ranjit Chavan", subtitle: "The Entrance", x: 12, y: 74 },
  { n: 2, to: "/chronicle", name: "Royal Chronicle", subtitle: "The Story", x: 37, y: 46 },
  {
    n: 3,
    to: "/training-grounds",
    name: "Training Grounds",
    subtitle: "The Craft",
    x: 45,
    y: 70,
  },
  { n: 4, to: "/royal-archives", name: "Royal Archives", subtitle: "The Works", x: 58, y: 38 },
  {
    n: 5,
    to: "/hall-of-victories",
    name: "Hall of Victories",
    subtitle: "The Honours",
    x: 72,
    y: 63,
  },
  {
    n: 6,
    to: "/scholars-library",
    name: "Scholar's Library",
    subtitle: "The Learning",
    x: 84,
    y: 33,
  },
  { n: 7, to: "/map-room", name: "Map Room", subtitle: "The Kingdom", x: 62, y: 15 },
  { n: 8, to: "/next-chapter", name: "Next Chapter", subtitle: "The Summons", x: 92, y: 78 },
];

export const chapterFor = (path: string): Chapter =>
  CHAPTERS.find((c) => c.to === path) ?? (CHAPTERS[0] as Chapter);

export const nextChapter = (path: string): Chapter => {
  const i = CHAPTERS.findIndex((c) => c.to === path);
  return CHAPTERS[Math.min(i + 1, CHAPTERS.length - 1)] as Chapter;
};

export const prevChapter = (path: string): Chapter => {
  const i = CHAPTERS.findIndex((c) => c.to === path);
  return CHAPTERS[Math.max(i - 1, 0)] as Chapter;
};

/* ------------------------------------------------------------------ */
/* Portfolio content — Ranjit Chavan                                    */
/* ------------------------------------------------------------------ */

export const PROFILE = {
  name: "Ranjit Chavan",
  role: "Computer Science Engineering Student",
  tagline: "Developer · Problem Solver · Builder · Continuous Learner",
  email: "ranjitchavan.dev@gmail.com",
  linkedin: "https://www.linkedin.com/in/ranjit-chavan-9746872a4/",
  github: "https://github.com/RanjitChavan1818",
  resume: "https://drive.google.com/file/d/1GgP8jtCz9v7vydrgWs2PG0LW5YddQ-FG/view?usp=sharing",
};

export interface Skill {
  name: string;
  note: string;
  detail: string;
}

export const SKILLS: Skill[] = [
  {
    name: "Python",
    note: "5-Star HackerRank",
    detail: "Strong foundation in Python programming, data structures and developing practical solutions."
  },
  {
    name: "Django",
    note: "Backend Craft",
    detail: "REST APIs, auth, ORM modelling and admin-driven applications.",
  },
  {
    name: "React",
    note: "Interface Craft",
    detail: "Component architecture, hooks, routing and animated interfaces.",
  },
  {
    name: "JavaScript",
    note: "The Common Tongue",
  detail: "Skilled in DOM manipulation, browser APIs, and building dynamic, interactive web applications.",
  },
  {
    name: "PostgreSQL",
    note: "The Vault",
    detail: "Relational design, indexing and query tuning for real projects.",
  },
  { name: "SQL", note: "Query Discipline", detail: "Joins, window functions, aggregation and analytics queries." },
  { name: "Java", note: "Foundations", detail: "OOP, collections and core problem solving." },
  { name: "C", note: "The Bedrock", detail: "Memory, pointers and low-level fundamentals." },
  { name: "Git", note: "The Chronicle Keeper", detail: "Branching, rebasing and disciplined commit history." },
  { name: "GitHub", note: "The Open Court", detail: "Collaboration, pull requests, issues and project hosting." },
  {
    name: "Microsoft Fabric",
    note: "DP-700 Certified",
    detail: "Lakehouse, pipelines and end-to-end data engineering workflows.",
  },
  { name: "Power BI", note: "The Watchtower", detail: "Dashboards, DAX measures and data storytelling." },
  { name: "Azure", note: "The Cloud Realm", detail: "Cloud services, storage and deployment fundamentals." },
  { name: "PySpark", note: "The Great Mill", detail: "Distributed transformations over large datasets." },
  { name: "AI/ML", note: "The New Frontier", detail: "Model training, evaluation and applied ML experiments." },
  { name: "DSA", note: "The Daily Drill", detail: "Data structures, algorithms and competitive practice." },
];

export interface Project {
  id: string;
  title: string;
  scrollTitle: string;
  summary: string;
  detail: string;
  tech: string[];
  github?: string;
  demo?: string;
}

export const PROJECTS: Project[] = [
  {
  id: "pralay",
  title: "Pralay",
  scrollTitle: "The Coastal Guardian's Chronicle",
  summary: "An AI-powered coastal hazard reporting and disaster intelligence platform.",
  detail:
    "A Progressive Web App designed to strengthen coastal disaster management through real-time hazard reporting, AI-powered image verification, social media intelligence, an authority dashboard, offline report capture and multilingual support for flood, tsunami and cyclone alerts.",
  tech: ["React", "Python", "Django", "AI/ML", "PWA", "PostgreSQL"],
  github: "https://github.com/ranjitchavan",
},
  {
    id: "hackathon",
    title: "Hackathon Registration Website",
    scrollTitle: "The Tournament Roll",
    summary: "Registration portal used for a college hackathon.",
    detail:
      "A team registration portal handling participant data, team formation, validation and an organiser view for managing entries at scale during the event.",
    tech: ["Django", "JavaScript", "PostgreSQL"],
    github: "https://github.com/ranjitchavan",
  },
   {
    id: "divyadarshan",
    title: "Divyadarshan",
    scrollTitle: "The Pilgrim's Decree",
    summary: "A temple darshan & pilgrimage management platform.",
    detail:
      "A full-stack platform to streamline temple darshan bookings — slot management, devotee registration, queue handling and an administrative dashboard for temple authorities.",
    tech: ["Django", "Python", "PostgreSQL", "JavaScript"],
    github: "https://github.com/ranjitchavan",
  },
  {
    id: "algosys",
    title: "Algosys",
    scrollTitle: "The Algorithm Codex",
    summary: "An algorithm visualiser and DSA learning companion.",
    detail:
      "Interactive visualisations of sorting, searching and graph algorithms with step-by-step execution to make data structures intuitive for learners.",
    tech: ["React", "JavaScript", "Algorithms"],
    github: "https://github.com/ranjitchavan",
  },
{
  id: "hr-analytics",
  title: "HR Analytics Dashboard",
  scrollTitle: "The Chronicle of the Workforce",
  summary: "A data-driven dashboard for workforce insights and HR decision-making.",
  detail:
    "An interactive analytics dashboard designed to transform employee data into actionable insights. It helps HR teams analyze employee demographics, workforce distribution, hiring trends, attrition rates and key performance indicators through interactive visualizations and reports.",
  tech: ["Power BI", "DAX", "Power Query", "Excel", "Data Analytics"],
  github: "YOUR_HR_ANALYTICS_GITHUB_URL",
},
  
];

export interface Victory {
  id: string;
  title: string;
  kind: "trophy" | "medal" | "seal";
  year: string;
  detail: string;
}

export const VICTORIES: Victory[] = [
  {
    id: "sinhgad-hackathon",
    title: "Teckathon — Winner",
    kind: "trophy",
    year: "2025",
    detail:
      "Won the Hackathon with my team at NBN  Sinhgad College Solapur .",
  },
    {
    id: "dp700",
    title: "Microsoft Fabric DP-700",
    kind: "medal",
    year: "2025",
    detail:
      "Certified in Microsoft Fabric data engineering — lakehouses, pipelines, and analytics workloads.",
  },
    {
    id: "sinhgad-hackathon",
    title: "sinhgad hackathon — Winner",
    kind: "trophy",
    year: "2024",
    detail:
      "Won the Hackathon with my team at our College in Second Year .",
  },

  {
    id: "hackerrank",
    title: "HackerRank Python — 5 Star",
    kind: "medal",
    year: "2024",
    detail: "Earned a 5-star rating in Python through sustained problem-solving practice.",
  },
    {
    id: "sinhgad-carnival",
    title: "Sinhgad Carnival — Achievement",
    kind: "medal",
    year: "2024",
    detail: "Secured Runner-Up position in Group Dance at Sinhgad Carnival.",
  },

  
];

export interface BookChapter {
  n: string;
  title: string;
  year: string;
  pages: [string, string];
}

export const BOOKS: BookChapter[] = [
  {
    n: "BOOK 01",
    title: "The Beginning",
    year: "2023",
    pages:[
  "My first laptop introduced me to a new world. I started exploring programming and learning how computers work. C was my first programming language, where I built a foundation in logic, problem-solving, and programming fundamentals.",

  "Later, I started learning Python. Writing my first programs, fixing errors, and trying new ideas made me more confident and increased my interest in building things with code."
]
  },
  {
    n: "BOOK 02",
    title: "The Foundation",
    year: "2024",
    pages: [
      "Data structures and algorithms became a daily drill. HackerRank Python reached 5 stars; CodeChef contests added speed under pressure.",
      "Databases entered the story — SQL, then PostgreSQL. Java and OOP gave structure to bigger ideas.",
    ],
  },
  {
    n: "BOOK 03",
    title: "The Builder",
    year: "2025",
    pages: [
      "Django and React turned exercises into products: Pralay, Divyadarshan, Algosys, LearNex and a hackathon registration portal used in a live event.",
      "The Sinhgad Hackathon was won this year — proof that shipping under constraint is its own skill.",
    ],
  },
  {
    n: "BOOK 04",
    title: "The Explorer",
    year: "2026",
    pages: [
      "The map widened: cloud with Azure, data engineering with Microsoft Fabric (DP-700), PySpark for scale, and Power BI for telling the story of data.",
      "AI/ML moved from curiosity to practice — training, evaluating and folding models into real applications.",
    ],
  },
  {
    n: "BOOK 05",
    title: "The Next Chapter",
    year: "2027",
    pages: [
  "I look forward to exploring new technologies, improving my skills, and building real-world solutions. My goal is to grow as a software engineer and take on meaningful challenges.",

  "The journey is still unfolding. There is more to learn, more to build, and many new opportunities ahead. The next chapter is yet to be written."
]
  },
];
