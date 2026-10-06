import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useWorld } from "@/contexts/WorldContext";
import SaswataLogo from "./SaswataLogo";
export function ModeSelector() {
  const { world, switchWorld, destination } = useWorld();
  return (
    <nav className="mode-selector" aria-label="Choose a world">
      {["workbench", "adda"].map((mode) => (
        <a
          key={mode}
          href={destination(mode)}
          aria-current={world === mode ? "true" : undefined}
          onClick={(e) => {
            if (
              e.button === 0 &&
              !e.metaKey &&
              !e.ctrlKey &&
              !e.shiftKey &&
              !e.altKey
            ) {
              e.preventDefault();
              switchWorld(mode);
            }
          }}
        >
          {mode === "adda" ? "Adda" : "Workbench"}
          <span aria-hidden="true">{world === mode ? "●" : "○"}</span>
        </a>
      ))}
    </nav>
  );
}
export default function WorldHeader() {
  const { world } = useWorld();
  const adda = world === "adda";
  const links = adda
    ? [
        ["Photography", "/photography"],
        ["Writing", "/writing"],
        ["Cinema", "/cinema"],
        ["About", "/adda/about"],
      ]
    : [
        ["Work", "/work"],
        ["Builds", "/builds"],
        ["Notes", "/blog"],
        ["Profile", "/about"],
      ];
  return (
    <header className="world-header">
      <Link className="world-brand" to={adda ? "/adda" : "/workbench"}>
        <SaswataLogo world={world} />
        <small>{adda ? "STORIES & CURIOSITY" : "PRODUCT & SYSTEMS"}</small>
      </Link>
      <nav
        className="world-nav"
        aria-label={`${adda ? "Adda" : "Workbench"} navigation`}
      >
        {links.map(([label, href]) => (
          <NavLink key={href} to={href}>
            {label}
          </NavLink>
        ))}
        <NavLink to={adda ? "/contact?world=adda" : "/contact"}>
          Contact ↗
        </NavLink>
      </nav>
      <ModeSelector />
      <Link
        to="/"
        className="entrance-link"
        aria-label="Return to split entrance"
      >
        ↔<span>Entrance</span>
      </Link>
    </header>
  );
}
