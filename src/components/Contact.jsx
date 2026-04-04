import React, { useState } from 'react';
import { Mail, Send, MapPin, Phone, CheckCircle, XCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import portfolioService from '../services/api';
import Section from './Section';

const Contact = () => {
  const { about } = usePortfolio();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); if (error) setError(null); };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSubmitting(true); setError(null);
    try {
      const result = await portfolioService.submitContact(form);
      if (result.success) { setSubmitted(true); setForm({ name: '', email: '', subject: '', message: '' }); setTimeout(() => setSubmitted(false), 5000); }
      else setError(result.error || 'Failed to send. Please try again.');
    } catch { setError('Unexpected error. Please try again later.'); }
    finally { setSubmitting(false); }
  };

  const inp = { width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '10px', padding: '0.8rem 1rem', color: '#f1f0ff', fontSize: '0.88rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box' };
  const lbl = { display: 'block', color: '#9490b5', fontSize: '0.78rem', fontWeight: 500, marginBottom: '5px' };
  const fo = (e) => e.target.style.borderColor = 'rgba(124,58,237,0.5)';
  const bl = (e) => e.target.style.borderColor = 'rgba(124,58,237,0.2)';

  return (
    <Section id="contact" title="Let's Work Together" subtitle="Ready to start a project? Let's talk">
      <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '3.5rem', alignItems: 'start' }}>

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <p style={{ color: '#9490b5', lineHeight: 1.8, fontSize: '0.92rem' }}>
            I'm always open to discussing new opportunities, creative projects, or just having a chat about technology.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: Mail, label: 'Email', value: about?.email },
              { icon: Phone, label: 'Phone', value: about?.phone },
              { icon: MapPin, label: 'Location', value: about?.location },
            ].filter(i => i.value).map(({ icon: Icon, label, value }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={16} color="#8b5cf6" />
                </div>
                <div>
                  <p style={{ color: '#524f6e', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1px' }}>{label}</p>
                  <p style={{ color: '#c4b5fd', fontSize: '0.85rem' }}>{value}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.18)', borderRadius: '14px', padding: '1.1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.6)' }} />
              <span style={{ color: '#22c55e', fontSize: '0.78rem', fontWeight: 600 }}>Available for Work</span>
            </div>
            <p style={{ color: '#9490b5', fontSize: '0.78rem', lineHeight: 1.5 }}>Open to freelance & full-time. Remote worldwide.</p>
          </div>
        </div>

        {/* Form */}
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2.5rem', background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '20px' }}>
            <CheckCircle size={44} color="#22c55e" style={{ margin: '0 auto 1rem', display: 'block' }} />
            <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, color: '#f1f0ff', marginBottom: '0.5rem' }}>Message Sent!</h3>
            <p style={{ color: '#9490b5', fontSize: '0.88rem' }}>I'll get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {error && (
              <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '0.8rem 1rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <XCircle size={14} color="#ef4444" /><span style={{ color: '#fca5a5', fontSize: '0.82rem' }}>{error}</span>
              </div>
            )}
            <div className="contact-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={lbl}>Your Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" style={inp} onFocus={fo} onBlur={bl} />
              </div>
              <div>
                <label style={lbl}>Email Address</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" style={inp} onFocus={fo} onBlur={bl} />
              </div>
            </div>
            <div>
              <label style={lbl}>Subject</label>
              <input type="text" name="subject" value={form.subject} onChange={handleChange} required placeholder="Project Inquiry" style={inp} onFocus={fo} onBlur={bl} />
            </div>
            <div>
              <label style={lbl}>Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell me about your project..." style={{ ...inp, resize: 'vertical', minHeight: '110px' }} onFocus={fo} onBlur={bl} />
            </div>
            <button type="submit" disabled={submitting} className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '0.85rem' }}>
              {submitting
                ? <><div style={{ width: '15px', height: '15px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Sending...</>
                : <><Send size={14} /> Send Message</>}
            </button>
          </form>
        )}
      </div>
    </Section>
  );
};

export default Contact;
