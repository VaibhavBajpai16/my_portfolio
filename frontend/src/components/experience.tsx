"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/site-config";
import { AmbientGlow } from "./ambient-glow";
import { SectionHeading } from "./section-heading";

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden">
      <AmbientGlow position="bottom-left" color="accent" size={32} />

      <div className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          number="04"
        />

        <div className="relative pl-8">
          <motion.div
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-0 top-1 h-full w-px bg-gradient-to-b from-accent via-border to-transparent"
          />

          <div className="space-y-10">
            {experience.map((job, i) => (
              <motion.div
                key={`${job.company}-${job.role}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="group relative"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.1 + 0.3,
                    ease: "backOut",
                  }}
                  className="absolute -left-[2.15rem] top-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-accent to-accent-2 shadow-[0_0_0_3px_var(--background)] transition-shadow duration-300 group-hover:shadow-[0_0_0_3px_var(--background),0_0_0_6px_color-mix(in_srgb,var(--accent)_25%,transparent)]"
                />

                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  {job.period}
                </p>
                <h3 className="mt-1 text-lg font-medium text-foreground">
                  {job.role} ·{" "}
                  {job.companyUrl ? (
                    <a
                      href={job.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      {job.company}
                    </a>
                  ) : (
                    <span className="text-accent">{job.company}</span>
                  )}
                </h3>
                <ul className="mt-3 space-y-2">
                  {job.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="text-sm leading-relaxed text-muted"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
