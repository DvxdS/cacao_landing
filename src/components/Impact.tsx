import { School, Heart, Users, Droplets } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { impact } from '../data/content';
import { useInView } from '../hooks/useInView';

const ICONS: Record<string, LucideIcon> = {
  School,
  Heart,
  Users,
  Droplets,
};

export function Impact() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="impact"
      aria-label="Gouvernance et impact communautaire"
      className="relative isolate bg-ivory-100 text-cacao-800 py-20 md:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[url('/media/cocoa-bg-pattern.jpg')] bg-cover bg-center opacity-[0.07] mix-blend-multiply pointer-events-none"
      />
      <div ref={ref} className="container-page relative">
        <header className="max-w-3xl mb-14 md:mb-16">
          <p className="eyebrow mb-4">{impact.eyebrow}</p>
          <h2
            data-reveal-lines
            className="font-display text-cacao-900"
            style={{ fontSize: 'var(--text-h2)' }}
          >
            {impact.title}
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Gouvernance */}
          <div
            className={`lg:col-span-5 transition-all duration-700 ease-out ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h3 className="font-display text-2xl md:text-3xl text-cacao-900">
              {impact.governance.title}
            </h3>
            <p className="mt-5 text-cacao-700 leading-relaxed text-[17px]">
              {impact.governance.text}
            </p>

            <div className="mt-10 border-l-2 border-gold-500 pl-6">
              <p
                className="font-display text-gold-600"
                style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', lineHeight: 1 }}
              >
                {impact.governance.highlight.value}
              </p>
              <p className="eyebrow !text-cacao-700/80 mt-3">
                {impact.governance.highlight.label}
              </p>
            </div>
          </div>

          {/* Impact communautaire */}
          <div
            className={`lg:col-span-7 transition-all duration-700 ease-out ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: inView ? '120ms' : '0ms' }}
          >
            <h3 className="font-display text-2xl md:text-3xl text-cacao-900">
              {impact.community.title}
            </h3>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {impact.community.tiles.map((tile) => {
                const Icon = ICONS[tile.icon] ?? Heart;
                return (
                  <li
                    key={tile.label}
                    className="bg-white border border-cacao-800/[0.08] p-6 flex items-start gap-5"
                  >
                    <span className="flex-shrink-0 w-12 h-12 rounded-full bg-ivory-100 flex items-center justify-center">
                      <Icon
                        size={22}
                        strokeWidth={1.6}
                        className="text-gold-600"
                        aria-hidden
                      />
                    </span>
                    <div>
                      <p
                        className="font-display text-cacao-900"
                        style={{ fontSize: '2rem', lineHeight: 1 }}
                      >
                        {tile.value}
                      </p>
                      <p className="mt-2 text-cacao-700 text-sm leading-snug">
                        {tile.label}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
