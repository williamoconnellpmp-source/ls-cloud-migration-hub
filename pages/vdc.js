import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

function CopyIconButton({ value, ariaLabel = "Copy", className = "" }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 900);
    } catch {
      // If clipboard is blocked, do nothing (still readable + selectable)
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={ariaLabel}
      title={copied ? "Copied" : "Copy"}
      className={
        "inline-flex items-center justify-center w-7 h-7 rounded-md border border-slate-700 bg-slate-900/40 hover:bg-slate-900/70 transition text-slate-200 " +
        className
      }
    >
      {/* copy icon */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        className="opacity-90"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 7V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M5 8h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function VDCDemoPage() {
  // DEV login URL you provided (opens in new tab)
  const VDC_LOGIN_URL =
    "https://us-west-2msxjhh4dx.auth.us-west-2.amazoncognito.com/login?client_id=34k1l9ipn52cksnj1gesbe2fto&response_type=code&scope=openid+email+profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flife-sciences%2Fapp%2Flogin";

  // Demo credentials (one Submitter + one Approver shown inline)
  const SUBMITTER_EMAIL = "williamoconnellpmp+submitter1@gmail.com";
  const APPROVER_EMAIL = "williamoconnellpmp+approver1@gmail.com";
  const PASSWORD = "Password123!";

  return (
    <>
      <Head>
        <title>VDC Demo — Validated Document Control</title>
        <meta
          name="description"
          content="Validated Document Control (VDC) demo on AWS showing regulated document workflows with audit-ready evidence using serverless infrastructure."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* MATCH Empathy Filter layout + colors */}
      <main className="min-h-screen bg-slate-950 text-slate-50 px-6 py-10">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Top nav (clean, no extra section below) */}
          <header className="text-sm text-slate-300">
            <nav className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <Link href="/" className="underline hover:text-indigo-300">
                Home
              </Link>
              <span className="text-slate-600">|</span>
              <Link
                href="/life-sciences/evidence"
                className="underline hover:text-indigo-300"
              >
                Architecture &amp; GxP Evidence / Artifacts
              </Link>
              <span className="text-slate-600">|</span>
              <Link
                href="/life-sciences/resources"
                className="underline hover:text-indigo-300"
              >
                Supporting Documentation
              </Link>
            </nav>
          </header>

          {/* Hero */}
          <section className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Why a Validated Document Control Demo?
            </h1>

            <p className="text-slate-300 text-sm sm:text-base">
              A production-style AWS environment showing how regulated document workflows can be designed with
              audit-ready evidence using serverless infrastructure.
            </p>

            {/* Main box (same sizing + styling as Empathy Filter) */}
            <div className="mt-4 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 text-sm sm:text-base leading-relaxed">
              <p>
                In regulated Life Sciences environments, teams must be able to show who performed an action,
                when it occurred, under which role, and what controls enforced it — and produce that evidence on
                demand.
              </p>

              <p>
                This VDC demo is a working example using native AWS services. It demonstrates role-based access,
                MFA-enforced approvals, controlled document access, immutable audit trails, and electronic
                signature intent — implemented as a real system, not documentation.
              </p>

              <p>
                <span className="font-semibold">How to use it:</span>{" "}
                Sign in as a Submitter{" "}
                <span className="whitespace-nowrap">
                  (
                  <span className="text-slate-300">Email </span>
                  <span className="text-indigo-300 underline underline-offset-2">
                    {SUBMITTER_EMAIL}
                  </span>{" "}
                  <CopyIconButton value={SUBMITTER_EMAIL} ariaLabel="Copy submitter email" />
                  <span className="text-slate-500 mx-2">·</span>
                  <span className="text-slate-300">Password </span>
                  <span className="text-indigo-300 underline underline-offset-2">
                    {PASSWORD}
                  </span>{" "}
                  <CopyIconButton value={PASSWORD} ariaLabel="Copy password" />)
                </span>
                , submit a document, then sign in as an Approver{" "}
                <span className="whitespace-nowrap">
                  (
                  <span className="text-slate-300">Email </span>
                  <span className="text-indigo-300 underline underline-offset-2">
                    {APPROVER_EMAIL}
                  </span>{" "}
                  <CopyIconButton value={APPROVER_EMAIL} ariaLabel="Copy approver email" />
                  <span className="text-slate-500 mx-2">·</span>
                  <span className="text-slate-300">Password </span>
                  <span className="text-indigo-300 underline underline-offset-2">
                    {PASSWORD}
                  </span>{" "}
                  <CopyIconButton value={PASSWORD} ariaLabel="Copy password again" />)
                </span>{" "}
                to approve or reject. Please sign out before switching users.
              </p>

              <p className="text-slate-400 text-xs sm:text-sm">
                Built on AWS using Amazon Cognito (Hosted UI), API Gateway (HTTP APIs), AWS Lambda, Amazon
                DynamoDB, Amazon S3, AWS IAM, and AWS CloudFormation.
              </p>
            </div>
          </section>

          {/* CTA box (same styling as Empathy Filter CTA) */}
          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium">Want to see it in action?</h2>
              <p className="mt-1 text-slate-300 text-sm">
                Open the demo, copy the Submitter or Approver email above with password{" "}
                <span className="text-indigo-300 underline underline-offset-2">{PASSWORD}</span>, run the
                Submitter → Approver flow, and sign out before changing users.
              </p>
            </div>

            <a
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-500 px-5 py-2 text-sm font-medium whitespace-nowrap"
              href={VDC_LOGIN_URL}
              target="_blank"
              rel="noreferrer"
            >
              Go to the Demo →
            </a>
          </section>

          {/* Footer (simple, same tone) */}
          <footer className="text-xs text-slate-500 pt-2 border-t border-slate-900/60">
            <Link href="/" className="underline hover:text-indigo-300">
              ← Back to home
            </Link>
          </footer>
        </div>
      </main>
    </>
  );
}
