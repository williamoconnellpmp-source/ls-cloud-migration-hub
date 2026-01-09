import Head from "next/head";
import Link from "next/link";

export default function RiskValidationPage() {
  return (
    <>
      <Head>
        <title>Risk-Based Validation | Efficient CSV Approach</title>
      </Head>
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
            <h1 className="h1">Risk-Based Validation</h1>
            <p className="subtitle">How to validate smarter, not harder: applying risk assessment to reduce validation burden while maintaining compliance</p>

            <section className="section">
              <h2 className="h2">1. The Problem with Traditional Validation</h2>
              <p>
                Traditional Computer System Validation (CSV) treated all systems equally: every system got the same exhaustive validation regardless of actual risk. 
                This led to massive validation backlogs, years-long timelines, and validation teams becoming bottlenecks rather than enablers.
              </p>
              <div className="problemBox">
                <div className="problemTitle">Traditional CSV Pain Points:</div>
                <ul>
                  <li>6-12 month validation cycles for simple systems</li>
                  <li>Hundreds of test cases for low-risk applications</li>
                  <li>Re-validation nightmares for minor changes</li>
                  <li>Validation documents longer than the code itself</li>
                  <li>Compliance theater instead of real quality</li>
                </ul>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">2. Risk-Based Validation Philosophy</h2>
              <p>
                <strong>Risk-based validation</strong> focuses effort where it matters most. The principle is simple:
              </p>
              <div className="principleBox">
                <p className="principle">
                  "The level of validation effort should be proportional to the risk the system poses to patient safety, product quality, and data integrity."
                </p>
              </div>
              <p>
                This approach is endorsed by FDA (in multiple guidance documents) and formalized in <strong>GAMP 5</strong> (Good Automated Manufacturing Practice).
              </p>

              <h3 className="h3">2.1 Risk Assessment Framework</h3>
              <div className="riskMatrix">
                <div className="riskRow riskHeader">
                  <div className="riskCol">Risk Factor</div>
                  <div className="riskCol">Questions to Ask</div>
                  <div className="riskCol">Impact on Validation</div>
                </div>
                <div className="riskRow">
                  <div className="riskCol"><strong>Patient Safety</strong></div>
                  <div className="riskCol">Could a system failure harm a patient?</div>
                  <div className="riskCol">High risk = extensive testing of safety-critical functions</div>
                </div>
                <div className="riskRow">
                  <div className="riskCol"><strong>Product Quality</strong></div>
                  <div className="riskCol">Could a malfunction affect product efficacy?</div>
                  <div className="riskCol">High risk = detailed IQ/OQ/PQ for manufacturing systems</div>
                </div>
                <div className="riskRow">
                  <div className="riskCol"><strong>Data Integrity</strong></div>
                  <div className="riskCol">Does the system create/store GxP records?</div>
                  <div className="riskCol">High risk = audit trail testing, ALCOA+ verification</div>
                </div>
                <div className="riskRow">
                  <div className="riskCol"><strong>Regulatory Visibility</strong></div>
                  <div className="riskCol">Will this data be submitted to FDA?</div>
                  <div className="riskCol">High visibility = stricter validation documentation</div>
                </div>
                <div className="riskRow">
                  <div className="riskCol"><strong>System Complexity</strong></div>
                  <div className="riskCol">Custom code vs. COTS? Integrations?</div>
                  <div className="riskCol">Complex = more testing; simple COTS = lighter validation</div>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">3. GAMP 5 Categories</h2>
              <p>
                GAMP 5 categorizes systems by complexity, with validation effort scaling accordingly:
              </p>
              <div className="gampGrid">
                <div className="gampCard cat1">
                  <div className="gampCat">Category 1</div>
                  <div className="gampName">Infrastructure</div>
                  <div className="gampDesc">OS, databases, hardware</div>
                  <div className="gampVal">Supplier assessment only</div>
                </div>
                <div className="gampCard cat3">
                  <div className="gampCat">Category 3</div>
                  <div className="gampName">Non-Configured</div>
                  <div className="gampDesc">COTS used as-is (Excel, Word)</div>
                  <div className="gampVal">Supplier + light IQ/OQ</div>
                </div>
                <div className="gampCard cat4">
                  <div className="gampCat">Category 4</div>
                  <div className="gampName">Configured</div>
                  <div className="gampDesc">COTS + config (VDC system)</div>
                  <div className="gampVal">Full IQ/OQ/PQ</div>
                </div>
                <div className="gampCard cat5">
                  <div className="gampCat">Category 5</div>
                  <div className="gampName">Custom</div>
                  <div className="gampDesc">Fully custom software</div>
                  <div className="gampVal">SDLC + extensive testing</div>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">4. VDC System Risk Assessment</h2>
              <p>
                Let''s apply risk-based thinking to the VDC system:
              </p>
              <div className="vdcRisk">
                <div className="riskAssessment">
                  <div className="assessTitle">VDC System Risk Profile</div>
                  <div className="assessGrid">
                    <div className="assessItem">
                      <span className="assessLabel">Patient Safety Impact:</span>
                      <span className="assessValue low">Low</span>
                      <span className="assessReason">Document approval system doesn''t directly affect patient treatment</span>
                    </div>
                    <div className="assessItem">
                      <span className="assessLabel">Product Quality Impact:</span>
                      <span className="assessValue low">Low</span>
                      <span className="assessReason">Doesn''t control manufacturing or testing processes</span>
                    </div>
                    <div className="assessItem">
                      <span className="assessLabel">Data Integrity Risk:</span>
                      <span className="assessValue high">High</span>
                      <span className="assessReason">Creates and maintains GxP records requiring audit trail</span>
                    </div>
                    <div className="assessItem">
                      <span className="assessLabel">GAMP Category:</span>
                      <span className="assessValue">Category 4</span>
                      <span className="assessReason">AWS managed services + configuration + custom Lambda</span>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="h3">4.1 Validation Strategy</h3>
              <p>
                Based on this risk profile, the VDC validation focused on:
              </p>
              <div className="strategyGrid">
                <div className="strategyCard high">
                  <div className="strategyTitle">High Priority Testing</div>
                  <ul>
                    <li>Audit trail completeness and immutability</li>
                    <li>Access control and role separation</li>
                    <li>Document integrity (hash verification)</li>
                    <li>MFA enforcement</li>
                    <li>ALCOA+ data integrity principles</li>
                  </ul>
                </div>
                <div className="strategyCard medium">
                  <div className="strategyTitle">Medium Priority Testing</div>
                  <ul>
                    <li>End-to-end workflows</li>
                    <li>Error handling</li>
                    <li>Performance benchmarks</li>
                    <li>AWS infrastructure configuration</li>
                  </ul>
                </div>
                <div className="strategyCard low">
                  <div className="strategyTitle">Lower Priority Testing</div>
                  <ul>
                    <li>UI cosmetic elements</li>
                    <li>Non-GxP features (help text, tooltips)</li>
                    <li>Edge cases with minimal real-world impact</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">5. Practical Risk-Based Decisions</h2>

              <h3 className="h3">5.1 Testing Scope Decisions</h3>
              <div className="decisionTable">
                <div className="decRow decHeader">
                  <div className="decCol">System Feature</div>
                  <div className="decCol">Risk Level</div>
                  <div className="decCol">Validation Approach</div>
                </div>
                <div className="decRow">
                  <div className="decCol">Document approval workflow</div>
                  <div className="decCol"><span className="badge high">High</span></div>
                  <div className="decCol">Full PQ testing with multiple scenarios</div>
                </div>
                <div className="decRow">
                  <div className="decCol">Audit trail creation</div>
                  <div className="decCol"><span className="badge high">High</span></div>
                  <div className="decCol">OQ + PQ tests for every action type</div>
                </div>
                <div className="decRow">
                  <div className="decCol">SHA-256 hash calculation</div>
                  <div className="decCol"><span className="badge high">High</span></div>
                  <div className="decCol">Detailed OQ test with manual verification</div>
                </div>
                <div className="decRow">
                  <div className="decCol">Login page styling</div>
                  <div className="decCol"><span className="badge low">Low</span></div>
                  <div className="decCol">Visual inspection, no formal test case</div>
                </div>
                <div className="decRow">
                  <div className="decCol">Help text content</div>
                  <div className="decCol"><span className="badge low">Low</span></div>
                  <div className="decCol">Review only, no testing required</div>
                </div>
              </div>

              <h3 className="h3">5.2 Change Control Decisions</h3>
              <p>
                Risk-based validation also applies to changes:
              </p>
              <div className="changeDecisions">
                <div className="changeExample">
                  <div className="changeScenario">Scenario: Update Lambda function to add new approval reason field</div>
                  <div className="changeRisk">Risk: Medium (adds data field, doesn''t change core logic)</div>
                  <div className="changeAction">Action: Targeted OQ tests for new field + smoke test existing workflows. No full re-validation.</div>
                </div>
                <div className="changeExample">
                  <div className="changeScenario">Scenario: Change DynamoDB audit table schema</div>
                  <div className="changeRisk">Risk: High (affects data integrity and audit trail)</div>
                  <div className="changeAction">Action: Full impact assessment + re-execute relevant OQ/PQ tests + update validation docs.</div>
                </div>
                <div className="changeExample">
                  <div className="changeScenario">Scenario: Update button text from "Submit" to "Submit for Review"</div>
                  <div className="changeRisk">Risk: Low (UI text only, no functional change)</div>
                  <div className="changeAction">Action: Change control documentation only. No testing required.</div>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">6. Benefits of Risk-Based Validation</h2>
              <div className="benefitsGrid">
                <div className="benefitCard">
                  <div className="benefitIcon">⚡</div>
                  <div className="benefitTitle">Faster Time to Production</div>
                  <p>Focus effort on critical areas = faster validation cycles. VDC validated in 4 days, not 4 months.</p>
                </div>
                <div className="benefitCard">
                  <div className="benefitIcon">💰</div>
                  <div className="benefitTitle">Lower Cost</div>
                  <p>Fewer unnecessary tests = less validation overhead. Spend budget where it matters.</p>
                </div>
                <div className="benefitCard">
                  <div className="benefitIcon">🎯</div>
                  <div className="benefitTitle">Better Quality</div>
                  <p>Deep testing on high-risk areas finds real issues. Shallow testing everywhere finds nothing.</p>
                </div>
                <div className="benefitCard">
                  <div className="benefitIcon">📈</div>
                  <div className="benefitTitle">Scalable</div>
                  <p>Sustainable validation approach that doesn''t collapse under system growth.</p>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">7. Common Objections</h2>
              <div className="objections">
                <div className="objection">
                  <div className="objQ">"But FDA expects comprehensive validation!"</div>
                  <div className="objA">
                    FDA guidance explicitly endorses risk-based approaches. FDA inspectors look for <em>appropriate</em> validation, 
                    not checkbox compliance. Document your risk assessment and be prepared to justify decisions.
                  </div>
                </div>
                <div className="objection">
                  <div className="objQ">"What if we miss something critical?"</div>
                  <div className="objA">
                    Risk assessment is systematic, not arbitrary. If you properly identify high-risk areas (patient safety, data integrity), 
                    you won''t miss critical items. Traditional validation misses things too - it just takes longer.
                  </div>
                </div>
                <div className="objection">
                  <div className="objQ">"Our QA team will never approve this."</div>
                  <div className="objA">
                    Educate stakeholders on GAMP 5 and FDA guidance. Show the math: risk-based validation actually delivers 
                    <em>better</em> coverage of critical areas. Quality teams want systems that work, not validation documents.
                  </div>
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
          .h2 { font-size: 1.8rem; font-weight: 700; margin-bottom: 24px; color: #fff; border-bottom: 2px solid rgba(139,92,246,0.3); padding-bottom: 12px; }
          .h3 { font-size: 1.3rem; font-weight: 600; margin: 32px 0 16px; color: rgba(255,255,255,0.95); }
          p { line-height: 1.7; margin-bottom: 16px; color: rgba(255,255,255,0.85); }
          ul { margin: 16px 0; padding-left: 28px; }
          li { margin-bottom: 12px; line-height: 1.7; color: rgba(255,255,255,0.85); }
          .problemBox { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); border-radius: 12px; padding: 24px; margin: 24px 0; }
          .problemTitle { font-weight: 700; font-size: 1.1rem; margin-bottom: 16px; color: rgba(248,113,113,1); }
          .principleBox { background: rgba(59,130,246,0.15); border-left: 4px solid rgba(59,130,246,0.9); padding: 24px; margin: 24px 0; }
          .principle { font-size: 1.15rem; font-style: italic; color: rgba(255,255,255,0.95); margin: 0; }
          .riskMatrix { margin: 24px 0; }
          .riskRow { display: grid; grid-template-columns: 180px 1fr 300px; gap: 16px; padding: 12px 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.1); }
          .riskHeader { background: rgba(59,130,246,0.15); font-weight: 700; color: #fff; }
          .gampGrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 24px 0; }
          .gampCard { border-radius: 12px; padding: 24px; text-align: center; }
          .gampCard.cat1 { background: rgba(156,163,175,0.1); border: 2px solid rgba(156,163,175,0.3); }
          .gampCard.cat3 { background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.3); }
          .gampCard.cat4 { background: rgba(59,130,246,0.1); border: 2px solid rgba(59,130,246,0.3); }
          .gampCard.cat5 { background: rgba(239,68,68,0.1); border: 2px solid rgba(239,68,68,0.3); }
          .gampCat { font-size: 1.5rem; font-weight: 800; margin-bottom: 8px; color: #fff; }
          .gampName { font-weight: 700; margin-bottom: 8px; color: rgba(255,255,255,0.9); }
          .gampDesc { font-size: 0.9rem; margin-bottom: 12px; color: rgba(255,255,255,0.7); }
          .gampVal { font-size: 0.85rem; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); }
          .vdcRisk { margin: 24px 0; }
          .riskAssessment { background: rgba(59,130,246,0.1); border: 2px solid rgba(59,130,246,0.3); border-radius: 12px; padding: 24px; }
          .assessTitle { font-weight: 700; font-size: 1.2rem; margin-bottom: 20px; color: rgba(96,165,250,1); }
          .assessGrid { display: grid; gap: 16px; }
          .assessItem { display: grid; grid-template-columns: 200px 100px 1fr; gap: 12px; padding: 12px; background: rgba(0,0,0,0.2); border-radius: 8px; align-items: center; }
          .assessLabel { font-weight: 600; color: rgba(255,255,255,0.9); }
          .assessValue { font-weight: 700; text-align: center; padding: 4px 12px; border-radius: 6px; }
          .assessValue.low { background: rgba(34,197,94,0.2); color: rgba(74,222,128,1); }
          .assessValue.high { background: rgba(239,68,68,0.2); color: rgba(248,113,113,1); }
          .assessReason { font-size: 0.9rem; color: rgba(255,255,255,0.7); }
          .strategyGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 24px 0; }
          .strategyCard { border-radius: 12px; padding: 20px; }
          .strategyCard.high { background: rgba(239,68,68,0.1); border: 2px solid rgba(239,68,68,0.3); }
          .strategyCard.medium { background: rgba(251,191,36,0.1); border: 2px solid rgba(251,191,36,0.3); }
          .strategyCard.low { background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.3); }
          .strategyTitle { font-weight: 700; margin-bottom: 16px; color: #fff; text-align: center; }
          .decisionTable { margin: 24px 0; }
          .decRow { display: grid; grid-template-columns: 1fr 120px 1fr; gap: 16px; padding: 12px 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.1); }
          .decHeader { background: rgba(59,130,246,0.15); font-weight: 700; color: #fff; }
          .badge { padding: 4px 12px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; }
          .badge.high { background: rgba(239,68,68,0.2); color: rgba(248,113,113,1); }
          .badge.low { background: rgba(34,197,94,0.2); color: rgba(74,222,128,1); }
          .changeDecisions { display: grid; gap: 20px; margin: 24px 0; }
          .changeExample { background: rgba(139,92,246,0.1); border-left: 4px solid rgba(139,92,246,0.6); padding: 20px; border-radius: 8px; }
          .changeScenario { font-weight: 700; margin-bottom: 8px; color: rgba(167,139,250,1); }
          .changeRisk { margin-bottom: 8px; color: rgba(255,255,255,0.8); }
          .changeAction { color: rgba(255,255,255,0.85); }
          .benefitsGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin: 32px 0; }
          .benefitCard { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px; padding: 24px; text-align: center; }
          .benefitIcon { font-size: 3rem; margin-bottom: 12px; }
          .benefitTitle { font-weight: 700; font-size: 1.1rem; margin-bottom: 12px; color: rgba(74,222,128,1); }
          .objections { display: grid; gap: 20px; margin: 24px 0; }
          .objection { background: rgba(255,255,255,0.05); border-left: 4px solid rgba(251,191,36,0.6); padding: 20px; border-radius: 8px; }
          .objQ { font-weight: 700; font-size: 1.05rem; margin-bottom: 12px; color: rgba(253,224,71,1); }
          .objA { color: rgba(255,255,255,0.85); line-height: 1.7; }
          .docNav { display: flex; justify-content: space-between; margin-top: 64px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); }
          .navBtn { padding: 12px 24px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 600; }
          .navBtn:hover { background: rgba(139,92,246,0.2); border-color: rgba(139,92,246,0.4); }
          @media (max-width: 968px) {
            .riskRow, .decRow { grid-template-columns: 1fr; }
            .gampGrid, .strategyGrid, .benefitsGrid { grid-template-columns: 1fr; }
            .assessItem { grid-template-columns: 1fr; }
          }
        `}</style>
      </div>
    </>
  );
}
