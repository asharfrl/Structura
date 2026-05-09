"use client";

/**
 * app/[topic]/materi/page.tsx
 * Learning material page for a given topic.
 * Guard: redirects to '/' if topic is invalid.
 * Marks stage complete on "Tandai Selesai".
 */

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import RetroGrid from "@/components/magicui/retro-grid";
import { setStageComplete, isValidTopic, type TopicId } from "@/lib/progress";
import { stripMarkdown } from "@/lib/utils";

// Topic content map
import { materiArray } from "@/lib/apas-content/array";
import { materiLinkedList } from "@/lib/apas-content/linked-list";
import { materiStack } from "@/lib/apas-content/stack";
import { materiQueue } from "@/lib/apas-content/queue";

const CONTENT_MAP: Record<TopicId, typeof materiArray> = {
  array: materiArray,
  "linked-list": materiLinkedList,
  stack: materiStack,
  queue: materiQueue,
};

export default function MateriPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = params?.topic as string;
  const [done, setDone] = useState(false);
  const [readTime, setReadTime] = useState(0);

  useEffect(() => {
    if (!isValidTopic(topicId)) {
      router.replace("/");
    }
  }, [topicId, router]);

  // Track reading time
  useEffect(() => {
    const timer = setInterval(() => setReadTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isValidTopic(topicId)) return null;

  const content = CONTENT_MAP[topicId as TopicId];

  const handleComplete = () => {
    setStageComplete(topicId as TopicId, "materi");
    setDone(true);
    // Direct navigation to next stage — no detour through dashboard
    setTimeout(() => router.push(`/${topicId}/kuis`), 800);
  };

  return (
    <div className="relative min-h-screen pb-24">
      <RetroGrid className="pointer-events-none fixed inset-0 z-0 opacity-30" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 pt-8 pb-16">
        {/* Back button */}
        <button
          onClick={() => router.push("/")}
          className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Kembali ke Dashboard
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl text-4xl shadow-lg"
            style={{ backgroundColor: `${content.color}20`, border: `2px solid ${content.color}50` }}
          >
            {content.icon}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              📖 Materi
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {content.title}
            </h1>
            <p className="text-sm text-muted-foreground">{content.subtitle}</p>
          </div>
        </motion.div>

        {/* Sections */}
        <div className="flex flex-col gap-8">
          {content.sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-background/80 backdrop-blur-sm p-6 shadow-sm"
            >
              <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-foreground">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-sm font-black text-white"
                  style={{ backgroundColor: content.color }}
                >
                  {i + 1}
                </span>
                {stripMarkdown(section.heading)}
              </h2>

              <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {stripMarkdown(section.content)}
              </div>

              {section.visual && (
                <pre className="mt-4 overflow-x-auto rounded-xl bg-black/5 p-4 font-mono text-xs leading-relaxed text-foreground dark:bg-white/5 border border-border">
                  {section.visual}
                </pre>
              )}
            </motion.div>
          ))}
        </div>

        {/* Complete button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          {done ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-3 rounded-2xl bg-emerald-500 px-8 py-4 text-white shadow-lg"
            >
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold">Materi Selesai!</p>
                <p className="text-sm opacity-80">Kuis kini terbuka. Kembali ke dashboard...</p>
              </div>
            </motion.div>
          ) : (
            <>
              <button
                id="materi-complete-btn"
                onClick={handleComplete}
                className="rounded-2xl px-10 py-4 text-base font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl active:scale-95"
                style={{ backgroundColor: content.color }}
              >
                ✅ Tandai Selesai & Buka Kuis
              </button>
              <p className="text-xs text-muted-foreground">
                Waktu membaca: {Math.floor(readTime / 60)}:{String(readTime % 60).padStart(2, "0")}
              </p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
