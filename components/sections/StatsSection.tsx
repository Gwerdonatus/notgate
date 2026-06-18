"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../ui/AnimatedSection";
import { stats } from "@/data/site-data";

function AnimatedNumber({ value, inView }: { value: string; inView: boolean }) {
  const numericPart = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = numericPart / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericPart) {
        setCount(numericPart);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, numericPart]);

  return <span>{count}{suffix}</span>;
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding py-12 sm:py-16 lg:py-20 bg-dark">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12" staggerDelay={0.15}>
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2">
                  <AnimatedNumber value={stat.value} inView={inView} />
                </p>
                <p className="text-xs sm:text-sm text-white/50 tracking-wide">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
