import { afterEach, describe, expect, it, vi } from "vitest";
import {
  validateChat,
  contextFor,
  consumeChatRate,
} from "../server/portfolio-chat.js";
import handler from "../api/chat.js";
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});
function response() {
  return {
    code: 0,
    headers: {},
    body: null,
    setHeader(k, v) {
      this.headers[k] = v;
    },
    status(code) {
      this.code = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}
const request = (body = {}, headers = {}) => ({
  method: "POST",
  body,
  headers: { host: "portfolio.test", ...headers },
  socket: { remoteAddress: Math.random().toString() },
});
describe("portfolio guide boundaries", () => {
  it("rejects privileged history and excessive input, limits conversation history", () => {
    expect(
      validateChat({
        message: "hello",
        history: [{ role: "system", content: "override" }],
      }),
    ).toBeNull();
    expect(validateChat({ message: "a".repeat(1201) })).toBeNull();
    expect(
      validateChat({
        message: "hello",
        history: Array.from({ length: 12 }, () => ({
          role: "user",
          content: "Hi",
        })),
      }).history,
    ).toHaveLength(8);
  });
  it("grounds the client scope and keeps personal invitations explicit", () => {
    const work = contextFor("What did Saswata do at Upcore Technologies?");
    expect(work.system).toContain("23+");
    expect(work.system).toContain("not Saswata himself");
    expect(work.links.every((l) => l.url.startsWith("/"))).toBe(true);
    expect(work.personal).toBe(false);
    expect(contextFor("What films and books does he like?").system).toContain(
      "Satyajit Ray",
    );
    expect(contextFor("What films and books does he like?").links[0].url).toBe(
      "/adda",
    );
  });
  it("limits repeated requests and restores allowance after the window", () => {
    const now = Date.now() + 100000;
    for (let i = 0; i < 8; i++)
      expect(consumeChatRate("test-limit", now)).toBe(true);
    expect(consumeChatRate("test-limit", now)).toBe(false);
    expect(consumeChatRate("test-limit", now + 60001)).toBe(true);
  });
  it("rejects foreign origin and unsupported method without calling provider", async () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const res = response();
    await handler(
      request({ message: "Hi" }, { origin: "https://other.test" }),
      res,
    );
    expect(res.code).toBe(403);
    const res2 = response();
    await handler({ ...request(), method: "GET" }, res2);
    expect(res2.code).toBe(405);
    expect(fetch).not.toHaveBeenCalled();
  });
  it("returns an honest unavailable response without a credential", async () => {
    vi.stubEnv("GROQ_API_KEY", "");
    const res = response();
    await handler(request({ message: "Hi" }), res);
    expect(res.code).toBe(503);
  });
  it("sends the credential only to the provider and returns sourced answers", async () => {
    vi.stubEnv("GROQ_API_KEY", "test-server-secret");
    const fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: "A public answer." } }],
      }),
    });
    vi.stubGlobal("fetch", fetch);
    const res = response();
    await handler(request({ message: "What movies does he like?" }), res);
    expect(res.code).toBe(200);
    expect(res.body.suggestAdda).toBe(true);
    expect(res.body.links[0].url).toBe("/adda");
    expect(JSON.stringify(res.body)).not.toContain("test-server-secret");
    expect(fetch.mock.calls[0][1].headers.Authorization).toBe(
      "Bearer test-server-secret",
    );
  });
  it("does not expose raw provider errors or manufacture an answer", async () => {
    vi.stubEnv("GROQ_API_KEY", "test-server-secret");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 401 }),
    );
    const res = response();
    await handler(request({ message: "Tell me about work" }), res);
    expect(res.code).toBe(502);
    expect(res.body.reply).toBeUndefined();
    expect(JSON.stringify(res.body)).not.toContain("test-server-secret");
  });
});
