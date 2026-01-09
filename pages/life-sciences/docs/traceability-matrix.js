import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function TraceabilityMatrixPage() {
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const traceabilityData = [
    // Document Submission Requirements
    { reqId: "URS-001", category: "Submission", requirement: "Allow authorized Submitters to upload documents", fsSection: "3.2, 4.1 (upload-init)", testCase: "PQ-001, PQ-002", status: "Verified", priority: "Critical" },
    { reqId: "URS-002", category: "Submission", requirement: "Generate unique document ID for each upload", fsSection: "4.1 (submit), 5.1", testCase: "OQ-010, PQ-003", status: "Verified", priority: "Critical" },
    { reqId: "URS-003", category: "Submission", requirement: "Calculate and store SHA-256 hash for integrity", fsSection: "4.1 (submit), 7.3", testCase: "OQ-011, PQ-015", status: "Verified", priority: "Critical" },
    { reqId: "URS-004", category: "Submission", requirement: "Record submission timestamp in ISO 8601 (UTC)", fsSection: "4.1 (submit), 5.1", testCase: "OQ-012, PQ-004", status: "Verified", priority: "Critical" },
    { reqId: "URS-005", category: "Submission", requirement: "Store documents in encrypted storage (S3 SSE)", fsSection: "2.2, 5.3, 6.1", testCase: "IQ-005, OQ-020", status: "Verified", priority: "Critical" },
    
    // Approval Workflow Requirements
    { reqId: "URS-010", category: "Approval", requirement: "Allow Approvers to view pending approval requests", fsSection: "3.2, 4.1 (approvals-pending)", testCase: "PQ-005, PQ-006", status: "Verified", priority: "Critical" },
    { reqId: "URS-011", category: "Approval", requirement: "Display document metadata (ID, filename, submitter, date, hash)", fsSection: "4.1 (documents-list), 5.1", testCase: "OQ-013, PQ-007", status: "Verified", priority: "Critical" },
    { reqId: "URS-012", category: "Approval", requirement: "Allow Approvers to download and review documents", fsSection: "4.1 (download)", testCase: "PQ-008, PQ-009", status: "Verified", priority: "Critical" },
    { reqId: "URS-013", category: "Approval", requirement: "Provide Approve and Reject actions", fsSection: "4.1 (approve, reject)", testCase: "PQ-010, PQ-011", status: "Verified", priority: "Critical" },
    { reqId: "URS-014", category: "Approval", requirement: "Require MFA-authenticated session for approval", fsSection: "3.3, 4.2", testCase: "OQ-002, PQ-012", status: "Verified", priority: "Critical" },
    
    // Security & Access Control Requirements
    { reqId: "URS-020", category: "Security", requirement: "Authenticate users via Cognito with MFA", fsSection: "2.2, 3.3", testCase: "IQ-002, OQ-001, OQ-002", status: "Verified", priority: "Critical" },
    { reqId: "URS-021", category: "Security", requirement: "Enforce role-based access control (Submitter, Approver)", fsSection: "4.2, 6.2", testCase: "OQ-003, PQ-013, PQ-014", status: "Verified", priority: "Critical" },
    { reqId: "URS-022", category: "Security", requirement: "Prevent Submitters from approving own documents", fsSection: "6.2", testCase: "OQ-004, PQ-014", status: "Verified", priority: "Critical" },
    { reqId: "URS-023", category: "Security", requirement: "Encrypt data in transit (TLS 1.2+) and at rest (AES-256)", fsSection: "2.2, 6.1", testCase: "IQ-003, IQ-005, OQ-020", status: "Verified", priority: "Critical" },
    
    // Audit Trail Requirements
    { reqId: "URS-030", category: "Audit", requirement: "Create audit records for all document submissions", fsSection: "7.1, 7.2", testCase: "OQ-014, PQ-016", status: "Verified", priority: "Critical" },
    { reqId: "URS-031", category: "Audit", requirement: "Create audit records for approval/rejection actions", fsSection: "7.1, 7.2", testCase: "OQ-015, PQ-017", status: "Verified", priority: "Critical" },
    { reqId: "URS-032", category: "Audit", requirement: "Audit records include: user, action, timestamp, outcome, docID", fsSection: "5.2, 7.1", testCase: "OQ-016, PQ-018", status: "Verified", priority: "Critical" },
    { reqId: "URS-033", category: "Audit", requirement: "Audit records are immutable (no delete/update)", fsSection: "5.2, 6.3, 7.1", testCase: "IQ-006, OQ-017", status: "Verified", priority: "Critical" },
    { reqId: "URS-034", category: "Audit", requirement: "Provide audit trail retrieval for inspection", fsSection: "4.1 (document-audit), 7.2", testCase: "OQ-018, PQ-019", status: "Verified", priority: "Critical" },
    
    // Data Integrity Requirements (ALCOA+)
    { reqId: "URS-040", category: "Data Integrity", requirement: "Attributable: Actions linked to authenticated user", fsSection: "3.3, 7.1, 7.3", testCase: "OQ-019, PQ-020", status: "Verified", priority: "Critical" },
    { reqId: "URS-041", category: "Data Integrity", requirement: "Legible: Records human-readable in UTF-8", fsSection: "5.1, 5.2, 7.3", testCase: "OQ-021, PQ-021", status: "Verified", priority: "Critical" },
    { reqId: "URS-042", category: "Data Integrity", requirement: "Contemporaneous: Timestamps at time of action", fsSection: "5.1, 5.2, 7.3", testCase: "OQ-012, PQ-022", status: "Verified", priority: "Critical" },
    { reqId: "URS-043", category: "Data Integrity", requirement: "Original: Documents stored in original format", fsSection: "5.3, 7.3", testCase: "OQ-022, PQ-023", status: "Verified", priority: "Critical" },
    { reqId: "URS-044", category: "Data Integrity", requirement: "Accurate: SHA-256 hashes verify integrity", fsSection: "4.1, 7.3", testCase: "OQ-011, PQ-015, PQ-024", status: "Verified", priority: "Critical" },
    
    // Performance Requirements
    { reqId: "URS-050", category: "Performance", requirement: "Document upload completes within 30s for 10MB files", fsSection: "Section 9", testCase: "PQ-030", status: "Verified", priority: "High" },
    { reqId: "URS-051", category: "Performance", requirement: "Approval list loads within 3 seconds", fsSection: "Section 9", testCase: "PQ-031", status: "Verified", priority: "High" },
    { reqId: "URS-052", category: "Performance", requirement: "Support 100 concurrent users", fsSection: "Section 9", testCase: "PQ-032", status: "Verified", priority: "High" },
    
    // Availability Requirements
    { reqId: "URS-060", category: "Availability", requirement: "Maintain 99.5% uptime during business hours", fsSection: "Section 9", testCase: "PQ-040", status: "Verified", priority: "High" },
    { reqId: "URS-061", category: "Availability", requirement: "Provide graceful error messages for failures", fsSection: "4.3", testCase: "OQ-030, PQ-041", status: "Verified", priority: "Medium" },
    
    // Backup & Recovery Requirements
    { reqId: "URS-070", category: "Backup", requirement: "Daily backups with 30-day retention", fsSection: "Section 8", testCase: "IQ-010, OQ-040", status: "Verified", priority: "High" },
    { reqId: "URS-071", category: "Backup", requirement: "Audit logs retained for minimum 7 years", fsSection: "Section 9", testCase: "IQ-011, OQ-041", status: "Verified", priority: "Critical" }
  ];

  const filteredData = traceabilityData.filter(item => {
    const categoryMatch = filterCategory === "all" || item.category === filterCategory;
    const statusMatch = filterStatus === "all" || item.status === filterStatus;
    return categoryMatch && statusMatch;
  });

  const categories = ["all", ...new Set(traceabilityData.map(item => item.category))];
  const statuses = ["all", ...new Set(traceabilityData.map(item => item.status))];

  const stats = {
    total: traceabilityData.length,
    verified: traceabilityData.filter(item => item.status === "Verified").length,
    critical: traceabilityData.filter(item => item.priority === "Critical").length,
    coverage: Math.round((traceabilityData.filter(item => item.status === "Verified").length / traceabilityData.length) * 100)
  };

  return (
    <>
      <Head>
        <title>Requirements Traceability Matrix | VDC System</title>
        <meta name="description" content="Complete bidirectional traceability from URS to FS to Test Cases"/>
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
              <h1 className="h1">Requirements Traceability Matrix</h1>
              <div className="docMeta">
                <span className="metaItem"><strong>Document ID:</strong> VDC-RTM-001</span>
                <span className="metaItem"><strong>Version:</strong> 1.0</span>
                <span className="metaItem"><strong>Date:</strong> January 2025</span>
                <span className="metaItem"><strong>Status:</strong> Approved</span>
              </div>
            </div>

            <section className="section">
              <h2 className="h2">1. Purpose</h2>
              <p>
                This Requirements Traceability Matrix (RTM) provides complete bidirectional traceability between:
              </p>
              <ul>
                <li><strong>User Requirements (URS)</strong> → Business and regulatory needs</li>
                <li><strong>Functional Specification (FS)</strong> → Technical design and implementation</li>
                <li><strong>Test Cases (IQ/OQ/PQ)</strong> → Verification and validation evidence</li>
              </ul>
              <p>
                The RTM ensures every requirement is implemented, tested, and validated, demonstrating compliance with GxP, CSV, and 21 CFR Part 11.
              </p>
            </section>

            <section className="section">
              <h2 className="h2">2. Traceability Summary</h2>
              <div className="statsGrid">
                <div className="statCard">
                  <div className="statValue">{stats.total}</div>
                  <div className="statLabel">Total Requirements</div>
                </div>
                <div className="statCard">
                  <div className="statValue">{stats.verified}</div>
                  <div className="statLabel">Verified</div>
                </div>
                <div className="statCard">
                  <div className="statValue">{stats.critical}</div>
                  <div className="statLabel">Critical Priority</div>
                </div>
                <div className="statCard">
                  <div className="statValue">{stats.coverage}%</div>
                  <div className="statLabel">Test Coverage</div>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">3. Traceability Matrix</h2>
              
              <div className="filters">
                <div className="filterGroup">
                  <label className="filterLabel">Category:</label>
                  <select 
                    className="filterSelect" 
                    value={filterCategory} 
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat === "all" ? "All Categories" : cat}</option>
                    ))}
                  </select>
                </div>
                <div className="filterGroup">
                  <label className="filterLabel">Status:</label>
                  <select 
                    className="filterSelect" 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status === "all" ? "All Statuses" : status}</option>
                    ))}
                  </select>
                </div>
                <div className="filterInfo">
                  Showing {filteredData.length} of {stats.total} requirements
                </div>
              </div>

              <div className="tableWrapper">
                <table className="rtmTable">
                  <thead>
                    <tr>
                      <th>Req ID</th>
                      <th>Category</th>
                      <th>Requirement</th>
                      <th>FS Section</th>
                      <th>Test Case(s)</th>
                      <th>Status</th>
                      <th>Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr key={index} className={item.priority === "Critical" ? "criticalRow" : ""}>
                        <td className="reqIdCell">{item.reqId}</td>
                        <td className="categoryCell">
                          <span className={`categoryBadge ${item.category.toLowerCase()}`}>
                            {item.category}
                          </span>
                        </td>
                        <td className="reqCell">{item.requirement}</td>
                        <td className="fsCell">{item.fsSection}</td>
                        <td className="testCell">{item.testCase}</td>
                        <td className="statusCell">
                          <span className={`statusBadge ${item.status.toLowerCase()}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="priorityCell">
                          <span className={`priorityBadge ${item.priority.toLowerCase()}`}>
                            {item.priority}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">4. Test Case Reference</h2>
              <p>Complete test execution results are documented in <Link href="/life-sciences/docs/iq-oq-pq" className="inlineLink">IQ/OQ/PQ Results</Link>.</p>

              <h3 className="h3">4.1 Test Case Categories</h3>
              <div className="testCatTable">
                <div className="testCatRow testCatHeader">
                  <div className="testCatCol">Test Type</div>
                  <div className="testCatCol">Prefix</div>
                  <div className="testCatCol">Purpose</div>
                  <div className="testCatCol">Examples</div>
                </div>
                <div className="testCatRow">
                  <div className="testCatCol"><strong>Installation Qualification</strong></div>
                  <div className="testCatCol">IQ-###</div>
                  <div className="testCatCol">Verify AWS resources deployed correctly</div>
                  <div className="testCatCol">IQ-002 (Cognito), IQ-005 (S3 encryption)</div>
                </div>
                <div className="testCatRow">
                  <div className="testCatCol"><strong>Operational Qualification</strong></div>
                  <div className="testCatCol">OQ-###</div>
                  <div className="testCatCol">Test individual Lambda functions and APIs</div>
                  <div className="testCatCol">OQ-010 (submit), OQ-014 (audit logs)</div>
                </div>
                <div className="testCatRow">
                  <div className="testCatCol"><strong>Performance Qualification</strong></div>
                  <div className="testCatCol">PQ-###</div>
                  <div className="testCatCol">End-to-end workflow validation</div>
                  <div className="testCatCol">PQ-001 (upload), PQ-010 (approve)</div>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">5. Bidirectional Traceability</h2>
              
              <h3 className="h3">5.1 Forward Traceability</h3>
              <p><strong>URS → FS → Test Cases</strong></p>
              <p>Every user requirement traces forward through design to verification:</p>
              <div className="traceExample">
                <div className="traceStep">
                  <div className="traceLabel">URS-003</div>
                  <div className="traceArrow">→</div>
                  <div className="traceDesc">Calculate SHA-256 hash</div>
                </div>
                <div className="traceStep">
                  <div className="traceLabel">FS 4.1, 7.3</div>
                  <div className="traceArrow">→</div>
                  <div className="traceDesc">Submit Lambda calculates hash</div>
                </div>
                <div className="traceStep">
                  <div className="traceLabel">OQ-011, PQ-015</div>
                  <div className="traceArrow">→</div>
                  <div className="traceDesc">Tests verify hash calculation</div>
                </div>
              </div>

              <h3 className="h3">5.2 Backward Traceability</h3>
              <p><strong>Test Cases → FS → URS</strong></p>
              <p>Every test case traces backward to verify a specific requirement:</p>
              <div className="traceExample">
                <div className="traceStep">
                  <div className="traceLabel">PQ-012</div>
                  <div className="traceArrow">→</div>
                  <div className="traceDesc">Test MFA enforcement</div>
                </div>
                <div className="traceStep">
                  <div className="traceLabel">FS 3.3, 4.2</div>
                  <div className="traceArrow">→</div>
                  <div className="traceDesc">Cognito MFA + JWT validation</div>
                </div>
                <div className="traceStep">
                  <div className="traceLabel">URS-014</div>
                  <div className="traceArrow">→</div>
                  <div className="traceDesc">Require MFA for approvals</div>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">6. Gap Analysis</h2>
              <p>
                <strong>Result:</strong> 100% traceability achieved. All {stats.total} requirements have:
              </p>
              <ul>
                <li>✅ Functional design documented in FS</li>
                <li>✅ Test cases executed and verified</li>
                <li>✅ Evidence captured in IQ/OQ/PQ protocols</li>
              </ul>
              <p>No gaps or untested requirements identified.</p>
            </section>

            <section className="section">
              <h2 className="h2">7. Related Documents</h2>
              <ul>
                <li><Link href="/life-sciences/docs/urs" className="inlineLink">VDC-URS-001: User Requirements Specification</Link></li>
                <li><Link href="/life-sciences/docs/functional-spec" className="inlineLink">VDC-FS-001: Functional Specification</Link></li>
                <li><Link href="/life-sciences/docs/iq-oq-pq" className="inlineLink">IQ/OQ/PQ Results: Validation Test Execution</Link></li>
              </ul>
            </section>

            <section className="section">
              <h2 className="h2">8. Approval</h2>
              <div className="approvalTable">
                <div className="approvalRow">
                  <div className="approvalRole">Quality Assurance</div>
                  <div className="approvalName">William O''Connell</div>
                  <div className="approvalDate">January 2025</div>
                </div>
                <div className="approvalRow">
                  <div className="approvalRole">Validation Lead</div>
                  <div className="approvalName">William O''Connell</div>
                  <div className="approvalDate">January 2025</div>
                </div>
              </div>
            </section>

            <div className="docNav">
              <Link href="/life-sciences/docs/functional-spec" className="navBtn">← Previous: Functional Spec</Link>
              <Link href="/life-sciences/docs/iq-oq-pq" className="navBtn">Next: IQ/OQ/PQ Results →</Link>
            </div>
          </div>
        </main>

        <style jsx>{`
          .page { min-height: 100vh; background: #0a0f1e; color: rgba(255,255,255,0.92); }
          .topHeader { background: rgba(0,0,0,0.4); border-bottom: 1px solid rgba(255,255,255,0.1); padding: 14px 0; position: sticky; top: 0; z-index: 100; }
          .headerContainer { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; gap: 12px; align-items: center; font-size: 0.9rem; }
          .homeLink, .backLink { color: rgba(255,255,255,0.9); text-decoration: none; }
          .homeLink:hover, .backLink:hover { color: rgba(139,92,246,0.9); }
          .sep { color: rgba(255,255,255,0.3); }
          .mainContent { padding: 60px 0 100px; }
          .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
          .docHeader { margin-bottom: 48px; }
          .h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 20px; color: #fff; }
          .docMeta { display: flex; gap: 24px; flex-wrap: wrap; font-size: 0.9rem; color: rgba(255,255,255,0.7); }
          .metaItem { padding: 8px 16px; background: rgba(255,255,255,0.05); border-radius: 6px; }
          .section { margin-bottom: 48px; }
          .h2 { font-size: 1.8rem; font-weight: 700; margin-bottom: 24px; color: #fff; border-bottom: 2px solid rgba(139,92,246,0.3); padding-bottom: 12px; }
          .h3 { font-size: 1.3rem; font-weight: 600; margin: 32px 0 16px; color: rgba(255,255,255,0.95); }
          p { line-height: 1.7; margin-bottom: 16px; color: rgba(255,255,255,0.85); }
          ul { margin: 16px 0; padding-left: 28px; }
          li { margin-bottom: 12px; line-height: 1.7; color: rgba(255,255,255,0.85); }
          .inlineLink { color: rgba(139,92,246,0.9); text-decoration: underline; }
          .inlineLink:hover { color: rgba(167,139,250,0.9); }
          .statsGrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 24px 0; }
          .statCard { background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.3); border-radius: 12px; padding: 24px; text-align: center; }
          .statValue { font-size: 2.5rem; font-weight: 800; color: #fff; margin-bottom: 8px; }
          .statLabel { font-size: 0.9rem; color: rgba(255,255,255,0.75); }
          .filters { display: flex; gap: 20px; align-items: center; margin: 24px 0; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px; flex-wrap: wrap; }
          .filterGroup { display: flex; align-items: center; gap: 8px; }
          .filterLabel { font-size: 0.9rem; color: rgba(255,255,255,0.75); font-weight: 600; }
          .filterSelect { padding: 8px 12px; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: #fff; font-size: 0.9rem; cursor: pointer; }
          .filterInfo { margin-left: auto; font-size: 0.9rem; color: rgba(255,255,255,0.6); }
          .tableWrapper { overflow-x: auto; margin: 24px 0; }
          .rtmTable { width: 100%; border-collapse: collapse; background: rgba(0,0,0,0.3); border-radius: 8px; overflow: hidden; }
          .rtmTable thead { background: rgba(59,130,246,0.2); }
          .rtmTable th { padding: 12px 16px; text-align: left; font-weight: 700; font-size: 0.9rem; color: #fff; border-bottom: 2px solid rgba(255,255,255,0.1); }
          .rtmTable td { padding: 12px 16px; font-size: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.85); }
          .rtmTable tr:hover { background: rgba(255,255,255,0.03); }
          .criticalRow { background: rgba(239,68,68,0.05); }
          .reqIdCell { font-family: monospace; color: rgba(139,92,246,0.9); font-weight: 600; }
          .categoryBadge { padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; }
          .categoryBadge.submission { background: rgba(59,130,246,0.2); color: rgba(96,165,250,1); }
          .categoryBadge.approval { background: rgba(139,92,246,0.2); color: rgba(167,139,250,1); }
          .categoryBadge.security { background: rgba(239,68,68,0.2); color: rgba(248,113,113,1); }
          .categoryBadge.audit { background: rgba(34,197,94,0.2); color: rgba(74,222,128,1); }
          .categoryBadge.data { background: rgba(251,191,36,0.2); color: rgba(253,224,71,1); }
          .statusBadge { padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; }
          .statusBadge.verified { background: rgba(34,197,94,0.2); color: rgba(74,222,128,1); }
          .priorityBadge { padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; }
          .priorityBadge.critical { background: rgba(239,68,68,0.2); color: rgba(248,113,113,1); }
          .priorityBadge.high { background: rgba(251,191,36,0.2); color: rgba(253,224,71,1); }
          .priorityBadge.medium { background: rgba(59,130,246,0.2); color: rgba(96,165,250,1); }
          .testCatTable { margin: 24px 0; }
          .testCatRow { display: grid; grid-template-columns: 200px 100px 1fr 250px; gap: 16px; padding: 12px 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.1); }
          .testCatHeader { background: rgba(59,130,246,0.15); font-weight: 700; color: #fff; }
          .testCatCol { color: rgba(255,255,255,0.85); font-size: 0.9rem; }
          .traceExample { margin: 24px 0; padding: 20px; background: rgba(139,92,246,0.1); border: 1px solid rgba(139,92,246,0.3); border-radius: 8px; }
          .traceStep { display: flex; align-items: center; gap: 12px; margin: 12px 0; }
          .traceLabel { padding: 8px 12px; background: rgba(59,130,246,0.3); border-radius: 6px; font-family: monospace; font-weight: 700; color: #fff; min-width: 100px; text-align: center; }
          .traceArrow { font-size: 1.5rem; color: rgba(139,92,246,0.9); }
          .traceDesc { flex: 1; color: rgba(255,255,255,0.85); }
          .approvalTable { margin: 24px 0; }
          .approvalRow { display: grid; grid-template-columns: 200px 1fr 150px; gap: 16px; padding: 12px 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.1); }
          .approvalRole { font-weight: 600; color: rgba(255,255,255,0.9); }
          .approvalName { color: rgba(255,255,255,0.85); }
          .approvalDate { color: rgba(255,255,255,0.7); }
          .docNav { display: flex; justify-content: space-between; margin-top: 64px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); }
          .navBtn { padding: 12px 24px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 600; }
          .navBtn:hover { background: rgba(139,92,246,0.2); border-color: rgba(139,92,246,0.4); }
          @media (max-width: 768px) {
            .statsGrid { grid-template-columns: repeat(2, 1fr); }
            .filters { flex-direction: column; align-items: stretch; }
            .filterInfo { margin-left: 0; }
            .testCatRow { grid-template-columns: 1fr; }
            .traceStep { flex-direction: column; align-items: flex-start; }
            .approvalRow { grid-template-columns: 1fr; }
            .docNav { flex-direction: column; gap: 12px; }
          }
        `}</style>
      </div>
    </>
  );
}
