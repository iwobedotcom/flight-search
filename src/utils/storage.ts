const TTL_HOURS = 6;
const TTL_MS = TTL_HOURS * 60 * 60 * 1000;

export function saveWithTTL<T>(key: string, value: T) {
  const payload = {
    value,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(payload));
}

export function loadWithTTL<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > TTL_MS) {
      localStorage.removeItem(key);
      return null;
    }
    return parsed.value as T;
  } catch {
    return null;
  }
}

export function clearStored(key: string) {
  localStorage.removeItem(key);
}
