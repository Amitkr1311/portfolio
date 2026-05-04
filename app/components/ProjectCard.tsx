"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  liveLink?: string;
  gradient: string;
  image?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

const accentFromGradient: Record<string, string> = {
  "from-cyan-500 to-blue-500": "#0e7490",
  "from-purple-500 to-pink-500": "#7e22ce",
  "from-orange-500 to-red-500": "#c2410c",
  "from-emerald-500 to-teal-500": "#047857",
  "from-indigo-500 to-violet-500": "#4338ca",
};

function LinkButton({
  href,
  icon: Icon,
  children,
  variant = "solid",
  accent,
}: {
  href: string;
  icon: LucideIcon;
  children: ReactNode;
  variant?: "solid" | "outline";
  accent?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  if (variant === "outline") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} border border-border bg-background text-foreground hover:bg-muted`}
      >
        <Icon className="h-4 w-4" aria-hidden />
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} text-white shadow-lg hover:brightness-110`}
      style={{ backgroundColor: accent ?? "hsl(var(--primary))" }}
    >
      <Icon className="h-4 w-4" aria-hidden />
      {children}
    </a>
  );
}

/** Scroll: fades up when entering; reverses when scrolling away (once: false). */
function FeaturedCard({
  project,
  accent,
  hasCode,
  hasLive,
}: {
  project: Project;
  accent: string;
  hasCode: boolean;
  hasLive: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-full overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl shadow-black/[0.06] dark:shadow-black/40"
    >
      <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        {/* Visual */}
        <div className="relative min-h-[240px] overflow-hidden bg-muted sm:min-h-[300px] lg:min-h-[340px]">
          {project.image ? (
            <img
              src={project.image}
              alt={`Preview of ${project.title}`}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className={`flex h-full min-h-[240px] items-center justify-center bg-gradient-to-br ${project.gradient} opacity-80`} />
          )}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-card/95"
            aria-hidden
          />
          <div
            className="absolute left-0 top-0 h-full w-1 opacity-90 lg:block"
            style={{
              background: `linear-gradient(180deg, ${accent}, transparent)`,
            }}
          />
        </div>

        {/* Copy + actions */}
        <div className="relative flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:py-14 lg:pl-10 lg:pr-12">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
            Featured project
          </p>
          <h3 className="mt-3 font-sans text-2xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-3xl lg:text-[2rem]">
            {project.title}
          </h3>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground lg:text-base">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {hasLive && (
              <LinkButton href={project.liveLink!} icon={ExternalLink} accent={accent}>
                View live
              </LinkButton>
            )}
            {hasCode && (
              <LinkButton href={project.link!} icon={Github} variant="outline">
                Source
              </LinkButton>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-6">
            {project.tags.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 6 && (
              <span className="rounded-full px-3 py-1 text-xs text-muted-foreground">
                +{project.tags.length - 6} more
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/** Scroll: slides in from the right; slides back when scrolling up out of view. */
function GridCard({
  project,
  index,
  accent,
  hasCode,
  hasLive,
}: {
  project: Project;
  index: number;
  accent: string;
  hasCode: boolean;
  hasLive: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const stagger = Math.max(0, index - 1) * 0.09;

  return (
    <motion.article
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 72 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.18, margin: "-10% 0px -6% 0px" }}
      transition={{
        duration: 0.55,
        delay: reduceMotion ? 0 : stagger,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col"
    >
      {/* Outer frame */}
      <div className="rounded-[1.65rem] bg-gradient-to-b from-muted/80 to-muted/30 p-[10px] pb-0 ring-1 ring-border/60 dark:from-muted/40 dark:to-muted/15">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted shadow-inner ring-1 ring-black/5 dark:ring-white/10">
          {project.image ? (
            <img
              src={project.image}
              alt={`Preview of ${project.title}`}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className={`flex h-full items-center justify-center bg-gradient-to-br ${project.gradient} opacity-70`} />
          )}
          {/* Quick links — top corner, always visible */}
          <div className="absolute right-3 top-3 flex gap-2">
            {hasCode && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/90 text-foreground shadow-md backdrop-blur-md ring-1 ring-border transition hover:bg-background hover:ring-primary/40"
                aria-label="Open GitHub repository"
              >
                <Github className="h-[18px] w-[18px]" />
              </a>
            )}
            {hasLive && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md ring-1 ring-white/20 transition hover:brightness-110"
                style={{ backgroundColor: accent }}
                aria-label="Open live site"
              >
                <ExternalLink className="h-[18px] w-[18px]" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Floating content sheet */}
      <div className="relative z-10 -mt-6 px-1 sm:px-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] ring-1 ring-border/50 transition duration-300 group-hover:border-primary/25 group-hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.18)] dark:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)]">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-sans text-lg font-bold leading-snug tracking-tight text-foreground sm:text-xl">
              {project.title}
            </h3>
            <span
              className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 text-muted-foreground transition group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-primary"
              aria-hidden
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {(hasCode || hasLive) && (
            <div className="mt-5 flex flex-wrap gap-2">
              {hasCode && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline decoration-primary/40 underline-offset-4 transition hover:text-primary hover:decoration-primary"
                >
                  <Github className="h-4 w-4" aria-hidden />
                  Repository
                </a>
              )}
              {hasLive && (
                <>
                  {hasCode && <span className="text-muted-foreground/40">·</span>}
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold underline decoration-primary/50 underline-offset-4 transition hover:brightness-125"
                    style={{ color: accent }}
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden />
                    Live site
                  </a>
                </>
              )}
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const accent = accentFromGradient[project.gradient] ?? "#2dd4bf";
  const hasCode = Boolean(project.link?.trim());
  const hasLive = Boolean(project.liveLink?.trim());

  if (featured) {
    return (
      <FeaturedCard project={project} accent={accent} hasCode={hasCode} hasLive={hasLive} />
    );
  }

  return (
    <GridCard
      project={project}
      index={index}
      accent={accent}
      hasCode={hasCode}
      hasLive={hasLive}
    />
  );
}
