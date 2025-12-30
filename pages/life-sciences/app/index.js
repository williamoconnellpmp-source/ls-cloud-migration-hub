import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { buildLoginUrl, buildLogoutUrl, getTokens, getUserGroupsFromIdToken, requireAuthOrRedirect } from "./_lib/auth";

function Shell({ title, children }) {
  const router = useRouter();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Require auth for everything in /life-sciences/app/*
    const ok = requireAuthOrRedirect(router);
    if (!ok) return;

    const tokens = getTokens();
    const idToken = tokens?.id_token;
    setGroups(getUserGroupsFromIdToken(idToken));
  }, []);

  const isApprover = useMemo(() => groups.includes("Approver") || groups.includes("Approvers"), [groups]);

  return (
    <div style={{ padding: "1.5rem", maxWidth: 1000, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem" }}>
        <div>
          <h1 style={{ margin: 0 }}>{title}</h1>
          <div style={{ color: "#444", marginTop: "0.25rem" }}>
            Regulated workflow demo (submission, review, approval/rejection, audit/e-signature events)
          </div>
        </div>
        <div>
          <a href={buildLogoutUrl()} style={{ textDecoration: "none" }}>
            Sign out
          </a>
        </div>
      </header>

      <nav style={{ marginTop: "1rem", padding: "0.75rem 0", borderTop: "1px solid #ddd", borderBottom: "1px solid #ddd" }}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/life-sciences/app">Overview</Link>
          <Link href="/life-sciences/app/upload">Upload</Link>
          <Link href="/life-sciences/app/submissions">Submissions</Link>
          <Link href="/life-sciences/app/documents">Documents</Link>
          {isApprover && <Link href="/life-sciences/app/approval/approvals">Pending Approvals</Link>}
        </div>
      </nav>

      <main style={{ marginTop: "1.25rem" }}>{children}</main>

      <footer style={{ marginTop: "2rem", paddingTop: "1rem", borderTop: "1px solid #eee", color: "#666", fontSize: "0.9rem" }}>
        Access to approval actions is restricted to the Approver group. Approval/rejection events are recorded in the audit trail.
      </footer>
    </div>
  );
}

export default function AppHome() {
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const tokens = getTokens();
    setHasToken(Boolean(tokens?.access_token));
  }, []);

  return (
    <Shell title="VDC Application">
      {!hasToken ? (
        <div style={{ padding: "1rem", border: "1px solid #ccc" }}>
          <p style={{ marginTop: 0 }}>You are not signed in.</p>
          <a href={buildLoginUrl()}>Sign in via Cognito</a>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          <section style={{ padding: "1rem", border: "1px solid #ddd" }}>
            <h2 style={{ marginTop: 0 }}>Demo flow</h2>
            <ol style={{ marginBottom: 0 }}>
              <li>Uploader: Upload and submit a document (attestation required)</li>
              <li>Approver: Review pending approvals and approve or reject (comment required for rejection)</li>
              <li>System: Writes audit and e-signature records on submission and approval/rejection</li>
            </ol>
          </section>

          <section style={{ padding: "1rem", border: "1px solid #ddd" }}>
            <h2 style={{ marginTop: 0 }}>Start</h2>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/life-sciences/app/upload">Upload a document</Link>
              <Link href="/life-sciences/app/submissions">View submissions</Link>
              <Link href="/life-sciences/app/documents">View all documents + audit trail</Link>
            </div>
          </section>
        </div>
      )}
    </Shell>
  );
}

export { Shell };
