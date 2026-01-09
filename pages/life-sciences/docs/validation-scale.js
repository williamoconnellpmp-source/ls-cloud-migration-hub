import Head from "next/head";
import Link from "next/link";

export default function ValidationScalePage() {
  return (
    <>
      <Head><title>Validation at Scale | Enterprise CSV Strategy</title></Head>
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
            <h1 className="h1">Validation at Scale</h1>
            <p className="subtitle">How to validate dozens (or hundreds) of systems without drowning in documentation</p>

            <section className="section">
              <h2 className="h2">The Scale Problem</h2>
              <p>
                Traditional CSV doesn''t scale. When you have 100+ systems to validate, the old approach of treating each system 
                as a unique snowflake leads to:
              </p>
              <ul>
                <li>Multi-year validation backlogs</li>
                <li>Validation teams as bottlenecks, not enablers</li>
                <li>Inconsistent documentation across systems</li>
                <li>Change control nightmares</li>
                <li>Compliance theater instead of real quality</li>
              </ul>
            </section>

            <section className="section">
              <h2 className="h2">Platform-Based Validation</h2>
              <p>
                The solution: <strong>validate the platform, then applications on that platform inherit validation.</strong>
              </p>
              
              <div className="platformApproach">
                <div className="platformLayer infra">
                  <div className="layerTitle">Infrastructure Layer (One-Time Validation)</div>
                  <div className="layerContent">
                    <p><strong>AWS Services:</strong> S3, Lambda, DynamoDB, Cognito, API Gateway</p>
                    <p><strong>Validation:</strong> Supplier qualification + infrastructure IQ/OQ</p>
                    <p><strong>Benefit:</strong> Validate once, reuse across all applications</p>
                  </div>
                </div>
                <div className="platformLayer apps">
                  <div className="layerTitle">Application Layer (Incremental Validation)</div>
                  <div className="layerContent">
                    <p><strong>Applications:</strong> VDC, LIMS, QMS, MES, etc.</p>
                    <p><strong>Validation:</strong> Application-specific PQ tests only</p>
                    <p><strong>Benefit:</strong> Focus testing on business logic, not infrastructure</p>
                  </div>
                </div>
              </div>

              <h3 className="h3">Example: 100 Applications on Validated Platform</h3>
              <div className="comparison">
                <div className="compItem traditional">
                  <div className="compTitle">Traditional Approach</div>
                  <p>100 systems × 6 months validation = 50 years of work</p>
                  <p className="compResult">Not feasible</p>
                </div>
                <div className="compItem platform">
                  <div className="compTitle">Platform Approach</div>
                  <p>1 platform validation (6 months) + 100 apps × 2 weeks = 10 months total</p>
                  <p className="compResult">Achievable with small team</p>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Reusable Validation Artifacts</h2>
              <p>Create templates and libraries that applications can reference:</p>
              
              <div className="artifactsGrid">
                <div className="artifact">
                  <div className="artifactTitle">Infrastructure URS Template</div>
                  <p>Standard requirements for AWS services (encryption, backup, audit, access control)</p>
                </div>
                <div className="artifact">
                  <div className="artifactTitle">Test Case Library</div>
                  <p>Pre-written IQ/OQ tests for common patterns (Lambda auth, DynamoDB audit, S3 integrity)</p>
                </div>
                <div className="artifact">
                  <div className="artifactTitle">Validation Plan Template</div>
                  <p>Standard structure for application validation plans</p>
                </div>
                <div className="artifact">
                  <div className="artifactTitle">Supplier Qualification Records</div>
                  <p>AWS qualification maintained centrally, referenced by all applications</p>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Automation Strategies</h2>
              <h3 className="h3">Infrastructure as Code = Validated by Design</h3>
              <p>
                CloudFormation templates that pass validation tests once can be deployed repeatedly with confidence:
              </p>
              <ul>
                <li>Template includes security controls (encryption, IAM policies, audit logging)</li>
                <li>Deploy to dev → run automated IQ tests → if pass, promote to prod</li>
                <li>No re-validation needed for identical infrastructure deployments</li>
              </ul>

              <h3 className="h3">Automated Testing</h3>
              <p>Replace manual test execution with automated scripts:</p>
              <ul>
                <li>API tests via Postman/Newman or pytest</li>
                <li>Infrastructure validation via AWS Config Rules</li>
                <li>Continuous monitoring replaces periodic re-validation</li>
              </ul>
            </section>

            <section className="section">
              <h2 className="h2">Change Control at Scale</h2>
              <p>
                Platform changes affect all applications - handle carefully:
              </p>
              
              <div className="changeStrategy">
                <div className="changeType platform">
                  <div className="changeTypeTitle">Platform Changes</div>
                  <p><strong>Examples:</strong> Upgrade Lambda runtime, change VPC config, update IAM roles</p>
                  <p><strong>Impact:</strong> Affects all applications on platform</p>
                  <p><strong>Strategy:</strong> Full impact assessment + regression testing across representative apps</p>
                </div>
                <div className="changeType app">
                  <div className="changeTypeTitle">Application Changes</div>
                  <p><strong>Examples:</strong> Update application code, add new feature, modify workflow</p>
                  <p><strong>Impact:</strong> Single application only</p>
                  <p><strong>Strategy:</strong> Standard change control + targeted testing</p>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Real-World Example: Roche/Genentech</h2>
              <p>
                During my 14 years at Roche/Genentech, we validated 100+ systems on shared infrastructure:
              </p>
              <ul>
                <li><strong>Challenge:</strong> Legacy approach: 6-12 months per system validation</li>
                <li><strong>Solution:</strong> Built validated AWS landing zone with pre-approved patterns</li>
                <li><strong>Result:</strong> Reduced application validation from 6 months to 4-6 weeks</li>
                <li><strong>Key Success Factor:</strong> Platform team owned infrastructure validation; app teams focused on business logic testing</li>
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
          .homeLink, .backLink { color: rgba(255,255,255,0.9); text-decoration: none; }
          .homeLink:hover, .backLink:hover { color: rgba(139,92,246,0.9); }
          .sep { color: rgba(255,255,255,0.3); }
          .mainContent { padding: 60px 0 100px; }
          .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
          .h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 16px; color: #fff; }
          .subtitle { font-size: 1.15rem; color: rgba(255,255,255,0.75); margin-bottom: 48px; }
          .section { margin-bottom: 56px; }
          .h2 { font-size: 1.8rem; font-weight: 700; margin-bottom: 24px; color: #fff; border-bottom: 2px solid rgba(139,92,246,0.3); padding-bottom: 12px; }
          .h3 { font-size: 1.3rem; font-weight: 600; margin: 32px 0 16px; color: rgba(255,255,255,0.95); }
          p { line-height: 1.7; margin-bottom: 16px; color: rgba(255,255,255,0.85); }
          ul { margin: 16px 0; padding-left: 28px; }
          li { margin-bottom: 12px; line-height: 1.7; color: rgba(255,255,255,0.85); }
          .platformApproach { display: grid; gap: 16px; margin: 32px 0; }
          .platformLayer { border-radius: 12px; padding: 24px; }
          .platformLayer.infra { background: rgba(59,130,246,0.15); border: 2px solid rgba(59,130,246,0.4); }
          .platformLayer.apps { background: rgba(34,197,94,0.15); border: 2px solid rgba(34,197,94,0.4); }
          .layerTitle { font-weight: 700; font-size: 1.2rem; margin-bottom: 16px; color: #fff; }
          .comparison { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin: 24px 0; }
          .compItem { border-radius: 12px; padding: 24px; text-align: center; }
          .compItem.traditional { background: rgba(239,68,68,0.1); border: 2px solid rgba(239,68,68,0.3); }
          .compItem.platform { background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.3); }
          .compTitle { font-weight: 700; font-size: 1.1rem; margin-bottom: 16px; color: #fff; }
          .compResult { margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1); font-weight: 700; font-size: 1.1rem; }
          .artifactsGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 24px 0; }
          .artifact { background: rgba(139,92,246,0.1); border: 1px solid rgba(139,92,246,0.3); border-radius: 12px; padding: 20px; }
          .artifactTitle { font-weight: 700; margin-bottom: 12px; color: rgba(167,139,250,1); }
          .changeStrategy { display: grid; gap: 20px; margin: 24px 0; }
          .changeType { border-radius: 12px; padding: 24px; }
          .changeType.platform { background: rgba(251,191,36,0.1); border: 2px solid rgba(251,191,36,0.3); }
          .changeType.app { background: rgba(59,130,246,0.1); border: 2px solid rgba(59,130,246,0.3); }
          .changeTypeTitle { font-weight: 700; font-size: 1.1rem; margin-bottom: 12px; color: #fff; }
          .docNav { display: flex; justify-content: space-between; margin-top: 64px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); }
          .navBtn { padding: 12px 24px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 600; }
          .navBtn:hover { background: rgba(139,92,246,0.2); border-color: rgba(139,92,246,0.4); }
          @media (max-width: 968px) { .comparison, .artifactsGrid { grid-template-columns: 1fr; } }
        `}</style>
      </div>
    </>
  );
}
