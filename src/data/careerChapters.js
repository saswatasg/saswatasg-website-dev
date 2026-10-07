// Dates and ownership are drawn from the existing Experience page.
export const careerChapters = [
  {
    id: "sierra",
    company: "Sierra Living Concepts",
    date: "May 2024 — Dec 2025",
    role: "Product Manager · Growth",
    context: "D2C / Product growth",
    headline: "Finding and fixing friction in the buying journey.",
    description:
      "Owned the product growth roadmap for a US-based furniture brand, from UX optimisation to revenue-driving features.",
    slug: "cart-checkout",
  },
  {
    id: "livekeeping",
    company: "LiveKeeping / IndiaMART",
    date: "Jan — Mar 2026",
    role: "Associate Product Manager",
    context: "B2B SaaS / Compliance & adoption",
    headline: "Making a complex compliance workflow easier to use.",
    description:
      "Investigated API logs and user behaviour to diagnose feature adoption gaps and shape product decisions for Indian SMBs.",
    slug: "livekeeping-compliance-gap",
  },
  {
    id: "upcore",
    company: "Upcore Technologies",
    date: "Apr 2026 — Present",
    role: "Product Discovery Manager",
    context: "Enterprise AI / Discovery → Deployment",
    headline: "Turning enterprise workflows into AI agent opportunities.",
    description:
      "Deriving solutions and managing delivery end to end for 23+ clients, alongside discovery and six-developer delivery coordination.",
    slug: "upcore-discovery",
  },
];
export const impactStories = [
  {
    id: "sierra",
    label: "Sierra",
    company: "Sierra Living Concepts / Growth",
    value: "73% → 54%",
    caption: "Checkout abandonment",
    chart: "Checkout abandonment",
    bars: [
      { label: "Before", value: "73.1%", extent: 73.1 },
      { label: "After", value: "53.9%", extent: 53.9 },
    ],
    note: "480K sessions analysed",
    metrics: [
      ["73%→54%", "Checkout abandonment"],
      ["70+", "Products shipped"],
    ],
    slug: "cart-checkout",
  },
  {
    id: "livekeeping",
    label: "LiveKeeping",
    company: "LiveKeeping / Discovery",
    value: "17:1",
    caption: "E-Way Bill adoption gap",
    chart: "Relative E-Way Bill volume",
    bars: [
      { label: "LiveKeeping", value: "1", extent: 100 / 17 },
      { label: "Tally", value: "17", extent: 100 },
    ],
    note: "Relative volume · 17:1 gap",
    metrics: [
      ["100K+", "API logs analysed"],
      ["+168%", "Greetings engagement"],
    ],
    slug: "livekeeping-compliance-gap",
  },
  {
    id: "upcore",
    label: "Upcore",
    company: "Upcore Technologies / Solution delivery",
    value: "23+",
    caption: "Clients · Solution delivery",
    chart: "Discovery through delivery",
    stages: ["Client problem", "Solution definition", "Delivery"],
    note: "Client engagements · Delivery ownership",
    metrics: [
      ["500+", "Survey responses"],
      ["6", "Developers coordinated"],
    ],
    slug: "upcore-discovery",
  },
];
