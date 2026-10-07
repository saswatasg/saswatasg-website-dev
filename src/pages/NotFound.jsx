import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft, Search } from 'lucide-react';
import PageMeta from '@/components/PageMeta';

const NotFound = () => {
  return (
    <>
      <PageMeta title="Page not found | Saswata S. Sengupta" description="This page could not be found. Explore the work or return to the homepage." noindex={true} />
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border-2 border-black rounded-2xl p-10 md:p-14 text-center max-w-lg w-full"
          style={{ boxShadow: '10px 10px 0px 0px #0A0A0A' }}
        >
          <div className="w-20 h-20 bg-lemon/60 rounded-2xl border-2 border-black flex items-center justify-center mx-auto mb-5 -rotate-2">
            <FileQuestion className="w-10 h-10 text-ink" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ink text-white text-xs font-black border-2 border-black mb-3">
            404 · Page not found
          </span>
          <h1 className="text-ink text-2xl md:text-3xl font-display font-black tracking-tight">
            This page doesn't exist
          </h1>
          <p className="mt-3 text-sm text-ink font-bold max-w-sm mx-auto">
            The link may have changed. Let’s get you back to the work.
          </p>
          <p className="mt-2 text-sm text-ink/60 font-medium max-w-sm mx-auto">
            Explore case studies, client solutions and independent builds.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <div className="relative inline-flex group">
              <div className="absolute inset-0 rounded-lg border-2 border-black bg-coral translate-x-[3px] translate-y-[3px]" />
              <Link
                to="/work"
                className="relative z-10 bg-ink text-white rounded-lg border-2 border-black px-5 py-2.5 text-sm font-black inline-flex items-center gap-2 min-h-[44px] transition-transform duration-150 group-hover:translate-x-[3px] group-hover:translate-y-[3px]"
              >
                <Search className="w-4 h-4" />
                See the work
              </Link>
            </div>
            <Link
              to="/workbench"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-black rounded-lg border-2 border-black bg-white text-ink hover:bg-canvas min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;
