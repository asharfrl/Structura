"use client";
// Hydration-safe: all localStorage reads deferred to useEffect

/**
 * app/game-card/page.tsx
 * Topic card grid – 4 topics only (Array, Linked List, Stack, Queue).
 * Each card shows lock/unlock state and triggers the TopicModal.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { MagicCard, MagicContainer } from "@/components/magicui/magic-card";
import TopicModal from "@/components/topic-modal";
import { getProgress, getTopicCompletionCount, type TopicId, type ProgressState, DEFAULT_PROGRESS } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const materi = [
  { id: "array" as TopicId,       title: "Array",       icon: "📦", color: "#6366f1" },
  { id: "linked-list" as TopicId, title: "Linked List", icon: "🔗", color: "#ec4899" },
  { id: "stack" as TopicId,       title: "Stack",        icon: "🥞", color: "#f59e0b" },
  { id: "queue" as TopicId,       title: "Queue",        icon: "🚶", color: "#10b981" },
];

export default function GameCard() {
  const [selectedTopic, setSelectedTopic] = useState<(typeof materi)[0] | null>(null);
  const [progress, setProgress] = useState<ProgressState>(DEFAULT_PROGRESS);
  const [showResetDialog, setShowResetDialog] = useState(false);

  useEffect(() => {
    // Safe to read localStorage only on client
    setProgress(getProgress());
    const sync = () => setProgress(getProgress());
    window.addEventListener("focus", sync);
    return () => window.removeEventListener("focus", sync);
  }, []);

  const handleResetProgress = () => {
    localStorage.removeItem("structura_progress");
    setProgress(DEFAULT_PROGRESS);
    window.location.reload();
  };

  return (
    <>
      <div
        id="materi-section"
        className="mx-auto flex max-w-6xl w-full flex-col items-center space-y-4 text-center mt-32 md:mt-20 px-6 sm:px-8"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-heading text-4xl leading-[1.1] sm:text-5xl md:text-6xl font-bold bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent"
        >
          Materi Pembelajaran
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground max-w-2xl px-4 lg:mb-6 leading-relaxed sm:text-lg sm:leading-7"
        >
          Pilih salah satu dari 4 topik Struktur Data Kelas X di bawah ini. Selesaikan setiap tahap secara berurutan 📚
        </motion.p>

        <MagicContainer
          className="grid h-auto w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 pb-20 justify-items-center"
        >
          {materi.map((item, index) => {
            const count = getTopicCompletionCount(item.id);
            const fullyDone = count === 3;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="w-full"
              >
                <MagicCard
                  id={`topic-card-${item.id}`}
                  onClick={() => setSelectedTopic(item)}
                  className="group relative flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl p-8 sm:p-8 min-h-[200px] shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border bg-background/50 backdrop-blur-sm"
                >
                  {/* Glow overlay on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at 50% 120%, ${item.color}30, transparent 70%)`,
                    }}
                  />

                  {/* Completion badge */}
                  {fullyDone && (
                    <div className="absolute top-3 right-3 rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white shadow-sm">
                      ✅ Done
                    </div>
                  )}

                  {/* Icon */}
                  <span className="z-10 text-5xl sm:text-6xl mb-4 transition-transform duration-300 ease-out group-hover:scale-125 group-hover:rotate-[8deg] drop-shadow-sm">
                    {item.icon}
                  </span>

                  {/* Title */}
                  <p className="z-10 whitespace-nowrap text-xl sm:text-2xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-primary dark:text-gray-200">
                    {item.title}
                  </p>

                  {/* Progress dots */}
                  <div className="z-10 mt-3 flex items-center gap-1.5">
                    {["Materi", "Kuis", "Video"].map((stage, si) => (
                      <div
                        key={si}
                        className={cn(
                          "h-2 w-2 rounded-full transition-all duration-300",
                          si < count
                            ? "scale-110"
                            : "bg-muted-foreground/30"
                        )}
                        style={si < count ? { backgroundColor: item.color } : {}}
                        title={stage}
                      />
                    ))}
                  </div>
                  <p className="z-10 mt-1.5 text-xs text-muted-foreground">
                    {count === 0 ? "Belum dimulai" : count === 3 ? "Selesai!" : `${count}/3 selesai`}
                  </p>
                </MagicCard>
              </motion.div>
            );
          })}
        </MagicContainer>

        {Object.values(progress).some(t => t.materi || t.kuis || t.video) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pb-10"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowResetDialog(true)}
              className={cn(buttonVariants({ variant: "destructive" }), "w-full sm:w-auto font-semibold px-8 shadow-lg shadow-red-500/20")}
            >
              Reset Progress
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Custom Reset Alert Dialog */}
      <AnimatePresence>
        {showResetDialog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResetDialog(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-md rounded-3xl border border-border bg-background p-8 shadow-2xl"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                  <AlertTriangle className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-2xl font-bold tracking-tight">Hapus Progres?</h3>
                <p className="mb-8 text-muted-foreground">
                  Semua data pembelajaran Anda akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    onClick={() => setShowResetDialog(false)}
                    className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto")}
                  >
                    Batal
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleResetProgress}
                    className={cn(buttonVariants({ variant: "destructive" }), "w-full sm:w-auto")}
                  >
                    Ya, Reset Sekarang
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Topic Modal */}
      {selectedTopic && (
        <TopicModal
          topicId={selectedTopic.id}
          topicTitle={selectedTopic.title}
          topicIcon={selectedTopic.icon}
          topicColor={selectedTopic.color}
          isOpen={!!selectedTopic}
          onClose={() => {
            setSelectedTopic(null);
            setProgress(getProgress());
          }}
        />
      )}
    </>
  );
}