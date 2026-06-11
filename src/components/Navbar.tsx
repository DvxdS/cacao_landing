import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { identity, nav } from '../data/content';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ivory-50/95 backdrop-blur border-b border-cacao-900/10'
          : 'bg-transparent'
      }`}
    >
      <div className="container-page h-16 md:h-20 flex items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-2 group"
          aria-label={`${identity.name} — retour en haut`}
        >
          <span
            className={`h-2 w-2 rounded-full transition-colors ${
              scrolled ? 'bg-gold-500' : 'bg-gold-400'
            }`}
            aria-hidden
          />
          <span
            className={`font-display tracking-tight text-xl md:text-2xl transition-colors ${
              scrolled ? 'text-cacao-900' : 'text-ivory-50'
            }`}
          >
            {identity.name}
          </span>
        </a>

        <nav
          aria-label="Navigation principale"
          className="hidden md:flex items-center gap-8"
        >
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? 'text-cacao-800 hover:text-forest-600'
                  : 'text-ivory-50/90 hover:text-ivory-50'
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href={nav.cta.href}
            className="ml-2 inline-flex items-center px-5 py-2.5 rounded-sm bg-gold-500 text-cacao-900 text-sm font-semibold hover:bg-gold-400 transition-colors"
          >
            {nav.cta.label}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
          className={`md:hidden p-2 -mr-2 transition-colors ${
            scrolled ? 'text-cacao-900' : 'text-ivory-50'
          }`}
        >
          <Menu size={26} />
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-cacao-900 text-ivory-50 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="h-16 md:h-20 px-6 flex items-center justify-between border-b border-ivory-50/10">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gold-400" aria-hidden />
              <span className="font-display text-xl">
                {identity.name}
              </span>
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Fermer le menu"
              className="p-2 -mr-2 text-ivory-50"
            >
              <X size={26} />
            </button>
          </div>
          <nav
            aria-label="Navigation principale"
            className="flex-1 flex flex-col justify-center gap-8 px-8"
          >
            {nav.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={close}
                className="font-display text-3xl text-ivory-50 hover:text-gold-400 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href={nav.cta.href}
              onClick={close}
              className="mt-4 inline-flex items-center justify-center px-6 py-3 rounded-sm bg-gold-500 text-cacao-900 font-semibold w-fit"
            >
              {nav.cta.label}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
