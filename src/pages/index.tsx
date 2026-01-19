import { motion } from 'framer-motion'
import Link from 'next/link'
import { PERSONAL, ROLE_META, Role } from '@/config/data'

const ROLE_ORDER: Role[] = ["bio", "ml", "compbio", "eng"]

function RoleCard({ role, index }: { role: Role; index: number }) {
  const config = ROLE_META[role]

  return (
    <Link href={`/pipeline?role=${role}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
        whileHover={{ 
          y: -6, 
          scale: 1.02,
          boxShadow: `0 24px 64px ${config.accent}20`,
          borderColor: config.accent,
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 28,
          borderRadius: 20,
          background: "rgba(255,255,255,0.03)",
          border: "1.5px solid rgba(255,255,255,0.1)",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          height: "100%",
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 16 }}>{config.icon}</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{config.label}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.5, marginBottom: 16, flex: 1 }}>
          {config.tagline}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {config.keywords.map((kw) => (
            <span
              key={kw}
              style={{
                padding: "4px 10px",
                borderRadius: 999,
                background: `${config.accent}15`,
                color: config.accent,
                fontSize: 10,
                fontWeight: 500,
              }}
            >
              {kw}
            </span>
          ))}
        </div>
      </motion.div>
    </Link>
  )
}

export default function Home() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background effects */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "20%",
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, width: "100%" }}>
        {/* Name badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            marginBottom: 24,
          }}
        >
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{PERSONAL.name}</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>• {PERSONAL.title}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 800,
            letterSpacing: -1,
            margin: 0,
            marginBottom: 12,
            lineHeight: 1.1,
            maxWidth: 700,
          }}
        >
          How are you evaluating me?
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.6)",
            margin: 0,
            marginBottom: 48,
            maxWidth: 600,
            lineHeight: 1.5,
          }}
        >
          Choose your lens — the same pipeline, projects, and artifacts, framed for what matters most to your role.
        </motion.p>

        {/* Role cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {ROLE_ORDER.map((role, idx) => (
            <RoleCard key={role} role={role} index={idx} />
          ))}
        </div>

        {/* Skip link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{ marginTop: 40, textAlign: "center" }}
        >
          <Link
            href="/projects?role=bio"
            style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}
          >
            or skip to <span style={{ textDecoration: "underline" }}>all projects</span> →
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
