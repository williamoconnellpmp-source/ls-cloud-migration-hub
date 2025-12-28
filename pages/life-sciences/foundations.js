import Layout from "../../components/Layout";

export default function Foundations() {
  return (
    <Layout title="Foundations">
      <div className="hero">
        <div className="badge">Foundations • GxP / 21 CFR Part 11</div>

        <div className="heroRow">
          <div>
            <h1>Foundations for Regulated Cloud Migration</h1>
            <p>
              Establish the guardrails first: GxP impact, data integrity, shared responsibility,
              and audit expectations. This is the baseline that prevents “fast cloud” from
              turning into “failed validation.”
            </p>

            <div className="callout gxp">
              <strong>GxP Consideration:</strong>{" "}
              If a workload is GxP-impacted, your goal is not just security — it’s{" "}
              <strong>data integrity</strong>, <strong>traceability</strong>, and{" "}
              <strong>inspection readiness</strong>. Build controls and evidence capture into
              the design, not as an afterthought.
            </div>
          </div>

          <img
            className="heroImage"
            src="/images/heroes/gxp.jpg"
            alt="GxP and 21 CFR Part 11 foundations"
          />
        </div>
      </div>

      <section className="section">
        <h2>What “Regulated” Changes</h2>
        <div className="grid">
          <div className="card">
            <h3>Data Integrity (ALCOA+)</h3>
            <ul className="ul">
              <li>Attributable, Legible, Contemporaneous</li>
              <li>Original, Accurate, plus Complete, Consistent, Enduring, Available</li>
            </ul>
          </div>

          <div className="card">
            <h3>Auditability</h3>
            <ul className="ul">
              <li>Who did what, when, and why</li>
              <li>Immutable logs + reviewable evidence</li>
              <li>Change control and approvals</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
