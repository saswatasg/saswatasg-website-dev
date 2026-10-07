import React from "react";

export default function SaswataLogo({ world }) {
  const adda = world === "adda";
  return (
    <svg
      className={`saswata-logo logo-${world}`}
      viewBox="0 0 220 66"
      role="img"
      aria-label={`Saswata — ${adda ? "Adda" : "Workbench"}`}
    >
      {adda ? (
        <>
          <text x="2" y="43" className="logo-lettering">
            Saswata
          </text>
          <path
            d="M8 53q39-9 74 0t70 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <g transform="translate(197 27)" className="logo-flower">
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <ellipse
                key={angle}
                cy="-12"
                rx="4"
                ry="9"
                transform={`rotate(${angle})`}
                fill="currentColor"
              />
            ))}
            <circle r="5" fill="#f2b632" />
          </g>
        </>
      ) : (
        <>
          <text x="10" y="44" className="logo-lettering">
            Saswata
          </text>
          <path
            d="M175 49l26-26m-20 0h20v20"
            fill="none"
            stroke="#b74224"
            strokeWidth="4"
          />
          <path
            d="M13 56h141"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 5"
          />
        </>
      )}
    </svg>
  );
}
