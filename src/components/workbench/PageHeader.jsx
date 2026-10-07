import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function PageGraphic({ variant = "work" }) {
  return (
    <div className={`wb-page-graphic wb-graphic-${variant}`} aria-hidden="true">
      <span className="wb-graphic-label">
        {
          {
            work: "PROBLEM → PROGRESS",
            experience: "A JOURNEY IN PRODUCT",
            about: "CURIOSITY / CLARITY",
            blog: "NOTES FROM THE WORK",
            contact: "THE NEXT CONVERSATION",
            builds: "IDEA → WORKING TOOL",
            roadmap: "WHAT COMES NEXT",
          }[variant]
        }
      </span>
      <svg viewBox="0 0 320 180" fill="none">
        <path
          className="wb-graphic-path"
          d="M20 135H90V85H175V40H300"
          stroke="currentColor"
          strokeWidth="2"
        />
        {[20, 90, 175, 300].map((x, i) => (
          <g key={x}>
            <circle
              cx={x}
              cy={[135, 85, 40, 40][i]}
              r={i === 3 ? 14 : 8}
              fill={i === 3 ? "#f2c85b" : "#f5f2ec"}
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              className="wb-graphic-orbit"
              cx={x}
              cy={[135, 85, 40, 40][i]}
              r={i === 3 ? 25 : 17}
              stroke="currentColor"
              opacity=".2"
            />
          </g>
        ))}
        <path
          d="M25 165H300M25 15H300"
          stroke="currentColor"
          opacity=".12"
          strokeDasharray="3 7"
        />
      </svg>
      <span className="wb-graphic-caption">
        DISCOVER / DEFINE / DELIVER / LEARN
      </span>
    </div>
  );
}
export default function PageHeader({
  label,
  title,
  description,
  variant = "work",
  children,
}) {
  const reduced = useReducedMotion();
  return (
    <motion.header
      className="wb-page-header"
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="wb-page-header-copy">
        <nav aria-label="Breadcrumb" className="wb-breadcrumb">
          <Link to="/workbench">Workbench</Link>
          <span>/</span>
          <span>{label}</span>
        </nav>
        <h1>{title}</h1>
        <p>{description}</p>
        {children}
      </div>
      <PageGraphic variant={variant} />
    </motion.header>
  );
}
export function PageEnd({
  title = "Something worth building?",
  description = "Let’s talk about the problem, the possibilities and the next useful step.",
}) {
  return (
    <section className="wb-page-end">
      <div>
        <span className="wb-label">THE NEXT CONVERSATION</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <Link className="wb-page-button" to="/contact">
        Start a conversation <ArrowUpRight size={17} />
      </Link>
    </section>
  );
}
