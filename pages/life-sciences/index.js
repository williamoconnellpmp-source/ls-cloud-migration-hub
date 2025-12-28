import Link from "next/link";
import Layout from "../../components/Layout";

export default function LifeSciencesHubHome() {
  return (
    <Layout title="Life Sciences Hub">
      <div className="hero">
        <div className="badge">Life Sciences • Regulated Cloud Delivery</div>

        <div className="heroRow">
          <div>
            <h1>Life Sciences Cloud Migration Hub</h1>
            <p>
              A structured set of pages focused on regulated delivery, readiness, patterns,
              and audit-ready evidence for GxP-impacted workloads on AWS.
            </p>
          </div>

          <img
            className="heroImage"
            src="/images/heroes/home.jpg"
            alt="Life Sciences cloud migration hub"
          />
        </div>
      </div>

      <section className="section">
        <h2>Explore the Hub</h2>
        <p>
          Use this hub as a practical reference for planning and delivering regulated cloud
          programs — with evidence capture built in from day one.
        </p>

        <div className="grid">
          <div className="card">
            <h3>Foundations</h3>
            <p>Regulatory guardrails, data integrity, and shared responsibility.</p>
            <Link className="cta" href="/life-sciences/foundations">
              Foundations →
            </Link>
          </div>

          <div className="card">
            <h3>Readiness</h3>
            <p>Assess org + technical readiness before moving GxP workloads.</p>
            <Link className="cta" href="/life-sciences/readiness">
              Readiness →
            </Link>
          </div>

          <div className="card">
            <h3>Patterns</h3>
            <p>Landing zone, logging, identity, data, and app migration patterns.</p>
            <Link className="cta" href="/life-sciences/patterns">
              Patterns →
            </Link>
          </div>

          <div className="card">
            <h3>Evidence</h3>
            <p>Audit trails, change control, and “evidence-by-design” practices.</p>
            <Link className="cta" href="/life-sciences/evidence">
              Evidence →
            </Link>
          </div>

          <div className="card">
            <h3>Resources</h3>
            <p>Curated AWS + GxP references, templates, and starter artifacts.</p>
            <Link className="cta" href="/life-sciences/resources">
              Resources →
            </Link>
          </div>
        </div>

        <p className="small">
          Portfolio artifact: designed to demonstrate regulated delivery thinking for AWS /
          Life Sciences TPM roles.
        </p>
      </section>
    </Layout>
  );
}
