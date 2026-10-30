import { useParams } from 'react-router-dom';
import { useBlogPost } from '../api/queries.js';
import { sanitizeHtml } from '../content/sanitize.js';
import AsyncBlock from '../components/AsyncBlock.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const query = useBlogPost(slug);
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <AsyncBlock query={query}>
        {(p) => (
          <article>
            <h1 className="text-5xl">{p.title}</h1>
            <p className="mt-3 text-sm text-ink-soft">
              {p.author} · {p.readingMinutes} min read
            </p>
            {p.cover && <img src={p.cover} alt="" className="mt-8 w-full rounded-lg border border-sand" />}
            <div className="prose-article mt-8" dangerouslySetInnerHTML={{ __html: sanitizeHtml(p.html) }} />
          </article>
        )}
      </AsyncBlock>
    </div>
  );
}