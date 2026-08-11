import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { CHAPTERS, type Chapter } from "@/lib/journey";
import { RoyalButton } from "./RoyalButton";

/**
 * A real interactive parchment map: SVG terrain, animated dotted roads,
 * fort markers, compass rose and wax seals. Selecting a location moves the
 * camera (viewBox transform) toward it.
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
        scale: 1.5,
        x: (50 - selected.x) * 1.5,
        y: (50 - selected.y) * 1.5,
      }
    : { scale: 1, x: 0, y: 0 };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: "16 / 10",
        backgroundImage: "var(--gradient-parchment)",
        boxShadow: "inset 0 0 80px oklch(0.5 0.09 52 / 0.55), 0 30px 70px -24px oklch(0 0 0 / 0.9)",
      }}
    >
      {/* parchment grain + stains */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 15% 20%, oklch(0.6 0.1 52 / 0.3), transparent 42%), radial-gradient(ellipse at 85% 78%, oklch(0.58 0.1 46 / 0.35), transparent 45%)",
        }}
      />

      <motion.div
        className="absolute inset-0"
        animate={{ scale: camera.scale, x: `${camera.x}%`, y: `${camera.y}%` }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg viewBox="0 0 100 62" className="absolute inset-0 h-full w-full" role="img" aria-label="Map of the kingdom">
          {/* rivers */}
          <path
            d="M2 40 C18 34 22 48 36 44 C50 40 56 52 72 46 C86 41 92 50 99 46"
            stroke="oklch(0.55 0.07 230 / 0.5)"
            strokeWidth="1.1"
            fill="none"
          />
          {/* mountains */}
          {[
            [10, 18],
            [20, 14],
            [33, 20],
            [46, 12],
            [58, 22],
            [70, 12],
            [82, 20],
            [92, 14],
          ].map(([x, y], i) => (
            <path
              key={i}
              d={`M${(x as number) - 5} ${y as number} l5 -6 l5 6 z`}
              fill="none"
              stroke="oklch(0.42 0.06 46 / 0.8)"
              strokeWidth="0.6"
            />
          ))}
          {/* forests */}
          {[
            [16, 52],
            [22, 55],
            [38, 56],
            [66, 55],
            [88, 52],
          ].map(([x, y], i) => (
            <g key={i} stroke="oklch(0.45 0.06 140 / 0.7)" strokeWidth="0.5" fill="none">
              <path d={`M${x} ${y} l0 -3`} />
              <path d={`M${(x as number) - 1.6} ${y} l1.6 -3.4 l1.6 3.4 z`} />
            </g>
          ))}

          {/* animated dotted roads between chapters */}
          {CHAPTERS.slice(0, -1).map((c, i) => {
            const n = CHAPTERS[i + 1]!;
            const lit = selected?.n === c.n || selected?.n === n.n;
            const midX = (c.x + n.x) / 2 + (i % 2 ? 4 : -4);
            const midY = (c.y + n.y) / 2 * 0.62 - 4;
            return (
              <motion.path
                key={c.to}
                d={`M${c.x} ${c.y * 0.62} Q ${midX} ${midY} ${n.x} ${n.y * 0.62}`}
                fill="none"
                stroke={lit ? "oklch(0.6 0.18 42)" : "oklch(0.35 0.06 44 / 0.65)"}
                strokeWidth={lit ? 0.9 : 0.5}
                strokeDasharray="1.6 1.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, strokeDashoffset: [0, -12] }}
                transition={{
                  pathLength: { duration: 1.4, delay: 0.2 + i * 0.15 },
                  strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" },
                }}
              />
            );
          })}
        </svg>

        {/* location markers */}
        {CHAPTERS.map((c, i) => {
          const active = selected?.n === c.n;
          return (
            <motion.button
              key={c.to}
              onClick={() => onSelect(c)}
              onMouseEnter={() => setHover(c.to)}
              onMouseLeave={() => setHover(null)}
              className="absolute -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none"
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: active ? 1.55 : 1 }}
              whileHover={{ scale: active ? 1.6 : 1.25 }}
              transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 260, damping: 20 }}
              aria-label={c.name}
            >
              <svg viewBox="0 0 40 40" width="30" height="30" aria-hidden>
                <path
                  d="M6 34 V16 l4-4 h6 l4-6 l4 6 h6 l4 4 v18 z"
                  fill={active ? "oklch(0.55 0.16 36)" : "oklch(0.38 0.07 46)"}
                  stroke="oklch(0.26 0.05 44)"
                  strokeWidth="1.4"
                />
                <rect x="17" y="22" width="6" height="12" fill="oklch(0.9 0.05 84 / 0.7)" />
              </svg>
              <span
                className={`absolute top-full left-1/2 mt-0.5 -translate-x-1/2 font-royal text-[6px] tracking-[0.14em] whitespace-nowrap uppercase ${
                  active || hover === c.to ? "text-[oklch(0.42_0.16_34)]" : "text-ink/70"
                }`}
              >
                {c.name}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* compass rose */}
      <svg viewBox="0 0 100 100" width="92" className="absolute right-3 bottom-3 opacity-80" aria-hidden>
        <circle cx="50" cy="50" r="38" fill="none" stroke="oklch(0.4 0.07 46)" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="oklch(0.4 0.07 46 / 0.6)" strokeWidth="0.8" />
        <path d="M50 8 L57 50 L50 92 L43 50 Z" fill="oklch(0.45 0.12 34)" />
        <path d="M8 50 L50 43 L92 50 L50 57 Z" fill="oklch(0.36 0.06 46)" />
        <text x="50" y="7" textAnchor="middle" fontSize="9" fontFamily="Cinzel, serif" fill="oklch(0.32 0.06 44)">
          N
        </text>
      </svg>

      {/* wax seal */}
      <svg viewBox="0 0 100 100" width="64" className="absolute top-4 left-4 opacity-90" aria-hidden>
        <circle cx="50" cy="50" r="42" fill="oklch(0.5 0.16 32)" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="oklch(0.86 0.1 88)" strokeWidth="2" />
        <text x="50" y="60" textAnchor="middle" fontSize="30" fontFamily="Cinzel, serif" fill="oklch(0.28 0.1 26)">
          R
        </text>
      </svg>
    </div>
  );
}

/** Info panel for the selected location. */
export function MapLocationCard({ chapter }: { chapter: Chapter }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={chapter.to}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left"
      >
        <div className="flex-1">
          <p className="font-royal text-[10px] tracking-[0.35em] text-primary/80 uppercase">
            Location {String(chapter.n).padStart(2, "0")} · {chapter.subtitle}
          </p>
          <h2 className="mt-1 font-royal text-2xl text-foreground">{chapter.name}</h2>
        </div>
        <Link to={chapter.to}>
          <RoyalButton>Travel Here</RoyalButton>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
