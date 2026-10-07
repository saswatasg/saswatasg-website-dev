import { afterEach, describe, expect, it, vi } from "vitest";
import { openScheduleBooking, SCHEDULE_URL } from "../src/utils/openCalendar";

afterEach(() => vi.unstubAllGlobals());

describe("calendar booking entry", () => {
  it("opens the visitor booking page without an iframe or popup dependency", () => {
    const assign = vi.fn();
    const dataLayer = [];
    vi.stubGlobal("window", { dataLayer, location: { search: "", assign } });
    openScheduleBooking();
    expect(assign).toHaveBeenCalledWith(SCHEDULE_URL);
    const url = new URL(SCHEDULE_URL);
    expect(url.origin).toBe("https://calendar.google.com");
    expect(url.searchParams.get("gv")).toBe("true");
    expect(dataLayer).toEqual([
      expect.objectContaining({
        eventCategory: "calendar",
        eventAction: "opened",
      }),
    ]);
    expect(dataLayer.some((e) => e.eventAction === "booked")).toBe(false);
  });
});
