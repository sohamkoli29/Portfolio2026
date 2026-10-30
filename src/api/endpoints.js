import { request } from './client.js';

export const api = {
  health: () => request('/api/health', { retries: 0 }),
  about: (signal) => request('/api/content/about', { signal }),
  projects: (signal) => request('/api/content/projects', { signal }),
  skills: (signal) => request('/api/content/skills', { signal }),
  experience: (signal) => request('/api/content/experience', { signal }),
  services: (signal) => request('/api/content/services', { signal }),
  testimonials: (signal) => request('/api/content/testimonials', { signal }),
  certificates: (signal) => request('/api/certificates', { signal }),
  achievements: (signal) => request('/api/achievements', { signal }),
  blogs: (signal) => request('/api/content/blogs', { signal }),
  blog: (idOrSlug, signal) => request(`/api/content/blogs/${encodeURIComponent(idOrSlug)}`, { signal }),
  sendMessage: ({ name, email, message }) =>
    request('/api/content/contact', { method: 'POST', body: { name, email, message }, retries: 0 }),
};