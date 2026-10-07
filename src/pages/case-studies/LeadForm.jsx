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

const LeadForm = () => {
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
        className="bg-mint border-2 border-black rounded-2xl p-10 md:p-16"
        style={{ boxShadow: "12px 12px 0px 0px #3DDC91" }}
      >
        <ContextBar
          company="Sierra Living Concepts"
          period="2024"
          tags={["D2C", "UX", "Conversion"]}
        />
        <h1 className="font-display font-black text-4xl md:text-6xl text-ink leading-tight">Remove friction from the lead form.</h1>
        <p className="text-xl text-ink/60 font-medium mt-4 max-w-4xl">
          Static form. Zero conditional logic. No inline validation. Rebuilt
          into category-specific modules with Material 3. The rebuild reports
          +124% lead submissions in 28 days. A separate role-level record
          reports 2.14% → 4.40% (+105%); the measurement windows are not
          established as the same, so the figures are not combined.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            {
              value: "+124%",
              label: "Submission Rate",
              sub: "Overall lead uplift",
              color: "text-ink",
            },
            {
              value: "–41%",
              label: "Mobile Completion Time",
              sub: "Faster form fills on mobile",
              color: "text-ink",
            },
            {
              value: "–68%",
              label: "Rage Clicks",
              sub: "Frustration almost eliminated",
              color: "text-ink",
            },
            {
              value: "–31%",
              label: "Form Page Bounce",
              sub: "More users started the form",
              color: "text-ink",
            },
          ].map((m, i) => (
            <div
              key={i}
              className="bg-white/50 border border-ink/20 rounded-xl p-4"
            >
              <div className={`font-display font-black text-3xl ${m.color}`}>
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
        <span>
          Role: Growth PM — UX diagnosis, form architecture, A/B test design,
          front-end implementation
        </span>
        <span className="hidden md:block">|</span>
        <span>
          Platform: Sierra Living Concepts · D2C furniture e-commerce · Lead
          capture and form UX
        </span>
        <span className="hidden md:block">|</span>
        <span>Duration: 4 weeks design + 2 week A/B test</span>
      </motion.div>

      {/* SECTION 1: BEFORE STATE */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">
          BEFORE STATE
        </h2>

        <Card>
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            The lead capture form had measurable submission friction. High
            client-side latency meant fields took 3-5 seconds to initialise.
            Validation errors appeared only after submission. Field labels were
            inconsistent. Error messages were generic. There was no inline
            guidance. The phone number field had a format restriction that users
            only discovered when they hit submit.
          </p>
        </Card>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.005, y: -2 }}
          className="bg-mint border-2 border-black rounded-xl p-5 mt-4"
        >
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            Clarity rage-click maps told the real story. Users were clicking the
            submit button repeatedly — sometimes 8-10 times — because nothing
            happened. The latency made the form feel broken. Mobile users were
            particularly affected: touch targets were at 32px instead of the
            recommended 48px minimum, causing mistaps on adjacent fields.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.005, y: -2 }}
          className="bg-blush border-2 border-black rounded-xl p-5 mt-4"
        >
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            The compounding friction effect was the real problem. Each issue
            alone was annoying. Together, they made the form feel actively
            hostile. Users who might have tolerated one frustration encountered
            four in sequence — and left. The form wasn&#39;t losing users at one
            specific point; it was grinding them down across the entire
            interaction.
          </p>
        </motion.div>
      </div>

      {/* SECTION 2: HOW I FOUND IT */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">
          HOW I FOUND IT
        </h2>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.005, y: -2 }}
          className="bg-mint border-2 border-black rounded-2xl p-8"
        >
          <p className="text-lg font-display font-black text-ink mb-6">
            Four distinct issues. Each independently measurable. Each fixable
            without a platform migration.
          </p>

          {[
            "Analysed GA4 form interaction events alongside Clarity session recordings and rage-click maps. The submit button had a 3-5 second delay between click and response — caused by non-deferred third-party scripts blocking the event listener.",
            "Identified that validation errors only appeared after full submission — users had no way to know if their input was correct until they had completed every field and clicked submit. The phone number field was the worst: a hidden format requirement with no preview.",
            "Measured mobile touch targets at 32px on average across all form fields — 33% below the 48px WCAG minimum. Cross-referenced with mobile rage-click locations: concentrated around the phone number and submit button areas.",
            "Mapped the field-by-field drop-off rate using GA4 form interaction events. The phone number field had the highest abandonment rate at 23% of users who reached it — more than double the next highest field. The format restriction was the primary cause.",
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
            The compounding friction hypothesis was critical. Each issue alone
            was a 5-10% drag. Together, they created a perceived cost that was
            higher than the sum of individual friction points. Fixing them
            partially would leave the form feeling better — but still below its
            potential. The hypothesis shaped the decision to rebuild
            comprehensively rather than patch incrementally.
          </p>
        </motion.div>
      </div>

      {/* SECTION 3: WHAT WE SHIPPED */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">
          WHAT WE SHIPPED
        </h2>

        <Card>
          <p className="text-lg font-display font-black text-ink mb-6">
            Full rebuild with Material 3. Every issue fixed simultaneously.
            Validated with a 10% A/B test before full rollout.
          </p>

          {[
            "Rebuilt the form using Material 3 components for consistent styling, interaction patterns, and accessibility. Added real-time inline validation with contextual microcopy that explained each field requirement before submission — users saw errors as they typed.",
            "Fixed the client-side latency by deferring non-critical scripts and lazy-loading third-party widgets. The submit button now responded within 200ms. Also added a loading state so users knew the system was processing.",
            "Increased mobile touch targets to 48px minimum across all fields. Added the phone number format hint as visible label text with live formatting — users saw the expected format as they typed. Used category-specific form modules instead of a one-size-fits-all layout.",
          ].map((fix, i) => (
            <div
              key={i}
              className="flex items-center gap-3 mb-3 last:mb-0 bg-canvas border-2 border-black rounded-xl p-4"
            >
              <span className="text-xs font-black text-ink/40 w-8">
                {i + 1}.
              </span>
              <p className="text-sm text-ink/80 font-medium leading-relaxed">
                {fix}
              </p>
            </div>
          ))}
        </Card>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"
        >
          {[
            {
              label: "Form Approach",
              value: "Material 3 rebuild",
              bg: "bg-mint",
            },
            {
              label: "Validation",
              value: "Inline + contextual",
              bg: "bg-lemon",
            },
            {
              label: "Test Methodology",
              value: "10% A/B → full rollout",
              bg: "bg-sky",
            },
          ].map((k, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`${k.bg} border-2 border-black rounded-2xl p-5 text-center`}
            >
              <p className="text-xs font-black text-ink/40 uppercase">
                {k.label}
              </p>
              <p className="font-display font-black text-xl text-ink mt-2">
                {k.value}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* SECTION 4: OUTCOME */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">
          WHAT THIS CHANGED
        </h2>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Lead Submissions", value: "+124%", bg: "bg-mint" },
            { label: "Mobile Completion Time", value: "–41%", bg: "bg-sky" },
            { label: "Rage Clicks Eliminated", value: "–68%", bg: "bg-blush" },
            { label: "Form Page Bounce", value: "–31%", bg: "bg-lemon" },
          ].map((k, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`${k.bg} border-2 border-black rounded-2xl p-6 text-center`}
            >
              <p className="text-xs font-black text-ink/40 uppercase">
                {k.label}
              </p>
              <p className="font-display font-black text-3xl text-ink mt-2">
                {k.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.005, y: -2 }}
          className="bg-ink border-2 border-black rounded-2xl p-6 mt-4"
        >
          <p className="text-white font-display font-black text-lg">
            The A/B test validated the compounding friction hypothesis.
          </p>
          <p className="text-white/70 text-sm mt-2 leading-relaxed">
            The rebuilt form outperformed the control across every segment — new
            vs returning visitors, mobile vs desktop, all traffic sources. Lead
            submissions more than doubled. Mobile conversion rate improved by
            38%. The compounding friction hypothesis was correct: fixing all
            issues simultaneously produced results greater than the sum of
            individual fixes.
          </p>
          <p className="text-[#3DDC91] font-black mt-3">
            When friction compounds, the fix must too.
          </p>
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
          className="bg-mint border-2 border-black rounded-2xl p-7"
        >
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">
                1
              </div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                Rage-click maps told the story that analytics couldn&#39;t. GA4
                showed users were leaving the form page. Clarity showed them
                clicking the submit button 10 times in frustration before
                leaving. The behavioural data and the quantitative data needed
                each other — neither alone was enough.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">
                2
              </div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                The A/B test was worth every hour invested in setting it up.
                Without it, stakeholders would have questioned whether the
                improvement came from the redesign or external factors. The test
                data made the conversation about &#39;when to roll out
                fully&#39; instead of &#39;should we roll out at all.&#39;
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">
                3
              </div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                The phone number field issue was the easiest fix with the
                highest impact per line of code. A format hint, live preview,
                and inline validation eliminated the #1 cause of form
                abandonment. Sometimes the most impactful UX change is telling
                users what you expect before they guess wrong.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav prev="category-discovery" next="upcore-lead-scoring" />
    </motion.div>
  );
};

export default LeadForm;
