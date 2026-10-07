import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const defaultMeta = {
  title: "Saswata S. Sengupta | Product Manager",
  description:
    "Product discovery and end-to-end solution delivery for 23+ Upcore Technologies clients. B2B SaaS and commerce product work. IIT Jodhpur MBA.",
  ogTitle: "Saswata S. Sengupta | Product Manager",
  ogDescription:
    "PM at Upcore Technologies. Cut checkout abandonment 73.1% to 53.9%. AI agents, B2B SaaS, growth analytics.",
  twitterTitle: "Saswata S. Sengupta | Product Manager",
  twitterDescription:
    "PM at Upcore Technologies. Cut checkout abandonment 73.1% to 53.9%. AI agents, B2B SaaS, growth analytics.",
};

const pageSpecificMeta = {
  "/": {
    title: "Saswata S. Sengupta | Product Manager",
    description:
      "Product discovery and end-to-end solution delivery for 23+ Upcore Technologies clients. B2B SaaS and commerce product work. IIT Jodhpur MBA.",
  },
  "/about": {
    title: "About Me | Saswata S. Sengupta — Product Manager",
    description:
      "PM across B2B SaaS, D2C, and e-commerce. B.Tech (Mech, 77.2%) + IIT Jodhpur MBA (71.7%, CAT 97.69). Discovery, growth, analytics.",
  },
  "/experience": {
    title: "Professional Background | Saswata S. Sengupta",
    description:
      "PM experience across Upcore (AI agents), Sierra Living (D2C), LiveKeeping (B2B SaaS), and freelance growth consulting.",
  },
  "/work": {
    title: "Work | Saswata S. Sengupta — Case Studies & Product Work",
    description:
      "Product cases, client demos and research across Upcore Technologies, LiveKeeping and Sierra Living Concepts, alongside independent builds.",
  },
  "/contact": {
    title: "Contact | Saswata S. Sengupta",
    description:
      "Get in touch with Saswata S. Sengupta for collaborations, opportunities, or just to say hello.",
  },
  "/case-studies/cart-checkout": {
    title: "Case Study: Cart & Checkout — –26% | Saswata S. Sengupta",
    description:
      "How I reduced cart abandonment from 73.1% to 53.9% through checkout instrumentation and three targeted fixes at Sierra Living Concepts.",
  },
  "/case-studies/category-discovery": {
    title: "Case Study: Category Pages — +17% | Saswata S. Sengupta",
    description:
      "How a 4-week GA4 + Clarity audit fixed 30+ UX issues and lifted session-to-PDP-click conversion by 17% at Sierra Living Concepts.",
  },
  "/case-studies/upcore-inventory-leveling": {
    title: "Inventory Leveling Client Demo | Saswata S. Sengupta",
    description:
      "An Upcore Technologies procurement demo connecting component demand, inventory and purchase timing, with mock data and 28 reconciliation tests.",
  },
  "/case-studies/upcore-discovery": {
    title: "Discovery & Solution Delivery | Saswata S. Sengupta",
    description:
      "Building discovery at Upcore Technologies: research, solution definition and end-to-end delivery management for 23+ clients.",
  },
  "/case-studies/upcore-lead-scoring": {
    title: "Lead Qualification Framework | Saswata S. Sengupta",
    description:
      "A five-dimension, 100-point qualification scorecard with Hot, Warm, Educate and Park tiers, applied to Upcore Technologies’ live pipeline.",
  },
  "/case-studies/lead-form": {
    title: "Case Study: Lead Form Overhaul — +124% | Saswata S. Sengupta",
    description:
      "Rebuilt Sierra Living Concepts' lead form with Material 3 — original UX work +105%; full rebuild +124% in 28 days.",
  },
  "/case-studies/sierra-lead-allocation": {
    title: "Lead Allocation & Routing | Saswata S. Sengupta",
    description:
      "How I built Gold/Silver/Bronze lead routing at Sierra Living Concepts — 4 agents, 30-day pilot, 63.5% gold-source conversion.",
  },
  "/case-studies/livekeeping-compliance-gap": {
    title: "Compliance Adoption Gap — 17:1 | Saswata S. Sengupta",
    description:
      "How I diagnosed a 17:1 gap between Tally and LiveKeeping for PRO+ compliance usage — and built the executive case that changed the roadmap.",
  },
  "/case-studies/livekeeping-send-greetings": {
    title: "Send Greetings + Nano Banana AI | Saswata S. Sengupta",
    description:
      "How I integrated Nano Banana AI into LiveKeeping's Pro+ Send Greetings — geo-segmented festival calendar, AI greeting cards, +168% engagement.",
  },
  "/case-studies/livekeeping-notifications": {
    title: "Push Notification Strategy | Saswata S. Sengupta",
    description:
      "Built LiveKeeping's push notification system from scratch — 27+ triggers, P0-P3 priority queue, 3-slot daily cap, 5 Indian regions.",
  },
  "/case-studies/livekeeping-report-automation": {
    title: "Daily Report Automation | Saswata S. Sengupta",
    description:
      "Automated LiveKeeping's daily metrics report — Kibana, MongoDB, and GA4 unified into Google Sheets, auto-populated at 11 AM via Apps Script.",
  },
};

const PageMeta = ({ title, description, noindex = false, image }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const baseMeta = pageSpecificMeta[currentPath] || defaultMeta;
  const finalTitle = title || baseMeta.title;
  const finalDescription = description || baseMeta.description;

  const siteUrl = "https://saswatasg.com/";

  const cleanPath =
    currentPath === "/"
      ? ""
      : currentPath.replace(/^\//, "").replace(/\/$/, "");
  const finalUrl = `${siteUrl}${cleanPath || ""}`;

  const ogImage = image || "https://saswatasg.com/og/default.png";

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={finalUrl} />
      <link rel="alternate" href={finalUrl} hrefLang="en" />
      <link rel="alternate" href={finalUrl} hrefLang="x-default" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="Saswata S. Sengupta — Blog"
        href="https://saswatasg.com/feed.xml"
      />
      {noindex && <meta name="robots" content="noindex" />}

      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta
        property="og:image:alt"
        content="Saswata S. Sengupta — Product Manager"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Saswata S. Sengupta" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta
        name="twitter:image:alt"
        content="Saswata S. Sengupta — Product Manager"
      />
      <meta name="twitter:site" content="@saswatasg" />
      <meta name="twitter:creator" content="@saswatasg" />
      {currentPath.startsWith("/case-studies/") &&
        currentPath !== "/case-studies" && (
          <>
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: finalTitle,
                description: finalDescription,
                image: [ogImage],
                author: {
                  "@type": "Person",
                  "@id": "https://saswatasg.com/#person",
                  name: "Saswata S. Sengupta",
                },
                publisher: {
                  "@type": "Organization",
                  "@id": "https://saswatasg.com/#organization",
                  name: "Saswata S. Sengupta",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://saswatasg.com/og/logo.png",
                  },
                },
                mainEntityOfPage: { "@type": "WebPage", "@id": finalUrl },
              })}
            </script>
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://saswatasg.com/",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Work",
                    item: "https://saswatasg.com/work",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: finalTitle,
                    item: finalUrl,
                  },
                ],
              })}
            </script>
          </>
        )}
    </Helmet>
  );
};

export default PageMeta;
