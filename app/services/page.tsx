"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { services } from "@/data/site-data";
import {
  ArrowUpRight,
  Ruler,
  HardHat,
  Building2,
  Wrench,
  Check,
  Search,
  PenTool,
  Truck,
  KeyRound,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const serviceIcons = [Ruler, HardHat, Building2, Wrench];

const serviceImages = [
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
];

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

function AccentLines({ delay = 0 }: { delay?: number }) {
  return (
    <div className="flex items-center gap-2 overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay, ease: EASE_OUT_EXPO }}
        style={{ transformOrigin: "left" }}
        className="h-[2px] w-10 bg-orange"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.1, ease: EASE_OUT_EXPO }}
        style={{ transformOrigin: "left" }}
        className="h-[2px] w-3 bg-orange/40"
      />
    </div>
  );
}

// ── Blueprint Image ────────────────────────────────────────
function BlueprintImage({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className="relative aspect-[3/2] bg-warm/[0.04] overflow-hidden group">
      <motion.div style={{ y: imageY }} className="absolute inset-[-16%]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 42vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-burgundy-dark/0 group-hover:bg-burgundy-dark/20 transition-colors duration-500" />

      {/* SVG crosshairs + ticks */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <motion.line
          x1="0" y1="50%" x2="100%" y2="50%"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
        />
        <motion.line
          x1="50%" y1="0" x2="50%" y2="100%"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
        />
        {[20, 40, 60, 80].map((pct) => (
          <motion.line
            key={`top-${pct}`}
            x1={`${pct}%`} y1="0" x2={`${pct}%`} y2="12"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.8 + pct / 200 }}
          />
        ))}
        {[25, 50, 75].map((pct) => (
          <motion.line
            key={`left-${pct}`}
            x1="0" y1={`${pct}%`} x2="12" y2={`${pct}%`}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.9 + pct / 200 }}
          />
        ))}
      </svg>

      {/* Corner brackets */}
      {[
        { pos: "top-3 left-3", border: "border-t border-l" },
        { pos: "top-3 right-3", border: "border-t border-r" },
        { pos: "bottom-3 left-3", border: "border-b border-l" },
        { pos: "bottom-3 right-3", border: "border-b border-r" },
      ].map((corner, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 + i * 0.08, ease: EASE_OUT_EXPO }}
          className={`absolute ${corner.pos} w-5 h-5 ${corner.border} border-orange/30`}
        />
      ))}

      <div className="absolute bottom-2 left-3">
        <span className="text-5xl sm:text-6xl font-extralight text-warm/[0.06] leading-none select-none">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-orange/20" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-orange/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-orange/40 rotate-45" />
      </div>
    </div>
  );
}

// ── Service Band ───────────────────────────────────────────
function ServiceBand({
  service,
  index,
  reversed,
}: {
  service: typeof services[0];
  index: number;
  reversed: boolean;
}) {
  const Icon = serviceIcons[index] || Ruler;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
      className="border-t border-warm/10 group/band"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div
          className={`lg:col-span-5 relative ${
            reversed ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <BlueprintImage
            src={serviceImages[index] || serviceImages[0]}
            alt={service.title}
            index={index}
          />
        </div>

        <div
          className={`lg:col-span-7 ${
            reversed ? "lg:order-1" : "lg:order-2"
          } p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center`}
        >
          <motion.div
            initial={{ opacity: 0, x: reversed ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_EXPO }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-8 border border-warm/15 flex items-center justify-center flex-shrink-0 group-hover/band:border-orange/30 transition-colors duration-500">
              <Icon className="w-3.5 h-3.5 text-orange/70" />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-warm/25">
              Service {String(index + 1).padStart(2, "0")}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT_EXPO }}
            className="text-xl sm:text-2xl lg:text-3xl font-light text-warm/90 leading-[1.15] tracking-tight group-hover/band:text-warm transition-colors duration-500"
          >
            {service.title}
          </motion.h2>

          <div className="mt-4 mb-5">
            <AccentLines delay={0.4} />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45, ease: EASE_OUT_EXPO }}
            className="text-sm text-warm/40 leading-[1.75] max-w-xl"
          >
            {service.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55, ease: EASE_OUT_EXPO }}
            className="mt-5 pt-5 border-t border-warm/8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {[
                "Feasibility studies & site analysis",
                "Structural engineering & BIM modeling",
                "End-to-end project management",
                "Quality assurance & safety compliance",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.08, ease: EASE_OUT_EXPO }}
                  className="flex items-start gap-2"
                >
                  <Check className="w-3 h-3 text-orange/50 mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] text-warm/35 leading-snug">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE_OUT_EXPO }}
            className="mt-5 flex items-center gap-4"
          >
            <div className="h-px bg-warm/10 flex-1" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-warm/20">
              {index === 0
                ? "Residential"
                : index === 1
                ? "Commercial"
                : index === 2
                ? "Industrial"
                : "Infrastructure"}
            </span>
            <span className="text-warm/10">|</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-warm/20">
              {index === 0
                ? "Small to Large"
                : index === 1
                ? "Medium to Mega"
                : index === 2
                ? "Large Scale"
                : "Turnkey"}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Process Phase Data ─────────────────────────────────────
const processPhases = [
  {
    number: "01",
    title: "Discovery & Planning",
    icon: Search,
    color: "bg-orange/10",
    iconColor: "text-orange",
    borderColor: "border-orange/20",
    deliverables: ["Site survey & analysis", "Feasibility study", "Budget framework", "Timeline roadmap"],
  },
  {
    number: "02",
    title: "Design & Engineering",
    icon: PenTool,
    color: "bg-warm/5",
    iconColor: "text-warm",
    borderColor: "border-warm/15",
    deliverables: ["Architectural drawings", "Structural calculations", "BIM 3D modeling", "Material specifications"],
  },
  {
    number: "03",
    title: "Construction & Execution",
    icon: Truck,
    color: "bg-orange/10",
    iconColor: "text-orange",
    borderColor: "border-orange/20",
    deliverables: ["Site mobilization", "Quality control", "Progress tracking", "Safety compliance"],
  },
  {
    number: "04",
    title: "Handover & Support",
    icon: KeyRound,
    color: "bg-warm/5",
    iconColor: "text-warm",
    borderColor: "border-warm/15",
    deliverables: ["Final inspection", "Documentation", "Maintenance plan", "Warranty coverage"],
  },
];

// ── Process Flow Section ─────────────────────────────────
function ProcessFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 40%"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-t border-warm/8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className="text-center mb-16 sm:mb-20"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-warm/25 block mb-3">
              How We Work
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-warm leading-[1.1] tracking-tight mb-4">
              Our Process
            </h2>
            <div className="flex justify-center">
              <AccentLines delay={0.3} />
            </div>
            <p className="mt-5 text-sm text-warm/30 leading-[1.8] max-w-lg mx-auto">
              A disciplined, four-phase approach that takes your project from
              concept to completion with precision at every step.
            </p>
          </motion.div>
        </AnimatedSection>

        {/* ── Desktop: Horizontal pipeline ─────────────────── */}
        <div className="hidden lg:block relative">
          {/* Animated connecting line */}
          <div className="absolute top-[60px] left-[12.5%] right-[12.5%] h-[2px] bg-warm/8">
            <motion.div
              style={{ width: lineWidth }}
              className="h-full bg-orange/40"
            />
          </div>

          <div className="grid grid-cols-4 gap-6">
            {processPhases.map((phase, i) => {
              const Icon = phase.icon;
              return (
                <motion.div
                  key={phase.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: EASE_OUT_EXPO }}
                  className="relative"
                >
                  {/* Node */}
                  <div className="flex flex-col items-center">
                    {/* Icon box */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.15 + 0.2, ease: EASE_OUT_EXPO }}
                      className={`relative z-10 w-[120px] h-[120px] ${phase.color} border ${phase.borderColor} flex flex-col items-center justify-center mb-6 group/node`}
                    >
                      <Icon className={`w-6 h-6 ${phase.iconColor} mb-2`} />
                      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-warm/40">
                        Phase {phase.number}
                      </span>

                      {/* Corner accents */}
                      <div className="absolute top-0 left-0 w-3 h-px bg-orange/30" />
                      <div className="absolute top-0 left-0 w-px h-3 bg-orange/30" />
                      <div className="absolute top-0 right-0 w-3 h-px bg-orange/30" />
                      <div className="absolute top-0 right-0 w-px h-3 bg-orange/30" />
                      <div className="absolute bottom-0 left-0 w-3 h-px bg-orange/30" />
                      <div className="absolute bottom-0 left-0 w-px h-3 bg-orange/30" />
                      <div className="absolute bottom-0 right-0 w-3 h-px bg-orange/30" />
                      <div className="absolute bottom-0 right-0 w-px h-3 bg-orange/30" />

                      {/* Pulse ring on hover */}
                      <div className="absolute inset-0 border border-orange/0 group-hover/node:border-orange/20 transition-colors duration-500" />
                    </motion.div>

                    {/* Arrow to next (except last) */}
                    {i < processPhases.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.15 + 0.4 }}
                        className="absolute top-[52px] -right-3 z-20 text-orange/40"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    )}

                    {/* Title */}
                    <h3 className="text-sm font-medium text-warm/80 text-center mb-3">
                      {phase.title}
                    </h3>

                    {/* Deliverables */}
                    <div className="space-y-1.5 w-full">
                      {phase.deliverables.map((item, j) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.15 + 0.3 + j * 0.06 }}
                          className="flex items-center gap-2 px-2"
                        >
                          <div className="w-1 h-1 bg-orange/40 flex-shrink-0" />
                          <span className="text-[11px] text-warm/30 leading-snug">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile: Vertical flow ────────────────────────── */}
        <div className="lg:hidden relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[23px] top-8 bottom-8 w-[2px] bg-warm/8">
            <motion.div
              style={{ height: lineWidth }}
              className="w-full bg-orange/40"
            />
          </div>

          <div className="space-y-8">
            {processPhases.map((phase, i) => {
              const Icon = phase.icon;
              return (
                <motion.div
                  key={phase.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_OUT_EXPO }}
                  className="relative pl-14"
                >
                  {/* Node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 + 0.15, ease: EASE_OUT_EXPO }}
                    className={`absolute left-0 top-0 w-12 h-12 ${phase.color} border ${phase.borderColor} flex items-center justify-center`}
                  >
                    <Icon className={`w-5 h-5 ${phase.iconColor}`} />
                  </motion.div>

                  {/* Content */}
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-warm/25 block mb-1">
                      Phase {phase.number}
                    </span>
                    <h3 className="text-base font-medium text-warm/80 mb-2">
                      {phase.title}
                    </h3>
                    <div className="space-y-1">
                      {phase.deliverables.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-orange/40 flex-shrink-0" />
                          <span className="text-xs text-warm/30">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <div className="bg-burgundy-dark min-h-screen">
      {/* ═══════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════ */}
      <section className="pt-28 sm:pt-32 lg:pt-36 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
              className="flex items-center gap-4 mb-6"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT_EXPO }}
                style={{ transformOrigin: "left" }}
                className="h-px bg-warm/12 flex-1"
              />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-warm/25">
                What We Do
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT_EXPO }}
                style={{ transformOrigin: "right" }}
                className="h-px bg-warm/12 flex-1"
              />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT_EXPO }}
                className="lg:col-span-6"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-warm leading-[1.05] tracking-tight">
                  Our Services
                </h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT_EXPO }}
                className="lg:col-span-6 lg:pt-3"
              >
                <AccentLines delay={0.5} />
                <p className="mt-5 text-sm sm:text-base text-warm/35 leading-[1.8]">
                  From initial concept through final handover, NOTGATE delivers
                  construction and development services engineered to the highest
                  standards. Every project is managed with precision,
                  transparency, and an unwavering commitment to excellence.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: EASE_OUT_EXPO }}
              style={{ transformOrigin: "left" }}
              className="mt-10 h-0.5 bg-warm/10 w-full"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SERVICES
          ═══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto">
          {services.map((service, index) => (
            <ServiceBand
              key={service.number}
              service={service}
              index={index}
              reversed={index % 2 !== 0}
            />
          ))}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
            style={{ transformOrigin: "left" }}
            className="h-px bg-warm/10 w-full"
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PROCESS FLOW — the new pipeline
          ═══════════════════════════════════════════════════════ */}
      <ProcessFlow />

      {/* ═══════════════════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-18 border-t border-warm/8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              <div className="lg:col-span-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-warm leading-[1.1] tracking-tight">
                  Ready to build?
                </h2>
                <p className="mt-3 text-sm text-warm/30 leading-[1.8] max-w-lg">
                  Let&apos;s discuss your next project. Our team is prepared to
                  deliver engineering and construction excellence at scale.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-orange text-burgundy-dark px-7 py-3.5 text-sm font-medium hover:bg-orange/90 transition-colors duration-300"
                >
                  Start a Project
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}