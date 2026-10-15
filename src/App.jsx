// ============================================================================
// PROJECT ABYSS — MAIN APPLICATION
// All Section Zones, Modals, Quick Palette, and Root Portfolio Component
// ============================================================================
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  PROFILE, ZONES, SKILL_DOMAINS, SKILLS,
  PROJECTS, CERTIFICATES, MILESTONES, CAREER_PATH
} from "./data.js";
import { OceanicCanvas, OceanParticles } from "./Background.jsx";
import { useReveal, ExpeditionNavigation, SurfaceZone } from "./Navigation.jsx";


// ============================================================================
// ZONE B — THE OPEN OCEAN (TECHNICAL CAPABILITIES & SONAR HYDROGRAPHY)
// ============================================================================
export function OpenOceanCapabilities() {
  const [selectedSkillId, setSelectedSkillId] = useState("python");
  const [activeDomain, setActiveDomain] = useState("all");

  const selectedSkill = useMemo(
    () => SKILLS.find((s) => s.id === selectedSkillId) || SKILLS[0],
    [selectedSkillId]
  );

  const connectedIds = useMemo(
    () => new Set(selectedSkill.connections),
    [selectedSkill]
  );

  const [revealRef, revealStyle] = useReveal();

  return (
    <section
      id="capabilities"
      ref={revealRef}
      className="abyss-section-contain"
      style={{
        padding: "130px clamp(24px, 6vw, 96px)",
        position: "relative",
        zIndex: 2,
        maxWidth: 1320,
        margin: "0 auto",
        ...revealStyle,
      }}
    >
      <div style={{ marginBottom: 52 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.24em",
            color: "#8CD0E3",
            marginBottom: 14,
          }}
        >
          ZONE B // 180m EPIPELAGIC STRATUM — TECHNICAL CAPABILITIES
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(36px, 5.5vw, 68px)",
            fontWeight: 500,
            color: "#F4F8FA",
            lineHeight: 1.05,
            marginBottom: 18,
          }}
        >
          Connected systems across the water column.
        </h2>
        <p
          style={{
            color: "#C4D4E0",
            fontSize: 16,
            lineHeight: 1.68,
            maxWidth: 680,
          }}
        >
          Rather than arbitrary percentage bars, capabilities are mapped by how they
          interlock in production — from Python data pipelines and SQL schemas to Groq
          and Sarvam AI inference engines delivered through interactive web surfaces.
        </p>
      </div>

      {/* Domain Filter Pills */}
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 32,
        }}
      >
        <button
          onClick={() => setActiveDomain("all")}
          style={{
            background:
              activeDomain === "all"
                ? "rgba(104, 176, 198, 0.22)"
                : "rgba(5, 19, 31, 0.6)",
            border:
              activeDomain === "all"
                ? "1px solid rgba(104, 176, 198, 0.55)"
                : "1px solid rgba(180, 198, 212, 0.16)",
            borderRadius: 100,
            padding: "8px 18px",
            color: activeDomain === "all" ? "#EEF3F6" : "#9BB0C1",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.1em",
            cursor: "pointer",
          }}
        >
          ALL SYSTEMS ({SKILLS.length})
        </button>
        {SKILL_DOMAINS.map((d) => (
          <button
            key={d.id}
            onClick={() => setActiveDomain(d.id)}
            style={{
              background:
                activeDomain === d.id
                  ? "rgba(104, 176, 198, 0.22)"
                  : "rgba(5, 19, 31, 0.6)",
              border:
                activeDomain === d.id
                  ? "1px solid rgba(104, 176, 198, 0.55)"
                  : "1px solid rgba(180, 198, 212, 0.16)",
              borderRadius: 100,
              padding: "8px 18px",
              color: activeDomain === d.id ? "#EEF3F6" : "#9BB0C1",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.08em",
              cursor: "pointer",
            }}
          >
            {d.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Interactive Pelagic Constellation + Telemetry Inspector */}
      <div
        className="abyss-capabilities-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.35fr) minmax(300px, 0.85fr)",
          gap: 28,
          alignItems: "stretch",
          marginBottom: 44,
        }}
      >
        <div
          style={{
            background: "rgba(3, 14, 24, 0.66)",
            border: "1px solid rgba(180, 198, 212, 0.16)",
            borderRadius: 20,
            padding: 24,
            position: "relative",
            minHeight: 440,
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10.5,
              color: "#8CA3B5",
              letterSpacing: "0.14em",
            }}
          >
            <span>SONAR RELATIONAL TOPOLOGY // SELECT NODE TO INSPECT</span>
            <span>ACTIVE: {selectedSkill.name.toUpperCase()}</span>
          </div>

          <div style={{ position: "relative", width: "100%", height: 360, margin: "12px 0" }}>
            <svg
              viewBox="0 0 800 360"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                overflow: "visible",
              }}
            >
              <circle
                cx="400"
                cy="180"
                r="95"
                fill="none"
                stroke="rgba(180, 198, 212, 0.09)"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
              <circle
                cx="400"
                cy="180"
                r="160"
                fill="none"
                stroke="rgba(180, 198, 212, 0.09)"
                strokeWidth="1"
                strokeDasharray="4,4"
              />

              {SKILLS.map((s) =>
                s.connections.map((targetId) => {
                  const target = SKILLS.find((k) => k.id === targetId);
                  if (!target || s.id > target.id) return null;
                  const isHighlighted =
                    s.id === selectedSkill.id || target.id === selectedSkill.id;
                  return (
                    <line
                      key={`${s.id}-${target.id}`}
                      x1={s.x * 8}
                      y1={s.y * 3.6}
                      x2={target.x * 8}
                      y2={target.y * 3.6}
                      stroke={
                        isHighlighted
                          ? "rgba(140, 208, 227, 0.82)"
                          : "rgba(180, 198, 212, 0.14)"
                      }
                      strokeWidth={isHighlighted ? "1.8" : "1"}
                    />
                  );
                })
              )}
            </svg>

            {SKILLS.map((s) => {
              const isSelected = s.id === selectedSkill.id;
              const isConnected = connectedIds.has(s.id);
              const isFilteredOut =
                activeDomain !== "all" && s.domain !== activeDomain;
              const isLearning = s.status === "Active Learning";

              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSkillId(s.id)}
                  onMouseEnter={() => setSelectedSkillId(s.id)}
                  style={{
                    position: "absolute",
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    transform: "translate(-50%, -50%)",
                    background: isSelected
                      ? "rgba(104, 176, 198, 0.30)"
                      : isConnected
                      ? "rgba(9, 32, 48, 0.90)"
                      : "rgba(4, 16, 26, 0.82)",
                    border: isSelected
                      ? "1.5px solid #9CE0F2"
                      : isLearning
                      ? "1px dashed rgba(217, 167, 106, 0.6)"
                      : isConnected
                      ? "1px solid rgba(104, 176, 198, 0.48)"
                      : "1px solid rgba(180, 198, 212, 0.18)",
                    borderRadius: 100,
                    padding: isSelected ? "6px 13px" : "5px 11px",
                    color: isSelected
                      ? "#FFFFFF"
                      : isConnected
                      ? "#E2EDF3"
                      : "#9BB0C1",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: isSelected ? 12.5 : 11.5,
                    fontWeight: isSelected ? 600 : 500,
                    cursor: "pointer",
                    opacity: isFilteredOut ? 0.25 : 1,
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                    zIndex: isSelected ? 10 : isConnected ? 5 : 2,
                    boxShadow: isSelected
                      ? "0 0 24px rgba(104, 176, 198, 0.35)"
                      : "none",
                  }}
                >
                  {s.name}
                </button>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#8CA3B5",
            }}
          >
            <span>SOLID RING: PRODUCTION / VERIFIED</span>
            <span style={{ color: "#E6B87C" }}>
              DASHED RING: ACTIVE LEARNING HORIZON (REACT · FASTAPI)
            </span>
          </div>
        </div>

        {/* Right: Selected Capability Telemetry Card */}
        <div
          style={{
            background: "rgba(4, 17, 29, 0.78)",
            border: "1px solid rgba(104, 176, 198, 0.28)",
            borderRadius: 20,
            padding: "32px 28px",
            backdropFilter: "blur(14px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10.5,
                  letterSpacing: "0.16em",
                  color:
                    selectedSkill.status === "Active Learning"
                      ? "#E6B87C"
                      : "#8CD0E3",
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  borderRadius: 100,
                  background:
                    selectedSkill.status === "Active Learning"
                      ? "rgba(217, 167, 106, 0.14)"
                      : "rgba(104, 176, 198, 0.14)",
                }}
              >
                {selectedSkill.status}
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "#8CA3B5",
                }}
              >
                NODE // {selectedSkill.id.toUpperCase()}
              </span>
            </div>

            <h3
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 38,
                fontWeight: 600,
                color: "#F4F8FA",
                marginBottom: 12,
              }}
            >
              {selectedSkill.name}
            </h3>

            <p
              style={{
                color: "#D6E3EC",
                fontSize: 14.5,
                lineHeight: 1.65,
                marginBottom: 24,
              }}
            >
              {selectedSkill.role}
            </p>

            {selectedSkill.level != null && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", color: "#8CA3B5" }}>
                    PROFICIENCY SIGNAL
                  </span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#8CD0E3" }}>
                    {selectedSkill.level}%
                  </span>
                </div>
                <div style={{ height: 5, background: "rgba(180, 198, 212, 0.12)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${selectedSkill.level}%`, background: "linear-gradient(90deg, #68B0C6, #9CE0F2)", borderRadius: 3, transition: "width 0.5s ease" }} />
                </div>
              </div>
            )}

            <div style={{ marginBottom: 24 }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: "#8CA3B5",
                  marginBottom: 10,
                }}
              >
                VERIFIED APPLICATION & EVIDENCE
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {selectedSkill.usedIn.map((ev) => (
                  <div
                    key={ev}
                    style={{
                      fontSize: 13,
                      color: "#EEF3F6",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span style={{ color: "#8CD0E3" }}>›</span>
                    <span>{ev}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(180, 198, 212, 0.14)",
              paddingTop: 18,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.18em",
                color: "#8CA3B5",
                marginBottom: 10,
              }}
            >
              INTERLOCKS WITH ({selectedSkill.connections.length} NODES)
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {selectedSkill.connections.map((cid) => {
                const conn = SKILLS.find((k) => k.id === cid);
                if (!conn) return null;
                return (
                  <button
                    key={cid}
                    onClick={() => setSelectedSkillId(cid)}
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(180, 198, 212, 0.2)",
                      borderRadius: 6,
                      padding: "5px 10px",
                      color: "#D6E3EC",
                      fontSize: 12,
                      fontFamily: "'JetBrains Mono', monospace",
                      cursor: "pointer",
                    }}
                  >
                    {conn.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Structured 4-Stratum Capability Matrix */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
          gap: 18,
        }}
      >
        {SKILL_DOMAINS.map((domain) => {
          const domainSkills = SKILLS.filter((s) => s.domain === domain.id);
          return (
            <div
              key={domain.id}
              style={{
                background: "rgba(3, 14, 24, 0.58)",
                border: "1px solid rgba(180, 198, 212, 0.14)",
                borderRadius: 16,
                padding: "24px 22px",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: "#8CD0E3",
                  marginBottom: 6,
                }}
              >
                DEPTH {domain.depthRange}
              </div>
              <h3
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 17,
                  fontWeight: 600,
                  color: "#EEF3F6",
                  marginBottom: 8,
                }}
              >
                {domain.label}
              </h3>
              <p
                style={{
                  color: "#9BB0C1",
                  fontSize: 13,
                  lineHeight: 1.55,
                  marginBottom: 16,
                }}
              >
                {domain.summary}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {domainSkills.map((sk) => (
                  <button
                    key={sk.id}
                    onClick={() => setSelectedSkillId(sk.id)}
                    style={{
                      background:
                        selectedSkillId === sk.id
                          ? "rgba(104, 176, 198, 0.24)"
                          : "rgba(255, 255, 255, 0.04)",
                      border:
                        selectedSkillId === sk.id
                          ? "1px solid #8CD0E3"
                          : "1px solid rgba(180, 198, 212, 0.16)",
                      borderRadius: 6,
                      padding: "4px 10px",
                      color: "#E2EDF3",
                      fontSize: 12,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      cursor: "pointer",
                    }}
                  >
                    {sk.name}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ============================================================================
// ARCHITECTURAL TELEMETRY DIAGRAM (Honest SVG Diagram when local PNG is absent)
// ============================================================================
export function ProjectSchematicFallback({ project }) {
  const isBrainBlitz = project.id === "brainblitz";
  return (
    <div
      style={{
        padding: "20px 22px",
        background:
          "linear-gradient(145deg, rgba(6, 24, 38, 0.94) 0%, rgba(2, 9, 16, 0.98) 100%)",
        minHeight: 235,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          rowGap: 4,
          columnGap: 10,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9.5,
          letterSpacing: "0.16em",
          color: "#8CD0E3",
          borderBottom: "1px solid rgba(180, 198, 212, 0.12)",
          paddingBottom: 10,
        }}
      >
        <span>SYSTEM ARCHITECTURE DIAGRAM // {project.title.toUpperCase()}</span>
        <span style={{ color: "#E6B87C" }}>ILLUSTRATIVE SCHEMATIC</span>
      </div>

      <div
        className="abyss-arch-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
          margin: "16px 0",
        }}
      >
        {project.architecture.map((st, i) => (
          <div
            key={st.stage}
            style={{
              background:
                i === project.architecture.length - 1
                  ? "rgba(217, 167, 106, 0.12)"
                  : "rgba(104, 176, 198, 0.09)",
              border:
                i === project.architecture.length - 1
                  ? "1px solid rgba(230, 184, 124, 0.45)"
                  : "1px solid rgba(140, 208, 227, 0.3)",
              borderRadius: 10,
              padding: "14px 10px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9.5,
                color: i === project.architecture.length - 1 ? "#E6B87C" : "#8CD0E3",
                letterSpacing: "0.12em",
              }}
            >
              0{i + 1}
            </div>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 11.5,
                fontWeight: 600,
                color: "#F4F8FA",
                lineHeight: 1.3,
              }}
            >
              {st.name}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "#9BB0C1",
        }}
      >
        <span>LOCAL SCREENSHOT PATH: {project.image}</span>
        <span style={{ color: "#8CD0E3" }}>DEPLOYED ON STREAMLIT CLOUD</span>
      </div>
    </div>
  );
}

// ============================================================================
// ZONE C — THE RESEARCH VESSEL (DEPLOYED PROJECTS SHOWCASE) - WIDE & ANIMATED
// ============================================================================
export function ResearchVesselProjects() {
  const [revealRef, revealStyle] = useReveal();

  // Helper function to render individual project cards cleanly
  const renderProjectCard = (project) => (
    <article
      className="project-card-wrapper"
      style={{
        background: "rgba(8, 16, 28, 0.85)",
        border: "1px solid rgba(180, 198, 212, 0.12)",
        borderRadius: 20,
        overflow: "hidden",
        backdropFilter: "blur(16px)",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 15px 40px rgba(0, 0, 0, 0.4)",
        transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        width: "100%", 
        position: "relative",
        zIndex: 2, // Ensure cards stay above the new background layer
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
    >
      <div
        style={{
          width: "100%",
          height: 220,
          background: "#020810",
          position: "relative",
          borderBottom: "1px solid rgba(180, 198, 212, 0.1)",
        }}
      >
        <img
          src={project.image}
          alt={`${project.title} interface`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      </div>

      <div
        style={{
          padding: "28px 24px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <h3
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 26,
            fontWeight: 700,
            color: "#F4F8FA",
            marginBottom: 12,
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            color: "#8CA3B5",
            fontSize: 14.5,
            lineHeight: 1.6,
            marginBottom: 24,
          }}
        >
          {project.description}
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "#D6E3EC",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(180, 198, 212, 0.2)",
                padding: "6px 12px",
                borderRadius: 8,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div style={{ marginTop: "auto", display: "flex", gap: 20, alignItems: "center" }}>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#A28CD3", 
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            View Project <span style={{ fontSize: 18 }}>→</span>
          </a>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#8CA3B5",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </article>
  );

  return (
    <section
      id="vessel"
      ref={revealRef}
      className="abyss-section-contain"
      style={{
        padding: "120px clamp(24px, 6vw, 96px)",
        position: "relative",
        zIndex: 2,
        maxWidth: 1560,
        margin: "0 auto",
        ...revealStyle,
      }}
    >
      <style>{`
        .projects-layout {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: stretch; 
          gap: 0;
          position: relative;
          z-index: 2; /* Keeps content above the ambient background */
        }
        .project-column {
          display: flex;
          flex-direction: column;
          gap: 40px; 
          flex: 1;
          min-width: 320px;
          max-width: 480px;
        }
        .abyss-connector {
          flex: 1.5; 
          min-width: 350px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          position: relative;
          margin: 0 20px;
          padding-top: 150px;
        }
        @media (max-width: 1100px) {
          .projects-layout {
            flex-direction: column !important;
            align-items: center;
            gap: 40px;
          }
          .abyss-connector {
            display: none !important;
          }
          .project-column {
            min-width: 0;
            max-width: 100%;
            width: 100%;
          }
        }
      `}</style>

      {/* ======================================================================
          AMBIENT BACKGROUND LAYER (Moves freely across the entire section)
      ====================================================================== */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
          borderRadius: "40px", /* Softens edges if it spills */
        }}
      >
        <svg
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
          style={{ width: "100%", height: "100%", opacity: 0.8 }}
        >
          <defs>
            <filter id="bgGlowJelly">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* BACKGROUND: GIANT MANTA RAY SWEEPING FULL SCREEN */}
          <g fill="rgba(104, 176, 198, 0.06)">
            <path d="M 0 -25 Q 50 0 100 -15 Q 50 15 0 50 Q -50 15 -100 -15 Q -50 0 0 -25 Z" />
            <path d="M 0 50 Q 8 100 0 150" fill="none" stroke="rgba(104, 176, 198, 0.1)" strokeWidth="2" />
            <animateMotion 
              path="M -200 800 C 400 600, 1000 200, 1800 100" 
              dur="45s" 
              repeatCount="indefinite" 
              rotate="auto" 
            />
          </g>

          {/* BACKGROUND: DISTANT SCHOOL OF FISH */}
          <g fill="rgba(140, 208, 227, 0.3)">
            <path d="M 0 0 C -2 -2, -6 -2, -8 0 L -12 -2 L -12 2 L -8 0 C -6 2, -2 2, 0 0 Z" />
            <path d="M -15 10 C -17 8, -21 8, -23 10 L -27 8 L -27 12 L -23 10 C -21 12, -17 12, -15 10 Z" />
            <path d="M -25 -10 C -27 -12, -31 -12, -33 -10 L -37 -12 L -37 -8 L -33 -10 C -31 -8, -27 -8, -25 -10 Z" />
            <animateMotion 
              path="M 1800 700 C 1200 800, 600 500, -200 600" 
              dur="35s" 
              repeatCount="indefinite" 
              rotate="auto" 
            />
          </g>

          {/* BACKGROUND: PULSING JELLYFISH 1 (Left Side) */}
          <g filter="url(#bgGlowJelly)">
            <path d="M -18 0 C -18 -20, 18 -20, 18 0 Z" fill="rgba(162, 140, 211, 0.15)" />
            <path d="M -12 0 Q -18 15 -12 30 T -12 60" fill="none" stroke="rgba(162, 140, 211, 0.25)" strokeWidth="1.2" />
            <path d="M 0 0 Q 8 20 0 40 T 0 70" fill="none" stroke="rgba(162, 140, 211, 0.4)" strokeWidth="1.5" />
            <path d="M 12 0 Q 18 15 12 30 T 12 60" fill="none" stroke="rgba(162, 140, 211, 0.25)" strokeWidth="1.2" />
            <animateMotion 
              path="M 300 1000 C 350 700, 200 400, 300 -100" 
              dur="38s" 
              repeatCount="indefinite" 
            />
            <animateTransform 
              attributeName="transform" type="rotate" values="-8; 8; -8" dur="7s" repeatCount="indefinite" 
            />
          </g>

          {/* BACKGROUND: PULSING JELLYFISH 2 (Right Side) */}
          <g filter="url(#bgGlowJelly)" opacity="0.7">
            <path d="M -14 0 C -14 -15, 14 -15, 14 0 Z" fill="rgba(104, 176, 198, 0.2)" />
            <path d="M -8 0 Q -12 10 -8 20 T -8 40" fill="none" stroke="rgba(104, 176, 198, 0.3)" strokeWidth="1" />
            <path d="M 0 0 Q 5 15 0 30 T 0 50" fill="none" stroke="rgba(104, 176, 198, 0.4)" strokeWidth="1.2" />
            <path d="M 8 0 Q 12 10 8 20 T 8 40" fill="none" stroke="rgba(104, 176, 198, 0.3)" strokeWidth="1" />
            <animateMotion 
              path="M 1300 950 C 1200 650, 1400 350, 1250 -50" 
              dur="32s" 
              repeatCount="indefinite" 
            />
            <animateTransform 
              attributeName="transform" type="rotate" values="-5; 5; -5" dur="5s" repeatCount="indefinite" 
            />
          </g>
        </svg>
      </div>

      <div style={{ marginBottom: 56, maxWidth: 800, position: "relative", zIndex: 2 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.24em",
            color: "#8CD0E3",
            marginBottom: 14,
          }}
        >
          ZONE C // 540m MESOPELAGIC RESEARCH VESSEL
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(36px, 5.5vw, 64px)",
            fontWeight: 500,
            color: "#F4F8FA",
            lineHeight: 1.05,
            marginBottom: 18,
          }}
        >
          Engineered discoveries, live in open water.
        </h2>
      </div>

      <div className="projects-layout">
        {/* LEFT COLUMN: BrainBlitz (0) and Fluxora (2) */}
        <div className="project-column">
          {renderProjectCard(PROJECTS[0])}
          {renderProjectCard(PROJECTS[2])}
        </div>

        {/* CONNECTOR: The Animation SVG looping specifically between BrainBlitz and Studora */}
        <div className="abyss-connector">
          <svg
            viewBox="0 0 500 400"
            preserveAspectRatio="xMidYMid slice"
            style={{
              width: "100%",
              height: "400px",
              overflow: "visible",
              pointerEvents: "none",
            }}
          >
            <defs>
              <filter id="glowArc">
                <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* THE MAIN BIOLUMINESCENT ARC (Static partial circle) */}
            <path
              d="M 0 100 Q 250 200 500 100"
              fill="none"
              stroke="#68B0C6"
              strokeWidth="1.5"
              strokeDasharray="4 8"
              filter="url(#glowArc)"
              opacity="0.6"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="120"
                to="0"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>

            {/* Nodes touching BrainBlitz and Studora */}
            <circle cx="0" cy="100" r="4" fill="#8CD0E3" filter="url(#glowArc)">
              <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="500" cy="100" r="4" fill="#8CD0E3" filter="url(#glowArc)">
              <animate attributeName="r" values="3;6;3" dur="2.5s" repeatCount="indefinite" />
            </circle>

            {/* ==================================================================
                FOREGROUND: CREATURES CIRCLING THE CONNECTION
            ================================================================== */}
            
            {/* Coordinated School of Fish (Clockwise Oval Loop) */}
            <g fill="rgba(140, 208, 227, 0.75)">
              <path d="M 0 0 C -3 -3, -10 -3, -13 0 L -18 -3 L -18 3 L -13 0 C -10 3, -3 3, 0 0 Z" />
              <path d="M -25 15 C -28 12, -35 12, -38 15 L -43 12 L -43 18 L -38 15 C -35 18, -28 18, -25 15 Z" />
              <path d="M -20 -12 C -22 -14, -28 -14, -30 -12 L -34 -14 L -34 -10 L -30 -12 C -28 -10, -22 -10, -20 -12 Z" />
              <animateMotion
                path="M 0 100 C 150 250, 350 250, 500 100 C 350 -50, 150 -50, 0 100 Z"
                dur="18s"
                repeatCount="indefinite"
                rotate="auto"
              />
            </g>

            {/* Darting Predator Fish (Counter-Clockwise Oval Loop) */}
            <g fill="rgba(104, 176, 198, 0.95)">
              <path d="M 0 0 C -5 -4, -14 -4, -18 0 L -25 -5 L -25 5 L -18 0 C -14 4, -5 4, 0 0 Z" />
              <animateMotion
                path="M 500 100 C 350 250, 150 250, 0 100 C 150 -50, 350 -50, 500 100 Z"
                dur="14s"
                repeatCount="indefinite"
                rotate="auto"
              />
            </g>

            {/* Extra Ambient Glowing Data-Fish on the Connection Loop */}
            <g fill="#A28CD3">
              <path d="M 0 0 C -2 -2, -6 -2, -8 0 L -12 -2 L -12 2 L -8 0 C -6 2, -2 2, 0 0 Z" filter="url(#glowArc)" />
              <animateMotion
                path="M 0 100 C 200 200, 300 200, 500 100 C 300 0, 200 0, 0 100 Z"
                dur="12s"
                repeatCount="indefinite"
                rotate="auto"
              />
            </g>

            <g fill="#7CE0B8">
              <path d="M 0 0 C -2 -2, -5 -2, -7 0 L -10 -2 L -10 2 L -7 0 C -5 2, -2 2, 0 0 Z" filter="url(#glowArc)" />
              <animateMotion
                path="M 500 100 C 300 220, 200 220, 0 100 C 200 -20, 300 -20, 500 100 Z"
                dur="15s"
                repeatCount="indefinite"
                rotate="auto"
              />
            </g>
          </svg>
        </div>

        {/* RIGHT COLUMN: Studora (1) */}
        <div className="project-column" style={{ justifyContent: "flex-start" }}>
          {renderProjectCard(PROJECTS[1])}
        </div>
      </div>
    </section>
  );
}
// ============================================================================
// ZONE C.2 — HYDROGRAPHIC ARCHIVE (VERIFIED CERTIFICATES & PUBLICATIONS)
// ============================================================================
export function CredentialsArchive({ onSelectCertificate }) {
  const [revealRef, revealStyle] = useReveal();

  return (
    <section
      id="credentials"
      ref={revealRef}
      className="abyss-section-contain"
      style={{
        padding: "110px clamp(24px, 6vw, 96px)",
        position: "relative",
        zIndex: 2,
        maxWidth: 1320,
        margin: "0 auto",
        ...revealStyle,
      }}
    >
      <div style={{ marginBottom: 48 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.24em",
            color: "#E6B87C",
            marginBottom: 14,
          }}
        >
          ZONE C.2 // 1,080m HYDROGRAPHIC ARCHIVE — VERIFIED CREDENTIALS & RESEARCH
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(34px, 5vw, 60px)",
            fontWeight: 500,
            color: "#F4F8FA",
            lineHeight: 1.08,
            marginBottom: 16,
          }}
        >
          Validated certifications & conference publications.
        </h2>
        <p
          style={{
            color: "#C4D4E0",
            fontSize: 15.5,
            lineHeight: 1.65,
            maxWidth: 660,
          }}
        >
          Every credential below includes its original issuer, issue date, and
          credential identifier. Select any record to inspect the full archival
          dossier.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
          gap: 24,
        }}
      >
        {CERTIFICATES.map((cert) => (
          <div
            key={cert.id}
            onClick={() => onSelectCertificate(cert)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onSelectCertificate(cert)}
            style={{
              background: "rgba(3, 12, 22, 0.76)",
              border: "1px solid rgba(180, 198, 212, 0.18)",
              borderRadius: 20,
              padding: "28px 26px",
              cursor: "pointer",
              backdropFilter: "blur(14px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "border-color 0.25s ease, transform 0.25s ease",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    color: "#E6B87C",
                  }}
                >
                  {cert.code} · {cert.date.toUpperCase()}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: "#7CE0B8",
                    background: "rgba(124, 224, 184, 0.1)",
                    border: "1px solid rgba(124, 224, 184, 0.3)",
                    padding: "3px 9px",
                    borderRadius: 100,
                  }}
                >
                  ● {cert.status.toUpperCase()}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 27,
                  fontWeight: 600,
                  color: "#F4F8FA",
                  lineHeight: 1.2,
                  marginBottom: 8,
                }}
              >
                {cert.title}
              </h3>

              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11.5,
                  color: "#8CD0E3",
                  marginBottom: 14,
                }}
              >
                Issued by {cert.issuer} · ID: {cert.credentialId}
              </div>

              <p
                style={{
                  color: "#C4D4E0",
                  fontSize: 13.5,
                  lineHeight: 1.62,
                  marginBottom: 20,
                }}
              >
                {cert.description}
              </p>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  marginBottom: 20,
                }}
              >
                {cert.skills.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10.5,
                      color: "#D6E3EC",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(180, 198, 212, 0.16)",
                      padding: "3px 9px",
                      borderRadius: 6,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div
                style={{
                  borderTop: "1px solid rgba(180, 198, 212, 0.12)",
                  paddingTop: 14,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "#EEF3F6",
                }}
              >
                <span>INSPECT CREDENTIAL DOSSIER</span>
                <span style={{ color: "#8CD0E3" }}>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// CERTIFICATE DOSSIER MODAL
// ============================================================================
export function CertificateDossierModal({ cert, onClose }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cert, onClose]);

  if (!cert) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "rgba(1, 6, 12, 0.88)",
        backdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#04111D",
          border: "1px solid rgba(180, 198, 212, 0.24)",
          borderRadius: 22,
          maxWidth: 880,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "clamp(24px, 4vw, 44px)",
          boxShadow: "0 30px 90px rgba(0,0,0,0.75)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10.5,
                letterSpacing: "0.2em",
                color: "#E6B87C",
                marginBottom: 8,
              }}
            >
              VERIFIED CREDENTIAL DOSSIER // {cert.credentialId}
            </div>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(26px, 4vw, 40px)",
                color: "#F4F8FA",
                lineHeight: 1.15,
              }}
            >
              {cert.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close credential dossier"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(180, 198, 212, 0.2)",
              borderRadius: 100,
              padding: "8px 14px",
              color: "#EEF3F6",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              cursor: "pointer",
            }}
          >
            ESC ✕
          </button>
        </div>

        <div
          style={{
            background: "rgba(2, 8, 15, 0.9)",
            border: "1px solid rgba(180, 198, 212, 0.16)",
            borderRadius: 14,
            overflow: "hidden",
            marginBottom: 24,
          }}
        >
          {!imgError ? (
            <img
              src={cert.image}
              alt={cert.title}
              style={{
                width: "100%",
                maxHeight: 380,
                objectFit: "contain",
                display: "block",
                background: "#020810",
              }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              style={{
                padding: "36px 28px",
                textAlign: "center",
                border: "1px dashed rgba(217, 167, 106, 0.35)",
                margin: 16,
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "#E6B87C",
                  letterSpacing: "0.18em",
                  marginBottom: 8,
                }}
              >
                OFFICIAL ARCHIVAL RECORD · {cert.issuer.toUpperCase()}
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 28,
                  color: "#F4F8FA",
                  marginBottom: 6,
                }}
              >
                {cert.title}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: "#8CA3B5",
                }}
              >
                Recipient: Karanveer Singh · Issued: {cert.issueDate} · ID:{" "}
                {cert.credentialId}
              </div>
            </div>
          )}
        </div>

        <p
          style={{
            color: "#D6E3EC",
            fontSize: 15,
            lineHeight: 1.68,
            marginBottom: 24,
          }}
        >
          {cert.description}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(180px, 100%), 1fr))",
            gap: 14,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              padding: 14,
              borderRadius: 10,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: "#8CA3B5",
              }}
            >
              ISSUING AUTHORITY
            </div>
            <div
              style={{ color: "#EEF3F6", fontSize: 14, fontWeight: 600, marginTop: 4 }}
            >
              {cert.issuer}
            </div>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              padding: 14,
              borderRadius: 10,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: "#8CA3B5",
              }}
            >
              ISSUE DATE
            </div>
            <div
              style={{ color: "#EEF3F6", fontSize: 14, fontWeight: 600, marginTop: 4 }}
            >
              {cert.issueDate}
            </div>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              padding: 14,
              borderRadius: 10,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: "#8CA3B5",
              }}
            >
              CREDENTIAL ID
            </div>
            <div
              style={{
                color: "#8CD0E3",
                fontSize: 13.5,
                fontFamily: "'JetBrains Mono', monospace",
                marginTop: 4,
              }}
            >
              {cert.credentialId}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {cert.linkVerified && cert.link ? (
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#EEF3F6",
                color: "#04111D",
                padding: "12px 24px",
                borderRadius: 100,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 13.5,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              {cert.linkLabel} ↗
            </a>
          ) : (
            <span
              style={{
                background: "rgba(217, 167, 106, 0.12)",
                border: "1px solid rgba(217, 167, 106, 0.35)",
                color: "#E6B87C",
                padding: "12px 20px",
                borderRadius: 100,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11.5,
              }}
            >
              {cert.linkLabel}
            </span>
          )}

          <a
            href={`mailto:${PROFILE.email}?subject=Inquiry regarding ${encodeURIComponent(
              cert.title
            )}`}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(180, 198, 212, 0.2)",
              color: "#EEF3F6",
              padding: "12px 22px",
              borderRadius: 100,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 13.5,
              textDecoration: "none",
            }}
          >
            Request Copy / Inquiry via Email →
          </a>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ZONE D — THE ABYSS (TRAJECTORY, DEEP EXPERIMENTS & LONG-TERM AMBITIONS)
// ============================================================================
export function AbyssTrajectoryZone() {
  const [revealRef, revealStyle] = useReveal();
  
  // 1. References for the timeline container and the glowing line
  const timelineRef = useRef(null);
  const glowLineRef = useRef(null);

  // 2. Scroll effect to calculate fill percentage
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !glowLineRef.current) return;
      
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Start the glowing fill when the top of the timeline reaches 65% down the screen
      const startThreshold = windowHeight * 0.65; 
      
      let progress = 0;
      if (rect.top < startThreshold) {
        progress = (startThreshold - rect.top) / rect.height;
      }
      
      // Keep the progress clamped strictly between 0 and 1 (0% to 100%)
      progress = Math.max(0, Math.min(1, progress));
      
      // Apply the dynamic height to the glowing line
      glowLineRef.current.style.height = `${progress * 100}%`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Trigger immediately to set initial state
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="abyss"
      ref={revealRef}
      className="abyss-section-contain"
      style={{
        padding: "140px clamp(24px, 6vw, 96px)",
        position: "relative",
        zIndex: 2,
        maxWidth: 1200,
        margin: "0 auto",
        ...revealStyle,
      }}
    >
      <div style={{ marginBottom: 64 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.24em",
            color: "#8CD0E3",
            marginBottom: 14,
          }}
        >
          ZONE D // 1,850m BATHYPELAGIC TRENCH — TRAJECTORY & DEEP AMBITIONS
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(36px, 5.5vw, 68px)",
            fontWeight: 500,
            color: "#F4F8FA",
            lineHeight: 1.05,
            marginBottom: 18,
          }}
        >
          A path built from curiosity, not checklists.
        </h2>
        <p
          style={{
            color: "#C4D4E0",
            fontSize: 16,
            lineHeight: 1.7,
            maxWidth: 660,
          }}
        >
          In the quiet of the deep water column, each milestone marks a shift in
          how I approach computing — from foundational algorithms at Rayat Bahra
          University to shipping AI systems and exploring full-stack automation.
        </p>
      </div>

      <div
        ref={timelineRef}
        style={{
          position: "relative",
          marginLeft: 14,
          paddingLeft: "clamp(24px, 4vw, 48px)",
          display: "flex",
          flexDirection: "column",
          gap: 36,
        }}
      >
        {/* 3. Static Dim Background Line */}
        <div 
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 1,
            background: "rgba(104, 176, 198, 0.28)",
          }} 
        />

        {/* 4. Animated Glowing Line */}
        <div 
          ref={glowLineRef}
          style={{
            position: "absolute",
            left: -1, // Shifted slightly left to center it over the 1px base line
            top: 0,
            width: 3,
            background: "#68B0C6",
            boxShadow: "0 0 14px #68B0C6, 0 0 24px #9CE0F2",
            height: "0%", 
            transition: "height 0.15s ease-out", 
            zIndex: 1,
            borderRadius: "4px"
          }} 
        />

        {MILESTONES.map((m) => {
          const isFuture = m.year === "Future Horizon";
          return (
            <div
              key={m.year}
              style={{
                position: "relative",
                background: isFuture
                  ? "rgba(8, 25, 40, 0.76)"
                  : "rgba(3, 11, 20, 0.72)",
                border: isFuture
                  ? "1px dashed rgba(217, 167, 106, 0.5)"
                  : "1px solid rgba(180, 198, 212, 0.14)",
                borderRadius: 18,
                padding: "28px 30px",
                backdropFilter: "blur(12px)",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: "calc(-1 * clamp(24px, 4vw, 48px) - 6px)",
                  top: 34,
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: isFuture ? "#D9A76A" : "#68B0C6",
                  boxShadow: isFuture
                    ? "0 0 12px rgba(217, 167, 106, 0.8)"
                    : "0 0 10px rgba(104, 176, 198, 0.6)",
                  zIndex: 2, // Keeps the dots above the glowing line
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    color: isFuture ? "#E6B87C" : "#8CD0E3",
                  }}
                >
                  {m.year.toUpperCase()} // DEPTH {m.depth}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10.5,
                    color: "#8CA3B5",
                    letterSpacing: "0.1em",
                  }}
                >
                  {m.type.toUpperCase()}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 28,
                  fontWeight: 600,
                  color: "#F4F8FA",
                  marginBottom: 4,
                }}
              >
                {m.title}
              </h3>

              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11.5,
                  color: "#8CA3B5",
                  marginBottom: 12,
                }}
              >
                {m.org}
              </div>

              <p
                style={{
                  color: "#D6E3EC",
                  fontSize: 14.5,
                  lineHeight: 1.66,
                }}
              >
                {m.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* ── Career Path subsection ── */}
      <div style={{ marginTop: 80 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "#8CD0E3",
            marginBottom: 14,
          }}
        >
          EXPEDITION LOG — CAREER PATH
        </div>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 500,
            color: "#F4F8FA",
            lineHeight: 1.1,
            marginBottom: 36,
          }}
        >
          Energy cables between the milestones.
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: 20,
          }}
        >
          {CAREER_PATH.map((cp, i) => (
            <div
              key={i}
              style={{
                background: "rgba(3, 11, 20, 0.72)",
                border: "1px solid rgba(180, 198, 212, 0.14)",
                borderRadius: 16,
                padding: "24px 26px",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: "#8CD0E3",
                  marginBottom: 10,
                }}
              >
                {cp.period}
              </div>
              <h4
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#F4F8FA",
                  marginBottom: 4,
                }}
              >
                {cp.title}
              </h4>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "#8CA3B5",
                  marginBottom: 10,
                }}
              >
                {cp.org}
              </div>
              <p style={{ color: "#C4D4E0", fontSize: 13.5, lineHeight: 1.6 }}>
                {cp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// ZONE E — THE LIGHTHOUSE (RESUME DOSSIER, SIGNAL TRANSMISSION & TELEMETRY)
// ============================================================================
export function LighthouseZone() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [dispatched, setDispatched] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [cmdInput, setCmdInput] = useState("");
  const [cmdLog, setCmdLog] = useState([
    {
      type: "sys",
      text: "ABYSS HYDROGRAPHIC CONSOLE // Type 'help' for available queries.",
    },
  ]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    const sub = encodeURIComponent(
      form.subject || "Portfolio Inquiry — Project Abyss"
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${sub}&body=${body}`;
    setDispatched(true);
    setTimeout(() => setDispatched(false), 3500);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const copyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const executeConsoleCommand = (e) => {
    e.preventDefault();
    const raw = cmdInput.trim().toLowerCase();
    if (!raw) return;

    const responses = {
      help: "Available queries: about · skills · projects · certificates · contact · github · linkedin · clear",
      about: `${PROFILE.name} — ${PROFILE.degree} at ${PROFILE.university}. Based in ${PROFILE.location}.`,
      skills:
        "Core: Python, Pandas, NumPy, Matplotlib, Streamlit, Groq API, Sarvam AI API, Supabase, SQL, Git, VS Code | Learning: React, FastAPI.",
      projects:
        "1. BrainBlitz (AI Quiz Platform: streamlit.app) | 2. Studora (College Analytics Platform: studoraacademia.streamlit.app)",
      certificates:
        "1. Infosys Backend Python (Apr 2026) | 2. ICISFT Research Paper (Mar 2026) | 3. Simplilearn Prompt Engineering (Jul 2026)",
      contact: `Email: ${PROFILE.email} | Phone: ${PROFILE.phone} | Location: ${PROFILE.location}`,
      github: "Opening GitHub profile (https://github.com/karanveernov-png)...",
      linkedin:
        "Opening LinkedIn profile (https://www.linkedin.com/in/karanveer-singh-0562663b5)...",
    };

    if (raw === "clear") {
      setCmdLog([{ type: "sys", text: "Console log cleared." }]);
      setCmdInput("");
      return;
    }
    if (raw === "github")
      window.open(PROFILE.github, "_blank", "noopener,noreferrer");
    if (raw === "linkedin")
      window.open(PROFILE.linkedin, "_blank", "noopener,noreferrer");

    const reply =
      responses[raw] ||
      `Unrecognized query '${raw}'. Type 'help' to list valid commands.`;
    setCmdLog((prev) => [
      ...prev,
      { type: "in", text: `› ${raw}` },
      { type: "out", text: reply },
    ]);
    setCmdInput("");
  };

  const [revealRef, revealStyle] = useReveal();

  return (
    <section
      id="lighthouse"
      ref={revealRef}
      className="abyss-section-contain"
      style={{
        padding: "140px clamp(24px, 6vw, 96px) 80px",
        position: "relative",
        zIndex: 2,
        maxWidth: 1320,
        margin: "0 auto",
        ...revealStyle,
      }}
    >
      <div style={{ marginBottom: 56 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.24em",
            color: "#E6B87C",
            marginBottom: 14,
          }}
        >
          ZONE E // NOCTURNAL HORIZON — THE LIGHTHOUSE & EXPEDITION DOSSIER
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(38px, 5.5vw, 72px)",
            fontWeight: 500,
            color: "#F4F8FA",
            lineHeight: 1.04,
            marginBottom: 18,
          }}
        >
          A clear signal across the horizon.
        </h2>
        <p
          style={{
            color: "#D6E3EC",
            fontSize: 16,
            lineHeight: 1.68,
            maxWidth: 680,
          }}
        >
          {PROFILE.availability}. Access my full resume dossier or transmit a
          direct message below.
        </p>
      </div>

      {/* Resume Dossier Banner */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(16, 36, 52, 0.82) 0%, rgba(5, 16, 28, 0.90) 100%)",
          border: "1px solid rgba(217, 167, 106, 0.38)",
          borderRadius: 22,
          padding: "clamp(24px, 4vw, 40px)",
          marginBottom: 48,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 24,
          backdropFilter: "blur(14px)",
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10.5,
              letterSpacing: "0.2em",
              color: "#E6B87C",
              marginBottom: 8,
            }}
          >
            EXPEDITION UPLINK // CURRICULUM VITAE
          </div>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 34,
              color: "#F4F8FA",
              marginBottom: 8,
            }}
          >
            Karanveer Singh — Engineering Resume
          </h3>
          <p style={{ color: "#C4D4E0", fontSize: 14.5, lineHeight: 1.6 }}>
            Complete academic record at Rayat Bahra University (B.Tech CSE),
            deployed AI & data systems (BrainBlitz, Studora), conference research
            publication (ICISFT 2026), and verified technical certifications.
          </p>
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a
            href={PROFILE.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#E6B87C",
              color: "#04101A",
              padding: "14px 26px",
              borderRadius: 100,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 13.5,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            View Resume PDF ↗
          </a>
          <a
            href={PROFILE.resumePdf}
            download={PROFILE.resumeDownloadName}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(230, 184, 124, 0.4)",
              color: "#F4F8FA",
              padding: "14px 24px",
              borderRadius: 100,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              textDecoration: "none",
            }}
          >
            Download ↓
          </a>
        </div>
      </div>

      {/* Two-Column Contact & Telemetry Layout */}
      <div
        className="abyss-contact-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)",
          gap: 36,
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              background: "rgba(4, 15, 26, 0.76)",
              border: "1px solid rgba(180, 198, 212, 0.16)",
              borderRadius: 20,
              padding: "28px 26px",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10.5,
                letterSpacing: "0.2em",
                color: "#8CD0E3",
                marginBottom: 20,
              }}
            >
              DIRECT TRANSMISSION CHANNELS
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: "#8CA3B5",
                    marginBottom: 4,
                  }}
                >
                  ELECTRONIC MAIL
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <a
                    href={`mailto:${PROFILE.email}`}
                    style={{
                      color: "#F4F8FA",
                      fontSize: 15,
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                  >
                    {PROFILE.email}
                  </a>
                  <button
                    onClick={copyEmail}
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(180,198,212,0.2)",
                      borderRadius: 6,
                      padding: "3px 8px",
                      color: copiedEmail ? "#7CE0B8" : "#B4C6D4",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      cursor: "pointer",
                    }}
                  >
                    {copiedEmail ? "COPIED ✓" : "COPY"}
                  </button>
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: "#8CA3B5",
                    marginBottom: 4,
                  }}
                >
                  TELEPHONE LINE
                </div>
                <a
                  href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`}
                  style={{
                    color: "#F4F8FA",
                    fontSize: 15,
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  {PROFILE.phone}
                </a>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: "#8CA3B5",
                    marginBottom: 4,
                  }}
                >
                  BASE STATION
                </div>
                <div style={{ color: "#F4F8FA", fontSize: 15 }}>
                  {PROFILE.location} ({PROFILE.coordinates})
                </div>
              </div>

              <div
                style={{
                  borderTop: "1px solid rgba(180,198,212,0.12)",
                  paddingTop: 16,
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(180,198,212,0.2)",
                    borderRadius: 100,
                    padding: "8px 16px",
                    color: "#EEF3F6",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11.5,
                    textDecoration: "none",
                  }}
                >
                  GitHub // karanveernov-png ↗
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(180,198,212,0.2)",
                    borderRadius: 100,
                    padding: "8px 16px",
                    color: "#EEF3F6",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11.5,
                    textDecoration: "none",
                  }}
                >
                  LinkedIn Profile ↗
                </a>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "rgba(2, 9, 16, 0.84)",
              border: "1px solid rgba(180, 198, 212, 0.16)",
              borderRadius: 20,
              padding: "22px 24px",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.18em",
                color: "#8CA3B5",
                marginBottom: 12,
              }}
            >
              INTERACTIVE TELEMETRY QUERY CONSOLE (TRY: help, skills, projects)
            </div>
            <div
              style={{
                maxHeight: 150,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                marginBottom: 12,
                fontSize: 12,
              }}
            >
              {cmdLog.map((entry, i) => (
                <div
                  key={i}
                  style={{
                    color:
                      entry.type === "in"
                        ? "#E6B87C"
                        : entry.type === "sys"
                        ? "#8CA3B5"
                        : "#D6E3EC",
                    lineHeight: 1.5,
                  }}
                >
                  {entry.text}
                </div>
              ))}
            </div>
            <form
              onSubmit={executeConsoleCommand}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                borderTop: "1px solid rgba(180, 198, 212, 0.12)",
                paddingTop: 10,
              }}
            >
              <span style={{ color: "#E6B87C", fontSize: 13 }}>›</span>
              <input
                type="text"
                value={cmdInput}
                onChange={(e) => setCmdInput(e.target.value)}
                placeholder="Query station log (e.g. 'skills' or 'projects')..."
                aria-label="Telemetry console command input"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#EEF3F6",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                }}
              />
            </form>
          </div>
        </div>

        {/* Right: Direct Signal Dispatch Form */}
        <form
          onSubmit={handleFormSubmit}
          style={{
            background: "rgba(4, 15, 26, 0.80)",
            border: "1px solid rgba(180, 198, 212, 0.18)",
            borderRadius: 22,
            padding: "32px 30px",
            backdropFilter: "blur(14px)",
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10.5,
              letterSpacing: "0.2em",
              color: "#E6B87C",
              marginBottom: 20,
            }}
          >
            COMPOSE DIRECT TRANSMISSION
          </div>

          {[
            {
              id: "name",
              label: "Your Name",
              type: "text",
              placeholder: "Enter your name",
              required: true,
            },
            {
              id: "email",
              label: "Your Email",
              type: "email",
              placeholder: "name@organization.com",
              required: true,
            },
            {
              id: "subject",
              label: "Subject",
              type: "text",
              placeholder: "Internship / Collaboration / Project Inquiry",
              required: false,
            },
          ].map((field) => (
            <div key={field.id} style={{ marginBottom: 18 }}>
              <label
                htmlFor={`abyss-${field.id}`}
                style={{
                  display: "block",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "#C4D4E0",
                  marginBottom: 6,
                }}
              >
                {field.label}
              </label>
              <input
                id={`abyss-${field.id}`}
                type={field.type}
                required={field.required}
                value={form[field.id]}
                onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                placeholder={field.placeholder}
                style={{
                  width: "100%",
                  background: "rgba(2, 9, 16, 0.65)",
                  border: "1px solid rgba(180, 198, 212, 0.22)",
                  borderRadius: 10,
                  padding: "12px 14px",
                  color: "#F4F8FA",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 14,
                  outline: "none",
                }}
              />
            </div>
          ))}

          <div style={{ marginBottom: 22 }}>
            <label
              htmlFor="abyss-message"
              style={{
                display: "block",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "#C4D4E0",
                marginBottom: 6,
              }}
            >
              Message
            </label>
            <textarea
              id="abyss-message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about your team, role, or engineering challenge..."
              style={{
                width: "100%",
                background: "rgba(2, 9, 16, 0.65)",
                border: "1px solid rgba(180, 198, 212, 0.22)",
                borderRadius: 10,
                padding: "12px 14px",
                color: "#F4F8FA",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 14,
                resize: "vertical",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              background: dispatched ? "#2E6F5E" : "#E6B87C",
              color: dispatched ? "#F4F8FA" : "#04101A",
              border: "none",
              borderRadius: 100,
              padding: "14px 24px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
          >
            {dispatched ? "Opening Mail Client ✓" : "Transmit Signal →"}
          </button>
        </form>
      </div>

      <footer
        style={{
          marginTop: 96,
          paddingTop: 28,
          borderTop: "1px solid rgba(180, 198, 212, 0.14)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: "#8CA3B5",
        }}
      >
        <div>
          © {new Date().getFullYear()} KARANVEER SINGH · PROJECT ABYSS — EXPLORE BEYOND
          THE SURFACE
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          <a href="#surface" style={{ color: "#C4D4E0", textDecoration: "none" }}>
            RETURN TO SURFACE ↑
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#C4D4E0", textDecoration: "none" }}
          >
            GITHUB
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#C4D4E0", textDecoration: "none" }}
          >
            LINKEDIN
          </a>
        </div>
      </footer>
    </section>
  );
}

// ============================================================================
// QUICK NAVIGATION PALETTE (CTRL+K)
// ============================================================================
export function ExpeditionPalette({ open, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  if (!open) return null;

  const actions = [
    ...ZONES.map((z) => ({
      label: `${z.code} — ${z.name} (${z.depthMeters}m)`,
      run: () =>
        document.getElementById(z.id)?.scrollIntoView({ behavior: "smooth" }),
    })),
    {
      label: "Launch BrainBlitz (Live Streamlit App)",
      run: () => window.open(PROJECTS[0].live, "_blank", "noopener,noreferrer"),
    },
    {
      label: "Launch Studora (Live College Analytics App)",
      run: () => window.open(PROJECTS[1].live, "_blank", "noopener,noreferrer"),
    },
    {
      label: "Open Resume PDF (/resume.pdf)",
      run: () => window.open(PROFILE.resumePdf, "_blank", "noopener,noreferrer"),
    },
    {
      label: "Open GitHub (karanveernov-png)",
      run: () => window.open(PROFILE.github, "_blank", "noopener,noreferrer"),
    },
    {
      label: "Open LinkedIn (Karanveer Singh)",
      run: () => window.open(PROFILE.linkedin, "_blank", "noopener,noreferrer"),
    },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 3000,
        background: "rgba(1, 6, 12, 0.8)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "14vh",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#04111D",
          border: "1px solid rgba(180, 198, 212, 0.24)",
          borderRadius: 18,
          width: "min(560px, 92vw)",
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
        }}
      >
        <div
          style={{
            padding: "14px 18px",
            borderBottom: "1px solid rgba(180, 198, 212, 0.12)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{ color: "#8CD0E3", fontFamily: "'JetBrains Mono', monospace" }}
          >
            ⌘
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to depth zone, project, or dossier..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#F4F8FA",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 14,
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#8CA3B5",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              cursor: "pointer",
            }}
          >
            ESC
          </button>
        </div>

        <div style={{ maxHeight: 320, overflowY: "auto" }}>
          {filtered.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                item.run();
                onClose();
              }}
              style={{
                width: "100%",
                textAlign: "left",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid rgba(180, 198, 212, 0.06)",
                padding: "13px 18px",
                color: "#D6E3EC",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 13.5,
                cursor: "pointer",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PORTFOLIO APPLICATION
// ============================================================================
export default function Portfolio() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeZone, setActiveZone] = useState("surface");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [introProgress, setIntroProgress] = useState(0.35);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) {
      setIntroProgress(1.0);
      setIntroComplete(true);
    }
    const onChange = (e) => setReducedMotion(e.matches);
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
    };
  }, []);

  // Gentle, non-blocking 1.6s horizon light reveal on arrival
  useEffect(() => {
    if (introComplete) return;
    let raf;
    const start = performance.now();
    const duration = 1600;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setIntroProgress(0.35 + eased * 0.65);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setIntroComplete(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [introComplete]);

  const handleSkipIntro = useCallback(() => {
    setIntroProgress(1.0);
    setIntroComplete(true);
  }, []);

  // Scroll depth (0–1) feeds the shader uniform every frame — cheap, no DOM
  // measurement, so a plain rAF-throttled scroll listener is the right tool.
  useEffect(() => {
    let rafId = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Active zone (for the nav + depth gauge) is event-driven via
  // IntersectionObserver instead of a getBoundingClientRect loop over every
  // section on every scroll frame — no forced layout reads while scrolling.
  useEffect(() => {
    const sections = ZONES.map((z) => document.getElementById(z.id)).filter(
      Boolean
    );
    if (!sections.length || typeof IntersectionObserver === "undefined") {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveZone(entry.target.id);
          }
        });
      },
      { rootMargin: "-38% 0px -58% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      } else if (e.key === "Escape") {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html {
          scroll-behavior: smooth;
          background-color: #020910;
          color: #EEF3F6;
        }
        body {
          background-color: #020910;
          color: #EEF3F6;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }
        ::selection {
          background: rgba(104, 176, 198, 0.35);
          color: #FFFFFF;
        }
        :focus-visible {
          outline: 2px solid #8CD0E3 !important;
          outline-offset: 3px;
        }
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #020810;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(104, 176, 198, 0.3);
          border-radius: 3px;
        }
        @media (max-width: 980px) {
          .abyss-desktop-nav,
          .abyss-depth-gauge,
          .abyss-cmd-btn {
            display: none !important;
          }
          .abyss-mobile-btn {
            display: inline-flex !important;
          }
          .abyss-capabilities-grid,
          .abyss-project-grid,
          .abyss-contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .abyss-arch-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          section {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
        .abyss-section-contain {
          contain: layout style;
          content-visibility: auto;
          contain-intrinsic-size: 1px 1400px;
        }
      `}</style>

      <OceanicCanvas
        scrollProgress={scrollProgress}
        reducedMotion={reducedMotion}
        introProgress={introProgress}
      />

      {!reducedMotion && (
        <OceanParticles scrollProgress={scrollProgress} />
      )}

      <ExpeditionNavigation
        activeZone={activeZone}
        scrollProgress={scrollProgress}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <main style={{ position: "relative", zIndex: 2 }}>
        <SurfaceZone
          introComplete={introComplete}
          onSkipIntro={handleSkipIntro}
        />
        <OpenOceanCapabilities />
        <ResearchVesselProjects />
        <CredentialsArchive onSelectCertificate={setSelectedCertificate} />
        <AbyssTrajectoryZone />
        <LighthouseZone />
      </main>

      <CertificateDossierModal
        cert={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
      <ExpeditionPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />
    </>
  )}