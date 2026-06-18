"use client";

import { motion, useScroll, useTransform, useSpring, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";

// ─────────────────────────────────────────────
// DESKTOP: 4 images, right-side cluster
// ─────────────────────────────────────────────
const desktopImages = [
  {
    src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
    alt: "High-rise construction site",
    style: { right: "2%", top: "8%", width: 200, height: 260 },
    rotate: -2,
    delay: 0,
  },
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80",
    alt: "Construction workers",
    style: { right: "20%", top: "5%", width: 158, height: 198 },
    rotate: 2.5,
    delay: 0.12,
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80",
    alt: "Glass skyscraper",
    style: { right: "5%", bottom: "18%", width: 178, height: 228 },
    rotate: 2,
    delay: 0.24,
  },
  {
    src: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=500&q=80",
    alt: "Concrete foundation",
    style: { right: "22%", bottom: "12%", width: 138, height: 174 },
    rotate: -1.5,
    delay: 0.36,
  },
];

// ─────────────────────────────────────────────
// MOBILE: 7 images, scattered all over
// ─────────────────────────────────────────────
const mobileImages = [
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80",
    alt: "Construction workers",
    style: { top: "6%", left: "0px", width: 95, height: 122 },
    rotate: -3,
    delay: 0.05,
  },
  {
    src: "https://images.unsplash.com/photo-1590644365607-1c5a519e7b37?w=600&q=80",
    alt: "Aerial construction",
    style: { top: "4%", right: "0px", width: 108, height: 136 },
    rotate: 2.5,
    delay: 0.12,
  },
  {
    src: "https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=500&q=80",
    alt: "Skyscraper facade",
    style: { top: "38%", left: "0px", width: 82, height: 106 },
    rotate: -2,
    delay: 0.2,
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80",
    alt: "Glass tower",
    style: { top: "32%", right: "0px", width: 90, height: 116 },
    rotate: 3,
    delay: 0.1,
  },
  {
    src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
    alt: "High-rise construction",
    style: { top: "54%", right: "22%", width: 78, height: 100 },
    rotate: -1.5,
    delay: 0.28,
  },
  {
    src: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=500&q=80",
    alt: "Concrete infrastructure",
    style: { bottom: "8%", left: "0px", width: 86, height: 110 },
    rotate: 2,
    delay: 0.18,
  },
  {
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500&q=80",
    alt: "Construction crane",
    style: { bottom: "6%", right: "0px", width: 98, height: 126 },
    rotate: -2.5,
    delay: 0.32,
  },
];

const stats = [
  { value: "25+",   label: "Years"     },
  { value: "120+",  label: "Projects"  },
  { value: "₦65B+", label: "Delivered" },
];

// Premium easing — feels like Apple / Linear
const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;
const EASE_SOFT    = [0.25, 0.46, 0.45, 0.94] as const;

/** Single image tile — shared by both desktop and mobile sets */
function ImageTile({
  src,
  alt,
  tileStyle,
  rotate,
  delay,
  opacity = 1,
}: {
  src: string;
  alt: string;
  tileStyle: React.CSSProperties;
  rotate: number;
  delay: number;
  opacity?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.86, rotate: rotate * 0.4 }}
      animate={{ opacity, y: 0,  scale: 1,    rotate }}
      transition={{
        duration: 1.2,
        delay: 0.55 + delay,
        ease: EASE_PREMIUM,
      }}
      style={{
        ...tileStyle,
        position: "absolute",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 32px 64px -16px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.055)",
        pointerEvents: "none",
        willChange: "transform, opacity",
      }}
      aria-label={alt}
    >
      {/* Lazy-loaded bg image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${src}')` }}
      />
      {/* Depth gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
    </motion.div>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Spring-smoothed scroll fade — feels physical, not linear
  const rawOpacity  = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const fadeOpacity = useSpring(rawOpacity, { stiffness: 60, damping: 20, mass: 0.8 });

  // Parallax: content drifts up slowly as you scroll
  const rawY  = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const driftY = useSpring(rawY, { stiffness: 50, damping: 18, mass: 0.6 });

  return (
    <section
      ref={ref}
      className="relative h-[100dvh] bg-burgundy-dark overflow-hidden"
    >
      <motion.div
        style={{ opacity: fadeOpacity, y: driftY }}
        className="relative h-full"
      >
        {/* ── Grain texture ── */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none select-none">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="hero-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#hero-grain)" />
          </svg>
        </div>

        {/* ── Ambient glow ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.4, delay: 0.3 }}
          className="absolute pointer-events-none"
          style={{ top: "20%", right: "15%", width: 560, height: 560,
            background: "radial-gradient(circle, rgba(194,82,28,0.07) 0%, transparent 70%)",
            borderRadius: "50%", filter: "blur(40px)" }}
        />

        {/* ══════════════════════════════════════════════
            DESKTOP images — right cluster (hidden on mobile)
        ══════════════════════════════════════════════ */}
        <div className="absolute inset-0 hidden lg:block pointer-events-none">
          {desktopImages.map((img, i) => (
            <ImageTile
              key={`d${i}`}
              src={img.src}
              alt={img.alt}
              tileStyle={{ ...img.style }}
              rotate={img.rotate}
              delay={img.delay}
              opacity={1}
            />
          ))}
        </div>

        {/* ══════════════════════════════════════════════
            MOBILE images — scattered all over (hidden on lg+)
        ══════════════════════════════════════════════ */}
        <div className="absolute inset-0 lg:hidden pointer-events-none">
          {mobileImages.map((img, i) => (
            <ImageTile
              key={`m${i}`}
              src={img.src}
              alt={img.alt}
              tileStyle={{ ...img.style }}
              rotate={img.rotate}
              delay={img.delay}
              opacity={0.48}
            />
          ))}
        </div>

        {/* ══════════════════════════════════════════════
            CONTENT
        ══════════════════════════════════════════════ */}
        <div className="relative z-10 h-full flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:px-16 xl:px-24">

          {/* TOP — eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1,  x: 0   }}
            transition={{ duration: 1.0, delay: 0.18, ease: EASE_PREMIUM }}
          >
            <span className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.32em] text-orange/65">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: EASE_SOFT, transformOrigin: "left" }}
                className="w-8 h-px bg-orange/40 block"
              />
              Premium Construction & Infrastructure
            </span>
          </motion.div>

          {/* MIDDLE — headline + sub + stats + CTAs */}
          <div className="flex-1 flex flex-col justify-center max-w-[min(440px,54vw)] sm:max-w-[480px] lg:max-w-[540px]">

            {/* Headline — each word staggers in */}
            <div className="mb-4 sm:mb-5 overflow-hidden">
              {[
                { text: "Building",          class: "text-warm"   },
                { text: "Nigeria\u2019s",    class: "text-orange" },
                { text: "Future",            class: "text-warm"   },
              ].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "105%", opacity: 0 }}
                    animate={{ y: "0%",   opacity: 1 }}
                    transition={{
                      duration: 1.05,
                      delay: 0.32 + i * 0.11,
                      ease: EASE_PREMIUM,
                    }}
                  >
                    <span
                      className={`block text-[clamp(2.6rem,8.5vw,5.2rem)] font-light tracking-tight leading-[0.92] ${line.class}`}
                    >
                      {line.text}
                    </span>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 1.0, delay: 0.62, ease: EASE_PREMIUM }}
              className="text-sm sm:text-base text-warm/48 leading-relaxed mb-5 sm:mb-8 max-w-[300px] sm:max-w-sm"
            >
              Precision-engineered construction delivering landmark residential,
              commercial, and government infrastructure across Africa.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.95, delay: 0.74, ease: EASE_PREMIUM }}
              className="flex items-center gap-6 sm:gap-8 mb-7 sm:mb-10"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0  }}
                  transition={{ duration: 0.8, delay: 0.76 + i * 0.08, ease: EASE_PREMIUM }}
                  className="flex flex-col"
                >
                  <span className="text-xl sm:text-2xl lg:text-3xl font-light text-orange tracking-tight">
                    {s.value}
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-warm/28 mt-0.5">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.95, delay: 0.92, ease: EASE_PREMIUM }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-orange text-burgundy-dark text-xs sm:text-sm font-bold rounded-full transition-all duration-500 ease-out hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(194,82,28,0.45)] active:scale-[0.98]"
              >
                Explore Projects
                <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <button className="group inline-flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-warm/55 hover:text-warm transition-all duration-500">
                <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-warm/18 group-hover:border-orange/60 group-hover:bg-orange/8 transition-all duration-500">
                  <Play className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-current ml-0.5 transition-transform duration-300 group-hover:scale-110" />
                </span>
                Watch Showreel
              </button>
            </motion.div>
          </div>

          {/* BOTTOM BAR */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1,  y: 0  }}
            transition={{ duration: 1.0, delay: 1.15, ease: EASE_PREMIUM }}
          >
            <div className="h-px bg-warm/8 mb-4" />
            <div className="flex items-center justify-between">

              {/* Brand mark */}
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-orange/10 border border-orange/20 flex items-center justify-center">
                  <span className="text-orange font-bold text-xs">N</span>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-warm/65">NOTGATE</p>
                  <p className="text-[9px] text-warm/22">Est. 1998</p>
                </div>
              </div>

              {/* View All Projects */}
              <Link
                href="/projects"
                className="group flex items-center gap-3 sm:gap-4 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-warm/8 hover:border-orange/35 hover:bg-orange/4 transition-all duration-500 ease-out backdrop-blur-sm"
              >
                <div className="text-right">
                  <p className="text-xs sm:text-sm font-medium text-warm/75 group-hover:text-orange transition-colors duration-400">
                    View All Projects
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-warm/28 mt-0.5">
                    120+ delivered across Africa
                  </p>
                </div>
                <span className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-warm/12 group-hover:border-orange group-hover:bg-orange transition-all duration-500 ease-out">
                  <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-warm/45 group-hover:text-burgundy-dark transition-all duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}