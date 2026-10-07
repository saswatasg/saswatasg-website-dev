const bounded = (value, max = Number.MAX_SAFE_INTEGER) =>
  Math.min(
    max,
    Math.max(0, Number.isFinite(Number(value)) ? Number(value) : 0),
  );
// Checkout starts, not site sessions, are the denominator for abandonment.
export function checkoutScenario({ starts, aov, abandonment, reduction }) {
  const baseline = bounded(abandonment, 100);
  const relativeReduction = bounded(reduction, 100);
  const recoveredOrders = Math.round(
    (((bounded(starts) * baseline) / 100) * relativeReduction) / 100,
  );
  return {
    recoveredOrders,
    recoveredRevenue: recoveredOrders * bounded(aov),
    resultingAbandonment: baseline * (1 - relativeReduction / 100),
  };
}
