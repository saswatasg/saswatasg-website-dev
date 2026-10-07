import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AuthorBox from '@/components/blog/AuthorBox';
import PillarCTA from '@/components/blog/PillarCTA';
import RelatedPosts from '@/components/blog/RelatedPosts';
import FAQ, { FAQJsonLd } from '@/components/blog/FAQ';
import { PILLAR_META, formatDate, toIsoDate } from '@/data/blogPosts';

const SITE_URL = 'https://saswatasg.com';

const BlogLayout = ({ post, children }) => {
  const pillarMeta = PILLAR_META[post.pillar] || PILLAR_META.pm;
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = `${SITE_URL}/og/${post.slug}.png`;
  const publishedIso = toIsoDate(post.date);
  const modifiedIso = toIsoDate(post.updated || post.date);

  return (
    <>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={postUrl} />
        <link rel="alternate" href={postUrl} hrefLang="en" />
        <link rel="alternate" href={postUrl} hrefLang="x-default" />
        <link rel="alternate" type="application/rss+xml" title="Saswata S. Sengupta — Blog" href={`${SITE_URL}/feed.xml`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:site_name" content="Saswata S. Sengupta" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={post.title} />
        <meta property="article:published_time" content={publishedIso} />
        <meta property="article:modified_time" content={modifiedIso} />
        <meta property="article:author" content="Saswata S. Sengupta" />
        <meta property="article:section" content={pillarMeta.label} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={post.title} />
        <meta name="twitter:site" content="@saswatasg" />
        <meta name="twitter:creator" content="@saswatasg" />
        <meta name="author" content="Saswata S. Sengupta" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            image: [ogImage],
            datePublished: publishedIso,
            dateModified: modifiedIso,
            inLanguage: 'en-US',
            wordCount: post.wordCount || undefined,
            timeRequired: `PT${post.readingMinutes || 5}M`,
            keywords: [post.targetKeyword, ...(post.secondaryKeywords || [])].filter(Boolean).join(', '),
            articleSection: pillarMeta.label,
            author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'Saswata S. Sengupta' },
            publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'Saswata S. Sengupta', logo: { '@type': 'ImageObject', url: `${SITE_URL}/og/logo.png` } },
            mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
              { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
            ],
          })}
        </script>
      </Helmet>
      <FAQJsonLd items={post.faq} url={postUrl} />

      <div className="wb-article max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <nav className="text-xs font-bold text-ink/50 mb-6 flex items-center gap-2">
          <Link to="/blog" className="hover:text-coral transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-ink/70 truncate">{post.title}</span>
        </nav>

        <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${pillarMeta.accent} text-ink mb-4`}>
          {pillarMeta.label}
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-display font-black text-ink leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-sm md:text-base font-semibold text-ink/60 mb-6">
          <time dateTime={publishedIso}>{formatDate(post.date)}</time>
          {modifiedIso !== publishedIso && (
            <> · Updated <time dateTime={modifiedIso}>{formatDate(post.updated)}</time></>
          )}
          {' '}· {post.readingMinutes || 5} min read
        </p>

        <article className="blog-prose">{children}</article>

        <AuthorBox />
        <PillarCTA pillar={post.pillar} />
        <RelatedPosts post={post} />
      </div>
    </>
  );
};

export default BlogLayout;
