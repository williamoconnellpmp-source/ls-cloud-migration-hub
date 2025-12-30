import Link from "next/link";
import raw from "./IQ/Evidence/01_dev_stack_outputs.json";

export default function IQPage() {
  // Accept either:
  // 1) An array: [ {OutputKey, OutputValue, Description}, ... ]
  // 2) An object with Outputs: { Outputs: [ ... ] }
  const outputs = Array.isArray(raw) ? raw : Array.isArray(raw?.Outputs) ? raw.Outputs : [];

  return (
    <main style={{ padding: "2rem", maxWidth: 1100, margin: "0 auto" }}>
      <header style={{ marginBottom: "1.25rem" }}>
        <h1 style={{ marginBottom: "0.25rem" }}>IQ — Installation Qualification</h1>
        <p style={{ marginTop: 0, opacity: 0.85 }}>
          Evidence that the DEV stack was deployed and key outputs were recorded.
        </p>
        <div style={{ display: "flex", gap: "1rem", marginTop: "0.75rem" }}>
          <Link href="/life-sciences/validation">← Back to Validation</Link>
          <a href="#raw">Jump to raw JSON</a>
        </div>
      </header>

      <section style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>DEV Stack Outputs</h2>

        {outputs.length === 0 ? (
          <p style={{ opacity: 0.8 }}>
            No outputs found. Check that <code>01_dev_stack_outputs.json</code> is valid JSON and contains either:
            <br />
            <code>[&#123;OutputKey, OutputValue, Description&#125;]</code> or <code>&#123;Outputs: [...]&#125;</code>.
          </p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>OutputKey</th>
                <th style={thStyle}>OutputValue</th>
                <th style={thStyle}>Description</th>
              </tr>
            </thead>
            <tbody>
              {outputs.map((o) => (
                <tr key={o.OutputKey || `${o.OutputValue}-${Math.random()}`}>
                  <td style={tdStyle}>
                    <code>{o.OutputKey}</code>
                  </td>
                  <td style={tdStyle}>
                    {isProbablyUrl(o.OutputValue) ? (
                      <a href={o.OutputValue} target="_blank" rel="noreferrer">
                        {o.OutputValue}
                      </a>
                    ) : (
                      <code>{o.OutputValue}</code>
                    )}
                  </td>
                  <td style={tdStyle}>{o.Description || ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section id="raw" style={{ marginTop: "1.5rem" }}>
        <div style={cardStyle}>
          <h2 style={{ marginTop: 0 }}>Raw JSON</h2>

          <details style={detailsStyle} open={false}>
            <summary style={summaryStyle}>
              <span style={{ fontWeight: 600 }}>View raw JSON</span>
              <span style={{ opacity: 0.7, marginLeft: "0.5rem" }}>
                <code>01_dev_stack_outputs.json</code>
              </span>
            </summary>

            <pre style={{ ...preStyle, marginTop: "0.75rem" }}>
              {JSON.stringify(raw, null, 2)}
            </pre>
          </details>
        </div>
      </section>
    </main>
  );
}

function isProbablyUrl(v) {
  return typeof v === "string" && (v.startsWith("http://") || v.startsWith("https://"));
}

const cardStyle = {
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: 12,
  padding: "1rem",
};

const detailsStyle = {
  border: "1px solid rgba(0,0,0,0.10)",
  borderRadius: 10,
  padding: "0.75rem",
  background: "rgba(0,0,0,0.02)",
};

const summaryStyle = {
  cursor: "pointer",
  userSelect: "none",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  textAlign: "left",
  borderBottom: "1px solid rgba(0,0,0,0.12)",
  padding: "0.5rem",
  fontSize: 14,
};

const tdStyle = {
  borderBottom: "1px solid rgba(0,0,0,0.08)",
  padding: "0.5rem",
  verticalAlign: "top",
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
