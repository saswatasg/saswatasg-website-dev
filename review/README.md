# Two worlds — local design review

Branch: `codex/two-worlds-portfolio`. Repository cloned into `saswatasg-website` inside the supplied workspace. No push or deployment.

## Open the prototype

The production preview is running at http://127.0.0.1:4173/.

To restart it from this repository:

```sh
npm install
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

## What changed

- Exact 50/50 entrance, two distinct portraits supplied by Saswata, fixed seam on hover, deliberate selector and entrance return link.
- A 760 ms world expansion with a short portrait settling transition. Reduced-motion selection skips the expansion; Framer Motion and CSS also respect the system preference.
- Route-aware world context, independent of theme state. Session memory tracks each world's last URL and scroll position; history entries keep individual positions. New direct visits start at the top.
- A precise, graphite/lime Workbench with real checkout evidence, case-study rows, build statuses, career context, notes and all four existing testimonials without autoplay.
- A paper/vermilion/teal Adda with an original rounded English wordmark, local Bengali font, owl illustration, floral borders and fish/wave separators.
- Photography index, ordered series and Radix dialog viewer. Arrow keys, Escape, focus trapping and returned trigger focus. All current gallery images are explicitly labeled original graphic placeholders, not the owner's photography.
- Both unpublished-book teasers use the owner's supplied premises. Book One concerns serial killings in North Kolkata; Book Two concerns schools and education in a fictional town. No invented titles, excerpts, languages, dates or publishers.
- Cinema introduces the supplied interests in Satyajit Ray, Rituparno Ghosh, Hollywood and some Bollywood. FilmRisk.AI, Topshe and 11 PM Cinema reuse existing project records.
- Professional narratives, articles, diagrams, assets, forms, calendar and WhatsApp utilities retained. The work index's collection tabs and company filtering were retained in the redesigned presentation.
- New public routes included in prerendering, sitemap and metadata checks. Shared Adda contact uses `/contact?world=adda`, with a prerendered variant and Vercel query rewrite. A route marker prevents hydrating a different route's HTML on SPA fallback hosts.
- Existing redirects and the unlisted lab tool's noindex/robots restrictions remain intact. Development-only visual-editor diagnostics are excluded from the production HTML.

## Validation

- `npm test`: 5 tests passed, including route/world resolution and the existing article content contract.
- `npm run lint`: passed.
- `npm run build`: passed; 15 articles validated, social images generated, 40 route/variant checks plus 404 passed.
- `git diff --check`: passed.
- Rendered production review at 320 px, 390 px, native desktop 1063 px, and 1440 px. Entrance halves measured 160/160, 195/195, 531.5/531.5 and 720/720 respectively.
- Final tested homepages, creative pages, work index, profile, experience, checkout narrative, professional article and shared contact showed no horizontal overflow. Direct routes resolved to the correct world.
- Work index: all nine case-study links present; the Sierra filter returns its five standalone product records.
- Viewer verified with next-image keyboard navigation, Escape and focus returned to its trigger.
- Mode switching and Back/Forward restored the writing route at its remembered 457 px scroll position.
- Production hydration problems caught during review were fixed; the subsequent isolated direct-route pass reported no console errors.
- Reduced-motion behavior was reviewed in source; OS-level preference emulation was not available in the browser tool.
- Forms and third-party booking/messaging were preserved but not submitted during testing. Vercel routing configuration is locally reviewable; it has not been deployed.

## Replace the provisional content

`src/data/creativeContent.js` centrally holds both supplied portrait sources and dimensions, manuscript details and ordered gallery records. The Workbench portrait uses the black shirt photograph; Adda uses the embroidered kurta photograph. Gallery records support image dimensions, caption, alt text, optional srcSet, location and year. Register additional series slugs in the static prerender/sitemap lists when adding them.

Still needed:

1. Final gallery photographs, grouping/order, captions and available location/year details.
2. Book titles, languages, confirmed genre labels, optional refined premises or provided excerpts.
3. Specific cinema selections and personal reflections.

## Screenshots

- `screenshots/split-desktop.jpg`
- `screenshots/workbench-desktop.jpg`
- `screenshots/adda-desktop.jpg`
- `screenshots/split-mobile.jpg`
- `screenshots/workbench-mobile.jpg`
- `screenshots/adda-mobile.jpg`
