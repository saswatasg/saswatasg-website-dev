import React, { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { useWorld } from "@/contexts/WorldContext";
import SplitEntrance from "@/pages/worlds/SplitEntrance";
import Adda, { Writing, Cinema, AddaAbout } from "@/pages/worlds/Adda";
import Photography, { PhotographySeries } from "@/pages/worlds/Photography";
import { Builds } from "@/pages/worlds/Workbench";

const Home = React.lazy(() => import("@/pages/Home"));
const About = React.lazy(() => import("@/pages/About"));
const Experience = React.lazy(() => import("@/pages/Experience"));
const Projects = React.lazy(() => import("@/pages/Projects"));
const CaseStudies = React.lazy(() => import("@/pages/CaseStudies"));
const Work = React.lazy(() => import("@/pages/Work"));
const CaseStudyCartCheckout = React.lazy(
  () => import("@/pages/case-studies/CartCheckout"),
);
const CaseStudyCategoryDiscovery = React.lazy(
  () => import("@/pages/case-studies/CategoryDiscovery"),
);
const CaseStudyLeadForm = React.lazy(
  () => import("@/pages/case-studies/LeadForm"),
);
const CaseStudyUpcoreLeadScoring = React.lazy(
  () => import("@/pages/case-studies/UpcoreLeadScoring"),
);
const UpcoreInventory = React.lazy(
  () => import("@/pages/case-studies/UpcoreInventory"),
);
const UpcoreDiscovery = React.lazy(
  () => import("@/pages/case-studies/UpcoreDiscovery"),
);
const SierraLeadAllocation = React.lazy(
  () => import("@/pages/case-studies/SierraLeadAllocation"),
);
const LiveKeepingComplianceGap = React.lazy(
  () => import("@/pages/case-studies/LiveKeepingComplianceGap"),
);
const LiveKeepingSendGreetings = React.lazy(
  () => import("@/pages/case-studies/LiveKeepingSendGreetings"),
);
const LiveKeepingNotifications = React.lazy(
  () => import("@/pages/case-studies/LiveKeepingNotifications"),
);
const LiveKeepingReportAutomation = React.lazy(
  () => import("@/pages/case-studies/LiveKeepingReportAutomation"),
);
const Contact = React.lazy(() => import("@/pages/Contact"));
const BlogIndex = React.lazy(() => import("@/pages/blog/BlogIndex"));
const BlogPost = React.lazy(() => import("@/pages/blog/BlogPost"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));
// Unlisted lab tool: intentionally NOT in scripts/prerender.mjs's STATIC_ROUTES
// or tools/generate-static-files.mjs's sitemap, and not linked from nav/footer.
// See PageMeta noindex inside the page itself + robots.txt Disallow.
const RelationshipMagazine = React.lazy(
  () => import("@/pages/lab/RelationshipMagazine"),
);

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
  out: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.2 } },
};

const PageLoader = () => (
  <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] w-full gap-4">
    <div className="w-12 h-12 rounded-full bg-muted animate-pulse"></div>
    <div className="w-32 h-4 rounded bg-muted animate-pulse"></div>
    <div className="w-24 h-3 rounded bg-muted animate-pulse"></div>
  </div>
);

const AnimatedPage = ({ children }) => {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
};

// Keep professional navigation independent of descendant exit animations.
// A page can contain looping graphics or its own presence group; those must not
// hold the next route behind an AnimatePresence "wait" boundary.
const RouteTransition = ({ world, location, reduced, children }) => {
  if (world === "workbench" || world === "adda") {
    return (
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: reduced ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduced ? 0.12 : 0.38,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <AnimatePresence key={world || "entrance"} mode="sync">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const RoutesConfig = () => {
  const location = useLocation();
  const { world } = useWorld();
  const reduced = useReducedMotion();
  return (
    <RouteTransition world={world} location={location} reduced={reduced}>
      <Routes location={location}>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <SplitEntrance />
            </AnimatedPage>
          }
        />
        <Route
          path="/workbench"
          element={
            <AnimatedPage>
              <Home />
            </AnimatedPage>
          }
        />
        <Route
          path="/adda"
          element={
            <AnimatedPage>
              <Adda />
            </AnimatedPage>
          }
        />
        <Route
          path="/writing"
          element={
            <AnimatedPage>
              <Writing />
            </AnimatedPage>
          }
        />
        <Route
          path="/cinema"
          element={
            <AnimatedPage>
              <Cinema />
            </AnimatedPage>
          }
        />
        <Route
          path="/photography"
          element={
            <AnimatedPage>
              <Photography />
            </AnimatedPage>
          }
        />
        <Route
          path="/photography/:series"
          element={
            <AnimatedPage>
              <PhotographySeries />
            </AnimatedPage>
          }
        />
        <Route
          path="/adda/about"
          element={
            <AnimatedPage>
              <AddaAbout />
            </AnimatedPage>
          }
        />
        <Route
          path="/builds"
          element={
            <AnimatedPage>
              <Builds />
            </AnimatedPage>
          }
        />
        <Route
          path="/about"
          element={
            <AnimatedPage>
              <About />
            </AnimatedPage>
          }
        />
        <Route
          path="/experience"
          element={
            <AnimatedPage>
              <Experience />
            </AnimatedPage>
          }
        />
        <Route
          path="/work"
          element={
            <AnimatedPage>
              <Work />
            </AnimatedPage>
          }
        />
        <Route
          path="/projects"
          element={
            <AnimatedPage>
              <Projects />
            </AnimatedPage>
          }
        />
        <Route
          path="/case-studies"
          element={
            <AnimatedPage>
              <CaseStudies />
            </AnimatedPage>
          }
        />
        <Route
          path="/case-studies/cart-checkout"
          element={
            <AnimatedPage>
              <CaseStudyCartCheckout />
            </AnimatedPage>
          }
        />
        <Route
          path="/case-studies/category-discovery"
          element={
            <AnimatedPage>
              <CaseStudyCategoryDiscovery />
            </AnimatedPage>
          }
        />
        <Route
          path="/case-studies/lead-form"
          element={
            <AnimatedPage>
              <CaseStudyLeadForm />
            </AnimatedPage>
          }
        />
        <Route
          path="/case-studies/upcore-inventory-leveling"
          element={
            <AnimatedPage>
              <UpcoreInventory />
            </AnimatedPage>
          }
        />
        <Route
          path="/case-studies/upcore-discovery"
          element={
            <AnimatedPage>
              <UpcoreDiscovery />
            </AnimatedPage>
          }
        />
        <Route
          path="/case-studies/upcore-lead-scoring"
          element={
            <AnimatedPage>
              <CaseStudyUpcoreLeadScoring />
            </AnimatedPage>
          }
        />
        <Route
          path="/case-studies/sierra-lead-allocation"
          element={
            <AnimatedPage>
              <SierraLeadAllocation />
            </AnimatedPage>
          }
        />
        <Route
          path="/case-studies/livekeeping-compliance-gap"
          element={
            <AnimatedPage>
              <LiveKeepingComplianceGap />
            </AnimatedPage>
          }
        />
        <Route
          path="/case-studies/livekeeping-send-greetings"
          element={
            <AnimatedPage>
              <LiveKeepingSendGreetings />
            </AnimatedPage>
          }
        />
        <Route
          path="/case-studies/livekeeping-notifications"
          element={
            <AnimatedPage>
              <LiveKeepingNotifications />
            </AnimatedPage>
          }
        />
        <Route
          path="/case-studies/livekeeping-report-automation"
          element={
            <AnimatedPage>
              <LiveKeepingReportAutomation />
            </AnimatedPage>
          }
        />
        <Route
          path="/contact"
          element={
            <AnimatedPage>
              <Contact />
            </AnimatedPage>
          }
        />
        <Route
          path="/blog"
          element={
            <AnimatedPage>
              <BlogIndex />
            </AnimatedPage>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <AnimatedPage>
              <BlogPost />
            </AnimatedPage>
          }
        />
        <Route
          path="/lab/relationship-magazine"
          element={
            <AnimatedPage>
              <RelationshipMagazine />
            </AnimatedPage>
          }
        />
        <Route
          path="*"
          element={
            <AnimatedPage>
              <NotFound />
            </AnimatedPage>
          }
        />
      </Routes>
    </RouteTransition>
  );
};

export default RoutesConfig;
