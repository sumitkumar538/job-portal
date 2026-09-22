/* ================================================
   LIVE JOBS API LAYER
   Source: Remotive public API (free, no API key, CORS enabled)
   Docs  : https://remotive.com/api/remote-jobs

   Live jobs ko hum apne internal job format me convert karte hain
   taaki wahi search / filter / modal code chal jaye.
   Result 30 minute ke liye localStorage me cache hota hai.
   ================================================ */

const API = {
  URL: "https://remotive.com/api/remote-jobs?limit=60",
  CACHE_KEY: "jp_live_cache",
  CACHE_TIME_KEY: "jp_live_cache_time",
  TTL_MINUTES: 30
};

/* Remotive job_type -> humara type */
function mapType(t) {
  const m = {
    full_time: "Full-time",
    part_time: "Part-time",
    internship: "Internship",
    contract: "Contract",
    freelance: "Contract",
    other: "Full-time"
  };
  return m[t] || "Full-time";
}

/* Remotive category -> humari 5 categories */
function mapCategory(c) {
  const s = (c || "").toLowerCase();
  if (s.includes("software") || s.includes("devops") || s.includes("qa") || s.includes("engineer")) return "Software";
  if (s.includes("data") || s.includes("science") || s.includes("analy")) return "Data";
  if (s.includes("design") || s.includes("product")) return "Design";
  if (s.includes("market") || s.includes("sales") || s.includes("writing")) return "Marketing";
  if (s.includes("human resource") || s.includes("hr") || s.includes("recruit")) return "HR";
  return "Other";
}

/* HTML description ko plain text me badalna + chhota karna */
function stripHtml(html, maxLen = 420) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html || "";
  let text = (tmp.textContent || "").replace(/\s+/g, " ").trim();
  if (text.length > maxLen) text = text.slice(0, maxLen).trim() + "…";
  return text || "Full job description is available on the original posting.";
}

/* Ek Remotive job -> humara job object */
function normalizeJob(j) {
  return {
    id: "live-" + j.id,
    isLive: true,
    externalUrl: j.url,
    title: j.title,
    company: j.company_name,
    logo: initials(j.company_name || "JB"),
    location: j.candidate_required_location || "Worldwide",
    mode: "Remote",
    type: mapType(j.job_type),
    category: mapCategory(j.category),
    stipend: j.salary && j.salary.trim() ? j.salary.trim() : "Not disclosed",
    duration: mapType(j.job_type) === "Internship" ? "Internship" : "Permanent",
    experience: /intern|junior|entry|graduate/i.test(j.title) ? "Fresher" : "Experienced",
    posted: (j.publication_date || "").slice(0, 10),
    skills: (j.tags || []).slice(0, 6),
    description: stripHtml(j.description),
    responsibilities: []
  };
}

/* ---------- Cache helpers ---------- */
function readCache() {
  const t = Number(localStorage.getItem(API.CACHE_TIME_KEY) || 0);
  const fresh = Date.now() - t < API.TTL_MINUTES * 60 * 1000;
  try {
    const data = JSON.parse(localStorage.getItem(API.CACHE_KEY));
    if (Array.isArray(data) && data.length) return { data, fresh, time: t };
  } catch { /* ignore */ }
  return { data: null, fresh: false, time: 0 };
}

function writeCache(jobs) {
  try {
    localStorage.setItem(API.CACHE_KEY, JSON.stringify(jobs));
    localStorage.setItem(API.CACHE_TIME_KEY, String(Date.now()));
  } catch { /* quota full - ignore */ }
}

/* ---------- Main fetch ----------
   force = true  -> cache ignore karke fresh data laao
   Returns: { jobs, source: "live" | "cache" | "offline", error }
*/
async function fetchLiveJobs(force = false) {
  const cache = readCache();
  if (!force && cache.fresh) return { jobs: cache.data, source: "cache", time: cache.time };

  try {
    const res = await fetch(API.URL, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const json = await res.json();
    const jobs = (json.jobs || []).map(normalizeJob).filter(j => j.title && j.company);
    if (!jobs.length) throw new Error("Empty response");
    writeCache(jobs);
    return { jobs, source: "live", time: Date.now() };
  } catch (err) {
    // Internet nahi / API down -> purana cache use karo
    if (cache.data) return { jobs: cache.data, source: "cache", time: cache.time, error: err.message };
    return { jobs: [], source: "offline", time: 0, error: err.message };
  }
}

/* Local (seed + posted) jobs aur live jobs ko merge karo */
async function getAllJobs(force = false) {
  const local = loadJobs();
  const result = await fetchLiveJobs(force);
  return { jobs: [...local, ...result.jobs], local, live: result.jobs, meta: result };
}

/* Status line ke liye text */
function liveStatusText(meta) {
  if (meta.source === "live") return `🟢 Live · ${meta.jobs.length} jobs fetched just now`;
  if (meta.source === "cache") {
    const mins = Math.max(1, Math.round((Date.now() - meta.time) / 60000));
    return `🟡 Cached · updated ${mins} min ago`;
  }
  return "🔴 Offline · showing sample jobs only";
}
