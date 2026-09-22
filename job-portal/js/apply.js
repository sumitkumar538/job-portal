/* ================================================
   Details modal + Apply modal + form validation
   Used by index.html and jobs.html
   ================================================ */

let currentJobId = null;

/* Saare jobs (local seed + posted + live API) ka registry.
   jobs.html / index.html isko fill karte hain. */
window.ALL_JOBS = window.ALL_JOBS || [];

function getJob(id) {
  return (
    window.ALL_JOBS.find(j => String(j.id) === String(id)) ||
    loadJobs().find(j => String(j.id) === String(id))
  );
}

function openModal(el) { el.classList.add("open"); document.body.style.overflow = "hidden"; }
function closeModal(el) { el.classList.remove("open"); document.body.style.overflow = ""; }

/* ---------- Details ---------- */
function showDetails(id) {
  const job = getJob(id);
  if (!job) return;
  currentJobId = job.id;

  document.getElementById("dTitle").textContent = job.title;
  document.getElementById("dCompany").textContent = `${job.company} · ${job.location}`;
  document.getElementById("dBody").innerHTML = `
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">
      <span class="badge ${badgeClass(job.type)}">${escapeHtml(job.type)}</span>
      <span class="chip">${escapeHtml(job.mode)}</span>
      <span class="chip">${escapeHtml(job.category)}</span>
      <span class="chip">${escapeHtml(job.experience || "Fresher")}</span>
    </div>
    <div class="meta" style="margin:0 0 14px">
      <span>&#128176; <b>${escapeHtml(job.stipend)}</b></span>
      <span>&#9201; ${escapeHtml(job.duration)}</span>
      <span>&#128197; ${timeAgo(job.posted)}</span>
    </div>
    <h4>About the role</h4>
    <p style="color:#475569;font-size:.94rem">${escapeHtml(job.description)}</p>
    ${(job.responsibilities || []).length ? `<h4>Key responsibilities</h4>
    <ul>${job.responsibilities.map(r => `<li>${escapeHtml(r)}</li>`).join("")}</ul>` : ""}
    <h4>Skills required</h4>
    <div class="chips">${(job.skills || []).map(s => `<span class="chip">${escapeHtml(s)}</span>`).join("")}</div>
    ${job.isLive ? `<p style="margin-top:16px;font-size:.88rem;color:var(--muted)">
        🔴 This is a live listing from the Remotive job board.
        <a href="${escapeHtml(job.externalUrl)}" target="_blank" rel="noopener" style="color:var(--brand);font-weight:600">
          Open original posting ↗</a>
      </p>` : ""}`;

  openModal(document.getElementById("detailsModal"));
}

/* ---------- Apply ---------- */
function showApply(id) {
  const job = getJob(id);
  if (!job) return;
  currentJobId = job.id;

  if (loadApps().some(a => String(a.jobId) === String(job.id))) {
    toast("You have already applied to this job ✔");
    return;
  }
  document.getElementById("aFor").textContent = `${job.title} · ${job.company}`;
  closeModal(document.getElementById("detailsModal"));
  openModal(document.getElementById("applyModal"));
}

/* ---------- Validation helpers ---------- */
function setInvalid(input, bad) {
  input.closest(".field").classList.toggle("invalid", bad);
  return !bad;
}

function validateApplyForm() {
  const name = document.getElementById("fName");
  const email = document.getElementById("fEmail");
  const phone = document.getElementById("fPhone");
  const college = document.getElementById("fCollege");
  const resume = document.getElementById("fResume");

  let ok = true;
  ok = setInvalid(name, name.value.trim().length < 3) && ok;
  ok = setInvalid(email, !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) && ok;
  ok = setInvalid(phone, !/^[0-9]{10}$/.test(phone.value.replace(/\D/g, ""))) && ok;
  ok = setInvalid(college, college.value.trim().length < 2) && ok;
  ok = setInvalid(resume, !/^https?:\/\/.+\..+/.test(resume.value.trim())) && ok;
  return ok;
}

/* ---------- Wire buttons inside a container ---------- */
function wireJobActions(container) {
  container.addEventListener("click", e => {
    const details = e.target.closest(".js-details");
    const apply = e.target.closest(".js-apply");
    if (apply) { e.stopPropagation(); showApply(apply.dataset.id); return; }
    if (details) { e.stopPropagation(); showDetails(details.dataset.id); return; }
    const card = e.target.closest(".job-card");
    if (card) showDetails(card.dataset.id);
  });
}

/* ---------- Global modal wiring ---------- */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".modal-backdrop").forEach(back => {
    back.addEventListener("click", e => {
      if (e.target === back || e.target.closest("[data-close]")) closeModal(back);
    });
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") document.querySelectorAll(".modal-backdrop.open").forEach(closeModal);
  });

  const dApply = document.getElementById("dApply");
  if (dApply) dApply.onclick = () => showApply(currentJobId);

  const form = document.getElementById("applyForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      if (!validateApplyForm()) { toast("Please fix the highlighted fields"); return; }

      const job = getJob(currentJobId);
      const apps = loadApps();
      apps.unshift({
        id: nextId(apps),
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        type: job.type,
        location: job.location,
        name: document.getElementById("fName").value.trim(),
        email: document.getElementById("fEmail").value.trim(),
        phone: document.getElementById("fPhone").value.trim(),
        college: document.getElementById("fCollege").value.trim(),
        resume: document.getElementById("fResume").value.trim(),
        note: document.getElementById("fWhy").value.trim(),
        status: "Applied",
        appliedOn: new Date().toISOString()
      });
      saveApps(apps);

      form.reset();
      form.querySelectorAll(".field").forEach(f => f.classList.remove("invalid"));
      closeModal(document.getElementById("applyModal"));
      toast("Application submitted successfully! 🎉");

      const s = document.getElementById("statApps");
      if (s) s.textContent = loadApps().length;
    });
  }
});
