"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../ui/AnimatedSection";

interface Partner {
  name: string;
  description: string;
  website: string;
  logoImage: string;
}

const partners: Partner[] = [
  {
    name: "Redleaf",
    description: "ELV Solutions Integrators",
    website: "https://www.redleaf-solutions.com",
    logoImage: "/partners/redleaf-logo.png",
  },
  {
    name: "WOODStyles",
    description: "Furniture & Joinery",
    website: "https://wood-styles.com",
    logoImage: "/partners/woodstyles-logo.png",
  },
  {
    name: "Alan Caray",
    description: "High-End Building Materials Distributor",
    website: "https://www.alancaray.com",
    logoImage: "/partners/alan-caray-logo.png",
  },
  {
    name: "PROVAST",
    description: "Facility Management",
    website: "https://provastltd.com",
    logoImage: "/partners/provast-logo.png",
  },
  {
    name: "GITS",
    description: "Technology & Digital Solutions",
    website: "https://gits.technology",
    logoImage: "/partners/logo-transparent-256x256.png",
  },
];

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <motion.a
      href={partner.website}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="group flex flex-col items-center rounded-2xl border border-[#444E36]/[0.06] bg-[#B0B7B9] p-6 sm:p-8 text-center transition-all duration-500 hover:bg-[#B0B7B9]/90 hover:shadow-lg cursor-pointer h-full"
    >
      {/* Logo Image — Equal height for all partners */}
      <div className="mb-5 sm:mb-6 flex w-full items-center justify-center h-16 sm:h-20">
        <img
          src={partner.logoImage}
          alt={partner.name}
          className="max-h-full max-w-[80%] object-contain transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `<span class="text-lg font-bold tracking-tight text-[#444E36]/80">${partner.name}</span>`;
            }
          }}
        />
      </div>

      {/* Description */}
      <p className="text-[11px] font-medium leading-relaxed text-[#444E36]/70">
        {partner.description}
      </p>

      {/* Visit indicator */}
      <div className="mt-auto pt-4 flex items-center gap-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#444E36]/40">Visit</span>
        <svg className="h-3 w-3 text-[#444E36]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
    </motion.a>
  );
}

export function PartnersSection() {
  return (
    <section className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <AnimatedSection className="mb-10 sm:mb-14">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-16">
            <div>
              <motion.p
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-[#F7FF5C]/60"
              >
                Strategic Partners
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 28, clipPath: "inset(100% 0 0 0)" }}
                whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                className="text-[1.75rem] font-light leading-[1.1] tracking-[-0.02em] text-[#F1F0D8] sm:text-3xl md:text-4xl"
              >
                The NOTGATE
                <br />
                <span className="font-extralight text-[#F1F0D8]/55">Alliance</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-end"
            >
              <p className="max-w-md text-sm font-light leading-[1.75] text-[#F1F0D8]/35 sm:text-[15px]">
                NOTGATE is part of a group of companies delivering end-to-end
                services in the construction industry.
              </p>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Desktop: 3 + 2 layout */}
        <div className="hidden sm:block">
          <StaggerContainer staggerDelay={0.08}>
            {/* First Row — 3 cards */}
            <div className="grid grid-cols-3 gap-4 lg:gap-5">
              {partners.slice(0, 3).map((partner) => (
                <StaggerItem key={partner.name}>
                  <PartnerCard partner={partner} />
                </StaggerItem>
              ))}
            </div>

            {/* Second Row — 2 cards, centered */}
            <div className="mt-4 lg:mt-5 grid grid-cols-2 gap-4 lg:gap-5 px-[16.66%]">
              {partners.slice(3).map((partner) => (
                <StaggerItem key={partner.name}>
                  <PartnerCard partner={partner} />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>

        {/* Mobile: 2 + 2 + 1 layout */}
        <div className="sm:hidden">
          <StaggerContainer staggerDelay={0.08}>
            {/* Row 1 — 2 cards */}
            <div className="grid grid-cols-2 gap-3">
              {partners.slice(0, 2).map((partner) => (
                <StaggerItem key={partner.name}>
                  <PartnerCard partner={partner} />
                </StaggerItem>
              ))}
            </div>

            {/* Row 2 — 2 cards */}
            <div className="mt-3 grid grid-cols-2 gap-3">
              {partners.slice(2, 4).map((partner) => (
                <StaggerItem key={partner.name}>
                  <PartnerCard partner={partner} />
                </StaggerItem>
              ))}
            </div>

            {/* Row 3 — 1 card centered */}
            <div className="mt-3 flex justify-center px-[25%]">
              <StaggerItem key={partners[4].name} className="w-full">
                <PartnerCard partner={partners[4]} />
              </StaggerItem>
            </div>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}