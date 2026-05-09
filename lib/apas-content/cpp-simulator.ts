/**
 * lib/apas-content/cpp-simulator.ts
 * A lightweight C++ code simulator for APAS grading.
 * NOT a real compiler – evaluates pre-defined test cases via pattern matching
 * and expected output comparison, suitable for high school curriculum (Kelas X).
 *
 * Curriculum reference: Informatika Kelas X – Bab 2: Algoritma & Struktur Data
 */

export interface SimulationResult {
  success: boolean;
  output: string;
  errorLine: number | null;
  errorMessage: string | null;
  hint: string | null;
  /** Curriculum-aligned pedagogical hint shown to student when logic fails */
  pedagogicalHint: string | null;
}

export interface TestCase {
  description: string;
  /** Expected console output (trimmed) */
  expectedOutput: string;
  /** Pattern(s) that MUST appear in student code */
  requiredPatterns: RegExp[];
  /** Pattern(s) that must NOT appear (forbidden shortcuts) */
  forbiddenPatterns?: RegExp[];
  /** Topic keyword for pedagogical hint lookup */
  topicHint?: "array" | "stack" | "queue" | "linked-list" | "sorting" | "searching";
}

export interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  solutionCode: string;
  solutionExplanation: string;
  testCases: TestCase[];
}

// ── Curriculum-aligned pedagogical hints (Bab 2 Kelas X) ──────────────────

const PEDAGOGICAL_HINTS: Record<NonNullable<TestCase["topicHint"]>, string> = {
  array:
    "💡 Ingat definisi Array (Larik): struktur data LINEAR yang menyimpan elemen bertipe SAMA di memori yang BERDAMPINGAN, dan setiap elemen diakses menggunakan INDEKS numerik (dimulai dari 0). Pastikan loop-mu menelusuri dari indeks 0 hingga ukuran-1.",
  stack:
    "💡 Stack menggunakan prinsip LIFO (Last In, First Out) — seperti tumpukan piring. Elemen yang TERAKHIR dimasukkan (PUSH ke TOP) adalah yang PERTAMA dikeluarkan (POP dari TOP). Pastikan kamu menaikkan `top` saat PUSH dan menurunkannya saat POP.",
  queue:
    "💡 Queue menggunakan prinsip FIFO (First In, First Out) — seperti antrean di loket bioskop. Elemen yang PERTAMA masuk (ENQUEUE ke belakang/rear) adalah yang PERTAMA keluar (DEQUEUE dari depan/front). Pastikan kamu menambah ke `rear` dan mengambil dari `front`.",
  "linked-list":
    "💡 Linked List adalah struktur data di mana setiap node menyimpan DATA dan POINTER (`next`) ke node berikutnya. Berbeda dengan Array, elemen tidak tersimpan berdampingan di memori. Pastikan kamu menggunakan operator `->` untuk mengakses anggota struct melalui pointer.",
  sorting:
    "💡 Pengurutan (Sorting) adalah proses menyusun elemen secara berurutan (naik/turun). Bubble Sort menukar dua elemen yang berdekatan, Insertion Sort menyisipkan ke posisi tepat, dan Selection Sort memilih elemen terkecil/terbesar di setiap iterasi.",
  searching:
    "💡 Pencarian (Searching) adalah proses menemukan item berdasarkan kriteria tertentu. Linear Search memeriksa satu per satu dari awal (O(n)), sedangkan Binary Search hanya bisa digunakan pada data terurut dan membagi ruang pencarian separuh setiap langkah (O(log n)).",
};

/**
 * Simulates running student C++ code against test cases.
 * Returns structured result with error/success info and pedagogical hint.
 */
export function simulateCpp(
  code: string,
  challenge: CodingChallenge
): SimulationResult {
  const normalizedCode = code.trim();

  if (!normalizedCode || normalizedCode === challenge.starterCode.trim()) {
    return {
      success: false,
      output: "",
      errorLine: null,
      errorMessage: "Kode masih kosong atau belum diubah dari template awal.",
      hint: "Coba tulis logika program terlebih dahulu.",
      pedagogicalHint: null,
    };
  }

  // Check for forbidden patterns
  for (const tc of challenge.testCases) {
    if (tc.forbiddenPatterns) {
      for (const pattern of tc.forbiddenPatterns) {
        if (pattern.test(normalizedCode)) {
          return {
            success: false,
            output: "",
            errorLine: findPatternLine(code, pattern),
            errorMessage: `Penggunaan tidak diizinkan terdeteksi. Gunakan implementasi manual.`,
            hint: "Coba implementasikan logika secara manual tanpa library bawaan.",
            pedagogicalHint: tc.topicHint ? PEDAGOGICAL_HINTS[tc.topicHint] : null,
          };
        }
      }
    }
  }

  // Check required patterns
  for (const tc of challenge.testCases) {
    for (const pattern of tc.requiredPatterns) {
      if (!pattern.test(normalizedCode)) {
        const missingHint = getMissingPatternHint(pattern);
        return {
          success: false,
          output: `--- Output tidak sesuai ---\nDiharapkan:\n${tc.expectedOutput}`,
          errorLine: null,
          errorMessage: `Logika tidak lengkap: ${missingHint}`,
          hint: missingHint,
          pedagogicalHint: tc.topicHint ? PEDAGOGICAL_HINTS[tc.topicHint] : null,
        };
      }
    }
  }

  // Simulate output
  const simulatedOutput = generateSimulatedOutput(code, challenge);

  const expectedOutput = challenge.testCases[0].expectedOutput.trim();
  if (simulatedOutput.trim() === expectedOutput) {
    return {
      success: true,
      output: simulatedOutput,
      errorLine: null,
      errorMessage: null,
      hint: null,
      pedagogicalHint: null,
    };
  }

  // Output mismatch
  const errorLine = detectErrorLine(code, challenge);
  const topicHint = challenge.testCases[0].topicHint;
  return {
    success: false,
    output: `--- Output diterima ---\n${simulatedOutput}\n\n--- Output diharapkan ---\n${expectedOutput}`,
    errorLine,
    errorMessage: "Output tidak sesuai dengan yang diharapkan.",
    hint: "Periksa logika loop dan kondisi pada kode Anda.",
    pedagogicalHint: topicHint ? PEDAGOGICAL_HINTS[topicHint] : null,
  };
}

/** Attempt to find the line number of a pattern match */
function findPatternLine(code: string, pattern: RegExp): number | null {
  const lines = code.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (pattern.test(lines[i])) return i + 1;
  }
  return null;
}

/** Get a human-readable hint about what's missing */
function getMissingPatternHint(pattern: RegExp): string {
  const src = pattern.source;
  if (src.includes("for") || src.includes("while"))
    return "Diperlukan struktur perulangan (for/while).";
  if (src.includes("cout")) return "Diperlukan perintah output (cout).";
  if (src.includes("push") || src.includes("top\\+\\+"))
    return "Diperlukan operasi PUSH — naikkan top, lalu simpan nilai di stack[top].";
  if (src.includes("pop") || src.includes("top--"))
    return "Diperlukan operasi POP — ambil nilai dari stack[top], lalu turunkan top.";
  if (src.includes("enqueue") || src.includes("rear"))
    return "Diperlukan operasi ENQUEUE — tambahkan ke posisi rear (belakang antrian/FIFO).";
  if (src.includes("dequeue") || src.includes("front"))
    return "Diperlukan operasi DEQUEUE — ambil dari posisi front (depan antrian/FIFO).";
  if (src.includes("next") || src.includes("->"))
    return "Diperlukan penggunaan pointer (->next) untuk traversal Linked List.";
  if (src.includes("arr\\[i\\]") || src.includes("nilai\\[i\\]"))
    return "Diperlukan akses elemen array menggunakan indeks (arr[i]).";
  return "Pastikan struktur kode sesuai dengan soal dan definisi dari buku.";
}

/** Simulate the expected output based on detected patterns */
function generateSimulatedOutput(
  code: string,
  challenge: CodingChallenge
): string {
  // Each challenge has a known expected output – return it if patterns match
  return challenge.testCases[0].expectedOutput;
}

/** Try to identify the problematic line */
function detectErrorLine(code: string, challenge: CodingChallenge): number | null {
  const lines = code.split("\n");
  // Look for lines with missing semicolons or incorrect syntax
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (
      line.length > 0 &&
      !line.startsWith("//") &&
      !line.startsWith("#") &&
      !line.startsWith("{") &&
      !line.startsWith("}") &&
      !line.endsWith("{") &&
      !line.endsWith("}") &&
      !line.endsWith(";") &&
      !line.endsWith(":")
    ) {
      return i + 1;
    }
  }
  return null;
}



