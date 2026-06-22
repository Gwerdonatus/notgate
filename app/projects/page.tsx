"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project, type Sector } from "@/lib/projects-data";

// ─────────────────────────────────────────────
// TOKENS
// ─────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const;

const C = {
  bg: "#5a040c",   // base ground — deep burgundy
  ink: "#FFFFFF",  // primary text
  accent: "#e8431e", // signal orange — used sparingly
};

const SECTORS: Array<"All" | Sector> = [
  "All",
  "Commercial",
  "Residential",
  "Government",
  "Industrial",
  "Infrastructure",
];

// ─────────────────────────────────────────────
// PROJECT ROW — alternating editorial block
// ─────────────────────────────────────────────

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const flipOnDesktop = index % 2 === 0;

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 1, ease: EASE }}
      className="group border-t"
      style={{ borderColor: `${C.ink}16` }}
    >
      <Link href={`/projects/${project.slug}`} className="block focus-visible:outline-none">
        <div
          className={`flex flex-col gap-7 py-16 md:py-24 lg:items-center lg:gap-16 ${
            flipOnDesktop ? "lg:flex-row-reverse" : "lg:flex-row"
          }`}
        >
          {/* IMAGE */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
              />
            </div>
          </div>

          {/* TEXT */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-serif text-sm" style={{ color: C.accent }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className="text-[11px] uppercase tracking-[0.2em]"
                style={{ color: `${C.ink}55` }}
              >
                {project.sector}
              </span>
            </div>

            <h2
              className="font-serif font-light tracking-tight mb-5"
              style={{ fontSize: "clamp(2rem, 3.6vw, 3.1rem)", lineHeight: 1.08 }}
            >
              <span className="transition-opacity duration-500 group-hover:opacity-70">
                {project.name}
              </span>
            </h2>

            <p
              className="text-[15px] md:text-base font-light leading-relaxed max-w-md mb-7"
              style={{ color: `${C.ink}72` }}
            >
              {project.description}
            </p>

            <div
              className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-wide mb-9"
              style={{ color: `${C.ink}48` }}
            >
              <span>{project.location}</span>
              <span style={{ color: `${C.accent}90` }}>·</span>
              <span>{project.year}</span>
              <span style={{ color: `${C.accent}90` }}>·</span>
              <span>{project.status}</span>
            </div>

            <span
              className="inline-flex items-center gap-2 text-xs tracking-[0.1em] uppercase pb-1 border-b"
              style={{ color: C.accent, borderColor: `${C.accent}55` }}
            >
              View Project
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

export default function ProjectsPage() {
  const [activeSector, setActiveSector] = useState<"All" | Sector>("All");
  const prefersReducedMotion = useReducedMotion();

  const filtered =
    activeSector === "All" ? projects : projects.filter((p) => p.sector === activeSector);

  return (
    <main style={{ background: C.bg, color: C.ink }} className="font-sans">
      {/* ─── HERO ─── */}
      <section className="px-6 lg:px-10 pt-28 md:pt-40 pb-14 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-xs uppercase tracking-[0.25em] mb-7"
            style={{ color: C.accent }}
          >
            Selected Works
          </motion.p>

          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            className="font-serif font-light tracking-tight mb-8"
            style={{ fontSize: "clamp(2.6rem, 6.4vw, 5.25rem)", lineHeight: 1.04 }}
          >
            Twenty-five years of
            <br />
            building with intent.
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="text-base md:text-lg font-light max-w-xl mb-12"
            style={{ color: `${C.ink}72` }}
          >
            {projects.length}+ landmark projects delivered across six states and two
            countries — from commercial towers to the bridges and hospitals that move a
            nation forward.
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            className="flex flex-wrap items-center gap-x-7 gap-y-3 pt-8 border-t"
            style={{ borderColor: `${C.ink}16` }}
          >
            {SECTORS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setActiveSector(s)}
                className="text-xs tracking-wide uppercase pb-1 border-b transition-colors duration-300"
                style={{
                  color: activeSector === s ? C.accent : `${C.ink}50`,
                  borderColor: activeSector === s ? C.accent : "transparent",
                }}
              >
                {s}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── PROJECT LIST ─── */}
      <section className="px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSector}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {filtered.map((project, i) => (
                <ProjectRow key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="py-24 text-center border-t"
              style={{ borderColor: `${C.ink}16` }}
            >
              <p className="text-sm font-light" style={{ color: `${C.ink}40` }}>
                No projects in this category yet.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── CLOSING CTA ─── */}
      <motion.section
        initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="px-6 lg:px-10 py-20 md:py-28 border-t"
        style={{ borderColor: `${C.ink}16` }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <h2
            className="font-serif font-light tracking-tight"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Tell us what
            <br />
            you're building.
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm tracking-wide uppercase pb-1 border-b transition-opacity duration-300 hover:opacity-70 w-fit"
            style={{ color: C.accent, borderColor: `${C.accent}60` }}
          >
            Start a Conversation
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.section>
    </main>
  );
}