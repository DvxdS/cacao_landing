import { useLayoutEffect, useRef } from 'react';
import { gallery } from '../data/content';
import { MediaImage } from './MediaImage';
import { gsap, ScrollTrigger, isReducedMotion, isMobileViewport } from '../lib/gsap';

const spanClass = (span: 'normal' | 'wide' | 'tall') => {
  if (span === 'wide') return 'col-span-2';
  if (span === 'tall') return 'md:row-span-2';
  return '';
};

export function Gallery() {
  const gridRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect : cache les cellules AVANT le premier paint pour éviter le flash.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const cells = gsap.utils.toArray<HTMLElement>('[data-gallery-cell]', grid);
      if (!cells.length) return;

      const reduced = isReducedMotion();
      const mobile = isMobileViewport();

      // État caché de départ (les `fromTo` ci-dessous le rejouent à chaque reset).
      const hidden = reduced
        ? { autoAlpha: 0 }
        : mobile
          ? { autoAlpha: 0, y: 40, scale: 0.94 }
          : { autoAlpha: 0, y: 40, scale: 0.92, clipPath: 'inset(12%)' };

      // Pose l'état caché avant tout paint pour éviter le flash.
      gsap.set(cells, hidden);

      // Timeline paused, pilotée par ScrollTrigger pour pouvoir REJOUER à chaque
      // entrée dans le viewport (au lieu de se jouer une seule fois au chargement).
      const tl = gsap.timeline({ paused: true });

      if (reduced) {
        tl.fromTo(
          cells,
          hidden,
          { autoAlpha: 1, duration: 0.4, ease: 'power1.out', stagger: 0.03 },
        );
      } else {
        gsap.set(cells, {
          willChange: mobile ? 'transform, opacity' : 'transform, opacity, clip-path',
        });
        tl.fromTo(
          cells,
          hidden,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            clipPath: mobile ? undefined : 'inset(0%)',
            duration: 0.9,
            ease: 'power3.out',
            stagger: { each: mobile ? 0.05 : 0.08, grid: 'auto', from: 'start' },
          },
        );
      }

      ScrollTrigger.create({
        trigger: grid,
        start: 'top 80%',
        // restart à l'entrée par le haut, reset (retour à l'état caché) en remontant.
        toggleActions: 'restart none none reset',
        animation: tl,
      });

      // Recalculer les positions ScrollTrigger après que toutes les images soient chargées.
      // Sans ça, le lazy loading décale les triggers (rangées qui grandissent après mesure initiale).
      const imgs = grid.querySelectorAll('img');
      if (imgs.length) {
        let pending = imgs.length;
        const done = () => {
          pending -= 1;
          if (pending <= 0) ScrollTrigger.refresh();
        };
        imgs.forEach((img) => {
          if (img.complete) {
            done();
          } else {
            img.addEventListener('load', done, { once: true });
            img.addEventListener('error', done, { once: true });
          }
        });
      }
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      aria-label="Galerie photos"
      className="bg-ivory-100 text-cacao-800 py-20 md:py-28"
    >
      <header className="container-page mb-14 md:mb-16">
        <p className="eyebrow mb-4">{gallery.eyebrow}</p>
        <h2
          data-reveal-lines
          className="font-display text-cacao-900 max-w-3xl"
          style={{ fontSize: 'var(--text-h2)' }}
        >
          {gallery.title}
        </h2>
      </header>

      <div
        ref={gridRef}
        className="container-wide grid grid-flow-row-dense grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[240px] gap-2"
      >
        {gallery.images.map((img) => (
          <figure
            key={img.src}
            data-gallery-cell
            className={`group relative overflow-hidden bg-cacao-800 cursor-pointer ${spanClass(img.span as 'normal' | 'wide' | 'tall')}`}
          >
            {/* Filtre chaud unifié appliqué à l’image uniquement */}
            <div
              className="absolute inset-0"
              style={{ filter: 'sepia(0.10) saturate(1.05) contrast(1.03)' }}
            >
              <MediaImage
                src={img.src}
                alt={img.alt}
                placeholderLabel="Photo : la coopérative"
                className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>
            {/* Voile cacao présent par défaut → disparaît au hover (« la photo s’éclaire ») */}
            <div
              aria-hidden
              className="absolute inset-0 bg-cacao-900/10 transition-colors duration-500 group-hover:bg-cacao-900/0"
            />
            <figcaption className="sr-only">{img.alt}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
