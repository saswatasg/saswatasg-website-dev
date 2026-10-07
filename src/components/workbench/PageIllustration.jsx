import React from "react";
export default function PageIllustration({ variant }) {
  const paper = "#faf7ef",
    ink = "#252820",
    gold = "#f2c85b",
    sage = "#cfe9dc",
    blue = "#d9e8f3";
  const box = (x, y, w, h, fill = paper) => (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="10"
      fill={fill}
      stroke={ink}
      strokeWidth="1.5"
    />
  );
  const label = (x, y, text) => (
    <text x={x} y={y} fontSize="11" fontWeight="600" fill={ink}>
      {text}
    </text>
  );
  return (
    <svg viewBox="0 0 320 180" fill="none">
      {variant === "work" ? (
        <>
          {box(20, 35, 123, 120, paper)}
          {box(167, 20, 132, 135, sage)}
          {label(32, 58, "THE QUESTION")}
          {label(180, 44, "THE DECISION")}
          {[80, 100, 120].map((y) => (
            <path key={y} d={`M32 ${y}h95`} stroke={ink} opacity=".25" />
          ))}
          <circle cx="225" cy="94" r="30" fill={gold} />
          <path d="M207 94l12 12 22-27" stroke={ink} strokeWidth="3" />
          {label(32, 143, "Investigate")}
          {label(180, 143, "Build & learn")}
        </>
      ) : variant === "experience" ? (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              {box(25 + i * 85, 20 + i * 25, 90, 95, [blue, sage, gold][i])}
              {label(
                36 + i * 85,
                44 + i * 25,
                ["COMMERCE", "SAAS", "ENTERPRISE"][i],
              )}
              <circle cx={70 + i * 85} cy={80 + i * 25} r="14" stroke={ink} />
              {label(58 + i * 85, 85 + i * 25, ["01", "02", "03"][i])}
            </g>
          ))}
        </>
      ) : variant === "about" ? (
        <>
          <circle cx="105" cy="85" r="58" fill={blue} stroke={ink} />
          <circle cx="191" cy="85" r="58" fill={sage} stroke={ink} />
          <circle cx="148" cy="112" r="37" fill={gold} stroke={ink} />
          {label(61, 77, "SYSTEMS")}
          {label(173, 77, "PEOPLE")}
          {label(128, 117, "BUILD")}
          {label(81, 173, "Three lenses. One product practice.")}
        </>
      ) : variant === "blog" ? (
        <>
          <path
            d="M25 35q65-25 135 0q65-25 135 0v113q-65-22-135 0q-65-22-135 0z"
            fill={paper}
            stroke={ink}
            strokeWidth="2"
          />
          <path d="M160 35v113" stroke={ink} />
          {[62, 80, 98, 116].map((y) => (
            <g key={y}>
              <path d={`M42 ${y}h94M180 ${y}h93`} stroke={ink} opacity=".2" />
            </g>
          ))}
          {box(185, 55, 73, 68, gold)}
          {label(195, 81, "A NOTE")}
          {label(195, 99, "TO KEEP")}
          <path d="M142 31v58l-14-12-14 12V31" fill={sage} stroke={ink} />
        </>
      ) : variant === "contact" ? (
        <>
          {box(18, 25, 151, 82, sage)}
          <path d="M49 107v18l25-18" fill={sage} stroke={ink} />
          {label(35, 55, "LET’S COMPARE")}
          {label(35, 75, "NOTES.")}
          {box(188, 51, 105, 113, paper)}
          <path d="M188 78h105" stroke={ink} />
          {label(202, 69, "A GOOD TIME")}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              {[0, 1, 2].map((j) => (
                <rect
                  key={j}
                  x={201 + j * 28}
                  y={90 + i * 21}
                  width="17"
                  height="14"
                  rx="3"
                  fill={i === 1 && j === 1 ? gold : blue}
                />
              ))}
            </g>
          ))}
        </>
      ) : (
        <>
          {box(45, 30, 180, 112, blue)}
          {box(62, 44, 180, 112, sage)}
          {box(81, 59, 180, 112, paper)}
          {label(94, 81, "A WORKING TOOL")}
          {box(94, 94, 68, 59, gold)}
          {[106, 122, 138].map((y) => (
            <path key={y} d={`M176 ${y}h65`} stroke={ink} opacity=".4" />
          ))}
          <path d="M111 124l8 8 24-24" stroke={ink} strokeWidth="3" />
        </>
      )}
    </svg>
  );
}
