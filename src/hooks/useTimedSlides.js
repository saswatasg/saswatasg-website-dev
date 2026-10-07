import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useReducedMotion } from "framer-motion";

// Keep elapsed time when reading, focusing controls, or leaving the viewport.
export default function useTimedSlides(count, duration = 4000) {
  const ref = useRef(null);
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const elapsed = useRef(0);
  const progress = useMotionValue(0);
  useEffect(() => {
    const change = () => setHidden(document.hidden);
    change();
    document.addEventListener("visibilitychange", change);
    return () => document.removeEventListener("visibilitychange", change);
  }, []);
  useEffect(() => {
    if (reduced || paused || hovered || focused || hidden || !visible) return;
    let frame,
      previous = performance.now();
    const tick = (now) => {
      elapsed.current += now - previous;
      previous = now;
      if (elapsed.current >= duration) {
        elapsed.current = 0;
        setIndex((value) => (value + 1) % count);
      }
      progress.set(elapsed.current / duration);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [
    count,
    duration,
    reduced,
    paused,
    hovered,
    focused,
    hidden,
    visible,
    progress,
  ]);
  const select = (value) => {
    elapsed.current = 0;
    progress.set(0);
    setIndex(value);
  };
  return {
    ref,
    index,
    select,
    progress,
    reduced,
    paused,
    setPaused,
    bindings: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocusCapture: () => setFocused(true),
      onBlurCapture: (event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      },
    },
  };
}
