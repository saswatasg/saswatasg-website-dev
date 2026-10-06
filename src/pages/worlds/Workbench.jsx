import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/PageMeta';
import Portrait from '@/components/worlds/Portrait';
import caseStudies from '@/data/caseStudies';
import { openSourceProjects } from '@/data/projectsData';
import { posts } from '@/data/blogPosts';
import { testimonials } from '@/components/home/TestimonialCarousel';
export function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span>{number} /</span>
      <h2>{children}</h2>
    </div>
  );
}
export function BuildsList({ limit }) {
  return (
    <div className="build-list">
      {openSourceProjects.slice(0, limit).map((p, i) => (
        <article
          key={p.name}
          id={p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
        >
          <span className="build-number">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <h3>{p.name}</h3>
            <p>{p.tagline}</p>
            <p className="build-description">{p.description}</p>
            <div className="build-links">
              {p.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {l.label} ↗
                </a>
              ))}
              {p.code && (
                <a href={p.code} target="_blank" rel="noopener noreferrer">
                  Source ↗
                </a>
              )}
            </div>
          </div>
          <span className="project-status">{p.status}</span>
        </article>
      ))}
    </div>
  );
}
export default function Workbench() {
  const featured = caseStudies.find((p) => p.slug === 'cart-checkout');
  return (
    <div className="world-page workbench-home">
      <PageMeta
        title="Workbench | Saswata S. Sengupta"
        description="Product, AI, growth and systems. Case studies, independent builds and notes from Saswata S. Sengupta."
      />
      <section className="wb-hero">
        <div className="wb-hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> PRODUCT MANAGER / AI & GROWTH
          </p>
          <h1>
            Find the friction.
            <br />
            Build the <em>fix.</em>
          </h1>
          <p className="hero-intro">
            I’m Saswata. I find the problem nobody’s measuring, then ship the
            fix that moves the number that matters.
          </p>
          <div className="hero-links">
            <Link to="/work">
              Explore my work <span>↗</span>
            </Link>
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Résumé ↓
            </a>
          </div>
          <div className="current-note">
            <span>ON THE BENCH</span>
            <p>
              Upcore Technologies
              <br />
              AI agent discovery → deployment
            </p>
          </div>
        </div>
        <div className="wb-portrait-wrap">
          <span className="portrait-annotation">FIG. 01 / THE BUILDER</span>
          <Portrait world="workbench" />
          <span className="portrait-bottom">
            KOLKATA, INDIA <span>22.57° N / 88.36° E</span>
          </span>
        </div>
      </section>
      <section className="featured-system">
        <div>
          <p className="eyebrow">01 / FEATURED FIELD REPORT</p>
          <h2>
            A better checkout.
            <br />A measurable difference.
          </h2>
          <p>{featured.description}</p>
          <Link to={`/case-studies/${featured.slug}`} className="text-link">
            Open the case study ↗
          </Link>
        </div>
        <div className="checkout-diagram">
          <span>CHECKOUT ABANDONMENT / SIERRA</span>
          <div className="before-after">
            <div>
              <strong>
                73.1<span>%</span>
              </strong>
              <small>BEFORE</small>
            </div>
            <span className="diagram-arrow">↘</span>
            <div>
              <strong>
                53.9<span>%</span>
              </strong>
              <small>AFTER</small>
            </div>
          </div>
          <div className="process-flow">
            <span>Measure</span>
            <b>→</b>
            <span>Diagnose</span>
            <b>→</b>
            <span>Ship</span>
          </div>
          <p>480K sessions analysed · {featured.stats[1].value} mobile CVR</p>
        </div>
      </section>
      <section>
        <SectionLabel number="02">Decisions, with receipts.</SectionLabel>
        <div className="case-lines">
          {caseStudies
            .filter((c) => c.slug !== featured.slug)
            .slice(0, 3)
            .map((c, i) => (
              <Link to={`/case-studies/${c.slug}`} key={c.slug}>
                <span>0{i + 1}</span>
                <div>
                  <small>
                    {c.company} / {c.year}
                  </small>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                </div>
                <strong>
                  {c.stats[0].value}
                  <small>{c.stats[0].label}</small>
                </strong>
                <span>↗</span>
              </Link>
            ))}
        </div>
        <Link className="text-link" to="/work">
          All nine case studies ↗
        </Link>
      </section>
      <section>
        <SectionLabel number="03">Built after hours.</SectionLabel>
        <BuildsList limit={3} />
        <Link className="text-link" to="/builds">
          All builds & experiments ↗
        </Link>
      </section>
      <section className="career-strip">
        <SectionLabel number="04">The path here.</SectionLabel>
        <p>Mechanical engineering → IIT Jodhpur MBA → product.</p>
        <div>
          <span>
            SIERRA LIVING CONCEPTS<small>D2C / customer journeys</small>
          </span>
          <span>
            LIVEKEEPING · INDIAMART<small>B2B SaaS / compliance</small>
          </span>
          <span>
            UPCORE TECHNOLOGIES<small>AI / discovery & deployment</small>
          </span>
        </div>
        <Link to="/experience" className="text-link">
          Career history ↗
        </Link>
      </section>
      <section>
        <SectionLabel number="05">Notes from shipping.</SectionLabel>
        <div className="note-list">
          {posts.slice(0, 3).map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`}>
              <small>
                {String(p.date).slice(0, 10)} / {p.readingMinutes} MIN READ
              </small>
              <h3>{p.title}</h3>
              <span>↗</span>
            </Link>
          ))}
        </div>
      </section>
      <QuietTestimonials />
    </div>
  );
}
export function Builds() {
  return (
    <div className="world-page">
      <PageMeta
        title="Builds & experiments | Saswata S. Sengupta"
        description="Independent products, open-source systems and experiments from Saswata S. Sengupta."
      />
      <p className="eyebrow">WORKBENCH / INDEPENDENT BUILDS</p>
      <h1>
        Curiosity,
        <br />
        <em>compiled.</em>
      </h1>
      <p className="page-intro">
        Useful tools. Unfinished questions. Things I wanted to exist.
      </p>
      <BuildsList />
    </div>
  );
}

function QuietTestimonials() {
  const [selected, setSelected] = useState(0);
  const t = testimonials[selected];
  return (
    <section className="quiet-quote">
      <p className="eyebrow">FROM THE PEOPLE I’VE WORKED WITH</p>
      <blockquote>“{t.text}”</blockquote>
      <a href={t.linkedin} target="_blank" rel="noopener noreferrer">
        {t.name} ↗
      </a>
      <p>
        {t.title} · {t.relation}
      </p>
      <div className="quote-selector" aria-label="Choose a testimonial">
        {testimonials.map((item, i) => (
          <button
            key={item.name}
            aria-pressed={i === selected}
            onClick={() => setSelected(i)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </section>
  );
}
