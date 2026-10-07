import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
  useMotionValue,
} from "framer-motion";
import { List, ArrowUp } from "lucide-react";

export default function WorkbenchMotion() {
  const location = useLocation();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const [headings, setHeadings] = useState([]);
  const reading = /^\/(case-studies\/|blog\/)/.test(location.pathname);
  useEffect(() => {
    if (reduced || !matchMedia("(pointer: fine)").matches) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduced, x, y]);
  useEffect(() => {
    setHeadings([]);
    if (!reading) return;
    const main = document.getElementById("main-content");
    if (!main) return;
    const collect = () => {
      const items = Array.from(main.querySelectorAll("h2"))
        .filter((h) => h.textContent.trim() && !h.closest("footer"))
        .slice(0, 16)
        .map((h, i) => {
          if (!h.id) h.id = `section-${i + 1}`;
          return { id: h.id, title: h.textContent.trim() };
        });
      setHeadings((previous) =>
        JSON.stringify(previous) === JSON.stringify(items) ? previous : items,
      );
    };
    collect();
    const observer = new MutationObserver(collect);
    observer.observe(main, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [location.pathname, reading]);
  return (
    <>
      <motion.div
        className="wb-reading-progress"
        style={{ scaleX: reduced ? scrollYProgress : progress }}
        aria-hidden="true"
      />
      {!reduced && (
        <motion.div
          className="wb-pointer-glow"
          style={{ x, y }}
          aria-hidden="true"
        />
      )}
      {reading && headings.length > 0 && (
        <details className="wb-page-outline" key={location.pathname}>
          <summary>
            <List size={16} />
            On this page
          </summary>
          <nav aria-label="Article sections">
            {headings.map((h) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                onClick={(e) =>
                  e.currentTarget.closest("details").removeAttribute("open")
                }
              >
                {h.title}
              </a>
            ))}
            <a href="#main-content">
              <ArrowUp size={14} />
              Back to top
            </a>
          </nav>
        </details>
      )}
    </>
  );
}
