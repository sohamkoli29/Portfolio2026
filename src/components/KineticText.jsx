// Headline whose letters rise in one after another. Screen readers get the plain text.
export default function KineticText({ words }) {
  const offsets = words.map((_, i) => words.slice(0, i).join('').length);
  return (
    <>
      <span className="sr-only">{words.join(' ')}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <span key={wi} className="mr-[0.25em] inline-block whitespace-nowrap">
            {[...word].map((ch, ci) => (
              <span key={ci} className="rise" style={{ '--d': `${(offsets[wi] + ci) * 45}ms` }}>
                {ch}
              </span>
            ))}
          </span>
        ))}
      </span>
    </>
  );
}