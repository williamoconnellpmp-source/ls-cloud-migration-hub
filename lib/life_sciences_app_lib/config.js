// pages/life-sciences/app/_lib/config.js

function requireEnv(name, fallback) {
  const v = process.env[name];
  return v && String(v).trim().length > 0 ? v : fallback;
}

// IMPORTANT: localhost port can vary (3000 vs 3001).
// If you run on 3001, set NEXT_PUBLIC_VDC_REDIRECT_URI + NEXT_PUBLIC_VDC_LOGOUT_URI accordingly.
// Example:
// NEXT_PUBLIC_VDC_REDIRECT_URI=http://localhost:3001/life-sciences/app/login
// NEXT_PUBLIC_VDC_LOGOUT_URI=http://localhost:3001/life-sciences/app/login
const DEFAULT_LOCAL_LOGIN = "http://localhost:3000/life-sciences/app/login";

export const CONFIG = {
  // Cognito Hosted UI (Managed login pages)
  cognitoDomain: requireEnv(
    "NEXT_PUBLIC_VDC_COGNITO_DOMAIN",
    "https://us-west-2msxjhh4dx.auth.us-west-2.amazoncognito.com"
  ),
  clientId: requireEnv(
    "NEXT_PUBLIC_VDC_COGNITO_CLIENT_ID",
    "34k1l9ipn52cksnj1gesbe2fto"
  ),

  // Dev default: localhost callback
  // Test/Prod: set env to https://williamoconnellpmp.com/life-sciences/app/login
  redirectUri: requireEnv("NEXT_PUBLIC_VDC_REDIRECT_URI", DEFAULT_LOCAL_LOGIN),

  // Dev default: same as redirectUri (prevents mismatches)
  // Test/Prod: set env to your deployed login page
  logoutUri: requireEnv("NEXT_PUBLIC_VDC_LOGOUT_URI", DEFAULT_LOCAL_LOGIN),

  scopes: ["openid", "email", "profile"],

  // API Gateway HTTP API
  apiBaseUrl: requireEnv(
    "NEXT_PUBLIC_VDC_API_BASE_URL",
    "https://q4pqovera2.execute-api.us-west-2.amazonaws.com"
  ),
};
