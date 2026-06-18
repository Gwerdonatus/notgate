"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { projects } from "@/data/site-data";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../ui/AnimatedSection";

const projectImages = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  "https://images.unsplash.com/photo-1590644365607-1c5a519e7b37?w=800&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
];

export function ProjectsPreview() {
  const featuredProjects = projects.slice(0, 4);

  return (
    <section className="bg-burgundy-dark py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* White Card Container */}
        <div className="bg-warm rounded-2xl sm:rounded-3xl overflow-hidden">
          
          {/* Header */}
          <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12 border-b border-burgundy/5">
            <AnimatedSection>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-burgundy/40 mb-2">
                    Selected Work
                  </p>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-burgundy-dark leading-[1.1]">
                    Featured Projects
                  </h2>
                </div>
                <Link 
                  href="/projects" 
                  className="group hidden sm:inline-flex items-center gap-2 text-sm font-medium text-burgundy/60 hover:text-orange transition-colors duration-300"
                >
                  View all projects
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Desktop Grid */}
          <StaggerContainer 
            className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4" 
            staggerDelay={0.08}
          >
            {featuredProjects.map((project, i) => (
              <StaggerItem key={project.id}>
                <Link 
                  href={`/projects/${project.id}`} 
                  className="group block relative overflow-hidden"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-premium group-hover:scale-105"
                      style={{ backgroundImage: `url('${projectImages[i]}')` }}
                    />
                    <div className="absolute inset-0 bg-burgundy-dark/0 group-hover:bg-burgundy-dark/20 transition-colors duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 bg-warm/90 backdrop-blur-sm text-burgundy-dark rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-orange/0 group-hover:bg-orange flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                      <ArrowUpRight className="w-5 h-5 text-burgundy-dark" />
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 border-t border-burgundy/5">
                    <h3 className="text-base sm:text-lg font-medium text-burgundy-dark group-hover:text-orange transition-colors duration-300 mb-1">
                      {project.name}
                    </h3>
                    <p className="text-xs text-burgundy/40 tracking-wide">
                      {project.location}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <span className="text-xs font-mono text-orange/80">
                        {project.value}
                      </span>
                      <span className="h-3 w-px bg-burgundy/10" />
                      <span className="text-xs text-burgundy/30">
                        {project.year}
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Mobile Horizontal Scroll */}
          <div className="sm:hidden">
            <div 
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 py-6 -mx-6 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {featuredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="snap-start shrink-0 w-[78vw]"
                >
                  <Link 
                    href={`/projects/${project.id}`} 
                    className="group block relative overflow-hidden rounded-xl"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${projectImages[i]}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-burgundy-darker/80 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 bg-warm/90 backdrop-blur-sm text-burgundy-dark rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-medium text-warm mb-1">
                          {project.name}
                        </h3>
                        <p className="text-xs text-warm/60 tracking-wide">
                          {project.location}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs font-mono text-orange">
                            {project.value}
                          </span>
                          <span className="h-2.5 w-px bg-warm/20" />
                          <span className="text-xs text-warm/40">
                            {project.year}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Mobile scroll hint + CTA */}
            <div className="px-6 pb-6 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-burgundy/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-burgundy/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-burgundy/20" />
                <span className="text-[10px] text-burgundy/30 ml-1 tracking-wide">Swipe</span>
              </div>
              <Link 
                href="/projects" 
                className="inline-flex items-center gap-1 text-xs font-medium text-burgundy/60 hover:text-orange transition-colors"
              >
                View all
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12 border-t border-burgundy/5">
            <AnimatedSection>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <p className="text-sm text-burgundy/50 text-center sm:text-left">
                  Over <span className="text-burgundy-dark font-medium">120 projects</span> delivered across Nigeria and Africa
                </p>
                <Link 
                  href="/projects" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy-dark text-warm text-sm font-semibold rounded-lg hover:bg-burgundy transition-colors duration-300"
                >
                  Explore All Projects
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}