import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-32">
      <h1 className="text-5xl">Page not found</h1>
      <p className="mt-4 text-ink-soft">That address does not exist on this site.</p>
      <Link to="/" className="mt-6 inline-block underline text-dusk">Back to the home page</Link>
    </section>
  );
}