import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import Section from './Section';
import Modal from './Modal';

const BlogPreview = () => {
  const { blogs, isLoading } = usePortfolio();
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const published = blogs.filter(b => b.published);
  const featured = published.slice(0, 3);

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const readTime = (content) => `${Math.ceil(content.replace(/<[^>]*>/g,'').split(/\s+/).length / 200)} min read`;

  const Card = ({ blog }) => (
    <div className="dark-card" style={{ overflow: 'hidden', cursor: 'pointer' }} onClick={() => setSelected(blog)}>
      <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
        {blog.cover_image ? (
          <img src={blog.cover_image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(6,182,212,0.15) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '2rem', color: 'rgba(255,255,255,0.08)' }}>Blog</span>
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(19,19,30,1) 0%, transparent 60%)' }} />
        {blog.tags?.[0] && (
          <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(124,58,237,0.7)', color: '#e9d5ff', fontSize: '0.7rem', fontWeight: 600, padding: '3px 10px', borderRadius: '99px', backdropFilter: 'blur(8px)' }}>
            {blog.tags[0]}
          </span>
        )}
      </div>
      <div style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '12px', color: '#524f6e', fontSize: '0.72rem', marginBottom: '8px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={10} /> {formatDate(blog.published_at || blog.created_at)}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={10} /> {readTime(blog.content)}</span>
        </div>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, color: '#f1f0ff', fontSize: '0.95rem', lineHeight: 1.4, marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {blog.title}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid rgba(124,58,237,0.1)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9490b5', fontSize: '0.75rem' }}>
            <User size={10} /> {blog.author}
          </span>
          <span style={{ color: '#8b5cf6', fontSize: '0.75rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
            Read More <ArrowRight size={11} />
          </span>
        </div>
      </div>
    </div>
  );

  if (isLoading && blogs.length === 0) {
    return (
      <Section id="blog" title="Recent Blogs">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
          {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: '300px', borderRadius: '16px' }} />)}
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section id="blog" title="Recent Blogs" subtitle="Thoughts, tutorials, and insights from my journey">
        {featured.length > 0 ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }} className="blog-grid">
              {featured.map(b => <Card key={b.id} blog={b} />)}
            </div>
            {published.length > 3 && (
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button onClick={() => setShowAll(true)} className="btn-outline">View All {published.length} Articles</button>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#524f6e' }}>
            <Calendar size={48} style={{ margin: '0 auto 1rem', display: 'block' }} />
            <p>Blog posts will appear once published.</p>
          </div>
        )}
      </Section>

      {selected && (
        <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected.title} size="lg">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {selected.cover_image && <img src={selected.cover_image} alt={selected.title} style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '12px' }} />}
            <div style={{ display: 'flex', gap: '16px', color: '#9490b5', fontSize: '0.82rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><User size={12} /> {selected.author}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={12} /> {formatDate(selected.published_at || selected.created_at)}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={12} /> {readTime(selected.content)}</span>
            </div>
            {selected.tags?.length > 0 && (
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {selected.tags.map((t, i) => <span key={i} className="tech-tag">{t}</span>)}
              </div>
            )}
            <div style={{ color: '#9490b5', lineHeight: 1.9 }} dangerouslySetInnerHTML={{ __html: selected.content }} />
          </div>
        </Modal>
      )}

      <Modal isOpen={showAll} onClose={() => setShowAll(false)} title={`All Articles (${published.length})`} size="xl">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px' }}>
          {published.map(b => <Card key={b.id} blog={b} />)}
        </div>
      </Modal>

      <style>{`
        @media (max-width: 900px) { .blog-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 600px) { .blog-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
};

export default BlogPreview;
