// Your old .env may end with "/api" (the old site added paths like "/content/about").
// The new client adds "/api" itself, so a trailing "/api" is removed here. Both styles work.
const raw = import.meta.env.VITE_API_URL || 'https://websmith-backend-8nck.onrender.com';
export const API_BASE = raw.replace(/\/+$/, '').replace(/\/api$/, '');