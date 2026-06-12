import { Check, MapPin, ScanLine, FileCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { traceability } from '../data/content';
import { useInView } from '../hooks/useInView';

const ICONS: Record<string, LucideIcon> = {
  MapPin,
  ScanLine,
  FileCheck,
};

export function Traceability() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="traceability"
      aria-label="Traçabilité et conformité EUDR"
      className="relative isolate bg-cacao-800 text-ivory-50 py-24 md:py-32 overflow-hidden"
    >
      {/* Texture cacao subtile — soft-light pour rester visible sur fond sombre */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[url('/media/cocoa-bg-pattern.jpg')] bg-cover bg-center opacity-[0.10] mix-blend-soft-light pointer-events-none"
      />
      <div
        ref={ref}
        className={`relative z-10 container-page grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center transition-all duration-700 ease-out ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Cartographie des parcelles — colonne gauche */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="relative rounded-sm bg-cacao-900/40 border border-gold-500/20 p-6 md:p-10">
            <img
              src={traceability.mapImage}
              alt="Cartographie des parcelles géolocalisées de la coopérative"
              loading="lazy"
              className="w-full h-auto rounded-sm"
            />
            <p className="eyebrow !text-gold-400 text-[10px] mt-6 text-center">
              45 villages · 12 400 hectares cartographiés
            </p>
          </div>
        </div>

        {/* Texte — colonne droite */}
        <div className="lg:col-span-5 order-1 lg:order-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cacao-900/70 border border-gold-500/60 text-ivory-50 text-sm font-medium">
              <Check size={16} strokeWidth={2.5} className="text-gold-400" aria-hidden />
              {traceability.badge}
            </span>
            <img
              src={traceability.eudrLogo}
              alt="Logo EUDR — Règlement UE 2023/1115"
              loading="lazy"
              className="h-10 w-auto opacity-85"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>

          <p className="eyebrow !text-gold-400 mt-8 mb-4">{traceability.eyebrow}</p>
          <h2
            data-reveal-lines
            className="font-display text-ivory-50"
            style={{ fontSize: 'var(--text-h2)', lineHeight: 1.1 }}
          >
            {traceability.title}
          </h2>
          <p className="mt-6 text-ivory-100/85 leading-relaxed text-[17px]">
            {traceability.intro}
          </p>

          <ul className="mt-10 space-y-5">
            {traceability.points.map((point) => {
              const Icon = ICONS[point.icon] ?? MapPin;
              return (
                <li key={point.text} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full border border-gold-500/50 flex items-center justify-center mt-0.5">
                    <Icon size={18} strokeWidth={1.6} className="text-gold-400" aria-hidden />
                  </span>
                  <span className="text-ivory-50 text-base leading-relaxed pt-1.5">
                    {point.text}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
