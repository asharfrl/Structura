export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "STRUCTURA",
  description:
    "Sumber Belajar Inovatif Berbasis Web menggunakan Video Series dan Quiz Interaktif dengan Koreksi Kode pada Materi Struktur Data untuk Siswa Kelas X Informatika.",
  /** 4 topik wajib Fase E – Tree dan Graph TIDAK termasuk kurikulum ini */
  topics: [
    { id: "array", title: "Array", icon: "📦", color: "#6366f1" },
    { id: "linked-list", title: "Linked List", icon: "🔗", color: "#ec4899" },
    { id: "stack", title: "Stack", icon: "🥞", color: "#f59e0b" },
    { id: "queue", title: "Queue", icon: "🚶", color: "#10b981" },
  ],
  mainNav: [
    { title: "", href: "/" },
  ],
}
