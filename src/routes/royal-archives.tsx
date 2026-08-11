import { createFileRoute } from "@tanstack/react-router";
import { RoyalArchives } from "@/components/royal/RoyalArchives";

export const Route = createFileRoute("/royal-archives")({
  head: () => ({
    meta: [
      { title: "The Royal Archives — Projects by Ranjit Chavan" },
      {
        name: "description",
        content:
          "Unroll the scrolls of Divyadarshan, PustakMart, Algosys, LearNex and the Hackathon Registration Website.",
      },
      { property: "og:title", content: "The Royal Archives — Projects" },
      {
        property: "og:description",
        content: "Five scrolls, five campaigns — the built works of Ranjit Chavan.",
      },
    ],
  }),
  component: ArchivesPage,
});

function ArchivesPage() {
  return <RoyalArchives />;
}
