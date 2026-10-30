import Reveal from './Reveal.jsx';

// Shared frame for every section. Content stays in the left 58% on large screens,
// leaving the right side clear for the 3D scene.
export default function SectionShell({ id, title, intro, children }) {
  return (
    <section id={id} className="border-t border-sand">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="lg:max-w-[58%]">
          <Reveal as="h2" className="text-4xl md:text-5xl">{title}</Reveal>
          {intro && (
            <Reveal as="p" delay={80} className="mt-4 max-w-[60ch] text-ink-soft">{intro}</Reveal>
          )}
          <div className="mt-12">{children}</div>
        </div>
      </div>
    </section>
  );
}