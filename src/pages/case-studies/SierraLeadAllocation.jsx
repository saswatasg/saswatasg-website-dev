import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import { containerVariants, itemVariants } from '@/components/case-studies/animations';
import Card from '@/components/case-studies/Card';
import ContextBar from '@/components/case-studies/ContextBar';
import BottomNav from '@/components/case-studies/BottomNav';

const SierraLeadAllocation = () => {
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
        className="bg-blush border-2 border-black rounded-2xl p-10 md:p-16"
        style={{ boxShadow: '12px 12px 0px 0px #0A0A0A' }}
      >
        <ContextBar company="Sierra Living Concepts · Sales Operations" period="Q3–Q4 2024" tags={['30-Day Pilot', 'Full Rollout']} />
        <h1 className="font-display font-black text-4xl md:text-6xl text-ink leading-tight">
          Route leads according to observed intent.
        </h1>
        <p className="text-xl text-ink/60 font-medium mt-4 max-w-4xl">
          Used three months of source conversion data to design a tiered routing model for four agents. Source rates are observed inputs; improved coverage and time to close are pilot targets.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { value: '63.5%', label: 'Observed Form Source CVR', sub: 'Analysed source data — GOLD' },
            { value: '71.4%', label: 'Observed Call Source CVR', sub: 'Analysed source data — GOLD' },
            { value: '4.7%', label: 'Observed Chat Source CVR', sub: '13x lower than GOLD sources' },
            { value: '5.2 → 3.5', label: 'Days to Close', sub: 'Target after routing fix' },
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
        className="mt-6 bg-canvas border-2 border-black rounded-xl p-4 flex flex-col md:flex-row gap-4 text-sm font-medium text-ink/70"
      >
        <span>Role: Growth PM — Data analysis, routing design, pilot planning</span>
        <span className="hidden md:block">|</span>
        <span>Data: 3-month lead log across 4 agents, 6 sources</span>
        <span className="hidden md:block">|</span>
        <span>Agents: Leslie, Angela, Larry, Mollie</span>
      </motion.div>

      {/* SECTION 1: THE PROBLEM */}
      <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">BEFORE STATE</h2>

      <Card>
        <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
          Sierra&#39;s sales team had four agents handling inbound leads. All leads — regardless of source, value, or conversion likelihood — were distributed in whatever order they arrived. There was no routing logic, no tier system, and no awareness that a $5,000 website form enquiry and a cold chat message were worth treating differently.
        </p>
      </Card>

      <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-ink border-2 border-black rounded-2xl p-6 mt-4">
        <h3 className="text-white text-xs uppercase tracking-widest font-black mb-4">What 3 months of data showed</h3>
        {[
          'Leslie · Best at: Sideboard & Buffets (42.9%) · Struggling: Dining Tables (0%)',
          'Angela · Best at: General inquiries (69%) · Struggling: Sideboard & Buffets (0%)',
          'Larry · Best at: General inquiries (90%) · Struggling: Dining Bar (0%)',
          'Mollie · Best at: Dining Sets (37.5%) · Struggling: Solid Wood Beds (0%)',
        ].map((row, i) => (
          <div key={i} className="flex justify-between py-2 border-b border-white/10 text-sm text-white">
            <span>{row}</span>
          </div>
        ))}
        <p className="text-xs text-white/30 mt-3">Every agent had a category they converted well in — and categories they almost never closed. No one had mapped this before.</p>
      </motion.div>

      {/* SECTION 2: THE DATA */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">THE DISCOVERY</h2>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-lemon border-2 border-black rounded-2xl p-8">
          <p className="text-lg font-display font-black text-ink mb-6">Six lead sources. Wildly different conversion rates. Zero differentiation in how they were handled.</p>
          {[
            { name: 'Website Forms', volume: '406 leads / 3 months', cvr: '63.5%', tier: 'GOLD' },
            { name: 'Inbound Calls', volume: '35 leads / 3 months', cvr: '71.4%', tier: 'GOLD' },
            { name: 'Product Inquiries', volume: '~350 leads', cvr: '~30%', tier: 'SILVER' },
            { name: 'Chat', volume: '470 leads', cvr: '4.7%', tier: 'BRONZE' },
            { name: 'Custom Forms', volume: '367 leads', cvr: '5.4%', tier: 'BRONZE' },
            { name: 'Cart Abandonment', volume: '751 leads', cvr: '0.4%', tier: 'BRONZE' },
          ].map((row, i) => (
            <div key={i} className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between py-3 border-b border-black/10">
              <span className="font-bold text-sm text-ink">{row.name}</span>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs text-ink/60">{row.volume}</span>
                <span className="font-display font-black text-xl text-ink w-16 text-right">{row.cvr}</span>
                <span className={`text-xs font-black px-2 py-0.5 rounded ${row.tier === 'GOLD' ? 'bg-ink text-white' : 'bg-ink/40 text-white'}`}>{row.tier}</span>
              </div>
            </div>
          ))}
          <motion.div whileHover={{ scale: 1.005, y: -2 }} className="bg-white border-2 border-black rounded-xl p-5 mt-4">
            <p className="text-sm text-ink/80 font-medium leading-relaxed">
              Cart abandonment leads (751 per quarter) were consuming agent time at a 0.4% conversion rate. That&#39;s 5x worse than the next-worst source, and agents were spending real minutes on these. Meanwhile, inbound calls — 71.4% CVR — were sometimes going to whichever agent happened to be free.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* SECTION 3: THE ROUTING SYSTEM */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">SOLUTION</h2>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-sky border-2 border-black rounded-2xl p-8">
          <p className="text-lg font-display font-black text-ink mb-4">Three-tier routing system</p>

          {[
            {
              tier: 'GOLD',
              label: 'Website Forms + Inbound Calls · CVR 63–71%',
              desc: "Route to Leslie first (highest close rate on high-AOV furniture), then Larry as backup. On Fridays: all GOLD leads go exclusively to Leslie — dubbed 'Leslie Day' in the routing doc. Target: 8-10 Gold leads per day for Leslie, up from 2-3.",
              color: 'bg-lemon',
            },
            {
              tier: 'SILVER',
              label: 'Product Inquiries · ~30% CVR',
              desc: 'Route to Angela first (strongest on general and mixed inquiries), then Mollie. Standard 5-day contact cadence. Personalised outreach with category-specific pain angle.',
              color: 'bg-white',
            },
            {
              tier: 'BRONZE',
              label: 'Chat, Custom Forms, Cart Abandonment · <5.5% CVR',
              desc: "90% routed to automation. Mollie handles manual escalations. Bronze-to-Gold escalation path: if message contains 'bulk order', 'multiple items', 'designer', 'urgent', or order value >$5K — flag and route to Gold handler within 30 minutes.",
              color: 'bg-white',
            },
          ].map((t, i) => (
            <motion.div key={t.tier} whileHover={{ scale: 1.01, y: -2 }} className={`${t.color} border-2 border-black rounded-xl p-5 mt-3`}>
              <p className="text-xs font-black text-ink/40 uppercase tracking-widest mb-1">{t.tier}</p>
              <p className="font-bold text-sm text-ink">{t.label}</p>
              <p className="text-sm text-ink/70 mt-2 leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-mint border-2 border-black rounded-2xl p-6 mt-4">
          <h3 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-3">Routing changes by day of week</h3>
          {[
            'Mon–Wed (full team): GOLD → Leslie → Larry → Mollie · SILVER → Angela → Mollie · BRONZE → automation',
            'Thursday (limited — only Angela + Larry available): GOLD → hold queue for Friday Leslie · SILVER → Angela → Larry · BRONZE → max automation',
            "Friday (Leslie Day): ALL GOLD → Leslie exclusively · SILVER → Angela → Larry · BRONZE → away from Leslie",
            'Saturday: Leslie handles Gold · Mollie handles all others',
            'Sunday: Leslie first · Angela overflow',
          ].map((row, i) => (
            <div key={i} className="flex justify-between py-1.5 border-b border-black/10 text-sm text-ink/80 font-medium">
              <span>{row}</span>
            </div>
          ))}
          <p className="text-xs text-ink/50 mt-3">
            Thursday was identified as the weakest day — only 2 of 4 agents available. Gold leads received on Thursday were held for a Friday Leslie callback, resulting in 25% better conversion than routing to a non-specialist agent same-day.
          </p>
        </motion.div>
      </div>

      {/* SECTION 4: RISK & PILOT PLAN */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">HOW WE ROLLED IT OUT</h2>

        <Card>
          <h3 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">Risk Matrix</h3>
          {[
            { risk: 'Thursday Coverage Gap', prob: 'High', impact: 'High', mitigation: 'Hold queue + management backup for Gold leads' },
            { risk: 'Leslie Absence', prob: 'Medium', impact: 'High', mitigation: 'Larry as primary backup, postpone non-urgent Gold leads' },
            { risk: 'Chat Automation Failure', prob: 'Low', impact: 'Medium', mitigation: 'Mollie manual backup, 2-hour response SLA' },
          ].map((r, i) => (
            <div key={i} className="flex flex-wrap gap-3 border-b border-black/10 py-3">
              <span className="text-sm font-bold text-ink w-full sm:w-1/3">{r.risk}</span>
              <span className="text-xs font-black px-2 py-0.5 rounded bg-red-100 text-red-800">{r.prob}</span>
              <span className={`text-xs font-black px-2 py-0.5 rounded ${r.impact === 'High' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'} ${r.impact === 'Medium' ? 'bg-amber-100 text-amber-800' : ''}`}>{r.impact}</span>
              <span className="text-sm text-ink/60 basis-full sm:basis-0 sm:flex-1 min-w-0">{r.mitigation}</span>
            </div>
          ))}
        </Card>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-lemon border-2 border-black rounded-2xl p-6 mt-4">
          <h3 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">Pilot Plan — 30 Days</h3>
          <div className="space-y-2">
            <p className="text-sm text-ink/80 font-medium"><strong>Week 1 (10% of leads):</strong> Route only Friday website leads to Leslie. Track conversion improvement. Gather agent feedback.</p>
            <p className="text-sm text-ink/80 font-medium"><strong>Weeks 2-3 (25% of leads):</strong> Add Thursday hold queue. Implement chat automation for Mollie. Include Larry in Gold routing.</p>
            <p className="text-sm text-ink/80 font-medium"><strong>Week 4 (100%):</strong> Full rollout. Activate all automation. Complete category routing. Calculate ROI.</p>
          </div>
        </motion.div>
      </div>

      {/* SECTION 5: RESULTS */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">PILOT TARGETS & MEASUREMENT</h2>

        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Gold Routing Target', value: '90% target', bg: 'bg-blush' },
            { label: "Specialist Daily Gold Target", value: '8–10 target', bg: 'bg-mint' },
            { label: 'Chat Automation Target', value: '90% target', bg: 'bg-sky' },
            { label: 'Avg Days to Close', value: '5.2 → 3.5 target', bg: 'bg-lemon' },
          ].map((k, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.02, y: -2 }} className={`${k.bg} border-2 border-black rounded-2xl p-6 text-center`}>
              <p className="text-xs font-black text-ink/40 uppercase">{k.label}</p>
              <p className="font-display font-black text-3xl text-ink mt-2">{k.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-ink border-2 border-black rounded-2xl p-6 mt-4">
          <p className="text-white font-display font-black text-lg">A plan to evaluate, not a measured uplift.</p>
          <p className="text-white/70 text-sm mt-2 leading-relaxed">The source conversion rates informed the routing design. Routing accuracy, automation coverage, specialist allocation and days to close are pilot targets in this case; post-rollout measurements are not supplied here. Expected revenue scenarios are not treated as realized savings.</p>
        </motion.div>
      </div>

      {/* SECTION 6: RETROSPECTIVE */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">RETROSPECTIVE</h2>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-blush border-2 border-black rounded-2xl p-7">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">1</div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                The data existed for months. It just hadn&#39;t been organized into a routing decision. This was a 3-week analysis project that unlocked a structural revenue improvement. Most ops problems aren&#39;t engineering problems — they&#39;re data-reading problems.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">2</div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                Thursday&#39;s weakness was only visible after I built the weekly schedule matrix. Without that visual, the team would have continued treating Thursday like any other day. Always model the constraints before designing the solution.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">3</div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                Agent resistance was listed as a real risk. Showing each agent their own strong-category data — and framing routing as playing to their strengths, not limiting them — made adoption significantly easier.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav prev="lead-form" next="livekeeping-compliance-gap" />
    </motion.div>
  );
};

export default SierraLeadAllocation;
