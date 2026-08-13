import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface Props {
  /** photographic environment plate */
  src: string;
  /** object-position for the plate */
  focus?: string;
  /** how dark the scene grade is, 0..1 */
  grade?: number;
  /** warm key-light position, e.g. "30% 40%" */
  keyLight?: string;
  /** strength of the mouse-driven camera parallax in px */
  parallax?: number;
  /** initial cinematic push-in */
  pushIn?: boolean;
  children?: React.ReactNode;
}

/**
 * A real cinematic environment plate: photographic background, atmospheric
 * haze midground, warm key light, film grain and vignette, all reacting to a
 * gentle camera parallax. Foreground/interactive objects are rendered by the
 * chapter above this layer.
 */
export function SceneBackdrop({
  src,
  focus = "center",
  grade = 0.55,
  keyLight = "50% 40%",
  parallax = 22,
  pushIn = true,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 45, damping: 22, mass: 0.6 });

  const bgX = useTransform(sx, [-1, 1], [parallax, -parallax]);
  const bgY = useTransform(sy, [-1, 1], [parallax * 0.5, -parallax * 0.5]);
  const hazeX = useTransform(sx, [-1, 1], [parallax * 1.9, -parallax * 1.9]);

  const onMove = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <div ref={ref} onMouseMove={onMove} className="pointer-events-none absolute inset-0 z-0">
      {/* BACKGROUND — environment plate */}
      <motion.div
        className="absolute -inset-[6%]"
        style={{ x: bgX, y: bgY }}
        initial={pushIn ? { scale: 1.14, opacity: 0 } : false}
        animate={{ scale: 1.04, opacity: 1 }}
        transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={src}
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
          style={{ objectPosition: focus }}
        />
      </motion.div>

      {/* colour grade — deep brown shadow, natural stone */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background: `linear-gradient(180deg, oklch(0.14 0.02 55 / ${grade * 0.8}), oklch(0.1 0.02 45 / ${grade}))`,
        }}
      />

      {/* warm environmental key light */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-screen"
        style={{
          background: `radial-gradient(ellipse 60% 55% at ${keyLight}, oklch(0.72 0.13 66 / 0.22), transparent 68%)`,
        }}
      />

      {/* MIDGROUND — volumetric atmospheric haze */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{ x: hazeX }}
        animate={{ opacity: [0.34, 0.5, 0.34] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-x-0 bottom-0 h-2/3"
          style={{
            background:
              "linear-gradient(0deg, oklch(0.55 0.05 62 / 0.22), transparent 78%)",
            filter: "blur(18px)",
          }}
        />
      </motion.div>

      {children}

      {/* film grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-conic-gradient(oklch(0.7 0 0) 0% 25%, oklch(0.2 0 0) 0% 50%)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* lens vignette */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 82% 76% at 50% 48%, transparent 38%, oklch(0.05 0.015 50 / 0.88) 100%)",
        }}
      />
    </div>
  );
}

/** Slow-drifting smoke / dust volume for foreground depth. */
export function AtmosphericHaze({
  className = "",
  opacity = 0.3,
  duration = 26,
}: {
  className?: string;
  opacity?: number;
  duration?: number;
}) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      animate={{ x: ["-6%", "6%", "-6%"], opacity: [opacity * 0.5, opacity, opacity * 0.5] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background:
          "radial-gradient(ellipse at 50% 100%, oklch(0.78 0.04 74 / 0.4) 0%, transparent 68%)",
        filter: "blur(28px)",
      }}
    />
  );
}
