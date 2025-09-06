/**
 * Client-side validators (same rules as server)
 */

export function isValidUrl(u) {
  if (!u || typeof u !== 'string') return false;
  const re = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
  return re.test(u);
}

export function isValidValidity(v) {
  const n = Number(v);
  return Number.isInteger(n) && n > 0;
}

export function isValidShortcode(code) {
  if (!code) return true; // optional
  const re = /^[A-Za-z0-9]{4,12}$/;
  return re.test(code);
}
