import { describe, it, expect } from "vitest";
import { checkoutScenario } from "../src/utils/checkoutScenario";
describe("checkout scenario", () => {
  it("uses checkout starts and a relative reduction in abandonment", () => {
    const result = checkoutScenario({
      starts: 10000,
      aov: 8000,
      abandonment: 73.1,
      reduction: 26,
    });
    expect(result.recoveredOrders).toBe(1901);
    expect(result.recoveredRevenue).toBe(15208000);
    expect(result.resultingAbandonment).toBeCloseTo(54.094);
  });
  it("bounds impossible inputs and handles non-finite values", () => {
    expect(
      checkoutScenario({
        starts: -10,
        aov: Infinity,
        abandonment: 200,
        reduction: 150,
      }),
    ).toEqual({
      recoveredOrders: 0,
      recoveredRevenue: 0,
      resultingAbandonment: 0,
    });
    expect(
      checkoutScenario({ starts: 100, aov: 20, abandonment: 50, reduction: 0 })
        .recoveredOrders,
    ).toBe(0);
  });
});
