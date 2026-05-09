/**
 * lib/apas-content/array.ts
 * APAS content for Array (Larik) – referencing Informatika Kelas X textbook.
 */

import type { CodingChallenge } from "./cpp-simulator";

// ─── MATERI ────────────────────────────────────────────────────────────────

export const materiArray = {
  title: "Array (Larik)",
  subtitle: "Struktur Data Paling Dasar dalam Pemrograman",
  icon: "📦",
  color: "#6366f1",
  sections: [
    {
      heading: "Apa itu Array?",
      content: `Array (atau Larik) adalah struktur data yang menyimpan sekumpulan elemen dengan tipe data yang SAMA secara berurutan di dalam memori komputer. Setiap elemen memiliki posisi yang disebut **indeks** (dimulai dari 0).

Array adalah fondasi dari hampir semua struktur data lainnya. Memahami array adalah langkah pertama yang wajib dalam perjalananmu mempelajari Struktur Data.`,
      visual: `  Indeks:  [0]   [1]   [2]   [3]   [4]
           ┌─────┬─────┬─────┬─────┬─────┐
  Nilai:   │  10 │  25 │   8 │  43 │  17 │
           └─────┴─────┴─────┴─────┴─────┘
  Nama Array:  arr`,
    },
    {
      heading: "Karakteristik Utama Array",
      content: `1. **Homogen**: Semua elemen harus bertipe data yang sama (int, float, char, dll.)
2. **Indeks 0-based**: Elemen pertama berada di indeks 0, bukan 1.
3. **Akses Acak (Random Access)**: Kamu bisa langsung mengakses elemen mana pun menggunakan indeksnya tanpa harus membaca dari awal.
4. **Ukuran Tetap (Static)**: Ukuran array ditentukan saat deklarasi dan tidak bisa diubah.`,
    },
    {
      heading: "Deklarasi Array dalam C++",
      content: `Sintaks: \`tipe_data nama_array[ukuran];\``,
      visual: `  // Deklarasi array integer berisi 5 elemen
  int arr[5];

  // Deklarasi sekaligus inisialisasi
  int nilai[5] = {10, 25, 8, 43, 17};

  // Akses elemen (indeks ke-2 = nilai 8)
  cout << nilai[2];  // Output: 8

  // Mengubah nilai elemen ke-0
  nilai[0] = 99;`,
    },
    {
      heading: "Traversal (Penelusuran) Array",
      content: `Traversal adalah proses mengunjungi setiap elemen array satu per satu, biasanya menggunakan loop **for**.`,
      visual: `  int nilai[5] = {10, 25, 8, 43, 17};

  for (int i = 0; i < 5; i++) {
      cout << "nilai[" << i << "] = " << nilai[i] << endl;
  }

  // Output:
  // nilai[0] = 10
  // nilai[1] = 25
  // nilai[2] = 8
  // nilai[3] = 43
  // nilai[4] = 17`,
    },
    {
      heading: "Implementasi Dunia Nyata",
      content: `- **Daftar Nilai Siswa**: Menyimpan 30 nilai siswa dalam satu variabel.
- **Piksel Layar**: Setiap piksel pada layar disimpan dalam array 2D.
- **Playlist Musik**: Daftar lagu yang diputar secara berurutan.
- **Skor Game**: Papan skor (leaderboard) disimpan dalam array.`,
    },
  ],
};

// ─── QUIZ KONSEPTUAL ───────────────────────────────────────────────────────

export const quizArray = [
  {
    id: 1,
    question:
      "Perhatikan deklarasi berikut: `int data[6] = {5, 12, 3, 8, 21, 7};` Berapakah nilai dari `data[3]`?",
    options: ["3", "8", "12", "21"],
    correctIndex: 1,
    explanation:
      "Indeks array dimulai dari 0. Jadi data[0]=5, data[1]=12, data[2]=3, data[3]=8. Jawaban yang benar adalah 8.",
  },
  {
    id: 2,
    question:
      "Jika sebuah array dideklarasikan sebagai `char huruf[5]`, berapa banyak elemen yang dapat disimpan?",
    options: ["4 elemen", "5 elemen", "6 elemen", "Tidak terbatas"],
    correctIndex: 1,
    explanation:
      "Angka dalam kurung siku mendefinisikan ukuran array. `char huruf[5]` dapat menyimpan tepat 5 karakter (indeks 0 sampai 4).",
  },
  {
    id: 3,
    question:
      "Salah satu karakteristik utama array adalah 'Random Access'. Apa artinya?",
    options: [
      "Elemen disimpan secara acak di memori",
      "Urutan elemen selalu diacak",
      "Elemen dapat diakses langsung menggunakan indeks tanpa harus membaca dari awal",
      "Array hanya bisa diakses secara berurutan",
    ],
    correctIndex: 2,
    explanation:
      "Random Access artinya kita bisa mengakses elemen mana pun secara langsung menggunakan indeksnya (O(1)), tanpa perlu menelusuri dari elemen pertama.",
  },
  {
    id: 4,
    question:
      "Manakah deklarasi array C++ yang BENAR untuk menyimpan 4 bilangan desimal?",
    options: [
      "int pecahan[4];",
      "float pecahan[4];",
      "double pecahan = [4];",
      "array<4> pecahan;",
    ],
    correctIndex: 1,
    explanation:
      "Untuk bilangan desimal (pecahan), gunakan tipe data `float` atau `double`. Jadi `float pecahan[4]` adalah deklarasi yang benar.",
  },
  {
    id: 5,
    question:
      "Sebuah program menyimpan nilai 10 siswa menggunakan array `int nilai[10]`. Indeks yang valid untuk mengakses elemen pertama dan terakhir adalah...",
    options: [
      "Pertama: 1, Terakhir: 10",
      "Pertama: 0, Terakhir: 9",
      "Pertama: 0, Terakhir: 10",
      "Pertama: 1, Terakhir: 9",
    ],
    correctIndex: 1,
    explanation:
      "Array menggunakan indeks 0-based. Untuk array berukuran 10, indeks yang valid adalah 0 hingga 9. Mengakses indeks 10 akan menyebabkan error (out of bounds).",
  },
];

// ─── CODING CHALLENGE ──────────────────────────────────────────────────────

export const codingChallengeArray: CodingChallenge = {
  id: "array-traversal",
  title: "Mencetak Semua Elemen Array",
  description: `Lengkapi fungsi \`printArray()\` di bawah ini sehingga mencetak semua elemen array secara berurutan. Gunakan perulangan (loop) untuk menelusuri setiap elemen dari indeks pertama hingga terakhir.

**Output yang diharapkan:**
\`\`\`
Elemen[0] = 10
Elemen[1] = 25
Elemen[2] = 8
Elemen[3] = 43
Elemen[4] = 17
\`\`\``,
  starterCode: `#include <iostream>
using namespace std;

void printArray(int arr[], int ukuran) {
    // Tulis kode Anda di sini
    // Gunakan loop for untuk mencetak setiap elemen
    
}

int main() {
    int data[5] = {10, 25, 8, 43, 17};
    printArray(data, 5);
    return 0;
}`,
  solutionCode: `#include <iostream>
using namespace std;

void printArray(int arr[], int ukuran) {
    for (int i = 0; i < ukuran; i++) {
        cout << "Elemen[" << i << "] = " << arr[i] << endl;
    }
}

int main() {
    int data[5] = {10, 25, 8, 43, 17};
    printArray(data, 5);
    return 0;
}`,
  solutionExplanation: `## Penjelasan Solusi

### Konsep yang Digunakan: Traversal Array

**Traversal** adalah proses mengunjungi setiap elemen secara berurutan dari indeks 0 hingga indeks terakhir.

### Logika Kode:
\`\`\`
for (int i = 0; i < ukuran; i++)
\`\`\`
- \`i = 0\` → mulai dari indeks **pertama** (0)  
- \`i < ukuran\` → berhenti **sebelum** melampaui batas array  
- \`i++\` → maju ke elemen **berikutnya**

### Akses Elemen:
\`\`\`
arr[i]
\`\`\`
Variabel \`i\` digunakan sebagai **indeks dinamis** yang berubah setiap iterasi, sehingga kita bisa mengakses semua elemen secara berurutan.

> 💡 **Ingat**: Indeks array selalu dimulai dari **0**, bukan 1!`,
  testCases: [
    {
      description: "Array traversal dengan loop",
      expectedOutput:
        "Elemen[0] = 10\nElemen[1] = 25\nElemen[2] = 8\nElemen[3] = 43\nElemen[4] = 17",
      requiredPatterns: [
        /for\s*\(/,
        /cout/,
        /arr\[i\]/,
      ],
      topicHint: "array" as const,
    },
  ],
};
