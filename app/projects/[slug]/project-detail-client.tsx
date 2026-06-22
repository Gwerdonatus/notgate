"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const C = {
  bg: "#5a040c",
  bgDeep: "#430309",
  ink: "#FFFFFF",
  accent: "#e8431e",
};

const easeLuxury = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easeLuxury } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: easeLuxury } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

const GALLERY_PATTERN = [
  "md:col-span-8 aspect-[16/10]",
  "md:col-span-4 aspect-[3/4]",
  "md:col-span-5 aspect-[4/5]",
  "md:col-span-7 aspect-[16/10]",
  "md:col-span-6 aspect-[4/3]",
  "md:col-span-6 aspect-[4/3]",
];

function InfrastructureFrame({
  children,
  label,
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <div className="relative">
      {/* Outer corner brackets */}
      <div className="absolute -top-2 -left-2 w-5 h-5 border-t border-l opacity-50" style={{ borderColor: C.accent }} />
      <div className="absolute -top-2 -right-2 w-5 h-5 border-t border-r opacity-50" style={{ borderColor: C.accent }} />
      <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b border-l opacity-50" style={{ borderColor: C.accent }} />
      <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b border-r opacity-50" style={{ borderColor: C.accent }} />

      {/* Inner corner brackets */}
      <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l opacity-25" style={{ borderColor: C.accent }} />
      <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r opacity-25" style={{ borderColor: C.accent }} />
      <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l opacity-25" style={{ borderColor: C.accent }} />
      <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r opacity-25" style={{ borderColor: C.accent }} />

      {/* Midpoint ticks */}
      <div className="absolute top-1/2 -left-3 w-2 h-px -translate-y-1/2 opacity-35" style={{ background: C.accent }} />
      <div className="absolute top-1/2 -right-3 w-2 h-px -translate-y-1/2 opacity-35" style={{ background: C.accent }} />
      <div className="absolute -top-3 left-1/2 w-px h-2 -translate-x-1/2 opacity-35" style={{ background: C.accent }} />
      <div className="absolute -bottom-3 left-1/2 w-px h-2 -translate-x-1/2 opacity-35" style={{ background: C.accent }} />

      {/* Dashed border */}
      <div className="absolute inset-0 border border-dashed opacity-15 pointer-events-none" style={{ borderColor: C.accent }} />

      {/* Label */}
      {label && (
        <span className="absolute -top-6 left-0 text-[9px] uppercase tracking-[0.2em] font-medium opacity-45" style={{ color: C.accent }}>
          {label}
        </span>
      )}

      {children}
    </div>
  );
}

export function ProjectDetailClient({
  project,
  nextProject,
}: {
  project: any;
  nextProject: any;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  const gallery = project.images?.length ? project.images : [project.image];

  const facts = [
    { label: "Location", value: project.location },
    { label: "Client", value: project.client },
    { label: "Project Type", value: project.sector },
    { label: "Status", value: project.status },
    { label: "Duration", value: project.duration },
    { label: "Completion Date", value: project.completionDate },
    { label: "Services", value: project.services?.join("  ·  ") },
    { label: "Structural Engineer", value: project.structuralEngineer },
    { label: "Architect", value: project.architect },
    { label: "Team Size", value: project.teamSize },
  ].filter((f) => f.value && f.value !== "N/A");

  return (
    <main style={{ background: C.bg, color: C.ink }} className="font-sans">
      {/* ═══ SECTION 1 — HERO ═══ */}
      <section
        ref={heroRef}
        className="relative min-h-[580px] lg:min-h-[680px] flex items-center py-20 md:py-24 overflow-hidden"
      >
        {/* Subtle technical grid */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${C.accent} 1px, transparent 1px), linear-gradient(90deg, ${C.accent} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <motion.div
              className="lg:col-span-5 order-2 lg:order-1"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp}>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-xs tracking-wide mb-10 transition-opacity duration-300 hover:opacity-70"
                  style={{ color: `${C.ink}80` }}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  All Projects
                </Link>
              </motion.div>

              <motion.p
                className="text-xs uppercase tracking-[0.25em] mb-5"
                style={{ color: C.accent }}
                variants={fadeUp}
              >
                {project.sector}
              </motion.p>

              <motion.h1
                className="font-serif font-light tracking-tight mb-7"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.04 }}
                variants={fadeUp}
              >
                {project.name}
              </motion.h1>

              <motion.div
                className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-light"
                style={{ color: `${C.ink}72` }}
                variants={fadeUp}
              >
                <span>{project.location}</span>
                <span style={{ color: `${C.accent}90` }}>·</span>
                <span>{project.year}</span>
                <span style={{ color: `${C.accent}90` }}>·</span>
                <span>{project.sector}</span>
              </motion.div>
            </motion.div>

            {/* Image — contained, not stretched, with infrastructure frame */}
            <motion.div
              className="lg:col-span-7 order-1 lg:order-2"
              initial="hidden"
              animate="visible"
              variants={scaleIn}
            >
              <InfrastructureFrame label="FIG. 01 — PROJECT HERO">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/20">
                  <motion.div
                    className="absolute inset-0"
                    style={{ y: heroImageY, scale: heroImageScale }}
                  >
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                    />
                  </motion.div>
                </div>
              </InfrastructureFrame>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2 — OVERVIEW ═══ */}
      <motion.section
        className="px-6 lg:px-10 py-20 md:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <div className="max-w-[760px] mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] mb-7" style={{ color: C.accent }}>
            Overview
          </p>
          <p
            className="font-light"
            style={{ fontSize: "clamp(1.1rem, 1.9vw, 1.4rem)", lineHeight: 1.65, color: `${C.ink}90` }}
          >
            {project.brief}
          </p>
        </div>
      </motion.section>

      {/* ═══ SECTION 3 — PROJECT FACTS ═══ */}
      <motion.section
        className="px-6 lg:px-10 py-16 md:py-20 border-t"
        style={{ borderColor: `${C.ink}16` }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] mb-10" style={{ color: C.accent }}>
            Project Facts
          </p>
          <dl className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16">
            {facts.map((f) => (
              <motion.div
                key={f.label}
                className="flex items-baseline justify-between gap-6 py-4 border-t"
                style={{ borderColor: `${C.ink}14` }}
                variants={fadeUp}
              >
                <dt className="text-xs uppercase tracking-wide" style={{ color: `${C.ink}48` }}>
                  {f.label}
                </dt>
                <dd className="text-sm font-light text-right" style={{ color: C.ink }}>
                  {f.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </motion.section>

      {/* ═══ SECTION 4 — CHALLENGE & SOLUTION ═══ */}
      <motion.section
        className="px-6 lg:px-10 py-20 md:py-28 border-t"
        style={{ borderColor: `${C.ink}16` }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24">
          <motion.div variants={fadeUp}>
            <p className="text-xs uppercase tracking-[0.25em] mb-7" style={{ color: C.accent }}>
              The Challenge
            </p>
            <p
              className="text-base font-light leading-relaxed"
              style={{ color: `${C.ink}80` }}
            >
              {project.challenge}
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <p className="text-xs uppercase tracking-[0.25em] mb-7" style={{ color: C.accent }}>
              The Solution
            </p>
            <p
              className="text-base font-light leading-relaxed"
              style={{ color: `${C.ink}80` }}
            >
              {project.solution}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══ SECTION 5 — GALLERY ═══ */}
      <motion.section
        className="px-6 lg:px-10 py-20 md:py-28 border-t"
        style={{ borderColor: `${C.ink}16` }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] mb-10" style={{ color: C.accent }}>
            Project Gallery
          </p>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {gallery.map((src: string, i: number) => (
              <motion.div
                key={`${src}-${i}`}
                className={`group relative overflow-hidden ${GALLERY_PATTERN[i % GALLERY_PATTERN.length]}`}
                variants={fadeUp}
              >
                <Image
                  src={src}
                  alt={`${project.name} — view ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ═══ SECTION 6 — IMPACT ═══ */}
      <motion.section
        className="px-6 lg:px-10 py-20 md:py-28 border-t"
        style={{ borderColor: `${C.ink}16`, background: C.bgDeep }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] mb-8" style={{ color: C.accent }}>
            Project Impact
          </p>

          <motion.p
            className="font-light mb-16"
            style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.4rem)", lineHeight: 1.3, color: C.ink }}
            variants={fadeUp}
          >
            {project.outcome} <span style={{ color: C.accent }}>{project.outcomeHighlight}</span>
          </motion.p>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-20"
            variants={staggerContainer}
          >
            {project.keyMetrics?.map((m: any) => (
              <motion.div key={m.label} variants={fadeUp}>
                <p
                  className="font-serif font-light mb-2"
                  style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)", color: C.ink }}
                >
                  {m.value}
                </p>
                <p className="text-xs uppercase tracking-wide" style={{ color: `${C.ink}50` }}>
                  {m.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.blockquote
            className="max-w-2xl border-t pt-10"
            style={{ borderColor: `${C.ink}16` }}
            variants={fadeUp}
          >
            <p
              className="text-lg md:text-xl font-light italic leading-relaxed mb-6"
              style={{ color: `${C.ink}85` }}
            >
              "{project.testimonial}"
            </p>
            <footer className="text-sm">
              <span style={{ color: C.ink }}>{project.testimonialAuthor}</span>
              <span style={{ color: `${C.ink}48` }}> — {project.testimonialTitle}</span>
            </footer>
          </motion.blockquote>
        </div>
      </motion.section>

      {/* ═══ NEXT PROJECT ═══ */}
      <motion.section
        className="px-6 lg:px-10 border-t"
        style={{ borderColor: `${C.ink}16` }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group block max-w-7xl mx-auto py-16 md:py-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <p className="text-xs uppercase tracking-[0.25em] mb-5" style={{ color: C.accent }}>
                Next Project
              </p>
              <div className="flex items-end justify-between gap-6">
                <h2
                  className="font-serif font-light tracking-tight transition-opacity duration-500 group-hover:opacity-70"
                  style={{ fontSize: "clamp(1.75rem, 5vw, 3.5rem)", lineHeight: 1.05 }}
                >
                  {nextProject.name}
                </h2>
                <ArrowUpRight
                  className="w-7 h-7 flex-shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  style={{ color: C.accent }}
                />
              </div>
            </div>

            {/* Small contained next-project image */}
            <div className="lg:col-span-4">
              <InfrastructureFrame label="FIG. 02 — NEXT">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/20">
                  <Image
                    src={nextProject.image}
                    alt={nextProject.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </InfrastructureFrame>
            </div>
          </div>
        </Link>
      </motion.section>
    </main>
  );
}