import Head from "next/head";
import Link from "next/link";

export default function ResourcesRedirect() {
  return (
    <>
      <Head>
        <title>Resources | Redirecting…</title>
        <meta httpEquiv="refresh" content="0; url=/life-sciences/resources" />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="/life-sciences/resources" />
      </Head>

      <main style={{ padding: "40px 20px", maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ marginBottom: 12 }}>Redirecting…</h1>
        <p style={{ marginBottom: 16 }}>
          This page has moved to <strong>/life-sciences/resources</strong>.
        </p>
        <p>
          <Link href="/life-sciences/resources">Click here if you are not redirected.</Link>
        </p>
      </main>
    </>
  );
}
