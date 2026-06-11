import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../data/content';

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateProgress = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) {
      setProgress(1);
      setAtStart(true);
      setAtEnd(true);
      return;
    }
    const p = el.scrollLeft / max;
    setProgress(Math.min(1, Math.max(0, p)));
    setAtStart(el.scrollLeft < 4);
    setAtEnd(el.scrollLeft > max - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateProgress();
    const onScroll = () => updateProgress();
    el.addEventListener('scroll', onScroll, { passive: true });
    const onResize = () => updateProgress();
    window.addEventListener('resize', onResize);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [updateProgress]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-testimonial-card]');
    const cardW = card ? card.offsetWidth + 24 /* gap-6 */ : el.clientWidth * 0.9;
    el.scrollBy({ left: dir * cardW, behavior: 'smooth' });
  };

  return (
    <section
      id="testimonials"
      aria-label="Témoignages"
      className="relative isolate bg-ivory-200 text-cacao-800 py-24 md:py-32 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[url('/media/cocoa-bg-pattern.jpg')] bg-cover bg-center opacity-[0.07] mix-blend-multiply pointer-events-none"
      />

      <div className="container-page relative">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">{testimonials.eyebrow}</p>
            <h2
              data-reveal-lines
              className="font-display text-cacao-900"
              style={{ fontSize: 'var(--text-h2)' }}
            >
              {testimonials.title}
            </h2>
            <p className="mt-5 text-cacao-700 leading-relaxed prose-narrow">
              {testimonials.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={atStart}
              aria-label="Témoignage précédent"
              className="w-11 h-11 rounded-full border border-cacao-800/20 flex items-center justify-center text-cacao-800 hover:border-forest-600 hover:text-forest-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={atEnd}
              aria-label="Témoignage suivant"
              className="w-11 h-11 rounded-full border border-cacao-800/20 flex items-center justify-center text-cacao-800 hover:border-forest-600 hover:text-forest-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} aria-hidden />
            </button>
          </div>
        </header>

        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Témoignages des membres et acheteurs"
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-6 px-6 testimonials-track"
        >
          {testimonials.items.map((t, i) => (
            <article
              key={`${t.author}-${i}`}
              data-testimonial-card
              role="group"
              aria-roledescription="slide"
              aria-label={`Témoignage ${i + 1} sur ${testimonials.items.length}`}
              className="snap-start shrink-0 w-[88%] sm:w-[420px] md:w-[420px] bg-white border border-cacao-800/[0.08] p-8 md:p-10 flex flex-col"
            >
              <Quote
                size={36}
                strokeWidth={1}
                className="text-gold-500/60 mb-6"
                aria-hidden
              />
              <blockquote className="font-display italic text-cacao-900 text-[19px] md:text-[21px] leading-snug flex-1">
                « {t.quote} »
              </blockquote>
              <div className="mt-8 pt-6 border-t border-cacao-800/[0.08] flex items-center gap-4">
                <span className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={t.avatar}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = 'none';
                      const fallback = el.nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 hidden items-center justify-center bg-forest-600 text-ivory-50 font-medium text-sm tracking-wide"
                  >
                    {t.initials}
                  </span>
                </span>
                <div>
                  <p className="font-medium text-cacao-900 leading-tight">{t.author}</p>
                  <p className="text-sm text-cacao-700 mt-0.5 leading-tight">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Barre de progression */}
        <div className="mt-8 h-[2px] bg-cacao-800/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gold-500 transition-[width] duration-150 ease-out"
            style={{ width: `${Math.max(4, progress * 100)}%` }}
          />
        </div>
      </div>

      <style>{`
        .testimonials-track::-webkit-scrollbar { display: none; }
        .testimonials-track { scrollbar-width: none; }
      `}</style>
    </section>
  );
}
