import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  ExternalLink,
  Github,
  Boxes,
  Sparkles,
  FileText,
  Package,
  Rocket,
} from "lucide-react";
import PageMeta from "@/components/PageMeta";
import PageHeader, { PageEnd } from "@/components/workbench/PageHeader";
import ProjectCard from "@/components/projects/ProjectCard";
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
  const navigate = useNavigate();
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

  const openCaseStudy = (cs) => {
    trackEvent("work", "case_study_click", cs.title);
    navigate(`/case-studies/${cs.slug}`);
  };

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
          {featured.map((cs) => (
            <motion.div
              key={cs.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
              onClick={() => openCaseStudy(cs)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openCaseStudy(cs);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Open case study: ${cs.title}`}
              className={`${cs.bg} border-2 border-black rounded-2xl p-6 md:p-7 relative overflow-hidden group cursor-pointer focus-visible:outline-4 focus-visible:outline-coral focus-visible:outline-offset-2 flex flex-col min-h-[280px]`}
              style={{ boxShadow: `8px 8px 0px 0px ${cs.shadowColor}` }}
            >
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/30 border-2 border-black rounded-lg rotate-12 hidden md:block group-hover:rotate-[20deg] transition-all duration-300" />

              <div className="flex items-center gap-2 mb-3 relative z-10">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded border border-black text-[10px] font-bold ${cs.bg === "bg-ink" ? "bg-white text-ink" : "bg-ink text-white"}`}
                >
                  {cs.company}
                </span>
                <span className={`text-[10px] font-bold ${cs.textColorMuted}`}>
                  {cs.year}
                </span>
              </div>

              <h3
                className={`text-lg md:text-xl font-display font-black ${cs.textColor} mb-3 relative z-10 leading-tight`}
              >
                {cs.title}
              </h3>

              <div className="grid grid-cols-2 gap-2 mb-4 relative z-10">
                {cs.stats.slice(0, 4).map((stat, si) => (
                  <div
                    key={si}
                    className={`${cs.accentClass} border-2 border-black rounded-xl p-2.5 text-center`}
                  >
                    <div
                      className={`text-base md:text-lg font-display font-black ${cs.textColor}`}
                    >
                      {stat.value}
                    </div>
                    <p
                      className={`text-[9px] font-bold ${cs.textColorMuted} mt-0.5`}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <span
                className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold relative z-10 group/link"
                style={
                  cs.bg === "bg-ink" ? { color: "white" } : { color: "inherit" }
                }
              >
                Read Full Case Study
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </span>
            </motion.div>
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
              <div className="grid md:grid-cols-3 gap-6">
                {caseStudies.map((cs) => (
                  <motion.div
                    key={cs.id}
                    variants={cardVariants}
                    whileHover={{
                      y: -4,
                      scale: 1.005,
                      transition: { duration: 0.2 },
                    }}
                    onClick={() => openCaseStudy(cs)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openCaseStudy(cs);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Open case study: ${cs.title}`}
                    className={`${cs.bg} border-2 border-black rounded-2xl p-6 relative overflow-hidden group cursor-pointer focus-visible:outline-4 focus-visible:outline-coral focus-visible:outline-offset-2 flex flex-col`}
                    style={{ boxShadow: `8px 8px 0px 0px ${cs.shadowColor}` }}
                  >
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/30 border-2 border-black rounded-lg rotate-12 hidden md:block group-hover:rotate-[20deg] transition-all duration-300" />

                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-3 relative z-10">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded border border-black text-[10px] font-bold ${cs.bg === "bg-ink" ? "bg-white text-ink" : "bg-ink text-white"}`}
                        >
                          {cs.company}
                        </span>
                        <span
                          className={`text-[10px] font-bold ${cs.textColorMuted}`}
                        >
                          {cs.year}
                        </span>
                        {cs.featured && (
                          <span className="text-[9px] font-black text-coral uppercase tracking-wider bg-white/40 px-1.5 py-0.5 rounded border border-coral/40">
                            Featured
                          </span>
                        )}
                      </div>

                      <h3
                        className={`text-lg md:text-xl font-display font-black ${cs.textColor} mb-3 relative z-10 leading-tight`}
                      >
                        {cs.title}
                      </h3>

                      <p
                        className={`text-sm ${cs.textColorMuted} font-medium leading-relaxed mb-4 relative z-10 line-clamp-3`}
                      >
                        {cs.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 mb-4 relative z-10">
                        {cs.stats.map((stat, si) => (
                          <div
                            key={si}
                            className={`${cs.accentClass} border-2 border-black rounded-xl p-2 text-center`}
                          >
                            <div
                              className={`text-base md:text-lg font-display font-black ${cs.textColor}`}
                            >
                              {stat.value}
                            </div>
                            <p
                              className={`text-[9px] font-bold ${cs.textColorMuted} mt-0.5`}
                            >
                              {stat.label}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3 relative z-10">
                        {cs.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-0.5 rounded-lg ${cs.bg === "bg-ink" ? "bg-white/10 text-white/60" : "bg-white text-ink/60"} text-[9px] font-bold border-2 border-black`}
                          >
                            {tag}
                          </span>
                        ))}
                        {cs.tags.length > 3 && (
                          <span className="px-2 py-0.5 rounded-lg bg-white text-ink/30 text-[9px] font-bold border-2 border-black">
                            +{cs.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-bold relative z-10 group/link"
                      style={
                        cs.bg === "bg-ink"
                          ? { color: "white" }
                          : { color: "inherit" }
                      }
                    >
                      Read Full Case Study
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </span>
                  </motion.div>
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
                <div className="grid md:grid-cols-2 gap-4">
                  {openSourceProjects.map((p, index) => (
                    <motion.div
                      key={p.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: (index % 2) * 0.05 }}
                      className="bg-canvas border-2 border-black rounded-xl p-5 flex flex-col"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display font-black text-ink text-lg leading-tight">
                          {p.name}
                        </h3>
                        <span
                          className={`flex-shrink-0 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${p.statusClass}`}
                        >
                          {p.status}
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-bold text-ink/60 uppercase tracking-wide">
                        {p.tagline}
                      </p>
                      <p className="mt-2 text-sm text-ink/75 leading-relaxed">
                        {p.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-md bg-white border border-ink/15 text-[11px] font-bold text-ink/60"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto pt-4 flex items-center gap-2">
                        {p.links.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target={l.external ? "_blank" : undefined}
                            rel={l.external ? "noopener noreferrer" : undefined}
                            onClick={() =>
                              trackEvent("work", "open_source_link", l.label)
                            }
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-ink text-white text-xs font-bold border-2 border-black hover:bg-lemon hover:text-ink transition-colors"
                          >
                            {l.label}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                        {p.code && (
                          <a
                            href={p.code}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              trackEvent("work", "open_source_code", p.name)
                            }
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white text-ink text-xs font-bold border-2 border-black hover:bg-mint transition-colors"
                          >
                            <Github className="w-3 h-3" />
                            Code
                          </a>
                        )}
                      </div>
                    </motion.div>
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
