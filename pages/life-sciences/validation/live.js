import { useEffect, useState } from "react";
import Link from "next/link";

const DEFAULT_API_BASE = "https://q4pqovera2.execute-api.us-west-2.amazonaws.com";

export default function LiveChecks() {
  const [apiBase, setApiBase] = useState(DEFAULT_API_BASE);
  const [pending, setPending] = useState(null);
  const [error, setError] = useState("");

  async function loadPending() {
    setError("");
    setPending(null);
    try {
      const res = await fetch(`${apiBase}/approvals/pending`);
      const text = await res.text();
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
      setPending(JSON.parse(text));
    } catch (e) {
      setError(String(e?.message || e));
    }
  }

  useEffect(() => {
    loadPending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main style={{ padding: "2rem", maxWidth: 1100, margin: "0 auto" }}>
      <header style={{ marginBottom: "1.25rem" }}>
        <h1 style={{ marginBottom: "0.25rem" }}>Live Checks</h1>
        <p style={{ marginTop: 0, opacity: 0.85 }}>
          Calls the deployed DEV API endpoints to show current system state.
        </p>
        <Link href="/life-sciences/validation">← Back to Validation</Link>
      </header>

      <section style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>API Base URL</h2>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
          <input
            value={apiBase}
            onChange={(e) => setApiBase(e.target.value)}
            style={inputStyle}
            aria-label="API Base URL"
          />
          <button onClick={loadPending} style={buttonStyle}>
            Refresh Pending Approvals
          </button>
        </div>
        <p style={{ marginTop: "0.75rem", opacity: 0.8 }}>
          Endpoint used: <code>{apiBase}/approvals/pending</code>
        </p>
      </section>

      <section style={{ marginTop: "1rem" }}>
        {error ? (
          <div style={{ ...cardStyle, borderColor: "rgba(255,0,0,0.35)" }}>
            <h3 style={{ marginTop: 0 }}>Error</h3>
            <pre style={preStyle}>{error}</pre>
          </div>
        ) : (
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Pending approvals response</h3>
            <pre style={preStyle}>{pending ? JSON.stringify(pending, null, 2) : "Loading..."}</pre>
          </div>
        )}
      </section>
    </main>
  );
}

const cardStyle = {
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: 12,
  padding: "1rem",
};

const inputStyle = {
  width: "min(900px, 100%)",
  padding: "0.6rem 0.75rem",
  borderRadius: 10,
  border: "1px solid rgba(0,0,0,0.2)",
  fontSize: 14,
};

const buttonStyle = {
  padding: "0.6rem 0.9rem",
  borderRadius: 10,
  border: "1px solid rgba(0,0,0,0.2)",
  background: "white",
  cursor: "pointer",
  fontSize: 14,
};

const preStyle = {
  background: "rgba(0,0,0,0.04)",
  padding: "1rem",
  borderRadius: 12,
  overflowX: "auto",
  fontSize: 13,
  margin: 0,
};
