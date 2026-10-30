import { API_BASE } from '../config/site.js';

export class ApiError extends Error {
  constructor(message, { status = 0, cause } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.cause = cause;
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// The backend is on a free Render tier and can take up to a minute to wake up,
// so requests get a long timeout and one automatic retry.
export async function request(path, { method = 'GET', body, signal, timeout = 60000, retries = 1 } = {}) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    const onAbort = () => controller.abort();
    signal?.addEventListener('abort', onAbort);
    try {
      const res = await fetch(`${API_BASE}${path}`, {
        method,
        headers: body ? { 'Content-Type': 'application/json', Accept: 'application/json' } : { Accept: 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
      let json = null;
      try {
        json = await res.json();
      } catch {
        /* non-JSON response */
      }
      if (!res.ok || (json && json.success === false)) {
        const err = new ApiError(json?.error || `Request failed (${res.status})`, { status: res.status });
        if (res.status >= 500 && attempt < retries) throw Object.assign(err, { retryable: true });
        throw err;
      }
      // Content routes wrap results as { success, data }; /api/health does not.
      return json && 'data' in json ? json.data : json;
    } catch (e) {
      if (signal?.aborted) throw e; // caller cancelled, do not retry
      lastError = e instanceof ApiError ? e : new ApiError('Could not reach the server', { cause: e });
      const retryable = e?.retryable || !(e instanceof ApiError);
      if (!retryable || attempt === retries) throw lastError;
      await sleep(2000);
    } finally {
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
    }
  }
  throw lastError;
}