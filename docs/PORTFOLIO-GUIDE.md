# Career timeline and portfolio guide

The Experience page has six chronological chapters, a selectable evidence panel, keyboard navigation, role anchors and optional 4-second playback with a continuous per-frame countdown and timeline fill. Consulting is explicitly marked as overlapping Sierra Living Concepts. Experience cards show three achievement points by default, with expandable remaining points. How I Work rotates its four stages every 4.5 seconds while visible, with a matching countdown and pause control. Manual selection pauses the cycle. Reduced-motion preferences disable playback and decorative invitations.

The rectangular Workbench navigation contains a framed world switch with Bengali `আড্ডা (Adda)`, icons, an animated active plate and an occasional short invitation gesture. Navbar height remains 68 px on desktop and 64 px on mobile.

The freestanding gold chat character has no surrounding button tile, border or label. A transparent cutout of the supplied artwork floats gently, greets visitors on hover and uses the supplied 14-pose sprite sheet for idle, attention, listening, thinking and answer animations. The same artwork appears in the chat header and processing indicator. Reduced-motion preferences keep a static pose. The launcher opens a nonmodal AI guide on both sides. Two brief, dismissible hints per browser session can appear after 18 seconds and 90 seconds; no provider requests happen until the visitor submits a question. Conversations remain in React memory, disappear on reload, and are sent to Groq for inference. The application does not email or persist transcripts. The interface labels the assistant as AI and offers source links plus an explicit Adda switch for personal topics.

## Knowledge

`npm run build` regenerates `server/portfolio-knowledge.json` from public career, case-study, build, creative and article data. It also includes the confirmed 23+ client delivery scope and supplied personal interests. The handler retrieves relevant entries into the system context; this is grounding, not model fine-tuning. Independent builds are distinguished from employer deliveries, and demo/backtest limitations are retained. Private attachments and credentials are excluded.

## Configuration

Set `GROQ_API_KEY` in the server environment. `GROQ_MODEL` defaults to `openai/gpt-oss-20b`. Local development and preview read ignored `.env.local`; Vercel requires the key in its project environment before deployment. Never use a `VITE_` prefix for credentials. Vercel bundles the server knowledge through the function configuration.

POST `/api/chat` validates question length, history roles and body size, checks browser origin, and limits requests per instance (8/IP/minute and 80 total/minute). These in-memory limits are not shared across serverless instances; a persistent limiter and provider spending controls are appropriate if public usage grows. Provider errors return a visible retry state rather than invented answers. Messages are rendered as text and source URLs come from public knowledge.

## Verification

Seven focused API tests cover privileged history, size limits, rate limits, origin/method checks, missing credentials, sourced responses and provider failures. Production build verifies 41 prerendered routes plus 404. Local Groq responses verified the Upcore client scope and film/book interests. Desktop/mobile UI checks cover timeline keyboard selection, swipe, world switching, chat and a 320 px viewport without document overflow. The actual key has zero matches in tracked files or the browser build.
