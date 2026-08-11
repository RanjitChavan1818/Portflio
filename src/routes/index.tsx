import { createFileRoute } from "@tanstack/react-router";
import { RoyalGate } from "@/components/royal/RoyalGate";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Royal Gate — Ranjit Chavan's Kingdom of Code" },
      {
        name: "description",
        content:
          "Enter a cinematic journey through Ranjit Chavan's fictional Indian fort — an interactive portfolio of code, projects and ambition.",
      },
      { property: "og:title", content: "The Royal Gate — Ranjit Chavan" },
      {
        property: "og:description",
        content: "Beyond these gates lies a journey of ideas, code & ambition.",
      },
    ],
  }),
  component: GatePage,
});

function GatePage() {
  return <RoyalGate />;
}
