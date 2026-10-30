import { useState } from 'react';
import { useSkills } from '../api/queries.js';
import { groupSkills } from '../content/mappers.js';
import AsyncBlock from '../components/AsyncBlock.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionShell from '../components/SectionShell.jsx';

function SkillGroups({ skills }) {
  const [category, setCategory] = useState('All');
  const groups = groupSkills(skills);
  const shown = category === 'All' ? groups : groups.filter((g) => g.category === category);
  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter skills by category">
        {['All', ...groups.map((g) => g.category)].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={`rounded-full border px-4 py-1.5 text-sm ${category === c ? 'border-ink bg-ink text-porcelain' : 'border-sand bg-white/60'}`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-10 sm:grid-cols-2">
        {shown.map((g, gi) => (
          <Reveal key={g.category} delay={gi * 80}>
            <h3 className="text-xl">{g.category}</h3>
            <ul className="mt-4 space-y-3">
              {g.skills.map((s) => (
                <li key={s.id}>
                  <div className="flex justify-between text-sm">
                    <span>{s.name}</span>
                    <span className="text-ink-soft">{s.level}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-sand">
                    <div className="h-full rounded-full" style={{ width: `${s.level}%`, background: s.color }} />
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </>
  );
}

export default function Skills() {
  const q = useSkills();
  return (
    <SectionShell id="skills" title="Skills" intro="Each sphere in the orbit is one of these skills; bigger means stronger.">
      <AsyncBlock query={q}>{(skills) => <SkillGroups skills={skills} />}</AsyncBlock>
    </SectionShell>
  );
}