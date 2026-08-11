import { type ReactNode } from "react";
import { motion } from "motion/react";

interface Props {
  children: ReactNode;
  /** the kind of arrival this chapter has */
  variant?: "doors" | "corridor" | "unfold" | "zoom";
  className?: string;
}

const variants = {
  doors: {
    initial: { opacity: 0, scale: 1.14, filter: "brightness(0.2)" },
    animate: { opacity: 1, scale: 1, filter: "brightness(1)" },
  },
  corridor: {
    initial: { opacity: 0, scale: 1.06, x: 60 },
    animate: { opacity: 1, scale: 1, x: 0 },
  },
  unfold: {
    initial: { opacity: 0, scale: 0.96, rotateX: 8 },
    animate: { opacity: 1, scale: 1, rotateX: 0 },
  },
  zoom: {
    initial: { opacity: 0, scale: 0.88 },
    animate: { opacity: 1, scale: 1 },
  },
};

/**
 * Arrival transition for a chapter — makes routing feel like travelling.
 * Also renders the vignette that keeps every scene "inside a camera".
 */
export function CinematicTransition({ children, variant = "corridor", className = "" }: Props) {
  const v = variants[variant];
  return (
    <motion.div
      initial={v.initial}
      animate={v.animate}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`scene ${className}`}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, oklch(0.08 0.02 60 / 0.75) 100%)",
        }}
      />
    </motion.div>
  );
}
