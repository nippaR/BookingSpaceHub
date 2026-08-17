/**
 * A small spring toolkit for gesture-driven UI.
 *
 * CSS transitions are the wrong tool for anything the user can grab: they
 * interpolate from a fixed start to a fixed end over a fixed duration, so
 * interrupting one mid-flight snaps. A spring has no duration — it always
 * integrates from wherever the value *currently* is, at whatever velocity it
 * currently carries, toward whatever the target *currently* is. Retargeting
 * mid-flight is therefore free, and reversals keep their velocity instead of
 * hitting a discontinuity.
 *
 * Parameters follow Apple's designer-facing pair rather than the physics
 * triplet:
 *   damping  — 1.0 is critically damped (settles, never overshoots).
 *              Below 1.0 overshoots; lower is bouncier.
 *   response — roughly how long, in seconds, the value takes to reach target.
 *              Not a duration: settle time emerges from the two together.
 */

export type SpringOptions = {
  /** Damping ratio. 1 = critically damped. Default 1. */
  damping?: number;
  /** Response, in seconds. Default 0.4. */
  response?: number;
  /** Stop when within this distance of target and slower than this. */
  restDelta?: number;
};

export type Spring = {
  /** Set a new target. Position and velocity carry over — safe mid-flight. */
  setTarget: (value: number) => void;
  /** Jump the value without animating (e.g. while a finger is dragging). */
  set: (value: number, velocity?: number) => void;
  /** Inject a release velocity, in units/second. */
  setVelocity: (value: number) => void;
  getValue: () => number;
  getVelocity: () => number;
  isAnimating: () => boolean;
  stop: () => void;
};

/**
 * Apple's momentum projection, from the Designing Fluid Interfaces sample
 * code. Given a release velocity, returns the *distance* the value would
 * coast before coming to rest — so a flick lands where the gesture was going
 * rather than at the nearest edge to where the finger happened to lift.
 *
 * Note this is exponential decay, not the textbook `v² / 2a`.
 */
export function project(
  initialVelocity: number,
  decelerationRate = 0.998,
): number {
  return ((initialVelocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/**
 * Progressive resistance past a boundary. The further out, the less the
 * surface follows — real things slow before they stop, and a hard clamp reads
 * as "frozen" rather than "there is nothing more here".
 */
export function rubberband(
  overshoot: number,
  dimension: number,
  constant = 0.55,
): number {
  if (dimension === 0) return 0;
  return (
    (overshoot * dimension * constant) /
    (dimension + constant * Math.abs(overshoot))
  );
}

/** Pick the snap point nearest a (projected) position. */
export function nearestSnapPoint(position: number, points: number[]): number {
  return points.reduce((best, point) =>
    Math.abs(point - position) < Math.abs(best - position) ? point : best,
  );
}

const MAX_FRAME_MS = 64; // clamp after a background tab or a long task
const SUBSTEP_MS = 1000 / 240; // integrate finer than we render

/**
 * Creates a display-synced spring. `onUpdate` runs once per animation frame
 * with the current value; `onRest` runs when the spring settles.
 */
export function createSpring(
  initialValue: number,
  onUpdate: (value: number) => void,
  options: SpringOptions = {},
): Spring {
  const { damping = 1, response = 0.4, restDelta = 0.01 } = options;

  // Convert the designer pair into the coefficients the integrator needs.
  const omega = (2 * Math.PI) / response;
  const stiffness = omega * omega;
  const dampingCoefficient = 2 * damping * omega;

  let value = initialValue;
  let velocity = 0;
  let target = initialValue;
  let frame: number | null = null;
  let lastTime = 0;
  let onRest: (() => void) | null = null;

  const tick = (now: number) => {
    const elapsed = Math.min(now - lastTime, MAX_FRAME_MS);
    lastTime = now;

    // Fixed-step semi-implicit Euler. A fixed step keeps the motion identical
    // on 60Hz and 120Hz displays; only the sampling rate differs.
    let remaining = elapsed;
    while (remaining > 0) {
      const step = Math.min(remaining, SUBSTEP_MS) / 1000;
      const acceleration =
        -stiffness * (value - target) - dampingCoefficient * velocity;
      velocity += acceleration * step;
      value += velocity * step;
      remaining -= Math.min(remaining, SUBSTEP_MS);
    }

    const settled =
      Math.abs(value - target) < restDelta && Math.abs(velocity) < restDelta * 8;

    if (settled) {
      value = target;
      velocity = 0;
      frame = null;
      onUpdate(value);
      const callback = onRest;
      onRest = null;
      callback?.();
      return;
    }

    onUpdate(value);
    frame = requestAnimationFrame(tick);
  };

  const start = () => {
    if (frame !== null) return;
    lastTime = performance.now();
    frame = requestAnimationFrame(tick);
  };

  return {
    setTarget(next) {
      if (target === next && frame !== null) return;
      target = next;
      start();
    },
    set(next, nextVelocity = 0) {
      value = next;
      velocity = nextVelocity;
      target = next;
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
      onUpdate(value);
    },
    setVelocity(next) {
      velocity = next;
      start();
    },
    getValue: () => value,
    getVelocity: () => velocity,
    isAnimating: () => frame !== null,
    stop() {
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
      velocity = 0;
      target = value;
    },
  };
}

/**
 * Tracks recent pointer samples so a release can hand off real velocity
 * rather than a single-frame delta, which is noisy enough to make a flick
 * feel random.
 */
export class VelocityTracker {
  private samples: { position: number; time: number }[] = [];
  private readonly window: number;

  constructor(windowMs = 100) {
    this.window = windowMs;
  }

  add(position: number, time = performance.now()) {
    this.samples.push({ position, time });
    const cutoff = time - this.window;
    while (this.samples.length > 2 && this.samples[0].time < cutoff) {
      this.samples.shift();
    }
  }

  /** Velocity in units per second, over the tracked window. */
  get(): number {
    if (this.samples.length < 2) return 0;
    const first = this.samples[0];
    const last = this.samples[this.samples.length - 1];
    const elapsed = last.time - first.time;
    if (elapsed <= 0) return 0;
    return ((last.position - first.position) / elapsed) * 1000;
  }

  reset() {
    this.samples = [];
  }
}

/** Apple's shipped spring presets, as named values rather than magic numbers. */
export const SPRING = {
  /** Default UI motion: graceful, never distracting. */
  ui: { damping: 1, response: 0.35 },
  /** Repositioning something the user moved. */
  move: { damping: 1, response: 0.4 },
  /** Drawers and sheets — a little bounce, because a drag preceded it. */
  sheet: { damping: 0.82, response: 0.3 },
  /** Momentum landings after a flick. */
  flick: { damping: 0.8, response: 0.4 },
} as const;
