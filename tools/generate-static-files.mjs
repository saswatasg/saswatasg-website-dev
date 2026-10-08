import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const root = process.cwd();
const SITE_URL = 'https://saswatasg.com';

const STATIC_PAGES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/workbench', priority: 0.7, changefreq: 'monthly' },
  { path: '/builds', priority: 0.7, changefreq: 'monthly' },
  { path: '/adda', priority: 0.7, changefreq: 'monthly' },
  { path: '/photography', priority: 0.7, changefreq: 'monthly' },
  { path: '/photography/frame-studies', priority: 0.7, changefreq: 'monthly' },
  { path: '/writing', priority: 0.7, changefreq: 'monthly' },
  { path: '/cinema', priority: 0.7, changefreq: 'monthly' },
  { path: '/adda/about', priority: 0.7, changefreq: 'monthly' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/experience', priority: 0.8, changefreq: 'monthly' },
  { path: '/work', priority: 0.9, changefreq: 'weekly' },
  { path: '/blog', priority: 0.9, changefreq: 'weekly' },
  { path: '/case-studies/cart-checkout', priority: 0.7, changefreq: 'monthly' },
  { path: '/case-studies/category-discovery', priority: 0.7, changefreq: 'monthly' },
  { path: '/case-studies/lead-form', priority: 0.7, changefreq: 'monthly' },
  { path: '/case-studies/upcore-inventory-leveling', priority: 0.8, changefreq: 'monthly' },
  { path: '/case-studies/upcore-discovery', priority: 0.7, changefreq: 'monthly' },
  { path: '/case-studies/upcore-lead-scoring', priority: 0.7, changefreq: 'monthly' },
  { path: '/case-studies/sierra-lead-allocation', priority: 0.6, changefreq: 'monthly' },
  { path: '/case-studies/livekeeping-compliance-gap', priority: 0.7, changefreq: 'monthly' },
  { path: '/case-studies/livekeeping-send-greetings', priority: 0.6, changefreq: 'monthly' },
  { path: '/case-studies/livekeeping-notifications', priority: 0.6, changefreq: 'monthly' },
  { path: '/case-studies/livekeeping-report-automation', priority: 0.6, changefreq: 'monthly' },
  { path: '/contact', priority: 0.5, changefreq: 'yearly' },
];

const BLOG_DIR = path.join(root, 'content', 'blog');
const PUBLIC_DIR = path.join(root, 'public');

function toIsoDate(dateStr) {
  return new Date(dateStr).toISOString().slice(0, 10);
}

// Search engines discount future-dated lastmod/pubDate values.
function clampToToday(isoDate) {
  const today = new Date().toISOString().slice(0, 10);
  return isoDate > today ? today : isoDate;
}

function stripMdxToText(mdx) {
  return mdx
    .replace(/^---[\s\S]*?---\s*/m, '')
    .replace(/^import .*$/gm, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*\-`|[\]()!]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function readPosts() {
  const files = (await fs.readdir(BLOG_DIR)).filter((f) => f.endsWith('.mdx'));
  const posts = [];
  for (const file of files) {
    const raw = await fs.readFile(path.join(BLOG_DIR, file), 'utf-8');
    const { data, content } = matter(raw);
    if (!data.title || !data.date) continue;
    posts.push({
      slug: data.slug || file.replace(/\.mdx$/, ''),
      title: data.title,
      description: data.description || '',
      date: clampToToday(toIsoDate(data.date)),
      updated: clampToToday(toIsoDate(data.updated || data.date)),
      pillar: data.pillar || 'pm',
      content,
    });
  }
  return posts.sort((a, b) => new Date(b.updated) - new Date(a.updated) || new Date(b.date) - new Date(a.date));
}

async function writeSitemap(posts) {
  const today = clampToToday(new Date().toISOString().slice(0, 10));
  const urlTags = STATIC_PAGES.map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.path === '/' ? '/' : page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  );
  for (const post of posts) {
    const images = [...post.content.matchAll(/src="(\/blog-assets\/[^"]+)"/g)].map((m) => m[1]);
    const imageTags = images.map((src) => `    <image:image><image:loc>${SITE_URL}${src}</image:loc></image:image>`).join('\n');
    urlTags.push(`  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.updated}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
${imageTags ? imageTags + '\n' : ''}  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlTags.join('\n')}
</urlset>
`;
  await fs.writeFile(path.join(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf-8');
  console.log('[generate-static-files] wrote sitemap.xml');
}

async function writeFeed(posts) {
  const caseStudies = [
    { slug: 'cart-checkout', title: 'Cart & Checkout — –26% abandonment' },
    { slug: 'category-discovery', title: 'Category Pages — +34% qualified leads' },
    { slug: 'lead-form', title: 'Lead Form Overhaul — +124% submission volume' },
    { slug: 'upcore-inventory-leveling', title: 'Inventory Leveling — Upcore client demo' },
    { slug: 'upcore-discovery', title: 'Discovery & Solution Delivery — 23+ clients' },
    { slug: 'upcore-lead-scoring', title: 'Lead Qualification — Five dimensions, four tiers' },
    { slug: 'sierra-lead-allocation', title: 'Lead Allocation — Gold/Silver/Bronze' },
    { slug: 'livekeeping-compliance-gap', title: 'Compliance Gap — 17:1 Tally vs LiveKeeping' },
    { slug: 'livekeeping-send-greetings', title: 'Send Greetings + Nano Banana AI' },
    { slug: 'livekeeping-notifications', title: 'Push Notification Architecture' },
    { slug: 'livekeeping-report-automation', title: 'Daily Report Automation' },
  ];
  const postItems = posts.map(
    (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <category>Blog</category>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
  );
  const caseStudyItems = caseStudies.map(
    (cs) => `    <item>
      <title><![CDATA[${cs.title}]]></title>
      <link>${SITE_URL}/case-studies/${cs.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/case-studies/${cs.slug}</guid>
      <description><![CDATA[Case study: ${cs.title}]]></description>
      <category>Case Study</category>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>`
  );
  const items = [...postItems, ...caseStudyItems].join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Saswata S. Sengupta — Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Product decisions, client delivery, growth work and experiments with clear evidence boundaries.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  await fs.writeFile(path.join(PUBLIC_DIR, 'feed.xml'), xml, 'utf-8');
  console.log('[generate-static-files] wrote feed.xml');
}

async function writeLlmsTxt(posts) {
  const postLines = posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`).join('\n');

  const llms = `# Saswata S. Sengupta — saswatasg.com

> Product Manager (Upcore Technologies, ex-IndiaMART/LiveKeeping; IIT Jodhpur MBA)
> who derives solutions and manages delivery, with stage-specific case studies and build notes.
> Signature result: reduced checkout abandonment 73.1% → 53.9% (–26%).

## Key pages
- [Home](https://saswatasg.com/): background, experience, contact
- [About](https://saswatasg.com/about): bio, education (IIT Jodhpur MBA), resume
- [Experience](https://saswatasg.com/experience): Upcore, Sierra Living Concepts, LiveKeeping
- [Blog](https://saswatasg.com/blog): Product decisions, growth work, client delivery and experiments
- [Work](https://saswatasg.com/work): case studies and product work in one place
- [Case study deep-dives](https://saswatasg.com/case-studies/cart-checkout): checkout, enterprise discovery, inventory planning and workflow design

## Blog posts
${postLines}

## Facts
- Content covers delivered work, client demos, research methods and experiments; stages and measurement scope vary.
- At Upcore Technologies, Saswata derives solutions and manages delivery end to end for 23+ clients.
- Signature metric: checkout abandonment reduced 73.1% → 53.9% (–26% relative).
- Education: MBA, IIT Jodhpur (2024); B.Tech Mechanical Engineering, Jalpaiguri Government Engineering College.
`;
  await fs.writeFile(path.join(PUBLIC_DIR, 'llms.txt'), llms, 'utf-8');
  console.log('[generate-static-files] wrote llms.txt');
}

async function writePostStats(posts) {
  const stats = {};
  for (const post of posts) {
    const words = stripMdxToText(post.content).split(/\s+/).filter(Boolean).length;
    stats[post.slug] = {
      wordCount: words,
      readingMinutes: Math.max(1, Math.round(words / 220)),
    };
  }
  const out = path.join(root, 'src', 'data', 'postStats.json');
  await fs.writeFile(out, `${JSON.stringify(stats, null, 2)}\n`, 'utf-8');
  console.log('[generate-static-files] wrote src/data/postStats.json');
}

async function writeLlmsFull(posts) {
  const lines = [`# Saswata S. Sengupta — full content (llms-full.txt)`, ``, `> Source: ${SITE_URL}`, ``];
  for (const post of posts) {
    lines.push(`## ${post.title}`, ``, `URL: ${SITE_URL}/blog/${post.slug}`, ``, post.description, ``, stripMdxToText(post.content), ``, `---`, ``);
  }
  await fs.writeFile(path.join(PUBLIC_DIR, 'llms-full.txt'), lines.join('\n'), 'utf-8');
  console.log('[generate-static-files] wrote llms-full.txt');
}

const posts = await readPosts();
await writeSitemap(posts);
await writeFeed(posts);
await writeLlmsTxt(posts);
await writeLlmsFull(posts);
await writePostStats(posts);
