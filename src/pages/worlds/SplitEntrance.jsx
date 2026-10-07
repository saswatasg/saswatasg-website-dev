import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import Portrait from "@/components/worlds/Portrait";
import { Owl, Flower, FolkBorder } from "@/components/worlds/Motifs";
import {
  navigateWithTransition,
  worldFromSplit,
} from "@/utils/worldTransition";

export default function SplitEntrance() {
  const [split, setSplit] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [entering, setEntering] = useState(null);
  const root = useRef(null),
    timer = useRef(null),
    percent = useRef(50),
    busy = useRef(false);
  const navigate = useNavigate();
  useEffect(() => () => clearTimeout(timer.current), []);
  const enter = (mode) => {
    if (busy.current) return;
    busy.current = true;
    setEntering(mode);
    setDragging(false);
    setSplit(mode === "workbench" ? 100 : 0);
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    timer.current = setTimeout(
      () =>
        navigateWithTransition(navigate, `/${mode}`, {
          state: { entrance: true },
        }),
      reduced ? 0 : 450,
    );
  };
  const move = (event) => {
    const box = root.current.getBoundingClientRect();
    const vertical = window.matchMedia("(max-width: 700px)").matches;
    const value = Math.max(
      5,
      Math.min(
        95,
        100 *
          (vertical
            ? (event.clientY - box.top) / box.height
            : (event.clientX - box.left) / box.width),
      ),
    );
    percent.current = value;
    setSplit(value);
  };
  const release = () => {
    setDragging(false);
    const mode = worldFromSplit(percent.current);
    if (mode) enter(mode);
    else {
      percent.current = 50;
      setSplit(50);
    }
  };
  return (
    <div
      ref={root}
      className={`split-entrance unified-entrance ${dragging ? "is-dragging" : ""} ${entering ? `entering-${entering}` : ""}`}
      style={{ "--split": `${split}%` }}
      aria-busy={!!entering}
    >
      <PageMeta
        title="Saswata S. Sengupta | Two worlds, one person"
        description="Explore Saswata’s professional journey at Workbench, or pull up a chair at Adda, his personal side."
      />
      <h1 className="sr-only">Saswata S. Sengupta — two worlds, one person</h1>
      <div className="entrance-name">
        <span>SASWATA S. SENGUPTA</span>
        <span>ONE PERSON. TWO WORLDS.</span>
      </div>
      <section className="split-half split-workbench">
        <div className="half-topline">
          <span>01 / WORKBENCH</span>
          <span>↗</span>
        </div>
        <div className="entrance-copy">
          <p className="eyebrow">THE PROFESSIONAL SIDE</p>
          <h2>
            Workbench<span>.</span>
          </h2>
          <p>From a question to something that works.</p>
          <a
            href="/workbench"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              enter("workbench");
            }}
          >
            Enter Workbench ↗
          </a>
        </div>
        <Portrait world="workbench" />
        <div className="split-foot">PRODUCT THINKING. REAL OUTCOMES.</div>
      </section>
      <section className="split-half split-adda">
        <FolkBorder />
        <div className="half-topline">
          <span>02 / ADDA</span>
          <span>আড্ডা</span>
        </div>
        <div className="entrance-copy">
          <p className="eyebrow">THE OTHER SIDE OF ME</p>
          <h2>
            Adda<span>.</span>
          </h2>
          <p>A few stories. A little Bengal.</p>
          <a
            href="/adda"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              enter("adda");
            }}
          >
            Pull up a chair ↗
          </a>
        </div>
        <Portrait world="adda" />
        <Owl className="entrance-owl" />
        <Flower className="entrance-flower" />
        <div className="split-foot">
          A LITTLE CURIOSITY. A LONG CONVERSATION.
        </div>
      </section>
      <button
        className="split-divider"
        role="slider"
        aria-label="Drag to enter a world"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(split)}
        aria-valuetext={`${Math.round(split)} percent Workbench. Expand either world to 80 percent to enter.`}
        disabled={!!entering}
        onPointerDown={(e) => {
          if (busy.current) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          percent.current = split;
          setDragging(true);
        }}
        onPointerMove={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) move(e);
        }}
        onPointerUp={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
            release();
          }
        }}
        onPointerCancel={() => {
          setDragging(false);
          percent.current = 50;
          setSplit(50);
        }}
        onKeyDown={(e) => {
          if (busy.current) return;
          let value = percent.current;
          if (["ArrowRight", "ArrowDown"].includes(e.key)) value += 10;
          else if (["ArrowLeft", "ArrowUp"].includes(e.key)) value -= 10;
          else if (e.key === "Home") value = 0;
          else if (e.key === "End") value = 100;
          else if (e.key === "Escape") value = 50;
          else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            const mode = worldFromSplit(value);
            if (mode) enter(mode);
            return;
          } else return;
          e.preventDefault();
          percent.current = Math.max(0, Math.min(100, value));
          setSplit(percent.current);
        }}
      >
        <span aria-hidden="true">↔</span>
        <small>DRAG TO ENTER</small>
      </button>
      <p className="entrance-hint">
        Drag a side past 80%, or choose an entrance.
      </p>
    </div>
  );
}
