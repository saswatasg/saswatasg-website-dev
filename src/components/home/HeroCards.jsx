import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import useTimedSlides from "@/hooks/useTimedSlides";
import SlideControls from "./SlideControls";
const approaches = [
  {
    label: "PRODUCT MANAGER · AI & GROWTH",
    first: ["Find the", "problem."],
    last: ["Ship the", "outcome."],
    copy: "I find the problem nobody’s measuring, then ship the fix that moves the number that matters.",
    pin: "01 / DISCOVER → DELIVER",
  },
  {
    label: "ANALYTICS · PRODUCT DISCOVERY",
    first: ["Ask better", "questions."],
    last: ["Find the", "signal."],
    copy: "Instrument the journey. Follow the friction. Turn a strong hypothesis into a clear next move.",
    pin: "02 / EVIDENCE BEFORE OPINION",
  },
  {
    label: "AI PRODUCTS · HANDS-ON BUILDING",
    first: ["Make it", "useful."],
    last: ["Then make", "it real."],
    copy: "From browser voice AI to lead-scoring systems: build around the problem, test it in the real world.",
    pin: "03 / EXPLORE → BUILD → LEARN",
  },
  {
    label: "CROSS-FUNCTIONAL · EXECUTION",
    first: ["Connect", "the dots."],
    last: ["Move the", "work."],
    copy: "Bring product, design, engineering and growth together around a decision everyone can act on.",
    pin: "04 / CLARITY IS A TEAM SPORT",
  },
];
const outcomes = [
  {
    label: "Clients · Solution delivery",
    value: "23+",
    company: "Upcore Technologies",
    copy: "Derive the solution. Manage delivery end to end.",
    to: "/case-studies/upcore-discovery",
    pin: "DISCOVERY → DELIVERY",
    color: "var(--wb-gold)",
    path: "M3 36H58L90 26H140L175 6H237",
    endY: 6,
  },
  {
    label: "Feature engagement",
    value: "+168%",
    company: "LiveKeeping (IndiaMART)",
    copy: "AI-powered greetings revive a dormant feature.",
    to: "/case-studies/livekeeping-send-greetings",
    pin: "USEFUL AI",
    color: "var(--wb-blue)",
    path: "M3 36L58 30L90 34L140 18L175 24L237 6",
    endY: 6,
  },
  {
    label: "Checkout abandonment",
    value: "73% → 54%",
    company: "Sierra Living Concepts",
    copy: "Instrument the funnel. Remove the friction.",
    to: "/case-studies/cart-checkout",
    pin: "COMMERCE UX",
    color: "var(--wb-sage)",
    path: "M3 6H58L90 18H140L175 36H237",
    endY: 36,
  },
  {
    label: "Connected project workspace",
    value: "One space",
    company: "Meldstead · Independent build",
    copy: "Tasks, docs, whiteboards and timelines.",
    to: "https://meldstead.com/",
    external: true,
    pin: "HANDS-ON BUILDING",
    color: "var(--wb-clay)",
    path: "M3 22H50L65 7L80 37L95 14L110 29L125 10L140 34L155 22H237",
    endY: 22,
  },
];

function Shift({ children, id, reduced, className }) {
  return (
    <motion.div
      key={id}
      className={`wb-comic-shift ${className || ""}`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: -9, skewX: -4 }}
      animate={
        reduced
          ? { opacity: 1 }
          : {
              opacity: [0.5, 1, 0.85, 1],
              x: [-9, 5, -3, 0],
              skewX: [-4, 2, -1, 0],
            }
      }
      transition={{ duration: reduced ? 0.15 : 0.38, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
}
export function PositionCard() {
  const timer = useTimedSlides(4, 5200);
  const item = approaches[timer.index];
  return (
    <div
      ref={timer.ref}
      className="wb-position-panel wb-rotating-position"
      {...timer.bindings}
    >
      <Shift
        id={timer.index}
        reduced={timer.reduced}
        className="wb-position-slide"
      >
        <span className="wb-label">{item.label}</span>
        <h2>
          {item.first.map((line) => (
            <React.Fragment key={line}>
              {line}
              <br />
            </React.Fragment>
          ))}
          <em>
            {item.last[0]}
            <br />
            {item.last[1]}
          </em>
        </h2>
        <p>{item.copy}</p>
        <span className="wb-card-pin">{item.pin}</span>
      </Shift>
      <SlideControls
        timer={timer}
        labels={[
          "problem to outcome",
          "product discovery",
          "building AI products",
          "cross-functional execution",
        ]}
        name="approach slideshow"
      />
    </div>
  );
}
export function OutcomeCard() {
  const timer = useTimedSlides(4, 4600);
  const item = outcomes[timer.index];
  return (
    <div
      ref={timer.ref}
      className="wb-outcome-panel wb-rotating-outcome"
      style={{ backgroundColor: item.color }}
      {...timer.bindings}
    >
      <span className="wb-label">A FEW THINGS I’VE WORKED ON.</span>
      <Shift id={timer.index} reduced={timer.reduced}>
        <Link
          to={item.to}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          className="wb-outcome-slide"
        >
          <span className="wb-card-pin">{item.pin} ↗</span>
          <strong className="wb-outcome-number">{item.value}</strong>
          <strong className="wb-outcome-topic">{item.label}</strong>
          <span className="wb-outcome-description">
            {item.company}
            <br />
            {item.copy}
          </span>
          <svg
            viewBox="0 0 240 44"
            className="wb-outcome-chart"
            aria-hidden="true"
          >
            <motion.path
              d={item.path}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              initial={{ pathLength: timer.reduced ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7 }}
            />
            <circle cx="237" cy={item.endY} r="4" fill="currentColor" />
          </svg>
          <span className="wb-inline-link">
            Explore the work <ArrowUpRight size={16} />
          </span>
        </Link>
      </Shift>
      <SlideControls
        timer={timer}
        labels={outcomes.map((item) => item.label)}
        name="outcome slideshow"
      />
    </div>
  );
}

// Interleave the four approaches and four outcomes in one compact mobile deck.
const mobileApproachCopy = [
  "Find the real friction. Ship the fix that moves the right number.",
  "Follow the evidence. Turn a strong hypothesis into a clear next move.",
  "Build around the problem. Test useful AI in the real world.",
  "Align product, design, engineering and growth around the next decision.",
];
const mobileOutcomeTitles = [
  "23+ clients · End-to-end delivery",
  "+168% feature engagement",
  "Checkout: 73% → 54%",
  "One connected workspace",
];
const mobileSlides = approaches.flatMap((approach, index) => [
  {
    label: approach.label,
    title: [...approach.first, ...approach.last].join(" "),
    copy: mobileApproachCopy[index],
    color: "var(--wb-surface)",
  },
  {
    ...outcomes[index],
    label: outcomes[index].company,
    title: mobileOutcomeTitles[index],
  },
]);

export function MobileHeroCard() {
  const timer = useTimedSlides(mobileSlides.length, 4500);
  const item = mobileSlides[timer.index];
  return (
    <div
      ref={timer.ref}
      className="wb-mobile-hero-deck"
      style={{ backgroundColor: item.color }}
      {...timer.bindings}
      aria-label="Product approach and selected outcomes"
    >
      <Shift
        id={timer.index}
        reduced={timer.reduced}
        className="wb-mobile-hero-slide"
      >
        <span className="wb-label">{item.label}</span>
        <h2>
          {item.to ? (
            <Link
              to={item.to}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
            >
              {item.title} <ArrowUpRight size={18} />
            </Link>
          ) : (
            item.title
          )}
        </h2>
        <p>{item.copy}</p>
      </Shift>
      <div
        className="wb-mobile-deck-controls"
        role="group"
        aria-label="Mobile hero slideshow controls"
      >
        <button
          aria-label="Previous hero card"
          onClick={() =>
            timer.select(
              (timer.index + mobileSlides.length - 1) % mobileSlides.length,
            )
          }
        >
          <ArrowLeft size={17} />
        </button>
        <span className="wb-slide-count">
          {String(timer.index + 1).padStart(2, "0")} / 08
        </span>
        <button
          aria-label={`${timer.paused || timer.reduced ? "Play" : "Pause"} mobile hero slideshow`}
          disabled={!!timer.reduced}
          onClick={() => timer.setPaused((value) => !value)}
        >
          {timer.paused || timer.reduced ? (
            <Play size={16} />
          ) : (
            <Pause size={16} />
          )}
        </button>
        <button
          aria-label="Next hero card"
          onClick={() => timer.select((timer.index + 1) % mobileSlides.length)}
        >
          <ArrowRight size={17} />
        </button>
      </div>
      <div className="wb-slide-progress" aria-hidden="true">
        <motion.span style={{ scaleX: timer.progress }} />
      </div>
    </div>
  );
}
