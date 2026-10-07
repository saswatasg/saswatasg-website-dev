import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useReducer,
  startTransition,
  useState,
} from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";

import { navigateWithTransition } from "@/utils/worldTransition";

const WorldContext = createContext(null);
export function resolveWorld(path, search = "") {
  if (path === "/") return null;
  if (path === "/contact")
    return new URLSearchParams(search).get("world") === "adda"
      ? "adda"
      : "workbench";
  return /^\/(adda|photography|writing|cinema)(\/|$)/.test(path)
    ? "adda"
    : "workbench";
}
const useClientLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;
export function WorldProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const world = resolveWorld(location.pathname, location.search);
  const memory = useRef({});
  const [, refreshLinks] = useReducer((n) => n + 1, 0);
  const positions = useRef({});
  const active = useRef(null);
  const [transitioning, setTransitioning] = useState(null);
  const switchTimers = useRef([]);
  useEffect(() => () => switchTimers.current.forEach(clearTimeout), []);
  useClientLayoutEffect(() => {
    try {
      memory.current = JSON.parse(
        sessionStorage.getItem("world-pages") || "{}",
      );
      positions.current = JSON.parse(
        sessionStorage.getItem("world-scroll") || "{}",
      );
    } catch {
      /* Private browsing may disable storage. Navigation still works. */
    }
    const oldRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = oldRestoration;
    };
  }, []);
  useClientLayoutEffect(() => {
    const url = location.pathname + location.search;
    active.current = { world, url, key: location.key };
    if (world) memory.current[world] = url;
    try {
      sessionStorage.setItem("world-pages", JSON.stringify(memory.current));
    } catch {
      /* Optional storage. */
    }
    const destination = location.state?.restoreWorld;
    const scroll = destination
      ? positions.current[url] || 0
      : navigationType === "POP" && location.key !== "default"
        ? positions.current[location.key] || 0
        : 0;
    // Lazy route content can change document height; restore after it is mounted.
    let stopped = false;
    let frame;
    let attempts = 0;
    const restore = () => {
      if (stopped) return;
      window.scrollTo({ top: scroll, behavior: "instant" });
      if (scroll > window.scrollY + 1 && attempts++ < 90)
        frame = requestAnimationFrame(restore);
    };
    frame = requestAnimationFrame(restore);
    const cancel = () => {
      stopped = true;
    };
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
    };
  }, [
    location.key,
    location.pathname,
    location.search,
    location.state,
    world,
    navigationType,
  ]);
  useEffect(() => {
    startTransition(refreshLinks);
  }, [location.pathname, location.search]);
  useEffect(() => {
    const save = () => {
      if (!active.current) return;
      const { url, key } = active.current;
      positions.current[url] = window.scrollY;
      positions.current[key] = window.scrollY;
      try {
        sessionStorage.setItem("world-pages", JSON.stringify(memory.current));
        sessionStorage.setItem(
          "world-scroll",
          JSON.stringify(positions.current),
        );
      } catch {
        /* Storage is optional. */
      }
    };
    window.addEventListener("scroll", save, { passive: true });
    window.addEventListener("pagehide", save);
    return () => {
      window.removeEventListener("scroll", save);
      window.removeEventListener("pagehide", save);
    };
  }, []);
  const destination = (target) => {
    const remembered = memory.current[target];
    return remembered &&
      resolveWorld(
        remembered.split("?")[0],
        remembered.includes("?") ? "?" + remembered.split("?")[1] : "",
      ) === target
      ? remembered
      : `/${target}`;
  };
  const switchWorld = (target) => {
    if (target === world || transitioning) return;
    if (active.current) {
      positions.current[active.current.url] = window.scrollY;
      positions.current[active.current.key] = window.scrollY;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      navigate(destination(target), { state: { restoreWorld: true } });
      return;
    }
    const next = destination(target);
    setTransitioning(target);
    const transition = navigateWithTransition(navigate, next, {
      state: { restoreWorld: true },
    });
    if (transition) {
      transition.finished.finally(() => setTransitioning(null)).catch(() => {});
    } else {
      switchTimers.current = [setTimeout(() => setTransitioning(null), 650)];
    }
  };
  return (
    <WorldContext.Provider
      value={{ world, switchWorld, destination, transitioning }}
    >
      {children}
    </WorldContext.Provider>
  );
}
export const useWorld = () => useContext(WorldContext);
