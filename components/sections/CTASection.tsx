"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "../ui/AnimatedSection";

export function CTASection() {
  return (
    <section className="section-padding py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="relative rounded-3xl overflow-hidden bg-dark">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80')` }}
            />
            <div className="relative z-10 py-14 sm:py-18 lg:py-22 px-6 sm:px-10 lg:px-16 text-center">
              <p className="text-primary text-xs font-semibold tracking-[0.15em] uppercase mb-4">Start Your Journey</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight max-w-2xl mx-auto mb-4">
                Ready to Build Your Next Landmark?
              </h2>
              <p className="text-white/50 text-sm sm:text-base max-w-md mx-auto mb-8">
                Let us bring your vision to life with our expertise in luxury real estate development.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-secondary transition-all duration-500"
              >
                Get In Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
