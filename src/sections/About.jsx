import { useAbout } from '../api/queries.js';
import AsyncBlock from '../components/AsyncBlock.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionShell from '../components/SectionShell.jsx';
import Tilt from '../components/Tilt.jsx';

export default function About() {
  const q = useAbout();
  return (
    <SectionShell id="about" title="About">
      <AsyncBlock query={q}>
        {(a) => (
          <div className="grid gap-10 md:grid-cols-[14rem_1fr]">
            {a.image && (
              <Reveal>
                <Tilt>
                  <img src={a.image} alt={a.name} className="w-full max-w-[14rem] rounded-2xl border border-sand object-cover shadow-[0_20px_40px_-24px_rgba(27,26,23,0.4)]" />
                </Tilt>
              </Reveal>
            )}
            <div className="space-y-4">
              {a.bio.map((p, i) => <Reveal as="p" key={i} delay={i * 80}>{p}</Reveal>)}
              {a.location && <Reveal as="p" className="text-ink-soft">{a.location}</Reveal>}
              {a.cvUrl && (
                <Reveal>
                  <a href={a.cvUrl} target="_blank" rel="noreferrer" className="inline-block rounded-full border border-ink px-6 py-2.5">
                    Open resume
                  </a>
                </Reveal>
              )}
            </div>
          </div>
        )}
      </AsyncBlock>
    </SectionShell>
  );
}