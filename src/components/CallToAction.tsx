type CtaButton = { label: string; href: string };

type Tone = 'light' | 'dark';

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  primary: CtaButton;
  secondary?: CtaButton;
  tone?: Tone;
  id?: string;
};

const TONE_CLASSES: Record<Tone, string> = {
  light: 'bg-ivory-100 text-cacao-800',
  dark: 'bg-cacao-900 text-ivory-50',
};

export function CallToAction({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  tone = 'light',
  id,
}: Props) {
  const isDark = tone === 'dark';

  return (
    <section
      id={id}
      aria-label={eyebrow}
      className={`${TONE_CLASSES[tone]} py-16 md:py-20 border-y ${
        isDark ? 'border-gold-500/30' : 'border-cacao-800/[0.08]'
      }`}
    >
      <div className="container-page text-center flex flex-col items-center">
        <p
          className={`eyebrow mb-4 ${isDark ? '!text-gold-400' : ''}`}
        >
          {eyebrow}
        </p>
        <h2
          data-reveal-lines
          className={`font-display max-w-3xl ${isDark ? 'text-ivory-50' : 'text-cacao-900'}`}
          style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`mt-5 max-w-2xl leading-relaxed text-[17px] ${
              isDark ? 'text-ivory-100/85' : 'text-cacao-700'
            }`}
          >
            {description}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={primary.href}
            className="inline-flex items-center px-7 py-3.5 rounded-sm bg-gold-500 text-cacao-900 font-semibold text-base hover:bg-gold-400 transition-colors"
          >
            {primary.label}
          </a>
          {secondary && (
            <a
              href={secondary.href}
              className={`inline-flex items-center px-7 py-3.5 rounded-sm border text-base font-medium transition-colors ${
                isDark
                  ? 'border-ivory-50/60 text-ivory-50 hover:bg-ivory-50/10'
                  : 'border-cacao-800/25 text-cacao-800 hover:border-forest-600 hover:text-forest-600'
              }`}
            >
              {secondary.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
