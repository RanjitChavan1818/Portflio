import { createFileRoute } from "@tanstack/react-router";
import { NextChapter } from "@/components/royal/NextChapter";

export const Route = createFileRoute("/next-chapter")({
  head: () => ({
    meta: [
      { title: "The Next Chapter — Contact Ranjit Chavan" },
      {
        name: "description",
        content:
          "A royal balcony overlooking the kingdom: email, LinkedIn, GitHub and resume for Ranjit Chavan.",
      },
      { property: "og:title", content: "The Next Chapter — Contact" },
      {
        property: "og:description",
        content: "The journey ends here, but the story does not. Let's build the next chapter together.",
      },
    ],
  }),
  component: NextChapterPage,
});

function NextChapterPage() {
  return <NextChapter />;
}
