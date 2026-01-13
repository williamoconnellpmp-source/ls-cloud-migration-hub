import { CONFIG } from "./config";

const TOKENS_KEY = "vdc_tokens";
const PKCE_VERIFIER_KEY = "vdc_pkce_verifier";

/**
 * PKCE helpers (must exist in this file)
 */
function base64UrlEncode(bytes) {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  const b64 = btoa(bin);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function sha256Bytes(str) {
  const enc = new TextEncoder();
  const data = enc.encode(str);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return new Uint8Array(digest);
}

function randomVerifier(len = 64) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const rnd = new Uint8Array(len);
  crypto.getRandomValues(rnd);
  let out = "";
  for (let i = 0; i < rnd.length; i++) out += chars[rnd[i] % chars.length];
  return out;
}

/**
 * Storage wrappers (avoid crashing if storage is blocked)
 */
function storePkceVerifier(verifier) {
  try {
    sessionStorage.setItem(PKCE_VERIFIER_KEY, verifier);
    return;
  } catch (_) {}
  try {
    localStorage.setItem(PKCE_VERIFIER_KEY, verifier);
  } catch (_) {}
}

function loadPkceVerifier() {
  try {
    const v = sessionStorage.getItem(PKCE_VERIFIER_KEY);
    if (v) return v;
  } catch (_) {}
  try {
    return localStorage.getItem(PKCE_VERIFIER_KEY);
  } catch (_) {
    return null;
  }
}

function clearPkceVerifier() {
  try {
    sessionStorage.removeItem(PKCE_VERIFIER_KEY);
  } catch (_) {}
  try {
    localStorage.removeItem(PKCE_VERIFIER_KEY);
  } catch (_) {}
}

export function saveTokens(tokens) {
  // only valid in browser
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens || {}));
  } catch (_) {}
}

export function getTokens() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(TOKENS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

export function clearTokens() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(TOKENS_KEY);
  } catch (_) {}
}

export function parseJwt(token) {
  try {
    const parts = String(token || "").split(".");
    if (parts.length < 2) return null;
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(payload)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch (_) {
    return null;
  }
}

export function isExpired(token, skewSeconds = 60) {
  const p = parseJwt(token);
  const exp = p?.exp;
  if (!exp || typeof exp !== "number") return false;
  const now = Math.floor(Date.now() / 1000);
  return now + skewSeconds >= exp;
}

export function getUserGroupsFromIdToken(idToken) {
  const p = parseJwt(idToken);
  const groups = p?.["cognito:groups"];
  return Array.isArray(groups) ? groups : [];
}

export async function buildLoginUrl() {
  // Prevent static export / SSR from trying to use crypto/storage
  if (typeof window === "undefined") return "";

  // PKCE + Authorization Code flow
  const verifier = randomVerifier(64);
  storePkceVerifier(verifier);

  const hashed = await sha256Bytes(verifier);
  const challenge = base64UrlEncode(hashed);

  const url = new URL(`${CONFIG.cognitoDomain}/oauth2/authorize`);
  url.searchParams.set("client_id", CONFIG.clientId);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", (CONFIG.scopes || ["openid", "email", "profile"]).join(" "));
  url.searchParams.set("redirect_uri", CONFIG.redirectUri);
  url.searchParams.set("code_challenge_method", "S256");
  url.searchParams.set("code_challenge", challenge);

  return url.toString();
}

export function buildLogoutUrl() {
  const url = new URL(`${CONFIG.cognitoDomain}/logout`);
  url.searchParams.set("client_id", CONFIG.clientId);
  url.searchParams.set("logout_uri", CONFIG.logoutUri);
  return url.toString();
}

export async function exchangeCodeForTokens(code) {
  if (typeof window === "undefined") {
    throw new Error("Token exchange must run in the browser (not during SSR/export).");
  }

  const verifier = loadPkceVerifier();
  if (!verifier) {
    throw new Error("Missing PKCE verifier (session expired). Please try logging in again.");
  }

  const body = new URLSearchParams();
  body.set("grant_type", "authorization_code");
  body.set("client_id", CONFIG.clientId);
  body.set("code", code);
  body.set("redirect_uri", CONFIG.redirectUri);
  body.set("code_verifier", verifier);

  const resp = await fetch(`${CONFIG.cognitoDomain}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const text = await resp.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (_) {
    data = { raw: text };
  }

  if (!resp.ok) {
    clearPkceVerifier();
    throw new Error(data?.error_description || data?.error || `Token exchange failed (${resp.status}).`);
  }

  clearPkceVerifier();
  saveTokens(data);
  return data;
}

export function requireAuthOrRedirect(router) {
  if (typeof window === "undefined") return false;

  const tokens = getTokens();
  
  // If we have valid access token, we're good
  if (tokens?.access_token && !isExpired(tokens.access_token)) {
    return true;
  }

  // Only trigger re-auth if tokens are actually missing or expired
  (async () => {
    try {
      clearPkceVerifier();
      clearTokens();
      const loginUrl = await buildLoginUrl();
      if (loginUrl) window.location.href = loginUrl;
    } catch (e) {
      console.error("Auth redirect failed:", e);
    }
  })();

  return false;
}

/**
 * Optional: expose a "panic button" in the browser console:
 * window.__vdcClearAuth()
 */
if (typeof window !== "undefined") {
  window.__vdcClearAuth = () => {
    try {
      localStorage.removeItem(TOKENS_KEY);
      localStorage.removeItem(PKCE_VERIFIER_KEY);
    } catch (_) {}
    try {
      sessionStorage.removeItem(PKCE_VERIFIER_KEY);
    } catch (_) {}
    return "cleared";
  };
}