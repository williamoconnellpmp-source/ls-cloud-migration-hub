import Head from "next/head";
import Link from "next/link";

export default function WhitepapersPage() {
  return (
    <>
      <Head><title>AWS Life Sciences Whitepapers | Reference Architecture</title></Head>
      <div className="page">
        <header className="topHeader">
          <div className="headerContainer">
            <Link href="/" className="homeLink">Home</Link>
            <span className="sep">|</span>
            <Link href="/life-sciences/evidence" className="backLink">← Back to Evidence</Link>
          </div>
        </header>
        <main className="mainContent">
          <div className="container">
            <h1 className="h1">AWS Life Sciences Whitepapers</h1>
            <p className="subtitle">Essential reading for GxP cloud implementations</p>

            <section className="section">
              <h2 className="h2">Compliance & Validation</h2>
              <div className="wpList">
                <div className="wpItem">
                  <div className="wpTitle">AWS GxP Compliance Reference Guide</div>
                  <div className="wpDesc">Comprehensive guide to implementing GxP workloads on AWS with validation strategies</div>
                  <a href="https://d1.awsstatic.com/whitepapers/compliance/AWS_GxP_Compliance_Reference_Guide.pdf" target="_blank" rel="noopener noreferrer" className="wpLink">Download PDF →</a>
                </div>
                <div className="wpItem">
                  <div className="wpTitle">Enabling Genomics and Precision Medicine in the Cloud</div>
                  <div className="wpDesc">How to build validated genomics platforms for drug discovery and personalized medicine</div>
                  <a href="https://aws.amazon.com/health/genomics/" target="_blank" rel="noopener noreferrer" className="wpLink">Learn More →</a>
                </div>
                <div className="wpItem">
                  <div className="wpTitle">AWS Security Best Practices</div>
                  <div className="wpDesc">Security controls for regulated workloads including encryption, access management, and audit logging</div>
                  <a href="https://aws.amazon.com/architecture/security-identity-compliance/" target="_blank" rel="noopener noreferrer" className="wpLink">View Guide →</a>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Manufacturing & Supply Chain</h2>
              <div className="wpList">
                <div className="wpItem">
                  <div className="wpTitle">Smart Manufacturing with AWS IoT</div>
                  <div className="wpDesc">Connect manufacturing equipment, collect real-time data, implement predictive maintenance</div>
                  <a href="https://aws.amazon.com/iot/solutions/industrial/" target="_blank" rel="noopener noreferrer" className="wpLink">Explore Solutions →</a>
                </div>
                <div className="wpItem">
                  <div className="wpTitle">Data Lakes for Life Sciences</div>
                  <div className="wpDesc">Build validated data lakes for manufacturing, clinical, and research data with S3 and Lake Formation</div>
                  <a href="https://aws.amazon.com/big-data/datalakes-and-analytics/" target="_blank" rel="noopener noreferrer" className="wpLink">Architecture Guide →</a>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Clinical Trials & Research</h2>
              <div className="wpList">
                <div className="wpItem">
                  <div className="wpTitle">Clinical Trial Data Management on AWS</div>
                  <div className="wpDesc">EDC systems, eTMF, data anonymization, and regulatory submission automation</div>
                  <a href="https://aws.amazon.com/health/life-sciences/clinical-trials/" target="_blank" rel="noopener noreferrer" className="wpLink">View Resources →</a>
                </div>
                <div className="wpItem">
                  <div className="wpTitle">Machine Learning for Drug Discovery</div>
                  <div className="wpDesc">Use SageMaker for molecule generation, ADMET prediction, and target identification</div>
                  <a href="https://aws.amazon.com/health/machine-learning/" target="_blank" rel="noopener noreferrer" className="wpLink">Explore ML Solutions →</a>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Key Architecture Patterns</h2>
              <div className="patternsGrid">
                <div className="pattern">
                  <div className="patternTitle">Validated Serverless Applications</div>
                  <p>Lambda + API Gateway + DynamoDB for GxP applications (like VDC system)</p>
                </div>
                <div className="pattern">
                  <div className="patternTitle">Data Lake with Audit Trail</div>
                  <p>S3 + Lake Formation + Glue + Athena for queryable, validated data repositories</p>
                </div>
                <div className="pattern">
                  <div className="patternTitle">Hybrid Cloud Connectivity</div>
                  <p>Direct Connect or VPN for secure on-premise integration with legacy systems</p>
                </div>
                <div className="pattern">
                  <div className="patternTitle">Multi-Account Strategy</div>
                  <p>AWS Organizations with separate accounts for dev, qa, prod environments</p>
                </div>
              </div>
            </section>

            <div className="docNav">
              <Link href="/life-sciences/evidence" className="navBtn">← Back to Evidence</Link>
            </div>
          </div>
        </main>
        <style jsx>{`
          .page { min-height: 100vh; background: #0a0f1e; color: rgba(255,255,255,0.92); }
          .topHeader { background: rgba(0,0,0,0.4); border-bottom: 1px solid rgba(255,255,255,0.1); padding: 14px 0; position: sticky; top: 0; z-index: 100; }
          .headerContainer { max-width: 1100px; margin: 0 auto; padding: 0 24px; display: flex; gap: 12px; align-items: center; font-size: 0.9rem; }
          .homeLink, .backLink, .wpLink { color: rgba(255,255,255,0.9); text-decoration: none; }
          .homeLink:hover, .backLink:hover, .wpLink:hover { color: rgba(139,92,246,0.9); }
          .sep { color: rgba(255,255,255,0.3); }
          .mainContent { padding: 60px 0 100px; }
          .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
          .h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 16px; color: #fff; }
          .subtitle { font-size: 1.15rem; color: rgba(255,255,255,0.75); margin-bottom: 48px; }
          .section { margin-bottom: 56px; }
          .h2 { font-size: 1.8rem; font-weight: 700; margin-bottom: 32px; color: #fff; border-bottom: 2px solid rgba(139,92,246,0.3); padding-bottom: 12px; }
          p { line-height: 1.7; margin-bottom: 16px; color: rgba(255,255,255,0.85); }
          .wpList { display: grid; gap: 20px; }
          .wpItem { background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); border-radius: 12px; padding: 24px; }
          .wpTitle { font-weight: 700; font-size: 1.2rem; margin-bottom: 12px; color: rgba(96,165,250,1); }
          .wpDesc { margin-bottom: 16px; color: rgba(255,255,255,0.85); }
          .wpLink { display: inline-block; font-weight: 600; text-decoration: underline; }
          .patternsGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
          .pattern { background: rgba(139,92,246,0.1); border: 1px solid rgba(139,92,246,0.3); border-radius: 12px; padding: 24px; }
          .patternTitle { font-weight: 700; margin-bottom: 12px; color: rgba(167,139,250,1); }
          .docNav { display: flex; justify-content: space-between; margin-top: 64px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); }
          .navBtn { padding: 12px 24px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 600; }
          .navBtn:hover { background: rgba(139,92,246,0.2); border-color: rgba(139,92,246,0.4); }
          @media (max-width: 968px) { .patternsGrid { grid-template-columns: 1fr; } }
        `}</style>
      </div>
    </>
  );
}
