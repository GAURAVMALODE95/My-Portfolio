export const PROFILE = {
  name: "Gaurav Malode",
  role: "Software Developer",
  company: "Autotropic Cloud Technologies",
  focus: ["Flutter", "React Native", "React", "Node.js", "FastAPI"],
  tagline: "SOFTWARE ENGINEER / FINTECH / MOBILE",
  location: "Nashik, India",
  availability: "Open to product & engineering conversations",
  email: "gauravmalode777@gmail.com",
  phone: "+918208373146",
  phoneDisplay: "+91 82083 73146",
  linkedin: "https://www.linkedin.com/in/gauravmalode7",
  github: "https://github.com/gauravmalode95",
  website: "https://gauravmalode.in",
  resumePath: "/resume/Gaurav-Malode-Resume.pdf",
};

export const STATS = [
  { value: 1.4, suffix: "M+", label: "App downloads", source: "Musaffa · iOS & Android" },
  { value: 200, suffix: "+", label: "Countries reached", source: "Musaffa · global audience" },
  { value: 5, suffix: "", label: "Banking business units", source: "HDFC MyBuddy · enterprise" },
  { value: 4.8, suffix: "", label: "App-store rating", source: "Musaffa · store average" },
];

export const PROOF_POINTS = [
  "1.4M+ app downloads",
  "200+ countries reached",
  "5 enterprise banking units",
  "1.5+ years shipping production software",
  "4.8 app-store rating",
];

export interface CapabilityCategory {
  id: string;
  label: string;
  tags: string[];
  note: string;
  related: string[];
}

export const CAPABILITIES: CapabilityCategory[] = [
  {
    id: "mobile",
    label: "Mobile engineering",
    tags: [
      "Flutter",
      "React Native",
      "GetX",
      "iOS/Android build & release",
      "SSL pinning",
      "RASP",
    ],
    note: "Cross-platform apps shipped to the App Store, Google Play, and enterprise desktop — hardened with SSL pinning and runtime protections.",
    related: ["Musaffa", "MyBuddy", "Infomanav Terminal"],
  },
  {
    id: "web-backend",
    label: "Web and backend",
    tags: [
      "React",
      "Node.js",
      "FastAPI",
      "REST API design",
      "Firebase Auth",
      "Firestore",
      "Storage",
    ],
    note: "REST APIs and web products in Node.js, FastAPI, and React, backed by Firebase Auth, Firestore, and Storage.",
    related: ["Infomanav Terminal", "ResumeForge"],
  },
  {
    id: "languages",
    label: "Languages",
    tags: ["Dart", "Python", "JavaScript", "TypeScript", "SQL"],
    note: "Polyglot by necessity — Dart for Flutter, TypeScript for product web, Python for FastAPI services, SQL for data.",
    related: ["Musaffa", "Infomanav Terminal", "ResumeForge"],
  },
  {
    id: "architecture",
    label: "Architecture",
    tags: [
      "Clean Architecture",
      "SOLID",
      "MVC",
      "Reusable component design",
    ],
    note: "Clean Architecture and SOLID keep regulated fintech codebases testable and safe to change under release pressure.",
    related: ["Musaffa", "MyBuddy", "Infomanav Terminal"],
  },
  {
    id: "data-infra",
    label: "Data & product infrastructure",
    tags: [
      "Finnhub",
      "Typesense",
      "WebSockets",
      "Syncfusion charts",
      "JWT auth",
      "Feature flags",
    ],
    note: "Market-data plumbing: Finnhub with TTL caching, Typesense search, WebSocket live prices, Syncfusion charting, JWT auth, and feature flags.",
    related: ["Musaffa", "Infomanav Terminal"],
  },
  {
    id: "toolkit",
    label: "Engineering toolkit",
    tags: [
      "Git/GitHub",
      "Jira",
      "Figma",
      "Postman",
      "Charles Proxy",
      "JADX",
      "Cursor",
    ],
    note: "Everyday flow with Git, Jira, Figma, and Postman — plus Charles Proxy and JADX for VAPT remediation, and Cursor for AI-assisted work.",
    related: ["MyBuddy", "ResumeForge"],
  },
];

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  org: string;
  detail: string;
  tags: string[];
}

export const TIMELINE: TimelineItem[] = [
  {
    id: "education",
    period: "2021 — 2025",
    title: "B.E. Artificial Intelligence & Data Science",
    org: "MET Institute of Engineering, Nashik",
    detail:
      "Graduated with a GPA of 7.96/10 and Honors in AI & ML — the foundation for data-heavy product work later applied to market-data systems.",
    tags: ["GPA 7.96/10", "Honors in AI & ML"],
  },
  {
    id: "autotropic",
    period: "DEC 2024 — PRESENT",
    title: "Software Developer",
    org: "Autotropic Cloud Technologies Pvt. Ltd.",
    detail:
      "Shipping production Flutter and React Native apps in fintech and enterprise banking on a globally distributed team — core product modules, mobile security controls, and release ownership.",
    tags: ["Flutter", "React Native", "Fintech"],
  },
  {
    id: "production-fintech",
    period: "2024 — PRESENT",
    title: "Production fintech & enterprise mobile work",
    org: "Musaffa · MyBuddy · Infomanav Terminal",
    detail:
      "Core modules for a 1.4M+-download halal investing app, security hardening and VAPT remediation for HDFC enterprise banking across five business units, and a Flutter desktop market terminal for macOS and Windows.",
    tags: ["1.4M+ downloads", "5 banking units", "Desktop"],
  },
  {
    id: "resumeforge",
    period: "AUG 2026 — PRESENT",
    title: "ResumeForge",
    org: "AI resume tailoring SaaS",
    detail:
      "A full-stack AI product — FastAPI, React, Firebase, and Groq LLM — that tailors resumes to job descriptions with a Cursor-style accept/reject review flow and server-side DOCX-to-PDF export.",
    tags: ["FastAPI", "React", "Groq LLM"],
  },
];
