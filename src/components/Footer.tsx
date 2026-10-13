"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Skill {
  category: string;
  items: string[];
}

const SKILLS: Skill[] = [
  {
    category: "Languages & Frameworks",
    items: ["Kotlin", "Java 8–14", "Spring Boot", "Golang", "React", "TypeScript"],
  },
  {
    category: "Data & Databases",
    items: ["PostgreSQL", "JPA", "Hibernate", "MyBatis", "Flyway", "QueryDSL"],
  },
  {
    category: "DevOps & Deployment",
    items: ["AWS", "Docker", "Jenkins", "SonarQube", "bash", "npm"],
  },
  {
    category: "Testing",
    items: ["JUnit", "Cucumber", "TDD", "Jest", "Selenium"],
  },
];

function ContactLink({
  href,
  label,
  index,
  external = false,
}: {
  href: string;
  label: string;
  index: number;
  external?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group flex items-center gap-4 py-5 border-b border-white/[0.06] text-foreground/50 hover:text-foreground transition-colors duration-300 pointer-events-auto"
        whileHover={{ x: 8 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-xs font-mono text-foreground/20">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 text-lg font-medium tracking-tight">{label}</span>
        <motion.svg
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M2 8H14M9 3L14 8L9 13"
            stroke="#c8ff00"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.a>
    </motion.div>
  );
}

export default function Footer() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  const contacts = [
    { href: "mailto:tman126@gmail.com", label: "tman126@gmail.com", external: false },
    { href: "https://www.linkedin.com/in/nascimentoantonio", label: "LinkedIn — nascimentoantonio", external: true },
    { href: "https://github.com/antnascimento", label: "GitHub — antnascimento", external: true },
  ];

  return (
    <footer id="contact" className="relative bg-background overflow-hidden">
      {/* About + Skills section */}
      <section className="py-32 px-6 md:px-12 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* About */}
          <div ref={headerRef}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs tracking-[0.4em] uppercase text-accent mb-6 font-medium">
                About
              </p>
              <p className="text-[clamp(1.1rem,2.5vw,1.5rem)] text-foreground/70 leading-relaxed font-light max-w-lg">
                Senior Software Engineer at <span className="text-foreground font-medium">Zalando</span> in Berlin,
                with over 13 years building scalable backend systems and modern frontends.
                I bridge engineering rigour with clean, purposeful design.
              </p>

              {/* Quick facts */}
              <div className="mt-8 flex flex-col gap-3">
                {[
                  { label: "Location", value: "Berlin, Germany" },
                  { label: "Current role", value: "Senior Software Engineer · Zalando" },
                  { label: "Languages", value: "English · French · Portuguese" },
                  { label: "Education", value: "BSc Computer Engineering · Univ. Politécnica de Viseu" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-4 text-sm">
                    <span className="text-foreground/25 w-28 shrink-0 font-mono text-xs pt-0.5 uppercase tracking-widest">
                      {label}
                    </span>
                    <span className="text-foreground/60">{value}</span>
                  </div>
                ))}
              </div>

              <motion.div className="mt-10" whileHover={{ scale: 1.02 }}>
                <a
                  href="https://www.linkedin.com/in/nascimentoantonio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-accent text-background text-sm font-semibold rounded-full hover:bg-accent/90 transition-colors duration-300 pointer-events-auto"
                >
                  View LinkedIn Profile
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M1 11L11 1M11 1H5M11 1V7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Skills */}
          <div className="space-y-8">
            {SKILLS.map((skill, si) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: si * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-xs tracking-[0.3em] uppercase text-foreground/30 mb-3 font-medium">
                  {skill.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-3 py-1.5 rounded-lg glass text-foreground/60 border border-white/[0.06] font-mono"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact-links" className="py-20 px-6 md:px-12 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <motion.p
            className="text-xs tracking-[0.4em] uppercase text-accent mb-10 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Get in Touch
          </motion.p>
          <div>
            {contacts.map((contact, i) => (
              <ContactLink
                key={contact.label}
                href={contact.href}
                label={contact.label}
                index={i}
                external={contact.external}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.05] py-8 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-foreground/20 font-mono">
            © {new Date().getFullYear()} António Nascimento All rights reserved.
          </span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs text-foreground/20 font-mono ml-1">
              Code on. 
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
