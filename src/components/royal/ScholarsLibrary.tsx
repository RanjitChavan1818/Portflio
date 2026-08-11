import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { BOOKS, type BookChapter } from "@/lib/journey";
import { AnimatedBook, BookSpine } from "./AnimatedBook";
import { Candle } from "./DeskProps";
import { StoneBlock } from "./SceneParts";
import { AmbientParticles } from "./AmbientParticles";
import { CinematicTransition } from "./CinematicTransition";
import { ChapterFooter } from "./ChapterFooter";

export function ScholarsLibrary() {
  const [open, setOpen] = useState<BookChapter | null>(null);

  return (
    <CinematicTransition variant="unfold">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, oklch(0.17 0.03 60), oklch(0.24 0.05 52))" }}
      />
      <StoneBlock className="inset-0" />

      {/* stone arches with warm sunlight */}
      {[22, 50, 78].map((x, i) => (
        <div
          key={x}
          aria-hidden
          className="absolute top-[8%] h-[38%] w-[16%]"
          style={{ left: `${x}%`, transform: "translateX(-50%)" }}
        >
          <div
            className="h-full w-full"
            style={{
              borderRadius: "50% 50% 0 0 / 46% 46% 0 0",
              background:
                "linear-gradient(180deg, oklch(0.85 0.13 84 / 0.5), oklch(0.6 0.12 62 / 0.14) 60%, transparent)",
              filter: "blur(1px)",
            }}
          />
          <div
            className="absolute top-full left-1/2 h-[70vh] w-[70%] -translate-x-1/2 opacity-45"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.88 0.13 82 / 0.35), transparent 72%)",
              clipPath: "polygon(20% 0, 80% 0, 118% 100%, -18% 100%)",
              filter: "blur(6px)",
              animationDelay: `${i}s`,
            }}
          />
        </div>
      ))}

      <div className="relative z-30 mx-auto min-h-svh max-w-6xl px-5 pt-24 pb-40">
        <header className="text-center">
          <p className="font-royal text-[10px] tracking-[0.45em] text-primary/80 uppercase">
            Chapter 06
          </p>
          <h1 className="mt-2 font-royal text-4xl text-foreground text-glow-brass sm:text-5xl">
            The Scholar's Library
          </h1>
          <p className="mt-2 font-script text-base text-foreground/70">
            Five volumes of learning. Pull one from the shelf and turn its pages.
          </p>
        </header>

        {/* the shelf */}
        <div className="relative mx-auto mt-14 max-w-2xl">
          <div className="flex items-end justify-center gap-3">
            {BOOKS.map((b, i) => (
              <BookSpine
                key={b.n}
                book={b}
                index={i}
                hidden={open?.n === b.n}
                onOpen={() => setOpen(b)}
              />
            ))}
          </div>
          <div
            className="mt-1 h-4 w-full wood-surface rounded-sm"
            aria-hidden
            style={{ boxShadow: "0 12px 26px oklch(0 0 0 / 0.7)" }}
          />
          <Candle className="-top-16 -left-10 hidden sm:block" scale={0.8} height={38} />
          <Candle className="-top-14 -right-8 hidden sm:block" scale={0.68} height={32} />
        </div>

        {/* reading table */}
        <div className="mt-14 flex justify-center" style={{ perspective: 1600 }}>
          <div className="w-full max-w-3xl">
            <AnimatePresence mode="wait">
              {open ? (
                <AnimatedBook key={open.n} book={open} onClose={() => setOpen(null)} />
              ) : (
                <p className="py-10 text-center font-script text-lg text-foreground/55">
                  The reading table is empty. Choose a volume from the shelf above.
                </p>
              )}
            </AnimatePresence>
            <div
              className="mt-4 h-6 w-full wood-surface rounded-sm"
              aria-hidden
              style={{ boxShadow: "0 16px 34px oklch(0 0 0 / 0.7)" }}
            />
          </div>
        </div>
      </div>

      <AmbientParticles count={26} seed={31} color="var(--color-parchment)" />
      <ChapterFooter />
    </CinematicTransition>
  );
}
