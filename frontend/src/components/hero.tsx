"use client";

import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Briefcase, Mail } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, type MouseEvent } from "react";
import { siteConfig } from "@/data/site-config";
import { GithubIcon, LinkedinIcon } from "./icons";
import { Magnetic } from "./magnetic";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const blob1X = useTransform(springX, [-1, 1], [-24, 24]);
  const blob1Y = useTransform(springY, [-1, 1], [-24, 24]);
  const blob2X = useTransform(springX, [-1, 1], [30, -30]);
  const blob2Y = useTransform(springY, [-1, 1], [30, -30]);

  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  return (
    <section
      id="top"
      onMouseMove={handlePointerMove}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-16"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          style={{ x: blob1X, y: blob1Y }}
          className="absolute left-1/2 top-[-12%] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[130px]"
        />
        <motion.div
          style={{ x: blob2X, y: blob2Y }}
          className="absolute right-[8%] top-[30%] h-[24rem] w-[24rem] rounded-full bg-accent-2/15 blur-[110px]"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)] [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:64px_64px] opacity-[0.35]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        <div>
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-foreground/70 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for new opportunities
          </motion.p>

          <h1 className="flex flex-wrap text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
            {siteConfig.name.split(" ").map((word, i) => (
              <span key={word} className="mr-[0.25em] overflow-hidden pb-1">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.25 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 flex items-center gap-2 text-xl font-medium sm:text-2xl"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
            <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
              {siteConfig.role}
            </span>
          </motion.p>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative overflow-hidden rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-[0_0_0_0_var(--accent)] transition-shadow duration-300 hover:shadow-[0_10px_30px_-8px_var(--accent)]"
              >
                <span className="relative z-10">View my work</span>
              </motion.a>
            </Magnetic>
            <Magnetic>
              <motion.a
                href={siteConfig.resumeUrl}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full border border-border bg-background/50 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
              >
                Download resume
              </motion.a>
            </Magnetic>

            <div className="ml-2 flex items-center gap-1.5">
              {siteConfig.socials.github && (
                <IconLink href={siteConfig.socials.github} label="GitHub">
                  <GithubIcon className="h-4 w-4" />
                </IconLink>
              )}
              {siteConfig.socials.linkedin && (
                <IconLink href={siteConfig.socials.linkedin} label="LinkedIn">
                  <LinkedinIcon className="h-4 w-4" />
                </IconLink>
              )}
              <IconLink href={`mailto:${siteConfig.email}`} label="Email">
                <Mail className="h-4 w-4" />
              </IconLink>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
          className="relative mx-auto mb-10 w-56 sm:w-72 lg:order-last lg:mb-0 lg:w-full lg:max-w-sm"
        >
          <div
            aria-hidden
            className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-gradient-to-br from-accent/25 via-accent-2/15 to-transparent blur-3xl"
          />

          <div
            aria-hidden
            className="absolute inset-0 rotate-[-4deg] rounded-[2.25rem] border border-border/80"
          />

          <TiltPhoto />

          <div className="absolute -bottom-5 left-1/2 flex w-max -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground shadow-lg sm:left-auto sm:right-4 sm:translate-x-0">
            <Briefcase className="h-3.5 w-3.5 shrink-0 text-accent" />
            <span>
              <YearsCounter />+ Years Experience
            </span>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <a
          href="#about"
          aria-label="Scroll to about section"
          className="flex h-9 w-6 items-start justify-center rounded-full border border-border/80 p-1.5 transition-colors hover:border-accent"
        >
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-foreground/50"
          />
        </a>
      </div>
    </section>
  );
}

function YearsCounter() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, 3, {
      duration: 1.2,
      delay: 0.9,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [count]);

  return <motion.span>{rounded}</motion.span>;
}

function TiltPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative rounded-[2rem] bg-gradient-to-br from-accent to-accent-2 p-[3px] shadow-2xl"
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-[1.85rem] bg-card">
          <Image
            src="/myImage.png"
            alt={siteConfig.name}
            fill
            priority
            sizes="(min-width: 1024px) 384px, 288px"
            className="object-cover object-[50%_48%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-foreground/60 transition-all hover:-translate-y-0.5 hover:border-border hover:bg-card hover:text-accent"
    >
      {children}
    </a>
  );
}
