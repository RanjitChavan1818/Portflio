import { motion } from "motion/react";
import { AnimatedParchment, InkLine } from "./AnimatedParchment";
import { Candle, InkPot, Quill, WaxSeal } from "./DeskProps";
import { Torch } from "./Torch";
import { AmbientParticles } from "./AmbientParticles";
import { StoneBlock } from "./SceneParts";
import { CinematicTransition } from "./CinematicTransition";
import { ChapterFooter } from "./ChapterFooter";

const STORY: { text: string; strong?: boolean }[] = [
  { text: "To the traveller who has crossed the royal gates —", strong: true },
  {
    text: "This chamber belongs to Ranjit Chavan, a Computer Science Engineering student who builds things that work, then rebuilds them until they work well.",
  },
  {
    text: "The chronicle begins with C and the first stubborn bugs, then turns to Python — sharpened daily through DSA practice until HackerRank marked it with five stars.",
  },
  {
    text: "With Django came the discipline of backends: models, APIs, authentication. With React came the craft of interfaces. PostgreSQL taught that data outlives code, so its shape must be chosen with care.",
  },
  {
    text: "Later chapters widened the map — AI/ML experiments, the cloud with Azure, and data engineering with Microsoft Fabric, PySpark and Power BI.",
  },
  {
    text: "A developer, a problem solver, a builder, and above all a continuous learner. The kingdom you are standing in is still under construction — deliberately.",
  },
];

export function RoyalChronicle() {
  return (
    <CinematicTransition variant="doors">
      {/* chamber walls */}
      <div className="absolute inset-0" style={{ background: "var(--color-night)" }} />
      <StoneBlock className="inset-0" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 45%, oklch(0.72 0.13 62 / 0.22), transparent 70%)",
        }}
      />
      {/* arched niches */}
      {[12, 88].map((x) => (
        <div
          key={x}
          aria-hidden
          className="absolute top-[16%] hidden h-[34%] w-[9%] md:block"
          style={{
            left: `${x}%`,
            transform: "translateX(-50%)",
            borderRadius: "50% 50% 0 0 / 40% 40% 0 0",
            background: "linear-gradient(180deg, oklch(0.13 0.02 50), oklch(0.19 0.03 52))",
            boxShadow: "inset 0 0 40px oklch(0 0 0 / 0.8)",
          }}
        />
      ))}
      <Torch className="top-[26%] left-[6%]" scale={0.9} />
      <Torch className="top-[26%] right-[6%]" scale={0.9} flip />

      {/* the desk */}
      <div className="absolute inset-x-0 bottom-0 z-20 h-[26%]">
        <div
          className="absolute inset-x-0 top-0 h-6 wood-surface"
          style={{ boxShadow: "0 -8px 30px oklch(0 0 0 / 0.7)" }}
        />
        <div
          className="absolute inset-x-0 top-6 bottom-0"
          style={{
            background: "linear-gradient(180deg, oklch(0.24 0.045 44), oklch(0.14 0.03 42))",
          }}
        />
        <Candle className="bottom-[68%] left-[10%]" scale={1.1} />
        <Candle className="bottom-[68%] right-[14%]" scale={0.85} height={40} />
        <InkPot className="bottom-[62%] left-[26%] hidden sm:block" />
        <Quill className="bottom-[60%] left-[30%] hidden sm:block" />
        <WaxSeal className="bottom-[62%] right-[26%] hidden sm:block" size={58} />
        {/* stack of old books */}
        <div className="absolute right-[6%] bottom-[62%] hidden sm:block" aria-hidden>
          {["oklch(0.4 0.09 34)", "oklch(0.34 0.06 60)", "oklch(0.3 0.05 120)"].map((c, i) => (
            <div
              key={c}
              style={{
                width: 96 - i * 6,
                height: 13,
                background: c,
                marginTop: 2,
                borderRadius: 2,
                boxShadow: "0 3px 8px oklch(0 0 0 / 0.6)",
              }}
            />
          ))}
        </div>
      </div>

      {/* the parchment */}
      <div className="relative z-30 mx-auto flex min-h-svh max-w-3xl items-center px-5 pt-24 pb-40">
        <motion.div
          initial={{ y: 40, rotateX: 10, opacity: 0 }}
          animate={{ y: 0, rotateX: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <AnimatedParchment delay={0.5}>
            <h1 className="text-center font-royal text-3xl text-ink sm:text-4xl">
              The Royal Chronicle
            </h1>
            <div className="mx-auto mt-3 mb-7 h-px w-40 bg-ink/30" />
            <div className="space-y-4">
              {STORY.map((line, i) => (
                <InkLine
                  key={i}
                  delay={1.6 + i * 0.5}
                  className={
                    line.strong
                      ? "font-royal text-base tracking-wide text-ink sm:text-lg"
                      : "font-script text-[17px] leading-relaxed text-ink/85 sm:text-lg"
                  }
                >
                  {line.text}
                </InkLine>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5.2, duration: 0.8 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-2"
            >
              {["Python", "Django", "React", "PostgreSQL", "DSA", "AI/ML", "Cloud", "Data Engineering"].map(
                (t) => (
                  <span
                    key={t}
                    className="border border-ink/30 px-3 py-1 font-royal text-[10px] tracking-[0.18em] text-ink/80 uppercase"
                  >
                    {t}
                  </span>
                ),
              )}
            </motion.div>
            <p className="mt-8 text-right font-script text-lg text-ink/70 italic">
              — Ranjit Chavan
            </p>
          </AnimatedParchment>
        </motion.div>
      </div>

      <AmbientParticles count={18} seed={11} />
      <ChapterFooter />
    </CinematicTransition>
  );
}
