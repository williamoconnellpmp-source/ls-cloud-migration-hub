// pages/life-sciences/evidence.js
import Link from "next/link";

export default function EvidencePage() {
  return (
    <main className="page">
      {/* Breadcrumb */}
      <div className="crumbs">
        <span className="crumbLabel">Evidence</span>
        <span className="dot">•</span>
        <span className="crumbSub">Audit-Ready Delivery</span>
      </div>

      {/* Hero */}
      <section className="hero">
        <div className="heroLeft">
          <h1>Evidence &amp; Audit Readiness</h1>
          <p className="lead">
            In regulated environments, “done” means you can prove what changed, who approved it, how it was tested, and
            how it is controlled in production.
          </p>

          <div className="principle">
            <span className="pill">Principle</span>
            <span>
              Evidence is not a document you create at the end — it is an <b>output of your delivery system</b>.
            </span>
          </div>

          <div className="strip">
            <div className="stripLabel">Audit-ready evidence for GxP cloud delivery</div>
            <div className="stripItems">
              <span className="chip">Traceability</span>
              <span className="chip">Change Control</span>
              <span className="chip">Identity</span>
              <span className="chip">Data Integrity</span>
              <span className="chip">Monitoring</span>
              <span className="chip">Immutable Logs</span>
            </div>
          </div>
        </div>

        {/* Smaller hero image to the right */}
        <aside className="heroRight" aria-label="Evidence hero image">
          <div className="imgFrame">
            {/* Keep your existing image path. If this doesn't load, I’ll adjust to your exact path. */}
            <img
              src="/images/heroes/evidence.jpg"
              alt="Evidence and audit readiness"
              loading="lazy"
            />
          </div>
        </aside>
      </section>

      {/* Summary Cards */}
      <section className="grid3">
        <div className="card">
          <div className="cardTitle">What “Good” Evidence Looks Like</div>
          <p className="cardText">
            Requirement → risk → test → release → runtime control. Clear, attributable, time-stamped.
          </p>
        </div>

        <div className="card">
          <div className="cardTitle">System-Generated Where Possible</div>
          <p className="cardText">
            Logs, config snapshots, and pipeline outputs beat screenshots. Prefer reproducible, machine-generated proof.
          </p>
        </div>

        <div className="card">
          <div className="cardTitle">Core Evidence Categories</div>
          <p className="cardText">
            Access &amp; identity, change control, data integrity, and monitoring — aligned to your Quality System.
          </p>
        </div>
      </section>

      {/* Evidence table */}
      <section className="section">
        <div className="sectionHead">
          <h2>Evidence Checklist (Practical)</h2>
          <p>These are the artifacts that make audits faster because you can answer “show me” questions immediately.</p>
        </div>

        <div className="tableWrap">
          <table className="table" role="table">
            <thead>
              <tr>
                <th>Area</th>
                <th>What auditors look for</th>
                <th>Examples of strong evidence</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Traceability</b></td>
                <td>Proof of intent, risk rationale, and verification</td>
                <td>Story/CR link, risk-based rationale, test run results, approvals</td>
              </tr>
              <tr>
                <td><b>Change control</b></td>
                <td>Who approved what, and when; release integrity</td>
                <td>PR approvals, release notes, deployment IDs, rollback plan + test</td>
              </tr>
              <tr>
                <td><b>Identity &amp; access</b></td>
                <td>Least privilege + access review</td>
                <td>MFA/SSO enforcement, IAM policy exports, access review records</td>
              </tr>
              <tr>
                <td><b>Data integrity</b></td>
                <td>Integrity, confidentiality, retention</td>
                <td>Encryption state, retention rules, immutability where required</td>
              </tr>
              <tr>
                <td><b>Monitoring</b></td>
                <td>Detect + respond to drift or events</td>
                <td>Alert definitions, incident records, config drift reports</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Core domains */}
      <section className="section">
        <div className="sectionHead">
          <h2>Core Evidence Domains</h2>
          <p>Think of these as your “audit conversation map.” Each domain should link to system-generated proof.</p>
        </div>

        <div className="grid4">
          <div className="card">
            <div className="cardTitle">Access &amp; Identity</div>
            <ul className="list">
              <li>Least privilege mapping</li>
              <li>MFA / SSO enforcement</li>
              <li>Periodic access review</li>
              <li>Break-glass controls (if used)</li>
            </ul>
          </div>

          <div className="card">
            <div className="cardTitle">Change Control</div>
            <ul className="list">
              <li>Risk-based approvals</li>
              <li>Release notes + deployment record</li>
              <li>Rollback evidence</li>
              <li>Segregation of duties signals</li>
            </ul>
          </div>

          <div className="card">
            <div className="cardTitle">Data Integrity</div>
            <ul className="list">
              <li>Encryption at rest/in transit</li>
              <li>Retention + deletion controls</li>
              <li>Immutability (where required)</li>
              <li>Backup/restore testing proof</li>
            </ul>
          </div>

          <div className="card">
            <div className="cardTitle">Monitoring &amp; Oversight</div>
            <ul className="list">
              <li>Alerting thresholds</li>
              <li>Audit log retention</li>
              <li>Config drift detection</li>
              <li>Incident response evidence</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bottom note + nav */}
      <section className="cta">
        <div className="ctaLeft">
          <h3>Portfolio note</h3>
          <p>
            This hub is a portfolio artifact. Actual evidence requirements should align to your Quality System, SOPs,
            and risk posture.
          </p>
        </div>
        <div className="ctaRight">
          <Link className="btn" href="/life-sciences">
            Back to Life Sciences Hub →
          </Link>
        </div>
      </section>

      <style jsx>{`
        .page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 28px 20px 60px;
        }

        .crumbs {
          display: flex;
          gap: 10px;
          align-items: center;
          opacity: 0.95;
          margin-bottom: 14px;
        }
        .crumbLabel {
          font-weight: 700;
        }
        .dot {
          opacity: 0.6;
        }
        .crumbSub {
          opacity: 0.85;
        }

        .hero {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 18px;
          align-items: start;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 18px;
          background: rgba(0, 0, 0, 0.18);
          backdrop-filter: blur(8px);
        }

        h1 {
          margin: 4px 0 10px;
          font-size: clamp(28px, 4vw, 42px);
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .lead {
          margin: 0 0 14px;
          font-size: 16px;
          line-height: 1.55;
          opacity: 0.92;
        }

        .principle {
          display: flex;
          gap: 10px;
          align-items: center;
          padding: 10px 12px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(0, 0, 0, 0.22);
          margin-bottom: 14px;
        }
        .pill {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.02em;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          white-space: nowrap;
        }

        .strip {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 12px;
        }
        .stripLabel {
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.7;
          margin-bottom: 8px;
        }
        .stripItems {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .chip {
          padding: 7px 10px;
          border-radius: 999px;
          font-size: 13px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
        }

        .heroRight {
          display: flex;
          justify-content: flex-end;
        }
        .imgFrame {
          width: 100%;
          max-width: 360px; /* smaller */
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }
        .imgFrame img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .grid3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin: 16px 0 0;
        }

        .section {
          margin-top: 22px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 18px;
          background: rgba(0, 0, 0, 0.16);
          backdrop-filter: blur(6px);
        }

        .sectionHead h2 {
          margin: 0 0 6px;
          font-size: 20px;
          letter-spacing: -0.01em;
        }
        .sectionHead p {
          margin: 0 0 12px;
          opacity: 0.9;
          line-height: 1.55;
        }

        .card {
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 14px;
          background: rgba(255, 255, 255, 0.04);
        }
        .cardTitle {
          font-weight: 800;
          margin-bottom: 8px;
        }
        .cardText {
          margin: 0;
          line-height: 1.55;
          opacity: 0.9;
        }

        .tableWrap {
          overflow: auto;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          min-width: 780px;
          background: rgba(0, 0, 0, 0.18);
        }
        .table th,
        .table td {
          padding: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          vertical-align: top;
        }
        .table th {
          text-align: left;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          opacity: 0.75;
          background: rgba(255, 255, 255, 0.04);
        }
        .table td {
          opacity: 0.92;
          line-height: 1.45;
        }

        .grid4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        .list {
          margin: 0;
          padding-left: 18px;
          opacity: 0.92;
          line-height: 1.6;
        }

        .cta {
          margin-top: 22px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          background: rgba(0, 0, 0, 0.16);
          backdrop-filter: blur(6px);
        }
        .cta h3 {
          margin: 0 0 6px;
          font-size: 18px;
          letter-spacing: -0.01em;
        }
        .cta p {
          margin: 0;
          opacity: 0.9;
          line-height: 1.55;
          max-width: 760px;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          text-decoration: none;
          font-weight: 800;
          white-space: nowrap;
        }

        /* Responsive */
        @media (max-width: 980px) {
          .hero {
            grid-template-columns: 1fr;
          }
          .heroRight {
            justify-content: flex-start;
          }
          .imgFrame {
            max-width: 520px;
          }
          .grid3 {
            grid-template-columns: 1fr;
          }
          .grid4 {
            grid-template-columns: 1fr 1fr;
          }
          .cta {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 560px) {
          .grid4 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
