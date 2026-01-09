import Head from "next/head";
import Link from "next/link";

export default function FunctionalSpecPage() {
  return (
    <>
      <Head>
        <title>Functional Specification | VDC System</title>
        <meta name="description" content="Functional Specification for Validated Document Control system"/>
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
              <h1 className="h1">Functional Specification</h1>
              <div className="docMeta">
                <span className="metaItem"><strong>Document ID:</strong> VDC-FS-001</span>
                <span className="metaItem"><strong>Version:</strong> 1.0</span>
                <span className="metaItem"><strong>Date:</strong> January 2025</span>
                <span className="metaItem"><strong>Status:</strong> Approved</span>
              </div>
            </div>

            <section className="section">
              <h2 className="h2">1. Introduction</h2>
              
              <h3 className="h3">1.1 Purpose</h3>
              <p>This Functional Specification (FS) describes the technical design and implementation of the Validated Document Control (VDC) system. It details how each User Requirement (URS) is satisfied through system architecture, AWS services, and application logic.</p>

              <h3 className="h3">1.2 Scope</h3>
              <p>This document covers:</p>
              <ul>
                <li>System architecture and AWS service integration</li>
                <li>Frontend application design (Next.js)</li>
                <li>Backend API design (AWS Lambda functions)</li>
                <li>Data models and storage (S3, DynamoDB)</li>
                <li>Authentication and authorization (Cognito)</li>
                <li>Security controls and encryption</li>
                <li>Audit trail implementation</li>
              </ul>

              <h3 className="h3">1.3 Related Documents</h3>
              <ul>
                <li><Link href="/life-sciences/docs/urs" className="inlineLink">VDC-URS-001: User Requirements Specification</Link></li>
                <li><Link href="/life-sciences/docs/traceability-matrix" className="inlineLink">Requirements Traceability Matrix</Link></li>
                <li><Link href="/life-sciences/docs/iq-oq-pq" className="inlineLink">IQ/OQ/PQ Validation Results</Link></li>
              </ul>
            </section>

            <section className="section">
              <h2 className="h2">2. System Architecture</h2>

              <h3 className="h3">2.1 High-Level Architecture</h3>
              <p>The VDC system follows a serverless, event-driven architecture on AWS:</p>
              
              <div className="archDiagram">
                <div className="archLayer">
                  <div className="archTitle">Presentation Layer</div>
                  <div className="archComponents">
                    <div className="archBox">Next.js 16.1.1 (Static Export)</div>
                    <div className="archBox">React 19.0.0</div>
                    <div className="archBox">CloudFront CDN</div>
                  </div>
                </div>
                <div className="archLayer">
                  <div className="archTitle">Authentication Layer</div>
                  <div className="archComponents">
                    <div className="archBox">Amazon Cognito User Pool</div>
                    <div className="archBox">Cognito Hosted UI</div>
                    <div className="archBox">MFA (TOTP)</div>
                  </div>
                </div>
                <div className="archLayer">
                  <div className="archTitle">API Layer</div>
                  <div className="archComponents">
                    <div className="archBox">API Gateway (HTTP APIs)</div>
                    <div className="archBox">8 Lambda Functions</div>
                    <div className="archBox">JWT Authorizer</div>
                  </div>
                </div>
                <div className="archLayer">
                  <div className="archTitle">Data Layer</div>
                  <div className="archComponents">
                    <div className="archBox">S3 (Documents)</div>
                    <div className="archBox">DynamoDB (Metadata)</div>
                    <div className="archBox">DynamoDB (Audit)</div>
                  </div>
                </div>
              </div>

              <h3 className="h3">2.2 AWS Services Used</h3>
              <div className="serviceTable">
                <div className="serviceRow serviceHeader">
                  <div className="serviceCol">Service</div>
                  <div className="serviceCol">Purpose</div>
                  <div className="serviceCol">URS Mapping</div>
                </div>
                <div className="serviceRow">
                  <div className="serviceCol"><strong>Amazon S3</strong></div>
                  <div className="serviceCol">Document storage with versioning and encryption (SSE-S3)</div>
                  <div className="serviceCol">URS-005, URS-023, URS-043</div>
                </div>
                <div className="serviceRow">
                  <div className="serviceCol"><strong>Amazon DynamoDB</strong></div>
                  <div className="serviceCol">Document metadata and immutable audit trail storage</div>
                  <div className="serviceCol">URS-033, URS-034</div>
                </div>
                <div className="serviceRow">
                  <div className="serviceCol"><strong>AWS Lambda</strong></div>
                  <div className="serviceCol">Serverless compute for API endpoints (8 functions)</div>
                  <div className="serviceCol">All workflow requirements</div>
                </div>
                <div className="serviceRow">
                  <div className="serviceCol"><strong>API Gateway</strong></div>
                  <div className="serviceCol">HTTP API with JWT authorization and CORS</div>
                  <div className="serviceCol">URS-023</div>
                </div>
                <div className="serviceRow">
                  <div className="serviceCol"><strong>Amazon Cognito</strong></div>
                  <div className="serviceCol">User authentication with MFA enforcement and RBAC</div>
                  <div className="serviceCol">URS-020, URS-021, URS-022</div>
                </div>
                <div className="serviceRow">
                  <div className="serviceCol"><strong>CloudWatch Logs</strong></div>
                  <div className="serviceCol">System monitoring and debugging logs</div>
                  <div className="serviceCol">System observability</div>
                </div>
                <div className="serviceRow">
                  <div className="serviceCol"><strong>CloudFront</strong></div>
                  <div className="serviceCol">Global CDN with TLS 1.2+ enforcement</div>
                  <div className="serviceCol">URS-023</div>
                </div>
                <div className="serviceRow">
                  <div className="serviceCol"><strong>AWS IAM</strong></div>
                  <div className="serviceCol">Fine-grained access control and least privilege</div>
                  <div className="serviceCol">URS-021, URS-022</div>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">3. Frontend Application Design</h2>

              <h3 className="h3">3.1 Technology Stack</h3>
              <ul>
                <li><strong>Framework:</strong> Next.js 16.1.1 with static export (SSG)</li>
                <li><strong>UI Library:</strong> React 19.0.0</li>
                <li><strong>Language:</strong> JavaScript (ES2022)</li>
                <li><strong>Styling:</strong> CSS-in-JS (styled-jsx)</li>
                <li><strong>Deployment:</strong> S3 static hosting + CloudFront</li>
              </ul>

              <h3 className="h3">3.2 Page Structure</h3>
              <div className="codeBlock">
                <div className="codeTitle">Application Pages</div>
                <pre>{`/life-sciences/app/
  ├── login.js              # Cognito Hosted UI redirect handler
  ├── index.js              # Role selection (Submitter / Approver)
  ├── upload.js             # Document upload interface (Submitter)
  ├── submissions.js        # Submitted documents list (Submitter)
  ├── documents/
  │   ├── index.js          # All documents list
  │   └── [id].js           # Document detail + audit trail
  └── approval/
      ├── index.js          # Approval workflow hub
      ├── approvals/
      │   └── index.js      # Pending approvals list (Approver)
      └── [id].js           # Approval review page (Approver)`}</pre>
              </div>

              <h3 className="h3">3.3 Authentication Flow</h3>
              <ol>
                <li>User navigates to <code>/life-sciences/app/login</code></li>
                <li>System redirects to Cognito Hosted UI</li>
                <li>User enters email/password, completes MFA challenge (TOTP)</li>
                <li>Cognito redirects back with authorization code</li>
                <li>Frontend exchanges code for JWT tokens (ID token, Access token)</li>
                <li>Tokens stored in sessionStorage (cleared on browser close)</li>
                <li>All API calls include <code>Authorization: Bearer &lt;token&gt;</code></li>
              </ol>
            </section>

            <section className="section">
              <h2 className="h2">4. Backend API Design</h2>

              <h3 className="h3">4.1 Lambda Functions</h3>
              <div className="apiTable">
                <div className="apiRow apiHeader">
                  <div className="apiCol">Function Name</div>
                  <div className="apiCol">HTTP Method</div>
                  <div className="apiCol">Purpose</div>
                  <div className="apiCol">URS</div>
                </div>
                <div className="apiRow">
                  <div className="apiCol"><code>upload-init</code></div>
                  <div className="apiCol">POST</div>
                  <div className="apiCol">Generate pre-signed S3 URL for document upload</div>
                  <div className="apiCol">URS-001</div>
                </div>
                <div className="apiRow">
                  <div className="apiCol"><code>submit</code></div>
                  <div className="apiCol">POST</div>
                  <div className="apiCol">Record document submission with metadata + audit</div>
                  <div className="apiCol">URS-002, URS-003, URS-004, URS-030</div>
                </div>
                <div className="apiRow">
                  <div className="apiCol"><code>documents-list</code></div>
                  <div className="apiCol">GET</div>
                  <div className="apiCol">Retrieve document list (filtered by role)</div>
                  <div className="apiCol">URS-010, URS-011</div>
                </div>
                <div className="apiRow">
                  <div className="apiCol"><code>download</code></div>
                  <div className="apiCol">GET</div>
                  <div className="apiCol">Generate pre-signed URL for document download</div>
                  <div className="apiCol">URS-012</div>
                </div>
                <div className="apiRow">
                  <div className="apiCol"><code>approve</code></div>
                  <div className="apiCol">POST</div>
                  <div className="apiCol">Approve document + create audit record</div>
                  <div className="apiCol">URS-013, URS-014, URS-031</div>
                </div>
                <div className="apiRow">
                  <div className="apiCol"><code>reject</code></div>
                  <div className="apiCol">POST</div>
                  <div className="apiCol">Reject document + create audit record</div>
                  <div className="apiCol">URS-013, URS-014, URS-031</div>
                </div>
                <div className="apiRow">
                  <div className="apiCol"><code>document-audit</code></div>
                  <div className="apiCol">GET</div>
                  <div className="apiCol">Retrieve complete audit trail for a document</div>
                  <div className="apiCol">URS-034</div>
                </div>
                <div className="apiRow">
                  <div className="apiCol"><code>approvals-pending</code></div>
                  <div className="apiCol">GET</div>
                  <div className="apiCol">List documents pending approval</div>
                  <div className="apiCol">URS-010</div>
                </div>
              </div>

              <h3 className="h3">4.2 API Authorization</h3>
              <p>All API endpoints validate JWT tokens:</p>
              <div className="codeBlock">
                <div className="codeTitle">Authorization Flow</div>
                <pre>{`1. API Gateway receives request with Authorization header
2. JWT Authorizer validates token signature against Cognito JWKS
3. Authorizer extracts user claims: sub, email, cognito:groups
4. Lambda receives validated event.requestContext.authorizer.claims
5. Lambda enforces role-based access (Submitter / Approver)`}</pre>
              </div>

              <h3 className="h3">4.3 Error Handling</h3>
              <p>All Lambda functions return standardized error responses:</p>
              <div className="codeBlock">
                <pre>{`{
  "statusCode": 400 | 401 | 403 | 500,
  "body": {
    "error": "Error message for client display",
    "details": "Additional context (dev/qa only)"
  }
}`}</pre>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">5. Data Models</h2>

              <h3 className="h3">5.1 DynamoDB - Documents Table</h3>
              <div className="codeBlock">
                <div className="codeTitle">Table: vdc-documents-dev</div>
                <pre>{`{
  "documentId": "doc_1234567890",           // Partition Key (PK)
  "filename": "protocol_v2.pdf",
  "submittedBy": "user@example.com",
  "submittedAt": "2025-01-10T14:32:18Z",    // ISO 8601 UTC
  "fileHash": "sha256:abc123...",           // SHA-256 integrity hash
  "status": "pending | approved | rejected",
  "s3Key": "documents/doc_1234567890.pdf",
  "approvedBy": "approver@example.com",     // If approved
  "approvedAt": "2025-01-10T15:45:22Z",     // If approved
  "rejectedBy": "approver@example.com",     // If rejected
  "rejectedAt": "2025-01-10T16:12:05Z"      // If rejected
}`}</pre>
              </div>

              <h3 className="h3">5.2 DynamoDB - Audit Table</h3>
              <div className="codeBlock">
                <div className="codeTitle">Table: vdc-audit-dev</div>
                <pre>{`{
  "auditId": "audit_1234567890",           // Partition Key (PK)
  "documentId": "doc_1234567890",          // GSI for querying by document
  "timestamp": "2025-01-10T14:32:18Z",     // Sort Key (SK) - ISO 8601
  "action": "SUBMIT | APPROVE | REJECT | DOWNLOAD",
  "userId": "user@example.com",            // Cognito sub claim
  "userEmail": "user@example.com",
  "ipAddress": "203.0.113.42",             // Source IP
  "userAgent": "Mozilla/5.0...",
  "outcome": "success | failure",
  "details": {                              // Action-specific metadata
    "filename": "protocol_v2.pdf",
    "fileHash": "sha256:abc123..."
  }
}`}</pre>
              </div>

              <p><strong>Immutability:</strong> IAM policies deny <code>dynamodb:DeleteItem</code> and <code>dynamodb:UpdateItem</code> on audit table. Only <code>PutItem</code> and <code>Query</code> allowed.</p>

              <h3 className="h3">5.3 S3 - Document Storage</h3>
              <div className="codeBlock">
                <div className="codeTitle">Bucket: vdc-documents-dev</div>
                <pre>{`Configuration:
  - Versioning: Enabled
  - Encryption: SSE-S3 (AES-256)
  - Public Access: Blocked
  - Lifecycle: Retain all versions (no deletion)
  
Object Key Format:
  documents/{documentId}.{extension}
  
Example:
  documents/doc_1234567890.pdf`}</pre>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">6. Security Implementation</h2>

              <h3 className="h3">6.1 Encryption</h3>
              <div className="secTable">
                <div className="secRow secHeader">
                  <div className="secCol">Layer</div>
                  <div className="secCol">Implementation</div>
                  <div className="secCol">URS</div>
                </div>
                <div className="secRow">
                  <div className="secCol">Data in Transit</div>
                  <div className="secCol">TLS 1.2+ enforced on CloudFront and API Gateway</div>
                  <div className="secCol">URS-023</div>
                </div>
                <div className="secRow">
                  <div className="secCol">Data at Rest (S3)</div>
                  <div className="secCol">SSE-S3 (AES-256) automatic encryption</div>
                  <div className="secCol">URS-023</div>
                </div>
                <div className="secRow">
                  <div className="secCol">Data at Rest (DynamoDB)</div>
                  <div className="secCol">AWS-managed encryption at rest</div>
                  <div className="secCol">URS-023</div>
                </div>
              </div>

              <h3 className="h3">6.2 Role-Based Access Control (RBAC)</h3>
              <p>Cognito groups enforce role separation:</p>
              <div className="codeBlock">
                <pre>{`Submitter Group:
  - Can: Upload documents, view own submissions
  - Cannot: Approve/reject any documents
  
Approver Group:
  - Can: View pending approvals, approve/reject documents
  - Cannot: Approve own submissions (enforced in Lambda)
  
Implementation:
  - Cognito group membership in JWT token
  - Lambda checks cognito:groups claim
  - Self-approval prevented: submittedBy !== currentUser`}</pre>
              </div>

              <h3 className="h3">6.3 IAM Least Privilege</h3>
              <p>Each Lambda function has minimal IAM permissions:</p>
              <ul>
                <li><code>upload-init</code>: <code>s3:PutObject</code> only</li>
                <li><code>submit</code>: <code>dynamodb:PutItem</code> (documents + audit tables)</li>
                <li><code>approve/reject</code>: <code>dynamodb:UpdateItem</code> (documents), <code>PutItem</code> (audit)</li>
                <li><code>download</code>: <code>s3:GetObject</code> with pre-signed URL (5 min expiry)</li>
                <li>All: <code>logs:CreateLogStream</code>, <code>logs:PutLogEvents</code></li>
              </ul>
            </section>

            <section className="section">
              <h2 className="h2">7. Audit Trail Implementation</h2>

              <h3 className="h3">7.1 Audit Event Capture</h3>
              <p>Every significant action triggers audit log creation:</p>
              <div className="codeBlock">
                <pre>{`async function createAuditLog(event) {
  const auditRecord = {
    auditId: generateId('audit'),
    documentId: event.documentId,
    timestamp: new Date().toISOString(),
    action: event.action,                // SUBMIT, APPROVE, REJECT, DOWNLOAD
    userId: event.userContext.sub,
    userEmail: event.userContext.email,
    ipAddress: event.requestContext.http.sourceIp,
    userAgent: event.requestContext.http.userAgent,
    outcome: 'success',
    details: event.details
  };
  
  await dynamodb.put({
    TableName: 'vdc-audit-dev',
    Item: auditRecord
  });
}`}</pre>
              </div>

              <h3 className="h3">7.2 Audit Trail Retrieval</h3>
              <p>The <code>document-audit</code> Lambda function queries audit logs by documentId GSI:</p>
              <div className="codeBlock">
                <pre>{`GET /api/documents/{documentId}/audit

Response:
{
  "documentId": "doc_1234567890",
  "auditTrail": [
    {
      "timestamp": "2025-01-10T14:32:18Z",
      "action": "SUBMIT",
      "userId": "submitter@example.com",
      "details": { "filename": "protocol_v2.pdf", "hash": "sha256:..." }
    },
    {
      "timestamp": "2025-01-10T15:45:22Z",
      "action": "APPROVE",
      "userId": "approver@example.com",
      "ipAddress": "203.0.113.42"
    }
  ]
}`}</pre>
              </div>

              <h3 className="h3">7.3 ALCOA+ Compliance</h3>
              <div className="alcTable">
                <div className="alcRow alcHeader">
                  <div className="alcPrinciple">Principle</div>
                  <div className="alcImpl">Implementation</div>
                  <div className="alcURS">URS</div>
                </div>
                <div className="alcRow">
                  <div className="alcPrinciple">Attributable</div>
                  <div className="alcImpl">Cognito sub + email in every audit record</div>
                  <div className="alcURS">URS-040</div>
                </div>
                <div className="alcRow">
                  <div className="alcPrinciple">Legible</div>
                  <div className="alcImpl">UTF-8 encoded, human-readable JSON</div>
                  <div className="alcURS">URS-041</div>
                </div>
                <div className="alcRow">
                  <div className="alcPrinciple">Contemporaneous</div>
                  <div className="alcImpl">ISO 8601 timestamp captured at action time</div>
                  <div className="alcURS">URS-042</div>
                </div>
                <div className="alcRow">
                  <div className="alcPrinciple">Original</div>
                  <div className="alcImpl">S3 versioning preserves original uploads</div>
                  <div className="alcURS">URS-043</div>
                </div>
                <div className="alcRow">
                  <div className="alcPrinciple">Accurate</div>
                  <div className="alcImpl">SHA-256 hash verification on submit</div>
                  <div className="alcURS">URS-044</div>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">8. Deployment Architecture</h2>

              <h3 className="h3">8.1 Infrastructure as Code</h3>
              <p>All AWS resources deployed via CloudFormation:</p>
              <ul>
                <li><code>cloudformation/vdc-infrastructure.yaml</code> - S3, DynamoDB, Cognito, IAM</li>
                <li><code>cloudformation/vdc-api.yaml</code> - API Gateway, Lambda functions</li>
                <li>Stack naming: <code>vdc-{"{"}env{"}"}</code> where env = dev | prod</li>
              </ul>

              <h3 className="h3">8.2 Environment Separation</h3>
              <div className="envTable">
                <div className="envRow envHeader">
                  <div className="envCol">Environment</div>
                  <div className="envCol">Purpose</div>
                  <div className="envCol">Resources</div>
                </div>
                <div className="envRow">
                  <div className="envCol"><strong>DEV</strong></div>
                  <div className="envCol">Development and testing (validated)</div>
                  <div className="envCol">Separate S3, DynamoDB, Cognito, API Gateway</div>
                </div>
                <div className="envRow">
                  <div className="envCol"><strong>PROD</strong></div>
                  <div className="envCol">Production demo (publicly accessible)</div>
                  <div className="envCol">Separate S3, DynamoDB, Cognito, API Gateway</div>
                </div>
              </div>

              <h3 className="h3">8.3 Deployment Process</h3>
              <ol>
                <li>Build Next.js static export: <code>npm run build</code></li>
                <li>Deploy CloudFormation stacks (infrastructure + API)</li>
                <li>Deploy Lambda function code via CloudFormation</li>
                <li>Upload static files to S3</li>
                <li>Invalidate CloudFront cache</li>
                <li>Execute smoke tests (IQ protocol)</li>
              </ol>
            </section>

            <section className="section">
              <h2 className="h2">9. Monitoring & Observability</h2>

              <h3 className="h3">9.1 CloudWatch Logs</h3>
              <ul>
                <li>All Lambda functions log to CloudWatch Logs</li>
                <li>Log retention: 30 days</li>
                <li>Log format: JSON structured logs with timestamp, level, message</li>
              </ul>

              <h3 className="h3">9.2 Metrics</h3>
              <ul>
                <li>Lambda invocation count, duration, errors (automatic)</li>
                <li>API Gateway request count, latency, 4xx/5xx errors</li>
                <li>DynamoDB consumed read/write capacity units</li>
              </ul>
            </section>

            <section className="section">
              <h2 className="h2">10. Testing Strategy</h2>
              <p>See <Link href="/life-sciences/docs/iq-oq-pq" className="inlineLink">IQ/OQ/PQ Results</Link> for detailed test execution evidence.</p>

              <h3 className="h3">10.1 Installation Qualification (IQ)</h3>
              <ul>
                <li>Verify AWS resource creation via CloudFormation</li>
                <li>Confirm encryption settings (S3, DynamoDB)</li>
                <li>Validate IAM policies and least privilege</li>
                <li>Verify network configuration (VPC, security groups - N/A for serverless)</li>
              </ul>

              <h3 className="h3">10.2 Operational Qualification (OQ)</h3>
              <ul>
                <li>Test all Lambda functions independently</li>
                <li>Verify API Gateway authorization</li>
                <li>Test error handling and edge cases</li>
                <li>Validate audit log creation</li>
              </ul>

              <h3 className="h3">10.3 Performance Qualification (PQ)</h3>
              <ul>
                <li>End-to-end workflow testing (Submitter → Approver)</li>
                <li>Role-based access validation</li>
                <li>Audit trail completeness verification</li>
                <li>Data integrity testing (hash verification)</li>
              </ul>
            </section>

            <section className="section">
              <h2 className="h2">11. Approval</h2>
              <div className="approvalTable">
                <div className="approvalRow">
                  <div className="approvalRole">System Architect</div>
                  <div className="approvalName">William O''Connell</div>
                  <div className="approvalDate">January 2025</div>
                </div>
                <div className="approvalRow">
                  <div className="approvalRole">Quality Assurance</div>
                  <div className="approvalName">William O''Connell</div>
                  <div className="approvalDate">January 2025</div>
                </div>
              </div>
            </section>

            <div className="docNav">
              <Link href="/life-sciences/docs/urs" className="navBtn">← Previous: URS</Link>
              <Link href="/life-sciences/docs/traceability-matrix" className="navBtn">Next: Traceability Matrix →</Link>
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
          ul, ol { margin: 16px 0; padding-left: 28px; }
          li { margin-bottom: 12px; line-height: 1.7; color: rgba(255,255,255,0.85); }
          code { font-family: 'Courier New', monospace; background: rgba(139,92,246,0.15); padding: 2px 6px; border-radius: 4px; color: rgba(167,139,250,0.95); font-size: 0.9em; }
          .inlineLink { color: rgba(139,92,246,0.9); text-decoration: underline; }
          .inlineLink:hover { color: rgba(167,139,250,0.9); }
          .codeBlock { margin: 24px 0; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; overflow: hidden; }
          .codeTitle { padding: 12px 16px; background: rgba(139,92,246,0.15); font-weight: 700; font-size: 0.9rem; color: rgba(255,255,255,0.95); border-bottom: 1px solid rgba(255,255,255,0.1); }
          pre { padding: 16px; margin: 0; font-family: 'Courier New', monospace; font-size: 0.85rem; line-height: 1.6; color: rgba(255,255,255,0.9); overflow-x: auto; }
          .archDiagram { margin: 32px 0; }
          .archLayer { margin-bottom: 24px; }
          .archTitle { font-weight: 700; font-size: 1.1rem; margin-bottom: 12px; color: rgba(139,92,246,0.9); }
          .archComponents { display: flex; gap: 12px; flex-wrap: wrap; }
          .archBox { padding: 12px 16px; background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.3); border-radius: 8px; font-size: 0.9rem; color: rgba(255,255,255,0.9); }
          .serviceTable, .apiTable, .secTable, .envTable, .alcTable { margin: 24px 0; }
          .serviceRow, .apiRow, .secRow, .envRow, .alcRow { display: grid; grid-template-columns: 200px 1fr 150px; gap: 16px; padding: 12px 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.1); }
          .apiRow { grid-template-columns: 180px 80px 1fr 100px; }
          .alcRow { grid-template-columns: 180px 1fr 100px; }
          .serviceHeader, .apiHeader, .secHeader, .envHeader, .alcHeader { background: rgba(59,130,246,0.15); font-weight: 700; color: #fff; }
          .serviceCol, .apiCol, .secCol, .envCol, .alcCol { color: rgba(255,255,255,0.85); }
          .approvalTable { margin: 24px 0; }
          .approvalRow { display: grid; grid-template-columns: 200px 1fr 150px; gap: 16px; padding: 12px 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.1); }
          .approvalRole { font-weight: 600; color: rgba(255,255,255,0.9); }
          .approvalName { color: rgba(255,255,255,0.85); }
          .approvalDate { color: rgba(255,255,255,0.7); }
          .docNav { display: flex; justify-content: space-between; margin-top: 64px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); }
          .navBtn { padding: 12px 24px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 600; }
          .navBtn:hover { background: rgba(139,92,246,0.2); border-color: rgba(139,92,246,0.4); }
          @media (max-width: 768px) {
            .serviceRow, .apiRow, .secRow, .envRow, .alcRow, .approvalRow { grid-template-columns: 1fr; }
            .docNav { flex-direction: column; gap: 12px; }
          }
        `}</style>
      </div>
    </>
  );
}

