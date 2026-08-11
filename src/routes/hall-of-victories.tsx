import { createFileRoute } from "@tanstack/react-router";
import { HallOfVictories } from "@/components/royal/HallOfVictories";

export const Route = createFileRoute("/hall-of-victories")({
  head: () => ({
    meta: [
      { title: "Hall of Victories — Achievements of Ranjit Chavan" },
      {
        name: "description",
        content:
          "Sinhgad Hackathon winner, Sinhgad Carnival, HackerRank Python 5-star, CodeChef and Microsoft Fabric DP-700.",
      },
      { property: "og:title", content: "Hall of Victories — Achievements" },
      {
        property: "og:description",
        content: "Trophies, medals and royal seals earned along the journey.",
      },
    ],
  }),
  component: HallPage,
});

function HallPage() {
  return <HallOfVictories />;
}
