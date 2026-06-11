import { useState } from 'react';

type Props = {
  src: string;
  alt: string;
  monogram: string;
};

/**
 * Logo de certification avec fallback élégant : cercle ivory à fin liseré or
 * portant le monogramme en typographie serif. Préserve la dignité du badge même
 * quand le fichier image est manquant.
 */
export function CertBadge({ src, alt, monogram }: Props) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-28 h-28 rounded-full border border-gold-500/70 bg-ivory-50 flex items-center justify-center"
      >
        <span className="font-display text-cacao-900 text-2xl tracking-wide">
          {monogram}
        </span>
      </div>
    );
  }

  return (
    <div className="w-28 h-28 flex items-center justify-center">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setErrored(true)}
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
}
