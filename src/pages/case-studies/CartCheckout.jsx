import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import { containerVariants, itemVariants } from '@/components/case-studies/animations';
import Card from '@/components/case-studies/Card';
import ContextBar from '@/components/case-studies/ContextBar';
import BottomNav from '@/components/case-studies/BottomNav';

const CartCheckout = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16"
    >
      <PageMeta
        title="Case Study: Cart & Checkout — –26% | Saswata S. Sengupta"
        description="How I reduced cart abandonment from 73.1% to 53.9% through checkout instrumentation and three targeted fixes at Sierra Living Concepts."
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
        className="bg-blush border-2 border-black rounded-2xl p-10 md:p-16"
        style={{ boxShadow: '12px 12px 0px 0px #E85D3A' }}
      >
        <ContextBar company="Sierra Living Concepts" period="2024" tags={['D2C', 'E-Commerce']} />
        <h1 className="font-display font-black text-4xl md:text-6xl text-ink leading-tight">
          73% cart abandonment isn&#39;t a Shopify problem. It&#39;s an instrumentation problem.
        </h1>
        <p className="text-xl text-ink/60 font-medium mt-4 max-w-4xl">
          480,000 sessions. Three friction points. Two sprints. Zero architecture changes. The checkout didn&#39;t need to be rebuilt — it needed to be measured.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { value: '73.1 → 53.9%', label: 'Cart Abandonment', sub: 'Before → After', color: 'text-ink' },
            { value: '–26%', label: 'Relative Reduction', sub: 'Two-sprint improvement', color: 'text-ink' },
            { value: '+47%', label: 'Mobile CVR', sub: 'Mobile checkout conversion', color: 'text-ink' },
            { value: '480K', label: 'Sessions Analysed', sub: 'GA4 + Clarity data set', color: 'text-ink' },
          ].map((m, i) => (
            <div key={i} className="bg-coral/30 border border-ink/20 rounded-xl p-4">
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
        <span>Role: Growth PM — Instrumentation, diagnosis, A/B test design, stakeholder communication</span>
        <span className="hidden md:block">|</span>
        <span>Platform: Sierra Living Concepts · D2C furniture e-commerce · Shopify Plus</span>
        <span className="hidden md:block">|</span>
        <span>Duration: 6 weeks (2 sprints)</span>
      </motion.div>

      {/* SECTION 1: BEFORE STATE */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">BEFORE STATE</h2>

        <Card>
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            Cart abandonment was sitting at 73.1% — a significant leak in the conversion funnel. The business knew the number but not the why. No funnel instrumentation existed below the product detail page. The default Shopify analytics showed a flat abandonment rate with no step-by-step breakdown, making it impossible to identify where users were dropping off or why.
          </p>
        </Card>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-coral/20 border-2 border-black rounded-xl p-5 mt-4">
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            Three months of GA4 data existed. Nobody had configured custom events for the checkout flow. The team was optimising based on aggregate numbers and anecdotal support tickets — trying to fix a leak they couldn&#39;t see.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-sky border-2 border-black rounded-xl p-5 mt-4">
          <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
            Baymard Institute&#39;s large-scale checkout research identified 8 critical UX violations in the current flow — overlapping with the exact friction points customers were quietly abandoning over. The data existed. It just hadn&#39;t been connected to Sierra&#39;s specific implementation.
          </p>
        </motion.div>
      </div>

      {/* SECTION 2: HOW I FOUND IT */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">HOW I FOUND IT</h2>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-blush border-2 border-black rounded-2xl p-8">
          <p className="text-lg font-display font-black text-ink mb-6">I built the measurement layer the checkout had always been missing.</p>

          {[
            "Configured GA4 custom events across every checkout step — cart view, shipping information, payment information, order review, purchase. No checkout had ever been instrumented below the 'added to cart' event.",
            'Layered Microsoft Clarity heatmaps and session recordings on top. Watched 50+ full checkout sessions across desktop and mobile. The patterns were consistent and unmistakable.',
            'Cross-referenced Clarity rage-click data with GA4 event drop-off. Three distinct clusters emerged within two weeks of instrumentation: shipping estimate abandonment, promo code rage clicks, and payment error exits with no recovery path.',
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
            What looked like &#39;high cart abandonment&#39; was actually three separate problems happening to different users at different points. Treating them as one problem would have fixed nothing. Each required a specific, independent fix — and they didn&#39;t need a checkout rebuild.
          </p>
        </motion.div>
      </div>

      {/* SECTION 3: WHAT WE SHIPPED */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">WHAT WE SHIPPED</h2>

        <Card>
          <p className="text-lg font-display font-black text-ink mb-6">Three targeted fixes. Two sprints. Each validated independently.</p>

          {[
            'Fix 1 — Shipping cost on the cart page. Users were reaching the shipping estimate step and seeing the full cost for the first time. Added transparent shipping cost display on the cart page so users saw the complete total before entering checkout.',
            'Fix 2 — Promo code validation. Users were rage-clicking a non-functional promo code field. Fixed inline validation with error messaging that told users exactly what went wrong — wrong format, expired code, or ineligible category.',
            'Fix 3 — Payment error recovery. Users were abandoning after a generic "something went wrong" message. Replaced with specific copy referencing card type, expiry, or network decline — and added a visible retry path.',
          ].map((fix, i) => (
            <div key={i} className="flex items-center gap-3 mb-3 last:mb-0 bg-canvas border-2 border-black rounded-xl p-4">
              <span className="text-xs font-black text-ink/40 w-8">{i + 1}.</span>
              <p className="text-sm text-ink/80 font-medium leading-relaxed">{fix}</p>
            </div>
          ))}
        </Card>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {[
            { label: 'Shipping Display', value: 'Before checkout entry', bg: 'bg-lemon' },
            { label: 'Promo Validation', value: 'Inline error messaging', bg: 'bg-sky' },
            { label: 'Payment Recovery', value: 'Specific retry path', bg: 'bg-mint' },
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
            { label: 'Cart Abandonment', value: '73.1 → 53.9%', bg: 'bg-blush' },
            { label: 'Mobile Conversion Rate', value: '+47%', bg: 'bg-mint' },
            { label: 'Checkout Completion', value: '+49%', bg: 'bg-sky' },
            { label: 'Sprints to Ship', value: '2', bg: 'bg-lemon' },
          ].map((k, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.02, y: -2 }} className={`${k.bg} border-2 border-black rounded-2xl p-6 text-center`}>
              <p className="text-xs font-black text-ink/40 uppercase">{k.label}</p>
              <p className="font-display font-black text-3xl text-ink mt-2">{k.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-ink border-2 border-black rounded-2xl p-6 mt-4">
          <p className="text-white font-display font-black text-lg">No single-page checkout rebuild. No platform migration. Just instrumentation followed by targeted fixes.</p>
          <p className="text-white/70 text-sm mt-2 leading-relaxed">
            The checkout template stayed the same. What changed was the execution quality of every step. The results came from improving the existing checkout rather than replacing the platform.
          </p>
          <p className="text-coral font-black mt-3">The checkout didn&#39;t need to be rebuilt. It needed to be understood.</p>
        </motion.div>
      </div>

      {/* SECTION 5: RETROSPECTIVE */}
      <div className="mt-8">
        <h2 className="text-xs font-black text-ink/40 uppercase tracking-widest mb-4">RETROSPECTIVE</h2>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.005, y: -2 }} className="bg-blush border-2 border-black rounded-2xl p-7">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">1</div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                The three problems looked like one because the data only showed the aggregate. Step-level instrumentation was the unlock — without it, we were trying to diagnose a three-part fracture with a single X-ray. Always instrument before you diagnose.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">2</div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                Session recordings should have started earlier. We had 480K sessions of data we couldn&#39;t use because nobody had turned on recordings. Two weeks of recordings gave us more actionable insight than three months of aggregate dashboards.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-ink text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">3</div>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed">
                Baymard&#39;s research was sitting in a folder for months. Nobody had mapped their 8 critical violations to our specific checkout. External UX benchmarks are only useful when you test them against your own implementation. I&#39;d do this mapping earlier next time.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="mt-8 bg-ink text-white border-2 border-black rounded-2xl p-7">
        <p className="text-xs font-black text-lemon uppercase tracking-widest mb-2">Read the full breakdown</p>
        <p className="text-lg font-display font-black leading-snug">
          How I took checkout abandonment from 73.1% to 53.9% — a complete teardown with the numbers, the three friction points, and the fixes.
        </p>
        <Link
          to="/blog/checkout-abandonment-73-to-54"
          className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-lg bg-lemon text-ink text-sm font-black border-2 border-white hover:bg-white transition-colors"
        >
          Read the blog post
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      <BottomNav next="category-discovery" />
    </motion.div>
  );
};

export default CartCheckout;
