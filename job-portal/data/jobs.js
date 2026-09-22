/* ===== Default job/internship data =====
   Yeh seed data hai. Naye jobs "Post a Job" page se add hote hain
   aur localStorage me save ho jaate hain. */

const SEED_JOBS = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Technova Solutions",
    logo: "TN",
    location: "Bengaluru, India",
    mode: "Hybrid",
    type: "Internship",
    category: "Software",
    stipend: "₹15,000 /month",
    duration: "6 months",
    experience: "Fresher",
    posted: "2026-09-18",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    description:
      "Work with our product team to build responsive user interfaces. You will convert Figma designs into pixel-perfect pages and learn modern React patterns from senior engineers.",
    responsibilities: [
      "Build and maintain reusable UI components",
      "Fix cross-browser and responsiveness issues",
      "Collaborate with designers in daily stand-ups"
    ]
  },
  {
    id: 2,
    title: "Data Analyst Intern",
    company: "InsightEdge Analytics",
    logo: "IE",
    location: "Remote",
    mode: "Remote",
    type: "Internship",
    category: "Data",
    stipend: "₹12,000 /month",
    duration: "3 months",
    experience: "Fresher",
    posted: "2026-09-20",
    skills: ["Excel", "SQL", "Python", "Power BI"],
    description:
      "Help the analytics team clean, explore and visualise customer datasets. Great role for students who love numbers and storytelling with data.",
    responsibilities: [
      "Write SQL queries to pull business metrics",
      "Create weekly Power BI dashboards",
      "Document findings for the growth team"
    ]
  },
  {
    id: 3,
    title: "Junior Java Developer",
    company: "Corevault Systems",
    logo: "CV",
    location: "Pune, India",
    mode: "On-site",
    type: "Full-time",
    category: "Software",
    stipend: "₹5.5 LPA",
    duration: "Permanent",
    experience: "0-1 years",
    posted: "2026-09-15",
    skills: ["Java", "Spring Boot", "MySQL", "REST API"],
    description:
      "Join our backend guild and ship microservices used by 2M+ users. Structured 8-week onboarding bootcamp included for fresh graduates.",
    responsibilities: [
      "Develop REST APIs using Spring Boot",
      "Write unit tests with JUnit",
      "Participate in code reviews"
    ]
  },
  {
    id: 4,
    title: "UI/UX Design Intern",
    company: "Pixelmint Studio",
    logo: "PM",
    location: "Remote",
    mode: "Remote",
    type: "Internship",
    category: "Design",
    stipend: "₹10,000 /month",
    duration: "4 months",
    experience: "Fresher",
    posted: "2026-09-21",
    skills: ["Figma", "Wireframing", "Prototyping", "User Research"],
    description:
      "Design delightful mobile-first experiences for fintech clients. You will own small features end-to-end with mentorship from a lead designer.",
    responsibilities: [
      "Create wireframes and hi-fi mockups in Figma",
      "Run usability tests with 5-8 users",
      "Maintain the design system library"
    ]
  },
  {
    id: 5,
    title: "Digital Marketing Executive",
    company: "BrightWave Media",
    logo: "BW",
    location: "Delhi, India",
    mode: "On-site",
    type: "Full-time",
    category: "Marketing",
    stipend: "₹4.2 LPA",
    duration: "Permanent",
    experience: "0-2 years",
    posted: "2026-09-10",
    skills: ["SEO", "Google Ads", "Content Writing", "Analytics"],
    description:
      "Own paid and organic growth for D2C brands. Ideal for someone who enjoys experiments, copywriting and dashboards in equal measure.",
    responsibilities: [
      "Plan and run Google & Meta ad campaigns",
      "Optimise landing pages for SEO",
      "Report monthly ROAS to clients"
    ]
  },
  {
    id: 6,
    title: "Machine Learning Intern",
    company: "Neurabit AI Labs",
    logo: "NA",
    location: "Hyderabad, India",
    mode: "Hybrid",
    type: "Internship",
    category: "Data",
    stipend: "₹25,000 /month",
    duration: "6 months",
    experience: "Fresher",
    posted: "2026-09-19",
    skills: ["Python", "NumPy", "PyTorch", "NLP"],
    description:
      "Research and prototype NLP models for document understanding. Publish-worthy work with a chance of a pre-placement offer.",
    responsibilities: [
      "Preprocess large text corpora",
      "Fine-tune transformer models",
      "Benchmark accuracy and latency"
    ]
  },
  {
    id: 7,
    title: "Android Developer Trainee",
    company: "Appsphere Technologies",
    logo: "AT",
    location: "Ahmedabad, India",
    mode: "On-site",
    type: "Full-time",
    category: "Software",
    stipend: "₹3.6 LPA",
    duration: "Permanent",
    experience: "Fresher",
    posted: "2026-09-12",
    skills: ["Kotlin", "Jetpack Compose", "Firebase"],
    description:
      "Build consumer Android apps from scratch. Six-week paid training on Kotlin and Compose before you join a delivery team.",
    responsibilities: [
      "Implement screens using Jetpack Compose",
      "Integrate Firebase auth and Firestore",
      "Publish builds to the Play Console"
    ]
  },
  {
    id: 8,
    title: "HR Intern",
    company: "Talentgrid Consulting",
    logo: "TG",
    location: "Remote",
    mode: "Remote",
    type: "Internship",
    category: "HR",
    stipend: "₹8,000 /month",
    duration: "3 months",
    experience: "Fresher",
    posted: "2026-09-17",
    skills: ["Communication", "MS Office", "Recruitment"],
    description:
      "Support end-to-end campus hiring: sourcing, screening and scheduling. Perfect first internship for BBA/MBA students.",
    responsibilities: [
      "Source candidates on LinkedIn and Naukri",
      "Conduct first-round telephonic screening",
      "Maintain the applicant tracker"
    ]
  },
  {
    id: 9,
    title: "Cyber Security Analyst Intern",
    company: "Shieldstack Security",
    logo: "SS",
    location: "Noida, India",
    mode: "Hybrid",
    type: "Internship",
    category: "Software",
    stipend: "₹18,000 /month",
    duration: "6 months",
    experience: "Fresher",
    posted: "2026-09-14",
    skills: ["Linux", "Networking", "Burp Suite", "OWASP"],
    description:
      "Assist the SOC team in vulnerability assessment and penetration testing of web applications for BFSI clients.",
    responsibilities: [
      "Run VAPT scans and triage findings",
      "Write remediation reports",
      "Monitor SIEM alerts"
    ]
  },
  {
    id: 10,
    title: "Business Development Associate",
    company: "Growthly EdTech",
    logo: "GE",
    location: "Mumbai, India",
    mode: "On-site",
    type: "Part-time",
    category: "Marketing",
    stipend: "₹20,000 /month",
    duration: "Permanent",
    experience: "0-1 years",
    posted: "2026-09-08",
    skills: ["Sales", "CRM", "Negotiation"],
    description:
      "Counsel students and parents about our upskilling programmes and close enrolments. Attractive incentives on top of fixed pay.",
    responsibilities: [
      "Handle inbound leads on call",
      "Maintain pipeline in CRM",
      "Hit monthly enrolment targets"
    ]
  },
  {
    id: 11,
    title: "Content Writer Intern",
    company: "Wordcraft Digital",
    logo: "WD",
    location: "Remote",
    mode: "Remote",
    type: "Internship",
    category: "Marketing",
    stipend: "₹7,000 /month",
    duration: "2 months",
    experience: "Fresher",
    posted: "2026-09-21",
    skills: ["Writing", "SEO", "Research"],
    description:
      "Write blogs, newsletters and social copy for SaaS clients. Strong portfolio pieces guaranteed by the end of the internship.",
    responsibilities: [
      "Publish 3 SEO blogs per week",
      "Research keywords with Ubersuggest",
      "Proofread teammates' drafts"
    ]
  },
  {
    id: 12,
    title: "Graphic Design Intern",
    company: "Canvasly Creatives",
    logo: "CC",
    location: "Jaipur, India",
    mode: "Hybrid",
    type: "Internship",
    category: "Design",
    stipend: "₹9,000 /month",
    duration: "3 months",
    experience: "Fresher",
    posted: "2026-09-16",
    skills: ["Photoshop", "Illustrator", "Branding"],
    description:
      "Craft social media creatives, brand kits and pitch decks for a fast-growing agency handling 30+ brands.",
    responsibilities: [
      "Design daily social media posts",
      "Assist in brand identity projects",
      "Prepare print-ready files"
    ]
  }
];
