import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar, Mail } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import PageHeader from "@/components/workbench/PageHeader";
import { useWorld } from "@/contexts/WorldContext";
import LegacyContact from "./LegacyContact";
import { openScheduleBooking } from "@/utils/openCalendar";
const ContactForm = React.lazy(
  () => import("@/components/contact/ContactForm"),
);

export default function Contact() {
  const { world } = useWorld();
  if (world === "adda") return <LegacyContact />;
  return (
    <>
      <PageMeta
        title="Contact | Saswata S. Sengupta"
        description="Start a conversation about a product challenge, an enterprise AI solution, a collaboration or a professional opportunity."
      />
      <div className="wb-page">
        <PageHeader
          label="Contact"
          variant="contact"
          title="Let’s compare notes."
          description="A product challenge, an AI workflow, a collaboration or a thoughtful next opportunity. Tell me what you’re thinking about."
        />
        <div className="wb-about-grid">
          <Suspense
            fallback={
              <div
                className="wb-surface animate-pulse h-96"
                aria-label="Loading contact form"
              />
            }
          >
            <ContactForm />
          </Suspense>
          <aside className="wb-surface">
            <span className="wb-label">A GOOD PLACE TO START</span>
            <h2 className="mt-3">One conversation.</h2>
            <p>
              Share the problem, the context and the kind of help you have in
              mind. You can write below or choose a time to talk.
            </p>
            <button
              className="wb-page-button mt-6"
              onClick={openScheduleBooking}
            >
              <Calendar size={17} />
              Choose a time
            </button>
            <div className="wb-contact-links">
              <a href="mailto:saswatasg@gmail.com">
                <span>
                  <Mail size={16} className="inline mr-2" />
                  saswatasg@gmail.com
                </span>
                <ArrowUpRight size={17} />
              </a>
              <a
                href="https://linkedin.com/in/sss99"
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn
                <ArrowUpRight size={17} />
              </a>
              <a
                href="https://github.com/saswatasg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore the code
                <ArrowUpRight size={17} />
              </a>
              <a
                href="/assets/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                View my resume
                <ArrowUpRight size={17} />
              </a>
            </div>
            <p className="mt-6 text-sm">Based in Kolkata, India · IST</p>
            <p className="mt-4 text-sm">
              For growth consulting, visit{" "}
              <a
                className="underline underline-offset-4"
                href="https://www.thegrowthbench.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Growth Bench ↗
              </a>
              .
            </p>
          </aside>
        </div>
        <nav
          className="wb-role-links mt-8"
          aria-label="Explore before reaching out"
        >
          <Link to="/work">Explore the work ↗</Link>
          <Link to="/experience">Read the professional journey ↗</Link>
        </nav>
      </div>
    </>
  );
}
