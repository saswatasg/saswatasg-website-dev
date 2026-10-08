import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Pause,
  Play,
  Milestone,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router-dom";
import useTimedSlides from "@/hooks/useTimedSlides";
export default function CareerTimeline({ roles }) {
  const order = [2, 1, 0];
  const entries = order.map((i) => roles[i]);
  const timer = useTimedSlides(entries.length, 4000, {
    initialIndex: entries.length - 1,
    initialPaused: true,
  });
  const { index: selected, reduced, paused, setPaused, progress } = timer;
  const playing = !paused && !reduced;
  const wireProgress = useTransform(
    progress,
    (value) => `${((selected + value) / entries.length) * 100}%`,
  );
  const buttons = useRef([]);
  const rail = useRef(null);
  useEffect(() => {
    if (
      !playing ||
      !rail.current ||
      rail.current.scrollWidth <= rail.current.clientWidth
    )
      return;
    const button = buttons.current[selected];
    if (button)
      rail.current.scrollTo({
        left: Math.max(
          0,
          button.offsetLeft -
            (rail.current.clientWidth - button.offsetWidth) / 2,
        ),
        behavior: reduced ? "auto" : "smooth",
      });
  }, [selected, playing, reduced]);
  const choose = (i, focus = false) => {
    setPaused(true);
    timer.select(i);
    if (focus) buttons.current[i]?.focus();
    buttons.current[i]?.scrollIntoView({
      block: "nearest",
      inline: "center",
      behavior: reduced ? "auto" : "smooth",
    });
  };
  const active = entries[selected];
  const tone = ["clay", "blue", "gold"][selected];
  return (
    <section
      ref={timer.ref}
      {...timer.bindings}
      className="wb-career-map"
      aria-labelledby="career-map-title"
    >
      <header className="wb-career-map-heading">
        <div>
          <span className="wb-label">
            <Milestone size={16} /> THE JOURNEY, AT A GLANCE
          </span>
          <h2 id="career-map-title">
            Different stages.
            <br />
            <em>Growing ownership.</em>
          </h2>
        </div>
        <div>
          <span className="wb-career-map-hint">
            Choose a chapter to explore
          </span>
          {!reduced && (
            <button
              className="wb-career-play"
              data-slide-controls
              onClick={() => setPaused((p) => !p)}
              aria-pressed={playing}
            >
              {playing ? <Pause size={15} /> : <Play size={15} />}{" "}
              {playing ? "Pause journey" : "Play journey"}
            </button>
          )}
        </div>
      </header>
      <div
        ref={rail}
        className="wb-career-track"
        data-slide-controls
        role="tablist"
        aria-label="Career chapters"
      >
        <div className="wb-career-wire" aria-hidden="true">
          <motion.span style={{ width: wireProgress }} />
        </div>
        {entries.map((role, i) => (
          <button
            key={role.company}
            ref={(node) => (buttons.current[i] = node)}
            role="tab"
            id={`career-tab-${i}`}
            aria-controls="career-chapter"
            aria-selected={selected === i}
            tabIndex={selected === i ? 0 : -1}
            onClick={() => choose(i)}
            onKeyDown={(event) => {
              let next;
              if (event.key === "ArrowRight") next = (i + 1) % entries.length;
              else if (event.key === "ArrowLeft") next = (i + entries.length - 1) % entries.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = entries.length - 1;
              if (next !== undefined) {
                event.preventDefault();
                choose(next, true);
              }
            }}
          >
            <span className="wb-career-node" aria-hidden="true">
              {i + 1}
            </span>
            <span className="wb-career-year">
              {["2024–25", "2026", "NOW"][i]}
            </span>
            <strong>{role.company}</strong>
          </button>
        ))}
      </div>
      <div className="wb-slide-progress wb-career-countdown" aria-hidden="true">
        <motion.span style={{ scaleX: progress }} />
      </div>
      <div
        id="career-chapter"
        role="tabpanel"
        aria-labelledby={`career-tab-${selected}`}
        className={`wb-career-feature wb-tone-${tone}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="wb-career-feature-meta">
              <span className="wb-label">{active.period}</span>
              <span>
                <Briefcase size={14} />
                {active.type}
              </span>
            </div>
            <div className="wb-career-feature-main">
              <div>
                <h3>{active.company}</h3>
                <strong>{active.title}</strong>
                <p>{active.context}</p>
              </div>
              <div className="wb-career-proof">
                <span className="wb-label">A SNAPSHOT</span>
                <strong>{active.achievements[0].metric}</strong>
                <span>{active.achievements[0].text}</span>
              </div>
            </div>
            <div className="wb-career-feature-actions">
              <a
                href={`#experience-${order[selected]}`}
                className="wb-inline-link"
              >
                Explore this role <ArrowRight size={16} />
              </a>
              {active.caseStudies?.[0] && (
                <Link className="wb-inline-link" to={active.caseStudies[0].to}>
                  See the work <ArrowUpRight size={16} />
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="wb-career-map-caption">
        Product roles at a glance. Consulting and earlier experience follow below.
      </p>
    </section>
  );
}
