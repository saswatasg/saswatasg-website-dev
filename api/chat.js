import {
  validateChat,
  contextFor,
  consumeChatRate,
} from "../server/portfolio-chat.js";
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Use POST to chat." });
  }
  if (req.headers.origin) {
    try {
      if (new URL(req.headers.origin).host !== req.headers.host)
        return res
          .status(403)
          .json({ error: "Chat is available on this website." });
    } catch {
      return res.status(403).json({ error: "Invalid origin." });
    }
  }
  const input = validateChat(req.body);
  if (!input)
    return res
      .status(400)
      .json({ error: "Send a question of up to 1,200 characters." });
  const ip = String(
    req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown",
  )
    .split(",")[0]
    .trim();
  if (!consumeChatRate(ip)) {
    res.setHeader("Retry-After", "60");
    return res
      .status(429)
      .json({ error: "A little pause—please try again in a minute." });
  }
  if (!process.env.GROQ_API_KEY)
    return res
      .status(503)
      .json({
        error:
          "The AI guide is not connected yet. You can still explore the links below.",
      });
  const context = contextFor(input.message, input.page);
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify({
          model: process.env.GROQ_MODEL || "openai/gpt-oss-20b",
          messages: [
            { role: "system", content: context.system },
            ...input.history,
            { role: "user", content: input.message },
          ],
          temperature: 0.45,
          max_completion_tokens: 700,
          reasoning_effort: "low",
        }),
      },
    );
    if (!response.ok)
      return res
        .status(response.status === 429 ? 429 : 502)
        .json({
          error: "The AI guide is taking a breather. Please retry shortly.",
        });
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply)
      return res
        .status(502)
        .json({
          error: "No answer came through. Try asking in a different way.",
        });
    return res
      .status(200)
      .json({
        reply: reply.slice(0, 4000),
        links: context.links,
        suggestAdda: context.personal,
      });
  } catch {
    return res
      .status(502)
      .json({ error: "The connection paused. Please try again." });
  }
}
