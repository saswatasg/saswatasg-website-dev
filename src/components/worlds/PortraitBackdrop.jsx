import React from "react";

export default function PortraitBackdrop({ world }) {
  return (
    <svg className="portrait-backdrop" viewBox="0 0 400 400" aria-hidden="true">
      {world === "workbench" ? (
        <>
          <defs>
            <pattern
              id="portrait-grid"
              width="25"
              height="25"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M25 0H0V25"
                fill="none"
                stroke="#d5ff62"
                strokeOpacity=".12"
              />
            </pattern>
          </defs>
          <path fill="#171d20" d="M0 0h400v400H0z" />
          <path fill="url(#portrait-grid)" d="M0 0h400v400H0z" />
          <circle cx="202" cy="178" r="146" fill="#d5ff62" />
          <g fill="none" stroke="#d5ff62">
            <circle cx="202" cy="178" r="165" strokeOpacity=".5" />
            <path
              d="M8 178h35m318 0h31M202 5v16M25 36h45V14M330 14v22h45M16 335h38v38M345 373v-38h38"
              strokeWidth="2"
            />
            <path d="M316 60h52v58M32 250h35v35" strokeDasharray="4 5" />
          </g>
          <g fill="#d5ff62">
            <circle cx="42" cy="95" r="4" />
            <circle cx="358" cy="251" r="4" />
            <path d="M20 195h20v3H20zm9-9h3v20h-3M360 130h20v3h-20zm9-9h3v20h-3" />
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
