export default function BlogPage() {
  // Mock blog article data (Aligned with blueprint recommendations)
  const articles = [
    {
      slug: "when-to-use-n8n-vs-python-script",
      title: "When to Use n8n vs. Writing Your Own Python Scripts",
      description: "An architectural guide to choosing between visual workflow automation and custom scripting based on complexity, scalability, and maintenance costs.",
      date: "May 31, 2026",
      readingTime: "5 min read",
      tags: ["n8n", "Python", "Architecture"]
    }
  ];

  return (
    <main className="min-h-screen bg-bg text-fg py-20 px-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-12 z-10 relative">
        
        {/* Header */}
        <div className="space-y-4 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Technical Blog
          </h1>
          <p className="text-muted text-lg font-light">
            Sharing insights, tutorials, and architectural notes covering workflow automation, AI integration, and software engineering.
          </p>
        </div>

        {/* Article List */}
        <div className="space-y-8 pt-4">
          {articles.map((article, index) => (
            <article 
              key={index} 
              className="p-6 rounded-2xl bg-surface/30 border border-border hover:border-border hover:bg-surface/50 transition-all group cursor-pointer"
            >
              <a href={`/blog/${article.slug}`} className="block space-y-3">
                
                {/* Meta: Date & Reading Time Estimate */}
                <div className="flex items-center gap-3 text-xs font-mono text-subtle">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readingTime}</span>
                </div>

                {/* Article Title */}
                <h2 className="text-xl font-bold text-fg group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h2> 

                {/* Brief Description */}
                <p className="text-muted text-sm font-light leading-relaxed">
                  {article.description}
                </p>

                {/* Badges / Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {article.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="bg-bg text-subtle text-[10px] font-mono px-2 py-0.5 rounded border border-border">
                      #{tag}
                    </span>
                  ))}
                </div>

              </a>
            </article>
          ))}
        </div>

      </div>
    </main>
  );
}