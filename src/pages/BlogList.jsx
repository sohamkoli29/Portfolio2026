import { Link } from 'react-router-dom';
import { useBlogPosts } from '../api/queries.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import AsyncBlock from '../components/AsyncBlock.jsx';

export default function BlogList() {
  usePageMeta('Writing', 'Articles and notes by Soham Koli on web development and building real-world projects.');
  const query = useBlogPosts();
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-5xl">Writing</h1>
      <div className="mt-10">
        <AsyncBlock query={query}>
          {(posts) =>
            posts.length === 0 ? (
              <p className="text-ink-soft">No posts yet.</p>
            ) : (
              <ul className="space-y-10">
                {posts.map((p) => (
                  <li key={p.id}>
                    <Link to={`/blog/${p.slug}`} className="group block">
                      <h2 className="text-3xl group-hover:underline">{p.title}</h2>
                      <p className="mt-2 text-ink-soft">{p.excerpt}</p>
                      <p className="mt-2 text-sm text-ink-soft">{p.readingMinutes} min read</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )
          }
        </AsyncBlock>
      </div>
    </div>
  );
}