"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { projects, type Project } from "@/data/site-config";
import { CARD_DEPTH } from "@/lib/styles";
import { AmbientGlow } from "./ambient-glow";
import { GithubIcon } from "./icons";
import { SectionHeading } from "./section-heading";
import { useSpotlight } from "./use-spotlight";

export function Projects() {
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="relative overflow-hidden">
      <AmbientGlow position="top-right" color="accent-2" size={30} />

      <div className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading eyebrow="Projects" title="Things I've built" number="03" />

        {featured.length > 0 && (
          <div className="mb-6 flex flex-col gap-6">
            {featured.map((project, i) => (
              <FeaturedProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          {rest.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex shrink-0 items-center gap-3 text-foreground/50">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on GitHub`}
          className="transition-all hover:-translate-y-0.5 hover:text-accent"
        >
          <GithubIcon className="h-4 w-4" />
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live site`}
          className="transition-all hover:-translate-y-0.5 hover:text-accent"
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}

function FeaturedProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { ref, onMouseMove } = useSpotlight<HTMLElement>();

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-3xl border border-accent/30 bg-card p-6 shadow-sm transition-all duration-300 hover:border-accent/60 hover:shadow-xl sm:p-8 ${CARD_DEPTH}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--accent) 10%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-64 w-64 rounded-full bg-gradient-to-br from-accent/20 via-accent-2/10 to-transparent blur-3xl"
      />

      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            Featured Project
          </span>
          <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {project.description}
          </p>
        </div>
        <ProjectLinks project={project} />
      </div>

      {project.highlights && (
        <ul className="relative mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {project.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex gap-2.5 text-sm leading-relaxed text-muted"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {highlight}
            </li>
          ))}
        </ul>
      )}

      <div className="relative mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="cursor-default rounded-full border border-border bg-background px-2.5 py-1 text-xs text-foreground/70"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, onMouseMove } = useSpotlight<HTMLElement>();

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-accent/50 hover:shadow-xl ${CARD_DEPTH}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--accent) 10%, transparent), transparent 70%)",
        }}
      />
      <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2 transition-transform duration-300 ease-out group-hover:scale-x-100" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-medium text-foreground">
            {project.title}
          </h3>
          <ProjectLinks project={project} />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        {project.highlights && (
          <ul className="mt-4 space-y-2">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-2 text-sm leading-relaxed text-muted"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {highlight}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="cursor-default rounded-full bg-background px-2.5 py-1 text-xs text-foreground/70 transition-colors duration-200 group-hover:border group-hover:border-border"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
