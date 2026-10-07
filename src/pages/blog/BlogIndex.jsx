import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import PageHeader, { PageEnd } from "@/components/workbench/PageHeader";
import { posts, PILLAR_META, formatDate, toIsoDate } from "@/data/blogPosts";
const SITE_URL = "https://saswatasg.com";
const diagrams = {
  "discovery-to-roadmap": "discovery-to-roadmap/delivery",
  "checkout-abandonment-73-to-54": "checkout-abandonment/three-leaks",
  "category-page-redesign-plus34": "category-page/funnel-leak",
  "lead-form-overhaul-124": "lead-form/one-field",
  "lead-routing-gold-silver-bronze": "lead-routing/tiers",
  "push-notification-architecture": "push-notifications/architecture",
  "ai-send-greetings-168": "ai-send-greetings/calendar",
  "daily-report-automation": "daily-report/pipeline",
  "e-invoice-adoption-gap": "e-invoice-gap/gap",
  "film-risk-engine": "audited/film-risk-engine",
  "data-deep-dive-method": "data-deep-dive/funnel",
  "dhanplan-retirement-calculator": "audited/dhanplan-retirement-calculator",
  "tgb-hunt-linkedin-outreach-agent":
    "audited/tgb-hunt-linkedin-outreach-agent",
  "topshe-browser-voice-ai": "audited/topshe-browser-voice-ai",
  "ai-era-pm": "ai-era-pm/division",
  "one-fix-a-week-cro": "one-fix-a-week/cadence",
};
export default function BlogIndex() {
  const [pillar, setPillar] = useState("all");
  const reduced = useReducedMotion();
  const filtered =
    pillar === "all" ? posts : posts.filter((p) => p.pillar === pillar);
  return (
    <>
      <PageMeta
        title="Writing | Saswata S. Sengupta"
        description="Notes on product decisions, enterprise AI, growth and hands-on building, with delivery stages and measurement scope made clear."
        image={`${SITE_URL}/og/blog.png`}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${SITE_URL}/blog`,
            name: "Saswata S. Sengupta — Blog",
            description:
              "Product decisions, delivered work, research methods and experiments.",
            url: `${SITE_URL}/blog`,
            author: {
              "@type": "Person",
              "@id": `${SITE_URL}/#person`,
              name: "Saswata S. Sengupta",
            },
            // Built from the unfiltered list so prerendered output is stable.
            mainEntity: {
              "@type": "ItemList",
              itemListElement: posts.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: p.title,
                url: `${SITE_URL}/blog/${p.slug}`,
              })),
            },
          })}
        </script>
      </Helmet>
      <div className="wb-page">
        <PageHeader
          label="Writing"
          variant="blog"
          title="The thinking behind the work."
          description="Architecture, product decisions, research methods and lessons from building. Some are measured outcomes; others are experiments and open questions."
        />
        <div className="wb-filter-row" role="group" aria-label="Filter writing">
          {["all", "agents", "growth", "pm"].map((p) => (
            <button
              key={p}
              aria-pressed={pillar === p}
              onClick={() => setPillar(p)}
            >
              {p === "all" ? "All writing" : PILLAR_META[p].label}
            </button>
          ))}
        </div>
        <p className="text-sm mb-6" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        </p>
        <div className="wb-lab-grid">
          {filtered.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.05 }}
            >
              <Link
                className="wb-surface wb-blog-card"
                to={`/blog/${post.slug}`}
              >
                <div className="wb-blog-art" aria-hidden="true">
                  {diagrams[post.slug] ? (
                    <img
                      src={`/blog-assets/${diagrams[post.slug]}.svg`}
                      alt=""
                      width="600"
                      height="280"
                      loading="lazy"
                    />
                  ) : (
                    <span className="font-display text-3xl font-black">
                      {PILLAR_META[post.pillar]?.label}
                    </span>
                  )}
                </div>
                <div className="wb-blog-card-copy">
                  <div className="wb-blog-card-meta">
                    <span>{PILLAR_META[post.pillar]?.label}</span>
                    <span>{post.readingMinutes} min read</span>
                  </div>
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                  <time
                    className="text-xs text-ink/60"
                    dateTime={toIsoDate(post.date)}
                  >
                    {formatDate(post.date)}
                  </time>
                  <span className="wb-blog-read">
                    Read the article
                    <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <PageEnd title="An idea worth discussing?" />
      </div>
    </>
  );
}
