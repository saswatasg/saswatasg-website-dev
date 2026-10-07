import React from "react";

// Illustrative workflows, deliberately separate from product screenshots or results.
export default function BuildDiagram({ project }) {
  const pixel = project.name === "Pixel Display Controller";
  const labels =
    project.name === "LinkForge"
      ? ["Discover", "Vet", "Draft", "Track"]
      : project.name === "BlogHero"
        ? ["Search", "Research", "Draft", "Review"]
        : project.name === "Inventory Leveling Agent"
          ? ["Orders", "BOM", "Stock", "Schedule"]
          : project.name === "DhanPlan"
            ? ["Assets", "Monthly plan", "Withdrawals", "Scenarios"]
            : project.name === "Meldstead"
              ? ["Tasks", "Docs", "Boards", "Timeline"]
              : ["Question", "Inputs", "Working model", "Evaluation"];
  return (
    <svg viewBox="0 0 420 100" width="100%" aria-hidden="true">
      {pixel ? (
        <>
          <rect x="148" y="2" width="104" height="96" rx="12" fill="#202620" />
          {Array.from({ length: 64 }, (_, index) => (
            <rect
              key={index}
              x={158 + (index % 8) * 11}
              y={10 + Math.floor(index / 8) * 10}
              width="7"
              height="7"
              rx="1"
              fill={
                ((index % 8) + Math.floor(index / 8)) % 3 === 0
                  ? "#f2c85b"
                  : "#cfe9dc"
              }
              opacity={index % 5 === 0 ? 0.25 : 1}
            />
          ))}
          <path
            d="M32 50H136M264 50H388"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 5"
          />
          <text x="24" y="35" fontSize="12" fill="currentColor">
            Web
          </text>
          <text x="316" y="35" fontSize="12" fill="currentColor">
            Local bridge
          </text>
        </>
      ) : (
        labels.map((label, index) => (
          <g key={label}>
            {index < 3 && (
              <path
                d={`M${index * 105 + 92} 48h13`}
                stroke="currentColor"
                strokeWidth="2"
              />
            )}
            <rect
              x={index * 105 + 2}
              y="20"
              width="90"
              height="58"
              rx="12"
              fill="#fff"
              fillOpacity=".65"
              stroke="currentColor"
              strokeOpacity=".25"
            />
            <text
              x={index * 105 + 47}
              y="53"
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="currentColor"
            >
              {label}
            </text>
          </g>
        ))
      )}
    </svg>
  );
}
