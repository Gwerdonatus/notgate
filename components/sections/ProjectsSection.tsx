"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { projects } from "@/lib/projects-data";

const C = {
  bg: "#5a040c",
  ink: "#FFFFFF",
  accent: "#e8431e",
};

const easeLuxury = [0.25, 0.1, 0.25, 1];

export function ProjectsPreview() {
  const featuredProjects = projects.slice(0, 4);

  return (
    <section style={{ background: C.bg }} className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: easeLuxury }}
          className="mb-12 md:mb-16"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: C.accent }}>
            Selected Work
          </p>
          <h2
            className="font-serif font-light tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.08, color: C.ink }}
          >
            Featured Projects
          </h2>
        </motion.div>

        {/* Horizontal Scroll */}
        <div 
          className="flex overflow-x-auto gap-6 md:gap-8 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeLuxury, delay: i * 0.1 }}
              className="shrink-0 w-[280px] sm:w-[320px] md:w-[360px]"
            >
              <Link href={`/projects/${project.slug}`} className="group block">
                
                {/* Image with infrastructure lines */}
                <div className="relative">
                  {/* Top lines */}
                  <div className="absolute -top-3 left-0 right-0 h-px opacity-50" style={{ background: C.accent }} />
                  <div className="absolute -top-1 left-0 right-0 h-px opacity-30" style={{ background: C.accent }} />
                  
                  {/* Top corner ticks */}
                  <div className="absolute -top-3 left-0 w-2.5 h-2.5 border-t border-l opacity-50" style={{ borderColor: C.accent }} />
                  <div className="absolute -top-3 right-0 w-2.5 h-2.5 border-t border-r opacity-50" style={{ borderColor: C.accent }} />

                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-black/20">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="360px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 transition-colors duration-500 group-hover:bg-black/20" />
                    
                    {/* Sector badge */}
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full" style={{ color: C.ink }}>
                        {project.sector}
                      </span>
                    </div>
                    
                    {/* Hover arrow */}
                    <div 
                      className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                      style={{ background: C.accent }}
                    >
                      <ArrowUpRight className="w-5 h-5" style={{ color: C.bg }} />
                    </div>
                  </div>

                  {/* Bottom lines */}
                  <div className="absolute -bottom-1 left-0 right-0 h-px opacity-30" style={{ background: C.accent }} />
                  <div className="absolute -bottom-3 left-0 right-0 h-px opacity-50" style={{ background: C.accent }} />
                  
                  {/* Bottom corner ticks */}
                  <div className="absolute -bottom-3 left-0 w-2.5 h-2.5 border-b border-l opacity-50" style={{ borderColor: C.accent }} />
                  <div className="absolute -bottom-3 right-0 w-2.5 h-2.5 border-b border-r opacity-50" style={{ borderColor: C.accent }} />
                </div>

                {/* Text */}
                <div className="pt-5">
                  <h3 className="text-base sm:text-lg font-medium mb-1 transition-opacity duration-300 group-hover:opacity-70" style={{ color: C.ink }}>
                    {project.name}
                  </h3>
                  <p className="text-xs tracking-wide" style={{ color: `${C.ink}55` }}>
                    {project.location}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-xs font-mono" style={{ color: `${C.accent}cc` }}>
                      {project.status}
                    </span>
                    <span className="h-3 w-px" style={{ background: `${C.ink}16` }} />
                    <span className="text-xs" style={{ color: `${C.ink}40` }}>
                      {project.year}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile scroll hint */}
        <div className="mt-6 flex items-center justify-between sm:hidden">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: `${C.ink}30` }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: `${C.ink}30` }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: `${C.ink}30` }} />
            <span className="text-[10px] ml-1 tracking-wide" style={{ color: `${C.ink}40` }}>Swipe</span>
          </div>
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-1 text-xs font-medium transition-colors hover:opacity-70"
            style={{ color: `${C.ink}60` }}
          >
            View all
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: easeLuxury }}
          className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ borderTop: `1px solid ${C.ink}16` }}
        >
          <p className="text-sm text-center sm:text-left" style={{ color: `${C.ink}80` }}>
            Over <span className="font-medium" style={{ color: C.ink }}>{projects.length}+ projects</span> delivered across Nigeria and Africa
          </p>
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg transition-colors duration-300 hover:opacity-90"
            style={{ background: C.accent, color: C.bg }}
          >
            Explore All Projects
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}