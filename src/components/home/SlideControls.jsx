import React from "react";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
export default function SlideControls({ timer, labels, name }) {
  return (
    <div className="wb-slide-footer">
      <div
        className="wb-slide-controls"
        data-slide-controls
        role="group"
        aria-label={`${name} controls`}
      >
        <button
          onClick={() => timer.setPaused((value) => !value)}
          disabled={!!timer.reduced}
          aria-pressed={!timer.paused && !timer.reduced}
          aria-label={
            timer.reduced
              ? `${name} automatic playback disabled for reduced motion`
              : `${timer.paused ? "Play" : "Pause"} ${name}`
          }
        >
          {timer.paused || timer.reduced ? (
            <Play size={14} />
          ) : (
            <Pause size={14} />
          )}
        </button>
        {labels.map((label, i) => (
          <button
            key={label}
            onClick={() => timer.select(i)}
            aria-label={`Show ${label}`}
            aria-pressed={timer.index === i}
          >
            <span />
          </button>
        ))}
        <span className="wb-slide-count">
          {String(timer.index + 1).padStart(2, "0")} /{" "}
          {String(labels.length).padStart(2, "0")}
        </span>
      </div>
      <div className="wb-slide-progress" aria-hidden="true">
        <motion.span style={{ scaleX: timer.progress }} />
      </div>
    </div>
  );
}
