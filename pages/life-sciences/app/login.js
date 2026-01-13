import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CONFIG } from "@/lib/life_sciences_app_lib/config";
import { exchangeCodeForTokens, buildLoginUrl } from "@/lib/life_sciences_app_lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Waiting for login...");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Static-export friendly: parse directly from the real URL
    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");
    const oauthErr = params.get("error");
    const oauthErrDesc = params.get("error_description");

    // If Cognito sent an OAuth error
    if (oauthErr) {
      setStatus("Login failed.");
      setError(String(oauthErrDesc || oauthErr));
      return;
    }

    // If no code param, start login
    if (!code) {
      (async () => {
        try {
          setStatus("Redirecting to sign-in...");
          const url = await Promise.resolve(buildLoginUrl());
          window.location.assign(url);
        } catch (e) {
          setStatus("Unable to start login.");
          setError(e?.message || String(e));
        }
      })();
      return;
    }

    // We have a code param: exchange it for tokens
    (async () => {
      try {
        setStatus("Exchanging authorization code for tokens...");
        setError(null);

        await exchangeCodeForTokens(String(code));

        setStatus("Login successful. Redirecting...");
        router.replace("/life-sciences/app");
      } catch (e) {
        setStatus("Token exchange failed.");
        setError(e?.message || String(e));
      }
    })();
  }, [router]);

  return (
    <div
      style={{
        maxWidth: 760,
        margin: "40px auto",
        padding: "0 18px",
        fontFamily: "system-ui",
      }}
    >
      <h1 style={{ marginBottom: 10 }}>VDC Login</h1>

      <div style={{ padding: 14, border: "1px solid #ddd", borderRadius: 10 }}>
        <div>
          <strong>Status:</strong> {status}
        </div>
        <div style={{ marginTop: 8, fontSize: 13, color: "#555" }}>
          Redirect URI (CONFIG): <code>{CONFIG.redirectUri}</code>
        </div>
        <div style={{ marginTop: 8, fontSize: 13, color: "#555" }}>
          Current URL: <code>{typeof window !== "undefined" ? window.location.href : ""}</code>
        </div>
      </div>

      {error && (
        <div
          style={{
            marginTop: 14,
            padding: 14,
            border: "1px solid #b00020",
            color: "#7a0014",
            borderRadius: 10,
          }}
        >
          <strong>Error:</strong>
          <div style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>{error}</div>

          <div style={{ marginTop: 12 }}>
            <button
              type="button"
              onClick={async () => {
                try {
                  setError(null);
                  setStatus("Retrying login...");
                  const url = await Promise.resolve(buildLoginUrl());
                  window.location.assign(url);
                } catch (e2) {
                  setError(e2?.message || String(e2));
                }
              }}
              style={{ padding: "10px 14px" }}
            >
              Retry login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
