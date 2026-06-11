import { useEffect, useState } from 'react';

type Options = {
  duration?: number;
  start?: boolean;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useCountUp(target: number, { duration = 1500, start = true }: Options = {}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }

    let frame = 0;
    const t0 = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - t0) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start]);

  return value;
}
