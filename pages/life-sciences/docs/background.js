import Head from "next/head";
import Link from "next/link";

export default function BackgroundPage() {
  return (
    <>
      <Head><title>Life Sciences Background | William O''Connell</title></Head>
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
            <h1 className="h1">Life Sciences Background</h1>
            <p className="subtitle">14 years at Roche/Genentech building the technical foundation for life-saving medicines</p>

            <section className="section">
              <h2 className="h2">Roche/Genentech Journey</h2>
              
              <div className="timeline">
                <div className="timelineItem">
                  <div className="timelineYear">2008-2014</div>
                  <div className="timelineContent">
                    <div className="timelineTitle">Early Career - Manufacturing IT</div>
                    <p>Started in manufacturing IT, supporting GMP systems for biologics production. 
                    Learned the fundamentals of GxP, validation, and regulatory compliance from the ground up.</p>
                    <div className="timelineHighlight">Key Learning: Why validation matters. Saw firsthand how system failures impact production.</div>
                  </div>
                </div>

                <div className="timelineItem">
                  <div className="timelineYear">2014-2018</div>
                  <div className="timelineContent">
                    <div className="timelineTitle">Technical Program Manager - Enterprise Systems</div>
                    <p>Led large programs delivering LIMS, QMS, and document management systems. 
                    Managed cross-functional teams, budgets up to $50M, and stakeholder relationships across R&D, manufacturing, and QA.</p>
                    <div className="timelineHighlight">Key Achievement: Delivered enterprise QMS system on time, on budget, zero audit findings.</div>
                  </div>
                </div>

                <div className="timelineItem">
                  <div className="timelineYear">2018-2022</div>
                  <div className="timelineContent">
                    <div className="timelineTitle">Senior TPM - Cloud Transformation Lead</div>
                    <p>Led enterprise migration to AWS. Built validated cloud platform supporting 100+ applications. 
                    Transformed validation approach from 6-month cycles to 4-6 weeks. Enabled innovation while maintaining compliance.</p>
                    <div className="timelineHighlight">Key Achievement: $100M+ program value, $20M+ annual savings, 100K+ users migrated.</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Why Life Sciences?</h2>
              <p>
                Life Sciences IT is unique. The stakes are higher. Your systems directly impact:
              </p>
              <div className="impactGrid">
                <div className="impactCard">
                  <div className="impactIcon">💊</div>
                  <div className="impactTitle">Patient Safety</div>
                  <p>Manufacturing systems control critical quality parameters. A bug could affect drug safety.</p>
                </div>
                <div className="impactCard">
                  <div className="impactIcon">🔬</div>
                  <div className="impactTitle">Research Data Integrity</div>
                  <p>Clinical trial data must be accurate and complete. FDA decisions depend on it.</p>
                </div>
                <div className="impactCard">
                  <div className="impactIcon">📋</div>
                  <div className="impactTitle">Regulatory Compliance</div>
                  <p>Non-compliance = warning letters, consent decrees, production shutdowns.</p>
                </div>
                <div className="impactCard">
                  <div className="impactIcon">⚖️</div>
                  <div className="impactTitle">Legal/Ethical Responsibility</div>
                  <p>We''re entrusted with systems that affect human health. Can''t take shortcuts.</p>
                </div>
              </div>
              <p>
                This is why I love this industry. The work matters. Every system we build, every validation we complete, 
                contributes to medicines that save lives.
              </p>
            </section>

            <section className="section">
              <h2 className="h2">Domain Expertise</h2>

              <div className="expertiseGrid">
                <div className="expertiseArea">
                  <div className="expertiseTitle">Manufacturing & Production</div>
                  <ul>
                    <li>GMP / cGMP requirements for biologics and small molecules</li>
                    <li>Manufacturing Execution Systems (MES)</li>
                    <li>Batch records and electronic batch records (EBR)</li>
                    <li>Equipment qualification (IQ/OQ/PQ)</li>
                    <li>Deviation management and CAPA systems</li>
                  </ul>
                </div>

                <div className="expertiseArea">
                  <div className="expertiseTitle">Quality & Compliance</div>
                  <ul>
                    <li>Quality Management Systems (QMS)</li>
                    <li>Document management and change control</li>
                    <li>Audit trail and electronic signature requirements</li>
                    <li>Complaint handling and adverse event reporting</li>
                    <li>Regulatory inspection readiness</li>
                  </ul>
                </div>

                <div className="expertiseArea">
                  <div className="expertiseTitle">R&D / Clinical</div>
                  <ul>
                    <li>Laboratory Information Management Systems (LIMS)</li>
                    <li>Electronic Lab Notebooks (ELN)</li>
                    <li>Clinical trial data management</li>
                    <li>Electronic Data Capture (EDC)</li>
                    <li>Regulatory submissions (eCTD)</li>
                  </ul>
                </div>

                <div className="expertiseArea">
                  <div className="expertiseTitle">Supply Chain</div>
                  <ul>
                    <li>Track and trace / serialization</li>
                    <li>Cold chain monitoring</li>
                    <li>Warehouse management systems</li>
                    <li>GDP (Good Distribution Practice)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Regulatory Knowledge</h2>
              <div className="regulatoryGrid">
                <div className="regCard">
                  <div className="regTitle">FDA Regulations</div>
                  <ul>
                    <li>21 CFR Part 11 - Electronic Records/Signatures</li>
                    <li>21 CFR Part 210/211 - cGMP for Drugs</li>
                    <li>21 CFR Part 820 - QSR for Medical Devices</li>
                  </ul>
                </div>
                <div className="regCard">
                  <div className="regTitle">EU Regulations</div>
                  <ul>
                    <li>EU GMP Annex 11 - Computerised Systems</li>
                    <li>EU GMP Annex 1 - Sterile Manufacturing</li>
                    <li>EMA guidelines for clinical trials</li>
                  </ul>
                </div>
                <div className="regCard">
                  <div className="regTitle">Industry Standards</div>
                  <ul>
                    <li>GAMP 5 - Good Automated Manufacturing Practice</li>
                    <li>ICH guidelines (Q9 Quality Risk Management, etc.)</li>
                    <li>ISPE baseline guides</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">What I Bring to Your Team</h2>
              <div className="valueProps">
                <div className="valueProp">
                  <div className="vpIcon">🎯</div>
                  <div className="vpTitle">I speak both languages</div>
                  <p>Fluent in IT/cloud architecture AND GxP/regulatory requirements. Can translate between technical and compliance teams.</p>
                </div>
                <div className="valueProp">
                  <div className="vpIcon">⚡</div>
                  <div className="vpTitle">I move fast, safely</div>
                  <p>Validation doesn''t have to be slow. Risk-based approaches and automation enable rapid, compliant delivery.</p>
                </div>
                <div className="valueProp">
                  <div className="vpIcon">🤝</div>
                  <div className="vpTitle">I build bridges</div>
                  <p>Break down silos between dev, ops, QA, security. One team working toward shared goals.</p>
                </div>
                <div className="valueProp">
                  <div className="vpIcon">📊</div>
                  <div className="vpTitle">I deliver results</div>
                  <p>100+ systems delivered. Zero audit findings. $20M+ cost savings. Track record speaks for itself.</p>
                </div>
              </div>
            </section>

            <div className="docNav">
              <Link href="/life-sciences/evidence" className="navBtn">← Back to Evidence</Link>
              <Link href="/resume" className="navBtn">View Resume →</Link>
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
          .timeline { display: grid; gap: 32px; margin: 32px 0; }
          .timelineItem { display: grid; grid-template-columns: 150px 1fr; gap: 24px; }
          .timelineYear { font-size: 1.5rem; font-weight: 800; color: rgba(139,92,246,0.9); }
          .timelineContent { background: rgba(255,255,255,0.05); border-left: 4px solid rgba(139,92,246,0.6); padding: 24px; border-radius: 8px; }
          .timelineTitle { font-weight: 700; font-size: 1.2rem; margin-bottom: 12px; color: rgba(167,139,250,1); }
          .timelineHighlight { margin-top: 16px; padding: 16px; background: rgba(139,92,246,0.15); border-radius: 6px; font-style: italic; color: rgba(255,255,255,0.9); }
          .impactGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin: 32px 0; }
          .impactCard { background: rgba(239,68,68,0.1); border: 2px solid rgba(239,68,68,0.3); border-radius: 12px; padding: 24px; text-align: center; }
          .impactIcon { font-size: 3rem; margin-bottom: 12px; }
          .impactTitle { font-weight: 700; margin-bottom: 12px; color: rgba(248,113,113,1); }
          .expertiseGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin: 32px 0; }
          .expertiseArea { background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); border-radius: 12px; padding: 24px; }
          .expertiseTitle { font-weight: 700; font-size: 1.1rem; margin-bottom: 16px; color: rgba(96,165,250,1); }
          .regulatoryGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 24px 0; }
          .regCard { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 20px; }
          .regTitle { font-weight: 700; margin-bottom: 12px; color: rgba(255,255,255,0.95); }
          .valueProps { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin: 32px 0; }
          .valueProp { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px; padding: 24px; text-align: center; }
          .vpIcon { font-size: 3rem; margin-bottom: 12px; }
          .vpTitle { font-weight: 700; margin-bottom: 12px; color: rgba(74,222,128,1); }
          .docNav { display: flex; justify-content: space-between; margin-top: 64px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); }
          .navBtn { padding: 12px 24px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 600; }
          .navBtn:hover { background: rgba(139,92,246,0.2); border-color: rgba(139,92,246,0.4); }
          @media (max-width: 968px) {
            .timelineItem { grid-template-columns: 1fr; }
            .impactGrid, .expertiseGrid, .valueProps { grid-template-columns: 1fr; }
            .regulatoryGrid { grid-template-columns: 1fr; }
          }
        `}</style>
      </div>
    </>
  );
}
