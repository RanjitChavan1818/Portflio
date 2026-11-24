
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { CHAPTERS, type Chapter } from "@/lib/journey";
import { RoyalButton } from "./RoyalButton";
import kingdomMap from "@/assets/kingdom-map.jpg";

/** Play location selection sound */
function playLocationSound() {
  const audio = new Audio("/sounds/go.mp3");
  audio.volume = 0.5;
  audio.play().catch(() => {
    // Prevent audio errors from affecting map interaction.
  });
}

/** Tiny hand-inked fortress / building glyphs drawn in iron-gall ink. */
function MapBuilding({ kind, lit }: { kind: number; lit: boolean }) {
  const ink = lit ? "oklch(0.4 0.14 32)" : "oklch(0.32 0.06 44)";
  const fill = lit ? "oklch(0.78 0.09 72)" : "oklch(0.72 0.06 74)";
  const common = {
    stroke: ink,
    strokeWidth: 1.6,
    fill,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 44 40" width="42" height="38" aria-hidden className="overflow-visible">
      {kind === 0 && (
        <>
          <path d="M4 36 V16 h6 V10 h6 V16 h8 V10 h6 v6 h6 v20 z" {...common} />
          <path d="M14 36 v-9 a4 4 0 0 1 8 0 v9" fill="none" stroke={ink} strokeWidth="1.4" />
          <path d="M4 16 h36" fill="none" stroke={ink} strokeWidth="1.2" />
        </>
      )}

      {kind === 1 && (
        <>
          <path d="M8 36 V14 l14-9 14 9 v22 z" {...common} />
          <path d="M18 36 V24 h8 v12" fill="none" stroke={ink} strokeWidth="1.4" />
          <path d="M22 5 v-4" stroke={ink} strokeWidth="1.2" />
        </>
      )}

      {kind === 2 && (
        <>
          <path d="M10 36 V12 h24 v24 z" {...common} />
          <path d="M10 12 l12-9 12 9" {...common} />
          <path d="M16 36 v-10 h5 v10 M25 22 h5 v6 h-5 z" fill="none" stroke={ink} strokeWidth="1.3" />
        </>
      )}

      {kind === 3 && (
        <>
          <path d="M12 36 V18 a10 10 0 0 1 20 0 v18 z" {...common} />
          <path d="M18 36 v-10 a4 4 0 0 1 8 0 v10" fill="none" stroke={ink} strokeWidth="1.4" />
          <path d="M22 8 v-6 M18 4 h8" stroke={ink} strokeWidth="1.2" fill="none" />
        </>
      )}

      {kind === 4 && (
        <>
          <path d="M6 36 V20 h8 V12 h16 v8 h8 v16 z" {...common} />
          <path d="M22 12 l-6-7 h12 z" {...common} />
          <path d="M18 36 v-8 h8 v8" fill="none" stroke={ink} strokeWidth="1.4" />
        </>
      )}

      {/* Ink shading hatch */}
      <path
        d="M8 34 l4 -4 M14 34 l5 -5 M22 34 l5 -5 M30 34 l4 -4"
        stroke={ink}
        strokeWidth="0.7"
        opacity="0.5"
        fill="none"
      />
    </svg>
  );
}

/**
 * The commander's parchment: an aged hand-drawn territory with illustrated
 * fortresses, ink routes that draw themselves and candle-lit hover pooling.
 */
export function InteractiveMap({
  selected,
  onSelect,
}: {
  selected: Chapter | null;
  onSelect: (c: Chapter) => void;
}) {
  const [hover, setHover] = useState<string | null>(null);

  const camera = selected
    ? {
        scale: 1.32,
        x: (50 - selected.x) * 0.9,
        y: (50 - selected.y) * 0.7,
      }
    : { scale: 1, x: 0, y: 0 };

  const selectedIndex = selected
    ? CHAPTERS.findIndex((c) => c.to === selected.to)
    : -1;

  return (
    <div
      className="relative w-full select-none"
      style={{
        aspectRatio: "16 / 10",
        filter: "drop-shadow(0 34px 44px oklch(0 0 0 / 0.85))",
      }}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden"
        animate={{
          scale: camera.scale,
          x: `${camera.x}%`,
          y: `${camera.y}%`,
        }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          clipPath:
            "polygon(1% 4%, 8% 1%, 22% 3%, 36% 0.5%, 52% 3%, 68% 0%, 82% 3%, 95% 1%, 99% 6%, 98% 20%, 100% 38%, 98.5% 55%, 100% 72%, 98% 88%, 99% 96%, 88% 99%, 72% 97%, 56% 100%, 40% 97%, 24% 100%, 10% 97%, 2% 99%, 0.5% 84%, 2% 66%, 0% 48%, 1.5% 30%)",
        }}
      >
        <img
          src={kingdomMap}
          alt="Hand-drawn parchment map of the kingdom"
          className="h-full w-full object-cover"
          width={1536}
          height={1024}
          loading="lazy"
        />

        {/* Candle pooling + parchment shading */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{
            background:
              "radial-gradient(ellipse 70% 65% at 38% 34%, transparent 30%, oklch(0.36 0.06 48 / 0.55) 100%)",
          }}
        />

        {/* Ink routes drawn between locations */}
        <svg
          viewBox="0 0 100 62"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden
        >
          {CHAPTERS.slice(0, -1).map((c, i) => {
            const n = CHAPTERS[i + 1]!;
            const lit = selectedIndex >= 0 && i < selectedIndex;
            const midX = (c.x + n.x) / 2 + (i % 2 ? 5 : -5);
            const midY = (((c.y + n.y) / 2) * 0.62) - 5;

            return (
              <motion.path
                key={c.to}
                d={`M${c.x} ${c.y * 0.62} Q ${midX} ${midY} ${n.x} ${n.y * 0.62}`}
                fill="none"
                stroke={lit ? "oklch(0.44 0.17 30)" : "oklch(0.36 0.07 42)"}
                strokeWidth={lit ? 0.75 : 0.4}
                strokeLinecap="round"
                strokeDasharray="1.2 1.7"
                opacity={lit ? 0.95 : 0.45}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.6,
                  delay: 0.2 + i * 0.12,
                  ease: "easeInOut",
                }}
                style={{ filter: "blur(0.12px)" }}
              />
            );
          })}
        </svg>

        {/* Illustrated locations */}
        {CHAPTERS.map((c, i) => {
          const active = selected?.to === c.to;
          const isHover = hover === c.to;

          return (
            <motion.button
              key={c.to}
              onClick={() => {
                playLocationSound();
                onSelect(c);
              }}
              onMouseEnter={() => setHover(c.to)}
              onMouseLeave={() => setHover(null)}
              className="absolute -translate-x-1/2 -translate-y-full focus-visible:outline-none"
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: 1,
                y: active || isHover ? -6 : 0,
                scale: active ? 1.25 : isHover ? 1.12 : 1,
              }}
              transition={{
                delay: 0.25 + i * 0.07,
                type: "spring",
                stiffness: 240,
                damping: 22,
              }}
              aria-label={c.name}
            >
              {/* Warm candlelight pooling under the raised marker */}
              <motion.span
                aria-hidden
                className="absolute top-full left-1/2 -translate-x-1/2 rounded-full"
                animate={{ opacity: active || isHover ? 0.85 : 0 }}
                style={{
                  width: 74,
                  height: 34,
                  marginTop: -10,
                  background:
                    "radial-gradient(ellipse, oklch(0.86 0.15 74 / 0.55), transparent 70%)",
                  filter: "blur(5px)",
                }}
              />

              <span
                aria-hidden
                className="absolute top-full left-1/2 h-2 w-48 -translate-x-1/2 rounded-full"
                style={{
                  background: "oklch(0.3 0.05 44 / 0.35)",
                  filter: "blur(3px)",
                }}
              />

              <MapBuilding kind={i % 5} lit={active || isHover} />

              <span
                className="absolute top-full left-1/2 mt-1 -translate-x-1/2 text-[20px] whitespace-nowrap italic-bold"
                style={{
                  color:
                    active || isHover
                      ? "oklch(0.36 0.16 30)"
                      : "oklch(0.34 0.06 44 / 0.8)",
                  textShadow: "0 1px 0 oklch(0.92 0.05 84 / 0.6)",
                }}
              >
                {c.name}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}

/** Info panel for the selected location, written on a torn parchment slip. */
export function MapLocationCard({ chapter }: { chapter: Chapter }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={chapter.to}
        initial={{ opacity: 0, y: 20, rotate: -1.4 }}
        animate={{ opacity: 1, y: 0, rotate: -0.6 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto flex max-w-lg flex-col items-center gap-3 px-7 py-5 text-center sm:flex-row sm:text-left"
        style={{
          backgroundImage:
            "linear-gradient(150deg, oklch(0.87 0.05 84), oklch(0.79 0.06 74) 60%, oklch(0.71 0.07 68))",
          boxShadow:
            "inset 0 0 34px oklch(0.5 0.09 52 / 0.45), 0 22px 44px -18px oklch(0 0 0 / 0.9)",
          clipPath:
            "polygon(1% 6%, 14% 2%, 34% 5%, 58% 1%, 80% 5%, 99% 3%, 98% 30%, 100% 58%, 98% 82%, 99% 97%, 76% 99%, 52% 96%, 28% 100%, 6% 97%, 1% 78%, 2% 44%, 0% 22%)",
        }}
      >
        <div className="flex-1">
          <p className="font-script text-xs tracking-wide text-[oklch(0.4_0.11_34)] italic">
            Location {String(chapter.n).padStart(2, "0")} · {chapter.subtitle}
          </p>

          <h2 className="mt-1 font-royal text-2xl text-[oklch(0.26_0.05_42)]">
            {chapter.name}
          </h2>
        </div>

        <Link to={chapter.to}>
          <RoyalButton>Travel Here</RoyalButton>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
