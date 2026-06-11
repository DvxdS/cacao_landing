/**
 * Module unique d'initialisation GSAP — enregistre ScrollTrigger + SplitText
 * une fois, expose les helpers utilisés par les composants. Tout passe par ici
 * pour garantir un seul registre de plugins et un comportement cohérent vis-à-vis
 * de prefers-reduced-motion.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

/** Le check est évalué à chaque appel — utile si l'OS bascule pendant la session. */
export const isReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Largeur d'écran < 768px : on simplifie certaines animations coûteuses. */
export const isMobileViewport = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

/**
 * Reveal masqué par lignes pour un H1/H2 — SplitText + tween Y.
 * Retourne la timeline pour permettre un chaînage.
 */
export function revealLines(
  el: Element,
  options: { delay?: number; trigger?: Element | null; duration?: number } = {},
) {
  const { delay = 0, trigger = el, duration = 0.9 } = options;

  if (isReducedMotion()) {
    return gsap.fromTo(
      el,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, delay, ease: 'power1.out' },
    );
  }

  const split = new SplitText(el, {
    type: 'lines',
    linesClass: 'split-line',
    mask: 'lines',
  });

  return gsap.fromTo(
    split.lines,
    { yPercent: 100 },
    {
      yPercent: 0,
      duration,
      ease: 'power3.out',
      stagger: 0.08,
      delay,
      scrollTrigger: trigger
        ? {
            trigger,
            start: 'top 80%',
            once: true,
          }
        : undefined,
    },
  );
}

/**
 * Fade-up générique pour paragraphes, eyebrows, listes — remplace l'usage
 * de useInView pour unifier toutes les apparitions au scroll.
 */
export function revealFadeUp(
  elements: Element | Element[] | NodeListOf<Element>,
  options: { delay?: number; stagger?: number; trigger?: Element | null; y?: number } = {},
) {
  const { delay = 0, stagger = 0.08, trigger, y = 24 } = options;

  return gsap.fromTo(
    elements,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger,
      delay,
      scrollTrigger: trigger
        ? {
            trigger,
            start: 'top 80%',
            once: true,
          }
        : undefined,
    },
  );
}
