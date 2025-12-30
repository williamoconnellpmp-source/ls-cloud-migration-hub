// pages/life-sciences/app/_lib/api.js

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
  window.location.href = buildLoginUrl();
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

  // Always attach access token if present (even if some routes are open in dev)
  if (tokens?.access_token) {
    headers.set("Authorization", `Bearer ${tokens.access_token}`);
  }

  const res = await fetch(url, { ...options, headers });

  // Handle auth errors explicitly
  if (res.status === 401) {
    redirectToLogin();
    throw new ApiError("Unauthorized. Please sign in again.", 401);
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
