import fs from "node:fs";
const palette = {
  ink: "#252820",
  paper: "#f7f4eb",
  gold: "#f2c85b",
  sage: "#cfe9dc",
  blue: "#d9e8f3",
  clay: "#efd3c5",
};
const box = (x, y, w, h, fill = palette.paper, r = 20) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${palette.ink}" stroke-width="3"/>`;
const circle = (x, y, r, fill = palette.gold) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${palette.ink}" stroke-width="3"/>`;
const path = (d, width = 4) =>
  `<path d="${d}" fill="none" stroke="${palette.ink}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
const text = (x, y, s, size = 25) =>
  `<text x="${x}" y="${y}" fill="${palette.ink}" font-family="Inter,Arial,sans-serif" font-size="${size}" font-weight="600">${s}</text>`;
const row = (x, y, w) => path(`M${x} ${y}h${w}`, 3);
const specs = {
  "checkout-abandonment-73-to-54": ["Remove the friction", "checkout"],
  "discovery-to-roadmap": ["A question worth solving", "discovery"],
  "dhanplan-retirement-calculator": ["The plan behind the number", "finance"],
  "film-risk-engine": ["Test the model. Show the limits.", "film"],
  "topshe-browser-voice-ai": ["A voice interface. A local model.", "voice"],
  "tgb-hunt-linkedin-outreach-agent": [
    "Tasks, actions and campaign state",
    "outreach",
  ],
  "lead-form-overhaul-124": ["A better path to a conversation", "form"],
  "category-page-redesign-plus34": ["Help the customer choose", "category"],
  "lead-routing-gold-silver-bronze": ["The right next conversation", "routing"],
  "push-notification-architecture": [
    "Attention is a constraint",
    "notifications",
  ],
  "ai-send-greetings-168": ["A relevant moment, made personal", "greeting"],
  "daily-report-automation": ["Three sources. One working view.", "report"],
  "e-invoice-adoption-gap": ["Where the workflow already lives", "invoice"],
  "data-deep-dive-method": ["Find the signal in the funnel", "research"],
  "one-fix-a-week-cro": ["Small changes. A learning loop.", "weekly"],
};
function art(type) {
  const { gold, sage, blue, clay, paper } = palette;
  if (type === "checkout")
    return (
      box(180, 110, 640, 380, paper) +
      box(210, 145, 220, 310, clay) +
      text(238, 188, "CHECKOUT", 23) +
      [240, 285, 330].map((y) => box(238, y, 162, 26, paper, 8)).join("") +
      box(500, 185, 270, 180, sage) +
      circle(634, 275, 52, gold) +
      path("M607 275l19 20 36-47") +
      box(522, 398, 224, 40, gold, 12)
    );
  if (type === "discovery" || type === "research")
    return (
      [0, 1, 2]
        .map(
          (i) =>
            box(
              160 + i * 185,
              155 + (i % 2) * 100,
              160,
              150,
              [clay, blue, sage][i],
            ) +
            text(
              182 + i * 185,
              208 + (i % 2) * 100,
              ["QUESTION", "EVIDENCE", "DECISION"][i],
              18,
            ) +
            row(182 + i * 185, 240 + (i % 2) * 100, 112),
        )
        .join("") +
      circle(725, 200, 76, paper) +
      path("M780 255l68 68", 16) +
      circle(725, 200, 42, gold)
    );
  if (type === "finance")
    return (
      box(140, 130, 490, 355, paper) +
      text(174, 180, "MONTHLY PLAN", 24) +
      [220, 270, 320, 370].map((y) => row(174, y, 410)).join("") +
      [320, 470].map((x) => path(`M${x} 200v200`, 2)).join("") +
      box(672, 258, 160, 220, sage) +
      [390, 350, 310].map((y) => box(698, y, 108, 28, gold, 14)).join("") +
      circle(756, 216, 67, gold) +
      text(730, 238, "₹", 57)
    );
  if (type === "film")
    return (
      box(145, 145, 370, 300, ink) +
      [0, 1, 2, 3]
        .map(
          (i) =>
            box(164 + i * 82, 161, 48, 25, paper, 4) +
            box(164 + i * 82, 401, 48, 25, paper, 4),
        )
        .join("") +
      box(175, 213, 310, 157, clay) +
      circle(330, 292, 43, gold) +
      path("M318 270l36 23-36 23z") +
      box(564, 160, 272, 286, paper) +
      text(590, 208, "COMPARE", 22) +
      [0, 1, 2]
        .map((i) =>
          box(
            601 + i * 65,
            350 - i * 45,
            35,
            50 + i * 45,
            [sage, gold, blue][i],
            7,
          ),
        )
        .join("")
    );
  if (type === "voice")
    return (
      box(160, 126, 675, 352, paper) +
      row(160, 173, 675) +
      circle(186, 150, 7, clay) +
      circle(210, 150, 7, gold) +
      box(212, 220, 170, 200, blue) +
      [0, 1, 2, 3, 4]
        .map((i) =>
          path(
            `M${235 + i * 28} ${300 - [15, 35, 60, 35, 15][i]}v${[30, 70, 120, 70, 30][i]}`,
            9,
          ),
        )
        .join("") +
      box(475, 246, 227, 145, sage) +
      text(500, 326, "LOCAL MODEL", 24) +
      [0, 1, 2, 3]
        .map((i) => path(`M${500 + i * 55} 232v-16M${500 + i * 55} 405v16`))
        .join("")
    );
  if (type === "outreach")
    return (
      [0, 1, 2]
        .map(
          (i) =>
            box(170 + i * 195, 130 + i * 38, 180, 230, [blue, clay, sage][i]) +
            box(188 + i * 195, 180 + i * 38, 144, 83, paper) +
            path(`M${188 + i * 195} ${180 + i * 38}l72 50 72-50`) +
            text(
              191 + i * 195,
              318 + i * 38,
              ["TASK", "ACTION", "STATE"][i],
              21,
            ),
        )
        .join("") +
      circle(800, 180, 58, gold) +
      path("M784 153v54M814 153v54", 12)
    );
  if (type === "form")
    return (
      box(185, 118, 480, 380, paper) +
      text(223, 164, "LET’S TALK", 24) +
      [205, 275, 345]
        .map((y, i) => box(223, y, 404, 42, [blue, sage, clay][i], 10))
        .join("") +
      circle(741, 325, 77, gold) +
      path("M707 325l24 25 48-58") +
      row(223, 440, 202)
    );
  if (type === "category")
    return (
      box(155, 116, 690, 374, paper) +
      box(185, 145, 628, 96, sage) +
      text(215, 198, "FIND YOUR FIT", 25) +
      [0, 1, 2]
        .map(
          (i) =>
            box(185 + i * 215, 266, 196, 194, [clay, blue, gold][i]) +
            box(210 + i * 215, 295, 146, 83, paper) +
            row(210 + i * 215, 403, 106),
        )
        .join("")
    );
  if (type === "routing")
    return [0, 1, 2]
      .map(
        (i) =>
          box(150, 125 + i * 117, 125, 86, [gold, blue, clay][i]) +
          text(170, 176 + i * 117, ["GOLD", "SILVER", "BRONZE"][i], 19) +
          path(`M290 ${168 + i * 117}h292`) +
          circle(678, 168 + i * 117, 39, sage) +
          circle(678, 153 + i * 117, 10, paper) +
          path(`M655 ${183 + i * 117}q23-27 46 0`),
      )
      .join("");
  if (type === "notifications")
    return (
      circle(370, 300, 150, blue) +
      path("M298 335v-90q0-95 145 0v90l25 22H273z", 7) +
      circle(370, 384, 22, gold) +
      [0, 1, 2]
        .map(
          (i) =>
            box(596, 133 + i * 116, 230, 90, [clay, gold, sage][i]) +
            text(
              619,
              187 + i * 116,
              ["PRIORITY", "DAILY LIMIT", "RELEVANCE"][i],
              20,
            ),
        )
        .join("")
    );
  if (type === "greeting")
    return (
      box(170, 130, 368, 355, clay) +
      [0, 1, 2, 3, 4, 5]
        .map(
          (i) =>
            `<ellipse cx="354" cy="262" rx="27" ry="65" transform="rotate(${i * 60} 354 310)" fill="${i % 2 ? gold : sage}" stroke="${palette.ink}" stroke-width="2"/>`,
        )
        .join("") +
      circle(354, 310, 31, paper) +
      text(219, 447, "A PERSONAL MOMENT", 22) +
      box(594, 167, 240, 280, paper) +
      row(594, 228, 240) +
      [0, 1, 2]
        .map((i) =>
          [0, 1, 2]
            .map((j) =>
              box(
                615 + j * 66,
                256 + i * 55,
                42,
                37,
                i === 1 && j === 1 ? gold : blue,
                8,
              ),
            )
            .join(""),
        )
        .join("")
    );
  if (type === "report")
    return (
      [0, 1, 2]
        .map(
          (i) =>
            box(140 + i * 119, 128, 101, 97, [blue, sage, clay][i]) +
            text(163 + i * 119, 184, ["01", "02", "03"][i], 27),
        )
        .join("") +
      path("M190 238v35h244v-35M310 273v50") +
      box(229, 335, 305, 158, paper) +
      [374, 413, 452].map((y) => row(244, y, 272)).join("") +
      [314, 390, 466].map((x) => path(`M${x} 350v120`, 2)).join("") +
      box(597, 180, 217, 270, sage) +
      text(621, 224, "DAILY VIEW", 22) +
      [280, 320, 360, 400].map((y) => row(620, y, 164)).join("")
    );
  if (type === "invoice")
    return (
      box(160, 130, 275, 349, blue) +
      box(564, 130, 275, 349, sage) +
      text(183, 180, "EXTERNAL", 22) +
      text(586, 180, "NATIVE", 22) +
      [225, 270, 315, 360, 405]
        .map((y) => row(185, y, 225) + row(589, y, 224))
        .join("") +
      circle(500, 304, 44, gold) +
      path("M480 304h40M506 290l14 14-14 14")
    );
  return (
    box(160, 128, 530, 353, paper) +
    text(185, 180, "ONE CHANGE AT A TIME", 24) +
    [0, 1, 2, 3, 4]
      .map(
        (i) =>
          box(185 + i * 94, 223, 77, 100, [blue, sage, gold, clay, blue][i]) +
          text(206 + i * 94, 278, String(i + 1), 28),
      )
      .join("") +
    row(185, 377, 472) +
    row(185, 414, 320) +
    circle(765, 359, 66, sage) +
    path("M729 359h72M765 323v72", 8)
  );
}
const ink = palette.ink;
fs.mkdirSync("public/blog-assets/editorial", { recursive: true });
for (const [slug, [title, type]] of Object.entries(specs)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600"><rect width="1000" height="600" fill="${palette.paper}"/><circle cx="970" cy="30" r="180" fill="${palette.gold}" opacity=".12"/><circle cx="30" cy="560" r="180" fill="${palette.sage}" opacity=".35"/>${text(50, 62, title, 24)}${art(type)}${text(50, 557, "SASWATA / NOTES FROM THE WORK", 12)}</svg>`;
  fs.writeFileSync(`public/blog-assets/editorial/${slug}.svg`, svg);
}
console.log(
  `Regenerated ${Object.keys(specs).length} consistent editorial illustrations.`,
);
