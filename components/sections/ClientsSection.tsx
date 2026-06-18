"use client";

import Image from "next/image";
import { AnimatedSection } from "../ui/AnimatedSection";

// ── Logo mapping ─────────────────────────────────────────────
interface LogoAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const logoMap: Record<string, LogoAsset> = {
  DANGOTE:        { src: "/logos/dangote.png",        alt: "Dangote Group",          width: 140, height: 50 },
  UBA:            { src: "/logos/uba.png",            alt: "UBA",                    width: 120, height: 45 },
  GLO:            { src: "/logos/glo.png",            alt: "Globacom",               width: 100, height: 50 },
  NESTLE:         { src: "/logos/nestle.png",         alt: "Nestlé Nigeria",         width: 130, height: 45 },
  OLAM:           { src: "/logos/olam.png",           alt: "Olam Group",             width: 120, height: 45 },
  BUA:            { src: "/logos/bua.png",            alt: "BUA Group",              width: 110, height: 50 },
  SHELL:          { src: "/logos/shell.png",          alt: "Shell Nigeria",          width: 100, height: 50 },
  "ACCESS BANK":  { src: "/logos/access-bank.png",    alt: "Access Bank",            width: 140, height: 45 },
  "FLOUR MILLS":  { src: "/logos/flour-mills.png",    alt: "Flour Mills of Nigeria", width: 150, height: 45 },
  WAPIC:          { src: "/logos/wapic.png",          alt: "Wapic Insurance",        width: 130, height: 45 },
  "MARINA SECURITIES": { src: "/logos/marina-securities.png", alt: "Marina Securities", width: 160, height: 40 },
  FRANEMM:        { src: "/logos/franemm.png",        alt: "Franemm Industries",     width: 140, height: 45 },
};

// ── Split into two rows ──────────────────────────────────────
const clientsRow1 = ["DANGOTE", "UBA", "GLO", "NESTLE", "OLAM", "BUA"];
const clientsRow2 = ["SHELL", "ACCESS BANK", "FLOUR MILLS", "WAPIC", "MARINA SECURITIES", "FRANEMM"];

// ── Marquee Row ──────────────────────────────────────────────
function MarqueeRow({
  clients,
  direction,
  speed = 35,
}: {
  clients: string[];
  direction: "left" | "right";
  speed?: number;
}) {
  const tripleClients = [...clients, ...clients, ...clients];

  return (
    <div className="relative overflow-hidden w-full py-2 sm:py-3 group/marquee">
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-20 bg-gradient-to-r from-burgundy-dark to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-20 bg-gradient-to-l from-burgundy-dark to-transparent" />

      <div
        className="flex items-center gap-3 sm:gap-4 lg:gap-5 will-change-transform"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {tripleClients.map((client, i) => {
          const logo = logoMap[client];

          return (
            <div
              key={`${client}-${i}`}
              className="flex-shrink-0 group/logo"
            >
              {/* White rounded pill container */}
              <div className="relative flex items-center justify-center px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 rounded-full bg-white/95 backdrop-blur-sm shadow-[0_2px_12px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.3)] border border-white/15 transition-all duration-500 ease-out hover:shadow-[0_6px_24px_rgba(255,255,255,0.12),inset_0_1px_0_rgba(255,255,255,0.4)] hover:scale-105 hover:-translate-y-0.5 cursor-default select-none">

                {/* Subtle inner shine on hover */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/50 via-transparent to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Logo image */}
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="h-5 sm:h-6 lg:h-7 w-auto object-contain opacity-90 group-hover/logo:opacity-100 transition-all duration-500"
                  draggable={false}
                  priority={i < 6}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Section ─────────────────────────────────────────────
export function ClientsSection() {
  return (
    <section id="clients" className="relative overflow-hidden py-10 sm:py-14 lg:py-16 bg-burgundy-dark">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <AnimatedSection className="mb-6 sm:mb-8 text-center">

          {/* Overline */}
          <span className="inline-block text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.3em] text-orange/40 mb-2 sm:mb-3">
            Trusted By
          </span>

          {/* Main heading */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-warm leading-snug tracking-tight">
            Our clients
          </h2>

        </AnimatedSection>

        {/* ── Floating Marquee Rows ── */}
        <div className="relative space-y-3 sm:space-y-4">

          {/* Row 1: Scrolls LEFT → */}
          <MarqueeRow clients={clientsRow1} direction="left" speed={32} />

          {/* Subtle divider */}
          <div className="h-px bg-warm/5 mx-8 sm:mx-16" />

          {/* Row 2: Scrolls RIGHT ← */}
          <MarqueeRow clients={clientsRow2} direction="right" speed={38} />
        </div>

        {/* ── Bottom note ── */}
        <AnimatedSection delay={0.3} className="mt-6 sm:mt-8 text-center">
          <p className="text-[10px] sm:text-[11px] font-medium text-warm/20 tracking-[0.2em] uppercase">
            25+ years of trusted partnerships across Africa
          </p>
        </AnimatedSection>
      </div>

      {/* ── Keyframe Animations ── */}
      <style jsx>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}