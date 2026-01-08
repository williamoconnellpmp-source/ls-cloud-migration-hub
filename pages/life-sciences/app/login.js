// pages/life-sciences/app/login.js

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CONFIG } from "./_lib/config";
import { saveTokens, buildLoginUrl } from "./_lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Processing sign-in...");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;

    // Cognito redirects here with ?code=...
    // We also support a friendly logout redirect:
    // /life-sciences/app/login?logged_out=1
    const code = router.query.code;
    const loggedOut =
      router.query.logged_out === "1" ||
      router.query.logged_out === "true" ||
      router.query.logged_out === "yes";

    // If this is a logout redirect, show a friendly message + sign-in link
    if (loggedOut && !code) {
      setError(null);
      setStatus("Thank you. You have been logged out. To log in again, please click below.");
      return;
    }

    // If no auth code and not a logout redirect, show sign-in prompt
    if (!code) {
      setStatus("No authorization code found. Please sign in.");
      return;
    }

    const exchange = async () => {
      try {
        setError(null);
        setStatus("Exchanging authorization code for tokens...");

        const tokenUrl = `${CONFIG.cognitoDomain}/oauth2/token`;

        const params = new URLSearchParams();
        params.set("grant_type", "authorization_code");
        params.set("client_id", CONFIG.clientId);
        params.set("code", String(code));
        params.set("redirect_uri", CONFIG.redirectUri);

        const res = await fetch(tokenUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        });

        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          data = { raw: text };
        }

        if (!res.ok) {
          throw new Error(data?.error_description || data?.error || "Token exchange failed");
        }

        // Expected: access_token, id_token, expires_in, token_type (and refresh_token depending on app settings)
        saveTokens(data);

        setStatus("Login successful. Redirecting...");
        router.replace("/life-sciences/app");
      } catch (e) {
        setError(e?.message || "Login failed");
        setStatus("Login failed.");
      }
    };

    exchange();
  }, [router.isReady, router.query.code, router.query.logged_out]);

  const showSignInLink = true; // always show a clear way to sign in again

  return (
    <div style={{ padding: "2rem", maxWidth: 760 }}>
      <h1 style={{ marginBottom: "0.5rem" }}>Validated Document Control</h1>
      <p style={{ marginTop: 0, color: "#444" }}>{status}</p>

      {showSignInLink && !error && (
        <div style={{ marginTop: "1rem" }}>
          <a href={buildLoginUrl()}>Sign in</a>
        </div>
      )}

      {error && (
        <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc" }}>
          <strong>Sign-in error:</strong>
          <div style={{ marginTop: "0.5rem" }}>{error}</div>
          <div style={{ marginTop: "1rem" }}>
            <a href={buildLoginUrl()}>Return to sign-in</a>
          </div>
        </div>
      )}
    </div>
  );
}
