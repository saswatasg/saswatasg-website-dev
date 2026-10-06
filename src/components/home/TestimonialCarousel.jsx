import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Linkedin } from 'lucide-react';

export const testimonials = [
  {
    name: 'Harish Kumawat',
    title: 'Growth Marketing Manager, Sierra Living Concepts',
    relation: 'Managed Saswata directly for over a year',
    text: 'Saswata consistently delivered results beyond expectations and showed strong ownership in everything he handled. He has excellent technical expertise, along with a deep understanding of analytics and the customer buying journey.',
    linkedin: 'https://linkedin.com/in/harishkumawat',
    company: 'Sierra',
  },
  {
    name: 'Jai Sankhla',
    title: 'UI/UX Designer, Sierra Living Concepts',
    relation: 'Reported directly to Saswata',
    text: 'His ability to align business objectives with user-centric design made product development seamless. He championed a data-driven approach to UX/UI decisions and fostered cross-functional collaboration.',
    linkedin: 'https://linkedin.com/in/jaisankhla',
    company: 'Sierra',
  },
  {
    name: 'Mehul Bhaliya',
    title: 'Category Manager + MBA Batchmate, Sierra Living Concepts',
    relation: 'Worked on same team · IIT Jodhpur batchmate',
    text: 'His knack for solving complex problems and driving data-driven decisions stood out both in academic and professional settings. His ability to strategize and execute effective SEO, SEM, and UX initiatives greatly contributed to growth.',
    linkedin: 'https://linkedin.com/in/mehulbhaliya',
    company: 'Sierra',
  },
  {
    name: 'Sulagna Barat',
    title: 'Executive Data Scientist, Synergy Marine Group',
    relation: 'Cross-company consultant',
    text: 'His ability to analyze complex challenges, optimize conversion strategies, and scale e-commerce operations is truly commendable. His strong business acumen enables him to drive impactful and sustainable growth.',
    linkedin: 'https://linkedin.com/in/sulagnabarat',
    company: 'Synergy',
  },
];

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <div className="w-full bg-white border-y-2 border-black">
      <div className="max-w-[900px] mx-auto px-4 md:px-6 py-10 md:py-12">
        <div className="relative min-h-[160px] md:min-h-[140px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
              aria-live="polite"
            >
              <span className="text-3xl text-ink/20 font-display font-black leading-none">&#10077;</span>
              <p className="text-sm md:text-base text-ink/80 font-medium leading-relaxed mt-1 max-w-3xl mx-auto">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-4">
                <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm font-black text-ink hover:text-coral inline-flex items-center gap-1">
                  {t.name} <Linkedin className="w-3 h-3" />
                </a>
                <p className="text-xs font-bold text-ink/50">{t.title}</p>
                <p className="text-[10px] font-medium text-ink/30 mt-0.5">{t.relation} · {t.company}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-5" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrent(i)}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.8 }}
              role="tab"
              aria-selected={i === current}
              aria-label={`Testimonial ${i + 1}`}
              className={`w-2 h-2 rounded-full border border-black transition-all duration-300 ${
                i === current ? 'bg-ink scale-110' : 'bg-white hover:bg-ink/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
