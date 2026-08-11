import { createFileRoute } from "@tanstack/react-router";
import { TrainingGrounds } from "@/components/royal/TrainingGrounds";

export const Route = createFileRoute("/training-grounds")({
  head: () => ({
    meta: [
      { title: "The Training Grounds — Skills of Ranjit Chavan" },
      {
        name: "description",
        content:
          "Draw a blade from the rack: Python, Django, React, PostgreSQL, Azure, Microsoft Fabric, PySpark, AI/ML and more.",
      },
      { property: "og:title", content: "The Training Grounds — Skills" },
      {
        property: "og:description",
        content: "Every weapon in the rack is a discipline earned through practice.",
      },
    ],
  }),
  component: TrainingGroundsPage,
});

function TrainingGroundsPage() {
  return <TrainingGrounds />;
}
