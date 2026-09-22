# 💼 JobPortal — Online Job & Internship Portal

A responsive job & internship portal for students, built with **pure HTML, CSS & JavaScript** — no frameworks, no build step. It shows **real live jobs** fetched from the free Remotive API, plus locally posted jobs saved in the browser.

---

## ✨ Features

- 🔴 **Live jobs** — 60+ real listings auto-fetched from the Remotive job board
- 🔍 **Search & filter** — by title, company, skill, job type, work mode, category, location
- ↕️ **Sorting** — most recent, title A–Z, company A–Z
- 📄 **Job details modal** with description, responsibilities, skills & original posting link
- 📝 **Apply form** with full validation (name, email, 10-digit phone, resume URL)
- 🏢 **Post a Job** page (recruiter view) with a live card preview
- 📊 **My Applications** tracker — view, withdraw, export to JSON
- ⚡ **30-minute smart cache** + offline fallback (page is never empty)
- 💾 All local data saved in **localStorage** (survives refresh)
- 📱 Fully **responsive** with a mobile hamburger menu

---

## 📁 Project Structure

```
job-portal/
├── index.html           # Home — hero, stats, latest jobs, search
├── jobs.html            # Browse — filters, search, sort, live feed
├── post-job.html        # Recruiter — post a job with live preview
├── applications.html    # Applicant — track / withdraw / export
├── css/
│   └── style.css        # All styling (responsive)
├── js/
│   ├── app.js           # Storage helpers, navbar, footer, job card
│   ├── api.js           # Live jobs API layer (fetch, cache, fallback)
│   └── apply.js         # Modals + form validation
├── data/
│   └── jobs.js          # 12 sample jobs (seed data)
└── README.md
```

---

## 🚀 How to Run in VS Code

### Step 1 — Open the folder
Open VS Code → **File → Open Folder…** → select the `job-portal` folder.

### Step 2 — Install Live Server
1. Click the **Extensions** icon in the sidebar (or press `Ctrl+Shift+X`)
2. Search for **"Live Server"** by *Ritwick Dey*
3. Click **Install**

### Step 3 — Run it
Right-click `index.html` → **"Open with Live Server"**

Your browser opens at `http://127.0.0.1:5500` and live jobs load automatically. 🎉

> **Tip:** You can also just double-click `index.html` to open it in a browser — everything works, including the live API. Live Server is only nicer because it auto-reloads when you edit a file.

---

## 🌐 Deploy to GitHub Pages

```bash
cd job-portal
git init
git add .
git commit -m "Online Job and Internship Portal"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/job-portal.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Branch: `main` → Save**.
Your site goes live at `https://YOUR-USERNAME.github.io/job-portal/` 🌍

---

## 🔌 API Used

**Remotive Public API** — free, no API key, CORS enabled.

```
GET https://remotive.com/api/remote-jobs?limit=60
```

Responses are normalised into the portal's internal job format and cached in `localStorage` for 30 minutes. If the network is unavailable, the app falls back to cached data, then to the bundled sample jobs.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (semantic) |
| Styling | CSS3 — Grid, Flexbox, custom properties, animations |
| Logic | Vanilla JavaScript (ES6+), `async/await`, Fetch API |
| Storage | Browser `localStorage` |
| Data | Remotive REST API + local seed data |

---

## 📝 Notes

- Jobs posted via **Post a Job** are saved only in *your* browser's `localStorage` — this is a frontend-only project, so they aren't shared across devices.
- Use the **"Reset all demo data"** button on the Post a Job page to restore the original sample jobs.
- Live jobs require an internet connection; sample jobs always work offline.

---

## 📄 License

Free to use for learning and academic submissions.
