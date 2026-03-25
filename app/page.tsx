"use client";
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import RetroGrid from "@/components/magicui/retro-grid"
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import GlobePage from "./globe-section/page"
import AnimatedListDemo from "./animatedlist-demo/page"

export default function IndexPage() {
  return (
    <div className="relative w-full overflow-hidden">
      <RetroGrid className="absolute inset-0 w-full h-full z-0" />

      {/* Hero content */}
      <section className="relative z-10 flex flex-col items-center gap-6 px-4 pb-8 pt-6 md:py-10 mx-auto mt-20 w-full max-w-5xl">

        <div
          className={cn(
            "group rounded-full border border-gray-200 bg-gray-200 text-sm transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
          )}
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-black hover:duration-300 hover:dark:text-black text-neutral-600">
            <span>🚀 {" "}Media Pembelajaran Inovatif</span>
            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-pixel font-bold leading-tight tracking-wider text-accent-foreground text-center">
          Pelajari Struktur Data dengan Mudah dan
          <span className="block underline decoration-gray-400 decoration-4 underline-offset-2 mt-2">
            Menyenangkan 💡
          </span>
        </h1>

        <p className="max-w-[600px] text-base sm:text-lg md:text-xl text-accent-foreground text-center">
          Sumber belajar berbasis web menggunakan video series dan quiz interaktif dengan fitur koreksi kode untuk siswa Kelas X Informatika.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            // href={siteConfig.links.docs}
            href="/"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants()}
          >
            Mulai Belajar
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            // href={siteConfig.links.github}
            href="/"
            className={buttonVariants({ variant: "outline" })}
          >
            Lihat Modul
          </Link>
        </div>

      </section>

      {/* Globe & AnimatedList cards inside the RetroGrid background */}
      <div className="relative z-10 flex flex-col lg:flex-row justify-center items-center gap-8 px-4 pb-16 pt-8 w-full">
        <GlobePage />
        <AnimatedListDemo />
      </div>

    </div>
  )
}
