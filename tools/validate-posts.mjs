import { readFileSync, readdirSync } from 'node:fs';
import { resolve, basename, extname } from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = resolve(process.cwd(), 'content/blog');
const CASE_STUDY_SLUGS = [
  'upcore-inventory-leveling', 'upcore-discovery', 'upcore-lead-scoring', 'livekeeping-compliance-gap', 'cart-checkout',
  'category-discovery', 'lead-form', 'sierra-lead-allocation',
  'livekeeping-send-greetings', 'livekeeping-notifications',
  'livekeeping-report-automation',
];

const REQUIRED = [
  'title', 'description', 'slug', 'date', 'updated', 'pillar',
  'targetKeyword', 'secondaryKeywords', 'anchorProject', 'faq',
];
const PILLARS = ['agents', 'growth', 'pm'];
// anchorProject must be a case-study slug or one of these project identifiers
// (used only for related-post scoring).
const PROJECT_SLUGS = ['dhanplan', 'topshe', 'filmrisk', 'tgb-hunt', 'bloghero', 'inventory', 'intent'];
// Correct casing for brand names; lowercase variants in prose are errors.
const BRAND_CASING = [
  [/\bupcore\b/, 'Upcore'],
  [/\blivekeeping\b/, 'LiveKeeping'],
  [/\bLivekeeping\b/, 'LiveKeeping'],
  [/\bsierra\b/, 'Sierra'],
  [/\bdhanplan\b/, 'DhanPlan'],
  [/\btopshe\b/, 'Topshe'],
];
const errors = [];
const slugs = new Map();

const files = readdirSync(CONTENT_DIR).filter((f) => extname(f) === '.mdx');

const parsed = [];
for (const file of files) {
  const path = resolve(CONTENT_DIR, file);
  const { data, content } = matter(readFileSync(path, 'utf8'));
  parsed.push({ file, data, content });
}

for (const { file, data } of parsed) {
  if (data.slug !== basename(file, '.mdx')) {
    errors.push(`${file}: frontmatter slug "${data.slug}" does not match filename`);
  }
  if (slugs.has(data.slug)) {
    errors.push(`${file}: duplicate slug "${data.slug}" (also used by ${slugs.get(data.slug)})`);
  }
  slugs.set(data.slug, file);
}

for (const { file, data, content } of parsed) {
  for (const key of REQUIRED) {
    if (data[key] === undefined || data[key] === null || data[key] === '') {
      errors.push(`${file}: missing required frontmatter field "${key}"`);
    }
  }

  if (data.title && data.title.length > 60) {
    errors.push(`${file}: title is ${data.title.length} chars (max 60) — "${data.title}"`);
  }
  if (data.description && data.description.length > 155) {
    errors.push(`${file}: description is ${data.description.length} chars (max 155)`);
  }
  if (data.pillar && !PILLARS.includes(data.pillar)) {
    errors.push(`${file}: pillar "${data.pillar}" not in [${PILLARS.join(', ')}]`);
  }
  if (data.secondaryKeywords !== undefined && !Array.isArray(data.secondaryKeywords)) {
    errors.push(`${file}: secondaryKeywords must be an array`);
  }

  const date = data.date ? new Date(data.date).getTime() : NaN;
  const updated = data.updated ? new Date(data.updated).getTime() : NaN;
  if (Number.isNaN(date)) errors.push(`${file}: date "${data.date}" is not a valid date`);
  if (Number.isNaN(updated)) errors.push(`${file}: updated "${data.updated}" is not a valid date`);
  if (!Number.isNaN(date) && !Number.isNaN(updated) && updated < date) {
    errors.push(`${file}: updated (${data.updated}) is before date (${data.date})`);
  }
  const endOfToday = new Date().setHours(23, 59, 59, 999);
  if (!Number.isNaN(date) && date > endOfToday) {
    errors.push(`${file}: date "${data.date}" is in the future — search engines discount future dates`);
  }
  if (!Number.isNaN(updated) && updated > endOfToday) {
    errors.push(`${file}: updated "${data.updated}" is in the future`);
  }

  if (data.anchorProject && !CASE_STUDY_SLUGS.includes(data.anchorProject) && !PROJECT_SLUGS.includes(data.anchorProject)) {
    errors.push(`${file}: anchorProject "${data.anchorProject}" is neither a case-study slug nor a known project id`);
  }

  const faq = data.faq;
  if (faq !== undefined) {
    if (!Array.isArray(faq) || faq.length < 3 || faq.length > 5) {
      errors.push(`${file}: faq must be an array of 3-5 items (got ${Array.isArray(faq) ? faq.length : typeof faq})`);
    } else {
      faq.forEach((item, i) => {
        if (!item || typeof item.q !== 'string' || !item.q.trim() || typeof item.a !== 'string' || !item.a.trim()) {
          errors.push(`${file}: faq item ${i + 1} must have non-empty "q" and "a"`);
        }
        if (item.a && item.a.length > 155) {
          errors.push(`${file}: faq item ${i + 1} answer is ${item.a.length} chars (max 155)`);
        }
      });
    }
  }

  if (!content.includes('AnswerBox')) {
    errors.push(`${file}: post must include <AnswerBox> (top 3-5 line answer to the primary keyword)`);
  }
  if (!content.includes('FAQ')) {
    errors.push(`${file}: post must include <FAQ items={frontmatter.faq} />`);
  }

  // Body without code fences — code samples are exempt from prose checks.
  const prose = content.replace(/```[\s\S]*?```/g, '');

  // Duplicate H2 headings (the class of copy-paste bug that shipped twice).
  const h2s = [...prose.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim().toLowerCase());
  const seenH2 = new Set();
  for (const h of h2s) {
    if (seenH2.has(h)) errors.push(`${file}: duplicate H2 heading "${h}" — section pasted twice?`);
    seenH2.add(h);
  }

  // Duplicate long paragraphs.
  const paras = prose.split(/\n\s*\n/).map((p) => p.trim()).filter((p) => p.length >= 200 && !p.startsWith('|'));
  const seenPara = new Set();
  for (const p of paras) {
    const key = p.toLowerCase().replace(/\s+/g, ' ');
    if (seenPara.has(key)) errors.push(`${file}: a 200+ char paragraph appears twice ("${p.slice(0, 60)}…")`);
    seenPara.add(key);
  }

  // Duplicate <Figure src> within one post.
  const figSrcs = [...content.matchAll(/<Figure[^>]*src="([^"]+)"/g)].map((m) => m[1]);
  const seenFig = new Set();
  for (const src of figSrcs) {
    if (seenFig.has(src)) errors.push(`${file}: figure ${src} is rendered more than once`);
    seenFig.add(src);
  }
  if (figSrcs.length === 0) {
    errors.push(`${file}: post has no <Figure> — every post needs at least one diagram`);
  }

  // Brand casing in prose (links/paths/slugs are lowercase by design).
  const proseNoLinks = prose
    .replace(/\]\([^)]*\)/g, ']')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/\bgithub\.com\/\S+/g, '')
    .replace(/src="[^"]*"/g, '');
  for (const [re, correct] of BRAND_CASING) {
    const m = proseNoLinks.match(re);
    if (m) errors.push(`${file}: brand casing — "${m[0]}" should be "${correct}"`);
  }

  // At least one external authority link.
  const externalLinks = [...content.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((m) => m[1]);
  if (externalLinks.length < 1) {
    errors.push(`${file}: no external links — add at least one authoritative source`);
  }

  const linkRe = /\]\((\/[^)\s#]+)(?:#[^)\s]*)?\)/g;
  let match;
  while ((match = linkRe.exec(content)) !== null) {
    const href = match[1];
    if (href.startsWith('/blog/')) {
      const target = href.replace('/blog/', '');
      if (!slugs.has(target) && target !== '') {
        errors.push(`${file}: internal link ${href} — no blog post with slug "${target}"`);
      }
    } else if (href.startsWith('/case-studies/')) {
      const target = href.replace('/case-studies/', '');
      if (!CASE_STUDY_SLUGS.includes(target)) {
        errors.push(`${file}: internal link ${href} — unknown case study "${target}"`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`[validate-posts] FAILED — ${errors.length} issue(s) across ${files.length} post(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`[validate-posts] OK — ${files.length} post(s) pass the content contract.`);
