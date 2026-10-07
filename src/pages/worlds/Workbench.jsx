import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PageHeader, { PageEnd } from "@/components/workbench/PageHeader";
import { Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import BuildDiagram from "@/components/workbench/BuildDiagram";
import Home from "@/pages/Home";
import { openSourceProjects } from "@/data/projectsData";
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
    <div className="build-list grid gap-6 mt-8">
      {openSourceProjects.slice(0, limit).map((p, i) => (
        <article
          key={p.name}
          className="bg-white border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0_#E85D3A] grid gap-3"
          id={p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
        >
          <span className="build-number">{String(i + 1).padStart(2, "0")}</span>
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
  return <Home />;
}
export function Builds() {
  const [filter, setFilter] = useState("all");
  const reduced = useReducedMotion();
  const projects = openSourceProjects.filter(
    (p) => filter === "all" || p.group === filter,
  );
  return (
    <>
      <PageMeta
        title="Products & Prototypes | Saswata S. Sengupta"
        description="Independent products, client demos and experiments: DhanPlan, Meldstead, Inventory Leveling, BlogHero and more."
      />
      <div className="wb-page">
        <PageHeader
          label="Build lab"
          variant="builds"
          title="Ideas, made tangible."
          description="Independent products, open-source tools and client demos. Explore the problem behind each build—and the stage it has reached."
        />
        <div className="wb-filter-row" role="group" aria-label="Filter builds">
          {[
            ["all", "All builds"],
            ["independent", "Independent products"],
            ["client", "Client tools & demos"],
            ["research", "Research & prototypes"],
            ["archive", "Archive"],
          ].map(([id, label]) => (
            <button
              key={id}
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="wb-lab-grid">
          {projects.map((p, i) => (
            <motion.article
              id={p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              className="wb-surface wb-lab-card"
              key={p.name}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.05 }}
            >
              <div
                className="wb-lab-card-visual"
                style={{
                  background: ["#cfe9dc", "#f0d5c8", "#d9e8f3", "#f2dfac"][
                    i % 4
                  ],
                }}
                aria-hidden="true"
              >
                <div className="wb-lab-visual-content">
                  <strong>
                    {p.name === "Inventory Leveling Agent"
                      ? "BOM"
                      : p.name.split(/[ .]/)[0]}
                  </strong>
                  <BuildDiagram project={p} />
                </div>
                <ArrowUpRight size={26} />
              </div>
              <div className="wb-lab-card-body">
                <span className="wb-status">{p.status}</span>
                <h2>{p.name}</h2>
                <p>{p.description}</p>
                <div className="wb-role-links">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target={l.external ? "_blank" : undefined}
                      rel="noopener noreferrer"
                    >
                      {l.label} ↗
                    </a>
                  ))}
                  {p.code && (
                    <a href={p.code} target="_blank" rel="noopener noreferrer">
                      Source code ↗
                    </a>
                  )}
                  {p.caseStudyLink && (
                    <Link to={p.caseStudyLink}>Read the case ↗</Link>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        <PageEnd />
      </div>
    </>
  );
}
