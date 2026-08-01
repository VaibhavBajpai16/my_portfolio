"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/site-config";
import { CARD_DEPTH } from "@/lib/styles";
import { AmbientGlow } from "./ambient-glow";
import { SectionHeading } from "./section-heading";
import { useSpotlight } from "./use-spotlight";

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden">
      <AmbientGlow position="top-left" color="accent-2" size={28} />

      <div className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading eyebrow="Skills" title="Tools I work with" number="02" />

        <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <SkillCard key={group.category} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  group,
  index,
}: {
  group: (typeof skills)[number];
  index: number;
}) {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();
  const isAlt = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 ${CARD_DEPTH} ${
        isAlt
          ? "hover:border-accent-2/50 hover:shadow-md"
          : "hover:border-accent/50 hover:shadow-md"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--${
            isAlt ? "accent-2" : "accent"
          }) 12%, transparent), transparent 70%)`,
        }}
      />

      <h3 className="relative mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
        <span
          className={`h-1.5 w-1.5 rounded-full ${isAlt ? "bg-accent-2" : "bg-accent"}`}
        />
        {group.category}
      </h3>
      <div className="relative flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className={`cursor-default rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground/80 transition-all duration-200 hover:-translate-y-0.5 ${
              isAlt
                ? "hover:border-accent-2 hover:text-accent-2"
                : "hover:border-accent hover:text-accent"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
