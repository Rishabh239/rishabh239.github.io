import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ROLE_META, STAGES, PROJECTS, Role, getRoleFromQuery } from '@/config/data'

// Stage-specific content for each role
const STAGE_CONTENT: Record<string, Record<Role, { headline: string; description: string; skills: string[] }>> = {
  "raw-data": {
    bio: {
      headline: "Ingest & Understand Experimental Context",
      description: "This stage covers reliable data ingestion from various sequencing platforms, metadata validation, and establishing reproducible data pipelines. My projects demonstrate handling of 10x Genomics, Visium HD, and small RNA-seq data formats.",
      skills: ["10x Genomics", "Visium HD", "FASTQ Processing", "Metadata Validation", "AnnData"],
    },
    ml: {
      headline: "Define Targets, Splits & Leakage Boundaries",
      description: "Proper ML starts with rigorous problem framing. This stage covers train/val/test splitting strategies, confound identification, and ensuring no information leaks from test data.",
      skills: ["Problem Framing", "Data Splitting", "Confound Analysis", "Target Definition", "Stratification"],
    },
    compbio: {
      headline: "Multi-Modal Biological Inputs",
      description: "Handle diverse data types including spatial transcriptomics, scRNA-seq references, and multi-omics data while understanding experimental design context.",
      skills: ["Spatial Data", "scRNA-seq", "Multi-omics", "Data Harmonization", "Experimental Design"],
    },
    eng: {
      headline: "Reliable Ingestion at Scale",
      description: "Build robust data ingestion pipelines with proper S3 organization, schema validation, and idempotent processing for production genomics workflows.",
      skills: ["S3 Organization", "Schema Validation", "Idempotent Processing", "AWS", "Data Versioning"],
    },
  },
  qc: {
    bio: {
      headline: "Ensure Data Integrity with QC Artifacts",
      description: "Quality control is critical for biological validity. I implement comprehensive QC pipelines measuring UMI depth, gene complexity, mitochondrial content, and generate interactive HTML reports.",
      skills: ["UMI Deduplication", "MT% Filtering", "QC Dashboards", "Scanpy QC", "MultiQC"],
    },
    ml: {
      headline: "Quality Gates Before Training",
      description: "Validate data quality and identify potential issues like batch effects before model training. This prevents learning spurious correlations and ensures model robustness.",
      skills: ["Distribution Checks", "Batch Effects", "Outlier Detection", "Missing Data", "Sanity Plots"],
    },
    compbio: {
      headline: "QC as Biology Preservation",
      description: "Design QC filters that preserve biological signal while removing technical noise. Balance stringency with the need to retain rare cell populations.",
      skills: ["Signal vs Noise", "Filtering Rationale", "Rare Populations", "Technical Artifacts", "Comparability"],
    },
    eng: {
      headline: "Automated QC & Reporting",
      description: "Containerize QC steps for reproducibility, generate HTML artifacts automatically, and enable fast reruns with cached intermediate results.",
      skills: ["Docker", "Automated QC", "HTML Artifacts", "Caching", "CI/CD"],
    },
  },
  features: {
    bio: {
      headline: "Biologically Meaningful Representations",
      description: "Transform raw counts into normalized, analysis-ready matrices. This includes cell-type summaries, domain annotations, and standardized artifact generation.",
      skills: ["Normalization", "HVG Selection", "Cell2location", "Batch Correction", "Feature Extraction"],
    },
    ml: {
      headline: "Feature Engineering & Selection",
      description: "Engineer meaningful features from gene expression data, apply regularization, and validate feature stability across different data splits.",
      skills: ["Gene Embeddings", "PCA", "Feature Selection", "Regularization", "Stability Analysis"],
    },
    compbio: {
      headline: "Integrate & Map Biology in Context",
      description: "Perform deconvolution and label transfer to map cell types onto spatial domains, enabling biological interpretation of tissue organization.",
      skills: ["Cell2location", "Label Transfer", "Spatial Smoothing", "Deconvolution", "Domain Detection"],
    },
    eng: {
      headline: "Standardized Outputs for Downstream",
      description: "Produce consistent output formats (AnnData, Parquet) with config-driven runs and well-organized folder structures for downstream analysis.",
      skills: ["AnnData", "Parquet", "Config Management", "Folder Structure", "Output Standardization"],
    },
  },
  modeling: {
    bio: {
      headline: "Statistics & Predictive Models",
      description: "Apply statistical methods and machine learning for differential expression, clustering, and cell type classification while maintaining biological interpretability.",
      skills: ["Differential Expression", "Leiden Clustering", "Wilcoxon Tests", "Cross-validation", "SMOTE"],
    },
    ml: {
      headline: "Train with Disciplined Evaluation",
      description: "Train multiple model architectures with nested cross-validation, proper hyperparameter tuning, and subgroup error analysis to understand model behavior.",
      skills: ["Elastic Net", "XGBoost", "Neural Networks", "Cross-validation", "Hyperparameter Tuning"],
    },
    compbio: {
      headline: "Analyses Supporting Hypotheses",
      description: "Apply clustering, differential expression, and statistical tests to identify spatial domains, cell populations, and marker genes.",
      skills: ["Spatial Clustering", "Non-parametric DE", "Marker Selection", "Domain Analysis", "Hypothesis Testing"],
    },
    eng: {
      headline: "Production-Minded Training",
      description: "Build reproducible training pipelines with versioned data and models, deterministic evaluation, and proper experiment tracking.",
      skills: ["Reproducible Training", "Model Versioning", "Experiment Tracking", "Deterministic Eval", "MLflow"],
    },
  },
  interpretation: {
    bio: {
      headline: "Explain Biology, Not Just Numbers",
      description: "Connect statistical findings to biological meaning through pathway analysis, marker gene identification, and mechanistic narratives.",
      skills: ["GO/KEGG Enrichment", "Marker Genes", "Pathway Analysis", "Domain Annotation", "GSEApy"],
    },
    ml: {
      headline: "Turn Predictions into Mechanisms",
      description: "Use interpretability methods like SHAP to explain predictions, aggregate importance to pathways, and validate consistency across related conditions.",
      skills: ["SHAP", "Feature Importance", "Pathway Aggregation", "Consistency Analysis", "Error Analysis"],
    },
    compbio: {
      headline: "From Patterns to Biological Meaning",
      description: "Interpret computational findings in biological terms, identifying cell type enrichment, pathway activation, and generating testable hypotheses.",
      skills: ["Domain Markers", "Cell Type Enrichment", "Pathway Analysis", "Mechanistic Hypotheses", "Literature Integration"],
    },
    eng: {
      headline: "Explainability as Artifacts",
      description: "Package interpretability outputs (SHAP plots, importance scores) as build artifacts and create dashboards for stakeholders.",
      skills: ["SHAP Exports", "Plot Artifacts", "Dashboards", "Stakeholder Reports", "Artifact Management"],
    },
  },
  decision: {
    bio: {
      headline: "Deliver Actionable Conclusions",
      description: "Produce publication-ready outputs including interactive visualizations, reproducible reports, and clear documentation of methods and limitations.",
      skills: ["Plotly Dashboards", "Streamlit Apps", "R Shiny", "HTML Reports", "Documentation"],
    },
    ml: {
      headline: "Reviewable & Trustworthy Outputs",
      description: "Document models with model cards, characterize failure modes, and ensure reproducible training runs that stakeholders can trust.",
      skills: ["Model Cards", "Failure Modes", "Reproducibility", "Confidence Calibration", "Documentation"],
    },
    compbio: {
      headline: "Translate into Next Experiments",
      description: "Convert computational findings into actionable experimental plans, identifying validation targets, testable predictions, and limitations.",
      skills: ["Validation Targets", "Experimental Design", "Testable Predictions", "Limitations", "Follow-up Studies"],
    },
    eng: {
      headline: "Deployment-Ready Delivery",
      description: "Ensure projects are deployment-ready with comprehensive documentation, CI/CD checks, and one-command reproducibility.",
      skills: ["Documentation", "CI/CD", "One-command Runs", "READMEs", "Deployment"],
    },
  },
}

const STAGE_PROJECTS: Record<string, string[]> = {
  "raw-data": ["spatial-atlas", "scrna-classification", "small-rna-pipeline"],
  qc: ["small-rna-pipeline", "spatial-atlas", "scrna-classification"],
  features: ["spatial-atlas", "scrna-classification", "drug-response"],
  modeling: ["drug-response", "scrna-classification", "spatial-atlas"],
  interpretation: ["drug-response", "spatial-atlas", "scrna-classification"],
  decision: ["camp4-workflows", "spatial-atlas", "drug-response"],
}

interface StagePageProps {
  stageSlug: string
  stageInfo: typeof STAGES[0]
  stageIndex: number
}

export default function StagePage({ stageSlug, stageInfo, stageIndex }: StagePageProps) {
  const router = useRouter()
  const role = getRoleFromQuery(router.query.role)
  const { accent, label } = ROLE_META[role]
  const content = STAGE_CONTENT[stageSlug]?.[role]
  const projects = STAGE_PROJECTS[stageSlug] || []

  const prevStage = STAGES[stageIndex - 1]
  const nextStage = STAGES[stageIndex + 1]

  if (!content) {
    return <div style={{ padding: 40 }}>Stage not found</div>
  }

  return (
    <div style={{ width: "100%", minHeight: "100vh", padding: 32, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "50%", height: "70%", background: `radial-gradient(ellipse, ${accent}10 0%, transparent 60%)`, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          <Link href={`/pipeline?role=${role}`} style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Pipeline</Link>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>/</span>
          <span style={{ fontSize: 12, color: accent }}>{stageInfo.title}</span>
        </div>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 24 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: `${accent}15`, border: `1px solid ${accent}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, flexShrink: 0 }}>{stageInfo.icon}</div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <span style={{ padding: "4px 10px", borderRadius: 999, background: `${accent}20`, color: accent, fontSize: 11, fontWeight: 600 }}>Step {stageIndex + 1} of 6</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Viewing as {label}</span>
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>{stageInfo.title}</h1>
          </div>
        </div>

        {/* Role switcher */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {(["bio", "ml", "compbio", "eng"] as Role[]).map((r) => (
            <Link key={r} href={`/stages/${stageSlug}?role=${r}`}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 12px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 500,
                  color: r === role ? "#fff" : "rgba(255,255,255,0.6)",
                  background: r === role ? `${ROLE_META[r].accent}20` : "transparent",
                  border: `1px solid ${r === role ? ROLE_META[r].accent : "rgba(255,255,255,0.1)"}`,
                  cursor: "pointer",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: ROLE_META[r].accent }} />
                {ROLE_META[r].label}
              </div>
            </Link>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: 20, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, marginBottom: 12, color: accent }}>{content.headline}</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0 }}>{content.description}</p>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>Skills Demonstrated</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {content.skills.map((skill) => (
              <span key={skill} style={{ padding: "6px 12px", borderRadius: 8, background: `${accent}15`, border: `1px solid ${accent}30`, fontSize: 12, color: accent, fontWeight: 500 }}>{skill}</span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>Projects Demonstrating This Stage</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {projects.map((projId) => {
              const project = PROJECTS[projId as keyof typeof PROJECTS]
              if (!project) return null
              return (
                <Link key={projId} href={`/projects/${projId}?role=${role}`}>
                  <span style={{ padding: "8px 14px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 12, color: "rgba(255,255,255,0.7)", cursor: "pointer" }}>{project.title} →</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {prevStage ? (
            <Link href={`/stages/${prevStage.slug}?role=${role}`} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: accent }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              {prevStage.title}
            </Link>
          ) : <div />}
          {nextStage ? (
            <Link href={`/stages/${nextStage.slug}?role=${role}`} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: accent }}>
              {nextStage.title}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = STAGES.map((stage) => ({
    params: { slug: stage.slug },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const stageIndex = STAGES.findIndex((s) => s.slug === slug)
  const stageInfo = STAGES[stageIndex]

  return {
    props: {
      stageSlug: slug,
      stageInfo: stageInfo || null,
      stageIndex,
    },
  }
}
