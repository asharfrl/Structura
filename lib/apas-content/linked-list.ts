/**
 * lib/apas-content/linked-list.ts
 * APAS content for Linked List – referencing Informatika Kelas X textbook.
 */

import type { CodingChallenge } from "./cpp-simulator";

// ─── MATERI ────────────────────────────────────────────────────────────────

export const materiLinkedList = {
  title: "Linked List",
  subtitle: "Struktur Data Berantai dengan Pointer",
  icon: "🔗",
  color: "#ec4899",
  sections: [
    {
      heading: "Apa itu Linked List?",
      content: `**Linked List** adalah struktur data yang terdiri dari sekumpulan elemen yang disebut **Node** (simpul). Setiap node menyimpan:
1. **Data**: Nilai yang disimpan
2. **Pointer/Link**: Alamat memori menuju node berikutnya

Berbeda dengan array yang menggunakan blok memori berurutan, linked list dapat tersebar di berbagai lokasi memori yang dihubungkan oleh pointer.`,
      visual: `  HEAD
   │
   ▼
  ┌────┬─────┐    ┌────┬─────┐    ┌────┬──────┐
  │ 10 │  ●──┼───►│ 25 │  ●──┼───►│  8 │ NULL │
  └────┴─────┘    └────┴─────┘    └────┴──────┘
   Node 1           Node 2           Node 3
  (data│next)      (data│next)      (data│next=NULL)`,
    },
    {
      heading: "Perbandingan Array vs Linked List",
      content: `| Aspek | Array | Linked List |
|-------|-------|-------------|
| Ukuran | Tetap (statis) | Dinamis (fleksibel) |
| Akses | Langsung (O(1)) | Berurutan (O(n)) |
| Memori | Berurutan | Tersebar |
| Sisip/Hapus | Lambat (O(n)) | Cepat di HEAD (O(1)) |`,
    },
    {
      heading: "Implementasi Node dan Linked List di C++",
      content: `Setiap node didefinisikan menggunakan \`struct\` dengan pointer ke node berikutnya.`,
      visual: `  struct Node {
      int data;
      Node* next;  // Pointer ke node berikutnya
  };

  // Membuat node baru
  Node* buatNode(int nilai) {
      Node* baru = new Node();
      baru->data  = nilai;
      baru->next  = NULL;  // Belum ada node berikutnya
      return baru;
  }`,
    },
    {
      heading: "Operasi Insert di Awal (insertAtHead)",
      content: `Menambahkan node baru di posisi paling awal (HEAD) adalah operasi tercepat: O(1).`,
      visual: `  void insertAtHead(Node* &head, int nilai) {
      Node* baru  = buatNode(nilai);
      baru->next  = head;  // Sambungkan ke node HEAD lama
      head        = baru;  // Update HEAD ke node baru
  }

  // Sebelum: HEAD → [25] → [8] → NULL
  // insertAtHead(10)
  // Sesudah: HEAD → [10] → [25] → [8] → NULL`,
    },
    {
      heading: "Traversal Linked List",
      content: `Untuk menelusuri semua node, kita gunakan pointer sementara (\`current\`) yang bergerak dari HEAD ke NULL.`,
      visual: `  void tampilkan(Node* head) {
      Node* current = head;
      while (current != NULL) {
          cout << current->data << " → ";
          current = current->next;  // Maju ke node berikutnya
      }
      cout << "NULL" << endl;
  }`,
    },
  ],
};

// ─── QUIZ KONSEPTUAL ───────────────────────────────────────────────────────

export const quizLinkedList = [
  {
    id: 1,
    question:
      "Setiap node dalam Linked List terdiri dari dua bagian. Apa saja kedua bagian tersebut?",
    options: [
      "Indeks dan Nilai",
      "Data dan Pointer (Next)",
      "Kunci dan Nilai",
      "Front dan Rear",
    ],
    correctIndex: 1,
    explanation:
      "Setiap node linked list memiliki dua bagian: (1) DATA yang menyimpan nilai, dan (2) POINTER (next) yang menyimpan alamat memori node berikutnya.",
  },
  {
    id: 2,
    question:
      "Apa nilai NULL pada bagian `next` sebuah node mengindikasikan?",
    options: [
      "Node tersebut kosong (tidak berisi data)",
      "Node tersebut adalah node pertama (HEAD)",
      "Node tersebut adalah node TERAKHIR dalam linked list",
      "Terjadi error pada memori",
    ],
    correctIndex: 2,
    explanation:
      "NULL pada pointer `next` menandakan bahwa node tersebut adalah node TERAKHIR dalam linked list – tidak ada node lagi setelahnya.",
  },
  {
    id: 3,
    question:
      "Keunggulan utama Linked List dibandingkan Array adalah...",
    options: [
      "Akses elemen lebih cepat (O(1))",
      "Menggunakan memori lebih sedikit",
      "Ukuran bersifat dinamis – bisa bertambah/berkurang saat program berjalan",
      "Lebih mudah diimplementasikan",
    ],
    correctIndex: 2,
    explanation:
      "Keunggulan utama Linked List: ukurannya DINAMIS. Kita bisa menambah atau menghapus node kapan saja tanpa mendefinisikan ukuran di awal, berbeda dengan array yang ukurannya tetap.",
  },
  {
    id: 4,
    question:
      "Pada operasi `insertAtHead()`, urutan langkah yang BENAR adalah...",
    options: [
      "Update HEAD ke node baru, lalu sambungkan next ke HEAD lama",
      "Buat node baru, sambungkan next ke HEAD lama, lalu update HEAD",
      "Cari node terakhir, lalu tambahkan node baru di sana",
      "Hapus HEAD lama, lalu buat node baru sebagai HEAD",
    ],
    correctIndex: 1,
    explanation:
      "Urutan benar: (1) Buat node baru, (2) Sambungkan `baru->next = head` (tunjuk ke HEAD lama), (3) Update `head = baru`. Langkah 2 harus SEBELUM 3, agar tidak kehilangan referensi ke list lama.",
  },
  {
    id: 5,
    question:
      "Dalam traversal Linked List, kondisi berhenti yang benar adalah...",
    options: [
      "current == HEAD",
      "current->data == 0",
      "current == NULL",
      "current->next == HEAD",
    ],
    correctIndex: 2,
    explanation:
      "Traversal berhenti saat `current == NULL`. Artinya pointer `current` telah melewati node terakhir (yang `next`-nya adalah NULL), menandakan seluruh list sudah ditelusuri.",
  },
];

// ─── CODING CHALLENGE ──────────────────────────────────────────────────────

export const codingChallengeLinkedList: CodingChallenge = {
  id: "linked-list-insert-display",
  title: "Implementasi insertAtHead & Tampilkan List",
  description: `Lengkapi fungsi \`insertAtHead()\` dan \`tampilkan()\` pada implementasi Linked List di bawah ini.

**Aturan:**
- \`insertAtHead()\`: buat node baru, sambungkan ke HEAD lama, update HEAD
- \`tampilkan()\`: telusuri dari HEAD sampai NULL, cetak data setiap node

**Output yang diharapkan:**
\`\`\`
30 -> 20 -> 10 -> NULL
\`\`\``,
  starterCode: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

Node* buatNode(int nilai) {
    Node* baru = new Node();
    baru->data = nilai;
    baru->next = NULL;
    return baru;
}

void insertAtHead(Node* &head, int nilai) {
    // Tulis kode Anda di sini
    // 1. Buat node baru
    // 2. Sambungkan next node baru ke HEAD lama
    // 3. Update HEAD ke node baru
    
}

void tampilkan(Node* head) {
    // Tulis kode Anda di sini
    // Gunakan while loop dari head sampai NULL
    // Cetak: data -> data -> ... -> NULL
    
}

int main() {
    Node* head = NULL;
    insertAtHead(head, 10);
    insertAtHead(head, 20);
    insertAtHead(head, 30);
    tampilkan(head);
    return 0;
}`,
  solutionCode: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

Node* buatNode(int nilai) {
    Node* baru = new Node();
    baru->data = nilai;
    baru->next = NULL;
    return baru;
}

void insertAtHead(Node* &head, int nilai) {
    Node* baru = buatNode(nilai); // Buat node baru
    baru->next = head;            // Sambungkan ke HEAD lama
    head = baru;                  // Update HEAD ke node baru
}

void tampilkan(Node* head) {
    Node* current = head;
    while (current != NULL) {
        cout << current->data << " -> ";
        current = current->next; // Maju ke node berikutnya
    }
    cout << "NULL" << endl;
}

int main() {
    Node* head = NULL;
    insertAtHead(head, 10);
    insertAtHead(head, 20);
    insertAtHead(head, 30);
    tampilkan(head);
    return 0;
}`,
  solutionExplanation: `## Penjelasan Solusi – Linked List

### Cara Kerja insertAtHead:
\`\`\`cpp
Node* baru = buatNode(nilai); // Alokasi node baru di memori
baru->next = head;            // Node baru menunjuk ke HEAD lama
head = baru;                  // HEAD sekarang adalah node baru
\`\`\`

### Trace Eksekusi:
| Operasi | List |
|---------|------|
| init | head = NULL |
| insertAtHead(10) | [10] → NULL |
| insertAtHead(20) | [20] → [10] → NULL |
| insertAtHead(30) | [30] → [20] → [10] → NULL |

Karena setiap node baru menjadi HEAD baru, urutan akhir adalah **kebalikan** dari urutan penyisipan!

### Cara Kerja Traversal:
\`\`\`cpp
Node* current = head;  // Mulai dari HEAD
while (current != NULL) {
    cout << current->data;
    current = current->next; // Ikuti pointer ke node berikutnya
}
\`\`\`

> 💡 **Operator \`->\`** digunakan untuk mengakses anggota melalui pointer (setara dengan \`(*current).data\`).`,
  testCases: [
    {
      description: "insertAtHead dan traversal benar",
      expectedOutput: "30 -> 20 -> 10 -> NULL",
      requiredPatterns: [
        /baru->next\s*=\s*head/,
        /head\s*=\s*baru/,
        /current\s*!=\s*NULL/,
        /current\s*=\s*current->next/,
      ],
      topicHint: "linked-list" as const,
    },
  ],
};
