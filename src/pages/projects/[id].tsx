import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ROLE_META, PROJECTS, Role, getRoleFromQuery } from '@/config/data'

type ProjectData = typeof PROJECTS[keyof typeof PROJECTS]

interface ProjectPageProps {
  project: ProjectData
}

function Section({ title, children, accent }: { title: string; children: React.ReactNode; accent: string }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{ width: 4, height: 20, borderRadius: 2, background: accent }} />
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>{title}</h2>
      </div>
      <div style={{ paddingLeft: 16 }}>{children}</div>
    </div>
  )
}

function Pipeline({ steps, accent }: { steps: string[]; accent: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, overflowX: "auto", padding: "16px 0", flexWrap: "wrap" }}>
      {steps.map((step, idx) => (
        <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div 
            style={{ 
              padding: "10px 16px", 
              borderRadius: 10, 
              background: `${accent}15`, 
              border: `1px solid ${accent}40`, 
              fontSize: 12, 
              fontWeight: 500, 
              color: "#fff", 
              whiteSpace: "nowrap" 
            }}
          >
            {step}
          </div>
          {idx < steps.length - 1 && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" style={{ flexShrink: 0 }}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}

export default function ProjectPage({ project }: ProjectPageProps) {
  const router = useRouter()
  const role = getRoleFromQuery(router.query.role)
  const accent = ROLE_META[role].accent

  if (!project) {
    return <div style={{ padding: 40, textAlign: "center" }}>Project not found</div>
  }

  const statusColors: Record<string, string> = { 
    Completed: "#22C55E", 
    "In Progress": "#F59E0B", 
    Experimental: "#EF4444" 
  }

  return (
    <div style={{ width: "100%", minHeight: "100vh", padding: 40, position: "relative" }}>
      <div 
        style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          width: "50%", 
          height: "40%", 
          background: `radial-gradient(ellipse at top left, ${accent}10 0%, transparent 60%)`, 
          pointerEvents: "none" 
        }} 
      />

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
          <Link href={`/pipeline?role=${role}`} style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Pipeline</Link>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>/</span>
          <Link href={`/projects?role=${role}`} style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Projects</Link>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>/</span>
          <span style={{ fontSize: 12, color: accent }}>{project.title}</span>
        </div>

        {/* Header */}
        <header style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            <span 
              style={{ 
                padding: "4px 10px", 
                borderRadius: 999, 
                background: `${statusColors[project.status]}20`, 
                color: statusColors[project.status], 
                fontSize: 11, 
                fontWeight: 600 
              }}
            >
              {project.status}
            </span>
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                style={{ 
                  padding: "4px 10px", 
                  borderRadius: 999, 
                  background: `${accent}15`, 
                  color: accent, 
                  fontSize: 11, 
                  fontWeight: 600 
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: -0.5, margin: 0, marginBottom: 12, lineHeight: 1.2 }}>{project.title}</h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.5 }}>{project.subtitle}</p>
        </header>

        <Section title="Abstract" accent={accent}>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: 0 }}>{project.abstract}</p>
        </Section>

        <Section title="Pipeline Architecture" accent={accent}>
          <Pipeline steps={project.pipelineSteps} accent={accent} />
        </Section>

        <Section title="Biological Question" accent={accent}>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: 0 }}>{project.biologicalQuestion}</p>
        </Section>

        <Section title="Methodology" accent={accent}>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: 0 }}>{project.methodology}</p>
        </Section>

        <Section title="Key Results" accent={accent}>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: 0 }}>{project.keyResults}</p>
        </Section>

        <Section title="Technology Stack" accent={accent}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {project.technologies.map((tech) => (
              <span 
                key={tech} 
                style={{ 
                  padding: "6px 12px", 
                  borderRadius: 8, 
                  background: "rgba(255,255,255,0.05)", 
                  border: "1px solid rgba(255,255,255,0.1)", 
                  fontSize: 12, 
                  color: "rgba(255,255,255,0.7)" 
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </Section>

        {project.githubUrl && (
          <Section title="Links" accent={accent}>
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 16px",
                borderRadius: 8,
                background: `${accent}15`,
                border: `1px solid ${accent}30`,
                color: accent,
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              <span>💻</span>
              View on GitHub
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </Section>
        )}

        {/* Navigation */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between" }}>
          <Link 
            href={`/projects?role=${role}`} 
            style={{ fontSize: 13, color: accent, display: "flex", alignItems: "center", gap: 8 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All Projects
          </Link>
          <Link 
            href={`/pipeline?role=${role}`} 
            style={{ fontSize: 13, color: accent, display: "flex", alignItems: "center", gap: 8 }}
          >
            Back to Pipeline
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(PROJECTS).map((id) => ({
    params: { id },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = PROJECTS[params?.id as keyof typeof PROJECTS]

  return {
    props: {
      project: project || null,
    },
  }
}
