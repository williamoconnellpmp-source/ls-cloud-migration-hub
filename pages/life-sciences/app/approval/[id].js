import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Shell } from "../index";
import { apiFetch } from "../_lib/api";
import { getTokens, getUserGroupsFromIdToken, requireAuthOrRedirect } from "../_lib/auth";

const APPROVE_ATTESTATION = "I approve this document for use in the validated system.";
const REJECT_RULE = "Rejection requires a documented reason (comment).";

function filenameFromItem(it) {
  if (it?.originalFilename) return it.originalFilename;
  if (it?.s3Key && typeof it.s3Key === "string") {
    const parts = it.s3Key.split("/");
    return parts[parts.length - 1];
  }
  return "—";
}

export default function ApprovalDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionBusy, setActionBusy] = useState(false);
  const [error, setError] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);

  const [comment, setComment] = useState("");
  const [doc, setDoc] = useState(null);

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
    if (!router.isReady || !id || !isApprover) return;

    // No GET /documents/{id} exists yet, so we derive doc from pending list.
    const load = async () => {
      setLoading(true);
      setError(null);
      setDoc(null);
      try {
        const data = await apiFetch("/approvals/pending", { method: "GET" });
        const items = Array.isArray(data?.items) ? data.items : [];
        const found = items.find((x) => x.documentId === id) || null;
        setDoc(found);

        if (!found) {
          setError("This document is not currently in a SUBMITTED state and cannot be reviewed.");
        }
      } catch (e) {
        setError(e?.message || "Failed to load document.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router.isReady, id, isApprover]);

  async function openFile() {
    setError(null);
    setStatusMsg(null);

    try {
      setStatusMsg("Generating controlled download link…");
      const data = await apiFetch(`/documents/${id}/download`, { method: "GET" });

      const url = data?.downloadUrl;
      if (!url) {
        throw new Error("Download URL was not returned by the server.");
      }

      // Open in a new tab for review
      window.open(url, "_blank", "noopener,noreferrer");
      setStatusMsg(null);
    } catch (e) {
      setError(e?.message || "Unable to generate download link.");
      setStatusMsg(null);
    }
  }

  async function doApprove() {
    setActionBusy(true);
    setError(null);
    setStatusMsg(null);
    try {
      setStatusMsg("Submitting approval…");
      await apiFetch(`/approvals/${id}/approve`, {
        method: "POST",
        body: JSON.stringify({ comment: comment || "" }),
      });
      setStatusMsg("Approved. Returning to pending list…");
      setTimeout(() => router.push("/life-sciences/app/approval/approvals"), 700);
    } catch (e) {
      setError(e?.message || "Approval failed.");
      setStatusMsg(null);
    } finally {
      setActionBusy(false);
    }
  }

  async function doReject() {
    setActionBusy(true);
    setError(null);
    setStatusMsg(null);
    try {
      if (!comment.trim()) {
        setError("Rejection requires a comment.");
        return;
      }
      setStatusMsg("Submitting rejection…");
      await apiFetch(`/approvals/${id}/reject`, {
        method: "POST",
        body: JSON.stringify({ comment: comment.trim() }),
      });
      setStatusMsg("Rejected. Returning to pending list…");
      setTimeout(() => router.push("/life-sciences/app/approval/approvals"), 700);
    } catch (e) {
      setError(e?.message || "Rejection failed.");
      setStatusMsg(null);
    } finally {
      setActionBusy(false);
    }
  }

  if (!isApprover) {
    return (
      <Shell title="Review Document">
        <div style={{ padding: "1rem", border: "1px solid #ddd", maxWidth: 900 }}>
          <strong>Access denied.</strong> This view is restricted to the Approver group.
        </div>
      </Shell>
    );
  }

  return (
    <Shell title="Review Document">
      <div style={{ display: "grid", gap: "1rem", maxWidth: 900 }}>
        <section style={{ padding: "1rem", border: "1px solid #ddd" }}>
          <h2 style={{ marginTop: 0 }}>Document summary</h2>

          {loading && <div>Loading…</div>}

          {!loading && doc && (
            <div style={{ display: "grid", gap: "0.35rem" }}>
              <div>
                <strong>Document ID:</strong> {doc.documentId}
              </div>
              <div>
                <strong>Title:</strong> {doc.title || "—"}
              </div>
              <div>
                <strong>File:</strong> {filenameFromItem(doc)}{" "}
                <button
                  type="button"
                  onClick={openFile}
                  disabled={actionBusy}
                  style={{ marginLeft: "0.5rem", padding: "0.35rem 0.6rem" }}
                >
                  Open file
                </button>
              </div>
              <div>
                <strong>Submitted by:</strong> {doc.ownerUsername || "—"}
              </div>
              <div>
                <strong>Submitted at:</strong> {doc.submittedAt || "—"}
              </div>
              <div>
                <strong>Status:</strong> {doc.status || "—"}
              </div>
              <div style={{ fontFamily: "monospace", fontSize: "0.9rem" }}>
                <strong>SHA-256:</strong> {(doc.sha256 || "").slice(0, 16)}…
              </div>
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
              <strong>Cannot proceed:</strong> {error}
            </div>
          )}

          {statusMsg && (
            <div style={{ marginTop: "0.75rem", padding: "0.75rem", border: "1px solid #ccc" }}>
              {statusMsg}
            </div>
          )}
        </section>

        <section style={{ padding: "1rem", border: "1px solid #ddd" }}>
          <h2 style={{ marginTop: 0 }}>Attestation & decision</h2>

          <div style={{ padding: "0.75rem", border: "1px solid #eee", background: "#fafafa" }}>
            <div>
              <strong>Approval attestation:</strong> {APPROVE_ATTESTATION}
            </div>
            <div style={{ marginTop: "0.5rem", color: "#444" }}>
              <strong>Rejection rule:</strong> {REJECT_RULE}
            </div>
          </div>

          <label style={{ display: "grid", gap: "0.25rem", marginTop: "0.75rem" }}>
            Comment (required for rejection)
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} />
          </label>

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
            <button
              type="button"
              disabled={actionBusy || Boolean(error) || !doc}
              onClick={doApprove}
              style={{ padding: "0.75rem 1rem" }}
            >
              Approve document
            </button>
            <button
              type="button"
              disabled={actionBusy || Boolean(error) || !doc}
              onClick={doReject}
              style={{ padding: "0.75rem 1rem" }}
            >
              Reject document
            </button>
          </div>
        </section>
      </div>
    </Shell>
  );
}
