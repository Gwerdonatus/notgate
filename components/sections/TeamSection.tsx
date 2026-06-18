"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "../ui/AnimatedSection";

export function TeamSection() {
  return (
    <section className="section-padding py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <motion.div
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] group cursor-default"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/40 to-dark/20" />

            <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-10 lg:p-14">
              <p className="text-white/70 text-sm sm:text-base max-w-lg leading-relaxed mb-4">
                We bring ideas to life through seamless end-to-end turnkey delivery.
              </p>

              {/* Stats overlay - bottom right */}
              <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 flex gap-3">
                {[
                  { icon: "40+", label: "Years of Excellence" },
                  { icon: "🏗", label: "Specializing in Luxury Developments" },
                  { icon: "⭐", label: "International Award Winning" },
                  { icon: "🏢", label: "Premium Real Estate Developer" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-center">
                    <p className="text-white font-bold text-xs sm:text-sm">{stat.icon}</p>
                    <p className="text-white/50 text-[0.5rem] sm:text-xs mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
