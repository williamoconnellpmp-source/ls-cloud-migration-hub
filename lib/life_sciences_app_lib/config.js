// lib/life_sciences_app_lib/config.js

function required(name, value) {
  if (!value || String(value).trim() === "") {
    throw new Error(`Missing required env var: ${name}`);
  }
  return String(value).trim();
}

function pick(...vals) {
  for (const v of vals) {
    if (v && String(v).trim() !== "") return String(v).trim();
  }
  return "";
}

function normalizeCognitoDomain(raw) {
  const v = String(raw || "").trim();
  if (!v) return "";
  // Allow user to provide with or without https://
  if (v.startsWith("http://") || v.startsWith("https://")) return v.replace(/\/+$/, "");
  return `https://${v}`.replace(/\/+$/, "");
}

const cognitoDomain = normalizeCognitoDomain(
  pick(
    process.env.NEXT_PUBLIC_VDC_COGNITO_DOMAIN,
    process.env.NEXT_PUBLIC_COGNITO_DOMAIN
  )
);

const clientId = pick(
  process.env.NEXT_PUBLIC_VDC_COGNITO_CLIENT_ID,
  process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID
);

const redirectUri = pick(
  process.env.NEXT_PUBLIC_VDC_REDIRECT_URI,
  process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI
);

const logoutUri = pick(
  process.env.NEXT_PUBLIC_VDC_LOGOUT_URI,
  process.env.NEXT_PUBLIC_COGNITO_LOGOUT_URI
);

const apiBaseUrl = pick(
  process.env.NEXT_PUBLIC_VDC_API_BASE_URL,
  process.env.NEXT_PUBLIC_API_BASE_URL
);

const responseType = pick(process.env.NEXT_PUBLIC_VDC_RESPONSE_TYPE) || "code";

export const CONFIG = {
  env: pick(process.env.NEXT_PUBLIC_VDC_ENV) || "dev",
  cognitoDomain: required("NEXT_PUBLIC_VDC_COGNITO_DOMAIN", cognitoDomain),
  clientId: required("NEXT_PUBLIC_VDC_COGNITO_CLIENT_ID", clientId),
  redirectUri: required("NEXT_PUBLIC_VDC_REDIRECT_URI", redirectUri),
  logoutUri: required("NEXT_PUBLIC_VDC_LOGOUT_URI", logoutUri),
  apiBaseUrl: required("NEXT_PUBLIC_VDC_API_BASE_URL", apiBaseUrl),
  responseType,
  scopes: ["openid", "email", "profile"],
};
