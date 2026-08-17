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
    description: "An intelligent MCQ and quiz platform powered by AI that generates personalized questions, adapts to user performance, and provides detailed analytics on learning progress.",
    problem: "Students lack engaging, adaptive learning tools that can generate fresh content and track mastery across topics.",
    solution: "AI-powered quiz engine with dynamic question generation, real-time performance analytics, and adaptive difficulty.",
    tech: ["Python", "React", "FastAPI", "AI", "SQL"],
    color: "#00E5FF",
    github: "#",
    live: "#",
    category: "AI Product",
    architecture: ["React Frontend", "FastAPI Backend", "AI Engine", "PostgreSQL", "Analytics Layer"],
  },
  {
    id: "studora",
    title: "Studora",
    subtitle: "College Analytics Platform",
    description: "AI-powered data analysis platform for college analytics, enabling institutions to derive actionable insights from student data with beautiful visualizations.",
    problem: "Educational institutions struggle to make sense of large datasets and translate them into actionable decisions.",
    solution: "Integrated data pipeline with AI analysis, interactive dashboards, and automated reporting.",
    tech: ["Python", "Pandas", "React", "FastAPI", "Power BI"],
    color: "#7C3AED",
    github: "#",
    live: "#",
    category: "Data Analytics",
    architecture: ["React Dashboard", "FastAPI API", "Pandas Pipeline", "SQL Database", "AI Analysis"],
  },
];

// Milestones for "A path built from curiosity" section
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

// Career path for "Energy cables" section
const CAREER_PATH = [
  {
    title: "AI & Full Stack Projects",
    org: "Independent Projects",
    period: "2026 jan — Now",
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
// ============================================================
// BOOT SEQUENCE DATA
// ============================================================
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
// CUSTOM CURSOR
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
      // UPDATED: Changed the offset from - 4 to - 8 to center the new 16px dot
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
      {/* UPDATED: Changed width and height from 8 to 16 */}
      <div ref={dotRef} style={{ position: "fixed", width: 16, height: 16, borderRadius: "50%", background: "#00E5FF", zIndex: 10000, pointerEvents: "none", boxShadow: "0 0 10px #00E5FF", willChange: "transform", top: 0, left: 0 }} />
      <div ref={ringRef} style={{ position: "fixed", width: 32, height: 32, borderRadius: "50%", border: "1.5px solid #00E5FF66", zIndex: 9999, pointerEvents: "none", willChange: "transform", top: 0, left: 0, transition: "width 0.2s, height 0.2s" }} />
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
// NAVIGATION — matches screenshot: KVS · Core · Story · Galaxy · Builds · Path · Signal · Uplink
// ============================================================
const NAV_ITEMS = [
  { label: "Core", id: "home" },
  { label: "Story", id: "story" },
  { label: "Galaxy", id: "skills" },
  { label: "Builds", id: "projects" },
  { label: "Path", id: "path" },
  { label: "Uplink", id: "uplink" },           // Moved Resume to 6th position
  { label: "Signal", id: "contact", cta: true }, // Moved Contact to 7th (and made it the highlighted CTA button)
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
        padding: "0 24px", transition: "all 0.4s ease",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
      }}>
        <div style={{
          maxWidth: 1200, margin: "12px auto 0",
          background: scrolled ? "rgba(5,8,22,0.9)" : "rgba(5,8,22,0.5)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(0,229,255,0.1)",
          borderRadius: 16, padding: "10px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
          transition: "all 0.4s ease",
        }}>
          {/* Logo */}
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
              <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", color: "#F8FAFC88", cursor: "pointer", fontSize: 20 }}>✕</button>
            </div>
            {NAV_ITEMS.map(item => (
              <button key={item.label} onClick={() => navTo(item.id)} style={{
                background: "none", border: "none", cursor: "pointer",
                color: "#F8FAFC", fontSize: 16, fontFamily: "'Inter'",
                padding: "12px 0", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}>{item.label}</button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ============================================================
// HERO SECTION — Eclipse gyroscope rings + typewriter
// ============================================================
function Hero() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

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
      alignItems: "center", justifyContent: "center", padding: "80px 24px 40px",
      position: "relative", overflow: "visible", textAlign: "center",
    }}>
      {/* Binary decorations */}
      <div style={{ position: "absolute", top: 0, left: "15%", opacity: 0.03, color: "white", fontSize: 10, writingMode: "vertical-rl", whiteSpace: "nowrap" }}>
        01101001 01101110 01110100 01100101 01101100
      </div>
      <div style={{ position: "absolute", top: "20%", right: "15%", opacity: 0.03, color: "white", fontSize: 10, writingMode: "vertical-rl", whiteSpace: "nowrap" }}>
        10110011 00101011 11001010 01101100
      </div>

      {/* 3D Gyroscope Rings */}
      <div style={{
        position: "absolute", top: "45%", left: "50%",
        transform: "translate(-50%, -50%)", width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        perspective: "1200px", transformStyle: "preserve-3d",
      }}>
        {/* Outer yellow ring */}
        <div className="animated-ring" style={{
          width: "750px", height: "750px",
          borderColor: "rgba(253, 224, 71, 0.05)",
          borderTopColor: "rgba(253, 224, 71, 0.4)",
          borderBottomColor: "rgba(253, 224, 71, 0.1)",
          animation: "tumble-x 25s linear infinite",
        }} />
        {/* Middle blue ring */}
        <div className="animated-ring" style={{
          width: "550px", height: "550px",
          borderColor: "rgba(125, 211, 252, 0.08)",
          borderLeftColor: "rgba(125, 211, 252, 0.5)",
          animation: "tumble-y 20s linear infinite",
        }} />
        {/* Inner purple ring */}
        <div className="animated-ring" style={{
          width: "350px", height: "350px",
          borderColor: "rgba(167, 139, 250, 0.1)",
          borderRightColor: "rgba(167, 139, 250, 0.6)",
          animation: "tumble-reverse 15s linear infinite",
        }} />
        {/* Core dark mask */}
        <div style={{
          position: "absolute", width: "500px", height: "500px",
          background: "radial-gradient(circle, #050816 40%, transparent 70%)",
          borderRadius: "50%", zIndex: 4,
        }} />
        {/* Orbiting tech tags */}
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0, transformStyle: "preserve-3d" }}>
          <div className="orbit-tag" style={{ "--r": "380px", "--dur": "35s", "--delay": "0s" }}>SQL</div>
          <div className="orbit-tag" style={{ "--r": "380px", "--dur": "35s", "--delay": "-17.5s" }}>Pandas</div>
          <div className="orbit-tag" style={{ "--r": "280px", "--dur": "25s", "--delay": "-5s" }}>Docker</div>
          <div className="orbit-tag" style={{ "--r": "280px", "--dur": "25s", "--delay": "-17s" }}>FastAPI</div>
          <div className="orbit-tag" style={{ "--r": "180px", "--dur": "15s", "--delay": "-2s" }}>Python</div>
          <div className="orbit-tag" style={{ "--r": "180px", "--dur": "15s", "--delay": "-9.5s" }}>AI</div>
        </div>
      </div>

      {/* Foreground content */}
      <div style={{
        maxWidth: 900, width: "100%", zIndex: 20,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
        display: "flex", flexDirection: "column", alignItems: "center",
        marginTop: "-40px",
      }}>
        {/* System Online badge */}
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

        <p style={{ color: "#94A3B8", fontSize: "18px", marginBottom: "8px", fontFamily: "'Space Grotesk', sans-serif" }}>
          Hello,
        </p>

        <div style={{ display: "flex", alignItems: "baseline", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <span style={{ fontSize: "clamp(50px, 8vw, 85px)", color: "#FFFFFF", fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>I'm</span>
          <span style={{ fontSize: "clamp(50px, 8vw, 85px)", color: "#7DD3FC", fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>Karanveer</span>
        </div>

        <h1 style={{
          fontSize: "clamp(60px, 9.5vw, 100px)", fontWeight: 600,
          letterSpacing: "-0.01em", lineHeight: 1.1,
          fontFamily: "'Space Grotesk', sans-serif",
          color: "#A78BFA", marginTop: "-10px", marginBottom: "24px",
        }}>Singh</h1>

        {/* Typewriter */}
        <div style={{
          fontSize: "clamp(18px, 2.5vw, 24px)", color: "#CBD5E1",
          fontFamily: "'JetBrains Mono', monospace", marginBottom: 32,
          display: "flex", alignItems: "center",
          minHeight: "36px", letterSpacing: "1px",
        }}>
          {text}
          <span style={{
            animation: "blink 1s step-end infinite",
            display: "inline-block", width: "2px", height: "26px",
            background: "#2DD4BF", marginLeft: "2px",
          }} />
        </div>

        <p style={{
          color: "#94A3B8", fontSize: "16px", maxWidth: 650,
          lineHeight: 1.6, marginBottom: 48, fontFamily: "'Inter', sans-serif",
        }}>
          I build data systems and interfaces that behave like intelligent products — analytics, models and motion in one coherent surface.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <a href="#projects" style={{
            background: "linear-gradient(90deg, #2DD4BF 0%, #A78BFA 100%)",
            border: "none", borderRadius: 100, padding: "14px 32px",
            color: "#050812", fontSize: 15, fontWeight: 600, cursor: "pointer",
            fontFamily: "'Inter', sans-serif", textDecoration: "none",
          }}>Explore Portfolio</a>
          <a href="/resume.pdf" style={{
            background: "rgba(15,23,42,0.6)",
            border: "1px solid rgba(255,255,255,0.15)", borderRadius: 100, padding: "14px 32px",
            color: "#E2E8F0", fontSize: 15, fontWeight: 500, cursor: "pointer",
            fontFamily: "'Inter', sans-serif", textDecoration: "none",
          }}>Download Resume</a>
          <a href="#contact" style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100, padding: "14px 32px",
            color: "#E2E8F0", fontSize: 15, fontWeight: 500, cursor: "pointer",
            fontFamily: "'Inter', sans-serif", textDecoration: "none",
          }}>Contact Me</a>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        .animated-ring {
          position: absolute;
          border-radius: 50%;
          border-width: 4px;
          border-style: solid;
          transform-style: preserve-3d;
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
          position: absolute;
          background: rgba(15,23,42,0.8);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 12px;
          color: #94A3B8;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 1px;
          white-space: nowrap;
          animation: orbit-float var(--dur) linear infinite;
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
      padding: "100px 24px", maxWidth: 1100, margin: "0 auto",
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
      fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 800,
      fontFamily: "'Space Grotesk'", letterSpacing: "-0.02em",
      color: "#F8FAFC", lineHeight: 1.1, marginBottom: 16,
    }}>{children}</h2>
  );
}

function SectionSub({ children }) {
  return (
    <p style={{ color: "#64748B", fontSize: 15, marginBottom: 60, lineHeight: 1.6 }}>{children}</p>
  );
}

// ============================================================
// STORY SECTION — "A path built from curiosity, not checklists."
// Alternating left / right milestone cards
// ============================================================
// Add this updated section in place of your current StorySection
function StorySection() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculates how much of the section has been scrolled past the middle of the screen
      const progress = (window.innerHeight / 1.5 - rect.top) / rect.height;
      
      // Clamp the value between 0 and 1
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount to set initial state
    handleScroll(); 
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="story" ref={containerRef} style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <SectionMeta index="02" label="STORY" />
      <SectionHeading>A path built from curiosity,<br />not checklists.</SectionHeading>
      <SectionSub>Every milestone below unlocked a new way of thinking about data, products and people.</SectionSub>

      <div style={{ position: "relative" }}>
        {/* UPDATED: Centre spine line container */}
        <div style={{
          position: "absolute", left: "50%", top: 0, bottom: 0,
          width: 3, /* Increased from 1 to 3 to make it more visible */
          background: "rgba(0,229,255,0.1)", /* Faint base line */
          transform: "translateX(-50%)",
          borderRadius: 2,
          overflow: "hidden" /* Keeps the animated inner line contained */
        }}>
          {/* NEW: Animated scroll line that moves on top */}
          <div style={{
            width: "100%",
            height: `${scrollProgress * 100}%`,
            background: "linear-gradient(180deg, transparent, #00E5FF, #00FFC6)", /* Darker/Brighter gradient */
            transition: "height 0.15s ease-out", /* Smooth catching up animation */
          }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {MILESTONES.map((m, i) => (
            <MilestoneCard key={i} item={m} index={i} />
          ))}
        </div>
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
      {/* Left side */}
      <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: 32 }}>
        {isLeft ? (
          <div style={{
            background: "rgba(15,23,42,0.7)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16,
            padding: "28px 32px", maxWidth: 380, textAlign: "right",
            boxShadow: "0 4px 40px rgba(0,0,0,0.3)",
          }}>
            <div style={{ color: "#00E5FF", fontSize: 11, letterSpacing: "0.15em", fontFamily: "'JetBrains Mono'", marginBottom: 10 }}>
              {item.year}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Space Grotesk'", color: "#F8FAFC", marginBottom: 10 }}>
              {item.title}
            </div>
            <div style={{ color: "#64748B", fontSize: 14, lineHeight: 1.65 }}>{item.desc}</div>
          </div>
        ) : null}
      </div>

      {/* Centre dot */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
        <div style={{
          width: 16, height: 16, borderRadius: "50%",
          background: "#050812", border: "2px solid #2DD4BF",
          boxShadow: "0 0 14px #2DD4BF88", zIndex: 2, flexShrink: 0,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#2DD4BF", margin: "3px" }} />
        </div>
      </div>

      {/* Right side */}
      <div style={{ paddingLeft: 32 }}>
        {!isLeft ? (
          <div style={{
            background: "rgba(15,23,42,0.7)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16,
            padding: "28px 32px", maxWidth: 380,
            boxShadow: "0 4px 40px rgba(0,0,0,0.3)",
          }}>
            <div style={{ color: "#00E5FF", fontSize: 11, letterSpacing: "0.15em", fontFamily: "'JetBrains Mono'", marginBottom: 10 }}>
              {item.year}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Space Grotesk'", color: "#F8FAFC", marginBottom: 10 }}>
              {item.title}
            </div>
            <div style={{ color: "#64748B", fontSize: 14, lineHeight: 1.65 }}>{item.desc}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ============================================================
// SKILL GALAXY SECTION
// ============================================================
function SkillGalaxy() {
  const canvasRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const currentPositionsRef = useRef([]);

  const activeSkills = useMemo(() => SKILLS.filter(s => s.name !== "Docker" && s.name !== "Power BI"), []);

  const basePositions = useMemo(() => {
    const SIZE = 1000, cx = SIZE / 2, cy = SIZE / 2;
    const total = activeSkills.length;
    return activeSkills.map((skill, i) => {
      let layer, angle, radius;
      if (i === 0) { layer = 0; radius = 0; angle = 0; }
      else if (i < 5) { layer = 1; radius = 220; angle = ((i - 1) / 4) * Math.PI * 2 - Math.PI / 2; }
      else { layer = 2; radius = 440; const rem = total - 5; angle = ((i - 5) / rem) * Math.PI * 2 - Math.PI / 2; }
      return { cx, cy, baseAngle: angle, radius, layer, skill };
    });
  }, [activeSkills]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const SIZE = 1000;
    canvas.width = SIZE; canvas.height = SIZE;
    let raf, t = 0;
    const hoveredRef = { current: null };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scale = SIZE / rect.width;
      mouseRef.current = { x: (e.clientX - rect.left) * scale, y: (e.clientY - rect.top) * scale };
      let found = null;
      currentPositionsRef.current.forEach((pos, i) => {
        const dx = mouseRef.current.x - pos.x, dy = mouseRef.current.y - pos.y;
        if (Math.sqrt(dx * dx + dy * dy) < 30) found = i;
      });
      hoveredRef.current = found; setHovered(found);
    };
    canvas.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      t += 0.002;
      const h = hoveredRef.current;
      const connectedSet = h !== null
        ? new Set(activeSkills[h].connections.map(c => activeSkills.findIndex(s => s.id === c)))
        : new Set();

      currentPositionsRef.current = basePositions.map((p, i) => {
        const orbitSpeed = p.layer === 1 ? 0.4 : -0.2;
        const floatX = Math.cos(t * 5 + p.baseAngle * 3) * 8;
        const floatY = Math.sin(t * 5 + p.baseAngle * 3) * 8;
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
          ctx.strokeStyle = isActive ? "rgba(0,229,255,0.6)" : "rgba(0,229,255,0.1)";
          ctx.lineWidth = isActive ? 2 : 0.5; ctx.stroke();
        });
      });

      activeSkills.forEach((skill, i) => {
        const pos = currentPos[i];
        const isHovered = i === h, isConnected = connectedSet.has(i);
        const r = isHovered ? 36 : isConnected ? 26 : 18;
        const alpha = h === null ? 0.9 : (isHovered || isConnected ? 1 : 0.2);
        const colors = { core: "#00E5FF", frontend: "#7C3AED", backend: "#00FFC6", data: "#F59E0B", tools: "#EC4899", ai: "#10B981" };
        const color = colors[skill.category] || "#00E5FF";

        if (isHovered || isConnected || h === null) {
          const glowSize = (isHovered || isConnected) ? r * 2.5 : r * 1.5;
          const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, glowSize);
          glow.addColorStop(0, color + (isHovered ? "88" : "44")); glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(pos.x, pos.y, glowSize, 0, Math.PI * 2); ctx.fill();
        }

        ctx.beginPath(); ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.globalAlpha = alpha; ctx.fill(); ctx.globalAlpha = 1;
        ctx.font = `${isHovered ? 16 : 14}px 'Inter', sans-serif`;
        ctx.fillStyle = isHovered ? "#F8FAFC" : isConnected ? "#F8FAFCcc" : "#F8FAFC66";
        ctx.textAlign = "center"; ctx.fillText(skill.name, pos.x, pos.y + r + 20);
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); canvas.removeEventListener("mousemove", onMouseMove); };
  }, [basePositions, activeSkills]);

  const hoveredSkill = hovered !== null ? activeSkills[hovered] : null;

  return (
    <div style={{ display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap", justifyContent: "center", padding: "40px 0" }}>
      <canvas ref={canvasRef} style={{ maxWidth: "100%", width: 1000, height: "auto", cursor: hovered !== null ? "pointer" : "crosshair", filter: "drop-shadow(0 0 20px rgba(0,229,255,0.1))" }} />
      <div style={{ width: 280, minHeight: 220 }}>
        {hoveredSkill ? (
          <div style={{
            background: "rgba(15,23,42,0.6)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(0,229,255,0.3)", borderRadius: 16, padding: 24,
            animation: "fadeIn 0.2s ease",
          }}>
            <div style={{ color: "#00E5FF", fontSize: 20, fontWeight: 700, marginBottom: 8, fontFamily: "'Space Grotesk'" }}>{hoveredSkill.name}</div>
            <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
              {hoveredSkill.connections.map(c => {
                const sk = activeSkills.find(s => s.id === c);
                return sk ? <span key={c} style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", borderRadius: 6, padding: "4px 10px", fontSize: 12, color: "#E9D5FF" }}>{sk.name}</span> : null;
              })}
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${hoveredSkill.level}%`, background: "linear-gradient(90deg, #7C3AED, #00E5FF)", borderRadius: 3 }} />
            </div>
            <div style={{ color: "#94A3B8", fontSize: 12, marginTop: 8 }}>Proficiency: {hoveredSkill.level}%</div>
          </div>
        ) : (
          <div style={{ color: "#64748B", fontSize: 14, fontFamily: "'JetBrains Mono'", display: "flex", alignItems: "center", gap: 12, padding: 24, border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 16 }}>
            ← Hover a node to analyze connections.
          </div>
        )}
      </div>
    </div>
  );
}

function GalaxySection() {
  return (
    <div id="skills" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <SectionMeta index="03" label="GALAXY" />
      <SectionHeading>Skill Galaxy</SectionHeading>
      <SectionSub>Hover over a skill node to explore its connections and see how the technologies relate.</SectionSub>
      <SkillGalaxy />
    </div>
  );
}

// ============================================================
// PROJECT CARD + MODAL
// ============================================================
function ProjectCard({ project, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width * 20;
    const y = -(e.clientY - rect.top - rect.height / 2) / rect.height * 20;
    setTilt({ x, y });
  };

  return (
    <div ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={onMouseMove}
      onClick={() => onOpen(project)}
      style={{
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? project.color + "55" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 20, padding: 28, cursor: "pointer",
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${hovered ? 1.02 : 1})`,
        transition: "border-color 0.3s, transform 0.1s, box-shadow 0.3s",
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${project.color}22` : "0 4px 20px rgba(0,0,0,0.2)",
        position: "relative", overflow: "hidden",
      }}>
      <div style={{
        position: "absolute", top: -40, right: -40, width: 120, height: 120,
        borderRadius: "50%", background: project.color + "11",
        filter: "blur(30px)", transform: hovered ? "scale(1.5)" : "scale(1)", transition: "all 0.3s",
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <span style={{ background: project.color + "22", border: `1px solid ${project.color}44`, borderRadius: 6, padding: "3px 10px", fontSize: 11, color: project.color, fontFamily: "'JetBrains Mono'" }}>{project.category}</span>
        <div style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.2s", color: project.color, fontSize: 18 }}>↗</div>
      </div>
      <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 22, fontWeight: 700, marginBottom: 4, color: "#F8FAFC" }}>{project.title}</h3>
      <div style={{ color: project.color, fontSize: 13, marginBottom: 12 }}>{project.subtitle}</div>
      <p style={{ color: "#F8FAFC88", fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>{project.description}</p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {project.tech.map(t => (
          <span key={t} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "3px 8px", fontSize: 11, color: "#F8FAFC88" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 5000,
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, animation: "fadeIn 0.2s ease",
    }} onClick={onClose}>
      <div style={{
        background: "rgba(5,8,18,0.98)", border: `1px solid ${project.color}44`,
        borderRadius: 24, padding: "clamp(24px,4vw,48px)",
        maxWidth: 800, width: "100%", maxHeight: "90vh", overflow: "auto",
        animation: "scaleIn 0.3s ease",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
          <div>
            <span style={{ background: project.color + "22", border: `1px solid ${project.color}44`, borderRadius: 6, padding: "3px 10px", fontSize: 11, color: project.color, fontFamily: "'JetBrains Mono'" }}>{project.category}</span>
            <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, marginTop: 12, color: "#F8FAFC" }}>{project.title}</h2>
            <div style={{ color: project.color, fontSize: 15 }}>{project.subtitle}</div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "8px 16px", color: "#F8FAFC88", cursor: "pointer", fontSize: 18 }}>✕</button>
        </div>
        <div style={{ marginBottom: 32 }}>
          <div style={{ color: "#F8FAFC44", fontSize: 11, letterSpacing: "0.15em", marginBottom: 16, fontFamily: "'JetBrains Mono'" }}>ARCHITECTURE</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            {project.architecture.map((layer, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ background: project.color + "15", border: `1px solid ${project.color}33`, borderRadius: 8, padding: "8px 16px", fontSize: 12, color: project.color, fontFamily: "'JetBrains Mono'" }}>{layer}</div>
                {i < project.architecture.length - 1 && <div style={{ color: project.color + "66", fontSize: 16 }}>↓</div>}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
          {[{ label: "PROBLEM", value: project.problem }, { label: "SOLUTION", value: project.solution }].map(({ label, value }) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 20 }}>
              <div style={{ color: "#F8FAFC44", fontSize: 10, letterSpacing: "0.15em", marginBottom: 8, fontFamily: "'JetBrains Mono'" }}>{label}</div>
              <div style={{ color: "#F8FAFCcc", fontSize: 13, lineHeight: 1.6 }}>{value}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 32 }}>
          <div style={{ color: "#F8FAFC44", fontSize: 11, letterSpacing: "0.15em", marginBottom: 12, fontFamily: "'JetBrains Mono'" }}>TECH STACK</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {project.tech.map(t => <span key={t} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "6px 14px", fontSize: 13, color: "#F8FAFC" }}>{t}</span>)}
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 24px", color: "#F8FAFC", textDecoration: "none", fontSize: 13 }}>GitHub →</a>
          {project.live && project.live !== "#" && <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ background: `linear-gradient(135deg, ${project.color}, #7C3AED)`, border: "none", borderRadius: 10, padding: "12px 24px", color: "#050816", textDecoration: "none", fontSize: 13, fontWeight: 700 }}>Live Demo →</a>}
        </div>
      </div>
    </div>
  );
}

function BuildsSection() {
  const [openProject, setOpenProject] = useState(null);
  return (
    <div id="projects" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <SectionMeta index="04" label="BUILDS" />
      <SectionHeading>Project Modules</SectionHeading>
      <SectionSub>Things I've built that are alive and doing something useful.</SectionSub>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(340px,100%),1fr))", gap: 20 }}>
        {PROJECTS.map(p => <ProjectCard key={p.id} project={p} onOpen={setOpenProject} />)}
      </div>
      {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
    </div>
  );
}

// ============================================================
// PATH SECTION — "Energy cables between the milestones."
// Vertical timeline with left-side cable line
// ============================================================
function PathSection() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate how far the user has scrolled past this section
      const progress = (window.innerHeight / 1.5 - rect.top) / rect.height;
      
      // Keep the progress value strictly between 0 and 1
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Trigger once on load
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="path" ref={containerRef} style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <SectionMeta index="05" label="PATH" />
      <SectionHeading>Energy cables between<br />the milestones.</SectionHeading>
      <SectionSub>The trajectory so far, tracked as the page moves with you.</SectionSub>

      <div style={{ position: "relative", maxWidth: 700 }}>
        
        {/* UPDATED: Vertical cable line container */}
        <div style={{
          position: "absolute", left: 12, top: 0, bottom: 0, 
          width: 3, /* Increased from 1 to 3 to make it more visible */
          background: "rgba(0,229,255,0.08)", /* Faint, barely visible base line */
          borderRadius: 2,
          overflow: "hidden" /* Prevents the inner moving line from spilling out */
        }}>
           {/* NEW: Animated dark/colored scroll line on top */}
           <div style={{
             width: "100%",
             height: `${scrollProgress * 100}%`,
             background: "linear-gradient(180deg, #00E5FF 0%, #7C3AED 100%)", /* The bright/dark energy color */
             transition: "height 0.15s ease-out" /* Smooth follow animation */
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
      display: "flex", gap: 32, alignItems: "flex-start",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateX(-24px)",
      transition: `all 0.6s ease ${index * 0.12}s`,
    }}>
      {/* Dot on the cable */}
      <div style={{ flexShrink: 0, width: 26, display: "flex", justifyContent: "center", paddingTop: 22 }}>
        <div style={{
          width: 10, height: 10, borderRadius: "50%",
          background: "#2DD4BF", boxShadow: "0 0 12px #2DD4BF",
          border: "2px solid #050812",
        }} />
      </div>

      {/* Card */}
      <div style={{
        flex: 1,
        background: "rgba(15,23,42,0.65)", backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14,
        padding: "20px 24px",
        boxShadow: "0 4px 30px rgba(0,0,0,0.25)",
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
function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([{ type: "system", text: "Welcome. Type 'help' to see commands." }]);
  const endRef = useRef(null);

  useEffect(() => {
    // Bulletproof check: Only scroll if the user has actually typed a command
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
      borderRadius: 16, padding: 24, fontFamily: "'JetBrains Mono'", fontSize: 13,
      maxHeight: 300, display: "flex", flexDirection: "column", overflow: "hidden",
    }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
      </div>
      <div style={{ flex: 1, overflow: "auto", marginBottom: 12 }}>
        {history.map((h, i) => (
          <div key={i} style={{ marginBottom: 6, color: h.type === "input" ? "#00E5FF" : h.type === "system" ? "#F8FAFC88" : "#00FFC6" }}>
            {h.type === "input" ? `> ${h.text}` : h.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ color: "#00E5FF" }}>›</span>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && run()}
          placeholder="Type a command..."
          style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#F8FAFC", fontFamily: "'JetBrains Mono'", fontSize: 13 }}
        />
      </div>
    </div>
  );
}

function SignalSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setStatus("Please fill in all required fields."); return; }
    setStatus("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus(""), 4000);
  };

  return (
    <div id="contact" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <SectionMeta index="07" label="SIGNAL" />
      <SectionHeading>Let's Connect</SectionHeading>
      <SectionSub>Open to opportunities in data analytics, full-stack development, and AI engineering.</SectionSub>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }} className="contact-grid">
        <Terminal />
        <div>
          {status && (
            <div style={{ background: "rgba(0,255,198,0.1)", border: "1px solid rgba(0,255,198,0.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 20, color: "#00FFC6", fontSize: 13 }}>{status}</div>
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
                  id={f.id === "name" ? "contact-form" : undefined}
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
            <button onClick={submit} style={{
              background: "linear-gradient(135deg, #00E5FF, #7C3AED)", border: "none", borderRadius: 12, padding: "14px",
              color: "#050816", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter'",
            }}>Send Message →</button>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

// ============================================================
// UPLINK — Resume section
// ============================================================
function UplinkSection() {
  const [downloadState, setDownloadState] = useState("idle");
  const labels = { idle: "Download Resume", preparing: "Preparing...", ready: "Resume Ready ↓", done: "✓ Done" };

  const handleDownload = () => {
    setDownloadState("preparing");
    setTimeout(() => setDownloadState("ready"), 800);
    setTimeout(() => setDownloadState("done"), 1600);
    setTimeout(() => setDownloadState("idle"), 3000);
  };

  return (
    <div id="uplink" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <SectionMeta index="06" label="UPLINK" />
      <SectionHeading>Download My Resume</SectionHeading>
      <SectionSub>A snapshot of my technical journey — data analytics, full-stack, and AI-powered applications.</SectionSub>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="resume-grid">
        {/* Resume preview */}
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
          {/* UPDATED: Changed from <a> tag to a <button> with window.open to fix the click issue */}
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
      <style>{`
        @keyframes scanLine { 0% { transform: translateY(0); opacity: 1; } 80% { opacity: 0.5; } 100% { transform: translateY(100vh); opacity: 0; } }
        @media (max-width: 768px) { .resume-grid { grid-template-columns: 1fr !important; } }
      `}</style>
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
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "40px 24px", textAlign: "center", background: "rgba(0,0,0,0.2)" }}>
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

   const handleBootComplete = useCallback(() => {
    setBooting(false);
    
    // Wait for React to finish drawing the main page before scrolling
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
        body { background: #050812; color: #F8FAFC; font-family: 'Inter', sans-serif; cursor: none; overflow-x: hidden; }
        @media (max-width: 768px) { body { cursor: auto; } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050812; }
        ::-webkit-scrollbar-thumb { background: #00E5FF33; border-radius: 2px; }
        input, textarea { color-scheme: dark; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95) translateY(-10px); } to { opacity: 1; transform: none; } }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-btn { display: flex !important; }
          .milestone-grid { grid-template-columns: 40px 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {booting && <BootSequence onComplete={handleBootComplete} />}

      {!booting && (
        <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease", minHeight: "100vh" }}>
          <ParticleBackground />
          <CustomCursor />
          <Navbar activeSection={activeSection} />

          <main style={{ position: "relative", zIndex: 1 }}>
            <Hero />
            <StorySection />
            <GalaxySection />
            <BuildsSection />
            <PathSection />
            <UplinkSection /> {/* Moved Uplink (Resume) UP */}
            <SignalSection /> {/* Moved Signal (Contact) DOWN */}
          </main>

          <Footer />

          {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} />}

          <div style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 1000,
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