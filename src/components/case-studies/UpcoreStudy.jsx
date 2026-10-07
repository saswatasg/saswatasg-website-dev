import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import { containerVariants, itemVariants } from "./animations";
import ContextBar from "./ContextBar";
import Card from "./Card";
import { upcoreStudies } from "@/data/upcoreStudies";

export default function UpcoreStudy({ study }) {
  const content = upcoreStudies[study];
  const reduced = useReducedMotion();
  return (
    <motion.article
      variants={containerVariants}
      initial={reduced ? false : "hidden"}
      animate="visible"
      className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16 text-ink"
    >
      <PageMeta />
      <Link
        to="/work"
        className="inline-flex items-center gap-2 text-sm font-bold mb-8 hover:underline"
      >
        <ArrowLeft size={16} />
        Back to all work
      </Link>
      <motion.header
        variants={itemVariants}
        className="bg-lemon border-2 border-ink rounded-2xl p-6 md:p-12"
      >
        <ContextBar
          company="Upcore Technologies"
          period="2026"
          tags={[content.kind]}
        />
        <h1 className="font-display font-black text-3xl md:text-5xl leading-tight max-w-4xl">
          {content.title}
        </h1>
        <p className="text-base md:text-xl mt-5 max-w-3xl leading-relaxed">
          {content.intro}
        </p>
        <div className="grid sm:grid-cols-3 gap-3 mt-8">
          {content.facts.map(([value, label]) => (
            <div
              key={label}
              className="bg-white/70 border border-ink/20 rounded-xl p-4"
            >
              <strong className="block text-2xl font-display font-black">
                {value}
              </strong>
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </motion.header>
      <motion.div
        variants={itemVariants}
        className="my-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium"
      >
        <span>Role · Product Discovery Manager</span>
        <span>{content.stage}</span>
      </motion.div>
      <motion.section
        variants={itemVariants}
        aria-label="Workflow overview"
        className="bg-ink text-white rounded-2xl p-6 md:p-8 mb-8"
      >
        <p className="text-xs font-bold tracking-widest mb-5 text-white">THE WORKFLOW</p>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.flow.map((step, i) => (
            <li key={step} className="border border-white/30 rounded-xl p-4">
              <span className="text-lemon text-xs font-bold">0{i + 1}</span>
              <p className="font-display font-bold mt-3 flex items-center justify-between gap-2 text-white">
                {step}
                <ArrowRight size={17} className="shrink-0" aria-hidden="true" />
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-sm text-white/80">
          {study === "inventory"
            ? "A schematic of the demo logic. Figures in the application use mock data."
            : "A schematic overview, rather than a reproduction of a confidential client artifact."}
        </p>
      </motion.section>
      <div className="space-y-5">
        {content.sections.map((section, i) => (
          <Card key={section.title}>
            <span className="text-xs font-bold tracking-widest text-ink/60">
              0{i + 1}
            </span>
            <h2 className="font-display font-black text-xl md:text-2xl mt-2 mb-4">
              {section.title}
            </h2>
            <p className="text-base leading-relaxed max-w-4xl">
              {section.body}
            </p>
            {section.points && (
              <ul className="mt-5 grid md:grid-cols-2 gap-3">
                {section.points.map((point) => (
                  <li
                    key={point}
                    className="bg-sky/40 border border-ink/15 rounded-xl p-4 text-sm leading-relaxed"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        ))}
      </div>
      <motion.section
        variants={itemVariants}
        className="bg-ink text-white rounded-2xl p-6 md:p-10 mt-6"
      >
        <span className="text-xs font-bold tracking-widest text-lemon">
          OUTCOME & SCOPE
        </span>
        <h2 className="font-display font-black text-2xl md:text-3xl mt-3 mb-4">
          {content.resultTitle}
        </h2>
        <p className="text-base text-white/85 leading-relaxed max-w-4xl">
          {content.result}
        </p>
        {content.links.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-6">
            {content.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-lemon text-ink rounded-lg px-4 py-3 text-sm font-bold hover:bg-white"
              >
                {link.label}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
        )}
      </motion.section>
      <Link
        to={content.related}
        className="inline-flex items-center gap-2 font-bold mt-8 hover:underline"
      >
        {content.relatedLabel}
        <ArrowRight size={17} />
      </Link>
    </motion.article>
  );
}
