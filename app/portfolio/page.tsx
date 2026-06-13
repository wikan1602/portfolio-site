export default function PortfolioPage() {
  // Production-grade engineering projects mapped from enterprise and biomedical records
  const projects = [
    {
      slug: "cloud-api-to-local-inference",
      title: "Cloud API to Local Inference Migration for Cost & Latency Optimization",
      description: "Eliminated reliance on external third-party APIs by deploying a localized open-source model (Qwen) on private cloud infrastructure to securely process medical records.",
      category: "Enterprise AI & Infrastructure",
      tags: ["Qwen", "Ollama", "vLLM", "HPE PCAI", "Python"],
      impact: "Slashed response latency from 3.6s to 1.1s (69% performance lift) while ensuring 100% compliance with strict data privacy regulations.",
      link: "/portfolio/cloud-api-to-local-inference"
    },
    {
      slug: "on-premise-clinical-rag-system",
      title: "On-Premise RAG Architecture & Automated Clinical Document Analysis",
      description: "Engineered a secure Retrieval-Augmented Generation (RAG) pipeline for automated EMR summarization and automated billing analysis without exposing sensitive patient data to external networks.",
      category: "Generative AI & Architecture",
      tags: ["LangChain", "n8n", "PostgreSQL", "C# / .NET Core", "Python"],
      impact: "Enabled 100% secure, fully on-premise processing of highly confidential hospital documents.",
      link: "/portfolio/on-premise-clinical-rag-system"
    },
    {
      slug: "multimodal-mlops-clinical-risk",
      title: "Multimodal MLOps Pipeline for Clinical Risk Assessment",
      description: "Designed a 10-container microservices topology using Apache Airflow chunked DAGs and MLflow to efficiently process multimodal clinical data and prevent system out-of-memory (OOM) failures.",
      category: "MLOps & Data Engineering",
      tags: ["Docker Compose", "Apache Airflow", "MLflow", "FastAPI", "XGBoost", "PostgreSQL"],
      impact: "Elevated predictive performance from a 0.73 tabular baseline to a 0.9198 multimodal fusion AUC, achieving an elite 90.9% recall.",
      link: "https://github.com/wikan1602/clinical-mlops-pipeline"
    },
    {
      slug: "price-intelligence-anomaly-detection",
      title: "Production-Grade Price Intelligence & Anomaly Detection Pipeline",
      description: "Engineered a robust, multi-stage pricing recovery system to accurately reconstruct missing e-commerce data during scraping outages by utilizing cyclical temporal encodings and historical value ratios.",
      category: "Data Science & Production Pipelines",
      tags: ["LightGBM", "Optuna", "Python", "Feature Engineering", "Data Pipeline"],
      impact: "Successfully reconstructed missing product prices during automated scraping outages with multilevel fallback defenses, maintaining 100% mathematical stability in production.",
      link: "https://github.com/wikan1602/mrscraper-price-intelligence" // Ganti dengan URL repo aslimu jika berbeda
    },
    {
      slug: "pah-detection-bi-lstm",
      title: "Pulmonary Arterial Hypertension Detection from PPG Signals",
      description: "Led the development of an end-to-end signal processing and classification pipeline utilizing Wavelet Scattering Transform and a Bidirectional LSTM network for non-invasive PAH screening.",
      category: "Biosignal & Deep Learning",
      tags: ["Python", "TensorFlow", "Keras", "Bi-LSTM", "Wavelet Transform", "Signal Processing"],
      impact: "Awarded 1st Place at the West Java Health Tech Innovation Competition 2025. Accessible tool with potential to push survival rates past 80-90%.",
      link: "/portfolio/pah-detection-bi-lstm"
    },
    {
      slug: "thesis-qa-rag-chatbot",
      title: "End-to-End RAG Chatbot for Academic Thesis QA",
      description: "Built an interactive, full-stack chatbot system using natural language queries to seamlessly extract insights and methodologies from a multi-page biomedical thesis.",
      category: "Generative AI & Full-Stack",
      tags: ["LangChain", "ChromaDB", "Groq API", "Streamlit", "Docker", "Hugging Face Spaces"],
      impact: "Automated targeted knowledge extraction; fully containerized and publicly hosted on Hugging Face Spaces.",
      link: "https://github.com/wikan1602/thesis-chatbot"
    },
    {
      slug: "diabetes-prediction-hemodynamic",
      title: "Type 2 Diabetes Prediction Using Vascular Stiffness Parameters",
      description: "Conducted a comparative machine learning performance study employing a Leave-One-Out Cross-Validation (LOOCV) strategy to identify T2DM based on non-invasive vascular and hemodynamic parameters.",
      category: "Machine Learning & Clinical Research",
      tags: ["Random Forest", "XGBoost", "SVM", "Scikit-Learn", "LOOCV", "Hemodynamic Features"],
      impact: "Presented at the international symposium ISPACS 2025. Random Forest model achieved 85.5% overall accuracy and a 0.921 AUC.",
      link: "/portfolio/diabetes-prediction-hemodynamic"
    },
    {
      slug: "brain-tumor-mri-classification",
      title: "Brain Tumor MRI Classification via Optimized 3-Layer CNN",
      description: "Developed a deep learning convolutional neural network architecture to classify over 7,000 high-resolution brain MRI scans across varied clinical points of view.",
      category: "Computer Vision & Medical Imaging",
      tags: ["Python", "TensorFlow", "Keras", "CNN", "ImageDataGenerator", "Matplotlib"],
      impact: "Achieved 96.01% validation accuracy while maintaining high model generalization across distinct anatomical planes.",
      link: "https://github.com/wikan1602/brain-tumor-mri-classification"
    },
    {
      slug: "industrial-color-detection",
      title: "Industrial Color Detection & Quality Control System",
      description: "Engineered an automated computer vision pipeline for automated color segmentation and cap classification on an industrial manufacturing line.",
      category: "Computer Vision & Automation",
      tags: ["Python", "OpenCV", "Poetry", "Docker", "CLI", "Feature Engineering"],
      impact: "Boosted accuracy from 75.2% to 92.7% by identifying and disabling destructive color-jittering data augmentations.",
      link: "https://github.com/wikan1602/ada-mata-mle-test"
    },
    {
      slug: "automated-cpr-ppg-feedback",
      title: "Automated CPR Device with Integrated PPG Feedback Loop",
      description: "Designed the electronic control systems and real-time pulse-detection algorithms using PPG sensor integration as an intelligent feedback trigger for automated mechanical CPR.",
      category: "Biomedical Instrumentation & Embedded",
      tags: ["Arduino Uno", "Pulse Sensor", "Signal Processing", "Electronic Design", "Embedded C++"],
      impact: "Enables real-time blood-flow detection to automatically halt mechanical compressions upon pulse return, minimizing internal injury risks.",
      link: "/portfolio/automated-cpr-ppg-feedback"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-20 px-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 z-10 relative">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-950/50 border border-blue-900/50 px-3 py-1 rounded-full text-xs font-mono text-blue-400">
            <span>⚡ AVAILABLE FOR ENTERPRISE DEPLOYMENTS</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Case Studies & Engineering Projects
          </h1>
          <p className="text-slate-400 max-w-3xl text-lg font-light leading-relaxed">
            A showcase of production-grade engineering solutions, infrastructure optimizations, pipeline designs, and robust artificial intelligence implementations deployed to solve real-world complexities.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const isExternal = project.link.startsWith("http");
            
            return (
              <div 
                key={index} 
                className="bg-slate-900/30 border border-slate-800/60 p-6 rounded-2xl flex flex-col justify-between hover:border-slate-700/80 hover:bg-slate-900/50 transition-all backdrop-blur-sm group"
              >
                <div className="space-y-4">
                  {/* Category */}
                  <span className="text-[10px] font-mono font-medium text-blue-400 uppercase tracking-wider">
                    {project.category}
                  </span>
                  
                  {/* Project Title */}
                  <h2 className="text-lg font-bold group-hover:text-blue-400 transition-colors line-clamp-2">
                    {project.title}
                  </h2>
                  
                  {/* Description */}
                  <p className="text-slate-400 text-xs font-light leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1 pt-2">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="bg-slate-950/80 text-slate-400 text-[10px] px-2 py-0.5 rounded border border-slate-900 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Impact & Results Section */}
                <div className="mt-6 pt-4 border-t border-slate-800/40 space-y-3">
                  <div className="bg-emerald-950/20 border border-emerald-900/30 p-3 rounded-xl">
                    <div className="text-[9px] uppercase font-mono font-bold tracking-wider text-emerald-400">Key Impact & Result:</div>
                    <div className="text-xs text-slate-300 mt-0.5 font-medium leading-tight">{project.impact}</div>
                  </div>

                  {/* Case Study Details Link */}
                  <a 
                    href={project.link}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors pt-1"
                  >
                    {isExternal ? "View on GitHub" : "Read Technical Analysis"}
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}