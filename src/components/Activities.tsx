import { Sprout, Truck, Factory, Ship } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { activities } from '../data/content';
import { useInView } from '../hooks/useInView';

const ICONS: Record<string, LucideIcon> = {
  Sprout,
  Truck,
  Factory,
  Ship,
};

export function Activities() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="activities"
      aria-label="Nos activités"
      className="relative isolate bg-ivory-50 text-cacao-800 py-20 md:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[url('/media/cocoa-bg-pattern.jpg')] bg-cover bg-center opacity-[0.07] mix-blend-multiply pointer-events-none"
      />
      <div ref={ref} className="container-page relative">
        <header className="max-w-3xl mb-14 md:mb-20">
          <p className="eyebrow mb-4">{activities.eyebrow}</p>
          <h2
            data-reveal-lines
            className="font-display text-cacao-900"
            style={{ fontSize: 'var(--text-h2)' }}
          >
            {activities.title}
          </h2>
        </header>

        {/* Grille relative qui héberge la ligne pointillée or */}
        <div className="relative">
          {/* Ligne pointillée or — desktop uniquement, à mi-hauteur des icônes */}
          <div
            aria-hidden
            className="hidden md:block absolute top-[68px] left-0 right-0 border-t border-dashed border-gold-500/55 z-0"
          />

          <ol className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative z-10">
            {activities.items.map((item, i) => {
              const Icon = ICONS[item.icon] ?? Sprout;
              return (
                <li
                  key={item.title}
                  className={`group relative bg-ivory-50 transition-all duration-700 ease-out ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: inView ? `${i * 100}ms` : '0ms' }}
                >
                  {/* Pastille icône — son fond ivory-50 interrompt la ligne pointillée */}
                  <div className="flex justify-center md:block">
                    <div className="relative inline-flex items-center justify-center w-[88px] h-[88px] bg-ivory-50">
                      <div className="w-16 h-16 rounded-full bg-white border border-cacao-800/10 flex items-center justify-center transition-colors group-hover:border-forest-600">
                        <Icon
                          size={26}
                          strokeWidth={1.5}
                          className="text-gold-600 transition-colors group-hover:text-forest-600"
                          aria-hidden
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 md:mt-6 text-center md:text-left">
                    <p className="eyebrow !text-cacao-700/70 text-[10px] mb-2">
                      Étape {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="font-display text-2xl text-cacao-900">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-cacao-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
