import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Shell } from "./index";
import { requireAuthOrRedirect } from "./_lib/auth";

export default function SubmissionsPage() {
  const router = useRouter();
  const [lastDocId, setLastDocId] = useState(null);

  useEffect(() => {
    requireAuthOrRedirect(router);

    // Optional: if you want, later we can store last submitted docId in localStorage during upload
    try {
      setLastDocId(localStorage.getItem("vdc_last_doc_id") || null);
    } catch {
      setLastDocId(null);
    }
  }, []);

  return (
    <Shell title="Submissions">
      <section style={{ padding: "1rem", border: "1px solid #ddd", maxWidth: 900 }}>
        <h2 style={{ marginTop: 0 }}>Note</h2>
        <p style={{ color: "#444" }}>
          Your current dev API template supports:
          <strong> upload init, submit, pending approvals, approve, reject</strong>.
          It does not include a <strong>“list my documents”</strong> endpoint yet.
        </p>

        <p style={{ color: "#444", marginBottom: 0 }}>
          If you want this page to show “My Documents” properly (by logged-in uploader), we’ll add one read-only route:
          <code style={{ marginLeft: 8 }}>GET /documents/mine</code> (GSI query by owner).
        </p>
      </section>

      {lastDocId && (
        <section style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ddd", maxWidth: 900 }}>
          <h2 style={{ marginTop: 0 }}>Last submitted document</h2>
          <div>Document ID: <strong>{lastDocId}</strong></div>
        </section>
      )}
    </Shell>
  );
}
