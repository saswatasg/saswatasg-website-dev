import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageMeta from '@/components/PageMeta';
import Portrait from '@/components/worlds/Portrait';
import { Owl, Flower, FolkBorder } from '@/components/worlds/Motifs';
export default function SplitEntrance() {
  const [entering, setEntering] = useState(null);
  const timer = useRef();
  const navigate = useNavigate();
  useEffect(() => () => clearTimeout(timer.current), []);
  const enter = (mode) => {
    if (entering) return;
    setEntering(mode);
    timer.current = setTimeout(
      () => navigate(`/${mode}`, { state: { entrance: true } }),
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 760,
    );
  };
  return (
    <div className={`split-entrance ${entering ? `entering-${entering}` : ''}`}>
      <PageMeta
        title="Saswata S. Sengupta | Two worlds, one person"
        description="Product, AI and systems at the Workbench. Photography, writing, cinema and Bengal at Adda. Choose a world."
      />
      <h1 className="sr-only">Saswata S. Sengupta — two worlds, one person</h1>
      <div className="entrance-name">
        <span>SASWATA S. SENGUPTA</span>
        <span>ONE PERSON. TWO WORLDS.</span>
      </div>
      <section className="split-half split-workbench">
        <div className="half-topline">
          <span>01 / WORKBENCH</span>
          <span>+ + +</span>
        </div>
        <div className="entrance-copy">
          <p className="eyebrow">THE BUILDER</p>
          <h2>
            I build<span>.</span>
          </h2>
          <p>Product · AI · Growth · Systems.</p>
          <a
            href="/workbench"
            onClick={(e) => {
              e.preventDefault();
              enter('workbench');
            }}
          >
            Enter Workbench ↗
          </a>
        </div>
        <Portrait world="workbench" />
        <div className="split-foot">
          FROM A QUESTION
          <br />
          TO SOMETHING THAT WORKS.
        </div>
        <div className="crosshair" aria-hidden="true">
          +
        </div>
      </section>
      <section className="split-half split-adda">
        <FolkBorder />
        <div className="half-topline">
          <span>02 / ADDA</span>
          <span>আড্ডা</span>
        </div>
        <div className="entrance-copy">
          <p className="eyebrow">THE OBSERVER</p>
          <h2>
            I observe<span>.</span>
          </h2>
          <p>Photography · Writing · Cinema · Bengal.</p>
          <a
            href="/adda"
            onClick={(e) => {
              e.preventDefault();
              enter('adda');
            }}
          >
            Come into Adda ↗
          </a>
        </div>
        <Portrait world="adda" />
        <Owl className="entrance-owl" />
        <Flower className="entrance-flower" />
        <div className="split-foot">
          A LITTLE CURIOSITY.
          <br />A LONG CONVERSATION.
        </div>
      </section>
      <div className="entrance-selector">
        <p>Choose a world.</p>
        <div>
          <button disabled={!!entering} onClick={() => enter('workbench')}>
            Workbench <span>↗</span>
          </button>
          <button disabled={!!entering} onClick={() => enter('adda')}>
            Adda <span>↗</span>
          </button>
        </div>
      </div>
      <div className="seam-label" aria-hidden="true">
        DIFFERENT LENSES / SAME CURIOSITY
      </div>
    </div>
  );
}
