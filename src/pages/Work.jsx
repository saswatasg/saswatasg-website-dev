import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Boxes, Sparkles, FileText, Package, Rocket } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import PageHeader, { PageEnd } from "@/components/workbench/PageHeader";
import ProjectCard from "@/components/projects/ProjectCard";
import CasePreviewCard from "@/components/workbench/CasePreviewCard";
import BuildDiagram from "@/components/workbench/BuildDiagram";
import caseStudies from "@/data/caseStudies";
import {
  openSourceProjects,
  allProjects,
  FILTERS,
  softwareSchema,
} from "@/data/projectsData";
import { trackEvent } from "@/utils/analytics";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const TABS = [
  {
    id: "case-studies",
    label: "Case Studies",
    icon: FileText,
    count: caseStudies.length,
  },
  {
    id: "product-work",
    label: "Product Work",
    icon: Package,
    count: allProjects.filter((p) => !p.caseStudyLink).length,
  },
  {
    id: "external",
    label: "Products & Builds",
    icon: Rocket,
    count: openSourceProjects.length,
  },
];

const Work = () => {
  const [activeTab, setActiveTab] = useState("case-studies");
  const [activeFilter, setActiveFilter] = useState("all");

  const featured = useMemo(() => caseStudies.filter((cs) => cs.featured), []);
  const standaloneProjects = useMemo(
    () => allProjects.filter((p) => !p.caseStudyLink),
    [],
  );

  const filtered = useMemo(() => {
    if (activeFilter === "all") return standaloneProjects;
    return standaloneProjects.filter((p) => p.company === activeFilter);
  }, [activeFilter, standaloneProjects]);

  return (
    <>
      <PageMeta
        title="Work | Saswata S. Sengupta"
        description="Case studies and product work at Upcore Technologies, LiveKeeping and Sierra Living Concepts, alongside open-source AI builds."
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": softwareSchema,
          })}
        </script>
      </Helmet>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16"
      >
        <PageHeader
          label="Work"
          variant="work"
          title="Good problems. Tangible progress."
          description="Explore product decisions, client solutions and working tools across enterprise AI, B2B SaaS and commerce. Each story makes its role, delivery stage and outcome clear."
        />
        {/* Featured case studies */}
        <motion.div
          variants={cardVariants}
          className="mt-10 mb-4 flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-coral" />
          <h2 className="text-ink text-xl md:text-2xl font-display font-black tracking-tight">
            Selected case studies
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((cs, index) => (
            <CasePreviewCard key={cs.id} study={cs} index={index} />
          ))}
        </div>

        {/* Tabs */}
        <motion.div variants={cardVariants} className="mt-12 mb-4">
          <div
            className="flex overflow-x-auto gap-2 pb-2 -mb-2 scrollbar-none"
            role="tablist"
            aria-label="Work sections"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    trackEvent("work", "tab", tab.id);
                    setActiveTab(tab.id);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border-2 border-black whitespace-nowrap transition-all flex-shrink-0 ${
                    isActive
                      ? "bg-ink text-white shadow-[4px_4px_0px_0px_#E85D3A]"
                      : "bg-white text-ink/50 hover:text-ink hover:bg-canvas"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  <span
                    className={`text-[10px] font-black px-1.5 py-0.5 rounded ${isActive ? "bg-white/20 text-white" : "bg-canvas text-ink/40"}`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <p className="text-xs text-ink/45 font-medium mb-6 -mt-1">
          Case studies explain the decisions and evidence. Product work shows
          additional company projects. Products & builds brings together
          independent products, tools and clearly labeled client demos.
        </p>

        {/* Tab panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            role="tabpanel"
          >
            {activeTab === "case-studies" && (
              <div className="wb-lab-grid">
                {caseStudies.map((cs, index) => (
                  <CasePreviewCard key={cs.id} study={cs} index={index} />
                ))}
              </div>
            )}

            {activeTab === "product-work" && (
              <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-8">
                <div className="flex overflow-x-auto gap-1.5 pb-1 md:pb-0 -mb-1 md:mb-0 scrollbar-none mb-6 md:mb-8">
                  {FILTERS.map((f) => {
                    const isActive = activeFilter === f.id;
                    const Icon = f.icon;
                    return (
                      <button
                        key={f.id}
                        onClick={() => {
                          trackEvent("work", "filter", f.id);
                          setActiveFilter(f.id);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-black whitespace-nowrap transition-all flex-shrink-0 ${
                          isActive
                            ? "bg-ink text-white"
                            : "bg-white text-ink/50 hover:text-ink hover:bg-canvas"
                        }`}
                      >
                        {Icon && <Icon className="w-3.5 h-3.5" />}
                        {f.label}
                      </button>
                    );
                  })}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {filtered.map((project, index) => (
                    <ProjectCard
                      key={`${project.company}-${project.title}`}
                      index={index}
                      {...project}
                    />
                  ))}
                </div>

                {filtered.length === 0 && (
                  <div className="border-2 border-dashed border-ink/20 rounded-xl p-8 text-center text-sm font-bold text-ink/40">
                    No projects in this filter yet.
                  </div>
                )}
              </div>
            )}

            {activeTab === "external" && (
              <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-2 mb-1">
                  <Boxes className="w-5 h-5 text-ink" />
                  <h2 className="text-ink text-xl md:text-2xl font-display font-black tracking-tight">
                    Products, tools & prototypes
                  </h2>
                </div>
                <p className="text-sm md:text-base text-ink/70 font-medium mb-6">
                  Explore independent products, open-source experiments and
                  client demos. Each build shows its current stage and the
                  available product or source links.
                </p>
                <div className="wb-lab-grid">
                  {openSourceProjects.map((p, index) => (
                    <article
                      key={p.name}
                      className="wb-surface wb-lab-card"
                      style={{
                        "--wb-panel-tone": `var(--wb-${["sage", "clay", "blue", "gold", "lilac"][index % 5]})`,
                      }}
                    >
                      <div className="wb-lab-card-visual" aria-hidden="true">
                        <BuildDiagram project={p} />
                      </div>
                      <div className="wb-lab-card-body">
                        <span className="wb-status">{p.status}</span>
                        <h3>{p.name}</h3>
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
                            <a
                              href={p.code}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Source code ↗
                            </a>
                          )}
                          {p.caseStudyLink && (
                            <Link to={p.caseStudyLink}>Read the case ↗</Link>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <PageEnd />
      </motion.div>
    </>
  );
};

export default Work;
