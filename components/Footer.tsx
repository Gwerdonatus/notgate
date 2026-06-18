"use client";

import Link from "next/link";
import Image from "next/image";
import { footerLinks } from "@/data/site-data";
import { AnimatedSection } from "./ui/AnimatedSection";

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="section-padding py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
              <div>
                {/* Logo — inverted to white for dark background */}
                <Link href="/" aria-label="NOTGATE home">
                  <Image
                    src="/images/notgate.png"
                    alt="NOTGATE"
                    width={120}
                    height={36}
                    className="h-8 w-auto object-contain brightness-0 invert"
                  />
                </Link>

                <div className="mt-6 flex gap-3">
                  {["X", "in", "IG", "YT"].map((social) => (
                    <span
                      key={social}
                      className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-orange hover:border-orange/40 transition-all text-xs cursor-pointer"
                    >
                      {social}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-[0.5rem] text-white/40 text-center leading-tight">
                    ISO<br />9001
                  </div>
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-[0.5rem] text-white/40 text-center leading-tight">
                    ISO<br />45001
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold tracking-wide uppercase text-white/40 mb-5">Navigation</h4>
                <ul className="space-y-2.5">
                  {footerLinks.company.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-white/60 hover:text-orange transition-colors duration-300">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold tracking-wide uppercase text-white/40 mb-5">Projects</h4>
                <ul className="space-y-2.5">
                  {footerLinks.projects.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-white/60 hover:text-orange transition-colors duration-300">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold tracking-wide uppercase text-white/40 mb-5">Info</h4>
                <ul className="space-y-2.5">
                  {footerLinks.info.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-white/60 hover:text-orange transition-colors duration-300">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>

          <div className="border-t border-white/10 pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-white/30">&copy; 2026 NOTGATE. All rights reserved.</p>
              <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
                {["Engineering", "Rivers State", "Oyo", "Ghana", "Kaduna", "Architectural", "Abuja", "Senegal", "Lagos", "Port Harcourt", "Accra", "Steel", "Ogun"].map((tag) => (
                  <span key={tag} className="text-xs text-white/20 hover:text-white/40 transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}