import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageMeta from '@/components/PageMeta';
import caseStudies from '@/data/caseStudies';
import {
  openSourceProjects,
  allProjects,
  FILTERS,
  softwareSchema,
} from '@/data/projectsData';
import { BuildsList } from '@/pages/worlds/Workbench';
const TABS = [
  { id: 'case-studies', label: 'Case studies' },
  { id: 'product-work', label: 'Product work' },
  { id: 'external', label: 'Independent builds' },
];
export default function Work() {
  const [activeTab, setActiveTab] = useState('case-studies');
  const [activeFilter, setActiveFilter] = useState('all');
  const standaloneProjects = useMemo(
    () => allProjects.filter((p) => !p.caseStudyLink),
    [],
  );
  const filtered = useMemo(
    () =>
      activeFilter === 'all'
        ? standaloneProjects
        : standaloneProjects.filter((p) => p.company === activeFilter),
    [activeFilter, standaloneProjects],
  );
  return (
    <div className="world-page work-index">
      <PageMeta
        title="Work | Saswata S. Sengupta"
        description="Nine case studies, shipped product work, and independent builds. Real problems, decisions and measurable outcomes."
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': softwareSchema,
          })}
        </script>
      </Helmet>
      <p className="eyebrow">WORKBENCH / FIELD REPORTS</p>
      <h1>
        Evidence over
        <br />
        <em>assumptions.</em>
      </h1>
      <p className="page-intro">
        Nine deep-dives. {standaloneProjects.length} product highlights.{' '}
        {openSourceProjects.length} independent builds. The problem, the
        decision, and what happened next.
      </p>
      <div className="work-tabs" aria-label="Choose work collection">
        {TABS.map((t) => (
          <button
            key={t.id}
            aria-pressed={activeTab === t.id}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
            <span>
              {t.id === 'case-studies'
                ? caseStudies.length
                : t.id === 'external'
                  ? openSourceProjects.length
                  : standaloneProjects.length}
            </span>
          </button>
        ))}
      </div>
      {activeTab === 'case-studies' && (
        <div className="case-lines">
          {caseStudies.map((c, i) => (
            <Link key={c.slug} to={`/case-studies/${c.slug}`}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <small>
                  {c.company} / {c.year}
                </small>
                <h2>{c.title}</h2>
                <p>{c.description}</p>
                <div className="case-tags">
                  {c.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <strong>
                {c.stats[0].value}
                <small>{c.stats[0].label}</small>
              </strong>
              <span>↗</span>
            </Link>
          ))}
        </div>
      )}
      {activeTab === 'product-work' && (
        <>
          <div className="work-filters" aria-label="Filter by company">
            {FILTERS.map((f) => (
              <button
                aria-pressed={activeFilter === f.id}
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="product-reports">
            {filtered.map((p) => (
              <article key={p.title}>
                <p className="eyebrow">{p.companyName}</p>
                <h2>{p.title}</h2>
                <p>{p.description}</p>
                <strong>{p.result}</strong>
                <div className="case-tags">
                  {p.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </>
      )}
      {activeTab === 'external' && <BuildsList />}
    </div>
  );
}
