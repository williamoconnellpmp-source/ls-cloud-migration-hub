import Head from "next/head";
import Link from "next/link";

export default function GxPCSVAWSPage() {
  return (
    <>
      <Head>
        <title>GxP & CSV in AWS | Cloud Validation Best Practices</title>
        <meta name="description" content="Implementing Good Practice and Computer System Validation in AWS cloud environments"/>
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
            <h1 className="h1">GxP & CSV in AWS</h1>
            <p className="subtitle">Best practices for implementing Computer System Validation and Good Practice requirements in AWS cloud environments</p>

            <section className="section">
              <h2 className="h2">1. Understanding GxP in the Cloud</h2>

              <h3 className="h3">1.1 What is GxP?</h3>
              <p>
                <strong>GxP</strong> is an umbrella term covering Good Practice quality guidelines and regulations that apply to Life Sciences:
              </p>
              <ul>
                <li><strong>GMP</strong> - Good Manufacturing Practice (pharmaceutical manufacturing)</li>
                <li><strong>GLP</strong> - Good Laboratory Practice (preclinical studies)</li>
                <li><strong>GCP</strong> - Good Clinical Practice (clinical trials)</li>
                <li><strong>GDP</strong> - Good Distribution Practice (supply chain)</li>
                <li><strong>GDocP</strong> - Good Documentation Practice (record keeping)</li>
              </ul>
              <p>
                All GxP guidelines share common principles: <strong>data integrity</strong>, <strong>traceability</strong>, <strong>audit trails</strong>, and <strong>quality management</strong>.
              </p>

              <h3 className="h3">1.2 What is Computer System Validation (CSV)?</h3>
              <p>
                <strong>Computer System Validation (CSV)</strong> is the documented process of ensuring a computerized system does what it''s supposed to do in a consistent and reproducible manner. 
                CSV is required for any system that creates, modifies, maintains, archives, retrieves, or transmits GxP data.
              </p>

              <div className="definitionBox">
                <div className="defTitle">CSV Core Principle</div>
                <p>
                  "A validated system provides documented evidence that the system is capable of consistently producing results meeting predetermined specifications."
                </p>
              </div>

              <h3 className="h3">1.3 Why Cloud Validation is Different</h3>
              <p>
                Traditional CSV assumed on-premise infrastructure you fully controlled. Cloud introduces new considerations:
              </p>
              <div className="challengeGrid">
                <div className="challengeCard">
                  <div className="challengeIcon">☁️</div>
                  <div className="challengeTitle">Shared Infrastructure</div>
                  <p>AWS owns the hardware; you manage the application</p>
                </div>
                <div className="challengeCard">
                  <div className="challengeIcon">🔄</div>
                  <div className="challengeTitle">Continuous Updates</div>
                  <p>AWS services update frequently without your control</p>
                </div>
                <div className="challengeCard">
                  <div className="challengeIcon">🌐</div>
                  <div className="challengeTitle">Global Distribution</div>
                  <p>Data may physically reside across multiple regions</p>
                </div>
                <div className="challengeCard">
                  <div className="challengeIcon">🔧</div>
                  <div className="challengeTitle">Serverless Architecture</div>
                  <p>No traditional "servers" to validate</p>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">2. GAMP 5 Framework for Cloud</h2>

              <h3 className="h3">2.1 GAMP Categories</h3>
              <p>
                <strong>GAMP 5</strong> (Good Automated Manufacturing Practice) provides a risk-based approach to CSV. Systems are categorized by complexity:
              </p>
              <div className="gampTable">
                <div className="gampRow gampHeader">
                  <div className="gampCat">Category</div>
                  <div className="gampDesc">Description</div>
                  <div className="gampVal">Validation Approach</div>
                  <div className="gampExample">Cloud Example</div>
                </div>
                <div className="gampRow">
                  <div className="gampCat"><strong>Category 1</strong><br/>Infrastructure</div>
                  <div className="gampDesc">Operating systems, databases, middleware</div>
                  <div className="gampVal">Supplier assessment + IQ</div>
                  <div className="gampExample">AWS infrastructure (EC2, RDS)</div>
                </div>
                <div className="gampRow">
                  <div className="gampCat"><strong>Category 3</strong><br/>Non-configured</div>
                  <div className="gampDesc">COTS software used "as-is"</div>
                  <div className="gampVal">Supplier assessment + IQ/OQ</div>
                  <div className="gampExample">Cognito, S3, DynamoDB (default config)</div>
                </div>
                <div className="gampRow highlight">
                  <div className="gampCat"><strong>Category 4</strong><br/>Configured</div>
                  <div className="gampDesc">COTS software with configuration</div>
                  <div className="gampVal">Supplier assessment + IQ/OQ/PQ</div>
                  <div className="gampExample"><strong>VDC System</strong> (AWS services + custom Lambda)</div>
                </div>
                <div className="gampRow">
                  <div className="gampCat"><strong>Category 5</strong><br/>Custom</div>
                  <div className="gampDesc">Fully custom-developed software</div>
                  <div className="gampVal">Full SDLC + IQ/OQ/PQ + code review</div>
                  <div className="gampExample">Custom ML models, proprietary algorithms</div>
                </div>
              </div>

              <h3 className="h3">2.2 VDC System Classification</h3>
              <p>
                The VDC system is <strong>GAMP Category 4</strong> (Configured Product):
              </p>
              <ul>
                <li>Uses AWS managed services (S3, DynamoDB, Cognito, Lambda) - these are COTS</li>
                <li>Configured with IAM policies, Cognito groups, API Gateway routes</li>
                <li>Custom Lambda functions implement business logic</li>
                <li>Frontend is a static site (Next.js) with minimal custom code</li>
              </ul>
              <p>
                <strong>Validation Strategy:</strong> AWS supplier assessment + full IQ/OQ/PQ on the configured application.
              </p>
            </section>

            <section className="section">
              <h2 className="h2">3. Cloud Validation Approach</h2>

              <h3 className="h3">3.1 Shared Responsibility Model</h3>
              <div className="responsibilityDiagram">
                <div className="respLayer aws">
                  <div className="respTitle">AWS Responsibility</div>
                  <div className="respItems">
                    <div className="respItem">Physical security (data centers, hardware)</div>
                    <div className="respItem">Network infrastructure (VPC, CloudFront)</div>
                    <div className="respItem">Service availability & reliability</div>
                    <div className="respItem">Infrastructure patching & updates</div>
                    <div className="respItem">Compliance certifications (SOC 2, ISO 27001, HIPAA)</div>
                  </div>
                  <div className="respEvidence">Evidence: AWS Artifact (audit reports), AWS compliance programs</div>
                </div>
                <div className="respLayer customer">
                  <div className="respTitle">Customer Responsibility (You)</div>
                  <div className="respItems">
                    <div className="respItem">Application validation (IQ/OQ/PQ)</div>
                    <div className="respItem">User access controls (IAM, Cognito)</div>
                    <div className="respItem">Data encryption (keys, policies)</div>
                    <div className="respItem">Audit trail implementation</div>
                    <div className="respItem">Backup & disaster recovery</div>
                    <div className="respItem">Change control & configuration management</div>
                  </div>
                  <div className="respEvidence">Evidence: Your validation documentation, SOPs, training records</div>
                </div>
              </div>

              <h3 className="h3">3.2 AWS Supplier Qualification</h3>
              <p>
                Before validating your application, qualify AWS as a vendor:
              </p>
              <div className="qualificationSteps">
                <div className="qualStep">
                  <div className="qualNum">1</div>
                  <div className="qualContent">
                    <div className="qualTitle">Review AWS Compliance Documentation</div>
                    <ul>
                      <li>AWS Artifact: Download SOC 2 Type II reports</li>
                      <li>Review ISO 27001, ISO 27017, ISO 27018 certifications</li>
                      <li>Check HIPAA BAA availability</li>
                      <li>Review AWS Life Sciences compliance program</li>
                    </ul>
                  </div>
                </div>
                <div className="qualStep">
                  <div className="qualNum">2</div>
                  <div className="qualContent">
                    <div className="qualTitle">Assess Service Maturity</div>
                    <ul>
                      <li>Verify services are Generally Available (not preview/beta)</li>
                      <li>Review service SLA commitments</li>
                      <li>Check service history (uptime, incidents)</li>
                    </ul>
                  </div>
                </div>
                <div className="qualStep">
                  <div className="qualNum">3</div>
                  <div className="qualContent">
                    <div className="qualTitle">Document Supplier Qualification</div>
                    <ul>
                      <li>Create vendor qualification document</li>
                      <li>Define periodic review schedule (annual)</li>
                      <li>Monitor AWS Health Dashboard for service issues</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="h3">3.3 Validation Testing Strategy</h3>
              <p>
                The VDC system follows a <strong>risk-based testing approach</strong>:
              </p>
              <div className="testStrategyTable">
                <div className="testStratRow testStratHeader">
                  <div className="testStratCol">Qualification</div>
                  <div className="testStratCol">Focus</div>
                  <div className="testStratCol">VDC Tests</div>
                </div>
                <div className="testStratRow">
                  <div className="testStratCol"><strong>IQ</strong><br/>Installation</div>
                  <div className="testStratCol">Verify AWS resources deployed correctly via CloudFormation</div>
                  <div className="testStratCol">11 tests - Cognito config, S3 encryption, DynamoDB tables, IAM policies</div>
                </div>
                <div className="testStratRow">
                  <div className="testStratCol"><strong>OQ</strong><br/>Operational</div>
                  <div className="testStratCol">Test individual Lambda functions and API endpoints</div>
                  <div className="testStratCol">21 tests - Each Lambda function, auth flow, audit creation, error handling</div>
                </div>
                <div className="testStratRow">
                  <div className="testStratCol"><strong>PQ</strong><br/>Performance</div>
                  <div className="testStratCol">End-to-end workflows with role-based scenarios</div>
                  <div className="testStratCol">29 tests - Submit→Approve workflow, RBAC, ALCOA+ compliance, performance</div>
                </div>
              </div>
              <p>
                <strong>Result:</strong> <Link href="/life-sciences/docs/iq-oq-pq" className="evidenceLink">61 test cases, 100% pass rate</Link>
              </p>
            </section>

            <section className="section">
              <h2 className="h2">4. Data Integrity (ALCOA+)</h2>

              <h3 className="h3">4.1 ALCOA+ Principles</h3>
              <p>
                Data integrity is the foundation of GxP compliance. The <strong>ALCOA+</strong> acronym defines data integrity requirements:
              </p>
              <div className="alcoaGrid">
                <div className="alcoaCard">
                  <div className="alcoaLetter">A</div>
                  <div className="alcoaTitle">Attributable</div>
                  <p>Who performed the action? Identity must be traceable.</p>
                  <div className="alcoaImpl"><strong>VDC:</strong> Cognito user ID + email in every audit record</div>
                </div>
                <div className="alcoaCard">
                  <div className="alcoaLetter">L</div>
                  <div className="alcoaTitle">Legible</div>
                  <p>Can the data be read and understood?</p>
                  <div className="alcoaImpl"><strong>VDC:</strong> UTF-8 JSON, human-readable format</div>
                </div>
                <div className="alcoaCard">
                  <div className="alcoaLetter">C</div>
                  <div className="alcoaTitle">Contemporaneous</div>
                  <p>Was it recorded at the time of the action?</p>
                  <div className="alcoaImpl"><strong>VDC:</strong> ISO 8601 timestamp generated at action time</div>
                </div>
                <div className="alcoaCard">
                  <div className="alcoaLetter">O</div>
                  <div className="alcoaTitle">Original</div>
                  <p>Is this the first recording, or a copy?</p>
                  <div className="alcoaImpl"><strong>VDC:</strong> S3 versioning preserves original uploads</div>
                </div>
                <div className="alcoaCard">
                  <div className="alcoaLetter">A</div>
                  <div className="alcoaTitle">Accurate</div>
                  <p>Is the data correct and free from errors?</p>
                  <div className="alcoaImpl"><strong>VDC:</strong> SHA-256 hash verification</div>
                </div>
                <div className="alcoaCard plus">
                  <div className="alcoaLetter">+</div>
                  <div className="alcoaTitle">Complete, Consistent, Enduring, Available</div>
                  <p>Additional modern data integrity requirements</p>
                  <div className="alcoaImpl"><strong>VDC:</strong> Complete audit trail, immutable records, 7+ year retention</div>
                </div>
              </div>

              <h3 className="h3">4.2 Cloud-Specific Data Integrity Controls</h3>
              <div className="controlsTable">
                <div className="controlsRow controlsHeader">
                  <div className="controlsCol">Risk</div>
                  <div className="controlsCol">Cloud Challenge</div>
                  <div className="controlsCol">VDC Mitigation</div>
                </div>
                <div className="controlsRow">
                  <div className="controlsCol">Data Tampering</div>
                  <div className="controlsCol">S3 objects can be overwritten</div>
                  <div className="controlsCol">S3 versioning + SHA-256 hash verification</div>
                </div>
                <div className="controlsRow">
                  <div className="controlsCol">Audit Trail Modification</div>
                  <div className="controlsCol">DynamoDB items can be updated/deleted</div>
                  <div className="controlsCol">IAM policy denies UpdateItem and DeleteItem on audit table</div>
                </div>
                <div className="controlsRow">
                  <div className="controlsCol">Unauthorized Access</div>
                  <div className="controlsCol">Cloud console access to raw data</div>
                  <div className="controlsCol">IAM least privilege + Cognito MFA + CloudTrail monitoring</div>
                </div>
                <div className="controlsRow">
                  <div className="controlsCol">Data Loss</div>
                  <div className="controlsCol">Accidental deletion or service failure</div>
                  <div className="controlsCol">S3 versioning + cross-region replication (if needed)</div>
                </div>
                <div className="controlsRow">
                  <div className="controlsCol">Time Synchronization</div>
                  <div className="controlsCol">Distributed systems, clock drift</div>
                  <div className="controlsCol">AWS NTP service + ISO 8601 UTC timestamps</div>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">5. Change Control in the Cloud</h2>

              <h3 className="h3">5.1 Types of Changes</h3>
              <p>
                In a cloud environment, distinguish between:
              </p>
              <div className="changeTypes">
                <div className="changeType aws">
                  <div className="changeTypeTitle">AWS-Managed Changes</div>
                  <ul>
                    <li><strong>Service Updates:</strong> AWS patches, feature additions (you don''t control timing)</li>
                    <li><strong>Infrastructure:</strong> Hardware refresh, data center maintenance</li>
                  </ul>
                  <div className="changeAction">Action: Monitor AWS Health Dashboard, review release notes</div>
                </div>
                <div className="changeType customer">
                  <div className="changeTypeTitle">Customer-Managed Changes</div>
                  <ul>
                    <li><strong>Application Code:</strong> Lambda function updates, frontend changes</li>
                    <li><strong>Configuration:</strong> IAM policies, Cognito settings, API Gateway routes</li>
                    <li><strong>Infrastructure as Code:</strong> CloudFormation template updates</li>
                  </ul>
                  <div className="changeAction">Action: Follow your change control SOP, re-validate as needed</div>
                </div>
              </div>

              <h3 className="h3">5.2 Risk-Based Change Control</h3>
              <p>
                Not all changes require full re-validation. Use a risk-based approach:
              </p>
              <div className="riskMatrix">
                <div className="riskRow riskHeader">
                  <div className="riskLevel">Risk Level</div>
                  <div className="riskExample">Example Changes</div>
                  <div className="riskAction">Validation Impact</div>
                </div>
                <div className="riskRow low">
                  <div className="riskLevel">Low</div>
                  <div className="riskExample">UI text changes, CloudWatch log retention</div>
                  <div className="riskAction">Change control only, no re-testing</div>
                </div>
                <div className="riskRow medium">
                  <div className="riskLevel">Medium</div>
                  <div className="riskExample">New feature (doesn''t affect existing), IAM policy refinement</div>
                  <div className="riskAction">Targeted OQ tests for new functionality</div>
                </div>
                <div className="riskRow high">
                  <div className="riskLevel">High</div>
                  <div className="riskExample">Audit trail modification, authentication changes, data model updates</div>
                  <div className="riskAction">Full impact assessment + relevant IQ/OQ/PQ re-execution</div>
                </div>
              </div>

              <h3 className="h3">5.3 Infrastructure as Code Benefits</h3>
              <p>
                Using CloudFormation for deployment provides validation advantages:
              </p>
              <ul>
                <li><strong>Repeatability:</strong> Same template deploys identically to dev/prod</li>
                <li><strong>Version Control:</strong> CloudFormation templates in Git = change history</li>
                <li><strong>Automated Testing:</strong> Deploy to dev, run tests, promote to prod</li>
                <li><strong>Rollback:</strong> CloudFormation stack rollback if deployment fails</li>
              </ul>
            </section>

            <section className="section">
              <h2 className="h2">6. Common Questions</h2>

              <div className="faqGrid">
                <div className="faq">
                  <div className="faqQ">Q: Do I need to validate AWS services themselves?</div>
                  <div className="faqA">
                    <strong>A:</strong> No. AWS services (S3, DynamoDB, Lambda) are COTS software (GAMP Category 3/4). 
                    You qualify AWS as a supplier and validate <em>your application</em> built on those services.
                  </div>
                </div>

                <div className="faq">
                  <div className="faqQ">Q: What if AWS updates their services?</div>
                  <div className="faqA">
                    <strong>A:</strong> AWS manages backward compatibility. Monitor AWS Health Dashboard for breaking changes. 
                    Most updates are transparent and don''t require re-validation. Major updates should trigger impact assessment.
                  </div>
                </div>

                <div className="faq">
                  <div className="faqQ">Q: Can I use AWS for GxP Production systems?</div>
                  <div className="faqA">
                    <strong>A:</strong> Yes. Many large pharma companies (Moderna, Pfizer, AstraZeneca) run GxP workloads on AWS. 
                    Key is proper validation, supplier qualification, and following GxP principles.
                  </div>
                </div>

                <div className="faq">
                  <div className="faqQ">Q: Do I need separate AWS accounts for dev/prod?</div>
                  <div className="faqA">
                    <strong>A:</strong> Strongly recommended. Separate accounts provide clear environment isolation, prevent accidental changes, 
                    and simplify audit trails. VDC uses separate resources (not just S3 buckets) for dev and prod.
                  </div>
                </div>

                <div className="faq">
                  <div className="faqQ">Q: How do I prove data integrity in S3?</div>
                  <div className="faqA">
                    <strong>A:</strong> (1) Enable S3 versioning to preserve all uploads, (2) Calculate SHA-256 hash on upload, 
                    (3) Verify hash on download. This proves files haven''t been tampered with.
                  </div>
                </div>

                <div className="faq">
                  <div className="faqQ">Q: What about audit trails for AWS console access?</div>
                  <div className="faqA">
                    <strong>A:</strong> AWS CloudTrail logs all API calls (including console actions). Enable CloudTrail in all regions, 
                    send logs to immutable S3 bucket. This provides infrastructure-level audit trail.
                  </div>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">7. Resources</h2>
              <ul>
                <li><strong>GAMP 5:</strong> <a href="https://ispe.org/publications/guidance-documents/gamp-5" target="_blank" rel="noopener noreferrer" className="extLink">Good Automated Manufacturing Practice Guide</a></li>
                <li><strong>FDA Data Integrity:</strong> <a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/data-integrity-and-compliance-drug-cgmp-questions-and-answers" target="_blank" rel="noopener noreferrer" className="extLink">Data Integrity and Compliance with Drug CGMP</a></li>
                <li><strong>AWS Compliance:</strong> <a href="https://aws.amazon.com/compliance/programs/" target="_blank" rel="noopener noreferrer" className="extLink">AWS Compliance Programs</a></li>
                <li><strong>AWS Life Sciences:</strong> <a href="https://aws.amazon.com/health/life-sciences/" target="_blank" rel="noopener noreferrer" className="extLink">AWS Life Sciences Solutions</a></li>
                <li><strong>AWS Artifact:</strong> <a href="https://aws.amazon.com/artifact/" target="_blank" rel="noopener noreferrer" className="extLink">Download AWS Audit Reports</a></li>
              </ul>
            </section>

            <div className="docNav">
              <Link href="/life-sciences/docs/21-cfr-practice" className="navBtn">← Previous: 21 CFR Part 11</Link>
              <Link href="/life-sciences/evidence" className="navBtn">Back to Evidence →</Link>
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
          .definitionBox { background: rgba(59,130,246,0.15); border-left: 4px solid rgba(59,130,246,0.9); padding: 24px; margin: 24px 0; border-radius: 8px; }
          .defTitle { font-weight: 700; font-size: 1.1rem; margin-bottom: 12px; color: rgba(96,165,250,1); }
          .challengeGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 24px 0; }
          .challengeCard { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 20px; text-align: center; }
          .challengeIcon { font-size: 2.5rem; margin-bottom: 12px; }
          .challengeTitle { font-weight: 700; margin-bottom: 8px; color: #fff; }
          .gampTable { margin: 24px 0; }
          .gampRow { display: grid; grid-template-columns: 150px 1fr 200px 200px; gap: 16px; padding: 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.1); }
          .gampHeader { background: rgba(59,130,246,0.15); font-weight: 700; color: #fff; }
          .gampRow.highlight { background: rgba(139,92,246,0.1); border: 2px solid rgba(139,92,246,0.3); }
          .responsibilityDiagram { display: grid; gap: 24px; margin: 24px 0; }
          .respLayer { border-radius: 12px; padding: 24px; }
          .respLayer.aws { background: rgba(255,153,0,0.1); border: 2px solid rgba(255,153,0,0.3); }
          .respLayer.customer { background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.3); }
          .respTitle { font-weight: 700; font-size: 1.2rem; margin-bottom: 16px; color: #fff; }
          .respItems { display: grid; gap: 8px; margin-bottom: 16px; }
          .respItem { padding: 8px 12px; background: rgba(0,0,0,0.2); border-radius: 6px; }
          .respEvidence { font-size: 0.9rem; color: rgba(255,255,255,0.7); font-style: italic; }
          .qualificationSteps { margin: 24px 0; }
          .qualStep { display: grid; grid-template-columns: 60px 1fr; gap: 20px; margin-bottom: 24px; }
          .qualNum { width: 60px; height: 60px; background: rgba(139,92,246,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 800; color: #fff; }
          .qualTitle { font-weight: 700; font-size: 1.1rem; margin-bottom: 12px; color: rgba(167,139,250,1); }
          .testStrategyTable { margin: 24px 0; }
          .testStratRow { display: grid; grid-template-columns: 150px 1fr 300px; gap: 16px; padding: 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.1); }
          .testStratHeader { background: rgba(59,130,246,0.15); font-weight: 700; color: #fff; }
          .alcoaGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 32px 0; }
          .alcoaCard { background: rgba(139,92,246,0.1); border: 1px solid rgba(139,92,246,0.3); border-radius: 12px; padding: 20px; }
          .alcoaCard.plus { grid-column: 1 / -1; background: rgba(59,130,246,0.1); border-color: rgba(59,130,246,0.3); }
          .alcoaLetter { font-size: 3rem; font-weight: 800; color: rgba(167,139,250,1); margin-bottom: 8px; }
          .alcoaTitle { font-weight: 700; font-size: 1.1rem; margin-bottom: 8px; color: #fff; }
          .alcoaImpl { font-size: 0.9rem; margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); }
          .controlsTable { margin: 24px 0; }
          .controlsRow { display: grid; grid-template-columns: 180px 1fr 1fr; gap: 16px; padding: 12px 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.1); }
          .controlsHeader { background: rgba(59,130,246,0.15); font-weight: 700; color: #fff; }
          .changeTypes { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin: 24px 0; }
          .changeType { border-radius: 12px; padding: 24px; }
          .changeType.aws { background: rgba(255,153,0,0.1); border: 1px solid rgba(255,153,0,0.3); }
          .changeType.customer { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); }
          .changeTypeTitle { font-weight: 700; font-size: 1.1rem; margin-bottom: 16px; color: #fff; }
          .changeAction { margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1); font-weight: 600; color: rgba(255,255,255,0.9); }
          .riskMatrix { margin: 24px 0; }
          .riskRow { display: grid; grid-template-columns: 120px 1fr 300px; gap: 16px; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.1); }
          .riskHeader { background: rgba(59,130,246,0.15); font-weight: 700; color: #fff; }
          .riskRow.low { background: rgba(34,197,94,0.05); }
          .riskRow.medium { background: rgba(251,191,36,0.05); }
          .riskRow.high { background: rgba(239,68,68,0.05); }
          .faqGrid { display: grid; gap: 20px; margin: 24px 0; }
          .faq { background: rgba(255,255,255,0.05); border-left: 4px solid rgba(139,92,246,0.6); padding: 20px; border-radius: 8px; }
          .faqQ { font-weight: 700; font-size: 1.05rem; margin-bottom: 12px; color: rgba(167,139,250,1); }
          .faqA { color: rgba(255,255,255,0.85); line-height: 1.7; }
          .evidenceLink, .extLink { color: rgba(139,92,246,0.9); text-decoration: underline; }
          .evidenceLink:hover, .extLink:hover { color: rgba(167,139,250,0.9); }
          .docNav { display: flex; justify-content: space-between; margin-top: 64px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); }
          .navBtn { padding: 12px 24px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 600; }
          .navBtn:hover { background: rgba(139,92,246,0.2); border-color: rgba(139,92,246,0.4); }
          @media (max-width: 968px) {
            .challengeGrid, .alcoaGrid, .changeTypes { grid-template-columns: 1fr; }
            .gampRow, .testStratRow, .controlsRow, .riskRow { grid-template-columns: 1fr; }
            .qualStep { grid-template-columns: 1fr; }
            .docNav { flex-direction: column; gap: 12px; }
          }
        `}</style>
      </div>
    </>
  );
}
