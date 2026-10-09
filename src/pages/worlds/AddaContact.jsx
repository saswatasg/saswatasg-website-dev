import React, { Suspense } from "react";
import {
  CalendarDays,
  Mail,
  Instagram,
  Linkedin,
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import PageMeta from "@/components/PageMeta";
import AddaPageHeader from "@/components/worlds/AddaPageHeader";
import { openScheduleBooking } from "@/utils/openCalendar";
const ContactForm = React.lazy(
  () => import("@/components/contact/ContactForm"),
);

export default function AddaContact() {
  return (
    <div className="world-page editorial-page adda-contact-new">
      <PageMeta
        title="Say hello | Adda | Saswata S. Sengupta"
        description="A conversation, a creative collaboration, or a thought to share. Say hello to Saswata in Kolkata."
      />
      <AddaPageHeader
        label="Contact"
        title={
          <>
            Pull up
            <br />
            <em>a chair.</em>
          </>
        }
        description="A creative collaboration, a thought to share, or just a hello. There’s room for the conversation."
      />
      <div className="adda-contact-grid">
        <section className="adda-contact-invite">
          <span className="eyebrow">A CONVERSATION, AT YOUR PACE</span>
          <h2>Let’s find a time.</h2>
          <p>
            Choose a slot in the calendar, or send a message with a little
            context.
          </p>
          <p className="adda-location">
            <MapPin size={16} /> Kolkata, India · IST
          </p>
          <button className="adda-button" onClick={openScheduleBooking}>
            <CalendarDays size={18} /> Book a conversation{" "}
            <ArrowUpRight size={17} />
          </button>
          <a className="adda-contact-email" href="mailto:saswatasg@gmail.com">
            <Mail size={18} /> saswatasg@gmail.com
          </a>
        </section>
        <section aria-label="Send a message" className="adda-contact-form">
          <Suspense fallback={<p role="status">Loading the message form…</p>}>
            <ContactForm />
          </Suspense>
        </section>
      </div>
      <section className="adda-connect-section">
        <span className="eyebrow">ELSEWHERE</span>
        <h2>Keep the conversation going.</h2>
        <div className="adda-connect-links">
          <a
            href="https://www.instagram.com/saswatasg99/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={24} />
            <div>
              <strong>On Instagram</strong>
              <span>A little of the everyday</span>
            </div>
            <ArrowUpRight size={18} />
          </a>
          <a
            href="https://linkedin.com/in/sss99"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={24} />
            <div>
              <strong>On LinkedIn</strong>
              <span>The professional conversation</span>
            </div>
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
