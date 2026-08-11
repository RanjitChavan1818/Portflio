import { motion } from "motion/react";

interface TorchProps {
  className?: string;
  /** 0..1 — how bright the flame burns */
  intensity?: number;
  scale?: number;
  flip?: boolean;
}

/**
 * A brass wall-torch built from layered DOM elements:
 * bracket + bowl + flame core + halo. Not an image.
 */
export function Torch({ className = "", intensity = 1, scale = 1, flip }: TorchProps) {
  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{ transform: `scale(${scale}) ${flip ? "scaleX(-1)" : ""}` }}
      aria-hidden
    >
      {/* halo */}
      <motion.div
        className="absolute -translate-x-1/2 rounded-full"
        animate={{ opacity: [0.5 * intensity, 0.85 * intensity, 0.6 * intensity] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          left: "50%",
          top: -70,
          width: 190,
          height: 190,
          background:
            "radial-gradient(circle, oklch(0.82 0.17 66 / 0.55) 0%, oklch(0.7 0.16 50 / 0.18) 42%, transparent 70%)",
          filter: "blur(6px)",
        }}
      />
      {/* flame */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        animate={{
          scaleY: [1, 1.16, 0.94, 1.08, 1],
          scaleX: [1, 0.92, 1.06, 0.96, 1],
          x: [0, 1.5, -1.5, 1, 0],
        }}
        transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          top: -34,
          width: 20,
          height: 42,
          borderRadius: "50% 50% 45% 45% / 70% 70% 30% 30%",
          background:
            "linear-gradient(180deg, oklch(0.96 0.12 96) 0%, oklch(0.84 0.18 66) 45%, oklch(0.62 0.19 38) 100%)",
          filter: `blur(1px) brightness(${0.7 + intensity * 0.5})`,
          transformOrigin: "bottom center",
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          top: -12,
          width: 8,
          height: 14,
          background: "oklch(0.97 0.07 100)",
          filter: "blur(2px)",
        }}
      />
      {/* brass bowl */}
      <div
        className="relative"
        style={{
          width: 34,
          height: 16,
          clipPath: "polygon(0 0, 100% 0, 76% 100%, 24% 100%)",
          backgroundImage: "var(--gradient-brass)",
        }}
      />
      {/* bracket */}
      <div
        className="mx-auto"
        style={{ width: 8, height: 26, backgroundImage: "var(--gradient-brass)" }}
      />
      <div
        className="mx-auto rounded-sm"
        style={{ width: 22, height: 8, backgroundImage: "var(--gradient-brass)" }}
      />
    </div>
  );
}
