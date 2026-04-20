"use client";

/**
 * components/apas/quiz-conceptual.tsx
 * Part 1 of APAS: Multiple-choice conceptual quiz with instant feedback.
 * Merujuk terminologi Buku Informatika Kelas X.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizConceptualProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export default function QuizConceptual({ questions, onComplete }: QuizConceptualProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const handleSelect = (optIdx: number) => {
    if (isRevealed) return;
    setSelectedIndex(optIdx);
    setIsRevealed(true);
    if (optIdx === current.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (isLast) {
      const finalScore = selectedIndex === current.correctIndex ? score : score;
      setFinished(true);
      onComplete(score);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setIsRevealed(false);
    }
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-6 py-8 text-center"
      >
        <div className="text-6xl">{pct >= 80 ? "🎉" : pct >= 60 ? "👍" : "😅"}</div>
        <div>
          <p className="text-2xl font-bold text-foreground">
            Skor Kuis Konseptual
          </p>
          <p className="mt-2 text-5xl font-black text-indigo-600 dark:text-indigo-400">
            {score}/{questions.length}
          </p>
          <p className="mt-1 text-muted-foreground">{pct}% Benar</p>
        </div>
        <div className={cn(
          "rounded-xl px-6 py-3 text-sm font-medium",
          pct >= 80
            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
            : pct >= 60
            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
        )}>
          {pct >= 80
            ? "Luar biasa! Kamu memahami konsep dengan sangat baik."
            : pct >= 60
            ? "Cukup baik! Pelajari kembali soal yang belum tepat."
            : "Ayo semangat! Baca kembali materi dan coba lagi."}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Progress */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-muted-foreground">
          Soal {currentIndex + 1} dari {questions.length}
        </span>
        <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
          Skor: {score}
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-indigo-500"
          animate={{ width: `${((currentIndex) / questions.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-4"
        >
          <p className="text-base font-semibold leading-relaxed text-foreground">
            {current.question}
          </p>

          {/* Options */}
          <div className="flex flex-col gap-2">
            {current.options.map((opt, idx) => {
              const isCorrect = idx === current.correctIndex;
              const isSelected = idx === selectedIndex;
              let variant = "neutral";
              if (isRevealed) {
                if (isCorrect) variant = "correct";
                else if (isSelected) variant = "wrong";
              }
              return (
                <button
                  key={idx}
                  id={`quiz-option-${idx}`}
                  onClick={() => handleSelect(idx)}
                  disabled={isRevealed}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200",
                    !isRevealed &&
                      "hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 cursor-pointer",
                    isRevealed && "cursor-default",
                    variant === "correct" &&
                      "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300",
                    variant === "wrong" &&
                      "border-red-500 bg-red-50 text-red-900 dark:bg-red-950/30 dark:text-red-300",
                    variant === "neutral" &&
                      "border-border bg-background/50 text-foreground",
                    isSelected && !isRevealed && "border-indigo-500 bg-indigo-50"
                  )}
                >
                  <span className="mt-0.5 shrink-0 font-bold text-xs opacity-60">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <span>{opt}</span>
                  {isRevealed && isCorrect && (
                    <span className="ml-auto shrink-0 text-lg">✅</span>
                  )}
                  {isRevealed && isSelected && !isCorrect && (
                    <span className="ml-auto shrink-0 text-lg">❌</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-xl border border-indigo-200 bg-indigo-50/80 px-4 py-3 text-sm text-indigo-900 dark:border-indigo-800 dark:bg-indigo-950/30 dark:text-indigo-200"
              >
                <span className="font-semibold">💡 Penjelasan: </span>
                {current.explanation}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Button */}
          {isRevealed && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              id="quiz-next-btn"
              onClick={handleNext}
              className="self-end rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
            >
              {isLast ? "Lihat Skor →" : "Soal Berikutnya →"}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
