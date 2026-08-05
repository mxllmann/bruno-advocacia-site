import type { Transition, Variants } from "framer-motion";

/**
 * Spring presets translated from Apple's damping/response model
 * (Designing Fluid Interfaces, WWDC 2018) into Motion's bounce/duration API.
 *
 *   damping 1.0 → bounce 0   (critically damped, graceful settle — the default)
 *   damping ~0.8 → bounce ~0.2 (a little overshoot, only for momentum-driven motion)
 *
 * We default everything to the critically-damped spring. Bounce is reserved for
 * interactions that carry momentum (a flick, a drag release) — never for
 * something that merely faded in.
 */
export const spring = {
  /** Default UI spring — no overshoot. Apple: damping 1.0, response ~0.4. */
  default: { type: "spring", bounce: 0, duration: 0.5 },
  /** Snappier reposition — Apple: damping 1.0, response 0.3. */
  snappy: { type: "spring", bounce: 0, duration: 0.35 },
  /** Momentum spring — slight overshoot for physical, thrown motion. */
  gentleBounce: { type: "spring", bounce: 0.18, duration: 0.5 },
} as const satisfies Record<string, Transition>;

/** The viewport trigger we reuse for every scroll-reveal. */
export const inViewport = { once: true, margin: "-80px" } as const;

/**
 * Fade + short rise, driven by a critically-damped spring. Restraint over
 * spectacle — the content arrives, it doesn't perform.
 */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...spring.default, delay: i * 0.07 },
  }),
};

/** Container that staggers its children's reveal. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: (delay: number = 0) => ({
    transition: { staggerChildren: 0.08, delayChildren: delay },
  }),
};

/** Child of {@link staggerContainer}. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: spring.default },
};
