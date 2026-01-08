// pages/vdc/app/_lib/auth.js
import { CONFIG } from "./config";

const STORAGE_KEY = "vdc_auth_tokens_v1";

export function buildLoginUrl() {
  const url = new URL(`${CONFIG.cognitoDomain}/login`);
  url.searchParams.set("client_id", CONFIG.clientId);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", CONFIG.scopes.join(" "));
  url.searchParams.set("redirect_uri", CONFIG.redirectUri);
  return url.toString();
}

export function buildLogoutUrl() {
  const url = new URL(`${CONFIG.cognitoDomain}/logout`);
  url.searchParams.set("client_id", CONFIG.clientId);
  url.searchParams.set("logout_uri", CONFIG.logoutUri);
  return url.toString();
}

export function saveTokens(tokens) {
  const nowSec = Math.floor(Date.now() / 1000);
  const expiresAt = nowSec + Number(tokens.expires_in || 3600);
  const payload = {
    ...tokens,
    expires_at: expiresAt,
    saved_at: nowSec,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  return payload;
}

export function getTokens() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearTokens() {
  localStorage.removeItem(STORAGE_KEY);
}

export function isExpired(tokens, skewSeconds = 60) {
  if (!tokens?.expires_at) return true;
  const now = Math.floor(Date.now() / 1000);
  return now >= tokens.expires_at - skewSeconds;
}

// Safer base64url decode for JWT payloads
function base64UrlDecode(str) {
  try {
    const pad = "=".repeat((4 - (str.length % 4)) % 4);
    const base64 = (str + pad).replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(base64);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function parseJwt(token) {
  try {
    const part = token.split(".")[1];
    if (!part) return null;
    return base64UrlDecode(part);
  } catch {
    return null;
  }
}

export function getUserGroupsFromIdToken(idToken) {
  const claims = parseJwt(idToken);
  const raw = claims?.["cognito:groups"];
  // Possible shapes: undefined, string, array
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "string") {
    const s = raw.trim();
    if (!s) return [];
    // comma-separated string support
    if (s.includes(",")) return s.split(",").map((x) => x.trim()).filter(Boolean);
    return [s];
  }
  return [];
}

export function requireAuthOrRedirect(router) {
  const tokens = getTokens();
  if (!tokens || isExpired(tokens)) {
    clearTokens();
    window.location.href = buildLoginUrl();
    return false;
  }
  return true;
}
