import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PROJECTS, type Project } from "@/lib/journey";
import { AnimatedParchment } from "./AnimatedParchment";
import { Candle, WaxSeal } from "./DeskProps";
import { StoneBlock } from "./SceneParts";
import { AmbientParticles } from "./AmbientParticles";
import { CinematicTransition } from "./CinematicTransition";
import { ChapterFooter } from "./ChapterFooter";
import { RoyalButton } from "./RoyalButton";

/** A rolled scroll resting on the shelf until it is called forward. */
function RolledScroll({
  project,
  onOpen,
  index,
}: {
  project: Project;
  onOpen: () => void;
  index: number;
}) {
  return (
    <motion.button
      onClick={onOpen}
      className="group relative flex w-full items-center gap-4 px-3 py-3 text-left focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
      whileHover={{ x: 14 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 + index * 0.08, type: "spring", stiffness: 260, damping: 24 }}
    >
      {/* the rolled parchment cylinder */}
      <span
        className="relative block shrink-0 rounded-full"
        style={{
          width: 92,
          height: 26,
          backgroundImage: "var(--gradient-parchment)",
          boxShadow:
            "inset 0 -6px 12px oklch(0.55 0.08 58 / 0.5), inset 0 4px 6px oklch(1 0 0 / 0.4), 0 8px 18px oklch(0 0 0 / 0.6)",
        }}
        aria-hidden
      >
        <span
          className="absolute top-1/2 left-1/2 h-[34px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-sm"
          style={{ background: "oklch(0.5 0.14 34)" }}
        />
        <span className="absolute -top-1.5 -right-2 h-[34px] w-[9px] rounded-full wood-surface" />
        <span className="absolute -top-1.5 -left-2 h-[34px] w-[9px] rounded-full wood-surface" />
      </span>
      <span>
        <span className="block font-royal text-base tracking-wide text-foreground group-hover:text-primary">
          {project.title}
        </span>
        <span className="block font-script text-sm text-muted-foreground">
          {project.scrollTitle}
        </span>
      </span>
    </motion.button>
  );
}

export function RoyalArchives() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <CinematicTransition variant="corridor">
      <div className="absolute inset-0" style={{ background: "var(--color-night)" }} />
      <StoneBlock className="inset-0" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 60% 40%, oklch(0.72 0.13 62 / 0.18), transparent 72%)",
        }}
      />

      {/* wooden shelving along the back wall */}
      <div className="absolute inset-x-0 top-[12%] hidden h-[54%] md:block" aria-hidden>
        {[0, 1, 2].map((row) => (
          <div key={row} className="relative mb-10 h-24">
            <div className="absolute inset-x-[6%] bottom-0 h-3 wood-surface rounded-sm" />
            <div className="absolute inset-x-[6%] bottom-3 flex items-end gap-2 opacity-60">
              {Array.from({ length: 16 }).map((_, i) => (
                <span
                  key={i}
                  className="rounded-full"
                  style={{
                    width: 10 + ((i * 7) % 9),
                    height: 44 + ((i * 13) % 26),
                    backgroundImage: "var(--gradient-parchment)",
                    filter: `brightness(${0.55 + ((i % 5) * 0.08)})`,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* wooden table */}
      <div className="absolute inset-x-0 bottom-0 h-[18%]" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-5 wood-surface" />
        <div
          className="absolute inset-x-0 top-5 bottom-0"
          style={{ background: "linear-gradient(180deg, oklch(0.22 0.04 44), oklch(0.13 0.03 42))" }}
        />
      </div>
      <Candle className="bottom-[19%] left-[8%]" scale={0.95} />
      <Candle className="bottom-[19%] right-[10%]" scale={0.75} height={38} />

      <div className="relative z-30 mx-auto min-h-svh max-w-6xl px-5 pt-24 pb-40">
        <header className="text-center">
          <p className="font-royal text-[10px] tracking-[0.45em] text-primary/80 uppercase">
            Chapter 04
          </p>
          <h1 className="mt-2 font-royal text-4xl text-foreground text-glow-brass sm:text-5xl">
            The Royal Archives
          </h1>
          <p className="mt-2 font-script text-base text-foreground/70">
            Five scrolls, five campaigns. Unroll one to read its record.
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr]">
          <div
            className="relative rounded-sm border border-primary/20 bg-card/40 p-2 backdrop-blur-[2px]"
            role="list"
          >
            {PROJECTS.map((p, i) => (
              <div role="listitem" key={p.id}>
                <RolledScroll project={p} index={i} onOpen={() => setOpen(p)} />
              </div>
            ))}
          </div>

          <div className="relative min-h-[420px]">
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key={open.id}
                  initial={{ opacity: 0, x: 80, scale: 0.94 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -40, scale: 0.96 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <AnimatedParchment delay={0.15}>
                    <p className="font-royal text-[10px] tracking-[0.35em] text-ink/60 uppercase">
                      {open.scrollTitle}
                    </p>
                    <motion.h2
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="mt-1 font-royal text-3xl text-ink"
                    >
                      {open.title}
                    </motion.h2>
                    <div className="my-4 h-px w-full bg-ink/20" />
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.05 }}
                      className="font-script text-lg text-ink/85"
                    >
                      {open.summary}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="mt-3 font-script text-[17px] leading-relaxed text-ink/75"
                    >
                      {open.detail}
                    </motion.p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {open.tech.map((t, i) => (
                        <motion.span
                          key={t}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.35 + i * 0.08 }}
                          className="border border-ink/30 px-3 py-1 font-royal text-[10px] tracking-[0.18em] text-ink/80 uppercase"
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.7 }}
                      className="mt-7 flex flex-wrap items-center gap-3"
                    >
                      {open.github && (
                        <a href={open.github} target="_blank" rel="noreferrer">
                          <RoyalButton variant="brass">View the Codex</RoyalButton>
                        </a>
                      )}
                      {open.demo && (
                        <a href={open.demo} target="_blank" rel="noreferrer">
                          <RoyalButton variant="stone">Live Demo</RoyalButton>
                        </a>
                      )}
                      <button
                        onClick={() => setOpen(null)}
                        className="font-royal text-[10px] tracking-[0.25em] text-ink/60 uppercase hover:text-ink"
                      >
                        Roll it back
                      </button>
                    </motion.div>
                    <WaxSeal className="right-4 bottom-2" size={54} />
                  </AnimatedParchment>
                </motion.div>
              ) : (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full items-center justify-center text-center font-script text-lg text-foreground/55"
                >
                  Select a scroll from the shelf and it will be carried to the table.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AmbientParticles count={16} seed={19} />
      <ChapterFooter />
    </CinematicTransition>
  );
}
