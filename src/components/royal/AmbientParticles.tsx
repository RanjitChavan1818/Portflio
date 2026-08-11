import { useMemo } from "react";

interface Props {
  count?: number;
  className?: string;
  color?: string;
  /** average size in px */
  size?: number;
  seed?: number;
}

/**
 * Lightweight CSS-only atmospheric particles (dust motes / embers).
 * No rAF loop — GPU-composited transforms only.
 */
export function AmbientParticles({
  count = 22,
  className = "",
  color = "var(--color-brass-light)",
  size = 3,
  seed = 1,
}: Props) {
  const motes = useMemo(() => {
    let s = seed * 9301;
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rnd() * 100,
      delay: rnd() * 18,
      duration: 16 + rnd() * 20,
      drift: (rnd() - 0.5) * 160,
      scale: 0.4 + rnd() * 1.4,
      opacity: 0.18 + rnd() * 0.45,
      bottom: rnd() * 40,
    }));
  }, [count, seed]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {motes.map((m) => (
        <span
          key={m.id}
          className="absolute rounded-full will-change-transform"
          style={
            {
              left: `${m.left}%`,
              bottom: `${m.bottom}%`,
              width: size * m.scale,
              height: size * m.scale,
              background: color,
              filter: "blur(0.5px)",
              boxShadow: `0 0 ${6 * m.scale}px ${color}`,
              ["--p-x" as string]: `${m.drift}px`,
              ["--p-opacity" as string]: m.opacity,
              animation: `drift-up ${m.duration}s linear ${m.delay}s infinite`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
