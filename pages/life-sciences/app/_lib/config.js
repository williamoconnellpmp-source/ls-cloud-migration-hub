// pages/life-sciences/app/_lib/config.js

export const CONFIG = {
  // Cognito Hosted UI (Managed login pages)
  cognitoDomain: "https://us-west-2msxjhh4dx.auth.us-west-2.amazoncognito.com",
  clientId: "34k1l9ipn52cksnj1gesbe2fto",
  redirectUri: "http://localhost:3000/life-sciences/app/login",
  logoutUri: "http://localhost:3000/life-sciences/app/login",
  scopes: ["openid", "email", "profile"],

  // API Gateway HTTP API
  apiBaseUrl: "https://q4pqovera2.execute-api.us-west-2.amazonaws.com",
};
