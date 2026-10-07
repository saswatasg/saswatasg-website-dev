import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';

const cardColors = ['bg-blush', 'bg-sky', 'bg-mint', 'bg-lemon', 'bg-blush', 'bg-sky', 'bg-mint', 'bg-lemon'];
const cardShadows = [
  '6px 6px 0px 0px #F4EC4A',
  '6px 6px 0px 0px #E85D3A',
  '6px 6px 0px 0px #625BF6',
  '6px 6px 0px 0px #3DDC91',
  '6px 6px 0px 0px #F4EC4A',
  '6px 6px 0px 0px #E85D3A',
  '6px 6px 0px 0px #625BF6',
  '6px 6px 0px 0px #3DDC91',
];
const companyBadgeColors = {
  upcore: 'bg-ink text-white',
  livekeeping: 'bg-lemon text-ink',
  sierra: 'bg-sky text-ink',
  freelance: 'bg-coral text-ink',
};

const ProjectCard = ({ title, description, tags, result, index, caseStudyLink, company, companyName }) => {
  const ci = index % cardColors.length;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.05 }}
      whileHover={{ y: -4, scale: 1.01, rotate: 0.2, transition: { duration: 0.2 } }}
      className={`${cardColors[ci]} border-2 border-black rounded-2xl p-6 md:p-8 flex flex-col h-full relative overflow-hidden`}
      style={{ boxShadow: cardShadows[ci] }}
    >
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/30 border-2 border-black rounded-lg rotate-12 hidden md:block" />

      <div className="flex items-start justify-between gap-2 mb-3 relative z-10">
        <span className={`text-[10px] font-black px-2 py-0.5 rounded border-2 border-black ${companyBadgeColors[company] || 'bg-white text-ink/60'}`}>
          {companyName}
        </span>
        {caseStudyLink ? (
          <span className="text-[9px] font-black text-purple uppercase tracking-wider bg-purple/10 px-1.5 py-0.5 rounded border border-purple/30">Case study →</span>
        ) : (
          <span className="text-[9px] font-black text-ink/40 uppercase tracking-wider bg-white/50 px-1.5 py-0.5 rounded border border-ink/15">Project highlight</span>
        )}
      </div>

      {result && (
        <div className="mb-3 relative z-10">
          <p className="text-lg md:text-xl font-display font-black text-ink leading-tight">
            {result}
          </p>
        </div>
      )}

      <h3 className="text-sm md:text-base font-display font-black text-ink mb-2 relative z-10">{title}</h3>
      <p className="text-xs md:text-sm text-ink/70 leading-relaxed mb-4 flex-grow font-medium relative z-10">
        {description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3 relative z-10">
        {tags && tags.slice(0, 4).map((tag, i) => (
          <motion.span
            key={i}
            whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0], transition: { duration: 0.15 } }}
            className="px-2 py-0.5 bg-white text-ink/60 text-[10px] font-bold rounded-lg border-2 border-black cursor-default"
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {caseStudyLink && (
        <Link
          to={caseStudyLink}
          onClick={() => trackEvent('projects', 'case_study_link', companyName)}
          className="text-xs font-bold text-purple hover:text-ink inline-flex items-center gap-1 transition-colors relative z-10"
        >
          Read Full Case Study
          <ArrowRight className="w-3 h-3" />
        </Link>
      )}
    </motion.article>
  );
};

export default ProjectCard;
