import Head from "next/head";
import Link from "next/link";

export default function InspectionQAPage() {
  return (
    <>
      <Head>
        <title>Inspection Readiness Q&A | FDA Audit Preparation</title>
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
            <h1 className="h1">Inspection Readiness Q&A</h1>
            <p className="subtitle">Common FDA inspector questions about computerized systems and how to answer them confidently</p>

            <section className="section">
              <h2 className="h2">Validation Questions</h2>
              
              <div className="qa">
                <div className="question">Q: Can you show me your validation documentation for this system?</div>
                <div className="answer">
                  <strong>A:</strong> "Yes, here is our validation package:"
                  <ul>
                    <li><Link href="/life-sciences/docs/urs" className="docLink">User Requirements Specification (URS)</Link></li>
                    <li><Link href="/life-sciences/docs/functional-spec" className="docLink">Functional Specification (FS)</Link></li>
                    <li><Link href="/life-sciences/docs/traceability-matrix" className="docLink">Requirements Traceability Matrix (RTM)</Link></li>
                    <li><Link href="/life-sciences/docs/iq-oq-pq" className="docLink">IQ/OQ/PQ Test Results - 61 test cases, 100% pass rate</Link></li>
                  </ul>
                  <p>"The system was validated in January 2025 following GAMP 5 Category 4 approach. All critical requirements traced to test cases."</p>
                </div>
              </div>

              <div className="qa">
                <div className="question">Q: How do you know this system does what it''s supposed to do?</div>
                <div className="answer">
                  <strong>A:</strong> "We followed a risk-based validation approach:
                  <ul>
                    <li><strong>Requirements Definition:</strong> 33 user requirements defined in URS covering functional, security, and compliance needs</li>
                    <li><strong>Design Verification:</strong> Functional Specification documents how each requirement is implemented</li>
                    <li><strong>Testing:</strong> 61 test cases executed (IQ/OQ/PQ) with 100% pass rate</li>
                    <li><strong>Traceability:</strong> Complete bidirectional mapping: requirement → design → test case</li>
                  </ul>
                  <p>We can demonstrate the system performs its intended functions consistently and produces accurate results."</p>
                </div>
              </div>

              <div className="qa">
                <div className="question">Q: What happens when you make changes to this system?</div>
                <div className="answer">
                  <strong>A:</strong> "We have a documented change control process:
                  <ol>
                    <li>Change request submitted with business justification</li>
                    <li>Impact assessment: does this affect validated functionality?</li>
                    <li>Risk-based decision on testing scope (full re-validation vs. targeted tests)</li>
                    <li>Testing executed and documented</li>
                    <li>Change control record closed with QA approval</li>
                  </ol>
                  <p>High-risk changes (e.g., audit trail modifications) trigger full re-testing. Low-risk changes (e.g., UI text) require only change documentation."</p>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">21 CFR Part 11 Questions</h2>

              <div className="qa">
                <div className="question">Q: How does this system comply with 21 CFR Part 11?</div>
                <div className="answer">
                  <strong>A:</strong> "The VDC system implements Part 11 requirements as follows:"
                  <div className="complianceList">
                    <div className="compItem">
                      <strong>§11.10(a) Validation:</strong> Full IQ/OQ/PQ documented
                    </div>
                    <div className="compItem">
                      <strong>§11.10(e) Audit Trail:</strong> Immutable DynamoDB table captures all user actions with timestamp, user ID, action, outcome
                    </div>
                    <div className="compItem">
                      <strong>§11.10(g) Authority Checks:</strong> Cognito RBAC enforces Submitter/Approver roles
                    </div>
                    <div className="compItem">
                      <strong>§11.10(h) Device Checks:</strong> MFA (TOTP) required for all sessions
                    </div>
                    <div className="compItem">
                      <strong>§11.50 Signature Manifestations:</strong> Approval records include signer name, timestamp, and action meaning
                    </div>
                  </div>
                  <p>"See our <Link href="/life-sciences/docs/21-cfr-practice" className="docLink">21 CFR Part 11 compliance mapping</Link> for details."</p>
                </div>
              </div>

              <div className="qa">
                <div className="question">Q: Show me your audit trail.</div>
                <div className="answer">
                  <strong>A:</strong> [Navigate to document detail page, click "View Audit Trail"]
                  <p>"Here''s the complete audit history for this document. You can see:</p>
                  <ul>
                    <li>SUBMIT action by submitter1@example.com on Jan 7, 2025 at 14:23:18 UTC</li>
                    <li>APPROVE action by approver1@example.com on Jan 7, 2025 at 15:45:22 UTC</li>
                    <li>Each record includes user identity, timestamp, IP address, and action outcome</li>
                  </ul>
                  <p>The audit trail is stored in DynamoDB with IAM policies that prevent modification or deletion. We tested immutability in OQ-017."</p>
                </div>
              </div>

              <div className="qa">
                <div className="question">Q: Can users delete or modify audit records?</div>
                <div className="answer">
                  <strong>A:</strong> "No. The audit table has IAM policies that explicitly deny UpdateItem and DeleteItem operations. 
                  We validated this control in test case OQ-017 where we attempted to modify an audit record and confirmed it was blocked with AccessDenied error. 
                  Only PutItem (create new record) and Query (read records) are permitted."
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Data Integrity Questions</h2>

              <div className="qa">
                <div className="question">Q: How do you ensure data integrity?</div>
                <div className="answer">
                  <strong>A:</strong> "We follow ALCOA+ principles:"
                  <div className="alcoaList">
                    <div className="alcoaItem">
                      <strong>Attributable:</strong> Every action linked to authenticated Cognito user (email + sub)
                    </div>
                    <div className="alcoaItem">
                      <strong>Legible:</strong> All records in UTF-8 JSON format, human-readable
                    </div>
                    <div className="alcoaItem">
                      <strong>Contemporaneous:</strong> Timestamps generated at action time (ISO 8601 UTC)
                    </div>
                    <div className="alcoaItem">
                      <strong>Original:</strong> S3 versioning preserves original uploads
                    </div>
                    <div className="alcoaItem">
                      <strong>Accurate:</strong> SHA-256 hash verification prevents tampering
                    </div>
                  </div>
                  <p>"Each principle was tested in PQ-020 through PQ-024 with 100% pass rate."</p>
                </div>
              </div>

              <div className="qa">
                <div className="question">Q: How do you prevent unauthorized data modification?</div>
                <div className="answer">
                  <strong>A:</strong> "Multiple layers of control:"
                  <ul>
                    <li><strong>Authentication:</strong> Cognito MFA required for all sessions (no shared accounts)</li>
                    <li><strong>Authorization:</strong> Role-based access control (Submitters can''t approve; Approvers can''t approve their own documents)</li>
                    <li><strong>Data Integrity:</strong> SHA-256 hash calculated on upload and verified on download - modified files are rejected</li>
                    <li><strong>Audit Trail:</strong> Immutable record of all actions</li>
                    <li><strong>AWS IAM:</strong> Least privilege - Lambda functions can only access specific resources</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Cloud-Specific Questions</h2>

              <div className="qa">
                <div className="question">Q: Why did you choose cloud? Isn''t on-premise more secure?</div>
                <div className="answer">
                  <strong>A:</strong> "We chose AWS for several validated advantages:"
                  <ul>
                    <li><strong>Security:</strong> AWS has SOC 2 Type II, ISO 27001, and HIPAA certifications - enterprise-grade physical and network security</li>
                    <li><strong>Availability:</strong> 99.9%+ SLA with multi-AZ redundancy</li>
                    <li><strong>Scalability:</strong> Serverless architecture scales automatically</li>
                    <li><strong>Cost:</strong> Pay-per-use vs. maintaining dedicated infrastructure</li>
                    <li><strong>Validation:</strong> AWS services are GAMP Category 3/4 COTS - supplier-qualified, reduces validation burden</li>
                  </ul>
                  <p>"Major pharma companies (Moderna, Pfizer, AstraZeneca) run GxP workloads on AWS. It''s a mature, validated platform."</p>
                </div>
              </div>

              <div className="qa">
                <div className="question">Q: What if AWS makes changes to their services?</div>
                <div className="answer">
                  <strong>A:</strong> "AWS manages backward compatibility and provides advance notice of breaking changes. 
                  We monitor the AWS Health Dashboard for service updates. Most updates are transparent (e.g., performance improvements). 
                  If AWS announces a major change affecting our system, we perform an impact assessment and re-validate as needed. 
                  This is documented in our change control SOP."
                </div>
              </div>

              <div className="qa">
                <div className="question">Q: How do you qualify AWS as a vendor?</div>
                <div className="answer">
                  <strong>A:</strong> "We performed supplier qualification:"
                  <ul>
                    <li>Downloaded and reviewed AWS SOC 2 Type II reports from AWS Artifact</li>
                    <li>Verified ISO 27001, ISO 27017, ISO 27018 certifications</li>
                    <li>Confirmed HIPAA BAA availability</li>
                    <li>Reviewed AWS Life Sciences compliance program</li>
                    <li>Verified services are Generally Available (not beta/preview)</li>
                    <li>Documented in vendor qualification file with annual review schedule</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">System Access Questions</h2>

              <div className="qa">
                <div className="question">Q: Who has access to this system?</div>
                <div className="answer">
                  <strong>A:</strong> "Access is controlled through Amazon Cognito user pools:"
                  <ul>
                    <li><strong>Submitters:</strong> Can upload documents, view own submissions</li>
                    <li><strong>Approvers:</strong> Can view pending approvals, approve/reject documents</li>
                    <li><strong>Administrators:</strong> Can manage user accounts via Cognito console (limited to IT admin)</li>
                  </ul>
                  <p>"User provisioning follows our Access Control SOP. All users require MFA. We maintain a user access matrix reviewed quarterly."</p>
                </div>
              </div>

              <div className="qa">
                <div className="question">Q: Can someone approve their own document?</div>
                <div className="answer">
                  <strong>A:</strong> "No. This is prevented by application logic in the approval Lambda function. 
                  When a user attempts to approve a document, the system checks if submittedBy equals currentUser. 
                  If true, the approval is blocked with an error message. We tested this control in OQ-004 and PQ-014."
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Best Practices for Inspections</h2>
              <div className="tipsGrid">
                <div className="tip">
                  <div className="tipIcon">📁</div>
                  <div className="tipTitle">Have docs ready</div>
                  <p>URS, FS, RTM, IQ/OQ/PQ in a single folder, printed if requested</p>
                </div>
                <div className="tip">
                  <div className="tipIcon">💻</div>
                  <div className="tipTitle">Demo prepared</div>
                  <p>Pre-load test accounts, know how to navigate quickly</p>
                </div>
                <div className="tip">
                  <div className="tipIcon">🎯</div>
                  <div className="tipTitle">Answer directly</div>
                  <p>Be confident, be honest. "I don''t know but I''ll find out" is acceptable</p>
                </div>
                <div className="tip">
                  <div className="tipIcon">📋</div>
                  <div className="tipTitle">Show traceability</div>
                  <p>Demonstrate requirement → design → test mapping live</p>
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
          .homeLink, .backLink, .docLink { color: rgba(255,255,255,0.9); text-decoration: none; }
          .homeLink:hover, .backLink:hover, .docLink:hover { color: rgba(139,92,246,0.9); }
          .sep { color: rgba(255,255,255,0.3); }
          .mainContent { padding: 60px 0 100px; }
          .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
          .h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 16px; color: #fff; }
          .subtitle { font-size: 1.15rem; color: rgba(255,255,255,0.75); margin-bottom: 48px; }
          .section { margin-bottom: 56px; }
          .h2 { font-size: 1.8rem; font-weight: 700; margin-bottom: 32px; color: #fff; border-bottom: 2px solid rgba(139,92,246,0.3); padding-bottom: 12px; }
          p { line-height: 1.7; margin-bottom: 16px; color: rgba(255,255,255,0.85); }
          ul, ol { margin: 16px 0; padding-left: 28px; }
          li { margin-bottom: 12px; line-height: 1.7; color: rgba(255,255,255,0.85); }
          .qa { background: rgba(255,255,255,0.05); border-left: 4px solid rgba(59,130,246,0.6); padding: 24px; margin-bottom: 24px; border-radius: 8px; }
          .question { font-weight: 700; font-size: 1.1rem; margin-bottom: 16px; color: rgba(96,165,250,1); }
          .answer { color: rgba(255,255,255,0.85); line-height: 1.7; }
          .complianceList, .alcoaList { margin: 16px 0; }
          .compItem, .alcoaItem { padding: 12px; margin-bottom: 8px; background: rgba(0,0,0,0.2); border-radius: 6px; }
          .tipsGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 32px 0; }
          .tip { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px; padding: 24px; text-align: center; }
          .tipIcon { font-size: 2.5rem; margin-bottom: 12px; }
          .tipTitle { font-weight: 700; margin-bottom: 8px; color: rgba(74,222,128,1); }
          .docNav { display: flex; justify-content: space-between; margin-top: 64px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); }
          .navBtn { padding: 12px 24px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 600; }
          .navBtn:hover { background: rgba(139,92,246,0.2); border-color: rgba(139,92,246,0.4); }
          @media (max-width: 968px) { .tipsGrid { grid-template-columns: 1fr; } }
        `}</style>
      </div>
    </>
  );
}
