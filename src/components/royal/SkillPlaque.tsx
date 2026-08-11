import { motion } from "motion/react";
import type { Skill } from "@/lib/journey";

/** A brass plaque bolted to stone, revealing a skill's story. */
export function SkillPlaque({ skill }: { skill: Skill }) {
  return (
    <motion.div
      key={skill.name}
      initial={{ opacity: 0, y: 26, rotateX: -14 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-md px-7 py-6 text-center"
      style={{
        backgroundImage: "var(--gradient-brass)",
        boxShadow: "var(--shadow-plaque)",
        clipPath:
          "polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)",
      }}
    >
      {[
        "top-2 left-2",
        "top-2 right-2",
        "bottom-2 left-2",
        "bottom-2 right-2",
      ].map((p) => (
        <span
          key={p}
          className={`absolute ${p} h-2 w-2 rounded-full`}
          style={{ background: "oklch(0.35 0.05 50)" }}
          aria-hidden
        />
      ))}
      <h3 className="font-royal text-2xl tracking-[0.14em] text-[oklch(0.24_0.05_48)] uppercase">
        {skill.name}
      </h3>
      <p className="mt-1 font-royal text-[10px] tracking-[0.3em] text-[oklch(0.32_0.08_44)] uppercase">
        {skill.note}
      </p>
      <div className="mx-auto my-3 h-px w-24 bg-[oklch(0.3_0.05_46)]/40" />
      <p className="font-script text-base text-[oklch(0.26_0.05_46)]">{skill.detail}</p>
    </motion.div>
  );
}
