import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import PageMeta from "@/components/PageMeta";
import PageHeader, { PageEnd } from "@/components/workbench/PageHeader";

const competencies = [
  [
    "Discovery & product judgment",
    "Client conversations, workflow analysis, opportunity framing and evidence-based prioritization.",
  ],
  [
    "Solution design & delivery",
    "Translate a problem into a solution, align stakeholders and coordinate engineering through delivery.",
  ],
  [
    "Analytics & growth",
    "Funnel instrumentation, session analysis, experimentation and lifecycle or acquisition improvements.",
  ],
  [
    "Hands-on product building",
    "Working demos and independent products that make ideas inspectable, testable and useful.",
  ],
];
export default function About() {
  const reduced = useReducedMotion();
  return (
    <>
      <PageMeta
        title="About | Saswata S. Sengupta"
        description="Product discovery, solution design and delivery across enterprise AI, B2B SaaS and commerce. IIT Jodhpur MBA, based in Kolkata."
      />
      <div className="wb-page">
        <PageHeader
          label="About"
          variant="about"
          title="Curiosity, with a direction."
          description="I’m Saswata Subhra Sengupta. I work where a messy business problem needs a clear product decision—and someone to carry it through delivery."
        />
        <div className="wb-about-grid">
          <section className="wb-surface">
            <span className="wb-label">ENGINEERING → PRODUCT</span>
            <h2>Understand the system. Understand the person.</h2>
            <p>
              Mechanical engineering gave me a foundation in systems and
              constraints. An MBA in Marketing & Analytics at IIT Jodhpur
              brought the customer, the business and the decision into focus.
            </p>
            <p>
              At Sierra Living Concepts, I worked on the purchase journey and
              growth roadmap for a US furniture business. At LiveKeeping
              (IndiaMART), I investigated compliance workflows and feature
              adoption. At Upcore Technologies, I derive solutions and manage
              delivery end to end for 23+ clients.
            </p>
            <p>
              Alongside those roles, I build independent products such as
              DhanPlan and Meldstead. Building helps me test the detail behind a
              product idea.
            </p>
            <div className="wb-role-links">
              <Link to="/experience">Follow the professional journey ↗</Link>
              <Link to="/work">Explore the work ↗</Link>
            </div>
          </section>
          <motion.figure
            className="wb-about-portrait"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="/assets/worlds/portrait-workbench.png"
              alt="Saswata wearing round glasses and a black shirt"
              width="1254"
              height="1254"
            />
            <figcaption className="sr-only">Based in Kolkata, India</figcaption>
          </motion.figure>
        </div>
        <div className="wb-about-facts">
          {[
            ["23+", "Upcore clients · Delivery scope"],
            ["B.Tech + MBA", "Engineering & management"],
            ["Kolkata", "Based in India"],
          ].map(([v, l]) => (
            <div className="wb-surface" key={l}>
              <strong>{v}</strong>
              <span>{l}</span>
            </div>
          ))}
        </div>
        <div className="wb-section-title">
          <h2>What I bring to the work.</h2>
          <span>Four complementary strengths</span>
        </div>
        <div className="wb-competencies">
          {competencies.map(([t, d], i) => (
            <motion.section
              key={t}
              className="wb-surface"
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <span className="wb-label">0{i + 1}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </motion.section>
          ))}
        </div>
        <div className="wb-section-title">
          <h2>Foundations & continued learning.</h2>
        </div>
        <div className="wb-education">
          <section className="wb-surface">
            <span className="wb-label">EDUCATION</span>
            <h3>Indian Institute of Technology Jodhpur</h3>
            <p>MBA · Marketing & Analytics · 2022–2024</p>
            <h3 className="mt-6">Jalpaiguri Government Engineering College</h3>
            <p>B.Tech · Mechanical Engineering · 2017–2021</p>
          </section>
          <section className="wb-surface">
            <span className="wb-label">SELECTED LEARNING & RECOGNITION</span>
            <h3>Applied learning, kept current.</h3>
            <p>
              Anthropic Academy coursework in Claude and applied AI; Google
              Skillshop credentials in analytics, performance advertising and
              conversion optimization; Zoho CRM administrator training.
            </p>
            <p>
              Tata Imagination Challenge national semifinalist. I also
              informally mentor 5–6 early-career professionals.
            </p>
          </section>
        </div>
        <section className="wb-surface mt-6">
          <span className="wb-label">THE PERSONAL SIDE</span>
          <h2 className="mt-3">There’s more to a person than their roadmap.</h2>
          <p>
            Films, stories, photography and the everyday things I’m curious
            about live in Adda.
          </p>
          <div className="wb-role-links">
            <Link to="/adda">Step into Adda ↗</Link>
          </div>
        </section>
        <PageEnd />
      </div>
    </>
  );
}
