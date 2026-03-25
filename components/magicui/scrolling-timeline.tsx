"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const timelineData = [
  {
    id: 1,
    title: "Langkah Pertama",
    description: "Petualanganmu menuju Logika Komputer yang sesungguhnya dimulai dari titik ini. Jangan hanya membaca teori, bersiaplah untuk bertumbuh.",
    icon: "🚀",
  },
  {
    id: 2,
    title: "Peta Konsep",
    description: "Eksplorasi peta konsep algoritma dengan visualisasi interaktif yang ramah pemula. Amati dengan saksama bagaimana perputaran memori komputer bekerja.",
    icon: "🗺️",
  },
  {
    id: 3,
    title: "Uji Strategi (Kuis)",
    description: "Uji strategimu menembus tantangan kuis algoritmik dan dapatkan umpan balik instan. Tidak apa-apa salah arah, karena setiap percobaan adalah pelajaran berharga.",
    icon: "⚔️",
  },
  {
    id: 4,
    title: "Pecahkan Masalah",
    description: "Mari taklukkan kode rumit secara terstruktur, baris demi baris, node demi node. Jadilah arsitek bagi barisan kodemu sendiri.",
    icon: "🏆",
  },
];

export default function ScrollingTimeline() {
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setActiveIndices((prev) => Array.from(new Set([...prev, index])));
          } else {
             // Turn off the active state when scrolling out to trigger animation up and down
             setActiveIndices((prev) => prev.filter((i) => i !== index));
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" } // Triggers strictly when crossing the middle narrow band of screen
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Use the highest seen index to draw the continuous connecting line
  const maxActive = Math.max(-1, ...activeIndices);
  const progressHeight = maxActive >= 0 ? `${((maxActive + 0.5) / timelineData.length) * 100}%` : "0%";

  return (
    <div className="relative w-full max-w-4xl mx-auto py-24 px-4 md:px-8 overflow-hidden">
      {/* Background tracking line */}
      <div className="absolute left-[34px] md:left-1/2 top-0 bottom-0 w-1 bg-border/50 transform md:-translate-x-1/2 rounded-full hidden sm:block">
         {/* Shiny Active Neon Line */}
         <div
            className="absolute top-0 left-0 w-full rounded-full transition-all duration-[800ms] ease-out bg-indigo-500 dark:bg-white shadow-[0_0_15px_rgba(99,102,241,0.8)] dark:shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            style={{ height: progressHeight }}
         />
      </div>

      <div className="flex flex-col gap-24 md:gap-32 relative z-10 w-full mt-10 mb-10">
        {timelineData.map((item, index) => {
          const isActive = activeIndices.includes(index);
          const isPast = maxActive >= index;

          return (
            <div
                key={item.id}
                ref={(el) => { refs.current[index] = el; }}
                data-index={index}
                className={cn(
                    "flex flex-col md:flex-row items-start md:items-center w-full group",
                    index % 2 !== 0 ? "md:flex-row-reverse" : ""
                )}
            >
                {/* Spacer piece for desktop alternating layout */}
                <div className="hidden md:block w-1/2" />
                
                {/* The Timeline Node / Bulb */}
                <div className="absolute left-0 md:relative md:left-auto flex items-center justify-center md:mx-8 hidden sm:flex">
                    <div className={cn(
                        "w-12 h-12 md:w-16 md:h-16 rounded-full border-[3px] md:border-4 flex items-center justify-center text-xl md:text-3xl bg-background transition-all duration-700 z-10",
                         isPast 
                         ? "border-indigo-500 dark:border-white scale-110 shadow-[0_0_20px_rgba(99,102,241,0.5)] dark:shadow-[0_0_20px_rgba(255,255,255,0.4)]" 
                         : "border-border grayscale opacity-40 bg-muted"
                    )}>
                        <span className={isPast ? "opacity-100" : "opacity-0"}>{item.icon}</span>
                    </div>
                </div>

                {/* The Content Card */}
                <div className={cn(
                    "w-full md:w-1/2 sm:pl-20 md:pl-0 flex flex-col p-6 md:p-8 rounded-2xl border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-md",
                    isActive 
                      ? "opacity-100 md:translate-y-0 border-indigo-500/40 dark:border-white/40 shadow-2xl dark:shadow-[0_0_30px_rgba(255,255,255,0.06)] bg-indigo-500/5 dark:bg-white/5 md:scale-100 scale-[1.02]"
                      : isPast
                         ? "opacity-60 md:-translate-y-4 border-border/80 bg-background/80 md:scale-95 scale-100" // Past it upwards
                         : "opacity-40 md:translate-y-12 translate-y-8 border-border/40 bg-background/50 md:scale-95 scale-95" // Hasn't reached it downwards
                )}>
                    <div className="flex items-center gap-3 mb-3">
                        {/* Mobile inline icon */}
                        <span className="sm:hidden text-2xl">{item.icon}</span>
                        <h4 className={cn("text-xl md:text-2xl font-bold transition-colors duration-500", isActive ? "text-indigo-600 dark:text-white" : "text-foreground/70")}>
                            {item.title}
                        </h4>
                    </div>
                    <p className={cn("leading-relaxed text-sm md:text-base font-medium transition-colors", isActive ? "text-foreground/90" : "text-muted-foreground")}>
                        {item.description}
                    </p>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
