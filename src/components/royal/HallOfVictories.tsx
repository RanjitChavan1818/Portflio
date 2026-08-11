import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { VICTORIES, type Victory } from "@/lib/journey";
import { Torch } from "./Torch";
import { Banner, StoneBlock } from "./SceneParts";
import { AmbientParticles } from "./AmbientParticles";
import { CinematicTransition } from "./CinematicTransition";
import { ChapterFooter } from "./ChapterFooter";

function TrophyShape({ kind }: { kind: Victory["kind"] }) {
  if (kind === "medal") {
    return (
      <svg viewBox="0 0 80 110" width="72" aria-hidden>
        <path d="M28 4 L40 44 L52 4" stroke="oklch(0.5 0.14 34)" strokeWidth="10" fill="none" />
        <circle cx="40" cy="72" r="30" fill="url(#brassg)" />
        <circle cx="40" cy="72" r="21" fill="none" stroke="oklch(0.4 0.07 52)" strokeWidth="2" />
        <path
          d="M40 56 L45 68 L58 69 L48 77 L51 90 L40 82 L29 90 L32 77 L22 69 L35 68 Z"
          fill="oklch(0.42 0.08 52)"
        />
        <defs>
          <linearGradient id="brassg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.92 0.1 94)" />
            <stop offset="60%" stopColor="oklch(0.74 0.13 78)" />
            <stop offset="100%" stopColor="oklch(0.5 0.1 60)" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  if (kind === "seal") {
    return (
      <svg viewBox="0 0 100 110" width="72" aria-hidden>
        <path
          d="M50 8 C64 12 78 8 84 20 C96 26 96 42 92 54 C98 66 90 80 80 86 C76 98 60 102 50 98 C40 102 24 98 20 86 C10 80 2 66 8 54 C4 42 4 26 16 20 C22 8 36 12 50 8 Z"
          fill="oklch(0.5 0.16 32)"
        />
        <circle cx="50" cy="55" r="26" fill="none" stroke="oklch(0.85 0.11 88)" strokeWidth="2.5" />
        <path
          d="M50 34 C58 46 70 50 82 50 C70 56 60 66 50 78 C40 66 30 56 18 50 C30 50 42 46 50 34 Z"
          fill="oklch(0.82 0.11 86)"
          opacity="0.9"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 90 120" width="76" aria-hidden>
      <defs>
        <linearGradient id="tg" x1="0" x2="1">
          <stop offset="0%" stopColor="oklch(0.93 0.1 94)" />
          <stop offset="55%" stopColor="oklch(0.75 0.13 78)" />
          <stop offset="100%" stopColor="oklch(0.48 0.1 58)" />
        </linearGradient>
      </defs>
      <path d="M22 12 H68 V38 C68 58 58 68 45 68 C32 68 22 58 22 38 Z" fill="url(#tg)" />
      <path d="M22 20 C8 20 6 42 22 46" stroke="url(#tg)" strokeWidth="6" fill="none" />
      <path d="M68 20 C82 20 84 42 68 46" stroke="url(#tg)" strokeWidth="6" fill="none" />
      <rect x="40" y="68" width="10" height="20" fill="url(#tg)" />
      <rect x="26" y="88" width="38" height="10" rx="2" fill="url(#tg)" />
      <rect x="20" y="98" width="50" height="12" rx="2" fill="oklch(0.32 0.05 44)" />
      <path d="M34 24 L45 30 L56 24" stroke="oklch(0.42 0.08 52)" strokeWidth="3" fill="none" />
    </svg>
  );
}

function Pedestal({
  victory,
  active,
  onSelect,
  index,
}: {
  victory: Victory;
  active: boolean;
  onSelect: () => void;
  index: number;
}) {
  return (
    <motion.button
      onClick={onSelect}
      aria-pressed={active}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.07 }}
      className="group relative flex flex-col items-center focus-visible:outline-none"
    >
      {/* light shaft */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -top-24 h-56 w-28"
        animate={{ opacity: active ? 0.75 : 0.14 }}
        transition={{ duration: 0.5 }}
        style={{
          background:
            "linear-gradient(180deg, oklch(0.9 0.14 82 / 0.55), transparent 78%)",
          clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)",
          filter: "blur(6px)",
        }}
      />
      <motion.div
        animate={
          active
            ? { y: -22, rotateY: 360, filter: "drop-shadow(0 0 26px oklch(0.86 0.15 80 / 0.9))" }
            : { y: 0, rotateY: 0, filter: "drop-shadow(0 6px 12px oklch(0 0 0 / 0.6))" }
        }
        whileHover={{ y: -10 }}
        transition={{ duration: active ? 1.2 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <TrophyShape kind={victory.kind} />
      </motion.div>
      {/* stone pedestal */}
      <div
        className="mt-2 h-16 w-24"
        aria-hidden
        style={{
          backgroundImage: "var(--gradient-stone)",
          clipPath: "polygon(12% 0, 88% 0, 100% 100%, 0 100%)",
          boxShadow: "var(--shadow-carved)",
        }}
      />
      <span className="mt-2 max-w-[18ch] text-center font-royal text-[10px] tracking-[0.2em] text-foreground/70 uppercase group-hover:text-primary">
        {victory.year}
      </span>
    </motion.button>
  );
}

export function HallOfVictories() {
  const [active, setActive] = useState<Victory | null>(null);

  return (
    <CinematicTransition variant="corridor">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, oklch(0.15 0.03 55), oklch(0.22 0.05 45))" }}
      />
      {/* tall pillars */}
      {[6, 26, 74, 94].map((x, i) => (
        <div
          key={x}
          className="absolute top-0 h-[76%] w-[6%]"
          style={{ left: `${x}%`, transform: "translateX(-50%)" }}
          aria-hidden
        >
          <StoneBlock className="inset-0" />
          <div
            className="absolute -inset-x-2 top-0 h-8"
            style={{ backgroundImage: "var(--gradient-brass)", filter: "brightness(0.75)" }}
          />
          <div
            className="absolute -inset-x-3 bottom-0 h-6"
            style={{ backgroundImage: "var(--gradient-brass)", filter: "brightness(0.6)" }}
          />
          <Banner
            className="top-10 left-1/2 -translate-x-1/2"
            height={150}
            delay={i * 0.7}
            color={i % 2 ? "oklch(0.55 0.14 52)" : "var(--color-terracotta)"}
          />
        </div>
      ))}
      <Torch className="top-[30%] left-[38%]" scale={0.7} />
      <Torch className="top-[30%] right-[38%]" scale={0.7} flip />

      {/* polished stone floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-[30%]"
        aria-hidden
        style={{
          background: "linear-gradient(180deg, oklch(0.3 0.03 52), oklch(0.16 0.02 48))",
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 84px, oklch(0.6 0.06 70 / 0.12) 84px 86px)",
        }}
      />

      <div className="relative z-30 mx-auto min-h-svh max-w-6xl px-5 pt-24 pb-40">
        <header className="text-center">
          <p className="font-royal text-[10px] tracking-[0.45em] text-primary/80 uppercase">
            Chapter 05
          </p>
          <h1 className="mt-2 font-royal text-4xl text-foreground text-glow-brass sm:text-5xl">
            Hall of Victories
          </h1>
          <p className="mt-2 font-script text-base text-foreground/70">
            Approach a trophy and the hall will light it for you.
          </p>
        </header>

        <div className="mt-14 flex flex-wrap items-end justify-center gap-8 sm:gap-12">
          {VICTORIES.map((v, i) => (
            <Pedestal
              key={v.id}
              victory={v}
              index={i}
              active={active?.id === v.id}
              onSelect={() => setActive(active?.id === v.id ? null : v)}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 22, rotateX: -12 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-xl px-8 py-6 text-center"
                style={{
                  backgroundImage: "var(--gradient-brass)",
                  boxShadow: "var(--shadow-plaque)",
                  clipPath:
                    "polygon(18px 0, calc(100% - 18px) 0, 100% 18px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0 calc(100% - 18px), 0 18px)",
                }}
              >
                <h2 className="font-royal text-xl tracking-[0.1em] text-[oklch(0.24_0.05_48)] uppercase">
                  {active.title}
                </h2>
                <div className="mx-auto my-3 h-px w-28 bg-[oklch(0.3_0.05_46)]/40" />
                <p className="font-script text-lg text-[oklch(0.26_0.05_46)]">{active.detail}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AmbientParticles count={18} seed={23} />
      <ChapterFooter />
    </CinematicTransition>
  );
}
