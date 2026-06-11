import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, isReducedMotion } from '../lib/gsap';

/**
 * Stage de fond unique posé en `position: fixed` derrière tout le contenu.
 * Anime sa propre `background-color` au passage de chaque section "tinted"
 * (KeyFigures, Traceability, Footer), pendant que la section elle-même devient
 * transparente — le résultat : un fond qui morphe au scroll au lieu de couper net.
 *
 * Si JavaScript échoue, le composant n'est jamais monté et les sections gardent
 * leurs `bg-*` Tailwind classiques (graceful degradation).
 */

const DEFAULT_BG = '#f5f0e6'; // ivory-100

const TINTS: { selector: string; color: string }[] = [
  { selector: '#figures', color: '#1f4630' }, // forest-700
  { selector: '#traceability', color: '#3b2417' }, // cacao-800
  { selector: '#site-footer', color: '#2a1810' }, // cacao-900
];

export function BackgroundStage() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (isReducedMotion()) return;

    const triggers: ScrollTrigger[] = [];
    const restored: { el: HTMLElement; previous: string }[] = [];

    TINTS.forEach(({ selector, color }) => {
      const section = document.querySelector<HTMLElement>(selector);
      if (!section) return;

      // Garder la couleur d'origine (style inline) pour pouvoir la restaurer au démontage.
      restored.push({ el: section, previous: section.style.backgroundColor });
      // L'inline style l'emporte sur les classes Tailwind bg-* — le stage devient visible.
      section.style.backgroundColor = 'transparent';

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        onEnter: () =>
          gsap.to(stage, { backgroundColor: color, duration: 0.7, ease: 'power2.inOut' }),
        onLeave: () =>
          gsap.to(stage, { backgroundColor: DEFAULT_BG, duration: 0.7, ease: 'power2.inOut' }),
        onEnterBack: () =>
          gsap.to(stage, { backgroundColor: color, duration: 0.7, ease: 'power2.inOut' }),
        onLeaveBack: () =>
          gsap.to(stage, { backgroundColor: DEFAULT_BG, duration: 0.7, ease: 'power2.inOut' }),
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
      restored.forEach(({ el, previous }) => {
        el.style.backgroundColor = previous;
      });
    };
  }, []);

  return (
    <div
      ref={stageRef}
      aria-hidden
      className="fixed inset-0 -z-10 bg-ivory-100"
      style={{ pointerEvents: 'none' }}
    />
  );
}
