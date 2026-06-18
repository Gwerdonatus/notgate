"use client";

import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export function Logo({ variant = "dark", size = "md" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-dark";
  const subColor = variant === "light" ? "text-white/60" : "text-text/50";

  return (
    <Link href="/" className="flex items-center gap-2">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="6" fill="#F47C20"/>
        <path d="M10 26V10h3l6 9V10h3v16h-3l-6-9v9h-3z" fill="white"/>
      </svg>
      <div className="flex flex-col leading-none">
        <span className={`font-bold tracking-tight ${textColor} text-lg`}>NOTGATE</span>
        <span className={`text-[0.55rem] tracking-[0.15em] uppercase ${subColor}`}>Real Estate</span>
      </div>
    </Link>
  );
}
