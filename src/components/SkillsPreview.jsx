import React, { useState, useMemo } from 'react';
import { Code2, Server, Database, Palette, Award } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import Section from './Section';
import Modal from './Modal';

const SkillsPreview = () => {
  const { skills, isLoading } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getCategoryIcon = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'frontend': return Code2;
      case 'backend': return Server;
      case 'database': return Database;
      case 'design': return Palette;
      default: return Award;
    }
  };

  const byCategory = useMemo(() => {
    if (!skills.length) return [];
    const grouped = {};
    skills.forEach(s => {
      const cat = s.category || 'Other';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(s);
    });
    return Object.entries(grouped).map(([cat, items]) => ({ cat, items: items.sort((a,b) => b.proficiency - a.proficiency) }));
  }, [skills]);

  const preview = byCategory.slice(0, 4);

  // Default skills for display when loading
  const defaultSkills = [
    { cat: 'Frontend', items: [{ name: 'React', proficiency: 90 }, { name: 'Tailwind CSS', proficiency: 85 }, { name: 'JavaScript', proficiency: 95 }] },
    { cat: 'Backend', items: [{ name: 'Node.js', proficiency: 85 }, { name: 'Express.js', proficiency: 80 }, { name: 'REST APIs', proficiency: 85 }] },
    { cat: 'Database', items: [{ name: 'MongoDB', proficiency: 80 }, { name: 'Supabase', proficiency: 75 }, { name: 'PostgreSQL', proficiency: 70 }] },
    { cat: 'Tools', items: [{ name: 'Git', proficiency: 88 }, { name: 'Vercel', proficiency: 85 }, { name: 'VS Code', proficiency: 92 }] },
  ];

  const displayData = preview.length > 0 ? preview : defaultSkills;

  const SkillRow = ({ skill }) => (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <span style={{ color: '#c4b5fd', fontSize: '0.82rem', fontWeight: 500 }}>{skill.name}</span>
        <span style={{ color: '#7c3aed', fontSize: '0.75rem', fontWeight: 600 }}>{skill.proficiency}%</span>
      </div>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" style={{ width: `${skill.proficiency}%` }} />
      </div>
    </div>
  );

  if (isLoading && skills.length === 0) {
    return (
      <Section id="skills" title="My Skills" dark>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
          {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: '220px', borderRadius: '16px' }} />)}
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section id="skills" title="My Skills" subtitle="Technologies and tools I work with daily" dark>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="skills-grid">
          {displayData.map((group, i) => {
            const Icon = getCategoryIcon(group.cat);
            return (
              <div key={i} className="dark-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '36px', height: '36px',
                    background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(236,72,153,0.2))',
                    borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <Icon size={16} color="#a78bfa" />
                  </div>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, color: '#f1f0ff', fontSize: '0.9rem' }}>{group.cat}</span>
                </div>
                {group.items.slice(0, 5).map((s, si) => <SkillRow key={si} skill={s} />)}
              </div>
            );
          })}
        </div>

        {skills.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button onClick={() => setIsModalOpen(true)} className="btn-primary">
              View All {skills.length} Skills
            </button>
          </div>
        )}
      </Section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="All Skills & Expertise" size="xl">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
          {byCategory.map((group, i) => {
            const Icon = getCategoryIcon(group.cat);
            return (
              <div key={i}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(124,58,237,0.15)' }}>
                  <Icon size={18} color="#8b5cf6" />
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#f1f0ff' }}>{group.cat}</span>
                  <span style={{ marginLeft: 'auto', color: '#524f6e', fontSize: '0.75rem' }}>{group.items.length} skills</span>
                </div>
                {group.items.map((s, si) => <SkillRow key={si} skill={s} />)}
              </div>
            );
          })}
        </div>
      </Modal>

      <style>{`
        @media (max-width: 900px) { .skills-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 500px) { .skills-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
};

export default SkillsPreview;
