import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import { containerVariants, itemVariants } from '@/components/case-studies/animations';
import Card from '@/components/case-studies/Card';
import ContextBar from '@/components/case-studies/ContextBar';
import BottomNav from '@/components/case-studies/BottomNav';

const CategoryDiscovery = () => {
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
        style={{ boxShadow: '12px 12px 0px 0px #625BF6' }}
      >
        <ContextBar company="Sierra Living Concepts" period="2024" tags={['D2C', 'UX']} />
        <h1 className="font-display font-black text-4xl md:text-6xl text-ink leading-tight">
          Help shoppers find the right category.
        </h1>
        <p className="text-xl text-ink/60 font-medium mt-4 max-w-4xl">
          Research across 1.1 million BigQuery events and 376 in-session intercepts shaped category journeys built around comparison, trust and product discovery.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { value: '+34%', label: 'Qualified Leads', sub: 'After the redesign', color: 'text-ink' },
            { value: '+24%', label: 'Session Duration', sub: 'Deeper browse engagement', color: 'text-ink' },
            { value: '–16%', label: 'Bounce Rate', sub: 'More users stayed', color: 'text-ink' },
            { value: '+27%', label: 'Add-to-Cart Rate', sub: 'Downstream conversion lift', color: 'text-ink' },
          ].map((m, i) => (
            <div key={i} className="bg-purple/20 border border-ink/20 rounded-xl p-4">
              <div className={`font-display font-black text-3xl ${m.color}`}>{m.value}</div>
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
        <span>Role: Growth PM — Analytics implementation, UX audit, sprint management, design alignment</span>
        <span className="hidden md:block">|</span>
        <span>Platform: Sierra Living Concepts · Shopify Plus · 1.1M BigQuery events/month</span>
        <span className="hidden md:block">|</span>
        <span>Duration: 4-week sprint</span>
      </motion.div>

      {/* SECTION 1: BEFORE STATE */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">BEFORE STATE</h2>

        <Card>
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            Category pages were underperforming across both desktop and mobile templates. Session-to-PDP-click conversion was below benchmark, and the team had a long list of anecdotal UX complaints but no data-backed prioritisation. The category page acted as the primary browse-to-product gateway — any friction here multiplied across every downstream metric.
          </p>
        </Card>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-purple/20 border-2 border-black rounded-xl p-5 mt-4">
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            The product catalogue spanned hundreds of SKUs across furniture categories — sideboards, dining sets, beds, home office. Each category template was supposed to follow the same design spec, but over months of iterative changes, the templates had diverged. Inconsistent card sizing, missing hover states, broken filter dropdowns — the degradation was invisible unless you watched real sessions.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-lemon border-2 border-black rounded-xl p-5 mt-4">
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            The team had a shared notion that the category pages &#39;felt off&#39; but couldn&#39;t articulate why. Without data, every complaint was equally valid — and equally easy to deprioritise. The backlog had UX tickets that had been sitting untouched for three months.
          </p>
        </motion.div>
      </div>

      {/* SECTION 2: HOW I FOUND IT */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">HOW I FOUND IT</h2>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-sky border-2 border-black rounded-2xl p-8">
          <p className="text-lg font-display font-black text-ink mb-6">I turned 1.1M events into a ranked hit-list of UX failures.</p>

          {[
            'Set up GA4 custom events for every category interaction — filter use, sort changes, product card clicks, pagination behaviour. Nobody had ever instrumented the category page below page_view.',
            'Ran Clarity heatmaps and scroll maps across the top 10 category pages by traffic volume. Watched real users navigate, hover, hesitate, and leave. The gap between what the template intended and what users experienced was stark.',
            'Categorised every issue by severity score (frequency × business impact). The final list had 30+ distinct UX problems: inconsistent card sizing causing layout shift, filter dropdowns overlapping content, mobile touch targets below 48px minimum, missing hover states on product cards, and skeleton loading states that collapsed mid-render.',
          ].map((step, i) => (
            <div key={i} className="flex gap-3 mb-4 last:mb-0">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">{i + 1}</div>
              <motion.div whileHover={{ scale: 1.01, y: -2 }} className="bg-white border-2 border-black rounded-xl p-4 flex-1">
                <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">{step}</p>
              </motion.div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-ink border-2 border-black rounded-xl p-5 mt-4">
          <p className="text-white text-sm md:text-base font-medium leading-relaxed">
            The most expensive discovery: the template itself was structurally sound. The execution had degraded through months of uncoordinated changes. Rebuilding from scratch would have wasted weeks. The fix was a systematic restoration, not a redesign.
          </p>
        </motion.div>
      </div>

      {/* SECTION 3: WHAT WE SHIPPED */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">WHAT WE SHIPPED</h2>

        <Card>
          <p className="text-lg font-display font-black text-ink mb-6">30+ issues fixed in one 4-week sprint. Every fix validated with before/after heatmaps.</p>

          {[
            'Rebuilt desktop and mobile category page templates against the Figma design library. Standardised card components, consistent sizing, and proper hover states across all categories.',
            'Fixed filter interaction patterns — dropdowns that overlapped content were repositioned, mobile filters were converted to full-screen overlays with proper touch targets, and active filters were visually highlighted.',
            'Added skeleton loading states that respected final card dimensions (no layout shift). Optimised image dimensions across breakpoints. Standardised the product card component into a single source of truth consumed by all category templates.',
          ].map((fix, i) => (
            <div key={i} className="flex items-center gap-3 mb-3 last:mb-0 bg-canvas border-2 border-black rounded-xl p-4">
              <span className="text-xs font-black text-ink/40 w-8">{i + 1}.</span>
              <p className="text-sm text-ink/80 font-medium leading-relaxed">{fix}</p>
            </div>
          ))}
        </Card>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {[
            { label: 'Issues Fixed', value: '30+', bg: 'bg-sky' },
            { label: 'Sprint Duration', value: '4 weeks', bg: 'bg-lemon' },
            { label: 'Template Approach', value: 'Restoration, not redesign', bg: 'bg-mint' },
          ].map((k, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.02, y: -2 }} className={`${k.bg} border-2 border-black rounded-2xl p-5 text-center`}>
              <p className="text-xs font-black text-ink/40 uppercase">{k.label}</p>
              <p className="font-display font-black text-xl text-ink mt-2">{k.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* SECTION 4: OUTCOME */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">WHAT THIS CHANGED</h2>

        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Session → PDP Click', value: '+34%', bg: 'bg-sky' },
            { label: 'Session Duration', value: '+24%', bg: 'bg-mint' },
            { label: 'Bounce Rate', value: '–16%', bg: 'bg-lemon' },
            { label: 'Add-to-Cart Rate', value: '+27%', bg: 'bg-blush' },
          ].map((k, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.02, y: -2 }} className={`${k.bg} border-2 border-black rounded-2xl p-6 text-center`}>
              <p className="text-xs font-black text-ink/40 uppercase">{k.label}</p>
              <p className="font-display font-black text-3xl text-ink mt-2">{k.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-ink border-2 border-black rounded-2xl p-6 mt-4">
          <p className="text-white font-display font-black text-lg">The template remained the same. The quality of execution changed.</p>
          <p className="text-white/70 text-sm mt-2 leading-relaxed">
            Heatmap validation showed users engaging with formerly ignored product cards. Filter interaction time dropped significantly because visual hierarchy was clear. The biggest win: the category page no longer leaked traffic before users could reach product detail pages. Each percentage point of improvement in session-to-PDP conversion compounded into downstream gains in add-to-cart and purchase rates.
          </p>
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
                The severity scoring system was the most important tool I built. Without a ranked list, every UX complaint has equal urgency. With a ranked list, we could confidently say &#39;fix these 10 first, defer these 5&#39; — and defend that decision with data.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">2</div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                The template degradation happened gradually — no single change broke anything visibly. That&#39;s exactly why periodic UX audits matter. A quarterly heatmap and session recording review would have caught 80% of these issues before they compounded.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">3</div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                I should have run the same analysis on the product detail page template simultaneously. Category page and PDP are interdependent — fixing one without auditing the other limits the overall funnel improvement. The PDP became the next sprint.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav prev="cart-checkout" next="lead-form" />
    </motion.div>
  );
};

export default CategoryDiscovery;
