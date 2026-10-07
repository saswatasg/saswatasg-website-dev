import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import PageHeader, { PageEnd } from "@/components/workbench/PageHeader";
import { trackEvent } from "@/utils/analytics";
import {
  Calendar,
  Map,
  Layers,
  GitBranch,
  Target,
  Brain,
  Lightbulb,
  Search,
  FileText,
  BarChart2,
  Bell,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Zap,
  Settings,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import CareerTimeline from "@/components/workbench/CareerTimeline";
import PageMeta from "@/components/PageMeta";

const roles = [
  {
    title: "Product Discovery Manager",
    company: "Upcore Technologies",
    period: "April 2026 – Present",
    type: "Full-time",
    context:
      "Deriving solutions and managing their delivery end to end for 23+ clients, alongside product discovery and sprint/backlog coordination with six developers.",
    tags: [
      "AI Agents",
      "Product Discovery",
      "Solution Architecture",
      "Enterprise",
      "Market Intelligence",
    ],
    achievements: [
      {
        text: "Derived solutions and managed their delivery end to end for 23+ clients, connecting client problems, solution definition and execution.",
        icon: <Target className="w-4 h-4" />,
        metric: "23+ clients",
      },
      {
        text: "Overhauled webinar sales engine — designed full-funnel landing page and email sequence; scaled registrations to 478 sign-ups/month (up 51% from baseline).",
        icon: <Target className="w-4 h-4" />,
        metric: "+51%",
      },
      {
        text: "Transitioned enterprise outreach from manual LinkedIn prospecting to data-driven outbounding with lead scoring and capacity planning for 3 BDRs — optimized cost-to-book by 36%.",
        icon: <DollarSign className="w-4 h-4" />,
        metric: "-36%",
      },
      {
        text: "Built and stress-tested an AI guardrail system across five evaluations. Reported pass rate: 100%, compared with a 40% baseline; this is a limited evaluation result.",
        icon: <CheckCircle2 className="w-4 h-4" />,
        metric: "5 evaluations",
      },
      {
        text: "Ran discovery practice across the org — synthesised a 500+ response buyer survey into prioritised agentic AI opportunities.",
        icon: <Search className="w-4 h-4" />,
        metric: "500+ survey",
      },
      {
        text: "Performed discovery with 20+ prospective enterprise clients across 12 verticals, top-3 high-impact agentic AI opportunities.",
        icon: <Map className="w-4 h-4" />,
        metric: "20+",
      },
      {
        text: "Produced a 16-page 'State of AI Agents' report covering market sizing, tooling landscape, adoption maturity curve, and 8+ case studies across industries.",
        icon: <FileText className="w-4 h-4" />,
        metric: "16 pages",
      },
      {
        text: "Built revenue model and pricing strategy for AI agent services.",
        icon: <DollarSign className="w-4 h-4" />,
      },
      {
        text: "Built market intelligence across verticals — tracking agentic AI tooling, competitor positioning, and industry-specific automation trends.",
        icon: <Brain className="w-4 h-4" />,
      },
    ],
    caseStudies: [
      {
        to: "/case-studies/upcore-inventory-leveling",
        label: "Inventory Leveling Client Demo",
      },
      {
        to: "/case-studies/upcore-discovery",
        label: "Discovery & Solution Delivery",
      },
      {
        to: "/case-studies/upcore-lead-scoring",
        label: "Qualification Framework",
      },
    ],
  },
  {
    title: "Associate Product Manager",
    company: "LiveKeeping (An IndiaMART Company)",
    period: "Jan 2026 – Mar 2026",
    type: "Full-time",
    context:
      "Led B2B SaaS analytics and feature adoption initiatives for Indian SMBs.",
    tags: [
      "Fintech",
      "B2B SaaS",
      "GST Compliance",
      "Analytics",
      "Notifications",
    ],
    achievements: [
      {
        text: "Diagnosed a 17:1 adoption gap where PRO+ subscribers generated E-Way Bills via Tally instead of LiveKeeping's native module; built an executive presentation for VP/CEO that greenlit a cross-functional investigation.",
        icon: <Search className="w-4 h-4" />,
        metric: "17:1 ratio",
      },
      {
        text: "Identified a similar 19:1 E-Invoice adoption gap between Tally and LiveKeeping, feeding analysis into C-suite reporting.",
        icon: <FileText className="w-4 h-4" />,
        metric: "19:1",
      },
      {
        text: "Built an automated weekly CEO report tracking GST rejection errors across compliance products — replaced manual data pulls with structured, recurring insights.",
        icon: <BarChart2 className="w-4 h-4" />,
      },
      {
        text: "Led a company-wide notification strategy overhaul covering all user segments, plan tiers, renewal journeys, and conflict resolution logic across the complete product suite.",
        icon: <Bell className="w-4 h-4" />,
      },
    ],
    caseStudies: [
      {
        to: "/case-studies/livekeeping-compliance-gap",
        label: "Compliance Gap",
      },
      {
        to: "/case-studies/livekeeping-notifications",
        label: "Notification Strategy",
      },
      {
        to: "/case-studies/livekeeping-send-greetings",
        label: "Send Greetings",
      },
      {
        to: "/case-studies/livekeeping-report-automation",
        label: "Report Automation",
      },
    ],
  },
  {
    title: "Product Manager (Growth)",
    company: "Sierra Living Concepts",
    period: "May 2024 – Dec 2025",
    type: "Full-time",
    context:
      "Owned the product growth roadmap for a US-based D2C furniture brand — from UX optimisation to revenue-driving features.",
    tags: ["D2C", "E-Commerce", "UX", "Analytics", "A/B Testing"],
    achievements: [
      {
        text: "Redesigned landing flows — bounce rate dropped from 41.04% to 32.54%",
        icon: <TrendingUp className="w-4 h-4" />,
        metric: "-20.7%",
      },
      {
        text: "Doubled lead submissions (2.14% → 4.40%) via form UX and CTA improvements",
        icon: <Target className="w-4 h-4" />,
        metric: "+105%",
      },
      {
        text: "Reduced checkout abandonment by 26% (73.1% → 53.9%)",
        icon: <DollarSign className="w-4 h-4" />,
        metric: "–26%",
      },
      {
        text: "AI-powered lead assistant drove close rate up to 71.63%",
        icon: <Zap className="w-4 h-4" />,
        metric: "71.63%",
      },
      {
        text: "Configured 118 SKU pricing tools — ATC rate up 18.17%, +$32K/month",
        icon: <Settings className="w-4 h-4" />,
        metric: "+$32K",
      },
      {
        text: "Built 5 pricing configuration tools — custom orders up 34%, +$120K/month",
        icon: <Target className="w-4 h-4" />,
        metric: "+$120K",
      },
      {
        text: "Automated Salesforce CRM journeys — +$113K/month recurring revenue",
        icon: <Zap className="w-4 h-4" />,
        metric: "+$113K",
      },
      {
        text: "Led 70+ product rollouts collaborating with design, engineering, and sales teams.",
        icon: <Users className="w-4 h-4" />,
        metric: "70+",
      },
    ],
    caseStudies: [
      { to: "/case-studies/cart-checkout", label: "Checkout Optimisation" },
      { to: "/case-studies/lead-form", label: "Lead Form Overhaul" },
      { to: "/case-studies/category-discovery", label: "Category Redesign" },
      { to: "/case-studies/sierra-lead-allocation", label: "Lead Allocation" },
    ],
  },
  {
    title: "Freelance Product & Growth Consultant",
    company: "Independent · Caffena & Diwan",
    period: "May 2025 – Dec 2025",
    type: "Freelance",
    context:
      "Advised D2C and service brands on funnel architecture, paid acquisition, and lead-gen systems while working full-time at Sierra Living Concepts.",
    tags: ["Growth Consulting", "Performance Marketing", "CRO", "Lead Gen"],
    achievements: [
      {
        text: "Caffena — rebuilt the coffee brand's acquisition funnel: revenue scaled from ₹1.62L to ₹5.78L monthly (+257%) over three months.",
        icon: <TrendingUp className="w-4 h-4" />,
        metric: "+257%",
      },
      {
        text: "Diwan — lead-gen engine producing 478–523 qualified leads/month at a ₹277–293 cost-per-lead.",
        icon: <Target className="w-4 h-4" />,
        metric: "478–523 leads/mo",
      },
    ],
  },
  {
    title: "Marketing & Sales Intern",
    company: "Mozo Hunt Pvt Ltd",
    period: "May – Jul 2023",
    type: "Internship",
    context: "Drove customer acquisition and enrollment strategies.",
    tags: ["Sales", "Marketing Strategy", "Market Research"],
    achievements: [
      {
        text: "Boosted enrollments by 24% and sales by 154.5%",
        icon: <TrendingUp className="w-4 h-4" />,
        metric: "+24% / +154%",
      },
      {
        text: "Reduced customer acquisition cost through market and competitor research",
        icon: <Target className="w-4 h-4" />,
      },
      {
        text: "Awarded Certificate of Excellence for impact",
        icon: <Award className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Marketing Intern",
    company: "Rotaract Club, Delhi",
    period: "Dec 2022",
    type: "Internship",
    context:
      "Managed digital campaigns and creative assets for social awareness events.",
    tags: ["Meta Ads", "Social Media", "Design"],
    achievements: [
      {
        text: "Ran Meta campaigns — traffic up 122%, engagement up 158%",
        icon: <TrendingUp className="w-4 h-4" />,
        metric: "122% / 158%",
      },
      {
        text: "Designed creatives for social media and awareness events",
        icon: <Settings className="w-4 h-4" />,
      },
    ],
  },
];

const earlierRoles = [
  {
    title: "Freelance Photographer",
    company: "Self-Employed",
    period: "Sep 2019 – Jun 2021",
    type: "Freelance",
    context: "Led commercial shoots and managed a creative team of 6.",
    tags: ["Photography", "Team Leadership", "Creative Direction"],
    achievements: [
      {
        text: "Completed 58+ projects for events and commercial work",
        icon: <CheckCircle2 className="w-4 h-4" />,
        metric: "58+",
      },
      {
        text: "Led a 6-person creative team delivering high-quality results",
        icon: <Users className="w-4 h-4" />,
      },
    ],
  },
];

function Experience() {
  return (
    <>
      <PageMeta />
      <div className="wb-page">
        <PageHeader
          label="Experience"
          variant="experience"
          title="A journey from questions to outcomes."
          description="Enterprise AI at Upcore Technologies, B2B SaaS at LiveKeeping, commerce at Sierra Living Concepts—and the consulting and creative work around them."
        />
        <CareerTimeline roles={roles} />
        <div className="wb-section-title">
          <h2>The work behind the timeline.</h2>
        </div>
        <div className="wb-timeline">
          {roles.map((role, index) => (
            <RoleCard role={role} index={index} key={role.company} />
          ))}
        </div>
        <div className="wb-section-title">
          <h2>Earlier creative work.</h2>
          <span>A foundation in client delivery</span>
        </div>
        {earlierRoles.map((role, index) => (
          <RoleCard
            role={role}
            index={index + roles.length}
            key={role.company}
          />
        ))}
        <PageEnd
          title="A useful next chapter?"
          description="I’m always interested in a thoughtful conversation about products, teams and problems worth solving."
        />
      </div>
    </>
  );
}
function RoleCard({ role, index }) {
  const [expanded, setExpanded] = useState(false);
  const reduced = useReducedMotion();
  return (
    <motion.article
      id={`experience-${index}`}
      className={`wb-surface wb-role-card wb-tone-${["sage", "blue", "clay", "gold", "lilac"][index % 5]}`}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.04 }}
    >
      <header className="wb-role-meta">
        <span className="wb-label">{role.period}</span>
        <h2 className="mt-4">{role.company}</h2>
        <h3>{role.title}</h3>
        <span>{role.type}</span>
      </header>
      <div>
        {(expanded || role.achievements.length <= 3) && (
          <p className="wb-role-context">{role.context}</p>
        )}
        <ul id={`role-points-${index}`} className="wb-role-points">
          {role.achievements.slice(0, expanded ? undefined : 3).map((a, i) => (
            <li key={i}>
              <p>{a.text}</p>
              {a.metric && <span className="wb-role-metric">{a.metric}</span>}
            </li>
          ))}
        </ul>
        {role.achievements.length > 3 && (
          <button
            className="wb-role-expand"
            aria-expanded={expanded}
            aria-controls={`role-points-${index}`}
            onClick={() => {
              setExpanded((value) => !value);
              if (expanded)
                requestAnimationFrame(() =>
                  document
                    .getElementById(`experience-${index}`)
                    ?.scrollIntoView({
                      block: "start",
                      behavior: reduced ? "auto" : "smooth",
                    }),
                );
            }}
          >
            {expanded
              ? "Show less"
              : `Show more · ${role.achievements.length - 3} more points`}{" "}
            <span aria-hidden="true">{expanded ? "−" : "+"}</span>
          </button>
        )}
        {role.caseStudies && (
          <nav
            aria-label={`${role.company} related work`}
            className="wb-role-links"
          >
            {role.caseStudies
              .slice(
                0,
                expanded || role.achievements.length <= 3 ? undefined : 1,
              )
              .map((cs) => (
                <Link key={cs.to} to={cs.to}>
                  {cs.label} ↗
                </Link>
              ))}
          </nav>
        )}
      </div>
    </motion.article>
  );
}
export default Experience;
