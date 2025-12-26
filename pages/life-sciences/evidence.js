import Layout from "../components/Layout";
import Link from "next/link";

export default function Evidence() {
  return (
    <Layout title="Evidence">
      <div className="hero">
        <div className="badge">Evidence • Validation • Inspection Readiness</div>

        <div className="heroRow">
          <div>
            <h1>Evidence & Validation</h1>
            <p>
              In regulated delivery, the goal is not only to implement controls — it’s to
              generate evidence continuously. This section focuses on how to make auditability
              a normal byproduct of operations rather than a fire drill.
            </p>

            <div className="callout evidence">
              <strong>What “good” looks like:</strong> Evidence is complete, attributable, time-stamped,
              tamper-evident, and easy to retrieve — without heroics.
            </div>
          </div>

          <img
            className="heroImage"
            src="/images/heroes/evidence.jpg"
            alt="Evidence-first delivery for regulated cloud workloads"
          />
        </div>
      </div>

      <section className="section">
        <h2>Evidence Categories</h2>
        <p>
          Evidence typically falls into a few buckets. The key is to decide what matters for your scope
          and automate capture wherever possible.
        </p>

        <div className="grid">
          <div className="card">
            <h3>Identity & Access Evidence</h3>
            <p>Prove that access is controlled, reviewed, and attributable.</p>
            <ul className="ul">
              <li>Access provisioning + deprovisioning records</li>
              <li>Privileged access controls + break-glass usage</li>
              <li>Periodic access reviews</li>
            </ul>
          </div>

          <div className="card">
            <h3>Configuration & Change Evidence</h3>
            <p>Show what changed, when it changed, who approved it, and why.</p>
            <ul className="ul">
              <li>Infrastructure versioning + approvals</li>
              <li>Change records linked to releases</li>
              <li>Rollback evidence + incident linkages</li>
            </ul>
          </div>

          <div className="card">
            <h3>Data Integrity Evidence</h3>
            <p>Demonstrate integrity, lineage, retention, and controlled access to data.</p>
            <ul className="ul">
              <li>Retention policies + immutability controls</li>
              <li>Checksums/hashes, versioning, provenance</li>
              <li>Access logs and anomaly review</li>
            </ul>
          </div>

          <div className="card">
            <h3>Operational Evidence</h3>
            <p>Prove the system is monitored, issues are handled, and outcomes are documented.</p>
            <ul className="ul">
              <li>Monitoring + alerting coverage</li>
              <li>Incident and problem management records</li>
              <li>Backup/restore and DR test evidence</li>
            </ul>
          </div>
        </div>

        <div className="callout gxp">
          <strong>21 CFR Part 11 mindset:</strong> For electronic records and signatures, focus on
          attribution, audit trails, integrity, and controlled access — and document your rationale for scope.
        </div>

        <p className="small">
          Next: Evidence becomes easier when the foundations are clear and the patterns generate proof by design.{" "}
          <Link href="/patterns" className="cta">Back to Patterns →</Link>
        </p>
      </section>
    </Layout>
  );
}
