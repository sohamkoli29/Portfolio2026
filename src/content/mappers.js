// Mappers turn raw CMS responses into the shapes the UI uses.
// If the CMS changes, only this file should need to change.
import { FALLBACK_TAGLINE, AUTHOR_NAME } from './defaults.js';

const str = (v) => (typeof v === 'string' ? v.trim() : '');
const arr = (v) => (Array.isArray(v) ? v : []);

export const slugify = (s) =>
  str(s).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export const paragraphs = (text) =>
  str(text).split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

// ---------- dates ----------
// Repairs typos like "0025-12-28" (year 25 -> 2025). Returns an ISO date or null.
export function safeDate(value) {
  const s = str(value);
  const m = s.match(/^(\d{1,4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  let year = Number(m[1]);
  if (year < 100) year += 2000;
  if (year < 1990 || year > 2100) return null;
  return `${String(year).padStart(4, '0')}-${m[2]}-${m[3]}`;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatMonthYear(value) {
  const d = safeDate(value);
  if (!d) return '';
  const [y, m] = d.split('-');
  return `${MONTHS[Number(m) - 1]} ${y}`;
}

export function dateRange(start, end, current) {
  const from = formatMonthYear(start);
  const to = current ? 'Present' : formatMonthYear(end);
  return [from, to].filter(Boolean).join(' – ');
}

export function durationLabel(start, end, current) {
  const s = safeDate(start);
  if (!s) return '';
  const e = current ? new Date().toISOString().slice(0, 10) : safeDate(end);
  if (!e) return '';
  const [sy, sm] = s.split('-').map(Number);
  const [ey, em] = e.split('-').map(Number);
  const months = (ey - sy) * 12 + (em - sm);
  if (months < 1) return '1 month';
  if (months < 12) return `${months} month${months === 1 ? '' : 's'}`;
  const y = Math.floor(months / 12);
  const r = months % 12;
  return r ? `${y} yr ${r} mo` : `${y} yr`;
}

const byDateDesc = (get) => (a, b) => {
  const x = get(a);
  const y = get(b);
  if (!x && !y) return 0;
  if (!x) return 1;
  if (!y) return -1;
  return x < y ? 1 : x > y ? -1 : 0;
};

// ---------- colours (light theme) ----------
const FALLBACK_TONE = '#3A3FA8';

function hexToHsl(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(str(hex));
  if (!m) return null;
  const n = parseInt(m[1], 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return { h, s, l };
}

function hslToHex({ h, s, l }) {
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * c).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// Keeps CMS colours readable on a light background: not too pale, not too dark.
export function toneColor(hex, { minL = 0.34, maxL = 0.58, minS = 0.35 } = {}) {
  const hsl = hexToHsl(hex);
  if (!hsl) return FALLBACK_TONE;
  return hslToHex({
    h: hsl.h,
    s: Math.max(hsl.s, minS),
    l: Math.min(maxL, Math.max(minL, hsl.l)),
  });
}

// ---------- about ----------
export function mapAbout(d = {}) {
  const name = str(d.title) || 'Soham Koli';
  return {
    id: d.id,
    name,
    nameWords: name.split(/\s+/).filter(Boolean),
    tagline: str(d.tagline) || str(d.role) || FALLBACK_TAGLINE,
    bio: paragraphs(d.description),
    image: str(d.image_url),
    cvUrl: str(d.cv_url),
    email: str(d.email),
    phone: str(d.phone),
    location: str(d.location),
  };
}

// ---------- projects ----------
export function mapProject(p = {}) {
  const created = str(p.created_at);
  return {
    id: p.id,
    slug: slugify(p.title) || String(p.id),
    title: str(p.title),
    summary: str(p.short_description),
    description: paragraphs(p.description),
    image: str(p.image_url),
    liveUrl: str(p.project_url),
    repoUrl: str(p.github_url),
    technologies: arr(p.technologies).map(str).filter(Boolean),
    featured: Boolean(p.featured),
    sortOrder: Number(p.sort_order) || 0,
    year: created ? created.slice(0, 4) : '',
    createdAt: created,
  };
}

export const mapProjects = (list) =>
  arr(list).map(mapProject).sort((a, b) => a.sortOrder - b.sortOrder || (a.createdAt < b.createdAt ? 1 : -1));

// ---------- skills ----------
const SKILL_NAMES = {
  react: 'React', nextjs: 'Next.js', nodejs: 'Node.js', expressjs: 'Express.js',
  mysql: 'MySQL', mongodb: 'MongoDB', tailwindcss: 'Tailwind CSS', bootstrapcss: 'Bootstrap',
  java: 'Java', python: 'Python', javascript: 'JavaScript', github: 'GitHub',
  postman: 'Postman', visualstudio: 'Visual Studio', webdesign: 'Web Design',
};

export function cleanSkillName(name) {
  const raw = str(name);
  const key = raw.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (SKILL_NAMES[key]) return SKILL_NAMES[key];
  if (raw.length > 4 && raw === raw.toUpperCase()) {
    return raw.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return raw;
}

export const mapSkills = (list) =>
  arr(list)
    .map((s) => {
      const name = cleanSkillName(s.name);
      return {
        id: s.id,
        name,
        key: slugify(name), // use this to pick an icon; CMS icon values are unreliable
        category: str(s.category) || 'Other',
        level: Math.min(100, Math.max(0, Number(s.proficiency) || 0)),
        color: toneColor(s.color),
        sortOrder: Number(s.sort_order) || 0,
      };
    })
    .sort((a, b) => a.sortOrder - b.sortOrder);

export function groupSkills(skills) {
  const groups = new Map();
  skills.forEach((s) => {
    if (!groups.has(s.category)) groups.set(s.category, []);
    groups.get(s.category).push(s);
  });
  return [...groups].map(([category, items]) => ({ category, skills: items }));
}

// ---------- experience ----------
export const mapExperience = (list) =>
  arr(list)
    .map((e) => ({
      id: e.id,
      company: str(e.company),
      position: str(e.position),
      description: paragraphs(e.description),
      start: safeDate(e.start_date),
      end: safeDate(e.end_date),
      current: Boolean(e.current),
      range: dateRange(e.start_date, e.end_date, e.current),
      duration: durationLabel(e.start_date, e.end_date, e.current),
      location: str(e.location),
      technologies: arr(e.technologies).map(str).filter(Boolean),
    }))
    .sort(byDateDesc((e) => e.start));

// ---------- certificates & achievements ----------
export const mapCertificates = (list) =>
  arr(list)
    .map((c) => {
      const date = safeDate(c.issue_date);
      return {
        id: c.id,
        title: str(c.title),
        issuer: str(c.issuer),
        date,
        year: date ? date.slice(0, 4) : '',
        credentialId: str(c.credential_id) || null,
        image: str(c.image_url),
        description: str(c.description),
        featured: Boolean(c.featured),
      };
    })
    .sort(byDateDesc((c) => c.date));

export const mapAchievements = (list) =>
  arr(list)
    .map((a) => {
      const date = safeDate(a.achievement_date);
      return {
        id: a.id,
        title: str(a.title),
        description: str(a.description),
        category: str(a.category),
        organization: str(a.organization),
        image: str(a.image_url),
        iconKey: str(a.icon) || 'trophy',
        color: toneColor(a.color),
        date,
        dateLabel: formatMonthYear(a.achievement_date),
        featured: Boolean(a.featured),
      };
    })
    .sort(byDateDesc((a) => a.date));

// ---------- services & testimonials ----------
export const mapServices = (list) =>
  arr(list)
    .map((s) => {
      const body = paragraphs(s.description);
      return {
        id: s.id,
        title: str(s.title),
        summary: body[0] || '',
        description: body,
        iconKey: str(s.icon),
        features: arr(s.features).map(str).filter(Boolean),
        sortOrder: Number(s.sort_order) || 0,
      };
    })
    .sort((a, b) => a.sortOrder - b.sortOrder);

const initials = (name) =>
  str(name).split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');

export const mapTestimonials = (list) =>
  arr(list).map((t) => ({
    id: t.id,
    name: str(t.name),
    initials: initials(t.name),
    role: str(t.role),
    company: str(t.company),
    quote: str(t.content),
    avatar: str(t.avatar_url),
    rating: Math.min(5, Math.max(0, Math.round(Number(t.rating) || 0))),
    featured: Boolean(t.featured),
  }));

// ---------- blog ----------
// Removes the empty blocks the rich-text editor leaves behind.
// Sanitising (XSS) is done separately, at render time, in content/sanitize.js.
export function cleanBlogHtml(html) {
  return str(html)
    .replace(/<(p|h[1-6])>\s*(<br\s*\/?>)?\s*<\/\1>/gi, '')
    .replace(/\n{2,}/g, '\n');
}

const stripTags = (html) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

export function mapBlogPost(b = {}) {
  const html = cleanBlogHtml(b.content);
  const words = stripTags(html).split(' ').filter(Boolean).length;
  const author = str(b.author);
  return {
    id: b.id,
    slug: str(b.slug) || slugify(b.title),
    title: str(b.title),
    excerpt: str(b.excerpt),
    html,
    cover: str(b.cover_image),
    tags: arr(b.tags).map(str).filter(Boolean),
    author: !author || author.toLowerCase() === 'admin' ? AUTHOR_NAME : author,
    publishedAt: str(b.published_at || b.created_at),
    readingMinutes: Math.max(1, Math.round(words / 200)),
    published: b.published !== false,
  };
}

export const mapBlogPosts = (list) =>
  arr(list)
    .map(mapBlogPost)
    .filter((p) => p.published)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));