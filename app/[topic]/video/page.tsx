"use client";

/**
 * app/[topic]/video/page.tsx
 * Video learning page for a given topic.
 * Guard: redirects to '/' if kuis not completed.
 */

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import RetroGrid from "@/components/magicui/retro-grid";
import {
  isStageUnlocked,
  setStageComplete,
  isValidTopic,
  getProgress,
  type TopicId,
} from "@/lib/progress";

// YouTube video IDs for each topic (curated educational content)
const VIDEO_MAP: Record<TopicId, { videoId: string; title: string; channel: string }> = {
  array: {
    videoId: "55l-aZ7_name",
    title: "Array dan Larik dalam C++ – Pemula",
    channel: "Programmer Zaman Now",
  },
  "linked-list": {
    videoId: "WwfhLC16bis",
    title: "Linked List C++ – Struktur Data",
    channel: "Kelas Terbuka",
  },
  stack: {
    videoId: "I5lq6sCuABE",
    title: "Stack (Tumpukan) – Struktur Data C++",
    channel: "Kelas Terbuka",
  },
  queue: {
    videoId: "XuCbpw6Bj1U",
    title: "Queue (Antrian) – Struktur Data C++",
    channel: "Kelas Terbuka",
  },
};

const TOPIC_META: Record<TopicId, { title: string; icon: string; color: string }> = {
  array: { title: "Array", icon: "📦", color: "#6366f1" },
  "linked-list": { title: "Linked List", icon: "🔗", color: "#ec4899" },
  stack: { title: "Stack", icon: "🥞", color: "#f59e0b" },
  queue: { title: "Queue", icon: "🚶", color: "#10b981" },
};

export default function VideoPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = params?.topic as string;
  const [done, setDone] = useState(false);
  const [alreadyComplete, setAlreadyComplete] = useState(false);

  useEffect(() => {
    if (!isValidTopic(topicId) || !isStageUnlocked(topicId as TopicId, "video")) {
      router.replace("/");
      return;
    }
    const progress = getProgress();
    if (progress[topicId as TopicId].video) {
      setAlreadyComplete(true);
    }
  }, [topicId, router]);

  if (!isValidTopic(topicId)) return null;

  const meta = TOPIC_META[topicId as TopicId];
  const video = VIDEO_MAP[topicId as TopicId];

  const handleComplete = () => {
    setStageComplete(topicId as TopicId, "video");
    setDone(true);
    setTimeout(() => router.push("/"), 2000);
  };

  return (
    <div className="relative min-h-screen pb-24">
      <RetroGrid className="pointer-events-none fixed inset-0 z-0 opacity-30" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 pt-8 pb-16">
        {/* Back */}
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
            style={{ backgroundColor: `${meta.color}20`, border: `2px solid ${meta.color}50` }}
          >
            {meta.icon}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              🎥 Video Pembelajaran
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{meta.title}</h1>
            <p className="text-sm text-muted-foreground">Perkuat pemahaman dengan video</p>
          </div>
        </motion.div>

        {/* Video embed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl border border-border shadow-2xl bg-black aspect-video"
        >
          <iframe
            src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`}
            title={video.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>

        {/* Video info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 rounded-xl border border-border bg-background/80 backdrop-blur-sm p-4"
        >
          <p className="font-semibold text-foreground">{video.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            🎬 {video.channel} • Materi: {meta.title}
          </p>
        </motion.div>

        {/* Tips box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-300"
        >
          <p className="font-semibold mb-1">💡 Tips Menonton:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Catat poin-poin penting sambil menonton</li>
            <li>Pause dan ulangi bagian yang kurang dipahami</li>
            <li>Hubungkan materi video dengan konten yang sudah kamu baca</li>
          </ul>
        </motion.div>

        {/* Complete button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <AnimatePresence mode="wait">
            {done || alreadyComplete ? (
              <motion.div
                key="done"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 px-10 py-6 text-center text-white shadow-xl"
              >
                <div className="text-5xl">🏆</div>
                <div>
                  <p className="text-xl font-bold">
                    {alreadyComplete ? "Topik Sudah Selesai!" : "Topik Selesai!"}
                  </p>
                  <p className="text-sm opacity-80 mt-1">
                    {alreadyComplete
                      ? "Kamu telah menyelesaikan semua tahap topik ini."
                      : "Luar biasa! Semua tahap selesai. Kembali ke dashboard..."}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="btn"
                id="video-complete-btn"
                onClick={handleComplete}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-2xl px-10 py-4 text-base font-bold text-white shadow-xl transition-all"
                style={{ backgroundColor: meta.color }}
              >
                ✅ Selesai Menonton — Tandai Topik Selesai
              </motion.button>
            )}
          </AnimatePresence>
          {!done && !alreadyComplete && (
            <p className="text-xs text-muted-foreground">
              Klik tombol di atas setelah selesai menonton video
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
