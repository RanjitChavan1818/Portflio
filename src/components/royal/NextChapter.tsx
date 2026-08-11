import { motion } from "motion/react";
import { PROFILE } from "@/lib/journey";
import { Banner, Fog, MountainRange } from "./SceneParts";
import { Candle } from "./DeskProps";
import { AmbientParticles } from "./AmbientParticles";
import { CinematicTransition } from "./CinematicTransition";
import { ChapterFooter } from "./ChapterFooter";

const LINKS = [
  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { label: "LinkedIn", value: "in/ranjit-chavan", href: PROFILE.linkedin },
  { label: "GitHub", value: "@ranjitchavan", href: PROFILE.github },
  { label: "Resume", value: "Download the scroll", href: PROFILE.resume },
];

export function NextChapter() {
  return (
    <CinematicTransition variant="zoom">
      {/* sunset sky */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-sunset)" }} />
      <motion.div
        aria-hidden
        className="absolute rounded-full"
        animate={{ y: [0, -10, 0], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          left: "50%",
          top: "38%",
          width: 220,
          height: 220,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, oklch(0.97 0.1 88) 0%, oklch(0.85 0.16 68 / 0.55) 42%, transparent 72%)",
        }}
      />

      <MountainRange className="top-[34%] h-[24vh]" tone="oklch(0.4 0.09 44)" />
      <MountainRange className="top-[42%] h-[22vh]" tone="oklch(0.3 0.07 38)" variant={1} />

      {/* distant fort silhouette */}
      <svg
        viewBox="0 0 300 120"
        className="absolute top-[46%] left-[22%] w-40 opacity-80 sm:w-56"
        aria-hidden
      >
        <path
          d="M0 120 V60 h20 V44 h16 V60 h30 V32 h20 V60 h40 V22 h24 V60 h40 V40 h18 V60 h32 V50 h20 V120 Z"
          fill="oklch(0.22 0.05 36)"
        />
      </svg>

      <Fog className="inset-x-0 top-[46%] h-[36%]" opacity={0.6} />

      {/* the balcony */}
      <div className="absolute inset-x-0 bottom-0 h-[34%]" aria-hidden>
        {/* balustrade */}
        <div className="absolute inset-x-0 top-0 flex justify-around px-6">
          {Array.from({ length: 26 }).map((_, i) => (
            <span
              key={i}
              style={{
                width: 14,
                height: 62,
                background:
                  "linear-gradient(90deg, oklch(0.44 0.02 62), oklch(0.62 0.03 70) 40%, oklch(0.36 0.02 58))",
                clipPath: "polygon(20% 0, 80% 0, 100% 30%, 62% 50%, 100% 70%, 80% 100%, 20% 100%, 0 70%, 38% 50%, 0 30%)",
              }}
            />
          ))}
        </div>
        <div
          className="absolute inset-x-0 top-0 h-4"
          style={{ background: "linear-gradient(180deg, oklch(0.66 0.03 70), oklch(0.45 0.02 62))" }}
        />
        <div
          className="absolute inset-x-0 top-[62px] bottom-0"
          style={{ background: "linear-gradient(180deg, oklch(0.34 0.02 60), oklch(0.18 0.02 55))" }}
        />
        <Candle className="bottom-[18%] left-[10%]" scale={0.95} />
        <Candle className="bottom-[18%] right-[12%]" scale={0.8} height={40} />
      </div>

      <Banner className="top-[10%] left-[10%]" height={190} />
      <Banner className="top-[10%] right-[10%]" height={190} delay={1.1} color="oklch(0.56 0.15 48)" />

      <div className="relative z-30 mx-auto flex min-h-svh max-w-3xl flex-col items-center justify-center px-5 pt-24 pb-44 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-royal text-[10px] tracking-[0.45em] text-[oklch(0.25_0.06_40)] uppercase"
        >
          Chapter 08
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="mt-2 font-royal text-5xl text-foreground text-glow-brass sm:text-6xl"
        >
          The Next Chapter
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="mt-4 font-script text-xl text-foreground/85"
        >
          The journey ends here, but the story does not.
          <br />
          Let&apos;s build the next chapter together.
        </motion.p>

        <div className="mt-10 grid w-full gap-3 sm:grid-cols-2">
          {LINKS.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative block px-6 py-4 text-left"
              style={{
                backgroundImage: "var(--gradient-brass)",
                boxShadow: "var(--shadow-plaque)",
                clipPath:
                  "polygon(14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px), 0 14px)",
              }}
            >
              <span className="block font-royal text-[10px] tracking-[0.3em] text-[oklch(0.3_0.06_44)] uppercase">
                {l.label}
              </span>
              <span className="mt-1 block font-script text-lg text-[oklch(0.24_0.05_46)]">
                {l.value}
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      <AmbientParticles count={24} seed={53} color="var(--color-brass-light)" />
      <ChapterFooter />
    </CinematicTransition>
  );
}
