import { describe, expect, it } from "vitest";
import { worldFromSplit } from "../src/utils/worldTransition";
describe("entrance commitment threshold", () => {
  it("enters only when a world occupies at least eighty percent", () => {
    expect(worldFromSplit(80)).toBe("workbench");
    expect(worldFromSplit(95)).toBe("workbench");
    expect(worldFromSplit(20)).toBe("adda");
    expect(worldFromSplit(5)).toBe("adda");
    for (const percentage of [20.1, 35, 50, 65, 79.9])
      expect(worldFromSplit(percentage)).toBe(null);
  });
});
