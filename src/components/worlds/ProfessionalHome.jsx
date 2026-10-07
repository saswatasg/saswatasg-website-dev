import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Portrait from "./Portrait";
import { careerChapters, impactStories } from "@/data/careerChapters";
import { testimonials } from "@/components/home/TestimonialCarousel";
import caseStudies from "@/data/caseStudies";

const swap = { duration: 0.38, ease: [0.22, 1, 0.36, 1] };
function Swap({ children, id, className = "" }) {
  return (
    <motion.div
      key={id}
      className={`panel-swap ${className}`}
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={swap}
    >
      {children}
    </motion.div>
  );
}
export function ImpactPanel() {
  const [selected, setSelected] = useState(0);
  const story = impactStories[selected];
  return (
    <div className="material-impact">
      <div className="impact-tabs" role="group" aria-label="Company impact">
        {impactStories.map((s, i) => (
          <button
            key={s.id}
            aria-pressed={i === selected}
            onClick={() => setSelected(i)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <Swap id={story.id} className="impact-panel">
        <p className="kicker">{story.company}</p>
        <strong className="impact-value">{story.value}</strong>
        <span>{story.caption}</span>
        <div className="impact-visual" aria-label={story.chart}>
          <div className="impact-chart-head">
            <span>{story.chart}</span>
            <i className="chart-pulse" aria-hidden="true" />
          </div>
          {story.bars ? (
            <div className="metric-bars">
              {story.bars.map((b, i) => (
                <div key={b.label}>
                  <span>{b.label}</span>
                  <i
                    style={{ "--extent": `${b.extent}%` }}
                    className={i ? "after-bar" : ""}
                  />
                  <strong>{b.value}</strong>
                </div>
              ))}
            </div>
          ) : (
            <div className="score-stages">
              {story.stages.map((s, i) => (
                <span key={s}>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  {s}
                </span>
              ))}
            </div>
          )}
          <div className="chart-foot">
            <span>{story.note}</span>
            <Link to={`/case-studies/${story.slug}`}>Read the case ↗</Link>
          </div>
        </div>
        <div className="impact-mini">
          {story.metrics.map(([v, l]) => (
            <div key={l}>
              <strong>{v}</strong>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </Swap>
    </div>
  );
}
export function ProfessionalHero() {
  return (
    <>
      <div className="role-banner">
        Currently · Product Discovery Manager at Upcore Technologies
        & deployment
      </div>
      <section className="shared-hero professional-hero">
        <div className="legacy-intro">
          <div className="legacy-person">
            <div className="profile-image">
              <span className="portrait-orbit" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <Portrait world="workbench" />
            </div>
            <div className="legacy-badges">
              <span>✦ Product Manager</span>
              <span>AI & Growth</span>
            </div>
            <h1>
              Saswata S.
              <br />
              Sengupta
            </h1>
          </div>
          <div className="legacy-copy">
            <p className="kicker">SASWATA S. SENGUPTA / PRODUCT MANAGER</p>
            <h2>
              I find the problem nobody’s measuring, then ship the fix that{" "}
              <em>moves the number that matters.</em>
            </h2>
            <p>
              Cut checkout abandonment 73%→54% at Sierra. Ran compliance
              diagnostics at LiveKeeping/IndiaMART. Now building AI
              discovery and solution delivery at Upcore Technologies.
            </p>
            <p>B.Tech (Mech) + IIT Jodhpur MBA.</p>
            <div className="legacy-actions">
              <Link className="material-button" to="/contact">
                Let’s talk ↗
              </Link>
              <Link className="material-button secondary" to="/work">
                See the work →
              </Link>
              <a
                className="resume-action"
                href="/assets/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Résumé ↓
              </a>
            </div>
            <div className="legacy-tags">
              {[
                "B2B SaaS",
                "D2C",
                "E-Commerce",
                "AI Products",
                "Product Discovery",
                "Analytics",
              ].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
        <ImpactPanel />
      </section>
      <div className="expertise-strip" aria-hidden="true">
        <span>PRODUCT THINKING</span>
        <b>✳</b>
        <span>AI SYSTEMS</span>
        <b>✳</b>
        <span>GROWTH EXPERIMENTS</span>
        <b>✳</b>
        <span>FROM FRICTION TO FLOW</span>
      </div>
    </>
  );
}
export function CareerOverview() {
  const [selected, setSelected] = useState(2);
  const chapter = careerChapters[selected];
  return (
    <section className="shared-section career-overview" id="career">
      <div className="shared-section-heading">
        <div>
          <p className="kicker">THE JOURNEY SO FAR</p>
          <h2>
            Different contexts.
            <br />
            <em>The same curiosity.</em>
          </h2>
        </div>
        <Link to="/experience">Full experience ↗</Link>
      </div>
      <div
        className="career-track"
        role="group"
        aria-label="Explore career chapters"
      >
        {careerChapters.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setSelected(i)}
            aria-pressed={i === selected}
          >
            <small>{c.date}</small>
            <strong>{c.company}</strong>
            <span>{c.role}</span>
            <b aria-hidden="true">0{i + 1}</b>
          </button>
        ))}
      </div>
      <Swap id={chapter.id} className="career-detail">
        <span className="career-symbol" aria-hidden="true">
          ⌘
        </span>
        <div>
          <p className="kicker">{chapter.context}</p>
          <h3>{chapter.headline}</h3>
          <p>{chapter.description}</p>
        </div>
        <Link
          className="material-button secondary"
          to={`/case-studies/${chapter.slug}`}
        >
          Explore the work ↗
        </Link>
      </Swap>
      <div className="career-foundation">
        <span>Engineering foundations</span>
        <i>→</i>
        <span>MBA · IIT Jodhpur</span>
        <i>→</i>
        <span>Product, growth & AI</span>
      </div>
    </section>
  );
}
export function ProcessVisual() {
  return (
    <div className="process-visual" aria-hidden="true">
      <svg viewBox="0 0 960 130">
        <defs>
          <linearGradient id="process-colour">
            <stop stopColor="#e85d3a" />
            <stop offset=".5" stopColor="#6d28d9" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
        </defs>
        <path className="process-route" d="M85 65H875" />
        <circle className="process-particle" r="7" fill="#e85d3a">
          <animateMotion dur="5s" repeatCount="indefinite" path="M85 65H875" />
        </circle>
        <g fill="#fffdf9" stroke="#ddcfbd">
          {[85, 350, 610, 875].map((cx) => (
            <circle key={cx} cx={cx} cy="65" r="38" />
          ))}
        </g>
        <g fill="none" stroke="#b74224" strokeWidth="2.5">
          <circle cx="80" cy="59" r="11" />
          <path d="M88 67l12 12M335 54h30v24h-30zM340 61h20m-20 8h14M595 80V61m15 19V48m15 32V56M860 65l10 10 20-22" />
        </g>
      </svg>
      <div>
        {["Discover", "Decide", "Ship", "Measure"].map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
    </div>
  );
}
export function Methods() {
  const methods = [
    [
      "◎",
      "Product discovery",
      "Map the workflow. Find the friction. Choose the problem worth solving.",
    ],
    [
      "↗",
      "Shipping & execution",
      "Translate insight into clear decisions, buildable specs and shipped changes.",
    ],
    [
      "▥",
      "Data & analytics",
      "Set up the measurement. Make the decision. Learn from the result.",
    ],
    [
      "✳",
      "Cross-functional leadership",
      "Connect design, engineering and business around the same outcome.",
    ],
  ];
  return (
    <section className="shared-section" id="how-i-work">
      <p className="kicker">HOW I WORK</p>
      <h2>
        Product management,
        <br />
        <em>end to end.</em>
      </h2>
      <ProcessVisual />
      <div className="method-grid">
        {methods.map(([icon, title, description]) => (
          <article key={title}>
            <b aria-hidden="true">{icon}</b>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
export function ProfessionalTestimonials() {
  const [selected, setSelected] = useState(0);
  const t = testimonials[selected];
  return (
    <section className="shared-section material-quote">
      <span className="quote-mark" aria-hidden="true">
        “
      </span>
      <p className="kicker">FROM THE PEOPLE I’VE WORKED WITH</p>
      <Swap id={t.name}>
        <blockquote>“{t.text}”</blockquote>
        <a href={t.linkedin} target="_blank" rel="noopener noreferrer">
          {t.name} ↗
        </a>
        <p>{t.title}</p>
        <small>{t.relation}</small>
      </Swap>
      <div
        className="testimonial-controls"
        role="group"
        aria-label="Choose a testimonial"
      >
        {testimonials.map((q, i) => (
          <button
            key={q.name}
            aria-pressed={i === selected}
            onClick={() => setSelected(i)}
          >
            {q.name.split(" ")[0]}
          </button>
        ))}
      </div>
    </section>
  );
}
export function WorkCard({ study, index = 0 }) {
  return (
    <Link
      className={`visual-work-card tone-${index % 3}`}
      to={`/case-studies/${study.slug}`}
    >
      <div className="work-card-art" aria-hidden="true">
        <span className="art-orbit" />
        <span className="art-orbit second" />
        <strong>{study.stats[0].value}</strong>
        <span className="art-caption">{study.stats[0].label}</span>
        <div className="art-bars">
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="work-card-copy">
        <p className="kicker">
          {study.company} / {study.year}
        </p>
        <h2>{study.title}</h2>
        <p>{study.description}</p>
        <span className="card-action">Explore the case study ↗</span>
      </div>
    </Link>
  );
}
export function SelectedWork() {
  const slugs = [
    "cart-checkout",
    "livekeeping-compliance-gap",
    "upcore-inventory-leveling",
  ];
  return (
    <section className="shared-section">
      <div className="shared-section-heading">
        <div>
          <p className="kicker">SELECTED WORK</p>
          <h2>
            Decisions,
            <br />
            <em>with receipts.</em>
          </h2>
        </div>
        <Link to="/work">Explore all case studies ↗</Link>
      </div>
      <div className="visual-work-grid">
        {slugs.map((s, i) => (
          <WorkCard
            key={s}
            study={caseStudies.find((c) => c.slug === s)}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
export function ProfessionalNotes() {
  const notes = [
    ["data-deep-dive-method", "Data deep-dive method"],
    ["discovery-to-roadmap", "Discovery to roadmap"],
    ["push-notification-architecture", "Push notification architecture"],
  ];
  return (
    <section className="shared-section" id="work-notes">
      <div className="shared-section-heading">
        <div>
          <p className="kicker">LATEST WRITING</p>
          <h2>Notes from the work.</h2>
        </div>
        <Link to="/blog">All notes ↗</Link>
      </div>
      <div className="notes-preview">
        {notes.map(([slug, title], i) => (
          <Link to={`/blog/${slug}`} key={slug}>
            <div className={`note-art note-art-${i}`} aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <h3>{title}</h3>
            <span>Read ↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
