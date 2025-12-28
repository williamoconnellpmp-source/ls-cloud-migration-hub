import Layout from "../../components/Layout";

export default function Resources() {
  return (
    <Layout title="Resources">
      <div className="hero">
        <div className="badge">Resources • AWS + Regulated Delivery</div>

        <div className="heroRow">
          <div>
            <h1>Resources & Starter Artifacts</h1>
            <p>
              A curated list of references and starter deliverables to support regulated cloud
              migrations — including templates for readiness, evidence, and inspection prep.
            </p>

            <div className="callout">
              <strong>Goal:</strong> Make it easy to move from “concept” to “deliverable” — the
              things that actually unblock Quality reviews and audits.
            </div>
          </div>

          <img
            className="heroImage"
            src="/images/heroes/resources.jpg"
            alt="AWS and GxP resources"
          />
        </div>
      </div>

      <section className="section">
        <h2>Suggested Resource Buckets</h2>
        <div className="grid">
          <div className="card">
            <h3>AWS Foundations</h3>
            <ul className="ul">
              <li>AWS shared responsibility</li>
              <li>Security & identity fundamentals</li>
              <li>Logging and monitoring baseline</li>
            </ul>
          </div>

          <div className="card">
            <h3>Validation / Evidence</h3>
            <ul className="ul">
              <li>Risk assessment template (CSV/CSA)</li>
              <li>Traceability matrix starter</li>
              <li>Audit evidence checklist</li>
            </ul>
          </div>

          <div className="card">
            <h3>TPM Deliverables</h3>
            <ul className="ul">
              <li>Migration roadmap + milestones</li>
              <li>RACI + operating model</li>
              <li>Inspection readiness Q&A pack</li>
            </ul>
          </div>
        </div>

        <p className="small">
          We can later wire this page to a real `data/resources.js` file once you’re ready.
        </p>
      </section>
    </Layout>
  );
}
