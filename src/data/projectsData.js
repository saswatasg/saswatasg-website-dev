import { Rocket, Armchair, Brain } from "lucide-react";

// Publication stages describe the artifact, not implied business impact.
export const openSourceProjects = [
  {
    name: "DhanPlan",
    tagline: "A monthly retirement plan, with visible assumptions",
    description:
      "An India-focused planner connecting contributions, assets and retirement withdrawals in a monthly ledger. Engine 2.0.0 includes gap-solving and stress scenarios; projections remain assumption-based.",
    status: "Independent product · Live",
    group: "independent",
    tags: ["Retirement planning", "Scenario modelling", "Monthly ledger"],
    links: [
      {
        label: "dhanplan.in",
        href: "https://www.dhanplan.in/",
        external: true,
      },
      {
        label: "Methodology",
        href: "https://www.dhanplan.in/methodology",
        external: true,
      },
    ],
    code: null,
  },
  {
    name: "Meldstead",
    tagline: "A connected project workspace",
    description:
      "Tasks, docs, whiteboards and timelines, with AI connections and client reviews. An independent product in pre-launch final audit; public availability does not mean a completed public launch.",
    status: "Independent product · Pre-launch final audit",
    group: "independent",
    tags: ["Project workspace", "Collaboration"],
    links: [
      {
        label: "meldstead.com",
        href: "https://meldstead.com/",
        external: true,
      },
    ],
    code: null,
  },
  {
    name: "Inventory Leveling Agent",
    tagline: "Make procurement dependencies visible",
    description:
      "An Upcore Technologies client demo using mock data: expands BOM demand, nets inventory and schedules purchasing. The repository documents 28 reconciliation tests; there is no live ERP integration.",
    status: "Upcore Technologies · Client demo · Mock data",
    group: "client",
    tags: ["MRP logic", "Procurement", "React", "TypeScript"],
    links: [
      {
        label: "Live demo",
        href: "https://inventory-leveling-agent-gamma.vercel.app",
        external: true,
      },
    ],
    caseStudyLink: "/case-studies/upcore-inventory-leveling",
    code: "https://github.com/saswatasg/inventory-leveling-agent",
  },
  {
    name: "BlogHero",
    tagline: "From search evidence to a reviewable draft",
    description:
      "A Sierra Living Concepts content tool connecting Search Console opportunities, research and writing to WordPress drafts and a Sheets run log. It creates drafts rather than publishing automatically; client impact metrics are not published.",
    status: "Client tool · Reported client use",
    group: "client",
    tags: ["Search Console", "Python", "Content workflows"],
    links: [],
    code: "https://github.com/saswatasg/bloghero_s",
  },
  {
    name: "LinkForge",
    tagline: "Backlink outreach with an inspectable workflow",
    description:
      "A desktop workflow for Sierra Living Concepts: discover and vet domains, find contacts, match pages and draft pitches into a Google Sheets tracker. Suppression rules apply throughout; it does not send outreach automatically. Deployment and adoption are not established here.",
    status: "Client-oriented tool · Documented implementation",
    group: "client",
    tags: ["NiceGUI", "Google Sheets", "Outreach workflows"],
    links: [],
    code: "https://github.com/saswatasg/linkforge",
  },
  {
    name: "Pixel Display Controller",
    tagline: "Connect a web interface to a real device",
    description:
      "A personal controller for a 32×32 BLE display. A Next.js interface connects through a local FastAPI bridge for text, images, GIFs and device controls. The repository reports an MVP tested on hardware; this is a personal integration, not a commercial deployment.",
    status: "Personal build · Hardware MVP",
    group: "independent",
    tags: ["Next.js", "FastAPI", "Bluetooth", "Hardware integration"],
    links: [
      {
        label: "Controller interface",
        href: "https://pixel-display-dun.vercel.app",
        external: true,
      },
    ],
    code: "https://github.com/saswatasg/pixel-display",
  },
  {
    name: "FilmRisk.AI",
    tagline: "A risk-model experiment with published failures",
    description:
      "A TypeScript scoring experiment using 2,454 film records, of which 729 have trainable financial data. Published temporal backtests did not establish an advantage over simple baselines. The useful artifact is the evaluation and its limitations.",
    status: "Research experiment · Weak backtest",
    group: "research",
    tags: ["Next.js", "Gradient boosting", "Bayesian priors", "Evaluation"],
    links: [
      {
        label: "Evaluation note",
        href: "/blog/film-risk-engine",
        external: false,
      },
    ],
    code: "https://github.com/saswatasg/FilmRisk.AI",
  },
  {
    name: "Topshe",
    tagline: "Explore a local language model in the browser",
    description:
      "An experimental assistant running a quantised Qwen model through WebAssembly, with local conversation storage. Voice uses browser speech APIs and may involve remote services. Calendar, email and smart-home integrations are planned rather than delivered.",
    status: "Personal experiment · Browser-local LLM",
    group: "research",
    tags: ["React", "wllama", "Web Speech API", "PWA"],
    links: [
      {
        label: "Build note",
        href: "/blog/topshe-browser-voice-ai",
        external: false,
      },
    ],
    code: "https://github.com/saswatasg/topshe",
  },
  {
    name: "TGB Hunt",
    tagline: "A self-hosted outreach automation experiment",
    description:
      "A Django and Playwright experiment for campaign tasks, connection requests and follow-ups. The implementation can send automatically; a mandatory review gate is not established. Kept as an archive of workflow engineering and product constraints.",
    status: "Archive · Automation experiment",
    group: "archive",
    tags: ["Django", "Playwright", "Task orchestration"],
    links: [
      {
        label: "Implementation note",
        href: "/blog/tgb-hunt-linkedin-outreach-agent",
        external: false,
      },
    ],
    code: "https://github.com/saswatasg/TGBhunt",
  },
  {
    name: "Intent",
    tagline: "A prototype for more deliberate matching",
    description:
      "An independent dating-product prototype built with Next.js and Supabase. Explore the product direction through the demo; verified-profile coverage, matching quality and public launch timing are not established.",
    status: "Independent prototype · Demo",
    group: "research",
    tags: ["Next.js", "Supabase", "Product exploration"],
    links: [
      {
        label: "Demo",
        href: "https://intent-app-o5nw.vercel.app",
        external: true,
      },
    ],
    code: "https://github.com/saswatasg/intent-app",
  },
  {
    name: "11 PM Cinema",
    tagline: "A small tool for choosing a film together",
    description:
      "A personal movie-selection app exploring mood-led choices for two people. A compact build rather than a claim of commercial traction.",
    status: "Archive · Personal app",
    group: "archive",
    tags: ["Next.js", "TypeScript"],
    links: [
      {
        label: "Live app",
        href: "https://movie-sugest.vercel.app",
        external: true,
      },
    ],
    code: "https://github.com/saswatasg/MovieSugest",
  },
].map((project) => ({ ...project, statusClass: "bg-paper text-ink" }));

export const allProjects = [
  {
    company: "livekeeping",
    companyName: "LiveKeeping",
    title: "Compliance AI Opportunities — Product Requirements",
    description:
      "Documented requirements for pre-submission validation, recurring-field auto-population and clearer error messages for the data science roadmap. These are proposed opportunities, not claimed deployed AI features.",
    tags: ["Product Requirements", "AI Roadmap", "Compliance"],
    result: "Requirements documented · Proposed roadmap inputs",
  },
  {
    company: "upcore",
    companyName: "Upcore Technologies",
    title: "Inventory Leveling & Procurement Intelligence",
    description:
      "A working client demo connecting component demand, stock requirements and lead-time procurement scheduling using mock data.",
    tags: ["Product Design", "React", "TypeScript", "Procurement"],
    result: "Client demo · 28 reconciliation tests · Mock data",
    caseStudyLink: "/case-studies/upcore-inventory-leveling",
  },
  {
    company: "upcore",
    companyName: "Upcore Technologies",
    title: "Fractional AI Officer — Service Architecture",
    description:
      "Designed a five-layer governance and operating framework: Align, Accelerate, Protect, Comply and Optimise, with 19 capabilities. An architecture artifact rather than a claim of certification or production deployment.",
    tags: ["Service Design", "AI Governance", "Strategy"],
    result: "5 layers · 19 capabilities · Architecture designed",
  },
  {
    company: "upcore",
    companyName: "Upcore Technologies",
    title: "AI Guardrail Evaluation",
    description:
      "Built and stress-tested a guardrail system across five evaluations. The reported pass rate was 100% against a 40% baseline; the limited test scope does not establish general reliability.",
    tags: ["AI Evaluation", "Guardrails", "Validation"],
    result: "5 evaluations · Limited test scope",
  },
  {
    company: "upcore",
    companyName: "Upcore Technologies",
    title: "Lead Qualification — A Shared Scorecard",
    description:
      "Built a five-dimension, 100-point qualification framework with Hot, Warm, Educate and Park tiers, applied to the live pipeline.",
    tags: ["B2B GTM", "Qualification", "Enterprise", "Sales Ops"],
    result: "5 dimensions · 100-point scale · 4 tiers · Applied to pipeline",
    caseStudyLink: "/case-studies/upcore-lead-scoring",
  },
  {
    company: "livekeeping",
    companyName: "LiveKeeping",
    title: "E-Way Bill Adoption Diagnosis — 17:1 Compliance Gap",
    description:
      "Conducted deep-dive analysis uncovering a massive drop-off where PRO+ users generated E-Way Bills externally via Tally rather than in-app. Built an executive narrative that changed the product roadmap.",
    tags: [
      "Data Analytics",
      "B2B SaaS",
      "User Behavior",
      "Executive Reporting",
    ],
    result:
      "17:1 E-Way Bill gap · 19:1 E-Invoice gap · Executive decision support",
    caseStudyLink: "/case-studies/livekeeping-compliance-gap",
  },
  {
    company: "sierra",
    companyName: "Sierra Living Concepts",
    title: "Cart & Checkout Flow Redesign — –26% Abandonment",
    description:
      "Ran a friction audit combining GA4 step funnels and Clarity session evidence. Simplified fields, clarified trust signals, and adjusted error/validation UX.",
    tags: ["Checkout UX", "GA4", "Trust Signals", "A/B Testing"],
    result: "Checkout abandonment: 73.1% → 53.9% (–26%) · 480K sessions",
    caseStudyLink: "/case-studies/cart-checkout",
  },
  {
    company: "sierra",
    companyName: "Sierra Living Concepts",
    title: "Category & Landing Page Redesign — +34% Leads",
    description:
      "Led a 4-week sprint guided by GA4 custom events and Microsoft Clarity heatmaps. Replaced commodity category pages with story-driven, trust-led journeys. 1.1M BigQuery events analyzed.",
    tags: ["Product Management", "GA4", "UX Design", "Shopify"],
    result:
      "Session-to-PDP-click: +17% · Qualified leads: +34% · Bounce: −16% · ATC: +27%",
    caseStudyLink: "/case-studies/category-discovery",
  },
  {
    company: "sierra",
    companyName: "Sierra Living Concepts",
    title: "Lead Form Conversion Overhaul — +124% in 28 Days",
    description:
      "Diagnosed event funnels and rage-clicks. Rebuilt static form into category-specific modules with Material 3 components, contextual microcopy, and latency fixes.",
    tags: ["Product Management", "UX", "CRO", "Analytics"],
    result:
      "Lead submissions: +124% · Mobile completion time: −41% · Rage clicks: −68%",
    caseStudyLink: "/case-studies/lead-form",
  },
  {
    company: "sierra",
    companyName: "Sierra Living Concepts",
    title: "Lead Allocation & Routing — Gold/Silver/Bronze System",
    description:
      "Built a data-backed lead routing system across 4 agents. Website forms (63.5% CVR) routed differently from chat (4.7% CVR). 30-day pilot from 10% to full rollout.",
    tags: [
      "Sales Ops",
      "Data Analysis",
      "Routing Design",
      "Revenue Operations",
    ],
    result:
      "Gold source CVR: 63.5% · Bronze source CVR: 0.4% · Days to close: 5.2 → 3.5 target",
    caseStudyLink: "/case-studies/sierra-lead-allocation",
  },
  {
    company: "livekeeping",
    companyName: "LiveKeeping",
    title: "Send Greetings + Nano Banana AI Integration — +168% Engagement",
    description:
      "Integrated Google Gemini Flash (Nano Banana) image AI into LiveKeeping's dormant Pro+ Send Greetings feature. Built a geo-segmented festival calendar across 5 Indian regions with 27 occasions.",
    tags: ["AI Integration", "Feature PM", "India SMB", "Engagement"],
    result: "+168% feature engagement · 27 occasions · 5 geo-regions",
    caseStudyLink: "/case-studies/livekeeping-send-greetings",
  },
  {
    company: "livekeeping",
    companyName: "LiveKeeping",
    title:
      "Push Notification Architecture — 27 Triggers, Priority Tiers, Geo-Segmented",
    description:
      "Redesigned the entire lifecycle messaging architecture covering renewals, transactional states, conflict logic, and feature releases across PRO and PRO+ plan segments.",
    tags: [
      "Systems Design",
      "Notification Strategy",
      "GST Compliance",
      "India SMB",
    ],
    result: "27+ triggers · P0–P3 priority · 3-slot daily cap · 5 geo-regions",
    caseStudyLink: "/case-studies/livekeeping-notifications",
  },
  {
    company: "livekeeping",
    companyName: "LiveKeeping",
    title: "Daily Report Automation — 3 Sources, 88 Rows, 11 AM",
    description:
      "Built a Google Apps Script pipeline unifying Kibana, MongoDB, and GA4 into a single auto-populated report. Eliminated manual data entry across the team.",
    tags: ["Google Apps Script", "Kibana", "MongoDB", "GA4"],
    result:
      "3 sources unified · 88 rows mapped · 11 AM auto-populate · 0 manual steps",
    caseStudyLink: "/case-studies/livekeeping-report-automation",
  },
  {
    company: "upcore",
    companyName: "Upcore Technologies",
    title: "Webinar Sales Engine Redesign",
    description:
      "Redesigned the full-funnel webinar experience — landing page, email sequence, and post-session nurture. Mapped drop-off points across registration, attendance, and follow-up before rebuilding each touchpoint from the data up.",
    tags: ["Funnel Design", "Email Strategy", "Growth", "Landing Pages"],
    result: "478 sign-ups/month · +51% from baseline",
  },
  {
    company: "upcore",
    companyName: "Upcore Technologies",
    title: "Enterprise Outreach Optimization",
    description:
      "Transitioned from manual LinkedIn prospecting to a structured outbound system with lead scoring, BDR capacity planning, and a tiered qualification framework based on company size, vertical, and AI readiness signals.",
    tags: ["Outbound", "Lead Scoring", "B2B GTM", "Sales Ops"],
    result: "Cost-to-book reduced by 36%",
  },
  {
    company: "upcore",
    companyName: "Upcore Technologies",
    title: "AI Agent Market Intelligence Report",
    description:
      "Produced a 16-page research report covering the agentic AI tooling landscape, market sizing, adoption maturity curve, and 8+ enterprise case studies across manufacturing, legal, logistics, and finance verticals.",
    tags: ["Market Research", "AI Agents", "Competitive Intel", "Strategy"],
    result: "16-page whitepaper · 12 verticals mapped",
  },
  {
    company: "upcore",
    companyName: "Upcore Technologies",
    title: "Revenue Model & Pricing Strategy",
    description:
      "Built the revenue architecture and tiered pricing model for Upcore Technologies' AI agent services, partnering with the CEO on financial modelling and the investor narrative.",
    tags: ["Pricing Strategy", "Revenue Modelling", "GTM", "Strategy"],
    result: "Revenue model · Tiered pricing strategy",
  },
  {
    company: "upcore",
    companyName: "Upcore Technologies",
    title: "Enterprise Discovery Sprints",
    description:
      "Conducted structured discovery interviews with 20+ prospective clients across 12 verticals. Synthesised findings into a prioritised opportunity brief identifying the top-3 agentic AI use cases by severity, ROI, and buildability.",
    tags: ["Product Discovery", "User Research", "AI Strategy", "Enterprise"],
    result: "20+ interviews · Top-three opportunity brief",
    caseStudyLink: "/case-studies/upcore-discovery",
  },
  {
    company: "livekeeping",
    companyName: "LiveKeeping",
    title: "E-Invoice Adoption Diagnosis — 19:1 Gap",
    description:
      "Investigated low utilization of the native E-Invoice module, mapping workflow disconnects between LiveKeeping and Tally's default integrations using the same methodology as the E-Way Bill diagnosis.",
    tags: ["Product Discovery", "Gap Analysis", "Fintech"],
    result: "19:1 E-Invoice adoption gap identified and reported to C-suite",
  },
  {
    company: "livekeeping",
    companyName: "LiveKeeping",
    title: "CEO Compliance Error Dashboard",
    description:
      "Engineered a multi-week tracking instrument summarizing complex GST compliance rejection codes across product tiers. Created a standardized data pipeline for executive visibility.",
    tags: ["Dashboarding", "Analytics", "GST Compliance"],
    result:
      "Weekly CEO dashboard tracking GST rejection errors · Reduced manual reporting effort",
  },
  {
    company: "sierra",
    companyName: "Sierra Living Concepts",
    title: "Landing Page Optimisation",
    description:
      "Used GA4 funnels and Clarity scroll/click insights to ship speed-tuned, modular landing templates that match paid-traffic intent.",
    tags: ["Product Management", "Landing Pages", "A/B Testing", "UX"],
    result: "Bounce rate: −22% · AOV: +8%",
  },
  {
    company: "sierra",
    companyName: "Sierra Living Concepts",
    title: "Customization Price Calculator",
    description:
      "Defined real-time quote logic and shipped a lightweight JS widget embedded on PDPs with validation and analytics hooks.",
    tags: ["JavaScript", "Product Management", "Analytics", "PDP UX"],
    result: "Custom-order attach rate: +28%",
  },
  {
    company: "sierra",
    companyName: "Sierra Living Concepts",
    title: "On-Site Search Algorithm Upgrade",
    description:
      "Re-weighted relevance factors, added synonym mapping, and ran query-intent experiments with controlled A/B rollout.",
    tags: ["Search", "A/B Testing", "Product Management"],
    result: "Search-attributed revenue: +14%",
  },
  {
    company: "sierra",
    companyName: "Sierra Living Concepts",
    title: "Customer Self-Service Portal",
    description:
      "Defined requirements, selected vendor, and designed track-my-order and self-serve flows with instrumentation. Reduced support load and unlocked cross-sell opportunities.",
    tags: ["CX", "Product Ops", "API Integration", "Analytics"],
    result: "Support tickets: −40% · NPS: +6 points · Cross-sell revenue: +43%",
  },
  {
    company: "sierra",
    companyName: "Sierra Living Concepts",
    title: "Product Page Optimisation",
    description:
      "Event-driven iterations on media gallery, variants, and micro-copy, informed by GA4 custom events and Clarity behavior data.",
    tags: ["GA4", "PDP UX", "Product Management", "UX Research"],
    result: "Add-to-cart rate: +27% · Page engagement time: +22%",
  },
  {
    company: "freelance",
    companyName: "Freelance · Caffena",
    title: "Acquisition Funnel Rebuild — Coffee D2C",
    description:
      "Rebuilt the coffee brand's full acquisition funnel — landing pages, offer architecture, and paid media creative testing — while working full-time at Sierra Living Concepts.",
    tags: ["Growth Consulting", "Performance Marketing", "CRO", "D2C"],
    result: "Revenue: ₹1.62L → ₹5.78L/mo (+257%)",
  },
  {
    company: "freelance",
    companyName: "Freelance · Diwan",
    title: "Lead-Gen Engine — Home Interiors",
    description:
      "Designed and ran a always-on lead-generation engine for a home interiors brand — offer positioning, landing flow, and qualification filters.",
    tags: ["Lead Gen", "Growth Consulting", "Funnel Design", "India D2C"],
    result: "478–523 qualified leads/mo · CPL: ₹277–293",
  },
];

export const FILTERS = [
  { id: "all", label: "All Projects" },
  { id: "upcore", label: "Upcore Technologies", icon: Brain },
  { id: "livekeeping", label: "LiveKeeping", icon: Rocket },
  { id: "sierra", label: "Sierra Living Concepts", icon: Armchair },
  { id: "freelance", label: "Freelance" },
];

export const softwareSchema = openSourceProjects
  .filter((p) => p.code)
  .map((p) => ({
    "@type": "SoftwareApplication",
    name: p.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "See repository requirements",
    description: p.description,
    url: p.links.find((link) => link.external)?.href || p.code,
    codeRepository: p.code,
    author: {
      "@type": "Person",
      "@id": "https://saswatasg.com/#person",
      name: "Saswata S. Sengupta",
    },
  }));
