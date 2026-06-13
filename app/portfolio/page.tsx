export default function PortfolioPage() {
  // Data proyek riil gabungan dari dokumen portfolio dan sistem enterprise
  const projects = [
    {
      slug: "migrasi-local-llm-inference",
      title: "Migrasi Cloud API ke Local Inference untuk Optimalisasi Latensi & Biaya",
      description: "Memangkas ketergantungan pada third-party API eksternal dengan mengimplementasikan open-source model lokal (Qwen) yang di-deploy mandiri pada private cloud server hospital untuk memproses rekam medis.",
      category: "Enterprise AI & Infrastructure",
      tags: ["Qwen", "Ollama", "vLLM", "HPE PCAI", "Python"],
      impact: "Latensi terpangkas dari 3.6s menjadi 1.1s (Performa naik >60%) & menjamin 100% regulasi privasi data."
    },
    {
      slug: "sistem-rag-rekam-medis-aman",
      title: "Arsitektur RAG & Sistem Otomatisasi Analisis Dokumen Klinis",
      description: "Pengembangan sistem Retrieval-Augmented Generation (RAG) untuk otomatisasi ringkasan rekam medis elektronik (RME) dan analisis billing otomatis tanpa mengekspos data sensitif ke cloud luar.",
      category: "Generative AI / Architecture",
      tags: ["LangChain", "n8n", "PostgreSQL", "C# / .NET Core", "Python"],
      impact: "Otomatisasi pemrosesan berkas rekam medis sensitif 100% aman dan berjalan on-premise."
    },
    {
      slug: "multimodal-mlops-clinical-risk",
      title: "Multimodal MLOps Pipeline for Clinical Risk Assessment",
      description: "Merancang arsitektur microservices 10 kontainer menggunakan Apache Airflow chunked DAG dan MLflow untuk pemrosesan data klinis gabungan (tabular & naratif rekam medis) secara efisien tanpa OOM.",
      category: "MLOps & Data Engineering",
      tags: ["Docker Compose", "Apache Airflow", "MLflow", "FastAPI", "XGBoost", "PostgreSQL"],
      impact: "Meningkatkan performa prediksi dari baseline AUC ~0.73 ke 0.9198, dengan elite Recall 90.9% dalam menangkap kasus high-risk post-discharge."
    },
    {
      slug: "pah-detection-bi-lstm",
      title: "Pulmonary Arterial Hypertension Detection from PPG Signals",
      description: "Memimpin perancangan end-to-end signal processing pipeline menggunakan Wavelet Scattering Transform dan melatih model cerdas Bidirectional LSTM untuk deteksi dini hipertensi arteri pulmonal secara non-invasif.",
      category: "Biosignal & Deep Learning",
      tags: ["Python", "TensorFlow", "Keras", "Bi-LSTM", "Wavelet Transform", "Signal Processing"],
      impact: "Winner (1st Place) West Java Health Tech Innovation Competition 2025. Alat skrining yang mampu meningkatkan survival rate pasien hingga >80-90%."
    },
    {
      slug: "thesis-qa-rag-chatbot",
      title: "End-to-End RAG Chatbot for Thesis Question-Answering",
      description: "Membangun sistem chatbot interaktif full-stack untuk menjawab kueri natural language seputar dokumen tugas akhir biomedis setebal ratusan halaman secara real-time.",
      category: "Generative AI / Full-Stack",
      tags: ["LangChain", "ChromaDB", "Groq API", "Streamlit", "Docker", "Hugging Face Spaces"],
      impact: "Mengotomatisasi ekstraksi info riset tanpa baca manual, berhasil di-containerized dan dideploy publik ke Hugging Face Spaces."
    },
    {
      slug: "diabetes-prediction-hemodynamic",
      title: "Diabetes Mellitus Prediction Using Vascular Stiffness Parameters",
      description: "Studi komparasi performa model machine learning dengan strategi Leave-One-Out Cross-Validation (LOOCV) untuk mendeteksi diabetes tipe 2 memanfaatkan kombinasi 13 parameter vaskular non-invasif.",
      category: "Machine Learning / Clinical Research",
      tags: ["Random Forest", "XGBoost", "SVM", "Scikit-Learn", "LOOCV", "Hemodynamic Features"],
      impact: "Dipresentasikan di simposium internasional ISPACS 2025. Model Random Forest mencapai akurasi 85.5% dengan nilai AUC sebesar 0.921."
    },
    {
      slug: "brain-tumor-mri-classification",
      title: "Brain Tumor MRI Classification via Optimized 3-Layer CNN",
      description: "Mengembangkan arsitektur Deep Learning Convolutional Neural Network (CNN) untuk mengklasifikasikan lebih dari 7.000 citra high-resolution Brain MRI ke dalam 4 kategori klinis.",
      category: "Computer Vision / Medical Imaging",
      tags: ["Python", "TensorFlow", "Keras", "CNN", "ImageDataGenerator", "Matplotlib"],
      impact: "Mencapai akurasi validasi 96.01% serta berhasil menangani variasi sudut pandang (POV) scan klinis dengan generalisasi yang kuat."
    },
    {
      slug: "industrial-color-detection",
      title: "Industrial Color Detection & Quality Control System",
      description: "Membangun otomatisasi Computer Vision pipeline untuk mendeteksi warna produk pada lini Quality Control manufaktur menggunakan segmentasi thresholding HSV.",
      category: "Computer Vision / Industrial",
      tags: ["Python", "OpenCV", "Poetry", "Docker", "CLI", "Feature Engineering"],
      impact: "Akurasi melonjak drastis dari 75.2% menjadi 92.7% setelah mengidentifikasi dan mematikan fungsi augmentasi warna yang destruktif."
    },
    {
      slug: "automated-cpr-ppg-feedback",
      title: "Automated CPR Device with Integrated PPG Feedback System",
      description: "Merancang sistem kontrol elektronik primer dan algoritma pemrosesan biosinyal real-time berbasis mikrokontroler untuk memberikan feedback otomatis pada perangkat CPR.",
      category: "Biomedical Instrumentation / Embedded",
      tags: ["Arduino Uno", "Pulse Sensor", "Signal Processing", "Electronic Design", "Embedded C++"],
      impact: "Mampu mendeteksi kembalinya aliran darah (nadi) secara real-time untuk menghentikan kompresi mekanis otomatis demi mencegah cedera internal."
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
            <span>⚡ AVAILABLE FOR PRODUCTION DEPLOYMENT</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Studi Kasus & Proyek Teknik
          </h1>
          <p className="text-slate-400 max-w-3xl text-lg font-light leading-relaxed">
            Kumpulan bukti kerja nyata dalam menyelesaikan kendala arsitektur sistem, efisiensi infrastruktur data, pipeline MLOps, dan implementasi kecerdasan buatan medis maupun industrial.
          </p>
        </div>

        {/* Grid Proyek */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-slate-900/30 border border-slate-800/60 p-6 rounded-2xl flex flex-col justify-between hover:border-slate-700/80 hover:bg-slate-900/50 transition-all backdrop-blur-sm group"
            >
              <div className="space-y-4">
                {/* Kategori */}
                <span className="text-[10px] font-mono font-medium text-blue-400 uppercase tracking-wider">
                  {project.category}
                </span>
                
                {/* Judul Proyek */}
                <h2 className="text-lg font-bold group-hover:text-blue-400 transition-colors line-clamp-2">
                  {project.title}
                </h2>
                
                {/* Deskripsi */}
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

              {/* Highlight Dampak Proyek (Impact) */}
              <div className="mt-6 pt-4 border-t border-slate-800/40 space-y-3">
                <div className="bg-emerald-950/20 border border-emerald-900/30 p-3 rounded-xl">
                  <div className="text-[9px] uppercase font-mono font-bold tracking-wider text-emerald-400">Key Impact & Result:</div>
                  <div className="text-xs text-slate-300 mt-0.5 font-medium leading-tight">{project.impact}</div>
                </div>

                {/* Link ke Detail Case Study */}
                <a 
                  href={`/portfolio/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors pt-1"
                >
                  Baca Analisis Teknis 
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </main>
  );
}