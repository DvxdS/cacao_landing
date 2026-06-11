import { useEffect, useLayoutEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { KeyFigures } from './components/KeyFigures';
import { About } from './components/About';
import { Activities } from './components/Activities';
import { Certifications } from './components/Certifications';
import { Traceability } from './components/Traceability';
import { Gallery } from './components/Gallery';
import { VideoSection } from './components/VideoSection';
import { Testimonials } from './components/Testimonials';
import { Partners } from './components/Partners';
import { Impact } from './components/Impact';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackgroundStage } from './components/BackgroundStage';
import { CallToAction } from './components/CallToAction';
import { callToAction } from './data/content';
import { useLenis } from './hooks/useLenis';
import { preHideTargets, setupReveals } from './lib/reveals';
import { ScrollTrigger } from './lib/gsap';

function App() {
  useLenis();

  // Pré-masque les éléments avant le premier paint pour éviter le flash.
  useLayoutEffect(() => {
    preHideTargets();
  }, []);

  // Setup des reveals une fois les polices prêtes (SplitText dépend de la metric font).
  useEffect(() => {
    const run = () => {
      setupReveals();
      ScrollTrigger.refresh();
    };

    if (document.fonts && typeof document.fonts.ready?.then === 'function') {
      document.fonts.ready.then(run);
    } else {
      run();
    }

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <>
      <BackgroundStage />
      <Navbar />
      <main>
        <Hero />
        <KeyFigures />
        <About />
        <Activities />
        <Certifications />
        <Traceability />
        <CallToAction
          id="cta-buyer"
          eyebrow={callToAction.buyer.eyebrow}
          title={callToAction.buyer.title}
          description={callToAction.buyer.description}
          primary={callToAction.buyer.primary}
          secondary={callToAction.buyer.secondary}
        />
        <Gallery />
        <VideoSection />
        <Testimonials />
        <Partners />
        <CallToAction
          id="cta-partner"
          eyebrow={callToAction.partner.eyebrow}
          title={callToAction.partner.title}
          description={callToAction.partner.description}
          primary={callToAction.partner.primary}
          secondary={callToAction.partner.secondary}
        />
        <Impact />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
