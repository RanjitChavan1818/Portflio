import { motion } from "motion/react";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** delay before the scroll begins to unroll */
  delay?: number;
  className?: string;
  open?: boolean;
  /** horizontal scrolls unroll left-to-right */
  axis?: "y" | "x";
}

/**
 * A physical parchment: two wooden rollers with the sheet unrolling between
 * them. The sheet scales from the rollers, so the motion reads as unrolling.
 */
export function AnimatedParchment({
  children,
  delay = 0.4,
  className = "",
  open = true,
  axis = "y",
}: Props) {
  const vertical = axis === "y";
  return (
    <div className={`relative ${className}`}>
      {/* top / left roller */}
      <Roller vertical={vertical} position="start" />

      <motion.div
        initial={vertical ? { scaleY: 0, opacity: 0.4 } : { scaleX: 0, opacity: 0.4 }}
        animate={
          open
            ? { scaleY: 1, scaleX: 1, opacity: 1 }
            : vertical
              ? { scaleY: 0, opacity: 0.4 }
              : { scaleX: 0, opacity: 0.4 }
        }
        transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{
          transformOrigin: vertical ? "top center" : "left center",
          backgroundImage: "var(--gradient-parchment)",
          boxShadow:
            "inset 0 0 60px oklch(0.55 0.08 60 / 0.45), 0 24px 60px -18px oklch(0 0 0 / 0.85)",
        }}
        className="relative overflow-hidden px-6 py-8 text-ink sm:px-12 sm:py-12"
      >
        {/* fibre texture + burnt edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 30%, oklch(0.62 0.09 58 / 0.25), transparent 45%), radial-gradient(ellipse at 80% 70%, oklch(0.6 0.09 52 / 0.3), transparent 50%), repeating-linear-gradient(92deg, transparent 0 7px, oklch(0.6 0.06 62 / 0.06) 7px 8px)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow: "inset 0 0 26px oklch(0.35 0.09 44 / 0.5)",
            border: "1px solid oklch(0.6 0.08 58 / 0.4)",
          }}
        />
        <div className="relative">{children}</div>
      </motion.div>

      <Roller vertical={vertical} position="end" />
    </div>
  );
}

function Roller({ vertical, position }: { vertical: boolean; position: "start" | "end" }) {
  const common = {
    background:
      "linear-gradient(180deg, oklch(0.45 0.07 46), oklch(0.3 0.055 44) 40%, oklch(0.22 0.045 42))",
    boxShadow: "0 8px 22px oklch(0 0 0 / 0.6)",
  } as React.CSSProperties;
  if (vertical) {
    return (
      <div
        aria-hidden
        className={`relative h-5 w-[104%] -translate-x-[2%] rounded-full ${position === "end" ? "mt-0" : "mb-0"}`}
        style={common}
      >
        <span className="absolute top-1/2 -left-2 h-3 w-3 -translate-y-1/2 rounded-full brass-surface" />
        <span className="absolute top-1/2 -right-2 h-3 w-3 -translate-y-1/2 rounded-full brass-surface" />
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className={`absolute top-[-2%] h-[104%] w-5 rounded-full ${position === "start" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"}`}
      style={{ ...common, zIndex: 2 }}
    />
  );
}

/** Text that appears as if written with ink, line by line. */
export function InkLine({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.p
      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
      animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
      transition={{ duration: 1.1, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.p>
  );
}
