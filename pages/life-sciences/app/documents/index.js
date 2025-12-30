import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Shell } from "../index";
import { apiFetch } from "../_lib/api";
import { getTokens, getUserGroupsFromIdToken, requireAuthOrRedirect } from "../_lib/auth";

function filenameFromItem(it) {
  if (it?.originalFilename) return it.originalFilename;
  if (it?.s3Key && typeof it.s3Key === "string") {
    const parts = it.s3Key.split("/");
    return parts[parts.length - 1];
  }
  return "—";
}

export default function DocumentsIndexPage() {
  const router = useRouter();

  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        // Expected API: GET /documents
        // Should return: { count, items: [...] }
        const data = await apiFetch("/documents", { method: "GET" });
        const list = Array.isArray(data?.items) ? data.items : [];
        setItems(list);
      } catch (e) {
        setError(e?.message || "Failed to load documents.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <Shell title="Documents">
      <section style={{ padding: "1rem", border: "1px solid #ddd", maxWidth: 1200 }}>
        <h2 style={{ marginTop: 0 }}>All documents</h2>

        <div style={{ color: "#555", marginTop: "0.25rem" }}>
          This view lists all documents (any status). Click a document to view details and the audit trail.
        </div>

        {loading && <div style={{ marginTop: "0.75rem" }}>Loading…</div>}

        {error && (
          <div
            style={{
              padding: "0.75rem",
              border: "1px solid #cc0000",
              color: "#990000",
              marginTop: "0.75rem",
            }}
          >
            <strong>Cannot proceed:</strong> {error}
            <div style={{ marginTop: "0.5rem", color: "#770000" }}>
              Make sure API Gateway has a <code>GET /documents</code> route integrated to your list/scan Lambda.
            </div>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div style={{ marginTop: "0.75rem", color: "#444" }}>No documents found.</div>
        )}

        {!loading && !error && items.length > 0 && (
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.75rem" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                  Document
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                  File
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                  Status
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                  Owner
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                  Submitted
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                  Integrity
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.documentId}>
                  <td style={{ padding: "0.5rem", borderBottom: "1px solid #f0f0f0" }}>
                    <div style={{ display: "grid", gap: "0.15rem" }}>
                      <div style={{ fontWeight: 600 }}>{it.title || it.documentId}</div>
                      <div style={{ fontSize: "0.9rem", color: "#666" }}>{it.documentId}</div>
                    </div>
                  </td>

                  <td style={{ padding: "0.5rem", borderBottom: "1px solid #f0f0f0" }}>
                    {filenameFromItem(it)}
                  </td>

                  <td style={{ padding: "0.5rem", borderBottom: "1px solid #f0f0f0" }}>
                    {it.status || "—"}
                  </td>

                  <td style={{ padding: "0.5rem", borderBottom: "1px solid #f0f0f0" }}>
                    {it.ownerUsername || "—"}
                  </td>

                  <td style={{ padding: "0.5rem", borderBottom: "1px solid #f0f0f0" }}>
                    {it.submittedAt || "—"}
                  </td>

                  <td
                    style={{
                      padding: "0.5rem",
                      borderBottom: "1px solid #f0f0f0",
                      fontFamily: "monospace",
                      fontSize: "0.9rem",
                    }}
                  >
                    {(it.sha256 || "").slice(0, 10)}
                    {it.sha256 ? "…" : "—"}
                  </td>

                  <td style={{ padding: "0.5rem", borderBottom: "1px solid #f0f0f0" }}>
                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                      <Link href={`/life-sciences/app/documents/${it.documentId}`}>View</Link>
                      {isApprover && it.status === "SUBMITTED" && (
                        <Link href={`/life-sciences/app/approval/${it.documentId}`}>Review</Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </Shell>
  );
}
