import { useExperience } from '../api/queries.js';
import { EDUCATION } from '../content/defaults.js';
import AsyncBlock from '../components/AsyncBlock.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionShell from '../components/SectionShell.jsx';

export default function Experience() {
  const q = useExperience();
  return (
    <SectionShell id="experience" title="Experience">
      <AsyncBlock query={q}>
        {(items) => (
          <ol className="relative space-y-12 border-l border-ink/20 pl-8">
            {items.map((e, i) => (
              <Reveal as="li" key={e.id} delay={i * 100} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[2.45rem] top-2 size-3 rounded-full ${i === 0 ? 'bg-marigold' : 'bg-dusk'}`}
                />
                <p className="text-sm text-ink-soft">{e.range} · {e.duration}{e.location ? ` · ${e.location}` : ''}</p>
                <h3 className="mt-1 text-2xl">{e.position}, {e.company}</h3>
                {e.description.map((p, n) => <p key={n} className="mt-3 max-w-[62ch]">{p}</p>)}
                <ul className="mt-4 flex flex-wrap gap-2">
                  {e.technologies.map((t) => <li key={t} className="rounded-full bg-sand px-3 py-0.5 text-xs">{t}</li>)}
                </ul>
              </Reveal>
            ))}
          </ol>
        )}
      </AsyncBlock>

      <Reveal className="mt-20">
        <h3 className="text-2xl">Education</h3>
        <ul className="mt-5 space-y-4">
          {EDUCATION.map((e) => (
            <li key={e.title}>
              <p className="font-medium">{e.title}</p>
              <p className="text-sm text-ink-soft">{e.org} · {e.period}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </SectionShell>
  );
}