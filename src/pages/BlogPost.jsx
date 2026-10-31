import { Link, useParams } from 'react-router-dom';
import { useBlogPost } from '../api/queries.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { sanitizeHtml } from '../content/sanitize.js';
import AsyncBlock from '../components/AsyncBlock.jsx';

function Post({ post: p }) {
  usePageMeta(p.title, p.excerpt);
  return (
    <article>
      <Link to="/blog" className="text-sm text-dusk underline">← All writing</Link>
      <h1 className="mt-6 text-5xl">{p.title}</h1>
      <p className="mt-3 text-sm text-ink-soft">
        {p.author} · {p.readingMinutes} min read
      </p>
      {p.cover && <img src={p.cover} alt="" className="mt-8 w-full rounded-lg border border-sand" />}
      <div className="prose-article mt-8" dangerouslySetInnerHTML={{ __html: sanitizeHtml(p.html) }} />
    </article>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const query = useBlogPost(slug);
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <AsyncBlock query={query}>{(p) => <Post post={p} />}</AsyncBlock>
    </div>
  );
}