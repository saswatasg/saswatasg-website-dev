import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { itemVariants } from './animations';

const BottomNav = ({ prev, next }) => {
  const pages = [
    { slug: 'cart-checkout', label: 'Cart & Checkout' },
    { slug: 'category-discovery', label: 'Category Discovery' },
    { slug: 'lead-form', label: 'Lead Form' },
    { slug: 'upcore-lead-scoring', label: 'Lead Qualification' },
    { slug: 'upcore-inventory-leveling', label: 'Inventory Leveling' },
    { slug: 'upcore-discovery', label: 'Discovery & Delivery' },
    { slug: 'sierra-lead-allocation', label: 'Lead Allocation' },
    { slug: 'livekeeping-compliance-gap', label: 'Compliance Gap' },
    { slug: 'livekeeping-send-greetings', label: 'Send Greetings' },
    { slug: 'livekeeping-notifications', label: 'Notifications' },
    { slug: 'livekeeping-report-automation', label: 'Report Automation' },
  ];

  const currentIndex = pages.findIndex((p) => p.slug === prev || p.slug === next);
  const prevPage = prev ? pages.find((p) => p.slug === prev) : null;
  const nextPage = next ? pages.find((p) => p.slug === next) : null;

  return (
    <motion.div variants={itemVariants} className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      {prevPage ? (
        <Link
          to={`/case-studies/${prevPage.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-ink/50 hover:text-ink transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {prevPage.label}
        </Link>
      ) : (
        <div />
      )}
      <Link
        to="/work"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-ink/50 hover:text-ink transition-colors group"
      >
        All Case Studies
      </Link>
      {nextPage ? (
        <Link
          to={`/case-studies/${nextPage.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-ink/50 hover:text-ink transition-colors group"
        >
          {nextPage.label}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      ) : (
        <div />
      )}
    </motion.div>
  );
};

export default BottomNav;
