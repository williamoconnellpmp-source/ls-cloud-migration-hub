import Head from "next/head";
import Link from "next/link";

export default function URSPage() {
  return (
    <>
      <Head>
        <title>URS - User Requirements Specification | VDC System</title>
        <meta name="description" content="User Requirements Specification for Validated Document Control system"/>
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
            <div className="docHeader">
              <h1 className="h1">User Requirements Specification</h1>
              <div className="docMeta">
                <span className="metaItem"><strong>Document ID:</strong> VDC-URS-001</span>
                <span className="metaItem"><strong>Version:</strong> 1.0</span>
                <span className="metaItem"><strong>Date:</strong> January 2025</span>
                <span className="metaItem"><strong>Status:</strong> Approved</span>
              </div>
            </div>

            <section className="section">
              <h2 className="h2">1. Introduction</h2>
              
              <h3 className="h3">1.1 Purpose</h3>
              <p>This User Requirements Specification (URS) defines the functional and non-functional requirements for a Validated Document Control (VDC) system designed to manage controlled documents in a regulated Life Sciences environment with full compliance to GxP, 21 CFR Part 11, and CSV requirements.</p>

              <h3 className="h3">1.2 Scope</h3>
              <p>This VDC system provides:</p>
              <ul>
                <li>Secure document submission and storage with version control</li>
                <li>Role-based access control (Submitter, Approver roles)</li>
                <li>Electronic approval workflow with audit trail</li>
                <li>Immutable audit logging of all system actions</li>
                <li>Data integrity controls aligned to ALCOA+ principles</li>
                <li>MFA-enforced authentication via Amazon Cognito</li>
              </ul>

              <h3 className="h3">1.3 Regulatory Context</h3>
              <p>The system must comply with:</p>
              <ul>
                <li><strong>21 CFR Part 11:</strong> Electronic Records; Electronic Signatures</li>
                <li><strong>GxP:</strong> Good Practice quality guidelines</li>
                <li><strong>EU Annex 11:</strong> Computerised Systems (where applicable)</li>
                <li><strong>GAMP 5:</strong> Risk-based approach to compliant GxP computerized systems</li>
              </ul>
            </section>

            <section className="section">
              <h2 className="h2">2. User Requirements</h2>

              <h3 className="h3">2.1 Document Submission Requirements</h3>
              <div className="reqTable">
                <div className="reqRow reqHeader">
                  <div className="reqId">Req ID</div>
                  <div className="reqDesc">Requirement</div>
                  <div className="reqPriority">Priority</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-001</div>
                  <div className="reqDesc">The system SHALL allow authorized Submitters to upload documents for approval</div>
                  <div className="reqPriority">Critical</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-002</div>
                  <div className="reqDesc">The system SHALL generate a unique document ID for each uploaded document</div>
                  <div className="reqPriority">Critical</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-003</div>
                  <div className="reqDesc">The system SHALL calculate and store SHA-256 hash for document integrity verification</div>
                  <div className="reqPriority">Critical</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-004</div>
                  <div className="reqDesc">The system SHALL record submission timestamp in ISO 8601 format (UTC)</div>
                  <div className="reqPriority">Critical</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-005</div>
                  <div className="reqDesc">The system SHALL store documents in encrypted storage (S3 with SSE)</div>
                  <div className="reqPriority">Critical</div>
                </div>
              </div>

              <h3 className="h3">2.2 Approval Workflow Requirements</h3>
              <div className="reqTable">
                <div className="reqRow reqHeader">
                  <div className="reqId">Req ID</div>
                  <div className="reqDesc">Requirement</div>
                  <div className="reqPriority">Priority</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-010</div>
                  <div className="reqDesc">The system SHALL allow authorized Approvers to view pending approval requests</div>
                  <div className="reqPriority">Critical</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-011</div>
                  <div className="reqDesc">The system SHALL display document metadata (ID, filename, submitter, date, hash)</div>
                  <div className="reqPriority">Critical</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-012</div>
                  <div className="reqDesc">The system SHALL allow Approvers to download and review documents before decision</div>
                  <div className="reqPriority">Critical</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-013</div>
                  <div className="reqDesc">The system SHALL provide Approve and Reject actions for each pending document</div>
                  <div className="reqPriority">Critical</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-014</div>
                  <div className="reqDesc">The system SHALL require MFA-authenticated session for approval actions</div>
                  <div className="reqPriority">Critical</div>
                </div>
              </div>

              <h3 className="h3">2.3 Security & Access Control Requirements</h3>
              <div className="reqTable">
                <div className="reqRow reqHeader">
                  <div className="reqId">Req ID</div>
                  <div className="reqDesc">Requirement</div>
                  <div className="reqPriority">Priority</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-020</div>
                  <div className="reqDesc">The system SHALL authenticate users via Amazon Cognito with MFA enforcement</div>
                  <div className="reqPriority">Critical</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-021</div>
                  <div className="reqDesc">The system SHALL enforce role-based access control (Submitter, Approver)</div>
                  <div className="reqPriority">Critical</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-022</div>
                  <div className="reqDesc">The system SHALL prevent Submitters from approving their own documents</div>
                  <div className="reqPriority">Critical</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-023</div>
                  <div className="reqDesc">The system SHALL encrypt data in transit (TLS 1.2+) and at rest (AES-256)</div>
                  <div className="reqPriority">Critical</div>
                </div>
              </div>

              <h3 className="h3">2.4 Audit Trail Requirements (21 CFR Part 11)</h3>
              <div className="reqTable">
                <div className="reqRow reqHeader">
                  <div className="reqId">Req ID</div>
                  <div className="reqDesc">Requirement</div>
                  <div className="reqPriority">Priority</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-030</div>
                  <div className="reqDesc">The system SHALL create audit records for all document submissions</div>
                  <div className="reqPriority">Critical</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-031</div>
                  <div className="reqDesc">The system SHALL create audit records for all approval/rejection actions</div>
                  <div className="reqPriority">Critical</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-032</div>
                  <div className="reqDesc">Audit records SHALL include: user ID, action, timestamp, outcome, document ID</div>
                  <div className="reqPriority">Critical</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-033</div>
                  <div className="reqDesc">Audit records SHALL be immutable (stored in DynamoDB with no delete permissions)</div>
                  <div className="reqPriority">Critical</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-034</div>
                  <div className="reqDesc">The system SHALL provide audit trail retrieval capability for inspection</div>
                  <div className="reqPriority">Critical</div>
                </div>
              </div>

              <h3 className="h3">2.5 Data Integrity Requirements (ALCOA+)</h3>
              <div className="reqTable">
                <div className="reqRow reqHeader">
                  <div className="reqId">Req ID</div>
                  <div className="reqDesc">Requirement</div>
                  <div className="reqPriority">Priority</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-040</div>
                  <div className="reqDesc"><strong>Attributable:</strong> All actions SHALL be linked to authenticated user identity</div>
                  <div className="reqPriority">Critical</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-041</div>
                  <div className="reqDesc"><strong>Legible:</strong> All records SHALL be human-readable and stored in UTF-8</div>
                  <div className="reqPriority">Critical</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-042</div>
                  <div className="reqDesc"><strong>Contemporaneous:</strong> Timestamps SHALL be recorded at time of action</div>
                  <div className="reqPriority">Critical</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-043</div>
                  <div className="reqDesc"><strong>Original:</strong> Documents SHALL be stored in original uploaded format</div>
                  <div className="reqPriority">Critical</div>
                </div>
                <div className="reqRow">
                  <div className="reqId">URS-044</div>
                  <div className="reqDesc"><strong>Accurate:</strong> SHA-256 hashes SHALL verify document integrity</div>
                  <div className="reqPriority">Critical</div>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">3. Non-Functional Requirements</h2>

              <h3 className="h3">3.1 Performance</h3>
              <ul>
                <li><strong>URS-050:</strong> Document upload SHALL complete within 30 seconds for files up to 10MB</li>
                <li><strong>URS-051:</strong> Approval list page SHALL load within 3 seconds</li>
                <li><strong>URS-052:</strong> System SHALL support 100 concurrent users</li>
              </ul>

              <h3 className="h3">3.2 Availability</h3>
              <ul>
                <li><strong>URS-060:</strong> System SHALL maintain 99.5% uptime during business hours</li>
                <li><strong>URS-061:</strong> System SHALL provide graceful error messages for failures</li>
              </ul>

              <h3 className="h3">3.3 Backup & Recovery</h3>
              <ul>
                <li><strong>URS-070:</strong> Document storage SHALL be backed up daily with 30-day retention</li>
                <li><strong>URS-071:</strong> Audit logs SHALL be retained for minimum 7 years</li>
              </ul>
            </section>

            <section className="section">
              <h2 className="h2">4. System Architecture</h2>
              <p>The VDC system is built on AWS serverless architecture:</p>
              <ul>
                <li><strong>Frontend:</strong> Next.js static site hosted on S3 + CloudFront</li>
                <li><strong>Authentication:</strong> Amazon Cognito with MFA enforcement</li>
                <li><strong>API:</strong> API Gateway HTTP APIs + AWS Lambda functions</li>
                <li><strong>Storage:</strong> Amazon S3 (documents), DynamoDB (metadata + audit)</li>
                <li><strong>Monitoring:</strong> CloudWatch Logs + CloudWatch Alarms</li>
              </ul>
            </section>

            <section className="section">
              <h2 className="h2">5. Traceability</h2>
              <p>All requirements in this URS are traced to:</p>
              <ul>
                <li><strong>Functional Specification:</strong> Design specifications implementing each requirement</li>
                <li><strong>Test Cases:</strong> IQ/OQ/PQ test protocols validating each requirement</li>
                <li><strong>Traceability Matrix:</strong> Complete bidirectional mapping (requirement ↔ test)</li>
              </ul>
              <p>See: <Link href="/life-sciences/docs/traceability-matrix" className="inlineLink">Requirements Traceability Matrix</Link></p>
            </section>

            <section className="section">
              <h2 className="h2">6. Approval</h2>
              <div className="approvalTable">
                <div className="approvalRow">
                  <div className="approvalRole">Quality Assurance</div>
                  <div className="approvalName">William O''Connell</div>
                  <div className="approvalDate">January 2025</div>
                </div>
                <div className="approvalRow">
                  <div className="approvalRole">System Owner</div>
                  <div className="approvalName">William O''Connell</div>
                  <div className="approvalDate">January 2025</div>
                </div>
              </div>
            </section>

            <div className="docNav">
              <Link href="/life-sciences/evidence" className="navBtn">← Back to Evidence</Link>
              <Link href="/life-sciences/docs/functional-spec" className="navBtn">Next: Functional Spec →</Link>
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
          .docHeader { margin-bottom: 48px; }
          .h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 20px; color: #fff; }
          .docMeta { display: flex; gap: 24px; flex-wrap: wrap; font-size: 0.9rem; color: rgba(255,255,255,0.7); }
          .metaItem { padding: 8px 16px; background: rgba(255,255,255,0.05); border-radius: 6px; }
          .section { margin-bottom: 48px; }
          .h2 { font-size: 1.8rem; font-weight: 700; margin-bottom: 24px; color: #fff; border-bottom: 2px solid rgba(139,92,246,0.3); padding-bottom: 12px; }
          .h3 { font-size: 1.3rem; font-weight: 600; margin: 32px 0 16px; color: rgba(255,255,255,0.95); }
          p { line-height: 1.7; margin-bottom: 16px; color: rgba(255,255,255,0.85); }
          ul { margin: 16px 0; padding-left: 24px; }
          li { margin-bottom: 12px; line-height: 1.7; color: rgba(255,255,255,0.85); }
          .reqTable { margin: 24px 0; }
          .reqRow { display: grid; grid-template-columns: 120px 1fr 100px; gap: 16px; padding: 12px 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.1); }
          .reqHeader { background: rgba(59,130,246,0.15); font-weight: 700; color: #fff; }
          .reqId { font-family: monospace; color: rgba(139,92,246,0.9); }
          .reqDesc { color: rgba(255,255,255,0.85); }
          .reqPriority { text-align: center; font-weight: 600; color: rgba(239,68,68,0.9); }
          .inlineLink { color: rgba(139,92,246,0.9); text-decoration: underline; }
          .inlineLink:hover { color: rgba(167,139,250,0.9); }
          .approvalTable { margin: 24px 0; }
          .approvalRow { display: grid; grid-template-columns: 200px 1fr 150px; gap: 16px; padding: 12px 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.1); }
          .approvalRole { font-weight: 600; color: rgba(255,255,255,0.9); }
          .approvalName { color: rgba(255,255,255,0.85); }
          .approvalDate { color: rgba(255,255,255,0.7); }
          .docNav { display: flex; justify-content: space-between; margin-top: 64px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); }
          .navBtn { padding: 12px 24px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 600; }
          .navBtn:hover { background: rgba(139,92,246,0.2); border-color: rgba(139,92,246,0.4); }
          @media (max-width: 768px) {
            .reqRow { grid-template-columns: 1fr; }
            .approvalRow { grid-template-columns: 1fr; }
            .docNav { flex-direction: column; gap: 12px; }
          }
        `}</style>
      </div>
    </>
  );
}
