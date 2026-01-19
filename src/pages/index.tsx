import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

// ════════════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════════════

const PERSONAL = {
  name: "Rishabh Tripathi",
  title: "M.S. Bioinformatics",
  university: "Northeastern University",
  location: "Boston, MA",
  email: "tripathirishabh91@gmail.com",
  github: "Rishabh239",
  linkedin: "rishabh-tripathi-07a23a198",
  phone: "+1 617-217-8673",
  tagline: "Building production-grade bioinformatics pipelines and ML tools for translational research",
}

const PILLARS = [
  {
    icon: "🧬",
    title: "NGS Analysis",
    description: "RNA-seq, scRNA-seq, spatial transcriptomics, small RNA-seq pipelines with rigorous QC",
  },
  {
    icon: "🤖",
    title: "Machine Learning",
    description: "Interpretable models for drug response prediction with SHAP explanations and pathway analysis",
  },
  {
    icon: "⚙️",
    title: "Pipeline Engineering",
    description: "Nextflow, Docker, AWS — reproducible, scalable workflows with CI/CD",
  },
]

const PROJECTS = [
  {
    id: "spatial",
    title: "Spatial Transcriptomics Atlas",
    subtitle: "Cell-type mapping at 8µm resolution",
    description: "End-to-end pipeline integrating Visium HD spatial RNA-seq with scRNA-seq references. Performs cell-type deconvolution, spatial domain detection via Leiden clustering, and generates interactive dashboards.",
    tags: ["Visium HD", "Cell2location", "Scanpy", "Streamlit"],
    image: "/images/spatial-domains.png",
    image2: "/images/domain-heatmap.png",
    github: "https://github.com/Rishabh239/SC_Spatial_Atlas_Builder",
    highlights: ["10 spatial domains identified", "Per-bin cell-type abundance maps", "Interactive visualization dashboard"],
  },
  {
    id: "scrna",
    title: "scRNA-seq Analysis Pipeline",
    subtitle: "4,000+ cells processed in 8 minutes",
    description: "Comprehensive single-cell pipeline with QC, normalization, clustering, differential expression, and ML-based cell type classification using Random Forest, SVM, and neural networks with SMOTE balancing.",
    tags: ["Scanpy", "TensorFlow", "scikit-learn", "GSEApy"],
    image: "/images/umap-celltype.png",
    image2: "/images/qc-violins.png",
    github: "https://github.com/Rishabh239/scrna-analysis-pipeline",
    highlights: ["Modular CLI workflow", "GO/KEGG pathway enrichment", "Cross-cluster marker heatmaps"],
  },
  {
    id: "smallrna",
    title: "Small RNA-seq Pipeline",
    subtitle: "30% faster with parallelized alignment",
    description: "Containerized miRNA/isomiR quantification modeled after miRge3.0. Features UMI-aware deduplication, parallelized alignment, and interactive HTML reports with R Shiny dashboards.",
    tags: ["Docker", "AWS Batch", "R Shiny", "miRge3.0"],
    image: "/images/mirna-abundance.png",
    image2: "/images/isomir-heatmap.png",
    github: "",
    highlights: ["UMI deduplication", "Cloud-native on AWS S3/Batch", "Interactive QC dashboards"],
  },
]

const EXPERIENCES = [
  {
    role: "Bioinformatics Co-op",
    company: "Camp4 Therapeutics",
    location: "Boston, MA",
    period: "Jul 2025 – Dec 2025",
    description: "Production NGS pipelines with Nextflow on AWS EC2. Built R Shiny apps for target discovery and ASO screening.",
    technologies: ["Nextflow", "AWS EC2", "R Shiny", "RNA-seq", "ChIP-seq"],
    color: "#6366F1",
  },
  {
    role: "RNA Pipeline Developer",
    company: "Northeastern University",
    location: "Boston, MA",
    period: "Jan 2024 – May 2024",
    description: "Designed small RNA-seq pipeline with UMI deduplication, achieving 30% runtime reduction through parallelization.",
    technologies: ["Python", "Docker", "AWS Batch", "GitHub Actions"],
    color: "#22C55E",
  },
  {
    role: "Molecular Docking Intern",
    company: "Ciencia Life Sciences",
    location: "Hyderabad, India",
    period: "Nov 2022 – Mar 2023",
    description: "Virtual screening of ~10,000 compounds targeting TMPRSS4 using AutoDock Vina with ADME filtering.",
    technologies: ["AutoDock Vina", "UCSF Chimera", "SwissADME"],
    color: "#F59E0B",
  },
]

const SKILLS = {
  "Languages": ["Python", "R", "SQL", "Bash", "JavaScript"],
  "Bioinformatics": ["Scanpy", "Seurat", "Cell2location", "DESeq2", "AnnData"],
  "ML & Stats": ["scikit-learn", "TensorFlow", "XGBoost", "SHAP", "PyTorch"],
  "Engineering": ["Nextflow", "Docker", "AWS", "Git", "CI/CD"],
  "Visualization": ["Plotly", "R Shiny", "Streamlit", "Matplotlib", "ggplot2"],
}

// ════════════════════════════════════════════════════════════════
// COMPONENTS
// ════════════════════════════════════════════════════════════════

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => setScrolled(window.scrollY > 50))
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: scrolled ? "rgba(5,5,5,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <a href="#" style={{ fontWeight: 700, fontSize: 18 }}>RT</a>
      <div style={{ display: "flex", gap: 32 }}>
        {["Projects", "Experience", "Skills", "Contact"].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`}
            style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", transition: "color 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
            onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
          >
            {item}
          </a>
        ))}
      </div>
    </motion.nav>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "120px 24px 80px",
      }}
    >
      {/* Background gradient */}
      <div style={{
        position: "absolute",
        top: "0%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "150%",
        height: "100%",
        background: "radial-gradient(ellipse at center top, rgba(99,102,241,0.15) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      <motion.div style={{ y, opacity, position: "relative", zIndex: 1, textAlign: "center", maxWidth: 900 }}>
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            overflow: "hidden",
            margin: "0 auto 32px",
            border: "3px solid rgba(99,102,241,0.5)",
            boxShadow: "0 0 60px rgba(99,102,241,0.3)",
          }}
        >
          <img 
            src="/images/profile.jpg" 
            alt="Rishabh Tripathi"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            fontSize: "clamp(40px, 8vw, 72px)",
            fontWeight: 900,
            letterSpacing: -2,
            margin: 0,
            marginBottom: 8,
            background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {PERSONAL.name}
        </motion.h1>

        {/* Title */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ marginBottom: 24 }}
        >
          <span style={{ 
            fontSize: 18, 
            fontWeight: 600, 
            color: "#6366F1",
          }}>
            {PERSONAL.title}
          </span>
          <span style={{ color: "rgba(255,255,255,0.4)", margin: "0 12px" }}>•</span>
          <span style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>{PERSONAL.university}</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.6)",
            maxWidth: 600,
            margin: "0 auto 40px",
            lineHeight: 1.6,
          }}
        >
          {PERSONAL.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
        >
          <a
            href={`mailto:${PERSONAL.email}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              borderRadius: 999,
              background: "#6366F1",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 10px 40px rgba(99,102,241,0.4)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            Get in Touch
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a
            href={`https://github.com/${PERSONAL.github}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)"
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)"
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, textAlign: "center" }}
        >
          <div style={{ marginBottom: 8 }}>scroll</div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

function WhatIDo() {
  return (
    <section style={{ paddingTop: 60 }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={{ 
          fontSize: 14, 
          fontWeight: 600, 
          color: "#6366F1", 
          textTransform: "uppercase", 
          letterSpacing: 2, 
          marginBottom: 16,
          textAlign: "center",
        }}>
          What I Do
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
          marginTop: 40,
        }}>
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, background: "rgba(255,255,255,0.04)" }}
              style={{
                padding: 32,
                borderRadius: 20,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 20 }}>{pillar.icon}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{pillar.title}</h3>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 48,
        alignItems: "center",
        marginBottom: 100,
      }}
    >
      {/* Images */}
      <div style={{ order: isEven ? 1 : 2 }}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <img 
            src={project.image} 
            alt={project.title}
            style={{ width: "100%", display: "block" }}
          />
        </motion.div>
        {project.image2 && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{
              borderRadius: 12,
              overflow: "hidden",
              marginTop: 16,
              boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <img 
              src={project.image2} 
              alt={`${project.title} detail`}
              style={{ width: "100%", display: "block" }}
            />
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div style={{ order: isEven ? 2 : 1 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                background: "rgba(99,102,241,0.15)",
                color: "#818CF8",
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h3 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, letterSpacing: -0.5 }}>{project.title}</h3>
        <p style={{ fontSize: 16, color: "#6366F1", fontWeight: 500, marginBottom: 16 }}>{project.subtitle}</p>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 24 }}>{project.description}</p>

        {/* Highlights */}
        <div style={{ marginBottom: 24 }}>
          {project.highlights.map((h) => (
            <div key={h} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E" }} />
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{h}</span>
            </div>
          ))}
        </div>

        {/* GitHub Link */}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 20px",
              borderRadius: 10,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 500,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)"
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            View on GitHub
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        )}
      </div>
    </motion.div>
  )
}

function Projects() {
  return (
    <section id="projects">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={{ 
          fontSize: 14, 
          fontWeight: 600, 
          color: "#6366F1", 
          textTransform: "uppercase", 
          letterSpacing: 2, 
          marginBottom: 8 
        }}>
          Featured Work
        </h2>
        <p style={{ fontSize: 36, fontWeight: 800, marginBottom: 60, letterSpacing: -0.5 }}>
          Projects
        </p>
      </motion.div>

      {PROJECTS.map((project, idx) => (
        <ProjectCard key={project.id} project={project} index={idx} />
      ))}
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" style={{ background: "rgba(255,255,255,0.01)", marginLeft: -24, marginRight: -24, paddingLeft: 24, paddingRight: 24 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ 
            fontSize: 14, 
            fontWeight: 600, 
            color: "#6366F1", 
            textTransform: "uppercase", 
            letterSpacing: 2, 
            marginBottom: 8 
          }}>
            Career
          </h2>
          <p style={{ fontSize: 36, fontWeight: 800, marginBottom: 60, letterSpacing: -0.5 }}>
            Experience
          </p>
        </motion.div>

        <div style={{ position: "relative" }}>
          {/* Timeline line */}
          <div style={{
            position: "absolute",
            left: 20,
            top: 0,
            bottom: 0,
            width: 2,
            background: "linear-gradient(to bottom, rgba(99,102,241,0.5), rgba(99,102,241,0.1))",
          }} />

          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              style={{
                position: "relative",
                paddingLeft: 60,
                paddingBottom: 48,
              }}
            >
              {/* Dot */}
              <div style={{
                position: "absolute",
                left: 12,
                top: 4,
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: exp.color,
                border: "3px solid #050505",
              }} />

              <div style={{ 
                padding: 28, 
                borderRadius: 16, 
                background: "rgba(255,255,255,0.02)", 
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{exp.role}</h3>
                    <p style={{ fontSize: 15, color: exp.color, fontWeight: 500 }}>{exp.company}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>{exp.period}</p>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{exp.location}</p>
                  </div>
                </div>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: 16 }}>{exp.description}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        padding: "4px 10px",
                        borderRadius: 6,
                        background: "rgba(255,255,255,0.05)",
                        fontSize: 12,
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={{ 
          fontSize: 14, 
          fontWeight: 600, 
          color: "#6366F1", 
          textTransform: "uppercase", 
          letterSpacing: 2, 
          marginBottom: 8 
        }}>
          Technical
        </h2>
        <p style={{ fontSize: 36, fontWeight: 800, marginBottom: 60, letterSpacing: -0.5 }}>
          Skills
        </p>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
        {Object.entries(SKILLS).map(([category, skills], idx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            style={{
              padding: 24,
              borderRadius: 16,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#6366F1", marginBottom: 16 }}>{category}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.75)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" style={{ textAlign: "center", paddingBottom: 80 }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={{ 
          fontSize: 14, 
          fontWeight: 600, 
          color: "#6366F1", 
          textTransform: "uppercase", 
          letterSpacing: 2, 
          marginBottom: 8 
        }}>
          Get in Touch
        </h2>
        <p style={{ fontSize: 36, fontWeight: 800, marginBottom: 24, letterSpacing: -0.5 }}>
          Let's Connect
        </p>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.6 }}>
          Seeking full-time roles in bioinformatics, computational biology, and ML for translational research.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
          <a
            href={`mailto:${PERSONAL.email}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 24px",
              borderRadius: 12,
              background: "#6366F1",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            📧 {PERSONAL.email}
          </a>
          <a
            href={`https://linkedin.com/in/${PERSONAL.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 24px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            💼 LinkedIn
          </a>
          <a
            href={`https://github.com/${PERSONAL.github}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 24px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            💻 GitHub
          </a>
        </div>

        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
          📍 {PERSONAL.location}
        </p>
      </motion.div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{
      padding: "24px",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      textAlign: "center",
    }}>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
        © 2026 Rishabh Tripathi
      </p>
    </footer>
  )
}

// ════════════════════════════════════════════════════════════════
// MAIN PAGE
// ════════════════════════════════════════════════════════════════

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatIDo />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
