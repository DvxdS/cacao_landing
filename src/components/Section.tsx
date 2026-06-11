import type { ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

type Tone = 'ivory' | 'ivory-soft' | 'dark' | 'forest';

type Props = {
  id: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  tone?: Tone;
  fullBleed?: boolean;
  children?: ReactNode;
  className?: string;
};

const TONE_CLASSES: Record<Tone, string> = {
  ivory: 'bg-ivory-100 text-cacao-800',
  'ivory-soft': 'bg-ivory-200 text-cacao-800',
  dark: 'bg-cacao-800 text-ivory-50',
  forest: 'bg-forest-700 text-ivory-50',
};

export function Section({
  id,
  eyebrow,
  title,
  intro,
  tone = 'ivory',
  fullBleed = false,
  children,
  className = '',
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const isDark = tone === 'dark' || tone === 'forest';

  return (
    <section
      id={id}
      className={`${TONE_CLASSES[tone]} py-20 md:py-28 ${className}`.trim()}
    >
      <div
        ref={ref}
        className={`mx-auto ${fullBleed ? 'max-w-none px-0' : 'max-w-6xl px-6'} transition-all duration-700 ease-out ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {(eyebrow || title || intro) && (
          <header className={`mb-12 md:mb-16 ${fullBleed ? 'px-6 max-w-3xl mx-auto text-center' : 'max-w-3xl'}`}>
            {eyebrow && (
              <p
                className={`eyebrow mb-4 ${isDark ? '!text-gold-400' : ''}`}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={`font-display ${isDark ? 'text-ivory-50' : 'text-cacao-900'}`}
                style={{ fontSize: 'var(--text-h2)' }}
              >
                {title}
              </h2>
            )}
            {intro && (
              <p
                className={`mt-5 text-lg leading-relaxed ${isDark ? 'text-ivory-100/85' : 'text-cacao-700'}`}
              >
                {intro}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
