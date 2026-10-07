import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { trackEvent } from "@/utils/analytics";

export default function ProjectCard({
  title,
  description,
  tags,
  result,
  index = 0,
  caseStudyLink,
  companyName,
}) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      className="wb-preview-card"
      style={{
        "--wb-panel-tone": `var(--wb-${["sage", "clay", "blue", "gold", "lilac"][index % 5]})`,
      }}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="wb-preview-visual wb-project-result">
        <strong>{result || "Product work"}</strong>
      </div>
      <div className="wb-preview-copy">
        <span className="wb-status">{companyName}</span>
        <h3>{title}</h3>
        <p>{description}</p>
        {tags?.length > 0 && (
          <span className="wb-card-topics">{tags.slice(0, 3).join(" · ")}</span>
        )}
        {caseStudyLink && (
          <Link
            className="wb-card-action"
            to={caseStudyLink}
            onClick={() =>
              trackEvent("projects", "case_study_link", companyName)
            }
          >
            Read the case study <ArrowUpRight size={16} />
          </Link>
        )}
      </div>
    </motion.article>
  );
}
