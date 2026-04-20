"use client";

/**
 * app/[topic]/kuis/page.tsx
 * APAS Quiz page – Part 1 (conceptual) + Part 2 (coding challenge).
 * Guard: redirects to '/' if topic invalid or materi not completed.
 */

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import RetroGrid from "@/components/magicui/retro-grid";
import QuizConceptual from "@/components/apas/quiz-conceptual";

// Dynamically import the coding challenge to defer Monaco Editor loading
const QuizCoding = dynamic(() => import("@/components/apas/quiz-coding"), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 w-full items-center justify-center rounded-xl bg-muted/50 border border-border animate-pulse">
      <p className="text-muted-foreground font-medium">Memuat Editor C++...</p>
    </div>
  ),
});
import {
  isStageUnlocked,
  setStageComplete,
  isValidTopic,
  type TopicId,
} from "@/lib/progress";

// Quiz content map
import { quizArray, codingChallengeArray } from "@/lib/apas-content/array";
import { quizLinkedList, codingChallengeLinkedList } from "@/lib/apas-content/linked-list";
import { quizStack, codingChallengeStack } from "@/lib/apas-content/stack";
import { quizQueue, codingChallengeQueue } from "@/lib/apas-content/queue";

const QUIZ_MAP = {
  array: { questions: quizArray, challenge: codingChallengeArray },
  "linked-list": { questions: quizLinkedList, challenge: codingChallengeLinkedList },
  stack: { questions: quizStack, challenge: codingChallengeStack },
  queue: { questions: quizQueue, challenge: codingChallengeQueue },
};

const TOPIC_META: Record<TopicId, { title: string; icon: string; color: string }> = {
  array: { title: "Array", icon: "📦", color: "#6366f1" },
  "linked-list": { title: "Linked List", icon: "🔗", color: "#ec4899" },
  stack: { title: "Stack", icon: "🥞", color: "#f59e0b" },
  queue: { title: "Queue", icon: "🚶", color: "#10b981" },
};

type ActiveTab = "part1" | "part2";

export default function KuisPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = params?.topic as string;
  const [activeTab, setActiveTab] = useState<ActiveTab>("part1");
  const [part1Done, setPart1Done] = useState(false);
  const [part2Done, setPart2Done] = useState(false);
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    if (!isValidTopic(topicId) || !isStageUnlocked(topicId as TopicId, "kuis")) {
      router.replace("/");
    }
  }, [topicId, router]);

  if (!isValidTopic(topicId)) return null;

  const meta = TOPIC_META[topicId as TopicId];
  const { questions, challenge } = QUIZ_MAP[topicId as TopicId];

  const handlePart1Complete = (score: number) => {
    setPart1Done(true);
  };

  const handlePart2Complete = () => {
    setPart2Done(true);
  };

  // When both done → mark kuis complete
  useEffect(() => {
    if (part1Done && part2Done && !allDone) {
      setAllDone(true);
      setStageComplete(topicId as TopicId, "kuis");
    }
  }, [part1Done, part2Done, allDone, topicId]);

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
          className="flex items-center gap-4 mb-6"
        >
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl text-4xl shadow-lg"
            style={{ backgroundColor: `${meta.color}20`, border: `2px solid ${meta.color}50` }}
          >
            {meta.icon}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              ⚔️ Kuis APAS
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{meta.title}</h1>
            <p className="text-sm text-muted-foreground">
              Dua bagian: Konseptual & Kode C++
            </p>
          </div>
        </motion.div>

        {/* Tab navigation */}
        <div className="mb-6 flex rounded-xl border border-border bg-muted/50 p-1 gap-1">
          {[
            { id: "part1" as ActiveTab, label: "📝 Part 1 – Konseptual", done: part1Done },
            { id: "part2" as ActiveTab, label: "💻 Part 2 – Kode C++", done: part2Done },
          ].map((tab) => (
            <button
              key={tab.id}
              id={`kuis-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              {tab.done && " ✅"}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === "part1" ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl border border-border bg-background/80 backdrop-blur-sm p-6 shadow-sm"
        >
          {activeTab === "part1" && (
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-indigo-100 px-3 py-1.5 text-sm font-bold text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                  Part 1 / 2
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Quiz Konseptual</p>
                  <p className="text-xs text-muted-foreground">
                    {questions.length} soal pilihan ganda — jawab berdasarkan teori buku
                  </p>
                </div>
              </div>
              {part1Done ? (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <div className="text-5xl">✅</div>
                  <p className="font-semibold text-foreground">Part 1 Selesai!</p>
                  <button
                    onClick={() => setActiveTab("part2")}
                    className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
                  >
                    Lanjut ke Part 2 →
                  </button>
                </div>
              ) : (
                <QuizConceptual questions={questions} onComplete={handlePart1Complete} />
              )}
            </div>
          )}

          {activeTab === "part2" && (
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-purple-100 px-3 py-1.5 text-sm font-bold text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                  Part 2 / 2
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Kode Interaktif C++</p>
                  <p className="text-xs text-muted-foreground">
                    Tulis dan jalankan kode — ada auto-grader & error highlight
                  </p>
                </div>
              </div>
              {part2Done ? (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <div className="text-5xl">🏆</div>
                  <p className="font-semibold text-foreground">Part 2 Selesai!</p>
                  <p className="text-sm text-muted-foreground">Kamu telah menyelesaikan kode dengan benar.</p>
                </div>
              ) : (
                !part1Done ? (
                  <div className="flex flex-col items-center gap-4 py-8 text-center text-muted-foreground">
                    <div className="text-4xl">🔒</div>
                    <p className="font-medium">Selesaikan Part 1 terlebih dahulu</p>
                    <button
                      onClick={() => setActiveTab("part1")}
                      className="rounded-xl border border-border px-5 py-2 text-sm hover:bg-muted transition-colors"
                    >
                      ← Ke Part 1
                    </button>
                  </div>
                ) : (
                  <QuizCoding challenge={challenge} onComplete={handlePart2Complete} />
                )
              )}
            </div>
          )}
        </motion.div>

        {/* All complete banner */}
        <AnimatePresence>
          {allDone && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mt-6 flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-center text-white shadow-xl"
            >
              <div className="text-4xl">🎉</div>
              <div>
                <p className="text-xl font-bold">Kuis Selesai!</p>
                <p className="text-sm opacity-90 mt-1">
                  Kamu telah menyelesaikan dua bagian kuis. Video pembelajaran kini terbuka!
                </p>
              </div>
              <button
                id="kuis-go-video-btn"
                onClick={() => router.push(`/${topicId}/video`)}
                className="rounded-xl bg-white/20 hover:bg-white/30 px-8 py-3 font-bold transition-colors backdrop-blur-sm"
              >
                🎥 Tonton Video →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
