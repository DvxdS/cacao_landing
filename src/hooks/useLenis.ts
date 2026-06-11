import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, isReducedMotion } from '../lib/gsap';

/**
 * Initialise Lenis (smooth scrolling natif) et le synchronise avec
 * le ticker GSAP. Bypass complet si l'utilisateur a demandé reduced-motion.
 *
 * Doit être appelé une seule fois au niveau App.
 */
export function useLenis() {
  useEffect(() => {
    if (isReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.1,
      // Mobile : Lenis reste actif mais avec un comportement plus simple.
      // smoothWheel désactivé sur touch (Lenis le gère nativement).
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    };
  }, []);
}
