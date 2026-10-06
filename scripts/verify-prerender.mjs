import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const SITE_URL = "https://saswatasg.com";

const ROUTES = [
  "/",
  "/workbench",
  "/builds",
  "/adda",
  "/photography",
  "/photography/frame-studies",
  "/writing",
  "/cinema",
  "/adda/about",
  "/about",
  "/experience",
  "/work",
  "/case-studies/cart-checkout",
  "/case-studies/category-discovery",
  "/case-studies/lead-form",
  "/case-studies/upcore-lead-scoring",
  "/case-studies/sierra-lead-allocation",
  "/case-studies/livekeeping-compliance-gap",
  "/case-studies/livekeeping-send-greetings",
  "/case-studies/livekeeping-notifications",
  "/case-studies/livekeeping-report-automation",
  "/contact",
  "/contact?world=adda",
  "/roadmap",
];

const BLOG_DIR = path.join(dist, "blog");
try {
  const blogEntries = await fs.readdir(BLOG_DIR);
  ROUTES.push("/blog");
  for (const entry of blogEntries) {
    if (entry !== "index.html") ROUTES.push(`/blog/${entry}`);
  }
} catch {
  console.warn(
    "[verify-prerender] no blog directory found — blog routes skipped",
  );
}

let failures = 0;
const usedTitles = new Map();

function fail(route, issue) {
  failures += 1;
  console.error(`  [FAIL] ${route}: ${issue}`);
}

function fileFor(route) {
  return route === "/contact?world=adda"
    ? path.join(dist, "contact-adda.html")
    : route === "/"
      ? path.join(dist, "index.html")
      : path.join(dist, route.replace(/^\//, ""), "index.html");
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

for (const route of ROUTES) {
  const file = fileFor(route);
  let html;
  try {
    html = await fs.readFile(file, "utf-8");
  } catch {
    fail(route, "missing prerendered file");
    continue;
  }

  const text = stripHtml(html);
  if (text.length < 50) {
    fail(route, `renders only ${text.length} words of body text`);
  }

  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1Count !== 1) {
    fail(route, `expected exactly 1 H1, found ${h1Count}`);
  }

  const canonicalMatch = html.match(
    /<link[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*\/?>/i,
  );
  const expectedCanonical =
    route === "/contact?world=adda"
      ? `${SITE_URL}/contact`
      : route === "/"
        ? `${SITE_URL}/`
        : `${SITE_URL}${route}`;
  if (!canonicalMatch || canonicalMatch[1] !== expectedCanonical) {
    fail(
      route,
      `canonical is ${canonicalMatch ? canonicalMatch[1] : "missing"}, expected ${expectedCanonical}`,
    );
  }

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "";
  if (!title) {
    fail(route, "missing <title>");
  } else {
    if (title.length > 60)
      fail(route, `title is ${title.length} chars (>60): "${title}"`);
    if (usedTitles.has(title) && route !== "/contact?world=adda")
      fail(route, `title duplicated on ${usedTitles.get(title)}`);
    if (route !== "/contact?world=adda") usedTitles.set(title, route);
  }

  const descriptionMatch = html.match(
    /<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*\/?>/i,
  );
  const description = descriptionMatch ? descriptionMatch[1] : "";
  if (!description) {
    fail(route, "missing meta description");
  } else if (description.length > 155) {
    fail(route, `description is ${description.length} chars (>155)`);
  }

  const navPaths =
    route === "/"
      ? ["/workbench", "/adda"]
      : /^\/(adda|photography|writing|cinema)(\/|$)/.test(route) ||
          route === "/contact?world=adda"
        ? ["/photography", "/writing"]
        : ["/about", "/work"];
  const hasInternalNavLinks = navPaths.every((link) =>
    html.includes(`href="${link}"`),
  );
  if (!hasInternalNavLinks) fail(route, "nav links not found in served HTML");

  // Single-source meta: exactly one og:type/og:image, correct per route type.
  const ogTypes = [
    ...html.matchAll(/<meta[^>]*property="og:type"[^>]*content="([^"]*)"/gi),
  ].map((m) => m[1]);
  const isPost = route.startsWith("/blog/");
  if (ogTypes.length !== 1) {
    fail(
      route,
      `expected exactly 1 og:type, found ${ogTypes.length} (${ogTypes.join(", ")})`,
    );
  } else if (isPost && ogTypes[0] !== "article") {
    fail(route, `og:type is "${ogTypes[0]}", expected "article" on a post`);
  }

  const ogImages = [
    ...html.matchAll(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"/gi),
  ].map((m) => m[1]);
  if (ogImages.length !== 1) {
    fail(route, `expected exactly 1 og:image, found ${ogImages.length}`);
  }

  // No stray robots directives on indexable pages.
  const robots = [
    ...html.matchAll(/<meta[^>]*name="robots"[^>]*content="([^"]*)"/gi),
  ].map((m) => m[1]);
  if (robots.length > 0) {
    fail(
      route,
      `unexpected robots meta on indexable route: ${robots.join(" | ")}`,
    );
  }

  if (isPost) {
    const slug = route.replace("/blog/", "");
    const expectedOg = `${SITE_URL}/og/${slug}.png`;
    if (ogImages[0] && ogImages[0] !== expectedOg) {
      fail(route, `og:image is ${ogImages[0]}, expected ${expectedOg}`);
    }
    const ogFile = path.join(dist, "og", `${slug}.png`);
    const stat = await fs.stat(ogFile).catch(() => null);
    if (!stat) {
      fail(route, `missing OG image file dist/og/${slug}.png`);
    } else if (stat.size < 10 * 1024) {
      fail(
        route,
        `OG image dist/og/${slug}.png is suspiciously small (${stat.size} bytes)`,
      );
    }
    if (!html.includes("article:published_time"))
      fail(route, "missing article:published_time");
    if (!/<time[^>]*datetime=/i.test(html))
      fail(route, "missing <time datetime> element");
    const articleLd = [
      ...html.matchAll(
        /<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi,
      ),
    ]
      .map((m) => {
        try {
          return JSON.parse(m[1]);
        } catch {
          return null;
        }
      })
      .find((d) => d && d["@type"] === "Article");
    if (!articleLd) {
      fail(route, "Article JSON-LD missing or unparsable");
    } else {
      if (!articleLd.image) fail(route, "Article JSON-LD has no image");
      if (!articleLd.wordCount) fail(route, "Article JSON-LD has no wordCount");
    }
  }

  if (route === "/blog" && !html.includes('"ItemList"')) {
    fail(route, "blog index missing ItemList JSON-LD");
  }
}

// 404 page: must exist, be noindexed, and carry no index,follow remnant.
{
  const notFound = await fs
    .readFile(path.join(dist, "404.html"), "utf-8")
    .catch(() => null);
  if (!notFound) {
    fail("/404", "missing 404.html");
  } else {
    const robots404 = [
      ...notFound.matchAll(/<meta[^>]*name="robots"[^>]*content="([^"]*)"/gi),
    ].map((m) => m[1]);
    if (!robots404.some((r) => /noindex/i.test(r)))
      fail("/404", "404.html is not noindexed");
    if (robots404.some((r) => /index,\s*follow/i.test(r)))
      fail("/404", "404.html still carries index,follow");
  }
}

// Discovery files: every post present, no future dates.
{
  const today = new Date().toISOString().slice(0, 10);
  const sitemap = await fs
    .readFile(path.join(root, "public", "sitemap.xml"), "utf-8")
    .catch(() => null);
  const feed = await fs
    .readFile(path.join(root, "public", "feed.xml"), "utf-8")
    .catch(() => null);
  const postRoutes = ROUTES.filter((r) => r.startsWith("/blog/"));
  if (!sitemap) fail("/sitemap.xml", "missing public/sitemap.xml");
  if (!feed) fail("/feed.xml", "missing public/feed.xml");
  if (sitemap) {
    for (const r of postRoutes) {
      if (!sitemap.includes(`${SITE_URL}${r}`))
        fail("/sitemap.xml", `missing ${r}`);
    }
    for (const m of sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
      if (m[1] > today) fail("/sitemap.xml", `future lastmod ${m[1]}`);
    }
  }
  if (feed) {
    for (const r of postRoutes) {
      if (!feed.includes(`${SITE_URL}${r}`)) fail("/feed.xml", `missing ${r}`);
    }
    for (const m of feed.matchAll(/<pubDate>([^<]+)<\/pubDate>/g)) {
      if (new Date(m[1]).getTime() > Date.now())
        fail("/feed.xml", `future pubDate ${m[1]}`);
    }
  }
}

if (failures > 0) {
  console.error(
    `\n[verify-prerender] ${failures} violation(s) — check the audit findings above.`,
  );
  process.exit(1);
} else {
  console.log(
    `[verify-prerender] OK — ${ROUTES.length} routes + 404 all pass (words, H1, canonical, title, description, nav).`,
  );
}
