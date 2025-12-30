import Link from "next/link";

import pendingList from "./OQ/Evidence/01_pending_list.json";
import approveResponseDdb from "./OQ/Evidence/02_approve_response.json";
import approveResponseHuman from "./OQ/Evidence/02_approve_response_human.json";
import ddbAuditStream from "./OQ/Evidence/03_ddb_audit_stream.json";

export default function OQPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: 1100, margin: "0 auto" }}>
      <header style={{ marginBottom: "1.25rem" }}>
        <h1 style={{ marginBottom: "0.25rem" }}>OQ — Operational Qualification</h1>
        <p style={{ marginTop: 0, opacity: 0.85 }}>
          Evidence that the VDC workflow functions as intended (submit → approve → audit trail + e-signatures).
        </p>
        <div style={{ display: "flex", gap: "1rem", marginTop: "0.75rem" }}>
          <Link href="/life-sciences/validation">← Back to Validation</Link>
          <a href="#evidence">Jump to evidence</a>
        </div>
      </header>

      <section style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>Summary</h2>
        <pre style={preStyle}>{OQ_SUMMARY}</pre>
        <p style={{ marginTop: "0.75rem", opacity: 0.85 }}>
          Evidence files are stored in{" "}
          <code>pages/life-sciences/validation/OQ/Evidence/</code>.
        </p>
      </section>

      <section
        id="evidence"
        style={{ marginTop: "1.5rem", display: "grid", gap: "1rem" }}
      >
        <EvidenceCard
          title="01 — Pending approvals list"
          description="Captured output from GET /approvals/pending showing the SUBMITTED doc appears via the GSI."
          filename="01_pending_list.json"
          data={pendingList}
          defaultOpen={false}
        />

        <div style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>02 — Approve response (two formats)</h3>
          <p style={{ marginTop: 0, opacity: 0.85 }}>
            The same approval event represented as (a) inspection-friendly summary and (b) system-of-record DynamoDB output.
          </p>

          <CollapsibleJson
            title="02a — Human-readable approval summary"
            filename="02_approve_response_human.json"
            data={approveResponseHuman}
            defaultOpen={true}
          />

          <div style={{ height: "0.75rem" }} />

          <CollapsibleJson
            title="02b — DynamoDB get-item output (typed JSON)"
            filename="02_approve_response.json"
            data={approveResponseDdb}
            defaultOpen={false}
          />
        </div>

        <EvidenceCard
          title="03 — DynamoDB audit stream"
          description="Captured output from DynamoDB query showing AUDIT + ESIG + METADATA transitions to APPROVED."
          filename="03_ddb_audit_stream.json"
          data={ddbAuditStream}
          defaultOpen={false}
        />
      </section>
    </main>
  );
}

function EvidenceCard({ title, description, filename, data, defaultOpen }) {
  return (
    <div style={cardStyle}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p style={{ marginTop: 0, opacity: 0.85 }}>{description}</p>
      <CollapsibleJson
        title="View JSON"
        filename={filename}
        data={data}
        defaultOpen={defaultOpen}
      />
    </div>
  );
}

function CollapsibleJson({ title, filename, data, defaultOpen }) {
  return (
    <details style={detailsStyle} open={!!defaultOpen}>
      <summary style={summaryStyle}>
        <span style={{ fontWeight: 600 }}>{title}</span>
        <span style={{ opacity: 0.7, marginLeft: "0.5rem" }}>
          <code>{filename}</code>
        </span>
      </summary>
      <pre style={{ ...preStyle, marginTop: "0.75rem" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </details>
  );
}

const OQ_SUMMARY = `This OQ evidence package demonstrates the VDC workflow in DEV:
- Document upload initiated (audit trail)
- Document submitted (hash + S3 version + eSignature SUBMIT)
- Pending approvals list via GSI (STATUS#SUBMITTED)
- Document approved (audit trail + eSignature APPROVE)
- Metadata transitions to APPROVED with integrity attributes preserved`;

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

const preStyle = {
  background: "rgba(0,0,0,0.04)",
  padding: "1rem",
  borderRadius: 12,
  overflowX: "auto",
  fontSize: 13,
  margin: 0,
};
