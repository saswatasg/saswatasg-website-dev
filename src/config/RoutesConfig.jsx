import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import SplitEntrance from '@/pages/worlds/SplitEntrance';
import Workbench, { Builds } from '@/pages/worlds/Workbench';
import Adda, { Writing, Cinema, AddaAbout } from '@/pages/worlds/Adda';
import Photography, { PhotographySeries } from '@/pages/worlds/Photography';
const About = React.lazy(() => import('@/pages/About'));
const Experience = React.lazy(() => import('@/pages/Experience'));
const Projects = React.lazy(() => import('@/pages/Projects'));
const CaseStudies = React.lazy(() => import('@/pages/CaseStudies'));
const Work = React.lazy(() => import('@/pages/Work'));
const CaseStudyCartCheckout = React.lazy(
  () => import('@/pages/case-studies/CartCheckout'),
);
const CaseStudyCategoryDiscovery = React.lazy(
  () => import('@/pages/case-studies/CategoryDiscovery'),
);
const CaseStudyLeadForm = React.lazy(
  () => import('@/pages/case-studies/LeadForm'),
);
const CaseStudyUpcoreLeadScoring = React.lazy(
  () => import('@/pages/case-studies/UpcoreLeadScoring'),
);
const SierraLeadAllocation = React.lazy(
  () => import('@/pages/case-studies/SierraLeadAllocation'),
);
const LiveKeepingComplianceGap = React.lazy(
  () => import('@/pages/case-studies/LiveKeepingComplianceGap'),
);
const LiveKeepingSendGreetings = React.lazy(
  () => import('@/pages/case-studies/LiveKeepingSendGreetings'),
);
const LiveKeepingNotifications = React.lazy(
  () => import('@/pages/case-studies/LiveKeepingNotifications'),
);
const LiveKeepingReportAutomation = React.lazy(
  () => import('@/pages/case-studies/LiveKeepingReportAutomation'),
);
const Contact = React.lazy(() => import('@/pages/Contact'));
const Roadmap = React.lazy(() => import('@/pages/Roadmap'));
const BlogIndex = React.lazy(() => import('@/pages/blog/BlogIndex'));
const BlogPost = React.lazy(() => import('@/pages/blog/BlogPost'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));
// Unlisted lab tool: intentionally NOT in scripts/prerender.mjs's STATIC_ROUTES
// or tools/generate-static-files.mjs's sitemap, and not linked from nav/footer.
// See PageMeta noindex inside the page itself + robots.txt Disallow.
const RelationshipMagazine = React.lazy(
  () => import('@/pages/lab/RelationshipMagazine'),
);

const PageLoader = () => (
  <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] w-full gap-4">
    <div className="w-12 h-12 rounded-full bg-muted animate-pulse"></div>
    <div className="w-32 h-4 rounded bg-muted animate-pulse"></div>
    <div className="w-24 h-3 rounded bg-muted animate-pulse"></div>
  </div>
);

const AnimatedPage = ({ children }) => (
  <motion.div initial={false}>
    <Suspense fallback={<PageLoader />}>{children}</Suspense>
  </motion.div>
);

const RoutesConfig = () => {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <SplitEntrance />
            </AnimatedPage>
          }
        />
        <Route path="/workbench" element={<Workbench />} />
        <Route path="/builds" element={<Builds />} />
        <Route path="/adda" element={<Adda />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/photography/:series" element={<PhotographySeries />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/cinema" element={<Cinema />} />
        <Route path="/adda/about" element={<AddaAbout />} />
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
          path="/roadmap"
          element={
            <AnimatedPage>
              <Roadmap />
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
    </>
  );
};

export default RoutesConfig;
