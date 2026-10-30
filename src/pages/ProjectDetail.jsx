import { Link, useParams } from 'react-router-dom';
import { useProjects } from '../api/queries.js';
import AsyncBlock from '../components/AsyncBlock.jsx';
import NotFound from './NotFound.jsx';

export default function ProjectDetail() {
  const { slug } = useParams();
  const query = useProjects();
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <AsyncBlock query={query}>
        {(projects) => {
          const i = projects.findIndex((p) => p.slug === slug);
          if (i === -1) return <NotFound />;
          const p = projects[i];
          const next = projects[(i + 1) % projects.length];
          return (
            <article>
              <h1 className="text-5xl">{p.title}</h1>
              <p className="mt-3 text-ink-soft">{p.summary}</p>
              {p.image && <img src={p.image} alt={`${p.title} screenshot`} className="mt-10 w-full rounded-lg border border-sand" />}
              <div className="mt-10 space-y-4 max-w-[68ch]">
                {p.description.map((para, n) => <p key={n}>{para}</p>)}
              </div>
              <ul className="mt-8 flex flex-wrap gap-2">
                {p.technologies.map((t) => (
                  <li key={t} className="rounded-full bg-sand px-3 py-1 text-sm">{t}</li>
                ))}
              </ul>
              <p className="mt-8 flex gap-6">
                {p.liveUrl && <a className="underline text-dusk" href={p.liveUrl} target="_blank" rel="noreferrer">Open live site</a>}
                {p.repoUrl && <a className="underline text-dusk" href={p.repoUrl} target="_blank" rel="noreferrer">View source</a>}
              </p>
              {next && next.id !== p.id && (
                <p className="mt-16 border-t border-sand pt-6">
                  Next project: <Link className="underline text-dusk" to={`/projects/${next.slug}`}>{next.title}</Link>
                </p>
              )}
            </article>
          );
        }}
      </AsyncBlock>
    </div>
  );
}