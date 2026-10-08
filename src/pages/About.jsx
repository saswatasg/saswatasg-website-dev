import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Compass,
  Wrench,
  Users,
  GraduationCap,
  Award,
  BookOpen,
} from "lucide-react";
import PageMeta from "@/components/PageMeta";
import { PageEnd } from "@/components/workbench/PageHeader";
const chapters = [
  {
    company: "Understand the actual problem",
    field: "Product judgment",
    question: "Start with the workflow, not the promise of AI.",
    story:
      "At Upcore Technologies, I connect client conversations with workflow constraints and opportunity priorities. A request for AI starts the conversation; understanding what the solution needs to change gives the team a useful brief.",
    proof: "Research → decision",
    detail: "Customer evidence, scope and priorities",
    to: "/case-studies/upcore-discovery",
    tone: "blue",
    icon: Compass,
  },
  {
    company: "Keep the team connected",
    field: "Collaboration & delivery",
    question: "A good decision needs a shared path to delivery.",
    story:
      "I connect solution definition with engineering coordination, backlog priorities and client expectations. Ownership means staying involved as requirements become a working solution.",
    proof: "Decision → delivery",
    detail: "Scope, dependencies and delivery coordination",
    to: "/experience",
    tone: "sage",
    icon: Users,
  },
  {
    company: "Stay close to what happens next",
    field: "Learning from use",
    question: "Fix the step behind the metric.",
    story:
      "In Sierra Living Concepts’ checkout work, I connected funnel drop-offs with session evidence before changing fields, validation and trust cues. The useful lesson: a headline number tells you where to investigate; the workflow tells you what to change.",
    proof: "Delivery → learning",
    detail: "Observed behavior and measurable outcomes",
    to: "/case-studies/cart-checkout",
    tone: "clay",
    icon: Wrench,
  },
];
export default function About() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const chapter = chapters[selected];
  const Icon = chapter.icon;
  return (
    <>
      <PageMeta
        title="About | Saswata S. Sengupta"
        description="Saswata Subhra Sengupta: product manager working across enterprise AI, SaaS and commerce. Discovery, solution delivery and hands-on product building."
      />
      <div className="wb-page wb-about-new">
        <header className="wb-about-intro">
          <div>
            <nav className="wb-breadcrumb" aria-label="Breadcrumb">
              <Link to="/workbench">Workbench</Link>
              <span>/ About</span>
            </nav>
            <span className="wb-label">THE PERSON BEHIND THE WORK</span>
            <h1>
              Curious enough
              <br />
              to ask.
              <br />
              <em>
                Hands-on enough
                <br />
                to build.
              </em>
            </h1>
            <p className="wb-about-lede">
              I’m Saswata Subhra Sengupta. I work in product, where customer
              problems meet decisions, teams and working solutions.
            </p>
            <p>
              Across enterprise AI, SaaS and commerce, I stay with the
              question—from understanding the workflow to delivering what comes
              next.
            </p>
            <div className="wb-role-links">
              <Link to="/experience">
                The professional journey <ArrowUpRight size={16} />
              </Link>
              <Link to="/builds">
                What I’m building <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
          <motion.figure
            className="wb-about-person"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="wb-about-person-art">
              <span className="wb-about-orbit" />
              <span className="wb-about-photo-note">
                ALWAYS ASKING
                <br />
                ONE MORE QUESTION ↗
              </span>
              <img
                src="/assets/worlds/portrait-workbench.png"
                width="1254"
                height="1254"
                alt="Saswata wearing round glasses and a black shirt"
              />
            </div>
            <figcaption>
              <strong>Saswata S. Sengupta</strong>
              <span>Kolkata, India</span>
            </figcaption>
          </motion.figure>
        </header>
        <section className="wb-about-chapters" aria-labelledby="about-contexts">
          <div className="wb-section-title">
            <span className="wb-label">THE JUDGMENT BEHIND THE WORK</span>
            <h2 id="about-contexts">What I pay attention to.</h2>
          </div>
          <div className="wb-chapter-layout">
            <div
              className="wb-chapter-tabs"
              aria-label="Explore my product approach"
            >
              {chapters.map((item, i) => (
                <button
                  key={item.company}
                  aria-pressed={selected === i}
                  aria-controls="about-chapter-panel"
                  onClick={() => setSelected(i)}
                  className={`wb-tone-${item.tone}`}
                >
                  <span>0{i + 1}</span>
                  <div>
                    <strong>{item.company}</strong>
                    <small>{item.field}</small>
                  </div>
                  <ArrowUpRight size={20} />
                </button>
              ))}
            </div>
            <div
              id="about-chapter-panel"
              className={`wb-chapter-panel wb-tone-${chapter.tone}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={chapter.company}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className="wb-chapter-panel-top">
                    <Icon size={32} />
                    <span className="wb-label">{chapter.field}</span>
                  </div>
                  <h3>{chapter.question}</h3>
                  <p>{chapter.story}</p>
                  <div className="wb-chapter-proof wb-approach-principle">
                    <strong>{chapter.proof}</strong>
                    <span>{chapter.detail}</span>
                  </div>
                  <Link className="wb-inline-link" to={chapter.to}>
                    See it in practice <ArrowUpRight size={17} />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
        <section
          className="wb-about-builder"
          aria-labelledby="about-collaboration"
        >
          <div>
            <span className="wb-label">WORKING TOGETHER</span>
            <h2 id="about-collaboration">Make the next decision clearer.</h2>
            <p>
              I bring research, product judgment and delivery coordination into
              the same conversation. Whether it starts with a client request or
              a confusing workflow, I want the team to understand the problem,
              the tradeoff and the next step.
            </p>
            <Link className="wb-inline-link" to="/contact">
              Start a conversation <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="wb-builder-stack">
            <Link to="/work">
              <span className="wb-label">DECISIONS IN CONTEXT</span>
              <strong>See the work</strong>
              <span>
                Problems, choices and evidence <ArrowUpRight size={17} />
              </span>
            </Link>
            <Link to="/builds">
              <span className="wb-label">HANDS-ON PRODUCT BUILDING</span>
              <strong>Explore Builds</strong>
              <span>
                Ideas tested through working products <ArrowUpRight size={17} />
              </span>
            </Link>
          </div>
        </section>
        <section
          className="wb-about-foundation-new"
          aria-labelledby="about-foundations"
        >
          <div className="wb-section-title">
            <span className="wb-label">THE FOUNDATION, STILL GROWING</span>
            <h2 id="about-foundations">
              Learning that earns its place in the work.
            </h2>
          </div>
          <div className="wb-foundation-grid">
            <article className="wb-tone-blue">
              <GraduationCap size={28} />
              <span className="wb-label">2022–2024</span>
              <h3>IIT Jodhpur</h3>
              <p>MBA · Marketing & Analytics</p>
            </article>
            <article className="wb-tone-sage">
              <GraduationCap size={28} />
              <span className="wb-label">2017–2021</span>
              <h3>Jalpaiguri Government Engineering College</h3>
              <p>B.Tech · Mechanical Engineering</p>
            </article>
            <article className="wb-tone-gold">
              <Award size={28} />
              <span className="wb-label">RECOGNITION & SHARING</span>
              <h3>Tata Imagination Challenge</h3>
              <p>
                National semifinalist. I also informally mentor 5–6 early-career
                professionals.
              </p>
            </article>
          </div>
          <details className="wb-learning-details">
            <summary>
              <BookOpen size={20} /> The learning continues{" "}
              <span>Applied AI · Analytics · Product operations</span>
            </summary>
            <div>
              <p>
                <strong>Applied AI</strong> — Anthropic Academy coursework in
                Claude and AI workflows.
              </p>
              <p>
                <strong>Analytics & growth</strong> — Google Skillshop
                credentials in analytics, advertising and conversion
                optimization.
              </p>
              <p>
                <strong>Product operations</strong> — Zoho CRM administrator
                training.
              </p>
            </div>
          </details>
        </section>
        <section className="wb-about-personal">
          <span className="wb-label">THERE’S A PERSONAL SIDE, TOO</span>
          <h2>
            Curiosity doesn’t
            <br />
            clock out.
          </h2>
          <p>
            Stories, films and everyday observations. Adda is where that side of
            me lives.
          </p>
          <Link to="/adda" className="wb-page-button">
            Step into Adda <ArrowUpRight size={17} />
          </Link>
        </section>
        <PageEnd title="What question are you working on?" />
      </div>
    </>
  );
}
