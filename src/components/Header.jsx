import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  Home,
  Menu,
  X,
  ArrowUpRight,
  ArrowLeftRight,
  Sparkles,
  Coffee,
  Briefcase,
} from "lucide-react";
import { useWorld } from "@/contexts/WorldContext";
import { openScheduleBooking } from "@/utils/openCalendar";
import { trackEvent } from "@/utils/analytics";

const navItems = [
  { name: "Work", path: "/work" },
  { name: "Builds", path: "/builds" },
  { name: "Experience", path: "/experience" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const root = useRef(null),
    toggle = useRef(null);
  const reduced = useReducedMotion();
  const { world, switchWorld, destination, transitioning } = useWorld();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 28 });
  useEffect(() => setOpen(false), [location.pathname, location.search]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width:1000px)");
    const close = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, []);
  useEffect(() => {
    if (!open) return;
    const escape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event) => {
      if (!root.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  const navigation = (mobile) =>
    navItems.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) =>
          `wb-nav-link ${isActive || (item.path === "/work" && /^\/(case-studies|projects)/.test(location.pathname)) ? "is-active" : ""}`
        }
        onClick={() => {
          trackEvent(
            "navigation",
            mobile ? "mobile_nav_click" : "nav_click",
            item.name,
          );
          setOpen(false);
        }}
      >
        {item.name}
        {mobile && <ArrowUpRight size={17} />}
      </NavLink>
    ));
  return (
    <header
      ref={root}
      className={`wb-island ${open ? "is-expanded" : ""}`}
      aria-label="Workbench navigation"
    >
      <div className="wb-island-row">
        <Link
          to="/workbench"
          className="wb-brand"
          aria-label="Saswata — Workbench home"
          aria-current={location.pathname === "/workbench" ? "page" : undefined}
        >
          <Home size={20} />
        </Link>
        <nav className="wb-desktop-nav" aria-label="Primary">
          {navigation(false)}
        </nav>
        <nav
          className="wb-mode-switch wb-world-switch"
          aria-label="Choose a side"
        >
          {["workbench", "adda"].map((mode) => (
            <a
              key={mode}
              href={destination(mode)}
              aria-current={world === mode ? "page" : undefined}
              aria-disabled={!!transitioning}
              onClick={(event) => {
                if (
                  event.button === 0 &&
                  !event.metaKey &&
                  !event.ctrlKey &&
                  !event.shiftKey &&
                  !event.altKey
                ) {
                  event.preventDefault();
                  setOpen(false);
                  switchWorld(mode);
                }
              }}
            >
              {world === mode && <span className="wb-mode-indicator" />}
              <span className="wb-switch-word">
                {mode === "adda" ? (
                  <>
                    <Coffee size={14} />
                    <span lang="bn" className="wb-switch-bengali">
                      আড্ডা
                    </span>
                    <small>(Adda)</small>
                  </>
                ) : (
                  <>
                    <Briefcase size={14} />
                    <span>Workbench</span>
                  </>
                )}
              </span>
            </a>
          ))}
          <span className="wb-switch-spark" aria-hidden="true">
            <Sparkles size={17} />
          </span>
        </nav>
        <button
          className="wb-nav-cta"
          onClick={() => {
            trackEvent("navigation", "book_a_call");
            openScheduleBooking();
          }}
        >
          Let’s talk <ArrowUpRight size={16} />
        </button>
        <button
          ref={toggle}
          className="wb-menu-toggle"
          aria-expanded={open}
          aria-controls="wb-mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="wb-mobile-navigation"
            className="wb-mobile-nav"
            aria-label="Mobile primary"
            initial={{ height: reduced ? "auto" : 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: reduced ? "auto" : 0, opacity: 0 }}
            transition={{
              duration: reduced ? 0 : 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div>
              {navigation(true)}
              <Link
                to="/"
                className="wb-nav-link"
                onClick={() => setOpen(false)}
              >
                Split entrance <ArrowLeftRight size={17} />
              </Link>
              <button
                className="wb-mobile-talk"
                onClick={() => {
                  setOpen(false);
                  openScheduleBooking();
                }}
              >
                Let’s talk <ArrowUpRight size={17} />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <motion.div
        className="wb-nav-progress"
        aria-hidden="true"
        style={{ scaleX: reduced ? scrollYProgress : progress }}
      />
    </header>
  );
}
