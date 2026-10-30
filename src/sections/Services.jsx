import { useState } from 'react';
import { useServices } from '../api/queries.js';
import AsyncBlock from '../components/AsyncBlock.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionShell from '../components/SectionShell.jsx';

function ServicePanel({ s, delay }) {
  const [open, setOpen] = useState(false);
  const features = open ? s.features : s.features.slice(0, 3);
  return (
    <Reveal as="article" delay={delay} className="rounded-2xl border border-sand bg-white/70 p-6">
      <h3 className="text-2xl">{s.title}</h3>
      <div className="mt-3 space-y-3 text-ink-soft">
        {(open ? s.description : [s.summary]).map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {features.map((f) => <li key={f} className="rounded-full bg-sand px-3 py-1 text-sm">{f}</li>)}
      </ul>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-5 text-sm text-dusk underline"
      >
        {open ? 'Show less' : 'Read more'}
      </button>
    </Reveal>
  );
}

export default function Services() {
  const q = useServices();
  return (
    <AsyncBlock query={q} empty>
      {(items) => (
        <SectionShell id="services" title="What I do">
          <div className="grid gap-6">
            {items.map((s, i) => <ServicePanel key={s.id} s={s} delay={i * 100} />)}
          </div>
        </SectionShell>
      )}
    </AsyncBlock>
  );
}