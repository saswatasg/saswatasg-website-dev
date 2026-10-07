import { describe, expect, it } from "vitest";
import { chatViewport } from "../src/utils/chatViewport";

describe("chat keyboard viewport", () => {
  it("lifts the panel when only the visual viewport shrinks", () => {
    expect(chatViewport(844, { height: 500, offsetTop: 0 }, 844)).toEqual({
      height: 500,
      bottom: 344,
      keyboardOpen: true,
    });
  });
  it("avoids counting the keyboard twice when the layout also resizes", () => {
    expect(chatViewport(500, { height: 500, offsetTop: 0 }, 844)).toEqual({
      height: 500,
      bottom: 0,
      keyboardOpen: true,
    });
  });
  it("accounts for browser panning and restores the normal viewport", () => {
    expect(chatViewport(844, { height: 500, offsetTop: 80 }, 844).bottom).toBe(
      264,
    );
    expect(
      chatViewport(844, { height: 844, offsetTop: 0 }, 844).keyboardOpen,
    ).toBe(false);
  });
});
