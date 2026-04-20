"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const facts = [
  {
    id: "1",
    title: "Browser History & Tombol Back",
    content: "Tahukah kamu? Tombol 'Back' di browsermu menyimpan riwayat halaman persis seperti tumpukan piring (Stack). Halaman yang terakhir dibuka (Last-In) menjadi halaman pertama yang muncul saat klik Back (First-Out).",
    icon: "🌐",
    color: "#00C9A7",
  },
  {
    id: "2",
    title: "Kekuatan Fitur Undo/Redo",
    content: "Setiap kali menekan Ctrl+Z, aplikasi membaca simpul (node) perubahan dari masa lalu. Fitur ini dibuat menggunakan 'Linked List' bersambung yang mencatat rentetan status memori secara brilian.",
    icon: "⏪",
    color: "#FFB800",
  },
  {
    id: "3",
    title: "Sistem Antrean Printer",
    content: "Ketika 10 file dikirim ke printer sekaligus, tugas tersebut diabsen dan diurus menggunakan struktur data Queue (Antrean). Siapa yang diperintah duluan (First-In), dia yang dicetak duluan (First-Out).",
    icon: "🖨️",
    color: "#FF3D71",
  },
  {
    id: "4",
    title: "Memori RAM & Array",
    content: "Tahukah kamu? RAM pada komputermu cara kerjanya mirip seperti Array raksasa! Setiap byte memori memiliki 'indeks' unik yang disebut alamat memori. Saat program membuka foto, ia mengakses jutaan 'indeks' array piksel dalam hitungan milidetik.",
    icon: "💾",
    color: "#1E86FF",
  },
];

export default function FunFactsAccordion() {
  const [openId, setOpenId] = useState<string | null>("1"); // Fakta pertama terbuka secara default

  return (
    <div className="relative flex min-h-[400px] w-full max-w-[32rem] flex-col overflow-hidden rounded-lg border bg-background p-6 shadow-lg">
      <h3 className="mb-6 mt-1 text-xl font-semibold tracking-tight text-foreground/90">
        💡 Implementasi Dunia Nyata
      </h3>
      <div className="flex flex-col gap-2">
        {facts.map((fact) => {
          const isOpen = openId === fact.id;
          return (
            <div
              key={fact.id}
              className={cn(
                "flex flex-col overflow-hidden rounded-xl border transition-all duration-300",
                isOpen
                  ? "bg-white shadow-[0_4px_24px_rgba(0,0,0,.05)] dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(255,255,255,.02)] border-black/10 dark:border-white/10"
                  : "bg-transparent hover:bg-black/5 dark:hover:bg-white/5 border-transparent"
              )}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : fact.id)}
                className="flex items-center justify-between p-3 sm:p-4 text-left w-full cursor-pointer outline-none"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform"
                    style={{ backgroundColor: `${fact.color}20`, color: fact.color }}
                  >
                    <span className="text-lg sm:text-xl">{fact.icon}</span>
                  </div>
                  <span
                    className={cn(
                      "font-medium transition-colors text-sm sm:text-base",
                      isOpen ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {fact.title}
                  </span>
                </div>
                <div
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform duration-300",
                    isOpen ? "rotate-180 bg-foreground/10 text-foreground" : "rotate-0 text-muted-foreground"
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </button>

              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-4 pb-4 pt-0 text-xs sm:text-sm text-muted-foreground/90 leading-relaxed pl-[60px] md:pl-[68px]">
                    {fact.content}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
