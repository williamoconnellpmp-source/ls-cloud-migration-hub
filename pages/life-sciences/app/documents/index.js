// pages/life-sciences/app/documents/index.js

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Shell } from "../index";
import { apiFetch } from "../_lib/api";
import { requireAuthOrRedirect } from "../_lib/auth";

function filenameFromItem(it) {
  if (it?.originalFilename) return it.originalFilename;
  if (it?.s3Key && typeof it.s3Key === "string") {
    const parts = it.s3Key.split("/");
    return parts[parts.length - 1];
  }
  return "—";
}

function normalizeText(x) {
  return String(x || "").toLowerCase();
}

function toIsoSortable(s) {
  return typeof s === "string" ? s : "";
}

function pickOwner(it) {
  return it?.ownerEmail || it?.ownerUsername || it?.ownerUserId || "—";
}

function truncateMiddle(s, max = 28) {
  const str = String(s || "");
  if (str.length <= max) return str;
  const left = Math.ceil((max - 3) / 2);
  const right = Math.floor((max - 3) / 2);
  return `${str.slice(0, left)}...${str.slice(str.length - right)}`;
}

function StatusPill({ status }) {
  const s = String(status || "—").toUpperCase();
  const bg =
    s === "APPROVED"
      ? "#eef7ee"
      : s === "REJECTED"
      ? "#fdeeee"
      : s === "SUBMITTED"
      ? "#eef3ff"
      : s === "DRAFT"
      ? "#f5f5f5"
      : "#f5f5f5";
  const border =
    s === "APPROVED"
      ? "#bfe3bf"
      : s === "REJECTED"
      ? "#f0b9b9"
      : s === "SUBMITTED"
      ? "#b9cdf6"
      : s === "DRAFT"
      ? "#d9d9d9"
      : "#d9d9d9";

  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.15rem 0.5rem",
        borderRadius: 999,
        border: `1px solid ${border}`,
        background: bg,
        fontSize: "0.85rem",
        fontWeight: 700,
        letterSpacing: "0.01em",
      }}
    >
      {s}
    </span>
  );
}

function ActionLink({ href, children }) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: "0.3rem 0.55rem",
        fontWeight: 700,
        color: "#111",
        background: "white",
      }}
    >
      {children}
    </Link>
  );
}

export default function DocumentsIndexPage() {
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // UI state: filter/sort/search
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("ALL");
  const [owner, setOwner] = useState("ALL");
  const [sortBy, setSortBy] = useState("SUBMITTED_DESC"); // default

  // Row action state
  const [rowBusyId, setRowBusyId] = useState(null);
  const [rowMsg, setRowMsg] = useState(null);

  useEffect(() => {
    const ok = requireAuthOrRedirect(router);
    if (!ok) return;
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      setRowMsg(null);

      try {
        const data = await apiFetch("/documents", { method: "GET" });
        const list = Array.isArray(data?.items) ? data.items : [];
        setItems(list);
      } catch (e) {
        setError(e?.message || "Failed to load documents.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const owners = useMemo(() => {
    const set = new Set();
    for (const it of items) {
      const o = it?.ownerEmail || it?.ownerUsername;
      if (o) set.add(o);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [items]);

  const counts = useMemo(() => {
    const c = { ALL: 0, DRAFT: 0, SUBMITTED: 0, APPROVED: 0, REJECTED: 0 };
    for (const it of items) {
      c.ALL += 1;
      const s = it?.status;
      if (s && c[s] !== undefined) c[s] += 1;
    }
    return c;
  }, [items]);

  const filteredSorted = useMemo(() => {
    const query = normalizeText(q).trim();

    let list = items.slice();

    if (status !== "ALL") {
      list = list.filter((it) => it?.status === status);
    }

    if (owner !== "ALL") {
      list = list.filter((it) => pickOwner(it) === owner);
    }

    if (query) {
      list = list.filter((it) => {
        const hay = [
          it?.title,
          filenameFromItem(it),
          it?.ownerEmail,
          it?.ownerUsername,
          it?.documentId,
          it?.sha256,
          it?.status,
        ]
          .map(normalizeText)
          .join(" | ");
        return hay.includes(query);
      });
    }

    list.sort((a, b) => {
      const aTitle = String(a?.title || "");
      const bTitle = String(b?.title || "");
      const aStatus = String(a?.status || "");
      const bStatus = String(b?.status || "");

      const aSubmitted = toIsoSortable(a?.submittedAt);
      const bSubmitted = toIsoSortable(b?.submittedAt);

      const aUpdated = toIsoSortable(a?.updatedAt);
      const bUpdated = toIsoSortable(b?.updatedAt);

      switch (sortBy) {
        case "SUBMITTED_DESC":
          return bSubmitted.localeCompare(aSubmitted);
        case "UPDATED_DESC":
          return bUpdated.localeCompare(aUpdated);
        case "TITLE_ASC":
          return aTitle.localeCompare(bTitle);
        case "STATUS_ASC":
          return aStatus.localeCompare(bStatus);
        default:
          return bSubmitted.localeCompare(aSubmitted);
      }
    });

    return list;
  }, [items, q, status, owner, sortBy]);

  async function openFileFor(documentId) {
    setRowMsg(null);
    setError(null);
    setRowBusyId(documentId);

    try {
      setRowMsg("Generating controlled download link…");
      const data = await apiFetch(`/documents/${documentId}/download`, { method: "GET" });
      const url = data?.downloadUrl;

      if (!url) throw new Error("Download URL was not returned by the server.");

      window.open(url, "_blank", "noopener,noreferrer");
      setRowMsg(null);
    } catch (e) {
      setRowMsg(null);
      setError(e?.message || "Unable to generate download link.");
    } finally {
      setRowBusyId(null);
    }
  }

  return (
    <Shell title="Documents">
      <section
        style={{
          padding: "1rem",
          border: "1px solid #ddd",
          borderRadius: 12,
          maxWidth: 1200,
          background: "white",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ marginTop: 0, marginBottom: "0.25rem" }}>Document register</h2>
            <div style={{ color: "#555" }}>
              Search, filter, and review documents. Open the controlled copy or view the audit trail.
            </div>
          </div>
        </div>

        {/* Status chips */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.9rem" }}>
          {["ALL", "SUBMITTED", "APPROVED", "REJECTED", "DRAFT"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              style={{
                padding: "0.35rem 0.6rem",
                border: "1px solid #ccc",
                borderRadius: 10,
                background: status === s ? "#f2f2f2" : "white",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              {s} ({counts[s] ?? 0})
            </button>
          ))}
        </div>

        {/* Filter bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 240px 220px 160px",
            gap: "0.75rem",
            marginTop: "0.9rem",
            alignItems: "end",
          }}
        >
          <label style={{ display: "grid", gap: "0.25rem" }}>
            Search
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="title, filename, owner, id, hash…"
              style={{ padding: "0.55rem", borderRadius: 10, border: "1px solid #ccc" }}
            />
          </label>

          <label style={{ display: "grid", gap: "0.25rem" }}>
            Owner
            <select
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              style={{ padding: "0.55rem", borderRadius: 10, border: "1px solid #ccc" }}
            >
              <option value="ALL">All</option>
              {owners.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "grid", gap: "0.25rem" }}>
            Sort
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: "0.55rem", borderRadius: 10, border: "1px solid #ccc" }}
            >
              <option value="SUBMITTED_DESC">Submitted (newest)</option>
              <option value="UPDATED_DESC">Updated (newest)</option>
              <option value="TITLE_ASC">Title (A → Z)</option>
              <option value="STATUS_ASC">Status (A → Z)</option>
            </select>
          </label>

          <button
            type="button"
            onClick={() => {
              setQ("");
              setOwner("ALL");
              setStatus("ALL");
              setSortBy("SUBMITTED_DESC");
            }}
            style={{
              padding: "0.6rem 0.75rem",
              borderRadius: 10,
              border: "1px solid #ccc",
              background: "white",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>

        {loading && <div style={{ marginTop: "0.9rem" }}>Loading…</div>}

        {rowMsg && !error && (
          <div style={{ marginTop: "0.9rem", padding: "0.75rem", border: "1px solid #ccc", borderRadius: 10 }}>
            {rowMsg}
          </div>
        )}

        {error && (
          <div
            style={{
              padding: "0.75rem",
              border: "1px solid #cc0000",
              color: "#990000",
              marginTop: "0.9rem",
              borderRadius: 10,
            }}
          >
            <strong>Cannot proceed:</strong> {error}
            <div style={{ marginTop: "0.5rem", color: "#770000" }}>
              Confirm API Gateway has:
              <ul style={{ marginTop: "0.35rem" }}>
                <li>
                  <code>GET /documents</code>
                </li>
                <li>
                  <code>GET /documents/{`{documentId}`}/download</code>
                </li>
              </ul>
            </div>
          </div>
        )}

        {!loading && !error && filteredSorted.length === 0 && (
          <div style={{ marginTop: "0.9rem", color: "#444" }}>No matching documents.</div>
        )}

        {!loading && !error && filteredSorted.length > 0 && (
          <div style={{ marginTop: "0.9rem", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.75rem" }}>Document</th>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.75rem" }}>File</th>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.75rem" }}>Status</th>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.75rem" }}>Owner</th>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.75rem" }}>Submitted</th>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.75rem" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSorted.map((it) => {
                  const ownerFull = pickOwner(it);
                  const ownerShort = ownerFull === "—" ? "—" : truncateMiddle(ownerFull, 30);
                  const idFull = it.documentId;
                  const idShort = idFull ? truncateMiddle(idFull, 26) : "—";

                  return (
                    <tr key={it.documentId}>
                      <td style={{ padding: "0.75rem", borderBottom: "1px solid #f0f0f0", verticalAlign: "top" }}>
                        <div style={{ display: "grid", gap: "0.2rem" }}>
                          <div style={{ fontWeight: 800 }}>{it.title || "Untitled"}</div>
                          <div style={{ fontSize: "0.9rem", color: "#666" }} title={idFull || ""}>
                            {idShort}
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: "0.75rem", borderBottom: "1px solid #f0f0f0", verticalAlign: "top" }}>
                        {filenameFromItem(it)}
                      </td>

                      <td style={{ padding: "0.75rem", borderBottom: "1px solid #f0f0f0", verticalAlign: "top" }}>
                        <StatusPill status={it.status} />
                      </td>

                      <td style={{ padding: "0.75rem", borderBottom: "1px solid #f0f0f0", verticalAlign: "top" }}>
                        <span title={ownerFull}>{ownerShort}</span>
                      </td>

                      <td style={{ padding: "0.75rem", borderBottom: "1px solid #f0f0f0", verticalAlign: "top" }}>
                        {it.submittedAt || "—"}
                      </td>

                      <td style={{ padding: "0.75rem", borderBottom: "1px solid #f0f0f0", verticalAlign: "top" }}>
                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                          <button
                            type="button"
                            onClick={() => openFileFor(it.documentId)}
                            disabled={rowBusyId === it.documentId}
                            style={{
                              padding: "0.35rem 0.6rem",
                              borderRadius: 10,
                              border: "1px solid #ddd",
                              background: "white",
                              fontWeight: 800,
                              cursor: "pointer",
                            }}
                          >
                            Open file
                          </button>

                          <ActionLink href={`/life-sciences/app/documents/${it.documentId}`}>Audit</ActionLink>

                          {it.status === "SUBMITTED" && (
                            <ActionLink href={`/life-sciences/app/approval/${it.documentId}`}>Review</ActionLink>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

    
    </Shell>
  );
}
