"use client";

/**
 * components/topic-modal.tsx
 * Navigation modal showing the 3-stage learning flow for a topic:
 * [Materi → Kuis → Video] with lock state enforcement.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn, stripMarkdown } from "@/lib/utils";
import {
  getProgress,
  isStageUnlocked,
  getTopicCompletionCount,
  DEFAULT_PROGRESS,
  type TopicId,
} from "@/lib/progress";

interface TopicModalProps {
  topicId: TopicId;
  topicTitle: string;
  topicIcon: string;
  topicColor: string;
  isOpen: boolean;
  onClose: () => void;
}

const STAGES = [
  {
    id: "materi" as const,
    label: "Baca Materi",
    icon: "📖",
    description: "Pelajari konsep dan teori dasar",
    unlockNote: null,
  },
  {
    id: "kuis" as const,
    label: "Kerjakan Kuis",
    icon: "⚔️",
    description: "Uji pemahaman konseptual & kode C++",
    unlockNote: "Selesaikan Materi terlebih dahulu",
  },
  {
    id: "video" as const,
    label: "Tonton Video",
    icon: "🎥",
    description: "Perkuat pemahaman dengan video series",
    unlockNote: "Selesaikan Kuis terlebih dahulu",
  },
];

export default function TopicModal({
  topicId,
  topicTitle,
  topicIcon,
  topicColor,
  isOpen,
  onClose,
}: TopicModalProps) {
  const router = useRouter();
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);

  useEffect(() => {
    if (isOpen) {
      setProgress(getProgress());
    }
  }, [isOpen]);

  const completionCount = getTopicCompletionCount(topicId);

  const handleNavigate = (stage: "materi" | "kuis" | "video") => {
    if (!isStageUnlocked(topicId, stage)) return;
    onClose();
    router.push(`/${topicId}/${stage}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-end sm:justify-center overflow-hidden">
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="relative z-10 w-full max-w-lg sm:max-w-3xl transform-gpu will-change-transform"
          >
            <div className="relative flex flex-col gap-5 rounded-t-3xl sm:rounded-3xl border border-border bg-background/95 backdrop-blur-xl p-6 shadow-2xl w-full">
              {/* Close button */}
              <button
                onClick={onClose}
                id="topic-modal-close"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
              >
                ✕
              </button>

              {/* Header */}
              <div className="flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl shadow-inner"
                  style={{ backgroundColor: `${topicColor}20`, border: `2px solid ${topicColor}40` }}
                >
                  {topicIcon}
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Materi Topik
                  </p>
                  <h3 className="text-xl font-bold text-foreground">{topicTitle}</h3>
                </div>
              </div>

              {/* Progress bar */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Progress</span>
                  <span className="text-xs font-semibold" style={{ color: topicColor }}>
                    {completionCount}/3 tahap
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-none"
                    style={{ 
                      backgroundColor: topicColor,
                      width: `${(completionCount / 3) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Stage buttons */}
              <div className="flex flex-col gap-3">
                {STAGES.map((stage, i) => {
                  const unlocked = isStageUnlocked(topicId, stage.id);
                  const completed = progress[topicId][stage.id];

                  return (
                    <motion.button
                      key={stage.id}
                      id={`modal-stage-${stage.id}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      onClick={() => handleNavigate(stage.id)}
                      disabled={!unlocked}
                      className={cn(
                        "group flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200",
                        unlocked && !completed &&
                          "border-border hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 cursor-pointer hover:-translate-y-0.5 hover:shadow-md",
                        unlocked && completed &&
                          "border-emerald-400/60 bg-emerald-50/40 dark:bg-emerald-950/20 cursor-pointer",
                        !unlocked &&
                          "cursor-not-allowed opacity-50 grayscale border-border bg-muted/30"
                      )}
                    >
                      {/* Step icon */}
                      <div className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-2xl transition-transform duration-200",
                        unlocked && "group-hover:scale-110",
                        completed ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-muted"
                      )}>
                        {completed ? "✅" : unlocked ? stage.icon : "🔒"}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "font-semibold text-sm",
                          completed ? "text-emerald-700 dark:text-emerald-400" :
                          unlocked ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {stripMarkdown(stage.label)}
                          {completed && " — Selesai"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">
                          {!unlocked && stage.unlockNote
                            ? `🔒 ${stripMarkdown(stage.unlockNote)}`
                            : stripMarkdown(stage.description)}
                        </p>
                      </div>

                      {/* Arrow */}
                      {unlocked && (
                        <svg
                          className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-indigo-500 transition-colors"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
