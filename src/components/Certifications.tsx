import { certifications } from '../data/content';
import { useInView } from '../hooks/useInView';
import { CertBadge } from './CertBadge';

export function Certifications() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="certifications"
      aria-label="Nos certifications"
      className="bg-ivory-100 text-cacao-800 py-20 md:py-28"
    >
      <div ref={ref} className="container-page text-center">
        <p className="eyebrow mb-4">{certifications.eyebrow}</p>
        <h2
          data-reveal-lines
          className="font-display text-cacao-900 max-w-3xl mx-auto"
          style={{ fontSize: 'var(--text-h2)' }}
        >
          {certifications.title}
        </h2>

        <ul className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.items.map((cert, i) => (
            <li
              key={cert.name}
              className={`bg-white border border-cacao-800/[0.08] p-10 flex flex-col items-center text-center transition-all duration-700 ease-out ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: inView ? `${i * 120}ms` : '0ms' }}
            >
              <CertBadge src={cert.logo} alt={cert.name} monogram={cert.monogram} />

              <h3 className="mt-7 font-display text-xl text-cacao-900">
                {cert.name}
              </h3>
              <p className="mt-3 text-cacao-700 leading-relaxed text-[15px] max-w-xs">
                {cert.summary}
              </p>
              <p className="eyebrow !text-gold-600 text-[10px] mt-6">
                Certifié depuis {cert.since}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
