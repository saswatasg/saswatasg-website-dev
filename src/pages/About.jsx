import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  GraduationCap,
  Compass,
  Wrench,
  Users,
  Award,
} from "lucide-react";
import PageMeta from "@/components/PageMeta";
import { PageEnd } from "@/components/workbench/PageHeader";
const lenses = [
  {
    icon: Compass,
    title: "Ask a better question.",
    text: "Start with the workflow, the person and the evidence. Make the problem clear enough to choose what deserves attention.",
    link: "/case-studies/upcore-discovery",
    action: "Discovery & delivery",
    tone: "blue",
  },
  {
    icon: Users,
    title: "Make the decision shared.",
    text: "Connect customer needs, business constraints and engineering reality. Give everyone a clear reason for the next step.",
    link: "/case-studies/livekeeping-compliance-gap",
    action: "A workflow investigation",
    tone: "sage",
  },
  {
    icon: Wrench,
    title: "Stay close to the build.",
    text: "Working prototypes expose the details a presentation can miss. I build, coordinate delivery and use what happens next to refine the idea.",
    link: "/builds",
    action: "Products & experiments",
    tone: "gold",
  },
];
export default function About() {
  const reduced = useReducedMotion();
  return (
    <>
      <PageMeta
        title="About | Saswata S. Sengupta"
        description="Saswata Subhra Sengupta: an engineer turned product manager and hands-on builder. IIT Jodhpur MBA, based in Kolkata."
      />
      <div className="wb-page wb-about-redesign">
        <header className="wb-about-intro">
          <div>
            <nav className="wb-breadcrumb" aria-label="Breadcrumb">
              <Link to="/workbench">Workbench</Link>
              <span>/</span>
              <span>About</span>
            </nav>
            <span className="wb-label">A LITTLE CONTEXT</span>
            <h1>
              A product mind.
              <br />
              <em>A builder’s instinct.</em>
            </h1>
            <p className="wb-about-lede">
              I’m Saswata Subhra Sengupta—an engineer turned product manager,
              based in Kolkata.
            </p>
            <p>
              I like understanding how things work, finding where they break,
              and making the next version useful. That curiosity has taken me
              from mechanical engineering to product discovery, growth and
              building software.
            </p>
            <div className="wb-role-links">
              <Link to="/experience">
                My professional journey <ArrowUpRight size={16} />
              </Link>
              <a
                href="/assets/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <motion.figure
            className="wb-about-person"
            initial={reduced ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="wb-about-person-art">
              <span className="wb-about-orbit" />
              <img
                src="/assets/worlds/portrait-workbench.png"
                width="1254"
                height="1254"
                alt="Saswata wearing round glasses and a black shirt"
              />
            </div>
            <figcaption>
              <strong>Saswata S. Sengupta</strong>
              <span>Kolkata, India · Product & building</span>
            </figcaption>
          </motion.figure>
        </header>
        <section className="wb-about-story" aria-labelledby="about-story">
          <span className="wb-label">THE THREAD THROUGH IT ALL</span>
          <h2 id="about-story">
            Systems, people,
            <br />
            and the space between.
          </h2>
          <div>
            <p>
              Engineering taught me to look at dependencies and constraints. My
              MBA at IIT Jodhpur brought customers, markets and business
              decisions into that picture.
            </p>
            <p>
              At Sierra Living Concepts, I worked on the buying journey. At
              LiveKeeping (IndiaMART), I investigated compliance workflows and
              adoption. Today, at Upcore Technologies, I derive solutions and
              manage delivery end to end for 23+ clients.
            </p>
            <p>
              Alongside that work, DhanPlan and Meldstead give me room to take
              an idea from a question to a working product.
            </p>
          </div>
        </section>
        <section aria-labelledby="about-lenses">
          <div className="wb-section-title">
            <h2 id="about-lenses">The way I approach a problem.</h2>
            <span>Three connected habits</span>
          </div>
          <div className="wb-about-lenses">
            {lenses.map(
              ({ icon: Icon, title, text, link, action, tone }, i) => (
                <motion.article
                  key={title}
                  className={`wb-about-lens wb-tone-${tone}`}
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="wb-about-lens-top">
                    <Icon size={30} />
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <Link to={link}>
                    {action}
                    <ArrowUpRight size={16} />
                  </Link>
                </motion.article>
              ),
            )}
          </div>
        </section>
        <section
          className="wb-about-foundations"
          aria-labelledby="about-foundation"
        >
          <div className="wb-section-title">
            <h2 id="about-foundation">A foundation that keeps expanding.</h2>
          </div>
          <div className="wb-about-education-path">
            <article>
              <span className="wb-label">2017–2021 / ENGINEERING</span>
              <GraduationCap size={30} />
              <h3>
                Jalpaiguri Government
                <br />
                Engineering College
              </h3>
              <p>B.Tech · Mechanical Engineering</p>
              <span className="wb-education-lens">
                Systems. Constraints. First principles.
              </span>
            </article>
            <article>
              <span className="wb-label">2022–2024 / MANAGEMENT</span>
              <GraduationCap size={30} />
              <h3>
                Indian Institute of
                <br />
                Technology Jodhpur
              </h3>
              <p>MBA · Marketing & Analytics</p>
              <span className="wb-education-lens">
                Customers. Evidence. Business decisions.
              </span>
            </article>
          </div>
          <div className="wb-about-learning">
            <div>
              <span className="wb-label">CONTINUED LEARNING</span>
              <h3>
                Useful knowledge,
                <br />
                put into practice.
              </h3>
            </div>
            <dl>
              <div>
                <dt>Applied AI</dt>
                <dd>
                  Anthropic Academy coursework in Claude and AI workflows.
                </dd>
              </div>
              <div>
                <dt>Analytics & growth</dt>
                <dd>
                  Google Skillshop credentials in analytics, advertising and
                  conversion optimization.
                </dd>
              </div>
              <div>
                <dt>Product operations</dt>
                <dd>Zoho CRM administrator training.</dd>
              </div>
            </dl>
          </div>
          <div className="wb-about-recognition">
            <Award size={24} />
            <div>
              <h3>Tata Imagination Challenge</h3>
              <p>National semifinalist</p>
            </div>
            <div>
              <h3>Learning goes both ways.</h3>
              <p>I informally mentor 5–6 early-career professionals.</p>
            </div>
          </div>
        </section>
        <section className="wb-about-personal">
          <span className="wb-label">OFF THE CLOCK</span>
          <h2>
            Still curious,
            <br />
            after the laptop closes.
          </h2>
          <p>
            Stories, films and everyday observations are part of who I am.
            There’s a little more of that in Adda.
          </p>
          <Link to="/adda" className="wb-page-button">
            Step into Adda <ArrowUpRight size={17} />
          </Link>
        </section>
        <PageEnd title="A good conversation starts with a question." />
      </div>
    </>
  );
}
