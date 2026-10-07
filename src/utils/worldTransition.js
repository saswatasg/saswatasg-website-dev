import { flushSync } from "react-dom";

// A native snapshot transition carries the real portrait between its measured
// positions. Browsers without the API use the shared Framer Motion layout.
export function navigateWithTransition(navigate, path, options) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !document.startViewTransition) {
    navigate(path, options);
    return null;
  }
  try {
    const transition = document.startViewTransition(() => {
      flushSync(() => navigate(path, options));
    });
    // A background tab or rapid navigation can skip the visual transition.
    transition.ready.catch(() => {});
    transition.finished.catch(() => {});
    return transition;
  } catch {
    navigate(path, options);
    return null;
  }
}
export const worldFromSplit = (percent) =>
  percent >= 80 ? "workbench" : percent <= 20 ? "adda" : null;
