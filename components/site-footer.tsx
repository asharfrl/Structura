"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { resetProgress } from "@/lib/progress";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const [resetting, setResetting] = useState(false);

  const handleReset = () => {
    if (!confirm("Reset semua progress belajar? Semua tahap akan terkunci kembali.")) return;
    setResetting(true);
    resetProgress();
    // Brief delay so user sees the state change before reload
    setTimeout(() => window.location.reload(), 300);
  };

  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-3 py-4 md:h-20 md:flex-row md:py-0">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Dikembangkan oleh{" "}
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Kelompok 8 PSBI 2026 PTI UM.
          </a>
        </p>

      </div>
    </footer>
  );
}