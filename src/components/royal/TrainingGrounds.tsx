import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SKILLS, type Skill } from "@/lib/journey";
import { Sword, StrikeSpark } from "./AnimatedSword";
import { SkillPlaque } from "./SkillPlaque";
import { Banner, Fog, MountainRange, StoneBlock } from "./SceneParts";
import { Torch } from "./Torch";
import { AmbientParticles } from "./AmbientParticles";
import { CinematicTransition } from "./CinematicTransition";
import { ChapterFooter } from "./ChapterFooter";

export function TrainingGrounds() {
  const [active, setActive] = useState<Skill | null>(null);
  const [strike, setStrike] = useState(0);

  const select = (s: Skill) => {
    if (active?.name === s.name) return;
    setActive(s);
    setStrike((n) => n + 1);
    window.dispatchEvent(new CustomEvent("kingdom:sword-draw", { detail: s.name }));
  };

  return (
    <CinematicTransition variant="corridor">
      {/* sky + mountains */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-sunset)", opacity: 0.9 }} />
      <MountainRange className="top-[16%] h-[26vh]" tone="oklch(0.3 0.05 285)" />
      <MountainRange className="top-[26%] h-[22vh]" tone="oklch(0.24 0.04 280)" variant={1} />

      {/* courtyard walls */}
      <StoneBlock className="inset-x-0 top-[40%] h-[16%]" />
      <div className="absolute inset-x-0 top-[38%] flex justify-around" aria-hidden>
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            style={{
              width: 30,
              height: 22,
              clipPath: "polygon(0 100%, 0 30%, 50% 0, 100% 30%, 100% 100%)",
              backgroundImage: "var(--gradient-stone)",
            }}
          />
        ))}
      </div>
      <Banner className="top-[42%] left-[8%]" height={120} delay={0.3} />
      <Banner className="top-[42%] right-[8%]" height={120} delay={1.4} color="oklch(0.55 0.14 52)" />
      <Torch className="top-[50%] left-[20%]" scale={0.75} />
      <Torch className="top-[50%] right-[20%]" scale={0.75} flip />

      {/* courtyard floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-[44%]"
        style={{
          background: "linear-gradient(180deg, oklch(0.34 0.02 62), oklch(0.2 0.018 55))",
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 46px, oklch(0.15 0.01 50 / 0.5) 46px 49px), repeating-linear-gradient(90deg, transparent 0 90px, oklch(0.15 0.01 50 / 0.4) 90px 93px)",
          transform: "perspective(600px) rotateX(32deg)",
          transformOrigin: "top center",
        }}
        aria-hidden
      />
      <Fog className="inset-x-0 bottom-0 h-[30%]" opacity={0.4} />

      {/* ── content ── */}
      <div className="relative z-30 mx-auto flex min-h-svh max-w-6xl flex-col px-5 pt-24 pb-40">
        <header className="text-center">
          <p className="font-royal text-[10px] tracking-[0.45em] text-primary/80 uppercase">
            Chapter 03
          </p>
          <h1 className="mt-2 font-royal text-4xl text-foreground text-glow-brass sm:text-5xl">
            The Training Grounds
          </h1>
          <p className="mt-2 font-script text-base text-foreground/70">
            Draw a blade from the rack — every weapon is a discipline earned.
          </p>
        </header>

        <div className="mt-10 grid flex-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* the weapons rack */}
          <div
            className="relative rounded-md p-4"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.18 0.02 50 / 0.92), oklch(0.12 0.015 45 / 0.95))",
              border: "1px solid oklch(0.45 0.08 62 / 0.45)",
              boxShadow: "0 24px 60px oklch(0 0 0 / 0.6), inset 0 0 40px oklch(0 0 0 / 0.5)",
            }}
          >
            <div
              className="wood-surface absolute inset-x-3 top-2 h-3 rounded-sm"
              aria-hidden
              style={{ boxShadow: "0 6px 16px oklch(0 0 0 / 0.6)" }}
            />
            <div
              className="wood-surface absolute inset-x-3 bottom-2 h-4 rounded-sm"
              aria-hidden
              style={{ boxShadow: "0 8px 20px oklch(0 0 0 / 0.6)" }}
            />
            <ul className="grid grid-cols-4 gap-x-1 gap-y-3 px-1 py-6">
              {SKILLS.map((s) => {
                const isActive = active?.name === s.name;
                return (
                  <li key={s.name} className="flex flex-col items-center">
                    <motion.button
                      onClick={() => select(s)}
                      aria-pressed={isActive}
                      className="group flex w-full flex-col items-center rounded-sm px-1 py-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                      whileHover={{ y: -6 }}
                      whileTap={{ scale: 0.94 }}
                      animate={isActive ? { opacity: 0.25, y: -4 } : { opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    >
                      <Sword width={16} />
                      <span className="mt-1 max-w-[9ch] text-center font-royal text-[9px] leading-tight tracking-wider text-foreground/75 uppercase group-hover:text-primary">
                        {s.name}
                      </span>
                    </motion.button>
                  </li>
                );
              })}
            </ul>
          </div>


          {/* centre stage */}
          <div className="relative flex min-h-[380px] flex-col items-center justify-center">
            <div className="relative flex h-[240px] items-center justify-center">
              <StrikeSpark show={strike > 0} key={strike} />
              <AnimatePresence mode="wait">
                {active ? (
                  <motion.div
                    key={active.name}
                    initial={{ x: -220, y: 60, rotate: -70, opacity: 0 }}
                    animate={{
                      x: 0,
                      y: [60, -18, 0],
                      rotate: [-70, 8, 0],
                      opacity: 1,
                    }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute"
                  >
                    <motion.div
                      animate={{ rotate: [0, -1.2, 1.2, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Sword width={34} glow />
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.p
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="max-w-xs text-center font-script text-lg text-foreground/60"
                  >
                    The rack stands ready. Choose a blade and it will be drawn into the courtyard.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* training target behind the stage */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-4 right-4 opacity-70 hidden sm:block"
            >
              <div className="h-24 w-24 rounded-full border-4 border-[oklch(0.5_0.13_38)]">
                <div className="m-3 h-[72px] w-[72px] rounded-full border-4 border-parchment/70">
                  <div className="m-3 h-9 w-9 rounded-full bg-[oklch(0.5_0.13_38)]" />
                </div>
              </div>
            </div>

            <div className="mt-4 flex w-full justify-center">
              <AnimatePresence mode="wait">
                {active && <SkillPlaque skill={active} />}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <AmbientParticles count={20} seed={5} color="var(--color-parchment)" />
      <ChapterFooter />
    </CinematicTransition>
  );
}
