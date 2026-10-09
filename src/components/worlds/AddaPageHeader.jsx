import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Camera, Clapperboard, BookOpen } from "lucide-react";
import { Owl, Flower } from "./Motifs";

export default function AddaPageHeader({
  label,
  title,
  description,
  variant = "about",
}) {
  const reduced = useReducedMotion();
  const Icon = { photography: Camera, writing: BookOpen, cinema: Clapperboard }[
    variant
  ];
  return (
    <motion.header
      className="adda-page-header"
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <nav className="adda-breadcrumb" aria-label="Breadcrumb">
          <Link to="/adda">
            <span lang="bn">আড্ডা</span> (Adda)
          </Link>
          <span>/</span>
          <span>{label}</span>
        </nav>
        <h1>{title}</h1>
        {description && <p className="page-intro">{description}</p>}
      </div>
      <div className={`adda-page-art adda-art-${variant}`} aria-hidden="true">
        <span className="eyebrow">A LITTLE OF THE OTHER SIDE</span>
        {Icon ? <Icon strokeWidth={1.3} /> : <Owl />}
        <Flower className="adda-art-flower" />
        <span className="eyebrow">{label.toUpperCase()} / KOLKATA</span>
      </div>
    </motion.header>
  );
}

export function AddaPageEnd() {
  return (
    <section className="adda-page-end">
      <div>
        <span className="eyebrow">THE CONVERSATION CONTINUES</span>
        <h2>There’s always room.</h2>
        <p>A thought, a story, or just a hello.</p>
      </div>
      <Link className="adda-button" to="/contact?world=adda">
        Say hello <ArrowUpRight size={17} />
      </Link>
    </section>
  );
}
