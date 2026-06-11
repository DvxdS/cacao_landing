import {
  certifications,
  contact,
  footer,
  identity,
  nav,
} from '../data/content';

/**
 * Icônes brand inlinées — lucide-react v1.x ne fournit plus les logos sociaux
 * (politique trademark). Sources : marques déposées affichées à titre informatif.
 */
const SOCIAL_PATHS: Record<string, string> = {
  Facebook:
    'M22 12.06C22 6.49 17.52 2 11.94 2 6.36 2 1.87 6.49 1.87 12.06c0 5.03 3.67 9.2 8.46 9.95v-7.03H7.78v-2.92h2.55V9.85c0-2.52 1.5-3.91 3.79-3.91 1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.25 0-1.64.78-1.64 1.57v1.89h2.79l-.45 2.92h-2.34V22c4.79-.75 8.46-4.92 8.46-9.94z',
  Linkedin:
    'M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.34 18.34H5.67V9.99h2.67v8.35zM7 8.81a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1zm11.34 9.53h-2.66v-4.06c0-.97-.02-2.21-1.35-2.21-1.35 0-1.56 1.05-1.56 2.14v4.13H10.1V9.99h2.56v1.14h.04c.36-.68 1.23-1.4 2.53-1.4 2.7 0 3.2 1.78 3.2 4.1v4.51z',
  Instagram:
    'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.92 5.92 0 0 0-2.13 1.39A5.92 5.92 0 0 0 .63 4.15c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.73 1.46 1.39 2.13a5.92 5.92 0 0 0 2.13 1.39c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.92 5.92 0 0 0 2.13-1.39 5.92 5.92 0 0 0 1.39-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91A5.92 5.92 0 0 0 21.98 2.02 5.92 5.92 0 0 0 19.85.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z',
};

function SocialIcon({ name, size = 16 }: { name: string; size?: number }) {
  const d = SOCIAL_PATHS[name];
  if (!d) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="site-footer" className="bg-cacao-900 text-ivory-100 border-t border-gold-500/50">
      <div className="container-page py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Wordmark + baseline */}
        <div className="md:col-span-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gold-400" aria-hidden />
            <span className="font-display text-2xl text-ivory-50">
              {identity.name}
            </span>
          </div>
          <p className="mt-4 text-ivory-100/80 text-sm leading-relaxed max-w-xs">
            {identity.fullName}. {footer.baseline}
          </p>
        </div>

        {/* Navigation */}
        <nav aria-label="Liens du pied de page" className="md:col-span-3">
          <p className="eyebrow !text-gold-400 mb-4">{footer.linksTitle}</p>
          <ul className="space-y-2.5">
            {nav.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-ivory-100/80 hover:text-ivory-50 transition-colors text-sm"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Certifications */}
        <div className="md:col-span-2">
          <p className="eyebrow !text-gold-400 mb-4">{footer.certificationsTitle}</p>
          <ul className="space-y-2.5">
            {certifications.items.map((c) => (
              <li key={c.name} className="text-ivory-100/80 text-sm leading-snug">
                {c.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + réseaux */}
        <div className="md:col-span-3">
          <p className="eyebrow !text-gold-400 mb-4">{footer.contactTitle}</p>
          <address className="not-italic text-ivory-100/80 text-sm leading-relaxed space-y-1">
            <p>{identity.address}</p>
            <p>
              <a
                href={`mailto:${identity.email}`}
                className="hover:text-ivory-50 transition-colors"
              >
                {identity.email}
              </a>
            </p>
            <p>
              <a
                href={`tel:${identity.phone.replace(/\s+/g, '')}`}
                className="hover:text-ivory-50 transition-colors"
              >
                {identity.phone}
              </a>
            </p>
          </address>

          <ul className="mt-5 flex items-center gap-3">
            {footer.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-ivory-50/25 flex items-center justify-center text-ivory-100/80 hover:text-ivory-50 hover:border-gold-400 transition-colors"
                >
                  <SocialIcon name={s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory-50/10">
        <div className="container-page py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-ivory-100/60 text-xs leading-relaxed">{footer.legal}</p>
          <p className="text-ivory-100/40 text-xs">
            {contact.eyebrow} :{' '}
            <a
              href={`mailto:${identity.email}`}
              className="hover:text-ivory-100 transition-colors"
            >
              {identity.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
