import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Sparkles, FileText, Package, ArrowUpRight } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import PageHeader, { PageEnd } from "@/components/workbench/PageHeader";
import ProjectCard from "@/components/projects/ProjectCard";
import CasePreviewCard from "@/components/workbench/CasePreviewCard";
import caseStudies from "@/data/caseStudies";
import { allProjects, FILTERS, softwareSchema } from "@/data/projectsData";
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
    label: "More case studies",
    icon: FileText,
    count: caseStudies.filter((study) => !study.featured).length,
  },
  {
    id: "product-work",
    label: "Product Work",
    icon: Package,
    count: allProjects.filter((p) => !p.caseStudyLink).length,
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
        description="Product decisions and delivery at Upcore Technologies, LiveKeeping and Sierra Living Concepts, with evidence from enterprise AI, SaaS and commerce."
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
          description="How I define problems, make product decisions and work with teams to deliver—in enterprise AI, B2B SaaS and commerce."
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
                  id={`wb-work-tab-${tab.id}`}
                  aria-controls="wb-work-panel"
                  tabIndex={isActive ? 0 : -1}
                  aria-selected={isActive}
                  onKeyDown={(event) => {
                    const current = TABS.findIndex(
                      (item) => item.id === activeTab,
                    );
                    const next =
                      event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? TABS.length - 1
                          : event.key === "ArrowRight"
                            ? (current + 1) % TABS.length
                            : event.key === "ArrowLeft"
                              ? (current + TABS.length - 1) % TABS.length
                              : -1;
                    if (next < 0) return;
                    event.preventDefault();
                    setActiveTab(TABS[next].id);
                    document
                      .getElementById(`wb-work-tab-${TABS[next].id}`)
                      ?.focus();
                  }}
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

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink/70">
            Additional decisions and deliveries beyond the selected stories.
          </p>
          <Link className="wb-inline-link" to="/builds">
            Explore independent builds <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Tab panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            role="tabpanel"
            id="wb-work-panel"
            aria-labelledby={`wb-work-tab-${activeTab}`}
          >
            {activeTab === "case-studies" && (
              <div className="wb-lab-grid">
                {caseStudies
                  .filter((study) => !study.featured)
                  .map((cs, index) => (
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
          </motion.div>
        </AnimatePresence>
        <PageEnd />
      </motion.div>
    </>
  );
};

export default Work;
