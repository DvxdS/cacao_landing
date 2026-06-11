import { useState } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  placeholderLabel?: string;
  loading?: 'lazy' | 'eager';
  rounded?: string;
};

/**
 * Affiche une image et, si le fichier est manquant ou casse,
 * tombe sur un placeholder élégant cacao-800 avec motif subtil et label discret.
 */
export function MediaImage({
  src,
  alt,
  className = '',
  placeholderLabel,
  loading = 'lazy',
  rounded = '',
}: Props) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative overflow-hidden bg-cacao-800 ${rounded} ${className}`.trim()}
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(217,184,74,0.045) 0 1px, transparent 1px 14px), repeating-linear-gradient(-45deg, rgba(217,184,74,0.045) 0 1px, transparent 1px 14px)',
        }}
      >
        <div className="absolute inset-0 flex items-end p-5">
          <span className="eyebrow !text-gold-400/80 text-[11px]">
            {placeholderLabel ?? 'Photo'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      onError={() => setErrored(true)}
      className={`block object-cover ${rounded} ${className}`.trim()}
    />
  );
}
