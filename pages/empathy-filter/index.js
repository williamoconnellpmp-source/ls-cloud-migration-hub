import Head from "next/head";

export default function EmpathyFilterIndex() {
  return (
    <>
      <Head>
        <title>Empathy Filter | Applied AI in Life Sciences</title>
        <meta
          name="description"
          content="A Life Sciences–inspired proof-of-concept exploring safer, clearer AI interactions in human-sensitive, regulated contexts."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page">
        <section className="container">
          <header className="hero">
            <h1 className="h1">Why an Empathy Filter?</h1>
            <p className="lead">
              A Life Sciences–inspired proof-of-concept exploring safer, clearer AI
              interactions in human-sensitive contexts.
            </p>
          </header>

          <div className="card">
            <p>
              In Life Sciences and healthcare, the same question can land very
              differently depending on who is asking — a patient, a caregiver, a
              clinician, a researcher, or an operations team working under pressure.
              Most AI systems respond as if the user is neutral. People rarely are.
            </p>

            <p>
              The Empathy Filter explores a simple idea:{" "}
              <em>
                what if AI adapted to where the human is coming from — especially in
                regulated, high-stakes environments?
              </em>
            </p>

            <p>
              This demo captures three pieces of context: how you&apos;re feeling, the
              role you want the AI to play, and how you currently feel about AI itself.
              That profile is stored in DynamoDB and used to shape tone, pacing, warmth,
              and depth before the model responds.
            </p>

            <p>
              It&apos;s not a clinical tool and it does not diagnose, treat, or provide
              medical advice. It&apos;s an early exploration of how human context could
              reduce confusion, improve clarity, and strengthen trust — bringing AI{" "}
              <em>to where Life Sciences customers and patients are</em>, rather than
              asking them to meet AI where it is.
            </p>

            <p className="fine">
              Built as a learning project on AWS (API Gateway, Lambda, DynamoDB) with
              Claude on Amazon Bedrock. Please avoid entering any sensitive, personal,
              or confidential information.
            </p>
          </div>

          <div className="cta">
            <div className="ctaText">
              <h2 className="h2">Want to see it in action?</h2>
              <p className="ctaSub">
                This is an early proof-of-concept intended to demonstrate how context and
                user preferences might guide future AI experiences — not to provide
                clinical, diagnostic, or professional guidance.
              </p>
            </div>

            <a
              href="https://empathy-ui-app.vercel.app/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="ctaBtn"
            >
              Go to the Demo →
            </a>
          </div>

          <footer className="footer">
            <div className="footerLeft">
              <a
                href="mailto:WilliamOConnellPMP@gmail.com"
                className="footerLink"
              >
                Provide Feedback
              </a>
            </div>

            <div className="footerRight">
              <span className="footerText">William O&apos;Connell · </span>
              <a
                href="https://www.linkedin.com/in/williamoconnell"
                target="_blank"
                rel="noreferrer"
                className="footerLink"
              >
                LinkedIn
              </a>
            </div>
          </footer>
        </section>
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #061428;
          color: rgba(255, 255, 255, 0.92);
          padding: 44px 0;
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 22px;
        }

        .hero {
          margin-bottom: 18px;
        }

        .h1 {
          margin: 0 0 10px;
          font-weight: 900;
          letter-spacing: -0.02em;
          font-size: clamp(2.1rem, 3.2vw, 3.1rem);
          color: rgba(255, 255, 255, 0.96);
        }

        .lead {
          margin: 0 0 18px;
          color: rgba(255, 255, 255, 0.76);
          max-width: 80ch;
          line-height: 1.6;
          font-size: 1.05rem;
        }

        .card {
          background: rgba(7, 14, 24, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 18px;
          padding: 26px;
          backdrop-filter: blur(10px);
        }

        .card p {
          margin: 0 0 16px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.84);
        }

        .card em {
          font-style: italic;
          color: rgba(255, 255, 255, 0.92);
        }

        .fine {
          margin-top: 10px;
          font-size: 0.92rem;
          color: rgba(255, 255, 255, 0.62) !important;
        }

        .cta {
          margin-top: 22px;
          display: flex;
          gap: 18px;
          align-items: center;
          justify-content: space-between;
          background: rgba(7, 14, 24, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 18px;
          padding: 22px;
          backdrop-filter: blur(10px);
        }

        .h2 {
          margin: 0;
          font-size: 1.15rem;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.95);
        }

        .ctaSub {
          margin: 6px 0 0;
          max-width: 78ch;
          color: rgba(255, 255, 255, 0.74);
          line-height: 1.55;
          font-size: 0.98rem;
        }

        .ctaBtn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          padding: 11px 18px;
          border-radius: 999px;
          background: #5b5cf6;
          color: #fff;
          font-weight: 800;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.14);
        }

        .ctaBtn:hover {
          background: #6667ff;
        }

        .footer {
          margin-top: 26px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.10);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.60);
        }

        .footerLink {
          color: rgba(255, 255, 255, 0.70);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .footerLink:hover {
          color: rgba(255, 255, 255, 0.92);
        }

        .footerText {
          color: rgba(255, 255, 255, 0.60);
        }

        @media (max-width: 820px) {
          .cta {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
}
