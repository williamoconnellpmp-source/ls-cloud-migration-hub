import Layout from "../components/Layout";
import Link from "next/link";

export default function Patterns() {
  return (
    <Layout title="Patterns">
      <div className="hero">
        <div className="badge">Patterns • Repeatable • Evidence-first</div>

        <div className="heroRow">
          <div>
            <h1>Cloud Migration Patterns</h1>
            <p>
              Practical, audit-friendly patterns for moving Life Sciences workloads to AWS.
              These focus on repeatability, least privilege, traceability, and “evidence by design” —
              so compliance becomes a byproduct of normal operation.
            </p>

            <div className="callout evidence">
              <strong>Design principle:</strong> In regulated delivery, patterns should not just “work” —
              they should produce consistent controls and verifiable evidence.
            </div>
          </div>

          <img
            className="heroImage"
            src="/images/heroes/patterns.jpg"
            alt="Cloud migration patterns for regulated workloads"
          />
        </div>
      </div>

      <section className="section">
        <h2>Starter Pattern Library</h2>
        <p>
          These are the first patterns to anchor the hub. We’ll keep them implementation-aware,
          but written in a way that a TPM, architect, security, and quality partner can all align on.
        </p>

        <div className="grid">
          <div className="card">
            <h3>Validated Landing Zone</h3>
            <p>
              Multi-account foundations with centralized logging, guardrails, and repeatable
              environment promotion (Dev/Test/Prod).
            </p>
            <ul className="ul">
              <li>Org structure + account vending</li>
              <li>Guardrails via SCPs + IAM boundaries</li>
              <li>Centralized audit logs + retention</li>
            </ul>
          </div>

          <div className="card">
            <h3>Evidence-First Logging</h3>
            <p>
              Capture security and operational evidence as a default. Make audit requests
              a query — not a scramble.
            </p>
            <ul className="ul">
              <li>CloudTrail + Config + centralized S3</li>
              <li>Immutable retention + access controls</li>
              <li>Standard evidence “packs” per release</li>
            </ul>
          </div>

          <div className="card">
            <h3>GxP Data Integrity Pattern</h3>
            <p>
              Guard against accidental or unauthorized change. Ensure traceability of
              who changed what, when, and why.
            </p>
            <ul className="ul">
              <li>Encryption + key management</li>
              <li>Write controls + versioning</li>
              <li>Audit trails + review workflows</li>
            </ul>
          </div>

          <div className="card">
            <h3>Controlled Change & Release</h3>
            <p>
              Cloud delivery with regulated discipline: approvals, traceability, and
              rollback plans where it matters.
            </p>
            <ul className="ul">
              <li>Change control mapped to pipeline stages</li>
              <li>Traceability from requirement → release → evidence</li>
              <li>Release notes + validation impact summary</li>
            </ul>
          </div>

          <div className="card">
            <h3>Serverless in Regulated Contexts</h3>
            <p>
              Use serverless where it reduces operational burden — but keep validation scope,
              monitoring, and access controls explicit.
            </p>
            <ul className="ul">
              <li>Clear GxP boundary + data classification</li>
              <li>Structured logging + correlation IDs</li>
              <li>Least privilege + key rotation</li>
            </ul>
          </div>

          <div className="card">
            <h3>Inspection Readiness Playbook</h3>
            <p>
              Pre-package what inspectors typically ask for: access history, change records,
              audit trails, and system validation rationale.
            </p>
            <ul className="ul">
              <li>Standard “inspection packet” template</li>
              <li>Evidence index + source-of-truth links</li>
              <li>RACI for inspection response</li>
            </ul>
          </div>
        </div>

        <p className="small">
          Next up: we’ll add AWS service “chips” to each pattern (icons) and then expand each card into
          a dedicated pattern page with controls + evidence + operational notes.
        </p>

        <Link className="cta" href="/evidence">
          Go to Evidence & Validation →
        </Link>
      </section>
    </Layout>
  );
}
