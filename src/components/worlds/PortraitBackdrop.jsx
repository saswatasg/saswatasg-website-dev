import React from "react";

export default function PortraitBackdrop({ world }) {
  return (
    <svg className="portrait-backdrop" viewBox="0 0 400 400" aria-hidden="true">
      {world === "workbench" ? (
        <>
          <defs>
            <linearGradient id="portrait-warm" x2="1" y2="1">
              <stop stopColor="#ffdfa8" />
              <stop offset="1" stopColor="#f0b797" />
            </linearGradient>
          </defs>
          <path fill="url(#portrait-warm)" d="M0 0h400v400H0z" />
          <g fill="none" stroke="#b74224" opacity=".25">
            <circle cx="200" cy="190" r="175" />
            <circle cx="200" cy="190" r="155" strokeDasharray="3 8" />
          </g>
        </>
      ) : (
        <>
          <path fill="#f7e8c5" d="M0 0h400v400H0z" />
          <circle cx="205" cy="180" r="152" fill="#f2b632" />
          <g fill="none" stroke="#b93629" strokeWidth="1.5" opacity=".65">
            <circle cx="205" cy="180" r="165" strokeDasharray="2 7" />
            <path d="M9 14q22 26 44 0t44 0t44 0t44 0t44 0t44 0t44 0t44 0M8 386q22-26 44 0t44 0t44 0t44 0t44 0t44 0t44 0t44 0" />
          </g>
          {[
            [35, 65],
            [355, 72],
            [28, 260],
            [372, 265],
          ].map(([x, y], index) => (
            <g key={index} transform={`translate(${x} ${y})`}>
              {Array.from({ length: 8 }, (_, petal) => (
                <ellipse
                  key={petal}
                  cy="-15"
                  rx="5"
                  ry="12"
                  fill={index % 2 ? "#07594f" : "#b93629"}
                  transform={`rotate(${petal * 45})`}
                />
              ))}
              <circle r="7" fill="#f2b632" />
              <circle r="3" fill="#fff3d8" />
            </g>
          ))}
          <g fill="none" stroke="#07594f" strokeWidth="2">
            <path d="M10 112q36 25 0 55q36 25 0 55M390 122q-36 25 0 55q-36 25 0 55" />
            <path d="M14 138l13 5-13 7M386 148l-13 5 13 7" />
          </g>
        </>
      )}
    </svg>
  );
}
