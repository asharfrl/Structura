"use client";

import { usePathname } from "next/navigation";
import ScrollingTimeline from "@/components/magicui/scrolling-timeline";
import GameCard from "@/app/game-card/page";

export function DashboardLayoutElements() {
  const pathname = usePathname();
  
  // Only render on the root page (dashboard)
  if (pathname !== "/") {
    return null;
  }

  return (
    <>
      <ScrollingTimeline />
      <GameCard />
    </>
  );
}
