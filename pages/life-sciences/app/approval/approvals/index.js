import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Shell } from "../../index";
import { apiFetch } from "../../_lib/api";
import { getTokens, getUserGroupsFromIdToken, requireAuthOrRedirect } from "../../_lib/auth";

function filenameFromItem(it) {
  if (it?.originalFilename) return it.originalFilename;
  if (it?.s3Key && typeof it.s3Key === "string") {
    const parts = it.s3Key.split("/");
    return parts[parts.length - 1];
  }
  return "—";
}

export default function ApprovalsListPage() {
  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [rowBusyId, setRowBusyId] = useState(null);
  const [rowMsg, setRowMsg] = useState(null);

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
    if (!isApprover) return;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiFetch("/approvals/pending", { method: "GET" });
        const list = Array.isArray(data?.items) ? data.items : [];
        setItems(list);
      } catch (e) {
        setError(e?.message || "Failed to load pending approvals.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [isApprover]);

  async function openFileFor(documentId) {
    setRowMsg(null);
    setError(null);
    setRowBusyId(documentId);

    try {
      setRowMsg("Generating controlled download link…");
      const data = await apiFetch(`/documents/${documentId}/download`, { method: "GET" });
      const url = data?.downloadUrl;
      if (!url) throw new Error("Download URL was not returned by the server.");

      // open presigned URL
      window.open(url, "_blank", "noopener,noreferrer");

      setRowMsg(null);
    } catch (e) {
      // Important: bubble a specific message for demo clarity
      setError(e?.message || "Unable to generate download link.");
      setRowMsg(null);
    } finally {
      setRowBusyId(null);
    }
  }

  if (!isApprover) {
    return (
      <Shell title="Pending Approvals">
        <div style={{ padding: "1rem", border: "1px solid #ddd", maxWidth: 900 }}>
          <strong>Access denied.</strong> This view is restricted to the Approver group.
        </div>
      </Shell>
    );
  }

  return (
    <Shell title="Pending Approvals">
      <section style={{ padding: "1rem", border: "1px solid #ddd", maxWidth: 1200 }}>
        <h2 style={{ marginTop: 0 }}>Documents awaiting approval</h2>

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
            <strong>Cannot proceed:</strong> {error}
          </div>
        )}

        {rowMsg && !error && (
          <div style={{ marginTop: "0.75rem", padding: "0.75rem", border: "1px solid #ccc" }}>
            {rowMsg}
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div style={{ color: "#444" }}>No documents are currently pending approval.</div>
        )}

        {items.length > 0 && (
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
                  Submitted by
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
                    {it.title || it.documentId}
                  </td>
                  <td style={{ padding: "0.5rem", borderBottom: "1px solid #f0f0f0" }}>
                    {filenameFromItem(it)}
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
                    {(it.sha256 || "").slice(0, 10)}…
                  </td>
                  <td style={{ padding: "0.5rem", borderBottom: "1px solid #f0f0f0" }}>
                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
                      <button
                        type="button"
                        onClick={() => openFileFor(it.documentId)}
                        disabled={rowBusyId === it.documentId}
                        style={{ padding: "0.35rem 0.6rem" }}
                      >
                        Open file
                      </button>

                      <Link href={`/life-sciences/app/approval/${it.documentId}`}>Review</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <div style={{ marginTop: "1rem", color: "#666" }}>
        Access to approval actions is restricted to the Approver group. Approval/rejection events are recorded in the audit trail.
      </div>
    </Shell>
  );
}
