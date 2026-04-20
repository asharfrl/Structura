"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import RetroGrid from "@/components/magicui/retro-grid";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import dynamic from "next/dynamic";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedListDemo from "./animatedlist-demo/page";
import { useEffect, useState } from "react";
import { getTotalCompletedTopics } from "@/lib/progress";

const GlobePage = dynamic(() => import('./globe-section/page'), { ssr: false, loading: () => <div className="h-64 w-64 animate-pulse bg-muted rounded-full"></div> });

export default function IndexPage() {
  const [completedTopics, setCompletedTopics] = useState(0);

  useEffect(() => {
    setCompletedTopics(getTotalCompletedTopics());
  }, []);

  const scrollToMateri = () => {
    document.getElementById("materi-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full overflow-hidden">
      <RetroGrid className="absolute inset-0 w-full h-full z-0" />

      {/* Hero content */}
      <section className="relative z-10 flex flex-col items-center gap-6 px-4 pb-8 pt-6 md:py-10 mx-auto mt-20 w-full max-w-5xl">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "group rounded-full border border-gray-200 bg-gray-200 text-sm transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
          )}
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-black hover:duration-300 hover:dark:text-black text-neutral-600">
            <span>🚀 {" "}Media Pembelajaran Inovatif Struktur Data</span>
          </AnimatedShinyText>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-pixel font-bold leading-tight tracking-wider text-accent-foreground text-center"
        >
          Pelajari Struktur Data dengan Mudah dan
          <span className="block underline decoration-gray-400 decoration-4 underline-offset-2 mt-2">
            Menyenangkan 💡
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-[600px] text-base sm:text-lg md:text-xl text-accent-foreground text-center"
        >
          Sumber belajar berbasis web menggunakan video series dan quiz interaktif dengan fitur koreksi kode untuk siswa Kelas X Informatika.
        </motion.p>

        {/* Progress indicator */}
        {completedTopics > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
          >
            <span>✅</span>
            <span>{completedTopics} dari 4 topik selesai</span>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button
            id="hero-mulai-btn"
            onClick={scrollToMateri}
            className={buttonVariants()}
          >
            Mulai Belajar
          </button>
          <Link
            href="https://buku.kemdikbud.go.id"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "outline" })}
          >
            Lihat Modul
          </Link>
        </motion.div>

      </section>

      {/* Globe & AnimatedList cards inside the RetroGrid background */}
      <div className="relative z-10 flex flex-col lg:flex-row justify-center items-center gap-8 px-4 pb-16 pt-8 w-full">
        <GlobePage />
        <AnimatedListDemo />
      </div>

    </div>
  );
}
