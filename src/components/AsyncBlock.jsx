// Shows a loading, error or empty state for a query, then the content.
export default function AsyncBlock({ query, empty, children }) {
  if (query.isPending) {
    return (
      <p role="status" className="text-ink-soft">
        Loading… the first visit can take up to a minute while the server wakes up.
      </p>
    );
  }
  if (query.isError) {
    return (
      <p role="alert" className="text-ink">
        This section could not load.{' '}
        <button className="underline text-dusk" onClick={() => query.refetch()}>
          Try again
        </button>
      </p>
    );
  }
  const data = query.data;
  if (empty && (!data || (Array.isArray(data) && data.length === 0))) return null;
  return children(data);
}