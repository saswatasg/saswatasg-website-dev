import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
const builds = [
  {
    name: "DhanPlan.in",
    label: "PERSONAL FINANCE",
    description:
      "A monthly retirement planner connecting Indian savings instruments, withdrawals, gap-solving and stress scenarios.",
    href: "https://www.dhanplan.in/",
    action: "Explore DhanPlan",
    color: "#cfe9dc",
    type: "finance",
    note: "Independent product · Live",
  },
  {
    name: "Meldstead.com",
    label: "PROJECT WORKSPACE",
    description:
      "A connected project workspace for tasks, docs, whiteboards and timelines, with AI connections and client reviews.",
    href: "https://meldstead.com/",
    action: "Explore Meldstead",
    color: "#f0d5c8",
    type: "meldstead",
    note: "Independent product · Pre-launch audit",
  },
  {
    name: "Inventory Leveling Agent",
    label: "ENTERPRISE WORKFLOWS",
    description:
      "A procurement demo that turns sales orders and bills of materials into component demand, stock requirements and purchase schedules.",
    href: "https://inventory-leveling-agent-gamma.vercel.app",
    action: "Explore the demo",
    color: "#d9e8f3",
    type: "inventory",
    note: "Upcore Technologies · Client demo · Mock data",
  },
];
function BuildGraphic({ type }) {
  return (
    <div className={`wb-build-graphic wb-build-${type}`} aria-hidden="true">
      {type === "finance" ? (
        <>
          <span className="wb-build-window-label">
            DhanPlan<span>↗</span>
          </span>
          <svg viewBox="0 0 260 95">
            <path d="M10 80H250" stroke="currentColor" opacity=".2" />
            <path
              d="M12 76C75 76 112 62 148 43S215 12 248 9"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            {[12, 148, 248].map((x, i) => (
              <circle
                key={x}
                cx={x}
                cy={[76, 43, 9][i]}
                r="4"
                fill="currentColor"
              />
            ))}
          </svg>
          <div className="wb-build-window-tags">
            <span>SIP</span>
            <span>EPF</span>
            <span>NPS</span>
            <span>FIRE</span>
          </div>
        </>
      ) : type === "inventory" ? (
        <>
          <span className="wb-build-window-label">
            Order → components → supply<span>↗</span>
          </span>
          <svg viewBox="0 0 260 105">
            <path
              d="M35 52H100M100 52V20H160M100 52H160M100 52V85H160M180 20H235M180 52H220M180 85H210"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <rect
              x="13"
              y="33"
              width="43"
              height="38"
              rx="6"
              fill="currentColor"
            />
            {[20, 52, 85].map((y) => (
              <rect
                key={y}
                x="153"
                y={y - 9}
                width="27"
                height="18"
                rx="4"
                fill="#fff"
                stroke="currentColor"
                strokeWidth="2"
              />
            ))}
          </svg>
          <div className="wb-build-window-tags">
            <span>Demand</span>
            <span>Stock</span>
            <span>Schedule</span>
          </div>
        </>
      ) : (
        <>
          <span className="wb-build-window-label">
            Meldstead<span>↗</span>
          </span>
          <svg viewBox="0 0 260 100">
            <rect
              x="5"
              y="12"
              width="113"
              height="76"
              rx="5"
              fill="#fff"
              stroke="currentColor"
            />
            {[27, 49, 71].map((y) => (
              <g key={y}>
                <rect
                  x="16"
                  y={y - 5}
                  width="10"
                  height="10"
                  rx="2"
                  fill="none"
                  stroke="currentColor"
                />
                <path
                  d={`M34 ${y}H102`}
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </g>
            ))}
            <rect
              x="133"
              y="12"
              width="122"
              height="76"
              rx="5"
              fill="#fff"
              stroke="currentColor"
            />
            <path
              d="M147 31H235M147 43H212"
              stroke="currentColor"
              strokeWidth="2"
            />
            <rect
              x="147"
              y="60"
              width="32"
              height="14"
              rx="3"
              fill="#f0d5c8"
              stroke="currentColor"
            />
            <rect
              x="186"
              y="60"
              width="53"
              height="14"
              rx="3"
              fill="#cfe9dc"
              stroke="currentColor"
            />
          </svg>
          <div className="wb-build-window-tags">
            <span>Tasks</span>
            <span>Docs</span>
            <span>Boards</span>
            <span>Timelines</span>
          </div>
        </>
      )}
    </div>
  );
}
export default function IndependentBuilds() {
  const reduced = useReducedMotion();
  return (
    <section className="wb-independent" aria-labelledby="wb-independent-title">
      <div className="wb-section-heading">
        <div>
          <span className="wb-label">PRODUCTS & PROTOTYPES</span>
          <h2 id="wb-independent-title">Ideas, made tangible.</h2>
        </div>
        <p>
          Independent products and client solutions, made tangible through
          working tools.
        </p>
      </div>
      <div className="wb-build-grid">
        {builds.map((build, i) => (
          <motion.a
            href={build.href}
            target="_blank"
            rel="noopener noreferrer"
            className="wb-build-card"
            key={build.name}
            initial={reduced ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <div
              className="wb-build-visual"
              style={{ backgroundColor: build.color }}
            >
              <span className="wb-label">{build.label}</span>
              <BuildGraphic type={build.type} />
            </div>
            <div className="wb-build-copy">
              <h3>
                {build.name}
                <ArrowUpRight size={19} />
              </h3>
              {build.description && <p>{build.description}</p>}
              {build.note && (
                <span className="wb-build-note">{build.note}</span>
              )}
              <span className="wb-inline-link">
                {build.action}
                <ExternalLink size={13} />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
      <Link to="/builds" className="wb-inline-link">
        Explore all products, tools & experiments <ArrowUpRight size={16} />
      </Link>
    </section>
  );
}
