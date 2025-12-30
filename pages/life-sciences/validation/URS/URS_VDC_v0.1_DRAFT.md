User Requirements Specification (URS)
Product Name: Validated Document Control (VDC)
 Version: 0.1 (Draft)
 Status: Draft – Not Approved
 Intended Environment: AWS Cloud (Serverless)
 Prepared By: William O’Connell
 Date: (Dec 28th)
> Status: Draft (Not Approved)  
> Controlled: No  
> Intended Environment: Dev/Test only  

1. Purpose
The purpose of this document is to define the user requirements for the Validated Document Control (VDC) system.
 VDC is a serverless, cloud-based application intended to demonstrate how regulated Life Sciences workloads can implement document approval, electronic signatures, and audit trails on AWS in alignment with 21 CFR Part 11 principles.
This URS defines functional, security, and compliance-related requirements that will be verified through validation testing (IQ/OQ/PQ).

2. Scope
The VDC system supports:
Secure document upload


Role-based approval workflows


Electronic signature capture


Immutable audit trails


Controlled promotion of approved documents


The system is intended as a reference implementation / proof of concept, not as a commercial document management system.

3. Intended Use
VDC is intended to:
Demonstrate compliant document approval workflows on AWS


Serve as a learning and reference tool for Life Sciences cloud migrations


Illustrate how serverless architectures can reduce validation scope through managed services



4. User Roles
The system shall support the following roles:
Role
Description
Uploader
Uploads documents and submits them for approval
Approver
Reviews and approves/rejects documents (MFA required)
Auditor (Read-only)
Views documents, audit trails, and reports
System Administrator
System configuration only; not used for routine operations


5. Functional Requirements
5.1 Authentication & Access Control
URS-001 The system shall require authenticated login for all users.
 URS-002 The system shall restrict access based on assigned user roles.
 URS-003 The Approver role shall require multi-factor authentication (MFA).
 URS-004 The system shall prevent users from approving documents they uploaded.

5.2 Document Management
URS-010 The system shall allow an Uploader to upload a document with metadata (e.g., title, description).
 URS-011 The system shall store uploaded documents in a secure repository with versioning enabled.
 URS-012 Each uploaded document shall be assigned a unique document identifier.

5.3 Workflow Management
URS-020 The system shall support document statuses: Draft, Submitted, Approved, Rejected, Released.
 URS-021 Upon submission, the system shall notify the Approver of a pending approval request.
 URS-022 The Approver shall be able to approve or reject submitted documents.
 URS-023 The system shall record the outcome and timestamp of approval or rejection actions.

5.4 Electronic Signatures
URS-030 The system shall capture an electronic signature when an Uploader submits a document.
 URS-031 The system shall capture an electronic signature when an Approver approves or rejects a document.
 URS-032 Each electronic signature shall record:
Signer identity


Timestamp (UTC)


Meaning of the signature (e.g., “Submitted”, “Approved”)


Associated document and version
 URS-033 Electronic signatures shall be cryptographically bound to the signed record (e.g., via document hash).


URS-034 The system shall require the Approver to authenticate with MFA prior to applying an approval signature.
5.5 Audit Trail
URS-040 The system shall generate a computer-generated, time-stamped audit trail for all regulated actions.
 URS-041 Audit trail records shall be immutable and append-only.
 URS-042 The system shall provide audit reports by document and by date range. 
URS-043 The system shall prevent deletion or overwrite of submitted/approved documents.
URS-044 The system shall store the S3 object version ID associated with any submitted/approved document.


URS-045 The system shall store a cryptographic hash value binding the eSignature to the exact document version.

5.6 Security & Monitoring
URS-050 The system shall log security-relevant events (authentication failures, authorization failures).
 URS-051 The system shall monitor application and infrastructure health.
 URS-052 Production deployments shall be restricted to an approved CI/CD pipeline using least-privilege roles.

5.7 Data Retention
URS-060 The system shall retain documents and audit records for a configurable retention period.
 URS-061 Retention settings shall be documented and enforced consistently.

6. Assumptions & Constraints
The system is built using AWS managed serverless services.


Validation scope is limited to application logic, configuration, and intended use.


Infrastructure and platform services are covered by AWS shared responsibility documentation.



7. Validation
This system will be validated using:
Installation Qualification (IQ)


Operational Qualification (OQ)


Performance Qualification (PQ)


Traceability between requirements, tests, and evidence will be maintained.








