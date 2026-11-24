import { motion } from "motion/react";

interface DoorProps {
  side: "left" | "right";
  open: boolean;
}

/**
 * One physical wooden gate door — planks, iron bands, brass studs and a ring
 * handle. It rotates on its hinge in 3D; it is not a background image.
 */
export function GateDoor({ side, open }: DoorProps) {
  const isLeft = side === "left";
  return (
    <motion.div
      className="absolute top-0 h-full w-1/2 will-change-transform"
      style={{
        [isLeft ? "left" : "right"]: 0,
        transformOrigin: isLeft ? "left center" : "right center",
        transformStyle: "preserve-3d",
        backgroundImage: "var(--gradient-wood)",
        boxShadow: "inset 0 0 60px oklch(0 0 0 / 0.75)",
      }}
      initial={false}
      
animate={{
  rotateY: open ? (isLeft ? 105 : -105) : 0,
  filter: open ? "brightness(0.65)" : "brightness(1)",
  scale: open ? 0.98 : 1,
}}
transition={{
  rotateY: {
    duration: 2.8,
    ease: [0.22, 1, 0.36, 1],
    delay: isLeft ? 0.4 : 0.55,
  },
  filter: {
    duration: 2,
  },
  scale: {
    duration: 2.8,
  },
}}
    >
      {/* vertical plank seams */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 30px, oklch(0.16 0.03 40 / 0.85) 30px 33px)",
        }}
      />
      {/* iron bands with studs */}
      {[18, 48, 78].map((t) => (
        <div
          key={t}
          className="absolute right-0 left-0 flex items-center justify-around"
          style={{
            top: `${t}%`,
            height: 22,
            background:
              "linear-gradient(180deg, oklch(0.42 0.02 60), oklch(0.24 0.015 55) 60%, oklch(0.18 0.01 50))",
            boxShadow: "0 3px 10px oklch(0 0 0 / 0.6)",
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="rounded-full"
              style={{
                width: 9,
                height: 9,
                backgroundImage: "var(--gradient-brass)",
                boxShadow: "0 1px 2px oklch(0 0 0 / 0.7)",
              }}
            />
          ))}
        </div>
      ))}
      {/* defensive spikes (Maratha fort gates) */}
      {[30, 60].map((t) => (
        <div
          key={t}
          className="absolute flex w-full justify-around"
          style={{ top: `${t}%` }}
          aria-hidden
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              style={{
                width: 14,
                height: 22,
                clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
                backgroundImage: "var(--gradient-brass)",
                filter: "brightness(0.85)",
                transform: "rotate(180deg)",
              }}
            />
          ))}
        </div>
      ))}
      {/* ring handle on the meeting edge */}
      <div
        className="absolute top-1/2 -translate-y-1/2"
        style={{ [isLeft ? "right" : "left"]: 18 } as React.CSSProperties}
      >
        <div
          className="rounded-full border-[5px]"
          style={{
            width: 46,
            height: 46,
            borderColor: "oklch(0.68 0.11 74)",
            boxShadow: "0 4px 12px oklch(0 0 0 / 0.7)",
          }}
        />
      </div>
      {/* inner edge shadow */}
      <div
        className="absolute top-0 h-full w-10"
        style={{
          [isLeft ? "right" : "left"]: 0,
          background: `linear-gradient(${isLeft ? "270deg" : "90deg"}, oklch(0 0 0 / 0.65), transparent)`,
        }}
      />
    </motion.div>
  );
}
