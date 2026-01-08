// pages/life-sciences/app/index.js

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  buildLoginUrl,
  buildLogoutUrl,
  getTokens,
  getUserGroupsFromIdToken,
  parseJwt,
  requireAuthOrRedirect,
} from "./_lib/auth";

function truncateMiddle(s, max = 28) {
  const str = String(s || "");
  if (str.length <= max) return str;
  const left = Math.ceil((max - 3) / 2);
  const right = Math.floor((max - 3) / 2);
  return `${str.slice(0, left)}...${str.slice(str.length - right)}`;
}

function NavLink({ href, children }) {
  const router = useRouter();
  const active = router.asPath === href || router.asPath.startsWith(href + "/");

  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        color: active ? "#111" : "#333",
        fontWeight: active ? 700 : 500,
        padding: "0.35rem 0.5rem",
        borderRadius: 8,
        background: active ? "#f2f2f2" : "transparent",
      }}
    >
      {children}
    </Link>
  );
}

function Shell({ title, children }) {
  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Require auth for everything in /life-sciences/app/*
    const ok = requireAuthOrRedirect(router);
    if (!ok) return;

    const tokens = getTokens();
    const idToken = tokens?.id_token;

    setGroups(getUserGroupsFromIdToken(idToken));

    const claims = idToken ? parseJwt(idToken) : null;
    const email = claims?.email || "";
    const name =
      claims?.name ||
      claims?.given_name ||
      claims?.preferred_username ||
      claims?.["cognito:username"] ||
      "";

    setUserEmail(email);
    setUserName(name);
  }, []);

  const isApprover = useMemo(
    () => groups.includes("Approver") || groups.includes("Approvers"),
    [groups]
  );

  return (
    <div style={{ padding: "1.5rem", maxWidth: 1100, margin: "0 auto" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "1rem",
        }}
      >
        <div style={{ display: "grid", gap: "0.25rem" }}>
          <div style={{ fontSize: "0.85rem", color: "#555" }}>
            Validated Document Control (VDC)
          </div>
          <h1 style={{ margin: 0, fontSize: "1.6rem", letterSpacing: "-0.01em" }}>
            {title}
          </h1>
          <div style={{ color: "#444", marginTop: "0.1rem" }}>
            Regulated workflow demo (submission, review, approval/rejection, audit/e-signature)
          </div>
        </div>

        <div style={{ display: "grid", gap: "0.35rem", justifyItems: "end" }}>
          {(userEmail || userName) && (
            <div style={{ fontSize: "0.9rem", color: "#333" }} title={userEmail || userName}>
              <span style={{ color: "#666" }}>Signed in as</span>{" "}
              <strong>{truncateMiddle(userEmail || userName, 34)}</strong>
            </div>
          )}

          <a
            href={buildLogoutUrl()}
            style={{
              textDecoration: "none",
              border: "1px solid #ccc",
              borderRadius: 10,
              padding: "0.4rem 0.7rem",
              color: "#111",
              background: "white",
              fontWeight: 600,
            }}
          >
            Sign out
          </a>
        </div>
      </header>

      <nav
        style={{
          marginTop: "1rem",
          padding: "0.75rem 0",
          borderTop: "1px solid #e5e5e5",
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <NavLink href="/life-sciences/app">Overview</NavLink>
          <NavLink href="/life-sciences/app/upload">Upload</NavLink>
          <NavLink href="/life-sciences/app/submissions">Submissions</NavLink>
          <NavLink href="/life-sciences/app/documents">Documents</NavLink>
          {isApprover && <NavLink href="/life-sciences/app/approval/approvals">Pending approvals</NavLink>}
        </div>
      </nav>

      <main style={{ marginTop: "1.25rem" }}>{children}</main>

      <footer
        style={{
          marginTop: "2rem",
          paddingTop: "1rem",
          borderTop: "1px solid #eee",
          color: "#666",
          fontSize: "0.9rem",
          lineHeight: 1.4,
        }}
      >
        Access to approval actions is restricted to the <strong>Approver</strong> group. Submission and
        approval/rejection events are recorded as append-only audit + e-signature entries.
      </footer>
    </div>
  );
}

export default function AppHome() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const tokens = getTokens();
    // Prefer id_token for "logged in" signal (more reliable for email/groups)
    setHasToken(Boolean(tokens?.id_token || tokens?.access_token));
  }, []);

  return (
    <Shell title="Overview">
      {!hasToken ? (
        <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: 12 }}>
          <p style={{ marginTop: 0 }}>You are not signed in.</p>
          <a
            href={buildLoginUrl()}
            style={{
              display: "inline-block",
              textDecoration: "none",
              border: "1px solid #ccc",
              borderRadius: 10,
              padding: "0.45rem 0.75rem",
              color: "#111",
              fontWeight: 700,
              background: "white",
            }}
          >
            Sign in via Cognito
          </a>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          <section style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: 12 }}>
            <h2 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Demo flow</h2>
            <ol style={{ marginBottom: 0, lineHeight: 1.5 }}>
              <li>Submitter: Upload and submit a document (attestation required)</li>
              <li>Approver: Review pending approvals and approve/reject (comment required for rejection)</li>
              <li>System: Writes audit and e-signature records on submission and approval/rejection</li>
            </ol>
          </section>

          <section style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: 12 }}>
            <h2 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Start</h2>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/life-sciences/app/upload">Upload a document</Link>
              <Link href="/life-sciences/app/submissions">View submissions</Link>
              <Link href="/life-sciences/app/documents">View document register + audit</Link>
            </div>
          </section>
        </div>
      )}
    </Shell>
  );
}

export { Shell };
