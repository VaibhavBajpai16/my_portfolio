"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Mail } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/data/site-config";
import { CARD_DEPTH } from "@/lib/styles";
import { GithubIcon, LinkedinIcon } from "./icons";
import { Magnetic } from "./magnetic";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-16 text-center shadow-sm sm:px-16 ${CARD_DEPTH}`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accent/10 via-accent-2/10 to-transparent blur-3xl" />
        </div>

        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
          Contact
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Let&apos;s work together
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base text-muted">
          I&apos;m currently open to new roles and freelance work. The
          fastest way to reach me is by email.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Magnetic strength={0.25}>
            <motion.a
              href={`mailto:${siteConfig.email}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-[0_0_0_0_var(--accent)] transition-shadow duration-300 hover:shadow-[0_10px_30px_-8px_var(--accent)]"
            >
              <Mail className="h-4 w-4" />
              {siteConfig.email}
            </motion.a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <motion.button
              type="button"
              onClick={copyEmail}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                copied
                  ? "border-emerald-500/50 text-emerald-500"
                  : "border-border text-foreground hover:border-accent hover:text-accent"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "check" : "copy"}
                  initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </motion.span>
              </AnimatePresence>
              {copied ? "Copied" : "Copy email"}
            </motion.button>
          </Magnetic>
        </div>

        {(siteConfig.socials.github || siteConfig.socials.linkedin) && (
          <div className="mt-10 flex items-center justify-center gap-3 text-foreground/60">
            {siteConfig.socials.github && (
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-all hover:-translate-y-0.5 hover:bg-background hover:text-foreground"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
            )}
            {siteConfig.socials.linkedin && (
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-all hover:-translate-y-0.5 hover:bg-background hover:text-foreground"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            )}
          </div>
        )}
      </motion.div>
    </section>
  );
}
