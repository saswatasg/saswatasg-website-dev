import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import DiagramIllustration from "./DiagramIllustration";
import { trackEvent } from "@/utils/analytics";

// One preview architecture shared by selected and complete Work collections.
export default function CasePreviewCard({ study, index = 0 }) {
  return (
    <Link
      to={`/case-studies/${study.slug}`}
      className="wb-preview-card"
      style={{
        "--wb-panel-tone": `var(--wb-${["sage", "clay", "blue", "gold", "lilac"][index % 5]})`,
      }}
      onClick={() => trackEvent("work", "case_study_click", study.title)}
    >
      <div className="wb-preview-visual wb-preview-evidence">
        <DiagramIllustration
          variant={
            {
              "upcore-inventory-leveling": "bom",
              "upcore-discovery": "matrix",
              "upcore-lead-scoring": "matrix",
              "livekeeping-compliance-gap": "gap",
              "cart-checkout": "funnel",
              "livekeeping-send-greetings": "calendar",
              "livekeeping-notifications": "queue",
              "category-discovery": "pipeline",
              "lead-form": "form",
              "sierra-lead-allocation": "routing",
              "livekeeping-report-automation": "report",
            }[study.slug]
          }
        />
      </div>
      <div className="wb-preview-copy">
        <span className="wb-status">
          {study.company} · {study.year}
        </span>
        <h3>{study.title}</h3>
        <div className="wb-preview-metrics">
          {study.stats.slice(0, 2).map((stat) => (
            <span key={stat.label}>
              <strong>{stat.value}</strong> {stat.label}
            </span>
          ))}
        </div>
        <p>{study.description}</p>
        <span className="wb-card-action">
          Read the case study <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}
