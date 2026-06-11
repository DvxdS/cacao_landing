/**
 * Système de reveals au scroll — scanne le DOM pour `[data-reveal-*]` et
 * applique les animations correspondantes. Tout passe par ce module pour
 * garantir un comportement unifié et un seul registre de ScrollTriggers.
 */
import { gsap, SplitText, isReducedMotion } from './gsap';

const LINES_SELECTOR = '[data-reveal-lines]:not([data-hero-title])';
const FADE_SELECTOR = '[data-reveal-fade]';
const HERO_SELECTOR =
  '[data-hero-title], [data-hero-eyebrow], [data-hero-sub], [data-hero-ctas], [data-hero-veil]';

/**
 * Pré-masque tout ce qui doit être révélé. À appeler dans un useLayoutEffect
 * pour éviter le « flash de contenu visible » avant que GSAP ne prenne la main.
 */
export function preHideTargets() {
  if (typeof document === 'undefined') return;
  gsap.set(FADE_SELECTOR, { autoAlpha: 0, y: 24 });
  gsap.set(LINES_SELECTOR, { autoAlpha: 0 });
  gsap.set(HERO_SELECTOR, { autoAlpha: 0 });
}

/**
 * Crée toutes les animations. À appeler après que les polices soient prêtes
 * (sinon SplitText calcule les retours à la ligne avec la mauvaise font).
 */
export function setupReveals() {
  if (typeof document === 'undefined') return;
  const reduced = isReducedMotion();

  // 1. Titres H2 — SplitText reveal masqué par lignes
  document.querySelectorAll<HTMLElement>(LINES_SELECTOR).forEach((el) => {
    if (reduced) {
      gsap.to(el, { autoAlpha: 1, duration: 0.4 });
      return;
    }

    const split = new SplitText(el, {
      type: 'lines',
      linesClass: 'split-line',
      mask: 'lines',
    });
    gsap.set(el, { autoAlpha: 1 });

    gsap.fromTo(
      split.lines,
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      },
    );
  });

  // 2. Fade-up générique (eyebrows, paragraphes, listes)
  document.querySelectorAll<HTMLElement>(FADE_SELECTOR).forEach((el) => {
    gsap.to(el, {
      autoAlpha: 1,
      y: 0,
      duration: reduced ? 0.3 : 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });
  });
}
