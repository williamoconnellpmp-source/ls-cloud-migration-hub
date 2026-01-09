import Head from "next/head";
import Link from "next/link";

export default function ProgramLeadershipPage() {
  return (
    <>
      <Head><title>Program & Platform Leadership | William O''Connell</title></Head>
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
            <h1 className="h1">Program & Platform Leadership</h1>
            <p className="subtitle">14 years leading enterprise cloud transformations at Roche/Genentech</p>

            <section className="section">
              <h2 className="h2">Leadership Philosophy</h2>
              <p>
                I lead large, complex programs by focusing on three principles:
              </p>
              <div className="principlesGrid">
                <div className="principle">
                  <div className="principleIcon">🎯</div>
                  <div className="principleTitle">Outcome-Driven</div>
                  <p>Focus on business value, not activity. "We migrated 50 apps" means nothing if they don''t work.</p>
                </div>
                <div className="principle">
                  <div className="principleIcon">🤝</div>
                  <div className="principleTitle">Cross-Functional Collaboration</div>
                  <p>Break down silos between dev, ops, QA, security, compliance. One team, one goal.</p>
                </div>
                <div className="principle">
                  <div className="principleIcon">📊</div>
                  <div className="principleTitle">Data-Informed Decisions</div>
                  <p>Use metrics to drive decisions. Opinions are cheap; data tells the truth.</p>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Key Programs Delivered</h2>

              <div className="program">
                <div className="programHeader">
                  <div className="programTitle">Enterprise AWS Cloud Migration</div>
                  <div className="programMeta">2018-2022 | $100M+ program value</div>
                </div>
                <div className="programContent">
                  <h3 className="h3">Challenge</h3>
                  <p>Migrate 100+ Life Sciences applications from on-premise data centers to AWS while maintaining GxP compliance.</p>
                  
                  <h3 className="h3">Approach</h3>
                  <ul>
                    <li>Built validated AWS landing zone with pre-approved architectural patterns</li>
                    <li>Established platform team to own infrastructure validation</li>
                    <li>Created self-service migration playbooks for application teams</li>
                    <li>Implemented automated testing and continuous compliance monitoring</li>
                  </ul>

                  <h3 className="h3">Results</h3>
                  <ul>
                    <li>Migrated 100+ systems supporting 100,000+ users</li>
                    <li>Reduced data center footprint by 60%</li>
                    <li>$20M+ annual operational savings</li>
                    <li>Zero audit findings during FDA inspections</li>
                    <li>Validation time reduced from 6 months to 4-6 weeks per application</li>
                  </ul>
                </div>
              </div>

              <div className="program">
                <div className="programHeader">
                  <div className="programTitle">Validated Cloud Platform</div>
                  <div className="programMeta">2019-2020 | Platform serving 50+ applications</div>
                </div>
                <div className="programContent">
                  <h3 className="h3">Challenge</h3>
                  <p>Traditional validation approach couldn''t scale. Needed platform-based validation to accelerate cloud adoption.</p>
                  
                  <h3 className="h3">Approach</h3>
                  <ul>
                    <li>Designed validated AWS platform (networking, security, monitoring, audit)</li>
                    <li>Created infrastructure-as-code templates (CloudFormation)</li>
                    <li>Established governance model and change control processes</li>
                    <li>Trained QA team on GAMP 5 and risk-based validation</li>
                  </ul>

                  <h3 className="h3">Results</h3>
                  <ul>
                    <li>Validated platform adopted by 50+ applications</li>
                    <li>Applications inherit platform validation - reduced redundant testing</li>
                    <li>Consistent security and compliance controls across portfolio</li>
                    <li>Enabled rapid innovation while maintaining GxP compliance</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Leadership Competencies</h2>

              <div className="competenciesGrid">
                <div className="competency">
                  <div className="compTitle">Program Management</div>
                  <ul>
                    <li>Large-scale program planning and execution</li>
                    <li>Stakeholder management across IT, QA, Business</li>
                    <li>Risk management and issue resolution</li>
                    <li>Budget management ($50M+ programs)</li>
                  </ul>
                </div>

                <div className="competency">
                  <div className="compTitle">Technical Strategy</div>
                  <ul>
                    <li>Cloud architecture and solution design</li>
                    <li>Build vs. buy decisions</li>
                    <li>Technology roadmap development</li>
                    <li>Vendor evaluation and management</li>
                  </ul>
                </div>

                <div className="competency">
                  <div className="compTitle">Team Leadership</div>
                  <ul>
                    <li>Built and managed teams of 20+ engineers</li>
                    <li>Mentored TPMs and technical leads</li>
                    <li>Created culture of ownership and accountability</li>
                    <li>Fostered collaboration across organizational silos</li>
                  </ul>
                </div>

                <div className="competency">
                  <div className="compTitle">Compliance & Quality</div>
                  <ul>
                    <li>GxP and CSV subject matter expertise</li>
                    <li>Risk-based validation strategies</li>
                    <li>Regulatory inspection support</li>
                    <li>Quality-by-design approach to systems</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Tools & Methodologies</h2>
              <div className="toolsGrid">
                <div className="toolCategory">
                  <div className="toolTitle">Program Management</div>
                  <p>JIRA, Confluence, MS Project, Smartsheet</p>
                </div>
                <div className="toolCategory">
                  <div className="toolTitle">Cloud Platform</div>
                  <p>AWS (Lambda, S3, DynamoDB, Cognito, CloudFormation)</p>
                </div>
                <div className="toolCategory">
                  <div className="toolTitle">Development</div>
                  <p>Git, CI/CD (GitHub Actions), Infrastructure as Code</p>
                </div>
                <div className="toolCategory">
                  <div className="toolTitle">Compliance</div>
                  <p>GAMP 5, 21 CFR Part 11, CSV frameworks</p>
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
          .homeLink, .backLink { color: rgba(255,255,255,0.9); text-decoration: none; }
          .homeLink:hover, .backLink:hover { color: rgba(139,92,246,0.9); }
          .sep { color: rgba(255,255,255,0.3); }
          .mainContent { padding: 60px 0 100px; }
          .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
          .h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 16px; color: #fff; }
          .subtitle { font-size: 1.15rem; color: rgba(255,255,255,0.75); margin-bottom: 48px; }
          .section { margin-bottom: 56px; }
          .h2 { font-size: 1.8rem; font-weight: 700; margin-bottom: 32px; color: #fff; border-bottom: 2px solid rgba(139,92,246,0.3); padding-bottom: 12px; }
          .h3 { font-size: 1.2rem; font-weight: 600; margin: 24px 0 16px; color: rgba(255,255,255,0.95); }
          p { line-height: 1.7; margin-bottom: 16px; color: rgba(255,255,255,0.85); }
          ul { margin: 16px 0; padding-left: 28px; }
          li { margin-bottom: 12px; line-height: 1.7; color: rgba(255,255,255,0.85); }
          .principlesGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin: 32px 0; }
          .principle { background: rgba(139,92,246,0.1); border: 1px solid rgba(139,92,246,0.3); border-radius: 12px; padding: 24px; text-align: center; }
          .principleIcon { font-size: 3rem; margin-bottom: 12px; }
          .principleTitle { font-weight: 700; margin-bottom: 12px; color: rgba(167,139,250,1); }
          .program { background: rgba(59,130,246,0.1); border: 2px solid rgba(59,130,246,0.3); border-radius: 12px; padding: 32px; margin-bottom: 32px; }
          .programHeader { margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); }
          .programTitle { font-size: 1.5rem; font-weight: 700; margin-bottom: 8px; color: rgba(96,165,250,1); }
          .programMeta { color: rgba(255,255,255,0.7); font-size: 0.95rem; }
          .competenciesGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin: 24px 0; }
          .competency { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 24px; }
          .compTitle { font-weight: 700; font-size: 1.1rem; margin-bottom: 16px; color: rgba(255,255,255,0.95); }
          .toolsGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 24px 0; }
          .toolCategory { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px; padding: 20px; }
          .toolTitle { font-weight: 700; margin-bottom: 8px; color: rgba(74,222,128,1); }
          .docNav { display: flex; justify-content: space-between; margin-top: 64px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); }
          .navBtn { padding: 12px 24px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 600; }
          .navBtn:hover { background: rgba(139,92,246,0.2); border-color: rgba(139,92,246,0.4); }
          @media (max-width: 968px) { .principlesGrid, .competenciesGrid, .toolsGrid { grid-template-columns: 1fr; } }
        `}</style>
      </div>
    </>
  );
}
