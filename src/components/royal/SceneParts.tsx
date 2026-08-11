import { motion } from "motion/react";

/** Layered mountain silhouettes — Sahyadri ranges behind the fort. */
export function MountainRange({
  className = "",
  tone = "oklch(0.2 0.03 262)",
  variant = 0,
}: {
  className?: string;
  tone?: string;
  variant?: 0 | 1;
}) {
  const d =
    variant === 0
      ? "M0 220 L120 120 L200 168 L300 60 L390 150 L470 96 L560 180 L660 104 L760 176 L880 96 L980 170 L1100 110 L1200 190 L1200 260 L0 260 Z"
      : "M0 240 L90 180 L180 210 L280 140 L360 200 L470 156 L580 214 L700 160 L820 212 L940 158 L1060 206 L1200 150 L1200 260 L0 260 Z";
  return (
    <svg
      viewBox="0 0 1200 260"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute w-full ${className}`}
      aria-hidden
    >
      <path d={d} fill={tone} />
    </svg>
  );
}

/** A hanging royal banner (bhagwa-inspired) that sways. */
export function Banner({
  className = "",
  delay = 0,
  height = 150,
  color = "var(--color-terracotta)",
}: {
  className?: string;
  delay?: number;
  height?: number;
  color?: string;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute origin-top ${className}`}
      animate={{ rotate: [-1.8, 1.8, -1.8], skewY: [0.6, -0.6, 0.6] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden
    >
      <div
        style={{
          width: height * 0.34,
          height,
          background: `linear-gradient(180deg, ${color}, oklch(0.34 0.1 32))`,
          clipPath: "polygon(0 0, 100% 0, 100% 86%, 50% 100%, 0 86%)",
          boxShadow: "0 10px 24px oklch(0 0 0 / 0.55)",
        }}
        className="relative"
      >
        <div
          className="absolute inset-x-2 top-3 bottom-8 opacity-80"
          style={{
            border: "1.5px solid oklch(0.8 0.11 84 / 0.7)",
          }}
        />
        <svg viewBox="0 0 40 40" className="absolute inset-x-0 top-6 mx-auto" width="26">
          <path
            d="M20 4 L24 15 L36 16 L26 23 L30 35 L20 28 L10 35 L14 23 L4 16 L16 15 Z"
            fill="oklch(0.85 0.11 88)"
            opacity="0.85"
          />
        </svg>
      </div>
    </motion.div>
  );
}

/** Soft ground fog band. */
export function Fog({ className = "", opacity = 0.5 }: { className?: string; opacity?: number }) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      animate={{ x: ["-4%", "4%", "-4%"], opacity: [opacity * 0.7, opacity, opacity * 0.7] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background:
          "radial-gradient(ellipse at 50% 100%, oklch(0.8 0.03 80 / 0.35) 0%, transparent 70%)",
        filter: "blur(22px)",
      }}
    />
  );
}

/** Carved stone surface block. */
export function StoneBlock({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={`absolute ${className}`}
      style={{
        backgroundImage: "var(--gradient-stone)",
        boxShadow: "inset 0 2px 0 oklch(0.7 0.03 70 / 0.12), inset 0 -8px 22px oklch(0 0 0 / 0.6)",
        ...style,
      }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 38px, oklch(0.12 0.01 50 / 0.6) 38px 41px), repeating-linear-gradient(90deg, transparent 0 78px, oklch(0.12 0.01 50 / 0.45) 78px 81px)",
        }}
      />
    </div>
  );
}
