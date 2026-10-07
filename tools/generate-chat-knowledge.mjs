import { promises as fs } from "node:fs";
import matter from "gray-matter";
import caseStudies from "../src/data/caseStudies.js";
import { openSourceProjects, allProjects } from "../src/data/projectsData.js";
import { careerChapters } from "../src/data/careerChapters.js";
import { books } from "../src/data/creativeContent.js";
const entries = [
  ...careerChapters.map((p) => ({
    title: p.company,
    text: `${p.date}. ${p.role}. ${p.context}. ${p.headline} ${p.description}`,
    url: "/experience",
    kind: "career",
  })),
  ...caseStudies.map((p) => ({
    title: p.title,
    text: `${p.company}. ${p.year}. ${p.description} Evidence: ${p.stats.map((s) => `${s.value} ${s.label}`).join("; ")}. Topics: ${p.tags.join(", ")}`,
    url: `/case-studies/${p.slug}`,
    kind: "case study",
  })),
  ...openSourceProjects.map((p) => ({
    title: p.name,
    text: `${p.description} Status: ${p.status}. Tags: ${p.tags.join(", ")}`,
    url: `/builds#${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    kind: "build",
  })),
  ...allProjects.map((p) => ({
    title: p.title,
    text: `${p.companyName}. ${p.description} ${p.result || ""}`,
    url: p.caseStudyLink || "/work",
    kind: "product work",
  })),
  ...books.map((p) => ({
    title: p.title,
    text: `${p.status}. ${p.note}`,
    url: "/writing",
    kind: "personal",
  })),
  {
    title: "The personal side: আড্ডা (Adda)",
    text: "A personal cultural journal: stories, films and everyday observations, Bengal and Kolkata. Cinema interests include Satyajit Ray, Rituparno Ghosh, Hollywood and some Bollywood. No specific favourite film ranking has been supplied. Photography page currently contains illustrative placeholders, not a curated photo collection.",
    url: "/adda",
    kind: "personal",
  },
  {
    title: "Education and learning",
    text: "MBA, Marketing & Analytics, IIT Jodhpur, 2022–2024. B.Tech, Mechanical Engineering, Jalpaiguri Government Engineering College, 2017–2021. Anthropic Academy coursework; Google Skillshop credentials; Zoho CRM administrator training. Tata Imagination Challenge national semifinalist. Informally mentors 5–6 early-career professionals.",
    url: "/about",
    kind: "about",
  },
  {
    title: "Consulting and earlier experience",
    text: "Independent consulting alongside Sierra Living Concepts, May–Dec 2025: Caffena acquisition funnel, monthly revenue ₹1.62L to ₹5.78L (+257%) over three months; Diwan lead generation, 478–523 qualified leads/month, ₹277–293 CPL. Mozo Hunt Pvt Ltd Marketing & Sales Intern, May–July 2023. Rotaract Club, Delhi, Marketing Intern, December 2022. Freelance photography September 2019–June 2021, 58+ projects and a six-person creative team.",
    url: "/experience",
    kind: "career",
  },
];
for (const name of (await fs.readdir("content/blog")).filter((n) =>
  n.endsWith(".mdx"),
)) {
  const { data, content } = matter(
    await fs.readFile(`content/blog/${name}`, "utf8"),
  );
  entries.push({
    title: data.title,
    text: `${data.description || ""}\n${content
      .replace(/^import .*$/gm, "")
      .replace(/<[^>]+>/g, "")
      .slice(0, 2200)}`,
    url: `/blog/${name.replace(/\.mdx$/, "")}`,
    kind: "article",
  });
}
await fs.writeFile(
  "server/portfolio-knowledge.json",
  JSON.stringify(
    {
      updated: "2026-10-07",
      identity:
        "Saswata Subhra Sengupta, product manager based in Kolkata, India. Product discovery, solution design, end-to-end delivery, analytics, AI and growth. Contact: saswatasg@gmail.com. LinkedIn: https://linkedin.com/in/sss99. GitHub: https://github.com/saswatasg. Resume: /assets/resume.pdf. Full-time current role: Product Discovery Manager, Upcore Technologies, April 2026–present. Derived solutions and managed end-to-end delivery for 23+ clients. Six developers coordinated. DhanPlan is live; Meldstead is in pre-launch final audit. Do not present prototypes, mock-data demos or backtests as realised business impact.",
      entries,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `[chat-knowledge] ${entries.length} public portfolio entries generated`,
);
