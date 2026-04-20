/**
 * lib/apas-content/queue.ts
 * APAS content for Queue (Antrean) – referencing Informatika Kelas X textbook.
 */

import type { CodingChallenge } from "./cpp-simulator";

// ─── MATERI ────────────────────────────────────────────────────────────────

export const materiQueue = {
  title: "Queue (Antrean)",
  subtitle: "Struktur Data FIFO – First In, First Out",
  icon: "🚶",
  color: "#10b981",
  sections: [
    {
      heading: "Apa itu Queue?",
      content: `**Queue** (Antrean) adalah struktur data yang bekerja berdasarkan prinsip **FIFO (First In, First Out)** — elemen yang **pertama** dimasukkan adalah yang **pertama** dikeluarkan.

Bayangkan antrean di kasir supermarket: pelanggan yang tiba pertama akan dilayani pertama. Tidak ada yang boleh menyela antrian!`,
      visual: `  ENQUEUE → [ REAR ]                [ FRONT ] → DEQUEUE
             ┌────┬────┬────┬────┬────┐
             │ D  │ C  │ B  │ A  │    │
             └────┴────┴────┴────┴────┘
              ↑                    ↑
            REAR               FRONT
         (masuk di sini)   (keluar dari sini)`,
    },
    {
      heading: "Operasi Dasar Queue",
      content: `Queue memiliki 4 operasi utama:

1. **ENQUEUE**: Menambahkan elemen ke bagian **BELAKANG** (REAR) antrian.
2. **DEQUEUE**: Mengambil dan menghapus elemen dari bagian **DEPAN** (FRONT).
3. **FRONT**: Melihat elemen paling depan tanpa menghapusnya.
4. **isEmpty**: Mengecek apakah queue kosong (FRONT > REAR).`,
    },
    {
      heading: "Perbedaan Queue vs Stack",
      content: `| Aspek | Stack (Tumpukan) | Queue (Antrean) |
|-------|----------|---------|
| Prinsip | LIFO | FIFO |
| Masuk | Atas (TOP) | Belakang (REAR) |
| Keluar | Atas (TOP) | Depan (FRONT) |
| Contoh | Undo/Redo | Printer, Bank |`,
    },
    {
      heading: "Implementasi Queue dengan Array di C++",
      content: `Queue menggunakan dua penanda: \`front\` (depan) dan \`rear\` (belakang).`,
      visual: `  #define MAKS 100

  struct Queue {
      int data[MAKS];
      int front, rear;
  };

  void inisialisasi(Queue &q) {
      q.front = 0;
      q.rear  = -1;  // -1 berarti queue KOSONG
  }

  void enqueue(Queue &q, int nilai) {
      q.rear++;
      q.data[q.rear] = nilai;   // Tambah di BELAKANG
  }

  int dequeue(Queue &q) {
      int nilai = q.data[q.front];
      q.front++;                 // Maju ke elemen berikutnya
      return nilai;
  }

  bool isEmpty(Queue &q) {
      return q.front > q.rear;  // Kosong jika front melampaui rear
  }`,
    },
    {
      heading: "Implementasi Dunia Nyata",
      content: `- **Antrean Printer**: File yang pertama dikirim ke printer adalah yang pertama dicetak.
- **Sistem Tiket Online**: Pengguna yang pertama mendaftar mendapat giliran pertama.
- **Buffer Keyboard**: Karakter yang diketik disimpan dalam buffer queue sebelum diproses.
- **Antrean Bank**: Nasabah yang datang lebih dulu dilayani lebih dulu.`,
    },
  ],
};

// ─── QUIZ KONSEPTUAL ───────────────────────────────────────────────────────

export const quizQueue = [
  {
    id: 1,
    question:
      "Kepanjangan FIFO adalah... dan bagaimana hubungannya dengan Queue?",
    options: [
      "Final Input, Fixed Output – input terakhir, output tetap",
      "First In, First Out – elemen pertama masuk adalah pertama keluar",
      "First Index, Fixed Output – indeks pertama selalu keluar duluan",
      "Fast Input, Fast Output – input dan output cepat",
    ],
    correctIndex: 1,
    explanation:
      "FIFO = First In, First Out. Seperti antrean: orang yang pertama MASUK antrian adalah yang pertama KELUAR (dilayani).",
  },
  {
    id: 2,
    question:
      "Operasi ENQUEUE pada Queue berfungsi untuk...",
    options: [
      "Mengambil elemen dari depan antrian",
      "Menambahkan elemen ke bagian belakang (REAR) antrian",
      "Melihat elemen paling depan tanpa menghapus",
      "Mengosongkan seluruh antrian",
    ],
    correctIndex: 1,
    explanation:
      "ENQUEUE = menambahkan elemen baru ke bagian BELAKANG (REAR) queue. Ini kebalikan dari PUSH pada Stack yang menambah di atas.",
  },
  {
    id: 3,
    question:
      "Queue memiliki elemen [A, B, C, D] di mana A adalah FRONT. Setelah DEQUEUE() dua kali, lalu ENQUEUE(E), kondisi queue menjadi...",
    options: [
      "[A, B, C, D, E]",
      "[C, D, E]",
      "[E, C, D]",
      "[A, B, E]",
    ],
    correctIndex: 1,
    explanation:
      "DEQUEUE pertama: ambil A → [B, C, D]. DEQUEUE kedua: ambil B → [C, D]. ENQUEUE(E): tambah di belakang → [C, D, E].",
  },
  {
    id: 4,
    question:
      "Apa perbedaan PRINSIP utama antara Stack dan Queue?",
    options: [
      "Stack menggunakan array, Queue menggunakan linked list",
      "Stack LIFO (Last In First Out), Queue FIFO (First In First Out)",
      "Stack untuk angka, Queue untuk karakter",
      "Stack lebih cepat daripada Queue",
    ],
    correctIndex: 1,
    explanation:
      "Perbedaan fundamental: Stack = LIFO (terakhir masuk, pertama keluar), Queue = FIFO (pertama masuk, pertama keluar). Keduanya bisa diimplementasikan dengan array maupun linked list.",
  },
  {
    id: 5,
    question:
      "Sebuah printer menerima 3 file secara berurutan: Laporan, Gambar, Sertifikat. File mana yang akan dicetak PERTAMA?",
    options: [
      "Sertifikat (terakhir dikirim)",
      "Gambar (di tengah)",
      "Laporan (pertama dikirim)",
      "Bergantung ukuran file",
    ],
    correctIndex: 2,
    explanation:
      "Sistem printer menggunakan Queue (FIFO). File yang pertama DIKIRIM (Laporan) adalah yang pertama DICETAK, selama tidak ada prioritas khusus.",
  },
];

// ─── CODING CHALLENGE ──────────────────────────────────────────────────────

export const codingChallengeQueue: CodingChallenge = {
  id: "queue-enqueue-dequeue",
  title: "Simulasi Printer Spooler (Queue)",
  description: `Lengkapi fungsi \`enqueue()\` dan \`dequeue()\` untuk mensimulasikan sistem **Printer Spooler** menggunakan struktur data Queue.

**Aturan Antrean (FIFO):**
- \`enqueue()\`: tambahkan dokumen ke antrean paling belakang (naikkan \`rear\`, simpan di \`data[rear]\`)
- \`dequeue()\`: ambil dokumen dari antrean paling depan untuk dicetak (ambil dari \`data[front]\`, lalu naikkan \`front\`)

**Output yang diharapkan:**
\`\`\`
Enqueue: Laporan
Enqueue: Gambar
Enqueue: Sertifikat
Dequeue: Laporan
FRONT sekarang: Gambar
\`\`\``,
  starterCode: `#include <iostream>
#include <string>
using namespace std;

#define MAKS 100

struct Queue {
    string data[MAKS];
    int front, rear;
};

void inisialisasi(Queue &q) {
    q.front = 0;
    q.rear = -1;
}

void enqueue(Queue &q, string nilai) {
    // Tulis kode Anda di sini
    // 1. Naikkan rear
    // 2. Simpan nilai di data[rear]

}

string dequeue(Queue &q) {
    // Tulis kode Anda di sini
    // 1. Ambil nilai dari data[front]
    // 2. Naikkan front
    // 3. Kembalikan nilai
    
}

int main() {
    Queue q;
    inisialisasi(q);
    
    enqueue(q, "Laporan");    cout << "Enqueue: Laporan" << endl;
    enqueue(q, "Gambar");     cout << "Enqueue: Gambar" << endl;
    enqueue(q, "Sertifikat"); cout << "Enqueue: Sertifikat" << endl;
    
    cout << "Dequeue: " << dequeue(q) << endl;
    cout << "FRONT sekarang: " << q.data[q.front] << endl;
    
    return 0;
}`,
  solutionCode: `#include <iostream>
#include <string>
using namespace std;

#define MAKS 100

struct Queue {
    string data[MAKS];
    int front, rear;
};

void inisialisasi(Queue &q) {
    q.front = 0;
    q.rear = -1;
}

void enqueue(Queue &q, string nilai) {
    q.rear++;               // Naikkan posisi REAR
    q.data[q.rear] = nilai; // Simpan di belakang antrian
}

string dequeue(Queue &q) {
    string nilai = q.data[q.front]; // Ambil dari depan antrian
    q.front++;                      // Maju ke elemen berikutnya
    return nilai;
}

int main() {
    Queue q;
    inisialisasi(q);
    
    enqueue(q, "Laporan");    cout << "Enqueue: Laporan" << endl;
    enqueue(q, "Gambar");     cout << "Enqueue: Gambar" << endl;
    enqueue(q, "Sertifikat"); cout << "Enqueue: Sertifikat" << endl;
    
    cout << "Dequeue: " << dequeue(q) << endl;
    cout << "FRONT sekarang: " << q.data[q.front] << endl;
    
    return 0;
}`,
  solutionExplanation: `## Penjelasan Solusi – FIFO Queue

### Prinsip FIFO (First In, First Out)
Queue bekerja seperti antrean nyata: yang **pertama masuk** adalah yang **pertama dilayani**.

### Fungsi ENQUEUE (tambah di belakang):
\`\`\`cpp
q.rear++;               // Naikkan REAR ke posisi kosong
q.data[q.rear] = nilai; // Simpan nilai di posisi REAR
\`\`\`

### Fungsi DEQUEUE (ambil dari depan):
\`\`\`cpp
string nilai = q.data[q.front]; // Baca dari posisi FRONT
q.front++;                      // "Hapus" dengan naikkan FRONT
return nilai;
\`\`\`

### Trace Eksekusi:
| Operasi | front | rear | Antrian |
|---------|-------|------|---------|
| init    | 0     | -1   | []      |
| enqueue("Laporan")    | 0 | 0 | [Laporan] |
| enqueue("Gambar")     | 0 | 1 | [Laporan, Gambar] |
| enqueue("Sertifikat") | 0 | 2 | [Laporan, Gambar, Sertifikat] |
| dequeue() → "Laporan" | 1 | 2 | [Gambar, Sertifikat] |

> 💡 **Perbedaan kunci dengan Stack**: ENQUEUE menaikkan \`rear\` (belakang), sedangkan PUSH Stack menaikkan \`top\` (atas).`,
  testCases: [
    {
      description: "Enqueue dan Dequeue implementasi benar",
      expectedOutput:
        "Enqueue: Laporan\nEnqueue: Gambar\nEnqueue: Sertifikat\nDequeue: Laporan\nFRONT sekarang: Gambar",
      requiredPatterns: [/q\.rear\+\+/, /q\.front\+\+/, /q\.data\[q\.(front|rear)\]/],
    },
  ],
};
