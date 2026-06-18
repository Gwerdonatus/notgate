"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { values, services, milestones, partners } from "@/data/site-data";
import { Award, Shield, Users, Clock, ChevronDown, Leaf, Heart, Lightbulb, Target, Zap, Globe } from "lucide-react";

// ── Value letter colors (subtle, muted) ─────────────────────
const letterColors: Record<string, { bg: string; text: string }> = {
  N: { bg: "bg-orange/10", text: "text-orange" },
  O: { bg: "bg-warm/10", text: "text-warm" },
  T: { bg: "bg-orange/10", text: "text-orange" },
  G: { bg: "bg-warm/10", text: "text-warm" },
  A: { bg: "bg-orange/10", text: "text-orange" },
  E: { bg: "bg-warm/10", text: "text-warm" },
};

// ── Stats data ───────────────────────────────────────────────
const stats = [
  { icon: Clock, title: "40+", subtitle: "Years of Excellence", color: "bg-orange/8", iconColor: "text-orange" },
  { icon: Target, title: "Specializing in", subtitle: "Industrial, Residential & Commercial Developments", color: "bg-warm/5", iconColor: "text-warm" },
  { icon: Award, title: "International", subtitle: "Award Winning Company", color: "bg-orange/8", iconColor: "text-orange" },
  { icon: Shield, title: "Premium", subtitle: "Real Estate Developer", color: "bg-warm/5", iconColor: "text-warm" },
];

// ── Feature cards data ───────────────────────────────────────
const features = [
  { icon: Heart, title: "Customer Satisfaction", desc: "We deliver exceptional service and support at every stage. Our focus on client satisfaction has built strong, long-term relationships, with many projects coming from repeat clients and referrals." },
  { icon: Clock, title: "Timeliness", desc: "Meeting deadlines is a key part of our commitment to excellence. We plan efficiently, manage proactively and ensure every project is delivered on time and to the highest standards." },
  { icon: Globe, title: "Value-Added Services", desc: "Through partnerships with trusted local and international experts, we offer complete construction solutions, from design and building to maintenance and facility management." },
  { icon: Lightbulb, title: "Creative Expertise", desc: "Our team combines creativity and technical skill to design innovative, sustainable and high-quality projects that stand out and add value to our clients' investments." },
  { icon: Users, title: "Teamwork", desc: "Collaboration is central to our success. We listen closely, align with our clients' vision and work together to ensure every project achieves outstanding results." },
  { icon: Leaf, title: "Sustainability & Innovation", desc: "We integrate green building practices and advanced technologies into our projects. By promoting sustainability and smart design, we help create a better, more resilient future for our communities." },
];

// ── Accordion for Values ─────────────────────────────────────
function ValueAccordion({ items }: { items: typeof values }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-0">
      {items.map((item, i) => (
        <div
          key={item.letter}
          className="border-b border-warm/8 last:border-b-0"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between py-4 sm:py-5 group text-left"
          >
            <span className="text-sm sm:text-base font-medium text-warm/80 group-hover:text-warm transition-colors">
              {item.title}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-warm/30 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="pb-4 sm:pb-5 text-sm text-warm/40 leading-relaxed pl-0">
                  {item.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ── Service Card ─────────────────────────────────────────────
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const serviceImages = [
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
  ];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="group cursor-default"
    >
      <div className="flex gap-4 sm:gap-5">
        {/* Image */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden flex-shrink-0">
          <Image
            src={serviceImages[index] || serviceImages[0]}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 112px, 128px"
          />
        </div>
        {/* Content */}
        <div className="flex-1 pt-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange/50">
            {service.number}
          </span>
          <h3 className="text-sm sm:text-base font-medium text-warm mt-1 mb-2 leading-snug">
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm text-warm/35 leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Milestone Card ───────────────────────────────────────────
function MilestoneCard({ milestone }: { milestone: typeof milestones[0] }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="group relative rounded-2xl overflow-hidden cursor-default"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80"
          alt={milestone.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/90 via-burgundy-dark/30 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-3 left-3 right-3">
          <span className="inline-block bg-orange/90 text-burgundy-dark text-[10px] font-bold px-2 py-0.5 rounded mb-1.5">
            {milestone.year}
          </span>
          <p className="text-white font-medium text-xs sm:text-sm leading-tight">
            {milestone.title}
          </p>
          <p className="text-white/40 text-[10px] mt-0.5">{milestone.category}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Page ────────────────────────────────────────────────
export default function CompanyPage() {
  return (
    <div className="bg-burgundy-dark min-h-screen">

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

              {/* Left: Heading */}
              <div className="lg:col-span-5">
                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-orange/40 mb-4 block">
                  About NOTGATE
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-warm leading-[1.1] tracking-tight">
                  About<br />NOTGATE
                </h1>
              </div>

              {/* Right: Description */}
              <div className="lg:col-span-7 lg:pt-8">
                <p className="text-sm sm:text-base text-warm/40 leading-[1.8] mb-4">
                  NOTGATE Real Estate Development is a leading property development and construction company, founded in 1998.
                </p>
                <p className="text-sm sm:text-base text-warm/40 leading-[1.8]">
                  For over 25 years, we have delivered high-quality building and infrastructure projects across residential, commercial, and mixed-use sectors, combining innovation, reliability, and technical excellence.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Hero Image */}
          <AnimatedSection delay={0.2} className="mt-10 sm:mt-14">
            <div className="relative w-full aspect-[21/9] sm:aspect-[21/8] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80"
                alt="NOTGATE Construction"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/40 to-transparent" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          NOTGATE STANDS FOR
          ═══════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-warm leading-tight tracking-tight">
              NOTGATE stands for
            </h2>
            <p className="mt-3 text-sm text-warm/30 leading-relaxed max-w-xl">
              Embedded in our very name, NOTGATE stands for the core values that define who we are and how we operate:
            </p>
          </AnimatedSection>

          <StaggerContainer className="space-y-1" staggerDelay={0.06}>
            {values.map((value) => {
              const colors = letterColors[value.letter] || { bg: "bg-warm/5", text: "text-warm" };
              return (
                <StaggerItem key={value.letter}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-4 sm:gap-5 py-4 sm:py-5 px-4 sm:px-5 rounded-xl hover:bg-warm/[0.03] transition-colors group cursor-default"
                  >
                    {/* Letter block */}
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                      <span className={`text-base sm:text-lg font-semibold ${colors.text}`}>{value.letter}</span>
                    </div>
                    {/* Text */}
                    <div className="pt-0.5">
                      <h3 className="text-sm sm:text-base font-medium text-warm/80 group-hover:text-warm transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-warm/30 mt-1 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STATS AT A GLANCE
          ═══════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-warm leading-tight tracking-tight">
              NOTGATE at a glance
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" staggerDelay={0.08}>
            {stats.map((item, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="relative rounded-2xl p-5 sm:p-6 border border-warm/8 bg-warm/[0.02] hover:bg-warm/[0.04] hover:border-warm/12 transition-all duration-500 group cursor-default"
                >
                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>

                  {/* Text */}
                  <p className="text-warm font-light text-lg sm:text-xl leading-tight">
                    {item.title}
                  </p>
                  <p className="text-warm/30 text-xs sm:text-sm mt-1 leading-relaxed">
                    {item.subtitle}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          OUR SERVICES
          ═══════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-warm leading-tight tracking-tight">
              Our services
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12" staggerDelay={0.1}>
            {services.map((service, index) => (
              <StaggerItem key={service.number}>
                <ServiceCard service={service} index={index} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          OUR VALUES (Accordion + Image)
          ═══════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-warm leading-tight tracking-tight">
              Our Values
            </h2>
            <p className="mt-3 text-sm text-warm/30 leading-relaxed max-w-xl">
              At NOTGATE, we build with trust, responsibility and passion, creating lasting value for our clients and communities.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left: Accordion */}
            <AnimatedSection>
              <ValueAccordion items={values} />
            </AnimatedSection>

            {/* Right: Image */}
            <AnimatedSection delay={0.2}>
              <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-full min-h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                  alt="Construction workers"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/60 via-transparent to-transparent" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          VISION & MISSION
          ═══════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Left: Text */}
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-warm leading-tight tracking-tight mb-6 sm:mb-8">
                Our Vision &<br />Mission
              </h2>

              <div className="space-y-4">
                <p className="text-sm sm:text-base text-warm/40 leading-[1.8]">
                  Our vision is to be the undisputed best in the industry, setting the standard for quality, innovation, and customer satisfaction.
                </p>
                <p className="text-sm sm:text-base text-warm/40 leading-[1.8]">
                  At NOTGATE, we strive to excel in every phase of our work—from concept development and construction to customer support and beyond. By constantly pushing boundaries and raising the bar, we create lasting value for our customers and employees alike.
                </p>
                <p className="text-sm sm:text-base text-warm/40 leading-[1.8]">
                  With a presence in Nigeria and Senegal, a workforce of over 2,500 professionals, and a fleet of heavy equipment, NOTGATE delivers turnkey projects with unmatched group synergy, competitive pricing, and adherence to top specifications.
                </p>
              </div>
            </AnimatedSection>

            {/* Right: Image with overlay text */}
            <AnimatedSection delay={0.2}>
              <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
                  alt="Sustainable building"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-burgundy-dark/40" />

                {/* Overlay text card */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-burgundy-dark/80 backdrop-blur-md rounded-xl p-5 sm:p-6 border border-warm/10">
                    <h3 className="text-base sm:text-lg font-medium text-warm leading-snug">
                      Building Sustainable<br />Greenhouse and Eco-Friendly<br />Structures
                    </h3>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FEATURE CARDS (6-up grid)
          ═══════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" staggerDelay={0.06}>
            {features.map((feature, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="rounded-2xl p-6 sm:p-7 border border-warm/8 bg-warm/[0.02] hover:bg-warm/[0.04] hover:border-warm/12 transition-all duration-500 group cursor-default h-full"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-orange/8 flex items-center justify-center mb-4 group-hover:bg-orange/12 transition-colors">
                    <feature.icon className="w-5 h-5 text-orange/70" />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-medium text-warm/80 group-hover:text-warm transition-colors mb-2">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-warm/30 leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          OUR MILESTONES
          ═══════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-warm leading-tight tracking-tight">
              Our Milestones
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4" staggerDelay={0.05}>
            {milestones.map((milestone) => (
              <StaggerItem key={milestone.title}>
                <MilestoneCard milestone={milestone} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}