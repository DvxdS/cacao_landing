import { video } from '../data/content';
import { useGsap } from '../hooks/useGsap';
import { gsap, isMobileViewport, isReducedMotion } from '../lib/gsap';

export function VideoSection() {
  const ref = useGsap<HTMLElement>((_ctx, root) => {
    const wrapper = root.querySelector<HTMLElement>('[data-video-wrapper]');
    if (!wrapper) return;

    if (isReducedMotion() || isMobileViewport()) return;

    gsap.fromTo(
      wrapper,
      { scale: 0.92, borderRadius: 6 },
      {
        scale: 1,
        borderRadius: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
          end: 'top 25%',
          scrub: true,
        },
      },
    );
  }, []);

  return (
    <section
      ref={ref}
      id="video"
      aria-label="Vidéo de présentation"
      className="bg-ivory-50 text-cacao-800 py-20 md:py-28 overflow-hidden"
    >
      <div className="container-wide">
        <header className="max-w-3xl mb-10 md:mb-14">
          <p className="eyebrow mb-4">{video.eyebrow}</p>
          <h2
            data-reveal-lines
            className="font-display text-cacao-900"
            style={{ fontSize: 'var(--text-h2)' }}
          >
            {video.title}
          </h2>
          <p className="mt-5 text-cacao-700 leading-relaxed text-lg prose-narrow">
            {video.description}
          </p>
        </header>

        <div
          data-video-wrapper
          className="relative aspect-video overflow-hidden border border-cacao-800/15 bg-cacao-900"
          style={{ willChange: 'transform' }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={video.title}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={video.videoSrc} type={video.videoType} />
            Votre navigateur ne prend pas en charge la lecture vidéo HTML5.
          </video>
        </div>
      </div>
    </section>
  );
}
