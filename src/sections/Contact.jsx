import { useState } from 'react';
import { useAbout, useSendMessage } from '../api/queries.js';
import { SOCIAL_LINKS } from '../content/defaults.js';
import AsyncBlock from '../components/AsyncBlock.jsx';
import Magnetic from '../components/Magnetic.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionShell from '../components/SectionShell.jsx';

function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the mailto link still works */
    }
  };
  return (
    <p className="flex flex-wrap items-center gap-3">
      <a className="text-xl underline text-dusk" href={`mailto:${email}`}>{email}</a>
      <button onClick={copy} className="rounded-full border border-sand bg-white/60 px-3 py-1 text-sm" aria-live="polite">
        {copied ? 'Copied' : 'Copy'}
      </button>
    </p>
  );
}

export default function Contact() {
  const about = useAbout();
  const send = useSendMessage();
  const [lastSent, setLastSent] = useState(0);
  const [cooldown, setCooldown] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    if (form.get('website')) return; // honeypot: real people never fill this hidden field
    if (Date.now() - lastSent < 30000) {
      setCooldown(true);
      return;
    }
    setCooldown(false);
    send.mutate(
      { name: form.get('name'), email: form.get('email'), message: form.get('message') },
      { onSuccess: () => { setLastSent(Date.now()); formEl.reset(); } },
    );
  };

  const field = 'rounded-lg border border-sand bg-white px-4 py-3';

  return (
    <SectionShell id="contact" title="Let's work together" intro="Have a project in mind, or an opportunity to discuss? Write to me.">
      <AsyncBlock query={about}>
        {(a) => (
          <Reveal className="mb-10 space-y-4">
            {a.email && <CopyEmail email={a.email} />}
            <ul className="flex gap-5 text-sm">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" className="underline">{s.label}</a></li>
              ))}
            </ul>
          </Reveal>
        )}
      </AsyncBlock>

      <Reveal as="form" onSubmit={onSubmit} className="grid max-w-xl gap-4">
        <label className="grid gap-1">Name
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="grid gap-1">Email
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
        <label className="grid gap-1">Message
          <textarea name="message" required rows={5} className={field} />
        </label>
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <div>
          <Magnetic>
            <button type="submit" disabled={send.isPending} className="rounded-full bg-ink px-8 py-3 text-porcelain disabled:opacity-60">
              {send.isPending ? 'Sending…' : 'Send message'}
            </button>
          </Magnetic>
        </div>
        <p role="status" aria-live="polite" className="min-h-6 text-sm">
          {send.isSuccess && 'Message sent. I will reply by email.'}
          {send.isError && `Message not sent: ${send.error.message}. Try again or email me directly.`}
          {cooldown && 'Please wait 30 seconds before sending another message.'}
        </p>
      </Reveal>
    </SectionShell>
  );
}