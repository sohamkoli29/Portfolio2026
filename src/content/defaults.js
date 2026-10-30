// Fallbacks used only when the CMS does not provide a value.
// If you add a `tagline` field to the profile in the CMS, it overrides this.
export const FALLBACK_TAGLINE = 'Full Stack Web Developer';
export const AUTHOR_NAME = 'Soham Koli'; // shown instead of the CMS author "Admin"

// Content that is NOT in the CMS yet (it was hardcoded in the old site).
// Move these into the CMS later if you want to edit them without code.
export const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/sohamkoli29' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/soham029/' },
];

export const EDUCATION = [
  { period: '2023 – 2027', title: 'B.Tech Computer Science Engineering', org: 'Pimpri Chinchwad University' },
  { period: '2021 – 2023', title: 'Higher Secondary (11th–12th)', org: 'RCF School & Junior College, Kurul-Alibaug' },
  { period: '2010 – 2021', title: 'Secondary School (1st–10th)', org: 'David English Medium School, Chondhi-Alibaug' },
];