# PRD — Gaurav Malode Portfolio ("Signal / Surface")

## Original problem statement
Premium, Awwwards-level personal portfolio for Gaurav Malode (software developer: secure fintech, enterprise banking, market-data, desktop, AI products). React + TypeScript + Tailwind + React Router + Framer Motion + Lenis. Dark-first "Signal / Surface" identity (graphite/charcoal, warm off-white, vivid amber #FF6B00 accent), warm-paper light mode, intro loader, kinetic hero with masked line reveals, device mockups (iPhone/desktop frames, user replaces images later), selected-work gallery, 4 résumé-fact case studies (MyBuddy NDA-safe), scroll-linked timeline, categorized capabilities, philosophy, honest contact form (endpoint or mailto), résumé PDF download, full a11y + reduced motion.

## Architecture
- Frontend only (CRA + craco + TypeScript 5): /app/frontend
  - src/App.tsx — router, route transitions, lenis init, grain, skip link, sonner
  - src/theme/ThemeProvider.tsx + inline no-flash script in public/index.html (localStorage `gm-theme`, prefers-color-scheme)
  - src/data/projects.ts — data-driven case studies + image URLs (REPLACE VISUALS HERE)
  - src/data/site.ts — profile, proof points, capabilities, timeline, principles
  - src/components/motion/Reveal.tsx — MaskedLines (useInView-driven), FadeUp, SectionLabel, CountUp
  - src/components/DeviceMockups.tsx — IPhoneFrame, DesktopFrame, SignalChart
  - src/components/layout/Nav.tsx, Footer.tsx; IntroLoader.tsx
  - src/components/home/* — Hero, Ticker, WorkGallery, ExperienceTimeline, Capabilities, Philosophy, ContactSection
  - src/pages/Home.tsx, CaseStudy.tsx, NotFound.tsx
  - public/resume/Gaurav-Malode-Resume.pdf — real résumé
- Backend untouched (default FastAPI service, not used by site).

## Environment
- REACT_APP_BACKEND_URL (existing, unused by site)
- REACT_APP_CONTACT_ENDPOINT (optional — if set, contact form POSTs JSON {name,email,topic,message}; otherwise opens prefilled mailto). NOTE: brief said VITE_CONTACT_ENDPOINT; CRA requires REACT_APP_ prefix.

## Implemented (2026-09-03)
All sections/routes above; verified: all 6 routes, theme toggle + persistence across reload, PDF serves (200 application/pdf), mobile drawer + stacked timeline accordion, contact validation + honest mailto state (no fake success), production `yarn build` passes.

## Known notes
- MaskedLines uses useInView+animate (whileInView was unreliable with StrictMode remount).
- Mockup imagery is placeholder stock in projects.ts — user will swap.
- No backend/auth → no test credentials.

## Implemented (2026-06 — Design refresh per user feedback)
- Fonts switched to famous readable set: Poppins (display/headings) + Inter (body), JetBrains Mono for labels. Removed Cabinet Grotesk / Instrument Serif / DM Sans.
- Default theme is now LIGHT (index.html + ThemeProvider); user can still toggle to dark. theme-color + no-flash script updated.
- Custom cursor made theme-aware & visible in light mode: solid `bg-ink` dot (default), ink ring (link hover), orange fill (view). Removed white mix-blend-difference.
- Light-mode contrast improved: darkened --sub (71 73 82) and --faint (107 109 120), muted-foreground 34%.
- Hero redesigned minimal/editorial (pleurat-inspired): left-aligned medium/large headline (clamp max ~4.1rem, no longer oversized), description + CTAs in right column, 4-up meta strip, big name block kept at bottom.
- NEW page transition system: `src/components/ux/PageTransition.tsx` — 4 canvas-colored vertical columns slide up staggered on navigation. Wired to: nav links (section + page), Hero "Selected work" CTA, work cards, case-study back + next links. Also plays as intro "Welcome" reveal on first load (replaces old IntroLoader).

## Backlog
- P1: Swap in real product screenshots (projects.ts images).
- P1: Wire REACT_APP_CONTACT_ENDPOINT to a real form service (e.g. Resend/Formspree).
- P2: Pinned layered-scroll work cards on desktop; OG/meta social image; sitemap.
