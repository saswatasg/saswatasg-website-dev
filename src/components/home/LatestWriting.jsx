import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { postsBySlug } from "@/data/blogPosts";
const notes = [
  {
    slug: "film-risk-engine",
    label: "BUILDING WITH UNCERTAINTY",
    summary:
      "Model choices, published backtests and what the failures taught me.",
  },
  {
    slug: "push-notification-architecture",
    label: "PRODUCT SYSTEMS",
    summary:
      "Priority, relevance and the constraints behind a notification system.",
  },
];
export default function LatestWriting() {
  return (
    <section className="wb-home-closing" aria-labelledby="wb-closing-title">
      <div className="wb-closing-notes">
        <div className="wb-closing-note-heading">
          <span className="wb-label">A LITTLE MORE OF THE THINKING</span>
          <Link to="/blog" className="wb-inline-link">
            All writing
            <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="wb-note-links">
          {notes.map((note) => {
            const post = postsBySlug[note.slug];
            if (!post) return null;
            return (
              <Link key={note.slug} to={`/blog/${note.slug}`}>
                <span className="wb-label">
                  {note.label} · {post.readingMinutes} MIN
                </span>
                <h3>
                  {post.title}
                  <ArrowUpRight size={18} />
                </h3>
                <p>{note.summary}</p>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="wb-closing-conversation">
        <div>
          <span className="wb-label">THE NEXT CONVERSATION</span>
          <h2 id="wb-closing-title">Let’s compare notes.</h2>
          <p>
            On a product challenge, an AI workflow or something worth building.
          </p>
        </div>
        <Link to="/contact" className="wb-button wb-button-coral">
          Start a conversation
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
