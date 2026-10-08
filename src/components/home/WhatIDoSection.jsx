import React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Search,
  Compass,
  GitPullRequest,
  BarChart3,
  Check,
  RotateCcw,
  Pause,
  Play,
} from "lucide-react";

import useTimedSlides from "@/hooks/useTimedSlides";

const steps = [
  {
    name: "Investigate",
    short: "Understand the friction before proposing a fix.",
    icon: Search,
    color: "var(--wb-sage)",
    question: "Where does the journey break?",
    description:
      "Map user workflows, instrument the funnel and look at the sessions behind the numbers. Separate the symptom from the problem worth solving.",
    output: "Funnel map + ranked hypotheses",
    collaboration: "User research · GA4 / GTM · Session analysis",
    link: "data-deep-dive-method",
    linkLabel: "See the discovery method",
    kind: "blog",
  },
  {
    name: "Align",
    short: "Make the next decision clear to everyone.",
    icon: Compass,
    color: "var(--wb-gold)",
    question: "What deserves to be built next?",
    description:
      "Bring user needs, business goals and technical constraints into one conversation. Prioritize the opportunity and define what success will look like.",
    output: "Product brief + success criteria",
    collaboration: "Prioritization · Design & engineering alignment",
    link: "discovery-to-roadmap",
    linkLabel: "From discovery to roadmap",
    kind: "blog",
  },
  {
    name: "Ship",
    short: "Turn the decision into something people can use.",
    icon: GitPullRequest,
    color: "var(--wb-clay)",
    question: "How do we make the idea useful?",
    description:
      "Translate the brief into buildable specs, work through the edge cases and keep design, engineering and growth moving toward the same release.",
    output: "Buildable specs + a measured release",
    collaboration: "UX flows · AI architecture · Cross-functional delivery",
    link: "livekeeping-notifications",
    linkLabel: "See a system I shipped",
    kind: "case-studies",
  },
  {
    name: "Measure",
    short: "Read the outcome. Use it to ask a better question.",
    icon: BarChart3,
    color: "var(--wb-blue)",
    question: "Did the change move the right number?",
    description:
      "Compare the result with the baseline, inspect the funnel and feed the learning back into the next iteration. Shipping starts the feedback loop.",
    output: "Outcome readout + next experiment",
    collaboration: "Funnel analysis · A/B testing · Growth iteration",
    link: "cart-checkout",
    linkLabel: "See the before and after",
    kind: "case-studies",
  },
];
function WorkingGraphic({ index, reduced }) {
  return (
    <div
      className={`wb-process-art wb-process-art-${index}`}
      aria-hidden="true"
    >
      <span className="wb-art-label">
        {
          [
            "TRACE THE JOURNEY",
            "MAKE THE TRADE-OFF",
            "CONNECT THE TEAM",
            "CLOSE THE LOOP",
          ][index]
        }
      </span>
      {index === 0 ? (
        <div className="wb-funnel-sketch">
          {["Entry", "Intent", "Checkout"].map((label, i) => (
            <div key={label}>
              <span>{label}</span>
              <motion.div
                initial={reduced ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ width: `${100 - i * 23}%` }}
              >
                <i />
                <i />
                <i />
              </motion.div>
            </div>
          ))}
          <span className="wb-art-annotation">↗ Start with the friction.</span>
        </div>
      ) : index === 1 ? (
        <div className="wb-priority-sketch">
          <div className="wb-priority-axis">USER VALUE ↑</div>
          <div className="wb-priority-grid">
            <span className="wb-priority-dot">Explore</span>
            <motion.span
              className="wb-priority-dot wb-priority-chosen"
              initial={reduced ? false : { scale: 0.7, rotate: -8 }}
              animate={{ scale: 1, rotate: -3 }}
              transition={{ type: "spring", damping: 14 }}
            >
              Build next <ArrowUpRight size={14} />
            </motion.span>
            <span className="wb-priority-dot">Revisit</span>
            <span className="wb-priority-dot">Simplify</span>
          </div>
          <span className="wb-priority-bottom">CONFIDENCE →</span>
        </div>
      ) : index === 2 ? (
        <div className="wb-shipping-sketch">
          {["Brief", "Design", "Build", "Release"].map((label, i) => (
            <motion.div
              key={label}
              initial={reduced ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <span>0{i + 1}</span>
              <strong>{label}</strong>
              <Check size={15} />
            </motion.div>
          ))}
          <span className="wb-art-annotation">
            One shared definition of done.
          </span>
        </div>
      ) : (
        <div className="wb-readout-sketch">
          <svg viewBox="0 0 320 120">
            <path
              d="M12 100H310M12 12V100"
              stroke="currentColor"
              opacity=".2"
              fill="none"
            />
            <path
              d="M12 76H310"
              stroke="currentColor"
              strokeDasharray="4 5"
              fill="none"
              opacity=".4"
            />
            <motion.path
              d="M14 85L65 79L104 83L151 51L189 58L235 27L303 15"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: reduced ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8 }}
            />
            <circle cx="303" cy="15" r="5" fill="currentColor" />
          </svg>
          <div>
            <span>Baseline</span>
            <span>Change</span>
            <span>Readout ↗</span>
          </div>
          <span className="wb-art-annotation">
            A result is a new starting point.
          </span>
        </div>
      )}
      <span className="wb-art-caption">
        PROCESS SKETCH / {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}
export default function WhatIDoSection() {
  const timer = useTimedSlides(steps.length, 4500);
  const { index: active } = timer;
  const root = timer.ref;
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const pointer = useMotionValue(0);
  const tilt = useSpring(pointer, { stiffness: 120, damping: 24 });
  const angle = useTransform(tilt, [-1, 1], [-1.5, 1.5]);
  const step = steps[active];
  const Icon = step.icon;
  return (
    <section
      ref={root}
      {...timer.bindings}
      id="work-section"
      className="wb-process"
      aria-labelledby="wb-process-title"
    >
      <div className="wb-section-heading wb-process-heading">
        <div>
          <span className="wb-label">HOW I WORK</span>
          <h2 id="wb-process-title">
            Find the signal.
            <br />
            <em>Build what matters.</em>
          </h2>
        </div>
        <p>
          A practical loop from the first question to the next iteration. Here’s
          what I bring to each stage.
        </p>
      </div>
      <div className="wb-process-workspace">
        <div
          className="wb-process-nav"
          data-slide-controls
          role="group"
          aria-label="Explore my working process"
        >
          <div className="wb-process-track" aria-hidden="true">
            <motion.span style={{ scaleY: reduced ? 1 : progress }} />
          </div>
          {steps.map((item, i) => {
            const StepIcon = item.icon;
            return (
              <button
                key={item.name}
                className="wb-process-step"
                aria-pressed={active === i}
                aria-controls="wb-process-detail"
                onClick={() => {
                  timer.select(i);
                  timer.setPaused(true);
                }}
                style={{ "--step-color": item.color }}
              >
                <span className="wb-process-index">0{i + 1}</span>
                <div>
                  <span className="wb-process-step-title">
                    <StepIcon size={17} />
                    {item.name}
                    <ArrowUpRight size={16} />
                  </span>
                  <p>{item.short}</p>
                </div>
              </button>
            );
          })}
          <div className="wb-process-loop">
            <RotateCcw size={15} />
            <span>Learn. Refine. Go again.</span>
            {!reduced && (
              <button
                className="wb-process-play"
                onClick={() => timer.setPaused((p) => !p)}
                aria-pressed={!timer.paused}
                aria-label={
                  timer.paused
                    ? "Play working process"
                    : "Pause working process"
                }
              >
                {timer.paused ? <Play size={14} /> : <Pause size={14} />}{" "}
                {timer.paused ? "Play" : "Pause"}
              </button>
            )}
          </div>
        </div>
        <motion.div
          id="wb-process-detail"
          className="wb-process-detail"
          style={{
            backgroundColor: step.color,
            rotateY: reduced ? 0 : angle,
            transformPerspective: 1000,
          }}
          onPointerMove={(event) => {
            if (reduced || event.pointerType !== "mouse") return;
            const rect = event.currentTarget.getBoundingClientRect();
            pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
          }}
          onPointerLeave={() => pointer.set(0)}
        >
          <div
            className="wb-slide-progress wb-process-countdown"
            aria-hidden="true"
          >
            <motion.span style={{ scaleX: timer.progress }} />
          </div>
          <motion.div
            key={active}
            className="wb-process-detail-inner"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="wb-process-detail-top">
              <span className="wb-label">
                <Icon size={14} /> {step.name.toUpperCase()} / 0{active + 1}
              </span>
              <span className="wb-label">THE WORKING NOTES</span>
            </div>
            <h3>{step.question}</h3>
            <p className="wb-process-description">{step.description}</p>
            <WorkingGraphic index={active} reduced={reduced} />
            <div className="wb-process-output">
              <span className="wb-label">WHAT COMES OUT</span>
              <strong>{step.output}</strong>
              <p>{step.collaboration}</p>
            </div>
            <Link to={`/${step.kind}/${step.link}`} className="wb-inline-link">
              {step.linkLabel}
              <ArrowUpRight size={17} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <div className="wb-process-bottom">
        <Link to="/experience" className="wb-button wb-button-paper">
          My professional journey <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}
