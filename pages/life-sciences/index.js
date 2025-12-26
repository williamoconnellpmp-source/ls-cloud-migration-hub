import Link from "next/link";
import Layout from "../../components/Layout";

export default function LifeSciencesHub() {
  return (
    <Layout
      title="Life Sciences Cloud Migration Hub"
      subtitle="A structured set of pages focused on regulated delivery, readiness, patterns, and audit-ready evidence."
    >
      <div className="grid">
        <Link className="tile" href="/life-sciences/foundations">
          Foundations →
        </Link>
        <Link className="tile" href="/life-sciences/readiness">
          Readiness →
        </Link>
        <Link className="tile" href="/life-sciences/patterns">
          Patterns →
        </Link>
        <Link className="tile" href="/life-sciences/evidence">
          Evidence →
        </Link>
        <Link className="tile" href="/life-sciences/resources">
          Resources →
        </Link>
      </div>

      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .tile {
          display: block;
          padding: 14px;
          border-radius: 14px;
          text-decoration: none;
          color: rgba(255,255,255,0.9);
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(6,20,40,0.35);
        }
        .tile:hover {
          background: rgba(6,20,40,0.55);
          border-color: rgba(255,255,255,0.22);
        }
        @media (max-width: 900px) {
          .grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </Layout>
  );
}
