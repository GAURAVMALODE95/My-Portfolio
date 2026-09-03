const IMG = {
  mobile1:
    "https://images.unsplash.com/photo-1620207284057-e6c6b3d1b4c0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHszfHxkYXJrJTIwbW9kZSUyMGZpbmFuY2UlMjBhcHAlMjBkYXNoYm9hcmQlMjBtb2NrdXAlMjB1aXxlbnwwfHx8fDE3ODQxMDM1MzF8MA&ixlib=rb-4.1.0&q=85",
  mobile2:
    "https://images.unsplash.com/photo-1723785735443-16ffd373f398?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxkYXJrJTIwbW9kZSUyMGZpbmFuY2UlMjBhcHAlMjBkYXNoYm9hcmQlMjBtb2NrdXAlMjB1aXxlbnwwfHx8fDE3ODQxMDM1MzF8MA&ixlib=rb-4.1.0&q=85",
  desktop1:
    "https://images.unsplash.com/photo-1720962158813-29b66b8e23e1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxkYXJrJTIwdWklMjBkYXNoYm9hcmQlMjBzb2Z0d2FyZXxlbnwwfHx8fDE3ODc4MTg0NTV8MA&ixlib=rb-4.1.0&q=85",
  desktop2:
    "https://images.unsplash.com/photo-1720962158937-7ea890052166?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxkYXJrJTIwdWklMjBkYXNoYm9hcmQlMjBzb2Z0d2FyZXxlbnwwfHx8fDE3ODc4MTg0NTV8MA&ixlib=rb-4.1.0&q=85",
};

export type MockupKind = "phones" | "phone-desktop" | "desktop" | "browser";

export interface CaseBlock {
  title: string;
  body: string;
}

export interface Outcome {
  display: string;
  countTo?: number;
  suffix?: string;
  label: string;
}

export interface Project {
  slug: string;
  index: string;
  product: string;
  title: string;
  domain: string;
  platforms: string[];
  stack: string[];
  role: string;
  timeframe: string;
  impact: string;
  cardOutcome: string;
  mockup: MockupKind;
  frameTitle: string;
  images: { primary: string; secondary: string };
  imageAlts: { primary: string; secondary: string };
  nda?: boolean;
  overview: string[];
  scope: CaseBlock[];
  build: CaseBlock[];
  outcomes: Outcome[];
  qualitativeOutcome?: string;
  lesson: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "musaffa",
    index: "01",
    product: "Musaffa",
    title: "Musaffa — Halal Investing App",
    domain: "FINTECH / HALAL INVESTING",
    platforms: ["Flutter", "iOS", "Android"],
    stack: ["Flutter", "Dart", "GetX", "Syncfusion", "REST APIs", "WebView"],
    role: "Software Developer — core product modules",
    timeframe: "Dec 2024 — Present",
    impact:
      "Core product engineering for a halal investing app used by 1.4M+ people across 200+ countries.",
    cardOutcome: "1.4M+ downloads · 4.8 rating · 200+ countries",
    mockup: "phones",
    frameTitle: "musaffa.app",
    images: { primary: IMG.mobile1, secondary: IMG.mobile2 },
    imageAlts: {
      primary: "Musaffa app shown in an iPhone frame — placeholder screen",
      secondary:
        "Musaffa market screen shown in a second iPhone frame — placeholder screen",
    },
    overview: [
      "Musaffa is a halal investing platform that helps a global Muslim audience research stocks and ETFs, check Shariah compliance, and follow markets — 1.4M+ downloads, a 4.8 store rating, and users across 200+ countries.",
      "I engineer core product modules on the Flutter app: Stock Details, ETF Details, Shariah compliance reports, Market News, and the Investor Dashboard — all wired to live financial data APIs.",
    ],
    scope: [
      {
        title: "Five core product modules",
        body: "Owned Stock Details, ETF Details, Shariah compliance reports, Market News, and the Investor Dashboard — the surfaces users touch every session — integrated with financial data APIs.",
      },
      {
        title: "Onboarding & content flows",
        body: "Redesigned Flutter onboarding and WebView content flows, the funnel where new users decide whether the product earns their trust.",
      },
      {
        title: "Watchlists & charting",
        body: "Built multi-watchlist functionality with custom filtering and reusable Syncfusion charts pulling market data for financial visualisation.",
      },
      {
        title: "Production release rhythm",
        body: "Shipped production releases across iOS and Android with Product, Design, and QA on a globally distributed fintech team.",
      },
    ],
    build: [
      {
        title: "Stock & ETF detail modules",
        body: "Dense financial surfaces — pricing, ratios, compliance status, news — structured so a first-time investor can read them without a finance background. Built as reusable Flutter modules fed by financial data APIs.",
      },
      {
        title: "Shariah compliance reporting",
        body: "Compliance is Musaffa's core promise. The reports module translates screening data into a clear, scannable verdict inside the product rather than an external document.",
      },
      {
        title: "Onboarding & WebView flows that moved metrics",
        body: "The redesigned onboarding and WebView content flows lifted user engagement by 40% and qualified investment leads by 50% — proof that flow design is an engineering concern, not just a design one.",
      },
      {
        title: "Multi-watchlist architecture",
        body: "A watchlist system supporting multiple lists with custom filtering, rendered through reusable Syncfusion chart components so every list view stays fast and consistent.",
      },
    ],
    outcomes: [
      { display: "1.4M+", countTo: 1.4, suffix: "M+", label: "App downloads" },
      { display: "200+", countTo: 200, suffix: "+", label: "Countries reached" },
      { display: "4.8", label: "App-store rating" },
      { display: "+40%", countTo: 40, suffix: "%", label: "User engagement" },
      { display: "+50%", countTo: 50, suffix: "%", label: "Qualified investment leads" },
    ],
    lesson:
      "On a globally distributed fintech team, release discipline with Product, Design, and QA mattered as much as the code — predictable ships are what compound into user trust.",
  },
  {
    slug: "mybuddy",
    index: "02",
    product: "MyBuddy",
    title: "MyBuddy — HDFC Enterprise Banking",
    domain: "ENTERPRISE BANKING / SECURITY",
    platforms: ["React Native", "iOS", "Android"],
    stack: [
      "React Native",
      "TypeScript",
      "SSL pinning",
      "RASP",
      "Charles Proxy",
      "JADX",
    ],
    role: "Software Developer — workflows, security, release readiness",
    timeframe: "Dec 2024 — Present",
    impact:
      "Critical enterprise banking workflows and mobile security hardening across five HDFC business units.",
    cardOutcome: "5 business units · VAPT remediation closed for release",
    mockup: "phone-desktop",
    frameTitle: "mybuddy.internal",
    images: { primary: IMG.mobile2, secondary: IMG.desktop1 },
    imageAlts: {
      primary:
        "Abstracted MyBuddy banking screen in an iPhone frame — placeholder visual",
      secondary:
        "Abstracted enterprise operations surface — placeholder visual",
    },
    nda: true,
    overview: [
      "MyBuddy is HDFC's enterprise banking app, supporting critical operational workflows across five business units: HNW, BSO, CA, EBFS, and S2S.",
      "I engineer and maintain cross-platform React Native workflows, and own the mobile security posture: hardening the app against man-in-the-middle and reverse-engineering attacks, and closing third-party VAPT findings so releases can ship after independent penetration testing.",
    ],
    scope: [
      {
        title: "Enterprise banking workflows",
        body: "Built and maintained critical workflows used daily across five business units — HNW, BSO, CA, EBFS, and S2S — where reliability is a business requirement, not a nicety.",
      },
      {
        title: "Mobile security controls",
        body: "Architected high-level protections — dynamic SSL pinning, Frida detection, and jailbreak/root detection — hardening the app against MITM and reverse-engineering attacks.",
      },
      {
        title: "VAPT remediation",
        body: "Closed third-party VAPT findings using Charles Proxy and JADX for traffic inspection and decompiled-code analysis, then verified fixes held up.",
      },
      {
        title: "Release readiness",
        body: "Owned iOS and Android release readiness so the app could ship on schedule after independent penetration testing.",
      },
    ],
    build: [
      {
        title: "Defense-in-depth on the device",
        body: "Dynamic SSL pinning blocks intercepted traffic even if a certificate store is compromised; Frida and jailbreak/root detection stop instrumentation and tampering at runtime. Together they raise the cost of attacking the app well above opportunistic levels.",
      },
      {
        title: "Closing VAPT findings systematically",
        body: "Each finding was reproduced with Charles Proxy (traffic) and JADX (decompiled code), fixed at the root, and re-tested — turning an external audit report into a closed checklist the release could depend on.",
      },
      {
        title: "Employee notification engagement",
        body: "Implemented notification engagement with reaction support, analytics, and interaction tracking — giving internal communications measurable effectiveness instead of guesswork.",
      },
    ],
    outcomes: [
      { display: "5", countTo: 5, label: "HDFC business units supported" },
      { display: "VAPT", label: "Third-party findings closed for release" },
      { display: "2", countTo: 2, label: "Platforms under release ownership" },
    ],
    qualitativeOutcome:
      "The app shipped on schedule after independent penetration testing, with security controls and workflow stability treating banking-grade trust as a release requirement.",
    lesson:
      "Security work is product work. A finding closed with Charles Proxy and JADX is invisible to users — and that invisibility is exactly the point.",
  },
  {
    slug: "infomanav-terminal",
    index: "03",
    product: "Infomanav Terminal",
    title: "Infomanav Terminal — Stocks & ETF Research",
    domain: "MARKET DATA / DESKTOP",
    platforms: ["Flutter", "macOS", "Windows"],
    stack: [
      "Flutter",
      "Node.js",
      "TypeScript",
      "Finnhub",
      "Typesense",
      "WebSockets",
      "JWT",
    ],
    role: "Software Developer — desktop app & backend APIs",
    timeframe: "Dec 2024 — Present",
    impact:
      "A Flutter desktop market workstation for macOS and Windows, backed by purpose-built Node.js market-data APIs.",
    cardOutcome: "macOS + Windows · live prices · research, screeners, portfolios",
    mockup: "desktop",
    frameTitle: "infomanav — terminal",
    images: { primary: IMG.desktop1, secondary: IMG.desktop2 },
    imageAlts: {
      primary: "Infomanav Terminal desktop workstation — placeholder screen",
      secondary: "Terminal research and screener view — placeholder screen",
    },
    overview: [
      "Infomanav Terminal is a Flutter desktop market workstation for macOS and Windows: live prices, stock and ETF research, screeners, watchlists, portfolios, earnings, and Shariah compliance in one surface.",
      "I built the Flutter desktop client and designed the Node.js REST APIs behind it — JWT auth, per-user feature flags, watchlists, trading ideas, portfolios, and screener strategies.",
    ],
    scope: [
      {
        title: "Desktop workstation",
        body: "A single Flutter codebase targeting macOS and Windows, covering live prices, research, screening, watchlists, portfolios, earnings, and Shariah compliance.",
      },
      {
        title: "Backend API design",
        body: "Node.js REST APIs for JWT auth, per-user feature flags, watchlists, trading ideas, portfolios, and screener strategies consumed by the Flutter client.",
      },
      {
        title: "Market-data integration",
        body: "Finnhub market data with TTL caching, in-flight deduplication, 12-way concurrency, and retries; Typesense multi-search and screeners; WebSocket live prices against indexed snapshots.",
      },
      {
        title: "Platform-specific polish",
        body: "Windows shipped via Edge WebView2 TradingView embeds with JWT/secure-storage fallbacks; macOS got WKWebView theming, Cmd keyboard shortcuts, and non-blocking FCM startup.",
      },
    ],
    build: [
      {
        title: "A market-data layer that doesn't fall over",
        body: "Finnhub calls are wrapped in TTL caching and in-flight deduplication, so a screen full of widgets doesn't fire duplicate requests; 12-way concurrency with retries keeps quotes fresh without hammering rate limits.",
      },
      {
        title: "Live prices vs indexed snapshots",
        body: "WebSocket streams drive ticking prices, while Typesense-indexed snapshots power instant multi-search and screeners — two data paths tuned for different latency budgets.",
      },
      {
        title: "Feature flags per user",
        body: "Per-user feature flags let the team roll out terminal capabilities gradually and gate premium functionality without client releases.",
      },
      {
        title: "Native feel on both desktops",
        body: "TradingView embeds through WebView2 on Windows, themed WKWebView and Cmd shortcuts on macOS, and a non-blocking FCM startup so the app opens fast even when push registration is slow.",
      },
    ],
    outcomes: [
      { display: "2", countTo: 2, label: "Desktop platforms from one codebase" },
      { display: "12-way", label: "Concurrent market-data fetching" },
      { display: "7+", countTo: 7, suffix: "+", label: "Research surfaces in one terminal" },
    ],
    qualitativeOutcome:
      "A production desktop terminal where live prices, research, screening, and portfolios coexist without the UI stalling on market-data load.",
    lesson:
      "Desktop users judge a terminal by its worst frame. Caching, deduplication, and concurrency budgets are product features — they just live below the UI.",
  },
  {
    slug: "resumeforge",
    index: "04",
    product: "ResumeForge",
    title: "ResumeForge — AI Resume Tailoring SaaS",
    domain: "AI PRODUCT / FULL-STACK",
    platforms: ["FastAPI", "React", "Firebase", "Groq LLM"],
    stack: ["FastAPI", "React", "TypeScript", "Firebase", "Groq LLM", "LibreOffice"],
    role: "Solo full-stack builder",
    timeframe: "Aug 2026 — Present",
    impact:
      "A full-stack AI product that tailors resumes to job descriptions — with a review flow users can trust.",
    cardOutcome: "JD-specific tailoring · accept/reject diff review · PDF export",
    mockup: "browser",
    frameTitle: "resumeforge.app",
    images: { primary: IMG.desktop2, secondary: IMG.desktop1 },
    imageAlts: {
      primary: "ResumeForge web app in a browser frame — placeholder screen",
      secondary: "ResumeForge diff review surface — placeholder screen",
    },
    overview: [
      "ResumeForge is an AI resume tailoring SaaS: paste a job description, and the product rewrites your resume to match it — without wrecking the structure you spent years building.",
      "I designed and built the whole stack: a FastAPI backend for resume parsing, job-description analysis, and document generation; a React front end; Firebase for auth, Firestore, and storage; and Groq LLM for the tailoring intelligence.",
    ],
    scope: [
      {
        title: "API layer",
        body: "A modular REST API for resume parsing, job-description analysis, and document generation — each concern isolated as its own service.",
      },
      {
        title: "LLM integration",
        body: "Groq LLM generates JD-specific keyword suggestions while preserving the original resume structure — tailoring without fabrication.",
      },
      {
        title: "Review experience",
        body: "A Cursor-style accept/reject diff UI lets users review every AI rewrite before it touches their resume.",
      },
      {
        title: "Document export",
        body: "Server-side DOCX-to-PDF export through headless LibreOffice produces ATS-friendly PDF output.",
      },
    ],
    build: [
      {
        title: "Parsing before prompting",
        body: "Resumes are parsed into structured data first, so the LLM works on clean sections instead of raw document text — which keeps suggestions precise and the original structure intact.",
      },
      {
        title: "JD analysis as its own service",
        body: "Job descriptions are analysed separately to extract the keywords and requirements that matter, then matched against the parsed resume — a pipeline, not a single mega-prompt.",
      },
      {
        title: "Accept/reject diff UI",
        body: "Borrowing the interaction model from AI coding tools, every suggested change is a reviewable diff. Users keep editorial control; the AI proposes, the human disposes.",
      },
      {
        title: "Headless LibreOffice pipeline",
        body: "DOCX-to-PDF conversion runs server-side through headless LibreOffice, producing consistent, ATS-friendly PDFs without depending on the user's machine.",
      },
    ],
    outcomes: [
      { display: "4", countTo: 4, label: "Services in the API layer — parse, analyse, generate, export" },
      { display: "100%", label: "Of AI rewrites reviewable before applying" },
    ],
    qualitativeOutcome:
      "An end-to-end product — upload, tailor, review, export — running as a live deployment, built solo across the stack.",
    lesson:
      "The hard part of AI products isn't the model call — it's giving users control over what the model touches. The diff review is the product.",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function nextProject(slug: string): Project {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
}
