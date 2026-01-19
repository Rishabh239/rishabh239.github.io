import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { PERSONAL, ROLE_META, EXPERIENCES, SKILL_CATEGORIES, STATS, Role, getRoleFromQuery } from '@/config/data'

// Stats Section
function StatsSection({ accent }: { accent: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginBottom: 48 }}>
      {STATS.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          style={{ 
            padding: 24, 
            borderRadius: 16, 
            background: `linear-gradient(135deg, ${accent}08 0%, transparent 100%)`, 
            border: `1px solid ${accent}20`, 
            textAlign: "center" 
          }}
        >
          <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: accent, letterSpacing: -1, marginBottom: 4 }}>{stat.value}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

// Experience Section
function ExperienceSection({ accent }: { accent: string }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const typeColors: Record<string, string> = {
    "Co-op": "#3B82F6",
    "Research": "#A855F7",
    "Internship": "#22C55E",
    "Full-time": "#F59E0B",
  }

  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Experience</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {EXPERIENCES.map((exp) => (
          <motion.div
            key={exp.id}
            layout
            style={{
              background: expandedId === exp.id ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${expandedId === exp.id ? accent + "40" : "rgba(255,255,255,0.08)"}`,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <div 
              style={{ padding: 24, cursor: "pointer" }}
              onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <span 
                      style={{ 
                        padding: "4px 10px", 
                        borderRadius: 999, 
                        background: `${typeColors[exp.type]}20`, 
                        color: typeColors[exp.type], 
                        fontSize: 10, 
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      {exp.type}
                    </span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{exp.period}</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, marginBottom: 4 }}>{exp.role}</h3>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{exp.company} • {exp.location}</div>
                </div>
                <motion.div
                  animate={{ rotate: expandedId === exp.id ? 180 : 0 }}
                  style={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: 8, 
                    background: "rgba(255,255,255,0.05)", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </motion.div>
              </div>
            </div>

            {expandedId === exp.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ padding: "0 24px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginTop: 20, marginBottom: 20 }}>{exp.summary}</p>
                
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 12 }}>Key Contributions</div>
                  {exp.highlights.map((h, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent, marginTop: 6, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>{h}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 12 }}>Technologies</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {exp.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        style={{ 
                          padding: "5px 10px", 
                          borderRadius: 6, 
                          background: "rgba(255,255,255,0.05)", 
                          border: "1px solid rgba(255,255,255,0.08)", 
                          fontSize: 11, 
                          color: "rgba(255,255,255,0.65)" 
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Skills Section
function SkillsSection({ accent }: { accent: string }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Skills</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {SKILL_CATEGORIES.map((category, idx) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            style={{ 
              padding: 20, 
              borderRadius: 14, 
              background: "rgba(255,255,255,0.03)", 
              border: "1px solid rgba(255,255,255,0.08)" 
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 22 }}>{category.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{category.name}</span>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {category.skills.map((skill) => (
                <span 
                  key={skill} 
                  style={{ 
                    padding: "4px 10px", 
                    borderRadius: 6, 
                    background: `${accent}12`, 
                    border: `1px solid ${accent}25`, 
                    fontSize: 11, 
                    color: "rgba(255,255,255,0.75)" 
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Contact Section
function ContactSection({ accent }: { accent: string }) {
  const links = [
    { icon: "📧", label: "Email", value: PERSONAL.email, href: `mailto:${PERSONAL.email}` },
    { icon: "💻", label: "GitHub", value: PERSONAL.github, href: `https://github.com/${PERSONAL.github}` },
    { icon: "💼", label: "LinkedIn", value: PERSONAL.linkedin, href: `https://linkedin.com/in/${PERSONAL.linkedin}` },
    { icon: "📍", label: "Location", value: PERSONAL.location, href: null },
  ]

  return (
    <div style={{ textAlign: "center", padding: "48px 0" }}>
      <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16 }}>Let's Connect</h2>
      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
        Seeking full-time roles in computational biology, bioinformatics, and machine learning for translational research.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, maxWidth: 600, margin: "0 auto 32px" }}>
        {links.map((link) => {
          const content = (
            <div 
              style={{ 
                padding: 20, 
                borderRadius: 12, 
                background: "rgba(255,255,255,0.03)", 
                border: "1px solid rgba(255,255,255,0.08)", 
                textAlign: "left", 
                display: "flex", 
                alignItems: "center", 
                gap: 14,
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 10, background: `${accent}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{link.icon}</div>
              <div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>{link.label}</div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{link.value}</div>
              </div>
            </div>
          )
          return link.href ? (
            <a key={link.label} href={link.href} target={link.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" style={{ color: "inherit" }}>
              {content}
            </a>
          ) : (
            <div key={link.label}>{content}</div>
          )
        })}
      </div>

      <motion.a
        href={`mailto:${PERSONAL.email}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ 
          display: "inline-flex", 
          alignItems: "center", 
          gap: 10, 
          padding: "14px 28px", 
          borderRadius: 999, 
          background: accent, 
          color: "#fff", 
          fontSize: 14, 
          fontWeight: 600,
        }}
      >
        Send me an email
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
      </motion.a>
    </div>
  )
}

export default function About() {
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
          <span style={{ fontSize: 12, color: accent }}>About</span>
        </div>

        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 999, background: `${accent}20`, marginBottom: 16 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: accent }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: accent, textTransform: "uppercase" }}>About Me</span>
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 800, margin: 0, marginBottom: 8 }}>{PERSONAL.name}</h1>
          <div style={{ fontSize: 18, color: accent, fontWeight: 600, marginBottom: 16 }}>{PERSONAL.title}</div>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: 0, maxWidth: 700 }}>{PERSONAL.bio}</p>
        </div>

        <StatsSection accent={accent} />
        <ExperienceSection accent={accent} />
        <SkillsSection accent={accent} />
        <ContactSection accent={accent} />
      </div>
    </div>
  )
}
