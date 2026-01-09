import Head from "next/head";
import Link from "next/link";

export default function SystemDeliveryPage() {
  return (
    <>
      <Head><title>Regulated System Delivery | William O''Connell</title></Head>
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
            <h1 className="h1">Regulated System Delivery</h1>
            <p className="subtitle">Proven methodology for delivering GxP-compliant systems on time and on budget</p>

            <section className="section">
              <h2 className="h2">Delivery Framework</h2>
              <p>
                Over 14 years at Roche/Genentech, I developed a repeatable framework for delivering regulated systems:
              </p>

              <div className="phases">
                <div className="phase">
                  <div className="phaseNum">1</div>
                  <div className="phaseContent">
                    <div className="phaseTitle">Requirements & Risk Assessment</div>
                    <ul>
                      <li>Collaborate with business stakeholders to define user requirements</li>
                      <li>Conduct GAMP categorization (Cat 3/4/5)</li>
                      <li>Perform risk assessment to determine validation scope</li>
                      <li>Define acceptance criteria and success metrics</li>
                    </ul>
                    <div className="phaseDeliverable"><strong>Deliverable:</strong> User Requirements Specification (URS)</div>
                  </div>
                </div>

                <div className="phase">
                  <div className="phaseNum">2</div>
                  <div className="phaseContent">
                    <div className="phaseTitle">Design & Architecture</div>
                    <ul>
                      <li>Design technical architecture aligned to AWS Well-Architected Framework</li>
                      <li>Map requirements to technical specifications</li>
                      <li>Define security controls, audit logging, access management</li>
                      <li>Create infrastructure-as-code templates (CloudFormation)</li>
                    </ul>
                    <div className="phaseDeliverable"><strong>Deliverable:</strong> Functional Specification (FS) + Architecture Diagrams</div>
                  </div>
                </div>

                <div className="phase">
                  <div className="phaseNum">3</div>
                  <div className="phaseContent">
                    <div className="phaseTitle">Development & Testing</div>
                    <ul>
                      <li>Build application with validation in mind (audit trails, data integrity)</li>
                      <li>Write test cases mapped to requirements (traceability)</li>
                      <li>Implement CI/CD pipeline with automated testing</li>
                      <li>Conduct code reviews and security scans</li>
                    </ul>
                    <div className="phaseDeliverable"><strong>Deliverable:</strong> Working software + Test Cases</div>
                  </div>
                </div>

                <div className="phase">
                  <div className="phaseNum">4</div>
                  <div className="phaseContent">
                    <div className="phaseTitle">Validation (IQ/OQ/PQ)</div>
                    <ul>
                      <li>Execute Installation Qualification (infrastructure deployed correctly)</li>
                      <li>Execute Operational Qualification (components work independently)</li>
                      <li>Execute Performance Qualification (end-to-end workflows)</li>
                      <li>Document test results with evidence</li>
                    </ul>
                    <div className="phaseDeliverable"><strong>Deliverable:</strong> IQ/OQ/PQ Protocols + Traceability Matrix</div>
                  </div>
                </div>

                <div className="phase">
                  <div className="phaseNum">5</div>
                  <div className="phaseContent">
                    <div className="phaseTitle">Go-Live & Handoff</div>
                    <ul>
                      <li>Deploy to production environment</li>
                      <li>Conduct user training</li>
                      <li>Create SOPs (Standard Operating Procedures)</li>
                      <li>Establish monitoring and support processes</li>
                    </ul>
                    <div className="phaseDeliverable"><strong>Deliverable:</strong> Production system + Training materials + SOPs</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Key Success Factors</h2>

              <div className="successFactors">
                <div className="factor">
                  <div className="factorTitle">Embed QA Early</div>
                  <p>Don''t wait until the end. QA reviews requirements, participates in design, writes test cases during development.</p>
                </div>
                <div className="factor">
                  <div className="factorTitle">Automation is Critical</div>
                  <p>Automate infrastructure deployment (CloudFormation), testing (pytest/Postman), and monitoring. Manual = slow + error-prone.</p>
                </div>
                <div className="factor">
                  <div className="factorTitle">Continuous Communication</div>
                  <p>Weekly stakeholder updates. No surprises. Escalate risks early. Transparency builds trust.</p>
                </div>
                <div className="factor">
                  <div className="factorTitle">Manage Scope Creep</div>
                  <p>Requirements change. That''s fine. But track changes, assess impact, and adjust timeline. Don''t silently absorb scope.</p>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Example Project Timeline</h2>
              <p>
                Typical timeline for a GAMP Category 4 system (like VDC):
              </p>
              <div className="timeline">
                <div className="timelineItem">
                  <div className="timelinePhase">Requirements & Risk</div>
                  <div className="timelineDuration">2 weeks</div>
                </div>
                <div className="timelineItem">
                  <div className="timelinePhase">Design & Architecture</div>
                  <div className="timelineDuration">2 weeks</div>
                </div>
                <div className="timelineItem">
                  <div className="timelinePhase">Development & Testing</div>
                  <div className="timelineDuration">4-6 weeks</div>
                </div>
                <div className="timelineItem">
                  <div className="timelinePhase">Validation (IQ/OQ/PQ)</div>
                  <div className="timelineDuration">2 weeks</div>
                </div>
                <div className="timelineItem">
                  <div className="timelinePhase">Go-Live & Training</div>
                  <div className="timelineDuration">1 week</div>
                </div>
                <div className="timelineTotal">
                  <strong>Total: 11-13 weeks</strong>
                </div>
              </div>
              <p className="timelineNote">
                <em>Note: Traditional validation approach: 6-12 months for same system.</em>
              </p>
            </section>

            <section className="section">
              <h2 className="h2">Deliverables Checklist</h2>
              <div className="checklistGrid">
                <div className="checklistSection">
                  <div className="checklistTitle">Requirements Phase</div>
                  <ul>
                    <li>☐ User Requirements Specification (URS)</li>
                    <li>☐ Risk Assessment</li>
                    <li>☐ GAMP Categorization</li>
                    <li>☐ Validation Plan</li>
                  </ul>
                </div>
                <div className="checklistSection">
                  <div className="checklistTitle">Design Phase</div>
                  <ul>
                    <li>☐ Functional Specification (FS)</li>
                    <li>☐ Architecture Diagrams</li>
                    <li>☐ Security Design</li>
                    <li>☐ CloudFormation Templates</li>
                  </ul>
                </div>
                <div className="checklistSection">
                  <div className="checklistTitle">Validation Phase</div>
                  <ul>
                    <li>☐ IQ Protocol + Results</li>
                    <li>☐ OQ Protocol + Results</li>
                    <li>☐ PQ Protocol + Results</li>
                    <li>☐ Requirements Traceability Matrix</li>
                  </ul>
                </div>
                <div className="checklistSection">
                  <div className="checklistTitle">Go-Live Phase</div>
                  <ul>
                    <li>☐ Standard Operating Procedures (SOPs)</li>
                    <li>☐ User Training Materials</li>
                    <li>☐ Runbook / Support Documentation</li>
                    <li>☐ Validation Summary Report</li>
                  </ul>
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
          p { line-height: 1.7; margin-bottom: 16px; color: rgba(255,255,255,0.85); }
          ul { margin: 16px 0; padding-left: 28px; }
          li { margin-bottom: 12px; line-height: 1.7; color: rgba(255,255,255,0.85); }
          .phases { display: grid; gap: 24px; margin: 32px 0; }
          .phase { display: grid; grid-template-columns: 80px 1fr; gap: 20px; }
          .phaseNum { width: 80px; height: 80px; background: rgba(139,92,246,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 800; color: #fff; }
          .phaseContent { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 24px; }
          .phaseTitle { font-weight: 700; font-size: 1.2rem; margin-bottom: 16px; color: rgba(167,139,250,1); }
          .phaseDeliverable { margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.85); }
          .successFactors { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 24px 0; }
          .factor { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px; padding: 20px; }
          .factorTitle { font-weight: 700; margin-bottom: 12px; color: rgba(74,222,128,1); }
          .timeline { margin: 24px 0; }
          .timelineItem { display: grid; grid-template-columns: 1fr 150px; gap: 16px; padding: 16px; background: rgba(59,130,246,0.1); border-bottom: 1px solid rgba(59,130,246,0.2); }
          .timelinePhase { font-weight: 600; color: rgba(255,255,255,0.9); }
          .timelineDuration { text-align: right; color: rgba(96,165,250,1); font-weight: 600; }
          .timelineTotal { margin-top: 16px; padding: 16px; background: rgba(139,92,246,0.2); border-radius: 8px; text-align: center; font-size: 1.2rem; color: #fff; }
          .timelineNote { margin-top: 16px; font-style: italic; color: rgba(255,255,255,0.7); }
          .checklistGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin: 24px 0; }
          .checklistSection { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 24px; }
          .checklistTitle { font-weight: 700; margin-bottom: 16px; color: rgba(255,255,255,0.95); font-size: 1.1rem; }
          .docNav { display: flex; justify-content: space-between; margin-top: 64px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); }
          .navBtn { padding: 12px 24px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 600; }
          .navBtn:hover { background: rgba(139,92,246,0.2); border-color: rgba(139,92,246,0.4); }
          @media (max-width: 968px) { 
            .phase { grid-template-columns: 1fr; }
            .successFactors, .checklistGrid { grid-template-columns: 1fr; }
            .timelineItem { grid-template-columns: 1fr; }
          }
        `}</style>
      </div>
    </>
  );
}
