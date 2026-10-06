import React from 'react';
export function Owl({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 360 420" aria-hidden="true">
      <path
        d="M60 75L45 15l91 50q45-17 88 0l91-50-15 60q40 49 28 170l-49 115-99 40-99-40-49-115Q20 124 60 75"
        fill="#b93629"
        stroke="#fff3d8"
        strokeWidth="6"
      />
      <path
        d="M48 217q45-75 90 28l-53 94M312 217q-45-75-90 28l53 94"
        fill="#07594f"
        stroke="#f2b632"
        strokeWidth="5"
      />
      <path d="M139 229q41-35 82 0l-41 92z" fill="#f2b632" />
      <g fill="#fff3d8" stroke="#f2b632" strokeWidth="7">
        <circle cx="108" cy="147" r="62" />
        <circle cx="252" cy="147" r="62" />
      </g>
      <g fill="#07594f">
        <circle cx="108" cy="147" r="34" />
        <circle cx="252" cy="147" r="34" />
      </g>
      <g fill="#fff3d8">
        <circle cx="115" cy="140" r="10" />
        <circle cx="245" cy="140" r="10" />
      </g>
      <path d="M157 174l23 43 23-43" fill="#f2b632" />
      <g fill="none" stroke="#fff3d8" strokeWidth="3">
        <path d="M156 336q24 24 48 0M144 354q36 30 72 0M164 67l16-24 16 24M83 253l-21 31M91 276l-19 32M277 253l21 31M269 276l19 32" />
      </g>
      <path
        d="M116 381l-12 28m17-23 7 25m113-30 12 28m-17-23-7 25"
        stroke="#07594f"
        strokeWidth="9"
      />
    </svg>
  );
}
export function Flower({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <g fill="currentColor">
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse
            key={i}
            cx="50"
            cy="23"
            rx="9"
            ry="20"
            transform={`rotate(${i * 45} 50 50)`}
          />
        ))}
      </g>
      <circle cx="50" cy="50" r="11" fill="#f2b632" />
      <circle cx="50" cy="50" r="4" fill="#07594f" />
    </svg>
  );
}
export function FolkBorder() {
  return (
    <div className="folk-border" aria-hidden="true">
      {Array.from({ length: 18 }, (_, i) => (
        <Flower key={i} />
      ))}
    </div>
  );
}
export function FishRule() {
  return (
    <svg className="fish-rule" viewBox="0 0 1000 70" aria-hidden="true">
      <path
        d="M0 30q25-28 50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0M600 30q25-28 50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M443 32q47-51 95 0-48 51-95 0l-35-22v44z" fill="currentColor" />
      <circle cx="522" cy="30" r="4" fill="#fff3d8" />
      <path
        d="M469 15l18 17-18 17M487 13l18 19-18 19"
        fill="none"
        stroke="#fff3d8"
        strokeWidth="2"
      />
    </svg>
  );
}

export function AddaWordmark() {
  return (
    <div className="adda-wordmark" aria-label="ADDA">
      <svg viewBox="0 0 500 155" role="img" aria-label="ADDA">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="17"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M24 128Q26 25 66 25T108 128M34 90h62M141 128V25h26c77 0 77 103 0 103zM260 128V25h26c77 0 77 103 0 103zM380 128q2-103 42-103t42 103M390 90h62" />
          <path
            d="M15 12q58-12 105 0m10 0q54-12 107 0m13 0q54-12 107 0m13 0q54-12 108 0"
            strokeWidth="5"
          />
        </g>
      </svg>
      <span lang="bn">আড্ডা</span>
    </div>
  );
}
