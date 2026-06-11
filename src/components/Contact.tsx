import { useState, type FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Check } from 'lucide-react';
import { contact, identity } from '../data/content';
import { useInView } from '../hooks/useInView';

export function Contact() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1200);
  };

  return (
    <section
      id="contact"
      aria-label="Nous contacter"
      className="bg-ivory-50 text-cacao-800 py-20 md:py-28"
    >
      <div ref={ref} className="container-page">
        <header className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow mb-4">{contact.eyebrow}</p>
          <h2
            data-reveal-lines
            className="font-display text-cacao-900"
            style={{ fontSize: 'var(--text-h2)' }}
          >
            {contact.title}
          </h2>
          <p className="mt-5 text-cacao-700 leading-relaxed text-lg">
            {contact.intro}
          </p>
        </header>

        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 transition-all duration-700 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Coordonnées + carte */}
          <div className="lg:col-span-5 space-y-8">
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-ivory-100 border border-cacao-800/10 flex items-center justify-center">
                  <MapPin size={18} className="text-gold-600" aria-hidden />
                </span>
                <div>
                  <p className="font-medium text-cacao-900">Siège de la coopérative</p>
                  <p className="text-cacao-700 mt-0.5">{identity.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-ivory-100 border border-cacao-800/10 flex items-center justify-center">
                  <Phone size={18} className="text-gold-600" aria-hidden />
                </span>
                <div>
                  <p className="font-medium text-cacao-900">Téléphone</p>
                  <a
                    href={`tel:${identity.phone.replace(/\s+/g, '')}`}
                    className="text-cacao-700 hover:text-forest-600 mt-0.5 inline-block"
                  >
                    {identity.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-ivory-100 border border-cacao-800/10 flex items-center justify-center">
                  <Mail size={18} className="text-gold-600" aria-hidden />
                </span>
                <div>
                  <p className="font-medium text-cacao-900">E-mail</p>
                  <a
                    href={`mailto:${identity.email}`}
                    className="text-cacao-700 hover:text-forest-600 mt-0.5 inline-block"
                  >
                    {identity.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-ivory-100 border border-cacao-800/10 flex items-center justify-center">
                  <Clock size={18} className="text-gold-600" aria-hidden />
                </span>
                <div>
                  <p className="font-medium text-cacao-900">Horaires</p>
                  <p className="text-cacao-700 mt-0.5">{identity.hours}</p>
                </div>
              </li>
            </ul>

            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-cacao-800/15 bg-cacao-900">
              <iframe
                src={contact.mapEmbedUrl}
                title="Localisation de la coopérative à Soubré"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-7">
            {sent ? (
              <div
                role="status"
                aria-live="polite"
                className="bg-white border border-forest-600/30 p-10 flex flex-col items-center text-center"
              >
                <span className="w-14 h-14 rounded-full bg-forest-600 text-ivory-50 flex items-center justify-center mb-5">
                  <Check size={26} strokeWidth={2.5} aria-hidden />
                </span>
                <p className="font-display text-xl text-cacao-900 max-w-md">
                  {contact.form.success}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-cacao-800/[0.08] p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-5"
                noValidate
              >
                <Field
                  id="contact-name"
                  label={contact.form.name}
                  required
                  autoComplete="name"
                />
                <Field
                  id="contact-email"
                  label={contact.form.email}
                  type="email"
                  required
                  autoComplete="email"
                />
                <Field
                  id="contact-phone"
                  label={contact.form.phone}
                  type="tel"
                  autoComplete="tel"
                  className="md:col-span-2"
                />
                <TextareaField
                  id="contact-message"
                  label={contact.form.message}
                  required
                  className="md:col-span-2"
                />

                <button
                  type="submit"
                  disabled={sending}
                  className="md:col-span-2 mt-2 inline-flex items-center justify-center px-7 py-3.5 rounded-sm bg-gold-500 text-cacao-900 font-semibold hover:bg-gold-400 disabled:opacity-60 disabled:cursor-wait transition-colors"
                >
                  {sending ? 'Envoi en cours…' : contact.form.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
};

function Field({ id, label, type = 'text', required, autoComplete, className = '' }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-cacao-800 mb-2">
        {label}
        {required && <span className="text-gold-600 ml-1">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full px-4 py-3 bg-ivory-50 border border-cacao-800/15 rounded-sm text-cacao-900 placeholder:text-cacao-700/40 focus:border-forest-600 focus:outline-none focus:ring-2 focus:ring-forest-600/30 transition-colors"
      />
    </div>
  );
}

function TextareaField({
  id,
  label,
  required,
  className = '',
}: Omit<FieldProps, 'type' | 'autoComplete'>) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-cacao-800 mb-2">
        {label}
        {required && <span className="text-gold-600 ml-1">*</span>}
      </label>
      <textarea
        id={id}
        name={id}
        required={required}
        rows={5}
        className="w-full px-4 py-3 bg-ivory-50 border border-cacao-800/15 rounded-sm text-cacao-900 placeholder:text-cacao-700/40 focus:border-forest-600 focus:outline-none focus:ring-2 focus:ring-forest-600/30 transition-colors resize-y"
      />
    </div>
  );
}
