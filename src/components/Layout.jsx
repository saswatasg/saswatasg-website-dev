import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Header from "@/components/worlds/WorldHeader";
import { Link } from "react-router-dom";
import { useWorld } from "@/contexts/WorldContext";
import WorldMotion from "@/components/worlds/WorldMotion";
import CaseStudyGuide from "@/components/worlds/CaseStudyGuide";

import WhatsAppModal from "@/components/WhatsAppModal";
import CaseStudyPopup from "@/components/CaseStudyPopup";
import { Toaster } from "@/components/ui/toaster";
import { trackEvent } from "@/utils/analytics";

const Layout = ({ children }) => {
  const { world, transitioning } = useWorld();
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
    <div
      className={`world-shell ${world || "entrance"}`}
      data-world={world || "entrance"}
    >
      <a
        href="#main-content"
        className="skip-link hover:bg-ink hover:text-white transition-colors duration-200"
      >
        Skip to main content
      </a>
      {world && <Header />}
      <WorldMotion />
      <AnimatePresence>
        {transitioning && (
          <motion.div
            className={`world-curtain curtain-${transitioning}`}
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.32, ease: [0.76, 0, 0.24, 1] }}
          >
            <span>
              {transitioning === "adda"
                ? "A little curiosity."
                : "Let’s build something."}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      <main
        key={location.pathname + location.search}
        tabIndex={-1}
        id="main-content"
        className={`flex-grow flex flex-col route-content ${location.pathname.startsWith("/case-studies/") ? "case-study-page" : ""}`}
      >
        {location.pathname.startsWith("/case-studies/") && <CaseStudyGuide />}
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
      {world && (
        <footer className="world-footer">
          <div>
            <Link to={world === "adda" ? "/adda" : "/workbench"}>
              Saswata S. Sengupta
            </Link>
            <p>Different lenses. Same curiosity.</p>
          </div>
          <nav aria-label="Footer navigation">
            <Link to="/">Back to the split entrance ↔</Link>
            {world === "adda" ? (
              <>
                <Link to="/photography">Photography</Link>
                <Link to="/writing">Writing</Link>
                <Link to="/cinema">Cinema</Link>
                <Link to="/adda/about">About</Link>
              </>
            ) : (
              <>
                <Link to="/experience">Career</Link>
                <Link to="/roadmap">Roadmap</Link>
                <Link to="/about">Profile</Link>
                <Link to="/work">Work</Link>
              </>
            )}
            <Link to={world === "adda" ? "/contact?world=adda" : "/contact"}>
              Contact ↗
            </Link>
            <a href="/assets/Saswata_Sengupta.vcf" download>
              Save contact ↓
            </a>
          </nav>
          <small>© {new Date().getFullYear()} / KOLKATA, INDIA</small>
        </footer>
      )}
      <Toaster />
    </div>
  );
};

export default Layout;
