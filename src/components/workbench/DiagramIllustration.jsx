import React from "react";

// Editorial workflow illustrations: not screenshots, measured charts or live product UI.
const ink = "#0a0a0a",
  paper = "#f5f2ec",
  gold = "#eee3bd",
  sage = "#e0e8d9",
  blue = "#dfe7ed",
  clay = "#eeddd2";
const box = (x, y, w, h, fill = paper) => (
  <rect
    x={x}
    y={y}
    width={w}
    height={h}
    fill={fill}
    stroke={ink}
    strokeWidth="2"
  />
);
const text = (x, y, label, size = 12) => (
  <text
    x={x}
    y={y}
    fill={ink}
    fontSize={size}
    fontWeight="700"
    textAnchor="middle"
  >
    {label}
  </text>
);
const line = (d) => <path d={d} stroke={ink} strokeWidth="2" fill="none" />;
function Sheet({ x = 135, y = 28, label = "WORKING VIEW" }) {
  return (
    <g>
      {box(x + 6, y + 6, 180, 126, ink)}
      {box(x, y, 180, 126)}
      {box(x, y, 180, 24, gold)}
      {text(x + 90, y + 16, label, 10)}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          {line(`M${x + 15} ${y + 43 + i * 22}h150`)}
          {box(x + 18, y + 32 + i * 22, 7, 7, i % 2 ? sage : blue)}
        </g>
      ))}
    </g>
  );
}
export default function DiagramIllustration({ variant = "pipeline" }) {
  let art;
  if (variant === "gap") {
    art = (
      <>
        {[0, 1].map((i) => (
          <g key={i}>
            {text(
              210,
              34 + i * 75,
              ["E-WAY BILL · 17:1", "E-INVOICE · 19:1"][i],
              12,
            )}
            {box(60, 48 + i * 75, i ? 13.5 : 15, 24, gold)}
            {box(i ? 73.5 : 75, 48 + i * 75, i ? 256.5 : 255, 24, blue)}
          </g>
        ))}
        {text(210, 172, "NATIVE USE / EXTERNAL USE", 10)}
      </>
    );
  } else if (variant === "planning" || variant === "funnel") {
    art = (
      <>
        {line("M50 24v123h320")}
        {variant === "planning" ? (
          <>
            <path
              d="M52 128L115 114L178 96L239 84L304 48L365 30L365 55L304 74L239 105L178 122L115 136Z"
              fill={sage}
            />
            {line("M52 128L115 114L178 96L239 84L304 48L365 30")}
            {[52, 115, 178, 239, 304, 365].map((x, i) => (
              <circle
                key={x}
                cx={x}
                cy={[128, 114, 96, 84, 48, 30][i]}
                r="4"
                fill={ink}
              />
            ))}
            {text(205, 170, "ASSUMPTIONS → SCENARIOS", 10)}
          </>
        ) : (
          <>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                {box(
                  65 + i * 26,
                  30 + i * 37,
                  275 - i * 52,
                  27,
                  [blue, sage, gold][i],
                )}
                {text(203, 48 + i * 37, ["VISIT", "INTENT", "COMPLETE"][i], 10)}
              </g>
            ))}
            {text(205, 170, "FIND THE FRICTION", 10)}
          </>
        )}
      </>
    );
  } else if (variant === "workspace") {
    art = (
      <>
        {box(35, 16, 350, 148)}
        {box(35, 16, 350, 25, ink)}
        {text(210, 33, "", 10)}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            {text(96 + i * 114, 60, ["TASKS", "DOCS", "TIMELINE"][i], 10)}
            {[0, 1].map((j) => (
              <g key={j}>
                {box(50 + i * 114, 72 + j * 37, 91, 29, [sage, blue, clay][i])}
                {line(`M${62 + i * 114} ${84 + j * 37}h48`)}
                {line(`M${62 + i * 114} ${92 + j * 37}h28`)}
              </g>
            ))}
          </g>
        ))}
      </>
    );
  } else if (variant === "bom" || variant === "routing") {
    art = (
      <>
        {box(145, 12, 130, 38, gold)}
        {text(210, 36, variant === "bom" ? "ORDER DEMAND" : "LEAD SIGNALS")}
        {line("M210 50v25M76 75h268M76 75v23M210 75v23M344 75v23")}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            {box(25 + i * 134, 98, 102, 48, [sage, blue, clay][i])}
            {text(
              76 + i * 134,
              119,
              variant === "bom"
                ? ["BOM", "STOCK", "LEAD TIME"][i]
                : ["GOLD", "SILVER", "BRONZE"][i],
              10,
            )}
            {line(`M${45 + i * 134} 132h62`)}
          </g>
        ))}
        {text(
          210,
          170,
          variant === "bom"
            ? "RECONCILE → SCHEDULE"
            : "PRIORITIZE THE NEXT STEP",
          10,
        )}
      </>
    );
  } else if (variant === "report" || variant === "publishing") {
    art = (
      <>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            {box(16, 15 + i * 51, 108, 35, [sage, blue, clay][i])}
            {text(
              70,
              37 + i * 51,
              variant === "report"
                ? ["KIBANA", "MONGODB", "GA4"][i]
                : ["SEARCH", "RESEARCH", "DRAFT"][i],
              10,
            )}
            {line(`M124 ${33 + i * 51}h25V87h24`)}
          </g>
        ))}
        <Sheet
          x={183}
          y={24}
          label={
            variant === "report" ? "DAILY REPORT" : "REVIEW BEFORE PUBLISH"
          }
        />
      </>
    );
  } else if (variant === "calendar" || variant === "queue") {
    art =
      variant === "calendar" ? (
        <>
          {box(65, 20, 290, 142)}
          {box(65, 20, 290, 28, ink)}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <g key={i}>
              {[0, 1, 2].map((j) => (
                <rect
                  key={j}
                  x={80 + i * 38}
                  y={61 + j * 29}
                  width="25"
                  height="20"
                  fill={(i + j) % 3 === 0 ? gold : paper}
                  stroke={ink}
                  strokeWidth="1"
                />
              ))}
            </g>
          ))}
          {text(210, 152, "RELEVANCE / OCCASION / REGION", 9)}
        </>
      ) : (
        <>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              {box(35, 19 + i * 36, 200, 27, [clay, gold, sage, blue][i])}
              {text(64, 37 + i * 36, `P${i}`, 10)}
              {line(`M84 ${32 + i * 36}h120`)}
            </g>
          ))}
          {line("M235 32h35v111h20")}
          {box(290, 51, 96, 76, gold)}
          {text(338, 82, "3 SLOTS", 13)}
          {text(338, 105, "DAILY CAP", 9)}
        </>
      );
  } else if (variant === "matrix" || variant === "evaluation") {
    art = (
      <>
        {line("M80 15v135h285")}
        {variant === "matrix" ? (
          <>
            {[0, 1].map((i) => (
              <g key={i}>
                {[0, 1].map((j) => (
                  <g key={j}>
                    {box(
                      90 + i * 126,
                      24 + j * 58,
                      114,
                      48,
                      [sage, blue, clay, gold][i * 2 + j],
                    )}
                    {text(
                      147 + i * 126,
                      53 + j * 58,
                      ["TEST", "BUILD", "REVISIT", "REFINE"][i * 2 + j],
                      10,
                    )}
                  </g>
                ))}
              </g>
            ))}
            {text(212, 170, "VALUE × CONFIDENCE", 10)}
          </>
        ) : (
          <>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <g key={i}>
                {box(
                  94 + i * 37,
                  150 - [35, 61, 92, 112, 81, 55, 23][i],
                  12,
                  [35, 61, 92, 112, 81, 55, 23][i],
                  blue,
                )}
                {box(
                  107 + i * 37,
                  150 - [25, 42, 66, 91, 102, 64, 31][i],
                  12,
                  [25, 42, 66, 91, 102, 64, 31][i],
                  gold,
                )}
              </g>
            ))}
            {text(212, 170, "TEST AGAINST A BASELINE", 10)}
          </>
        )}
      </>
    );
  } else if (variant === "pixel") {
    art = (
      <>
        {box(138, 8, 144, 144, ink)}
        {Array.from({ length: 64 }, (_, i) => (
          <rect
            key={i}
            x={150 + (i % 8) * 15}
            y={20 + Math.floor(i / 8) * 15}
            width="11"
            height="11"
            fill={(i + Math.floor(i / 8)) % 3 ? gold : sage}
            opacity={i % 5 ? 1 : 0.3}
          />
        ))}
        {text(210, 175, "LOCAL BRIDGE → BLE DISPLAY", 10)}
      </>
    );
  } else if (variant === "voice") {
    art = (
      <>
        {box(45, 34, 330, 110)}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <rect
            key={i}
            x={83 + i * 24}
            y={88 - [8, 15, 25, 39, 23, 47, 30, 18, 33, 17, 8][i] / 2}
            width="8"
            height={[8, 15, 25, 39, 23, 47, 30, 18, 33, 17, 8][i]}
            fill={ink}
          />
        ))}
        {text(210, 59, "VOICE ↔ BROWSER MODEL", 10)}
        {text(210, 129, "LISTEN / PROCESS / RESPOND", 9)}
      </>
    );
  } else if (variant === "form") {
    art = (
      <>
        <Sheet label="LESS FRICTION" x={115} y={20} />
        {box(146, 72, 118, 21, blue)}
        {box(146, 100, 118, 21, sage)}
        {box(230, 133, 72, 24, gold)}
        {text(266, 149, "CONTINUE", 9)}
      </>
    );
  } else {
    art = (
      <>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            {box(35 + i * 123, 32 + i * 15, 104, 79, [sage, blue, gold][i])}
            {text(
              87 + i * 123,
              58 + i * 15,
              ["QUESTION", "DECISION", "DELIVERY"][i],
              10,
            )}
            {line(`M${49 + i * 123} ${75 + i * 15}h75`)}
            {line(`M${49 + i * 123} ${86 + i * 15}h50`)}
          </g>
        ))}
        {text(210, 174, "MAKE THE NEXT STEP CLEAR", 10)}
      </>
    );
  }
  return (
    <svg
      viewBox="0 0 420 180"
      width="100%"
      aria-hidden="true"
      className="wb-evidence-illustration"
    >
      {art}
    </svg>
  );
}
