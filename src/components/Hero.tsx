import { ChevronDown } from 'lucide-react';
import { hero } from '../data/content';
import { MediaImage } from './MediaImage';
import { useGsap } from '../hooks/useGsap';
import { gsap, SplitText, isReducedMotion } from '../lib/gsap';

export function Hero() {
  const ref = useGsap<HTMLElement>((_ctx, root) => {
    const reduced = isReducedMotion();

    const veil = root.querySelector<HTMLElement>('[data-hero-veil]');
    const title = root.querySelector<HTMLElement>('[data-hero-title]');
    const eyebrow = root.querySelector<HTMLElement>('[data-hero-eyebrow]');
    const sub = root.querySelector<HTMLElement>('[data-hero-sub]');
    const ctas = root.querySelectorAll<HTMLElement>('[data-hero-ctas] > *');
    const scrollHint = root.querySelector<HTMLElement>('[data-hero-scroll]');

    if (reduced) {
      gsap.set([veil, title, eyebrow, sub, ...ctas, scrollHint].filter(Boolean), {
        autoAlpha: 1,
        y: 0,
      });
      return;
    }

    // Le voile est déjà rendu avec opacity 1 par défaut via CSS — on l'a juste mis à 0
    // dans preHideTargets. On l'amène à 1 en début de timeline.
    const tl = gsap.timeline({ delay: 0.15 });

    if (veil) {
      tl.fromTo(veil, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' });
    }

    if (title) {
      const split = new SplitText(title, {
        type: 'lines',
        linesClass: 'split-line',
        mask: 'lines',
      });
      tl.set(title, { autoAlpha: 1 }, '<');
      tl.fromTo(
        split.lines,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.95, ease: 'power3.out', stagger: 0.08 },
        '-=0.3',
      );
    }

    if (eyebrow) {
      tl.fromTo(
        eyebrow,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.55',
      );
    }
    if (sub) {
      tl.fromTo(
        sub,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        '-=0.35',
      );
    }
    if (ctas.length) {
      tl.fromTo(
        ctas,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.08 },
        '-=0.3',
      );
    }
    if (scrollHint) {
      tl.fromTo(scrollHint, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, '-=0.1');
    }
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Présentation de la coopérative"
      className="relative isolate min-h-screen md:min-h-[92vh] flex items-end overflow-hidden bg-cacao-900 text-ivory-50"
    >
      <MediaImage
        src={hero.image.src}
        alt={hero.image.alt}
        loading="eager"
        placeholderLabel="Photo : plantation"
        className="absolute inset-0 -z-10 w-full h-full"
      />

      <div
        data-hero-veil
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-tr from-cacao-900/90 via-cacao-900/55 to-cacao-900/10"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-cacao-900/85 to-transparent"
      />

      <div className="relative w-full container-page pb-24 pt-32 md:pb-28 pl-2 sm:pl-6 md:pl-12 lg:pl-20">
        <p data-hero-eyebrow className="eyebrow !text-gold-400 mb-5 max-w-xl">
          {hero.eyebrow}
        </p>
        <h1
          data-hero-title
          className="font-display text-ivory-50 max-w-3xl tracking-tight"
          style={{ fontSize: 'var(--text-h1)', lineHeight: 1.05 }}
        >
          {hero.title}
        </h1>
        <p
          data-hero-sub
          className="mt-6 text-lg md:text-xl text-ivory-100/85 max-w-2xl leading-relaxed"
        >
          {hero.subtitle}
        </p>

        <div data-hero-ctas className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={hero.ctaPrimary.href}
            className="inline-flex items-center px-7 py-3.5 rounded-sm bg-gold-500 text-cacao-900 font-semibold text-base hover:bg-gold-400 transition-colors"
          >
            {hero.ctaPrimary.label}
          </a>
          <a
            href={hero.ctaSecondary.href}
            className="inline-flex items-center px-7 py-3.5 rounded-sm border border-ivory-50/70 text-ivory-50 font-medium text-base hover:bg-ivory-50/10 transition-colors"
          >
            {hero.ctaSecondary.label}
          </a>
        </div>
      </div>

      <a
        data-hero-scroll
        href="#figures"
        aria-label="Faire défiler vers la suite"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory-50/70 hover:text-ivory-50 transition-colors group"
      >
        <span className="eyebrow !text-ivory-50/60 text-[10px] group-hover:!text-ivory-50/90">
          Découvrir
        </span>
        <ChevronDown size={20} className="motion-safe:animate-bounce" aria-hidden />
      </a>
    </section>
  );
}
