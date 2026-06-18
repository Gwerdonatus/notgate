"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, ArrowDown, MapPin, ChevronRight } from "lucide-react";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

type Sector = "Commercial" | "Residential" | "Government" | "Industrial" | "Infrastructure";
type Status = "Completed" | "Ongoing" | "Landmark";

interface Project {
  id: string;
  name: string;
  location: string;
  sector: Sector;
  status: Status;
  value: string;
  area: string;
  duration: string;
  year: string;
  image: string;
  description: string;
  featured: boolean;
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const projects: Project[] = [
  {
    id: "p01",
    name: "NotGate Towers",
    location: "Victoria Island, Lagos",
    sector: "Commercial",
    status: "Landmark",
    value: "₦12.8B",
    area: "47,000 sqm",
    duration: "18 Months",
    year: "2022",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    description: "A landmark twin-tower complex redefining the Lagos skyline with Class-A commercial and retail floors.",
    featured: true,
  },
  {
    id: "p02",
    name: "Abuja Federal Secretariat Annex",
    location: "Central Business District, Abuja",
    sector: "Government",
    status: "Completed",
    value: "₦8.4B",
    area: "31,200 sqm",
    duration: "24 Months",
    year: "2021",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    description: "Purpose-built federal office complex housing six ministries, engineered for longevity and state security.",
    featured: false,
  },
  {
    id: "p03",
    name: "Lekki Coastal Residences",
    location: "Lekki Phase 2, Lagos",
    sector: "Residential",
    status: "Completed",
    value: "₦5.9B",
    area: "22,400 sqm",
    duration: "16 Months",
    year: "2023",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    description: "240-unit premium residential estate with smart-home integration and waterfront access.",
    featured: false,
  },
  {
    id: "p04",
    name: "Kano Industrial Gateway",
    location: "Sharada Phase 3, Kano",
    sector: "Industrial",
    status: "Completed",
    value: "₦6.2B",
    area: "85,000 sqm",
    duration: "20 Months",
    year: "2020",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    description: "Integrated industrial park with 14 warehousing bays, logistics hub, and dedicated power infrastructure.",
    featured: false,
  },
  {
    id: "p05",
    name: "Lagos–Badagry Expressway Overpass",
    location: "Mile 2, Lagos",
    sector: "Infrastructure",
    status: "Completed",
    value: "₦4.1B",
    area: "1.8 km span",
    duration: "14 Months",
    year: "2019",
    image: "https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=800&q=80",
    description: "Eight-lane grade-separated interchange relieving one of West Africa's most congested arterial routes.",
    featured: false,
  },
  {
    id: "p06",
    name: "Heritage Court Ikoyi",
    location: "Old Ikoyi, Lagos",
    sector: "Residential",
    status: "Ongoing",
    value: "₦7.3B",
    area: "18,600 sqm",
    duration: "22 Months",
    year: "2024",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    description: "Ultra-luxury low-rise residences set within 4 acres of landscaped grounds in Lagos' most prestigious address.",
    featured: false,
  },
  {
    id: "p07",
    name: "Port Harcourt Trade Centre",
    location: "GRA Phase 2, Port Harcourt",
    sector: "Commercial",
    status: "Completed",
    value: "₦3.8B",
    area: "14,000 sqm",
    duration: "12 Months",
    year: "2021",
    image: "https://images.unsplash.com/photo-1590644365607-1c5a519e7b37?w=800&q=80",
    description: "A six-floor mixed-use trade centre anchoring the city's new commercial district with retail and office floors.",
    featured: false,
  },
  {
    id: "p08",
    name: "Enugu State Hospital Complex",
    location: "Independence Layout, Enugu",
    sector: "Government",
    status: "Completed",
    value: "₦5.5B",
    area: "27,000 sqm",
    duration: "26 Months",
    year: "2020",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80",
    description: "500-bed tertiary hospital built to WHO standards, delivering critical healthcare infrastructure to South-East Nigeria.",
    featured: false,
  },
  {
    id: "p09",
    name: "Accra Business Park",
    location: "Airport City, Accra, Ghana",
    sector: "Commercial",
    status: "Completed",
    value: "₦4.6B",
    area: "19,500 sqm",
    duration: "18 Months",
    year: "2022",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    description: "NOTGATE's first pan-African landmark — Grade-A offices designed for multinational tenants adjacent to Kotoka Airport.",
    featured: false,
  },
  {
    id: "p10",
    name: "Warri Petrochemical Storage Hub",
    location: "Effurun, Delta State",
    sector: "Industrial",
    status: "Ongoing",
    value: "₦9.1B",
    area: "120,000 sqm",
    duration: "30 Months",
    year: "2024",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80",
    description: "Bulk petrochemical storage facility with 28 pressurised tanks and full pipeline integration.",
    featured: false,
  },
  {
    id: "p11",
    name: "Maitama Premium Estate",
    location: "Maitama District, Abuja",
    sector: "Residential",
    status: "Completed",
    value: "₦3.2B",
    area: "11,400 sqm",
    duration: "10 Months",
    year: "2023",
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&q=80",
    description: "36 executive detached villas with perimeter security, underground utilities, and private clubhouse.",
    featured: false,
  },
  {
    id: "p12",
    name: "Ibadan Ring Road Bridge",
    location: "Challenge–Toll Gate, Ibadan",
    sector: "Infrastructure",
    status: "Completed",
    value: "₦2.9B",
    area: "940 m span",
    duration: "11 Months",
    year: "2019",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80",
    description: "Pre-stressed concrete bridge linking the western bypass and reducing inner-city transit time by 35%.",
    featured: false,
  },
];

// ─────────────────────────────────────────────
// FRAMER MOTION VARIANTS (defined outside component)
// ─────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const;

const clipUpVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 1.0, ease: EASE, delay: i * 0.12 },
  }),
};

const fadeUpVariants = {
  hidden: { y: 28, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE, delay: i * 0.08 },
  }),
};

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.85, ease: EASE, delay: i * 0.08 },
  }),
  exit: { y: -20, opacity: 0, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
};

const lineDrawVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.1, ease: EASE, delay: 0.4 },
  },
};

// ─────────────────────────────────────────────
// SECTOR & STATUS CONFIG
// ─────────────────────────────────────────────

const SECTORS: Array<"All" | Sector> = ["All", "Commercial", "Residential", "Government", "Industrial", "Infrastructure"];
const STATUSES: Array<"All" | Status> = ["All", "Completed", "Ongoing", "Landmark"];

const STATUS_DOT: Record<Status, string> = {
  Completed: "bg-emerald-400",
  Ongoing: "bg-amber-400",
  Landmark: "bg-white",
};

// ─────────────────────────────────────────────
// COUNTER HOOK
// ─────────────────────────────────────────────

function useCountUp(target: number, active: boolean, duration = 1800): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

// ─────────────────────────────────────────────
// STAT COUNTER COMPONENT
// ─────────────────────────────────────────────

function StatCounter({ target, suffix, label, active }: { target: number; suffix: string; label: string; active: boolean }) {
  const value = useCountUp(target, active);
  return (
    <div className="flex flex-col items-center gap-2">
      <span
        className="font-light tracking-tight"
        style={{ fontSize: "clamp(2.5rem, 6vw, 3.75rem)", color: "#FFFFFF", lineHeight: 1 }}
      >
        {value}{suffix}
      </span>
      <span
        className="text-xs tracking-[0.18em] uppercase font-normal"
        style={{ color: "rgba(255,255,255,0.65)" }}
      >
        {label}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
// GRID LAYOUT HELPERS
// ─────────────────────────────────────────────

function getColSpan(index: number): string {
  const pattern = index % 8;
  if (pattern === 0) return "col-span-12 md:col-span-8";
  if (pattern === 1) return "col-span-12 md:col-span-4";
  if (pattern === 2 || pattern === 3) return "col-span-12 md:col-span-6";
  if (pattern === 4) return "col-span-12";
  return "col-span-12 md:col-span-4";
}

function getCardMinHeight(index: number): string {
  const pattern = index % 8;
  if (pattern === 0 || pattern === 1) return "480px";
  if (pattern === 4) return "360px";
  if (pattern === 2 || pattern === 3) return "360px";
  return "280px";
}

// ─────────────────────────────────────────────
// PROJECT CARD
// ─────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      key={project.id}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className={`${getColSpan(index)} relative rounded-2xl overflow-hidden cursor-pointer group`}
      style={{ minHeight: getCardMinHeight(index) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.20) 50%, transparent 100%)",
        }}
      />

      {/* Ring glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none"
        style={{ boxShadow: hovered ? "inset 0 0 0 1px rgba(232,67,30,0.5)" : "inset 0 0 0 0px transparent" }}
      />

      {/* TOP — tags */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <span
          className="text-xs px-3 py-1 rounded-full font-normal tracking-wide"
          style={{
            border: "1px solid rgba(232,67,30,0.55)",
            color: "#e8431e",
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(8px)",
          }}
        >
          {project.sector}
        </span>
        <span className={`w-2 h-2 rounded-full ${STATUS_DOT[project.status]}`} title={project.status} />
      </div>

      {/* BOTTOM — info */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-white font-light text-lg leading-tight tracking-tight">{project.name}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <MapPin className="w-3 h-3 opacity-50" style={{ color: "rgba(255,255,255,0.5)" }} />
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{project.location}</span>
        </div>
        <p className="font-mono text-sm mt-2" style={{ color: "#e8431e" }}>{project.value}</p>
      </div>

      {/* Hover arrow CTA */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="absolute bottom-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "#e8431e" }}
          >
            <ArrowUpRight className="w-4 h-4" style={{ color: "#FFFFFF" }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

export default function ProjectsPage() {
  const [activeSector, setActiveSector] = useState<"All" | Sector>("All");
  const [activeStatus, setActiveStatus] = useState<"All" | Status>("All");

  const heroRef = useRef<HTMLElement>(null);
  const proofRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);
  const sectorRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const proofInView = useInView(proofRef, { once: true, margin: "-80px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });
  const sectorInView = useInView(sectorRef, { once: true, margin: "-80px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-80px" });

  const featured = projects.find((p) => p.featured)!;

  const filtered = projects.filter((p) => {
    const sectorMatch = activeSector === "All" || p.sector === activeSector;
    const statusMatch = activeStatus === "All" || p.status === activeStatus;
    return sectorMatch && statusMatch;
  });

  // ─── COLORS (matching NOTGATE logo) ───
  const C = {
    burgundyDark: "#820712",
    burgundyDarker: "#5a040c",
    orange: "#e8431e",
    warm: "#FFFFFF",
  };

  return (
    <main style={{ background: C.burgundyDark, color: C.warm, fontFamily: "'Inter', sans-serif" }}>

      {/* ─────────────────────────────────────────── */}
      {/* SECTION 1 — HERO                           */}
      {/* ─────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: C.burgundyDark }}
      >
        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0.04 }}
          aria-hidden
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain)" />
          </svg>
        </div>

        {/* Orange radial glow */}
        <div
          className="absolute top-0 right-0 w-[60vw] h-[60vh] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at top right, rgba(232,67,30,0.22) 0%, transparent 70%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-4 mb-10"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            <span
              className="text-xs tracking-[0.22em] uppercase"
              style={{ color: `${C.orange}99` }}
            >
              Premium Construction &amp; Infrastructure · Est. 1998
            </span>
            <motion.div
              className="h-px flex-1 max-w-[120px]"
              style={{ background: `${C.orange}60` }}
              variants={lineDrawVariants}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
            />
          </motion.div>

          {/* Headline — staggered clip-up */}
          <h1
            className="font-light leading-none tracking-tight mb-8"
            style={{ fontSize: "clamp(3rem, 9vw, 6rem)", lineHeight: 0.9 }}
          >
            {[
              { text: "120+ Projects.", color: C.warm },
              { text: "₦65 Billion", color: C.orange },
              { text: "Delivered.", color: C.warm },
            ].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span
                  className="block"
                  style={{ color: line.color }}
                  custom={i}
                  variants={clipUpVariants}
                  initial="hidden"
                  animate={heroInView ? "visible" : "hidden"}
                >
                  {line.text}
                </motion.span>
              </div>
            ))}
          </h1>

          {/* Sub copy */}
          <motion.p
            className="max-w-md text-base font-light leading-relaxed mb-12"
            style={{ color: `${C.warm}90` }}
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            From landmark towers to government infrastructure — every project engineered to outlast generations.
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap items-center gap-6"
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            {[
              { value: "120+", label: "Projects" },
              { value: "₦65B+", label: "Value" },
              { value: "6", label: "States" },
              { value: "25", label: "Years" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-6">
                {i > 0 && (
                  <span className="text-lg font-thin" style={{ color: `${C.warm}25` }}>|</span>
                )}
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-medium" style={{ color: C.orange }}>{stat.value}</span>
                  <span className="text-xs" style={{ color: `${C.warm}50` }}>{stat.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom scroll-hint bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 lg:px-10 py-4"
          style={{ borderTop: `1px solid ${C.warm}15` }}
          custom={5}
          variants={fadeUpVariants}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
        >
          <div className="flex items-center gap-2" style={{ color: `${C.warm}50` }}>
            <span className="text-xs tracking-wide">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </motion.div>
          </div>
          <span
            className="text-xs px-3 py-1 rounded-full font-normal tracking-wide"
            style={{ border: `1px solid ${C.orange}60`, color: C.orange }}
          >
            120 Projects
          </span>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────── */}
      {/* SECTION 2 — FILTER BAR                    */}
      {/* ─────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-40"
        style={{
          background: `${C.burgundyDark}F5`,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: `1px solid ${C.warm}12`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3 space-y-2">
          {/* Sector filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {SECTORS.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSector(s)}
                className="text-xs px-3 py-1.5 rounded-full transition-all duration-250 font-normal tracking-wide"
                style={
                  activeSector === s
                    ? { background: C.orange, color: "#FFFFFF", fontWeight: 600 }
                    : {
                        border: `1px solid ${C.warm}25`,
                        color: `${C.warm}70`,
                      }
                }
              >
                {s}
              </button>
            ))}
            <span
              className="ml-auto text-xs px-2 py-1 rounded-full font-mono"
              style={{ color: C.orange, border: `1px solid ${C.orange}40` }}
            >
              {filtered.length}
            </span>
          </div>
          {/* Status filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className="text-xs px-3 py-1.5 rounded-full transition-all duration-250 font-normal tracking-wide"
                style={
                  activeStatus === s
                    ? { background: C.orange, color: "#FFFFFF", fontWeight: 600 }
                    : {
                        border: `1px solid ${C.warm}20`,
                        color: `${C.warm}60`,
                      }
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────── */}
      {/* SECTION 3 — FEATURED PROJECT              */}
      {/* ─────────────────────────────────────────── */}
      <section
        className="py-20 px-6 lg:px-10"
        style={{ background: C.burgundyDarker }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Eyebrow */}
          <motion.p
            className="text-xs tracking-[0.22em] uppercase mb-10"
            style={{ color: C.orange }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            Featured Project
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 items-start">
            {/* LEFT — image */}
            <motion.div
              className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: "4/3" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.0, ease: EASE }}
            >
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                className="object-cover"
                sizes="60vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }}
              />
              {/* Stat bar */}
              <div
                className="absolute bottom-5 left-5 right-5 flex items-center gap-6 rounded-xl px-5 py-3"
                style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)" }}
              >
                {[featured.value, featured.area, featured.duration].map((s, i) => (
                  <div key={i} className="flex items-center gap-5">
                    {i > 0 && (
                      <span className="w-px h-4" style={{ background: `${C.warm}20` }} />
                    )}
                    <span className="text-sm font-mono font-light" style={{ color: C.warm }}>{s}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — brief */}
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.0, ease: EASE, delay: 0.15 }}
            >
              <div>
                <h2
                  className="font-light leading-tight tracking-tight"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: C.warm }}
                >
                  {featured.name}
                </h2>
                <span
                  className="inline-block mt-2 text-xs px-3 py-1 rounded-full"
                  style={{ border: `1px solid ${C.warm}30`, color: `${C.warm}60` }}
                >
                  <MapPin className="inline w-3 h-3 mr-1 opacity-60" />
                  {featured.location}
                </span>
              </div>

              {[
                {
                  label: "The Brief",
                  body: "NOTGATE was commissioned to design and deliver a twin-tower commercial complex on one of Victoria Island's last premium plots. The brief demanded Class-A specifications, LEED-aligned systems, and completion within 18 months.",
                },
                {
                  label: "The Challenge",
                  body: "The site's proximity to the Lagos lagoon required specialised deep piling — over 1,200 bored piles to bedrock. Coordinating 6 simultaneous subcontractor streams while maintaining schedule demanded NOTGATE's full multi-project management system.",
                },
                {
                  label: "The Outcome",
                  body: "The towers were handed over ahead of schedule and became 100% tenanted within 4 months of completion. Total delivered value came to",
                  highlight: "₦12.8B — exceeding projections by 11%.",
                },
              ].map((block, i) => (
                <div key={i}>
                  <p
                    className="text-xs tracking-[0.18em] uppercase mb-2"
                    style={{ color: `${C.orange}99` }}
                  >
                    {block.label}
                  </p>
                  <p className="text-sm font-light leading-relaxed" style={{ color: `${C.warm}75` }}>
                    {block.body}{" "}
                    {block.highlight && (
                      <span style={{ color: C.orange }}>{block.highlight}</span>
                    )}
                  </p>
                </div>
              ))}

              {/* Blockquote */}
              <blockquote
                className="py-3 pl-4 text-sm font-light italic leading-relaxed"
                style={{
                  borderLeft: `2px solid ${C.orange}`,
                  color: `${C.warm}65`,
                }}
              >
                "NOTGATE delivered something that didn't just meet the brief — it surpassed everything we imagined for this site."
                <footer className="mt-2 text-xs not-italic" style={{ color: `${C.warm}45` }}>
                  — MD, Lighthouse Properties Ltd
                </footer>
              </blockquote>

              {/* CTA */}
              <button
                className="flex items-center gap-2 self-start px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: C.orange,
                  color: "#FFFFFF",
                  boxShadow: `0 0 0 0px ${C.orange}40`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 32px ${C.orange}50`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 0 0px ${C.orange}40`;
                }}
              >
                View Full Case Study
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────── */}
      {/* SECTION 4 — PROJECT GRID                  */}
      {/* ─────────────────────────────────────────── */}
      <section
        ref={gridRef}
        className="py-20 px-6 lg:px-10"
        style={{ background: C.burgundyDark }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Label row */}
          <div className="flex items-center justify-between mb-8">
            <motion.h2
              className="text-sm font-light tracking-[0.12em] uppercase"
              style={{ color: `${C.warm}70` }}
              initial={{ opacity: 0 }}
              animate={gridInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
            >
              All Projects
            </motion.h2>
            <motion.span
              className="text-xs font-mono"
              style={{ color: `${C.warm}45` }}
              initial={{ opacity: 0 }}
              animate={gridInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            >
              Showing {filtered.length} of 120
            </motion.span>
          </div>

          {/* Masonry-style grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeSector}-${activeStatus}`}
              className="grid grid-cols-12 gap-4"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─────────────────────────────────────────── */}
      {/* SECTION 5 — PROOF BAR                     */}
      {/* ─────────────────────────────────────────── */}
      <section
        ref={proofRef}
        className="py-16"
        style={{ background: C.orange }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
            {[
              { target: 65, suffix: "B+", label: "Total Value Delivered" },
              { target: 120, suffix: "+", label: "Projects Completed" },
              { target: 6, suffix: "", label: "States & Countries" },
              { target: 25, suffix: "+", label: "Years of Excellence" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-0 relative">
                {i > 0 && (
                  <div
                    className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12"
                    style={{ background: "rgba(255,255,255,0.2)" }}
                  />
                )}
                <StatCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  label={stat.label}
                  active={proofInView}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────── */}
      {/* SECTION 6 — SECTOR DEEP-DIVES             */}
      {/* ─────────────────────────────────────────── */}
      <section
        ref={sectorRef}
        className="py-20 px-6 lg:px-10"
        style={{ background: C.burgundyDarker }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="font-light tracking-tight mb-12"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: C.warm,
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={sectorInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
          >
            Built For Every Scale
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                num: "01",
                name: "Commercial",
                count: "48 Projects",
                desc: "NOTGATE has delivered Grade-A office towers, mixed-use retail anchors, and business parks across Nigeria and Ghana. Our commercial work is defined by precision scheduling and tenant-ready handover.",
              },
              {
                num: "02",
                name: "Government & Infrastructure",
                count: "36 Projects",
                desc: "From federal secretariats to interstate bridges, NOTGATE navigates public-sector procurement, compliance, and scale with a track record of on-time delivery for critical national assets.",
              },
              {
                num: "03",
                name: "Residential & Industrial",
                count: "36 Projects",
                desc: "Premium estates and heavy industrial facilities share the same NOTGATE standard: structural integrity, rigorous finishing, and a handover that needs no snagging list.",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="relative rounded-2xl p-8 cursor-pointer group"
                style={{
                  background: C.burgundyDarker,
                  border: `1px solid ${C.warm}12`,
                }}
                initial={{ opacity: 0, y: 32 }}
                animate={sectorInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
                whileHover={{
                  boxShadow: `0 0 40px ${C.orange}12, inset 0 0 0 1px ${C.orange}35`,
                }}
              >
                {/* Decorative number */}
                <span
                  className="absolute top-6 right-6 font-light select-none"
                  style={{ fontSize: "4rem", lineHeight: 1, color: `${C.warm}10` }}
                >
                  {card.num}
                </span>

                <div className="relative z-10">
                  <h3
                    className="text-2xl font-light tracking-tight mb-1"
                    style={{ color: C.warm }}
                  >
                    {card.name}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: C.orange }}>{card.count}</p>
                  <p className="text-sm font-light leading-relaxed mb-6" style={{ color: `${C.warm}60` }}>
                    {card.desc}
                  </p>
                  <span
                    className="text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
                    style={{ color: C.orange }}
                  >
                    Explore {card.name}
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────── */}
      {/* SECTION 7 — CTA STRIP                     */}
      {/* ─────────────────────────────────────────── */}
      <section
        ref={ctaRef}
        className="py-20 px-6 lg:px-10 text-center"
        style={{ background: C.burgundyDarker }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="font-light tracking-tight mb-4"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: C.warm,
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, ease: EASE }}
          >
            Tell us what you're building.
          </motion.h2>

          <motion.p
            className="text-base font-light mb-10"
            style={{ color: `${C.warm}50` }}
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            Every landmark starts with a conversation. Let's have ours.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          >
            <button
              className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold transition-all duration-300 hover:scale-[1.03]"
              style={{ background: C.orange, color: "#FFFFFF" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 12px 40px ${C.orange}55`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-normal transition-all duration-300"
              style={{
                border: `1px solid ${C.warm}30`,
                color: `${C.warm}75`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = `${C.orange}60`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = `${C.warm}30`;
              }}
            >
              Call our project team
            </button>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs"
            style={{ color: `${C.warm}40` }}
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          >
            {["✓ 25 Years Experience", "✓ Government Certified", "✓ Pan-African Delivery"].map((t, i) => (
              <span key={i} className="tracking-wide">{t}</span>
            ))}
          </motion.div>
        </div>
      </section>

    </main>
  );
}