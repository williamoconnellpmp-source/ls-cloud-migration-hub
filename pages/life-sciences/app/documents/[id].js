import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Shell } from "../index";
import { apiFetch } from "../_lib/api";
import { getTokens, getUserGroupsFromIdToken, requireAuthOrRedirect } from "../_lib/auth";

function filenameFromKey(s3Key) {
  if (!s3Key || typeof s3Key !== "string") return "—";
  const parts = s3Key.split("/");
  return parts[parts.length - 1];
}

function prettyJson(obj) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch {
    return String(obj);
  }
}

export default function DocumentDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [groups, setGroups] = useState([]);
  const [doc, setDoc] = useState(null);

  const [audit, setAudit] = useState([]);
  const [loadingDoc, setLoadingDoc] = useState(false);
  const [loadingAudit, setLoadingAudit] = useState(false);

  const [error, setError] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);

  const isApprover = useMemo(
    () => groups.includes("Approver") || groups.includes("Approvers"),
    [groups]
  );

  useEffect(() => {
    const ok = requireAuthOrRedirect(router);
    if (!ok) return;

    const tokens = getTokens();
    setGroups(getUserGroupsFromIdToken(tokens?.id_token));
  }, []);

  // Load doc summary by calling GET /documents then filtering locally (works even if you don't have GET /documents/{id} yet)
  useEffect(() => {
    if (!router.isReady || !id) return;

    const load = async () => {
      setLoadingDoc(true);
      setError(null);
      setDoc(null);

      try {
        const data = await apiFetch("/documents", { method: "GET" });
        const items = Array.isArray(data?.items) ? data.items : [];
        const found = items.find((x) => x.documentId === id) || null;

        if (!found) {
          setError("Document not found (not returned by /documents).");
          return;
        }

        setDoc(found);
      } catch (e) {
        setError(e?.message || "Failed to load document.");
      } finally {
        setLoadingDoc(false);
      }
    };

    load();
  }, [router.isReady, id]);

  // Load audit trail
  useEffect(() => {
    if (!router.isReady || !id) return;

    const loadAudit = async () => {
      setLoadingAudit(true);
      setError(null);

      try {
        // Expected API: GET /documents/{documentId}/audit
        // Should return: { count, items: [...] }
        const data = await apiFetch(`/documents/${id}/audit`, { method: "GET" });
        const items = Array.isArray(data?.items) ? data.items : [];
        setAudit(items);
      } catch (e) {
        // Keep doc visible even if audit fails
        setAudit([]);
        setError(
          e?.message ||
            "Failed to load audit trail. Make sure API Gateway has GET /documents/{documentId}/audit."
        );
      } finally {
        setLoadingAudit(false);
      }
    };

    loadAudit();
  }, [router.isReady, id]);

  async function openFile() {
    setError(null);
    setStatusMsg(null);

    try {
      setStatusMsg("Generating controlled download link…");
      const data = await apiFetch(`/documents/${id}/download`, { method: "GET" });
      const url = data?.downloadUrl;

      if (!url) throw new Error("Download URL was not returned by the server.");

      window.open(url, "_blank", "noopener,noreferrer");
      setStatusMsg(null);
    } catch (e) {
      setStatusMsg(null);
      setError(e?.message || "Unable to generate download link.");
    }
  }

  return (
    <Shell title="Document detail">
      <div style={{ display: "grid", gap: "1rem", maxWidth: 1100 }}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <Link href="/life-sciences/app/documents">← Back to documents</Link>
          {isApprover && doc?.status === "SUBMITTED" && (
            <Link href={`/life-sciences/app/approval/${doc.documentId}`}>Review for approval</Link>
          )}
        </div>

        <section style={{ padding: "1rem", border: "1px solid #ddd" }}>
          <h2 style={{ marginTop: 0 }}>Summary</h2>

          {loadingDoc && <div>Loading…</div>}

          {!loadingDoc && doc && (
            <div style={{ display: "grid", gap: "0.35rem" }}>
              <div>
                <strong>Document ID:</strong> {doc.documentId}
              </div>
              <div>
                <strong>Title:</strong> {doc.title || "—"}
              </div>
              <div>
                <strong>Status:</strong> {doc.status || "—"}
              </div>
              <div>
                <strong>Owner:</strong> {doc.ownerUsername || "—"}
              </div>
              <div>
                <strong>Submitted at:</strong> {doc.submittedAt || "—"}
              </div>

              <div>
                <strong>File:</strong> {filenameFromKey(doc.s3Key)}{" "}
                <button
                  type="button"
                  onClick={openFile}
                  style={{ marginLeft: "0.5rem", padding: "0.35rem 0.6rem" }}
                >
                  Open file
                </button>
              </div>

              <div style={{ fontFamily: "monospace", fontSize: "0.9rem" }}>
                <strong>SHA-256:</strong>{" "}
                {doc.sha256 ? `${doc.sha256.slice(0, 16)}…` : "—"}
              </div>
            </div>
          )}

          {statusMsg && (
            <div style={{ marginTop: "0.75rem", padding: "0.75rem", border: "1px solid #ccc" }}>
              {statusMsg}
            </div>
          )}

          {error && (
            <div
              style={{
                marginTop: "0.75rem",
                padding: "0.75rem",
                border: "1px solid #cc0000",
                color: "#990000",
              }}
            >
              <strong>Notice:</strong> {error}
            </div>
          )}
        </section>

        <section style={{ padding: "1rem", border: "1px solid #ddd" }}>
          <h2 style={{ marginTop: 0 }}>Audit trail</h2>

          {loadingAudit && <div>Loading…</div>}

          {!loadingAudit && audit.length === 0 && (
            <div style={{ color: "#444" }}>
              No audit events returned.
              <div style={{ marginTop: "0.35rem", color: "#666" }}>
                Expected endpoint: <code>GET /documents/{`{documentId}`}/audit</code>
              </div>
            </div>
          )}

          {audit.length > 0 && (
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.75rem" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                    Time (UTC)
                  </th>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                    Event
                  </th>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                    Actor
                  </th>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {audit.map((it, idx) => (
                  <tr key={it.eventId || it.sk || idx}>
                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #f0f0f0" }}>
                      {it.timestampUtc || it.createdAt || "—"}
                    </td>
                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #f0f0f0" }}>
                      {it.eventType || "—"}
                    </td>
                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #f0f0f0" }}>
                      {it.actorUsername || it.signerUsername || it.actorUserId || it.signerUserId || "—"}
                    </td>
                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #f0f0f0" }}>
                      <details>
                        <summary style={{ cursor: "pointer" }}>View</summary>
                        <pre
                          style={{
                            marginTop: "0.5rem",
                            padding: "0.75rem",
                            border: "1px solid #eee",
                            background: "#fafafa",
                            overflowX: "auto",
                            maxWidth: "100%",
                          }}
                        >
                          {prettyJson(it.details || it)}
                        </pre>
                      </details>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </Shell>
  );
}
