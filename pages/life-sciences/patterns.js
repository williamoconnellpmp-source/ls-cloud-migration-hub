import Layout from "../../components/Layout";

export default function Patterns() {
  return (
    <Layout title="Patterns">
      <div className="hero">
        <div className="badge">Patterns • Repeatable • Audit-Friendly</div>

        <div className="heroRow">
          <div>
            <h1>Cloud Migration Patterns</h1>
            <p>
              Practical, repeatable patterns for migrating and operating GxP-impacted workloads
              on AWS — with evidence capture and control objectives built in.
            </p>

            <div className="callout">
              <strong>Guiding idea:</strong> Patterns should reduce ambiguity. If a pattern can’t
              be explained to Quality (and defended in an inspection), it isn’t done.
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
        <h2>Starter Pattern Set</h2>
        <div className="grid">
          <div className="card">
            <h3>Validated Landing Zone</h3>
            <p>Multi-account, guardrails, logging baseline, and change controls.</p>
            <ul className="ul">
              <li>Organizations + SCPs</li>
              <li>Centralized logs</li>
              <li>Evidence-by-design</li>
            </ul>
          </div>

          <div className="card">
            <h3>Identity & Access</h3>
            <p>Least privilege, access reviews, and strong authentication.</p>
            <ul className="ul">
              <li>Role-based access</li>
              <li>Break-glass process</li>
              <li>Access review evidence</li>
            </ul>
          </div>

          <div className="card">
            <h3>Immutable Logs & Audit Trail</h3>
            <p>End-to-end traceability for changes, access, and events.</p>
            <ul className="ul">
              <li>Log integrity</li>
              <li>Retention + review workflows</li>
              <li>Inspection-ready exports</li>
            </ul>
          </div>

          <div className="card">
            <h3>GxP Data Platform</h3>
            <p>Secure, validated data pipelines and controlled analytics.</p>
            <ul className="ul">
              <li>Data classification</li>
              <li>Encryption + key management</li>
              <li>Traceability from ingestion to reporting</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
