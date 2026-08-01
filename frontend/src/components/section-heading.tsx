"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const eyebrowVariant = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const wordVariant = {
  hidden: { y: "110%" },
  show: {
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function SectionHeading({
  eyebrow,
  title,
  number,
}: {
  eyebrow: string;
  title: string;
  number?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={container}
      className="relative mb-12 flex items-start justify-between gap-6"
    >
      <div>
        <motion.p
          variants={eyebrowVariant}
          className="mb-2 font-mono text-xs uppercase tracking-widest text-accent"
        >
          {eyebrow}
        </motion.p>
        <h2 className="flex flex-wrap text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title.split(" ").map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="mr-[0.22em] overflow-hidden pb-1"
            >
              <motion.span variants={wordVariant} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))}
        </h2>
        <motion.span
          variants={eyebrowVariant}
          className="mt-4 block h-px w-16 origin-left bg-gradient-to-r from-accent to-accent-2"
        />
      </div>

      {number && (
        <motion.span
          variants={eyebrowVariant}
          className="hidden select-none font-mono text-6xl font-semibold text-foreground/[0.06] sm:block sm:text-7xl"
          aria-hidden
        >
          {number}
        </motion.span>
      )}
    </motion.div>
  );
}
