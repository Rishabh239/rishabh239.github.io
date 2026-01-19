// ═══════════════════════════════════════════════════════════════
// PORTFOLIO CONFIGURATION
// Edit this file to update your portfolio content
// ═══════════════════════════════════════════════════════════════

export type Role = "bio" | "ml" | "compbio" | "eng"

// ─────────────────────────────────────────────────────────────
// PERSONAL INFO
// ─────────────────────────────────────────────────────────────

export const PERSONAL = {
  name: "Rishabh Tripathi",
  title: "M.S. Bioinformatics | Northeastern University",
  email: "tripathirishabh91@gmail.com",
  github: "Rishabh239",
  linkedin: "rishabh-tripathi",
  location: "Boston, MA",
  phone: "+1 617-217-8673",
  bio: "Bioinformatics professional with a strong foundation in computational biology, genomics, and machine learning, focused on building end-to-end NGS analysis pipelines and decision-support tools for translational research. Experienced with RNA-seq, small RNA-seq, single-cell, spatial transcriptomics, and molecular docking.",
}

// ─────────────────────────────────────────────────────────────
// ROLE CONFIGURATION
// ─────────────────────────────────────────────────────────────

export const ROLE_META: Record<Role, {
  label: string
  accent: string
  tagline: string
  icon: string
  keywords: string[]
}> = {
  bio: {
    label: "Bioinformatics Scientist",
    accent: "#22C55E",
    tagline: "Biological rigor meets reproducible pipelines",
    icon: "🧬",
    keywords: ["RNA-seq", "QC Pipelines", "Scanpy", "AnnData"],
  },
  ml: {
    label: "Machine Learning Scientist",
    accent: "#A855F7",
    tagline: "Disciplined modeling with mechanistic interpretability",
    icon: "🤖",
    keywords: ["SHAP", "XGBoost", "Cross-validation", "Feature Engineering"],
  },
  compbio: {
    label: "Computational Biologist",
    accent: "#F59E0B",
    tagline: "Multi-modal integration toward biological insight",
    icon: "🧪",
    keywords: ["Spatial", "Deconvolution", "Cell Types", "Pathways"],
  },
  eng: {
    label: "Bioinformatics Engineer",
    accent: "#3B82F6",
    tagline: "Production-grade systems at scale",
    icon: "⚙️",
    keywords: ["Nextflow", "Docker", "AWS", "CI/CD"],
  },
}

// ─────────────────────────────────────────────────────────────
// PIPELINE STAGES
// ─────────────────────────────────────────────────────────────

export const STAGES = [
  { slug: "raw-data", title: "Raw Data", icon: "🧬" },
  { slug: "qc", title: "QC & Norm", icon: "🧪" },
  { slug: "features", title: "Features", icon: "🧠" },
  { slug: "modeling", title: "Modeling", icon: "🤖" },
  { slug: "interpretation", title: "Interpret", icon: "🔎" },
  { slug: "decision", title: "Decision", icon: "✅" },
]

export const ROLE_STAGE_COPY: Record<Role, Record<string, { subtitle: string; bullets: string[] }>> = {
  bio: {
    "raw-data": { subtitle: "Ingest & understand experimental context", bullets: ["Sequencing + spatial inputs", "Metadata sanity checks", "Reproducible I/O"] },
    qc: { subtitle: "Ensure data integrity with QC artifacts", bullets: ["UMI depth, gene complexity", "Mitochondrial filtering", "QC reports & dashboards"] },
    features: { subtitle: "Biologically meaningful representations", bullets: ["Counts → normalized matrices", "Domain/cell-type summaries", "AnnData / Parquet exports"] },
    modeling: { subtitle: "Statistics + predictive models", bullets: ["Differential expression", "Robust comparisons", "Leakage-safe evaluation"] },
    interpretation: { subtitle: "Explain biology, not just numbers", bullets: ["Marker genes + pathways", "Domain enrichment", "Mechanistic narratives"] },
    decision: { subtitle: "Deliver actionable conclusions", bullets: ["Publication-ready plots", "Reproducible exports", "Next steps + limitations"] },
  },
  ml: {
    "raw-data": { subtitle: "Define targets, splits, leakage boundaries", bullets: ["Problem framing", "Train/val/test strategy", "Confound analysis"] },
    qc: { subtitle: "Quality gates before training", bullets: ["Filtering + normalization", "Batch effect awareness", "Distribution sanity plots"] },
    features: { subtitle: "Feature engineering & selection", bullets: ["Gene embeddings", "Regularization choices", "Stability analysis"] },
    modeling: { subtitle: "Train with disciplined evaluation", bullets: ["Elastic Net / XGBoost", "Nested cross-validation", "Subgroup error analysis"] },
    interpretation: { subtitle: "Turn predictions into mechanisms", bullets: ["SHAP explanations", "Pathway aggregation", "Drug class consistency"] },
    decision: { subtitle: "Reviewable & trustworthy outputs", bullets: ["Model cards summary", "Failure mode docs", "Reproducible runs"] },
  },
  compbio: {
    "raw-data": { subtitle: "Multi-modal biological inputs", bullets: ["Spatial + scRNA references", "Experimental design context", "Harmonization needs"] },
    qc: { subtitle: "QC as biology preservation", bullets: ["Signal vs noise tradeoffs", "Filtering rationale", "Cross-sample comparability"] },
    features: { subtitle: "Integrate & map biology in context", bullets: ["Deconvolution / label transfer", "Spatial smoothing", "Domain-ready representations"] },
    modeling: { subtitle: "Analyses supporting hypotheses", bullets: ["Spatial clustering", "Non-parametric DE", "Robust marker selection"] },
    interpretation: { subtitle: "From patterns to biological meaning", bullets: ["Domain markers", "Cell-type enrichment", "Mechanistic hypotheses"] },
    decision: { subtitle: "Translate into next experiments", bullets: ["Validation targets", "Testable predictions", "Clear limitations"] },
  },
  eng: {
    "raw-data": { subtitle: "Reliable ingestion at scale", bullets: ["S3 organization", "Schema validation", "Idempotent processing"] },
    qc: { subtitle: "Automated QC + reporting", bullets: ["Containerized steps", "HTML QC artifacts", "Fast reruns"] },
    features: { subtitle: "Standardized outputs for downstream", bullets: ["AnnData / Parquet", "Config-driven runs", "Consistent folder structure"] },
    modeling: { subtitle: "Production-minded training", bullets: ["Reproducible training", "Versioned data/models", "Deterministic evaluation"] },
    interpretation: { subtitle: "Explainability as artifacts", bullets: ["SHAP exports", "Plot artifacts", "Stakeholder dashboards"] },
    decision: { subtitle: "Deployment-ready delivery", bullets: ["Documentation + READMEs", "CI/CD checks", "One-command reruns"] },
  },
}

// ─────────────────────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────────────────────

export const PROJECTS = {
  "spatial-atlas": {
    id: "spatial-atlas",
    title: "Cell-Type-Resolved Spatial Transcriptomics Atlas",
    subtitle: "End-to-end spatial transcriptomics atlas integrating Visium HD (8µm & 16µm) with scRNA-seq for cell-type deconvolution and domain analysis",
    status: "Completed" as const,
    tags: ["Visium HD", "Cell2location", "Spatial Domains", "scRNA-seq Integration"],
    technologies: ["Python", "Scanpy", "Cell2location", "Streamlit", "Plotly", "Pandas", "NumPy", "AnnData"],
    abstract: "Built an end-to-end spatial transcriptomics atlas by integrating Visium HD (8µm & 16µm) spatial RNA-seq data with single-cell RNA-seq references, performing cell-type deconvolution and label transfer to generate per-bin cell-type abundance maps across tissue sections.",
    biologicalQuestion: "How can we map cell type composition onto spatial tissue architecture to understand the organization of complex tissues like mouse brain cortex and hippocampus at high resolution?",
    methodology: "Five-stage pipeline: (1) Integrate Visium HD spatial RNA-seq with scRNA-seq references, (2) Perform cell-type deconvolution and label transfer for per-bin abundance maps, (3) Apply graph-based smoothing and Leiden clustering for spatial domain detection, (4) Identify domain-specific marker genes via non-parametric differential expression, (5) Generate standardized outputs and interactive dashboards.",
    keyResults: "Successfully generates per-bin cell-type abundance maps across tissue sections. Detects coherent spatial domains with domain-specific marker genes. Exports standardized AnnData/Parquet/CSV outputs, interactive dashboards, and per-sample QC HTML for reproducible atlas generation.",
    pipelineSteps: ["Visium HD Input", "scRNA-seq Integration", "Cell-type Deconvolution", "Spatial Domain Detection", "Marker Gene Analysis", "Dashboard Export"],
    githubUrl: "https://github.com/Rishabh239/SC_Spatial_Atlas_Builder",
  },
  "drug-response": {
    id: "drug-response",
    title: "Interpretable Drug Response Prediction",
    subtitle: "Leakage-safe ML pipeline predicting drug response from bulk RNA-seq with SHAP interpretability and pathway aggregation",
    status: "Completed" as const,
    tags: ["DepMap", "PRISM", "SHAP", "Elastic Net", "XGBoost"],
    technologies: ["Python", "scikit-learn", "XGBoost", "SHAP", "GSEApy", "Pandas", "NumPy", "Enrichr API"],
    abstract: "Built a leakage-safe ML pipeline to predict drug response from bulk RNA-seq gene expression (DepMap/CCLE) and PRISM primary screen data using Elastic Net and XGBoost. Applied SHAP-based interpretability and pathway aggregation to convert model predictions into mechanistic biological insights.",
    biologicalQuestion: "Can we predict cancer cell line sensitivity to drugs from transcriptomic profiles while maintaining biological interpretability? Do models trained on related drugs converge on the same mechanistic pathways?",
    methodology: "Built leakage-safe ML pipeline with strict cross-validation. Compare Elastic Net (L1/L2 regularization) and XGBoost (gradient boosting). Applied SHAP-based interpretability and pathway aggregation (GO/Reactome/KEGG via Enrichr) to convert predictions into mechanistic biological insights.",
    keyResults: "Demonstrated class-consistent biological explanations across four statins, identifying shared driver genes (SQLE, HMGCS1, GGPS1) and conserved cholesterol-related pathways. Key cholesterol and lipid metabolism drivers identified through pathway aggregation.",
    pipelineSteps: ["DepMap/CCLE Data", "Feature Engineering", "Elastic Net / XGBoost", "SHAP Attribution", "Pathway Aggregation", "Class Consistency"],
    githubUrl: "https://github.com/Rishabh239/depmap-drug-response",
  },
  "scrna-classification": {
    id: "scrna-classification",
    title: "Single-Cell RNA-Seq Analysis & Cell Type Classification",
    subtitle: "End-to-end scRNA-seq pipeline with ML-based cell type classification, pathway enrichment, and modular CLI workflows",
    status: "Completed" as const,
    tags: ["Scanpy", "TensorFlow", "scikit-learn", "GSEApy", "SMOTE"],
    technologies: ["Python", "Scanpy", "TensorFlow", "scikit-learn", "GSEApy", "SHAP", "Matplotlib", "Seaborn"],
    abstract: "Built a comprehensive scRNA-seq pipeline processing 10x Genomics PBMC data through QC, normalization, clustering and UMAP/t-SNE visualization. Engineered cell type classification using Random Forest, SVM, and TensorFlow with SMOTE balancing.",
    biologicalQuestion: "Can we automate cell type identification in scRNA-seq data using machine learning while maintaining biological interpretability through marker genes and pathway analysis?",
    methodology: "End-to-end pipeline: (1) Data loading from 10x format, (2) QC filtering on gene counts and MT%, (3) Normalization and HVG selection, (4) PCA/UMAP/t-SNE dimensionality reduction, (5) Leiden clustering, (6) Differential expression analysis, (7) GO/KEGG pathway enrichment with GSEApy, (8) ML classification with SMOTE for class balancing.",
    keyResults: "Optimized pipeline runtime to process 4,000+ cells through complete analysis workflow in 8 minutes on standard hardware. Cross-cluster enrichment heatmaps reveal distinct biological programs.",
    pipelineSteps: ["10x Data", "QC Filtering", "Normalization", "Clustering", "Differential Expression", "Pathway Enrichment", "ML Classification"],
    githubUrl: "https://github.com/Rishabh239/scrna-analysis-pipeline",
  },
  "small-rna-pipeline": {
    id: "small-rna-pipeline",
    title: "Small RNA-seq Pipeline",
    subtitle: "Containerized miRNA/isomiR quantification pipeline with UMI deduplication, cloud-native processing, and interactive QC dashboards",
    status: "Completed" as const,
    tags: ["miRge3.0", "Docker", "AWS", "R Shiny", "GitHub Actions"],
    technologies: ["Python", "Bash", "Docker", "GitHub Actions", "AWS S3", "AWS Batch", "R Shiny", "Highcharts", "Cutadapt"],
    abstract: "A containerized small RNA-seq analysis pipeline modeled after miRge3.0, providing comprehensive quantification of microRNAs and isomiRs with UMI-aware read collapsing, parallelized alignment, automated QC reporting, and interactive visualization dashboards.",
    biologicalQuestion: "How can we accurately quantify the full spectrum of small RNAs (miRNAs, isomiRs) while handling technical artifacts like PCR duplicates and providing actionable QC metrics with optimized computational performance?",
    methodology: "Containerized workflow with Docker: (1) Adapter trimming with Cutadapt, (2) UMI extraction and read collapsing for deduplication, (3) Parallelized alignment to specialized RNA libraries, (4) miRNA/isomiR quantification with mirGFF3 output, (5) Interactive HTML QC reports, (6) R Shiny + Highcharts dashboards for visualization.",
    keyResults: "Achieved 30% reduction in computational runtime through parallelized alignment optimization. Cloud-native deployment on AWS S3/Batch enables scalable processing.",
    pipelineSteps: ["FASTQ Input", "Adapter Trimming", "UMI Dedup", "Parallelized Alignment", "Quantification", "QC Report", "Shiny Dashboard"],
    githubUrl: "",
  },
  "camp4-workflows": {
    id: "camp4-workflows",
    title: "Camp4 Therapeutics: NGS Bioinformatics Workflows",
    subtitle: "Production-grade RNA-seq and ChIP-seq pipelines with Nextflow, AWS EC2, and interactive R Shiny analytics for target discovery",
    status: "Completed" as const,
    tags: ["Nextflow", "AWS EC2", "R Shiny", "RNA-seq", "ChIP-seq"],
    technologies: ["Python", "R", "Bash", "Nextflow", "AWS EC2", "R Shiny", "Highcharts", "RNA-seq", "ChIP-seq"],
    abstract: "Production-grade bioinformatics workflows developed during Co-op at Camp4 Therapeutics, featuring reproducible NGS pipelines on AWS EC2 for RNA-seq and ChIP-seq analysis, R Shiny web apps for exploratory analysis, and internal analytics tools for target discovery and ASO screening.",
    biologicalQuestion: "How can we build reliable, scalable genomics infrastructure that enables rapid iteration on therapeutic target discovery while maintaining reproducibility?",
    methodology: "Designed reproducible NGS bioinformatics workflows in R, Python, and Bash. Processed datasets with production-grade Nextflow NGS pipelines on AWS EC2. Built custom data processing, QC, and visualization scripts. Deployed R Shiny web apps for exploratory and summary-level analysis.",
    keyResults: "Built internal analytics and visualization tools for target discovery and ASO screening. Created interactive dashboards for EC50 dose-response analyses and sequence-alignment visualizations.",
    pipelineSteps: ["Data Input", "Nextflow Orchestration", "AWS EC2 Compute", "QC Processing", "R Shiny Analytics", "Target Discovery Tools"],
    githubUrl: "",
  },
}

export const ROLE_PROJECT_ORDER: Record<Role, string[]> = {
  bio: ["scrna-classification", "small-rna-pipeline", "camp4-workflows", "spatial-atlas", "drug-response"],
  ml: ["drug-response", "scrna-classification", "spatial-atlas", "small-rna-pipeline", "camp4-workflows"],
  compbio: ["spatial-atlas", "drug-response", "scrna-classification", "camp4-workflows", "small-rna-pipeline"],
  eng: ["camp4-workflows", "small-rna-pipeline", "spatial-atlas", "scrna-classification", "drug-response"],
}

// ─────────────────────────────────────────────────────────────
// EXPERIENCE
// ─────────────────────────────────────────────────────────────

export const EXPERIENCES = [
  {
    id: "camp4",
    role: "Bioinformatics Co-op",
    company: "Camp4 Therapeutics",
    location: "Boston, MA",
    period: "Jul 2025 – Dec 2025",
    type: "Co-op" as const,
    summary: "Designed and maintained reproducible NGS bioinformatics workflows in R, Python, and Bash, building custom data processing, QC, and visualization scripts and deploying R Shiny web apps.",
    highlights: [
      "Designed and maintained reproducible NGS bioinformatics workflows in R, Python, and Bash",
      "Deployed R Shiny web apps for exploratory and summary-level analysis",
      "Processed bulk RNA-seq and ChIP-seq datasets with production-grade Nextflow NGS pipelines on AWS EC2",
      "Built internal analytics and visualization tools for target discovery and ASO screening",
      "Created interactive dashboards for EC50 dose-response analyses",
    ],
    technologies: ["Python", "R", "Bash", "R Shiny", "Nextflow", "AWS EC2", "RNA-seq", "ChIP-seq"],
  },
  {
    id: "small-rna",
    role: "RNA Sequencing Pipeline Developer",
    company: "Northeastern University",
    location: "Boston, MA",
    period: "Jan 2024 – May 2024",
    type: "Research" as const,
    summary: "Designed and optimized a containerized small RNA-seq pipeline modeled after miRge3.0, integrating UMI-aware read collapsing, isomiR profiling, and parallelized alignment.",
    highlights: [
      "Designed containerized small RNA-seq pipeline with UMI-aware read collapsing and isomiR profiling",
      "Achieved 30% reduction in computational runtime through parallelized alignment",
      "Automated NGS data processing using Python, Bash, and Docker",
      "Built cloud-native workflows on AWS S3 and AWS Batch",
      "Created R Shiny + Highcharts applications for interactive visualization",
    ],
    technologies: ["Python", "Bash", "Docker", "GitHub Actions", "AWS S3", "AWS Batch", "R Shiny"],
  },
  {
    id: "molecular-docking",
    role: "Undergraduate Research Intern – Molecular Docking",
    company: "Ciencia Life Sciences",
    location: "Hyderabad, India",
    period: "Nov 2022 – Mar 2023",
    type: "Internship" as const,
    summary: "Performed structure-based virtual screening and molecular docking targeting TMPRSS4 (Homo sapiens) using AutoDock Vina and iGEMDOCK.",
    highlights: [
      "Performed structure-based virtual screening targeting TMPRSS4 using AutoDock Vina",
      "Curated ~10,000 compounds from ZINC and COCONUT databases",
      "Applied drug-likeness, ADME, and toxicity filtering via SwissADME",
      "Conducted ligand preparation, homology modeling, and structural validation",
      "Analyzed protein-ligand interactions using UCSF Chimera and BIOVIA Discovery Studio",
    ],
    technologies: ["AutoDock Vina", "iGEMDOCK", "UCSF Chimera", "BIOVIA Discovery Studio", "SwissADME"],
  },
]

// ─────────────────────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────────────────────

export const SKILL_CATEGORIES = [
  { name: "Languages & Frameworks", icon: "💻", skills: ["Python", "R", "SQL", "Bash", "JavaScript", "TypeScript"] },
  { name: "Bioinformatics", icon: "🧬", skills: ["Scanpy", "Seurat", "Cell2location", "DESeq2", "GSEApy", "AnnData"] },
  { name: "Machine Learning", icon: "🤖", skills: ["scikit-learn", "TensorFlow", "XGBoost", "SHAP", "PyTorch", "SMOTE"] },
  { name: "Data Engineering", icon: "⚙️", skills: ["Nextflow", "Docker", "AWS Batch", "S3", "Parquet", "Git"] },
  { name: "Visualization", icon: "📊", skills: ["Plotly", "Matplotlib", "Seaborn", "R Shiny", "Streamlit", "ggplot2"] },
  { name: "Domain Knowledge", icon: "🔬", skills: ["Spatial Transcriptomics", "scRNA-seq", "Small RNA-seq", "Drug Response", "Molecular Docking"] },
]

export const STATS = [
  { value: "5+", label: "Production Pipelines", icon: "🔬" },
  { value: "4", label: "ML Models Deployed", icon: "🤖" },
  { value: "10k+", label: "Lines of Code", icon: "💻" },
  { value: "3", label: "Interactive Dashboards", icon: "📊" },
]

// ─────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────

export function getRoleFromQuery(query: string | string[] | undefined): Role {
  const role = (typeof query === 'string' ? query : query?.[0])?.toLowerCase()
  return ["bio", "ml", "compbio", "eng"].includes(role || "") ? (role as Role) : "bio"
}
