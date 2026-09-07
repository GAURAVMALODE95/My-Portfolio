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

export type MockupKind =
  | "phones"
  | "phone-desktop"
  | "desktop"
  | "browser"
  | "framed-phones"
  | "framed-laptops";

export function isFramedDevice(mockup: MockupKind) {
  return mockup === "framed-phones" || mockup === "framed-laptops";
}

const MUSAFFA_IMG = {
  login: "/Images/Musaffa/musaffa_login_screen.png?v=2",
  ticker: "/Images/Musaffa/musaffa_ticker_details_screen.png?v=2",
  news: "/Images/Musaffa/musaffa_news_screen.png?v=2",
  courses: "/Images/Musaffa/musaffa_courses_screen.png?v=2",
  investments: "/Images/Musaffa/musaffa_my_investments_screen.png?v=2",
};

const MYBUDDY_IMG = {
  login: "/Images/mybuddy/mybuddy_hdfc_hnw_login_screen.png?v=1",
  dashboard: "/Images/mybuddy/mybuddy_hdfc_hnw_dashboard_screen.png?v=1",
  employees: "/Images/mybuddy/mybuddy_hdfc_hnw_employee_list_screen.png?v=1",
  eligibility: "/Images/mybuddy/mybuddy_hdfc_hnw_plp_eligibility_screen.png?v=1",
  scorecard: "/Images/mybuddy/mybuddy_hdfc_hnw_mtd_scorecard_screen.png?v=1",
};

const TERMINAL_IMG = {
  dashboard: "/Images/terminal/Terminal__dashboard.png?v=1",
  watchlist: "/Images/terminal/Terminal_watchlist.png?v=1",
  screener: "/Images/terminal/Terminal__screener.png?v=1",
  portfolio: "/Images/terminal/Terminal__portfolio.png?v=1",
  business: "/Images/terminal/Terminal__business.png?v=1",
};

const STOLITY_IMG = {
  login: "/Images/stolity/stolity_login.png?v=1",
  filelist: "/Images/stolity/stolity_filelist.png?v=1",
  options: "/Images/stolity/stolity_options.png?v=1",
  upgrade: "/Images/stolity/stolity_upgrade.png?v=1",
};

const CASAGURU_IMG = {
  dashboard: "/Images/casaguru/casaguru_hdfc_casa_dashboard_screen.png?v=1",
  currentAccount: "/Images/casaguru/casaguru_hdfc_current_account_list_screen.png?v=1",
  features: "/Images/casaguru/casaguru_hdfc_product_features_screen.png?v=1",
  faqs: "/Images/casaguru/casaguru_hdfc_faqs_list_screen.png?v=1",
};

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
  gallery?: { src: string; alt: string; label?: string; title?: string }[];
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
    mockup: "framed-phones",
    frameTitle: "musaffa.app",
    images: { primary: MUSAFFA_IMG.ticker, secondary: MUSAFFA_IMG.news },
    imageAlts: {
      primary: "Musaffa stock details — Apple Inc Shariah compliance screen in an iPhone",
      secondary: "Musaffa Markets news feed in an iPhone",
    },
    gallery: [
      {
        src: MUSAFFA_IMG.login,
        alt: "Musaffa sign-up screen — start your Halal Investment Journey",
        label: "Sign up",
      },
      {
        src: MUSAFFA_IMG.ticker,
        alt: "Musaffa Shariah compliance — Apple Inc HALAL screening and financial gauge",
        label: "Shariah compliance",
      },
      {
        src: MUSAFFA_IMG.news,
        alt: "Musaffa Markets news feed with watchlist and portfolio navigation",
        label: "Market news",
      },
      {
        src: MUSAFFA_IMG.investments,
        alt: "My Musaffa Investments dashboard with totals, shares, and invest again",
        label: "Investments",
      },
      {
        src: MUSAFFA_IMG.courses,
        alt: "Musaffa course lesson — Why invest the halal way",
        label: "Courses",
      },
    ],
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
    product: "HDFC MyBuddy",
    title: "HDFC MyBuddy — Enterprise Banking",
    domain: "ENTERPRISE BANKING / SECURITY",
    platforms: ["React Native", "iOS", "Android"],
    stack: [
      "React Native",
      "TypeScript",
      "AES-GCM",
      "SSL pinning",
      "RASP",
      "Charles Proxy",
      "JADX",
    ],
    role: "Software Developer — workflows, security, release readiness",
    timeframe: "Dec 2024 — Present",
    impact:
      "Critical enterprise banking workflows and mobile security hardening across five business units.",
    cardOutcome: "5 business units · AES-GCM · VAPT closed for release",
    mockup: "framed-phones",
    frameTitle: "MyBuddy — HNW Dashboard",
    images: { primary: MYBUDDY_IMG.dashboard, secondary: MYBUDDY_IMG.scorecard },
    imageAlts: {
      primary:
        "MyBuddy HNW dashboard — My Bank My Power shortcuts and latest news",
      secondary:
        "MyBuddy HNW MTD scorecard — income plan and achievement",
    },
    gallery: [
      {
        src: MYBUDDY_IMG.login,
        title: "MyBuddy — Select Your Team",
        alt: "MyBuddy login — select HNW, Current Account, BSO, or Employee Banking team",
        label: "Select team",
      },
      {
        src: MYBUDDY_IMG.dashboard,
        title: "MyBuddy — HNW Dashboard",
        alt: "MyBuddy HNW dashboard with score, PLP eligibility, and process shortcuts",
        label: "Dashboard",
      },
      {
        src: MYBUDDY_IMG.employees,
        title: "MyBuddy — Employee List",
        alt: "MyBuddy HNW employee list with search and employee codes",
        label: "Employees",
      },
      {
        src: MYBUDDY_IMG.eligibility,
        title: "MyBuddy — PLP Eligibility",
        alt: "MyBuddy PLP eligibility report with YTD and MTD achievement",
        label: "PLP eligibility",
      },
      {
        src: MYBUDDY_IMG.scorecard,
        title: "MyBuddy — MTD Scorecard",
        alt: "MyBuddy MTD scorecard with total income plan and income split",
        label: "Scorecard",
      },
    ],
    overview: [
      "MyBuddy is an enterprise banking app, supporting critical operational workflows across five business units: HNW, BSO, CA, EBFS, and S2S.",
      "I engineer and maintain cross-platform React Native workflows, and own the mobile security posture: migrating on-device encryption from AES-CBC-256 to AES-GCM, hardening the app against man-in-the-middle and reverse-engineering attacks, and closing third-party VAPT findings so releases can ship after independent penetration testing.",
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
        title: "AES-CBC-256 → AES-GCM",
        body: "Migrated on-device encryption from AES-256-CBC to AES-256-GCM. CBC only hides bytes; GCM is authenticated encryption, so a tampered payload fails the tag instead of decrypting into silent garbage — the difference that matters in a banking app.",
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
        title: "Why CBC was the wrong primitive",
        body: "AES-256-CBC gives confidentiality and nothing else. Integrity is a separate MAC you have to get right — encrypt-then-MAC, unique IVs, no padding leaks. Miss any of that and ciphertext can be mutated without the app noticing. AES-GCM is AEAD: one 256-bit key, a unique nonce per encryption, and a Galois tag that fails closed on tamper. I moved MyBuddy's on-device crypto to GCM on both iOS and Android, using platform keystore APIs, then re-tested so existing sessions still opened and VAPT treated the finding as closed.",
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
      { display: "5", countTo: 5, label: "Business units supported" },
      { display: "AES-GCM", label: "Authenticated encryption replacing AES-CBC-256" },
      { display: "VAPT", label: "Third-party findings closed for release" },
    ],
    qualitativeOutcome:
      "The app shipped on schedule after independent penetration testing, with security controls and workflow stability treating banking-grade trust as a release requirement.",
    lesson:
      "Security work is product work. A finding closed with Charles Proxy and JADX is invisible to users — and that invisibility is exactly the point.",
  },
  {
    slug: "casaguru",
    index: "03",
    product: "HDFC CasaGuru",
    title: "HDFC CasaGuru — CASA Learning App",
    domain: "ENTERPRISE BANKING / ENABLEMENT",
    platforms: ["React Native", "Android"],
    stack: [
      "React Native",
      "Redux",
      "Firebase Analytics",
      "react-native-pdf",
      "AES-256-CBC",
      "REST APIs",
    ],
    role: "Software Developer — React Native (Android)",
    timeframe: "2024 — Present",
    impact:
      "An employee learning app for CASA and liability products — in-app documents, deep links, and analytics on Android.",
    cardOutcome: "In-app PDFs · deep links · Firebase Analytics",
    mockup: "framed-phones",
    frameTitle: "CasaGuru — Dashboard",
    images: { primary: CASAGURU_IMG.dashboard, secondary: CASAGURU_IMG.currentAccount },
    imageAlts: {
      primary: "CasaGuru CASA Guru dashboard with Current Account, FD, NRI, and PPF learning tiles",
      secondary: "CasaGuru Current Account nested list — generic, segmented, and special-purpose accounts",
    },
    gallery: [
      {
        src: CASAGURU_IMG.dashboard,
        title: "CasaGuru — Dashboard",
        alt: "CasaGuru dashboard — CASA learning tiles for savings, current, FD, NRI, and PPF",
        label: "Dashboard",
      },
      {
        src: CASAGURU_IMG.currentAccount,
        title: "CasaGuru — Current Account",
        alt: "CasaGuru Current Account details list with document links for each account type",
        label: "Current Account",
      },
      {
        src: CASAGURU_IMG.features,
        title: "CasaGuru — Product Features",
        alt: "CasaGuru Max Advantage Current Account features, AQB, and charges for employees",
        label: "Product features",
      },
      {
        src: CASAGURU_IMG.faqs,
        title: "CasaGuru — FAQs",
        alt: "CasaGuru FAQ list with document links for CASA product questions",
        label: "FAQs",
      },
    ],
    overview: [
      "CasaGuru (CASA Guru) is an employee knowledge app — not a retail banking client. Frontline staff look up Current Accounts, FDs, NRI, PPF/Locker, and related liability products: documents, media, FAQs, and assessments on Android.",
      "I own the React Native Android client work around how people actually get to that content: in-app PDF and image viewers, deep links into screens and documents, and Firebase Analytics on module usage. The dashboard tiles themselves come from the backend; the client routes them.",
    ],
    scope: [
      {
        title: "In-app PDF and image viewers",
        body: "Employees open linked PDFs and images inside the app instead of bouncing to an external viewer — custom document and image surfaces so product notes stay in the learning flow.",
      },
      {
        title: "Deep-link navigation",
        body: "Built deep-link routes that land on a specific screen or business document from a notification, mailer, or content ID — instead of dumping everyone on the dashboard to hunt.",
      },
      {
        title: "Firebase Analytics instrumentation",
        body: "Instrumented Firebase Analytics events across CASA modules so stakeholders can see click-through and content consumption by feature — usage data, not a guess.",
      },
      {
        title: "Metadata-driven dashboard",
        body: "Dashboard tiles are API-driven. content_type and view_type decide whether a tap opens a nested list, a document path, a webview assistant, or an MCQ — without hardcoding every learning path in the client.",
      },
      {
        title: "Encrypted API payloads",
        body: "Request and response bodies go over HTTPS as AES-256-CBC ciphertext, not plaintext JSON — the contract the Android client speaks to the liability API.",
      },
      {
        title: "MCQ knowledge checks",
        body: "Dashboard tiles can open an in-app MCQ flow — select an answer, see correctness, score, and a results screen — so staff can self-check CASA knowledge without leaving the app.",
      },
    ],
    build: [
      {
        title: "Documents that stay in the app",
        body: "PDF rendering and download, plus image viewing, so a Current Account circular or FAQ pack opens in-place. Linked .pdf and related files do not depend on a third-party reader being installed.",
      },
      {
        title: "Deep links into screens and files",
        body: "Dynamic content IDs resolve to the right nested list, product-feature card, or document. A mailer or notification can send an employee to Max Advantage AQB rules, not the home grid.",
      },
      {
        title: "Events that match the tiles",
        body: "Firebase Analytics events fire on module taps and content opens so monthly click-through and consumption can be reported by feature — enablement analytics for staff, not a consumer-app vanity dashboard.",
      },
      {
        title: "Tiles that route themselves",
        body: "The home grid is a dashboardlist from the API. list goes to nested CASA topics; details + webview opens Ask Eva; details + default opens the MCQ flow. Adding a product on the backend does not require a new Android screen for every path.",
      },
      {
        title: "AES-256-CBC on the wire",
        body: "JSON is encrypted before fetch and decrypted after. Session tokens travel inside that envelope. Guest bootstrap uses device ID + platform; employee login is code or mobile plus a 4-digit PIN — staff access, not customer payments.",
      },
    ],
    outcomes: [
      { display: "Android", label: "React Native client I shipped on" },
      { display: "PDF", label: "In-app document and image viewers" },
      { display: "Deep links", label: "Routes into screens and business documents" },
      { display: "Analytics", label: "Firebase events for module click-through" },
      { display: "AES-CBC", label: "Encrypted API request and response bodies" },
      { display: "Tiles", label: "Metadata-driven dashboard from the backend" },
    ],
    qualitativeOutcome:
      "Bank staff get CASA product knowledge on the phone — documents, FAQs, and assessments — without turning CasaGuru into a payments or transfers app.",
    lesson:
      "An enablement app is judged by whether the PDF opens here, now. Viewers, deep links, and events are the product; the dashboard is just the index.",
  },
  {
    slug: "infomanav-terminal",
    index: "04",
    product: "Stock Terminal",
    title: "Stock Terminal — Stocks & ETF Research",
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
    mockup: "framed-laptops",
    frameTitle: "Stock Terminal — Dashboard",
    images: { primary: TERMINAL_IMG.dashboard, secondary: TERMINAL_IMG.screener },
    imageAlts: {
      primary:
        "Stock Terminal dashboard — live market indices, sector performance, and market charts",
      secondary:
        "Stock Terminal stock screener — fundamental filters and company results table",
    },
    gallery: [
      {
        src: TERMINAL_IMG.dashboard,
        title: "Stock Terminal — Dashboard",
        alt: "Stock Terminal dashboard showing live market indices, sector performance, and a market chart",
        label: "Dashboard",
      },
      {
        src: TERMINAL_IMG.watchlist,
        title: "Stock Terminal — Watchlist",
        alt: "Stock Terminal watchlist with tracked stocks, performance charts, and Apple key stats",
        label: "Watchlist",
      },
      {
        src: TERMINAL_IMG.screener,
        title: "Stock Terminal — Stock Screener",
        alt: "Stock Terminal stock screener with fundamental filters and a company results table",
        label: "Screener",
      },
      {
        src: TERMINAL_IMG.portfolio,
        title: "Stock Terminal — Model Portfolio",
        alt: "Stock Terminal model portfolio creator with holdings allocation and summary",
        label: "Portfolio",
      },
      {
        src: TERMINAL_IMG.business,
        title: "Stock Terminal — Business Research",
        alt: "Stock Terminal business research for Apple showing product mix and geography revenue",
        label: "Business",
      },
    ],
    overview: [
      "Stock Terminal is a Flutter desktop market workstation for macOS and Windows: live prices, stock and ETF research, screeners, watchlists, portfolios, earnings, and Shariah compliance in one surface.",
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
    slug: "stolity",
    index: "05",
    product: "Stolity",
    title: "Stolity — File Management",
    domain: "PRODUCTIVITY / CLOUD STORAGE",
    platforms: ["React Native", "iOS", "Android"],
    stack: [
      "React Native",
      "TypeScript",
      "Node.js",
      "Firebase",
      "RevenueCat",
      "Remote Config",
    ],
    role: "Software Developer — React Native app (majority owner)",
    timeframe: "2024 — Present",
    impact:
      "A consumer file app — upload, organize, and share like Drive — where I rebuilt large-file transfers and moved subscriptions onto Firebase and RevenueCat.",
    cardOutcome: "Chunked uploads · RevenueCat · remote feature flags",
    mockup: "framed-phones",
    frameTitle: "Stolity — All Files",
    images: { primary: STOLITY_IMG.filelist, secondary: STOLITY_IMG.options },
    imageAlts: {
      primary: "Stolity All Files screen — folders and documents in an iPhone",
      secondary: "Stolity file actions sheet with share, download, and copy short link",
    },
    gallery: [
      {
        src: STOLITY_IMG.login,
        title: "Stolity — Sign In",
        alt: "Stolity sign-in screen with email, password, and social login",
        label: "Sign in",
      },
      {
        src: STOLITY_IMG.filelist,
        title: "Stolity — All Files",
        alt: "Stolity All Files list with folders, documents, search, and an add button",
        label: "All files",
      },
      {
        src: STOLITY_IMG.options,
        title: "Stolity — File Actions",
        alt: "Stolity file actions sheet showing share, download, rename, and copy short link",
        label: "File actions",
      },
      {
        src: STOLITY_IMG.upgrade,
        title: "Stolity — Upgrade Plan",
        alt: "Stolity upgrade plan screen with monthly and annual subscription options",
        label: "Plans",
      },
    ],
    overview: [
      "Stolity is a consumer file-management app for everyday people — store photos, videos, and documents in the cloud, organize them, and share them. Think Google Drive.",
      "I own most of the React Native iOS and Android app, talking to Node.js APIs. The codebase was inherited; I modularized it, and I redesigned uploads so large files actually finish.",
    ],
    scope: [
      {
        title: "Modular RN architecture",
        body: "Refactored the app by splitting business logic from UI, isolating service layers, and extracting reusable components — so the file browser, transfers, and account flows could change without stepping on each other.",
      },
      {
        title: "File transfer redesign",
        body: "Rebuilt uploads from the ground up: chunked transfers, background processing, retries, and live progress — the work I led so a 5 GB file survives a flaky connection.",
      },
      {
        title: "Subscriptions that match web",
        body: "Replaced custom subscription and storage APIs with Firebase plus RevenueCat so entitlements stay consistent between the website and the app.",
      },
      {
        title: "Remote flags and RBAC",
        body: "A remote-config layer for premium features, domain-specific plans, and entitlements — plus remotely configurable roles: full-premium, feature-level access, and read-only — without shipping an app update.",
      },
    ],
    build: [
      {
        title: "UI, services, and reusable pieces",
        body: "Business logic moved behind service modules; screens consume them instead of owning network and storage rules. Shared components keep the file list, sheets, and account surfaces consistent and cheaper to extend.",
      },
      {
        title: "Chunked uploads that recover",
        body: "Files go up in chunks, keep transferring in the background, retry failed parts, and report progress in real time. That is what made large-file reliability a product feature instead of a support ticket.",
      },
      {
        title: "Firebase + RevenueCat entitlements",
        body: "Store purchases and storage quotas now flow through RevenueCat and Firebase instead of one-off APIs, so a plan bought on the phone matches what the web already knows.",
      },
      {
        title: "Flags and roles without a release",
        body: "Remote config gates premium features and plan variants. RBAC can grant full-premium, trim access to specific features, or lock a user to read-only — flipped from the server, not a store review.",
      },
    ],
    outcomes: [
      { display: "iOS + Android", label: "One React Native TypeScript codebase" },
      { display: "Chunked", label: "Uploads with background retry and live progress" },
      { display: "RevenueCat", label: "Subscriptions aligned with web via Firebase" },
      { display: "Remote", label: "Feature flags and entitlements without app updates" },
      { display: "RBAC", label: "Full-premium, feature-level, and read-only modes" },
      { display: "5 GB", label: "Per-file uploads the transfer layer was rebuilt for" },
    ],
    qualitativeOutcome:
      "The mobile app is maintainable enough to keep shipping, large uploads complete instead of dying mid-transfer, and plan access is the same story on web and phone.",
    lesson:
      "A file app is judged by the upload that almost failed. Chunks, retries, and background work are the product — the file list is just where you see that they worked.",
  },
  // Hidden for now — uncomment to restore the case study.
  /*
  {
    slug: "resumeforge",
    index: "06",
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
  */
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function nextProject(slug: string): Project {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
}
