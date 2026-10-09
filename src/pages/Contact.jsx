import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  Mail,
  Linkedin,
  Github,
  FileText,
  MessageSquare,
  MapPin,
} from "lucide-react";
import PageMeta from "@/components/PageMeta";
import { useWorld } from "@/contexts/WorldContext";
import AddaContact from "./worlds/AddaContact";
import { openScheduleBooking } from "@/utils/openCalendar";
const ContactForm = React.lazy(
  () => import("@/components/contact/ContactForm"),
);
const links = [
  {
    icon: Linkedin,
    label: "Connect on LinkedIn",
    detail: "The professional conversation",
    href: "https://linkedin.com/in/sss99",
    tone: "blue",
  },
  {
    icon: Github,
    label: "Explore the code",
    detail: "Working products & experiments",
    href: "https://github.com/saswatasg",
    tone: "sage",
  },
  {
    icon: FileText,
    label: "Resume",
    detail: "The journey, in one document",
    href: "/assets/resume.pdf",
    tone: "clay",
  },
];
export default function Contact() {
  const { world } = useWorld();
  const reduced = useReducedMotion();
  if (world === "adda") return <AddaContact />;
  return (
    <>
      <PageMeta
        title="Contact | Saswata S. Sengupta"
        description="Start a conversation about a product challenge, an enterprise AI solution, a collaboration or a professional opportunity."
      />
      <div className="wb-page wb-contact-new">
        <nav className="wb-breadcrumb" aria-label="Breadcrumb">
          <Link to="/workbench">Workbench</Link>
          <span>/ Contact</span>
        </nav>
        <header className="wb-connect-hero">
          <div>
            <span className="wb-label">A GOOD QUESTION IS A GOOD START</span>
            <h1>
              Great things start
              <br />
              with <em>“what if?”</em>
            </h1>
            <p>
              A product problem, an idea to build, or a next opportunity. Bring
              the context. We’ll find the conversation.
            </p>
            <span className="wb-location">
              <MapPin size={15} /> Kolkata, India · IST
            </span>
          </div>
          <motion.div
            className="wb-conversation-art"
            aria-hidden="true"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="wb-label">INCOMING / A NEW POSSIBILITY</span>
            <div className="wb-art-message">
              <MessageSquare size={30} />
              <strong>“I have an idea…”</strong>
            </div>
            <div className="wb-art-reply">
              <span>↳</span>
              <strong>Let’s make it clearer.</strong>
            </div>
            <div className="wb-art-envelope">
              <Mail size={78} strokeWidth={1.3} />
              <span>
                YOUR CONTEXT
                <br />
                OUR NEXT STEP
              </span>
            </div>
          </motion.div>
        </header>
        <section
          className="wb-booking-invite"
          aria-labelledby="contact-booking"
        >
          <div className="wb-invite-icon">
            <CalendarDays size={30} />
          </div>
          <div>
            <span className="wb-label">PREFER A CONVERSATION?</span>
            <h2 id="contact-booking">Meet Saswata.</h2>
            <p>
              Choose a time that works for you. The calendar opens right here.
            </p>
          </div>
          <button className="wb-page-button" onClick={openScheduleBooking}>
            Book an appointment <ArrowUpRight size={18} />
          </button>
        </section>
        <div className="wb-contact-main">
          <section aria-label="Send a message">
            <Suspense
              fallback={
                <div
                  className="wb-surface h-96"
                  aria-label="Loading contact form"
                />
              }
            >
              <ContactForm />
            </Suspense>
          </section>
          <aside className="wb-contact-paths">
            <div className="wb-contact-paths-heading">
              <span className="wb-label">OR TAKE A DIFFERENT ROUTE</span>
              <h2>Find me here.</h2>
            </div>
            <a
              className="wb-connect-link wb-tone-gold"
              href="mailto:saswatasg@gmail.com"
            >
              <span className="wb-connect-icon">
                <Mail size={25} />
              </span>
              <span>
                <strong>Email me directly</strong>
                <small>saswatasg@gmail.com</small>
              </span>
              <ArrowUpRight size={19} />
            </a>
            {links.map(({ icon: Icon, label, detail, href, tone }) => (
              <a
                key={label}
                className={`wb-connect-link wb-tone-${tone}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="wb-connect-icon">
                  <Icon size={25} />
                </span>
                <span>
                  <strong>{label}</strong>
                  <small>{detail}</small>
                </span>
                <ArrowUpRight size={19} />
              </a>
            ))}
            <Link className="wb-contact-explore" to="/work">
              Want some context first? Explore the work{" "}
              <ArrowUpRight size={16} />
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}
