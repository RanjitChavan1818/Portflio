import { createFileRoute } from "@tanstack/react-router";
import { MapRoom } from "@/components/royal/MapRoom";

export const Route = createFileRoute("/map-room")({
  head: () => ({
    meta: [
      { title: "The Map Room — Navigate Ranjit Chavan's Kingdom" },
      {
        name: "description",
        content:
          "An interactive ancient parchment map with animated roads linking every chapter of the journey.",
      },
      { property: "og:title", content: "The Map Room" },
      {
        property: "og:description",
        content: "The whole kingdom on one parchment — choose where to travel next.",
      },
    ],
  }),
  component: MapRoomPage,
});

function MapRoomPage() {
  return <MapRoom />;
}
