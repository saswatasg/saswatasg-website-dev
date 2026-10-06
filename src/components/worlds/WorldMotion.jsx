import React, { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useWorld } from "@/contexts/WorldContext";

export default function WorldMotion() {
  const { world } = useWorld();
  const location = useLocation();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });
  const orbit = useRef(null);
  useEffect(() => {
    if (reduced) return;
    const root = document.querySelector(".world-shell");
    let frame;
    const move = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 14;
        const y = (event.clientY / window.innerHeight - 0.5) * 12;
        root?.style.setProperty("--pointer-x", `${x}px`);
        root?.style.setProperty("--pointer-y", `${y}px`);
        if (orbit.current) {
          orbit.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
          orbit.current.style.opacity = ".4";
        }
      });
    };
    const reset = () => {
      if (orbit.current) orbit.current.style.opacity = "0";
      root?.style.setProperty("--pointer-x", "0px");
      root?.style.setProperty("--pointer-y", "0px");
    };
    const fine = window.matchMedia("(pointer: fine)");
    if (fine.matches)
      window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", reset);
      reset();
    };
  }, [reduced, world]);
  useEffect(() => {
    if (reduced) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("motion-arrived");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    const scan = () =>
      document
        .querySelectorAll(
          "#main-content section, .case-lines > a, .build-list > article, .book-preview, #main-content .border-2",
        )
        .forEach((el, index) => {
          if (!el.dataset.motionObserved) {
            el.dataset.motionObserved = "true";
            el.style.setProperty(
              "--reveal-delay",
              `${Math.min((index % 4) * 45, 135)}ms`,
            );
            observer.observe(el);
          }
        });
    scan();
    // Lazy case-study routes arrive after the shell mounts.
    const changes = new MutationObserver(scan);
    const main = document.getElementById("main-content");
    if (main) changes.observe(main, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      changes.disconnect();
    };
  }, [location.pathname, location.search, reduced]);
  return (
    <>
      {world && (
        <motion.div
          aria-hidden="true"
          className="reading-progress"
          style={{ scaleX: reduced ? scrollYProgress : progress }}
        />
      )}
      {!reduced && (
        <div
          ref={orbit}
          aria-hidden="true"
          className={`pointer-orbit orbit-${world || "entrance"}`}
        >
          <span />
        </div>
      )}
    </>
  );
}
