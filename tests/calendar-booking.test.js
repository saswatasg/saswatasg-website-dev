import { afterEach, describe, expect, it, vi } from "vitest";
vi.mock("@/utils/analytics", () => ({ trackEvent: vi.fn() }));
import { openScheduleBooking } from "../src/utils/openCalendar.js";

afterEach(() => vi.unstubAllGlobals());

describe("calendar booking", () => {
  it("opens the in-page dialog without creating a browser window", () => {
    const dispatchEvent = vi.fn();
    const open = vi.fn();
    vi.stubGlobal("CustomEvent", class { constructor(type) { this.type = type; } });
    vi.stubGlobal("window", { open, dispatchEvent });
    openScheduleBooking();
    expect(dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({ type: "openScheduleBooking" }),
    );
    expect(open).not.toHaveBeenCalled();
  });
});
