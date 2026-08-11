import { createFileRoute } from "@tanstack/react-router";
import { RoyalChronicle } from "@/components/royal/RoyalChronicle";

export const Route = createFileRoute("/chronicle")({
  head: () => ({
    meta: [
      { title: "The Royal Chronicle — About Ranjit Chavan" },
      {
        name: "description",
        content:
          "An unrolling parchment telling the story of Ranjit Chavan: CSE student, developer, problem solver and continuous learner.",
      },
      { property: "og:title", content: "The Royal Chronicle — About Ranjit Chavan" },
      {
        property: "og:description",
        content: "The story of a developer, written in ink on royal parchment.",
      },
    ],
  }),
  component: ChroniclePage,
});

function ChroniclePage() {
  return <RoyalChronicle />;
}
