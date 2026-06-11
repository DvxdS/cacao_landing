import { Check, MapPin, ScanLine, FileCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { traceability } from '../data/content';
import { useInView } from '../hooks/useInView';

const ICONS: Record<string, LucideIcon> = {
  MapPin,
  ScanLine,
  FileCheck,
};

/** Visuel SVG cadastral — parcelles géolocalisées, contours or, points pulsants. */
function ParcelMap() {
  return (
    <div className="relative aspect-[5/4] w-full">
      <svg
        viewBox="0 0 500 400"
        role="img"
        aria-label="Cartographie des parcelles géolocalisées de la coopérative"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="parcelFade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3E7A54" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#3E7A54" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* Polygones façon cadastre — formes organiques irrégulières */}
        <g
          stroke="#C9A227"
          strokeOpacity="0.42"
          strokeWidth="1.4"
          fill="none"
          strokeLinejoin="round"
        >
          <polygon points="30,40 130,32 168,82 122,140 38,128" fill="url(#parcelFade)" />
          <polygon points="130,32 220,28 244,86 168,82" />
          <polygon points="220,28 320,42 336,110 244,86" fill="url(#parcelFade)" />
          <polygon points="320,42 410,58 432,128 336,110" />
          <polygon points="410,58 470,80 472,154 432,128" fill="url(#parcelFade)" />

          <polygon points="38,128 122,140 138,210 50,220" />
          <polygon points="122,140 168,82 244,86 250,168 138,210" fill="url(#parcelFade)" />
          <polygon points="244,86 336,110 348,200 250,168" />
          <polygon points="336,110 432,128 440,224 348,200" fill="url(#parcelFade)" />
          <polygon points="432,128 472,154 478,250 440,224" />

          <polygon points="50,220 138,210 156,300 60,310" fill="url(#parcelFade)" />
          <polygon points="138,210 250,168 268,278 156,300" />
          <polygon points="250,168 348,200 366,300 268,278" fill="url(#parcelFade)" />
          <polygon points="348,200 440,224 454,318 366,300" />

          <polygon points="60,310 156,300 178,372 72,376" />
          <polygon points="156,300 268,278 290,372 178,372" fill="url(#parcelFade)" />
          <polygon points="268,278 366,300 380,372 290,372" />
          <polygon points="366,300 454,318 462,372 380,372" fill="url(#parcelFade)" />
        </g>

        {/* Points de géolocalisation pulsants */}
        <g>
          {[
            { cx: 168, cy: 110 },
            { cx: 320, cy: 70 },
            { cx: 250, cy: 220 },
            { cx: 400, cy: 180 },
            { cx: 120, cy: 280 },
            { cx: 380, cy: 330 },
          ].map((p, i) => (
            <g key={i} className="parcel-pin" style={{ animationDelay: `${i * 0.4}s` }}>
              <circle
                cx={p.cx}
                cy={p.cy}
                r="14"
                fill="none"
                stroke="#D9B84A"
                strokeOpacity="0.55"
                className="parcel-pin-ring"
              />
              <circle cx={p.cx} cy={p.cy} r="4" fill="#D9B84A" />
            </g>
          ))}
        </g>
      </svg>

      <style>{`
        @keyframes parcel-pulse {
          0% { r: 4; opacity: 0.85; }
          70% { r: 22; opacity: 0; }
          100% { r: 22; opacity: 0; }
        }
        .parcel-pin-ring {
          transform-origin: center;
          animation: parcel-pulse 2.6s ease-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .parcel-pin-ring { animation: none; }
        }
      `}</style>
    </div>
  );
}

export function Traceability() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="traceability"
      aria-label="Traçabilité et conformité EUDR"
      className="bg-cacao-800 text-ivory-50 py-24 md:py-32 overflow-hidden"
    >
      <div
        ref={ref}
        className={`container-page grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center transition-all duration-700 ease-out ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Visuel parcelles — colonne gauche */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="relative rounded-sm bg-cacao-900/40 border border-gold-500/20 p-6 md:p-10">
            <ParcelMap />
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
