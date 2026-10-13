# António Nascimento — Personal Portfolio

> High-end **Scrollytelling** portfolio showcasing 13+ years of software engineering at scale, bridging resilient backend systems with modern, interactive web design.

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

---

## ⚡ Overview

The core mechanic of the website is an Awwwards-inspired, scroll-linked cinematic animation. As the user scrolls through a `500vh` sequence container, Framer Motion maps the normalized scroll progress to an HTML5 Canvas that scrubs through a sequence of 75 WebP frames at 60 FPS.

### Key Architectural Highlights

- **HTML5 Canvas Scrubber (`ScrollyCanvas.tsx`)**: High-performance frame rendering that avoids video decoding overhead. Includes `requestAnimationFrame` paint batching and responsive `object-fit: cover` aspect ratio calculation.
- **Smart Asset Preloading**: Preloads all 75 frames in parallel with deduplication and a fallback safety timer, preventing blank flashes during scroll interactions.
- **Synchronized Parallax Overlay (`Overlay.tsx`)**: Text layers pinned inside a `sticky` 100vh viewport, fading in and translating with staggered parallax speeds as you progress through each story beat.
- **Glassmorphism Project Cards (`Projects.tsx`)**: Selected enterprise and scalable platform case studies featuring radial hover glows, animated accent borders, and micro-interactions.
- **Career & Skills Matrix (`Footer.tsx`)**: Detailed timeline of 13+ years of engineering experience across Zalando, BNP Paribas, and Wide Scope.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js (App Router) **AND** Pure Vanilla HTML/JS Standalone |
| **Language** | TypeScript / JavaScript |
| **Animation** | Framer Motion / Vanilla `requestAnimationFrame` + Interpolation |
| **Rendering** | HTML5 2D Canvas API |
| **Styling** | Tailwind CSS / Pure CSS with glass utilities and dark aesthetic (`#121212`) |
| **Typography** | Inter & JetBrains Mono |

---

## 📁 Project Structure

```
personal_site/
├── standalone/             # ⭐ ZERO-SERVER VERSION: Pure HTML, CSS, JS + sequence/
│   ├── index.html          # Double-click to open directly in any browser
│   ├── styles.css          # Vanilla CSS matching dark aesthetic
│   ├── script.js           # Vanilla JS canvas scrubber & parallax engine
│   └── sequence/           # 75 WebP frames (frame_00_... to frame_74_...)
├── public/
│   └── sequence/           # Frames for Next.js version
├── src/                    # Next.js 14/16 App Router codebase
│   ├── app/
│   │   ├── globals.css     # Dark theme reset, custom scrollbars, glass utilities
│   │   ├── layout.tsx      # Root layout, metadata, and font configuration
│   │   └── page.tsx        # Orchestrator (sticky viewport + loader + sections)
│   └── components/
│       ├── ScrollyCanvas.tsx # 60fps canvas renderer & image preloader
│       ├── Overlay.tsx     # Parallax text sections & frame counter
│       ├── Projects.tsx    # Glassmorphism project grid & career timeline
│       └── Footer.tsx      # Bio, skills matrix, and contact links
├── tailwind.config.ts      # Design tokens and theme extension
└── tsconfig.json           # TypeScript configuration
```

---

## ⚡ Option 1: Zero-Server Standalone (No Node.js Required)

If you don't want to run a Node server or install npm packages, simply navigate to `standalone/`:

1. Open `standalone/index.html` directly in your browser (double-click in Windows Explorer or open `file:///.../standalone/index.html`).
2. Everything (canvas scrubber, preloader, parallax text, projects, and contact links) works out of the box with **zero dependencies**.
3. Perfect for instant deployment on **GitHub Pages**, Netlify, or any static web host.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.17+ (or v20+ recommended)
- **npm**: v9+

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/antnascimento/personal_site.git
   cd personal_site
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 📦 Build for Production

```bash
npm run build
npm run start
```

---

## 👤 About António Nascimento

- **Role**: Senior Software Engineer at **Zalando** (Berlin, Germany)
- **LinkedIn**: [linkedin.com/in/nascimentoantonio](https://www.linkedin.com/in/nascimentoantonio)
- **GitHub**: [github.com/antnascimento](https://github.com/antnascimento)
- **Email**: [tman126@gmail.com](mailto:tman126@gmail.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
