import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
const stories = [
  {
    company: "Upcore Technologies",
    role: "Product Discovery Manager · Apr 2026–present",
    domain: "ENTERPRISE AI",
    color: "var(--wb-gold)",
    title: "Taking client problems through to delivery.",
    problem:
      "Enterprise interest in AI does not automatically reveal a useful product opportunity.",
    contribution:
      "Built the discovery practice, derived solutions and managed their delivery end to end for 23+ clients.",
    result: "23+ clients · Solution delivery ownership",
    detail: "Discovery → solution definition → delivery",
    to: "/case-studies/upcore-discovery",
    link: "Explore discovery and delivery",
    graphic: "discovery",
  },
  {
    company: "LiveKeeping (IndiaMART)",
    role: "Associate Product Manager · Jan–Mar 2026",
    domain: "B2B SAAS",
    color: "var(--wb-blue)",
    title: "Finding the workflow the product was missing.",
    problem:
      "Paying subscribers were using external tools for core compliance workflows.",
    contribution:
      "Investigated 100K+ API logs, surfaced the native-module adoption gap and brought the evidence to leadership.",
    result: "17:1 E-Way Bill adoption gap identified",
    detail: "Workflow diagnosis → executive decision",
    to: "/case-studies/livekeeping-compliance-gap",
    link: "Explore the case study",
    graphic: "workflow",
  },
  {
    company: "Sierra Living Concepts",
    role: "Product Manager (Growth) · May 2024–Dec 2025",
    domain: "D2C COMMERCE",
    color: "var(--wb-sage)",
    title: "Making a complex purchase easier.",
    problem:
      "Customers reached checkout but encountered friction before completing their purchase.",
    contribution:
      "Combined GA4 funnel data with session evidence, then redesigned fields, validation and trust cues.",
    result: "Checkout abandonment: 73% → 54%",
    detail: "Behavioral evidence → UX changes → outcome",
    to: "/case-studies/cart-checkout",
    link: "Explore the case study",
    graphic: "checkout",
  },
];
function StoryGraphic({ type, reduced }) {
  return (
    <svg viewBox="0 0 300 100" className="wb-story-graphic" aria-hidden="true">
      {type === "discovery" ? (
        <>
          <path
            d="M45 20L150 50M45 50H150M45 80L150 50M150 50H258"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          {[20, 50, 80].map((y) => (
            <circle
              key={y}
              cx="45"
              cy={y}
              r="8"
              fill="#fff"
              stroke="currentColor"
              strokeWidth="2"
            />
          ))}
          <rect
            x="127"
            y="28"
            width="46"
            height="44"
            rx="8"
            fill="#fff"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M140 42H160M140 50H160M140 58H153"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="258" cy="50" r="16" fill="currentColor" />
          <path
            d="M251 50L256 55L265 45"
            stroke="#fff"
            strokeWidth="2"
            fill="none"
          />
        </>
      ) : type === "workflow" ? (
        <>
          <rect
            x="20"
            y="23"
            width="85"
            height="54"
            rx="9"
            fill="#fff"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="195"
            y="23"
            width="85"
            height="54"
            rx="9"
            fill="#fff"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M106 50H193"
            stroke="currentColor"
            strokeDasharray="4 5"
            strokeWidth="2"
          />
          <circle cx="150" cy="50" r="15" fill="currentColor" />
          <text
            x="150"
            y="55"
            textAnchor="middle"
            fill="#fff"
            fontSize="16"
            fontWeight="900"
          >
            ?
          </text>
          <text
            x="62"
            y="54"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
          >
            In product
          </text>
          <text
            x="238"
            y="54"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
          >
            Elsewhere
          </text>
        </>
      ) : (
        <>
          <path d="M18 80H282" stroke="currentColor" opacity=".2" />
          <motion.path
            d="M20 23H90L130 40H185L230 75H280"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: reduced ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
          <circle cx="20" cy="23" r="5" fill="currentColor" />
          <circle cx="280" cy="75" r="5" fill="currentColor" />
          <text x="20" y="13" fontSize="10" fontWeight="700">
            73%
          </text>
          <text x="250" y="96" fontSize="10" fontWeight="700">
            54%
          </text>
        </>
      )}
    </svg>
  );
}
export default function ImpactEvidence() {
  const reduced = useReducedMotion();
  return (
    <section
      className="wb-selected-work"
      aria-labelledby="wb-selected-work-title"
    >
      <div className="wb-section-heading">
        <div>
          <span className="wb-label">SELECTED WORK</span>
          <h2 id="wb-selected-work-title">
            Different products.
            <br />
            <em>Decisions that matter.</em>
          </h2>
        </div>
      </div>
      <div className="wb-story-grid">
        {stories.map((story, i) => (
          <motion.article
            className="wb-work-story"
            key={story.company}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <div
              className="wb-story-top"
              style={{ backgroundColor: story.color }}
            >
              <div className="wb-story-domain">
                <span className="wb-label">{story.domain}</span>
                <span className="wb-label">0{i + 1}</span>
              </div>
              <strong>{story.company}</strong>
              <span className="wb-story-role">{story.role}</span>
              <StoryGraphic type={story.graphic} reduced={reduced} />
            </div>
            <div className="wb-story-body">
              <h3>{story.title}</h3>
              <p className="wb-story-problem">{story.problem}</p>
              <div className="wb-story-contribution">
                <span className="wb-label">MY CONTRIBUTION</span>
                <p>{story.contribution}</p>
              </div>
              <div className="wb-story-result">
                <strong>{story.result}</strong>
                <span>{story.detail}</span>
              </div>
              <Link className="wb-inline-link" to={story.to}>
                {story.link}
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
      <div className="wb-selected-work-bottom">
        <Link to="/work" className="wb-button wb-button-paper">
          Explore all work <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}
