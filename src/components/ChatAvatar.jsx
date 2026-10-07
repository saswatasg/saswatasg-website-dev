import React, { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Animate a background-removed version of the supplied character sheet.
// Each viewBox isolates one complete pose, including its original shadow.
const sequences = {
  idle: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 2, 1, 0],
  attention: [4, 5, 6, 5, 4, 0],
  thinking: [1, 2, 3, 2],
  listening: [7, 8, 9, 8],
  answering: [10, 11, 12, 13, 12, 11],
  error: [13],
};
export default function ChatAvatar({ state = "idle", className = "" }) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const sequence = sequences[state] || sequences.idle;
  useEffect(() => {
    setStep(0);
    if (reduced || state === "error") return;
    const timer = setInterval(
      () => setStep((s) => (s + 1) % sequence.length),
      state === "listening" ? 350 : state === "attention" ? 180 : 240,
    );
    return () => clearInterval(timer);
  }, [state, reduced, sequence]);
  const frame = reduced ? 0 : sequence[step % sequence.length];
  const x = 16 + (frame % 7) * 214;
  const y = frame < 7 ? 528 : 772;
  return (
    <span
      className={`chat-sprite-avatar ${className}`}
      data-state={state}
      aria-hidden="true"
    >
      <svg
        viewBox={`${x} ${y} 210 220`}
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
      >
        <image
          href="/assets/chat/avatar-states-transparent.png"
          width="1536"
          height="1024"
        />
      </svg>
    </span>
  );
}
