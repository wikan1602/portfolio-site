import { notFound } from "next/navigation";
import type { Metadata } from "next";

type CaseStudy = {
  title: string;
  category: string;
  context: string;
  tags: string[];
  problem: string;
  contributions: { label: string; text: string }[];
  stack: string[];
  results: string[];
  externalLink?: { url: string; label: string };
};

// Full technical write-ups for the projects that don't live on GitHub.
const caseStudies: Record<string, CaseStudy> = {
  "hospital-data-warehouse-cdc": {
    title: "Hospital Data Warehouse & CDC-Driven BI Pipeline",
    category: "Data Engineering & Business Intelligence",
    context: "Enterprise Data Platform Project — in active development, pre-go-live",
    tags: ["Data Warehouse", "ETL Pipeline", "CDC", "Star / Snowflake Schema", "BI"],
    problem:
      "A healthcare provider ran on multiple disconnected operational systems, with no single source of truth for analytics. Reporting was slow and inconsistent, and pulling numbers across systems meant manual, error-prone work. They needed a centralized, analytics-ready data platform that stays continuously up to date without hammering the production systems with heavy batch reloads.",
    contributions: [
      {
        label: "Data Warehouse Design",
        text: "Designed the warehouse architecture and dimensional models, transforming normalized operational data into analytics-ready star and snowflake schemas built for fast, consistent reporting.",
      },
      {
        label: "Pipeline Engineering",
        text: "Built the ingestion and transformation pipeline that moves data from the source systems into the warehouse reliably and repeatably.",
      },
      {
        label: "Change Data Capture (CDC)",
        text: "Implemented CDC so the warehouse stays continuously synchronized with the operational systems in near-real-time — replacing heavy periodic batch loads and keeping analytics fresh.",
      },
      {
        label: "Standalone AI Layer (Next Phase)",
        text: "Currently engineering a standalone AI system on top of the warehouse to turn the consolidated clinical/operational data into automated insight.",
      },
    ],
    stack: ["Data Warehouse", "ETL / ELT Pipeline", "Change Data Capture (CDC)", "Dimensional Modeling", "Star / Snowflake Schema", "Business Intelligence"],
    results: [
      "Consolidated fragmented hospital systems into a single, analytics-ready source of truth.",
      "Dimensional (star/snowflake) modeling makes BI reporting fast and consistent instead of manual.",
      "CDC keeps the warehouse in near-real-time sync with operational systems, without heavy batch reloads.",
      "Status: engineered and running in pre-production — preparing for go-live.",
    ],
  },
  "cloud-api-to-local-inference": {
    title: "Cloud API to Local Inference Migration for Cost & Latency Optimization",
    category: "Enterprise AI & Infrastructure",
    context: "Enterprise AI Infrastructure Project",
    tags: ["Qwen", "Ollama", "vLLM", "HPE PCAI", "Python"],
    problem:
      "Processing sensitive medical records through external, third-party LLM APIs created three compounding problems: exposure of confidential patient data to networks outside the organization's control, unpredictable per-token cost that scaled with usage, and network round-trip latency that made interactive workflows feel sluggish.",
    contributions: [
      {
        label: "Model Localization",
        text: "Deployed a quantized open-source model (Qwen) onto private cloud infrastructure (HPE PCAI), removing any dependency on external inference providers.",
      },
      {
        label: "Serving Optimization",
        text: "Benchmarked and tuned local serving runtimes (Ollama and vLLM) to squeeze maximum throughput and minimum latency out of the available hardware.",
      },
      {
        label: "Privacy Compliance",
        text: "Re-architected the inference path so that no record ever leaves the internal network, satisfying strict data-privacy requirements for medical data.",
      },
    ],
    stack: ["Qwen", "Ollama", "vLLM", "HPE PCAI", "Python", "Quantization"],
    results: [
      "Slashed response latency from 3.6s to 1.1s — a 69% performance lift.",
      "Achieved 100% compliance with data-privacy regulations by keeping all inference on-premise.",
      "Eliminated recurring per-token API costs, converting a variable expense into fixed infrastructure.",
    ],
  },
  "on-premise-clinical-rag-system": {
    title: "On-Premise RAG Architecture & Automated Clinical Document Analysis",
    category: "Generative AI & Architecture",
    context: "Enterprise Generative AI Project",
    tags: ["LangChain", "n8n", "PostgreSQL", "C# / .NET Core", "Python"],
    problem:
      "Hospitals sit on large volumes of Electronic Medical Records (EMR) and billing documents, but the highly confidential nature of that data makes it impossible to send to public cloud AI services. They needed automated summarization and billing analysis that never exposes patient information to external networks.",
    contributions: [
      {
        label: "Secure RAG Pipeline",
        text: "Engineered a Retrieval-Augmented Generation pipeline with LangChain that retrieves and reasons over clinical documents entirely within the hospital's own infrastructure.",
      },
      {
        label: "Workflow Automation",
        text: "Used n8n to orchestrate the ingestion, processing, and routing of documents, connecting the AI layer to the existing C# / .NET Core management system.",
      },
      {
        label: "Data Layer",
        text: "Implemented a PostgreSQL-backed store for document context and retrieval, tuned for on-premise performance.",
      },
    ],
    stack: ["LangChain", "n8n", "PostgreSQL", "C# / .NET Core", "Python", "RAG"],
    results: [
      "Enabled 100% secure, fully on-premise processing of confidential hospital documents.",
      "Automated EMR summarization and billing analysis that previously required manual review.",
      "Integrated cleanly into the hospital's existing corporate management system.",
    ],
  },
  "pah-detection-bi-lstm": {
    title: "Pulmonary Arterial Hypertension Detection from PPG Signals",
    category: "Biosignal & Deep Learning",
    context: "🏆 Winner (1st Place) — West Java Health Tech Innovation Competition 2025",
    tags: ["Python", "TensorFlow", "Keras", "Bi-LSTM", "Wavelet Transform"],
    problem:
      "Cardiovascular diseases are a leading cause of mortality worldwide. Early detection of Pulmonary Arterial Hypertension (PAH) — a severe condition — is critical, as it can improve the 3-to-5-year patient survival rate to over 80–90%. The goal was to build an accessible, non-invasive screening tool using common, low-cost PPG sensors.",
    contributions: [
      {
        label: "ML Division Lead",
        text: "Led the design and implementation of the end-to-end signal processing and classification pipeline as head of the machine learning division.",
      },
      {
        label: "Signal Pre-processing",
        text: "Developed pre-processing algorithms to clean raw PPG signals and extract relevant physiological features using Wavelet Scattering Transform.",
      },
      {
        label: "Model Engineering",
        text: "Engineered, trained, and validated a Bidirectional LSTM (Bi-LSTM) classification model in Python with TensorFlow/Keras, then ran performance analysis to confirm diagnostic-grade reliability.",
      },
    ],
    stack: ["Python", "TensorFlow", "Keras", "Bi-LSTM", "Wavelet Scattering Transform", "Signal Processing"],
    results: [
      "Awarded 1st Place at the West Java Health Tech Innovation Competition 2025.",
      "Delivered a non-invasive screening approach with potential to push PAH survival rates past 80–90% through earlier detection.",
      "Built entirely around low-cost, widely available PPG sensors to maximize accessibility.",
    ],
  },
  "diabetes-prediction-hemodynamic": {
    title: "Type 2 Diabetes Prediction Using Vascular Stiffness Parameters",
    category: "Machine Learning & Clinical Research",
    context: "📄 Presented at ISPACS 2025 (International Symposium on Intelligent Signal Processing and Communication Systems)",
    tags: ["Random Forest", "XGBoost", "SVM", "Scikit-Learn", "LOOCV"],
    problem:
      "Type 2 Diabetes Mellitus (T2DM) is a major global health concern associated with severe cardiovascular complications, including increased arterial stiffness. An effective, non-invasive screening method is critical for early risk assessment before complications develop.",
    contributions: [
      {
        label: "Comparative Study",
        text: "Trained and validated four models — Logistic Regression, SVM, Random Forest, and XGBoost — on a dataset of 69 Indonesian subjects (21 diagnosed with diabetes).",
      },
      {
        label: "Robust Validation",
        text: "Applied a Leave-One-Out Cross-Validation (LOOCV) strategy to get reliable performance estimates on a small clinical dataset.",
      },
      {
        label: "Feature Engineering",
        text: "Used 13 non-invasive predictors spanning demographic/anthropometric (Age, BMI, Vascular Age) and hemodynamic/vascular parameters (ABI, baPWV, Aortic & Peripheral Compliance).",
      },
    ],
    stack: ["Random Forest", "XGBoost", "SVM", "Logistic Regression", "Scikit-Learn", "LOOCV"],
    results: [
      "Random Forest achieved the best performance: 85.5% overall accuracy, 0.921 AUC, and a 0.74 F1-score for the diabetic class.",
      "Demonstrated that non-invasive vascular parameters are a viable basis for early diabetes screening.",
      "Positioned the approach as a potential clinical decision support tool.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) return { title: "Case Study Not Found | Wikan" };
  return {
    title: `${study.title} | Wikan`,
    description: study.problem.slice(0, 155),
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) notFound();

  return (
    <main className="min-h-screen bg-bg text-fg py-20 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <article className="max-w-3xl mx-auto space-y-12 z-10 relative">
        {/* Header */}
        <header className="space-y-4">
          <a
            href="/portfolio"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1 font-mono"
          >
            ← Back to Portfolio
          </a>
          <span className="block text-xs font-mono font-medium text-blue-400 uppercase tracking-wider">
            {study.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-fg">
            {study.title}
          </h1>
          <div className="inline-flex items-center gap-2 bg-emerald-950/30 border border-emerald-900/40 px-3 py-1.5 rounded-full text-xs font-medium text-emerald-400">
            {study.context}
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="bg-surface text-muted text-xs px-2.5 py-1 rounded-md font-mono border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Problem Statement */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle font-mono">
            Problem Statement
          </h2>
          <p className="text-fg leading-relaxed font-light">{study.problem}</p>
        </section>

        {/* My Contribution */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle font-mono">
            My Contribution
          </h2>
          <div className="space-y-4">
            {study.contributions.map((c) => (
              <div
                key={c.label}
                className="bg-surface/40 border border-border/80 p-5 rounded-xl"
              >
                <h3 className="text-sm font-bold text-blue-400 mb-1">{c.label}</h3>
                <p className="text-sm text-muted leading-relaxed font-light">{c.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Stack */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle font-mono">
            Technical Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {study.stack.map((tech) => (
              <span
                key={tech}
                className="bg-surface-2 text-fg text-xs px-2.5 py-1 rounded-md font-mono border border-border-strong"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Results */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-subtle font-mono">
            Results & Impact
          </h2>
          <ul className="space-y-3">
            {study.results.map((r, i) => (
              <li
                key={i}
                className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl text-sm text-fg leading-relaxed flex gap-3"
              >
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* External link (if any) */}
        {study.externalLink && (
          <a
            href={study.externalLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-white transition-colors"
          >
            {study.externalLink.label} →
          </a>
        )}

        {/* CTA */}
        <div className="border-t border-border pt-8 text-center space-y-4">
          <p className="text-muted text-sm">Have a similar challenge you want to solve?</p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-medium transition-colors"
          >
            Start a Project Discussion
          </a>
        </div>
      </article>
    </main>
  );
}
