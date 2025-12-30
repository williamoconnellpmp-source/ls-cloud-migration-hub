import Link from "next/link";

export default function ValidationHome() {
  return (
    <main style={{ padding: "2rem", maxWidth: 1000, margin: "0 auto" }}>
      <h1 style={{ marginBottom: "0.25rem" }}>Validation</h1>
      <p style={{ marginTop: 0, opacity: 0.85 }}>
        Evidence packages aligned to IQ/OQ for the Validated Document Control (VDC) serverless workflow.
      </p>

      <section style={{ display: "grid", gap: "1rem", marginTop: "1.5rem" }}>
        <div style={cardStyle}>
          <h2 style={h2Style}>IQ</h2>
          <p style={pStyle}>
            Installation Qualification — proof the DEV environment was deployed and outputs captured.
          </p>
          <Link href="/life-sciences/validation/iq">View IQ</Link>
        </div>

        <div style={cardStyle}>
          <h2 style={h2Style}>OQ</h2>
          <p style={pStyle}>
            Operational Qualification — proof the workflow behaves as expected (submit, approve, audit, e-signatures).
          </p>
          <Link href="/life-sciences/validation/oq">View OQ</Link>
        </div>

        <div style={cardStyle}>
          <h2 style={h2Style}>Live Checks</h2>
          <p style={pStyle}>
            Optional “live” endpoint checks against the deployed DEV API (pending approvals, etc.).
          </p>
          <Link href="/life-sciences/validation/live">Open Live Checks</Link>
        </div>
      </section>
    </main>
  );
}

const cardStyle = {
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: 12,
  padding: "1rem",
};

const h2Style = { margin: "0 0 0.5rem 0" };
const pStyle = { margin: "0 0 0.75rem 0", opacity: 0.85 };
