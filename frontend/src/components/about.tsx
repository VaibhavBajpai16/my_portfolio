"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site-config";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { AmbientGlow } from "./ambient-glow";
import { SectionHeading } from "./section-heading";

const slideLeft = {
  hidden: { opacity: 0, x: 16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function About() {
  return (
    <section id="about" className="relative overflow-hidden">
      <AmbientGlow position="top-right" color="accent" size={30} />

      <div className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading eyebrow="About" title="A bit about me" number="01" />

        <div className="grid gap-10 sm:grid-cols-3">
          <motion.div
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-4 sm:col-span-2"
          >
            {siteConfig.bio.map((paragraph) => (
              <motion.p
                key={paragraph}
                variants={fadeUp}
                className="text-base leading-relaxed text-muted sm:text-lg"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          <motion.dl
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-6 sm:border-l sm:border-border sm:pl-8"
          >
            <motion.div variants={slideLeft}>
              <dt className="text-xs uppercase tracking-widest text-muted">
                Location
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {siteConfig.location}
              </dd>
            </motion.div>
            <motion.div variants={slideLeft}>
              <dt className="text-xs uppercase tracking-widest text-muted">
                Email
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-accent"
                >
                  {siteConfig.email}
                </a>
              </dd>
            </motion.div>
            <motion.div variants={slideLeft}>
              <dt className="text-xs uppercase tracking-widest text-muted">
                Role
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {siteConfig.role}
              </dd>
            </motion.div>
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
