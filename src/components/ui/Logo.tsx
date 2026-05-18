"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
  showText?: boolean;
}

export function Logo({ className, variant = "dark", showText = true }: LogoProps) {
  const primaryColor = variant === "light" ? "#ffffff" : "#0d1b2a";
  const accentColor = "#00a896";
  const goldColor = "#f0b429";

  return (
    <Link href="/" className={cn("flex items-center gap-3 group", className)}>
      <div className="relative flex-shrink-0">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          {/* Background shield shape */}
          <path
            d="M20 2L4 9V20C4 29.5 11.2 38.3 20 40C28.8 38.3 36 29.5 36 20V9L20 2Z"
            fill={accentColor}
            opacity="0.15"
          />
          {/* Shield outline */}
          <path
            d="M20 2L4 9V20C4 29.5 11.2 38.3 20 40C28.8 38.3 36 29.5 36 20V9L20 2Z"
            stroke={accentColor}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Cleaning sparkle top */}
          <path
            d="M20 8L21.5 13H26.5L22.5 16L24 21L20 18L16 21L17.5 16L13.5 13H18.5L20 8Z"
            fill={goldColor}
          />
          {/* Water drops */}
          <circle cx="13" cy="26" r="2" fill={accentColor} opacity="0.8" />
          <circle cx="20" cy="29" r="2.5" fill={accentColor} />
          <circle cx="27" cy="26" r="2" fill={accentColor} opacity="0.8" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className="font-display font-800 text-[15px] tracking-tight"
            style={{ color: primaryColor, fontFamily: "DM Sans, sans-serif", fontWeight: 800 }}
          >
            KIFF CLEANING
          </span>
          <span
            className="text-[10px] font-medium tracking-[0.2em] uppercase"
            style={{ color: accentColor }}
          >
            SOLUTIONS
          </span>
        </div>
      )}
    </Link>
  );
}
