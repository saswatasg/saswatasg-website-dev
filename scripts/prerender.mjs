import { createServer } from "vite";
import { promises as fs } from "node:fs";
import { Writable } from "node:stream";
import { createServer as createHttpServer } from "node:http";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");

const STATIC_ROUTES = [
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
  "/case-studies/upcore-inventory-leveling",
  "/case-studies/upcore-discovery",
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

// Strip ALL template SEO tags so the per-route Helmet output (injected below)
// is the single source of truth. Global flags matter: og:*/twitter:*/robots
// each appear multiple times in the template. Any future template head tag
// matching these prefixes will be stripped from every prerendered page.
const HEAD_STRIP_PATTERNS = [
  /\s*<title>[\s\S]*?<\/title>\s*/i,
  /\s*<link rel="canonical"[^>]*>\s*/gi,
  /\s*<meta name="description"[^>]*>\s*/gi,
  /\s*<meta name="robots"[^>]*>\s*/gi,
  /\s*<meta property="og:[^"]*"[^>]*>\s*/gi,
  /\s*<meta name="twitter:[^"]*"[^>]*>\s*/gi,
];

function serializeHelmetTags(helmet) {
  const parts = [];
  for (const key of [
    "base",
    "link",
    "meta",
    "noscript",
    "script",
    "style",
    "title",
  ]) {
    const entry = helmet[key];
    if (entry && typeof entry.toString === "function") {
      const html = entry.toString();
      if (html) parts.push(html);
    }
  }
  return parts.join("\n");
}

function collectStream(renderResult) {
  return new Promise((resolve, reject) => {
    let html = "";
    const writable = new Writable({
      write(chunk, _enc, cb) {
        html += chunk;
        cb();
      },
    });
    writable.on("finish", () => resolve(html));
    writable.on("error", reject);
    renderResult.stream.pipe(writable);
  });
}

async function writeRoute(filePath, html) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, html, "utf-8");
}

// Vite 4 opens a WebSocket port even with hmr:false in middleware mode.
// Attach it to an unlistened server so prerendering never binds a network port.
const offlineHmrServer = createHttpServer();
const vite = await createServer({
  root,
  server: { middlewareMode: true, hmr: { server: offlineHmrServer } },
  appType: "custom",
  logLevel: "error",
});

try {
  const { renderApp } = await vite.ssrLoadModule("/src/ssr-entry.jsx");
  const template = await fs.readFile(path.join(dist, "index.html"), "utf-8");
  if (/<div id="root">\s*[^<\s]/.test(template)) {
    console.error(
      "[prerender] ERROR: dist/index.html is already prerendered (non-empty #root). Run `vite build` first to restore the clean template.",
    );
    process.exitCode = 1;
    throw new Error("Stale prerendered template detected");
  }

  const { posts: blogPosts } = await vite.ssrLoadModule(
    "/src/data/blogPosts.js",
  );
  const blogRoutes = [
    "/blog",
    ...blogPosts.map((post) => `/blog/${post.slug}`),
  ];
  const routes = [...STATIC_ROUTES, ...blogRoutes];

  for (const route of routes) {
    const renderResult = renderApp({ path: route });
    const body = await collectStream(renderResult);
    const error = renderResult.getRenderError();
    if (error) {
      console.error(`[prerender] failed for ${route}:`, error.message);
      process.exitCode = 1;
      continue;
    }
    if (body.trim().length < 100) {
      console.warn(
        `[prerender] WARNING: ${route} rendered only ${body.trim().length} chars`,
      );
    }

    const helmet = renderResult.helmetData.context.helmet;
    const helmetTags = serializeHelmetTags(helmet);

    let html = template.replace(
      '<html lang="en">',
      `<html lang="en" data-route="${route}">`,
    );
    for (const pattern of HEAD_STRIP_PATTERNS) {
      html = html.replace(pattern, "\n");
    }
    html = html.replace(
      "</head>",
      `${helmetTags ? helmetTags + "\n" : ""}</head>`,
    );
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div>`,
    );

    const outPath =
      route === "/contact?world=adda"
        ? path.join(dist, "contact-adda.html")
        : route === "/"
          ? path.join(dist, "index.html")
          : path.join(dist, route.replace(/^\//, ""), "index.html");
    await writeRoute(outPath, html);
    console.log(`[prerender] wrote ${route} (${body.trim().length} chars)`);
  }
  const renderResult404 = renderApp({ path: "/__prerender-not-found__" });
  const notFoundBody = await collectStream(renderResult404);
  if (!renderResult404.getRenderError()) {
    const helmet = renderResult404.helmetData.context.helmet;
    const helmetTags = serializeHelmetTags(helmet);
    let html = template.replace(
      '<html lang="en">',
      '<html lang="en" data-route="/__prerender-not-found__">',
    );
    for (const pattern of HEAD_STRIP_PATTERNS) {
      html = html.replace(pattern, "\n");
    }
    html = html.replace(
      "</head>",
      `${helmetTags ? helmetTags + "\n" : ""}</head>`,
    );
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${notFoundBody}</div>`,
    );
    await writeRoute(path.join(dist, "404.html"), html);
    console.log("[prerender] wrote 404.html");
  }
} finally {
  await vite.close();
}
