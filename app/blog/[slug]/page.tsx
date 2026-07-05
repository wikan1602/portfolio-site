import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Article = {
  title: string;
  date: string;
  readingTime: string;
  tags: string[];
  excerpt: string;
  // Each block is a section of the post.
  body: { heading?: string; paragraphs: string[]; bullets?: string[] }[];
};

const articles: Record<string, Article> = {
  "when-to-use-n8n-vs-python-script": {
    title: "When to Use n8n vs. Writing Your Own Python Scripts",
    date: "May 31, 2026",
    readingTime: "5 min read",
    tags: ["n8n", "Python", "Architecture"],
    excerpt:
      "Choosing between visual workflow automation and custom scripting isn't about which tool is 'better' — it's about matching the tool to the shape of the problem.",
    body: [
      {
        paragraphs: [
          "Almost every automation project starts with the same question: do I wire this up in a visual tool like n8n, or do I just write a script? Both can move data from A to B. The difference shows up months later — in how much time you spend maintaining it, and how gracefully it handles the edge cases nobody thought about on day one.",
          "Here's the mental model I use when deciding.",
        ],
      },
      {
        heading: "Reach for n8n when the workflow is integration-heavy",
        paragraphs: [
          "n8n shines when the hard part of the job is talking to many services — a CRM, an email inbox, a spreadsheet, a webhook, a database — and the logic between them is relatively simple. The pre-built nodes handle authentication, pagination, and retries that you'd otherwise re-implement by hand.",
          "It's also the right call when non-developers need to see or tweak the flow. A visual canvas is documentation that can't drift out of date.",
        ],
        bullets: [
          "You're connecting 3+ third-party APIs with off-the-shelf nodes.",
          "The business logic is 'when X happens, do Y' — not heavy computation.",
          "Someone other than you needs to understand or edit the workflow.",
          "You want built-in scheduling, retries, and execution history for free.",
        ],
      },
      {
        heading: "Write a Python script when the logic is the hard part",
        paragraphs: [
          "The moment the interesting work is in the transformation — parsing messy documents, running a model, doing non-trivial math, or branching through complex state — a script wins. You get real version control, real testing, and a debugger. Dragging boxes around a canvas stops being an advantage and starts being a cage.",
          "Custom code also wins on portability and cost at scale: there's no execution-count pricing, and you can run it anywhere from a cron job to a container to a serverless function.",
        ],
        bullets: [
          "The core work is data processing, ML inference, or custom algorithms.",
          "You need unit tests and code review to trust the result.",
          "Performance or cost per run actually matters at your volume.",
          "The logic is complex enough that a visual graph would become spaghetti.",
        ],
      },
      {
        heading: "The pattern that usually wins: use both",
        paragraphs: [
          "In practice, the strongest architectures don't pick a side. They let n8n do what it's best at — orchestration, scheduling, and glue between services — and hand off the genuinely hard computation to a Python service via a webhook or an HTTP node.",
          "n8n listens for the trigger, gathers the inputs, calls your script, and routes the result onward. Your Python code stays small, testable, and focused on the one thing that's actually difficult. You get the maintainability of code where it matters and the speed of a visual tool where it doesn't.",
        ],
      },
      {
        heading: "The bottom line",
        paragraphs: [
          "Don't ask 'which tool is better?' Ask 'where does the difficulty live?' If it's in the connections, reach for n8n. If it's in the logic, reach for Python. And when a workflow has both — which is most real projects — let each tool carry the part it was built for.",
        ],
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return { title: "Article Not Found | Wikan" };
  return {
    title: `${article.title} | Wikan`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  return (
    <>
      <article className="border-b border-border px-[clamp(18px,4vw,40px)] py-[clamp(40px,6vw,80px)]">
        <div className="max-w-[68ch] mx-auto">
          {/* Header */}
          <header className="mb-10">
            <a href="/blog" className="font-mono text-[12px] text-accent hover:opacity-80 transition-opacity inline-flex items-center gap-1.5 mb-6">
              ← Back to journal
            </a>
            <div className="flex items-center gap-3 font-mono text-[11px] text-subtle mb-4">
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.readingTime}</span>
            </div>
            <h1 className="text-[clamp(30px,4.2vw,52px)] font-extrabold tracking-[-0.03em] leading-[1.02] m-0 mb-5">
              {article.title}
            </h1>
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <span key={tag} className="font-mono text-[10px] text-subtle border border-border px-[7px] py-[3px] rounded-[2px]">#{tag}</span>
              ))}
            </div>
          </header>

          {/* Body */}
          <div className="flex flex-col gap-8">
            {article.body.map((section, i) => (
              <section key={i} className="flex flex-col gap-3">
                {section.heading && (
                  <h2 className="text-[clamp(20px,2.2vw,26px)] font-bold tracking-[-0.015em] pt-2 m-0">{section.heading}</h2>
                )}
                {section.paragraphs.map((p, pi) => (
                  <p key={pi} className="text-[16px] text-fg leading-[1.7] m-0">{p}</p>
                ))}
                {section.bullets && (
                  <ul className="list-none p-0 m-0 flex flex-col gap-2 pt-1">
                    {section.bullets.map((b, bi) => (
                      <li key={bi} className="text-muted text-[14.5px] leading-[1.6] flex gap-2.5">
                        <span className="text-accent shrink-0 font-mono">→</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="px-[clamp(18px,4vw,40px)] py-[clamp(40px,5vw,64px)] text-center">
        <p className="text-muted text-[15px] mb-5">Want to automate a process without the maintenance headache?</p>
        <a href="/contact" className="inline-flex items-center gap-2.5 bg-fg text-bg text-[15px] font-semibold px-[26px] py-3.5 rounded-[2px] hover:opacity-90 transition-opacity">
          Let&apos;s talk <span className="font-mono">→</span>
        </a>
      </section>
    </>
  );
}
