import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DesktopFrame,
  IPhoneFrame,
  SignalChart,
} from "@/components/DeviceMockups";
import { EASE, FadeUp, MaskedLines, SectionLabel } from "@/components/motion/Reveal";
import { PROJECTS, type Project } from "@/data/projects";

function CardVisual({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-surface2/50">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
        whileInView={{ clipPath: "inset(0 0 0% 0)" }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <motion.div
          className="relative flex h-full w-full items-center justify-center p-8 transition-transform duration-500 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
          initial={reduce ? false : { scale: 1.04 }}
          whileInView={{ scale: 1.04 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {project.mockup === "phones" && (
            <div className="flex items-end justify-center gap-4">
              <IPhoneFrame
                src={project.images.primary}
                alt={project.imageAlts.primary}
                className="w-[38%] -rotate-3"
              />
              <IPhoneFrame
                src={project.images.secondary}
                alt={project.imageAlts.secondary}
                className="w-[38%] rotate-2 translate-y-4"
              />
            </div>
          )}
          {project.mockup === "phone-desktop" && (
            <div className="relative w-full max-w-sm">
              <DesktopFrame
                src={project.images.secondary}
                alt={project.imageAlts.secondary}
                title={project.frameTitle}
              />
              <IPhoneFrame
                src={project.images.primary}
                alt={project.imageAlts.primary}
                className="absolute -bottom-6 -right-4 w-[34%]"
              />
            </div>
          )}
          {(project.mockup === "desktop" || project.mockup === "browser") && (
            <div className="relative w-full max-w-md">
              <DesktopFrame
                src={project.images.primary}
                alt={project.imageAlts.primary}
                title={project.frameTitle}
              />
              <div className="absolute -bottom-4 -left-4 w-36 border border-hairline bg-surface p-2">
                <SignalChart className="h-8 w-full text-ink" />
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/70 to-transparent p-5 pt-12 transition-transform duration-500 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/90">
          {project.cardOutcome}
        </p>
      </div>
    </div>
  );
}

function WorkCard({ project, wide }: { project: Project; wide: boolean }) {
  return (
    <FadeUp className={wide ? "lg:col-span-7" : "lg:col-span-5"}>
      <Link
        to={`/work/${project.slug}`}
        data-testid={`work-card-${project.slug}`}
        className="group block border border-hairline bg-surface/40 transition-colors duration-300 hover:bg-surface focus-visible:bg-surface"
      >
        <CardVisual project={project} />
        <div className="flex items-start justify-between gap-4 border-t border-hairline p-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
              {project.index} // {project.domain}
            </p>
            <h3 className="mt-2 font-display text-xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1 sm:text-2xl">
              {project.product}
            </h3>
            <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-sub">
              {project.platforms.join(" · ")}
            </p>
            <p className="mt-3 text-sm text-sub lg:hidden">
              {project.cardOutcome}
            </p>
          </div>
          <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline text-sub transition-all duration-300 group-hover:border-signal group-hover:text-signal group-focus-visible:border-signal group-focus-visible:text-signal">
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </FadeUp>
  );
}

export function WorkGallery() {
  return (
    <section id="work" className="scroll-mt-24 py-24 sm:py-32" aria-label="Selected work">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionLabel index="01" title="Selected Work" />
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl">
            <MaskedLines lines={["Production work,", "proven in the wild."]} />
          </h2>
          <FadeUp delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-sub">
              Four products shipped to real users — halal investing at global
              scale, enterprise banking security, a desktop market terminal,
              and an AI SaaS built end-to-end.
            </p>
          </FadeUp>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {PROJECTS.map((p, i) => (
            <WorkCard key={p.slug} project={p} wide={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
