"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";

// Lazy-load client components
const ScrollyCanvas = dynamic(() => import("@/components/ScrollyCanvas"), {
  ssr: false,
});
const Overlay = dynamic(() => import("@/components/Overlay"), {
  ssr: false,
});
const Projects = dynamic(() => import("@/components/Projects"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
});

export default function HomePage() {
  const scrollyRef = useRef<HTMLDivElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const handleProgress = useCallback((p: number) => {
    setLoadProgress(p);
  }, []);

  const handleReady = useCallback(() => {
    setIsReady(true);
  }, []);

  // Guarantee loading screen clears even if browser network is throttled
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 3500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="relative bg-background">
      {/*
       * ── Scrolly section ─────────────────────────────────────────────────
       * scrollyRef is the 500vh container.
       * The sticky container pinned inside is 100vh (h-screen).
       * BOTH ScrollyCanvas and Overlay live inside this sticky 100vh viewport
       * so Overlay text is centered on the actual screen at all times.
       */}
      <div ref={scrollyRef} className="relative" style={{ height: "500vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Canvas renders the background frame sequence */}
          <ScrollyCanvas
            containerRef={scrollyRef}
            onLoadProgress={handleProgress}
            onReady={handleReady}
          />

          {/* Overlay sits directly on top of the canvas in the 100vh viewport */}
          <Overlay containerRef={scrollyRef} />
        </div>
      </div>

      {/* ── Projects grid ─────────────────────────────────────────── */}
      <Projects />

      {/* ── Footer / About / Contact ──────────────────────────────── */}
      <Footer />

      {/* ── Initial preloader screen ──────────────────────────────── */}
      <AnimatePresence>
        {!isReady && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-6"
            >
              <p className="text-xs tracking-[0.4em] uppercase text-foreground/40 font-light">
                António Nascimento
              </p>

              <div className="w-64 h-px bg-white/[0.08] overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  style={{ width: `${Math.round(loadProgress * 100)}%` }}
                  transition={{ duration: 0.15 }}
                />
              </div>

              <p className="text-xs tracking-[0.4em] uppercase text-foreground/20 font-mono">
                {Math.round(loadProgress * 100)}%
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
