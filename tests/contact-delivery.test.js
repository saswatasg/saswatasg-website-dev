import { afterEach, describe, expect, it, vi } from "vitest";
import {
  deliverContactMessage,
  withRequestDeadline,
} from "../src/utils/contactDelivery";

afterEach(() => vi.useRealTimers());

describe("contact delivery", () => {
  it("sends immediately even when the archive stalls, then cancels the archive", async () => {
    vi.useFakeTimers();
    let archiveSignal;
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: "true" }),
    });
    await deliverContactMessage(
      { message: "Hello" },
      {
        fetcher,
        store: (signal) => {
          archiveSignal = signal;
          return new Promise(() => {});
        },
      },
    );
    expect(fetcher).toHaveBeenCalledOnce();
    expect(archiveSignal.aborted).toBe(false);
    await vi.advanceTimersByTimeAsync(4000);
    expect(archiveSignal.aborted).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("rejects a stalled email service and aborts its request", async () => {
    vi.useFakeTimers();
    let deliverySignal;
    const delivery = deliverContactMessage(
      {},
      {
        store: async () => ({}),
        fetcher: (_, { signal }) => {
          deliverySignal = signal;
          return new Promise(() => {});
        },
      },
    );
    const assertion = expect(delivery).rejects.toThrow("took too long");
    await vi.advanceTimersByTimeAsync(12000);
    await assertion;
    expect(deliverySignal.aborted).toBe(true);
  });

  it("does not claim success when a successful HTTP response refuses delivery", async () => {
    await expect(
      deliverContactMessage(
        {},
        {
          store: async () => ({}),
          fetcher: async () => ({
            ok: true,
            json: async () => ({ success: false }),
          }),
        },
      ),
    ).rejects.toThrow("did not confirm delivery");
  });

  it("releases the deadline timer when a request fails early", async () => {
    vi.useFakeTimers();
    await expect(
      withRequestDeadline(async () => {
        throw new Error("Offline");
      }, 4000),
    ).rejects.toThrow("Offline");
    expect(vi.getTimerCount()).toBe(0);
  });
});
