import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, ArrowDown, Calendar, X } from "lucide-react";
import { openScheduleBooking } from "@/utils/openCalendar";
import { trackEvent } from "@/utils/analytics";
import ImpactEvidence from "./ImpactEvidence";
import { PositionCard, OutcomeCard } from "./HeroCards";

const ease = [0.22, 1, 0.36, 1];
function Burst({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <path
        d="M100 0l16 43 37-28-4 48 47-2-32 36 36 30-47 8 11 46-42-23-22 42-18-44-39 25 7-47-47-2 34-33L4 69l47-4-6-47 38 29z"
        fill="currentColor"
      />
    </svg>
  );
}
export default function HeroSection({ bannerDismissed, onDismissBanner }) {
  const root = useRef(null);
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(0),
    pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 100, damping: 22 });
  const y = useSpring(pointerY, { stiffness: 100, damping: 22 });
  const rotateX = useTransform(y, [-1, 1], [4, -4]);
  const rotateY = useTransform(x, [-1, 1], [-5, 5]);
  const backX = useTransform(x, [-1, 1], [-15, 15]);
  const backY = useTransform(y, [-1, 1], [-12, 12]);
  const panelX = useTransform(x, [-1, 1], [5, -5]);
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end start"],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, 95]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const move = (event) => {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };
  const arrive = (delay) => ({
    initial: reduced ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay: reduced ? 0 : delay, ease },
  });
  return (
    <>
      <section
        ref={root}
        className="wb-hero"
        onPointerMove={move}
        onPointerLeave={() => {
          pointerX.set(0);
          pointerY.set(0);
        }}
        aria-label="Meet Saswata"
      >
        <div className="wb-hero-inner">
          <motion.div {...arrive(0.08)} className="wb-edition">
            <span>PRODUCT MANAGER</span>
            <span>ENTERPRISE AI / SAAS / COMMERCE</span>
          </motion.div>
          <motion.div
            className="wb-masthead"
            style={reduced ? {} : { y: nameY }}
            {...arrive(0.12)}
          >
            <h1>
              <span>SASWATA</span>
              <span className="sr-only">
                {" "}
                S. Sengupta — Product Manager, AI &amp; Growth
              </span>
            </h1>
          </motion.div>
          <div className="wb-hero-stage">
            <motion.div
              className="wb-hero-left"
              style={reduced ? {} : { x: panelX }}
              {...arrive(0.35)}
            >
              <PositionCard />
              <Link
                to="/work"
                className="wb-button wb-button-coral"
                onClick={() => trackEvent("hero_cta", "see_work")}
              >
                See the work <ArrowUpRight size={19} />
              </Link>
              <button
                className="wb-button wb-button-paper"
                onClick={() => {
                  trackEvent("hero_cta", "lets_talk");
                  openScheduleBooking();
                }}
              >
                <Calendar size={17} /> Let’s talk
              </button>
            </motion.div>
            <motion.div
              className="wb-portrait-stage"
              {...arrive(0.24)}
              style={reduced ? {} : { y: portraitY }}
            >
              <motion.div
                className="wb-portrait-burst"
                style={reduced ? {} : { x: backX, y: backY }}
              >
                <Burst />
              </motion.div>
              <motion.figure
                className="wb-editorial-portrait"
                layoutId="portrait-workbench"
                style={{
                  viewTransitionName: "portrait-workbench",
                  rotate: -2,
                  ...(reduced ? {} : { rotateX, rotateY }),
                }}
                transition={{ layout: { duration: 0.65, ease } }}
              >
                <div className="wb-portrait-photo">
                  <span className="wb-portrait-disc" aria-hidden="true" />
                  <img
                    src="/assets/worlds/portrait-workbench.png"
                    alt="Saswata S. Sengupta wearing round glasses and a black shirt"
                    width="1254"
                    height="1254"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                <figcaption>
                  <span>SASWATA S. SENGUPTA</span>
                  <span>BASED IN KOLKATA ↗</span>
                </figcaption>
              </motion.figure>
              <span className="wb-portrait-tag">
                Curiosity → clarity → shipped.
              </span>
            </motion.div>
            <motion.div
              className="wb-hero-right"
              style={reduced ? {} : { x: panelX }}
              {...arrive(0.45)}
            >
              <OutcomeCard />
              <div className="wb-role-tags">
                <span>B2B SaaS</span>
                <span>D2C</span>
                <span>AI products</span>
                <span>Analytics</span>
              </div>
              {!bannerDismissed && (
                <div className="wb-current-note">
                  <span className="wb-label">
                    CURRENTLY AT UPCORE TECHNOLOGIES
                  </span>
                  <p>Discovery, solutions and delivery.</p>
                  <button
                    onClick={onDismissBanner}
                    aria-label="Dismiss current role note"
                  >
                    <X size={15} />
                  </button>
                </div>
              )}
              <p className="wb-education">B.Tech (Mech) + IIT Jodhpur MBA.</p>
            </motion.div>
          </div>
          <a href="#workbench-impact" className="wb-scroll-cue">
            <ArrowDown size={16} />
            <span>THE PROOF IS BELOW</span>
          </a>
          <span className="wb-margin-note" aria-hidden="true">
            LESS GUESSWORK. MORE GOOD QUESTIONS.
          </span>
        </div>
      </section>
      <div id="workbench-impact">
        <ImpactEvidence />
      </div>
    </>
  );
}
