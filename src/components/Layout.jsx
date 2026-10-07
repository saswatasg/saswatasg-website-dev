import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreativeHeader, { ModeSelector } from "@/components/worlds/WorldHeader";
import CreativeFooter from "@/components/worlds/CreativeFooter";
import WorldMotion from "@/components/worlds/WorldMotion";
import WorkbenchMotion from "@/components/workbench/WorkbenchMotion";
import { useWorld } from "@/contexts/WorldContext";
import { Link } from "react-router-dom";
import WhatsAppModal from "@/components/WhatsAppModal";
import CaseStudyPopup from "@/components/CaseStudyPopup";
import { Toaster } from "@/components/ui/toaster";
import { trackEvent } from "@/utils/analytics";

const CreativeScope = ({ active, children }) =>
  active ? <div className="creative-shell">{children}</div> : children;

const Layout = ({ children }) => {
  const { world } = useWorld();
  const creative = world !== "workbench";
  const [popupSlug, setPopupSlug] = useState(null);
  const location = useLocation();
  const maxScroll = useRef(0);

  useEffect(() => {
    const handler = (e) => setPopupSlug(e.detail);
    window.addEventListener("openCaseStudyPopup", handler);
    return () => window.removeEventListener("openCaseStudyPopup", handler);
  }, []);

  useEffect(() => {
    trackEvent("page_view", "route_change", location.pathname);
    maxScroll.current = 0;
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const scrollPct = Math.round(
        ((window.scrollY + window.innerHeight) /
          document.documentElement.scrollHeight) *
          100,
      );
      if (scrollPct > maxScroll.current) {
        maxScroll.current = scrollPct;
        if (
          scrollPct === 25 ||
          scrollPct === 50 ||
          scrollPct === 75 ||
          scrollPct === 100
        ) {
          trackEvent("scroll_depth", "reached", `${scrollPct}%`, scrollPct);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <MotionConfig reducedMotion={creative ? "never" : "user"}>
      <CreativeScope active={creative}>
        <div
          className={
            creative
              ? `world-shell ${world || "entrance"} min-h-screen flex flex-col`
              : "workbench-shell min-h-screen flex flex-col"
          }
          data-world={world || "entrance"}
          data-page-type={location.pathname === "/workbench" ? "home" : "page"}
        >
          <a
            href="#main-content"
            className="skip-link hover:bg-ink hover:text-white transition-colors duration-200"
          >
            Skip to main content
          </a>
          {world === "workbench" ? (
            <Header />
          ) : world === "adda" ? (
            <CreativeHeader />
          ) : null}
          {creative && <WorldMotion />}
          {world === "workbench" && <WorkbenchMotion />}
          <main id="main-content" className="flex-grow flex flex-col">
            {children}
          </main>
          <WhatsAppModal />
          <AnimatePresence>
            {popupSlug && (
              <motion.div
                key={popupSlug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <CaseStudyPopup
                  slug={popupSlug}
                  onClose={() => setPopupSlug(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
          {world === "workbench" ? (
            <Footer />
          ) : world === "adda" ? (
            <CreativeFooter />
          ) : null}
          {world === "adda" && (
            <div className="two-world-dock">
              <ModeSelector />
              <Link to="/" aria-label="Back to the split entrance">
                ↔
              </Link>
            </div>
          )}
          <Toaster />
        </div>
      </CreativeScope>
    </MotionConfig>
  );
};

export default Layout;
