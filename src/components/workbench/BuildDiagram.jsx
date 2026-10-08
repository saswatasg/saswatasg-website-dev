import React from "react";
import DiagramIllustration from "./DiagramIllustration";
const variants = {
  DhanPlan: "planning",
  Meldstead: "workspace",
  "Inventory Leveling Agent": "bom",
  BlogHero: "publishing",
  LinkForge: "routing",
  "Pixel Display Controller": "pixel",
  "FilmRisk.AI": "evaluation",
  Topshe: "voice",
  Intent: "matrix",
  "11 PM Cinema": "calendar",
  "TGB Hunt": "queue",
};
export default function BuildDiagram({ project }) {
  return <DiagramIllustration variant={variants[project.name] || "pipeline"} />;
}
