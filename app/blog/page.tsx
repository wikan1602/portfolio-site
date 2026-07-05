import Link from "next/link";

const articles = [
  {
    slug: "when-to-use-n8n-vs-python-script",
    title: "When to Use n8n vs. Writing Your Own Python Scripts",
    description: "An architectural guide to choosing between visual workflow automation and custom scripting based on complexity, scalability, and maintenance costs.",
    date: "May 31, 2026",
    readingTime: "5 min read",
    tags: ["n8n", "Python", "Architecture"],
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Header */}
      <section className="border-b border-border px-[clamp(18px,4vw,40px)] pt-[clamp(40px,6vw,80px)] pb-[clamp(30px,4vw,48px)]">
        <div className="font-mono text-[11.5px] tracking-[0.14em] uppercase text-accent mb-4">IDX.06 — Journal</div>
        <h1 className="text-[clamp(34px,5.4vw,66px)] font-extrabold tracking-[-0.035em] m-0 leading-[0.98] max-w-[16ch]">Notes on automation &amp; AI.</h1>
        <p className="max-w-[56ch] text-[clamp(15px,1.3vw,18px)] leading-[1.6] text-muted mt-[22px]">
          Insights, tutorials, and architectural notes on workflow automation, AI integration, and software engineering.
        </p>
      </section>

      {/* Article list */}
      <section className="border-b border-border">
        {articles.map((article, i) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className={`group block px-[clamp(18px,4vw,40px)] py-[clamp(28px,3vw,40px)] hover:bg-surface transition-colors ${
              i < articles.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className="flex items-center gap-3 font-mono text-[11px] text-subtle mb-3">
              <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.readingTime}</span>
            </div>
            <h2 className="text-[clamp(20px,2.2vw,26px)] font-bold tracking-[-0.02em] leading-[1.2] m-0 mb-2.5 group-hover:text-accent transition-colors">
              {article.title}
            </h2>
            <p className="max-w-[70ch] text-sm text-muted leading-[1.6] m-0 mb-4">{article.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <span key={tag} className="font-mono text-[10px] text-subtle border border-border px-[7px] py-[3px] rounded-[2px]">#{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
