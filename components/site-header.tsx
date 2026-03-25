"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";



export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/60 shadow-sm"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="text-foreground">{siteConfig.name.toUpperCase()}</span>
        </Link>

        {/* Right Side: Theme Toggle */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
