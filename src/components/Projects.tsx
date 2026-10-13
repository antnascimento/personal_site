"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── types ───────────────────────────────────────────────────────────────────
interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  tags: string[];
  period: string;
  color: string;
  description: string;
  link?: string;
}

// ─── data — real Zalando & career projects ────────────────────────────────────
const PROJECTS: Project[] = [
  {
    id: "proj-01",
    index: "01",
    title: "Production Dashboard",
    subtitle: "Zalando · Internal Platform",
    tags: ["ReactJS", "Spring Boot", "Java 8", "PostgreSQL"],
    period: "2017 – Present",
    color: "#c8ff00",
    description:
      "End-to-end monitoring dashboard for the Content Creation Flow at Zalando. Gives real-time visibility into production pipelines across the fashion content org.",
  },
  {
    id: "proj-02",
    index: "02",
    title: "Model Management App",
    subtitle: "Zalando · Internal Tool",
    tags: ["Java", "Spring Boot", "REST API", "PostgreSQL"],
    period: "2015 – 2016",
    color: "#7c3aed",
    description:
      "Internal application for managing model data and scheduling across Zalando's content creation teams. Streamlined workflows that previously relied on manual coordination.",
  },
  {
    id: "proj-03",
    index: "03",
    title: "Content Media Tool",
    subtitle: "Zalando · Media Platform",
    tags: ["Java EE", "Microservices", "JPA", "Docker"],
    period: "2013 – 2017",
    color: "#f97316",
    description:
      "Core media management application powering Zalando's content ingestion and distribution pipeline. Handled high-throughput asset processing across multiple product lines.",
  },
  {
    id: "proj-04",
    index: "04",
    title: "CTS Debt Reporting",
    subtitle: "BNP Paribas Securities Services",
    tags: ["J2EE", "Struts", "Hibernate", "Sybase"],
    period: "2011 – 2013",
    color: "#06b6d4",
    description:
      "Enterprise-grade debt reporting web application for BNP Paribas Securities Services. Led backend development and test management, delivering a robust compliance reporting tool.",
  },
];

// ─── card component ───────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.12,
      }}
      className="group relative overflow-hidden rounded-2xl glass border border-white/[0.07] cursor-default"
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(400px at 50% 0%, ${project.color}18, transparent 70%)`,
          boxShadow: `0 0 0 1px ${project.color}20`,
        }}
      />

      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${project.color}, transparent)`, width: "100%" }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, delay: index * 0.12 + 0.3, ease: "easeOut" }}
      />

      <div className="relative p-8">
        {/* Header row */}
        <div className="flex items-start justify-between mb-8">
          <span
            className="text-xs font-mono tracking-[0.3em] font-medium"
            style={{ color: project.color }}
          >
            {project.index}
          </span>
          <span className="text-xs text-foreground/30 font-mono tabular-nums">
            {project.period}
          </span>
        </div>

        {/* Title block */}
        <div className="mb-2">
          <p className="text-xs text-foreground/30 tracking-widest uppercase mb-2">
            {project.subtitle}
          </p>
          <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-white transition-colors duration-300">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground/40 leading-relaxed mt-4 font-light">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full border border-white/[0.08] text-foreground/40 bg-white/[0.03] font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── experience timeline (compact) ───────────────────────────────────────────
const EXPERIENCE = [
  { company: "Zalando", role: "Senior Software Engineer", period: "2024 – Present", location: "Berlin, DE" },
  { company: "Zalando", role: "Software Engineer — Frontend & Backend", period: "2013 – 2024", location: "Berlin, DE" },
  { company: "agap2 / BNP Paribas", role: "Java Consultant & Test Manager", period: "2011 – 2013", location: "Remote" },
  { company: "Wide Scope", role: "Developer", period: "2009 – 2011", location: "Portugal" },
];

function ExperienceRow({ item, index }: { item: typeof EXPERIENCE[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-4 border-b border-white/[0.05] group"
    >
      <span className="text-xs font-mono text-foreground/20 w-28 shrink-0">
        {item.period}
      </span>
      <div className="flex-1 min-w-0">
        <span className="text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
          {item.role}
        </span>
        <span className="text-foreground/30 mx-2 text-xs">·</span>
        <span className="text-sm text-foreground/40">{item.company}</span>
      </div>
      <span className="text-xs text-foreground/20 font-mono">{item.location}</span>
    </motion.div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────
export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });
  const expRef = useRef<HTMLDivElement>(null);
  const isExpInView = useInView(expRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* ── Project cards ───────────────────────────────────────── */}
      <section
        id="work"
        className="relative py-32 px-6 md:px-12 bg-background overflow-hidden"
      >
        {/* Background dot grid */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Section header */}
        <div ref={headerRef} className="max-w-6xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-medium">
              Selected Work
            </p>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tight text-foreground leading-none">
                Projects
              </h2>
              <p className="text-foreground/30 text-sm max-w-xs text-right font-light leading-relaxed">
                13+ years of shipping at scale — from startups to Europe&apos;s largest
                fashion platform.
              </p>
            </div>
            <motion.div
              className="mt-8 h-px bg-border"
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={isHeaderInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.div>
        </div>

        {/* Project grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* ── Experience timeline ─────────────────────────────────── */}
      <section
        id="experience"
        className="py-24 px-6 md:px-12 border-t border-white/[0.05]"
      >
        <div ref={expRef} className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isExpInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <p className="text-xs tracking-[0.4em] uppercase text-accent mb-3 font-medium">
              Career
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Experience
            </h2>
          </motion.div>

          <div>
            {EXPERIENCE.map((item, i) => (
              <ExperienceRow key={item.period + item.company} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
