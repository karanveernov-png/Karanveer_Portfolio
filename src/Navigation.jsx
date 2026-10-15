// ============================================================================
// PROJECT ABYSS — NAVIGATION & SURFACE ZONE
// Scroll-reveal hook, Marine Navigation header, Depth Gauge, Surface/Identity zone
// ============================================================================
import React, { useState, useEffect, useRef, useMemo } from "react";
import { PROFILE, ZONES } from "./data.js";


// ============================================================================
// SCROLL-REVEAL: lightweight, one-shot fade+rise entrance for each zone
// ============================================================================
export function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(36px)",
    transition:
      "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
  };

  return [ref, style];
}

// ============================================================================
// MARINE INSTRUMENT NAVIGATION & BATHYMETRIC DEPTH GAUGE
// ============================================================================
export function ExpeditionNavigation({
  activeZone,
  scrollProgress,
  onOpenPalette,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const telemetry = useMemo(() => {
    let depth = 0;
    if (scrollProgress <= 0.74) {
      depth = Math.round((scrollProgress / 0.74) * 1850);
    } else {
      depth = Math.round(((1.0 - scrollProgress) / 0.26) * 1850);
    }
    depth = Math.max(0, depth);
    const atm = (1.0 + depth / 10.0).toFixed(1);
    const temp = (21.4 - (depth / 1850) * 19.1).toFixed(1);
    return { depth, atm, temp };
  }, [scrollProgress]);

  const scrollToZone = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "16px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background:
            scrollProgress > 0.03
              ? "linear-gradient(180deg, rgba(2, 9, 16, 0.84) 0%, rgba(2, 9, 16, 0.0) 100%)"
              : "transparent",
          backdropFilter: scrollProgress > 0.03 ? "blur(6px)" : "none",
          transition: "background 0.4s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <button
            onClick={() => scrollToZone("surface")}
            aria-label="Return to ocean surface"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "#EEF3F6",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: scrollProgress > 0.74 ? "#D9A76A" : "#68B0C6",
                boxShadow:
                  scrollProgress > 0.74
                    ? "0 0 12px rgba(217, 167, 106, 0.8)"
                    : "0 0 10px rgba(104, 176, 198, 0.6)",
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.24em",
                  color: "#EEF3F6",
                  fontWeight: 600,
                }}
              >
                ABYSS <span style={{ color: "#6E879B" }}>//</span> KVS
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9.5,
                  letterSpacing: "0.14em",
                  color: "#8CA3B5",
                }}
              >
                {telemetry.depth.toString().padStart(4, "0")}m · {telemetry.atm} ATM ·{" "}
                {telemetry.temp}°C
              </div>
            </div>
          </button>
        </div>

        <nav
          aria-label="Primary Portfolio Navigation"
          className="abyss-desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(4, 15, 25, 0.58)",
            border: "1px solid rgba(180, 198, 212, 0.14)",
            borderRadius: 100,
            padding: "5px 8px",
            backdropFilter: "blur(12px)",
          }}
        >
          {ZONES.map((z) => {
            const isActive = activeZone === z.id;
            return (
              <button
                key={z.id}
                onClick={() => scrollToZone(z.id)}
                style={{
                  background: isActive ? "rgba(104, 176, 198, 0.16)" : "transparent",
                  border: isActive
                    ? "1px solid rgba(104, 176, 198, 0.36)"
                    : "1px solid transparent",
                  borderRadius: 100,
                  padding: "6px 14px",
                  cursor: "pointer",
                  color: isActive ? "#EEF3F6" : "#9BB0C1",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 12.5,
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: "0.02em",
                  transition: "all 0.25s ease",
                }}
              >
                {z.name.replace("The ", "")}
              </button>
            );
          })}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={onOpenPalette}
            className="abyss-cmd-btn"
            title="Open expedition index (Ctrl+K)"
            style={{
              background: "rgba(4, 15, 25, 0.58)",
              border: "1px solid rgba(180, 198, 212, 0.16)",
              borderRadius: 100,
              padding: "7px 12px",
              color: "#9BB0C1",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10.5,
              letterSpacing: "0.08em",
              cursor: "pointer",
              backdropFilter: "blur(10px)",
            }}
          >
            ⌘K
          </button>

          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="abyss-mobile-btn"
            aria-label="Toggle navigation menu"
            style={{
              display: "none",
              background: "rgba(4, 15, 25, 0.75)",
              border: "1px solid rgba(180, 198, 212, 0.22)",
              borderRadius: 100,
              padding: "7px 14px",
              color: "#EEF3F6",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              cursor: "pointer",
            }}
          >
            {mobileMenuOpen ? "CLOSE ✕" : "DEPTHS ☰"}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 95,
            background: "rgba(2, 8, 15, 0.94)",
            backdropFilter: "blur(16px)",
            padding: "88px 24px 32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.22em",
                color: "#68B0C6",
                marginBottom: 8,
              }}
            >
              BATHYMETRIC STATIONS — DIRECT DESCENT
            </div>
            {ZONES.map((z) => (
              <button
                key={z.id}
                onClick={() => scrollToZone(z.id)}
                style={{
                  background:
                    activeZone === z.id
                      ? "rgba(104, 176, 198, 0.14)"
                      : "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(180, 198, 212, 0.12)",
                  borderRadius: 12,
                  padding: "14px 18px",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      color: "#EEF3F6",
                      fontSize: 15,
                      fontWeight: 600,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {z.name}
                  </div>
                  <div style={{ color: "#8CA3B5", fontSize: 12, marginTop: 2 }}>
                    {z.sub}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "#68B0C6",
                  }}
                >
                  {z.depthMeters}m
                </span>
              </button>
            ))}
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(180, 198, 212, 0.12)",
              paddingTop: 18,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#8CA3B5",
            }}
          >
            <span>KARANVEER SINGH</span>
            <a
              href={PROFILE.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#E6B87C", textDecoration: "none" }}
            >
              OPEN RESUME ↗
            </a>
          </div>
        </div>
      )}

      <aside
        aria-label="Bathymetric Depth Indicator"
        className="abyss-depth-gauge"
        style={{
          position: "fixed",
          right: 24,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 90,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 18,
        }}
      >
        {ZONES.map((z) => {
          const isActive = activeZone === z.id;
          return (
            <button
              key={z.id}
              onClick={() => scrollToZone(z.id)}
              title={`${z.name} (${z.depthMeters}m)`}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "2px 0",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  color: isActive ? "#EEF3F6" : "rgba(180, 198, 212, 0.42)",
                  opacity: isActive ? 1 : 0.75,
                  transition: "all 0.25s ease",
                }}
              >
                {z.depthMeters === 0 && z.id === "lighthouse"
                  ? "BEACON"
                  : `${z.depthMeters}m`}
              </span>
              <span
                style={{
                  width: isActive ? 26 : 12,
                  height: 2,
                  background: isActive
                    ? z.id === "lighthouse"
                      ? "#D9A76A"
                      : "#68B0C6"
                    : "rgba(180, 198, 212, 0.25)",
                  transition: "all 0.3s ease",
                  borderRadius: 2,
                }}
              />
            </button>
          );
        })}
      </aside>
    </>
  );
}

// ============================================================================
// ZONE A — THE SURFACE (ARRIVING AT THE OCEAN & IDENTITY)
// ============================================================================
export function SurfaceZone({ introComplete, onSkipIntro }) {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIdx((i) => (i + 1) % PROFILE.roles.length);
    }, 3400);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="surface"
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "112px clamp(24px, 6vw, 96px) 44px",
        zIndex: 2,
      }}
    >
      {/* Top atmospheric coordinate metadata */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          borderTop: "1px solid rgba(238, 243, 246, 0.16)",
          paddingTop: 16,
          maxWidth: 1240,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.2em",
            color: "#C4D4E0",
            textTransform: "uppercase",
          }}
        >
          STATION 01 — PELAGIC SURFACE · {PROFILE.coordinates}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.16em",
              color: "#C4D4E0",
            }}
          >
            {PROFILE.location.toUpperCase()} · {PROFILE.university.toUpperCase()}
          </div>
          {!introComplete && (
            <button
              onClick={onSkipIntro}
              style={{
                background: "rgba(4, 15, 25, 0.65)",
                border: "1px solid rgba(238, 243, 246, 0.25)",
                borderRadius: 100,
                padding: "4px 12px",
                color: "#EEF3F6",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.12em",
                cursor: "pointer",
              }}
            >
              SKIP INTRO →
            </button>
          )}
        </div>
      </div>

      {/* Main Horizon Editorial Composition */}
      <div
        style={{
          maxWidth: 1240,
          width: "100%",
          margin: "auto",
          padding: "44px 0",
          opacity: introComplete ? 1 : 0.92,
          transform: introComplete ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            letterSpacing: "0.26em",
            color: "#9CE0F2",
            textTransform: "uppercase",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 28,
              height: 1,
              background: "#9CE0F2",
            }}
          />
          <span>{PROFILE.roles[roleIdx]}</span>
        </div>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(54px, 9.5vw, 126px)",
            fontWeight: 500,
            lineHeight: 0.94,
            letterSpacing: "-0.02em",
            color: "#F4F8FA",
            marginBottom: 26,
            textShadow: "0 14px 44px rgba(2, 10, 18, 0.65)",
          }}
        >
          Karanveer Singh
        </h1>

        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(17px, 2.0vw, 22px)",
            fontWeight: 300,
            lineHeight: 1.58,
            color: "#E2EDF3",
            maxWidth: 680,
            marginBottom: 38,
            textShadow: "0 4px 24px rgba(2, 10, 18, 0.85)",
          }}
        >
          {PROFILE.statement}
        </p>

        {/* Primary Expedition Actions */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            alignItems: "center",
          }}
        >
          <a
            href="#vessel"
            style={{
              background: "rgba(244, 248, 250, 0.94)",
              color: "#03101A",
              padding: "14px 28px",
              borderRadius: 100,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 13.5,
              fontWeight: 600,
              letterSpacing: "0.03em",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
            }}
          >
            <span>Descend to Deployed Systems</span>
            <span style={{ fontSize: 15 }}>↓</span>
          </a>

          <a
            href="#capabilities"
            style={{
              background: "rgba(4, 17, 29, 0.68)",
              border: "1px solid rgba(238, 243, 246, 0.26)",
              color: "#EEF3F6",
              padding: "14px 26px",
              borderRadius: 100,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 13.5,
              fontWeight: 500,
              textDecoration: "none",
              backdropFilter: "blur(10px)",
            }}
          >
            Technical Capabilities
          </a>

          <a
            href={PROFILE.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "rgba(4, 17, 29, 0.56)",
              border: "1px solid rgba(217, 167, 106, 0.42)",
              color: "#E8C391",
              padding: "14px 24px",
              borderRadius: 100,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.08em",
              textDecoration: "none",
              backdropFilter: "blur(10px)",
            }}
          >
            RESUME DOSSIER ↗
          </a>

          <a
            href="#lighthouse"
            style={{
              color: "#D6E3EC",
              padding: "12px 16px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 13.5,
              textDecoration: "none",
            }}
          >
            Contact Signal →
          </a>
        </div>
      </div>

      {/* Bottom Surface Horizon Bar: Verifiable Identity Facts */}
      <div
        style={{
          maxWidth: 1240,
          width: "100%",
          margin: "0 auto",
          borderTop: "1px solid rgba(238, 243, 246, 0.16)",
          paddingTop: 20,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(210px, 100%), 1fr))",
          gap: 20,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.18em",
              color: "#9BB0C1",
              marginBottom: 4,
            }}
          >
            ACADEMIC COMMISSION
          </div>
          <div style={{ color: "#EEF3F6", fontSize: 13.5, fontWeight: 500 }}>
            B.Tech CSE (3rd Year) · Rayat Bahra University
          </div>
        </div>

        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.18em",
              color: "#9BB0C1",
              marginBottom: 4,
            }}
          >
            PRIMARY DISCIPLINES
          </div>
          <div style={{ color: "#EEF3F6", fontSize: 13.5, fontWeight: 500 }}>
            Python · Data Analytics · LLM Applications
          </div>
        </div>

        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.18em",
              color: "#9BB0C1",
              marginBottom: 4,
            }}
          >
            LIVE PRODUCTION DEPLOYMENTS
          </div>
          <div style={{ color: "#EEF3F6", fontSize: 13.5, fontWeight: 500 }}>
            BrainBlitz (AI MCQ) & Studora (Analytics)
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#D6E3EC",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11.5,
              textDecoration: "none",
              borderBottom: "1px solid rgba(180,198,212,0.35)",
              paddingBottom: 2,
            }}
          >
            GITHUB ↗
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#D6E3EC",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11.5,
              textDecoration: "none",
              borderBottom: "1px solid rgba(180,198,212,0.35)",
              paddingBottom: 2,
            }}
          >
            LINKEDIN ↗
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            style={{
              color: "#D6E3EC",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11.5,
              textDecoration: "none",
              borderBottom: "1px solid rgba(180,198,212,0.35)",
              paddingBottom: 2,
            }}
          >
            EMAIL ↗
          </a>
        </div>
      </div>
    </section>
  );
}
