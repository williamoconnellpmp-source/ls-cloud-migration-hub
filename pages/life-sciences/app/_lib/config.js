// pages/vdc/app/_lib/config.js

function requireEnv(name, fallback) {
  const v = process.env[name];
  return v && String(v).trim().length > 0 ? v : fallback;
}

// PRODUCTION VDC CONFIGURATION
// These are hardcoded for your PROD deployment
// DEV uses different values in /life-sciences/app/

export const CONFIG = {
  // Cognito Hosted UI - PROD
  cognitoDomain: requireEnv(
    "NEXT_PUBLIC_VDC_COGNITO_DOMAIN",
    "https://vdc-prod-williamoconnellpmp.auth.us-west-2.amazoncognito.com"
  ),
  
  clientId: requireEnv(
    "NEXT_PUBLIC_VDC_COGNITO_CLIENT_ID",
    "7qbh0bvokedaou09huur281ti9"
  ),
  
  // PROD callback: https://williamoconnellpmp.com/vdc/app/login
  redirectUri: requireEnv(
    "NEXT_PUBLIC_VDC_REDIRECT_URI",
    "https://williamoconnellpmp.com/vdc/app/login"
  ),
  
  // PROD logout: https://williamoconnellpmp.com/vdc/app/login?logged_out=1
  logoutUri: requireEnv(
    "NEXT_PUBLIC_VDC_LOGOUT_URI",
    "https://williamoconnellpmp.com/vdc/app/login?logged_out=1"
  ),
  
  scopes: ["openid", "email", "profile"],
  
  // API Gateway HTTP API - PROD
  apiBaseUrl: requireEnv(
    "NEXT_PUBLIC_VDC_API_BASE_URL",
    "https://js97cus4h2.execute-api.us-west-2.amazonaws.com"
  ),
};
