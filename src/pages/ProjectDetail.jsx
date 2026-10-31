import { Link, useParams } from 'react-router-dom';
import { useProjects } from '../api/queries.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import AsyncBlock from '../components/AsyncBlock.jsx';
import Reveal from '../components/Reveal.jsx';
import NotFound from './NotFound.jsx';

function Detail({ project: p, next }) {
  usePageMeta(p.title, p.summary);
  return (
    <article>
      <Link to="/#work" className="text-sm text-dusk underline">← All work</Link>
      <Reveal as="h1" className="mt-6 text-5xl md:text-6xl">{p.title}</Reveal>
      <Reveal as="p" delay={80} className="mt-3 text-xl text-ink-soft">{p.summary}</Reveal>
      {p.image && (
        <Reveal delay={160}>
          <img src={p.image} alt={`${p.title} screenshot`} className="mt-10 w-full rounded-2xl border border-sand shadow-[0_30px_60px_-36px_rgba(27,26,23,0.5)]" />
        </Reveal>
      )}
      <div className="mt-10 max-w-[68ch] space-y-4">
        {p.description.map((para, n) => <Reveal as="p" key={n}>{para}</Reveal>)}
      </div>
      <Reveal as="ul" className="mt-8 flex flex-wrap gap-2">
        {p.technologies.map((t) => <li key={t} className="rounded-full bg-sand px-3 py-1 text-sm">{t}</li>)}
      </Reveal>
      <Reveal className="mt-8 flex gap-6">
        {p.liveUrl && <a className="text-dusk underline" href={p.liveUrl} target="_blank" rel="noreferrer">Open live site</a>}
        {p.repoUrl && <a className="text-dusk underline" href={p.repoUrl} target="_blank" rel="noreferrer">View source</a>}
      </Reveal>
      {next && next.id !== p.id && (
        <p className="mt-16 border-t border-sand pt-6">
          Next project: <Link className="text-dusk underline" to={`/projects/${next.slug}`}>{next.title}</Link>
        </p>
      )}
    </article>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const query = useProjects();
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <AsyncBlock query={query}>
        {(projects) => {
          const i = projects.findIndex((p) => p.slug === slug);
          if (i === -1) return <NotFound />;
          return <Detail key={slug} project={projects[i]} next={projects[(i + 1) % projects.length]} />;
        }}
      </AsyncBlock>
    </div>
  );
}