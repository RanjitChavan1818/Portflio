import { Link, useRouterState } from "@tanstack/react-router";
import { nextChapter, prevChapter } from "@/lib/journey";

/**
 * Persistent wayfinding: where you are, forward, back, and the map.
 */
export function ChapterFooter() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const next = nextChapter(pathname);
  const prev = prevChapter(pathname);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 flex items-end justify-between gap-4 p-5 sm:p-7">
      <Link
        to={prev.to}
        className="pointer-events-auto font-royal text-[10px] tracking-[0.25em] text-foreground/55 uppercase transition-colors hover:text-primary"
      >
        ← {prev.name}
      </Link>

      <Link
        to="/map-room"
        className="pointer-events-auto hidden font-royal text-[10px] tracking-[0.25em] text-foreground/45 uppercase transition-colors hover:text-primary sm:block"
      >
        Open the Map
      </Link>

      <Link
        to={next.to}
        className="group pointer-events-auto flex items-center gap-2 border border-primary/40 bg-background/60 px-4 py-2 backdrop-blur-sm transition-colors hover:border-primary hover:bg-primary/10"
      >
        <span className="font-royal text-[10px] tracking-[0.25em] text-primary uppercase">
          Continue Journey
        </span>
        <span className="font-script text-sm text-foreground/70">{next.name} →</span>
      </Link>
    </div>
  );
}
