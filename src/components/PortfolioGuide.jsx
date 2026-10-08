import React, { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Send, ArrowUpRight, MessageCircle, RotateCcw } from "lucide-react";
import ChatAvatar from "@/components/ChatAvatar";
import { useWorld } from "@/contexts/WorldContext";
import { chatViewport } from "@/utils/chatViewport";
const initial = [
  {
    role: "assistant",
    content:
      "Hi, I’m Saswata’s AI guide. Ask about the work, the builds, or the person behind them. Where would you like to start?",
  },
];
const questions = [
  "What has Saswata delivered at Upcore Technologies?",
  "Tell me about DhanPlan and Meldstead.",
  "What is the personal side of Saswata?",
];
export default function PortfolioGuide() {
  const { world, switchWorld } = useWorld();
  const location = useLocation();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false),
    [prompt, setPrompt] = useState(false),
    [quiet, setQuiet] = useState(false),
    [everOpened, setEverOpened] = useState(false);
  const [messages, setMessages] = useState(initial),
    [input, setInput] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const [answering, setAnswering] = useState(false);
  const [viewport, setViewport] = useState(null);
  useEffect(() => {
    if (!open) return;
    const visual = window.visualViewport;
    let baselineHeight = visual?.height ?? window.innerHeight;
    let baselineWidth = window.innerWidth;
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (Math.abs(window.innerWidth - baselineWidth) > 80) {
          baselineWidth = window.innerWidth;
          baselineHeight = visual?.height ?? window.innerHeight;
        }
        setViewport(chatViewport(window.innerHeight, visual, baselineHeight));
      });
    };
    update();
    visual?.addEventListener("resize", update);
    visual?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      visual?.removeEventListener("resize", update);
      visual?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [open]);
  useEffect(() => {
    setAnswering(false);
    if (messages.length < 2 || messages.at(-1).role !== "assistant") return;
    setAnswering(true);
    const timer = setTimeout(() => setAnswering(false), 3600);
    return () => clearTimeout(timer);
  }, [messages]);
  const end = useRef(null),
    inputRef = useRef(null),
    closeRef = useRef(null),
    controller = useRef(null);
  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => {
    if (open || quiet || everOpened || !world) return;
    let count = 0;
    try {
      count = Number(sessionStorage.getItem("guide-prompts") || 0);
    } catch {}
    if (count >= 2) return;
    const timer = setTimeout(
      () => {
        setPrompt(true);
        try {
          sessionStorage.setItem("guide-prompts", String(count + 1));
        } catch {}
      },
      count ? 90000 : 18000,
    );
    return () => clearTimeout(timer);
  }, [open, quiet, everOpened, world, location.pathname]);
  useEffect(() => {
    if (!prompt) return;
    const timer = setTimeout(() => setPrompt(false), 12000);
    return () => clearTimeout(timer);
  }, [prompt]);
  useEffect(() => {
    if (open)
      end.current?.scrollIntoView({
        block: "nearest",
        behavior: reduced ? "auto" : "smooth",
      });
  }, [messages, busy, open, reduced]);
  const changeOpen = (value) => {
    setOpen(value);
    if (value) {
      setEverOpened(true);
      setPrompt(false);
    }
  };
  async function send(text = input) {
    const message = text.trim();
    if (!message || busy) return;
    const history = messages
      .filter((_, i) => i > 0)
      .slice(-8)
      .map(({ role, content }) => ({ role, content: content.slice(0, 1800) }));
    setInput("");
    setError("");
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setBusy(true);
    controller.current = new AbortController();
    const timeout = setTimeout(() => controller.current?.abort(), 25000);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history, page: location.pathname }),
        signal: controller.current.signal,
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "The guide is unavailable right now.");
      if (typeof data.reply !== "string" || !data.reply.trim())
        throw new Error("No answer came through. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
          links: data.links,
          suggestAdda: data.suggestAdda,
        },
      ]);
    } catch (e) {
      setError(
        e.name === "AbortError"
          ? "The connection took too long. Please try again."
          : e.message,
      );
      setInput(message);
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      clearTimeout(timeout);
      setBusy(false);
      // Keep the visitor's current focus. A suggested question must never
      // open a phone keyboard when its answer arrives.
    }
  }
  if (!world) return null;
  const avatarState = busy
    ? "thinking"
    : error
      ? "error"
      : prompt && !open
        ? "attention"
        : answering && open
          ? "answering"
          : open
            ? "listening"
            : "idle";
  return (
    <Dialog.Root modal={false} open={open} onOpenChange={changeOpen}>
      <div className="portfolio-guide-launch" data-world={world}>
        <AnimatePresence>
          {prompt && !open && (
            <motion.div
              className="portfolio-guide-nudge"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <button onClick={() => changeOpen(true)}>
                {world === "adda"
                  ? "A story, a film, a little আড্ডা?"
                  : "Curious how these ideas became real work?"}
                <span>
                  Ask the AI guide <ArrowUpRight size={14} />
                </span>
              </button>
              <button
                className="guide-dismiss-nudge"
                aria-label="Dismiss guide prompt"
                onClick={() => {
                  setPrompt(false);
                  setQuiet(true);
                }}
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <Dialog.Trigger asChild>
          <button
            className="portfolio-guide-avatar"
            title="Ask Saswata’s AI guide"
            aria-label="Chat with Saswata’s AI guide"
          >
            <ChatAvatar state={avatarState} className="guide-avatar-art" />
          </button>
        </Dialog.Trigger>
      </div>
      <Dialog.Portal>
        <Dialog.Content
          className="portfolio-guide-panel"
          data-world={world}
          data-keyboard-open={viewport?.keyboardOpen || false}
          style={
            viewport
              ? {
                  "--guide-visible-height": `${viewport.height}px`,
                  "--guide-keyboard-offset": `${viewport.bottom}px`,
                }
              : undefined
          }
          onInteractOutside={(e) => e.preventDefault()}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            const mobile = window.matchMedia(
              "(max-width: 700px), (pointer: coarse)",
            ).matches;
            (mobile ? closeRef.current : inputRef.current)?.focus({
              preventScroll: true,
            });
          }}
        >
          <header className="guide-panel-heading">
            <ChatAvatar state={avatarState} className="guide-header-avatar" />
            <div>
              <Dialog.Title>Ask Saswata’s AI guide</Dialog.Title>
              <Dialog.Description>
                Work, builds & a little আড্ডা (Adda).
              </Dialog.Description>
            </div>
            <Dialog.Close ref={closeRef} aria-label="Close chat">
              <X size={20} />
            </Dialog.Close>
          </header>
          <div className="guide-panel-tools">
            <span>Answers from the public portfolio</span>
            <button
              disabled={busy}
              aria-label="Start a new conversation"
              onClick={() => {
                setMessages(initial);
                setError("");
                setInput("");
              }}
            >
              <RotateCcw size={14} />
            </button>
            <button
              aria-pressed={quiet}
              onClick={() => {
                setQuiet((q) => !q);
                setEverOpened(false);
              }}
            >
              {quiet ? "Prompts off" : "Prompts on"}
            </button>
          </div>
          <div
            className="guide-messages"
            role="log"
            aria-label="Chat messages"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((message, i) => (
              <div key={i} className={`guide-message is-${message.role}`}>
                <span className="guide-message-who">
                  {message.role === "user" ? "YOU" : "AI GUIDE"}
                </span>
                <p>{message.content}</p>
                {message.links?.length > 0 && (
                  <nav aria-label="Related portfolio pages">
                    {message.links
                      .filter((link) =>
                        /^\/(?!\/)[a-z0-9/#-]+$/i.test(link.url),
                      )
                      .map((link) => (
                        <Link key={link.url} to={link.url}>
                          {link.label}
                          <ArrowUpRight size={13} />
                        </Link>
                      ))}
                  </nav>
                )}
                {message.suggestAdda && world !== "adda" && (
                  <button
                    className="guide-adda-invite"
                    onClick={() => {
                      setOpen(false);
                      switchWorld("adda");
                    }}
                  >
                    Step into <span lang="bn">আড্ডা</span> (Adda){" "}
                    <ArrowUpRight size={14} />
                  </button>
                )}
              </div>
            ))}
            {messages.length === 1 && (
              <div className="guide-suggestions">
                {questions.map((question) => (
                  <button key={question} onClick={() => send(question)}>
                    {question}
                    <ArrowUpRight size={14} />
                  </button>
                ))}
              </div>
            )}
            {busy && (
              <div className="guide-thinking" role="status">
                <ChatAvatar
                  state="thinking"
                  className="guide-thinking-avatar"
                />{" "}
                Finding the useful details…
              </div>
            )}
            <div ref={end} />
          </div>
          {error && (
            <div className="guide-error" role="alert">
              {error} <Link to="/contact">Contact Saswata ↗</Link>
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="guide-compose"
          >
            <label className="sr-only" htmlFor="guide-question">
              Your question
            </label>
            <input
              id="guide-question"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1200}
              placeholder="What would you like to know?"
              autoComplete="off"
            />
            <button disabled={busy || !input.trim()} aria-label="Send question">
              <Send size={19} />
            </button>
          </form>
          <p className="guide-disclosure">
            AI can make mistakes. Messages are sent to Groq to answer; chat
            stays in this session.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
