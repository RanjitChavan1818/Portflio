import { motion } from "motion/react";

/** An SVG sword (talwar-inspired curve) used both in the rack and centre stage. */
export function Sword({
  className = "",
  width = 46,
  glow = false,
}: {
  className?: string;
  width?: number;
  glow?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 60 300"
      width={width}
      height={width * 6.5}
      className={className}
      aria-hidden
      style={glow ? { filter: "drop-shadow(0 0 16px oklch(0.86 0.14 82 / 0.8))" } : undefined}
    >
      <defs>
        <linearGradient id="blade" x1="0" x2="1">
          <stop offset="0%" stopColor="oklch(0.62 0.01 250)" />
          <stop offset="45%" stopColor="oklch(0.94 0.01 250)" />
          <stop offset="100%" stopColor="oklch(0.55 0.012 250)" />
        </linearGradient>
        <linearGradient id="hiltg" x1="0" x2="1">
          <stop offset="0%" stopColor="oklch(0.88 0.1 92)" />
          <stop offset="100%" stopColor="oklch(0.55 0.1 62)" />
        </linearGradient>
      </defs>
      {/* blade with a subtle talwar curve */}
      <path
        d="M30 4 C40 60 42 130 36 196 L24 196 C18 130 20 60 30 4 Z"
        fill="url(#blade)"
      />
      <path d="M30 10 C36 70 37 132 32 192" stroke="oklch(0.99 0 0 / 0.6)" strokeWidth="1.4" fill="none" />
      {/* crossguard */}
      <path d="M6 200 H54 C50 210 42 214 30 214 C18 214 10 210 6 200 Z" fill="url(#hiltg)" />
      {/* grip */}
      <rect x="24" y="214" width="12" height="52" rx="4" fill="oklch(0.32 0.055 44)" />
      {Array.from({ length: 5 }).map((_, i) => (
        <rect key={i} x="23" y={220 + i * 9} width="14" height="3" rx="1.5" fill="url(#hiltg)" />
      ))}
      {/* pommel disc (Indian khanda style) */}
      <circle cx="30" cy="276" r="14" fill="url(#hiltg)" />
      <circle cx="30" cy="276" r="6" fill="oklch(0.4 0.08 50)" />
    </svg>
  );
}

/** Impact spark ring shown when the sword lands. */
export function StrikeSpark({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <motion.div
      key={Math.random()}
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      initial={{ scale: 0.2, opacity: 0.95 }}
      animate={{ scale: 2.6, opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{
        width: 220,
        height: 220,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, oklch(0.98 0.09 96 / 0.9), oklch(0.82 0.16 70 / 0.35) 45%, transparent 70%)",
      }}
      aria-hidden
    />
  );
}
