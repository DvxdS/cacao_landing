import { keyFigures } from '../data/content';
import { useCountUp } from '../hooks/useCountUp';
import { useInView } from '../hooks/useInView';

const formatFR = new Intl.NumberFormat('fr-FR');

function Stat({
  value,
  label,
  start,
  delay,
}: {
  value: number;
  label: string;
  start: boolean;
  delay: number;
}) {
  const current = useCountUp(value, { start, duration: 1500 + delay });
  return (
    <div className="flex flex-col items-center text-center px-4 py-2">
      <span
        className="font-display text-ivory-50 leading-none"
        style={{ fontSize: 'clamp(2.75rem, 6vw, 4.5rem)' }}
      >
        {formatFR.format(current)}
      </span>
      <span className="eyebrow !text-gold-400 mt-4 text-[11px]">{label}</span>
    </div>
  );
}

export function KeyFigures() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section
      id="figures"
      aria-label="Chiffres clés de la coopérative"
      className="bg-forest-700 text-ivory-50"
    >
      <div
        ref={ref}
        className="container-page py-16 md:py-20 grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0 md:divide-x md:divide-ivory-50/15"
      >
        {keyFigures.items.map((item, i) => (
          <Stat
            key={item.label}
            value={item.value}
            label={item.label}
            start={inView}
            delay={i * 120}
          />
        ))}
      </div>
    </section>
  );
}
