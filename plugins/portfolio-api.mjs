import { loadEnv } from "vite";
import chat from "../api/chat.js";
export default function portfolioApi() {
  const env = loadEnv("development", process.cwd(), "");
  for (const key of ["GROQ_API_KEY", "GROQ_MODEL"])
    if (env[key] && !process.env[key]) process.env[key] = env[key];
  const mount = (server) => {
    server.middlewares.use("/api/chat", async (req, res, next) => {
      if (req.url && req.url !== "/" && req.url !== "") return next();
      let raw = "";
      try {
        for await (const chunk of req) {
          raw += chunk.toString();
          if (Buffer.byteLength(raw) > 16000) {
            res.statusCode = 413;
            res.end(JSON.stringify({ error: "Question is too long." }));
            return;
          }
        }
        req.body = raw ? JSON.parse(raw) : {};
        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
        res.json = (value) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(value));
        };
        await chat(req, res);
      } catch {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Invalid chat request." }));
      }
    });
  };
  return {
    name: "portfolio-api",
    configureServer: mount,
    configurePreviewServer: mount,
  };
}
