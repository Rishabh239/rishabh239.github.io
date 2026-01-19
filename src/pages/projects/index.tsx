import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ROLE_META, PROJECTS, Role, getRoleFromQuery } from '@/config/data'

const PROJECT_LIST = Object.values(PROJECTS)

export default function Projects() {
  const router = useRouter()
  const role = getRoleFromQuery(router.query.role)
  const accent = ROLE_META[role].accent

  return (
    <div style={{ width: "100%", minHeight: "100vh", padding: 40 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          <Link href={`/pipeline?role=${role}`} style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Pipeline</Link>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>/</span>
          <span style={{ fontSize: 12, color: accent }}>All Projects</span>
        </div>

        {/* Header */}
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: 0, marginBottom: 12, letterSpacing: -0.5 }}>Projects</h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", margin: 0, marginBottom: 40 }}>
          Each project page is structured like a mini paper: question → method → results → artifacts.
        </p>

        {/* Projects */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {PROJECT_LIST.map((project, idx) => (
            <Link key={project.id} href={`/projects/${project.id}?role=${role}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{
                  y: -2,
                  background: "rgba(255,255,255,0.05)",
                  borderColor: `${accent}50`,
                }}
                style={{
                  padding: 24,
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                      <span 
                        style={{ 
                          padding: "4px 10px", 
                          borderRadius: 999, 
                          background: project.status === "Completed" ? "rgba(34,197,94,0.2)" : "rgba(245,158,11,0.2)",
                          color: project.status === "Completed" ? "#22C55E" : "#F59E0B",
                          fontSize: 10, 
                          fontWeight: 600 
                        }}
                      >
                        {project.status}
                      </span>
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0, marginBottom: 6 }}>{project.title}</h3>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: 0, marginBottom: 12, lineHeight: 1.5 }}>{project.subtitle}</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {project.tags.map((tag) => (
                        <span key={tag} style={{ padding: "4px 10px", borderRadius: 999, background: `${accent}15`, color: accent, fontSize: 11, fontWeight: 500 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ color: accent, marginLeft: 16 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
