import { createFileRoute } from "@tanstack/react-router";
import { ScholarsLibrary } from "@/components/royal/ScholarsLibrary";

export const Route = createFileRoute("/scholars-library")({
  head: () => ({
    meta: [
      { title: "The Scholar's Library — Education & Learning Journey" },
      {
        name: "description",
        content:
          "Five volumes from 2023 to 2027 charting Ranjit Chavan's education, from C fundamentals to data engineering and AI/ML.",
      },
      { property: "og:title", content: "The Scholar's Library — Learning Journey" },
      {
        property: "og:description",
        content: "Physical books that open and turn, one per year of the journey.",
      },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  return <ScholarsLibrary />;
}
