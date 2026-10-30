import { useState } from 'react';
import { useCertificates, useAchievements, useTestimonials } from '../api/queries.js';
import { setHover } from '../three/sceneState.js';
import AsyncBlock from '../components/AsyncBlock.jsx';
import Lightbox from '../components/Lightbox.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionShell from '../components/SectionShell.jsx';

function Certificates({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2">
        {items.map((c, i) => (
          <Reveal as="li" key={c.id} delay={(i % 2) * 90}>
            <button
              onClick={() => setOpen(c)}
              onPointerEnter={() => setHover('proof', i)}
              onPointerLeave={() => setHover('proof', -1)}
              onFocus={() => setHover('proof', i)}
              onBlur={() => setHover('proof', -1)}
              className="block w-full rounded-xl text-left"
            >
              {c.image && (
                <img src={c.image} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-xl border border-sand bg-sand object-contain" />
              )}
              <h3 className="mt-3 text-lg">{c.title}</h3>
              <p className="text-sm text-ink-soft">{c.issuer} · {c.year}</p>
            </button>
          </Reveal>
        ))}
      </ul>
      <Lightbox open={Boolean(open)} onClose={() => setOpen(null)} label={open?.title || 'Certificate'}>
        {open && (
          <div>
            {open.image && <img src={open.image} alt={`${open.title} certificate`} className="w-full rounded-lg border border-sand" />}
            <h3 className="mt-4 text-2xl">{open.title}</h3>
            <p className="text-ink-soft">{open.issuer} · {open.year}</p>
            {open.credentialId && <p className="mt-2 text-sm">Credential ID: {open.credentialId}</p>}
            {open.description && <p className="mt-4 max-w-[62ch]">{open.description}</p>}
          </div>
        )}
      </Lightbox>
    </>
  );
}

function Achievements({ items }) {
  return (
    <ul className="mt-16 space-y-6">
      {items.map((a, i) => (
        <Reveal as="li" key={a.id} delay={i * 90} className="border-l-4 pl-5" style={{ borderColor: a.color }}>
          <h3 className="text-xl">{a.title}</h3>
          <p className="text-sm text-ink-soft">{[a.organization, a.dateLabel].filter(Boolean).join(' · ')}</p>
          {a.description && <p className="mt-2 max-w-[62ch] text-ink-soft">{a.description}</p>}
        </Reveal>
      ))}
    </ul>
  );
}

function Testimonials({ items }) {
  return (
    <div className="mt-16 space-y-8">
      {items.map((t) => (
        <Reveal as="figure" key={t.id} className="rounded-2xl border border-sand bg-white/70 p-6">
          <p className="text-marigold" role="img" aria-label={`${t.rating} out of 5 stars`}>
            {'★'.repeat(t.rating)}
          </p>
          <blockquote className="mt-3 text-xl leading-snug">{t.quote}</blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            {t.avatar ? (
              <img src={t.avatar} alt="" className="size-11 rounded-full object-cover" />
            ) : (
              <span className="grid size-11 place-items-center rounded-full bg-sand text-sm">{t.initials}</span>
            )}
            <span>
              <span className="block font-medium">{t.name}</span>
              <span className="block text-sm text-ink-soft">{[t.role, t.company].filter(Boolean).join(', ')}</span>
            </span>
          </figcaption>
        </Reveal>
      ))}
    </div>
  );
}

export default function Proof() {
  const certs = useCertificates();
  const wins = useAchievements();
  const quotes = useTestimonials();
  return (
    <SectionShell id="proof" title="Certificates and kind words" intro="Click a certificate to see it in full.">
      <AsyncBlock query={certs} empty>{(items) => <Certificates items={items} />}</AsyncBlock>
      <AsyncBlock query={wins} empty>{(items) => <Achievements items={items} />}</AsyncBlock>
      <AsyncBlock query={quotes} empty>{(items) => <Testimonials items={items} />}</AsyncBlock>
    </SectionShell>
  );
}