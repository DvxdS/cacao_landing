import { partners } from '../data/content';

export function Partners() {
  // Doublé pour la boucle infinie sans rupture
  const rail = [...partners.items, ...partners.items];

  return (
    <section
      id="partners"
      aria-label="Partenaires et acheteurs"
      className="bg-ivory-50 text-cacao-800 py-14 md:py-16 border-y border-cacao-800/[0.06]"
    >
      <p className="eyebrow text-center mb-10">{partners.eyebrow}</p>

      {/* Marquee — désactivée en reduced-motion via media query CSS (.partners-track-static) */}
      <div className="relative overflow-hidden partners-marquee">
        <div className="flex w-max gap-16 md:gap-20 items-center partners-track">
          {rail.map((p, i) => (
            <img
              key={`${p.name}-${i}`}
              src={p.logo}
              alt={p.name}
              loading="lazy"
              className="h-10 md:h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 shrink-0"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.replaceWith(
                  Object.assign(document.createElement('span'), {
                    className:
                      'font-display text-xl text-cacao-700/60 shrink-0 px-2',
                    textContent: p.name,
                  }),
                );
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes partners-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .partners-track {
          animation: partners-scroll 32s linear infinite;
        }
        .partners-marquee:hover .partners-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .partners-track {
            animation: none;
            justify-content: center;
            flex-wrap: wrap;
            width: 100%;
            gap: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
}
