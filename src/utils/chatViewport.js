export function chatViewport(layoutHeight, viewport, baselineHeight) {
  const height = viewport?.height ?? layoutHeight;
  const offsetTop = viewport?.offsetTop ?? 0;
  return {
    height,
    bottom: Math.max(0, layoutHeight - height - offsetTop),
    keyboardOpen: baselineHeight - height > 120,
  };
}
