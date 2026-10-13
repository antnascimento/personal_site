"use client";

import React, { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";

// ─── text reveal animation helper ─────────────────────────────────────────────
function AnimatedText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + wi * 0.05,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ─── scroll progress bar ──────────────────────────────────────────────────────
function ScrollIndicator({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [1, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ opacity }}
      className="absolute top-0 left-0 right-0 h-px z-30 pointer-events-none"
    >
      <motion.div
        style={{ scaleX, transformOrigin: "left center" }}
        className="h-full bg-accent"
      />
    </motion.div>
  );
}

// ─── navbar ───────────────────────────────────────────────────────────────────
function Navbar({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <motion.nav
      style={{ opacity }}
      className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-6 pointer-events-none"
    >
      <span className="text-sm font-medium tracking-[0.2em] uppercase text-foreground/80">
        Portfolio
      </span>
      <div className="flex items-center gap-8 pointer-events-auto">
        {["Work", "Experience", "About", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm text-foreground/50 hover:text-accent transition-colors duration-300 tracking-wide"
          >
            {item}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}

// ─── frame counter ────────────────────────────────────────────────────────────
function FrameCounter({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const [frame, setFrame] = useState(0);
  const opacity = useTransform(
    scrollYProgress,
    [0.02, 0.08, 0.92, 0.98],
    [0, 1, 1, 0]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setFrame(Math.round(latest * 74));
  });

  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-8 right-8 z-20 font-mono text-xs text-foreground/25 tracking-widest pointer-events-none"
    >
      {String(frame).padStart(2, "0")} / 74
    </motion.div>
  );
}

// ─── main overlay component ───────────────────────────────────────────────────
interface OverlayProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function Overlay({ containerRef }: OverlayProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Section 1: Hero (visible immediately at scroll 0, fades out between 15% and 22%)
  const s1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.22], [1, 1, 0]);
  const s1Y = useTransform(scrollYProgress, [0, 0.22], [0, -60]);

  // Section 2: Craft (fades in 22% -> 30%, holds till 48%, fades out 48% -> 56%)
  const s2Opacity = useTransform(scrollYProgress, [0.22, 0.3, 0.48, 0.56], [0, 1, 1, 0]);
  const s2Y = useTransform(scrollYProgress, [0.22, 0.3, 0.48, 0.56], [40, 0, 0, -40]);

  // Section 3: Vision (fades in 58% -> 66%, holds till 82%, fades out 82% -> 90%)
  const s3Opacity = useTransform(scrollYProgress, [0.58, 0.66, 0.82, 0.9], [0, 1, 1, 0]);
  const s3Y = useTransform(scrollYProgress, [0.58, 0.66, 0.82, 0.9], [40, 0, 0, -40]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/* Scroll indicator bar */}
      <ScrollIndicator scrollYProgress={scrollYProgress} />

      {/* Top navigation */}
      <Navbar scrollYProgress={scrollYProgress} />

      {/* ── Section 1: 0% – 22% — Centered Hero ────────────────────────── */}
      <motion.div
        style={{ opacity: s1Opacity, y: s1Y }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-xs tracking-[0.4em] uppercase text-accent mb-6 font-medium"
        >
          Senior Software Engineer · Zalando
        </motion.p>

        <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-foreground">
          <AnimatedText text="António" delay={0.2} />
          <br />
          <AnimatedText text="Nascimento" delay={0.35} />
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 w-12 h-px bg-accent/60 mx-auto"
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-6 text-lg text-foreground/40 font-light tracking-wide max-w-sm"
        >
          Backend · Frontend · Berlin
        </motion.p>

        {/* Scroll hint indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-foreground/30">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-foreground/30 to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* ── Section 2: 25% – 56% — Left Aligned ────────────────────────── */}
      <motion.div
        style={{ opacity: s2Opacity, y: s2Y }}
        className="absolute inset-0 flex flex-col items-start justify-center px-12 md:px-24"
      >
        <div className="max-w-xl">
          <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-medium">
            01 / Craft
          </p>
          <h2 className="text-[clamp(2rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight text-foreground">
            I build digital
            <br />
            <span className="text-accent glow-accent-text">
              experiences.
            </span>
          </h2>
          <p className="mt-6 text-base text-foreground/40 font-light leading-relaxed max-w-md">
            Over 13 years crafting resilient backend architectures and interactive
            frontends for millions of users at Europe&apos;s leading fashion platform.
          </p>
        </div>
      </motion.div>

      {/* ── Section 3: 58% – 90% — Right Aligned ───────────────────────── */}
      <motion.div
        style={{ opacity: s3Opacity, y: s3Y }}
        className="absolute inset-0 flex flex-col items-end justify-center px-12 md:px-24"
      >
        <div className="max-w-xl text-right">
          <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-medium">
            02 / Vision
          </p>
          <h2 className="text-[clamp(2rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight text-foreground">
            Bridging design
            <br />
            <span className="text-accent glow-accent-text">
              and engineering.
            </span>
          </h2>
          <p className="mt-6 text-base text-foreground/40 font-light leading-relaxed max-w-md ml-auto">
            High-performance systems combined with intuitive interfaces — turning
            complex production workflows into seamless tools.
          </p>
        </div>
      </motion.div>

      {/* Frame counter */}
      <FrameCounter scrollYProgress={scrollYProgress} />
    </div>
  );
}
