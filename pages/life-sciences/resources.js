import Layout from "../components/Layout";

export default function Resources() {
  return (
    <Layout title="Resources">
      <div className="hero">
        <div className="badge">Resources • AWS + GxP Delivery</div>

        <div className="heroRow">
          <div>
            <h1>Resources for Regulated Cloud Delivery</h1>
            <p>
              A curated set of references to support GxP-aware cloud migrations — focusing on
              security, compliance, audit evidence, and validated delivery patterns.
            </p>

            <div className="callout evidence">
              <strong>How to use this page:</strong> If you’re short on time, start with the
              “Core AWS Guidance” section, then jump to “Evidence & Audit Readiness.”
            </div>
          </div>

          <img
            className="heroImage"
            src="/images/heroes/resources.jpg"
            alt="AWS GxP resources for regulated cloud delivery"
          />
        </div>
      </div>

      <section className="section">
        <h2>Core AWS Guidance</h2>
        <div className="grid">
          <div className="card">
            <h3>AWS Shared Responsibility Model</h3>
            <p>
              Clarifies what AWS manages vs. what you must design, operate, and validate.
              Essential for regulated workloads.
            </p>
            <ul className="ul">
              <li>Control ownership mapping</li>
              <li>Validation scope boundaries</li>
              <li>Security and compliance accountability</li>
            </ul>
          </div>

          <div className="card">
            <h3>AWS Well-Architected Framework</h3>
            <p>
              Use the pillars to structure design decisions and tradeoffs. In regulated
              environments, Operational Excellence and Security tend to dominate early.
            </p>
            <ul className="ul">
              <li>Repeatable design reviews</li>
              <li>Risk-based tradeoffs</li>
              <li>Documented decision rationale</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Evidence & Audit Readiness</h2>
        <div className="grid">
          <div className="card">
            <h3>Audit Trails & Logging Strategy</h3>
            <p>
              Evidence is not a document you write at the end — it’s data you generate
              continuously.
            </p>
            <ul className="ul">
              <li>CloudTrail + Config coverage</li>
              <li>Immutable log storage patterns</li>
              <li>Retention + access controls</li>
            </ul>
          </div>

          <div className="card">
            <h3>Change Control in Cloud Delivery</h3>
            <p>
              Practical ways to align modern CI/CD with regulated expectations without
              slowing delivery to a halt.
            </p>
            <ul className="ul">
              <li>Risk-based approvals</li>
              <li>Release documentation templates</li>
              <li>Traceability from change → deployment → evidence</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Validation & Regulated Delivery</h2>
        <div className="grid">
          <div className="card">
            <h3>CSV / CSA Approach (Conceptual)</h3>
            <p>
              Validation thinking is shifting from “document-heavy” to “risk-based evidence.”
              This hub focuses on practical outcomes: data integrity and inspection readiness.
            </p>
            <ul className="ul">
              <li>Risk assessments drive test depth</li>
              <li>Evidence is system-generated where possible</li>
              <li>Focus on critical controls and intended use</li>
            </ul>
          </div>

          <div className="card">
            <h3>CFR 21 Part 11 Focus Areas</h3>
            <p>
              The recurring themes: who did what, when, why, and can you prove it — reliably.
            </p>
            <ul className="ul">
              <li>Identity + access controls</li>
              <li>Audit trails and record integrity</li>
              <li>Electronic signatures (where applicable)</li>
            </ul>
          </div>
        </div>

        <p className="small">
          Note: This page summarizes common focus areas for regulated delivery. Always align
          to your organization’s Quality system, SOPs, and risk posture.
        </p>
      </section>
    </Layout>
  );
}
