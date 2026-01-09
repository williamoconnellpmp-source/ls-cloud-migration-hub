import Head from "next/head";
import Link from "next/link";

export default function CaseStudiesPage() {
  return (
    <>
      <Head><title>Big Pharma Case Studies | Cloud Migration Success</title></Head>
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
            <h1 className="h1">Big Pharma Case Studies</h1>
            <p className="subtitle">How leading pharmaceutical companies successfully moved GxP workloads to AWS</p>

            <section className="section">
              <h2 className="h2">Moderna - COVID-19 Vaccine Development</h2>
              <div className="caseStudy">
                <div className="csHeader">
                  <div className="csCompany">Moderna</div>
                  <div className="csChallenge">Challenge: Accelerate vaccine development during pandemic</div>
                </div>
                <div className="csContent">
                  <h3 className="h3">Solution</h3>
                  <ul>
                    <li>Migrated research data to AWS for scalable computing</li>
                    <li>Used AWS Batch for genomic sequencing analysis</li>
                    <li>Implemented validated data lakes on S3</li>
                    <li>Enabled global collaboration through secure cloud access</li>
                  </ul>
                  <h3 className="h3">Results</h3>
                  <ul>
                    <li>Reduced analysis time from weeks to hours</li>
                    <li>Scaled compute resources 100x during peak periods</li>
                    <li>Delivered COVID-19 vaccine in record 11 months</li>
                    <li>Maintained GxP compliance throughout</li>
                  </ul>
                  <div className="csQuote">"AWS enabled us to scale our computational capacity to analyze massive amounts of genomic data rapidly."</div>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Pfizer - Manufacturing Analytics</h2>
              <div className="caseStudy">
                <div className="csHeader">
                  <div className="csCompany">Pfizer</div>
                  <div className="csChallenge">Challenge: Modernize manufacturing data systems across 200+ facilities</div>
                </div>
                <div className="csContent">
                  <h3 className="h3">Solution</h3>
                  <ul>
                    <li>Built data lake on S3 for manufacturing data</li>
                    <li>Implemented real-time analytics with AWS Lambda and Kinesis</li>
                    <li>Used SageMaker for predictive maintenance ML models</li>
                    <li>Validated platform following GAMP 5 guidelines</li>
                  </ul>
                  <h3 className="h3">Results</h3>
                  <ul>
                    <li>Unified data from 200+ global manufacturing sites</li>
                    <li>Reduced unplanned downtime by 30%</li>
                    <li>Accelerated batch release by 20%</li>
                    <li>$100M+ annual cost savings</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">AstraZeneca - Clinical Trial Management</h2>
              <div className="caseStudy">
                <div className="csHeader">
                  <div className="csCompany">AstraZeneca</div>
                  <div className="csChallenge">Challenge: Streamline clinical trial data management and regulatory submissions</div>
                </div>
                <div className="csContent">
                  <h3 className="h3">Solution</h3>
                  <ul>
                    <li>Migrated Electronic Data Capture (EDC) to AWS</li>
                    <li>Built validated data pipeline with AWS Glue</li>
                    <li>Implemented automated regulatory submission generation</li>
                    <li>Used AWS Transfer Family for secure file exchange with CROs</li>
                  </ul>
                  <h3 className="h3">Results</h3>
                  <ul>
                    <li>Reduced clinical trial startup time by 40%</li>
                    <li>Accelerated regulatory submissions by 6 weeks</li>
                    <li>Enabled real-time trial monitoring across sites</li>
                    <li>Improved data quality and audit readiness</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Key Takeaways</h2>
              <div className="takeawaysGrid">
                <div className="takeaway">
                  <div className="takeawayTitle">Start with Non-Production</div>
                  <p>Most companies start with dev/test environments, then move production workloads</p>
                </div>
                <div className="takeaway">
                  <div className="takeawayTitle">Leverage Managed Services</div>
                  <p>S3, Lambda, DynamoDB reduce validation burden vs. self-managed infrastructure</p>
                </div>
                <div className="takeaway">
                  <div className="takeawayTitle">Partner with AWS</div>
                  <p>AWS Life Sciences team provides guidance on GxP compliance and architecture</p>
                </div>
                <div className="takeaway">
                  <div className="takeawayTitle">Validate Early</div>
                  <p>Build validation into development process, not as afterthought</p>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Resources</h2>
              <ul>
                <li><a href="https://aws.amazon.com/solutions/case-studies/moderna/" target="_blank" rel="noopener noreferrer" className="extLink">AWS Case Study: Moderna</a></li>
                <li><a href="https://aws.amazon.com/solutions/case-studies/pfizer/" target="_blank" rel="noopener noreferrer" className="extLink">AWS Case Study: Pfizer</a></li>
                <li><a href="https://aws.amazon.com/health/life-sciences/" target="_blank" rel="noopener noreferrer" className="extLink">AWS Life Sciences Solutions</a></li>
              </ul>
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
          .homeLink, .backLink, .extLink { color: rgba(255,255,255,0.9); text-decoration: none; }
          .homeLink:hover, .backLink:hover, .extLink:hover { color: rgba(139,92,246,0.9); }
          .sep { color: rgba(255,255,255,0.3); }
          .mainContent { padding: 60px 0 100px; }
          .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
          .h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 16px; color: #fff; }
          .subtitle { font-size: 1.15rem; color: rgba(255,255,255,0.75); margin-bottom: 48px; }
          .section { margin-bottom: 56px; }
          .h2 { font-size: 1.8rem; font-weight: 700; margin-bottom: 24px; color: #fff; border-bottom: 2px solid rgba(139,92,246,0.3); padding-bottom: 12px; }
          .h3 { font-size: 1.2rem; font-weight: 600; margin: 24px 0 16px; color: rgba(255,255,255,0.95); }
          p { line-height: 1.7; margin-bottom: 16px; color: rgba(255,255,255,0.85); }
          ul { margin: 16px 0; padding-left: 28px; }
          li { margin-bottom: 12px; line-height: 1.7; color: rgba(255,255,255,0.85); }
          .caseStudy { background: rgba(59,130,246,0.1); border: 2px solid rgba(59,130,246,0.3); border-radius: 12px; padding: 32px; margin: 24px 0; }
          .csHeader { margin-bottom: 24px; }
          .csCompany { font-size: 1.5rem; font-weight: 800; color: rgba(96,165,250,1); margin-bottom: 8px; }
          .csChallenge { font-size: 1.05rem; color: rgba(255,255,255,0.85); font-style: italic; }
          .csQuote { margin-top: 24px; padding: 20px; background: rgba(0,0,0,0.3); border-left: 4px solid rgba(96,165,250,0.8); font-style: italic; color: rgba(255,255,255,0.9); }
          .takeawaysGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 24px 0; }
          .takeaway { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px; padding: 24px; }
          .takeawayTitle { font-weight: 700; font-size: 1.1rem; margin-bottom: 12px; color: rgba(74,222,128,1); }
          .docNav { display: flex; justify-content: space-between; margin-top: 64px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); }
          .navBtn { padding: 12px 24px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 600; }
          .navBtn:hover { background: rgba(139,92,246,0.2); border-color: rgba(139,92,246,0.4); }
          @media (max-width: 968px) { .takeawaysGrid { grid-template-columns: 1fr; } }
        `}</style>
      </div>
    </>
  );
}
