import Layout from "../../components/Layout";

export default function Evidence() {
  return (
    <Layout title="Evidence">
      <div className="hero">
        <div className="badge">Evidence • Audit-Ready Delivery</div>

        <div className="heroRow">
          <div>
            <h1>Evidence & Audit Readiness</h1>
            <p>
              In regulated environments, “done” means you can prove what changed, who approved it,
              how it was tested, and how it is controlled in production.
            </p>

            <div className="callout evidence">
              <strong>Principle:</strong> Evidence is not a document you create at the end — it is
              an output of your delivery system.
            </div>
          </div>

          <img
            className="heroImage"
            src="/images/heroes/evidence.jpg"
            alt="Audit-ready evidence for GxP cloud delivery"
          />
        </div>
      </div>

      <section className="section">
        <h2>What “Good” Evidence Looks Like</h2>
        <div className="grid">
          <div className="card">
            <h3>Traceability</h3>
            <p>Requirement → risk → test → release → runtime control.</p>
            <ul className="ul">
              <li>Change request / story link</li>
              <li>Risk-based rationale</li>
              <li>Test results + approvals</li>
            </ul>
          </div>

          <div className="card">
            <h3>System-Generated Where Possible</h3>
            <p>Logs, config snapshots, and pipeline outputs beat screenshots.</p>
            <ul className="ul">
              <li>CI/CD artifacts</li>
              <li>CloudTrail / Config records</li>
              <li>Immutable log storage</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Core Evidence Categories</h2>
        <div className="grid">
          <div className="card">
            <h3>Access & Identity</h3>
            <ul className="ul">
              <li>Least privilege mapping</li>
              <li>MFA / SSO enforcement</li>
              <li>Periodic access review</li>
            </ul>
          </div>

          <div className="card">
            <h3>Change Control</h3>
            <ul className="ul">
              <li>Risk-based approvals</li>
              <li>Release notes</li>
              <li>Rollback evidence</li>
            </ul>
          </div>

          <div className="card">
            <h3>Data Integrity</h3>
            <ul className="ul">
              <li>Encryption at rest/in transit</li>
              <li>Retention + immutability controls</li>
              <li>Monitoring + alerting</li>
            </ul>
          </div>
        </div>

        <p className="small">
          Note: This hub is a portfolio artifact. Actual evidence requirements should align to your
          Quality system, SOPs, and risk posture.
        </p>
      </section>
    </Layout>
  );
}
