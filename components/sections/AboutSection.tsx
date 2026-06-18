"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <section ref={sectionRef} className="relative px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* White card container — matches reference exactly */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/[0.06]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Text — matches reference layout */}
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14 xl:p-16">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                {/* Eyebrow */}
                <motion.p
                  variants={itemVariants}
                  className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B7B3A]"
                >
                  About NOTGATE
                </motion.p>

                {/* Headline — bold, confident, like reference */}
                <motion.h2
                  variants={itemVariants}
                  className="text-[1.65rem] font-bold leading-[1.15] tracking-[-0.02em] text-[#1C1F16] sm:text-[1.85rem] md:text-[2.1rem] lg:text-[2.25rem]"
                >
                  International Award-
                  <br />
                  winning Construction
                  <br />
                  Company
                </motion.h2>

                {/* Body */}
                <motion.p
                  variants={itemVariants}
                  className="mt-5 max-w-sm text-[14px] font-normal leading-[1.7] text-[#5C5C5C]"
                >
                  NOTGATE aims to be the undisputed leader in the construction
                  industry, delivering exceptional products and services that
                  set the standard for quality and innovation.
                </motion.p>

                {/* Circular CTA — matches reference exactly */}
                <motion.div variants={itemVariants} className="mt-8">
                  <Link
                    href="/company"
                    className="group inline-flex h-[72px] w-[72px] flex-col items-center justify-center rounded-full border border-[#1C1F16]/20 transition-all duration-500 hover:border-[#D4C84A] hover:bg-[#D4C84A]/10"
                  >
                    <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#1C1F16]/70 transition-colors group-hover:text-[#1C1F16]">
                      About
                    </span>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#1C1F16]/70 transition-colors group-hover:text-[#1C1F16]">
                      Us
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Right: Image with award badge — matches reference */}
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
              <motion.div style={{ y: imageY }} className="absolute inset-0">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1000&q=80')`,
                  }}
                />
              </motion.div>

              {/* Award badge overlay — bottom left, like reference */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="absolute bottom-5 left-5 z-10 sm:bottom-8 sm:left-8"
              >
                <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-black/40 px-4 py-3 backdrop-blur-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D4C84A]/90">
                    <svg
                      className="h-5 w-5 text-[#1C1F16]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/90">
                      African Construction
                      <br />
                      Awards
                    </p>
                    <p className="mt-0.5 text-[9px] font-medium tracking-wider text-white/50">
                      LAUREATE 2023 — 2024
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Navigation arrow — like reference */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2"
              >
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20">
                  <ArrowRight className="h-4 w-4 text-white" />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}