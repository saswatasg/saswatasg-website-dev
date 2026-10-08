import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import { containerVariants, itemVariants } from '@/components/case-studies/animations';
import Card from '@/components/case-studies/Card';
import ContextBar from '@/components/case-studies/ContextBar';
import BottomNav from '@/components/case-studies/BottomNav';

const LiveKeepingNotifications = () => {
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
        className="bg-sky border-2 border-black rounded-2xl p-10 md:p-16"
        style={{ boxShadow: '12px 12px 0px 0px #3DDC91' }}
      >
        <ContextBar company="LiveKeeping · Notification Architecture" period="Jan–Mar 2026" tags={['50,000+ Users']} />
        <h1 className="font-display font-black text-4xl md:text-6xl text-ink leading-tight">
          Give notifications a clear priority.
        </h1>
        <p className="text-xl text-ink/60 font-medium mt-4 max-w-4xl">
          Designed a lifecycle-messaging architecture with 27+ triggers, regional eligibility and a three-slot daily cap with priority exceptions.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { value: '27+', label: 'Event Triggers Designed', sub: 'Compliance, engagement, lifecycle' },
            { value: '3-slot', label: 'Daily Notification Cap', sub: 'With P0 override logic' },
            { value: '5 regions', label: 'Geo-Segmented', sub: 'Pan-India + 4 regional zones' },
            { value: 'PRO / PRO+', label: 'Plan-Tier Logic', sub: 'Different triggers per tier' },
          ].map((m, i) => (
            <div key={i} className="bg-ink/10 border border-ink/20 rounded-xl p-4">
              <div className="font-display font-black text-3xl text-ink">{m.value}</div>
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
        <span>Role: Associate PM — Strategy, copy, conflict logic, festival calendar, SOP</span>
        <span className="hidden md:block">|</span>
        <span>Audience: 50,000+ Indian SMB users across Free, PRO, PRO+ tiers</span>
        <span className="hidden md:block">|</span>
        <span>Tools: GA4, push notification platform, Excel</span>
      </motion.div>

      {/* SECTION 1: THE PROBLEM */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">BEFORE STATE</h2>

        <Card>
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            LiveKeeping had push notifications. But there was no strategy — no documented trigger list, no priority rules, no daily cap, no regional logic. Compliance reminders, feature announcements, and festival greetings competed for the same time slots with no defined winner. A user filing their GSTR-1 on the 11th of the month could receive a Holi greeting at the same time as a compliance deadline reminder. No one had built the rules for what fires when, for whom, and in what order.
          </p>
        </Card>

        {[
          { title: 'NO PRIORITY SYSTEM', desc: 'A Diwali greeting and a GSTR-1 deadline reminder had equal weight. One is a compliance P0. One is a relationship touch. They\'re not the same.' },
          { title: 'NO CAP', desc: 'Users could theoretically receive 5+ notifications on a single day during busy compliance periods. The design needed a cap and priority exceptions to manage message fatigue.' },
          { title: 'NO GEO-LOGIC', desc: 'A Ganesh Chaturthi greeting going to a user in Chandigarh is meaningless noise. A Vishwakarma Puja greeting going only to East India users is the right call. This logic didn\'t exist.' },
        ].map((item, i) => (
          <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className={`${['bg-blush', 'bg-lemon', 'bg-sky'][i]} border-2 border-black rounded-xl p-5 mt-3`}>
            <p className="text-xs font-black text-ink/40 mb-1">{item.title}</p>
            <p className="text-sm text-ink/80 font-medium leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* SECTION 2: THE ARCHITECTURE */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">THE SYSTEM I DESIGNED</h2>

        <p className="text-sm font-medium text-ink/60 mb-4">I built this as a layered system — priority tiers, slot management, geo-segmentation, conflict resolution, and per-plan rules. Every notification type has a defined place in the hierarchy.</p>

        {/* LAYER 1 */}
        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-ink border-2 border-black rounded-2xl p-6">
          <p className="text-white font-display font-black text-lg mb-4">P0 → P3 Priority Hierarchy</p>
          {[
            'P0 — OVERRIDE: GSTR-1 Last Day (11th of month). Takes slot 1. Always fires regardless of other slots. Cannot be bumped.',
            'P1 — Workflow Compliance: E-Way Bill missing (dispatch event), IRN pending (invoice creation event). Takes slot 1 if no P0. Event-triggered.',
            'P2 — Accounting: Month-close reminders (26th at 3 PM, last day at 5 PM). Daybook summary. Slot 2 or 3.',
            'P3 — Engagement: Festival greetings, Send Greetings nudges, re-engagement (7-day inactivity). Last priority. Dropped if slots full.',
          ].map((tier, i) => (
            <div key={i} className="py-1.5 border-b border-white/10 last:border-0">
              <p className="text-sm text-white/90 font-medium">{tier}</p>
            </div>
          ))}
        </motion.div>

        {/* LAYER 2 */}
        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-lemon border-2 border-black rounded-2xl p-6 mt-4">
          <p className="font-display font-black text-lg text-ink mb-3">3-slot daily cap with earned access</p>
          <p className="text-sm text-ink/80 font-medium leading-relaxed">
            Users with 0-3 months tenure: 2-slot cap. Users with 3+ months: 3-slot cap. This prevents overwhelming new users who are still in the onboarding phase.
          </p>
          <p className="text-sm text-ink/80 font-medium leading-relaxed mt-3">
            When P0 fires (GSTR-1 Last Day): slot 1 is consumed. Daybook and CN/DN are dropped from that day — compliance takes precedence. When E-Way and IRN fire same day: E-Way fires first (dispatch = later in workflow), IRN fires after (invoice creation = earlier). They are sequential workflow steps, not duplicates — both can fire.
          </p>
          <p className="text-sm text-ink/80 font-medium leading-relaxed mt-3">
            The single IRN and bulk IRN alerts are mutually exclusive: single fires if &lt;3 IRNs pending, bulk fires if ≥3. Not both.
          </p>
        </motion.div>

        {/* LAYER 3 */}
        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-blush border-2 border-black rounded-2xl p-6 mt-4">
          <p className="font-display font-black text-lg text-ink mb-3">5 geo-segments. Different festivals. Different timing.</p>
          {[
            'Pan-India: National occasions — Eid, Independence Day, Diwali, Holi, Raksha Bandhan, Guru Purnima, Janmashtami',
            'South India: Ugadi, Onam (Kerala), regional harvest festivals',
            'Maharashtra / Goa: Gudi Padwa, Ganesh Chaturthi (10-day festival — highest engagement in MH)',
            'East India (WB / Odisha / Assam): Ratha Yatra (Odisha primary), Vishwakarma Puja, Durga Puja',
            'Gujarat / Rajasthan: Navroz, Cheti Chand, Mahavir Jayanti',
          ].map((region, i) => (
            <div key={i} className="py-1.5 border-b border-black/10 last:border-0">
              <p className="text-sm text-ink/80 font-medium">{region}</p>
            </div>
          ))}
        </motion.div>

        {/* LAYER 4 */}
        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-mint border-2 border-black rounded-2xl p-6 mt-4">
          <p className="font-display font-black text-lg text-ink mb-3">Named exception handling</p>
          {[
            'E-Way Bill + GSTR-1 Day: GSTR-1 takes slot 1. E-Way takes slot 2 (event-triggered). If 2-slot cap: E-Way drops on GST compliance days. Note in SOP.',
            'E-Invoice + GSTR-1 Last Day (11th): GSTR-1 = slot 1 (9 AM). IRN = slot 2 (within 2 hrs of creation). Daybook and CN/DN dropped on 11th entirely.',
            'June 21 — Yoga Day + Father\'s Day: Two occasions, same date. Send one only, or route one to June 20. Named in conflict doc as \'June 21 exception.\'',
          ].map((ex, i) => (
            <div key={i} className="py-1.5 border-b border-black/10 last:border-0">
              <p className="text-sm text-ink/80 font-medium leading-relaxed">{ex}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* SECTION 3: COPY PRINCIPLES */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">WHAT GOOD NOTIFICATION COPY LOOKS LIKE</h2>

        <Card>
          <p className="text-sm text-ink/80 font-medium mb-6">Every notification was written with a specific trigger, audience, and action in mind. I wrote all copy. Two examples that show the principle:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-lemon border-2 border-black rounded-xl p-5">
              <p className="text-xs font-black text-ink/40 uppercase mb-2">E-Way Bill missing — trigger-based, PRO+</p>
              <p className="text-sm font-bold text-ink">Title: E-Way bill for [Customer] is incomplete</p>
              <p className="text-sm text-ink/70 mt-1">Body: Vehicle or transporter details missing. Add now to generate and avoid delays.</p>
              <p className="text-xs text-ink/50 mt-2 italic">Why this works: Names the specific document, names the specific gap, gives a reason (avoid delays), one CTA.</p>
            </div>
            <div className="bg-sky border-2 border-black rounded-xl p-5">
              <p className="text-xs font-black text-ink/40 uppercase mb-2">Month-close reminder — 26th of month, PRO/PRO+</p>
              <p className="text-sm font-bold text-ink">Title: Month closes in 5 days</p>
              <p className="text-sm text-ink/70 mt-1">Body: Reconcile your sales entries and GST data now — catch errors before they hit your GSTR-1.</p>
              <p className="text-xs text-ink/50 mt-2 italic">Why this works: Urgency without panic. Concrete action (reconcile). Stakes clearly stated (GSTR-1 impact).</p>
            </div>
          </div>

          <div className="bg-blush border-2 border-black rounded-xl p-5 mt-4">
            <p className="text-xs font-black text-ink/40 uppercase mb-1">Multi-batch voucher feature release copy</p>
            <p className="text-sm text-ink/80 font-medium leading-relaxed">
              Shipped notification copy for the multi-batch + godown selection feature on Create Voucher. The winning notification:<br />
              <span className="font-bold">Title:</span> &#39;Stop creating vouchers one batch at a time&#39;<br />
              <span className="font-bold">Body:</span> &#39;Multi-batch &amp; godown selection is now live. Fewer entries, cleaner records, faster period closing.&#39;<br />
              Sent Day 3-5 to non-openers only — avoided fatiguing users who had already opened and explored the feature.
            </p>
          </div>
        </Card>
      </div>

      {/* SECTION 4: RESULTS */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">WHAT THIS SYSTEM ENABLES</h2>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-blush border-2 border-black rounded-2xl p-7">
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed mb-6">
            This was a systems design project, not an A/B test. The output was the architecture itself — a documented, reproducible, tier-aware notification system that the team could maintain and extend. Before this, every new notification was ad-hoc. After this, every new trigger has a defined slot, a defined audience, a defined priority, and a conflict resolution rule.
          </p>
          <div className="space-y-3">
            {[
              '27+ trigger events documented with timing, segment, priority tier, conflict rules, and suppression conditions',
              'Festival calendar: 27 occasions across 7 months, geo-segmented across 5 zones, with multi-occasion date handling',
              'Evergreen greeting library: 13 types, copy written, template IDs assigned',
              'Multi-batch voucher feature release notification: 5 variants written and A/B-tested',
              'Conflict resolution SOP for all identified edge cases — used by the team for all future notification planning',
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="w-6 h-6 bg-ink text-white rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-sm text-ink/80 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* SECTION 5: RETROSPECTIVE */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">RETROSPECTIVE</h2>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-sky border-2 border-black rounded-2xl p-7">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">1</div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                Notification strategy is product strategy. Every send decision encodes a priority — what the product thinks matters most right now. Getting the P0/P1/P2/P3 hierarchy right is equivalent to getting the product&#39;s value proposition right for that user at that moment.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">2</div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                I&#39;d have added open rate and action rate tracking per trigger from day one. We had segment data but not per-notification-type engagement data. Without that, you can&#39;t iterate on what&#39;s working.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">3</div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                The 3-slot cap was set conservatively. With proper measurement in place for 60 days, I&#39;d have tested a 4-slot cap for PRO+ users on GSTR-1 filing weeks — where compliance urgency is high and users are already in &#39;active business management mode.&#39;
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav prev="livekeeping-send-greetings" next="livekeeping-report-automation" />
    </motion.div>
  );
};

export default LiveKeepingNotifications;
