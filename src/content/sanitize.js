import DOMPurify from 'dompurify';

// Blog bodies are HTML from the CMS editor. Always sanitise before injecting into the page.
export function sanitizeHtml(html) {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ['target', 'rel'],
  });
}