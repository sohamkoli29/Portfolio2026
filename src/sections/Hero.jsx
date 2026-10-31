import { useAbout } from '../api/queries.js';
import { useSiteReady } from '../state/siteReady.js';
import AsyncBlock from '../components/AsyncBlock.jsx';
import KineticText from '../components/KineticText.jsx';
import Magnetic from '../components/Magnetic.jsx';
import Reveal from '../components/Reveal.jsx';

export default function Hero() {
  const q = useAbout();
  const ready = useSiteReady(); // false while the opening loader is still on screen
  return (
    <section id="home" className="mx-auto max-w-6xl px-6 pb-24 pt-28 md:min-h-[85vh]">
      <div className="lg:max-w-[58%]">
        <AsyncBlock query={q}>
          {(a) => (
            <>
              <h1 className="text-6xl md:text-7xl xl:text-8xl">
                {ready ? <KineticText words={a.nameWords} /> : <span className="invisible">{a.name}</span>}
              </h1>
              {ready && (
                <>
                  <Reveal as="p" delay={600} className="mt-6 text-2xl text-ink-soft">{a.tagline}</Reveal>
                  <Reveal delay={750} className="mt-10 flex flex-wrap gap-4">
                    <Magnetic>
                      <a href="#contact" className="inline-block rounded-full bg-ink px-7 py-3 text-porcelain">Get in touch</a>
                    </Magnetic>
                    <Magnetic>
                      <a href="#work" className="inline-block rounded-full border border-ink px-7 py-3">See my work</a>
                    </Magnetic>
                  </Reveal>
                </>
              )}
            </>
          )}
        </AsyncBlock>
      </div>
    </section>
  );
}