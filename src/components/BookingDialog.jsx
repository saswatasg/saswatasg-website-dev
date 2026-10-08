/* eslint react/no-unknown-property: ["error", { "ignore": ["credentialless"] }] */
// credentialless is a native iframe attribute; the older React lint rule omits it.
import React, { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CalendarDays, X, Mail, Loader2 } from "lucide-react";
import { SCHEDULE_URL } from "@/utils/openCalendar";

export default function BookingDialog() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [revision, setRevision] = useState(0);
  const opener = useRef(null);
  useEffect(() => {
    const show = () => {
      opener.current = document.activeElement;
      setLoaded(false);
      setOpen(true);
    };
    window.addEventListener("openScheduleBooking", show);
    return () => window.removeEventListener("openScheduleBooking", show);
  }, []);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="booking-overlay" />
        <Dialog.Content
          className="booking-dialog"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            if (opener.current?.isConnected) opener.current.focus();
            else {
              const menu = document.querySelector(".wb-menu-toggle");
              const fallback = menu?.offsetParent
                ? menu
                : document.querySelector(".wb-brand");
              fallback?.focus();
            }
          }}
        >
          <header className="booking-heading">
            <CalendarDays size={25} aria-hidden="true" />
            <div>
              <Dialog.Title>Meet Saswata!</Dialog.Title>
              <Dialog.Description>
                Choose a time for a 30-minute conversation. Book right here.
              </Dialog.Description>
            </div>
            <Dialog.Close className="booking-close" aria-label="Close booking">
              <X size={22} />
            </Dialog.Close>
          </header>
          <div className="booking-frame">
            {!loaded && (
              <div className="booking-loading" role="status">
                <Loader2 size={22} /> Loading available times…
              </div>
            )}
            <iframe
              key={revision}
              credentialless=""
              src={SCHEDULE_URL}
              title="Book an appointment with Saswata on Google Calendar"
              onLoad={() => setLoaded(true)}
            />
          </div>
          <footer className="booking-footer">
            <span>Prefer email?</span>
            <a href="mailto:saswatasg@gmail.com">
              <Mail size={15} /> Email Saswata
            </a>
            <details className="booking-help">
              <summary>Can’t see the available times?</summary>
              <p>Reload the calendar, or email me to arrange a time.</p>
              <button
                type="button"
                onClick={() => {
                  setLoaded(false);
                  setRevision((value) => value + 1);
                }}
              >
                Reload calendar
              </button>
            </details>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
