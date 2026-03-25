import { MagicCard, MagicContainer } from "@/components/magicui/magic-card";

export default function GameCard() {
  const materi = [
    { title: "Array", icon: "📦" },
    { title: "Linked List", icon: "🔗" },
    { title: "Stack", icon: "🥞" },
    { title: "Queue", icon: "🚶‍♂️" },
    { title: "Tree", icon: "🌳" },
    { title: "Graph", icon: "🕸️" },
  ];

  return (
    <div className="mx-auto flex max-w-6xl w-full flex-col items-center space-y-4 text-center mt-32 md:mt-20 px-6 sm:px-8">
      <h2 className="font-heading text-4xl leading-[1.1] sm:text-5xl md:text-6xl font-bold bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
        Materi Pembelajaran
      </h2>
      <p className="text-muted-foreground max-w-2xl px-4 lg:mb-6 leading-relaxed sm:text-lg sm:leading-7">
        Pilih topik struktur data yang ingin kamu pelajari 📚
      </p>

      <MagicContainer
        className={
          "grid h-auto w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-20 justify-items-center"
        }
      >
        {materi.map((item, index) => (
          <MagicCard 
            key={index}
            className="group relative flex w-full max-w-sm cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl p-8 sm:p-10 min-h-[220px] shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border bg-background/50 backdrop-blur-sm"
          >
            <div className="pointer-events-none absolute inset-0 h-full w-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.25),rgba(255,255,255,0))] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.35),rgba(255,255,255,0))]" />
            <span className="z-10 text-5xl sm:text-6xl mb-4 transition-transform duration-300 ease-out group-hover:scale-125 group-hover:rotate-[8deg] drop-shadow-sm">
              {item.icon}
            </span>
            <p className="z-10 whitespace-nowrap text-2xl sm:text-3xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-primary dark:text-gray-200">
              {item.title}
            </p>
          </MagicCard>
        ))}
      </MagicContainer>
    </div>
  );
}