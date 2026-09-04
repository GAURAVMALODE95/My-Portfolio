import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DesktopFrame, IPhoneFrame } from "@/components/DeviceMockups";
import { CountUp, EASE, FadeUp, MaskedLines } from "@/components/motion/Reveal";
import { usePageTransition } from "@/components/ux/PageTransition";
import { Tag } from "@/components/ux/Tag";
import { getProject, nextProject, type Project } from "@/data/projects";
import { useSeo } from "@/hooks/useSeo";
import { scrollToId } from "@/lib/lenis";
import NotFound from "@/pages/NotFound";

const MINI_NAV = [
  { id: "overview", label: "Overview" },
  { id: "scope", label: "Scope" },
  { id: "build", label: "Build" },
  { id: "outcomes", label: "Outcomes" },
  { id: "stack", label: "Stack" },
];

function CaseVisual({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: EASE }}
      className="overflow-hidden border border-hairline bg-surface2/40"
      data-testid="case-hero-visual"
    >
      <motion.div
        initial={reduce ? false : { scale: 1.04 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: EASE }}
        className="relative flex min-h-[320px] items-center justify-center p-8 sm:min-h-[420px] sm:p-14"
      >
        {(project.mockup === "phones" || project.mockup === "phone-desktop") && (
          <div className="flex items-end justify-center gap-5 sm:gap-8">
            <IPhoneFrame
              src={project.images.primary}
              alt={project.imageAlts.primary}
              className="w-[36%] max-w-[220px] -rotate-2"
              priority
            />
            <IPhoneFrame
              src={project.images.secondary}
              alt={project.imageAlts.secondary}
              className="w-[36%] max-w-[220px] translate-y-6 rotate-2"
              priority
            />
          </div>
        )}
        {(project.mockup === "desktop" || project.mockup === "browser") && (
          <div className="relative w-full max-w-2xl">
            <DesktopFrame
              src={project.images.primary}
              alt={project.imageAlts.primary}
              title={project.frameTitle}
              priority
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function MiniNav() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    MINI_NAV.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="sticky top-16 z-30 hidden border-b border-hairline bg-canvas/85 backdrop-blur-md lg:block" data-testid="case-mini-nav">
      <div className="mx-auto flex max-w-7xl items-center gap-8 px-5 sm:px-8">
        {MINI_NAV.map((s) => (
          <button
            key={s.id}
            type="button"
            data-testid={`case-nav-${s.id}`}
            onClick={() => scrollToId(s.id, -120)}
            className={`relative py-4 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
              active === s.id ? "text-ink" : "text-faint hover:text-sub"
            }`}
          >
            {s.label}
            <span
              className={`absolute bottom-0 left-0 h-px w-full bg-signal transition-transform duration-300 ${
                active === s.id ? "scale-x-100" : "scale-x-0"
              }`}
              style={{ transformOrigin: "left" }}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ id, index, title }: { id: string; index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-5">
      <span className="font-mono text-[11px] tracking-[0.2em] text-signal">{index}</span>
      <h2 id={`${id}-heading`} className="font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { runTransition } = usePageTransition();
  const project = slug ? getProject(slug) : undefined;
  useSeo(
    project ? `${project.title} — Gaurav Malode` : "Not found — Gaurav Malode",
    project?.impact ?? "This page does not exist.",
  );

  if (!project) return <NotFound />;

  const next = nextProject(project.slug);

  return (
    <article data-testid={`case-study-${project.slug}`}>
      <MiniNav />

      <header className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 lg:pt-24">
        <Link
          to="/"
          data-testid="case-back-link"
          onClick={(e) => {
            e.preventDefault();
            runTransition(() => navigate("/"));
          }}
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-faint transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
          All work
        </Link>

        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.3em] text-faint">
          <span className="text-signal">{project.index}</span> — {project.domain}
        </p>
        <h1 className="mt-5 font-display text-5xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-7xl lg:text-[6.5rem]">
          <MaskedLines lines={[project.product]} />
        </h1>
        <FadeUp delay={0.25}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sub sm:text-xl">
            {project.impact}
          </p>
        </FadeUp>

        <FadeUp delay={0.35}>
          <dl className="mt-12 grid grid-cols-2 gap-px border border-hairline bg-hairline lg:grid-cols-4" data-testid="case-meta-grid">
            {[
              { k: "Role", v: project.role },
              { k: "Platforms", v: project.platforms.join(", ") },
              { k: "Stack", v: project.stack.slice(0, 4).join(", ") },
              { k: "Timeframe", v: project.timeframe },
            ].map((m) => (
              <div key={m.k} className="bg-canvas p-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                  {m.k}
                </dt>
                <dd className="mt-2 text-sm font-medium leading-snug">{m.v}</dd>
              </div>
            ))}
          </dl>
        </FadeUp>

        {project.nda && (
          <FadeUp delay={0.4}>
            <div className="mt-8 flex items-start gap-3 border border-signal/30 bg-signal/5 p-5" data-testid="case-nda-note" role="note">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-sub">
                <span className="font-semibold text-ink">NDA-safe case study.</span>{" "}
                Selected implementation details and screens are intentionally
                abstracted for client security and confidentiality.
              </p>
            </div>
          </FadeUp>
        )}

        <div className="mt-12">
          <CaseVisual project={project} />
        </div>
      </header>

      <section id="overview" aria-labelledby="overview-heading" className="mx-auto max-w-7xl scroll-mt-32 px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading id="overview" index="01" title="Context" />
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <FadeUp className="lg:col-span-8">
            {project.overview.map((p, i) => (
              <p key={i} className="mb-5 text-base leading-relaxed text-sub sm:text-lg">
                {p}
              </p>
            ))}
          </FadeUp>
          <FadeUp className="lg:col-span-4" delay={0.15}>
            <div className="border border-hairline bg-surface/40 p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                Responsibility
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                {project.role}
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <section id="scope" aria-labelledby="scope-heading" className="border-t border-hairline bg-surface/30">
        <div className="mx-auto max-w-7xl scroll-mt-32 px-5 py-20 sm:px-8 sm:py-28">
          <SectionHeading id="scope" index="02" title="The engineering focus" />
          <div className="mt-12 grid gap-px border border-hairline bg-hairline md:grid-cols-2">
            {project.scope.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.08} className="bg-canvas">
                <div className="h-full p-7 sm:p-9" data-testid={`case-scope-${i}`}>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-lg font-bold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-sub">{s.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section id="build" aria-labelledby="build-heading" className="mx-auto max-w-7xl scroll-mt-32 px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading id="build" index="03" title="What was built" />
        <div className="mt-12 space-y-0">
          {project.build.map((b, i) => (
            <FadeUp key={b.title} delay={i * 0.06}>
              <div className="grid gap-4 border-t border-hairline py-8 last:border-b md:grid-cols-12" data-testid={`case-build-${i}`}>
                <p className="font-mono text-xs tracking-[0.2em] text-faint md:col-span-2">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-xl font-bold tracking-tight md:col-span-4">
                  {b.title}
                </h3>
                <p className="text-sm leading-relaxed text-sub md:col-span-6">
                  {b.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section id="outcomes" aria-labelledby="outcomes-heading" className="border-t border-hairline bg-surface/30">
        <div className="mx-auto max-w-7xl scroll-mt-32 px-5 py-20 sm:px-8 sm:py-28">
          <SectionHeading id="outcomes" index="04" title="Results & impact" />
          <div className="mt-12 grid grid-cols-2 gap-px border border-hairline bg-hairline md:grid-cols-3 lg:grid-cols-5">
            {project.outcomes.map((o, i) => (
              <FadeUp key={o.label} delay={i * 0.07} className="bg-canvas">
                <div className="h-full p-6 sm:p-8" data-testid={`case-outcome-${i}`}>
                  <p className="font-display text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
                    {o.countTo !== undefined ? (
                      <CountUp to={o.countTo} suffix={o.suffix ?? ""} />
                    ) : (
                      o.display
                    )}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-faint">
                    {o.label}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
          {project.qualitativeOutcome && (
            <FadeUp delay={0.2}>
              <p className="mt-8 max-w-3xl text-base leading-relaxed text-sub">
                {project.qualitativeOutcome}
              </p>
            </FadeUp>
          )}
        </div>
      </section>

      <section id="stack" aria-labelledby="stack-heading" className="mx-auto max-w-7xl scroll-mt-32 px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading id="stack" index="05" title="Stack & methods" />
        <FadeUp>
          <div className="mt-10 flex flex-wrap gap-2.5" data-testid="case-stack-tags">
            {project.stack.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <figure className="mt-16 border-l-2 border-signal pl-6 sm:pl-8" data-testid="case-lesson">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
              Key lesson
            </p>
            <blockquote className="mt-4 max-w-3xl font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl">
              {project.lesson}
            </blockquote>
          </figure>
        </FadeUp>
      </section>

      <nav className="border-t border-hairline" aria-label="Next project">
        <Link
          to={`/work/${next.slug}`}
          data-testid="case-next-project"
          onClick={(e) => {
            e.preventDefault();
            runTransition(() => navigate(`/work/${next.slug}`));
          }}
          className="group mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-14 transition-colors hover:bg-surface/50 sm:px-8 sm:py-20"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
              Next project — {next.index}
            </p>
            <p className="mt-3 font-display text-3xl font-bold tracking-[-0.035em] transition-transform duration-500 ease-expo group-hover:translate-x-2 sm:text-6xl">
              {next.product}
            </p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-hairline text-sub transition-all duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-white sm:h-16 sm:w-16">
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>
      </nav>
    </article>
  );
}
