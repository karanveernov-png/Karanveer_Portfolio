// ============================================================================
// PROJECT ABYSS — DATA CONSTANTS
// All static data: profile, zones, skills, projects, certificates, milestones
// ============================================================================

export const PROFILE = {
  name: "Karanveer Singh",
  nameUpper: "KARANVEER SINGH",
  initials: "KVS",
  headline: "AI Engineer & Data Systems Builder",
  roles: [
    "AI Engineer",
    "Data Analyst",
    "B.Tech CSE Student (3rd Year)",
    "Intelligent Automation Builder",
    "Future Full Stack Developer",
  ],
  statement:
    "I build data systems and interfaces that behave like intelligent products — analytics, models and motion in one coherent surface.",
  university: "Rayat Bahra University",
  degree: "B.Tech in Computer Science & Engineering (2024 — Present)",
  location: "Rupnagar, Punjab, India",
  coordinates: "30° 57′ 58″ N · 76° 31′ 23″ E",
  availability:
    "Open to internships, freelance & collaborations in Data Analytics, Full-Stack Development, and AI Engineering",
  email: "karanveersinghk014@gmail.com",
  phone: "+91 9464276670",
  github: "https://github.com/karanveernov-png",
  linkedin: "https://www.linkedin.com/in/karanveer-singh-0562663b5",
  resumePdf: "/resume.pdf",
  resumeThumb: "/resume-thumbnail.png",
  resumeDownloadName: "Karanveer_Singh_Resume.pdf",
};

export const ZONES = [
  {
    id: "surface",
    code: "ZONE A",
    name: "The Surface",
    sub: "Pelagic Horizon · Identity",
    depthMeters: 0,
    pressureAtm: 1.0,
    tempC: 21.4,
    lightPct: "100%",
  },
  {
    id: "capabilities",
    code: "ZONE B",
    name: "The Open Ocean",
    sub: "Epipelagic Stratum · Technical Capabilities",
    depthMeters: 180,
    pressureAtm: 19.0,
    tempC: 14.2,
    lightPct: "18%",
  },
  {
    id: "vessel",
    code: "ZONE C",
    name: "The Research Vessel",
    sub: "Mesopelagic Station · Deployed Systems",
    depthMeters: 540,
    pressureAtm: 55.0,
    tempC: 7.8,
    lightPct: "1.2%",
  },
  {
    id: "credentials",
    code: "ZONE C.2",
    name: "Hydrographic Archive",
    sub: "Upper Bathyal · Verified Credentials & Research",
    depthMeters: 1080,
    pressureAtm: 109.0,
    tempC: 4.1,
    lightPct: "0.04%",
  },
  {
    id: "abyss",
    code: "ZONE D",
    name: "The Abyss",
    sub: "Bathypelagic Trench · Trajectory & Deep Ambitions",
    depthMeters: 1850,
    pressureAtm: 186.0,
    tempC: 2.3,
    lightPct: "0.00%",
  },
  {
    id: "lighthouse",
    code: "ZONE E",
    name: "The Lighthouse",
    sub: "Nocturnal Horizon · Dossier & Signal Transmission",
    depthMeters: 0,
    pressureAtm: 1.0,
    tempC: 19.8,
    lightPct: "BEACON",
  },
];

// Authentic skill ecosystem without fabricated proficiency percentages.
// Grouped by functional engineering domain and linked to real projects/credentials.
export const SKILL_DOMAINS = [
  {
    id: "core",
    label: "Core & Backend Foundations",
    depthRange: "120m — 180m",
    summary:
      "Primary programming language, relational querying, backend-as-a-service, and version-controlled workflows.",
  },
  {
    id: "data",
    label: "Data Science & Analytical Pipelines",
    depthRange: "180m — 260m",
    summary:
      "Cleaning noisy institutional datasets, numerical computation, statistical plotting, and BI reporting.",
  },
  {
    id: "ai",
    label: "Applied AI & LLM Inference",
    depthRange: "260m — 340m",
    summary:
      "Prompt engineering, low-latency LLM API orchestration, and regional/multilingual AI integration.",
  },
  {
    id: "interface",
    label: "Interactive Surfaces & Active Horizon",
    depthRange: "340m — 420m",
    summary:
      "Shipping interactive data web apps with Streamlit while actively expanding into React and FastAPI.",
  },
];

export const SKILLS = [
  {
    id: "python",
    name: "Python",
    level: 90,
    domain: "core",
    status: "Core Production",
    role: "Primary language powering backend logic, data pipelines, automation scripts, and AI orchestration.",
    usedIn: ["BrainBlitz", "Studora", "Infosys Backend Python Certificate"],
    connections: [
      "pandas",
      "numpy",
      "matplotlib",
      "streamlit",
      "supabase",
      "ai",
      "groq",
      "sarvam",
      "fastapi",
      "vscode",
    ],
    x: 50,
    y: 44,
  },
  {
    id: "pandas",
    name: "Pandas",
    level: 88,
    domain: "data",
    status: "Core Production",
    role: "Dataframe transformation, cleaning noisy institutional tables, and structured aggregation.",
    usedIn: ["Studora (Pandas Data Pipeline)", "Data Analytics Projects"],
    connections: ["python", "numpy", "matplotlib", "sql"],
    x: 25,
    y: 28,
  },
  {
    id: "numpy",
    name: "NumPy",
    level: 85,
    domain: "data",
    status: "Core Production",
    role: "Vectorized numerical operations and array foundations supporting analytical pipelines.",
    usedIn: ["Data Analytics & Foundations"],
    connections: ["python", "pandas", "matplotlib"],
    x: 15,
    y: 48,
  },
  {
    id: "matplotlib",
    name: "Matplotlib",
    level: 82,
    domain: "data",
    status: "Core Production",
    role: "Programmatic charting and student performance distribution visualizations.",
    usedIn: ["Studora (Matplotlib Visualization)"],
    connections: ["python", "pandas", "bi"],
    x: 27,
    y: 68,
  },
  {
    id: "sql",
    name: "SQL & DBMS",
    level: 82,
    domain: "core",
    status: "Core Foundation",
    role: "Relational schema design, querying, and database management systems.",
    usedIn: ["B.Tech CSE Coursework", "Infosys Backend Python", "Data Analytics"],
    connections: ["python", "supabase", "pandas"],
    x: 37,
    y: 18,
  },
  {
    id: "streamlit",
    name: "Streamlit",
    level: 85,
    domain: "interface",
    status: "Core Production",
    role: "End-to-end interactive web application framework for shipping Python & AI products rapidly.",
    usedIn: ["BrainBlitz (Live App)", "Studora (Live Dashboard)"],
    connections: ["python", "ai", "groq", "pandas"],
    x: 69,
    y: 26,
  },
  {
    id: "ai",
    name: "AI Prompting",
    level: 88,
    domain: "ai",
    status: "Certified Capability",
    role: "Designing structured system prompts, optimizing LLM outputs, and constraining generative workflows.",
    usedIn: [
      "BrainBlitz MCQ Engine",
      "Studora Insights",
      "Simplilearn Prompt Engineering Certificate",
    ],
    connections: ["python", "groq", "sarvam", "streamlit"],
    x: 75,
    y: 50,
  },
  {
    id: "groq",
    name: "Groq API",
    level: 80,
    domain: "ai",
    status: "Core Production",
    role: "Ultra-low-latency LLM inference engine powering real-time question generation and analytics synthesis.",
    usedIn: ["BrainBlitz", "Studora"],
    connections: ["ai", "python", "streamlit"],
    x: 86,
    y: 34,
  },
  {
    id: "sarvam",
    name: "Sarvam AI API",
    level: 80,
    domain: "ai",
    status: "Applied Exploration",
    role: "Experimentation with Indic/multilingual sovereign AI models and specialized LLM workflows.",
    usedIn: ["Early 2026 AI Integration & Prompting"],
    connections: ["ai", "python"],
    x: 86,
    y: 64,
  },
  {
    id: "supabase",
    name: "Supabase",
    level: 80,
    domain: "core",
    status: "Backend Service",
    role: "Cloud Postgres backend, authentication, and JSON/relational persistence.",
    usedIn: ["Backend & Full-Stack Workflows"],
    connections: ["python", "sql"],
    x: 53,
    y: 16,
  },
  {
    id: "git",
    name: "Git & GitHub",
    level: 85,
    domain: "core",
    status: "Core Workflow",
    role: "Source control, repository management, and open-source project deployment.",
    usedIn: ["streamlit-quiz-app", "Academia"],
    connections: ["vscode", "python"],
    x: 45,
    y: 76,
  },
  {
    id: "vscode",
    name: "VS Code",
    level: 90,
    domain: "core",
    status: "Core Workflow",
    role: "Primary integrated development environment for Python, data notebooks, and web engineering.",
    usedIn: ["Daily Engineering Environment"],
    connections: ["git", "python", "javascript"],
    x: 59,
    y: 80,
  },
  {
    id: "javascript",
    name: "JavaScript",
    level: 40,
    domain: "interface",
    status: "Frontend Foundation",
    role: "Client-side scripting and interactive browser logic supporting modern web interfaces.",
    usedIn: ["Interactive Portfolio & Web Interfaces"],
    connections: ["react", "vscode"],
    x: 73,
    y: 78,
  },
  {
    id: "react",
    name: "React ",
    level:70,
    domain: "interface",
    status: "Active Learning",
    role: "Component-based UI engineering for custom full-stack web applications.",
    usedIn: ["Active Upskilling & Portfolio Architecture"],
    connections: ["javascript", "fastapi"],
    x: 85,
    y: 84,
  },
  {
    id: "fastapi",
    name: "FastAPI ",
    level: 60,
    domain: "interface",
    status: "Active Learning",
    role: "Asynchronous Python REST API framework for decoupling ML/AI engines from frontend clients.",
    usedIn: ["Active Upskilling for Full-Stack AI"],
    connections: ["python", "react"],
    x: 64,
    y: 62,
  },
];

export const PROJECTS = [
  {
    id: "brainblitz",
    expeditionCode: "DISCOVERY 01 // DEPTH 540m",
    title: "BrainBlitz",
    subtitle: "AI-Powered Quiz Platform",
    category: "AI Product",
    color: "#00E5FF",
    description:
      "AI-powered quiz platform that generates customized MCQs, helping students practice, test their knowledge, and learn smarter.",
    problem:
      "Students studying across diverse subjects often rely on static, repetitive question banks that cannot adapt to specific topics, difficulty levels, or immediate practice needs.",
    solution:
      "Engineered an interactive assessment application that dynamically synthesizes customized multiple-choice questions on demand using high-speed LLM inference via the Groq API.",
    contribution:
      "Designed and built the complete product end-to-end — from prompt structuring and Groq API integration in Python to stateful quiz progression, scoring feedback, and public cloud deployment on Streamlit.",
    image: "brainblitz-preview.png",
    tech: ["Python", "Streamlit", "AI", "Groq API"],
    github: "https://github.com/karanveernov-png/streamlit-quiz-app",
    live: "https://app-quiz-app-sny6pij5jtq9dbkjkdramj.streamlit.app/",
    architecture: [
      {
        stage: "01",
        name: "Streamlit Interface",
        detail:
          "Interactive web surface capturing topic parameters, managing quiz state, and rendering real-time feedback.",
      },
      {
        stage: "02",
        name: "Python Controller",
        detail:
          "Orchestrates session state, input validation, response parsing, and score computation.",
      },
      {
        stage: "03",
        name: "AI Prompt Engine",
        detail:
          "Formats pedagogical constraints into structured system prompts for deterministic MCQ generation.",
      },
      {
        stage: "04",
        name: "Groq API Inference",
        detail:
          "Executes low-latency LLM completion to return tailored questions, options, and answer keys.",
      },
    ],
  },
  {
    id: "studora",
    expeditionCode: "DISCOVERY 02 // DEPTH 680m",
    title: "Studora",
    subtitle: "College Analytics Platform",
    category: "Data Analytics",
    color: "#7C3AED",
    description:
      "AI-powered platform for analyzing college data, generating insights, and visualizing student performance through interactive dashboards.",
    problem:
      "Institutional and academic records are frequently trapped in raw spreadsheets and fragmented tables, making it difficult for educators and students to spot performance trends quickly.",
    solution:
      "Built an integrated college analytics platform combining programmatic data transformation with automated visual charting and LLM-driven narrative insights.",
    contribution:
      "Architected the end-to-end system: implemented the Pandas data ingestion and cleaning pipeline, authored Matplotlib statistical visualizations, integrated the Groq AI Engine for automated insight generation, and deployed the interactive Streamlit dashboard.",
    image: "/studora-preview.png",
    tech: ["Python", "Streamlit", "Pandas", "Groq API", "Matplotlib"],
    github: "https://github.com/karanveernov-png/Academia",
    live: "https://studoraacademia.streamlit.app/",
    architecture: [
      {
        stage: "01",
        name: "Streamlit Dashboard",
        detail:
          "Multi-view analytical workspace for uploading, filtering, and inspecting institutional datasets.",
      },
      {
        stage: "02",
        name: "Pandas Data Pipeline",
        detail:
          "Cleans, normalizes, and aggregates student performance metrics and attendance/grade distributions.",
      },
      {
        stage: "03",
        name: "Groq AI Engine",
        detail:
          "Synthesizes structured statistical summaries into readable qualitative insights and anomaly highlights.",
      },
      {
        stage: "04",
        name: "Matplotlib Visualization",
        detail:
          "Renders comparative charts, distribution plots, and visual performance breakdowns.",
      },
    ],
  },
  {
    id: "fluxora",
    expeditionCode: "DISCOVERY 03 // DEPTH 820m",
    title: "Fluxora",
    subtitle: "Cinematic Video Player",
    category: "Full-Stack Web App",
    color: "#A28CD3",
    description:
      "A fantastic, high-performance video player combining a sleek interface with robust backend streaming capabilities to deliver a seamless cinematic experience.",
    problem:
      "Standard web media players often lack customizable integrations and struggle with optimized, high-performance backend delivery.",
    solution:
      "Engineered a dynamic React frontend coupled with an optimized FastAPI backend to ensure smooth, buffer-free video rendering.",
    contribution:
      "Built the complete video streaming pipeline, from the interactive React UI components to the Python-based API routing.",
    image: "/fluxora-preview.png", // THIS IS WHERE THE IMAGE INTEGRATION HAPPENS
    tech: ["React", "FastAPI", "JavaScript", "Python"],
    github: "https://github.com/karanveernov-png/Fluxora-movie-player", 
    live: "https://fluxora-movie-player.vercel.app/",
    architecture: [
      {
        stage: "01",
        name: "React Interface",
        detail:
          "Responsive, cinematic web surface handling user playback controls and seamless video rendering.",
      },
      {
        stage: "02",
        name: "FastAPI Backend",
        detail:
          "High-performance Python API handling asynchronous media stream requests and routing.",
      },
      {
        stage: "03",
        name: "Media Delivery",
        detail:
          "Optimized data chunking and buffering protocols for smooth, uninterrupted streaming.",
      },
      {
        stage: "04",
        name: "State Management",
        detail:
          "Real-time synchronization of video state, volume profiles, and playlist queues.",
      },
    ],
  },
];

export const CERTIFICATES = [
  {
    id: "infosys-python",
    code: "ARCHIVE LOG 01",
    title: "Infosys Course Completion Certificate In Backend Python",
    issuer: "Infosys",
    date: "April 2026",
    issueDate: "April 21, 2026",
    credentialId: "INFOSYS-PYTHON-2026",
    status: "Verified",
    logo: "🐍",
    color: "#00E5FF",
    description:
      "Successfully completed comprehensive backend development course focusing on Python programming, API development, database management, and server-side architecture.",
    image: "infosys-cert.png",
    link: "https://verify.onwingspan.com/",
    linkVerified: true,
    linkLabel: "Verify on Infosys Wingspan",
    skills: ["Python", "Backend", "APIs", "Database"],
  },
  {
    id: "udemy-python-zero-to-hero",
    code: "ARCHIVE LOG 02",
    title: "Python Programming Zero to Hero: Learn Python Step by Step",
    issuer: "Udemy",
    date: "May 2026",
    issueDate: "May 17, 2026",
    credentialId: "UC-6afe2721-ba45-45a0-aa0c-f6e74a2de28f",
    status: "Verified",
    logo: "🐍",
    color: "#A435F0", // Udemy Purple
    description:
      "Completed 6.5 total hours of comprehensive Python programming training, building a strong foundation in core language mechanics and step-by-step problem-solving.",
    image: "Udemy_python.png",
    link: "https://ude.my/UC-6afe2721-ba45-45a0-aa0c-f6e74a2de28f",
    linkVerified: true,
    linkLabel: "Verify on Udemy",
    skills: ["Python", "Programming Foundations", "Core Logic"],
  },
  {
    id: "icisft-paper",
    code: "ARCHIVE LOG 03",
    title: "ICISFT Rayat Bahra Research Paper 2026",
    issuer: "ICISFT",
    date: "March 2026",
    issueDate: "March 15, 2026",
    credentialId: "ICISFT-RB-2026",
    status: "Verified",
    logo: "📄",
    color: "#2DD4BF",
    description:
      "Successfully published and presented a research paper on advanced computing technologies at the ICISFT 2026 conference.",
    image: "icisft-cert.png",
    link: null,
    linkVerified: false,
    linkLabel: "Conference Publication Record (ICISFT 2026)",
    skills: ["Research", "Technical Writing", "Advanced Computing", "Presentation"],
  },
  {
    id: "prompt-engineering-simplilearn",
    code: "ARCHIVE LOG 04",
    title: "Introduction to Prompt Engineering",
    issuer: "Simplilearn SkillUp",
    date: "July 2026",
    issueDate: "July 25, 2026",
    credentialId: "10510029",
    status: "Verified",
    logo: "🤖",
    color: "#F59E0B",
    description:
      "Successfully completed the online course covering core principles of prompt engineering, optimizing LLM responses, and practical AI workflow integration.",
    image: "/prompt-engineering-cert.png",
    link: "https://simpli-web.app.link/e/5fQpOWiSI5b",
    linkVerified: true,
    linkLabel: "Verify on Simplilearn",
    skills: ["Prompt Engineering", "Generative AI", "LLMs", "AI Prompting"],
  },
];
export const MILESTONES = [
  {
    year: "2024",
    depth: "1,420m",
    title: "Started B.Tech CSE at Rayat Bahra University",
    org: "Rayat Bahra University · 2024 — Present",
    desc: "Began the computer science journey. Mastered core foundations including Data Structures & Algorithms, Operating Systems, and Database Management Systems (DBMS) with strong academic performance.",
    type: "Academic Foundation",
  },
  {
    year: "2025",
    depth: "1,560m",
    title: "Data Analytics & Foundations",
    org: "Independent Exploration",
    desc: "Dove deep into Python, Pandas, NumPy, Matplotlib, SQL queries, and visualization tools like Power BI and Tableau. Started turning noisy tables into visual insights and clear dashboards.",
    type: "Data Systems",
  },
  {
    year: "Early 2026",
    depth: "1,710m",
    title: "AI Integration, Prompting & Conference Research",
    org: "Independent & ICISFT 2026",
    desc: "Experimented with Groq, Sarvam AI APIs, automation scripts, and local LLMs. Published and presented a research paper on advanced computing technologies at the ICISFT 2026 conference.",
    type: "Research & AI",
  },
  {
    year: "Mid 2026",
    depth: "1,890m",
    title: "Launched BrainBlitz & Studora",
    org: "Independent AI & Full-Stack Projects · Jan 2026 — Present",
    desc: "Shipped two production AI products end-to-end using Streamlit, integrating Groq LLM inference, Pandas data pipelines, and Matplotlib visualizations from data layer to user interface.",
    type: "Production Ship",
  },
  {
    year: "Summer 2026",
    depth: "2,040m",
    title: "Industrial Training & Certified Upskilling",
    org: "Infosys Wingspan & Simplilearn SkillUp",
    desc: "Completed software development training, earned Backend Python certification from Infosys (April 2026) and Prompt Engineering certification from Simplilearn (July 2026).",
    type: "Verification",
  },
  {
    year: "Future Horizon",
    depth: "2,250m",
    title: "Production AI Engineering & Full-Stack Systems",
    org: "Active Trench Exploration (In Progress)",
    desc: "Building toward production-grade intelligent automation and comprehensive machine learning applications while actively learning FastAPI and React for decoupled full-stack architectures.",
    type: "Long-Term Ambition",
  },
];

export const CAREER_PATH = [
  {
    title: "AI & Full Stack Projects",
    org: "Independent Projects",
    period: "2026 Jan — Now",
    desc: "Built and deployed BrainBliz and Studora, integrating AI APIs, data analytics libraries, and database systems.",
  },
  {
    title: "B.Tech CSE (3rd Year)",
    org: "Rayat Bahra University",
    period: "2024 — Present",
    desc: "Completing core coursework in Data Structures & Algorithms, Operating Systems, and DBMS with high academic performance.",
  },
  {
    title: "Python Tinkerer",
    org: "Where it started",
    period: "2026 — Now",
    desc: "Automation scripts and early experiments. Discovered a passion for intelligent automation and data logic.",
  },
  {
    title: "Data Analytics",
    org: "Where it started",
    period: "2026 — Now",
    desc: "Exploring the fundamentals of data analytics, working with Python libraries (Pandas, NumPy, Matplotlib), SQL queries, and visualization tools like Power BI and Tableau. Building small projects to analyze datasets, uncover insights, and present findings through clear dashboards and reports.",
  },
];

export const BOOT_LINES = [
  "Initializing Neural Core...",
  "Loading React Runtime...",
  "Loading Projects...",
  "Connecting Data Systems...",
  "Loading AI Modules...",
  "Synchronizing Portfolio...",
  "System Ready.",
];
