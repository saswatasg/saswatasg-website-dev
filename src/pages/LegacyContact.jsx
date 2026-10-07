import React from 'react';
import { motion } from 'framer-motion';
import PageMeta from '@/components/PageMeta';
const ContactForm = React.lazy(() => import('@/components/contact/ContactForm'));
import { openScheduleBooking } from '@/utils/openCalendar';
import { trackEvent } from '@/utils/analytics';
import { ArrowRight, Calendar, Sparkles, Clock, MapPin, Heart, MessageSquare, Linkedin, Instagram, Github, ExternalLink } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const XIcon = (props) => (
  <svg {...props} viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1058.01 1148.81H895.408L569.165 687.854V687.828Z" fill="currentColor"/>
  </svg>
);

const socialLinks = [
  { name: 'WhatsApp', icon: MessageSquare, handler: 'whatsapp', color: 'hover:text-[#25D366]' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/sss99', color: 'hover:text-[#0A66C2]' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/saswatasg99/', color: 'hover:text-[#E4405F]' },
  { name: 'Twitter', icon: XIcon, href: 'https://twitter.com/saswatasg', color: 'hover:text-ink' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/saswatasg', color: 'hover:text-[#333]' },
];

const Contact = () => {
  return (
    <>
      <PageMeta />
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="bg-mint border-2 border-black rounded-2xl p-8 md:p-12 lg:p-14 text-center relative overflow-hidden"
          style={{ boxShadow: '10px 10px 0px 0px #0A0A0A' }}
        >
          <motion.div
            className="absolute -top-3 -left-3 w-10 h-10 bg-coral rotate-12 border-2 border-black rounded-xl hidden md:block"
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute bottom-6 -right-3 w-8 h-8 bg-lemon -rotate-12 border-2 border-black rounded-xl hidden md:block"
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute top-1/2 -right-4 w-6 h-6 bg-sky rotate-45 border-2 border-black rounded-xl hidden lg:block"
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />

          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ink text-white text-xs font-bold border-2 border-black mb-3"
          >
            <Sparkles className="w-3 h-3" />
            Get in Touch
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="text-ink text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight"
          >
            Let's{' '}
            <motion.span
              className="text-ink/50 inline-block"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              talk
            </motion.span>
            <motion.span
              className="inline-block ml-1"
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              👋
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.3 }}
            className="mt-2 text-sm md:text-base text-ink/70 font-medium max-w-2xl mx-auto"
          >
            Whether you have a project in mind, a collaboration idea, or just want to say hello — I'd love to hear from you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <div className="relative inline-flex group">
              <div className="absolute inset-0 rounded-lg border-2 border-black bg-coral translate-x-[3px] translate-y-[3px]" />
              <button onClick={() => { trackEvent('contact', 'lets_talk'); openScheduleBooking(); }} className="relative z-10 bg-ink text-white rounded-lg border-2 border-black px-5 py-2.5 min-h-[44px] text-sm font-bold inline-flex items-center gap-2 transition-transform duration-150 group-hover:translate-x-[3px] group-hover:translate-y-[3px]">
                <Calendar size={18} />
                Let's talk
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-4 flex items-center justify-center gap-4 text-xs text-ink/50 font-medium"
          >
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Replies within 24h</span>
            <span className="w-1 h-1 rounded-full bg-ink/20" />
            <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> Always happy to chat</span>
          </motion.div>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <React.Suspense fallback={<div className="h-64 bg-white border-2 border-black rounded-2xl animate-pulse" />}>
              <ContactForm />
            </React.Suspense>
          </div>

          <div className="lg:col-span-2 space-y-5">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white border-2 border-black rounded-2xl overflow-hidden"
              style={{ boxShadow: '6px 6px 0px 0px #0A0A0A' }}
            >
              <div className="p-6 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-coral/20 rounded-xl border-2 border-black flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-ink" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-sm text-ink">Based in Kolkata</h3>
                    <p className="text-xs text-ink/60 font-medium">India — IST (UTC +5:30)</p>
                  </div>
                </div>
              </div>
              <div
                onClick={() => { trackEvent('contact', 'map_click'); window.open("https://maps.app.goo.gl/dKgHkFhawWi7z7e48", "_blank", "noopener,noreferrer"); }}
                className="relative aspect-video cursor-pointer group overflow-hidden mx-6 mb-5 rounded-xl border-2 border-black bg-gradient-to-br from-ink/5 to-ink/10"
              >
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #0A0A0A 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <MapPin className="w-10 h-10 text-coral drop-shadow-sm" strokeWidth={2.5} />
                  <span className="text-xs font-bold text-ink/60">Kolkata, India</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white font-bold bg-ink/80 px-3 py-1.5 rounded-lg text-xs opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 backdrop-blur-sm">
                    <ExternalLink className="w-3 h-3 inline mr-1" />View on Google Maps
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white border-2 border-black rounded-2xl p-6"
              style={{ boxShadow: '6px 6px 0px 0px #0A0A0A' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-sky/20 rounded-xl border-2 border-black flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-ink" />
                </div>
                <div>
                  <h3 className="font-display font-black text-sm text-ink">Find me online</h3>
                  <p className="text-xs text-ink/60 font-medium">Let's connect!</p>
                </div>
              </div>
              <TooltipProvider>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((social, i) => (
                    <Tooltip key={i} delayDuration={100}>
                      <TooltipTrigger asChild>
                        <motion.a
                          href={social.href || '#'}
                          target={social.href ? '_blank' : undefined}
                          rel={social.href ? 'noopener noreferrer' : undefined}
                          onClick={social.handler === 'whatsapp' ? (e) => { e.preventDefault(); trackEvent('contact', 'social_whatsapp'); window.dispatchEvent(new CustomEvent('openWhatsApp')); } : () => trackEvent('contact', 'social_link', social.name)}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className={cn('flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-black text-xs font-bold text-ink/60 transition-colors', social.color)}
                          aria-label={`Visit on ${social.name}`}
                        >
                          <social.icon className="w-4 h-4" />
                          {social.name}
                        </motion.a>
                      </TooltipTrigger>
                      <TooltipContent><p>{social.name}</p></TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </motion.div>

            <motion.a
              href="/assets/resume.pdf"
              onClick={() => trackEvent('contact', 'download_resume')}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="flex items-center gap-3 bg-white border-2 border-black rounded-2xl p-5 hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 group"
              style={{ boxShadow: '6px 6px 0px 0px #0A0A0A' }}
            >
              <div className="w-10 h-10 bg-ink rounded-xl border-2 border-black flex items-center justify-center flex-shrink-0">
                <ArrowRight className="w-5 h-5 text-white rotate-45 group-hover:rotate-90 transition-transform duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-black text-sm text-ink">Download my resume</p>
                <p className="text-xs text-ink/50 font-medium truncate">Product Manager — Upcore Technologies</p>
              </div>
              <ExternalLink className="w-4 h-4 text-ink/30 flex-shrink-0 group-hover:text-ink transition-colors" />
            </motion.a>

            <p className="text-xs font-medium text-ink/40 px-1">
              Looking for growth/CRO consulting instead of hiring?{' '}
              <a
                href="https://www.thegrowthbench.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('contact', 'growth_bench')}
                className="underline underline-offset-2 text-ink/60 hover:text-ink transition-colors"
              >
                The Growth Bench ↗
              </a>
            </p>

          </div>
        </div>

      </div>
    </>
  );
};

export default Contact;
