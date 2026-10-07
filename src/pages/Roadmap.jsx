import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import PageHeader, { PageEnd } from "@/components/workbench/PageHeader";
import { checkoutScenario } from "@/utils/checkoutScenario";

function Scenario() {
  const [values, setValues] = useState({
    starts: 10000,
    aov: 8000,
    abandonment: 73.1,
    reduction: 26,
  });
  const result = checkoutScenario(values);
  return (
    <section className="wb-surface mt-8">
      <span className="wb-label">EXPLORE A PRODUCT LEVER</span>
      <h2 className="mt-3">What could less checkout friction change?</h2>
      <p>
        A scenario using checkout starts, abandonment and an assumed relative
        reduction. Adjust the assumptions; this is a model, not a forecast.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          ["starts", "Monthly checkout starts", 0, undefined],
          ["aov", "Average order value (₹)", 0, undefined],
          ["abandonment", "Current abandonment (%)", 0, 100],
          ["reduction", "Relative reduction (%)", 0, 100],
        ].map(([id, label, min, max]) => (
          <div key={id}>
            <label htmlFor={`scenario-${id}`} className="text-xs font-bold">
              {label}
            </label>
            <input
              id={`scenario-${id}`}
              type="number"
              min={min}
              max={max}
              step={id === "abandonment" || id === "reduction" ? 0.1 : 1}
              value={values[id]}
              onChange={(e) => setValues({ ...values, [id]: e.target.value })}
              className="mt-2 w-full border px-3 py-2"
            />
          </div>
        ))}
      </div>
      <div className="wb-about-facts" aria-live="polite">
        <div>
          <strong>{result.recoveredOrders.toLocaleString("en-IN")}</strong>
          <span>Additional orders / month</span>
        </div>
        <div>
          <strong>₹{result.recoveredRevenue.toLocaleString("en-IN")}</strong>
          <span>Modeled order value / month</span>
        </div>
        <div>
          <strong>{result.resultingAbandonment.toFixed(1)}%</strong>
          <span>Resulting abandonment</span>
        </div>
      </div>
      <p className="text-sm">
        Assumes unchanged order value and that the modeled reduction translates
        into completed orders. Revenue is before costs, returns and attribution
        adjustments.
      </p>
      <div className="wb-role-links">
        <Link to="/case-studies/cart-checkout">
          Read the actual Sierra Living Concepts case ↗
        </Link>
      </div>
    </section>
  );
}
export default function Roadmap() {
  return (
    <>
      <PageMeta
        title="On the Bench | Saswata S. Sengupta"
        description="Current work, working products and future explorations, with delivery stages made clear. Includes an adjustable checkout scenario."
      />
      <div className="wb-page">
        <PageHeader
          label="On the bench"
          variant="roadmap"
          title="Working ideas. Open questions."
          description="A snapshot of what I’m building and exploring. Product stages matter more than a list of promised launch dates."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            [
              "Client work",
              "Upcore Technologies",
              "Discovery, solution definition and delivery ownership across 23+ clients. Inventory Leveling is a working client demo using mock data.",
              "/case-studies/upcore-discovery",
              "Explore the delivery work",
            ],
            [
              "Independent products",
              "DhanPlan & Meldstead",
              "DhanPlan is in production. Meldstead is live for pre-launch audit, with tasks, docs, whiteboards and timelines.",
              "/builds",
              "Explore products and prototypes",
            ],
            [
              "Explorations",
              "Models & experiments",
              "FilmRisk.AI, Topshe, 11 PM Cinema and Intent explore different product questions. Intent remains a prototype without a confirmed public launch date.",
              "/builds",
              "Explore the build lab",
            ],
          ].map(([label, title, copy, to, action]) => (
            <section key={label} className="wb-surface">
              <span className="wb-label">{label}</span>
              <h2 className="mt-4">{title}</h2>
              <p className="mt-4">{copy}</p>
              <div className="wb-role-links">
                <Link to={to}>{action} ↗</Link>
              </div>
            </section>
          ))}
        </div>
        <Scenario />
        <PageEnd />
      </div>
    </>
  );
}
