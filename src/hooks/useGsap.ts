import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { gsap } from '../lib/gsap';

/**
 * Encapsule gsap.context() dans un useEffect avec cleanup automatique.
 * Le callback reçoit l'élément scopé : tous les sélecteurs `.foo` à l'intérieur
 * du context() sont limités à cet arbre DOM.
 *
 * Anti-fuite obligatoire en React : ctx.revert() est appelé au unmount,
 * ce qui détruit toutes les animations, ScrollTriggers et SplitText créés
 * pendant la vie du composant.
 */
export function useGsap<T extends HTMLElement = HTMLElement>(
  callback: (ctx: gsap.Context, scopeEl: T) => void,
  deps: React.DependencyList = [],
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context((self) => callback(self, el), el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
