/**
 * lib/apas-content/stack.ts
 * APAS content for Stack (Tumpukan) – referencing Informatika Kelas X textbook.
 */

import type { CodingChallenge } from "./cpp-simulator";

// ─── MATERI ────────────────────────────────────────────────────────────────

export const materiStack = {
  title: "Stack (Tumpukan)",
  subtitle: "Struktur Data LIFO – Last In, First Out",
  icon: "🥞",
  color: "#f59e0b",
  sections: [
    {
      heading: "Apa itu Stack?",
      content: `**Stack** (Tumpukan) adalah struktur data yang bekerja berdasarkan prinsip **LIFO (Last In, First Out)** — elemen yang terakhir dimasukkan adalah yang **pertama dikeluarkan**.

Bayangkan tumpukan piring di kantin: kamu hanya bisa mengambil piring dari atas (piring terakhir yang ditaruh), dan menambah piring juga hanya bisa dilakukan dari atas.`,
      visual: `        PUSH →  [  TOP  ]  ← POP
               ┌─────────┐
               │   "C"   │  ← TOP (terakhir masuk, pertama keluar)
               ├─────────┤
               │   "B"   │
               ├─────────┤
               │   "A"   │  ← BOTTOM (pertama masuk, terakhir keluar)
               └─────────┘`,
    },
    {
      heading: "Operasi Dasar Stack",
      content: `Stack memiliki 4 operasi utama:

1. **PUSH**: Menambahkan elemen ke bagian paling atas (*TOP*) stack.
2. **POP**: Mengambil dan menghapus elemen dari bagian paling atas (*TOP*).
3. **PEEK / TOP**: Melihat elemen paling atas tanpa menghapusnya.
4. **isEmpty**: Mengecek apakah stack kosong (TOP == -1).`,
    },
    {
      heading: "Implementasi Stack dengan Array di C++",
      content: `Stack dapat diimplementasikan menggunakan array biasa dengan variabel \`top\` sebagai penanda posisi elemen teratas.`,
      visual: `  #define MAKS 100

  struct Stack {
      int data[MAKS];
      int top;
  };

  void inisialisasi(Stack &s) {
      s.top = -1;  // -1 berarti stack KOSONG
  }

  void push(Stack &s, int nilai) {
      s.top++;
      s.data[s.top] = nilai;  // Tambah elemen di atas
  }

  int pop(Stack &s) {
      int nilai = s.data[s.top];
      s.top--;                 // Hapus elemen atas
      return nilai;
  }

  int peek(Stack &s) {
      return s.data[s.top];    // Lihat tanpa hapus
  }

  bool isEmpty(Stack &s) {
      return s.top == -1;      // Kosong jika top = -1
  }`,
    },
    {
      heading: "Implementasi Dunia Nyata",
      content: `- **Tombol Undo/Redo**: Setiap aksi disimpan di stack. Ctrl+Z mengambil (POP) aksi terakhir.
- **Riwayat Browser (Back)**: Halaman yang dikunjungi disimpan di stack.
- **Call Stack Pemrograman**: Ketika fungsi memanggil fungsi lain, informasi disimpan di call stack.
- **Ekspresi Matematika**: Kalkulator menggunakan stack untuk menghitung ekspresi 3 + (2 × 4).`,
    },
  ],
};

// ─── QUIZ KONSEPTUAL ───────────────────────────────────────────────────────

export const quizStack = [
  {
    id: 1,
    question:
      "Kepanjangan dari LIFO adalah... dan apa maknanya pada Stack?",
    options: [
      "Last Index, First Output – indeks terakhir keluar pertama",
      "Last In, First Out – elemen terakhir masuk adalah yang pertama keluar",
      "Linear Input, Fixed Output – input linear, output tetap",
      "Last In, Fixed Order – urutan masuk = urutan keluar",
    ],
    correctIndex: 1,
    explanation:
      "LIFO = Last In, First Out. Seperti tumpukan piring: piring yang TERAKHIR ditaruh adalah yang PERTAMA diambil.",
  },
  {
    id: 2,
    question:
      "Operasi PUSH pada stack berfungsi untuk...",
    options: [
      "Menghapus elemen dari atas stack",
      "Melihat elemen atas tanpa menghapus",
      "Menambahkan elemen ke bagian atas (TOP) stack",
      "Mereset stack ke kondisi kosong",
    ],
    correctIndex: 2,
    explanation:
      "PUSH = memasukkan elemen baru ke bagian ATAS (TOP) stack. Setelah PUSH, nilai `top` bertambah satu.",
  },
  {
    id: 3,
    question:
      "Sebuah stack kosong memiliki nilai `top = -1`. Setelah operasi PUSH(10), PUSH(20), PUSH(30), kemudian POP() dijalankan, berapakah nilai TOP sekarang?",
    options: [
      "30 (nilai yang di-POP)",
      "20 (nilai baru di TOP)",
      "10",
      "-1 (stack kosong kembali)",
    ],
    correctIndex: 1,
    explanation:
      "Setelah PUSH(10), PUSH(20), PUSH(30): stack = [10, 20, 30] dengan TOP=30. Setelah POP(), elemen 30 diambil, sehingga TOP sekarang = 20.",
  },
  {
    id: 4,
    question:
      "Manakah KONDISI yang menandakan bahwa sebuah stack KOSONG dalam implementasi array?",
    options: [
      "top == 0",
      "top == MAKS",
      "top == -1",
      "top == 1",
    ],
    correctIndex: 2,
    explanation:
      "Dalam implementasi stack dengan array, nilai `top = -1` menandakan stack kosong (belum ada elemen yang dimasukkan).",
  },
  {
    id: 5,
    question:
      "Fitur 'Undo' (Ctrl+Z) pada Microsoft Word menggunakan prinsip Stack. Ketika pengguna mengetik 'A', 'B', 'C' lalu menekan Undo dua kali, karakter apa yang tersisa?",
    options: [
      "Hanya 'A'",
      "'A' dan 'B'",
      "'B' dan 'C'",
      "Semua terhapus",
    ],
    correctIndex: 0,
    explanation:
      "Stack Undo: [A, B, C]. Tekan Undo pertama: POP → hapus 'C'. Tekan Undo kedua: POP → hapus 'B'. Tersisa hanya 'A'.",
  },
];

// ─── CODING CHALLENGE ──────────────────────────────────────────────────────

export const codingChallengeStack: CodingChallenge = {
  id: "stack-push-pop",
  title: "Simulasi Fitur Undo (Stack)",
  description: `Lengkapi fungsi \`push()\` dan \`pop()\` untuk mensimulasikan fitur **Undo** menggunakan Stack string.

**Aturan:**
- \`push()\`: tambahkan aksi pengguna ke atas stack (naikkan \`top\`, simpan di \`data[top]\`)
- \`pop()\`: hapus dan kembalikan aksi terakhir yang di-undo (turunkan \`top\`)

**Output yang diharapkan:**
\`\`\`
Aksi: Ketik A
Aksi: Ketik B
Aksi: Ketik C
Undo: Ketik C
Aksi tersisa (TOP): Ketik B
\`\`\``,
  starterCode: `#include <iostream>
#include <string>
using namespace std;

#define MAKS 100

struct StackUndo {
    string aksi[MAKS];
    int top;
};

void inisialisasi(StackUndo &s) {
    s.top = -1;
}

void push(StackUndo &s, string aksiBaru) {
    // Tulis kode Anda di sini
    // 1. Naikkan top
    // 2. Simpan aksiBaru di s.aksi[s.top]

}

string pop(StackUndo &s) {
    // Tulis kode Anda di sini
    // 1. Ambil aksi dari s.aksi[s.top]
    // 2. Turunkan top
    // 3. Kembalikan aksi yang diambil

}

int main() {
    StackUndo s;
    inisialisasi(s);
    
    push(s, "Ketik A"); cout << "Aksi: Ketik A" << endl;
    push(s, "Ketik B"); cout << "Aksi: Ketik B" << endl;
    push(s, "Ketik C"); cout << "Aksi: Ketik C" << endl;
    
    cout << "Undo: " << pop(s) << endl;
    cout << "Aksi tersisa (TOP): " << s.aksi[s.top] << endl;
    
    return 0;
}`,
  solutionCode: `#include <iostream>
#include <string>
using namespace std;

#define MAKS 100

struct StackUndo {
    string aksi[MAKS];
    int top;
};

void inisialisasi(StackUndo &s) {
    s.top = -1;
}

void push(StackUndo &s, string aksiBaru) {
    s.top++;               // Naikkan posisi TOP
    s.aksi[s.top] = aksiBaru; // Simpan di atas stack
}

string pop(StackUndo &s) {
    string aksiDiambil = s.aksi[s.top]; // Ambil dari TOP
    s.top--;                   // Hapus dengan turunkan TOP
    return aksiDiambil;
}

int main() {
    StackUndo s;
    inisialisasi(s);
    
    push(s, "Ketik A"); cout << "Aksi: Ketik A" << endl;
    push(s, "Ketik B"); cout << "Aksi: Ketik B" << endl;
    push(s, "Ketik C"); cout << "Aksi: Ketik C" << endl;
    
    cout << "Undo: " << pop(s) << endl;
    cout << "Aksi tersisa (TOP): " << s.aksi[s.top] << endl;
    
    return 0;
}`,
  solutionExplanation: `## Penjelasan Solusi – Undo Simulator (LIFO)

### Prinsip LIFO dalam Undo
Sistem *Undo* (Ctrl+Z) bekerja menggunakan memori Stack. Aksi terakhir yang dilakukan akan menjadi aksi pertama yang dibatalkan.

### Fungsi PUSH (Simpan Aksi):
\`\`\`cpp
s.top++;               
s.aksi[s.top] = aksiBaru; 
\`\`\`
Setiap kita mengetik hal baru (\`aksiBaru\`), posisi \`top\` dinaikkan dan aksi tersebut disimpan di tumpukan tersebut.

### Fungsi POP (Undo):
\`\`\`cpp
string aksiDiambil = s.aksi[s.top]; 
s.top--;                   
return aksiDiambil;
\`\`\`
Untuk melakukan *Undo*, sistem membaca memori yang teratas (terakhir), lalu "membuangnya" dengan menurunkan \`s.top\`.

### Trace Eksekusi:
| Kondisi | top | Stack Memori |
|---------|-----|--------------|
| awal    | -1  | []           |
| Ketik A | 0   | ["Ketik A"] |
| Ketik C | 2   | ["Ketik A", "Ketik B", "Ketik C"] |
| Undo () | 1   | ["Ketik A", "Ketik B"] → membatalkan C |`,
  testCases: [
    {
      description: "Push dan Pop Undo implementasi benar",
      expectedOutput: "Aksi: Ketik A\nAksi: Ketik B\nAksi: Ketik C\nUndo: Ketik C\nAksi tersisa (TOP): Ketik B",
      requiredPatterns: [/s\.top\+\+/, /s\.top--/, /s\.aksi\[s\.top\]/],
      topicHint: "stack" as const,
    },
  ],
};
