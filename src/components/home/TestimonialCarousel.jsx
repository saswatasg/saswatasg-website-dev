import React, { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Linkedin } from "lucide-react";

const testimonials = [
  {
    name: "Harish Kumawat",
    title: "Growth Marketing Manager, Sierra Living Concepts",
    relation: "Managed Saswata directly for over a year",
    text: "Saswata consistently delivered results beyond expectations and showed strong ownership in everything he handled. He has excellent technical expertise, along with a deep understanding of analytics and the customer buying journey.",
    linkedin: "https://linkedin.com/in/harishkumawat",
    company: "Sierra Living Concepts",
  },
  {
    name: "Jai Sankhla",
    title: "UI/UX Designer, Sierra Living Concepts",
    relation: "Reported directly to Saswata",
    text: "His ability to align business objectives with user-centric design made product development seamless. He championed a data-driven approach to UX/UI decisions and fostered cross-functional collaboration.",
    linkedin: "https://linkedin.com/in/jaisankhla",
    company: "Sierra Living Concepts",
  },
  {
    name: "Mehul Bhaliya",
    title: "Category Manager + MBA Batchmate, Sierra Living Concepts",
    relation: "Worked on same team · IIT Jodhpur batchmate",
    text: "His knack for solving complex problems and driving data-driven decisions stood out both in academic and professional settings. His ability to strategize and execute effective SEO, SEM, and UX initiatives greatly contributed to growth.",
    linkedin: "https://linkedin.com/in/mehulbhaliya",
    company: "Sierra Living Concepts",
  },
  {
    name: "Sulagna Barat",
    title: "Executive Data Scientist, Synergy Marine Group",
    relation: "Cross-company consultant",
    text: "His ability to analyze complex challenges, optimize conversion strategies, and scale e-commerce operations is truly commendable. His strong business acumen enables him to drive impactful and sustainable growth.",
    linkedin: "https://linkedin.com/in/sulagnabarat",
    company: "Synergy",
  },
];

export default function TestimonialCarousel() {
  const rail = useRef(null);
  const reduced = useReducedMotion();
  const move = (direction) => {
    const card = rail.current?.querySelector("article");
    if (card)
      rail.current.scrollBy({
        left: direction * (card.offsetWidth + 20),
        behavior: reduced ? "auto" : "smooth",
      });
  };
  return (
    <section
      id="recommendations"
      className="wb-testimonials"
      aria-label="Recommendations"
    >
      <div className="wb-section-heading">
        <div>
          <span className="wb-label">PEOPLE I’VE WORKED WITH</span>
          <h2>Good work is a team sport.</h2>
        </div>
        <div className="wb-rail-controls">
          <button
            onClick={() => move(-1)}
            aria-label="Previous recommendations"
          >
            <ArrowLeft size={20} />
          </button>
          <button onClick={() => move(1)} aria-label="Next recommendations">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <div
        ref={rail}
        className="wb-testimonial-rail"
        tabIndex={0}
        aria-label="Scroll through four recommendations"
      >
        {testimonials.map((item, i) => (
          <article className="wb-testimonial-card" key={item.name}>
            <div className="wb-quote-top">
              <span aria-hidden="true">“</span>
              <span className="wb-label">RECOMMENDATION / 0{i + 1}</span>
            </div>
            <blockquote>{item.text}</blockquote>
            <footer>
              <a href={item.linkedin} target="_blank" rel="noopener noreferrer">
                {item.name}
                <Linkedin size={14} />
              </a>
              <p>{item.title}</p>
              <span>{item.relation}</span>
            </footer>
          </article>
        ))}
      </div>
      <p className="wb-rail-hint">
        Scroll or swipe to explore · 4 recommendations
      </p>
    </section>
  );
}
