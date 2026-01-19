import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ROLE_META, STAGES, ROLE_STAGE_COPY, PROJECTS, ROLE_PROJECT_ORDER, Role, getRoleFromQuery } from '@/config/data'

function RolePill({ role, isActive, accent }: { role: Role; isActive: boolean; accent: string }) {
  const router = useRouter()
  
  return (
    <Link href={`/pipeline?role=${role}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 500,
          color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
          background: isActive ? `${accent}20` : "transparent",
          border: `1px solid ${isActive ? accent : "rgba(255,255,255,0.12)"}`,
          cursor: "pointer",
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: accent, opacity: isActive ? 1 : 0.5 }} />
        {ROLE_META[role].label}
      </motion.div>
    </Link>
  )
}

function StageCard({ 
  stage, 
  copy, 
  index, 
  role, 
  accent 
}: { 
  stage: typeof STAGES[0]
  copy: { subtitle: string; bullets: string[] }
  index: number
  role: Role
  accent: string 
}) {
  return (
    <Link href={`/stages/${stage.slug}?role=${role}`}>
      <motion.div
        whileHover={{ 
          y: -4,
          background: "rgba(255,255,255,0.06)",
          borderColor: `${accent}60`,
        }}
        style={{
          position: "relative",
          padding: "20px 16px",
          borderRadius: 16,
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          height: "100%",
        }}
      >
        <div 
          style={{ 
            position: "absolute", 
            top: -10, 
            right: 14, 
            width: 22, 
            height: 22, 
            borderRadius: "50%", 
            background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, 
            color: "#fff", 
            fontSize: 10, 
            fontWeight: 700, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
          }}
        >
          {index + 1}
        </div>
        <div style={{ fontSize: 26, marginBottom: 10 }}>{stage.icon}</div>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: "#fff" }}>{stage.title}</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginBottom: 12, lineHeight: 1.4 }}>{copy.subtitle}</div>
        <div style={{ flex: 1 }}>
          {copy.bullets.map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 10, color: "rgba(255,255,255,0.55)", marginBottom: 6 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent, opacity: 0.7, marginTop: 4, flexShrink: 0 }} />
              {b}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, fontSize: 11, fontWeight: 600, color: accent, display: "flex", alignItems: "center", gap: 4 }}>
          Explore
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </div>
      </motion.div>
    </Link>
  )
}

function ProjectCard({ projectId, role, accent }: { projectId: string; role: Role; accent: string }) {
  const project = PROJECTS[projectId as keyof typeof PROJECTS]
  if (!project) return null

  return (
    <Link href={`/projects/${project.id}?role=${role}`}>
      <motion.div
        whileHover={{
          y: -2,
          background: "rgba(255,255,255,0.05)",
          borderColor: `${accent}50`,
        }}
        style={{
          display: "block",
          padding: 20,
          borderRadius: 14,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
          cursor: "pointer",
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{project.title}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 12, lineHeight: 1.4 }}>{project.subtitle.slice(0, 80)}...</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} style={{ padding: "4px 10px", borderRadius: 999, background: `${accent}18`, color: accent, fontSize: 10, fontWeight: 500 }}>{tag}</span>
          ))}
        </div>
      </motion.div>
    </Link>
  )
}

export default function Pipeline() {
  const router = useRouter()
  const role = getRoleFromQuery(router.query.role)
  const { accent, label, tagline } = ROLE_META[role]

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: 28,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div 
        style={{ 
          position: "absolute", 
          top: "-30%", 
          left: "-15%", 
          width: "60%", 
          height: "80%", 
          background: `radial-gradient(ellipse, ${accent}12 0%, transparent 65%)`, 
          pointerEvents: "none",
        }} 
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 999, background: `${accent}20`, marginBottom: 16 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: accent }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: accent, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</span>
          </div>

          <h1 
            style={{ 
              fontSize: "clamp(24px, 4vw, 32px)", 
              fontWeight: 800, 
              letterSpacing: -0.5, 
              margin: 0, 
              marginBottom: 8,
              background: `linear-gradient(135deg, #fff 30%, ${accent} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Analysis Pipeline
          </h1>

          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: 0, marginBottom: 20 }}>{tagline}</p>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(["bio", "ml", "compbio", "eng"] as Role[]).map((r) => (
              <RolePill key={r} role={r} isActive={r === role} accent={ROLE_META[r].accent} />
            ))}
          </div>
        </div>

        {/* Pipeline */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Pipeline Stages</div>
          <div style={{ position: "relative" }}>
            <div 
              style={{ 
                position: "absolute", 
                top: "50%", 
                left: 0, 
                right: 0, 
                height: 2, 
                background: `linear-gradient(90deg, transparent 0%, ${accent}30 10%, ${accent}30 90%, transparent 100%)`, 
                zIndex: 0, 
                transform: "translateY(-50%)",
                display: "none",
              }} 
            />
            <div 
              style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", 
                gap: 12, 
                position: "relative", 
                zIndex: 1 
              }}
            >
              {STAGES.map((stage, idx) => (
                <StageCard 
                  key={stage.slug} 
                  stage={stage} 
                  copy={ROLE_STAGE_COPY[role][stage.slug]} 
                  index={idx} 
                  role={role} 
                  accent={accent} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Projects */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: 1 }}>Featured Projects</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Prioritized for {label}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
            {ROLE_PROJECT_ORDER[role].slice(0, 4).map((key) => (
              <ProjectCard key={key} projectId={key} role={role} accent={accent} />
            ))}
          </div>
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <Link href={`/projects?role=${role}`} style={{ fontSize: 12, color: accent, fontWeight: 500 }}>
              View all projects →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
