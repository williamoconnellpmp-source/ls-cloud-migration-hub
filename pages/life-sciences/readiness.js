import Layout from "../../components/Layout";

export default function Readiness() {
  return (
    <Layout title="Readiness">
      <div className="hero">
        <div className="badge">Readiness • Org + Technical + Validation</div>

        <div className="heroRow">
          <div>
            <h1>Cloud Readiness for GxP Workloads</h1>
            <p>
              Readiness is not only technical. Successful regulated migrations align Quality,
              Security, IT, and Engineering — with clear ownership, SOPs, and evidence workflows.
            </p>

            <div className="callout">
              <strong>TPM Lens:</strong> Most regulated migrations fail due to unclear ownership,
              incomplete SOPs, or missing evidence processes — not because of AWS services.
            </div>
          </div>

          <img
            className="heroImage"
            src="/images/heroes/readiness.jpg"
            alt="Cloud readiness for regulated workloads"
          />
        </div>
      </div>

      <section className="section">
        <h2>Readiness Dimensions</h2>
        <div className="grid">
          <div className="card">
            <h3>Organizational</h3>
            <ul className="ul">
              <li>Quality + IT alignment, RACI, governance cadence</li>
              <li>Change control, deviation management, training</li>
            </ul>
          </div>

          <div className="card">
            <h3>Technical</h3>
            <ul className="ul">
              <li>Landing zone, identity, logging, monitoring</li>
              <li>Network + account strategy, guardrails</li>
            </ul>
          </div>

          <div className="card">
            <h3>Validation</h3>
            <ul className="ul">
              <li>Risk assessment approach (CSV/CSA mindset)</li>
              <li>Traceability, testing strategy, evidence capture</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
