import Head from "next/head";
import Link from "next/link";

export default function ResumePage() {
  return (
    <>
      <Head>
        <title>Resume - William O'Connell | AWS TPM</title>
        <meta name="description" content="William O'Connell - AWS Technical Program Manager specializing in Life Sciences cloud transformations"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>

      <div className="page">
        <div className="heroBg" aria-hidden="true"/>
        
        <header className="topHeader">
          <div className="headerContainer">
            <Link href="/" className="homeLink">Home</Link>
            <div className="headerDivider">|</div>
            <div className="headerInfo">
              <span className="headerName">William O'Connell</span>
              <span className="headerSep">|</span>
              <span>Seattle, WA</span>
              <span className="headerSep">|</span>
              <span>(206) 551-5524</span>
              <span className="headerSep">|</span>
              <a href="mailto:WilliamOConnellPMP@gmail.com" className="headerLink">WilliamOConnellPMP@gmail.com</a>
              <span className="headerSep">|</span>
              <a href="https://www.linkedin.com/in/williamoconnell/" target="_blank" rel="noopener noreferrer" className="headerLink">LinkedIn</a>
            </div>
          </div>
        </header>
        
        <main className="mainContent">
          <div className="container">
            <div className="heroSection">
              <div className="leftColumn">
                <h1 className="h1">Where Regulated Life Sciences Delivery Meets Hands-On AWS</h1>
                <p className="subtitle">
                  AWS Technical Program Manager with deep Life Sciences expertise. I deliver regulated, cross-functional programs that move complex platforms to the cloud with audit-ready evidence and GxP compliance.
                </p>

                <div className="stats">
                  <div className="stat">
                    <div className="statValue">$100M+</div>
                    <div className="statLabel">Program Value</div>
                  </div>
                  <div className="stat">
                    <div className="statValue">100K+</div>
                    <div className="statLabel">Users Migrated</div>
                  </div>
                  <div className="stat">
                    <div className="statValue">100+</div>
                    <div className="statLabel">Systems Delivered</div>
                  </div>
                  <div className="stat">
                    <div className="statValue">$20M+</div>
                    <div className="statLabel">Annual Savings</div>
                  </div>
                </div>

                <div className="buttons">
                  <Link href="/vdc" className="btn">
                    Open VDC Demo
                  </Link>
                  <a href="https://empathy.williamoconnellpmp.com" target="_blank" rel="noopener noreferrer" className="btn">
                    Open AI Demo
                  </a>
                  <a href="/resume/william-oconnell-resume.pdf" download className="btn">
                    Download Resume
                  </a>
                </div>
              </div>

              <div className="rightColumn">
                <div className="phoneFrame">
                  <div className="phoneScreen">
                    <div className="phoneHeader">
                      <div className="backBtn">← Back</div>
                      <div className="phoneTitle">William O'Connell</div>
                    </div>
                    <div className="phoneContent">
                      <div className="contactSection">
                        <div className="contactLabel">Contact</div>
                        <div className="contactItem">Seattle, WA</div>
                        <div className="contactItem">WilliamOConnellPMP@gmail.com</div>
                        <div className="contactItem">+1 (206) 551-5524</div>
                        <div className="contactItem">WilliamOConnellPMP.com</div>
                        <div className="contactItem">LinkedIn</div>
                        <div className="contactItem">VDC Demo</div>
                        <div className="contactItem">AI Demo</div>
                      </div>
                    </div>
                    <div className="phoneFooter">© 2025 William O'Connell</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <style jsx>{`
          .page {
            min-height: 100vh;
            position: relative;
            background: #0a0f1e;
            color: rgba(255,255,255,0.92);
          }
          .heroBg {
            position: absolute;
            inset: 0;
            background-image: 
              radial-gradient(circle at 20% 50%, rgba(59,130,246,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(139,92,246,0.1) 0%, transparent 50%);
          }
          .topHeader {
            position: relative;
            z-index: 3;
            background: rgba(0,0,0,0.4);
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding: 14px 0;
          }
          .headerContainer {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
            display: flex;
            align-items: center;
            gap: 16px;
            font-size: 0.9rem;
          }
          .homeLink {
            color: rgba(255,255,255,0.9);
            text-decoration: none;
            font-weight: 600;
          }
          .homeLink:hover {
            color: rgba(139,92,246,0.9);
          }
          .headerDivider {
            color: rgba(255,255,255,0.3);
          }
          .headerInfo {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
            color: rgba(255,255,255,0.75);
          }
          .headerName {
            font-weight: 600;
            color: rgba(255,255,255,0.9);
          }
          .headerSep {
            color: rgba(255,255,255,0.3);
          }
          .headerLink {
            color: rgba(255,255,255,0.75);
            text-decoration: none;
          }
          .headerLink:hover {
            color: rgba(139,92,246,0.9);
          }
          .mainContent {
            position: relative;
            z-index: 2;
            padding: 60px 0 80px;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
          }
          .heroSection {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            align-items: center;
          }
          .leftColumn {
            max-width: 600px;
          }
          .h1 {
            font-size: clamp(1.75rem, 3.5vw, 2.4rem);
            font-weight: 800;
            line-height: 1.15;
            margin-bottom: 20px;
            color: #fff;
            letter-spacing: -0.02em;
          }
          .subtitle {
            font-size: 1.1rem;
            line-height: 1.7;
            color: rgba(255,255,255,0.75);
            margin-bottom: 32px;
          }
          .stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-bottom: 32px;
          }
          .stat {
            text-align: center;
          }
          .statValue {
            font-size: 2.2rem;
            font-weight: 800;
            color: #fff;
            margin-bottom: 4px;
          }
          .statLabel {
            font-size: 0.85rem;
            color: rgba(255,255,255,0.6);
          }
          .buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }
          .btn {
            padding: 12px 24px;
            border-radius: 999px;
            font-weight: 600;
            font-size: 0.95rem;
            text-decoration: none;
            transition: all 0.2s;
            display: inline-block;
            background: rgba(255,255,255,0.08);
            color: rgba(255,255,255,0.9);
            border: 1px solid rgba(255,255,255,0.15);
          }
          .btn:hover {
            background: rgba(255,255,255,0.12);
            border-color: rgba(255,255,255,0.25);
          }
          .rightColumn {
            display: flex;
            justify-content: center;
          }
          .phoneFrame {
            width: 300px;
            height: 600px;
            background: #1a1f2e;
            border-radius: 36px;
            padding: 12px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          }
          .phoneScreen {
            width: 100%;
            height: 100%;
            background: #0f1419;
            border-radius: 28px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          .phoneHeader {
            padding: 16px;
            background: rgba(255,255,255,0.03);
            border-bottom: 1px solid rgba(255,255,255,0.1);
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .backBtn {
            color: rgba(255,255,255,0.7);
            font-size: 0.9rem;
          }
          .phoneTitle {
            font-weight: 600;
            font-size: 1rem;
            color: #fff;
          }
          .phoneContent {
            flex: 1;
            padding: 24px 20px;
            overflow: hidden;
          }
          .contactSection {
            background: rgba(255,255,255,0.05);
            border-radius: 12px;
            padding: 16px;
          }
          .contactLabel {
            font-weight: 700;
            font-size: 0.9rem;
            margin-bottom: 12px;
            color: #fff;
          }
          .contactItem {
            font-size: 0.85rem;
            color: rgba(255,255,255,0.75);
            margin-bottom: 8px;
            padding: 8px;
            background: rgba(255,255,255,0.03);
            border-radius: 6px;
          }
          .phoneFooter {
            padding: 12px 20px;
            text-align: center;
            font-size: 0.75rem;
            color: rgba(255,255,255,0.5);
            border-top: 1px solid rgba(255,255,255,0.1);
          }
          @media (max-width: 968px) {
            .heroSection {
              grid-template-columns: 1fr;
              gap: 60px;
            }
            .stats {
              grid-template-columns: repeat(2, 1fr);
            }
            .rightColumn {
              order: -1;
            }
            .headerInfo {
              font-size: 0.8rem;
            }
          }
        `}</style>
      </div>
    </>
  );
}
