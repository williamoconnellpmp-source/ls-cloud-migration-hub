// lib/life_sciences_app_lib/api.js

import { CONFIG } from "./config";
import { getTokens, isExpired, clearTokens, buildLoginUrl } from "./auth";

export class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

function redirectToLogin() {
  clearTokens();
  (async()=>{ window.location.href = await buildLoginUrl(); })();
}

export async function apiFetch(path, options = {}) {
  const tokens = getTokens();

  // If tokens exist but are expired, force re-login
  if (tokens && isExpired(tokens)) {
    redirectToLogin();
    throw new ApiError("Session expired. Please sign in again.", 401);
  }

  const url = `${CONFIG.apiBaseUrl}${path}`;
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", headers.get("Content-Type") || "application/json");

  /**
   * IMPORTANT:
   * Use the ID token for API Gateway JWT auth in this demo.
   * - ID token contains email + cognito:groups (needed for Owner / audit / RBAC).
   * - Access token often does NOT include email.
   */
  const jwt = tokens?.id_token || tokens?.access_token;
  if (jwt) {
    headers.set("Authorization", `Bearer ${jwt}`);
  }

  const res = await fetch(url, { ...options, headers });

  // Handle auth errors - DON'T auto-redirect, just throw error
  if (res.status === 401) {
    // TEMPORARY: Don't redirect, just throw error so we can see it
    // redirectToLogin();
    throw new ApiError("Unauthorized (401). Check browser console for token details.", 401);
  }

  let bodyText = "";
  try {
    bodyText = await res.text();
  } catch {
    bodyText = "";
  }

  let data = null;
  try {
    data = bodyText ? JSON.parse(bodyText) : null;
  } catch {
    data = bodyText || null;
  }

  if (!res.ok) {
    const msg =
      (data && data.error) ||
      (typeof data === "string" ? data : null) ||
      `Request failed (${res.status})`;

    throw new ApiError(msg, res.status, data);
  }

  return data;
}