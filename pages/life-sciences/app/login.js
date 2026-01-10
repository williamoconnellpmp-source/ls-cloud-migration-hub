import { useEffect } from "react";
import { useRouter } from "next/router";
import { CONFIG } from "../../../lib/life_sciences_app_lib/config";
import { saveTokens, buildLoginUrl } from "../../../lib/life_sciences_app_lib/auth";

async function exchangeCodeForTokens(code) {
  const url = `${CONFIG.cognitoDomain}/oauth2/token`;
  const body = new URLSearchParams();
  body.set("grant_type", "authorization_code");
  body.set("client_id", CONFIG.clientId);
  body.set("code", code);
  body.set("redirect_uri", CONFIG.redirectUri);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Token request failed (${res.status})`);
  }
  return res.json();
}

export default function VdcLoginCallback() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { code, state, error, error_description: errDesc } = router.query;

    if (error) {
      window.location.replace(buildLoginUrl());
      return;
    }

    const run = async () => {
      try {
        if (!code || typeof code !== "string") {
          window.location.replace(buildLoginUrl());
          return;
        }

        const tokens = await exchangeCodeForTokens(code);
        saveTokens(tokens);

        const target = new URL("/vdc/index.html", window.location.origin);
        if (state) target.searchParams.set("state", String(state));
        window.location.replace(target.toString());
      } catch (e) {
        console.error("Token exchange failed:", e);
        window.location.replace(buildLoginUrl());
      }
    };
    run();
  }, [router]);

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#061428", color: "#fff" }}>
      <div>
        <h1 style={{ marginBottom: 8 }}>Processing sign-in…</h1>
        <p style={{ opacity: 0.8 }}>Exchanging code and preparing your session</p>
      </div>
    </div>
  );
}
