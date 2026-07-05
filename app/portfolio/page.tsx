"use client";

import { useState } from "react";

type Project = {
  idx: string;
  group: "ai" | "data" | "ml" | "cv";
  title: string;
  description: string;
  category: string;
  tags: string[];
  impact: string;
  link: string;
};

const projects: Project[] = [
  {
    idx: "01",
    group: "data",
    title: "Hospital Data Warehouse & CDC-Driven BI Pipeline",
    description: "Designed and built a centralized data warehouse and BI pipeline for a healthcare provider — consolidating fragmented operational systems into a single source of truth and keeping it continuously synchronized via Change Data Capture (CDC).",
    category: "Data Engineering & BI",
    tags: ["Data Warehouse", "ETL Pipeline", "CDC", "Star / Snowflake"],
    impact: "Unified scattered hospital systems into one analytics-ready warehouse; CDC keeps it in near-real-time sync. Pre-production, preparing for go-live.",
    link: "/portfolio/hospital-data-warehouse-cdc",
  },
  {
    idx: "02",
    group: "ai",
    title: "Autonomous Finance Analyst Agent",
    description: "An agentic system that autonomously composes and delivers daily financial briefings — fetching stock quotes and news for a watchlist, analyzing them, and sending to Telegram on a schedule with no human in the loop.",
    category: "Agentic AI & Automation",
    tags: ["LangGraph", "FastAPI", "n8n", "GPT-4o-mini", "Docker"],
    impact: "End-to-end agentic pipeline (planner → agent ⇄ tools → finalize) with per-run cost tracking; read-only by design for safe unattended runs.",
    link: "https://github.com/wikan1602/autonomous-finance-analyst",
  },
  {
    idx: "03",
    group: "ai",
    title: "Enterprise Multi-Format Document Intelligence & RAG Pipeline",
    description: "A production-grade document processing and insight extraction engine featuring custom multi-format parsing, context-aware semantic chunking, vector search, and cross-encoder reranking.",
    category: "Generative AI & Data Eng",
    tags: ["FastAPI", "Python", "Vector Search", "Reranker", "PostgreSQL"],
    impact: "Automated structured text/table extraction from complex assets (PDF, DOCX, XLSX, PPTX) via modular microservices, minimizing retrieval noise.",
    link: "https://github.com/wikan1602/document-intelligence-system",
  },
  {
    idx: "04",
    group: "ai",
    title: "Cloud API to Local Inference Migration",
    description: "Eliminated reliance on external third-party APIs by deploying a localized open-source model (Qwen) on private cloud infrastructure to securely process medical records.",
    category: "Enterprise AI & Infra",
    tags: ["Qwen", "Ollama", "vLLM", "HPE PCAI", "Python"],
    impact: "Slashed response latency from 3.6s to 1.1s (69% lift) while ensuring 100% compliance with strict data-privacy regulations.",
    link: "/portfolio/cloud-api-to-local-inference",
  },
  {
    idx: "05",
    group: "ai",
    title: "On-Premise RAG Architecture & Clinical Document Analysis",
    description: "A secure Retrieval-Augmented Generation pipeline for automated EMR summarization and billing analysis without exposing sensitive patient data to external networks.",
    category: "Generative AI & Architecture",
    tags: ["LangChain", "n8n", "PostgreSQL", "C# / .NET Core"],
    impact: "Enabled 100% secure, fully on-premise processing of highly confidential hospital documents.",
    link: "/portfolio/on-premise-clinical-rag-system",
  },
  {
    idx: "06",
    group: "data",
    title: "Multimodal MLOps Pipeline for Clinical Risk Assessment",
    description: "A 10-container microservices topology using Apache Airflow chunked DAGs and MLflow to process multimodal clinical data and prevent out-of-memory failures.",
    category: "MLOps & Data Engineering",
    tags: ["Docker Compose", "Airflow", "MLflow", "FastAPI", "XGBoost"],
    impact: "Elevated predictive performance from a 0.73 tabular baseline to a 0.9198 multimodal fusion AUC, achieving an elite 90.9% recall.",
    link: "https://github.com/wikan1602/clinical-mlops-pipeline",
  },
  {
    idx: "07",
    group: "data",
    title: "Production-Grade Price Intelligence & Anomaly Detection",
    description: "A multi-stage pricing recovery system that accurately reconstructs missing e-commerce data during scraping outages using cyclical temporal encodings and historical value ratios.",
    category: "Data Science & Pipelines",
    tags: ["LightGBM", "Optuna", "Python", "Feature Engineering"],
    impact: "Reconstructed missing product prices during scraping outages with multilevel fallback defenses, maintaining 100% mathematical stability in production.",
    link: "https://github.com/wikan1602/mrscraper-price-intelligence",
  },
  {
    idx: "08",
    group: "ml",
    title: "Pulmonary Arterial Hypertension Detection from PPG Signals",
    description: "Led an end-to-end signal processing and classification pipeline using Wavelet Scattering Transform and a Bidirectional LSTM for non-invasive PAH screening.",
    category: "Biosignal & Deep Learning",
    tags: ["Python", "TensorFlow", "Bi-LSTM", "Wavelet Transform"],
    impact: "Awarded 1st Place at the West Java Health Tech Innovation Competition 2025. Potential to push survival rates past 80-90%.",
    link: "/portfolio/pah-detection-bi-lstm",
  },
  {
    idx: "09",
    group: "ai",
    title: "End-to-End RAG Chatbot for Academic Thesis QA",
    description: "An interactive, full-stack chatbot that uses natural-language queries to extract insights and methodologies from a multi-page biomedical thesis.",
    category: "Generative AI & Full-Stack",
    tags: ["LangChain", "ChromaDB", "Groq API", "Streamlit", "Docker"],
    impact: "Automated targeted knowledge extraction; fully containerized and publicly hosted on Hugging Face Spaces.",
    link: "https://github.com/wikan1602/thesis-chatbot",
  },
  {
    idx: "10",
    group: "ml",
    title: "Type 2 Diabetes Prediction Using Vascular Stiffness Parameters",
    description: "A comparative machine-learning study using a Leave-One-Out Cross-Validation strategy to identify T2DM from non-invasive vascular and hemodynamic parameters.",
    category: "ML & Clinical Research",
    tags: ["Random Forest", "XGBoost", "SVM", "Scikit-Learn", "LOOCV"],
    impact: "Presented at ISPACS 2025. Random Forest achieved 85.5% overall accuracy and a 0.921 AUC.",
    link: "/portfolio/diabetes-prediction-hemodynamic",
  },
  {
    idx: "11",
    group: "cv",
    title: "Brain Tumor MRI Classification via Optimized 3-Layer CNN",
    description: "A deep-learning CNN architecture to classify over 7,000 high-resolution brain MRI scans across varied clinical points of view.",
    category: "Computer Vision & Imaging",
    tags: ["Python", "TensorFlow", "Keras", "CNN", "Matplotlib"],
    impact: "Achieved 96.01% validation accuracy while maintaining high model generalization across distinct anatomical planes.",
    link: "https://github.com/wikan1602/brain-tumor-mri-classification",
  },
  {
    idx: "12",
    group: "cv",
    title: "Industrial Color Detection & Quality Control System",
    description: "An automated computer-vision pipeline for color segmentation and cap classification on an industrial manufacturing line.",
    category: "Computer Vision & Automation",
    tags: ["Python", "OpenCV", "Poetry", "Docker", "CLI"],
    impact: "Boosted accuracy from 75.2% to 92.7% by identifying and disabling destructive color-jittering augmentations.",
    link: "https://github.com/wikan1602/ada-mata-mle-test",
  },
];

const FILTERS: { key: "all" | "ai" | "data" | "ml" | "cv"; label: string }[] = [
  { key: "all", label: `All · ${projects.length}` },
  { key: "ai", label: "AI & LLM" },
  { key: "data", label: "Data & Pipelines" },
  { key: "ml", label: "ML & Research" },
  { key: "cv", label: "Computer Vision" },
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState<"all" | "ai" | "data" | "ml" | "cv">("all");
  const shown = projects.filter((p) => filter === "all" || p.group === filter);

  return (
    <>
      {/* Header */}
      <section className="border-b border-border px-[clamp(18px,4vw,40px)] pt-[clamp(40px,6vw,80px)] pb-[clamp(28px,3vw,40px)]">
        <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-live border border-border-strong px-[11px] py-1.5 rounded-[2px] mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-live" />
          Available for enterprise deployments
        </div>
        <h1 className="text-[clamp(34px,5.4vw,66px)] font-extrabold tracking-[-0.035em] m-0 leading-[0.98] max-w-[16ch]">Case studies &amp; engineering projects.</h1>
        <p className="max-w-[62ch] text-[clamp(15px,1.3vw,18px)] leading-[1.6] text-muted mt-[22px]">
          Production-grade engineering solutions, infrastructure optimizations, pipeline designs, and robust AI implementations deployed to solve real-world complexity.
        </p>
      </section>

      {/* Filters */}
      <div className="flex flex-wrap border-b border-border">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`border-r border-border font-mono text-[12px] px-[18px] py-[13px] transition-colors ${
              filter === f.key ? "bg-fg text-bg" : "bg-transparent text-muted hover:text-fg"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] border-l border-border">
        {shown.map((p) => {
          const isExternal = p.link.startsWith("http");
          return (
            <a
              key={p.idx}
              href={p.link}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="group border-r border-b border-border px-[clamp(22px,2.4vw,30px)] py-[clamp(22px,2.4vw,30px)] flex flex-col min-h-[340px] hover:bg-surface transition-colors"
            >
              <div className="flex justify-between items-center mb-[18px]">
                <span className="font-mono text-[11px] text-subtle">{p.idx}</span>
                <span className="font-mono text-[10.5px] text-muted">{isExternal ? "View on GitHub ↗" : "Read case ↗"}</span>
              </div>
              <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-accent mb-3">{p.category}</div>
              <h2 className="text-[17.5px] font-bold tracking-[-0.015em] leading-[1.22] m-0 mb-2.5 group-hover:text-accent transition-colors">{p.title}</h2>
              <p className="text-[12.5px] text-muted leading-[1.55] m-0 mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-[18px]">
                {p.tags.map((t) => (
                  <span key={t} className="font-mono text-[10px] text-subtle border border-border px-[7px] py-[3px] rounded-[2px]">{t}</span>
                ))}
              </div>
              <div className="mt-auto border-t border-border pt-3.5">
                <div className="font-mono text-[9.5px] tracking-[0.1em] uppercase text-accent mb-1.5">Key impact</div>
                <div className="text-[12.5px] text-fg leading-[1.5] font-medium">{p.impact}</div>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}
