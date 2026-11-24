import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { InteractiveMap, MapLocationCard } from "./InteractiveMap";
import type { Chapter } from "@/lib/journey";
import { Candle } from "./DeskProps";
import { StoneBlock } from "./SceneParts";
import { Torch } from "./Torch";
import { AmbientParticles } from "./AmbientParticles";
import { CinematicTransition } from "./CinematicTransition";
import { ChapterFooter } from "./ChapterFooter";

export function MapRoom() {
  const [selected, setSelected] = useState<Chapter | null>(null);
  const navigate = useNavigate();

  const handleSelect = (chapter: Chapter) => {
    setSelected(chapter);
    navigate({ to: chapter.to });
  };

  return (
    <CinematicTransition variant="zoom">
      <div className="absolute inset-0" style={{ background: "var(--color-night)" }} />
      <StoneBlock className="inset-0" />
      <Torch className="top-[22%] left-[7%]" scale={0.8} />
      <Torch className="top-[22%] right-[7%]" scale={0.8} flip />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 50% 62%, oklch(0.75 0.13 66 / 0.22), transparent 72%)",
        }}
      />

      <div className="relative z-30 mx-auto min-h-svh max-w-5xl px-5 pt-24 pb-40">
        <header className="text-center">
          <p className="font-royal text-[17px] tracking-[0.4em] text-primary/80 uppercase">
            Chapter 07
          </p>
          <h1 className="mt-2 font-royal text-4xl text-foreground text-glow-brass sm:text-5xl">
            The Map Room
          </h1>
          <p className="mt-2 font-script text-lg text-foreground/70">
            The whole kingdom on one parchment. Choose where to travel next.
          </p>
        </header>

        {/* the strategy table */}
        <div className="relative mt-10">
          <div
            className="relative p-3 sm:p-5"
            style={{
              backgroundImage: "var(--gradient-wood)",
              boxShadow: "0 30px 70px -22px oklch(0 0 0 / 0.9), inset 0 0 40px oklch(0 0 0 / 0.5)",
            }}
          >
            <InteractiveMap selected={selected} onSelect={handleSelect} />
            <Candle className="-top-14 left-4 hidden sm:block" scale={0.7} height={34} />
            <Candle className="-top-12 right-6 hidden sm:block" scale={0.6} height={30} />
          </div>
          <div
            aria-hidden
            className="mx-auto h-6 w-[92%]"
            style={{
              background: "linear-gradient(180deg, oklch(0.22 0.04 44), oklch(0.13 0.03 42))",
            }}
          />
        </div>

        <div className="mt-8 min-h-[72px]">
          {selected ? (
            <MapLocationCard chapter={selected} />
          ) : (
            <p className="text-center font-script text-lg text-foreground/55">
              Tap a fort marker to light its road and read the location.
            </p>
          )}
        </div>
      </div>

      <AmbientParticles count={14} seed={41} />
      <ChapterFooter />
    </CinematicTransition>
  );
}
