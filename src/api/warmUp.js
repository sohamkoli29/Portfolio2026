import { api } from './endpoints.js';

let started = null;

// Wakes the sleeping Render server as early as possible. Safe to call more than once.
export function warmUp() {
  if (!started) started = api.health().catch(() => null);
  return started;
}