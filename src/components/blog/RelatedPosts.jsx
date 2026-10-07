import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { relatedPosts, PILLAR_META } from '@/data/blogPosts';

const RelatedPosts = ({ post, limit = 3 }) => {
  const related = relatedPosts(post, limit);
  if (!related.length) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-display font-black text-ink mb-5">Keep reading</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((item) => {
          const pillarMeta = PILLAR_META[item.pillar] || PILLAR_META.pm;
          return (
            <Link
              key={item.slug}
              to={`/blog/${item.slug}`}
              className="group border-2 border-black rounded-2xl bg-white p-4 flex flex-col gap-2 transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#0A0A0A]"
            >
              <span className={`self-start text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${pillarMeta.accent} text-ink`}>
                {pillarMeta.label}
              </span>
              <h3 className="text-sm font-bold text-ink leading-snug group-hover:underline">{item.title}</h3>
              <span className="text-[11px] font-bold text-ink/40 flex items-center gap-1">
                {item.date} <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedPosts;
