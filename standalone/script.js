/**
 * António Nascimento — Portfolio Standalone
 * Pure vanilla JavaScript: No build tools, no Node.js server needed.
 * Works directly when double-clicking index.html.
 */

(function () {
  'use strict';

  const TOTAL_FRAMES = 75;
  const FRAME_PATH = (index) => {
    const padded = String(index).padStart(2, '0');
    return `sequence/frame_${padded}_delay-0.067s.webp`;
  };

  // DOM Elements
  const canvas = document.getElementById('scrolly-canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const container = document.getElementById('scrolly-container');
  const preloader = document.getElementById('preloader');
  const loaderBar = document.getElementById('loader-bar-fill');
  const loaderPercent = document.getElementById('loader-percent');
  const topProgressBar = document.getElementById('scroll-progress-bar');
  const frameCounter = document.getElementById('frame-counter');
  const navbar = document.getElementById('navbar');

  const sectionHero = document.getElementById('section-hero');
  const sectionCraft = document.getElementById('section-craft');
  const sectionVision = document.getElementById('section-vision');

  // State
  const images = new Array(TOTAL_FRAMES);
  let loadedCount = 0;
  let isReady = false;
  let currentFrame = 0;
  let rafId = null;

  // ── Linear Interpolation Helper ────────────────────────────
  function interpolate(value, inRange, outRange) {
    if (value <= inRange[0]) return outRange[0];
    if (value >= inRange[inRange.length - 1]) return outRange[outRange.length - 1];

    for (let i = 0; i < inRange.length - 1; i++) {
      if (value >= inRange[i] && value <= inRange[i + 1]) {
        const t = (value - inRange[i]) / (inRange[i + 1] - inRange[i]);
        return outRange[i] + t * (outRange[i + 1] - outRange[i]);
      }
    }
    return outRange[0];
  }

  // ── Cover-fill Drawing Helper ──────────────────────────────
  function drawCover(image) {
    if (!image || !image.complete || !image.naturalWidth) return;

    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const imgAspect = image.naturalWidth / image.naturalHeight;
    const canvasAspect = canvasW / canvasH;

    let sx = 0, sy = 0;
    let sw = image.naturalWidth;
    let sh = image.naturalHeight;

    if (imgAspect > canvasAspect) {
      sw = image.naturalHeight * canvasAspect;
      sx = (image.naturalWidth - sw) / 2;
    } else {
      sh = image.naturalWidth / canvasAspect;
      sy = (image.naturalHeight - sh) / 2;
    }

    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, canvasW, canvasH);
    ctx.drawImage(image, sx, sy, sw, sh, 0, 0, canvasW, canvasH);
  }

  function renderFrame(index) {
    const idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
    const img = images[idx];
    if (img && img.complete) {
      drawCover(img);
    }
  }

  // ── Canvas Resize ──────────────────────────────────────────
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    renderFrame(currentFrame);
  }

  window.addEventListener('resize', resizeCanvas);

  // ── Image Preloading ───────────────────────────────────────
  function finishLoading() {
    if (isReady) return;
    isReady = true;
    renderFrame(0);
    preloader.classList.add('loaded');
  }

  function handleImageLoad(i) {
    loadedCount++;
    const progress = Math.min(1, loadedCount / TOTAL_FRAMES);
    const pct = Math.round(progress * 100);

    if (loaderBar) loaderBar.style.width = pct + '%';
    if (loaderPercent) loaderPercent.textContent = pct + '%';

    if (i === 0) {
      renderFrame(0);
    }

    if (loadedCount >= TOTAL_FRAMES) {
      finishLoading();
    }
  }

  function preloadImages() {
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const idx = i;
      img.onload = () => handleImageLoad(idx);
      img.onerror = () => handleImageLoad(idx);
      img.src = FRAME_PATH(i);
      images[i] = img;

      if (img.complete && img.naturalWidth > 0) {
        handleImageLoad(idx);
      }
    }

    // Safety timeout: dismiss preloader after 2.5 seconds regardless
    setTimeout(() => {
      finishLoading();
    }, 2500);
  }

  // ── Scroll Handling & Interpolation ────────────────────────
  function updateScroll() {
    const rect = container.getBoundingClientRect();
    const scrollDistance = container.offsetHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / scrollDistance));

    // 1. Update Canvas Frame
    const frameIndex = Math.round(progress * (TOTAL_FRAMES - 1));
    if (frameIndex !== currentFrame) {
      currentFrame = frameIndex;
      renderFrame(frameIndex);
    }

    // 2. Update Top Progress Bar
    if (topProgressBar) {
      topProgressBar.style.width = (progress * 100) + '%';
    }

    // 3. Update Frame Counter
    if (frameCounter) {
      frameCounter.textContent = `${String(currentFrame).padStart(2, '0')} / 74`;
      const counterOpacity = interpolate(progress, [0.02, 0.08, 0.92, 0.98], [0, 1, 1, 0]);
      frameCounter.style.opacity = counterOpacity;
    }

    // 4. Update Navbar Opacity
    if (navbar) {
      const navOpacity = interpolate(progress, [0, 0.06], [1, 0]);
      navbar.style.opacity = navOpacity;
      navbar.style.pointerEvents = navOpacity > 0.1 ? 'auto' : 'none';
    }

    // 5. Section 1 (Hero): Visible at 0 -> fades out 0.15 - 0.22
    if (sectionHero) {
      const s1Opacity = interpolate(progress, [0, 0.15, 0.22], [1, 1, 0]);
      const s1Y = interpolate(progress, [0, 0.22], [0, -60]);
      sectionHero.style.opacity = s1Opacity;
      sectionHero.style.transform = `translateY(${s1Y}px)`;
    }

    // 6. Section 2 (Craft): Fades in 0.22 -> 0.30, visible till 0.48, fades out 0.48 -> 0.56
    if (sectionCraft) {
      const s2Opacity = interpolate(progress, [0.22, 0.30, 0.48, 0.56], [0, 1, 1, 0]);
      const s2Y = interpolate(progress, [0.22, 0.30, 0.48, 0.56], [40, 0, 0, -40]);
      sectionCraft.style.opacity = s2Opacity;
      sectionCraft.style.transform = `translateY(${s2Y}px)`;
    }

    // 7. Section 3 (Vision): Fades in 0.58 -> 0.66, visible till 0.82, fades out 0.82 -> 0.90
    if (sectionVision) {
      const s3Opacity = interpolate(progress, [0.58, 0.66, 0.82, 0.90], [0, 1, 1, 0]);
      const s3Y = interpolate(progress, [0.58, 0.66, 0.82, 0.90], [40, 0, 0, -40]);
      sectionVision.style.opacity = s3Opacity;
      sectionVision.style.transform = `translateY(${s3Y}px)`;
    }
  }

  function onScroll() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(updateScroll);
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Initialize ─────────────────────────────────────────────
  resizeCanvas();
  preloadImages();
  updateScroll();
})();
