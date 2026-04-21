"use client";

/**
 * components/apas/quiz-coding.tsx
 * Part 2 of APAS: Interactive Monaco code editor with C++ simulation grader.
 * Provides error highlighting, retry, and educational solution reveal.
 */

import { useRef, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { cn, stripMarkdown } from "@/lib/utils";
import type { CodingChallenge } from "@/lib/apas-content/cpp-simulator";
import { simulateCpp } from "@/lib/apas-content/cpp-simulator";

interface QuizCodingProps {
  challenge: CodingChallenge;
  onComplete: () => void;
}

type RunState = "idle" | "running" | "success" | "error";

export default function QuizCoding({ challenge, onComplete }: QuizCodingProps) {
  const { resolvedTheme } = useTheme();
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const [code, setCode] = useState(challenge.starterCode);
  const [runState, setRunState] = useState<RunState>("idle");
  const [output, setOutput] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [completed, setCompleted] = useState(false);

  const monaco = useMonaco();

  function handleEditorDidMount(editor: any, monacoInstance: any) {
    editorRef.current = editor;
    monacoRef.current = monacoInstance;
  }

  /** Clear any previous error decorations */
  function clearDecorations() {
    if (editorRef.current) {
      editorRef.current.deltaDecorations([], []);
    }
  }

  /** Highlight an error on a specific line */
  function highlightErrorLine(lineNumber: number) {
    if (!editorRef.current || !monacoRef.current) return;
    editorRef.current.deltaDecorations(
      [],
      [
        {
          range: new monacoRef.current.Range(lineNumber, 1, lineNumber, 999),
          options: {
            className: "apas-error-line",
            glyphMarginClassName: "apas-error-glyph",
            isWholeLine: true,
            overviewRuler: {
              color: "#ef4444",
              position: monacoRef.current.editor.OverviewRulerLane.Full,
            },
          },
        },
      ]
    );
    editorRef.current.revealLineInCenter(lineNumber);
  }

  async function handleRun() {
    clearDecorations();
    setRunState("running");
    setOutput("");
    setErrorMsg(null);

    // Simulate async "compilation"
    await new Promise((r) => setTimeout(r, 800));

    const result = simulateCpp(code, challenge);

    if (result.success) {
      setRunState("success");
      setOutput(result.output);
      setCompleted(true);
      onComplete();
    } else {
      setRunState("error");
      setOutput(result.output);
      setErrorMsg(result.errorMessage);
      if (result.errorLine) {
        highlightErrorLine(result.errorLine);
      }
    }
  }

  function handleRetry() {
    clearDecorations();
    setRunState("idle");
    setOutput("");
    setErrorMsg(null);
    setCode(challenge.starterCode);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Challenge description */}
      <div className="rounded-xl border border-border bg-muted/30 px-5 py-4">
        <h4 className="font-semibold text-base text-foreground mb-2">
          🧩 {stripMarkdown(challenge.title)}
        </h4>
        <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
          {stripMarkdown(challenge.description)}
        </div>
      </div>

      {/* Editor */}
      <div className="relative overflow-hidden rounded-xl border border-border shadow-lg">
        {/* Editor header */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e1e] border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-gray-400 font-mono">main.cpp — C++</span>
          <div />
        </div>
        <Editor
          height="340px"
          defaultLanguage="cpp"
          value={code}
          theme="vs-dark"
          onChange={(val) => setCode(val ?? "")}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            lineNumbers: "on",
            glyphMargin: true,
            folding: false,
            wordWrap: "on",
          }}
        />
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 items-center">
        <button
          id="apas-run-btn"
          onClick={handleRun}
          disabled={runState === "running" || completed}
          className={cn(
            "flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow transition-all",
            completed
              ? "bg-emerald-600 cursor-default"
              : runState === "running"
              ? "bg-indigo-400 cursor-wait"
              : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
          )}
        >
          {runState === "running" ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Menjalankan...
            </>
          ) : completed ? (
            "✅ Lulus!"
          ) : (
            "▶ Run"
          )}
        </button>

        {(runState === "error" || completed) && (
          <button
            id="apas-retry-btn"
            onClick={handleRetry}
            className="flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-all active:scale-95"
          >
            🔄 Coba Lagi
          </button>
        )}

        <button
          id="apas-reveal-btn"
          onClick={() => setShowSolution((s) => !s)}
          className="w-full sm:w-auto sm:ml-auto mt-2 sm:mt-0 flex items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-5 py-2.5 text-sm font-semibold text-amber-800 hover:bg-amber-100 transition-all dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-300 active:scale-95"
        >
          💡 {showSolution ? "Sembunyikan" : "Buka Solusi"}
        </button>
      </div>

      {/* Output panel */}
      <AnimatePresence>
        {(output || errorMsg) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                "rounded-xl border p-4 font-mono text-xs leading-relaxed",
                runState === "success"
                  ? "border-emerald-400 bg-emerald-950/80 text-emerald-300"
                  : "border-red-400 bg-red-950/80 text-red-300"
              )}
            >
              <div className="mb-2 flex items-center gap-2 font-sans text-sm font-semibold">
                {runState === "success" ? (
                  <span className="text-emerald-400">✅ Berhasil!</span>
                ) : (
                  <span className="text-red-400">❌ Output Tidak Sesuai</span>
                )}
              </div>
              {errorMsg && (
                <p className="mb-2 font-sans text-sm text-red-400">
                  ⚠️ {errorMsg}
                </p>
              )}
              <pre className="whitespace-pre-wrap">{output}</pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Solution reveal */}
      <AnimatePresence>
        {showSolution && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex flex-col gap-4 rounded-xl border border-amber-300 bg-amber-50/60 p-5 dark:border-amber-800 dark:bg-amber-950/20"
          >
            <h4 className="flex items-center gap-2 font-semibold text-amber-900 dark:text-amber-300">
              💡 Solusi & Penjelasan
            </h4>

            {/* Solution code */}
            <div className="overflow-hidden rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2 bg-[#1e1e1e] px-4 py-2 text-xs text-gray-400">
                <span>✅ Kode Benar</span>
              </div>
              <Editor
                height="280px"
                defaultLanguage="cpp"
                value={challenge.solutionCode}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  fontSize: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  lineNumbers: "on",
                  folding: false,
                }}
              />
            </div>

            {/* Explanation */}
            <div className="prose prose-sm max-w-none text-amber-900 dark:text-amber-200">
              <div className="text-sm leading-relaxed whitespace-pre-line">
                {stripMarkdown(challenge.solutionExplanation)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for error line highlight */}
      <style>{`
        .apas-error-line {
          background-color: rgba(239,68,68,0.15) !important;
          border-left: 3px solid #ef4444 !important;
        }
      `}</style>
    </div>
  );
}
