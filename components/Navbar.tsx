"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/data/site-data";

// ── Premium easing curves ──────────────────────────────────────────────────
const EASE_OUT_EXPO   = [0.16, 1, 0.3, 1]    as const;
const EASE_IN_OUT     = [0.76, 0, 0.24, 1]    as const;

// ── Shared logo image (both light and dark contexts) ──────────────────────
function LogoImage({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/images/notgate.png"           // ← swap filename if different
      alt="NOTGATE"
      width={160}
      height={40}
      priority
      className={`h-10 w-auto object-contain ${className}`}
    />
  );
}

// ── Hamburger / close icon that morphs smoothly ───────────────────────────
function MenuToggle({
  isOpen,
  onClick,
  scrolled,
}: {
  isOpen: boolean;
  onClick: () => void;
  scrolled: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.15 }}
      className={`relative flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-medium
        transition-colors duration-300 overflow-hidden select-none
        ${scrolled
          ? "bg-burgundy-dark text-warm hover:bg-burgundy-dark/90"
          : "bg-burgundy-dark text-warm hover:bg-burgundy-dark/85"
        }`}
    >
      {/* Icon morphs between bars and X */}
      <span className="relative w-4 h-4 flex-shrink-0">
        {/* Top bar → top arm of X */}
        <motion.span
          animate={isOpen
            ? { rotate: 45, y: 6, width: "100%" }
            : { rotate: 0,  y: 0, width: "100%" }
          }
          transition={{ duration: 0.45, ease: EASE_IN_OUT }}
          className="absolute top-[3px] left-0 h-[1.5px] bg-current rounded-full block"
          style={{ transformOrigin: "center" }}
        />
        {/* Middle bar — fades out */}
        <motion.span
          animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.25, ease: EASE_IN_OUT }}
          className="absolute top-[7px] left-0 h-[1.5px] w-full bg-current rounded-full block"
          style={{ transformOrigin: "center" }}
        />
        {/* Bottom bar → bottom arm of X */}
        <motion.span
          animate={isOpen
            ? { rotate: -45, y: -6, width: "100%" }
            : { rotate: 0,   y:  0, width: "100%" }
          }
          transition={{ duration: 0.45, ease: EASE_IN_OUT }}
          className="absolute top-[11px] left-0 h-[1.5px] bg-current rounded-full block"
          style={{ transformOrigin: "center" }}
        />
      </span>

      {/* Label swaps with crossfade */}
      <span className="relative hidden sm:block w-10 text-left overflow-hidden h-[1.1em]">
        <AnimatePresence mode="popLayout" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%",   opacity: 1 }}
              exit={{    y: "-110%",opacity: 0 }}
              transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
              className="absolute inset-0"
            >
              Close
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%",   opacity: 1 }}
              exit={{    y: "-110%",opacity: 0 }}
              transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
              className="absolute inset-0"
            >
              Menu
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}

// ── Full-screen menu overlay ───────────────────────────────────────────────
const socials = [
  { label: "X",  href: "#" },
  { label: "in", href: "#" },
  { label: "IG", href: "#" },
  { label: "YT", href: "#" },
];

function MenuOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={onClose}
            className="fixed inset-0 z-[59] bg-black/30 backdrop-blur-sm"
          />

          {/* Panel — slides down from top */}
          <motion.div
            key="panel"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: "0%",    opacity: 1 }}
            exit={{    y: "-100%", opacity: 0 }}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-[60] bg-burgundy-darker overflow-hidden"
          >
            {/* Subtle grain on overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none select-none">
              <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <filter id="nav-grain">
                  <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/>
                </filter>
                <rect width="100%" height="100%" filter="url(#nav-grain)" />
              </svg>
            </div>

            {/* Ambient glow */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: "10%", right: "10%", width: 500, height: 500,
                background: "radial-gradient(circle, rgba(194,82,28,0.08) 0%, transparent 70%)",
                borderRadius: "50%", filter: "blur(60px)",
              }}
            />

            <div className="relative z-10 h-full flex flex-col px-6 sm:px-10 lg:px-16 py-6 sm:py-8">

              {/* Top row */}
              <div className="flex items-center justify-between">
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, delay: 0.15, ease: EASE_OUT_EXPO }}
                >
                  {/* Invert logo for dark background */}
                  <Image
                    src="/images/notgate.png"
                    alt="NOTGATE"
                    width={160}
                    height={40}
                    className="h-10 w-auto object-contain brightness-0 invert"
                  />
                </motion.div>

                <motion.button
                  onClick={onClose}
                  initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0,   scale: 1   }}
                  transition={{ duration: 0.45, delay: 0.2, ease: EASE_OUT_EXPO }}
                  whileTap={{ scale: 0.88 }}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-warm/20 text-warm/70 hover:text-warm hover:border-warm/50 transition-colors duration-300"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 flex flex-col justify-center gap-0">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -32, filter: "blur(6px)" }}
                    animate={{ opacity: 1, x: 0,   filter: "blur(0px)" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.22 + i * 0.07,
                      ease: EASE_OUT_EXPO,
                    }}
                    className="overflow-hidden border-b border-warm/8 last:border-b-0"
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="group flex items-center justify-between py-4 sm:py-5"
                    >
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-light text-warm/85 group-hover:text-orange transition-colors duration-300">
                        {link.label}
                      </span>
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="text-orange/60 text-sm font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom row — socials */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0  }}
                transition={{ duration: 0.55, delay: 0.55, ease: EASE_OUT_EXPO }}
                className="flex items-center gap-3"
              >
                {socials.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1   }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.06, ease: EASE_OUT_EXPO }}
                    whileHover={{ scale: 1.1, borderColor: "rgba(194,82,28,0.6)" }}
                    whileTap={{ scale: 0.92 }}
                    className="w-10 h-10 rounded-full border border-warm/18 flex items-center justify-center text-warm/50 hover:text-warm transition-colors duration-300 text-xs font-medium"
                  >
                    {s.label}
                  </motion.a>
                ))}

                <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-warm/22">
                  NOTGATE © 2024
                </span>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Main Navbar ────────────────────────────────────────────────────────────
export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT_EXPO }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 sm:pt-5"
      >
        <motion.nav
          animate={{
            maxWidth: scrolled ? "56rem" : "72rem",
          }}
          transition={{ duration: 0.55, ease: EASE_IN_OUT }}
          className={`mx-auto flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500
            ${scrolled
              ? "bg-white/96 backdrop-blur-2xl shadow-[0_4px_32px_rgba(0,0,0,0.12)]"
              : "bg-white/82 backdrop-blur-md  shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
            }`}
        >
          {/* Logo — no text, just the image */}
          <Link href="/" aria-label="NOTGATE home" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              <Image
                src="/images/notgate.png"
                alt="NOTGATE"
                width={160}
                height={40}
                priority
                className="h-10 w-auto object-contain"
              />
            </motion.div>
          </Link>

          {/* Menu toggle */}
          <MenuToggle
            isOpen={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            scrolled={scrolled}
          />
        </motion.nav>
      </motion.header>

      {/* Full-screen overlay */}
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}