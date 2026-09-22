/* ================================================
   Online Job & Internship Portal - Core JS
   Storage helpers + shared UI (navbar, toast)
   ================================================ */

const STORE = {
  JOBS: "jp_jobs",
  APPS: "jp_applications"
};

/* ---------- localStorage helpers ---------- */
function loadJobs() {
  const raw = localStorage.getItem(STORE.JOBS);
  if (!raw) {
    localStorage.setItem(STORE.JOBS, JSON.stringify(SEED_JOBS));
    return [...SEED_JOBS];
  }
  try { return JSON.parse(raw); } catch { return [...SEED_JOBS]; }
}

function saveJobs(jobs) {
  localStorage.setItem(STORE.JOBS, JSON.stringify(jobs));
}

function loadApps() {
  try { return JSON.parse(localStorage.getItem(STORE.APPS)) || []; } catch { return []; }
}

function saveApps(apps) {
  localStorage.setItem(STORE.APPS, JSON.stringify(apps));
}

function nextId(list) {
  return list.length ? Math.max(...list.map(x => Number(x.id) || 0)) + 1 : 1;
}

/* ---------- Utilities ---------- */
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function timeAgo(dateStr) {
  const then = new Date(dateStr);
  if (isNaN(then)) return "Recently";
  const days = Math.floor((Date.now() - then.getTime()) / 86400000);
  if (days <= 0) return "Posted today";
  if (days === 1) return "Posted yesterday";
  if (days < 30) return `Posted ${days} days ago`;
  const m = Math.floor(days / 30);
  return `Posted ${m} month${m > 1 ? "s" : ""} ago`;
}

function initials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

function badgeClass(type) {
  return "badge-" + type.toLowerCase().replace(/[^a-z]+/g, "-");
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(message) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
}

/* ---------- Navbar (injected on every page) ---------- */
function renderNavbar(active) {
  const links = [
    ["index.html", "Home"],
    ["jobs.html", "Browse Jobs"],
    ["post-job.html", "Post a Job"],
    ["applications.html", "My Applications"]
  ];
  const html = `
    <nav class="navbar">
      <div class="container nav-inner">
        <a class="logo" href="index.html">
          <span class="logo-mark">JP</span>
          <span>Job<span class="accent">Portal</span></span>
        </a>
        <button class="nav-toggle" id="navToggle" aria-label="Menu">&#9776;</button>
        <div class="nav-links" id="navLinks">
          ${links.map(([href, label]) =>
            `<a href="${href}" class="${active === href ? "active" : ""}">${label}</a>`
          ).join("")}
          <a href="jobs.html" class="btn btn-primary btn-sm" style="color:#fff;margin-left:6px">Find Jobs</a>
        </div>
      </div>
    </nav>`;
  document.body.insertAdjacentHTML("afterbegin", html);
  document.getElementById("navToggle").onclick = () =>
    document.getElementById("navLinks").classList.toggle("open");
}

/* ---------- Footer ---------- */
function renderFooter() {
  document.body.insertAdjacentHTML("beforeend", `
    <footer>
      <div class="container foot-inner">
        <div><b>JobPortal</b> &mdash; Online Job &amp; Internship Portal for students</div>
        <div>Mini Project &copy; ${new Date().getFullYear()} &middot; Built with HTML, CSS &amp; JavaScript</div>
      </div>
    </footer>`);
}

/* ---------- Job card markup (shared) ---------- */
function jobCardHTML(job) {
  return `
    <article class="job-card" data-id="${job.id}">
      <div class="job-top">
        <div class="company-logo">${escapeHtml(job.logo || initials(job.company))}</div>
        <div style="flex:1">
          <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap">
            <div>
              <h3>${escapeHtml(job.title)}</h3>
              <div class="company-name">${escapeHtml(job.company)}</div>
            </div>
            <div style="display:flex;gap:6px;align-items:flex-start;flex-wrap:wrap">
              ${job.isLive ? `<span class="badge badge-live">&#9679; LIVE</span>` : ""}
              <span class="badge ${badgeClass(job.type)}">${escapeHtml(job.type)}</span>
            </div>
          </div>
          <div class="meta">
            <span>&#128205; ${escapeHtml(job.location)}</span>
            <span>&#128188; ${escapeHtml(job.mode)}</span>
            <span>&#128176; ${escapeHtml(job.stipend)}</span>
            <span>&#9201; ${escapeHtml(job.duration)}</span>
          </div>
          <div class="chips">
            ${(job.skills || []).map(s => `<span class="chip">${escapeHtml(s)}</span>`).join("")}
          </div>
        </div>
      </div>
      <div class="job-foot">
        <span class="posted">${timeAgo(job.posted)}</span>
        <div style="display:flex;gap:8px">
          <button class="btn btn-outline btn-sm js-details" data-id="${job.id}">View Details</button>
          <button class="btn btn-primary btn-sm js-apply" data-id="${job.id}">Apply Now</button>
        </div>
      </div>
    </article>`;
}
