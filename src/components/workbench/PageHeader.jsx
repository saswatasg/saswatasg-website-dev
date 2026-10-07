import React from "react";
import PageIllustration from "./PageIllustration";
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
      <PageIllustration variant={variant} />
      <span className="wb-graphic-caption">
        {
          {
            work: "EVIDENCE INTO ACTION",
            experience: "DIFFERENT CONTEXTS / SHARED DISCIPLINE",
            about: "ENGINEERING / PRODUCT / BUILDING",
            blog: "IDEAS WORTH EXAMINING",
            contact: "A CONVERSATION, NOT A PITCH",
            builds: "MAKE THE IDEA INSPECTABLE",
            roadmap: "PRIORITIES, NOT PROMISES",
          }[variant]
        }
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
