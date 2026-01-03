// pages/life-sciences/app/submissions.js

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Shell } from "./index";
import { apiFetch } from "./_lib/api";
import { requireAuthOrRedirect } from "./_lib/auth";

function filenameFromItem(it) {
  if (it?.originalFilename) return it.originalFilename;
  if (it?.s3Key && typeof it.s3Key === "string") {
    const parts = it.s3Key.split("/");
    return parts[parts.length - 1];
  }
  return "—";
}

function safeDate(s) {
  if (!s) return "—";
  return s;
}

export default function SubmissionsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [items, setItems] = useState([]);
  const [lastSubmittedId, setLastSubmittedId] = useState(null);

  useEffect(() => {
    const ok = requireAuthOrRedirect(router);
    if (!ok) return;
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // This assumes your API has GET /documents (Scan)
        // If it doesn't yet, you'll see a clean error message and the page still loads.
        const data = await apiFetch("/documents", { method: "GET" });

        const list = Array.isArray(data?.items) ? data.items : [];
        setItems(list);

        // Find most recent SUBMITTED item (fallback to any item)
        const sorted = [...list].sort((a, b) => {
          const ta = a?.submittedAt || a?.updatedAt || a?.createdAt || "";
          const tb = b?.submittedAt || b?.updatedAt || b?.createdAt || "";
          return tb.localeCompare(ta);
        });

        const lastSubmitted = sorted.find((x) => x.status === "SUBMITTED") || sorted[0] || null;
        setLastSubmittedId(lastSubmitted?.documentId || null);
      } catch (e) {
        setError(e?.message || "Failed to load submissions.");
        setItems([]);
        setLastSubmittedId(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const recent = useMemo(() => {
    // show the most recent 25 items, sorted by submittedAt/updatedAt
    const sorted = [...items].sort((a, b) => {
      const ta = a?.submittedAt || a?.updatedAt || a?.createdAt || "";
      const tb = b?.submittedAt || b?.updatedAt || b?.createdAt || "";
      return tb.localeCompare(ta);
    });
    return sorted.slice(0, 25);
  }, [items]);

  return (
    <Shell title="Submissions">
      <section style={{ padding: "1rem", border: "1px solid #ddd", maxWidth: 1200 }}>
        <h2 style={{ marginTop: 0 }}>Submission status</h2>

        {loading && <div>Loading…</div>}

        {error && (
          <div
            style={{
              padding: "0.75rem",
              border: "1px solid #cc0000",
              color: "#990000",
              marginTop: "0.75rem",
            }}
          >
            <strong>Error:</strong> {error}
            <div style={{ marginTop: "0.5rem", color: "#666" }}>
              If this says 403/AccessDenied, your Lambda likely needs <code>dynamodb:Scan</code> (or you can switch to a
              GSI query later).
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
        

            <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ddd" }}>
              <h3 style={{ marginTop: 0 }}>Last submitted document</h3>
              {lastSubmittedId ? (
                <>
                  <div>
                    Document ID: <strong>{lastSubmittedId}</strong>
                  </div>
                  <div style={{ marginTop: "0.5rem" }}>
                    <Link href={`/life-sciences/app/documents/${lastSubmittedId}`}>View document</Link>
                    <span style={{ margin: "0 0.5rem" }}>•</span>
                    <Link href={`/life-sciences/app/documents/${lastSubmittedId}?tab=audit`}>View audit trail</Link>
                  </div>
                </>
              ) : (
                <div style={{ color: "#444" }}>No documents found yet.</div>
              )}
            </div>

            <div style={{ marginTop: "1rem" }}>
              <h3>Recent documents</h3>

              {recent.length === 0 ? (
                <div style={{ color: "#444" }}>No documents found.</div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.5rem" }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                        Document
                      </th>
                      <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" }}>File</th>
                      <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Status</th>
                      <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                        Submitted
                      </th>
                      <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map((it) => (
                      <tr key={it.documentId}>
                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #f0f0f0" }}>
                          {it.title || it.documentId}
                          <div style={{ color: "#666", fontSize: "0.9rem" }}>{it.documentId}</div>
                        </td>
                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #f0f0f0" }}>
                          {filenameFromItem(it)}
                        </td>
                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #f0f0f0" }}>
                          <strong>{it.status || "—"}</strong>
                        </td>
                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #f0f0f0" }}>
                          {safeDate(it.submittedAt || it.updatedAt || it.createdAt)}
                        </td>
                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #f0f0f0" }}>
                          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                            <Link href={`/life-sciences/app/documents/${it.documentId}`}>View</Link>
                            <Link href={`/life-sciences/app/documents/${it.documentId}?tab=audit`}>Audit</Link>
                            {it.status === "SUBMITTED" && (
                              <Link href={`/life-sciences/app/approval/${it.documentId}`}>Review</Link>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </section>
    </Shell>
  );
}
