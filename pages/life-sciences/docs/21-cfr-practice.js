import Head from "next/head";
import Link from "next/link";

export default function CFR21Part11Page() {
  return (
    <>
      <Head>
        <title>21 CFR Part 11 in Practice | VDC Implementation</title>
        <meta name="description" content="Practical interpretation and implementation of 21 CFR Part 11 requirements in AWS cloud environments"/>
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
            <h1 className="h1">21 CFR Part 11 in Practice</h1>
            <p className="subtitle">How the VDC system implements FDA electronic records and signature requirements in AWS</p>

            <section className="section">
              <h2 className="h2">1. Understanding 21 CFR Part 11</h2>
              
              <h3 className="h3">1.1 What is 21 CFR Part 11?</h3>
              <p>
                21 CFR Part 11 establishes the FDA''s criteria for accepting electronic records and electronic signatures as equivalent to paper records and handwritten signatures. 
                Originally issued in 1997, it applies to all FDA-regulated industries including pharmaceuticals, biologics, and medical devices.
              </p>

              <h3 className="h3">1.2 Core Requirements</h3>
              <div className="reqGrid">
                <div className="reqCard">
                  <div className="reqTitle">§11.10 - Controls for Closed Systems</div>
                  <ul>
                    <li>Validation of systems</li>
                    <li>Audit trails for all changes</li>
                    <li>Authority checks (RBAC)</li>
                    <li>Device checks (MFA)</li>
                    <li>Operational system checks</li>
                    <li>Education and training</li>
                  </ul>
                </div>
                <div className="reqCard">
                  <div className="reqTitle">§11.50 - Signature Manifestations</div>
                  <ul>
                    <li>Signed records must contain:</li>
                    <li>Printed name of signer</li>
                    <li>Date and time of signature</li>
                    <li>Meaning of signature (approval, review, etc.)</li>
                  </ul>
                </div>
                <div className="reqCard">
                  <div className="reqTitle">§11.70 - Signature/Record Linking</div>
                  <ul>
                    <li>Electronic signatures must be linked to records</li>
                    <li>Cannot be excised, copied, or transferred</li>
                    <li>Preserve integrity of signed records</li>
                  </ul>
                </div>
              </div>

              <h3 className="h3">1.3 FDA Guidance (2003)</h3>
              <p>
                In 2003, the FDA issued <strong>Guidance for Industry - Part 11, Electronic Records; Electronic Signatures — Scope and Application</strong>, 
                clarifying that FDA would exercise enforcement discretion for certain Part 11 requirements when predicate rules are met. This means:
              </p>
              <ul>
                <li>Focus on <strong>data integrity</strong> and <strong>trustworthiness</strong></li>
                <li>Risk-based approach to validation and controls</li>
                <li>Emphasis on ALCOA+ principles (Attributable, Legible, Contemporaneous, Original, Accurate)</li>
              </ul>
            </section>

            <section className="section">
              <h2 className="h2">2. VDC System Compliance Mapping</h2>

              <h3 className="h3">2.1 Electronic Records (§11.10)</h3>
              <div className="complianceTable">
                <div className="compRow compHeader">
                  <div className="compReq">Requirement</div>
                  <div className="compImpl">VDC Implementation</div>
                  <div className="compEvidence">Evidence Location</div>
                </div>
                <div className="compRow">
                  <div className="compReq"><strong>§11.10(a) - Validation</strong></div>
                  <div className="compImpl">Complete IQ/OQ/PQ validation documented with 61 test cases</div>
                  <div className="compEvidence"><Link href="/life-sciences/docs/iq-oq-pq" className="evidenceLink">IQ/OQ/PQ Results</Link></div>
                </div>
                <div className="compRow">
                  <div className="compReq"><strong>§11.10(b) - Copy Records</strong></div>
                  <div className="compImpl">S3 with versioning preserves all document versions; audit trail exportable</div>
                  <div className="compEvidence">FS Section 5.3, 7.2</div>
                </div>
                <div className="compRow">
                  <div className="compReq"><strong>§11.10(c) - Record Retention</strong></div>
                  <div className="compImpl">DynamoDB audit logs retained indefinitely (no TTL); S3 lifecycle prevents deletion</div>
                  <div className="compEvidence">URS-070, URS-071</div>
                </div>
                <div className="compRow">
                  <div className="compReq"><strong>§11.10(d) - Access Limits</strong></div>
                  <div className="compImpl">IAM least privilege + Cognito RBAC (Submitter/Approver groups)</div>
                  <div className="compEvidence">FS Section 6.2, 6.3</div>
                </div>
                <div className="compRow">
                  <div className="compReq"><strong>§11.10(e) - Audit Trail</strong></div>
                  <div className="compImpl">Immutable DynamoDB audit table captures: user, action, timestamp, IP, outcome</div>
                  <div className="compEvidence">URS-030 to URS-034</div>
                </div>
                <div className="compRow">
                  <div className="compReq"><strong>§11.10(f) - Operational Checks</strong></div>
                  <div className="compImpl">Lambda function validation, error handling, hash verification</div>
                  <div className="compEvidence">OQ test cases</div>
                </div>
                <div className="compRow">
                  <div className="compReq"><strong>§11.10(g) - Authority Checks</strong></div>
                  <div className="compImpl">Cognito MFA + JWT validation + Lambda role checks</div>
                  <div className="compEvidence">URS-020, URS-021</div>
                </div>
                <div className="compRow">
                  <div className="compReq"><strong>§11.10(h) - Device Checks</strong></div>
                  <div className="compImpl">MFA (TOTP) required for all user sessions</div>
                  <div className="compEvidence">URS-014, OQ-002</div>
                </div>
                <div className="compRow">
                  <div className="compReq"><strong>§11.10(i) - Training</strong></div>
                  <div className="compImpl">User training on VDC workflow and role responsibilities (org responsibility)</div>
                  <div className="compEvidence">Not system-enforced</div>
                </div>
                <div className="compRow">
                  <div className="compReq"><strong>§11.10(j) - Accountability</strong></div>
                  <div className="compImpl">Unique Cognito user accounts; no shared credentials</div>
                  <div className="compEvidence">FS Section 3.3</div>
                </div>
              </div>

              <h3 className="h3">2.2 Electronic Signatures (§11.50, §11.70)</h3>
              <p>
                The VDC system implements <strong>electronic signature intent</strong> through the approval workflow:
              </p>
              <ul>
                <li><strong>Authentication:</strong> User logs in with email/password + MFA (§11.200(a)(1))</li>
                <li><strong>Action:</strong> User clicks "Approve" or "Reject" button</li>
                <li><strong>Record Created:</strong> Immutable audit log captures:
                  <ul>
                    <li>Printed name (email from Cognito token)</li>
                    <li>Date and time (ISO 8601 UTC timestamp)</li>
                    <li>Meaning (action = APPROVE or REJECT)</li>
                    <li>Document ID (linking signature to record)</li>
                  </ul>
                </li>
              </ul>
              <p>
                This meets the requirements of §11.50 (signature manifestations) and §11.70 (signature/record linking). 
                The signature cannot be excised or transferred because the audit record is immutable.
              </p>
            </section>

            <section className="section">
              <h2 className="h2">3. Cloud-Specific Considerations</h2>

              <h3 className="h3">3.1 Shared Responsibility Model</h3>
              <p>
                When implementing Part 11 on AWS, understand the <strong>shared responsibility model</strong>:
              </p>
              <div className="responsibilityGrid">
                <div className="responsibilityCard aws">
                  <div className="responsibilityTitle">AWS Responsibility</div>
                  <ul>
                    <li>Physical security of data centers</li>
                    <li>Infrastructure availability and reliability</li>
                    <li>Service-level encryption (S3, DynamoDB)</li>
                    <li>Compliance certifications (SOC 2, ISO 27001)</li>
                  </ul>
                </div>
                <div className="responsibilityCard customer">
                  <div className="responsibilityTitle">Customer Responsibility</div>
                  <ul>
                    <li>Application validation (IQ/OQ/PQ)</li>
                    <li>User access controls (IAM, Cognito)</li>
                    <li>Audit trail implementation</li>
                    <li>Data retention policies</li>
                    <li>Incident response procedures</li>
                  </ul>
                </div>
              </div>

              <h3 className="h3">3.2 Vendor Qualification</h3>
              <p>
                AWS is a qualified cloud provider for regulated Life Sciences workloads:
              </p>
              <ul>
                <li><strong>HIPAA BAA Available:</strong> Business Associate Agreement for HIPAA compliance</li>
                <li><strong>GxP Compliance:</strong> AWS follows GxP practices and supports validated environments</li>
                <li><strong>Audit Reports:</strong> SOC 2 Type II, ISO 27001, and other certifications available</li>
                <li><strong>Life Sciences Customers:</strong> Moderna, Pfizer, AstraZeneca use AWS for regulated workloads</li>
              </ul>

              <h3 className="h3">3.3 Service-Level vs. Application-Level Controls</h3>
              <p>
                Part 11 compliance requires <strong>application-level controls</strong>, not just AWS service guarantees:
              </p>
              <div className="controlTable">
                <div className="controlRow controlHeader">
                  <div className="controlType">Control Type</div>
                  <div className="controlAWS">AWS Provides</div>
                  <div className="controlApp">Application Must Add</div>
                </div>
                <div className="controlRow">
                  <div className="controlType">Encryption</div>
                  <div className="controlAWS">✅ SSE-S3, TLS endpoints</div>
                  <div className="controlApp">Document key management, enforce HTTPS</div>
                </div>
                <div className="controlRow">
                  <div className="controlType">Access Control</div>
                  <div className="controlAWS">✅ IAM, Cognito services</div>
                  <div className="controlApp">Implement RBAC, enforce MFA, prevent self-approval</div>
                </div>
                <div className="controlRow">
                  <div className="controlType">Audit Trail</div>
                  <div className="controlAWS">✅ CloudTrail (AWS API calls)</div>
                  <div className="controlApp">Application audit logs (user actions, business events)</div>
                </div>
                <div className="controlRow">
                  <div className="controlType">Validation</div>
                  <div className="controlAWS">AWS service reliability</div>
                  <div className="controlApp">Full IQ/OQ/PQ of application on AWS</div>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">4. Common Pitfalls & Best Practices</h2>

              <h3 className="h3">4.1 Pitfalls to Avoid</h3>
              <div className="pitfallCard">
                <div className="pitfallTitle">❌ Treating CloudTrail as Your Audit Trail</div>
                <p>
                  CloudTrail logs AWS API calls (infrastructure events), not user business actions. You need <strong>application-level audit logs</strong> 
                  that capture what users did (submitted document, approved, rejected).
                </p>
              </div>

              <div className="pitfallCard">
                <div className="pitfallTitle">❌ Assuming AWS Compliance = Your Compliance</div>
                <p>
                  AWS certifications (SOC 2, ISO) cover <strong>their infrastructure</strong>. You still need to validate <strong>your application</strong> 
                  with IQ/OQ/PQ testing.
                </p>
              </div>

              <div className="pitfallCard">
                <div className="pitfallTitle">❌ Not Testing Immutability</div>
                <p>
                  Part 11 requires audit trails to be immutable. Test that your DynamoDB IAM policies actually prevent updates/deletes (see OQ-017).
                </p>
              </div>

              <div className="pitfallCard">
                <div className="pitfallTitle">❌ Weak "Electronic Signature" Implementation</div>
                <p>
                  A button click alone isn''t enough. You need: authentication (who), authorization (allowed?), timestamp (when), 
                  meaning (what action), and record linking (which document). The VDC system captures all of these.
                </p>
              </div>

              <h3 className="h3">4.2 Best Practices</h3>
              <div className="bestPracticeGrid">
                <div className="bestPracticeCard">
                  <div className="bpIcon">✅</div>
                  <div className="bpTitle">Use Managed Services</div>
                  <p>Cognito (auth), DynamoDB (audit), S3 (storage) are pre-validated by AWS and reduce validation burden</p>
                </div>
                <div className="bestPracticeCard">
                  <div className="bpIcon">✅</div>
                  <div className="bpTitle">Enforce MFA</div>
                  <p>Part 11 requires "device checks" - MFA is the modern equivalent of physical tokens</p>
                </div>
                <div className="bestPracticeCard">
                  <div className="bpIcon">✅</div>
                  <div className="bpTitle">Immutable Audit Tables</div>
                  <p>Use IAM policies to deny UpdateItem/DeleteItem on audit tables - test this in OQ</p>
                </div>
                <div className="bestPracticeCard">
                  <div className="bpIcon">✅</div>
                  <div className="bpTitle">Hash Everything</div>
                  <p>SHA-256 hashes prove document integrity and satisfy ALCOA+ "Accurate" principle</p>
                </div>
                <div className="bestPracticeCard">
                  <div className="bpIcon">✅</div>
                  <div className="bpTitle">Infrastructure as Code</div>
                  <p>CloudFormation provides repeatable, validated deployments across environments</p>
                </div>
                <div className="bestPracticeCard">
                  <div className="bpIcon">✅</div>
                  <div className="bpTitle">Separate Dev/Prod</div>
                  <p>Completely separate AWS resources (not just different S3 buckets) for dev vs prod</p>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">5. Inspection Readiness</h2>
              
              <h3 className="h3">5.1 What Inspectors Look For</h3>
              <p>During an FDA inspection, be prepared to demonstrate:</p>
              <ol>
                <li><strong>Validation Documentation:</strong> Show complete URS, FS, RTM, and IQ/OQ/PQ protocols</li>
                <li><strong>Audit Trail Retrieval:</strong> Demonstrate you can quickly pull complete history for any document</li>
                <li><strong>Access Control:</strong> Show role separation (Submitter cannot approve own documents)</li>
                <li><strong>Data Integrity:</strong> Demonstrate hash verification prevents tampering</li>
                <li><strong>Change Control:</strong> Show how system changes are validated and documented</li>
              </ol>

              <h3 className="h3">5.2 Key Documentation</h3>
              <p>Have these documents ready for inspection:</p>
              <ul>
                <li><Link href="/life-sciences/docs/urs" className="docLink">User Requirements Specification (URS)</Link></li>
                <li><Link href="/life-sciences/docs/functional-spec" className="docLink">Functional Specification (FS)</Link></li>
                <li><Link href="/life-sciences/docs/traceability-matrix" className="docLink">Requirements Traceability Matrix (RTM)</Link></li>
                <li><Link href="/life-sciences/docs/iq-oq-pq" className="docLink">IQ/OQ/PQ Test Results</Link></li>
                <li>Standard Operating Procedures (SOPs) for system use</li>
                <li>User training records</li>
                <li>Change control records for system updates</li>
                <li>Incident/deviation logs</li>
              </ul>
            </section>

            <section className="section">
              <h2 className="h2">6. Resources</h2>
              <ul>
                <li><strong>FDA Guidance:</strong> <a href="https://www.fda.gov/media/75414/download" target="_blank" rel="noopener noreferrer" className="extLink">Part 11, Electronic Records; Electronic Signatures — Scope and Application (2003)</a></li>
                <li><strong>21 CFR Part 11 Text:</strong> <a href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfcfr/CFRSearch.cfm?CFRPart=11" target="_blank" rel="noopener noreferrer" className="extLink">Electronic Records; Electronic Signatures (CFR)</a></li>
                <li><strong>AWS Life Sciences:</strong> <a href="https://aws.amazon.com/health/life-sciences/" target="_blank" rel="noopener noreferrer" className="extLink">AWS Life Sciences Solutions</a></li>
                <li><strong>GAMP 5:</strong> Good Automated Manufacturing Practice (risk-based validation)</li>
              </ul>
            </section>

            <div className="docNav">
              <Link href="/life-sciences/evidence" className="navBtn">← Back to Evidence</Link>
              <Link href="/life-sciences/docs/gxp-csv-aws" className="navBtn">Next: GxP & CSV in AWS →</Link>
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
          ul, ol { margin: 16px 0; padding-left: 28px; }
          li { margin-bottom: 12px; line-height: 1.7; color: rgba(255,255,255,0.85); }
          .reqGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 24px 0; }
          .reqCard { background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); border-radius: 12px; padding: 24px; }
          .reqTitle { font-weight: 700; font-size: 1rem; margin-bottom: 16px; color: rgba(96,165,250,1); }
          .complianceTable { margin: 24px 0; }
          .compRow { display: grid; grid-template-columns: 200px 1fr 200px; gap: 16px; padding: 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.1); }
          .compHeader { background: rgba(59,130,246,0.15); font-weight: 700; color: #fff; }
          .compReq { color: rgba(255,255,255,0.9); }
          .compImpl { color: rgba(255,255,255,0.85); font-size: 0.95rem; }
          .evidenceLink, .docLink, .extLink { color: rgba(139,92,246,0.9); text-decoration: underline; }
          .evidenceLink:hover, .docLink:hover, .extLink:hover { color: rgba(167,139,250,0.9); }
          .responsibilityGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 24px 0; }
          .responsibilityCard { border-radius: 12px; padding: 24px; }
          .responsibilityCard.aws { background: rgba(255,153,0,0.1); border: 1px solid rgba(255,153,0,0.3); }
          .responsibilityCard.customer { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); }
          .responsibilityTitle { font-weight: 700; font-size: 1.1rem; margin-bottom: 16px; color: #fff; }
          .controlTable { margin: 24px 0; }
          .controlRow { display: grid; grid-template-columns: 180px 1fr 1fr; gap: 16px; padding: 12px 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.1); }
          .controlHeader { background: rgba(59,130,246,0.15); font-weight: 700; color: #fff; }
          .pitfallCard { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); border-radius: 12px; padding: 24px; margin: 16px 0; }
          .pitfallTitle { font-weight: 700; font-size: 1.1rem; margin-bottom: 12px; color: rgba(248,113,113,1); }
          .bestPracticeGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 24px 0; }
          .bestPracticeCard { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px; padding: 20px; }
          .bpIcon { font-size: 2rem; margin-bottom: 8px; }
          .bpTitle { font-weight: 700; margin-bottom: 8px; color: rgba(74,222,128,1); }
          .docNav { display: flex; justify-content: space-between; margin-top: 64px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); }
          .navBtn { padding: 12px 24px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 600; }
          .navBtn:hover { background: rgba(139,92,246,0.2); border-color: rgba(139,92,246,0.4); }
          @media (max-width: 968px) {
            .reqGrid, .responsibilityGrid, .bestPracticeGrid { grid-template-columns: 1fr; }
            .compRow, .controlRow { grid-template-columns: 1fr; }
            .docNav { flex-direction: column; gap: 12px; }
          }
        `}</style>
      </div>
    </>
  );
}
