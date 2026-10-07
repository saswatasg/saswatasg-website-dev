import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Boxes } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { trackEvent } from "@/utils/analytics";

const products = [
  {
    name: "DhanPlan.in",
    href: "https://www.dhanplan.in/",
    description: "Savings, withdrawals and retirement scenarios.",
    status: "Live",
    type: "finance",
    tone: "sage",
  },
  {
    name: "Meldstead.com",
    href: "https://meldstead.com/",
    description: "Tasks, docs and timelines in one workspace.",
    status: "Pre-launch audit",
    type: "workspace",
    tone: "blue",
  },
];
function ProductPreview({ type }) {
  return (
    <svg
      viewBox="0 0 132 120"
      aria-hidden="true"
      className={`wb-shelf-preview wb-shelf-${type}`}
    >
      <rect
        x="5"
        y="9"
        width="122"
        height="100"
        fill="var(--wb-paper)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M5 27h122" stroke="currentColor" strokeWidth="2" />
      {[13, 21, 29].map((x) => (
        <rect key={x} x={x} y="16" width="4" height="4" fill="currentColor" />
      ))}
      {type === "finance" ? (
        <>
          <path
            d="M19 42v52h95"
            fill="none"
            stroke="currentColor"
            strokeOpacity=".25"
          />
          {[24, 44, 64, 84].map((x, i) => (
            <rect
              className="wb-shelf-bar"
              key={x}
              x={x}
              y={78 - i * 10}
              width="12"
              height={16 + i * 10}
              fill={i === 3 ? "var(--wb-coral)" : "var(--wb-sage)"}
              stroke="currentColor"
            />
          ))}
          <path
            className="wb-shelf-curve"
            d="M20 70l20-3 22-14 20 4 25-18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <circle
            cx="107"
            cy="39"
            r="4"
            fill="var(--wb-gold)"
            stroke="currentColor"
          />
        </>
      ) : (
        <>
          {[17, 53, 89].map((x, i) => (
            <g key={x}>
              <rect
                x={x}
                y="39"
                width="26"
                height="4"
                fill="currentColor"
                opacity=".4"
              />
              <rect
                className="wb-shelf-task"
                x={x}
                y="50"
                width="26"
                height={i === 1 ? 36 : 23}
                fill={["var(--wb-clay)", "var(--wb-gold)", "var(--wb-sage)"][i]}
                stroke="currentColor"
              />
              <path
                d={`M${x + 5} 57h16M${x + 5} 63h10`}
                stroke="currentColor"
                opacity=".6"
              />
              {i !== 1 && (
                <rect
                  x={x}
                  y="80"
                  width="26"
                  height="18"
                  fill="var(--wb-blue)"
                  stroke="currentColor"
                />
              )}
            </g>
          ))}
        </>
      )}
    </svg>
  );
}
export default function ProductStrip() {
  const reduced = useReducedMotion();
  return (
    <motion.section
      className="wb-build-shelf"
      aria-labelledby="wb-build-shelf-title"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
    >
      <header className="wb-shelf-heading">
        <div>
          <span className="wb-label">
            <Boxes size={15} aria-hidden="true" /> FROM MY BUILD LAB
          </span>
          <h2 id="wb-build-shelf-title">Made to be used.</h2>
        </div>
        <Link to="/builds" className="wb-shelf-explore">
          Explore Builds <ArrowUpRight size={17} />
        </Link>
      </header>
      <div className="wb-shelf-products">
        {products.map((product) => (
          <a
            className={`wb-shelf-product wb-tone-${product.tone}`}
            key={product.name}
            href={product.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("homepage_builds", "open_product", product.name)
            }
          >
            <div className="wb-shelf-art">
              <ProductPreview type={product.type} />
            </div>
            <div className="wb-shelf-copy">
              <span
                className={`wb-shelf-status ${product.type === "finance" ? "is-live" : ""}`}
              >
                <i aria-hidden="true" />
                {product.status}
              </span>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span className="wb-shelf-open">
                Visit product <ArrowUpRight size={16} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </motion.section>
  );
}
