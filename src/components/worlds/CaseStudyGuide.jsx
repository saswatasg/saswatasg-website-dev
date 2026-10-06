import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function CaseStudyGuide() {
  const location = useLocation();
  const [sections, setSections] = useState([]);
  useEffect(() => {
    const main = document.getElementById("main-content");
    const scan = () => {
      const headings = [...main.querySelectorAll("h2")];
      const next = headings.map((heading, index) => {
        const id = `case-section-${index + 1}`;
        heading.id = id;
        return { id, title: heading.textContent.trim() };
      });
      setSections((current) =>
        JSON.stringify(current) === JSON.stringify(next) ? current : next,
      );
    };
    scan();
    const observer = new MutationObserver(scan);
    observer.observe(main, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [location.pathname]);
  if (!sections.length) return null;
  return (
    <aside className="case-guide" aria-label="Case study sections">
      <details>
        <summary>
          IN THIS CASE <span>↓</span>
        </summary>
        <nav>
          {sections.map((section, index) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(event) =>
                event.currentTarget.closest("details").removeAttribute("open")
              }
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {section.title}
            </a>
          ))}
        </nav>
      </details>
      <a href="/work">ALL CASE STUDIES ↗</a>
    </aside>
  );
}
