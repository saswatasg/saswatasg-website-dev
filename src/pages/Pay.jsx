import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PageMeta from '@/components/PageMeta';
import RazorpayCheckout from '@/components/payments/RazorpayCheckout';
import { Lock, ArrowLeft, CheckCircle2, ShieldCheck, Clock, FileText, BadgeCheck, MessageCircle, Link2, Copy, Check, Unlock } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';

function parseAmountParam(v) {
  if (!v) return null;
  const n = Number(v);
  if (!Number.isFinite(n) || n < 1) return null;
  return Math.floor(n);
}

const TIERS = [
  {
    name: 'Teardown Audit',
    price: 25000,
    tag: 'Most popular',
    timeline: '3 days',
    for: 'Stores doing ₹10L+/mo',
    includes: ['45-min Loom teardown', '5 fixes ranked by ROI', 'Notion doc + next steps', 'Async Q&A (7 days)'],
    cta: 'Pay ₹25,000',
  },
  {
    name: '2-Week Sprint',
    price: 120000,
    tag: 'Implementation',
    timeline: '14 days',
    for: 'Teams ready to ship',
    includes: ['Everything in Audit', 'Implement top 3 fixes', 'GA4 instrumentation', 'Before/after report + Slack'],
    cta: 'Pay ₹1,20,000',
  },
];

export default function Pay() {
  const [searchParams, setSearchParams] = useSearchParams();
  const amountParam = parseAmountParam(searchParams.get('amount'));
  const isLocked = (searchParams.get('locked') === '1' || searchParams.get('locked') === 'true' || searchParams.get('lock') === '1' || searchParams.get('lock') === 'true') && amountParam !== null;

  const [amount, setAmount] = useState(amountParam ? String(amountParam) : '');
  const [successData, setSuccessData] = useState(null);
  const [copied, setCopied] = useState(null);

  const effectiveAmount = isLocked ? amountParam : (Number(amount) >= 1 ? Math.floor(Number(amount)) : 0);
  const canPay = effectiveAmount >= 1;

  const shareLink = useMemo(() => {
    if (typeof window === 'undefined') return `/pay?amount=${effectiveAmount}`;
    return `${window.location.origin}/pay?amount=${effectiveAmount}`;
  }, [effectiveAmount]);
  const lockedLink = useMemo(() => {
    if (typeof window === 'undefined') return `/pay?amount=${effectiveAmount}&locked=1`;
    return `${window.location.origin}/pay?amount=${effectiveAmount}&locked=1`;
  }, [effectiveAmount]);
  const copy = async (text, key) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
    trackEvent('pay', 'copy_link', key);
  };

  const handleAmountChange = (e) => {
    if (isLocked) return;
    const cleaned = e.target.value.replace(/[^0-9]/g, '');
    setAmount(cleaned);
    const n = Number(cleaned);
    if (Number.isFinite(n) && n >= 1) {
      setSearchParams({ amount: String(Math.floor(n)) }, { replace: true });
    } else if (cleaned === '') {
      const params = new URLSearchParams(searchParams);
      params.delete('amount');
      setSearchParams(params, { replace: true });
    }
  };

  const handleTierClick = (price) => {
    setAmount(String(price));
    setSearchParams({ amount: String(price) }, { replace: true });
    trackEvent('pay', 'tier_click', `₹${price}`);
    document.getElementById('pay-amount')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.getElementById('pay-amount')?.focus();
  };

  if (successData) {
    return (
      <>
        <PageMeta title="Payment successful — Saswata Sengupta" description="Your payment was completed securely via Razorpay." />
        <div className="max-w-[560px] mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-16">
          <div className="bg-white border-2 border-black rounded-2xl p-8 md:p-10 text-center" style={{ boxShadow: '8px 8px 0px 0px #0A0A0A' }}>
            <div className="w-16 h-16 bg-green-500 rounded-full border-2 border-black flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-black text-2xl text-ink">Payment successful</h1>
            <p className="text-sm font-bold text-ink/60 mt-2">Thank you — your payment of <span className="text-ink">₹{successData.amount}</span> has been received.</p>
            <div className="mt-6 bg-canvas border-2 border-black rounded-xl p-4 text-left">
              <p className="text-xs font-black tracking-widest text-ink/40">PAYMENT ID</p>
              <p className="font-mono text-sm font-bold text-ink mt-1 break-all">{successData.paymentId}</p>
              <p className="text-xs font-bold text-ink/50 mt-3 flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Secured by Razorpay • Receipt sent to your email if provided</p>
            </div>
            <p className="text-xs font-bold text-ink/40 mt-4">What’s next? I’ll confirm within 24h and share next steps. Questions? <a href="mailto:saswatasg@gmail.com" className="underline text-ink">saswatasg@gmail.com</a></p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/" className="px-6 py-3 rounded-xl bg-ink text-white border-2 border-black font-black text-sm text-center" style={{ boxShadow: '4px 4px 0px 0px #0A0A0A' }}>Back to home</Link>
              <Link to="/contact" className="px-6 py-3 rounded-xl bg-white text-ink border-2 border-black font-black text-sm text-center">Contact</Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta title="Pay — Saswata Sengupta" description="Pay for Teardown Audit (₹25k), 2-Week Sprint (₹1.2L) or custom amount. Secure via Razorpay — UPI, Cards, Net Banking." />
      <div className="max-w-[760px] mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-16">
        <div className="text-center mb-8">
          <h1 className="font-display font-black text-3xl md:text-4xl text-ink tracking-tight">Pay Saswata</h1>
          <p className="text-sm font-medium text-ink/60 mt-2 max-w-[600px] mx-auto">Consulting, teardown or sprint — pick a package or set a custom amount. All payments are secured by Razorpay. Receipt auto-emailed.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {TIERS.map((tier) => (
            <div key={tier.name} className="bg-white border-2 border-black rounded-2xl p-6 flex flex-col" style={{ boxShadow: '6px 6px 0px 0px #0A0A0A' }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display font-black text-base text-ink">{tier.name}</h3>
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg border-2 border-black ${tier.price === 25000 ? 'bg-lemon text-ink' : 'bg-white text-ink'}`}>{tier.tag}</span>
              </div>
              <p className="text-2xl font-black text-ink">₹{tier.price.toLocaleString('en-IN')}</p>
              <p className="text-xs font-bold text-ink/50 flex items-center gap-1 mt-1"><Clock className="w-3 h-3" /> {tier.timeline} • {tier.for}</p>
              <ul className="mt-4 space-y-1.5 flex-1">
                {tier.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-medium text-ink/70"><BadgeCheck className="w-4 h-4 text-coral mt-0.5 flex-shrink-0" />{item}</li>
                ))}
              </ul>
              <button
                onClick={() => handleTierClick(tier.price)}
                className="mt-5 w-full bg-ink text-white border-2 border-black rounded-xl py-3 font-black text-sm hover:bg-coral hover:text-white transition-colors"
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-8" style={{ boxShadow: '8px 8px 0px 0px #0A0A0A' }}>
          <h2 className="font-display font-black text-lg text-ink flex items-center gap-2"><FileText className="w-5 h-5" /> Custom amount {isLocked && <span className="inline-flex items-center gap-1 text-xs bg-ink text-white px-2 py-1 rounded-lg border-2 border-black"><Lock className="w-3 h-3" /> Locked</span>}</h2>
          <p className="text-sm font-medium text-ink/60 mt-1">
            {isLocked ? `This link is fixed at ₹${effectiveAmount}. You can pay directly below.` : 'Agreed on a custom amount? Enter it here — or use /pay?amount=5000&locked=1 to share a locked link.'}
          </p>

          <div className="mt-6">
            <label htmlFor="pay-amount" className="text-xs font-black tracking-widest text-ink/50">AMOUNT (INR)</label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-lg text-ink">₹</span>
              <input
                id="pay-amount"
                type="text"
                inputMode="numeric"
                placeholder="Enter amount"
                value={isLocked ? String(effectiveAmount) : amount}
                onChange={handleAmountChange}
                disabled={isLocked}
                className="w-full pl-9 pr-4 py-4 rounded-xl border-2 border-black bg-canvas text-xl font-black text-ink placeholder:text-ink/30 focus:outline-none focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
            {!isLocked && <p className="text-xs font-bold text-ink/40 mt-2">Minimum ₹1 • Razorpay fees shown at checkout • GST where applicable</p>}
          </div>

          <div className="mt-6">
            <RazorpayCheckout
              amount={canPay ? effectiveAmount * 100 : 100}
              buttonText={canPay ? `Pay ₹${effectiveAmount.toLocaleString('en-IN')}` : 'Enter an amount'}
              disabled={!canPay}
              onSuccess={(resp) => {
                trackEvent('pay', 'success', `₹${effectiveAmount}`);
                setSuccessData({ amount: effectiveAmount, paymentId: resp.razorpay_payment_id });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onError={() => trackEvent('pay', 'failed', `₹${effectiveAmount}`)}
              onClose={() => trackEvent('pay', 'cancel', `₹${effectiveAmount}`)}
            />
            <p className="text-xs font-bold text-ink/40 text-center mt-3 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Secure • UPI • Cards • Net Banking • Wallets
            </p>
            <p className="text-xs font-bold text-ink/40 text-center mt-2">Questions? <a href="mailto:saswatasg@gmail.com" className="underline">saswatasg@gmail.com</a> • Refunds within 7 days of receipt • <Link to="/contact" className="underline">Contact</Link> for Terms</p>
          </div>

          {!isLocked && canPay && (
            <div className="mt-6 pt-6 border-t-2 border-black/10">
              <p className="text-xs font-black tracking-widest text-ink/50 mb-3 flex items-center gap-1"><Link2 className="w-3 h-3" /> SHARE THIS INVOICE (DEV)</p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input readOnly value={shareLink} className="flex-1 px-3 py-2 rounded-xl border-2 border-black bg-canvas font-mono text-xs font-bold truncate" />
                  <button onClick={() => copy(shareLink, 'link')} className="px-3 py-2 rounded-xl bg-white border-2 border-black font-black text-xs flex items-center gap-1 hover:bg-ink hover:text-white transition-colors">
                    {copied === 'link' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} {copied === 'link' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input readOnly value={lockedLink} className="flex-1 px-3 py-2 rounded-xl border-2 border-black bg-canvas font-mono text-xs font-bold truncate" />
                  <button onClick={() => copy(lockedLink, 'locked')} className="px-3 py-2 rounded-xl bg-ink text-white border-2 border-black font-black text-xs flex items-center gap-1 hover:bg-ink/90 transition-colors">
                    {copied === 'locked' ? <Check className="w-3 h-3" /> : <Lock className="w-3 h-3" />} {copied === 'locked' ? 'Copied' : 'Copy locked'}
                  </button>
                </div>
                <p className="text-[11px] font-bold text-ink/40">
                  <span className="inline-flex items-center gap-1"><Unlock className="w-3 h-3" /> Editable:</span> recipient can change &nbsp;•&nbsp; <span className="inline-flex items-center gap-1"><Lock className="w-3 h-3" /> Locked:</span> for invoice
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 bg-canvas border-2 border-black rounded-xl p-4 flex items-start gap-3">
          <MessageCircle className="w-5 h-5 text-ink mt-0.5" />
          <div>
            <p className="text-sm font-black text-ink">Not sure what you need?</p>
            <p className="text-sm font-medium text-ink/60">Book a 30-min teardown first — no deck, no pitch. <button onClick={() => { trackEvent('pay', 'book_teardown'); window.dispatchEvent(new CustomEvent('openCalendar')); }} className="underline font-black text-ink">Book a call</button> or <Link to="/contact" className="underline">contact me</Link>.</p>
          </div>
        </div>

        <Link to="/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-ink/60 hover:text-ink">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
      </div>
    </>
  );
}
