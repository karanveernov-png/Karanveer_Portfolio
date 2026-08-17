import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ============================================================
// DATA CONFIGURATION
// ============================================================
const PROFILE = {
  name: "KARANVEER SINGH",
  initials: "KVS",
  roles: ["B.Tech CSE Student", "AI Engineer", "Intelligent Automation"],
  github: "https://github.com/karanveernov-png",
  linkedin: "https://www.linkedin.com/in/karanveer-singh-0562663b5",
  email: "karanveersinghk014@gmail.com",
};
const SKILLS = [
  { id: "python", name: "Python", level: 90, category: "core", connections: ["pandas", "numpy", "streamlit", "ai"] },
  { id: "pandas", name: "Pandas", level: 88, category: "data", connections: ["python", "numpy", "matplotlib"] },
  { id: "numpy", name: "NumPy", level: 85, category: "data", connections: ["python", "pandas"] },
  { id: "matplotlib", name: "Matplotlib", level: 82, category: "data", connections: ["pandas", "python"] },
  { id: "streamlit", name: "Streamlit", level: 85, category: "frontend", connections: ["python", "ai"] },
  { id: "supabase", name: "Supabase", level: 80, category: "backend", connections: ["python", "json"] },
  { id: "git", name: "Git & GitHub", level: 85, category: "tools", connections: ["vscode"] },
  { id: "vscode", name: "VS Code", level: 90, category: "tools", connections: ["git", "python"] },
  { id: "ai", name: "AI Prompting", level: 88, category: "ai", connections: ["python", "groq", "sarvam"] },
  { id: "groq", name: "Groq API", level: 80, category: "ai", connections: ["ai", "python"] },
  { id: "sarvam", name: "Sarvam AI API", level: 80, category: "ai", connections: ["ai", "python"] },
  { id: "javascript", name: "JavaScript", level: 40, category: "frontend", connections: ["react"] },
  { id: "react", name: "React (Learning)", level: 30, category: "learning", connections: ["javascript"] },
  { id: "fastapi", name: "FastAPI (Learning)", level: 30, category: "learning", connections: ["python"] },
];

const PROJECTS = [
{
  id: "brainblitz",
  title: "BrainBlitz",
  subtitle: "AI-Powered Quiz Platform",
  description:
    "AI-powered quiz platform that generates customized MCQs, helping students practice, test their knowledge, and learn smarter.",
  // ── Drop your screenshot in /public/ and update this path ──
  image: "brainblitz-preview.png",
  tech: ["Python", "Streamlit", "AI", "Groq API"],
  color: "#00E5FF",
  github: "https://github.com/karanveernov-png/streamlit-quiz-app",
  live: "https://app-quiz-app-sny6pij5jtq9dbkjkdramj.streamlit.app/",
  category: "AI Product",
  architecture: ["Streamlit", "Python", "AI Engine", "Groq API"]
 },
  {
  id: "studora",
  title: "Studora",
  subtitle: "College Analytics Platform",
  description:
    "AI-powered platform for analyzing college data, generating insights, and visualizing student performance through interactive dashboards.",
  // ── Drop your screenshot in /public/ and update this path ──
  image: "/studora-preview.png",
  tech: ["Python", "Streamlit", "Pandas", "Groq API", "Matplotlib"],
  color: "#7C3AED",
  github: "https://github.com/karanveernov-png/Academia",
  live: "https://studoraacademia.streamlit.app/",
  category: "Data Analytics",
  architecture: [
    "Streamlit Dashboard",
    "Pandas Data Pipeline",
    "Groq AI Engine",
    "Matplotlib Visualization"
  ]
},
];
//  CERtuffications

const CERTIFICATES = [
  {
    id: "infosys-python",
    title: "Infosys Course Completion Certificate In Backend Python",
    issuer: "Infosys",
    date: "April 2026",
    description: "Successfully completed comprehensive backend development course focusing on Python programming, API development, database management, and server-side architecture.",
    image: "infosys-cert.png",
    logo: "🐍",
    color: "#00E5FF",
    link: "https://example.com/verify",
    // --- NEW FIELDS FOR DETAILED VIEW ---
    skills: ["Python", "Backend", "APIs", "Database"],
    credentialId: "INFOSYS-PYTHON-2026",
    status: "Verified",
    issueDate: "April 21, 2026"
  },
  {
    id: "icisft-paper",
    title: "ICISFT Rayat Bahra Research Paper 2026",
    issuer: "ICISFT",
    date: "March 2026",
    description: "Successfully published and presented a research paper on advanced computing technologies at the ICISFT 2026 conference.",
    image: "icisft-cert.png",
    logo: "📄",
    color: "#2DD4BF",
    link: "https://example.com/verify",
    // --- NEW FIELDS FOR DETAILED VIEW ---
    skills: ["Research", "Technical Writing", "Advanced Computing", "Presentation"],
    credentialId: "ICISFT-RB-2026",
    status: "Verified",
    issueDate: "March 15, 2026"
  },
  {
    id: "prompt-engineering-simplilearn",
    title: "Introduction to Prompt Engineering",
    issuer: "Simplilearn SkillUp",
    date: "July 2026",
    description: "Successfully completed the online course covering core principles of prompt engineering, optimizing LLM responses, and practical AI workflow integration.",
    image: "/prompt-engineering-cert.png", // Save your certificate image in /public/ with this name
    logo: "🤖",
    color: "#F59E0B", // Vibrant amber/gold matching the Simplilearn branding
    link: "https://www.simplilearn.com/skillup-certificate-search", // Or your direct verification URL
    // --- NEW FIELDS FOR DETAILED VIEW ---
    skills: ["Prompt Engineering", "Generative AI", "LLMs", "AI Prompting"],
    credentialId: "10510029",
    status: "Verified",
    issueDate: "July 25, 2026"
  },
];

const MILESTONES = [
  {
    year: "2024",
    title: "Started B.Tech CSE",
    desc: "Began the computer science journey. Mastered core foundations like Data Structures, Algorithms, and DBMS.",
  },
  {
    year: "2025",
    title: "Data Analytics & Foundations",
    desc: "Dove deep into Python, Pandas, and Matplotlib. Started turning noisy tables into visual insights and decisions.",
  },
  {
    year: "Early 2026",
    title: "AI Integration & Prompting",
    desc: "Experimented with Groq, Sarvam AI APIs, and local LLMs. Discovered a passion for making machines think.",
  },
  {
    year: "Mid 2026",
    title: "Launched BrainBliz & Studora",
    desc: "Shipped two production AI products end-to-end using Streamlit, handling the entire workflow from database to UI.",
  },
  {
    year: "Summer 2026",
    title: "Industrial Training & Upskilling",
    desc: "Completed software development tasks and tackled advanced coursework in data science and Python programming.",
  },
  {
    year: "Future",
    title: "AI Engineering",
    desc: "Building toward production-grade intelligent automation and comprehensive machine learning applications.",
  },
];

const CAREER_PATH = [
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

const BOOT_LINES = [
  "Initializing Neural Core...",
  "Loading React Runtime...",
  "Loading Projects...",
  "Connecting Data Systems...",
  "Loading AI Modules...",
  "Synchronizing Portfolio...",
  "System Ready.",
];

// ============================================================
// BOOT SEQUENCE COMPONENT
// ============================================================
function BootSequence({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let lineIdx = 0;
    const totalDuration = 2800;
    const lineInterval = totalDuration / BOOT_LINES.length;

    const addLine = () => {
      if (lineIdx < BOOT_LINES.length) {
        setLines(prev => [...prev, BOOT_LINES[lineIdx]]);
        setProgress(Math.round(((lineIdx + 1) / BOOT_LINES.length) * 100));
        lineIdx++;
        if (lineIdx < BOOT_LINES.length) {
          setTimeout(addLine, lineInterval);
        } else {
          setTimeout(() => {
            setDone(true);
            setTimeout(() => {
              setFadeOut(true);
              setTimeout(onComplete, 800);
            }, 400);
          }, 400);
        }
      }
    };
    setTimeout(addLine, 300);
  }, [onComplete]);

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#050816",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9999, fontFamily: "'JetBrains Mono', monospace",
      transition: "opacity 0.8s ease", opacity: fadeOut ? 0 : 1,
      padding: "0 20px",
    }}>
      <div style={{ width: "min(520px, 90vw)" }}>
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <div style={{
            fontSize: 11, letterSpacing: "0.25em", color: "#00E5FF",
            textTransform: "uppercase", marginBottom: 8, opacity: 0.7,
          }}>KARANVEER SINGH — PORTFOLIO v2.0</div>
          <div style={{ width: "100%", height: 1, background: "linear-gradient(90deg, transparent, #00E5FF44, transparent)" }} />
        </div>
        <div style={{ minHeight: 200 }}>
          {lines.map((line, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              marginBottom: 10, animation: "fadeInLine 0.3s ease forwards",
            }}>
              <span style={{ color: done && i === lines.length - 1 ? "#00FFC6" : "#00E5FF", fontSize: 12 }}>
                {done && i === lines.length - 1 ? "✓" : "›"}
              </span>
              <span style={{
                color: done && i === lines.length - 1 ? "#00FFC6" : i === lines.length - 1 ? "#F8FAFC" : "#F8FAFC88",
                fontSize: 13, letterSpacing: "0.05em",
              }}>{line}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "#F8FAFC44", fontSize: 11 }}>LOADING</span>
            <span style={{ color: "#00E5FF", fontSize: 11 }}>{progress}%</span>
          </div>
          <div style={{ height: 2, background: "#ffffff0a", borderRadius: 2, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 2,
              background: "linear-gradient(90deg, #7C3AED, #00E5FF, #00FFC6)",
              width: `${progress}%`, transition: "width 0.4s ease",
              boxShadow: "0 0 12px #00E5FF80",
            }} />
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeInLine { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}

// ============================================================
// CUSTOM CURSOR (desktop only)
// ============================================================
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) dotRef.current.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
    };
    let raf;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`;
      raf = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  if (typeof window !== "undefined" && window.innerWidth < 768) return null;
  return (
    <>
      <div ref={dotRef} style={{ position: "fixed", width: 16, height: 16, borderRadius: "50%", background: "#00E5FF", zIndex: 99999, pointerEvents: "none", boxShadow: "0 0 10px #00E5FF", willChange: "transform", top: 0, left: 0 }} />
      <div ref={ringRef} style={{ position: "fixed", width: 32, height: 32, borderRadius: "50%", border: "1.5px solid #00E5FF66", zIndex: 99998, pointerEvents: "none", willChange: "transform", top: 0, left: 0, transition: "width 0.2s, height 0.2s" }} />
    </>
  );
}

// ============================================================
// PARTICLE BACKGROUND
// ============================================================
function ParticleBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = window.innerWidth, h = window.innerHeight;
    canvas.width = w; canvas.height = h;
    const isMobile = w < 768;
    const COUNT = isMobile ? 40 : 100;

    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5, a: Math.random() * 0.5 + 0.1,
    }));

    const onResize = () => { w = window.innerWidth; h = window.innerHeight; canvas.width = w; canvas.height = h; };
    const onMouse = (e) => { mouseRef.current = { x: e.clientX / w, y: e.clientY / h }; };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse);

    let raf, t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.005;
      const grad = ctx.createRadialGradient(w * (0.3 + mouseRef.current.x * 0.2), h * 0.3, 0, w * 0.5, h * 0.5, w * 0.8);
      grad.addColorStop(0, "rgba(124,58,237,0.06)");
      grad.addColorStop(0.5, "rgba(0,229,255,0.03)");
      grad.addColorStop(1, "rgba(5,8,22,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      if (!isMobile) {
        ctx.strokeStyle = "rgba(0,229,255,0.03)";
        ctx.lineWidth = 0.5;
        for (let x = 0; x < w; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
        for (let y = 0; y < h; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      }

      particles.forEach((p, i) => {
        p.x += p.vx + Math.sin(t + i * 0.1) * 0.1;
        p.y += p.vy + Math.cos(t + i * 0.07) * 0.1;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${p.a})`; ctx.fill();
        if (!isMobile) {
          particles.slice(i + 1, i + 5).forEach(p2 => {
            const dx = p2.x - p.x, dy = p2.y - p.y, d = Math.sqrt(dx * dx + dy * dy);
            if (d < 120) {
              ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(0,229,255,${0.06 * (1 - d / 120)})`; ctx.lineWidth = 0.5; ctx.stroke();
            }
          });
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); window.removeEventListener("mousemove", onMouse); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

// ============================================================
// NAVIGATION
// ============================================================
const NAV_ITEMS = [
  { label: "Core", id: "home" },
  { label: "Story", id: "story" },
  { label: "Galaxy", id: "skills" },
  { label: "Builds", id: "projects" },
  { label: "Certificates", id: "certificates" }, 
  { label: "Path", id: "path" },
  { label: "Uplink", id: "uplink" },
  { label: "Signal", id: "contact", cta: true },
];

function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY;
      setScrolled(s > 60);
      setHidden(s > lastScroll.current + 10 && s > 200);
      if (s < lastScroll.current - 10) setHidden(false);
      lastScroll.current = s;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "0 16px", transition: "all 0.4s ease",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
      }}>
        <div style={{
          maxWidth: 1200, margin: "12px auto 0",
          background: scrolled ? "rgba(5,8,22,0.95)" : "rgba(5,8,22,0.6)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(0,229,255,0.1)",
          borderRadius: 16, padding: "10px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
          transition: "all 0.4s ease",
        }}>
          <button onClick={() => navTo("home")} style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <div style={{
              width: 10, height: 10, borderRadius: "50%",
              background: "linear-gradient(135deg, #00E5FF, #7C3AED)",
              boxShadow: "0 0 10px #00E5FF88",
            }} />
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: 16,
              fontWeight: 700, letterSpacing: "0.08em", color: "#F8FAFC",
            }}>KVS</span>
          </button>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: "flex", gap: 2, alignItems: "center" }}>
            {NAV_ITEMS.map(item => (
              item.cta ? (
                <button key={item.label} onClick={() => navTo(item.id)} style={{
                  marginLeft: 12,
                  background: "linear-gradient(90deg, #00E5FF, #2DD4BF)",
                  border: "none", borderRadius: 100, padding: "8px 20px",
                  color: "#050812", fontSize: 13, fontWeight: 700,
                  cursor: "pointer", fontFamily: "'Inter', sans-serif",
                  boxShadow: "0 0 16px #00E5FF66",
                }}>{item.label}</button>
              ) : (
                <button key={item.label} onClick={() => navTo(item.id)} style={{
                  background: activeSection === item.id ? "rgba(0,229,255,0.08)" : "none",
                  border: "1px solid transparent",
                  borderRadius: 8, padding: "6px 14px", cursor: "pointer",
                  color: activeSection === item.id ? "#00E5FF" : "#F8FAFC77",
                  fontSize: 13, fontFamily: "'Inter', sans-serif",
                  transition: "all 0.2s",
                }}>{item.label}</button>
              )
            ))}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(true)} className="mobile-nav-btn" style={{
            display: "none", background: "none", border: "1px solid rgba(0,229,255,0.2)",
            borderRadius: 8, padding: "8px 12px", cursor: "pointer", color: "#00E5FF",
            fontSize: 18, lineHeight: 1,
          }}>☰</button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 2000,
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
        }} onClick={() => setMobileOpen(false)}>
          <div style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: "min(300px, 80vw)",
            background: "rgba(5,8,18,0.97)", borderLeft: "1px solid rgba(0,229,255,0.15)",
            padding: 32, display: "flex", flexDirection: "column", gap: 8,
          }} onClick={e => e.stopPropagation()}>
            <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#00E5FF", fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 18 }}>KVS</span>
              <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", color: "#F8FAFC88", cursor: "pointer", fontSize: 24 }}>✕</button>
            </div>
            {NAV_ITEMS.map(item => (
              <button key={item.label} onClick={() => navTo(item.id)} style={{
                background: item.cta ? "linear-gradient(90deg, #00E5FF22, #2DD4BF22)" : "none",
                border: item.cta ? "1px solid rgba(0,229,255,0.3)" : "none",
                borderRadius: item.cta ? 8 : 0,
                cursor: "pointer",
                color: item.cta ? "#00E5FF" : "#F8FAFC",
                fontSize: 16, fontFamily: "'Inter'",
                padding: "12px 0", textAlign: "left",
                borderBottom: item.cta ? "none" : "1px solid rgba(255,255,255,0.06)",
                paddingLeft: item.cta ? 16 : 0,
                fontWeight: item.cta ? 700 : 400,
              }}>{item.label}</button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ============================================================
// HERO SECTION
// ============================================================
function Hero() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const roles = ["Future Full Stack Developer", "Data Analyst", "AI Engineer"];
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const pauseBeforeDelete = 2500;
    const pauseBeforeType = 400;
    const currentRole = roles[loopNum % roles.length];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentRole.substring(0, text.length - 1));
        if (text.length === 0) { setIsDeleting(false); setLoopNum(prev => prev + 1); }
      }, deletingSpeed);
    } else {
      if (text.length === currentRole.length) {
        timer = setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
      } else {
        timer = setTimeout(() => {
          setText(currentRole.substring(0, text.length + 1));
        }, text.length === 0 ? pauseBeforeType : typingSpeed);
      }
    }
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: isMobile ? "100px 20px 60px" : "80px 24px 40px",
      position: "relative", overflow: "hidden", textAlign: "center",
    }}>
      {/* Binary decorations - hidden on mobile */}
      {!isMobile && (
        <>
          <div style={{ position: "absolute", top: 0, left: "15%", opacity: 0.03, color: "white", fontSize: 10, writingMode: "vertical-rl", whiteSpace: "nowrap" }}>
            01101001 01101110 01110100 01100101 01101100
          </div>
          <div style={{ position: "absolute", top: "20%", right: "15%", opacity: 0.03, color: "white", fontSize: 10, writingMode: "vertical-rl", whiteSpace: "nowrap" }}>
            10110011 00101011 11001010 01101100
          </div>
        </>
      )}

      {/* 3D Gyroscope Rings - scaled for mobile */}
      <div style={{
        position: "absolute", top: "45%", left: "50%",
        transform: "translate(-50%, -50%)", width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        perspective: "1200px", transformStyle: "preserve-3d",
      }}>
        <div className="animated-ring" style={{
          width: isMobile ? "340px" : "750px", height: isMobile ? "340px" : "750px",
          borderColor: "rgba(253, 224, 71, 0.05)",
          borderTopColor: "rgba(253, 224, 71, 0.4)",
          borderBottomColor: "rgba(253, 224, 71, 0.1)",
          animation: "tumble-x 25s linear infinite",
        }} />
        <div className="animated-ring" style={{
          width: isMobile ? "250px" : "550px", height: isMobile ? "250px" : "550px",
          borderColor: "rgba(125, 211, 252, 0.08)",
          borderLeftColor: "rgba(125, 211, 252, 0.5)",
          animation: "tumble-y 20s linear infinite",
        }} />
        <div className="animated-ring" style={{
          width: isMobile ? "160px" : "350px", height: isMobile ? "160px" : "350px",
          borderColor: "rgba(167, 139, 250, 0.1)",
          borderRightColor: "rgba(167, 139, 250, 0.6)",
          animation: "tumble-reverse 15s linear infinite",
        }} />
        <div style={{
          position: "absolute", width: isMobile ? "240px" : "500px", height: isMobile ? "240px" : "500px",
          background: "radial-gradient(circle, #050816 40%, transparent 70%)",
          borderRadius: "50%", zIndex: 4,
        }} />
        {/* Orbiting tech tags - only on desktop */}
        {!isMobile && (
          <div style={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0, transformStyle: "preserve-3d" }}>
            <div className="orbit-tag" style={{ "--r": "380px", "--dur": "35s", "--delay": "0s" }}>SQL</div>
            <div className="orbit-tag" style={{ "--r": "380px", "--dur": "35s", "--delay": "-17.5s" }}>Pandas</div>
            <div className="orbit-tag" style={{ "--r": "280px", "--dur": "25s", "--delay": "-5s" }}>Docker</div>
            <div className="orbit-tag" style={{ "--r": "280px", "--dur": "25s", "--delay": "-17s" }}>FastAPI</div>
            <div className="orbit-tag" style={{ "--r": "180px", "--dur": "15s", "--delay": "-2s" }}>Python</div>
            <div className="orbit-tag" style={{ "--r": "180px", "--dur": "15s", "--delay": "-9.5s" }}>AI</div>
          </div>
        )}
      </div>

      {/* Foreground content */}
      <div style={{
        maxWidth: 900, width: "100%", zIndex: 20,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
        display: "flex", flexDirection: "column", alignItems: "center",
        marginTop: isMobile ? "0px" : "-40px",
      }}>
        <div style={{
          border: "1px solid rgba(45,212,191,0.3)", borderRadius: "100px",
          padding: "4px 16px", color: "#2DD4BF", fontSize: "11px",
          letterSpacing: "0.15em", marginBottom: "20px",
          display: "flex", alignItems: "center", gap: "8px",
          background: "rgba(45,212,191,0.05)",
        }}>
          <div style={{ width: 6, height: 6, background: "#2DD4BF", borderRadius: "50%" }} />
          SYSTEM ONLINE
        </div>

        <p style={{ color: "#94A3B8", fontSize: isMobile ? "16px" : "18px", marginBottom: "8px", fontFamily: "'Space Grotesk', sans-serif" }}>
          Hello,
        </p>

        <div style={{ display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <span style={{ fontSize: "clamp(40px, 10vw, 85px)", color: "#FFFFFF", fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>I'm</span>
          <span style={{ fontSize: "clamp(40px, 10vw, 85px)", color: "#7DD3FC", fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>Karanveer</span>
        </div>

        <h1 style={{
          fontSize: "clamp(48px, 12vw, 100px)", fontWeight: 600,
          letterSpacing: "-0.01em", lineHeight: 1.1,
          fontFamily: "'Space Grotesk', sans-serif",
          color: "#A78BFA", marginTop: "-10px", marginBottom: "24px",
        }}>Singh</h1>

        <div style={{
          fontSize: isMobile ? "15px" : "clamp(18px, 2.5vw, 24px)", color: "#CBD5E1",
          fontFamily: "'JetBrains Mono', monospace", marginBottom: 32,
          display: "flex", alignItems: "center",
          minHeight: "36px", letterSpacing: "1px",
          flexWrap: "wrap", justifyContent: "center", gap: "4px",
        }}>
          {text}
          <span style={{
            animation: "blink 1s step-end infinite",
            display: "inline-block", width: "2px", height: "26px",
            background: "#2DD4BF", marginLeft: "2px",
          }} />
        </div>

        <p style={{
          color: "#94A3B8", fontSize: isMobile ? "14px" : "16px", maxWidth: 650,
          lineHeight: 1.6, marginBottom: 48, fontFamily: "'Inter', sans-serif",
          padding: isMobile ? "0 4px" : "0",
        }}>
          I build data systems and interfaces that behave like intelligent products — analytics, models and motion in one coherent surface.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", padding: "0 16px" }}>
          <a href="#projects" style={{
            background: "linear-gradient(90deg, #2DD4BF 0%, #A78BFA 100%)",
            border: "none", borderRadius: 100, padding: isMobile ? "12px 24px" : "14px 32px",
            color: "#050812", fontSize: isMobile ? "13px" : "15px", fontWeight: 600, cursor: "pointer",
            fontFamily: "'Inter', sans-serif", textDecoration: "none", whiteSpace: "nowrap",
          }}>Explore Portfolio</a>
          <a href="/resume.pdf" style={{
            background: "rgba(15,23,42,0.6)",
            border: "1px solid rgba(255,255,255,0.15)", borderRadius: 100,
            padding: isMobile ? "12px 24px" : "14px 32px",
            color: "#E2E8F0", fontSize: isMobile ? "13px" : "15px", fontWeight: 500, cursor: "pointer",
            fontFamily: "'Inter', sans-serif", textDecoration: "none", whiteSpace: "nowrap",
          }}>Download Resume</a>
          <a href="#contact" style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100,
            padding: isMobile ? "12px 24px" : "14px 32px",
            color: "#E2E8F0", fontSize: isMobile ? "13px" : "15px", fontWeight: 500, cursor: "pointer",
            fontFamily: "'Inter', sans-serif", textDecoration: "none", whiteSpace: "nowrap",
          }}>Contact Me</a>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animated-ring {
          position: absolute; border-radius: 50%; border-width: 4px; border-style: solid; transform-style: preserve-3d;
        }
        @keyframes tumble-x {
          0% { transform: rotateX(0deg) rotateY(15deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(15deg) rotateZ(180deg); }
        }
        @keyframes tumble-y {
          0% { transform: rotateX(15deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(15deg) rotateY(360deg) rotateZ(180deg); }
        }
        @keyframes tumble-reverse {
          0% { transform: rotateX(360deg) rotateY(360deg) rotateZ(0deg); }
          100% { transform: rotateX(0deg) rotateY(0deg) rotateZ(180deg); }
        }
        .orbit-tag {
          position: absolute; background: rgba(15,23,42,0.8);
          border: 1px solid rgba(255,255,255,0.1); padding: 6px 16px;
          border-radius: 100px; font-size: 12px; color: #94A3B8;
          font-family: 'JetBrains Mono', monospace; letter-spacing: 1px;
          white-space: nowrap; animation: orbit-float var(--dur) linear infinite;
          animation-delay: var(--delay);
        }
        @keyframes orbit-float {
          0%   { transform: rotate(0deg)   translateX(var(--r)) rotate(0deg)   translate(-50%,-50%) scale(1);    z-index: 5; }
          25%  { transform: rotate(90deg)  translateX(var(--r)) rotate(-90deg)  translate(-50%,-50%) scale(1.15); z-index: 5; }
          49.9%{ z-index: 5; }
          50%  { transform: rotate(180deg) translateX(var(--r)) rotate(-180deg) translate(-50%,-50%) scale(0.9);  z-index: 3; }
          75%  { transform: rotate(270deg) translateX(var(--r)) rotate(-270deg) translate(-50%,-50%) scale(0.85); z-index: 3; }
          99.9%{ z-index: 3; }
          100% { transform: rotate(360deg) translateX(var(--r)) rotate(-360deg) translate(-50%,-50%) scale(1);    z-index: 5; }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// SECTION WRAPPER
// ============================================================
function Section({ id, children, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} style={{
      padding: "80px 20px",
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
      transition: "all 0.8s ease", ...style,
    }}>
      {children}
    </section>
  );
}

function SectionMeta({ index, label }) {
  return (
    <div style={{ color: "#00E5FF", fontSize: 12, letterSpacing: "0.2em", marginBottom: 16, fontFamily: "'JetBrains Mono'" }}>
      {index} — {label}
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 style={{
      fontSize: "clamp(28px, 6vw, 60px)", fontWeight: 800,
      fontFamily: "'Space Grotesk'", letterSpacing: "-0.02em",
      color: "#F8FAFC", lineHeight: 1.1, marginBottom: 16,
    }}>{children}</h2>
  );
}

function SectionSub({ children }) {
  return (
    <p style={{ color: "#64748B", fontSize: 15, marginBottom: 48, lineHeight: 1.6 }}>{children}</p>
  );
}

// ============================================================
// STORY SECTION — Mobile-first milestone cards
// ============================================================
function StorySection() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = (window.innerHeight / 1.5 - rect.top) / rect.height;
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="story" ref={containerRef} style={{ padding: "80px 20px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <SectionMeta index="02" label="STORY" />
      <SectionHeading>A path built from curiosity,<br />not checklists.</SectionHeading>
      <SectionSub>Every milestone below unlocked a new way of thinking about data, products and people.</SectionSub>

      {isMobile ? (
        /* Mobile: single column with left timeline */
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", left: 10, top: 0, bottom: 0,
            width: 3, background: "rgba(0,229,255,0.1)", borderRadius: 2, overflow: "hidden",
          }}>
            <div style={{
              width: "100%", height: `${scrollProgress * 100}%`,
              background: "linear-gradient(180deg, transparent, #00E5FF, #00FFC6)",
              transition: "height 0.15s ease-out",
            }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingLeft: 36 }}>
            {MILESTONES.map((m, i) => (
              <MilestoneCardMobile key={i} item={m} index={i} />
            ))}
          </div>
        </div>
      ) : (
        /* Desktop: alternating left-right */
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", left: "50%", top: 0, bottom: 0,
            width: 3, background: "rgba(0,229,255,0.1)",
            transform: "translateX(-50%)", borderRadius: 2, overflow: "hidden",
          }}>
            <div style={{
              width: "100%", height: `${scrollProgress * 100}%`,
              background: "linear-gradient(180deg, transparent, #00E5FF, #00FFC6)",
              transition: "height 0.15s ease-out",
            }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {MILESTONES.map((m, i) => (
              <MilestoneCard key={i} item={m} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MilestoneCardMobile({ item, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      position: "relative",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateX(-20px)",
      transition: `all 0.6s ease ${index * 0.08}s`,
    }}>
      {/* Dot */}
      <div style={{
        position: "absolute", left: -30, top: 20,
        width: 14, height: 14, borderRadius: "50%",
        background: "#050812", border: "2px solid #2DD4BF",
        boxShadow: "0 0 10px #2DD4BF88", zIndex: 2,
      }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#2DD4BF", margin: "2px" }} />
      </div>
      <div style={{
        background: "rgba(15,23,42,0.7)", backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14,
        padding: "20px 20px",
        boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
      }}>
        <div style={{ color: "#00E5FF", fontSize: 11, letterSpacing: "0.15em", fontFamily: "'JetBrains Mono'", marginBottom: 8 }}>
          {item.year}
        </div>
        <div style={{ fontSize: 17, fontWeight: 700, fontFamily: "'Space Grotesk'", color: "#F8FAFC", marginBottom: 8 }}>
          {item.title}
        </div>
        <div style={{ color: "#64748B", fontSize: 13, lineHeight: 1.65 }}>{item.desc}</div>
      </div>
    </div>
  );
}

function MilestoneCard({ item, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      display: "grid", gridTemplateColumns: "1fr 40px 1fr", gap: 0, alignItems: "center",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : `translateX(${isLeft ? "-30px" : "30px"})`,
      transition: `all 0.7s ease ${index * 0.1}s`,
    }}>
      <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: 32 }}>
        {isLeft ? (
          <div style={{
            background: "rgba(15,23,42,0.7)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16,
            padding: "28px 32px", maxWidth: 380, textAlign: "right",
            boxShadow: "0 4px 40px rgba(0,0,0,0.3)",
          }}>
            <div style={{ color: "#00E5FF", fontSize: 11, letterSpacing: "0.15em", fontFamily: "'JetBrains Mono'", marginBottom: 10 }}>{item.year}</div>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Space Grotesk'", color: "#F8FAFC", marginBottom: 10 }}>{item.title}</div>
            <div style={{ color: "#64748B", fontSize: 14, lineHeight: 1.65 }}>{item.desc}</div>
          </div>
        ) : null}
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
        <div style={{
          width: 16, height: 16, borderRadius: "50%",
          background: "#050812", border: "2px solid #2DD4BF",
          boxShadow: "0 0 14px #2DD4BF88", zIndex: 2, flexShrink: 0,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#2DD4BF", margin: "3px" }} />
        </div>
      </div>
      <div style={{ paddingLeft: 32 }}>
        {!isLeft ? (
          <div style={{
            background: "rgba(15,23,42,0.7)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16,
            padding: "28px 32px", maxWidth: 380,
            boxShadow: "0 4px 40px rgba(0,0,0,0.3)",
          }}>
            <div style={{ color: "#00E5FF", fontSize: 11, letterSpacing: "0.15em", fontFamily: "'JetBrains Mono'", marginBottom: 10 }}>{item.year}</div>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Space Grotesk'", color: "#F8FAFC", marginBottom: 10 }}>{item.title}</div>
            <div style={{ color: "#64748B", fontSize: 14, lineHeight: 1.65 }}>{item.desc}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ============================================================
// SKILL GALAXY — dynamic scaling for mobile responsiveness
// ============================================================
function SkillGalaxy() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const currentPositionsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  const activeSkills = useMemo(() => SKILLS.filter(s => s.name !== "Docker" && s.name !== "Power BI"), []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Shrink the internal canvas grid on mobile so elements aren't scaled down as heavily
  const SIZE = isMobile ? 1000 : 1400;

  const basePositions = useMemo(() => {
    const cx = SIZE / 2, cy = SIZE / 2;
    const total = activeSkills.length;
    return activeSkills.map((skill, i) => {
      let layer, angle, radius;
      if (i === 0) { layer = 0; radius = 0; angle = 0; }
      // Pull the orbits slightly tighter on mobile to fit the smaller grid
      else if (i < 5) { layer = 1; radius = isMobile ? 220 : 300; angle = ((i - 1) / 4) * Math.PI * 2 - Math.PI / 2; }
      else { layer = 2; radius = isMobile ? 420 : 590; const rem = total - 5; angle = ((i - 5) / rem) * Math.PI * 2 - Math.PI / 2; }
      return { cx, cy, baseAngle: angle, radius, layer, skill };
    });
  }, [activeSkills, isMobile, SIZE]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = SIZE; canvas.height = SIZE;
    let raf, t = 0;
    const hoveredRef = { current: null };
    const isMob = window.innerWidth < 768; // Capture directly for the drawing loop

    const getEventPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scale = SIZE / rect.width;
      if (e.touches) {
        return {
          x: (e.touches[0].clientX - rect.left) * scale,
          y: (e.touches[0].clientY - rect.top) * scale,
        };
      }
      return {
        x: (e.clientX - rect.left) * scale,
        y: (e.clientY - rect.top) * scale,
      };
    };

    const findNode = (pos) => {
      let found = null;
      // Expand the touch target area for mobile users
      const hitRadius = isMob ? 60 : 40; 
      currentPositionsRef.current.forEach((p, i) => {
        const dx = pos.x - p.x, dy = pos.y - p.y;
        if (Math.sqrt(dx * dx + dy * dy) < hitRadius) found = i;
      });
      return found;
    };

    const onMouseMove = (e) => {
      const pos = getEventPos(e);
      mouseRef.current = pos;
      const found = findNode(pos);
      hoveredRef.current = found; setHovered(found);
    };

    const onTouchStart = (e) => {
      const pos = getEventPos(e);
      mouseRef.current = pos;
      const found = findNode(pos);
      // Only prevent default scrolling if the user is actually tapping a node
      if (found !== null) {
        e.preventDefault();
        hoveredRef.current = found; setHovered(found);
      }
    };

    const onTouchEnd = () => {
      setTimeout(() => { hoveredRef.current = null; setHovered(null); }, 2500);
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      t += 0.002;
      const h = hoveredRef.current;
      const connectedSet = h !== null
        ? new Set(activeSkills[h].connections.map(c => activeSkills.findIndex(s => s.id === c)))
        : new Set();

      currentPositionsRef.current = basePositions.map((p, i) => {
        const orbitSpeed = p.layer === 1 ? 0.4 : -0.2;
        const floatX = Math.cos(t * 5 + p.baseAngle * 3) * 10;
        const floatY = Math.sin(t * 5 + p.baseAngle * 3) * 10;
        return {
          ...p,
          x: p.radius === 0 ? p.cx : p.cx + Math.cos(p.baseAngle + t * orbitSpeed) * p.radius + floatX,
          y: p.radius === 0 ? p.cy : p.cy + Math.sin(p.baseAngle + t * orbitSpeed) * p.radius + floatY,
        };
      });

      const currentPos = currentPositionsRef.current;
      const drawnLines = new Set();
      
      activeSkills.forEach((skill, i) => {
        skill.connections.forEach(connId => {
          const j = activeSkills.findIndex(s => s.id === connId);
          if (j < 0) return;
          const pairKey = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (drawnLines.has(pairKey)) return;
          drawnLines.add(pairKey);
          const a = currentPos[i], b = currentPos[j];
          const isActive = h !== null && (i === h || connectedSet.has(i) || j === h || connectedSet.has(j));
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = isActive ? "rgba(0,229,255,0.7)" : "rgba(0,229,255,0.12)";
          // Make connection lines thicker on mobile
          ctx.lineWidth = isActive ? (isMob ? 4 : 2.5) : (isMob ? 1.5 : 0.8); 
          ctx.stroke();
        });
      });

      activeSkills.forEach((skill, i) => {
        const pos = currentPos[i];
        const isHovered = i === h, isConnected = connectedSet.has(i);
        
        // Dynamically boost node sizes on mobile
        const baseR = isMob ? 38 : 24;
        const connR = isMob ? 52 : 36;
        const hovR = isMob ? 64 : 48;
        const r = isHovered ? hovR : isConnected ? connR : baseR;
        
        const alpha = h === null ? 0.9 : (isHovered || isConnected ? 1 : 0.2);
        const colors = { core: "#00E5FF", frontend: "#7C3AED", backend: "#00FFC6", data: "#F59E0B", tools: "#EC4899", ai: "#10B981", learning: "#6366F1" };
        const color = colors[skill.category] || "#00E5FF";

        if (isHovered || isConnected || h === null) {
          const glowSize = (isHovered || isConnected) ? r * 2.8 : r * 1.8;
          const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, glowSize);
          glow.addColorStop(0, color + (isHovered ? "99" : "44")); glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(pos.x, pos.y, glowSize, 0, Math.PI * 2); ctx.fill();
        }

        ctx.beginPath(); ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.globalAlpha = alpha; ctx.fill(); ctx.globalAlpha = 1;

        // Dynamically boost font sizes and push the text down a bit further on mobile
        const fontBase = isMob ? 28 : 17;
        const fontHov = isMob ? 34 : 22;
        const fontSize = isHovered ? fontHov : fontBase;
        
        ctx.font = `${isHovered ? 700 : 500} ${fontSize}px 'Inter', sans-serif`;
        ctx.fillStyle = isHovered ? "#FFFFFF" : isConnected ? "#F8FAFCee" : "#F8FAFC88";
        ctx.textAlign = "center";
        ctx.fillText(skill.name, pos.x, pos.y + r + (isMob ? 36 : 26));
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [basePositions, activeSkills, SIZE]);

  const hoveredSkill = hovered !== null ? activeSkills[hovered] : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center", padding: "20px 0" }}>
      <div ref={containerRef} style={{ width: "100%", position: "relative" }}>
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            cursor: hovered !== null ? "pointer" : "crosshair",
            filter: "drop-shadow(0 0 30px rgba(0,229,255,0.12))",
            touchAction: "pan-y", // Allows vertical scrolling on mobile when touching the canvas
          }}
        />
      </div>
      <div style={{ width: "100%", maxWidth: 540 }}>
        {hoveredSkill ? (
          <div style={{
            background: "rgba(15,23,42,0.75)", backdropFilter: "blur(16px)",
            border: "1px solid rgba(0,229,255,0.35)", borderRadius: 18, padding: "24px 28px",
            animation: "fadeIn 0.2s ease",
          }}>
            <div style={{ color: "#00E5FF", fontSize: 22, fontWeight: 700, marginBottom: 10, fontFamily: "'Space Grotesk'" }}>{hoveredSkill.name}</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
              {hoveredSkill.connections.map(c => {
                const sk = activeSkills.find(s => s.id === c);
                return sk ? <span key={c} style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", borderRadius: 6, padding: "5px 12px", fontSize: 13, color: "#E9D5FF" }}>{sk.name}</span> : null;
              })}
            </div>
            <div style={{ height: 7, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${hoveredSkill.level}%`, background: "linear-gradient(90deg, #7C3AED, #00E5FF)", borderRadius: 4 }} />
            </div>
            <div style={{ color: "#94A3B8", fontSize: 13, marginTop: 10 }}>Proficiency: {hoveredSkill.level}%</div>
          </div>
        ) : (
          <div style={{
            color: "#64748B", fontSize: 14, fontFamily: "'JetBrains Mono'",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
            padding: "20px 24px", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 16,
            textAlign: "center",
          }}>
            {isMobile ? "Tap a node to explore connections" : "Hover a node to explore connections"}
          </div>
        )}
      </div>
    </div>
  );
}

function GalaxySection() {
  return (
    <div id="skills" style={{ padding: "80px 20px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <SectionMeta index="03" label="GALAXY" />
      <SectionHeading>Skill Galaxy</SectionHeading>
      <SectionSub>Hover over a skill node to explore its connections and see how the technologies relate.</SectionSub>
      <SkillGalaxy />
    </div>
  );
}

// ============================================================
// PROJECT CARD + MODAL — with anime border-beam stroke animation
// ============================================================
function ProjectCard({ project, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [svgDims, setSvgDims] = useState({ w: 0, h: 0 });
  const cardRef  = useRef(null);
  const beamRef  = useRef(null);   // the animated SVG <rect>
  const animRef  = useRef(null);   // RAF handle
  const offsetRef = useRef(0);     // current beam offset (mutable, no re-render)
  const dimsRef   = useRef({ w: 0, h: 0 }); // latest dims (mutable)

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width * 20;
    const y = -(e.clientY - rect.top - rect.height / 2) / rect.height * 20;
    setTilt({ x, y });
  };

  const handleLinkClick = (e, url) => {
    if (!url || url === "#") return;
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Track card dimensions via ResizeObserver (no scroll/resize listener needed)
  useEffect(() => {
    if (!cardRef.current) return;
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      dimsRef.current = { w: width, h: height };
      setSvgDims({ w: width, h: height });
    });
    ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, []);

  // Stable RAF loop — reads dimsRef so it never needs to restart
  useEffect(() => {
    const BORDER_RADIUS = 19;
    const BEAM_LEN = 110;  // visible stroke segment in px

    const animate = () => {
      const { w, h } = dimsRef.current;
      if (w > 0 && h > 0 && beamRef.current) {
        // Rounded-rect perimeter  ≈  2(w-2 + h-2) – (8 – 2π)·r
        const perim = 2 * (w - 2 + h - 2) - (8 - 2 * Math.PI) * BORDER_RADIUS;
        const gap   = Math.max(1, perim - BEAM_LEN);
        // ~3-second lap: perim px / (60 fps × 3 s)
        const speed = perim / 180;

        offsetRef.current = (offsetRef.current + speed) % perim;
        beamRef.current.setAttribute("stroke-dasharray",  `${BEAM_LEN} ${gap}`);
        beamRef.current.setAttribute("stroke-dashoffset", String(-offsetRef.current));
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []); // runs once — stable loop

  const filterId = `beam-glow-${project.id}`;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={onMouseMove}
      onClick={() => onOpen(project)}
      style={{
        background: "rgba(8,12,28,0.92)",
        border: `1px solid ${hovered ? project.color + "60" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 20, cursor: "pointer",
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${hovered ? 1.02 : 1})`,
        transition: "border-color 0.3s, transform 0.1s, box-shadow 0.3s",
        boxShadow: hovered
          ? `0 24px 64px rgba(0,0,0,0.55), 0 0 48px ${project.color}28`
          : "0 4px 24px rgba(0,0,0,0.3)",
        position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}
    >

      {/* ── Anime border-beam SVG overlay (sits on top of everything) ── */}
      {svgDims.w > 0 && svgDims.h > 0 && (
        <svg
          aria-hidden="true"
          style={{
            position: "absolute", top: 0, left: 0,
            width: svgDims.w, height: svgDims.h,
            pointerEvents: "none", zIndex: 20,
            borderRadius: 20, overflow: "hidden",
          }}
        >
          <defs>
            <filter id={filterId} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" result="outerBlur" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="innerBlur" />
              <feMerge>
                <feMergeNode in="outerBlur" />
                <feMergeNode in="innerBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Faint base ring */}
          <rect x="1" y="1" width={svgDims.w - 2} height={svgDims.h - 2}
            rx="19" ry="19" fill="none"
            stroke={project.color + "18"} strokeWidth="1.5" />
          {/* Animated energy beam */}
          <rect ref={beamRef} x="1" y="1" width={svgDims.w - 2} height={svgDims.h - 2}
            rx="19" ry="19" fill="none"
            stroke={project.color} strokeWidth="2.5" strokeLinecap="round"
            filter={`url(#${filterId})`} />
        </svg>
      )}

      {/* ── Screenshot / Preview Image ── */}
      <div style={{
        position: "relative", height: 210, overflow: "hidden",
        borderRadius: "20px 20px 0 0", flexShrink: 0,
      }}>
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            style={{
              width: "100%", height: "100%", objectFit: "cover", objectPosition: "top",
              display: "block",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.5s cubic-bezier(0.2,0.8,0.2,1)",
            }}
            onError={e => { e.currentTarget.style.display = "none"; }}
          />
        ) : (
          /* Gradient placeholder when no image is provided */
          <div style={{
            width: "100%", height: "100%",
            background: `linear-gradient(135deg, ${project.color}18 0%, rgba(5,8,18,0.95) 100%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              fontSize: 56, opacity: 0.15,
              background: `linear-gradient(135deg, ${project.color}, #fff)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>◈</div>
          </div>
        )}

        {/* Bottom gradient — fades image into card body */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 35%, rgba(8,12,28,0.7) 70%, rgba(8,12,28,0.98) 100%)",
          pointerEvents: "none",
        }} />

        {/* Category badge — top-right inside image */}
        <span style={{
          position: "absolute", top: 14, right: 14, zIndex: 2,
          background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
          border: `1px solid ${project.color}55`,
          borderRadius: 6, padding: "4px 11px",
          fontSize: 10, color: project.color,
          fontFamily: "'JetBrains Mono'", letterSpacing: "0.1em",
        }}>{project.category}</span>

        {/* Hover arrow — top-left */}
        <div style={{
          position: "absolute", top: 14, left: 14, zIndex: 2,
          opacity: hovered ? 1 : 0, transition: "opacity 0.25s",
          color: "#fff", fontSize: 18, filter: "drop-shadow(0 0 6px #fff8)",
        }}>↗</div>
      </div>

      {/* ── Text body ── */}
      <div style={{ padding: "22px 24px 24px", display: "flex", flexDirection: "column", flex: 1, position: "relative", zIndex: 6 }}>

        {/* Title + subtitle */}
        <h3 style={{
          fontFamily: "'Space Grotesk'", fontSize: 22, fontWeight: 700,
          marginBottom: 4, color: "#F8FAFC", lineHeight: 1.2,
        }}>{project.title}</h3>
        <div style={{ color: project.color, fontSize: 12, marginBottom: 12, fontFamily: "'JetBrains Mono'", letterSpacing: "0.04em" }}>{project.subtitle}</div>

        {/* Description */}
        <p style={{ color: "#94A3B8", fontSize: 13.5, lineHeight: 1.65, marginBottom: 18, flex: 1 }}>{project.description}</p>

        {/* Tech tags */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
          {project.tech.map(t => (
            <span key={t} style={{
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.11)",
              borderRadius: 6, padding: "4px 10px", fontSize: 11, color: "#CBD5E1",
              fontFamily: "'JetBrains Mono'",
            }}>{t}</span>
          ))}
        </div>

        {/* ── Footer: View Project + icon buttons ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16,
        }}>
          {/* Primary CTA — matches reference "View Project ↗ →" */}
          <a
            href={project.live && project.live !== "#" ? project.live : project.github}
            target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              color: project.color, fontSize: 14, fontWeight: 700,
              textDecoration: "none", fontFamily: "'Space Grotesk'",
              transition: "gap 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.gap = "12px"}
            onMouseLeave={e => e.currentTarget.style.gap = "8px"}
          >
            <span style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 22, height: 22, borderRadius: "50%",
              border: `1.5px solid ${project.color}`,
              fontSize: 11,
            }}>↗</span>
            View Project&nbsp;→
          </a>

          {/* Secondary icon buttons */}
          <div style={{ display: "flex", gap: 6 }}>
            {project.github && project.github !== "#" && (
              <button
                onClick={e => handleLinkClick(e, project.github)}
                title="GitHub"
                style={{
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8, padding: "7px 12px", color: "#94A3B8",
                  fontSize: 11, cursor: "pointer", fontFamily: "'JetBrains Mono'",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#F8FAFC"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#94A3B8"; }}
              >GitHub</button>
            )}
            <button
              onClick={e => { e.stopPropagation(); onOpen(project); }}
              title="See project details"
              style={{
                background: project.color + "15", border: `1px solid ${project.color}40`,
                borderRadius: 8, padding: "7px 12px", color: project.color,
                fontSize: 11, cursor: "pointer", fontFamily: "'JetBrains Mono'",
                whiteSpace: "nowrap", transition: "all 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = project.color + "28"}
              onMouseLeave={e => e.currentTarget.style.background = project.color + "15"}
            >Details</button>
          </div>
        </div>
      </div>
    </div>
  );
}
function ProjectModal({ project, onClose }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.removeEventListener("resize", checkMobile);
    };
  }, [onClose]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 5000,
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: isMobile ? "16px" : "24px", animation: "fadeIn 0.2s ease",
    }} onClick={onClose}>
      <div style={{
        background: "rgba(5,8,18,0.98)", border: `1px solid ${project.color}44`,
        borderRadius: 20, padding: isMobile ? "24px 20px" : "40px",
        maxWidth: 800, width: "100%", maxHeight: "88vh", overflow: "auto",
        animation: "scaleIn 0.3s ease",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, gap: 16 }}>
          <div>
            <span style={{ background: project.color + "22", border: `1px solid ${project.color}44`, borderRadius: 6, padding: "3px 10px", fontSize: 11, color: project.color, fontFamily: "'JetBrains Mono'" }}>{project.category}</span>
            <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(22px,5vw,36px)", fontWeight: 800, marginTop: 12, color: "#F8FAFC" }}>{project.title}</h2>
            <div style={{ color: project.color, fontSize: 15 }}>{project.subtitle}</div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "8px 14px", color: "#F8FAFC88", cursor: "pointer", fontSize: 18, flexShrink: 0 }}>✕</button>
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ color: "#F8FAFC44", fontSize: 11, letterSpacing: "0.15em", marginBottom: 14, fontFamily: "'JetBrains Mono'" }}>ARCHITECTURE</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            {project.architecture.map((layer, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ background: project.color + "15", border: `1px solid ${project.color}33`, borderRadius: 8, padding: "8px 14px", fontSize: 12, color: project.color, fontFamily: "'JetBrains Mono'" }}>{layer}</div>
                {i < project.architecture.length - 1 && <div style={{ color: project.color + "66", fontSize: 14 }}>↓</div>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 28 }}>
          {[{ label: "PROBLEM", value: project.problem }, { label: "SOLUTION", value: project.solution }].map(({ label, value }) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 18 }}>
              <div style={{ color: "#F8FAFC44", fontSize: 10, letterSpacing: "0.15em", marginBottom: 8, fontFamily: "'JetBrains Mono'" }}>{label}</div>
              <div style={{ color: "#F8FAFCcc", fontSize: 13, lineHeight: 1.6 }}>{value}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ color: "#F8FAFC44", fontSize: 11, letterSpacing: "0.15em", marginBottom: 12, fontFamily: "'JetBrains Mono'" }}>TECH STACK</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {project.tech.map(t => <span key={t} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "6px 14px", fontSize: 13, color: "#F8FAFC" }}>{t}</span>)}
          </div>
        </div>

        {/* Links section */}
        <div>
          <div style={{ color: "#F8FAFC44", fontSize: 11, letterSpacing: "0.15em", marginBottom: 12, fontFamily: "'JetBrains Mono'" }}>PROJECT LINKS</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {project.github && project.github !== "#" ? (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                style={{
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 10, padding: "12px 24px", color: "#F8FAFC",
                  textDecoration: "none", fontSize: 13, fontFamily: "'JetBrains Mono'",
                  display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
              >
                <span>⌥</span> View on GitHub →
              </a>
            ) : (
              <div style={{
                background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.1)",
                borderRadius: 10, padding: "12px 24px", color: "#F8FAFC44",
                fontSize: 12, fontFamily: "'JetBrains Mono'",
              }}>
                GitHub — Coming Soon
              </div>
            )}
            {project.live && project.live !== "#" && project.live !== "" ? (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                style={{
                  background: `linear-gradient(135deg, ${project.color}, #7C3AED)`,
                  border: "none", borderRadius: 10, padding: "12px 24px",
                  color: "#050816", textDecoration: "none", fontSize: 13,
                  fontWeight: 700, fontFamily: "'JetBrains Mono'",
                  display: "flex", alignItems: "center", gap: 8,
                }}
              >
                ↗ Live Demo
              </a>
            ) : (
              <div style={{
                background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.1)",
                borderRadius: 10, padding: "12px 24px", color: "#F8FAFC44",
                fontSize: 12, fontFamily: "'JetBrains Mono'",
              }}>
                Live Demo — Coming Soon
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BuildsSection() {
  const [openProject, setOpenProject] = useState(null);
  
  return (
    <div 
      id="projects" 
      style={{ 
        padding: "80px 20px", 
        maxWidth: 1100, 
        margin: "0 auto", 
        position: "relative", 
        // Update the zIndex dynamically here:
        zIndex: openProject ? 9999 : 1 
      }}
    >
      <SectionMeta index="04" label="BUILDS" />
      <SectionHeading>Project Modules</SectionHeading>
      <SectionSub>Things I've built that are alive and doing something useful.</SectionSub>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(380px,100%),1fr))", gap: 24, alignItems: "start" }}>
        {PROJECTS.map(p => <ProjectCard key={p.id} project={p} onOpen={setOpenProject} />)}
      </div>
      {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
    </div>
  );
}

// ============================================================
// CERTIFICATE DETAIL PAGE (Full-page view matching screenshot)
// ============================================================
function CertificateModal({ cert, onClose }) {
  const [isMobile, setIsMobile] = useState(false);
  const [imgExpanded, setImgExpanded] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.removeEventListener("resize", checkMobile);
    };
  }, [onClose]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 6000,
      background: "#050812",
      display: "flex", flexDirection: "column",
      animation: "fadeIn 0.25s ease",
      overflowY: "auto",
    }}>
      {/* ── Top bar ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(5,8,18,0.95)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 20px", height: 52, flexShrink: 0,
      }}>
        {/* Left: initials + back */}
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #00E5FF, #7C3AED)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 800, color: "#050812",
            fontFamily: "'Space Grotesk'", marginRight: 16, flexShrink: 0,
          }}>KVS</div>
          <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.12)", marginRight: 16 }} />
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#00E5FF", fontSize: 13, fontFamily: "'Inter'",
            display: "flex", alignItems: "center", gap: 6, padding: 0,
          }}>
            <span style={{ fontSize: 15 }}>‹</span> Back to Certificates
          </button>
        </div>

        {/* Right: label */}
        <div style={{
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 8, padding: "6px 14px", fontSize: 12,
          color: "#F8FAFCcc", fontFamily: "'JetBrains Mono'",
          display: "flex", alignItems: "center", gap: 7,
        }}>
          <span style={{ fontSize: 13 }}>🪪</span> Credentials Details
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{
        flex: 1,
        maxWidth: 1100, margin: "0 auto", width: "100%",
        padding: isMobile ? "32px 16px 60px" : "52px 40px 80px",
      }}>
        {/* Verified badge + title */}
        <div style={{ marginBottom: 20 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "rgba(124,58,237,0.18)", border: "1px solid rgba(124,58,237,0.35)",
            borderRadius: 100, padding: "5px 14px",
            fontSize: 11, color: "#A78BFA", fontFamily: "'JetBrains Mono'",
            marginBottom: 18,
          }}>
            🔒 VERIFIED CREDENTIAL
          </span>

          <h1 style={{
            fontFamily: "'Space Grotesk'",
            fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(28px,3.5vw,44px)",
            fontWeight: 800, color: "#F8FAFC", lineHeight: 1.2, marginBottom: 14,
          }}>{cert.title}</h1>

          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "#94A3B8" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", display: "inline-block", boxShadow: "0 0 6px #22C55E" }} />
              Issued by: <strong style={{ color: "#F8FAFC" }}>{cert.issuer}</strong>
            </span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
            <span style={{ fontSize: 14, color: "#94A3B8" }}>
              Date: <strong style={{ color: "#F8FAFC" }}>{cert.date}</strong>
            </span>
          </div>

          <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.7, maxWidth: 640 }}>{cert.description}</p>
        </div>

        {/* ── Two-column layout ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 340px",
          gap: 24, alignItems: "start", marginTop: 32,
        }}>
          {/* Left: Certificate image preview */}
          <div style={{
            background: "rgba(15,23,42,0.5)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20, padding: 24,
          }}>
            <div
              onClick={() => setImgExpanded(true)}
              style={{
                background: "#FFF", borderRadius: 12, overflow: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center",
                minHeight: 280, cursor: "zoom-in", position: "relative",
              }}
            >
              {cert.image ? (
                <img
                  src={cert.image}
                  alt={cert.title}
                  style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
                  onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                />
              ) : null}
              {/* Fallback when no image / image fails */}
              <div style={{
                display: cert.image ? "none" : "flex",
                flexDirection: "column", alignItems: "center", justifyContent: "center",
                width: "100%", minHeight: 280, gap: 12,
              }}>
                <span style={{ fontSize: 64 }}>{cert.logo}</span>
                <span style={{ fontSize: 13, color: "#64748B", fontFamily: "'JetBrains Mono'" }}>Certificate Preview</span>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: 12, color: "#F59E0B", fontSize: 12, fontFamily: "'Inter'" }}>
              🖱 Click image to view full size
            </div>
          </div>

          {/* Right: Info panels + buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Skills Validated */}
            <div style={{
              background: "rgba(15,23,42,0.5)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16, padding: "20px 22px",
            }}>
              <div style={{ color: cert.color, fontSize: 13, fontWeight: 700, fontFamily: "'Space Grotesk'", marginBottom: 14 }}>
                Skills Validated
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cert.skills.map(s => (
                  <span key={s} style={{
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: 8, padding: "6px 14px", fontSize: 13, color: "#F8FAFCdd",
                    fontFamily: "'Inter'",
                  }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Verification Details */}
            <div style={{
              background: "rgba(15,23,42,0.5)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16, padding: "20px 22px",
            }}>
              <div style={{ color: cert.color, fontSize: 13, fontWeight: 700, fontFamily: "'Space Grotesk'", marginBottom: 16 }}>
                Verification Details
              </div>
              {[
                { label: "Credential ID", value: cert.credentialId, mono: true },
                { label: "Status", value: cert.status, green: true },
                { label: "Issue Date", value: cert.issueDate },
              ].map(row => (
                <div key={row.label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <span style={{ color: "#64748B", fontSize: 13 }}>{row.label}</span>
                  <span style={{
                    fontSize: 13,
                    color: row.green ? "#22C55E" : "#F8FAFCcc",
                    fontFamily: row.mono ? "'JetBrains Mono'" : "'Inter'",
                    display: "flex", alignItems: "center", gap: 5,
                  }}>
                    {row.green && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E", display: "inline-block", boxShadow: "0 0 6px #22C55E" }} />}
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Verify Online button */}
            <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
              border: "none", borderRadius: 12, padding: "15px 24px",
              color: "#FFF", textDecoration: "none", fontSize: 14, fontWeight: 700,
              fontFamily: "'Space Grotesk'", cursor: "pointer",
              boxShadow: "0 4px 20px rgba(124,58,237,0.35)",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 28px rgba(124,58,237,0.55)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(124,58,237,0.35)"}
            >
              <span style={{ fontSize: 15 }}>↗</span> Verify Online
            </a>

            {/* Contact button */}
            <a href={`mailto:karanveersinghk014@gmail.com?subject=Question about: ${cert.title}`} style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 12, padding: "14px 24px",
              color: "#F8FAFCcc", textDecoration: "none", fontSize: 14, fontWeight: 600,
              fontFamily: "'Space Grotesk'", cursor: "pointer",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
            >
              ✉ Questions? Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "20px 40px", textAlign: "center",
        color: "#F8FAFC22", fontSize: 12, fontFamily: "'Inter'",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        flexShrink: 0,
      }}>
        © 2026 Karanveer Singh. All Rights Reserved <span style={{ color: "#EF4444" }}>❤</span>
      </div>

      {/* ── Lightbox when image is clicked ── */}
      {imgExpanded && (
        <div
          onClick={() => setImgExpanded(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 9000,
            background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 24, cursor: "zoom-out",
          }}
        >
          <img
            src={cert.image}
            alt={cert.title}
            style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", borderRadius: 12, boxShadow: "0 20px 80px rgba(0,0,0,0.8)" }}
          />
          <button
            onClick={() => setImgExpanded(false)}
            style={{
              position: "absolute", top: 20, right: 20,
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 10, width: 40, height: 40, cursor: "pointer",
              color: "#F8FAFC", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >✕</button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// CERTIFICATES SECTION
// ============================================================
function CertificatesSection({ onOpenCert }) {
  return (
    <div id="certificates" style={{ padding: "80px 20px", maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <SectionMeta index="04.5" label="ACHIEVEMENTS" />
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 20 }}>
        <div>
          <SectionHeading>Certificates</SectionHeading>
          <SectionSub>Here are some of my certifications and achievements.</SectionSub>
        </div>
        <div style={{
          width: 50, height: 50, borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.02))",
          border: "1px solid rgba(255, 215, 0, 0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 20px rgba(255, 215, 0, 0.1)"
        }}>
          <span style={{ fontSize: 24 }}>⭐</span>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <button style={{
          background: "linear-gradient(135deg, #7C3AED, #9333EA)",
          border: "none", borderRadius: 8, padding: "8px 20px",
          color: "#FFF", fontSize: 13, fontWeight: 600, cursor: "pointer"
        }}>All</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {CERTIFICATES.map((cert) => (
          <div key={cert.id} onClick={() => onOpenCert(cert)} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "rgba(15,23,42,0.4)", border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: 16, padding: "16px 24px", cursor: "pointer",
            transition: "all 0.2s", gap: 16,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(15,23,42,0.8)";
            e.currentTarget.style.borderColor = cert.color + "55";
            e.currentTarget.style.transform = "translateX(8px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(15,23,42,0.4)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
            e.currentTarget.style.transform = "none";
          }}>
            
            <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, background: "#FFF",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, flexShrink: 0
              }}>
                {cert.logo}
              </div>
              
              <div>
                <h4 style={{ color: "#F8FAFC", fontSize: 15, fontWeight: 600, fontFamily: "'Space Grotesk'", marginBottom: 4 }}>{cert.title}</h4>
                <div style={{ color: "#94A3B8", fontSize: 13 }}>
                  {cert.issuer} <br/>
                  <span style={{ fontSize: 11, opacity: 0.7 }}>Issued: {cert.date}</span>
                </div>
              </div>
            </div>

            <div style={{
              color: "#94A3B8", fontSize: 13, fontWeight: 600, 
              display: "flex", alignItems: "center", gap: 6, flexShrink: 0
            }}>
              Visit <span style={{ fontSize: 14 }}>↗</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
        <button style={{
          background: "linear-gradient(135deg, #7C3AED, #9333EA)",
          border: "none", borderRadius: 100, padding: "12px 32px",
          color: "#FFF", fontSize: 14, fontWeight: 600, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 8
        }}>
          View All Certificates 🪪
        </button>
      </div>
    </div>
  );
}


// ============================================================
// PATH SECTION
// ============================================================
function PathSection() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = (window.innerHeight / 1.5 - rect.top) / rect.height;
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="path" ref={containerRef} style={{ padding: "80px 20px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <SectionMeta index="05" label="PATH" />
      <SectionHeading>Energy cables between<br />the milestones.</SectionHeading>
      <SectionSub>The trajectory so far, tracked as the page moves with you.</SectionSub>

      <div style={{ position: "relative", maxWidth: 700 }}>
        <div style={{
          position: "absolute", left: 12, top: 0, bottom: 0,
          width: 3, background: "rgba(0,229,255,0.08)", borderRadius: 2, overflow: "hidden",
        }}>
          <div style={{
            width: "100%", height: `${scrollProgress * 100}%`,
            background: "linear-gradient(180deg, #00E5FF 0%, #7C3AED 100%)",
            transition: "height 0.15s ease-out",
          }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {CAREER_PATH.map((item, i) => (
            <PathCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PathCard({ item, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      display: "flex", gap: 24, alignItems: "flex-start",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateX(-24px)",
      transition: `all 0.6s ease ${index * 0.12}s`,
    }}>
      <div style={{ flexShrink: 0, width: 26, display: "flex", justifyContent: "center", paddingTop: 22 }}>
        <div style={{
          width: 10, height: 10, borderRadius: "50%",
          background: "#2DD4BF", boxShadow: "0 0 12px #2DD4BF",
          border: "2px solid #050812",
        }} />
      </div>
      <div style={{
        flex: 1, background: "rgba(15,23,42,0.65)", backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14,
        padding: "20px 20px", boxShadow: "0 4px 30px rgba(0,0,0,0.25)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6, flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontFamily: "'Space Grotesk'", fontSize: 17, fontWeight: 700, color: "#F8FAFC" }}>{item.title}</span>
          <span style={{ color: "#2DD4BF", fontSize: 12, fontFamily: "'JetBrains Mono'", letterSpacing: "0.05em" }}>{item.period}</span>
        </div>
        <div style={{ color: "#64748B", fontSize: 13, marginBottom: 10, fontStyle: "italic" }}>{item.org}</div>
        <div style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.65 }}>{item.desc}</div>
      </div>
    </div>
  );
}

// ============================================================
// SIGNAL (CONTACT) SECTION
// ============================================================
const TERMINAL_COMMANDS = {
  help: () => "Commands: about · skills · email · github · linkedin · clear",
  about: () => "Karanveer Singh — B.Tech CSE @ Rayat Bahra University. Building AI products and data systems.",
  skills: () => "Python · Pandas · NumPy · Matplotlib · Streamlit · Groq API · Sarvam AI · Git · SQL",
  email: () => `Email: ${PROFILE.email}`,
  github: () => { window.open(PROFILE.github, "_blank"); return "Opening GitHub..."; },
  linkedin: () => { window.open(PROFILE.linkedin, "_blank"); return "Opening LinkedIn..."; },
  clear: () => "__CLEAR__",
};

function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([{ type: "system", text: "Welcome. Type 'help' to see commands." }]);
  const endRef = useRef(null);

  useEffect(() => {
    if (history.length > 1) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  const run = () => {
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;
    const handler = TERMINAL_COMMANDS[cmd];
    const result = handler ? handler() : `Command not found: '${cmd}'.`;
    if (result === "__CLEAR__") {
      setHistory([{ type: "system", text: "Terminal cleared." }]);
    } else {
      setHistory(h => [...h, { type: "input", text: cmd }, { type: "output", text: result }]);
    }
    setInput("");
  };

  return (
    <div style={{
      background: "rgba(0,0,0,0.6)", border: "1px solid rgba(0,229,255,0.2)",
      borderRadius: 16, padding: 20, fontFamily: "'JetBrains Mono'", fontSize: 13,
      maxHeight: 280, display: "flex", flexDirection: "column", overflow: "hidden",
    }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
      </div>
      <div style={{ flex: 1, overflow: "auto", marginBottom: 12 }}>
        {history.map((h, i) => (
          <div key={i} style={{ marginBottom: 6, color: h.type === "input" ? "#00E5FF" : h.type === "system" ? "#F8FAFC88" : "#00FFC6", wordBreak: "break-word" }}>
            {h.type === "input" ? `> ${h.text}` : h.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ color: "#00E5FF" }}>›</span>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && run()}
          placeholder="Type a command..."
          style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#F8FAFC", fontFamily: "'JetBrains Mono'", fontSize: 13, minWidth: 0 }}
        />
      </div>
    </div>
  );
}

// ── EmailJS config — fill these in from your EmailJS dashboard ──
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // e.g. "service_xxxxxxx"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // e.g. "template_xxxxxxx"
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // e.g. "aBcDeFgHiJkLmNoPq"

function SignalSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ type: "", text: "" }); // type: "success" | "error" | "sending" | ""
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Load EmailJS SDK once
  useEffect(() => {
    if (window.emailjs) return;
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = () => window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    document.head.appendChild(script);
  }, []);

  const openMailto = () => {
    const sub  = encodeURIComponent(form.subject || "Portfolio Contact");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${sub}&body=${body}`;
  };

  const submit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", text: "Please fill in all required fields." });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setStatus({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    // If EmailJS isn't configured yet, fall back to mailto
    if (
      EMAILJS_SERVICE_ID  === "YOUR_SERVICE_ID" ||
      EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID" ||
      EMAILJS_PUBLIC_KEY  === "YOUR_PUBLIC_KEY"
    ) {
      openMailto();
      return;
    }

    setStatus({ type: "sending", text: "Sending…" });

    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:    form.name,
        from_email:   form.email,
        subject:      form.subject || "Portfolio Contact",
        message:      form.message,
        to_email:     PROFILE.email,
        reply_to:     form.email,
      });
      setStatus({ type: "success", text: "Message sent! I'll get back to you soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus({ type: "", text: "" }), 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus({
        type: "error",
        text: "Couldn't send via form. Click below to email directly.",
      });
    }
  };

  return (
    <div id="contact" style={{ padding: "80px 20px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <SectionMeta index="07" label="SIGNAL" />
      <SectionHeading>Let's Connect</SectionHeading>
      <SectionSub>Open to opportunities in data analytics, full-stack development, and AI engineering.</SectionSub>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 32 }}>
        <Terminal />
        <div>
          {status.text && (
            <div style={{
              background: status.type === "error" ? "rgba(255,80,80,0.1)" : "rgba(0,255,198,0.1)",
              border: `1px solid ${status.type === "error" ? "rgba(255,80,80,0.3)" : "rgba(0,255,198,0.3)"}`,
              borderRadius: 10, padding: "12px 16px", marginBottom: 20,
              color: status.type === "error" ? "#FF6B6B" : "#00FFC6", fontSize: 13,
              display: "flex", flexDirection: "column", gap: 8,
            }}>
              {status.text}
              {status.type === "error" && (
                <button onClick={openMailto} style={{
                  background: "none", border: "1px solid rgba(255,107,107,0.4)", borderRadius: 8,
                  padding: "6px 12px", color: "#FF6B6B", fontSize: 12, cursor: "pointer",
                  fontFamily: "'Inter'", alignSelf: "flex-start",
                }}>
                  Open in Email Client →
                </button>
              )}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { id: "name", label: "Name *", type: "text", placeholder: "Your name" },
              { id: "email", label: "Email *", type: "email", placeholder: "your@email.com" },
              { id: "subject", label: "Subject", type: "text", placeholder: "What's this about?" },
            ].map(f => (
              <div key={f.id}>
                <label style={{ display: "block", color: "#F8FAFC66", fontSize: 12, marginBottom: 6, fontFamily: "'JetBrains Mono'" }}>{f.label}</label>
                <input type={f.type} value={form[f.id]} onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))} placeholder={f.placeholder}
                  style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 16px", color: "#F8FAFC", fontSize: 14, fontFamily: "'Inter'", outline: "none", boxSizing: "border-box" }}
                />
              </div>
            ))}
            <div>
              <label style={{ display: "block", color: "#F8FAFC66", fontSize: 12, marginBottom: 6, fontFamily: "'JetBrains Mono'" }}>Message *</label>
              <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Tell me about your project..." rows={5}
                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 16px", color: "#F8FAFC", fontSize: 14, fontFamily: "'Inter'", outline: "none", resize: "vertical", boxSizing: "border-box" }}
              />
            </div>
            <button
              onClick={submit}
              disabled={status.type === "sending"}
              style={{
                background: status.type === "sending"
                  ? "rgba(0,229,255,0.2)"
                  : "linear-gradient(135deg, #00E5FF, #7C3AED)",
                border: "none", borderRadius: 12, padding: "14px",
                color: status.type === "sending" ? "#00E5FF" : "#050816",
                fontSize: 14, fontWeight: 700,
                cursor: status.type === "sending" ? "not-allowed" : "pointer",
                fontFamily: "'Inter'", transition: "all 0.3s",
              }}>
              {status.type === "sending" ? "Sending…" : "Send Message →"}
            </button>
            <div style={{ textAlign: "center", color: "#F8FAFC33", fontSize: 12, fontFamily: "'JetBrains Mono'" }}>
              or{" "}
              <a href={`mailto:${PROFILE.email}`} style={{ color: "#00E5FF88", textDecoration: "none" }}
                onMouseEnter={e => e.target.style.color = "#00E5FF"}
                onMouseLeave={e => e.target.style.color = "#00E5FF88"}>
                email directly
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// UPLINK — Resume section
// ============================================================
function UplinkSection() {
  const [downloadState, setDownloadState] = useState("idle");
  const [isMobile, setIsMobile] = useState(false);
  const labels = { idle: "Download Resume", preparing: "Preparing...", ready: "Resume Ready ↓", done: "✓ Done" };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDownload = () => {
    setDownloadState("preparing");
    setTimeout(() => setDownloadState("ready"), 800);
    setTimeout(() => setDownloadState("done"), 1600);
    setTimeout(() => setDownloadState("idle"), 3000);
  };

  return (
    <div id="uplink" style={{ padding: "80px 20px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <SectionMeta index="06" label="UPLINK" />
      <SectionHeading>Download My Resume</SectionHeading>
      <SectionSub>A snapshot of my technical journey — data analytics, full-stack, and AI-powered applications.</SectionSub>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 40, alignItems: "center" }}>
        <div style={{
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,229,255,0.15)",
          borderRadius: 20, overflow: "hidden", aspectRatio: "8/11",
          position: "relative", display: "flex",
        }}>
          <img src="/resume-thumbnail.png" alt="Resume Preview" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", opacity: 0.85 }}
            onMouseOver={e => e.currentTarget.style.opacity = "1"}
            onMouseOut={e => e.currentTarget.style.opacity = "0.85"}
          />
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "2px",
            background: "linear-gradient(90deg, transparent, #00E5FF, transparent)",
            animation: "scanLine 3s linear infinite", zIndex: 10,
          }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,229,255,0.05), rgba(124,58,237,0.05))", pointerEvents: "none" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <button onClick={() => window.open("/resume.pdf", "_blank")} style={{
            display: "block", width: "100%", textAlign: "center",
            background: "linear-gradient(135deg, #00E5FF, #7C3AED)",
            border: "none", borderRadius: 12, padding: "14px 28px",
            color: "#050816", fontSize: 14, fontWeight: 700, cursor: "pointer",
            fontFamily: "'Inter'", textDecoration: "none",
            boxShadow: "0 0 20px rgba(0,229,255,0.2)",
          }}>View Resume</button>

          <a href="/resume.pdf" download="Karanveer_Singh_Resume.pdf" onClick={handleDownload} style={{
            display: "block", textAlign: "center",
            background: downloadState === "done" ? "rgba(0,255,198,0.1)" : "rgba(0,229,255,0.08)",
            border: `1px solid ${downloadState === "done" ? "rgba(0,255,198,0.3)" : "rgba(0,229,255,0.3)"}`,
            borderRadius: 12, padding: "14px 28px",
            color: downloadState === "done" ? "#00FFC6" : "#00E5FF",
            fontSize: 14, fontWeight: 600, cursor: "pointer",
            fontFamily: "'Inter'", textDecoration: "none", transition: "all 0.3s",
          }}>{labels[downloadState]}</a>
        </div>
      </div>
      <style>{`@keyframes scanLine { 0% { transform: translateY(0); opacity: 1; } 80% { opacity: 0.5; } 100% { transform: translateY(100vh); opacity: 0; } }`}</style>
    </div>
  );
}

// ============================================================
// COMMAND PALETTE
// ============================================================
function CommandPalette({ onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const commands = [
    { label: "Core — Home", action: () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Story — About", action: () => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Galaxy — Skills", action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Builds — Projects", action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Achievements — Certificates", action: () => document.getElementById("certificates")?.scrollIntoView({ behavior: "smooth" }) }, // <--- PASTE THIS HERE
    { label: "Path — Career", action: () => document.getElementById("path")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Signal — Contact", action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Uplink — Resume", action: () => document.getElementById("uplink")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Download Resume", action: () => { const a = document.createElement("a"); a.href = "/resume.pdf"; a.download = "Karanveer_Singh_Resume.pdf"; a.click(); } },
    { label: "Open GitHub", action: () => window.open(PROFILE.github, "_blank") },
    { label: "Open LinkedIn", action: () => window.open(PROFILE.linkedin, "_blank") },
  ];
  const filtered = commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 8000, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "15vh", animation: "fadeIn 0.15s ease" }} onClick={onClose}>
      <div style={{ background: "rgba(5,8,18,0.98)", border: "1px solid rgba(0,229,255,0.2)", borderRadius: 20, width: "min(560px,90vw)", overflow: "hidden", animation: "scaleIn 0.2s ease" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <span style={{ color: "#00E5FF", fontSize: 16 }}>⌘</span>
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search commands..."
            style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#F8FAFC", fontSize: 15, fontFamily: "'Inter'" }}
          />
          <span style={{ color: "#F8FAFC33", fontSize: 12 }}>ESC</span>
        </div>
        <div style={{ maxHeight: 300, overflow: "auto" }}>
          {filtered.map((cmd, i) => (
            <button key={i} onClick={() => { cmd.action(); onClose(); }}
              style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "14px 20px", color: "#F8FAFCcc", cursor: "pointer", fontSize: 14, fontFamily: "'Inter'", transition: "background 0.1s" }}
              onMouseEnter={e => e.target.style.background = "rgba(0,229,255,0.08)"}
              onMouseLeave={e => e.target.style.background = "none"}>
              {cmd.label}
            </button>
          ))}
        </div>
        <div style={{ padding: "10px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ color: "#F8FAFC22", fontSize: 11, fontFamily: "'JetBrains Mono'" }}>CTRL+K · ESC to close</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "40px 20px", textAlign: "center", background: "rgba(0,0,0,0.2)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "'Space Grotesk'", background: "linear-gradient(135deg, #00E5FF, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 12 }}>KVS</div>
        <div style={{ color: "#F8FAFC33", fontSize: 13, marginBottom: 20 }}>Built with React · Designed with care</div>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { label: "GitHub", href: PROFILE.github },
            { label: "LinkedIn", href: PROFILE.linkedin },
            { label: "Email", href: `mailto:${PROFILE.email}` },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              style={{ color: "#F8FAFC44", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#00E5FF"}
              onMouseLeave={e => e.target.style.color = "#F8FAFC44"}>
              {label}
            </a>
          ))}
        </div>
        <div style={{ marginTop: 24, color: "#F8FAFC22", fontSize: 11, fontFamily: "'JetBrains Mono'" }}>
          © 2025 KARANVEER SINGH · PRESS CTRL+K FOR COMMANDS
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function Portfolio() {
  const [booting, setBooting] = useState(true);
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [openCert, setOpenCert] = useState(null); // <--- ADD THIS STATE HERE

  const handleBootComplete = useCallback(() => {
    setBooting(false);
    setTimeout(() => {
      window.scrollTo(0, 0);
      setVisible(true);
    }, 50);
  }, []);

  useEffect(() => {
    if (booting) return;
    const sectionIds = NAV_ITEMS.map(n => n.id);
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.3 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, [booting]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); setPaletteOpen(p => !p); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          background: #050812; color: #F8FAFC;
          font-family: 'Inter', sans-serif; cursor: none; overflow-x: hidden;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }
        @media (max-width: 768px) {
          body { cursor: auto; }
          .desktop-nav { display: none !important; }
          .mobile-nav-btn { display: flex !important; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050812; }
        ::-webkit-scrollbar-thumb { background: #00E5FF33; border-radius: 2px; }
        input, textarea { color-scheme: dark; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95) translateY(-10px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {booting && <BootSequence onComplete={handleBootComplete} />}

      {!booting && (
        <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease", minHeight: "100vh" }}>
          <ParticleBackground />
          <CustomCursor />
          {/* Hide Navbar completely while Certificate Modal is active */}
          {!openCert && <Navbar activeSection={activeSection} />}

          <main style={{ position: "relative", zIndex: 1 }}>
            <Hero />
            <StorySection />
            <GalaxySection />
            <BuildsSection />
            <CertificatesSection onOpenCert={setOpenCert} /> {/* <--- PASS HANDLER HERE */}
            <PathSection />
            <UplinkSection />
            <SignalSection />
          </main>

          <Footer />

          {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} />}

          {/* RENDER MODAL AT TOP ROOT LEVEL */}
          {openCert && <CertificateModal cert={openCert} onClose={() => setOpenCert(null)} />}

          <div style={{
            position: "fixed", bottom: 20, right: 16, zIndex: 1000,
            background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)",
            borderRadius: 8, padding: "6px 12px", fontSize: 11,
            color: "#00E5FF88", fontFamily: "'JetBrains Mono'", cursor: "pointer",
          }} onClick={() => setPaletteOpen(true)}>
            CTRL+K
          </div>
        </div>
      )}
    </>
  );
}