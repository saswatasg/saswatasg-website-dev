export const upcoreStudies = {
  inventory: {
    title: "Knowing what to buy. And when to buy it.",
    description:
      "An inventory-leveling client demo at Upcore Technologies: from sales orders and shared components to an explainable purchase schedule.",
    kind: "PRODUCT & SYSTEM DESIGN",
    stage: "Client demo · Mock data",
    intro:
      "A manufacturer’s planning question is bigger than “what is running low?” It is whether the right components will arrive in time, without tying up cash before they are needed. This demo makes that relationship visible.",
    facts: [
      ["BOM", "Order-to-component trace"],
      ["Lead time", "Back-scheduled purchasing"],
      ["28 tests", "Calculation reconciliation"],
    ],
    flow: [
      "Sales orders",
      "Component demand",
      "Available supply",
      "Purchase schedule",
    ],
    sections: [
      {
        title: "The planning problem",
        body: "A finished product can depend on many components, and the same inexpensive part can appear in several bills of material. Looking at each order separately hides the combined requirement. Buying every component immediately can solve one timing problem while tying up cash before production needs it.",
        points: [
          "Combine demand across orders without losing its origin.",
          "Account for stock and incoming purchase orders.",
          "Show the quantity required and the last safe date to order.",
        ],
      },
      {
        title: "My contribution",
        body: "At Upcore Technologies, I derive solutions and manage their delivery end to end for 23+ clients. Inventory Leveling is one concrete client-demo artifact within that work: translating a procurement problem into a product workflow, planning logic and a working interface. The demo’s scope is distinct from an integrated production deployment.",
      },
      {
        title: "From a component list to a planning decision",
        body: "The workflow expands sales orders through their bills of material, combines gross demand by component and nets it against on-hand stock and incoming purchase orders. It exposes stock requirements, shortage priorities and procurement timing. A per-order trace lets the user inspect why a shared component needs attention.",
        points: [
          "Inventory health separates critical, low, optimal and overstocked components.",
          "Procurement connects shortages to purchase quantities and dates.",
          "Leveling uses a target build date and supplier lead times to stagger purchasing.",
        ],
      },
      {
        title: "A schedule that responds to the plan",
        body: "The user can change the build date and quantity or upload a bill of material as CSV. The Gantt updates the ordering schedule around those inputs. Components whose lead time exceeds the available runway are flagged for forecasting or pre-stocking. Cost views express consequences in working capital and carrying costs using the demo data.",
      },
      {
        title: "Validation before integration",
        body: "The public repository documents 28 reconciliation tests covering demand aggregation, stock classifications, recommended quantities, independent cost calculations, lead-time scheduling and CSV parsing. This validates calculations against the defined dataset; it does not measure realized client savings or establish resilience against every production-data condition.",
      },
    ],
    resultTitle: "A working, inspectable client demo.",
    result:
      "The delivered artifact connects inventory health, procurement timing and cost impact. It runs on realistic mock data with no live ERP connection, backend or database. Production integration, data quality, operational acceptance and realized financial effects remain separate deployment and measurement questions.",
    links: [
      {
        label: "Open the client demo",
        href: "https://inventory-leveling-agent-gamma.vercel.app",
      },
      {
        label: "Explore the code and tests",
        href: "https://github.com/saswatasg/inventory-leveling-agent",
      },
    ],
    related: "/case-studies/upcore-discovery",
    relatedLabel: "Explore the discovery practice",
  },
  discovery: {
    title: "From a client problem to a deliverable solution.",
    description:
      "Building discovery at Upcore Technologies and deriving solutions while managing delivery end to end for 23+ clients.",
    kind: "DISCOVERY & DELIVERY",
    stage: "Client work · April 2026–present",
    intro:
      "Enterprise interest in AI is a starting point. My work is to understand the underlying workflow, derive a useful solution and manage its delivery. At Upcore Technologies, that responsibility spans 23+ clients.",
    facts: [
      ["23+", "Clients · Solution delivery"],
      ["500+", "Survey responses"],
      ["6 developers", "Delivery coordination"],
    ],
    flow: [
      "Client problem",
      "Research evidence",
      "Solution definition",
      "Delivery ownership",
    ],
    sections: [
      {
        title: "Build a discovery practice, not just a call calendar",
        body: "I built the discovery practice from scratch: structured client conversations, a survey with 500+ respondents and an evidence framework for prioritization. The purpose was to give problem definition and opportunity selection a repeatable basis. Client conversations reveal workflow details; the survey adds a broader perspective. The evidence framework helps bring those inputs into opportunity discussions.",
      },
      {
        title: "Understand the opportunity before defining the solution",
        body: "The work includes 20+ prospective-client conversations across 12 verticals and a prioritized top-three opportunity brief. The brief connects opportunities to their importance, expected value and feasibility, making the basis for the next product decision visible.",
        points: [
          "Problem definition: identify the workflow and constraint.",
          "Evidence synthesis: organize research into comparable opportunities.",
          "Prioritization: make the basis for a recommendation visible.",
        ],
      },
      {
        title: "Carry the solution through delivery",
        body: "I derive solutions and manage their delivery end to end for 23+ clients. I also coordinate a six-developer team through sprint planning and backlog management. This is delivery leadership across functions; the developers are not my direct reports.",
      },
      {
        title: "Make the work tangible",
        body: "Inventory Leveling & Procurement Intelligence is a public example of a solution expressed as a working client demo. It translates orders, bills of material, available stock and lead times into procurement decisions. Its inspectable planning logic and tests provide a concrete artifact alongside the broader research and delivery work.",
      },
      {
        title: "What the work produces",
        body: "The work produces research evidence, prioritized opportunity briefs, solution definitions and client-facing deliverables. The inventory-planning demo provides one public example; other client artifacts remain confidential.",
      },
    ],
    resultTitle: "Discovery that continues into delivery.",
    result:
      "Built a discovery practice and took responsibility for deriving solutions and managing delivery across 23+ client engagements. This overview covers the role and operating scope; the inventory case below shows a specific solution and its delivery stage.",
    links: [],
    related: "/case-studies/upcore-inventory-leveling",
    relatedLabel: "See the inventory-planning client demo",
  },
  qualification: {
    title: "Make the next sales conversation a deliberate choice.",
    description:
      "A five-dimension, 100-point qualification framework applied to Upcore Technologies’ live pipeline.",
    kind: "QUALIFICATION SYSTEM",
    stage: "Method study · Applied to the live pipeline",
    intro:
      "A qualification framework should explain why a prospect deserves attention and what the team should do next. At Upcore Technologies, I built a structured scorecard to support that decision.",
    facts: [
      ["5 dimensions", "Qualification framework"],
      ["100 points", "Scoring scale"],
      ["4 tiers", "Different next actions"],
    ],
    flow: [
      "Prospect evidence",
      "Qualification score",
      "Priority tier",
      "Next conversation",
    ],
    sections: [
      {
        title: "The decision behind the score",
        body: "Qualification turns prospect information into a consistent basis for deciding where to spend attention. A shared framework makes that decision easier to explain across the team. The output is a priority and a next action, rather than a promise that a prospect will convert.",
      },
      {
        title: "What I built",
        body: "I developed a five-dimension qualification framework on a 100-point scale and applied it to the live pipeline. Four tiers—Hot, Warm, Educate and Park—make the score actionable. The framework supports commercial judgment; the score itself is not a measured probability of closing a deal.",
        points: [
          "Hot: priority for a commercial conversation.",
          "Warm: a prospect to develop further.",
          "Educate: more context before progression.",
          "Park: revisit rather than prioritize now.",
        ],
      },
      {
        title: "Keep the evidence visible",
        body: "A useful review should trace a rating to the prospect information behind it. Missing information should remain unknown rather than become an optimistic assumption. The value of the scorecard is its explainability: the next conversation has a clear basis, and the team can review the evidence behind a priority.",
      },
    ],
    resultTitle: "A shared qualification framework in operational use.",
    result:
      "Delivered a five-dimension scorecard and applied it to the live pipeline. The next measurement questions are whether it improves qualification consistency, follow-through and conversion by tier. No measured performance uplift is claimed for this method study.",
    links: [],
    related: "/case-studies/upcore-discovery",
    relatedLabel: "Read about discovery and solution delivery",
  },
};
