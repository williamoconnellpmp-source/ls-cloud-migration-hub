import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Shell } from "./index";
import { apiFetch } from "./_lib/api";
import { requireAuthOrRedirect } from "./_lib/auth";

const SUBMIT_ATTESTATION =
  "I attest that this submission is accurate, complete, and is intended for controlled use within the validated system.";

export default function UploadPage() {
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attest, setAttest] = useState(false);

  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    requireAuthOrRedirect(router);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setStatus(null);

    if (!file) return setError("File is required.");
    if (!title.trim()) return setError("Document name (title) is required.");
    if (!attest) return setError("Attestation is required to submit.");

    setBusy(true);

    try {
      setStatus("Initializing upload...");

      // 1) Get presigned PUT URL + documentId
      const init = await apiFetch("/documents/upload/init", {
        method: "POST",
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type || "application/octet-stream",
        }),
      });

      const presignedUrl = init?.upload?.presignedUrl;
      const documentId = init?.documentId;

      if (!presignedUrl || !documentId) {
        throw new Error("Upload initialization failed: missing presignedUrl or documentId.");
      }

      setStatus("Uploading to secure storage...");

      // 2) PUT file to S3 using presigned URL (no Authorization header)
      const putRes = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type || "application/octet-stream",
        },
        body: file,
      });

      if (!putRes.ok) {
        throw new Error(`S3 upload failed (${putRes.status}).`);
      }

      setStatus("Submitting document (checksum + audit + e-signature) ...");

      // 3) Submit document (DRAFT -> SUBMITTED, computes sha256, writes AUDIT + ESIG)
      const submit = await apiFetch("/documents/submit", {
        method: "POST",
        body: JSON.stringify({
          documentId,
          title: title.trim(),
          description: description.trim(),
          comment: "", // optional
        }),
      });

      // For demo: persist last doc ID so submissions page can show something real
      try {
        localStorage.setItem("vdc_last_doc_id", submit?.documentId || documentId);
      } catch {
        // ignore storage errors
      }

      setStatus(`Submitted. Document ID: ${submit?.documentId || documentId}`);

      // Redirect to submissions after a moment
      setTimeout(() => router.push("/life-sciences/app/submissions"), 800);
    } catch (err) {
      setError(err?.message || "Upload failed.");
      setStatus(null);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell title="Upload Document">
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem", maxWidth: 760 }}>
        <section style={{ padding: "1rem", border: "1px solid #ddd" }}>
          <h2 style={{ marginTop: 0 }}>File</h2>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            disabled={busy}
          />
          {file && (
            <div style={{ marginTop: "0.5rem", color: "#444" }}>
              Selected: <strong>{file.name}</strong>
            </div>
          )}
        </section>

        <section style={{ padding: "1rem", border: "1px solid #ddd" }}>
          <h2 style={{ marginTop: 0 }}>Metadata</h2>

          <label style={{ display: "grid", gap: "0.25rem" }}>
            Document name (required)
            <input value={title} onChange={(e) => setTitle(e.target.value)} disabled={busy} />
          </label>

          <label style={{ display: "grid", gap: "0.25rem", marginTop: "0.75rem" }}>
            Description (optional)
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              disabled={busy}
            />
          </label>
        </section>

        <section style={{ padding: "1rem", border: "1px solid #ddd" }}>
          <h2 style={{ marginTop: 0 }}>Attestation</h2>

          <div style={{ padding: "0.75rem", border: "1px solid #eee", background: "#fafafa" }}>
            {SUBMIT_ATTESTATION}
          </div>

          <label style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={attest}
              onChange={(e) => setAttest(e.target.checked)}
              disabled={busy}
            />
            I attest to the statement above.
          </label>
        </section>

        {error && (
          <div style={{ padding: "0.75rem", border: "1px solid #cc0000", color: "#990000" }}>
            <strong>Action blocked:</strong> {error}
          </div>
        )}

        {status && (
          <div style={{ padding: "0.75rem", border: "1px solid #ccc", color: "#333" }}>
            {status}
          </div>
        )}

        <button type="submit" style={{ padding: "0.75rem 1rem" }} disabled={busy}>
          {busy ? "Submitting..." : "Submit Document"}
        </button>
      </form>
    </Shell>
  );
}
