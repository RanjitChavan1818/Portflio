import { motion } from "motion/react";

/** A brass oil lamp / candle with a live flame and pooled light. */
export function Candle({
  className = "",
  scale = 1,
  height = 54,
}: {
  className?: string;
  scale?: number;
  height?: number;
}) {
  return (
    <div className={`absolute ${className}`} style={{ transform: `scale(${scale})` }} aria-hidden>
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        animate={{ opacity: [0.45, 0.75, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          top: -80,
          width: 150,
          height: 150,
          background:
            "radial-gradient(circle, oklch(0.86 0.15 78 / 0.5), transparent 68%)",
          filter: "blur(4px)",
        }}
      />
      <motion.span
        className="absolute left-1/2 -translate-x-1/2"
        animate={{ scaleY: [1, 1.22, 0.92, 1.1, 1], x: [0, 1, -1, 0.5, 0] }}
        transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          top: -20,
          width: 11,
          height: 24,
          borderRadius: "50% 50% 45% 45% / 72% 72% 28% 28%",
          background:
            "linear-gradient(180deg, oklch(0.97 0.1 98), oklch(0.85 0.17 68) 55%, oklch(0.6 0.18 36))",
          transformOrigin: "bottom center",
          filter: "blur(0.6px)",
        }}
      />
      <div
        style={{
          width: 12,
          height,
          background: "linear-gradient(90deg, oklch(0.88 0.03 88), oklch(0.7 0.04 84) 60%, oklch(0.58 0.04 80))",
          borderRadius: 3,
        }}
      />
      <div
        className="-mx-2"
        style={{ width: 28, height: 7, borderRadius: 4, backgroundImage: "var(--gradient-brass)" }}
      />
    </div>
  );
}

/** A quill pen resting in an inkpot, with a soft idle drift. */
export function Quill({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{ rotate: [-3, 2, -3], y: [0, -3, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <svg viewBox="0 0 60 160" width="56" height="150">
        <path
          d="M30 150 L34 96 C40 70 46 40 40 8 C24 26 14 56 16 92 L24 150 Z"
          fill="oklch(0.88 0.03 86)"
          opacity="0.92"
        />
        <path d="M32 100 C36 70 42 42 39 12" stroke="oklch(0.55 0.05 60)" strokeWidth="1.6" fill="none" />
        {Array.from({ length: 10 }).map((_, i) => (
          <path
            key={i}
            d={`M33 ${28 + i * 7} L${20 - i * 0.4} ${36 + i * 7}`}
            stroke="oklch(0.7 0.03 80)"
            strokeWidth="1"
          />
        ))}
        <path d="M28 150 L32 150 L31 160 Z" fill="oklch(0.28 0.05 44)" />
      </svg>
    </motion.div>
  );
}

/** A wax royal seal. */
export function WaxSeal({
  className = "",
  size = 64,
  label = "R",
}: {
  className?: string;
  size?: number;
  label?: string;
}) {
  return (
    <div className={`absolute ${className}`} aria-hidden>
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <defs>
          <radialGradient id={`wax-${label}`} cx="35%" cy="30%">
            <stop offset="0%" stopColor="oklch(0.6 0.18 32)" />
            <stop offset="100%" stopColor="oklch(0.36 0.14 28)" />
          </radialGradient>
        </defs>
        <path
          d="M50 3 C64 8 78 4 84 16 C96 22 96 38 92 50 C98 62 90 76 80 82 C76 94 60 98 50 94 C40 98 24 94 20 82 C10 76 2 62 8 50 C4 38 4 22 16 16 C22 4 36 8 50 3 Z"
          fill={`url(#wax-${label})`}
        />
        <text
          x="50"
          y="62"
          textAnchor="middle"
          fontFamily="Cinzel, serif"
          fontSize="38"
          fill="oklch(0.28 0.1 26)"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}

/** An ink pot. */
export function InkPot({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute ${className}`} aria-hidden>
      <div
        style={{
          width: 54,
          height: 44,
          borderRadius: "6px 6px 14px 14px",
          background: "linear-gradient(180deg, oklch(0.3 0.03 60), oklch(0.18 0.02 55))",
          boxShadow: "inset 0 3px 6px oklch(0.7 0.03 80 / 0.15), 0 8px 18px oklch(0 0 0 / 0.6)",
        }}
      />
      <div
        className="mx-auto -mt-11 rounded-full"
        style={{
          width: 30,
          height: 10,
          background: "oklch(0.14 0.03 270)",
          boxShadow: "inset 0 2px 4px oklch(0 0 0 / 0.9)",
        }}
      />
    </div>
  );
}
