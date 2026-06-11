import { about } from '../data/content';
import { useInView } from '../hooks/useInView';
import { MediaImage } from './MediaImage';

export function About() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="about"
      aria-label="Notre histoire"
      className="bg-ivory-100 text-cacao-800 py-20 md:py-28"
    >
      <div
        ref={ref}
        className={`container-page grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center transition-all duration-700 ease-out ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Colonne photo — cadre or décalé (signature visuelle) */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="relative max-w-md mx-auto lg:max-w-none">
            <span
              aria-hidden
              className="absolute -inset-0 border border-gold-500 translate-x-3 translate-y-3 -z-0"
            />
            <MediaImage
              src={about.image.src}
              alt={about.image.alt}
              placeholderLabel="Photo : la coopérative"
              className="relative w-full aspect-[4/5] z-10"
            />
          </div>
        </div>

        {/* Colonne texte */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <p className="eyebrow mb-4">{about.eyebrow}</p>
          <h2
            data-reveal-lines
            className="font-display text-cacao-900"
            style={{ fontSize: 'var(--text-h2)' }}
          >
            {about.title}
          </h2>

          <div className="mt-6 space-y-5 text-cacao-700 text-[17px] leading-relaxed prose-narrow">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <figure className="mt-10 border-l-2 border-gold-500 pl-6">
            <blockquote className="font-display italic text-cacao-900 text-2xl md:text-[28px] leading-snug">
              « {about.pullQuote} »
            </blockquote>
            <figcaption className="mt-3 eyebrow !text-cacao-700 text-[11px]">
              — {about.pullQuoteAuthor}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
