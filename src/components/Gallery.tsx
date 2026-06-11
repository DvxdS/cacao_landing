import { gallery } from '../data/content';
import { useInView } from '../hooks/useInView';
import { MediaImage } from './MediaImage';

const spanClass = (span: 'normal' | 'wide' | 'tall') => {
  if (span === 'wide') return 'md:col-span-2';
  if (span === 'tall') return 'md:row-span-2';
  return '';
};

export function Gallery() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 });

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
        ref={ref}
        className={`container-wide grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[240px] gap-2 transition-opacity duration-700 ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {gallery.images.map((img, i) => (
          <figure
            key={img.src}
            className={`group relative overflow-hidden bg-cacao-800 ${spanClass(img.span as 'normal' | 'wide' | 'tall')}`}
            style={{ transitionDelay: inView ? `${i * 60}ms` : '0ms' }}
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
                className="absolute inset-0 w-full h-full transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
              />
            </div>
            {/* Voile cacao subtil au hover (par-dessus, non filtré) */}
            <div
              aria-hidden
              className="absolute inset-0 bg-cacao-900/0 transition-colors duration-500 group-hover:bg-cacao-900/20"
            />
            <figcaption className="sr-only">{img.alt}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
