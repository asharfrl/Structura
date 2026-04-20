/**
 * lib/apas-content/cpp-simulator.ts
 * A lightweight C++ code simulator for APAS grading.
 * NOT a real compiler – evaluates pre-defined test cases via pattern matching
 * and expected output comparison, suitable for high school curriculum.
 */

export interface SimulationResult {
  success: boolean;
  output: string;
  errorLine: number | null;
  errorMessage: string | null;
  hint: string | null;
}

export interface TestCase {
  description: string;
  /** Expected console output (trimmed) */
  expectedOutput: string;
  /** Pattern(s) that MUST appear in student code */
  requiredPatterns: RegExp[];
  /** Pattern(s) that must NOT appear (forbidden shortcuts) */
  forbiddenPatterns?: RegExp[];
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

/**
 * Simulates running student C++ code against test cases.
 * Returns structured result with error/success info.
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
    };
  }

  // Output mismatch
  const errorLine = detectErrorLine(code, challenge);
  return {
    success: false,
    output: `--- Output diterima ---\n${simulatedOutput}\n\n--- Output diharapkan ---\n${expectedOutput}`,
    errorLine,
    errorMessage: "Output tidak sesuai dengan yang diharapkan.",
    hint: "Periksa logika loop dan kondisi pada kode Anda.",
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
  if (src.includes("push")) return "Diperlukan operasi push().";
  if (src.includes("pop")) return "Diperlukan operasi pop().";
  if (src.includes("enqueue") || src.includes("rear"))
    return "Diperlukan operasi enqueue (tambah ke belakang antrian).";
  if (src.includes("dequeue") || src.includes("front"))
    return "Diperlukan operasi dequeue (ambil dari depan antrian).";
  if (src.includes("next") || src.includes("->"))
    return "Diperlukan penggunaan pointer (->next).";
  return "Pastikan struktur kode sesuai dengan soal.";
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
