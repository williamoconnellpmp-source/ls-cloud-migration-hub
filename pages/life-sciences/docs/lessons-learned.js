import Head from "next/head";
import Link from "next/link";

export default function LessonsLearnedPage() {
  return (
    <>
      <Head><title>Lessons Learned | Cloud Migration Insights</title></Head>
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
            <h1 className="h1">Lessons Learned</h1>
            <p className="subtitle">Hard-won insights from 14 years delivering regulated cloud systems at Roche/Genentech</p>

            <section className="section">
              <h2 className="h2">Validation & Compliance</h2>
              
              <div className="lesson">
                <div className="lessonTitle">✅ Start validation early, not at the end</div>
                <div className="lessonContent">
                  <p><strong>What went wrong:</strong> Teams built entire systems, then handed to validation team. Result: massive rework, 6-month delays.</p>
                  <p><strong>What works:</strong> Embed validation requirements in user stories. Write test cases during development. Validation becomes continuous, not a gate.</p>
                </div>
              </div>

              <div className="lesson">
                <div className="lessonTitle">✅ Risk-based validation is your friend</div>
                <div className="lessonContent">
                  <p><strong>What went wrong:</strong> Treated every system equally. Spent 6 months validating low-risk reporting dashboard same as critical manufacturing system.</p>
                  <p><strong>What works:</strong> Formal risk assessment up front. High-risk systems get deep validation; low-risk get lighter approach. FDA guidance supports this.</p>
                </div>
              </div>

              <div className="lesson">
                <div className="lessonTitle">✅ Document what matters, not everything</div>
                <div className="lessonContent">
                  <p><strong>What went wrong:</strong> 500-page validation documents that nobody reads. Validation became compliance theater.</p>
                  <p><strong>What works:</strong> Concise URS/FS focused on critical requirements. Traceability matrix shows the work. Test results speak for themselves.</p>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Cloud Architecture</h2>

              <div className="lesson">
                <div className="lessonTitle">✅ Serverless simplifies validation</div>
                <div className="lessonContent">
                  <p><strong>What went wrong:</strong> Started with EC2 instances. Had to validate OS patches, security configs, networking. Nightmare.</p>
                  <p><strong>What works:</strong> Moved to Lambda/API Gateway/DynamoDB. AWS manages infrastructure; we validate application logic. VDC system: 61 test cases, done in 4 days.</p>
                </div>
              </div>

              <div className="lesson">
                <div className="lessonTitle">✅ Infrastructure as Code is validation gold</div>
                <div className="lessonContent">
                  <p><strong>What went wrong:</strong> Manual deployments via console. Every environment slightly different. Re-validation nightmares.</p>
                  <p><strong>What works:</strong> CloudFormation templates in Git. Deploy to dev, test, promote to prod. Identical infrastructure = one validation, multiple deployments.</p>
                </div>
              </div>

              <div className="lesson">
                <div className="lessonTitle">✅ Separate dev/prod accounts, not just environments</div>
                <div className="lessonContent">
                  <p><strong>What went wrong:</strong> Dev and prod in same AWS account. Developer fat-fingered prod DynamoDB table. Outage.</p>
                  <p><strong>What works:</strong> Completely separate AWS accounts. IAM enforces blast radius. Dev team can''t accidentally touch prod.</p>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Data Integrity</h2>

              <div className="lesson">
                <div className="lessonTitle">✅ Immutable audit trails are non-negotiable</div>
                <div className="lessonContent">
                  <p><strong>What went wrong:</strong> Audit logs in application database. Developer had DB admin access. Auditor asked: "How do I know logs weren''t modified?"</p>
                  <p><strong>What works:</strong> Separate DynamoDB table for audit. IAM denies UPDATE/DELETE. Test immutability in OQ. Sleep well at night.</p>
                </div>
              </div>

              <div className="lesson">
                <div className="lessonTitle">✅ Hash everything you care about</div>
                <div className="lessonContent">
                  <p><strong>What went wrong:</strong> File uploaded to S3. Later, someone claimed file was tampered with. No way to prove integrity.</p>
                  <p><strong>What works:</strong> SHA-256 hash on upload, verify on download. Hash mismatch = reject. Simple, bulletproof data integrity.</p>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">People & Process</h2>

              <div className="lesson">
                <div className="lessonTitle">✅ Validation team as enabler, not blocker</div>
                <div className="lessonContent">
                  <p><strong>What went wrong:</strong> Validation as final gate. Teams waited months for validation approval. Innovation stalled.</p>
                  <p><strong>What works:</strong> Validation embedded in product teams. Shared responsibility. Validation provides tools/templates; teams own execution.</p>
                </div>
              </div>

              <div className="lesson">
                <div className="lessonTitle">✅ Train QA on cloud, don''t fight it</div>
                <div className="lessonContent">
                  <p><strong>What went wrong:</strong> QA team unfamiliar with cloud. Defaulted to "we need to see the servers." Blocked cloud adoption.</p>
                  <p><strong>What works:</strong> Invested in QA training on AWS fundamentals, shared responsibility model, GAMP 5. QA became cloud advocates.</p>
                </div>
              </div>

              <div className="lesson">
                <div className="lessonTitle">✅ Start with non-prod, build confidence</div>
                <div className="lessonContent">
                  <p><strong>What went wrong:</strong> Tried to move critical production system to cloud first. Stakeholders panicked. Project killed.</p>
                  <p><strong>What works:</strong> Started with dev/test environments. Proved cloud works. Built confidence. Production followed naturally.</p>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">What I''d Do Differently</h2>
              <ul>
                <li><strong>Automate testing from day 1:</strong> Spent too long on manual test execution. Automated tests pay for themselves quickly.</li>
                <li><strong>Platform thinking earlier:</strong> Validated too many systems individually. Should have built validated platform sooner.</li>
                <li><strong>Smaller validation packages:</strong> 500-page documents intimidate auditors. Concise documentation is actually better.</li>
                <li><strong>Challenge "we''ve always done it this way":</strong> Many validation practices are legacy, not regulatory requirements. Question everything.</li>
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
          .h2 { font-size: 1.8rem; font-weight: 700; margin-bottom: 32px; color: #fff; border-bottom: 2px solid rgba(139,92,246,0.3); padding-bottom: 12px; }
          p { line-height: 1.7; margin-bottom: 16px; color: rgba(255,255,255,0.85); }
          ul { margin: 16px 0; padding-left: 28px; }
          li { margin-bottom: 12px; line-height: 1.7; color: rgba(255,255,255,0.85); }
          .lesson { background: rgba(255,255,255,0.05); border-left: 4px solid rgba(34,197,94,0.6); padding: 24px; margin-bottom: 24px; border-radius: 8px; }
          .lessonTitle { font-weight: 700; font-size: 1.15rem; margin-bottom: 16px; color: rgba(74,222,128,1); }
          .lessonContent p:first-child { margin-bottom: 12px; }
          .docNav { display: flex; justify-content: space-between; margin-top: 64px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); }
          .navBtn { padding: 12px 24px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 600; }
          .navBtn:hover { background: rgba(139,92,246,0.2); border-color: rgba(139,92,246,0.4); }
        `}</style>
      </div>
    </>
  );
}
