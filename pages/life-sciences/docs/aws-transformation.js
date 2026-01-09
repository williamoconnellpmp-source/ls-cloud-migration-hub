import Head from "next/head";
import Link from "next/link";

export default function AWSTransformationPage() {
  return (
    <>
      <Head><title>AWS-Native Transformation | William O''Connell</title></Head>
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
            <h1 className="h1">AWS-Native Transformation</h1>
            <p className="subtitle">Moving beyond lift-and-shift to truly cloud-native architectures</p>

            <section className="section">
              <h2 className="h2">What is AWS-Native?</h2>
              <p>
                Many cloud migrations are "lift-and-shift" - taking on-premise applications and running them on EC2 instances. 
                This gets you to the cloud, but you miss most of the benefits.
              </p>
              <p>
                <strong>AWS-native transformation</strong> means redesigning applications to leverage managed services, 
                serverless architecture, and cloud-native patterns. The result: lower cost, higher reliability, faster innovation.
              </p>

              <div className="comparison">
                <div className="compCol liftshift">
                  <div className="compTitle">Lift-and-Shift</div>
                  <ul>
                    <li>EC2 instances running legacy apps</li>
                    <li>Self-managed databases (Oracle, SQL Server)</li>
                    <li>Manual scaling and patching</li>
                    <li>Traditional 3-tier architecture</li>
                    <li>Same operational burden as on-premise</li>
                  </ul>
                  <div className="compResult">✗ Minimal cloud benefit</div>
                </div>
                <div className="compCol native">
                  <div className="compTitle">AWS-Native</div>
                  <ul>
                    <li>Lambda functions (serverless compute)</li>
                    <li>Managed databases (DynamoDB, Aurora)</li>
                    <li>Auto-scaling, AWS-managed patching</li>
                    <li>Event-driven, microservices architecture</li>
                    <li>Focus on business logic, not infrastructure</li>
                  </ul>
                  <div className="compResult">✓ Full cloud leverage</div>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">VDC System: AWS-Native Example</h2>
              <p>
                The VDC system demonstrates AWS-native architecture:
              </p>

              <div className="archStack">
                <div className="stackLayer frontend">
                  <div className="layerTitle">Frontend</div>
                  <div className="layerTech">Next.js (Static Export) → S3 + CloudFront</div>
                  <div className="layerBenefit">Global CDN, no servers to manage</div>
                </div>
                <div className="stackLayer auth">
                  <div className="layerTitle">Authentication</div>
                  <div className="layerTech">Amazon Cognito</div>
                  <div className="layerBenefit">Managed user pools, MFA, OAuth flows</div>
                </div>
                <div className="stackLayer api">
                  <div className="layerTitle">API</div>
                  <div className="layerTech">API Gateway + Lambda (8 functions)</div>
                  <div className="layerBenefit">Serverless compute, pay-per-use, auto-scaling</div>
                </div>
                <div className="stackLayer data">
                  <div className="layerTitle">Data</div>
                  <div className="layerTech">S3 (documents) + DynamoDB (metadata, audit)</div>
                  <div className="layerBenefit">Managed storage, no database admin</div>
                </div>
              </div>

              <h3 className="h3">Cost Comparison</h3>
              <div className="costComparison">
                <div className="costItem traditional">
                  <div className="costLabel">Traditional (EC2 + RDS)</div>
                  <div className="costValue">~$1,200/month</div>
                  <div className="costDetail">3 EC2 instances + RDS database running 24/7</div>
                </div>
                <div className="costItem native">
                  <div className="costLabel">AWS-Native (Serverless)</div>
                  <div className="costValue">~$50/month</div>
                  <div className="costDetail">Lambda invocations + DynamoDB + S3 storage (pay-per-use)</div>
                </div>
              </div>
              <p className="costSavings">💰 <strong>96% cost reduction</strong> for same functionality</p>
            </section>

            <section className="section">
              <h2 className="h2">Key AWS-Native Patterns</h2>

              <div className="patternsGrid">
                <div className="pattern">
                  <div className="patternTitle">Serverless Compute</div>
                  <p><strong>Use:</strong> Lambda instead of EC2</p>
                  <p><strong>Benefit:</strong> No server management, automatic scaling, pay only for execution time</p>
                  <p><strong>Example:</strong> VDC approval workflow (approve/reject Lambda functions)</p>
                </div>

                <div className="pattern">
                  <div className="patternTitle">Managed Databases</div>
                  <p><strong>Use:</strong> DynamoDB or Aurora instead of self-managed databases</p>
                  <p><strong>Benefit:</strong> No patching, automatic backups, built-in high availability</p>
                  <p><strong>Example:</strong> VDC audit trail in DynamoDB (immutable, scalable)</p>
                </div>

                <div className="pattern">
                  <div className="patternTitle">Event-Driven Architecture</div>
                  <p><strong>Use:</strong> EventBridge, SNS, SQS for asynchronous processing</p>
                  <p><strong>Benefit:</strong> Loose coupling, resilience, easier to scale</p>
                  <p><strong>Example:</strong> Document upload triggers Lambda for processing</p>
                </div>

                <div className="pattern">
                  <div className="patternTitle">Infrastructure as Code</div>
                  <p><strong>Use:</strong> CloudFormation or Terraform for all infrastructure</p>
                  <p><strong>Benefit:</strong> Repeatable deployments, version control, reduced validation burden</p>
                  <p><strong>Example:</strong> VDC entire stack deployed via CloudFormation templates</p>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Migration Strategy</h2>
              <p>
                Transforming to AWS-native doesn''t happen overnight. Recommended approach:
              </p>

              <div className="migrationPhases">
                <div className="migPhase">
                  <div className="migNum">1</div>
                  <div className="migContent">
                    <div className="migTitle">Assess Current State</div>
                    <p>Inventory existing applications. Identify candidates for AWS-native transformation (vs. lift-and-shift).</p>
                  </div>
                </div>
                <div className="migPhase">
                  <div className="migNum">2</div>
                  <div className="migContent">
                    <div className="migTitle">Start with New Applications</div>
                    <p>Build new systems AWS-native from day one. Prove the pattern works.</p>
                  </div>
                </div>
                <div className="migPhase">
                  <div className="migNum">3</div>
                  <div className="migContent">
                    <div className="migTitle">Refactor High-Value Apps</div>
                    <p>Identify applications with high operational cost or scaling challenges. Prioritize for refactoring.</p>
                  </div>
                </div>
                <div className="migPhase">
                  <div className="migNum">4</div>
                  <div className="migContent">
                    <div className="migTitle">Retire Legacy</div>
                    <p>Some applications don''t deserve refactoring. Replace with SaaS or retire entirely.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="h2">Benefits Realized</h2>
              <div className="benefitsGrid">
                <div className="benefit">
                  <div className="benefitIcon">💰</div>
                  <div className="benefitTitle">70-90% Cost Reduction</div>
                  <p>Serverless = pay only for what you use. No idle infrastructure.</p>
                </div>
                <div className="benefit">
                  <div className="benefitIcon">⚡</div>
                  <div className="benefitTitle">10x Faster Deployment</div>
                  <p>Infrastructure as Code + CI/CD = deploy in minutes, not weeks.</p>
                </div>
                <div className="benefit">
                  <div className="benefitIcon">📈</div>
                  <div className="benefitTitle">Infinite Scalability</div>
                  <p>Lambda and DynamoDB scale automatically. No capacity planning.</p>
                </div>
                <div className="benefit">
                  <div className="benefitIcon">🔒</div>
                  <div className="benefitTitle">Security Built-In</div>
                  <p>Managed services include encryption, audit logging, access control by default.</p>
                </div>
              </div>
            </section>

            <div className="docNav">
              <Link href="/life-sciences/evidence" className="navBtn">← Back to Evidence</Link>
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
          .h2 { font-size: 1.8rem; font-weight: 700; margin-bottom: 32px; color: #fff; border-bottom: 2px solid rgba(139,92,246,0.3); padding-bottom: 12px; }
          .h3 { font-size: 1.3rem; font-weight: 600; margin: 32px 0 16px; color: rgba(255,255,255,0.95); }
          p { line-height: 1.7; margin-bottom: 16px; color: rgba(255,255,255,0.85); }
          ul { margin: 16px 0; padding-left: 28px; }
          li { margin-bottom: 12px; line-height: 1.7; color: rgba(255,255,255,0.85); }
          .comparison { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin: 32px 0; }
          .compCol { border-radius: 12px; padding: 32px; }
          .compCol.liftshift { background: rgba(239,68,68,0.1); border: 2px solid rgba(239,68,68,0.3); }
          .compCol.native { background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.3); }
          .compTitle { font-size: 1.3rem; font-weight: 700; margin-bottom: 20px; color: #fff; text-align: center; }
          .compResult { margin-top: 24px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); font-weight: 700; text-align: center; font-size: 1.1rem; }
          .archStack { display: grid; gap: 12px; margin: 32px 0; }
          .stackLayer { border-radius: 12px; padding: 20px; }
          .stackLayer.frontend { background: rgba(59,130,246,0.15); border: 2px solid rgba(59,130,246,0.4); }
          .stackLayer.auth { background: rgba(251,191,36,0.15); border: 2px solid rgba(251,191,36,0.4); }
          .stackLayer.api { background: rgba(139,92,246,0.15); border: 2px solid rgba(139,92,246,0.4); }
          .stackLayer.data { background: rgba(34,197,94,0.15); border: 2px solid rgba(34,197,94,0.4); }
          .layerTitle { font-weight: 700; margin-bottom: 8px; color: #fff; }
          .layerTech { margin-bottom: 8px; color: rgba(255,255,255,0.9); }
          .layerBenefit { font-size: 0.9rem; color: rgba(255,255,255,0.7); font-style: italic; }
          .costComparison { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin: 24px 0; }
          .costItem { border-radius: 12px; padding: 24px; text-align: center; }
          .costItem.traditional { background: rgba(239,68,68,0.1); border: 2px solid rgba(239,68,68,0.3); }
          .costItem.native { background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.3); }
          .costLabel { font-weight: 700; margin-bottom: 12px; color: #fff; }
          .costValue { font-size: 2rem; font-weight: 800; margin-bottom: 12px; color: #fff; }
          .costDetail { font-size: 0.9rem; color: rgba(255,255,255,0.7); }
          .costSavings { margin-top: 16px; font-size: 1.2rem; text-align: center; color: rgba(74,222,128,1); }
          .patternsGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin: 24px 0; }
          .pattern { background: rgba(139,92,246,0.1); border: 1px solid rgba(139,92,246,0.3); border-radius: 12px; padding: 24px; }
          .patternTitle { font-weight: 700; font-size: 1.1rem; margin-bottom: 16px; color: rgba(167,139,250,1); }
          .migrationPhases { display: grid; gap: 20px; margin: 32px 0; }
          .migPhase { display: grid; grid-template-columns: 60px 1fr; gap: 16px; }
          .migNum { width: 60px; height: 60px; background: rgba(59,130,246,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 800; color: #fff; }
          .migContent { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 20px; }
          .migTitle { font-weight: 700; margin-bottom: 12px; color: rgba(96,165,250,1); }
          .benefitsGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin: 32px 0; }
          .benefit { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px; padding: 24px; text-align: center; }
          .benefitIcon { font-size: 3rem; margin-bottom: 12px; }
          .benefitTitle { font-weight: 700; margin-bottom: 12px; color: rgba(74,222,128,1); }
          .docNav { display: flex; justify-content: space-between; margin-top: 64px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); }
          .navBtn { padding: 12px 24px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 600; }
          .navBtn:hover { background: rgba(139,92,246,0.2); border-color: rgba(139,92,246,0.4); }
          @media (max-width: 968px) { 
            .comparison, .costComparison, .patternsGrid, .benefitsGrid { grid-template-columns: 1fr; }
            .migPhase { grid-template-columns: 1fr; }
          }
        `}</style>
      </div>
    </>
  );
}
