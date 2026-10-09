import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (
      !hash ||
      !/^\/(workbench|builds|work|experience|about|blog|case-studies|adda|photography|writing|cinema)(\/|$)/.test(
        pathname,
      )
    )
      return;
    let id;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }
    // Lazy routes can mount after the navigation effect. Wait for the actual
    // target so links to a build or a role land below the floating header.
    let frame;
    const scroll = () => {
      const target = document.getElementById(id);
      if (!target) return false;
      frame = requestAnimationFrame(() =>
        target.scrollIntoView({ block: "start", behavior: "instant" }),
      );
      return true;
    };
    const observer = new MutationObserver(() => {
      if (scroll()) observer.disconnect();
    });
    if (!scroll())
      observer.observe(document.getElementById("root"), {
        childList: true,
        subtree: true,
      });
    const timeout = setTimeout(() => observer.disconnect(), 3000);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [pathname, hash]);
  return null;
}
