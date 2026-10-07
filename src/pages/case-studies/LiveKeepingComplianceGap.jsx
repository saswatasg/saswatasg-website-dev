import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lightbulb } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import {
  containerVariants,
  itemVariants,
} from "@/components/case-studies/animations";
import Card from "@/components/case-studies/Card";
import ContextBar from "@/components/case-studies/ContextBar";
import BottomNav from "@/components/case-studies/BottomNav";

const LiveKeepingComplianceGap = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16"
    >
      <PageMeta
        title="Compliance Adoption Gap — 17:1 | Saswata S. Sengupta"
        description="How I diagnosed a 17:1 gap between Tally and LiveKeeping for PRO+ compliance usage — and built the executive case that changed the product roadmap."
      />
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
        className="bg-ink border-2 border-black rounded-2xl p-10 md:p-16"
        style={{ boxShadow: "12px 12px 0px 0px #E85D3A" }}
      >
        <ContextBar
          company="LiveKeeping · An IndiaMART Company"
          period="Jan–Mar 2026"
          tags={["B2B SaaS", "50,000+ Users"]}
        />
        <h1 className="font-display font-black text-4xl md:text-6xl text-white leading-tight">Why paid access was not becoming native adoption.</h1>
        <p className="text-xl text-white/60 font-medium mt-4 max-w-4xl">
          For every 1 E-Way Bill generated in LiveKeeping, 17 were being
          generated in Tally in the investigated usage context. The findings
          informed executive roadmap discussions.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            {
              value: "17 : 1",
              label: "E-Way Bill Gap",
              sub: "Tally vs LiveKeeping (PRO+)",
              color: "text-coral",
            },
            {
              value: "19 : 1",
              label: "E-Invoice Gap",
              sub: "Same methodology, second module",
              color: "text-white",
            },
            {
              value: "100K+",
              label: "API Logs Analysed",
              sub: "To validate the gap quantitatively",
              color: "text-white",
            },
            {
              value: "C-Suite",
              label: "Escalation Level",
              sub: "Greenlit roadmap investigation",
              color: "text-white",
            },
          ].map((m, i) => (
            <div
              key={i}
              className="bg-white/10 border border-white/20 rounded-xl p-4"
            >
              <div className={`font-display font-black text-3xl ${m.color}`}>
                {m.value}
              </div>
              <p className="text-xs font-bold text-white/80 mt-1">{m.label}</p>
              <p className="text-[10px] text-white/40 mt-0.5">{m.sub}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-6 bg-ink border-2 border-black rounded-xl p-4 flex flex-col md:flex-row gap-4 text-sm font-medium text-white/70"
      >
        <span>
          Role: Associate PM — Solo diagnosis, executive presentation,
          stakeholder alignment
        </span>
        <span className="hidden md:block">|</span>
        <span>
          Platform: LiveKeeping · 50,000+ Indian SMB users · IndiaMART
          subsidiary
        </span>
        <span className="hidden md:block">|</span>
        <span>Scope: workflow diagnosis → executive discussion</span>
      </motion.div>

      {/* SECTION 1: THE PROBLEM */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">
          BEFORE STATE
        </h2>

        <Card>
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            LiveKeeping is a mobile GST compliance and accounting app for Indian
            SMBs. PRO+ is the highest-value subscriber tier — users who pay for
            advanced features including native E-Way Bill and E-Invoice
            generation. The product team tracked feature adoption. The number
            looked low. But nobody had asked why.
          </p>
        </Card>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.005, y: -2 }}
          className="bg-blush border-2 border-black rounded-xl p-5 mt-4"
        >
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            Customers were completing accounting and compliance work within
            their existing Tally workflows. The investigation focused on that
            substitute behavior, rather than assuming that a native feature's
            availability would make it the preferred path.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.005, y: -2 }}
          className="bg-sky border-2 border-black rounded-xl p-5 mt-4"
        >
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            What we knew: PRO+ feature adoption for E-Way Bills and E-Invoices
            was low. What we didn&#39;t know: Were users not aware of the
            feature? Was it broken? Were they doing it somewhere else? Nobody
            had run the investigation to separate these possibilities.
          </p>
        </motion.div>
      </div>

      {/* SECTION 2: THE DIAGNOSIS */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">
          HOW I FOUND IT
        </h2>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.005, y: -2 }}
          className="bg-lemon border-2 border-black rounded-2xl p-8"
        >
          <p className="text-lg font-display font-black text-ink mb-6">
            I built the measurement from scratch.
          </p>

          {[
            "Cross-referenced PRO+ plan activation data against module-level event logs. Users who had the E-Way Bill module enabled but showed zero native generation events — across weeks of activity on other features. Not inactive users. Active users avoiding one specific module.",
            "Pulled Tally API call volumes as a proxy for external usage. Found consistent, high-volume API calls on the same accounts that showed zero native E-Way activity. The calls were going out — just not through us.",
            "Ran structured discovery calls with zero-activity PRO+ users. Synthesised findings in Excel. Consistent finding: the native E-Way Bill flow had 4 more steps than the equivalent Tally workflow. No auto-population from existing invoice data. Users had learned Tally years ago and had no reason to relearn.",
            "Quantified the ratio: 17:1. For every 1 E-Way Bill generated natively in LiveKeeping across the PRO+ base, 17 were generated via Tally integrations. Replicated the same methodology for E-Invoices. Got 19:1.",
          ].map((step, i) => (
            <div key={i} className="flex gap-3 mb-4 last:mb-0">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">
                {i + 1}
              </div>
              <motion.div
                whileHover={{ scale: 1.01, y: -2 }}
                className="bg-white border-2 border-black rounded-xl p-4 flex-1"
              >
                <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                  {step}
                </p>
              </motion.div>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.005, y: -2 }}
          className="bg-ink border-2 border-black rounded-xl p-5 mt-4"
        >
          <p className="text-white text-sm md:text-base font-medium leading-relaxed">
            This changed everything about how the problem was presented.
            &#39;Low feature adoption&#39; sounds like a marketing problem.
            &#39;17:1 gap among paid users who are clearly generating these
            documents — just not through us&#39; sounds like a product-trust and
            workflow-integration problem. These require completely different
            solutions. Framing mattered.
          </p>
        </motion.div>
      </div>

      {/* SECTION 3: WHAT I PRESENTED */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">
          THE DECK
        </h2>

        <Card>
          <p className="text-lg font-display font-black text-ink mb-6">
            Built for VP/CEO. Structured as a business case, not a bug report.
          </p>

          {[
            "Slide 1: The gap, quantified. 17:1 ratio, rendered visually. One number on a slide. No text.",
            "Slide 2: What this means in business terms. PRO+ users are paying for a feature they're not using. Tally is capturing usage from our paid segment. This is not adoption failure — it's trust failure.",
            "Slide 3: Why users went to Tally. 4 extra steps. No invoice auto-population. Workflow learned over years. CA community endorses Tally.",
            "Slide 4: This is not a feature gap. Tally has no competitive advantage here — they just have incumbency and trust. We can close this with product changes, not engineering heroics.",
            "Slide 5: Recommended path. Two options with tradeoffs. Requesting greenlight to run a deeper investigation sprint before committing to either.",
          ].map((slide, i) => (
            <div
              key={i}
              className="flex items-center gap-3 mb-3 last:mb-0 bg-canvas border-2 border-black rounded-xl p-4"
            >
              <span className="text-xs font-black text-ink/40 w-8">
                {i + 1}.
              </span>
              <p className="text-sm text-ink/80 font-medium leading-relaxed">
                {slide}
              </p>
            </div>
          ))}
        </Card>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.005, y: -2 }}
          className="bg-mint border-2 border-black rounded-xl p-5 mt-4"
        >
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            The presentation went to VP and CEO level. The finding directly
            greenlit a cross-functional product investigation sprint that would
            not have happened without this analysis. The same diagnostic
            methodology was reused immediately — and found the 19:1 E-Invoice
            gap within two weeks.
          </p>
        </motion.div>
      </div>

      {/* SECTION 4: PARALLEL TRACK */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">
          PARALLEL TRACK
        </h2>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.005, y: -2 }}
          className="bg-blush border-2 border-black rounded-2xl p-7"
        >
          <p className="text-lg font-display font-black text-ink mb-4">
            While the investigation was running, I also fixed the compliance
            journey reliability.
          </p>
          <p className="text-sm text-ink/80 font-medium leading-relaxed mb-6">
            Pulled and analysed 100K+ API transaction logs. Classified failure
            modes across three categories: government API downtime (external,
            nothing we could do), user-input errors (fixable with validation),
            and sync inconsistencies between mobile and web (fixable with
            engineering).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Government API Downtime",
                desc: "External. Triage: surface better error messaging so users understand it's not LiveKeeping's fault. Don't fix what's not ours to fix.",
              },
              {
                title: "User-Input Errors",
                desc: "Duplicate IRN handling, missing transporter details on E-Way Bills, incorrect GSTIN formats. Added inline validation and clear error copy at the point of entry.",
              },
              {
                title: "Sync Lag (Mobile ↔ Web)",
                desc: "Data discrepancies when users switched devices mid-session. Co-ordinated with engineering on retry logic and session state handling.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border-2 border-black rounded-xl p-4"
              >
                <p className="text-xs font-black text-ink/40 uppercase mb-1">
                  {item.title}
                </p>
                <p className="text-sm text-ink/70 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <div className="font-display font-black text-4xl text-ink">
              –58%
            </div>
            <p className="text-sm font-bold text-ink/60">
              Reported rejection-rate reduction in the separate reliability
              workstream. This does not measure adoption or establish that the
              gap investigation caused the reduction.
            </p>
          </div>
        </motion.div>
      </div>

      {/* SECTION 5: RETROSPECTIVE */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">
          RETROSPECTIVE
        </h2>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.005, y: -2 }}
          className="bg-ink border-2 border-black rounded-2xl p-7"
        >
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-white text-ink rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">
                1
              </div>
              <p className="text-sm md:text-base text-white/90 font-medium leading-relaxed">
                The 17:1 gap was visible in the data all along. It just
                hadn&#39;t been asked about. The most valuable thing I did was
                decide that &#39;low adoption&#39; was an incomplete explanation
                and build a better one. A PM&#39;s job is to reframe problems,
                not just report metrics.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-white text-ink rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">
                2
              </div>
              <p className="text-sm md:text-base text-white/90 font-medium leading-relaxed">
                Discovery calls were essential but the quantitative analysis had
                to come first. Walking into a user call without the 17:1 number
                would have produced anecdotes. Walking in with the number let me
                ask much more specific questions — and users confirmed exactly
                what the data predicted.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-white text-ink rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">
                3
              </div>
              <p className="text-sm md:text-base text-white/90 font-medium leading-relaxed">
                I&#39;d have pushed for a formal A/B test of the simplified vs
                existing E-Way Bill flow before presenting to leadership. The
                qualitative evidence was strong, but a 4-week instrumented test
                would have made the product recommendation harder to
                deprioritise.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav
        prev="sierra-lead-allocation"
        next="livekeeping-send-greetings"
      />
    </motion.div>
  );
};

export default LiveKeepingComplianceGap;
