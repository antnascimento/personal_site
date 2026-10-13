"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

// ─── constants ────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 75;

const FRAME_PATH = (index: number): string => {
  const padded = String(index).padStart(2, "0");
  return `/sequence/frame_${padded}_delay-0.067s.webp`;
};

// ─── cover-fill draw helper ───────────────────────────────────────────────────
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number
) {
  const imgAspect = img.naturalWidth / img.naturalHeight;
  const canvasAspect = canvasW / canvasH;

  let sx = 0,
    sy = 0,
    sw = img.naturalWidth,
    sh = img.naturalHeight;

  if (imgAspect > canvasAspect) {
    sw = img.naturalHeight * canvasAspect;
    sx = (img.naturalWidth - sw) / 2;
  } else {
    sh = img.naturalWidth / canvasAspect;
    sy = (img.naturalHeight - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvasW, canvasH);
}

// ─── component ────────────────────────────────────────────────────────────────
interface ScrollyCanvasProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  onLoadProgress?: (progress: number) => void;
  onReady?: () => void;
}

export default function ScrollyCanvas({
  containerRef,
  onLoadProgress,
  onReady,
}: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  // ── scroll tracking ─────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  );

  // ── render function ─────────────────────────────────────────────────────
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const img = imagesRef.current[Math.round(index)];
    if (!img?.complete || !img.naturalWidth) return;

    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawCover(ctx, img, canvas.width, canvas.height);
  }, []);

  // ── resize handler ──────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrameRef.current);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [renderFrame]);

  // ── preload all frames ──────────────────────────────────────────────────
  useEffect(() => {
    let isCancelled = false;
    const loadedIndices = new Set<number>();
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    const markLoaded = (i: number) => {
      if (isCancelled || loadedIndices.has(i)) return;
      loadedIndices.add(i);
      onLoadProgress?.(loadedIndices.size / TOTAL_FRAMES);

      if (i === 0) {
        currentFrameRef.current = 0;
        renderFrame(0);
      }

      if (loadedIndices.size >= TOTAL_FRAMES) {
        onReady?.();
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      images[i] = img;
      const idx = i;
      img.onload = () => markLoaded(idx);
      img.onerror = () => markLoaded(idx);
      img.src = FRAME_PATH(i);
      if (img.complete && img.naturalWidth > 0) {
        markLoaded(idx);
      }
    }

    const fallback = setTimeout(() => {
      if (!isCancelled) {
        renderFrame(0);
        onReady?.();
      }
    }, 2500);

    return () => {
      isCancelled = true;
      clearTimeout(fallback);
    };
  }, [renderFrame, onLoadProgress, onReady]);

  // ── scroll → rAF → canvas paint ─────────────────────────────────────
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const index = Math.round(latest);
    if (index === currentFrameRef.current) return;
    currentFrameRef.current = index;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => renderFrame(index));
  });

  return (
    <canvas
      ref={canvasRef}
      className="block w-full h-full"
      style={{ background: "#121212" }}
    />
  );
}
