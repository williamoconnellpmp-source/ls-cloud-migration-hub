// pages/life-sciences/app/approval/approvals/index.js

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Shell } from "../../index";
import { apiFetch } from "../../../lib/life_sciences_lib/api";
import { requireAuthOrRedirect } from "../../../lib/life_sciences_lib/auth";


function filenameFromItem(it) {
  if (it?.originalFilename) return it.originalFilename;
  if (it?.s3Key && typeof it.s3Key === "string") {
    const parts = it.s3Key.split("/");
    return parts[parts.length - 1];
  }
  return "—";
}

function truncateMiddle(str, max = 28) {
  const s = String(str || "");
  if (!s) return "—";
  if (s.length <= max) return s;
  const head = Math.ceil((max - 3) / 2);
  const tail = Math.floor((max - 3) / 2);
  return `${s.slice(0, head)}...${s.slice(s.length - tail)}`;
}

function pickSubmittedBy(it) {
  return (
    it?.submittedByEmail ||
    it?.ownerEmail ||
    it?.submittedBy ||
    it?.ownerUsername ||
    "—"
  );
}

export default function PendingApprovalsPage() {
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [rowBusyId, setRowBusyId] = useState(null);
  const [rowMsg, setRowMsg] = useState(null);

  useEffect(() => {
    const ok = requireAuthOrRedirect(router);
    if (!ok) return;
  }, []);

  async function load() {
    setLoading(true);
    setError(null);
    setRowMsg(null);

    try {
      // Your API should be wired to vdc-approvals-pending-dev
      const data = await apiFetch("/approvals/pending", { method: "GET" });
      const list = Array.isArray(data?.items) ? data.items : [];
      setItems(list);
    } catch (e) {
      setError(e?.message || "Failed to load pending approvals.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const sorted = useMemo(() => {
    const list = items.slice();
    list.sort((a, b) => String(b?.submittedAt || "").localeCompare(String(a?.submittedAt || "")));
    return list;
  }, [items]);

  async function openFileFor(documentId) {
    setRowMsg(null);
    setError(null);
    setRowBusyId(documentId);

    try {
      setRowMsg("Generating controlled download link…");
      const data = await apiFetch(`/documents/${documentId}/download`, { method: "GET" });
      const url = data?.downloadUrl;
      if (!url) throw new Error("Download URL was not returned by the server.");
      window.open(url, "_blank", "noopener,noreferrer");
      setRowMsg(null);
    } catch (e) {
      setRowMsg(null);
      setError(e?.message || "Unable to generate download link.");
    } finally {
      setRowBusyId(null);
    }
  }

  return (
    <Shell title="Pending Approvals">
      <section style={{ padding: "1rem", border: "1px solid #ddd", maxWidth: 1200 }}>
        <h2 style={{ marginTop: 0, marginBottom: "0.25rem" }}>Documents awaiting approval</h2>

        <div style={{ color: "#555" }}>
          Approvers can open the controlled copy and complete review/approval or rejection. Submitted-by is shown as email
          when available.
        </div>

        <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
          <button type="button" onClick={load} style={{ padding: "0.5rem 0.75rem" }} disabled={loading}>
            Refresh
          </button>
          {rowMsg && !error && (
            <div style={{ padding: "0.5rem 0.75rem", border: "1px solid #ccc" }}>{rowMsg}</div>
          )}
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
              This usually means either:
              <ul style={{ marginTop: "0.35rem" }}>
                <li>Lambda handler name mismatch (e.g., configured for <code>lambda_handler</code> but code exports <code>handler</code>)</li>
                <li>Missing env var (like <code>DDB_TABLE</code>)</li>
                <li>DynamoDB query/index error</li>
              </ul>
              Check CloudWatch logs for <code>vdc-approvals-pending-dev</code> at the timestamp of the 500.
            </div>
          </div>
        )}

        {!loading && !error && sorted.length === 0 && (
          <div style={{ marginTop: "0.75rem", color: "#444" }}>No documents currently awaiting approval.</div>
        )}

        {!loading && !error && sorted.length > 0 && (
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.75rem" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Document</th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" }}>File</th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Submitted by</th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Submitted</th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Integrity</th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {sorted.map((it) => {
                const submittedBy = pickSubmittedBy(it);
                const sha = String(it?.sha256 || "");
                return (
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

                    <td
                      style={{ padding: "0.5rem", borderBottom: "1px solid #f0f0f0" }}
                      title={submittedBy}
                    >
                      {truncateMiddle(submittedBy, 34)}
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
                      title={sha}
                    >
                      {sha ? `${sha.slice(0, 10)}…` : "—"}
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
                );
              })}
            </tbody>
          </table>
        )}
      </section>

    </Shell>
  );
}
