// pages/life-sciences/app/_lib/auth.js

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
  // Cognito Hosted UI logout endpoint
  const url = new URL(`${CONFIG.cognitoDomain}/logout`);
  url.searchParams.set("client_id", CONFIG.clientId);
  url.searchParams.set("logout_uri", CONFIG.logoutUri);
  return url.toString();
}

export function saveTokens(tokens) {
  // tokens: { access_token, id_token, refresh_token, token_type, expires_in }
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
  return now >= (tokens.expires_at - skewSeconds);
}

export function parseJwt(token) {
  try {
    const part = token.split(".")[1];
    const json = atob(part.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(escape(json)));
  } catch {
    return null;
  }
}

export function getUserGroupsFromIdToken(idToken) {
  const claims = parseJwt(idToken);
  const groups = claims?.["cognito:groups"];
  if (Array.isArray(groups)) return groups;
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
