# UI polish — local review

The shared paragraph color now inherits its surface rather than forcing dark ink. Workbench dark panels, lime calls to action, nested company badges and secondary labels have explicit contrasting colors. Case-study cards now use a consistent reading hierarchy, softer corners, restrained surface colors and responsive metrics. Source comparison and risk-matrix rows stack cleanly on small screens; long template IDs wrap.

The Workbench Saswata wordmark uses technical lettering, drafting corners and a directional arrow. Adda uses an italic serif Saswata signature, a curved underline and a folk flower. Their editorial structure, illustration language, palettes and footer navigation remain distinct.

Motion includes a directional world-switch curtain, entrance expansion, route arrivals, staggered viewport reveals, scroll progress, pointer-following orbit, portrait parallax, signal pulses, rotating flowers, drifting owls and flowing fish-rule strokes. Text remains visible during arrivals. Native scrolling is retained; in-page links scroll smoothly. Pointer motion runs through requestAnimationFrame, coarse-pointer devices omit it, and system reduced-motion disables decorative animations and bypasses mode curtains.

A case-study section menu provides links to each narrative section. World switching retains the previous page and scroll memory.

Validation: production build verifies 40 routes plus 404; five existing tests pass; lint and diff checks pass. Browser checks cover all nine case studies and the main creative pages at 320 px, plus desktop review. The contrast audit samples computed text colors against composited CSS background colors; it is not a complete WCAG audit and does not assess image backgrounds or all interactive states. Reduced-motion behavior was checked in source rather than by changing the user's OS preference. No forms submitted and nothing deployed.
