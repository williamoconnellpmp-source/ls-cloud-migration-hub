import Link from "next/link";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>William O’Connell | AWS TPM | Life Sciences Cloud Transformations</title>
        <meta
          name="description"
          content="AWS Technical Program Manager focused on regulated Life Sciences cloud transformations. AWS Solutions Architect – Associate. GxP / 21 CFR Part 11 delivery. Applied AI POC."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page">
        {/* Background */}
        <div className="heroBg" aria-hidden="true" />

        {/* Header */}
        <header className="header">
          <div className="container headerInner">
            <div className="brand">
              <div className="brandName">William O’Connell</div>
              <div className="brandSub">
                AWS Technical Program Manager • Life Sciences Cloud
              </div>
            </div>

            <nav className="nav" aria-label="Primary navigation">
              <Link href="/life-sciences" className="navLink">
                Life Sciences Hub
              </Link>
              <span className="navSep">·</span>
              <Link href="/resume" className="navLink">
                Resume
              </Link>
              <span className="navSep">·</span>
              <Link href="/empathy-filter" className="navLink">
                Empathy Filter
              </Link>
              <span className="navSep">·</span>
              <a
                href="https://www.linkedin.com/in/williamoconnell/"
                target="_blank"
                rel="noopener noreferrer"
                className="navLink navCta"
              >
                LinkedIn
              </a>
            </nav>
          </div>
        </header>

        <main>
          {/* Hero */}
          <section className="hero">
            <div className="container">
              <h1 className="h1">
                <span className="h1Line1">AWS Technical Program Manager</span>
                <span className="h1Line2">Life Sciences Cloud Transformations</span>
              </h1>

              <p className="lead">
                I lead regulated, cross-functional programs that move complex platforms to the cloud—safely,
                predictably, and with evidence.
              </p>

              <p className="lead2">
                GxP / 21 CFR Part 11 delivery background, now AWS-certified and current.
              </p>
            </div>
          </section>

          {/* Cards (wired) */}
          <section className="cardsSection" aria-label="Credibility highlights">
            <div className="container cardsGrid">
              {/* 1) AWS Certified -> Credly */}
              <a
                href="https://www.credly.com/badges/ced60bdc-c683-4a9a-b9e6-60bcb086fa70/linked_in_profile"
                target="_blank"
                rel="noopener noreferrer"
                className="card"
              >
                <div className="cardTitle">AWS Certified</div>
                <div className="cardText">Solutions Architect – Associate</div>
                <div className="cardHint">View badge →</div>
              </a>

              {/* 2) Regulated Delivery -> Migration Hub (evidence) */}
              <Link href="/life-sciences/evidence" className="card">
                <div className="cardTitle">Regulated Delivery</div>
                <div className="cardText">GxP • 21 CFR Part 11 • CSV</div>
                <div className="cardHint">Open evidence →</div>
              </Link>

              {/* 3) TPM Signal -> Resume */}
              <Link href="/resume" className="card">
                <div className="cardTitle">TPM Signal</div>
                <div className="cardText">Programs, Roadmaps, Risks, Governance</div>
                <div className="cardHint">Open resume →</div>
              </Link>

              {/* 4) Applied AI -> Empathy Filter */}
              <Link href="/empathy-filter" className="card">
                <div className="cardTitle">Applied AI</div>
                <div className="cardText">Empathy Filter POC</div>
                <div className="cardHint">Open demo →</div>
              </Link>
            </div>
          </section>
        </main>

        <style jsx>{`
          .page {
            min-height: 100vh;
            position: relative;
            background: #061428;
            color: rgba(255, 255, 255, 0.92);
          }

          .heroBg {
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(
                180deg,
                rgba(5, 12, 22, 0.96) 0%,
                rgba(5, 12, 22, 0.88) 30%,
                rgba(5, 12, 22, 0.70) 55%,
                rgba(5, 12, 22, 0.45) 75%,
                rgba(5, 12, 22, 0.30) 100%
              ),
              url("/images/heroes/landing-gxp.png");
            background-size: cover;
            background-position: 70% center;
          }

          .container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 22px;
          }

          /* Header */
          .header {
            position: relative;
            z-index: 3;
            padding: 14px 0;
          }

          .headerInner {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .brandName {
            font-weight: 750;
          }

          .brandSub {
            font-size: 0.95rem;
            color: rgba(255, 255, 255, 0.68);
          }

          .nav {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.95rem;
          }

          .navLink {
            color: rgba(255, 255, 255, 0.86);
            text-decoration: none;
            padding: 6px 8px;
            border-radius: 10px;
          }

          .navLink:hover {
            background: rgba(255, 255, 255, 0.08);
          }

          .navSep {
            color: rgba(255, 255, 255, 0.45);
          }

          .navCta {
            border: 1px solid rgba(255, 255, 255, 0.16);
          }

          /* Hero */
          .hero {
            position: relative;
            z-index: 2;
            padding: 36px 0 0;
          }

          .h1 {
            margin: 0 0 12px;
            font-weight: 850;
            letter-spacing: -0.03em;
          }

          .h1Line1 {
            display: block;
            white-space: nowrap;
            font-size: clamp(2.15rem, 3.1vw, 3rem);
            color: #fff;
          }

          .h1Line2 {
            display: block;
            white-space: nowrap;
            font-size: clamp(1.8rem, 2.4vw, 2.35rem);
            margin-top: 2px;
            color: #fff;
          }

          .lead,
          .lead2 {
            font-size: 1.05rem;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.82);
            max-width: 72ch;
          }

          .lead {
            margin-bottom: 10px;
          }

          /* Cards */
          .cardsSection {
            position: relative;
            z-index: 2;
            margin-top: 56px;
            padding-bottom: 40px;
          }

          .cardsGrid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }

          .card {
            padding: 20px;
            border-radius: 16px;
            background: rgba(7, 14, 24, 0.62);
            border: 1px solid rgba(255, 255, 255, 0.14);
            backdrop-filter: blur(10px);
            text-align: center;
            min-height: 120px;

            text-decoration: none;
            color: inherit;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .card:hover {
            border-color: rgba(255, 255, 255, 0.22);
            background: rgba(7, 14, 24, 0.70);
          }

          .cardTitle {
            font-weight: 800;
            margin-bottom: 8px;
          }

          .cardText {
            color: rgba(255, 255, 255, 0.72);
            line-height: 1.45;
          }

          .cardHint {
            margin-top: 10px;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.62);
            font-weight: 750;
          }

          @media (max-width: 980px) {
            .cardsGrid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 560px) {
            .cardsGrid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </>
  );
}
