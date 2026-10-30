import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../api/queries.js';
import { setHover } from '../three/sceneState.js';
import AsyncBlock from '../components/AsyncBlock.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionShell from '../components/SectionShell.jsx';
import Tilt from '../components/Tilt.jsx';

const LEAD_COUNT = 6;

function ProjectCard({ p, index }) {
  const on = () => setHover('work', index);
  const off = () => setHover('work', -1);
  return (
    <Tilt>
      <Link
        to={`/projects/${p.slug}`}
        onPointerEnter={on}
        onPointerLeave={off}
        onFocus={on}
        onBlur={off}
        className="group block rounded-xl"
      >
        {p.image && (
          <img src={p.image} alt="" loading="lazy" className="aspect-video w-full rounded-xl border border-sand object-cover object-top" />
        )}
        <h3 className="mt-4 text-xl group-hover:underline">{p.title}</h3>
        <p className="mt-1 text-ink-soft">{p.summary}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {p.technologies.slice(0, 3).map((t) => <li key={t} className="rounded-full bg-sand px-3 py-0.5 text-xs">{t}</li>)}
        </ul>
      </Link>
    </Tilt>
  );
}

function Gallery({ projects }) {
  const [tech, setTech] = useState('All');
  const [showAll, setShowAll] = useState(false);

  // The technologies used most often become filter buttons.
  const topTech = useMemo(() => {
    const counts = new Map();
    projects.forEach((p) => p.technologies.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)));
    return [...counts].sort((a, b) => b[1] - a[1]).slice(0, 7).map(([t]) => t);
  }, [projects]);

  const filtered = tech === 'All' ? projects : projects.filter((p) => p.technologies.includes(tech));
  const visible = tech === 'All' && !showAll ? filtered.slice(0, LEAD_COUNT) : filtered;

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by technology">
        {['All', ...topTech].map((t) => (
          <button
            key={t}
            onClick={() => setTech(t)}
            aria-pressed={tech === t}
            className={`rounded-full border px-4 py-1.5 text-sm ${tech === t ? 'border-ink bg-ink text-porcelain' : 'border-sand bg-white/60'}`}
          >
            {t}
          </button>
        ))}
      </div>
      <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
        {visible.map((p, i) => (
          <Reveal as="li" key={p.id} delay={(i % 2) * 90}>
            <ProjectCard p={p} index={projects.indexOf(p)} />
          </Reveal>
        ))}
      </ul>
      {tech === 'All' && projects.length > LEAD_COUNT && (
        <button onClick={() => setShowAll((v) => !v)} className="mt-12 rounded-full border border-ink px-6 py-2.5">
          {showAll ? 'Show fewer' : `Show all ${projects.length} projects`}
        </button>
      )}
    </>
  );
}

export default function Projects() {
  const q = useProjects();
  return (
    <SectionShell id="work" title="Work" intro="Selected projects. Hover a card to bring it forward in the 3D stack.">
      <AsyncBlock query={q}>{(projects) => <Gallery projects={projects} />}</AsyncBlock>
    </SectionShell>
  );
}