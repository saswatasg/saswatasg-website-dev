import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { portraits } from "@/data/creativeContent";
import PortraitBackdrop from "./PortraitBackdrop";
export default function Portrait({ world, className = "" }) {
  const portrait = portraits[world];
  const location = useLocation();
  return (
    <motion.figure
      layoutId={`portrait-${world}`}
      transition={{
        duration: location.state?.entrance ? 0.08 : 0.22,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`world-portrait portrait-${world} ${className}`}
    >
      <PortraitBackdrop world={world} />
      <img
        src={portrait.src}
        alt={portrait.alt}
        width={portrait.width}
        height={portrait.height}
      />
      {portrait.provisional && (
        <figcaption>
          Portrait placeholder · {world === "adda" ? "02" : "01"}
        </figcaption>
      )}
    </motion.figure>
  );
}
