import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import {
  containerVariants,
  itemVariants,
} from "@/components/case-studies/animations";
import Card from "@/components/case-studies/Card";
import ContextBar from "@/components/case-studies/ContextBar";
import BottomNav from "@/components/case-studies/BottomNav";

const LiveKeepingSendGreetings = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16"
    >
      <PageMeta />
      <Link
        to="/work"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-ink/50 hover:text-ink mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to all case studies
      </Link>

      {/* HERO */}
      <motion.div
        variants={itemVariants}
        className="bg-lemon border-2 border-black rounded-2xl p-10 md:p-16"
        style={{ boxShadow: "12px 12px 0px 0px #625BF6" }}
      >
        <ContextBar
          company="LiveKeeping · Pro+ Feature · Send Greetings"
          period="Jan–Mar 2026"
          tags={["AI Integration", "UX Redesign"]}
        />
        <h1 className="font-display font-black text-4xl md:text-6xl text-ink leading-tight">
          Make customer greetings useful again.
        </h1>
        <p className="text-xl text-ink/60 font-medium mt-4 max-w-4xl">
          Integrated Google&#39;s Nano Banana (Gemini Flash) image model so SMB
          owners could generate custom AI greeting cards for their customers —
          in seconds, from their phone.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            {
              value: "+168%",
              label: "Reported Feature Engagement",
              sub: "Pro+ Send Greetings module",
            },
            {
              value: "Nano Banana",
              label: "AI Model Integrated",
              sub: "Google Gemini Flash Image",
            },
            {
              value: "27 occasions",
              label: "Festival Calendar Built",
              sub: "Mar–Sep 2026, geo-segmented",
            },
            {
              value: "50,000+",
              label: "Platform Users",
              sub: "LiveKeeping SMB base",
            },
          ].map((m, i) => (
            <div
              key={i}
              className="bg-ink/10 border border-black/20 rounded-xl p-4"
            >
              <div className="font-display font-black text-3xl text-ink">
                {m.value}
              </div>
              <p className="text-xs font-bold text-ink/80 mt-1">{m.label}</p>
              <p className="text-[10px] text-ink/50 mt-0.5">{m.sub}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-6 bg-white border-2 border-black rounded-xl p-4 flex flex-col md:flex-row gap-4 text-sm font-medium text-ink/70"
      >
        <span>Role: Associate PM — End-to-end feature ownership</span>
        <span className="hidden md:block">|</span>
        <span>Team: Engineering, Design, Customer Success</span>
        <span className="hidden md:block">|</span>
        <span>AI Stack: Nano Banana (Google Gemini 3.1 Flash Image)</span>
      </motion.div>

      {/* SECTION 1: THE PROBLEM */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">
          BEFORE STATE
        </h2>

        <Card>
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            LiveKeeping&#39;s Send Greetings module let Pro+ users send festival
            and occasion messages to their customers. The idea was right.
            Execution was static: pre-written templates, generic images, no
            personalisation. Indian SMB owners — shop owners, traders,
            manufacturers — couldn&#39;t customise the greeting to feel like it
            came from their business. Usage was low. Most Pro+ users had never
            touched it.
          </p>
        </Card>

        {[
          {
            bg: "bg-blush",
            title: "GENERIC TEMPLATES",
            desc: "Users were sending the same Diwali image as every other business on LiveKeeping. No brand identity. No personalisation. The greeting looked like spam.",
          },
          {
            bg: "bg-sky",
            title: "ZERO CUSTOMISATION",
            desc: "Business name auto-filled, but the greeting image itself was fixed. Users couldn't change the colour, the style, the language register, or the visual tone.",
          },
          {
            bg: "bg-lemon",
            title: "MISSED OCCASIONS",
            desc: "The module covered major national festivals but ignored regional ones. A Ganesh Chaturthi greeting is irrelevant to a trader in West Bengal. A Vishwakarma Puja greeting is deeply relevant. One-size-fits-all = low resonance everywhere.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ scale: 1.005, y: -2 }}
            className={`${item.bg} border-2 border-black rounded-xl p-5 mt-3`}
          >
            <p className="text-xs font-black text-ink/40 mb-1">{item.title}</p>
            <p className="text-sm text-ink/80 font-medium leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* SECTION 2: THE INTEGRATION */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">
          WHAT NANO BANANA DOES
        </h2>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.005, y: -2 }}
          className="bg-ink border-2 border-black rounded-2xl p-7"
        >
          <p className="text-white text-lg font-display font-black mb-4">
            Nano Banana is Google&#39;s AI image generation model, powered by
            Gemini 3.1 Flash Image. It generates photorealistic, text-accurate
            visuals from prompts — with precise text rendering across fonts,
            languages, and calligraphy styles. Specifically, it was designed for
            marketing mockups, greeting cards, and branded content with in-image
            text translation. That made it the right model for this use case:
            Indian SMB owners sending festival greetings in Hindi, Bengali,
            Tamil, Gujarati — not just English.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            {[
              "Precise text rendering on images",
              "Multi-language / regional script support",
              "Greeting card & marketing asset generation",
              "4K output · Lightning-fast (Flash model)",
            ].map((cap, i) => (
              <span
                key={i}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm font-bold text-white"
              >
                {cap}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* SECTION 3: WHAT WE BUILT */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">
          SOLUTION
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              bg: "bg-blush",
              part: "PART 1",
              title: "AI Greeting Generator",
              desc: "Users select an occasion, input their business name and customer name (pre-filled from ledger contact), choose a language, and Nano Banana generates a custom greeting card — unique to their business and their customer. 15 seconds. No design skills needed.",
            },
            {
              bg: "bg-sky",
              part: "PART 2",
              title: "Geo-Segmented Festival Calendar",
              desc: "Built a 27-occasion calendar from March to September 2026 with geo-segmentation across Pan-India, South India, Maharashtra/Goa, East India, and Gujarat. A West Bengal trader sees Ratha Yatra and Vishwakarma Puja. A Maharashtra shopkeeper sees Ganesh Chaturthi and Gudi Padwa.",
            },
            {
              bg: "bg-mint",
              part: "PART 3",
              title: "Evergreen Greeting Library",
              desc: "13 on-demand types available any day — Good Morning, Good Night, Thank You (post-payment + post-order variants), Motivation (Monday and general), Payment Reminder (3 urgency tiers: soft/firm/urgent), Sale Promotion, and 4 discount tiers (5%/10%/15%/20%).",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.005, y: -2 }}
              className={`${item.bg} border-2 border-black rounded-2xl p-6`}
            >
              <span className="bg-ink text-white text-xs font-black px-2 py-1 rounded">
                {item.part}
              </span>
              <p className="font-display font-black text-lg text-ink mt-3">
                {item.title}
              </p>
              <p className="text-sm text-ink/70 mt-2 font-medium leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.005, y: -2 }}
          className="bg-lemon border-2 border-black rounded-2xl p-6 mt-4"
        >
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            March is the busiest month (8 occasions: Ugadi, Gudi Padwa,
            Navratri, Eid, Navroz, Cheti Chand, Rama Navami, Hanuman Jayanti).
            March 19 and 20 each have 3 simultaneous occasions — requiring
            geo-segmentation logic to prevent a single user from receiving 3
            identical-timing greetings. Independence Day (August 15) is the
            single highest-reach notification of the full calendar — mandatory
            Pan-India, all plans.
          </p>
        </motion.div>
      </div>

      {/* SECTION 4: UX DESIGN DECISIONS */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">
          WHAT I GOT SPECIFIC ABOUT
        </h2>

        <Card>
          <div className="space-y-4">
            {[
              "AI prompt construction — the Nano Banana prompt is built dynamically from: occasion name, business type (from user's LiveKeeping account category), customer name (from ledger), language preference, and region. A Kerala shop owner sending a Vishu greeting to a customer named Rajesh gets a different image than a Punjab trader sending the same Vaisakhi greeting. This level of specificity was not present in V1.",
              "Template IDs — every greeting type has a unique template ID (e.g. GRT_EG_GOODMORNING_01, GRT_FEST_DIWALI_SOUTH_01) stored in our backend. This allows A/B testing between AI-generated and template-generated greetings at the same occasion — and gives customer success the ability to reference specific templates when investigating complaints.",
              "The June 21 problem — Yoga Day and Father's Day fall on the same date. Two separate occasion push notifications on the same day would feel spammy. Solution: send only one, or schedule one for June 20 and one for June 21. Documented in the conflict resolution rules as a named exception.",
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">
                  {i + 1}
                </div>
                <motion.div
                  whileHover={{ scale: 1.01, y: -2 }}
                  className="bg-canvas border-2 border-black rounded-xl p-4 flex-1"
                >
                  <p className="text-sm text-ink/80 font-medium leading-relaxed">
                    {item}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* SECTION 5: RESULTS */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">
          OUTCOME
        </h2>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.005, y: -2 }}
          className="bg-white border-2 border-black rounded-2xl p-10 text-center"
        >
          <div className="font-display font-black text-7xl text-ink">+168%</div>
          <p className="text-lg font-medium text-ink/60 mt-2">
            Reported feature engagement uplift · Pro+ Send Greetings module
          </p>
          <p className="text-sm text-ink/70 mt-3">
            The public record does not include the event definition, cohort or
            comparison window. The result does not isolate AI generation from
            calendar relevance or other changes; it is not a product-wide
            retention or revenue claim.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4"
        >
          {[
            {
              label: "27 occasions covered",
              sub: "Mar–Sep 2026",
              bg: "bg-blush",
            },
            {
              label: "Geo-segmented",
              sub: "Pan-India + 4 regional zones",
              bg: "bg-sky",
            },
            {
              label: "13 evergreen types",
              sub: "Available any day, user-initiated",
              bg: "bg-lemon",
            },
            {
              label: "15 seconds",
              sub: "AI greeting generation time (target)",
              bg: "bg-mint",
            },
          ].map((k, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`${k.bg} border-2 border-black rounded-2xl p-5 text-center`}
            >
              <p className="font-display font-black text-lg text-ink">
                {k.label}
              </p>
              <p className="text-xs font-bold text-ink/60 mt-1">{k.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* SECTION 6: RETROSPECTIVE */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">
          RETROSPECTIVE
        </h2>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.005, y: -2 }}
          className="bg-lemon border-2 border-black rounded-2xl p-7"
        >
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">
                1
              </div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                The product hypothesis was that more personal content and relevant
                occasions would make greetings more useful. The reported +168%
                engagement change supports further investigation, but does not
                isolate relevance from novelty or other changes. Repeat use and
                completed sends would help test that distinction.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">
                2
              </div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                The evergreen library (Good Morning, Thank You, Motivation) was
                underbuilt in V1. Users wanted to stay in touch with customers
                between festivals. Building these as user-initiated on-demand
                greetings (not scheduled pushes) was the right call —
                they&#39;re a relationship tool, not a notification.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">
                3
              </div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                Measuring downstream business impact would have made this much
                stronger: do businesses whose owners send greetings have higher
                payment collection rates? Higher repeat orders?
                LiveKeeping&#39;s ledger data was right there to answer this.
                I&#39;d build that measurement into V2 from day one.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav
        prev="livekeeping-compliance-gap"
        next="livekeeping-notifications"
      />
    </motion.div>
  );
};

export default LiveKeepingSendGreetings;
